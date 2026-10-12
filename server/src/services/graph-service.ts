import { Pool } from 'pg';

export interface KnowledgeNodeRecord {
  id: string;
  disciplina_slug: string;
  theme_slug: string;
  label: string;
  category: string;
  summary: string;
  criteria: Array<{ roman: string; text: string }>;
  pitfalls: {
    versus_title?: string;
    warning?: string;
    practical_difference?: string;
  };
  court_theses: string[];
  timeline: Array<{ title: string; description: string; is_focal?: boolean }>;
  statute_badges: string[];
  related_case_id?: string;
  embedding?: number[];
}

export interface KnowledgeEdgeRecord {
  source_id: string;
  target_id: string;
  relation_type: string;
  weight?: number;
  description?: string;
}

export interface NeuralSearchResult {
  focalNode: KnowledgeNodeRecord;
  neighbors: Array<{ node: KnowledgeNodeRecord; relation: string }>;
  subgraph: {
    nodes: Array<{ id: string; label: string; category: string; theme_slug: string }>;
    edges: Array<{ source: string; target: string; relation: string }>;
  };
}

// Catálogo base de nós e arestas de alta precisão para concursos públicos
export const INITIAL_KNOWLEDGE_NODES: KnowledgeNodeRecord[] = [
  // ==========================================
  // DIREITO ADMINISTRATIVO
  // ==========================================
  {
    id: 'dialogo-competitivo',
    disciplina_slug: 'direito-administrativo',
    theme_slug: 'licitacoes',
    label: 'Diálogo Competitivo',
    category: 'instituto',
    summary: 'Modalidade para o objeto que a Administração ainda não sabe especificar: primeiro se dialoga com licitantes pré-selecionados até chegar à solução; só depois se colhem as propostas finais.',
    criteria: [
      { roman: 'I', text: 'Inovação tecnológica ou técnica, impossibilidade de definir especificações com precisão no mercado.' },
      { roman: 'II', text: 'Necessidade de definir as alternativas e a estrutura jurídica/financeira da contratação.' },
      { roman: 'III', text: 'Complexidade de objeto que impede os modos aberto e fechado ordinários.' }
    ],
    pitfalls: {
      versus_title: 'PMI (Procedimento de Manifestação de Interesse) vs. Diálogo Competitivo',
      warning: 'Vedado se a Administração já souber definir o objeto no Termo de Referência.',
      practical_difference: 'O PMI é pré-edital e por conta do particular; o Diálogo é modalidade já licitatória com comissão especial e sigilo das soluções.'
    },
    court_theses: [
      'Acórdão TCU Plenário nº 1.482/2023: Exigência de motivação técnica no ETP comprovando inviabilidade das modalidades comuns.',
      'Resolução CNJ 468/2022: Diretrizes para soluções de tecnologia e inovação no Poder Judiciário.'
    ],
    timeline: [
      { title: 'Edital de Chamamento', description: 'Mínimo de 25 dias úteis para manifestação de interesse.' },
      { title: 'Pré-seleção', description: 'Critérios objetivos e impessoais divulgados no edital.' },
      { title: 'Fase de Diálogos', description: 'Debates técnicos em ata e áudio/vídeo sob estrito sigilo de métodos.', is_focal: true },
      { title: 'Encerramento Fundamentado', description: 'Definição da solução técnica vencedora acolhida pelo órgão.' },
      { title: 'Propostas Finais', description: 'Prazo mínimo de 60 dias úteis para propostas comerciais definitivas.' },
      { title: 'Julgamento e Adjudicação', description: 'Critério de melhor combinação técnica e econômica.' }
    ],
    statute_badges: ['Lei 14.133/2021 · art. 6º, XLII', 'Lei 14.133/2021 · art. 32'],
    related_case_id: 'case-3-1'
  },
  {
    id: 'pregao-eletronico',
    disciplina_slug: 'direito-administrativo',
    theme_slug: 'licitacoes',
    label: 'Pregão Eletrônico',
    category: 'instituto',
    summary: 'Modalidade obrigatória para aquisição de bens e serviços comuns, cujo critério de julgamento é sempre menor preço ou maior desconto.',
    criteria: [
      { roman: 'I', text: 'Objeto com padrões de desempenho e qualidade objetivamente definidos por especificações usuais de mercado.' },
      { roman: 'II', text: 'Inversão cogente de fases: propostas julgadas antes da habilitação.' },
      { roman: 'III', text: 'Vedado para serviços técnicos de natureza predominantemente intelectual e obras de engenharia especiais.' }
    ],
    pitfalls: {
      versus_title: 'Serviço Comum de Engenharia vs. Obras Especiais',
      warning: 'Pregão não cabe para obras de grande vulto ou complexidade singular.',
      practical_difference: 'Serviços comuns de engenharia admitem pregão (Súmula 257/TCU); obras exigem concorrência.'
    },
    court_theses: [
      'Súmula 257/TCU: Cabimento do pregão para serviços comuns de engenharia.',
      'Tema 1.050/STF: A ampla competitividade veda exigências documentais desnecessárias.'
    ],
    timeline: [
      { title: 'Edital e Termo de Referência', description: 'Prazo de 8 dias úteis.' },
      { title: 'Sessão Pública', description: 'Disputa de lances.' },
      { title: 'Julgamento', description: 'Menor preço.', is_focal: true },
      { title: 'Habilitação', description: 'Apenas do 1º colocado.' },
      { title: 'Recursal Única', description: 'Manifestação motivada imediata.' },
      { title: 'Homologação', description: 'Ato da autoridade superior.' }
    ],
    statute_badges: ['Lei 14.133/2021 · art. 6º, XLI', 'Lei 14.133/2021 · art. 29'],
    related_case_id: 'case-3-1'
  },
  {
    id: 'inexigibilidade-licitacao',
    disciplina_slug: 'direito-administrativo',
    theme_slug: 'licitacoes',
    label: 'Inexigibilidade de Licitação',
    category: 'instituto',
    summary: 'Contratação direta quando há inviabilidade fática ou jurídica de competição entre fornecedores.',
    criteria: [
      { roman: 'I', text: 'Rol exemplificativo do art. 74 da Lei 14.133/2021.' },
      { roman: 'II', text: 'Fornecedor exclusivo, profissional de notória especialização ou artista consagrado.' },
      { roman: 'III', text: 'Dever de justificar o preço com a praxe de mercado e a razão da escolha.' }
    ],
    pitfalls: {
      versus_title: 'Inexigibilidade vs. Dispensa de Licitação',
      warning: 'Não confunda hipótese fática impossível com mera autorização legal.',
      practical_difference: 'Na inexigibilidade a disputa é impossível (art. 74); na dispensa a disputa é possível mas a lei autoriza não licitar (art. 75).'
    },
    court_theses: [
      'Súmula 252/TCU: A exclusividade de fornecedor deve ser comprovada por atestado idôneo.',
      'Súmula 39/TCU: A notória especialização dispensa a singularidade absoluta do objeto se houver serviço intelectual de confiança.'
    ],
    timeline: [
      { title: 'Formalização da Demanda', description: 'Necessidade pública.' },
      { title: 'Comprovação de Notoriedade', description: 'Currículo e histórico.', is_focal: true },
      { title: 'Justificativa de Preço', description: 'Contratos similares anteriores.' },
      { title: 'Parecer Jurídico', description: 'Controle de legalidade.' },
      { title: 'Publicação no PNCP', description: 'Eficácia em 10 dias úteis.' }
    ],
    statute_badges: ['Lei 14.133/2021 · art. 74'],
    related_case_id: 'case-3-1'
  },
  {
    id: 'convalidacao-ato',
    disciplina_slug: 'direito-administrativo',
    theme_slug: 'atos-administrativos',
    label: 'Convalidação do Ato Administrativo',
    category: 'instituto',
    summary: 'Aproveitamento de ato administrativo com vício sanável, com efeitos retroativos (ex tunc), preservando a segurança jurídica.',
    criteria: [
      { roman: 'I', text: 'Vício sanável exclusivo de Competência (não exclusiva) ou de Forma (não essencial).' },
      { roman: 'II', text: 'Ausência total de lesão ao interesse público e de prejuízo a terceiros de boa-fé.' },
      { roman: 'III', text: 'Ato que não tenha sido objeto de impugnação administrativa ou judicial prévia.' }
    ],
    pitfalls: {
      versus_title: 'Convalidação vs. Anulação vs. Revogação',
      warning: 'Vício de Motivo, Objeto ou Finalidade é INSANÁVEL e impõe anulação.',
      practical_difference: 'Convalidação corrige vício sanável (ex tunc); Anulação extingue ato ilegal (ex tunc); Revogação extingue ato lícito por conveniência (ex nunc).'
    },
    court_theses: [
      'Tema 525/STF: Dever de anular atos ilegais com resguardo da boa-fé e decadência quinquenal.',
      'Súmula 473/STF: A Administração pode anular seus próprios atos quando eivados de vícios.'
    ],
    timeline: [
      { title: 'Constatação do Vício', description: 'Competência não exclusiva ou forma não solene.' },
      { title: 'Exame de Terceiros', description: 'Verificação de inexistência de prejuízo.' },
      { title: 'Ato Convalidador', description: 'Ratificação pela autoridade competente.', is_focal: true },
      { title: 'Efeitos Retroativos', description: 'Preservação dos efeitos ex tunc da conduta.' }
    ],
    statute_badges: ['Lei 9.784/1999 · art. 55', 'LINDB · art. 20 e 21'],
    related_case_id: 'case-1-1'
  },
  {
    id: 'responsabilidade-objetiva-estado',
    disciplina_slug: 'direito-administrativo',
    theme_slug: 'responsabilidade-civil',
    label: 'Responsabilidade Civil do Estado',
    category: 'instituto',
    summary: 'Obrigação indenizatória estatal fundada na Teoria do Risco Administrativo (art. 37, § 6º da CF), prescindindo de comprovação de dolo ou culpa do agente público.',
    criteria: [
      { roman: 'I', text: 'Conduta comissiva estatal por agente público no exercício da função ou a pretexto dela.' },
      { roman: 'II', text: 'Dano patrimonial ou moral efetivo sofrido pelo particular.' },
      { roman: 'III', text: 'Nexo de causalidade direto entre a conduta administrativa e o resultado lesivo.' }
    ],
    pitfalls: {
      versus_title: 'Ação Comissiva (Objetiva) vs. Omissão Genérica (Subjetiva)',
      warning: 'Na omissão estatal genérica exige-se culpa do serviço (faute du service).',
      practical_difference: 'Omissão específica (Estado tinha dever concreto de agir e não agiu) gera responsabilidade objetiva; omissão genérica exige culpa.'
    },
    court_theses: [
      'Tema 940/STF: Ação indenizatória deve ser ajuizada contra o Estado; o agente só responde em regresso.',
      'Tema 592/STF: Responsabilidade objetiva em custódia de presos e estabelecimentos de saúde.'
    ],
    timeline: [
      { title: 'Evento Danoso', description: 'Ocorrência da lesão ao particular.' },
      { title: 'Demanda Indenizatória', description: 'Ajuizamento em face da pessoa jurídica de direito público.' },
      { title: 'Exame de Excludentes', description: 'Caso fortuito, força maior ou culpa exclusiva da vítima.', is_focal: true },
      { title: 'Condenação e Reparação', description: 'Pagamento mediante precatório ou RPV.' },
      { title: 'Ação de Regresso', description: 'Cobrança do servidor caso comprovado dolo ou culpa estrita.' }
    ],
    statute_badges: ['CF/88 · art. 37, § 6º', 'Código Civil · art. 43'],
    related_case_id: 'case-2-2'
  },

  // ==========================================
  // DIREITO CONSTITUCIONAL
  // ==========================================
  {
    id: 'controle-concentrado-constitucionalidade',
    disciplina_slug: 'direito-constitucional',
    theme_slug: 'controle-constitucionalidade',
    label: 'Controle Concentrado de Constitucionalidade',
    category: 'instituto',
    summary: 'Fiscalização abstrata da compatibilidade de leis e atos normativos perante a Constituição Federal, exercida originariamente perante o STF.',
    criteria: [
      { roman: 'I', text: 'Legitimados universais e especiais do art. 103 da Constituição Federal.' },
      { roman: 'II', text: 'Ato normativo primário pós-constitucional federal ou estadual perante a Carta Magna.' },
      { roman: 'III', text: 'Efeitos erga omnes, vinculantes e em regra retroativos (ex tunc), admitida modulação.' }
    ],
    pitfalls: {
      versus_title: 'Controle Difuso vs. Controle Concentrado',
      warning: 'No controle difuso qualquer juiz decide para as partes (inter partes).',
      practical_difference: 'O controle concentrado é abstrato e com efeito vinculante geral perante o STF.'
    },
    court_theses: [
      'ADI 4.029/STF: A modulação temporal de efeitos (art. 27 da Lei 9.868/99) exige quórum qualificado de 2/3.',
      'Súmula Vinculante 10: Reserva de Plenário para declaração incidental de inconstitucionalidade.'
    ],
    timeline: [
      { title: 'Petição Inicial', description: 'Indicação do preceito fundamental vulnerado por legitimado do art. 103.' },
      { title: 'Medida Cautelar', description: 'Suspensão da eficácia da norma com quórum de maioria absoluta.' },
      { title: 'Manifestação PGR e AGU', description: 'Atuação da Advocacia-Geral e Procuradoria-Geral da República.' },
      { title: 'Julgamento de Mérito', description: 'Declaração de procedência ou improcedência com eficácia vinculante.', is_focal: true }
    ],
    statute_badges: ['CF/88 · art. 102 e 103', 'Lei 9.868/1999'],
    related_case_id: 'case-const-1'
  },

  // ==========================================
  // DIREITO PENAL
  // ==========================================
  {
    id: 'teoria-crime-fato-tipico',
    disciplina_slug: 'direito-penal',
    theme_slug: 'teoria-crime',
    label: 'Estrutura Tripartida do Delito: Fato Típico',
    category: 'instituto',
    summary: 'Substrato nuclear da infração penal composto por conduta (dolosa/culposa), resultado naturalístico, nexo de causalidade e tipicidade material/formal.',
    criteria: [
      { roman: 'I', text: 'Conduta humana voluntária e consciente orientada a uma finalidade.' },
      { roman: 'II', text: 'Nexo causal nos termos da teoria da conditio sine qua non mitigada pela imputação objetiva.' },
      { roman: 'III', text: 'Tipicidade formal (enquadramento estrito na lei) e material (relevante lesão ao bem jurídico).' }
    ],
    pitfalls: {
      versus_title: 'Tipicidade Formal vs. Princípio da Insignificância (Material)',
      warning: 'Mesmo formalmente típico, o crime é excluído se a lesão for inexpressiva.',
      practical_difference: 'A insignificância exclui a tipicidade material (fato atípico), e não a culpabilidade ou ilicitude.'
    },
    court_theses: [
      'HC 84.412/STF: Vetores da insignificância (mínima ofensividade, nenhuma periculosidade social, reduzidíssimo grau de reprovabilidade e inexpressividade da lesão).',
      'Súmula 599/STJ: O princípio da insignificância é inaplicável aos crimes contra a administração pública.'
    ],
    timeline: [
      { title: 'Conduta', description: 'Ação ou omissão humana voluntária.' },
      { title: 'Nexo de Causalidade', description: 'Relação causal entre ação e resultado.' },
      { title: 'Tipicidade', description: 'Adequação formal e material à norma incriminadora.', is_focal: true },
      { title: 'Exame de Ilicitude', description: 'Legítima defesa, estado de necessidade, etc.' },
      { title: 'Culpabilidade', description: 'Imputabilidade, potencial consciência e exigibilidade.' }
    ],
    statute_badges: ['Código Penal · art. 13 a 18'],
    related_case_id: 'case-penal-1'
  },

  // ==========================================
  // DIREITO TRIBUTÁRIO
  // ==========================================
  {
    id: 'imunidades-tributarias',
    disciplina_slug: 'direito-tributario',
    theme_slug: 'tributos-especie',
    label: 'Imunidades Tributárias',
    category: 'instituto',
    summary: 'Limitações constitucionais ao poder de tributar que subtraem competência impositiva sobre entes federados, templos, partidos e livros (art. 150, VI da CF/88).',
    criteria: [
      { roman: 'I', text: 'Imunidade Recíproca (CF, art. 150, VI, a): veda impostos entre União, Estados, DF e Municípios.' },
      { roman: 'II', text: 'Imunidade Religiosa (CF, art. 150, VI, b): templos de qualquer culto, inclusive imóveis alugados (SV 52).' },
      { roman: 'III', text: 'Imunidade de Imprensa (CF, art. 150, VI, d): livros, periódicos e suportes eletrônicos (SV 57).' }
    ],
    pitfalls: {
      versus_title: 'Imunidade vs. Isenção',
      warning: 'Imunidade tem sede constitucional (incompetência); isenção tem sede legal ordinária (dispensa de pagamento).',
      practical_difference: 'A imunidade não pode ser revogada por lei; a isenção pode ser suprimida a qualquer tempo respeitada a anterioridade.'
    },
    court_theses: [
      'Súmula Vinculante 52: Imóveis de templos alugados mantêm imunidade se a renda for revertida aos fins institucionais.',
      'Súmula Vinculante 57: A imunidade do art. 150, VI, d abrange os e-books e leitores de livros digitais.'
    ],
    timeline: [
      { title: 'Previsão Constitucional', description: 'Delimitação de incompetência na Carta Magna.' },
      { title: 'Espécie Tributária', description: 'Alcança unicamente IMPOSTOS, não taxas ou contribuições de melhoria.', is_focal: true },
      { title: 'Reversão de Receitas', description: 'Aplicação integral nas finalidades institucionais da entidade.' },
      { title: 'Controle Fiscal', description: 'Declaração judicial ou administrativa de não incidência impositiva.' }
    ],
    statute_badges: ['CF/88 · art. 150, VI', 'Súmula Vinculante 52'],
    related_case_id: 'case-trib-1'
  },

  // ==========================================
  // PROCESSO CIVIL
  // ==========================================
  {
    id: 'tutela-urgencia-evidencia',
    disciplina_slug: 'direito-processo-civil',
    theme_slug: 'tutelas-provisorias',
    label: 'Tutelas Provisórias: Urgência e Evidência',
    category: 'instituto',
    summary: 'Garantia da efetividade da jurisdição cindida entre tutela de urgência (fumus boni iuris e periculum in mora) e tutela de evidência (probabilidade qualificada independente de perigo de dano).',
    criteria: [
      { roman: 'I', text: 'Tutela de Urgência (CPC, art. 300): probabilidade do direito e perigo de dano ou risco ao resultado útil.' },
      { roman: 'II', text: 'Tutela de Evidência (CPC, art. 311): independe de perigo de dano, exigindo prova documental e tese vinculante.' },
      { roman: 'III', text: 'Concessão Liminar: autorizada na urgência e nos incisos II e III do art. 311 da evidência.' }
    ],
    pitfalls: {
      versus_title: 'Tutela de Urgência vs. Tutela de Evidência',
      warning: 'A tutela de evidência NUNCA exige demonstração de perigo de dano.',
      practical_difference: 'Exigir periculum in mora na tutela de evidência é erro crasso reprovado por todas as bancas de concurso.'
    },
    court_theses: [
      'Enunciado 498 FPPC: A tutela da evidência fundada no art. 311, II pode ser deferida liminarmente.',
      'Tema 1.050/STJ: Ocorrência de estabilização da tutela antecedente se não interposto agravo de instrumento.'
    ],
    timeline: [
      { title: 'Requerimento', description: 'Petição inicial antecedente ou incidente no curso do feito.' },
      { title: 'Cognição Sumária', description: 'Exame de probabilidade documental ou de perigo iminente.', is_focal: true },
      { title: 'Decisão Interlocutória', description: 'Concessão com eficácia mandamental imediata.' },
      { title: 'Estabilização', description: 'Eficácia estável se ausente impugnação recursal nos termos do art. 304.' }
    ],
    statute_badges: ['CPC/2015 · art. 300', 'CPC/2015 · art. 311'],
    related_case_id: 'case-proc-1'
  }
];

