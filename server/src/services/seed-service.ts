import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../config/db.js';
import { initSchema } from '../schema.js';
import { PRACTICE_CASES_DATA } from '../data/initial-cases.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Catálogo com metadados estruturais e curadoria para os 16 capítulos clássicos
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

/**
 * Localiza o diretório onde os arquivos .md da doutrina residem
 */
function findDoctrineDirectory(): string {
  const candidates = [
    process.env.DOCTRINES_DIR,
    '/app/doutrinas/administrativo',
    path.resolve(process.cwd(), '../doutrina_direito_administrativo'),
    path.resolve(process.cwd(), 'doutrina_direito_administrativo'),
    path.resolve(__dirname, '../../../doutrina_direito_administrativo'),
    path.resolve(__dirname, '../../../../doutrina_direito_administrativo')
  ].filter(Boolean) as string[];

  for (const dir of candidates) {
    if (fs.existsSync(dir)) {
      const mdFiles = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
      if (mdFiles.length > 0) {
        return dir;
      }
    }
  }

  throw new Error(
    `Nenhum diretório de doutrina válido encontrado. Candidatos verificados: ${candidates.join(', ')}`
  );
}

/**
 * Parser de arquivo .md de doutrina
 */
interface ParsedChapter {
  numeroTema: number;
  titulo: string;
  subtitulo: string;
  ementaAnalitica: string;
  tempoEstimadoMin: number;
  eixo: string;
  conteudoMarkdown: string;
  relatedCaseId?: string;
  relatedConceptId?: string;
}

function parseMarkdownFile(filePath: string): ParsedChapter {
  const filename = path.basename(filePath);
  const rawContent = fs.readFileSync(filePath, 'utf-8');

  // Extrai número do capítulo pelo nome do arquivo (ex: capitulo-1, capitulo-10)
  const capMatch = filename.match(/capitulo-(\d+)/i) || rawContent.match(/Capítulo\s+(\d+)/i);
  const numeroTema = capMatch ? parseInt(capMatch[1], 10) : 1;

  // Busca metadados catalogados como base rica
  const meta = CHAPTER_METADATA_MAP[numeroTema];

  let titulo = meta?.title || `Capítulo ${numeroTema}`;
  let subtitulo = meta?.subtitle || '';
  let ementaAnalitica = meta?.analyticalEmenta || '';
  const tempoEstimadoMin =
    meta?.readingTimeMinutes || Math.max(15, Math.round(rawContent.length / 3000));
  const eixo = meta?.axisId || 'axis-1';

  // Se não houver metadado catálogo, tenta extrair do cabeçalho do arquivo
  if (!meta) {
    const lines = rawContent.split('\n').filter(l => l.trim().length > 0);
    for (const line of lines.slice(0, 10)) {
      const matchTitle = line.match(/Capítulo\s+\d+:\s*([^\.]+)\.\s*(.*)/i);
      if (matchTitle) {
        titulo = matchTitle[1].trim();
        subtitulo = matchTitle[2].trim();
        break;
      }
    }
    ementaAnalitica = subtitulo || `Estudo aprofundado do Tema ${numeroTema}`;
  }

  return {
    numeroTema,
    titulo,
    subtitulo,
    ementaAnalitica,
    tempoEstimadoMin,
    eixo,
    conteudoMarkdown: rawContent,
    relatedCaseId: meta?.relatedCaseId,
    relatedConceptId: meta?.relatedConceptId
  };
}

