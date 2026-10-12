import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { PRACTICE_CASES_DATA } from './client/src/data/practice-cases.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Catálogo com metadados estruturais para os 16 capítulos doutrinários
const CHAPTER_METADATA_MAP: Record<
  number,
  {
    title: string;
    subtitle: string;
    analyticalEmenta: string;
    readingTimeMinutes: number;
    axisId: string;
    relatedConceptId?: string;
    relatedCaseId?: string;
  }
> = {
  1: {
    title: 'Direito Administrativo e Regime Jurídico-Administrativo',
    subtitle: 'Origens dogmáticas, fontes normativas e o binômio prerrogativas-sujeições',
    analyticalEmenta:
      'A gênese do Estado de Direito e a distinção entre governar e administrar. O regime jurídico-administrativo como sistema fundado sobre dois pilares mestres: a supremacia do interesse público (prerrogativas) e a indisponibilidade do interesse público (sujeições). Princípios constitucionais expressos (art. 37, caput) e princípios implícitos da ordem administrativa.',
    readingTimeMinutes: 25,
    axisId: 'axis-1',
    relatedConceptId: 'c-regime-juridico',
    relatedCaseId: 'case-1-1'
  },
  2: {
    title: 'Poderes e Deveres da Administração Pública',
    subtitle: 'Vinculação, discricionariedade, poder regulamentar e a patologia do abuso de poder',
    analyticalEmenta:
      'Natureza jurídica dos poderes administrativos como poderes-deveres irrenunciáveis. O espectro entre atos vinculados e atos discricionários: mérito administrativo, limites normativos e controle de razoabilidade. Poder hierárquico (delegação e avocação). Poder disciplinar perante vínculos especiais. Teoria do abuso de poder: desvio de finalidade versus excesso de poder.',
    readingTimeMinutes: 20,
    axisId: 'axis-1',
    relatedConceptId: 'c-poderes-adm',
    relatedCaseId: 'case-1-2'
  },
  3: {
    title: 'Poder de Polícia Administrativa',
    subtitle: 'Conceito positivo, atributos executórios, limites constitucionais e delegação',
    analyticalEmenta:
      'A atividade de contenção e disciplina de direitos individuais em prol da convivência coletiva e da segurança pública. Conceito dogmático nos termos do art. 78 do Código Tributário Nacional. Atributos clássicos: discricionariedade, autoexecutoriedade e coercibilidade. Distinção entre polícia administrativa e polícia judiciária. A controvérsia sobre a delegação a empresas estatais.',
    readingTimeMinutes: 20,
    axisId: 'axis-2',
    relatedConceptId: 'c-poder-policia',
    relatedCaseId: 'case-2-1'
  },
  4: {
    title: 'Teoria Geral do Ato Administrativo',
    subtitle: 'Elementos constitutivos, atributos, vícios de legalidade, convalidação e extinção',
    analyticalEmenta:
      'A anatomia do ato administrativo unilateral. Os cinco elementos de validade: Competência, Finalidade, Forma, Motivo e Objeto. Os atributos da presunção de legitimidade, autoexecutoriedade, tipicidade e imperatividade. A Teoria dos Motivos Determinantes. O regime das nulidades: vícios sanáveis e insanáveis. Convalidação retroativa (ex tunc), anulação (ex tunc) e revogação (ex nunc).',
    readingTimeMinutes: 30,
    axisId: 'axis-1',
    relatedConceptId: 'c-elementos-ato',
    relatedCaseId: 'case-1-1'
  },
  5: {
    title: 'Contratos Administrativos',
    subtitle: 'Cláusulas exorbitantes, equilíbrio econômico-financeiro e a teoria da imprevisão',
    analyticalEmenta:
      'A natureza bilateral dos ajustes celebrados pela Administração sob regime de direito público. As cláusulas exorbitantes: modificação unilateral, rescisão unilateral, fiscalização, sanções diretas e ocupação temporária. A intangibilidade constitucional da equação econômico-financeira (art. 37, XXI da CF). Diferenças entre reajuste por índices, repactuação e revisão extraordinária.',
    readingTimeMinutes: 25,
    axisId: 'axis-3',
    relatedConceptId: 'c-contratos-equilibrio',
    relatedCaseId: 'case-3-1'
  },
  6: {
    title: 'Licitações Públicas (Nova Lei 14.133)',
    subtitle: 'Princípios fundamentais, modalidades, critérios de julgamento e contratação direta',
    analyticalEmenta:
      'O regime unificado das licitações sob a égide da Lei 14.133/2021. Princípios norteadores: planejamento, segregação de funções e competitividade. Modalidades vigentes: Pregão, Concorrência, Diálogo Competitivo, Concurso e Leilão. A extinção formal de Tomada de Preços e Convite. Contratação Direta: Inexigibilidade de licitação (inviabilidade de competição) versus Dispensa de licitação (viabilidade da disputa com autorização normativa expressa).',
    readingTimeMinutes: 30,
    axisId: 'axis-3',
    relatedConceptId: 'c-licitacoes-principios',
    relatedCaseId: 'case-3-2'
  },
  7: {
    title: 'Serviços Públicos e Regime Tarifário',
    subtitle: 'Conceito positivo, princípios setoriais e a distinção entre taxa e tarifa',
    analyticalEmenta:
      'A titularidade estatal na prestação de utilidades aos cidadãos. Princípios do serviço público: continuidade, modicidade tarifária, generalidade e atualidade. Classificação dos serviços públicos: uti singuli versus uti universi. A controvérsia sobre a remuneração: natureza jurídica de taxa (tributo vinculado compulsório) versus tarifa ou preço público (remuneração contratual facultativa). Legalidade da interrupção do serviço por inadimplemento.',
    readingTimeMinutes: 20,
    axisId: 'axis-3',
    relatedConceptId: 'c-concessoes-servicos'
  },
  8: {
    title: 'Concessões, Permissões e Parcerias Público-Privadas',
    subtitle: 'Modalidades de delegação, equação do parceiro privado e formas de extinção',
    analyticalEmenta:
      'Regime jurídico da concessão comum (Lei 8.987/1995) e das Parcerias Público-Privadas (Lei 11.079/2004: PPP Patrocinada e PPP Administrativa). As formas jurídicas de extinção antecipada da concessão: Encampação (retomada por interesse público com prévia lei e indenização), Caducidade (extinção punitiva por inadimplemento culposo da concessionária), Rescisão e Anulação.',
    readingTimeMinutes: 25,
    axisId: 'axis-3',
    relatedConceptId: 'c-concessoes-servicos'
  },
  9: {
    title: 'Organização Administrativa do Estado',
    subtitle:
      'Centralização, desconcentração, descentralização e o regime da Administração Indireta',
    analyticalEmenta:
      'A estrutura orgânica da Administração Pública brasileira. Centralização versus Descentralização (política e administrativa). Desconcentração como técnica de partição interna de competências em órgãos sem personalidade jurídica. A Administração Pública Indireta: Autarquias, Fundações Públicas, Empresas Públicas e Sociedades de Economia Mista. O Terceiro Setor (OS, OSCIP e parcerias).',
    readingTimeMinutes: 25,
    axisId: 'axis-1',
    relatedConceptId: 'c-regime-juridico'
  },
  10: {
    title: 'Responsabilidade Civil do Estado',
    subtitle:
      'Evolução dogmática, Teoria do Risco Administrativo, dano por omissão e ação regressiva',
    analyticalEmenta:
      'Da irresponsabilidade feudal à consagração constitucional da responsabilidade objetiva (art. 37, § 6º da CF). A Teoria do Risco Administrativo e seus três pressupostos inafastáveis: conduta oficial, dano certo e nexo causal direto. Causas excludentes da responsabilidade estatal. A responsabilidade por condutas omissivas: Teoria da Falta do Serviço (faute du service). O direito de regresso contra o agente culpado.',
    readingTimeMinutes: 25,
    axisId: 'axis-2',
    relatedConceptId: 'c-responsabilidade-civil',
    relatedCaseId: 'case-2-2'
  },
  11: {
    title: 'Regime Jurídico dos Servidores Públicos',
    subtitle:
      'Classificação dos agentes, investidura, estabilidade constitucional e regime disciplinar',
    analyticalEmenta:
      'A distinção entre agentes políticos, servidores públicos estatutários e empregados públicos celetistas. Concurso público e suas diretrizes constitucionais. A aquisição da estabilidade após 3 anos de efetivo exercício e avaliação de desempenho. Hipóteses constitucionais de perda do cargo público estável. Processo Administrativo Disciplinar (PAD): princípios do devido processo legal, composição da comissão processante e garantias de defesa.',
    readingTimeMinutes: 30,
    axisId: 'axis-1',
    relatedConceptId: 'c-pad-estabilidade',
    relatedCaseId: 'case-1-2'
  },
  12: {
    title: 'Intervenção do Estado na Propriedade Privada',
    subtitle:
      'Modalidades restritivas e supressivas: servidão, requisição, tombamento e limitações',
    analyticalEmenta:
      'A função social da propriedade e as formas de intervenção pública. Intervenções restritivas (que mantêm o domínio nas mãos do particular): servidão administrativa, requisição administrativa em perigo público iminente, ocupação temporária, tombamento de patrimônio histórico-cultural e limitações administrativas gerais. Comparativo de institutos e regime indenizatório.',
    readingTimeMinutes: 20,
    axisId: 'axis-2',
    relatedConceptId: 'c-propriedade-desapropriacao'
  },
  13: {
    title: 'Desapropriação e Soberania Territorial',
    subtitle: 'Fases declaratória e executória, justa indenização, tredestinação e retrocessão',
    analyticalEmenta:
      'Forma originária de aquisição da propriedade pelo Poder Público. Pressupostos: necessidade pública, utilidade pública ou interesse social. O princípio da justa e prévia indenização em dinheiro e as exceções constitucionais de títulos da dívida pública. A fase declaratória por decreto expropriatório e a fase executória. A tredestinação lícita versus tredestinação ilícita e o direito de retrocessão.',
    readingTimeMinutes: 25,
    axisId: 'axis-2',
    relatedConceptId: 'c-propriedade-desapropriacao'
  },
  14: {
    title: 'Atuação do Estado no Domínio Econômico e Regulação',
    subtitle:
      'Monopólio constitucional, exploração direta da atividade econômica e agências reguladoras',
    analyticalEmenta:
      'Os princípios da ordem econômica constitucional (art. 170 da CF). A atuação do Estado como agente normativo e regulador da atividade econômica versus exploração direta em caráter excepcional (art. 173 da CF: relevante interesse coletivo ou imperativo de segurança nacional). O poder normativo técnico das agências reguladoras autárquicas e seus limites perante a lei.',
    readingTimeMinutes: 20,
    axisId: 'axis-3',
    relatedConceptId: 'c-concessoes-servicos'
  },
  15: {
    title: 'Controle da Administração Pública e Improbidade',
    subtitle:
      'Autotutela, controle pelos Tribunais de Contas, remédios constitucionais e a Lei 14.230',
    analyticalEmenta:
      'A fiscalização da atividade administrativa sob a ótica dos Poderes da República. Autotutela e prazo decadencial quinquenal (art. 54 da Lei 9.784/1999). Controle Externo: competências constitucionais dos Tribunais de Contas e limites cautelares. Controle Judicial: Mandado de Segurança, Ação Popular e Ação Civil Pública. O regime da Nova Lei de Improbidade Administrativa (Lei 14.230/2021) e a revogação da modalidade culposa.',
    readingTimeMinutes: 30,
    axisId: 'axis-4',
    relatedConceptId: 'c-autotutela',
    relatedCaseId: 'case-4-1'
  },
  16: {
    title: 'Regime Jurídico dos Bens Públicos',
    subtitle: 'Classificação tripartida, afetação e desafetação, regime protetivo e uso privativo',
    analyticalEmenta:
      'O patrimônio das pessoas jurídicas de direito público. A classificação do Código Civil (art. 99): bens de uso comum do povo, bens de uso especial e bens dominicais. O fenômeno da afetação e desafetação. As prerrogativas de proteção: inalienabilidade dos bens afetados, impenhorabilidade, imprescritibilidade (vedação absoluta de usucapião) e não onerabilidade. O uso privativo de bens públicos por particulares.',
    readingTimeMinutes: 20,
    axisId: 'axis-2',
    relatedConceptId: 'c-bens-publicos'
  }
};