export const INITIAL_KNOWLEDGE_EDGES: KnowledgeEdgeRecord[] = [
  // Arestas de Direito Administrativo (estritas à disciplina)
  {
    source_id: 'dialogo-competitivo',
    target_id: 'pregao-eletronico',
    relation_type: 'distingue_se_de',
    description: 'Diálogo é para objetos complexos/inovadores; Pregão é obrigatório para bens e serviços comuns.'
  },
  {
    source_id: 'dialogo-competitivo',
    target_id: 'inexigibilidade-licitacao',
    relation_type: 'distingue_se_de',
    description: 'Diálogo mantém competição aberta entre pré-selecionados; Inexigibilidade decorre de inviabilidade de disputa.'
  },
  {
    source_id: 'convalidacao-ato',
    target_id: 'responsabilidade-objetiva-estado',
    relation_type: 'instituto_conexo',
    description: 'Ambos integram o regime jurídico dos atos e da atuação administrativa estatal.'
  }
];

export class GraphService {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  /**
   * Seed automático do Knowledge Graph no banco de dados
   */
  public async seedKnowledgeGraph(): Promise<void> {
    const client = await this.pool.connect();
    try {
      console.log('[GraphService] Verificando e semeando Knowledge Graph...');

      for (const node of INITIAL_KNOWLEDGE_NODES) {
        await client.query(
          `
          INSERT INTO knowledge_nodes (
            id, disciplina_slug, theme_slug, label, category, summary,
            criteria, pitfalls, court_theses, timeline, statute_badges,
            related_case_id
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          ON CONFLICT (id) DO UPDATE SET
            label = EXCLUDED.label,
            summary = EXCLUDED.summary,
            criteria = EXCLUDED.criteria,
            pitfalls = EXCLUDED.pitfalls,
            court_theses = EXCLUDED.court_theses,
            timeline = EXCLUDED.timeline,
            statute_badges = EXCLUDED.statute_badges,
            related_case_id = EXCLUDED.related_case_id;
        `,
          [
            node.id,
            node.disciplina_slug,
            node.theme_slug,
            node.label,
            node.category,
            node.summary,
            JSON.stringify(node.criteria),
            JSON.stringify(node.pitfalls),
            JSON.stringify(node.court_theses),
            JSON.stringify(node.timeline),
            JSON.stringify(node.statute_badges),
            node.related_case_id || null
          ]
        );
      }

      for (const edge of INITIAL_KNOWLEDGE_EDGES) {
        await client.query(
          `
          INSERT INTO knowledge_edges (
            source_id, target_id, relation_type, weight, description
          ) VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (source_id, target_id, relation_type) DO NOTHING;
        `,
          [edge.source_id, edge.target_id, edge.relation_type, edge.weight || 1.0, edge.description || null]
        );
      }

      console.log('[GraphService] Knowledge Graph inicializado com sucesso.');
    } finally {
      client.release();
    }
  }

