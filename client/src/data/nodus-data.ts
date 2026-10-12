export interface DisciplineNode {
  id: string;
  name: string;
  cluster: 'centro' | 'publico' | 'privado' | 'processo';
  clusterLabel: string;
  clusterRoman: string;
  x: string;
  y: string;
  driftClass: 'f1' | 'f2' | 'f3';
  themeCount?: number;
  isImplemented: boolean;
}

export interface ThemeNode {
  id: string;
  name: string;
  x: string;
  y: string;
  driftClass: 'f1' | 'f2' | 'f3';
  isHighlighted?: boolean;
  ctaText?: string;
  tagline?: string;
}

export interface SuggestionNode {
  id: string;
  name: string;
  x: string;
  y: string;
  driftClass: 'f1' | 'f2' | 'f3';
  query: string;
}

export interface TimelineStage {
  title: string;
  description: string;
  badge?: string;
  isFocal?: boolean;
}

export interface RomanRequirementCard {
  roman: string;
  text: string;
}

export interface SourceItem {
  id: string;
  title: string;
  citation: string;
  type: 'lei' | 'doutrina' | 'jurisprudencia';
  excerpt: string;
  authorOrCourt: string;
}

export interface TopicDossier {
  id: string;
  disciplineId: string;
  themeId: string;
  title: string;
  titleItalicWord: string;
  subtitle: string;
  statuteBadges: string[];
  requirementsHeading: string;
  requirements: RomanRequirementCard[];
  timelineHeading: string;
  timeline: TimelineStage[];
  controversyHeading: string;
  controversyStatement: string;
  controversyPositions: string[];
  practicalConsequence: string;
  sourcesHeading: string;
  sources: SourceItem[];
  neighbors: { id: string; name: string }[];
  relatedCaseId?: string;
}

// ==========================================
// CONSTELAÇÃO MACRO DE DISCIPLINAS (NÍVEL 1)
// ==========================================
export const NODUS_DISCIPLINES: DisciplineNode[] = [
  // MATRIZ CENTRAL (CENTRO GRAVITACIONAL)
  {
    id: 'constitucional',
    name: 'Constitucional',
    cluster: 'centro',
    clusterLabel: 'Matriz Constitucional',
    clusterRoman: '★',
    x: '50%',
    y: '45%',
    driftClass: 'f3',
    themeCount: 8,
    isImplemented: true
  },

  // I. DIREITO PÚBLICO
  {
    id: 'administrativo',
    name: 'Administrativo',
    cluster: 'publico',
    clusterLabel: 'Direito público',
    clusterRoman: 'I',
    x: '15%',
    y: '29%',
    driftClass: 'f1',
    themeCount: 11,
    isImplemented: true
  },
  {
    id: 'tributario',
    name: 'Tributário',
    cluster: 'publico',
    clusterLabel: 'Direito público',
    clusterRoman: 'I',
    x: '33%',
    y: '31%',
    driftClass: 'f2',
    themeCount: 4,
    isImplemented: true
  },
  {
    id: 'eleitoral',
    name: 'Eleitoral',
    cluster: 'publico',
    clusterLabel: 'Direito público',
    clusterRoman: 'I',
    x: '22%',
    y: '47%',
    driftClass: 'f3',
    themeCount: 0,
    isImplemented: false
  },

  // II. DIREITO PRIVADO
  {
    id: 'civil',
    name: 'Civil',
    cluster: 'privado',
    clusterLabel: 'Direito privado',
    clusterRoman: 'II',
    x: '68%',
    y: '30%',
    driftClass: 'f2',
    themeCount: 0,
    isImplemented: false
  },
  {
    id: 'empresarial',
    name: 'Empresarial',
    cluster: 'privado',
    clusterLabel: 'Direito privado',
    clusterRoman: 'II',
    x: '85%',
    y: '28%',
    driftClass: 'f3',
    themeCount: 0,
    isImplemented: false
  },
  {
    id: 'consumidor',
    name: 'Consumidor',
    cluster: 'privado',
    clusterLabel: 'Direito privado',
    clusterRoman: 'II',
    x: '82%',
    y: '44%',
    driftClass: 'f1',
    themeCount: 0,
    isImplemented: false
  },
  {
    id: 'trabalho',
    name: 'Trabalho',
    cluster: 'privado',
    clusterLabel: 'Direito privado',
    clusterRoman: 'II',
    x: '67%',
    y: '47%',
    driftClass: 'f2',
    themeCount: 0,
    isImplemented: false
  },

  // III. PROCESSO E GARANTIAS
  {
    id: 'penal',
    name: 'Penal',
    cluster: 'processo',
    clusterLabel: 'Processo e garantias',
    clusterRoman: 'III',
    x: '27%',
    y: '80%',
    driftClass: 'f3',
    themeCount: 6,
    isImplemented: true
  },
  {
    id: 'processo-penal',
    name: 'Processo Penal',
    cluster: 'processo',
    clusterLabel: 'Processo e garantias',
    clusterRoman: 'III',
    x: '41%',
    y: '86%',
    driftClass: 'f1',
    themeCount: 0,
    isImplemented: false
  },
  {
    id: 'processo-civil',
    name: 'Processo Civil',
    cluster: 'processo',
    clusterLabel: 'Processo e garantias',
    clusterRoman: 'III',
    x: '58%',
    y: '86%',
    driftClass: 'f2',
    themeCount: 4,
    isImplemented: true
  },
  {
    id: 'direitos-humanos',
    name: 'Direitos Humanos',
    cluster: 'processo',
    clusterLabel: 'Processo e garantias',
    clusterRoman: 'III',
    x: '73%',
    y: '80%',
    driftClass: 'f3',
    themeCount: 0,
    isImplemented: false
  }
];

export const FAINT_PERIPHERAL_NODES = [
  { name: 'Coord. I', x: '6%', y: '11%', driftClass: 'f1' as const },
  { name: 'Coord. II', x: '92%', y: '10%', driftClass: 'f2' as const },
  { name: 'Coord. III', x: '4%', y: '50%', driftClass: 'f3' as const },
  { name: 'Coord. IV', x: '95%', y: '50%', driftClass: 'f1' as const },
  { name: 'Coord. V', x: '7%', y: '90%', driftClass: 'f2' as const },
  { name: 'Coord. VI', x: '93%', y: '90%', driftClass: 'f3' as const }
];

// ==========================================
// TEMAS POR DISCIPLINA (NÍVEL 2)
// ==========================================

