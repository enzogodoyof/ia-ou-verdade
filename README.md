# IA ou Verdade? — Desinformação na Era da Inteligência Artificial

> **Projeto de Extensão Universitária**  
> **Tema:** Ética na Comunicação e Responsabilidade Social na Era da Informação  
> **Stack:** Next.js 14 (App Router, TypeScript), Tailwind CSS, Lucide React, PostgreSQL & Prisma ORM.

---

## 🎯 Sobre o Projeto

Este projeto de extensão une tecnologia de ponta e pedagogia crítica para combater a crise informacional provocada pela disseminação massiva de notícias falsas (*fake news*), manipulação de dados e mídias sintéticas criadas por Inteligência Artificial Generativa (*deepfakes*, imagens fotorrealistas e clonagem de voz).

A aplicação web interativa serve de suporte didático para uma oficina presencial/híbrida de 60 minutos com jovens e adultos, capacitando-os no **Método PARE**:
- **P — Pare antes de compartilhar** (contenção de gatilhos emocionais);
- **A — Analise a fonte** (leitura lateral, checagem de domínio e autoria);
- **R — Rastreie evidências** (busca reversa de imagens, dados oficiais e agências de checagem);
- **E — Examine o contexto** (descontextualização temporal/geográfica e artefatos de IA).

---

## 🌍 Alinhamento com as ODS da ONU (Agenda 2030)

- **ODS 4 — Educação de Qualidade (Metas 4.4 e 4.7):** Promoção do letramento digital, pensamento crítico e alfabetização midiática.
- **ODS 16 — Paz, Justiça e Instituições Eficazes (Meta 16.10):** Defesa do acesso fidedigno à informação e proteção ao debate democrático.
- **ODS 9 — Indústria, Inovação e Infraestrutura (Meta 9.c):** Uso consciente e ético de novas tecnologias de inteligência artificial.

---

## 🚀 Como Executar Localmente

### 1. Pré-requisitos
- Node.js 18+ instalado.
- npm ou yarn.

### 2. Instalação e Execução
```bash
# Clone ou acesse o diretório do projeto
cd E:/projetodeextensao

# As dependências já estão instaladas, mas se necessário:
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse no navegador: **`http://localhost:3000`**

> **Nota de Resiliência:** O sistema funciona perfeitamente mesmo sem um servidor PostgreSQL rodando localmente (ele utiliza armazenamento local resiliente no navegador e dados de demonstração no dashboard). Quando o banco PostgreSQL for conectado, o sistema salvará os dados diretamente nas tabelas relacionais.

---

## 🗄️ Conexão com o PostgreSQL

Caso deseje conectar a um banco PostgreSQL local ou na nuvem (Supabase, Neon ou Vercel Postgres):

1. Abra o arquivo `.env` e configure sua `DATABASE_URL`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ia_ou_verdade?schema=public"
```

2. Sincronize o schema com o banco:
```bash
npx prisma db push
```

---

## ☁️ Como Fazer Deploy na Vercel

1. Suba o código para um repositório no seu GitHub/GitLab.
2. Acesse [vercel.com](https://vercel.com) e crie um **New Project** importando o repositório.
3. Nas configurações do projeto na Vercel:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
4. Na aba **Storage**, você pode criar um banco **Vercel Postgres (ou Neon/Supabase)** com 1 clique e vincular automaticamente a variável de ambiente `DATABASE_URL`.
5. Clique em **Deploy**.

---

## 📂 Estrutura de Documentos Acadêmicos no Projeto

- 📄 `relatorio_extensao_completo.md`: Relatório acadêmico completo com as 4 Etapas regimentais (Análise Situacional, O Problema, A Solução, Acompanhamento/ODS e Referências ABNT).
- 📄 `oficio_apresentacao_preenchido.md`: Modelo pronto do Ofício de Apresentação e Termo de Autorização para a instituição parceira assinar.
- 📄 `projeto_extensao_fake_news_ia.md`: O escopo detalhado original do projeto de extensão.