  /**
   * Normaliza slugs de disciplinas para compatibilidade estrita
   */
  private normalizeSlugs(slug: string): [string, string] {
    const clean = (slug || '').trim().toLowerCase();
    if (!clean) return ['', ''];
    if (clean.startsWith('direito-')) {
      return [clean, clean.replace(/^direito-/, '')];
    }
    return [`direito-${clean}`, clean];
  }

  /**
   * Busca Neural Híbrida: encontra nós de conhecimento e extrai subgrafo conectado
   */
  public async searchNeural(disciplinaSlug: string, query: string): Promise<NeuralSearchResult | null> {
    const cleanQuery = query.trim().toLowerCase();
    const [fullSlug, shortSlug] = this.normalizeSlugs(disciplinaSlug);

    // 1. Localiza nó focal por proximidade textual / unaccent restrito à matéria
    const nodeRes = await this.pool.query(
      `
      SELECT 
        id, disciplina_slug, theme_slug, label, category, summary,
        criteria, pitfalls, court_theses, timeline, statute_badges, related_case_id
      FROM knowledge_nodes
      WHERE (disciplina_slug = $1 OR disciplina_slug = $2 OR $1 = '' OR $1 = 'todas')
        AND (
          unaccent(label) ILIKE unaccent('%' || $3 || '%')
          OR unaccent(summary) ILIKE unaccent('%' || $3 || '%')
          OR unaccent(id) ILIKE unaccent('%' || $3 || '%')
        )
      ORDER BY 
        CASE 
          WHEN unaccent(label) ILIKE unaccent($3) THEN 1
          WHEN unaccent(label) ILIKE unaccent($3 || '%') THEN 2
          ELSE 3
        END
      LIMIT 1;
    `,
      [fullSlug, shortSlug, cleanQuery]
    );

    if (nodeRes.rows.length === 0) {
      // Se não encontrar correspondência na disciplina solicitada, retorna null (não desvia para outra matéria)
      return null;
    }

    return this.buildResultForNode(nodeRes.rows[0]);
  }