export const CONSTITUCIONAL_THEMES: ThemeNode[] = [
  {
    id: 'controle-constitucionalidade',
    name: 'Controle de Constitucionalidade',
    x: '50%',
    y: '17%',
    driftClass: 'f1',
    isHighlighted: true,
    ctaText: 'abrir →',
    tagline: 'Sistemas difuso e concentrado, ADI, ADC, ADPF e modulação'
  },
  {
    id: 'direitos-fundamentais',
    name: 'Direitos e Garantias Fundamentais',
    x: '66.2%',
    y: '22.2%',
    driftClass: 'f2'
  },
  {
    id: 'organizacao-estado',
    name: 'Organização do Estado e Federalismo',
    x: '77.3%',
    y: '36.3%',
    driftClass: 'f3'
  },
  {
    id: 'poder-executivo',
    name: 'Poder Executivo e Presidencialismo',
    x: '79.7%',
    y: '54.7%',
    driftClass: 'f1'
  },
  {
    id: 'poder-legislativo',
    name: 'Processo Legislativo',
    x: '72.7%',
    y: '71.6%',
    driftClass: 'f2'
  },
  {
    id: 'poder-judiciario',
    name: 'Poder Judiciário e Súmulas Vinculantes',
    x: '58.5%',
    y: '81.7%',
    driftClass: 'f3'
  },
  {
    id: 'acoes-constitucionais',
    name: 'Remédios Constitucionais (MS, HC, MI)',
    x: '41.5%',
    y: '81.7%',
    driftClass: 'f1'
  },
  {
    id: 'ordem-economica',
    name: 'Ordem Econômica e Social',
    x: '27.3%',
    y: '71.6%',
    driftClass: 'f2'
  }
];

export const ADMINISTRATIVE_THEMES: ThemeNode[] = [
  {
    id: 'principios-poderes',
    name: 'Princípios e poderes',
    x: '50%',
    y: '17%',
    driftClass: 'f1'
  },
  {
    id: 'atos-administrativos',
    name: 'Atos administrativos',
    x: '66.2%',
    y: '22.2%',
    driftClass: 'f2',
    isHighlighted: true,
    ctaText: 'abrir →',
    tagline: 'Convalidação, vícios de competência e teoria dos motivos'
  },
  {
    id: 'licitacoes',
    name: 'Licitações',
    x: '77.3%',
    y: '36.3%',
    driftClass: 'f3',
    isHighlighted: true,
    ctaText: 'abrir →',
    tagline: 'Lei 14.133/2021 e regimes de contratação pública'
  },
  {
    id: 'contratos-administrativos',
    name: 'Contratos administrativos',
    x: '79.7%',
    y: '54.7%',
    driftClass: 'f1'
  },
  {
    id: 'servicos-publicos',
    name: 'Serviços públicos e concessões',
    x: '72.7%',
    y: '71.6%',
    driftClass: 'f2'
  },
  {
    id: 'agentes-publicos',
    name: 'Agentes públicos',
    x: '58.5%',
    y: '81.7%',
    driftClass: 'f3'
  },
  {
    id: 'responsabilidade-civil',
    name: 'Responsabilidade civil do Estado',
    x: '41.5%',
    y: '81.7%',
    driftClass: 'f1',
    isHighlighted: true,
    ctaText: 'abrir →',
    tagline: 'Teoria do risco administrativo e faute du service'
  },
  {
    id: 'improbidade-administrativa',
    name: 'Improbidade administrativa',
    x: '27.3%',
    y: '71.6%',
    driftClass: 'f2'
  },
  {
    id: 'bens-publicos',
    name: 'Bens públicos e intervenção',
    x: '20.3%',
    y: '54.7%',
    driftClass: 'f3'
  },
  {
    id: 'controle-administracao',
    name: 'Controle da Administração',
    x: '22.7%',
    y: '36.3%',
    driftClass: 'f1'
  },
  {
    id: 'processo-administrativo',
    name: 'Processo administrativo',
    x: '33.8%',
    y: '22.2%',
    driftClass: 'f2'
  }
];

export const PENAL_THEMES: ThemeNode[] = [
  {
    id: 'teoria-crime',
    name: 'Teoria Geral do Delito (Fato Típico)',
    x: '50%',
    y: '17%',
    driftClass: 'f1',
    isHighlighted: true,
    ctaText: 'abrir →',
    tagline: 'Conduta, tipicidade formal e material, imputação objetiva'
  },
  {
    id: 'ilicitude-culpabilidade',
    name: 'Ilicitude e Culpabilidade',
    x: '66.2%',
    y: '22.2%',
    driftClass: 'f2'
  },
  {
    id: 'teoria-penas',
    name: 'Aplicação e Dosimetria da Pena',
    x: '77.3%',
    y: '36.3%',
    driftClass: 'f3'
  },
  {
    id: 'crimes-administracao',
    name: 'Crimes Contra a Adm. Pública',
    x: '79.7%',
    y: '54.7%',
    driftClass: 'f1'
  },
  {
    id: 'crimes-patrimonio',
    name: 'Crimes Contra o Patrimônio',
    x: '72.7%',
    y: '71.6%',
    driftClass: 'f2'
  },
  {
    id: 'extincao-punibilidade',
    name: 'Prescrição e Extinção da Punibilidade',
    x: '41.5%',
    y: '81.7%',
    driftClass: 'f3'
  }
];

export const TRIBUTARIO_THEMES: ThemeNode[] = [
  {
    id: 'sistema-tributario',
    name: 'Sistema Tributário e Princípios',
    x: '50%',
    y: '17%',
    driftClass: 'f1'
  },
  {
    id: 'imunidades-tributarias',
    name: 'Imunidades e Isenções',
    x: '66.2%',
    y: '22.2%',
    driftClass: 'f2',
    isHighlighted: true,
    ctaText: 'abrir →',
    tagline: 'Imunidade recíproca, templos, livros e mídias eletrônicas'
  },
  {
    id: 'credito-tributario',
    name: 'Crédito Tributário (Suspensão e Extinção)',
    x: '77.3%',
    y: '36.3%',
    driftClass: 'f3'
  },
  {
    id: 'competencia-tributaria',
    name: 'Competência e Repartição de Receitas',
    x: '58.5%',
    y: '81.7%',
    driftClass: 'f1'
  }
];

export const PROCESSO_CIVIL_THEMES: ThemeNode[] = [
  {
    id: 'tutelas-provisorias',
    name: 'Tutelas Provisórias (Urgência e Evidência)',
    x: '50%',
    y: '17%',
    driftClass: 'f1',
    isHighlighted: true,
    ctaText: 'abrir →',
    tagline: 'Fumus boni iuris, periculum in mora e reversibilidade'
  },
  {
    id: 'teoria-processo',
    name: 'Normas Fundamentais e Competência',
    x: '66.2%',
    y: '22.2%',
    driftClass: 'f2'
  },
  {
    id: 'recursos-civis',
    name: 'Recursos e Precedentes Vinculantes',
    x: '77.3%',
    y: '36.3%',
    driftClass: 'f3'
  },
  {
    id: 'execucao-civil',
    name: 'Cumprimento de Sentença e Execução',
    x: '58.5%',
    y: '81.7%',
    driftClass: 'f1'
  }
];


export const DISCIPLINE_THEMES_MAP: Record<string, ThemeNode[]> = {
  'constitucional': CONSTITUCIONAL_THEMES,
  'administrativo': ADMINISTRATIVE_THEMES,
  'penal': PENAL_THEMES,
  'tributario': TRIBUTARIO_THEMES,
  'processo-civil': PROCESSO_CIVIL_THEMES
};

// ==========================================
// SUGESTÕES TEMÁTICAS DINÂMICAS (NÍVEL 3)
// ==========================================

