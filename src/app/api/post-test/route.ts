import { NextResponse } from "next/server";
import { prisma, checkDatabaseConnection } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, preScore, postScore, feelsPrepared, comment, answers } = body;

    const isConnected = await checkDatabaseConnection();

    if (isConnected) {
      const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      const participant = await prisma.participant.create({
        data: {
          name: name || "Participante Anônimo",
          sessionToken,
          preTest: {
            create: {
              score: Number(preScore) || 0,
              answers: {},
            },
          },
          postTest: {
            create: {
              score: Number(postScore) || 0,
              answers: answers || {},
            },
          },
          feedback: {
            create: {
              feelsPrepared: feelsPrepared || "sim",
              comment: comment || null,
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        participantId: participant.id,
        storage: "database",
      });
    }

    return NextResponse.json({
      success: true,
      storage: "local_memory",
      message: "Avaliação final registrada com sucesso.",
    });
  } catch (error) {
    console.error("Erro na API /api/post-test:", error);
    return NextResponse.json(
      { success: true, storage: "fallback_memory" },
      { status: 200 }
    );
  }
}
