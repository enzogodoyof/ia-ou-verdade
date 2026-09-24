# RELATÓRIO FINAL DO PROJETO DE EXTENSÃO UNIVERSITÁRIA

**Curso:** Bacharelado em Engenharia da Computação  
**Disciplina:** Projeto de Extensão Universitária  
**Tema Geral:** Ética na Comunicação e Responsabilidade Social na Era da Informação  
**Título do Projeto:** IA ou Verdade? Desinformação na Era da Inteligência Artificial  
**Público-Alvo:** Jovens e adultos, estudantes de ensino médio/técnico e usuários cotidianos de redes sociais  
**Período de Execução:** Primeiro Semestre de 2026  
**Carga Horária da Ação:** 60 minutos (Oficina Prática) + 20 horas de planejamento, pesquisa, desenvolvimento da plataforma tecnológica (Next.js + PostgreSQL), aplicação e análise de resultados.  

---

## 1. ETAPA 1 — ANÁLISE SITUACIONAL

### 1.1 Proposta da Disciplina e Apresentação do Local da Ação
A disciplina de Extensão Universitária propõe articular o conhecimento acadêmico, científico e tecnológico desenvolvido no curso superior com as demandas reais da comunidade externa. No presente trabalho, o foco estabelecido foi a reflexão crítica sobre a **Ética na Comunicação e a Responsabilidade Social na Era da Informação**.

A ação de extensão foi planejada para aplicação junto a uma instituição educacional / comunitária parceira (**Exemplo padrão:** *Escola Estadual de Ensino Médio / Centro Comunitário de Inclusão Digital*), contemplando jovens e adultos em idade escolar e produtiva que utilizam diariamente a internet, mensageiros instantâneos (WhatsApp, Telegram) e redes sociais (Instagram, TikTok, X/Twitter, YouTube). O espaço conta com conectividade à internet e permite a reunião presencial dos participantes portando seus próprios smartphones ou em laboratório de informática.

### 1.2 Justificativa da Escolha do Local
A escolha do ambiente educacional/comunitário justifica-se pelo fato de que este público está intensamente exposto ao fluxo contínuo de dados digitais, sendo frequentemente alvo e vetor involuntário de desinformação. Apesar da fluência técnica operacional no manuseio de aplicativos, constata-se uma carência expressiva em **letramento midiático (media literacy)** e em critérios metodológicos para discernir informações verídicas de conteúdos fabricados ou descontextualizados. A facilidade de acesso a esse público permite uma intervenção pedagógica direta e mensurável através de oficinas práticas.

### 1.3 Público-Alvo
Jovens a partir de 15 anos e adultos, usuários ativos de dispositivos móveis e mídias sociais. O projeto não exige formação técnica prévia em informática, pois a metodologia foi desenhada para promover o pensamento crítico acessível a qualquer cidadão.

### 1.4 Objetivos

#### 1.4.1 Objetivo Geral
Promover a conscientização cidadã sobre os impactos da desinformação potencializada por ferramentas de Inteligência Artificial Generativa, capacitando os participantes com técnicas acessíveis de verificação de fontes, fatos e mídias antes do compartilhamento digital.

#### 1.4.2 Objetivos Específicos
- Compreender a anatomia das *fake news* e os mecanismos algorítmicos que aceleram sua propagação nas redes sociais.
- Demonstrar as capacidades da Inteligência Artificial Generativa na criação de textos hiperconvincentes, imagens fotorrealistas e *deepfakes*.
- Capacitar os participantes no método de verificação **PARE** (**P**arar, **A**nalisar a fonte, **R**astrear evidências e **E**xaminar o contexto).
- Aplicar um ciclo de avaliação diagnóstica (pré-teste) e formativa (pós-teste) por meio de uma plataforma web interativa, quantificando a evolução do discernimento crítico dos participantes.
- Fomentar a cultura do compartilhamento responsável e a ética informacional na vida comunitária.

---

## 2. ETAPA 2 — O PROBLEMA E FUNDAMENTAÇÃO TEÓRICA

### 2.1 Apresentação do Problema
Vivemos um fenômeno contemporâneo denominado por sociólogos e comunicólogos como **Crise Informacional**. A facilidade sem precedentes de produzir e redistribuir conteúdos digitais resultou em uma sobrecarga cognitiva (infodestilação), na qual a pressa em noticiar em primeira mão e a busca por engajamento algorítmico superam o compromisso com a veracidade dos fatos.

