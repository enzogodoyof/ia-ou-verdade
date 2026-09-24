import { NextResponse } from "next/server";
import { prisma, checkDatabaseConnection } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    // Proteção simples por chave (defina ADMIN_KEY no .env)
    const adminKey = process.env.ADMIN_KEY || "extensao2024";
    if (key !== adminKey) {
      return NextResponse.json(
        { error: "Acesso negado. Informe a chave correta via ?key=SUA_CHAVE" },
        { status: 401 }
      );
    }

    const isConnected = await checkDatabaseConnection();

    if (!isConnected) {
      return NextResponse.json({
        source: "sem_banco",
        message: "Banco de dados não está conectado. Os dados estão armazenados apenas localmente no navegador de cada participante.",
        participants: [],
      });
    }

    const participants = await prisma.participant.findMany({
      include: {
        preTest: true,
        postTest: true,
        caseAnswers: true,
        feedback: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      source: "database",
      total: participants.length,
      exportedAt: new Date().toISOString(),
      participants: participants.map((p) => ({
        id: p.id,
        nome: p.name,
        sessao: p.sessionToken,
        criadoEm: p.createdAt,
        preTest: p.preTest
          ? {
              nota: p.preTest.score,
              respostas: p.preTest.answers,
              data: p.preTest.createdAt,
            }
          : null,
        postTest: p.postTest
          ? {
              nota: p.postTest.score,
              respostas: p.postTest.answers,
              data: p.postTest.createdAt,
            }
          : null,
        casosRespondidos: p.caseAnswers.map((ca) => ({
          casoId: ca.caseId,
          resposta: ca.userVerdict,
          acertou: ca.isCorrect,
          reflexao: ca.reflection,
        })),
        feedback: p.feedback
          ? {
              sePrepara: p.feedback.feelsPrepared,
              comentario: p.feedback.comment,
            }
          : null,
        evolucao: p.preTest && p.postTest
          ? p.postTest.score - p.preTest.score
          : null,
      })),
    });
  } catch (error) {
    console.error("Erro na API /api/participants:", error);
    return NextResponse.json(
      { error: "Erro ao buscar participantes." },
      { status: 500 }
    );
  }
}