interface StoredTopic {
  id: string;
  disciplinaId: string;
  number: number;
  numeroTema: number;
  numero_tema: number;
  title: string;
  titulo: string;
  subtitle: string;
  subtitulo: string;
  analyticalEmenta: string;
  ementaAnalitica: string;
  ementa_analitica: string;
  readingTimeMinutes: number;
  tempoEstimadoMin: number;
  tempo_estimado_min: number;
  axisId: string;
  eixo: string;
  ordem: number;
  conteudoMarkdown: string;
  conteudo_markdown: string;
  relatedCaseId?: string;
  related_case_id?: string;
  relatedConceptId?: string;
  related_concept_id?: string;
}

// Ingestão e carga em memória dos 16 capítulos da doutrina
function loadDoctrinesFromDisk(): StoredTopic[] {
  const doctrineDir = path.resolve(__dirname, 'doutrina_direito_administrativo');
  if (!fs.existsSync(doctrineDir)) {
    console.warn(`[NOMOS] Diretório de doutrina não encontrado em ${doctrineDir}`);
    return [];
  }

  const files = fs.readdirSync(doctrineDir).filter(f => f.endsWith('.md'));
  const topics: StoredTopic[] = [];

  for (const file of files) {
    const match = file.match(/capitulo-(\d+)/i);
    if (!match) continue;
    const numeroTema = parseInt(match[1], 10);
    const meta = CHAPTER_METADATA_MAP[numeroTema];
    const fullPath = path.join(doctrineDir, file);
    const rawContent = fs.readFileSync(fullPath, 'utf-8');

    const titulo = meta?.title || `Capítulo ${numeroTema}`;
    const subtitulo = meta?.subtitle || '';
    const ementaAnalitica = meta?.analyticalEmenta || subtitulo;
    const readingTimeMinutes =
      meta?.readingTimeMinutes || Math.max(15, Math.round(rawContent.length / 3000));
    const axisId = meta?.axisId || 'axis-1';
    const topicId = `doc-cap-${numeroTema}`;

    topics.push({
      id: topicId,
      disciplinaId: 'direito-administrativo',
      number: numeroTema,
      numeroTema,
      numero_tema: numeroTema,
      title: titulo,
      titulo,
      subtitle: subtitulo,
      subtitulo,
      analyticalEmenta: ementaAnalitica,
      ementaAnalitica,
      ementa_analitica: ementaAnalitica,
      readingTimeMinutes,
      tempoEstimadoMin: readingTimeMinutes,
      tempo_estimado_min: readingTimeMinutes,
      axisId,
      eixo: axisId,
      ordem: numeroTema,
      conteudoMarkdown: rawContent,
      conteudo_markdown: rawContent,
      relatedCaseId: meta?.relatedCaseId,
      related_case_id: meta?.relatedCaseId,
      relatedConceptId: meta?.relatedConceptId,
      related_concept_id: meta?.relatedConceptId
    });
  }

  topics.sort((a, b) => a.number - b.number);
  return topics;
}