Com a popularização massiva de ferramentas de **Inteligência Artificial Generativa** (LLMs, geradores fotorrealistas de imagens e sintetizadores de voz), a barreira técnica para produzir fraudes digitais foi virtualmente eliminada. Qualquer indivíduo mal-intencionado pode conceber, em questão de segundos:
1. Imagens hiper-realistas de eventos inexistentes;
2. Declarações falsas atribuídas a personalidades públicas com clonagem de voz (*deepfakes*);
3. Notícias simuladas com layout idêntico ao de portais de imprensa idôneos;
4. Falsas pesquisas científicas com dados fabricados que aparentam credibilidade acadêmica.

O problema central que motiva este projeto é: **Como capacitar usuários comuns da internet a reconhecer sinais de desinformação gerada por IA e desenvolver hábitos reflexivos de verificação antes de disseminar informações potencialmente lesivas?**

### 2.2 Fundamentação Teórica

A fundamentação teórica deste projeto estrutura-se sobre quatro pilares conceituais interdisciplinares:

#### A Sociedade em Rede e o Fluxo de Informação
Conforme assevera **Manuel Castells** em *A Sociedade em Rede* (1999), a tecnologia não determina a sociedade, mas a sociedade molda o uso das ferramentas tecnológicas. Na era da comunicação em rede, a informação tornou-se a matéria-prima sobre a qual as tecnologias atuam, invertendo a lógica dos meios de massa unidirecionais para a autocomunicação de massa. Nesse cenário, o indivíduo é simultaneamente consumidor e distribuidor de notícias.

#### A Crise da Pós-Verdade e Desinformação
Conforme relatório da **UNESCO** (*Jornalismo, Fake News e Desinformação*, 2018), a desinformação (*disinformation*) distingue-se do mero erro casual (*misinformation*) por carregar a intenção deliberada de ludibriar e manipular o debate público. Pesquisa seminal publicada pelo Instituto de Tecnologia de Massachusetts (**MIT**) por Vosoughi, Roy e Aral (revista *Science*, 2018) comprovou empiricamente que as notícias falsas espalham-se seis vezes mais rápido nas redes sociais do que as verdadeiras, impulsionadas primordialmente pela novidade e pelo apelo a emoções intensas como indignação e medo.

#### Inteligência Artificial Generativa e os Novos Desafios Éticos
O filósofo **Luciano Floridi** (2013), em seus estudos sobre a *Ética da Informação (Infosphere)*, adverte que agentes artificiais modificam a própria ecologia informacional humana. A geração automatizada de conteúdo artificial rompe o pacto tácito da evidência visual e auditiva: o clássico adágio popular *"ver para crer"* perdeu sua validade ontológica na era dos modelos generativos e das redes neurais convolucionais (GANs/Diffusion Models).

#### Letramento Midiático e Pensamento Crítico
Para **Paulo Freire** (*Pedagogia da Autonomia*, 1996), a leitura de mundo precede a leitura da palavra. A alfabetização digital no século XXI não se restringe à operação técnica do computador, mas exige a capacidade crítica de interpretar os interesses, as fontes e os contextos subjacentes às mensagens transmitidas. O método de checagem adaptado pelo projeto fundamenta-se nos princípios do *lateral reading* (leitura lateral) sistematizados pelo **Stanford History Education Group (SHEG)** de Sam Wineburg.

### 2.3 Resultados Esperados
Espera-se alcançar os seguintes impactos diretos e indiretos com a execução do projeto:
- **Aumento do Discernimento:** Elevação superior a 40% na média de acertos dos participantes na identificação de conteúdos sintéticos ou enganosos entre o pré-teste e o pós-teste.
- **Mudança Comportamental:** Que ao menos 80% dos participantes declarem intenção explícita de verificar a fonte e a data de publicações duvidosas antes de compartilhá-las em grupos familiares ou redes sociais.
- **Domínio Metodológico:** Assimilação prática do Método PARE como roteiro mental rápido para uso cotidiano.
- **Engajamento Acadêmico-Comunitário:** Validação de uma aplicação web aberta, gratuita e responsiva, passível de reutilização contínua por outros educadores e membros da sociedade.

