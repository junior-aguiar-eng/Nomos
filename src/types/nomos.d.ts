export type LegalUniverseId = 'administrativo' | 'constitucional' | 'penal' | 'civil';

export interface LegalUniverse {
  id: LegalUniverseId;
  title: string;
  subtitle: string;
  status: 'active' | 'coming_soon';
  description: string;
  icon: string;
}

export type AxisId = 'axis-1' | 'axis-2' | 'axis-3' | 'axis-4';

export interface PracticalAxis {
  id: AxisId;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  color: string;
  accentGradient: string;
  coreInstitutes: string[];
}

export type ConceptCategory =
  | 'principio'
  | 'poder'
  | 'ato'
  | 'organizacao'
  | 'agente'
  | 'policia'
  | 'bem'
  | 'propriedade'
  | 'responsabilidade'
  | 'licitacao'
  | 'contrato'
  | 'servico'
  | 'regulacao'
  | 'controle'
  | 'remedio'
  | 'improbidade';

export interface LegalConcept {
  id: string;
  axisId: AxisId;
  category: ConceptCategory;
  title: string;
  tagline: string;
  mechanics: string; // Como o instituto opera na prática, sem resíduos
  keyElements: string[]; // Requisitos essenciais de validade / eficácia
  attributesOrSpecies?: string[]; // Atributos ou espécies práticas
  fatalFlaws: string[]; // Vícios insanáveis ou hipóteses de nulidade
  practicalDistinctions: {
    versusTitle: string;
    difference: string;
  }[];
  supremeCourtTheses: string[]; // Súmulas ou teses vinculantes aplicáveis
  mnemonic?: string; // Mnemônico direto (ex: COM-FI-FOR-M-OB, PATI)
  relatedConceptIds: string[]; // Conexões no Atlas
}

export interface PracticalDecisionOption {
  id: string;
  label: string;
  actionSummary: string;
  actionType:
    | 'convalidate'
    | 'annul'
    | 'revoke'
    | 'sanction'
    | 'maintain'
    | 'suspend'
    | 'compensate'
    | 'dismiss';
}

export interface DecisionOutcome {
  success: boolean;
  verdictTitle: string;
  technicalFeedback: string; // Explicação jurídica direta sem resíduos
  legalGrounding: string; // Artigos ou Súmulas aplicáveis
  minervaReaction: 'triumph' | 'nullity_alarm' | 'warning' | 'subtle_nod';
  xpEarned: number;
}

export interface CompatibilityRule {
  decisionId: string;
  validConceptIds: string[]; // Conceitos necessários para fundamentar
  fatalFlawConceptIds: string[]; // Conceitos que se escolhidos geram vício de fundamentação
  outcome: DecisionOutcome;
}

export interface PracticalCase {
  id: string;
  axisId: AxisId;
  caseNumber: string;
  title: string;
  assignedRole: string; // Papel prático assumido pelo aluno
  institutionalContext: string;
  briefing: string; // Relatório sucinto e direto dos fatos
  legalProblem: string; // A pergunta jurídica central
  availableDecisions: PracticalDecisionOption[];
  compatibilityRules: CompatibilityRule[];
  nightVisionHint: string; // Dica socrática de Minerva
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
}

export type PublicRank =
  | 'Estagiário de Direito'
  | 'Assessor Jurídico'
  | 'Procurador do Estado'
  | 'Conselheiro / Magistrado';

export interface CaseResolutionRecord {
  caseId: string;
  axisId: AxisId;
  timestamp: number;
  chosenDecisionId: string;
  linkedConceptIds: string[];
  success: boolean;
  verdictTitle: string;
  technicalFeedback: string;
  xpEarned: number;
}

export interface UserProgressState {
  currentUniverse: LegalUniverseId;
  currentRank: PublicRank;
  totalXp: number;
  axisScores: Record<
    AxisId,
    { resolvedCount: number; totalCount: number; accuracyPercentage: number }
  >;
  resolutions: CaseResolutionRecord[];
  bookmarkedConceptIds: string[];
  theme: 'crystal-light' | 'deep-cyber-dark';
  soundEnabled: boolean;
}

export interface MinervaMood {
  emotion: 'idle' | 'scanning' | 'triumph' | 'nullity_alarm' | 'night_vision' | 'speaking';
  message: string;
  subMessage?: string;
}
