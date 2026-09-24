import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "relatorio_extensao_completo.md");
    if (!fs.existsSync(filePath)) {
      return new NextResponse("Arquivo não encontrado", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": 'attachment; filename="relatorio_extensao_engenharia_computacao.md"',
        "Content-Type": "text/markdown; charset=utf-8",
      },
    });
  } catch (error) {
    return new NextResponse("Erro ao baixar documento", { status: 500 });
  }
}