---

## 3. ETAPA 3 — A SOLUÇÃO

### 3.1 Descrição da Solução Proposta
Para responder ao problema diagnosticado, foi concebida e desenvolvida a plataforma web educativa **"IA ou Verdade? — Desinformação na Era da Inteligência Artificial"**, construída sobre uma arquitetura moderna e responsiva utilizando **Next.js, Tailwind CSS e banco de dados PostgreSQL**.

A plataforma atua como suporte didático interativo para uma oficina presencial/híbrida estruturada em módulos sucessivos:
1. **Módulo de Entrada e Diagnóstico (Pré-teste):** Avaliação inicial em 5 questões objetivas que mensuram os hábitos correntes de checagem do participante.
2. **Módulo Didático (O Método PARE):** Apresentação dinâmica dos princípios:
   - **P — Pare antes de compartilhar:** Identificação de gatilhos emocionais (sensacionalismo, urgência falsa, apelo ao medo).
   - **A — Analise a fonte:** Reconhecimento de autoria, domínio, URL suspeita e histórico do veículo.
   - **R — Rastreie evidências:** Técnicas de busca reversa, cruzamento de dados em agências de checagem (*Lupa, Aos Fatos, Comprova*) e fontes primárias.
   - **E — Examine o contexto:** Checagem de datas originais, legendas truncadas e indícios visuais de artefatos de IA (iluminação inconsistente, detalhes anatômicos, fontes distorcidas).
3. **Módulo Prático (Simulador de Casos):** Análise em tempo real de casos simulados que intercalam notícias legítimas, manchetes sem embasamento, imagens sintéticas de IA e declarações forjadas, com devolutiva explicativa imediata.
4. **Módulo de Consolidação (Pós-teste & Feedback):** Reavaliação das competências e registro das impressões subjetivas.
5. **Dashboard de Métricas e Indicadores:** Painel administrativo analítico que consolida os resultados da turma, computa médias e exporta relatórios de desempenho.

### 3.2 Cronograma da Ação e Duração em Horas

#### 3.2.1 Carga Horária Global do Projeto de Extensão: 20 Horas
| Atividade | Carga Horária |
|---|:---:|
| 1. Diagnóstico do local, contato institucional e autorização via Ofício | 3 horas |
| 2. Pesquisa bibliográfica, levantamento de casos e fundamentação teórica | 4 horas |
| 3. Engenharia de software, desenvolvimento da plataforma web Next.js e PostgreSQL | 7 horas |
| 4. Aplicação presencial da Oficina "IA ou Verdade?" com o público-alvo | 2 horas |
| 5. Coleta de dados estatísticos, consolidação no Dashboard e elaboração do relatório final | 4 horas |
| **Total Global** | **20 horas** |

#### 3.2.2 Cronograma Detalhado da Execução da Oficina (60 Minutos)
| Bloco | Atividade | Duração |
|:---:|---|:---:|
| I | Abertura: Contextualização da Crise Informacional e Impacto da IA Generativa | 10 min |
| II | Aplicação Individual do Pré-teste Diagnóstico via Smartphone/Computador | 05 min |
| III | Exposição Interativa: O Método PARE e as Armadilhas da Desinformação | 15 min |
| IV | Dinâmica Prática: Desafio no Simulador de Casos (Verdade, Falso ou IA) | 15 min |
| V | Aplicação do Pós-teste de Consolidação e Coleta de Feedback Qualitativo | 05 min |
| VI | Encerramento: Apresentação dos Resultados Coletivos no Dashboard e Discussão Ética | 10 min |
| **Total** | **Oficina Completa** | **60 min** |

### 3.3 Metodologia de Realização da Ação
A ação adota os preceitos das **metodologias ativas de aprendizagem**, na qual o participante não é mero ouvinte passivo, mas atua como investigador ativo. A interação com o software educativo estimula a tentativa, o erro instrutivo e a reflexão imediata amparada pelo orientador da oficina.

### 3.4 Parceiros Envolvidos
- **Instituição de Ensino Superior:** Coordenação do Curso e Professor Orientador do Projeto de Extensão.
- **Instituição Receptora:** Direção e Corpo Docente da Escola Parceira / Liderança Comunitária.
- **Público Participante:** Estudantes e membros da comunidade local voluntários.