const MEMORY_TOPICS = loadDoctrinesFromDisk();
console.log(`[NOMOS] Ingeridos ${MEMORY_TOPICS.length} capítulos doutrinários em memória.`);

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // 1. Healthcheck
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  // 2. Disciplinas
  app.get('/api/disciplinas', (_req, res) => {
    res.json([
      {
        id: 1,
        slug: 'direito-administrativo',
        nome: 'Direito Administrativo',
        icone: 'Scale'
      }
    ]);
  });

  // 3. Temas de uma disciplina (sem payload de markdown pesado na listagem)
  app.get('/api/disciplinas/:slug/temas', (req, res) => {
    const { slug } = req.params;
    if (slug !== 'direito-administrativo') {
      return res.status(404).json({ error: `Disciplina '${slug}' não encontrada` });
    }

    const q = (req.query.q as string || '').trim().toLowerCase();

    let filtered = MEMORY_TOPICS;
    if (q) {
      filtered = MEMORY_TOPICS.filter(t => {
        const titleMatch = t.title.toLowerCase().includes(q);
        const subMatch = t.subtitle.toLowerCase().includes(q);
        const ementaMatch = t.analyticalEmenta.toLowerCase().includes(q);
        const contentMatch = t.conteudoMarkdown.toLowerCase().includes(q);
        return titleMatch || subMatch || ementaMatch || contentMatch;
      });
    }

    // Retorna resumo sem o conteudoMarkdown pesado
    const summaries = filtered.map(({ conteudoMarkdown, conteudo_markdown, ...rest }) => rest);
    res.json(summaries);
  });

  // 4. Tema individual completo com texto markdown integral
  app.get('/api/temas/:id', (req, res) => {
    const { id } = req.params;
    const topic = MEMORY_TOPICS.find(t => t.id === id || String(t.number) === id);

    if (!topic) {
      return res.status(404).json({ error: `Tema com id '${id}' não encontrado` });
    }

    res.json(topic);
  });

  // 5. Casos práticos simulados
  app.get('/api/casos', (_req, res) => {
    res.json(PRACTICE_CASES_DATA);
  });

  // 6. Caso prático individual
  app.get('/api/casos/:id', (req, res) => {
    const { id } = req.params;
    const item = PRACTICE_CASES_DATA.find(c => c.id === id);
    if (!item) {
      return res.status(404).json({ error: `Caso prático '${id}' não encontrado` });
    }
    res.json(item);
  });

  // Servidor Frontend (Vite em dev, estático em prod)
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      root: path.resolve(__dirname, 'client'),
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const clientDist = path.resolve(__dirname, 'client/dist');
    app.use(express.static(clientDist));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(clientDist, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`🏛️ NOMOS — Studio Jurídico operacional em http://${HOST}:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[NOMOS] Erro fatal na inicialização:', err);
  process.exit(1);
});