export async function runSeed(): Promise<void> {
  console.log('🏛️ NOMOS — Ingestão Automatizada de Doutrina e Casos (Seed)');
  console.log('============================================================\n');

  // 1. Inicializa schema
  await initSchema();

  const client = await pool.connect();
  try {
    // 2. Garante disciplina de Direito Administrativo
    console.log('[SEED] Semeando disciplina: direito-administrativo...');
    const discRes = await client.query(`
      INSERT INTO disciplinas (slug, nome, icone)
      VALUES ('direito-administrativo', 'Direito Administrativo', 'Scale')
      ON CONFLICT (slug) DO UPDATE SET nome = EXCLUDED.nome, icone = EXCLUDED.icone
      RETURNING id;
    `);
    const disciplinaId = discRes.rows[0].id;
    console.log(`[SEED] Disciplina ID: ${disciplinaId}`);

    // 3. Lê pasta de doutrina
    const doctrineDir = findDoctrineDirectory();
    console.log(`[SEED] Diretório de doutrina localizado: ${doctrineDir}`);
    const files = fs.readdirSync(doctrineDir).filter(f => f.endsWith('.md'));
    console.log(`[SEED] Arquivos .md identificados: ${files.length}\n`);

    let insertedTemas = 0;
    for (const file of files) {
      const fullPath = path.join(doctrineDir, file);
      const parsed = parseMarkdownFile(fullPath);
      const topicId = `doc-cap-${parsed.numeroTema}`;

      await client.query(
        `
        INSERT INTO temas (
          id, disciplina_id, numero_tema, titulo, subtitulo,
          tempo_estimado_min, eixo, ementa_analitica, conteudo_markdown,
          ordem, related_case_id, related_concept_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (id) DO UPDATE SET
          disciplina_id = EXCLUDED.disciplina_id,
          numero_tema = EXCLUDED.numero_tema,
          titulo = EXCLUDED.titulo,
          subtitulo = EXCLUDED.subtitulo,
          tempo_estimado_min = EXCLUDED.tempo_estimado_min,
          eixo = EXCLUDED.eixo,
          ementa_analitica = EXCLUDED.ementa_analitica,
          conteudo_markdown = EXCLUDED.conteudo_markdown,
          ordem = EXCLUDED.ordem,
          related_case_id = EXCLUDED.related_case_id,
          related_concept_id = EXCLUDED.related_concept_id
      `,
        [
          topicId,
          disciplinaId,
          parsed.numeroTema,
          parsed.titulo,
          parsed.subtitulo,
          parsed.tempoEstimadoMin,
          parsed.eixo,
          parsed.ementaAnalitica,
          parsed.conteudoMarkdown,
          parsed.numeroTema,
          parsed.relatedCaseId || null,
          parsed.relatedConceptId || null
        ]
      );

      console.log(
        `  ✅ Tema ${parsed.numeroTema < 10 ? '0' + parsed.numeroTema : parsed.numeroTema}: ${parsed.titulo} (${(parsed.conteudoMarkdown.length / 1024).toFixed(1)} KB)`
      );
      insertedTemas++;
    }

    // 4. Semeia casos práticos
    console.log(`\n[SEED] Semeando casos práticos (${PRACTICE_CASES_DATA.length} casos)...`);
    let insertedCasos = 0;
    for (const c of PRACTICE_CASES_DATA) {
      await client.query(
        `
        INSERT INTO casos_praticos (
          id, disciplina_id, codigo_processo, titulo, dificuldade, status,
          relatorio_fatos, dilema_central, alternativas, axis_id,
          assigned_role, institutional_context, night_vision_hint, compatibility_rules
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT (id) DO UPDATE SET
          disciplina_id = EXCLUDED.disciplina_id,
          codigo_processo = EXCLUDED.codigo_processo,
          titulo = EXCLUDED.titulo,
          dificuldade = EXCLUDED.dificuldade,
          status = EXCLUDED.status,
          relatorio_fatos = EXCLUDED.relatorio_fatos,
          dilema_central = EXCLUDED.dilema_central,
          alternativas = EXCLUDED.alternativas,
          axis_id = EXCLUDED.axis_id,
          assigned_role = EXCLUDED.assigned_role,
          institutional_context = EXCLUDED.institutional_context,
          night_vision_hint = EXCLUDED.night_vision_hint,
          compatibility_rules = EXCLUDED.compatibility_rules
      `,
        [
          c.id,
          disciplinaId,
          c.caseNumber,
          c.title,
          c.difficulty,
          'ativo',
          c.briefing,
          c.legalProblem,
          JSON.stringify(c.availableDecisions),
          c.axisId,
          c.assignedRole,
          c.institutionalContext,
          c.nightVisionHint,
          JSON.stringify(c.compatibilityRules)
        ]
      );
      console.log(`  ⚖️ Caso ${c.id}: ${c.title} [${c.caseNumber}]`);
      insertedCasos++;
    }

    console.log(
      `\n✨ Ingestão concluída com êxito! ${insertedTemas} temas e ${insertedCasos} casos persistidos no PostgreSQL.\n`
    );
  } finally {
    client.release();
  }
}