### 3.5 Data, Horário e Local de Realização
- **Data da Ação:** Primeiro semestre letivo de 2026 (data a ser pactuada conforme calendário escolar).
- **Horário:** Período vespertino/noturno (conforme disponibilidade da turma participante).
- **Local:** Sala Multimídia / Laboratório de Informática da Escola Parceira ou auditório comunitário.

---

## 4. ETAPA 4 — ACOMPANHAMENTO, EVOLUÇÃO E INDICADORES DE DESEMPENHO

### 4.1 Quantitativo de Participantes
- **Participantes Diretos na Oficina:** Amostra planejada de 20 a 35 participantes por turma/sessão.
- **Abrangência Futura (Beneficiários Indiretos):** Estimativa de 150 a 300 pessoas beneficiadas indiretamente através do efeito multiplicador (disseminação do conhecimento para círculos familiares e redes de amigos) e pelo acesso permanente da aplicação web pública hospedada na nuvem.

### 4.2 Indicadores de Desempenho e Metodologia de Cálculo

O acompanhamento da eficácia pedagógica da ação utilizou métricas quantitativas objetivas registradas automaticamente no banco de dados PostgreSQL da plataforma. Abaixo estão consolidados os dados empíricos apurados junto aos 11 participantes que completaram integralmente o ciclo formativo:

#### 4.2.1 Tabela Consolidada de Resultados Empíricos
| # | Participante | Nota Pré-Teste (0 a 5) | Nota Pós-Teste (0 a 5) | Evolução Absoluta ($\Delta$) | Evolução Relativa (%) | Percepção de Segurança |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
| 1 | **Gabi diniz** | 2,0 | 5,0 | +3,0 | +150,0% | Sim (Preparada) |
| 2 | **Maria Julia** | 2,0 | 3,0 | +1,0 | +50,0% | Sim (Preparada) |
| 3 | **Giovana** | 2,0 | 3,0 | +1,0 | +50,0% | Sim (Preparada) |
| 4 | **Yasmin** | 4,0 | 5,0 | +1,0 | +25,0% | Sim (Preparada) |
| 5 | **Malu** | 4,0 | 5,0 | +1,0 | +25,0% | Sim (Preparada) |
| 6 | **Claudemir** | 5,0 | 5,0 | 0,0 | Manteve 100% | Sim (Preparado) |
| 7 | **Rafaela** | 5,0 | 5,0 | 0,0 | Manteve 100% | Sim (Preparada) |
| 8 | **Farias** | 5,0 | 5,0 | 0,0 | Manteve 100% | Sim (Preparado) |
| 9 | **Lorena** | 5,0 | 5,0 | 0,0 | Manteve 100% | Sim (Preparada) |
| 10 | **Gisele** | 5,0 | 5,0 | 0,0 | Manteve 100% | Sim (Preparada) |
| 11 | **Marina farias** | 5,0 | 5,0 | 0,0 | Manteve 100% | Sim (Preparada) |
| — | **MÉDIA GERAL** | **4,00 / 5,0** | **4,64 / 5,0** | **+0,64** | **+15,9%** | **100,0% (11/11)** |

#### 4.2.2 Fórmulas e Apuração dos Indicadores
1. **Média do Pré-teste ($\bar{X}_{pré}$):**
   $$\bar{X}_{pré} = \frac{44}{11} = 4,00 \text{ pontos (80,0% de aproveitamento)}$$
2. **Média do Pós-teste ($\bar{X}_{pós}$):**
   $$\bar{X}_{pós} = \frac{51}{11} = 4,64 \text{ pontos (92,8% de aproveitamento)}$$
3. **Evolução Média Absoluta ($\Delta E$):**
   $$\Delta E = 4,64 - 4,00 = +0,64 \text{ pontos (+15,9% de ganho coletivo)}$$
4. **Taxa de Melhoria Efetiva ($TM\%$):**
   $$TM\% = \left( \frac{5}{11} \right) \times 100 = 45,5\%$$
   *(45,5% dos participantes elevaram sua nota, com destaques para saltos de até +150%; os demais 54,5% já apresentavam boa proficiência inicial e gabaritaram o pós-teste mantendo a nota máxima 5,0).*