  private async buildResultForNode(focalNodeRow: any): Promise<NeuralSearchResult> {
    const nodeId = focalNodeRow.id;

    // Busca arestas e vizinhos diretos (Knowledge Graph traversal de 1 salto)
    const edgesRes = await this.pool.query(
      `
      SELECT 
        e.source_id, e.target_id, e.relation_type, e.description,
        n.id as neighbor_id, n.label as neighbor_label, n.category as neighbor_category,
        n.summary as neighbor_summary, n.criteria as neighbor_criteria,
        n.pitfalls as neighbor_pitfalls, n.court_theses as neighbor_court_theses,
        n.timeline as neighbor_timeline, n.statute_badges as neighbor_statute_badges,
        n.theme_slug as neighbor_theme_slug, n.disciplina_slug as neighbor_disciplina_slug,
        n.related_case_id as neighbor_related_case_id
      FROM knowledge_edges e
      JOIN knowledge_nodes n ON (n.id = CASE WHEN e.source_id = $1 THEN e.target_id ELSE e.source_id END)
      WHERE e.source_id = $1 OR e.target_id = $1;
    `,
      [nodeId]
    );

    const neighbors = edgesRes.rows.map(r => ({
      node: {
        id: r.neighbor_id,
        disciplina_slug: r.neighbor_disciplina_slug,
        theme_slug: r.neighbor_theme_slug,
        label: r.neighbor_label,
        category: r.neighbor_category,
        summary: r.neighbor_summary,
        criteria: r.neighbor_criteria,
        pitfalls: r.neighbor_pitfalls,
        court_theses: r.neighbor_court_theses,
        timeline: r.neighbor_timeline,
        statute_badges: r.neighbor_statute_badges,
        related_case_id: r.neighbor_related_case_id
      },
      relation: r.relation_type
    }));

    const subgraphNodes = [
      { id: focalNodeRow.id, label: focalNodeRow.label, category: focalNodeRow.category, theme_slug: focalNodeRow.theme_slug },
      ...neighbors.map(nb => ({
        id: nb.node.id,
        label: nb.node.label,
        category: nb.node.category,
        theme_slug: nb.node.theme_slug
      }))
    ];

    const subgraphEdges = edgesRes.rows.map(r => ({
      source: r.source_id,
      target: r.target_id,
      relation: r.relation_type
    }));

    return {
      focalNode: focalNodeRow,
      neighbors,
      subgraph: {
        nodes: subgraphNodes,
        edges: subgraphEdges
      }
    };
  }

  /**
   * Retorna a topologia do grafo de uma disciplina
   */
  public async getGraphTopology(disciplinaSlug: string) {
    const [fullSlug, shortSlug] = this.normalizeSlugs(disciplinaSlug);

    const nodesRes = await this.pool.query(
      `SELECT id, label, category, theme_slug, summary, disciplina_slug FROM knowledge_nodes WHERE disciplina_slug = $1 OR disciplina_slug = $2 OR $1 = ''`,
      [fullSlug, shortSlug]
    );

    const nodeIds = nodesRes.rows.map(r => r.id);

    if (nodeIds.length === 0) {
      return {
        nodes: [],
        edges: []
      };
    }

    const edgesRes = await this.pool.query(
      `SELECT source_id, target_id, relation_type, weight, description 
       FROM knowledge_edges 
       WHERE source_id = ANY($1) AND target_id = ANY($1)`,
      [nodeIds]
    );

    return {
      nodes: nodesRes.rows,
      edges: edgesRes.rows
    };
  }
}