export const LICITACOES_SUGGESTIONS: SuggestionNode[] = [
  {
    id: 'dialogo-competitivo',
    name: 'Diálogo competitivo',
    x: '14%',
    y: '31%',
    driftClass: 'f1',
    query: 'diálogo competitivo'
  },
  {
    id: 'pregao-eletronico',
    name: 'Pregão eletrônico',
    x: '86%',
    y: '31%',
    driftClass: 'f2',
    query: 'pregão eletrônico'
  },
  {
    id: 'inexigibilidade-licitacao',
    name: 'Inexigibilidade de licitação',
    x: '12%',
    y: '71%',
    driftClass: 'f3',
    query: 'inexigibilidade de licitação notória especialização'
  },
  {
    id: 'contratacao-direta',
    name: 'Dispensa de licitação',
    x: '88%',
    y: '71%',
    driftClass: 'f1',
    query: 'dispensa de licitação art 75'
  }
];

export const ATOS_SUGGESTIONS: SuggestionNode[] = [
  {
    id: 'convalidacao-ato',
    name: 'Convalidação do ato',
    x: '14%',
    y: '31%',
    driftClass: 'f1',
    query: 'convalidação de ato vício sanável de competência'
  },
  {
    id: 'anulacao-revogacao',
    name: 'Anulação vs. Revogação',
    x: '86%',
    y: '31%',
    driftClass: 'f2',
    query: 'anulação e revogação súmula 473'
  },
  {
    id: 'motivos-determinantes',
    name: 'Motivos determinantes',
    x: '12%',
    y: '71%',
    driftClass: 'f3',
    query: 'teoria dos motivos determinantes'
  },
  {
    id: 'atributos-ato',
    name: 'Presunção de legitimidade',
    x: '88%',
    y: '71%',
    driftClass: 'f1',
    query: 'atributos autoexecutoriedade tipicidade'
  }
];

export const RESPONSABILIDADE_SUGGESTIONS: SuggestionNode[] = [
  {
    id: 'responsabilidade-objetiva-estado',
    name: 'Risco administrativo',
    x: '14%',
    y: '31%',
    driftClass: 'f1',
    query: 'responsabilidade civil do Estado art 37 § 6'
  },
  {
    id: 'omissao-faute',
    name: 'Omissão e Falta do Serviço',
    x: '86%',
    y: '31%',
    driftClass: 'f2',
    query: 'omissão genérica faute du service responsabilidade subjetiva'
  },
  {
    id: 'acao-regresso',
    name: 'Ação de regresso',
    x: '12%',
    y: '71%',
    driftClass: 'f3',
    query: 'ação de regresso tema 940 STF'
  },
  {
    id: 'excludentes-causalidade',
    name: 'Culpa exclusiva da vítima',
    x: '88%',
    y: '71%',
    driftClass: 'f1',
    query: 'excludentes de responsabilidade fortuito força maior'
  }
];

export const CONSTITUCIONAL_SUGGESTIONS: SuggestionNode[] = [
  {
    id: 'controle-concentrado-constitucionalidade',
    name: 'ADI e ADC no STF',
    x: '14%',
    y: '31%',
    driftClass: 'f1',
    query: 'controle concentrado de constitucionalidade ADI legitimados'
  },
  {
    id: 'modulacao-efeitos',
    name: 'Modulação de efeitos',
    x: '86%',
    y: '31%',
    driftClass: 'f2',
    query: 'modulação temporal de efeitos quórum 2/3 art 27'
  },
  {
    id: 'reserva-plenario',
    name: 'Reserva de Plenário (SV 10)',
    x: '12%',
    y: '71%',
    driftClass: 'f3',
    query: 'súmula vinculante 10 cláusula de reserva de plenário'
  },
  {
    id: 'controle-difuso',
    name: 'Controle Difuso e Repercussão',
    x: '88%',
    y: '71%',
    driftClass: 'f1',
    query: 'controle difuso recurso extraordinário efeito inter partes'
  }
];

export const PENAL_SUGGESTIONS: SuggestionNode[] = [
  {
    id: 'teoria-crime-fato-tipico',
    name: 'Estrutura do Fato Típico',
    x: '14%',
    y: '31%',
    driftClass: 'f1',
    query: 'fato típico conduta resultado nexo tipicidade'
  },
  {
    id: 'principio-insignificancia',
    name: 'Princípio da Insignificância',
    x: '86%',
    y: '31%',
    driftClass: 'f2',
    query: 'princípio da insignificância bagatela atipicidade material'
  },
  {
    id: 'imputacao-objetiva',
    name: 'Imputação Objetiva (Roxin)',
    x: '12%',
    y: '71%',
    driftClass: 'f3',
    query: 'teoria da imputação objetiva criação de risco proibido'
  },
  {
    id: 'ilicitude-culpabilidade',
    name: 'Legítima defesa e Ilicitude',
    x: '88%',
    y: '71%',
    driftClass: 'f1',
    query: 'excludentes de ilicitude estado de necessidade estrito cumprimento'
  }
];

export const TRIBUTARIO_SUGGESTIONS: SuggestionNode[] = [
  {
    id: 'imunidades-tributarias',
    name: 'Imunidades Tributárias',
    x: '14%',
    y: '31%',
    driftClass: 'f1',
    query: 'imunidade tributária recíproca templos livros partidos'
  },
  {
    id: 'anterioridade-nonagesimal',
    name: 'Anterioridade Nonagesimal',
    x: '86%',
    y: '31%',
    driftClass: 'f2',
    query: 'anterioridade anual e nonagesimal noventena art 150'
  },
  {
    id: 'competencia-tributaria',
    name: 'Competência Tributária',
    x: '12%',
    y: '71%',
    driftClass: 'f3',
    query: 'competência tributária privativa indelegabilidade'
  },
  {
    id: 'fato-gerador-obrigacao',
    name: 'Fato Gerador da Obrigação',
    x: '88%',
    y: '71%',
    driftClass: 'f1',
    query: 'fato gerador obrigação tributária principal e acessória'
  }
];

export const PROCESSO_CIVIL_SUGGESTIONS: SuggestionNode[] = [
  {
    id: 'tutela-urgencia-evidencia',
    name: 'Tutelas Provisórias (CPC/15)',
    x: '14%',
    y: '31%',
    driftClass: 'f1',
    query: 'tutela provisória urgência evidência art 300 311'
  },
  {
    id: 'precedentes-vinculantes',
    name: 'Sistema de Precedentes (art. 927)',
    x: '86%',
    y: '31%',
    driftClass: 'f2',
    query: 'precedentes obrigatórios súmula vinculante repercussão geral'
  },
  {
    id: 'estabilidade-tutela-antecipada',
    name: 'Estabilização da Tutela Antecipada',
    x: '12%',
    y: '71%',
    driftClass: 'f3',
    query: 'estabilização da tutela antecedente ausência de recurso'
  },
  {
    id: 'distinguishing-overruling',
    name: 'Distinguishing e Overruling',
    x: '88%',
    y: '71%',
    driftClass: 'f1',
    query: 'distinguishing superação de precedente overruling modulação'
  }
];

