import { NextResponse } from "next/server";
import { prisma, checkDatabaseConnection } from "@/lib/prisma";
import { INITIAL_DEMO_METRICS } from "@/lib/data/mockData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const isConnected = await checkDatabaseConnection();

    if (!isConnected) {
      return NextResponse.json(INITIAL_DEMO_METRICS);
    }

    const participants = await prisma.participant.findMany({
      include: {
        preTest: true,
        postTest: true,
        feedback: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (participants.length === 0) {
      return NextResponse.json(INITIAL_DEMO_METRICS);
    }

    let totalPre = 0;
    let totalPost = 0;
    let improvedCount = 0;
    let preparedCount = 0;
    let validPairs = 0;

    const recentSubmissions = participants.slice(0, 10).map((p) => {
      const pre = p.preTest?.score ?? 0;
      const post = p.postTest?.score ?? 0;
      const evo = post - pre;

      if (p.preTest && p.postTest) {
        totalPre += pre;
        totalPost += post;
        validPairs++;
        if (post > pre) improvedCount++;
      }

      if (p.feedback?.feelsPrepared === "sim") {
        preparedCount++;
      }

      return {
        name: p.name || "Participante Anônimo",
        preScore: pre,
        postScore: post,
        evolution: evo,
        date: new Date(p.createdAt).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });

    const count = validPairs || participants.length || 1;
    const avgPre = Number((totalPre / count).toFixed(1));
    const avgPost = Number((totalPost / count).toFixed(1));
    const improvementRate = Number(((improvedCount / count) * 100).toFixed(1));
    const preparedRate = Number(((preparedCount / (participants.length || 1)) * 100).toFixed(1));

    return NextResponse.json({
      totalParticipants: participants.length,
      avgPreScore: avgPre || INITIAL_DEMO_METRICS.avgPreScore,
      avgPostScore: avgPost || INITIAL_DEMO_METRICS.avgPostScore,
      evolutionAbsolute: Number((avgPost - avgPre).toFixed(1)),
      improvementRatePercentage: improvementRate || INITIAL_DEMO_METRICS.improvementRatePercentage,
      preparedRatePercentage: preparedRate || INITIAL_DEMO_METRICS.preparedRatePercentage,
      odsAlignment: INITIAL_DEMO_METRICS.odsAlignment,
      recentSubmissions: recentSubmissions.length > 0 ? recentSubmissions : INITIAL_DEMO_METRICS.recentSubmissions,
    });
  } catch (error) {
    console.error("Erro na API /api/stats:", error);
    return NextResponse.json(INITIAL_DEMO_METRICS);
  }
}
