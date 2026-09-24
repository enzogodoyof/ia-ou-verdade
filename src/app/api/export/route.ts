import { NextResponse } from "next/server";
import { prisma, checkDatabaseConnection } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");
    const format = searchParams.get("format") || "csv";

    const adminKey = process.env.ADMIN_KEY || "extensao2024";
    if (key !== adminKey) {
      return NextResponse.json(
        { error: "Acesso negado. Informe ?key=SUA_CHAVE" },
        { status: 401 }
      );
    }

    const isConnected = await checkDatabaseConnection();

    if (!isConnected) {
      // Retorna CSV vazio com cabeçalhos
      const emptyCSV = "Nome,Nota Pré-Teste,Nota Pós-Teste,Evolução,Se Sente Preparado,Comentário,Data\nSem dados - banco não conectado,,,,,, ";
      return new Response(emptyCSV, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="participantes_extensao_${new Date().toISOString().split("T")[0]}.csv"`,
        },
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

    if (format === "json") {
      const data = participants.map((p) => ({
        nome: p.name,
        notaPre: p.preTest?.score ?? "",
        notaPos: p.postTest?.score ?? "",
        evolucao: p.preTest && p.postTest ? p.postTest.score - p.preTest.score : "",
        sentePreparado: p.feedback?.feelsPrepared ?? "",
        comentario: p.feedback?.comment ?? "",
        acertosCasos: p.caseAnswers.filter((c) => c.isCorrect).length,
        totalCasos: p.caseAnswers.length,
        data: new Date(p.createdAt).toLocaleDateString("pt-BR"),
      }));

      return new Response(JSON.stringify(data, null, 2), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Disposition": `attachment; filename="participantes_extensao_${new Date().toISOString().split("T")[0]}.json"`,
        },
      });
    }

    // Formato CSV
    const BOM = "\uFEFF"; // BOM para Excel abrir UTF-8 corretamente
    const header = "Nome;Nota Pré-Teste;Nota Pós-Teste;Evolução;Acertos nos Casos;Total de Casos;Se Sente Preparado;Comentário;Data";
    const rows = participants.map((p) => {
      const pre = p.preTest?.score ?? "";
      const post = p.postTest?.score ?? "";
      const evo = p.preTest && p.postTest ? p.postTest.score - p.preTest.score : "";
      const acertos = p.caseAnswers.filter((c) => c.isCorrect).length;
      const total = p.caseAnswers.length;
      const preparado = p.feedback?.feelsPrepared ?? "";
      const comentario = (p.feedback?.comment ?? "").replace(/;/g, ",").replace(/\n/g, " ");
      const data = new Date(p.createdAt).toLocaleDateString("pt-BR");

      return `${p.name || "Anônimo"};${pre};${post};${evo};${acertos};${total};${preparado};${comentario};${data}`;
    });

    const csv = BOM + header + "\n" + rows.join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="participantes_extensao_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Erro na API /api/export:", error);
    return NextResponse.json(
      { error: "Erro ao exportar dados." },
      { status: 500 }
    );
  }
}
