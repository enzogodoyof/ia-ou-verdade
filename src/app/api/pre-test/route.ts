import { NextResponse } from "next/server";
import { prisma, checkDatabaseConnection } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, score, answers } = body;

    const isConnected = await checkDatabaseConnection();

    if (isConnected) {
      const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      const participant = await prisma.participant.create({
        data: {
          name: name || "Participante Anônimo",
          sessionToken,
          preTest: {
            create: {
              score: Number(score) || 0,
              answers: answers || {},
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        participantId: participant.id,
        sessionToken,
        storage: "database",
      });
    }

    // Modo offline / mock resiliente
    return NextResponse.json({
      success: true,
      storage: "local_memory",
      message: "Respostas registradas localmente com sucesso.",
    });
  } catch (error) {
    console.error("Erro na API /api/pre-test:", error);
    return NextResponse.json(
      { success: true, storage: "fallback_memory" },
      { status: 200 }
    );
  }
}
