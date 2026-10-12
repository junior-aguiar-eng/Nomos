import { LegalUniverse } from '../types/nomos';

export const UNIVERSES_DATA: LegalUniverse[] = [
  {
    id: 'administrativo',
    title: 'Direito Administrativo',
    subtitle: 'O Regime Jurídico do Poder Público & Ação Estatal',
    status: 'active',
    description: 'Compreenda a mecânica pura dos atos, poderes, licitações, contratos e controle da administração.',
    icon: '🏛️'
  },
  {
    id: 'constitucional',
    title: 'Direito Constitucional',
    subtitle: 'Teoria da Constituição, Direitos Fundamentais & Separação de Poderes',
    status: 'coming_soon',
    description: 'Em breve: controle de constitucionalidade e garantias fundamentais.',
    icon: '⚖️'
  },
  {
    id: 'penal',
    title: 'Direito Penal',
    subtitle: 'Teoria do Crime, Tipicidade & Dosimetria da Pena',
    status: 'coming_soon',
    description: 'Em breve: estrutura do fato típico, ilicitude e culpabilidade.',
    icon: '🛡️'
  },
  {
    id: 'civil',
    title: 'Direito Civil',
    subtitle: 'Relações Jurídicas Privadas, Contratos & Responsabilidade Civil',
    status: 'coming_soon',
    description: 'Em breve: parte geral, obrigações e direitos reais.',
    icon: '📜'
  }
];