5. **Índice de Percepção de Segurança Informacional ($IP\%$):**
   $$IP\% = \left( \frac{11}{11} \right) \times 100 = 100,0\%$$
   *(Totalidade unânime dos 11 participantes atestou que a oficina e o Método PARE trouxeram maior preparo e confiança para lidar com conteúdos suspeitos).*

### 4.3 Alinhamento com os Objetivos de Desenvolvimento Sustentável (ODS — ONU)

O projeto de extensão está diretamente alinhado às metas da **Agenda 2030 das Nações Unidas**, com foco explícito em:

#### ODS 4 — Educação de Qualidade
* **Meta 4.4 e 4.7:** O projeto desenvolve competências digitais essenciais, letramento informacional e pensamento analítico, preparando os cidadãos para interpretar criticamente as inovações tecnológicas e atuar de forma consciente na sociedade contemporânea.

#### ODS 16 — Paz, Justiça e Instituições Eficazes
* **Meta 16.10:** Garantir o acesso público à informação e proteger liberdades fundamentais. A desinformação enfraquece o debate democrático, corrói a confiança pública nas instituições científicas e sociais e incita a polarização extremista. Combater as *fake news* fortalece o tecido democrático comunitário.

#### ODS 9 — Indústria, Inovação e Infraestrutura
* **Meta 9.c:** Aumentar significativamente o acesso às tecnologias de informação e comunicação. O projeto emprega tecnologia nacional, aberta e moderna (Next.js, open source) para mitigar os efeitos adversos gerados pela própria inovação desenfreada (inteligência artificial generativa desprovida de crivo ético).

---

## 5. CONCLUSÃO E AUTOAVALIAÇÃO DA EXTENSÃO

A realização do projeto de extensão **"IA ou Verdade? Desinformação na Era da Inteligência Artificial"** demonstrou que a extensão universitária é o elo vital entre a formação técnica rigorosa do **Bacharelado em Engenharia da Computação** e a responsabilidade social do futuro engenheiro.

O engenheiro de computação projeta algoritmos, estruturas de redes neurais, arquiteturas distribuídas e sistemas de persistência relacional com **PostgreSQL**. Todavia, a técnica desprovida de senso ético e social pode potencializar distorções graves, como demonstrado pela proliferação desregulada de algoritmos de recomendação sensacionalistas e modelos generativos de desinformação.

Ao conceber uma plataforma web completa em **Next.js e PostgreSQL**, aplicar a metodologia do **Método PARE** e intervir diretamente junto à comunidade escolar e comunitária, a Engenharia da Computação cumpre seu compromisso ético fundamental (conforme preconizado pelas diretrizes curriculares do MEC e do Sistema CONFEA/CREA): colocar o avanço científico e computacional a serviço da dignidade humana, da verdade factual e do bem-estar social.

---

## 6. REFERÊNCIAS BIBLIOGRÁFICAS (NORMAS ABNT)

- CASTELLS, Manuel. **A Sociedade em Rede: A Era da Informação: Economia, Sociedade e Cultura**. Volume 1. São Paulo: Paz e Terra, 1999.
- FLORIDI, Luciano. **The Ethics of Information**. Oxford: Oxford University Press, 2013.
- FREIRE, Paulo. **Pedagogia da Autonomia: Saberes necessários à prática educativa**. São Paulo: Paz e Terra, 1996.
- LÉVY, Pierre. **Cibercultura**. São Paulo: Editora 34, 1999.
- ORGANIZAÇÃO DAS NAÇÕES UNIDAS (ONU). **Transformando Nosso Mundo: A Agenda 2030 para o Desenvolvimento Sustentável**. Nova York: Nações Unidas, 2015.
- POSSETTI, Julie; MATTHEWS, Alice. **Jornalismo, Fake News e Desinformação: Manual para Educação e Treinamento em Jornalismo**. Paris: UNESCO, 2018.
- VOSOUGHI, Soroush; ROY, Deb; ARAL, Sinan. **The spread of true and false news online**. Science, v. 359, n. 6380, p. 1146-1151, 2018.
- WINEBURG, Sam; MCGREW, Sarah. **Lateral Reading: Reading Less and Learning More When Evaluating Digital Information**. Stanford History Education Group Working Paper, Stanford University, 2017.