export const THEME_SUGGESTIONS_MAP: Record<string, SuggestionNode[]> = {
  'licitacoes': LICITACOES_SUGGESTIONS,
  'atos-administrativos': ATOS_SUGGESTIONS,
  'responsabilidade-civil': RESPONSABILIDADE_SUGGESTIONS,
  'controle-constitucionalidade': CONSTITUCIONAL_SUGGESTIONS,
  'teoria-crime': PENAL_SUGGESTIONS,
  'tributos-especie': TRIBUTARIO_SUGGESTIONS,
  'tutelas-provisorias': PROCESSO_CIVIL_SUGGESTIONS
};

// ==========================================
// DOSSIÊS DE ESTUDO DE CONCURSO (NÍVEL 4)
// ==========================================

export const TOPIC_DOSSIERS: Record<string, TopicDossier> = {
  // 1. DIÁLOGO COMPETITIVO
  'dialogo-competitivo': {
    id: 'dialogo-competitivo',
    disciplineId: 'administrativo',
    themeId: 'licitacoes',
    title: 'Diálogo',
    titleItalicWord: 'competitivo',
    subtitle:
      'Modalidade para o objeto que a Administração ainda não sabe especificar: primeiro se dialoga com licitantes pré-selecionados até chegar à solução; só depois se colhem as propostas finais.',
    statuteBadges: [
      'Lei 14.133/2021 · art. 6º, XLII',
      'Lei 14.133/2021 · art. 32'
    ],
    requirementsHeading: 'Quando cabe · art. 32',
    requirements: [
      {
        roman: 'I',
        text: 'Objeto com inovação tecnológica ou técnica; ou impossibilidade de atender à necessidade sem adaptar soluções de mercado; ou impossibilidade de definir as especificações com precisão suficiente.'
      },
      {
        roman: 'II',
        text: 'Necessidade de definir os meios e as alternativas que satisfaçam a Administração: solução técnica, requisitos técnicos e estrutura jurídica ou financeira do contrato.'
      },
      {
        roman: 'III',
        text: 'Complexidade do objeto tal que os modos de disputa aberto e fechado não permitem apreciar adequadamente as variáveis envolvidas.'
      }
    ],
    timelineHeading: 'Como corre (Rito procedimental)',
    timeline: [
      {
        title: 'Edital',
        description: 'Necessidades e exigências já definidas; mínimo de 25 dias úteis para manifestar interesse.'
      },
      {
        title: 'Pré-seleção',
        description: 'Licitantes escolhidos por critérios objetivos definidos previamente no instrumento convocatório.'
      },
      {
        title: 'Diálogo',
        description: 'Reuniões em ata e gravadas em áudio e vídeo; soluções de um licitante não são reveladas aos demais sem consentimento expresso.',
        isFocal: true
      },
      {
        title: 'Encerramento',
        description: 'Decisão fundamentada que identifica a solução ou soluções capazes de atender à necessidade administrativa.'
      },
      {
        title: 'Propostas finais',
        description: 'Apresentadas somente depois de encerrados formalmente os diálogos técnicos, com prazo mínimo de 60 dias úteis.'
      },
      {
        title: 'Julgamento',
        description: 'Segundo os critérios previamente divulgados no edital de convocação, seguido da adjudicação e contratação.'
      }
    ],
    controversyHeading: 'Como Não Confundir na Prova',
    controversyStatement: 'Diferença essencial entre PMI (Procedimento de Manifestação de Interesse) e Diálogo Competitivo',
    controversyPositions: [
      'PMI (art. 81): Instrumento pré-edital de provocação do mercado em que o particular propõe estudos e projetos por sua conta e risco, sem compromisso de licitação futura.',
      'Diálogo Competitivo (art. 32): Modalidade de licitação já instaurada pelo Estado, com comissão especial e critérios vinculantes de disputa entre proponentes pré-qualificados.'
    ],
    practicalConsequence:
      'Em provas e na atuação consultiva da Procuradoria: se o poder público já sabe exatamente as especificações do bem ou serviço no Termo de Referência, o uso do diálogo competitivo é vedado por violação do princípio da competitividade.',
    sourcesHeading: 'Fontes Dogmáticas & Jurisprudência',
    sources: [
      {
        id: 'src-lei14133',
        title: 'Nova Lei de Licitações e Contratos',
        citation: 'Lei 14.133/2021 — arts. 6º, XLII e 32',
        type: 'lei',
        authorOrCourt: 'Congresso Nacional',
        excerpt:
          'Art. 32. O diálogo competitivo é restrito a contratações em que a Administração: I - vise a contratar objeto que envolva inovação tecnológica ou impossibilidade de definir especificações com precisão suficiente (...)'
      },
      {
        id: 'src-marcal',
        title: 'Comentários à Lei de Licitações e Contratos Administrativos',
        citation: 'Marçal Justen Filho — Comentários à Lei 14.133/21, Ed. Forense, p. 488',
        type: 'doutrina',
        authorOrCourt: 'Marçal Justen Filho',
        excerpt:
          'O diálogo competitivo representa a consagração do contratualismo cooperativo na esfera pública. O Estado deixa a postura onisciente unilateral e convoca os agentes de ponta do mercado para co-construir o escopo da modelagem técnica.'
      },
      {
        id: 'src-tcu-1482',
        title: 'Acórdão TCU Plenário nº 1.482/2023',
        citation: 'TCU — Rel. Min. Benjamin Zymler, DOU 28/06/2023',
        type: 'jurisprudencia',
        authorOrCourt: 'Tribunal de Contas da União',
        excerpt:
          'A utilização do Diálogo Competitivo exige motivação prévia consistente no Estudo Técnico Preliminar (ETP) atestando que as alternativas padronizadas de mercado e os ritos de concorrência comum são insuficientes para formular o escopo funcional da contratação pública.'
      }
    ],
    neighbors: [
      { id: 'pregao', name: 'Pregão eletrônico' },
      { id: 'contratacao-direta', name: 'Contratação direta' },
      { id: 'convalidacao-ato', name: 'Convalidação de atos' }
    ],
    relatedCaseId: 'case-3-1'
  },

  // 2. CONVALIDAÇÃO DO ATO ADMINISTRATIVO
  'convalidacao-ato': {
    id: 'convalidacao-ato',
    disciplineId: 'administrativo',
    themeId: 'atos-administrativos',
    title: 'Convalidação do',
    titleItalicWord: 'ato administrativo',
    subtitle:
      'Aproveitamento de ato administrativo com vício sanável, com efeitos retroativos (ex tunc), preservando a segurança jurídica e a eficiência.',
    statuteBadges: [
      'Lei 9.784/1999 · art. 55',
      'LINDB · art. 20 e 21',
      'Súmula 473/STF'
    ],
    requirementsHeading: 'Critérios de Validade · art. 55 da Lei 9.784/99',
    requirements: [
      {
        roman: 'I',
        text: 'Vício sanável exclusivo de Competência (desde que não seja exclusiva/indelegável) ou de Forma (desde que não essencial à validade do ato).'
      },
      {
        roman: 'II',
        text: 'Ausência total de lesão ao interesse público e inocorrência de prejuízo a terceiros de boa-fé.'
      },
      {
        roman: 'III',
        text: 'Ato que não tenha sido objeto de impugnação administrativa prévia tempestiva ou questionamento judicial pelo interessado.'
      }
    ],
    timelineHeading: 'Rito do Ato Convalidador',
    timeline: [
      { title: 'Constatação do Vício', description: 'Identificação de incompetência relativa de autoridade ou forma secundária.' },
      { title: 'Exame de Terceiros e Boa-fé', description: 'Comprovação de ausência de dano patrimonial ou lesão a particulares.' },
      { title: 'Ato de Ratificação', description: 'A autoridade originariamente competente edita ato ratificador formal.', isFocal: true },
      { title: 'Eficácia Ex Tunc', description: 'Retroatividade total confirmando todos os efeitos práticos já produzidos.' }
    ],
    controversyHeading: 'Como Não Confundir na Prova',
    controversyStatement: 'Convalidação vs. Anulação vs. Revogação',
    controversyPositions: [
      'Convalidação: corrige ato ilegal com vício leve/sanável (efeito ex tunc). O ato permanece vivo.',
      'Anulação: extingue ato com vício insanável de legalidade (efeito ex tunc). O ato é apagado.',
      'Revogação: extingue ato lícito e válido por motivo superveniente de conveniência/oportunidade (efeito ex nunc).'
    ],
    practicalConsequence:
      'Vícios de Motivo, Objeto ou Finalidade NUNCA admitem convalidação. A banca tenta induzir o candidato ao erro afirmando que "o Secretário convalidou o motivo falso". É nulidade absoluta.',
    sourcesHeading: 'Precedentes e Doutrina',
    sources: [
      {
        id: 'src-lei9784-55',
        title: 'Lei do Processo Administrativo Federal',
        citation: 'Lei 9.784/1999 — art. 55',
        type: 'lei',
        authorOrCourt: 'Congresso Nacional',
        excerpt: 'Art. 55. Em decisão na qual se evidencie não acarretarem lesão ao interesse público nem prejuízo a terceiros, os atos que apresentarem defeitos sanáveis poderão ser convalidados pela própria Administração.'
      },
      {
        id: 'src-stf-525',
        title: 'Tema 525/STF — Autotutela e Decadência',
        citation: 'STF — RE 636.553, Rel. Min. Gilmar Mendes',
        type: 'jurisprudencia',
        authorOrCourt: 'Supremo Tribunal Federal',
        excerpt: 'O dever da Administração de anular seus próprios atos ilegais é mitigado pelos princípios da segurança jurídica e da confiança legítima, respeitado o prazo decadencial de 5 anos salvo má-fé comprovada.'
      }
    ],
    neighbors: [
      { id: 'dialogo-competitivo', name: 'Licitações' },
      { id: 'responsabilidade-civil-estado', name: 'Responsabilidade Civil' },
      { id: 'pregao', name: 'Pregão' }
    ],
    relatedCaseId: 'case-1-1'
  },

  // 3. RESPONSABILIDADE CIVIL DO ESTADO
  'responsabilidade-civil-estado': {
    id: 'responsabilidade-civil-estado',
    disciplineId: 'administrativo',
    themeId: 'responsabilidade-civil',
    title: 'Responsabilidade Civil do',
    titleItalicWord: 'Estado',
    subtitle:
      'Obrigação indenizatória estatal fundada na Teoria do Risco Administrativo (art. 37, § 6º da CF), prescindindo de demonstração de dolo ou culpa do servidor.',
    statuteBadges: [
      'CF/88 · art. 37, § 6º',
      'Código Civil · art. 43',
      'Tema 940/STF'
    ],
    requirementsHeading: 'Pressupostos da Responsabilidade Objetiva',
    requirements: [
      {
        roman: 'I',
        text: 'Conduta comissiva de agente público que atue nessa qualidade ou a pretexto dela em pessoa de direito público ou prestadora de serviço público.'
      },
      {
        roman: 'II',
        text: 'Dano efetivo, anormal e específico sofrido pelo particular, de natureza material, moral ou estética.'
      },
      {
        roman: 'III',
        text: 'Nexo de causalidade direto e imediato entre o ato do preposto público e o resultado danoso verificado.'
      }
    ],
    timelineHeading: 'Dinâmica do Processo Indenizatório',
    timeline: [
      { title: 'Evento Lesivo', description: 'Dano ocasionado pela atuação ou omissão específica do ente público.' },
      { title: 'Ajuizamento Exclusivo', description: 'Demanda proposta em face da pessoa jurídica de direito público (Tema 940 STF).' },
      { title: 'Exame de Excludentes', description: 'Análise de culpa exclusiva da vítima, caso fortuito ou força maior.', isFocal: true },
      { title: 'Reparação', description: 'Condenação e expedição de precatório judicial ou RPV.' },
      { title: 'Ação Regressiva', description: 'Cobrança do servidor em ação autônoma mediante comprovação de dolo ou culpa.' }
    ],
    controversyHeading: 'Como Não Confundir na Prova',
    controversyStatement: 'Conduta Comissiva (Objetiva) vs. Omissão Genérica (Subjetiva - Faute du Service)',
    controversyPositions: [
      'Ação Comissiva: responsabilidade SEMPRE objetiva (risco administrativo, art. 37, § 6º). Não perquire culpa.',
      'Omissão Genérica: o Estado não evitou o dano por falta do serviço (faute du service). A responsabilidade é SUBJETIVA, exigindo prova de negligência estatal culposa.',
      'Omissão Específica: o Estado tinha o dever concreto de garantia e custódia (ex: presidiário ou paciente sob guarda). É OBJETIVA.'
    ],
    practicalConsequence:
      'No Tema 940 do STF ficou definido: a vítima não pode processar conjuntamente o servidor público no polo passivo. O servidor só responde em regresso se o Estado perder a causa e provar dolo/culpa.',
    sourcesHeading: 'Precedentes Vinculantes',
    sources: [
      {
        id: 'src-tema-940',
        title: 'Tema 940/STF — Ilegitimidade Passiva do Servidor',
        citation: 'STF — RE 1.027.633, Plenário, Rel. Min. Marco Aurélio',
        type: 'jurisprudencia',
        authorOrCourt: 'Supremo Tribunal Federal',
        excerpt: 'A ação por danos causados por agente público deve ser ajuizada contra o Estado ou pessoa jurídica de direito privado prestadora de serviço público, sendo parte ilegítima para a lide o autor do ato.'
      }
    ],
    neighbors: [
      { id: 'convalidacao-ato', name: 'Atos Administrativos' },
      { id: 'dialogo-competitivo', name: 'Licitações e Contratos' }
    ],
    relatedCaseId: 'case-2-2'
  },

  // 4. CONTROLE CONCENTRADO DE CONSTITUCIONALIDADE
  'controle-concentrado-constitucionalidade': {
    id: 'controle-concentrado-constitucionalidade',
    disciplineId: 'constitucional',
    themeId: 'controle-constitucionalidade',
    title: 'Controle Concentrado de',
    titleItalicWord: 'constitucionalidade',
    subtitle:
      'Fiscalização abstrata da higidez de leis e atos normativos perante a Constituição Federal, exercida originariamente perante o Plenário do Supremo Tribunal Federal.',
    statuteBadges: [
      'CF/88 · art. 102, I, a e art. 103',
      'Lei 9.868/1999 · art. 27',
      'Súmula Vinculante 10'
    ],
    requirementsHeading: 'Requisitos de Admissibilidade no STF',
    requirements: [
      {
        roman: 'I',
        text: 'Legitimação ativa restrita ao rol do art. 103 da CF (divididos entre legitimados universais e legitimados especiais que exigem pertinência temática).'
      },
      {
        roman: 'II',
        text: 'Ato normativo primário pós-constitucional federal ou estadual dotado de generalidade e abstração.'
      },
      {
        roman: 'III',
        text: 'Eficácia erga omnes, efeito vinculante para toda a administração e o judiciário, e regra geral de retroatividade (ex tunc).'
      }
    ],
    timelineHeading: 'Procedimento da ADI',
    timeline: [
      { title: 'Petição Inicial', description: 'Propositura perante o STF com indicação do preceito vulnerado.' },
      { title: 'Medida Cautelar', description: 'Apreciação urgente pelo Pleno por maioria absoluta.' },
      { title: 'Manifestação AGU e PGR', description: 'Curador da norma (AGU) e fiscal da ordem jurídica (PGR).' },
      { title: 'Julgamento e Modulação', description: 'Decisão de mérito definitiva com possibilidade de modulação temporal.', isFocal: true }
    ],
    controversyHeading: 'Como Não Confundir na Prova',
    controversyStatement: 'Controle Difuso (Concreto) vs. Controle Concentrado (Abstrato)',
    controversyPositions: [
      'Controle Difuso: qualquer juiz ou tribunal pode declarar a inconstitucionalidade incidentalmente no caso concreto (inter partes). Exige Reserva de Plenário (art. 97 CF / SV 10).',
      'Controle Concentrado: processo objetivo sem partes em conflito subjetivo, julgado exclusivamente pelo STF com efeito vinculante geral (erga omnes).'
    ],
    practicalConsequence:
      'A modulação temporal dos efeitos (art. 27 da Lei 9.868/99) permite ao STF declarar a norma inconstitucional com efeitos ex nunc ou prospectivos, mas EXIGE QUÓRUM QUALIFICADO DE 2/3 DOS MEMBROS (8 ministros). As bancas cobram obsessivamente esse quórum de 2/3.',
    sourcesHeading: 'Teses do STF',
    sources: [
      {
        id: 'src-adi-modulacao',
        title: 'Lei 9.868/1999 — art. 27',
        citation: 'Lei do Processo e Julgamento da ADI e ADC',
        type: 'lei',
        authorOrCourt: 'Congresso Nacional',
        excerpt: 'Art. 27. Ao declarar a inconstitucionalidade de lei ou ato normativo, e tendo em vista razões de segurança jurídica ou de excepcional interesse social, poderá o Supremo Tribunal Federal, por maioria de dois terços de seus membros, restringir os efeitos daquela declaração ou decidir que ela só tenha eficácia a partir de seu trânsito em julgado ou de outro momento que venha a ser fixado.'
      }
    ],
    neighbors: [
      { id: 'controle-concentrado-constitucionalidade', name: 'Controle de Constitucionalidade' }
    ],
    relatedCaseId: 'case-const-1'
  },

  // 5. TEORIA DO CRIME: FATO TÍPICO
  'teoria-crime-fato-tipico': {
    id: 'teoria-crime-fato-tipico',
    disciplineId: 'penal',
    themeId: 'teoria-crime',
    title: 'Teoria do Crime:',
    titleItalicWord: 'fato típico',
    subtitle:
      'Substrato inaugural da estrutura analítica tripartida da infração penal, composto por conduta voluntária, resultado naturalístico, nexo causal e tipicidade.',
    statuteBadges: [
      'Código Penal · art. 13 a 18',
      'Súmula 599/STJ',
      'Tema 84.412/STF'
    ],
    requirementsHeading: 'Elementos do Fato Típico',
    requirements: [
      {
        roman: 'I',
        text: 'Conduta humana voluntária e consciente (dolosa ou culposa), orientada a uma finalidade (teoria finalista de Welzel).'
      },
      {
        roman: 'II',
        text: 'Nexo de causalidade segundo a teoria da conditio sine qua non, mitigada pelo juízo normativo da imputação objetiva.'
      },
      {
        roman: 'III',
        text: 'Tipicidade formal (enquadramento formal na letra da lei) e tipicidade material (lesividade e periculosidade da conduta).'
      }
    ],
    timelineHeading: 'Sequência Analítica do Delito',
    timeline: [
      { title: 'Conduta e Resultado', description: 'Ação humana voluntária causalmente ligada ao efeito externo.' },
      { title: 'Tipicidade Formal e Material', description: 'Subsunção legal e exclusão de bagatela.', isFocal: true },
      { title: 'Exame de Ilicitude', description: 'Verificação de legítima defesa, estado de necessidade e dever legal.' },
      { title: 'Exame de Culpabilidade', description: 'Imputabilidade, potencial consciência e exigibilidade de conduta diversa.' }
    ],
    controversyHeading: 'Como Não Confundir na Prova',
    controversyStatement: 'Princípio da Insignificância (Atipicidade Material) vs. Ilicitude ou Culpabilidade',
    controversyPositions: [
      'O Princípio da Insignificância afasta a TIPICIDADE MATERIAL. O fato se torna atípico (não há crime).',
      'Não afasta a culpabilidade nem a ilicitude: a exclusão ocorre logo no primeiro degrau da análise dogmática.'
    ],
    practicalConsequence:
      'A Súmula 599 do STJ proíbe a aplicação do princípio da insignificância aos crimes contra a Administração Pública, pois o bem jurídico tutelado primário é a moralidade administrativa, insuscetível de valoração meramente monetária.',
    sourcesHeading: 'Súmula e Precedentes',
    sources: [
      {
        id: 'src-sumula-599',
        title: 'Súmula 599/STJ — Inaplicabilidade na Adm. Pública',
        citation: 'Superior Tribunal de Justiça — 3ª Seção',
        type: 'jurisprudencia',
        authorOrCourt: 'Superior Tribunal de Justiça',
        excerpt: 'O princípio da insignificância é inaplicável aos crimes contra a administração pública.'
      }
    ],
    neighbors: [
      { id: 'teoria-crime-fato-tipico', name: 'Estrutura Analítica do Delito' }
    ],
    relatedCaseId: 'case-penal-1'
  },

  // 6. PREGÃO ELETRÔNICO
  'pregao': {
    id: 'pregao',
    disciplineId: 'administrativo',
    themeId: 'licitacoes',
    title: 'Pregão',
    titleItalicWord: 'eletrônico',
    subtitle:
      'Modalidade obrigatória para aquisição de bens e serviços comuns, cujo critério de julgamento é sempre o menor preço ou maior desconto.',
    statuteBadges: [
      'Lei 14.133/2021 · art. 6º, XLI',
      'Lei 14.133/2021 · art. 29'
    ],
    requirementsHeading: 'Requisitos & Abrangência · art. 29',
    requirements: [
      {
        roman: 'I',
        text: 'Bens e serviços comuns: aqueles cujos padrões de desempenho e qualidade podem ser objetivamente definidos pelo edital por meio de especificações usuais de mercado.'
      },
      {
        roman: 'II',
        text: 'Inversão obrigatória de fases: julgamento das propostas antecede a fase de habilitação, assegurando celeridade processual.'
      },
      {
        roman: 'III',
        text: 'Vedação expressa para contratação de serviços técnicos especializados de natureza predominantemente intelectual e obras de engenharia que não sejam comuns.'
      }
    ],
    timelineHeading: 'Procedimento ordinário',
    timeline: [
      { title: 'Edital e Termo de Referência', description: 'Publicação com prazo mínimo de 8 dias úteis para propostas.' },
      { title: 'Abertura da sessão pública', description: 'Disputa de lances sucessivos em ambiente eletrônico seguro.' },
      { title: 'Julgamento da melhor proposta', description: 'Exame de adequação de preço e amostra, se aplicável.', isFocal: true },
      { title: 'Habilitação do vencedor', description: 'Análise documental restrita unicamente ao primeiro colocado.' },
      { title: 'Fase recursal única', description: 'Intenção de recurso motivada em ato contínuo ao encerramento.' },
      { title: 'Homologação e Adjudicação', description: 'Ato final da autoridade competente.' }
    ],
    controversyHeading: 'Como Não Confundir na Prova',
    controversyStatement: 'Engenharia comum vs. Obras de grande vulto',
    controversyPositions: [
      'Serviços comuns de engenharia (art. 6º, XXI): admitem pregão se os padrões forem usuais de mercado.',
      'Obras e serviços especiais de engenharia: exigem obrigatoriamente a modalidade concorrência.'
    ],
    practicalConsequence:
      'A Súmula 257 do TCU pacificou o cabimento do pregão para serviços comuns de engenharia, mantendo a vedação restrita apenas às obras propriamente ditas com alta complexidade.',
    sourcesHeading: 'Fontes desta resposta',
    sources: [
      {
        id: 'src-lei-pregao',
        title: 'Lei 14.133/2021 — art. 29 e art. 34',
        citation: 'Nova Lei Geral de Licitações',
        type: 'lei',
        authorOrCourt: 'Congresso Nacional',
        excerpt: 'Art. 29. A concorrência e o pregão seguem o rito procedimental comum a que se refere o art. 17 desta Lei, adotando-se o pregão sempre que o objeto possuir padrões de desempenho e qualidade que possam ser objetivamente definidos pelo edital (...)'
      }
    ],
    neighbors: [
      { id: 'dialogo-competitivo', name: 'Diálogo competitivo' },
      { id: 'contratacao-direta', name: 'Contratação direta' }
    ],
    relatedCaseId: 'case-3-1'
  },

  // 7. CONTRATAÇÃO DIRETA (DISPENSA E INEXIGIBILIDADE)
  'contratacao-direta': {
    id: 'contratacao-direta',
    disciplineId: 'administrativo',
    themeId: 'licitacoes',
    title: 'Contratação',
    titleItalicWord: 'direta',
    subtitle:
      'Exceções constitucionais à obrigatoriedade de licitar: Inexigibilidade (inviabilidade de competição) e Dispensa (competição viável, mas lei autoriza não licitar).',
    statuteBadges: [
      'Lei 14.133/2021 · art. 74 (Inexigibilidade)',
      'Lei 14.133/2021 · art. 75 (Dispensa)'
    ],
    requirementsHeading: 'Distinção Dogmática Nuclear',
    requirements: [
      {
        roman: 'I',
        text: 'Inexigibilidade (art. 74): Rol exemplificativo. A competição é faticamente ou juridicamente impossível (fornecedor exclusivo, profissional de notória especialização, artista consagrado).'
      },
      {
        roman: 'II',
        text: 'Dispensa (art. 75): Rol taxativo. A competição é teoricamente viável, mas a lei autoriza a contratação direta por razões de conveniência, baixo valor, emergência ou interesse nacional.'
      },
      {
        roman: 'III',
        text: 'Dever geral de motivação (art. 72): Toda contratação direta exige processo formal com caracterização da necessidade, justificativa de preço e de escolha do contratado.'
      }
    ],
    timelineHeading: 'Processo de contratação direta (art. 72)',
    timeline: [
      { title: 'Documento de Formalização da Demanda', description: 'Indicação clara do interesse público a ser atendido.' },
      { title: 'Estudo Técnico Preliminar e TR', description: 'Demonstração da necessidade e dos parâmetros do objeto.' },
      { title: 'Pesquisa de Preços', description: 'Comprovação da compatibilidade com os preços de mercado.', isFocal: true },
      { title: 'Parecer Jurídico', description: 'Manifestação obrigatória da advocacia pública sobre o enquadramento.' },
      { title: 'Ato de Ratificação', description: 'Autoridade superior autoriza e homologa a contratação.' },
      { title: 'Publicação no PNCP', description: 'Divulgação oficial no Portal Nacional de Contratações Públicas.' }
    ],
    controversyHeading: 'Como Não Confundir na Prova',
    controversyStatement: 'Notória Especialização e Singularidade do Objeto',
    controversyPositions: [
      'Lei 14.133/2021 (art. 74, III): dispensou a exigência literal da "singularidade do objeto", exigindo agora que o serviço técnico seja de "natureza predominantemente intelectual" prestado por profissional de notória especialização.',
      'Jurisprudência do STF/TCU: exige demonstração de que a escolha recaiu sobre profissional de inequívoca capacidade e que a confiança da Administração tem esteio técnico idôneo.'
    ],
    practicalConsequence:
      'A contratação de pareceres jurídicos ou defesas em tribunais superiores por inexigibilidade é lícita, desde que evidenciada a notoriedade do causídico e a razoabilidade dos honorários conforme a praxe.',
    sourcesHeading: 'Fontes desta resposta',
    sources: [
      {
        id: 'src-art74-75',
        title: 'Lei 14.133/2021 — arts. 74 e 75',
        citation: 'Nova Lei Geral de Licitações',
        type: 'lei',
        authorOrCourt: 'Congresso Nacional',
        excerpt: 'Art. 74. É inexigível a licitação quando inviável a competição, em especial nos casos de: I - aquisição de materiais ou serviços que só possam ser fornecidos por representante comercial exclusivo (...)'
      }
    ],
    neighbors: [
      { id: 'dialogo-competitivo', name: 'Diálogo competitivo' },
      { id: 'pregao', name: 'Pregão eletrônico' }
    ],
    relatedCaseId: 'case-3-1'
  },

  // 8. IMUNIDADES TRIBUTÁRIAS
  'imunidades-tributarias': {
    id: 'imunidades-tributarias',
    disciplineId: 'tributario',
    themeId: 'tributos-especie',
    title: 'Imunidades',
    titleItalicWord: 'tributárias',
    subtitle:
      'Limitações constitucionais ao poder de tributar que subtraem competência impositiva sobre entes federados, templos, partidos e livros (art. 150, VI da CF/88).',
    statuteBadges: [
      'CF/88 · art. 150, VI, a a e',
      'Súmula Vinculante 52',
      'Tema 342/STF'
    ],
    requirementsHeading: 'Requisitos Constitucionais · art. 150, VI',
    requirements: [
      {
        roman: 'I',
        text: 'Imunidade Recíproca (alínea a): impede entes da Federação de instituir impostos sobre patrimônio, renda ou serviços uns dos outros, extensível a autarquias e fundações públicas vinculadas às suas finalidades essenciais.'
      },
      {
        roman: 'II',
        text: 'Imunidade Religiosa (alínea b): veda impostos sobre templos de qualquer culto, abrangendo imóveis alugados a terceiros desde que o valor dos aluguéis seja integralmente aplicado nas finalidades da entidade (Súmula Vinculante 52).'
      },
      {
        roman: 'III',
        text: 'Imunidade de Imprensa (alínea d): livros, jornais, periódicos e o papel destinado a sua impressão, inclusive livros eletrônicos (e-books) e os suportes materiais que lhes sirvam de leitor exclusivo (Súmula Vinculante 57).'
      }
    ],
    timelineHeading: 'Regime de aplicação e controle',
    timeline: [
      { title: 'Previsão Constitucional Originária', description: 'Hipótese insculpida diretamente na Constituição Federal.' },
      { title: 'Verificação da Natureza do Tributo', description: 'A imunidade do art. 150, VI alcança apenas IMPOSTOS, não taxas ou contribuições de melhoria.', isFocal: true },
      { title: 'Destinação dos Recursos', description: 'Comprovação da afetação das rendas aos fins institucionais da entidade.' },
      { title: 'Controle pelo Fisco ou Juízo', description: 'Reconhecimento declaratório de inexigibilidade da exação tributária.' }
    ],
    controversyHeading: 'Como Não Confundir na Prova',
    controversyStatement: 'Imunidade vs. Isenção vs. Não Incidência',
    controversyPositions: [
      'Imunidade: decorre da Constituição Federal; é hipótese constitucional de incompetência tributária.',
      'Isenção: decorre de LEI ordinária do ente tributante; a competência existe, mas a lei dispensa o pagamento do tributo devido.'
    ],
    practicalConsequence:
      'A imunidade não pode ser revogada por lei nem por emenda constitucional tendente a abolir cláusula pétrea (garantia fundamental). A isenção pode ser revogada por lei a qualquer momento pelo ente que a concedeu, respeitada a anterioridade.',
    sourcesHeading: 'Súmulas Vinculantes',
    sources: [
      {
        id: 'src-sv-52',
        title: 'Súmula Vinculante 52 — Imóveis de Templos',
        citation: 'Supremo Tribunal Federal — Plenário',
        type: 'jurisprudencia',
        authorOrCourt: 'Supremo Tribunal Federal',
        excerpt: 'Ainda quando alugado a terceiros, permanece imune ao IPTU o imóvel pertencente a qualquer das entidades referidas pelo art. 150, VI, c, da Constituição da República, desde que o valor dos aluguéis seja aplicado nas atividades para as quais tais entidades foram constituídas.'
      }
    ],
    neighbors: [
      { id: 'imunidades-tributarias', name: 'Imunidades Tributárias' }
    ],
    relatedCaseId: 'case-trib-1'
  },

  // 9. TUTELAS PROVISÓRIAS NO CPC/15
  'tutela-urgencia-evidencia': {
    id: 'tutela-urgencia-evidencia',
    disciplineId: 'processo-civil',
    themeId: 'tutelas-provisorias',
    title: 'Tutelas',
    titleItalicWord: 'provisórias',
    subtitle:
      'Garantia da efetividade da jurisdição cindida entre tutela de urgência (antecipada e cautelar) e tutela de evidência, disciplinadas pelos arts. 294 a 311 do CPC/15.',
    statuteBadges: [
      'CPC/2015 · art. 300',
      'CPC/2015 · art. 311',
      'Enunciado 498 FPPC'
    ],
    requirementsHeading: 'Pressupostos Dogmáticos · CPC/15',
    requirements: [
      {
        roman: 'I',
        text: 'Tutela de Urgência (art. 300): exige cumulativamente probabilidade do direito (fumus boni iuris) e perigo de dano ou risco ao resultado útil do processo (periculum in mora), além de reversibilidade dos efeitos.'
      },
      {
        roman: 'II',
        text: 'Tutela de Evidência (art. 311): independe expressamente da demonstração de perigo de dano ou de risco ao resultado útil do processo, repousando na alta probabilidade do direito do demandante.'
      },
      {
        roman: 'III',
        text: 'Evidência Liminar (art. 311, parágrafo único): admite concessão inaudita altera parte exclusivamente nos incisos II (prova documental + repetitivo/súmula vinculante) e III (contrato de depósito).'
      }
    ],
    timelineHeading: 'Rito procedimental da providência',
    timeline: [
      { title: 'Requerimento da Parte', description: 'Petição inicial antecedente ou incidente no curso da demanda cível.' },
      { title: 'Juízo de Probabilidade', description: 'Análise de cognição sumária pelo magistrado com base nos elementos trazidos.', isFocal: true },
      { title: 'Decisão Interlocutória', description: 'Deferimento fundamentado impondo a eficácia imediata da ordem.' },
      { title: 'Estabilização ou Contestação', description: 'Possibilidade de estabilização da tutela antecedente se não houver recurso (art. 304).' }
    ],
    controversyHeading: 'Como Não Confundir na Prova',
    controversyStatement: 'Tutela de Urgência vs. Tutela de Evidência',
    controversyPositions: [
      'Tutela de Urgência: SEMPRE exige perigo de dano (periculum in mora) e probabilidade do direito. Se a medida for irreversível, é vedada (art. 300, § 3º).',
      'Tutela de Evidência: NUNCA exige perigo de dano. Funda-se em abuso de direito de defesa, manifestação protelatória, prova documental com precedente vinculante ou contrato de depósito.'
    ],
    practicalConsequence:
      'Se o candidato alegar necessidade de "perigo na demora" para justificar o deferimento de tutela de evidência, comete erro conceitual gravíssimo cobrado com rigor pelas bancas de magistratura e defensoria.',
    sourcesHeading: 'Código de Processo Civil',
    sources: [
      {
        id: 'src-cpc-311',
        title: 'CPC/2015 — art. 311',
        citation: 'Código de Processo Civil',
        type: 'lei',
        authorOrCourt: 'Congresso Nacional',
        excerpt: 'Art. 311. A tutela da evidência será concedida, independentemente da demonstração de perigo de dano ou de risco ao resultado útil do processo, quando: (...) II - as alegações de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em súmula vinculante.'
      }
    ],
    neighbors: [
      { id: 'tutela-urgencia-evidencia', name: 'Tutelas Provisórias' }
    ],
    relatedCaseId: 'case-proc-1'
  }
};
