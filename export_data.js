const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function exportAll() {
  const participants = await prisma.participant.findMany({
    include: {
      preTest: true,
      postTest: true,
      caseAnswers: true,
      feedback: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  console.log(`[OK] Total de participantes no banco Supabase: ${participants.length}`);

  // JSON
  const jsonPath = path.join(__dirname, 'participantes_extensao.json');
  fs.writeFileSync(jsonPath, JSON.stringify(participants, null, 2), 'utf-8');

  // CSV
  const BOM = '\uFEFF';
  const header = 'Nome;Nota Pré-Teste;Nota Pós-Teste;Evolução;Se Sente Preparado;Comentário;Data';
  const rows = participants.map((p) => {
    const pre = p.preTest?.score ?? '';
    const post = p.postTest?.score ?? '';
    const evo = (p.preTest && p.postTest) ? (p.postTest.score - p.preTest.score) : '';
    const prep = p.feedback?.feelsPrepared ?? '';
    const com = (p.feedback?.comment ?? '').replace(/;/g, ',').replace(/\n/g, ' ');
    const data = new Date(p.createdAt).toLocaleString('pt-BR');
    return `${p.name || 'Anônimo'};${pre};${post};${evo};${prep};${com};${data}`;
  });

  const csvPath = path.join(__dirname, 'participantes_extensao.csv');
  fs.writeFileSync(csvPath, BOM + header + '\n' + rows.join('\n'), 'utf-8');
  console.log(`[OK] CSV salvo em: ${csvPath}`);
  console.log(`[OK] JSON salvo em: ${jsonPath}`);
}

exportAll()
  .catch((err) => {
    console.error('Erro na exportação:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
