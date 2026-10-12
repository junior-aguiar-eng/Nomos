import { PracticalAxis } from '../types/nomos';

export const PRACTICAL_AXES: PracticalAxis[] = [
  {
    id: 'axis-1',
    number: 1,
    title: 'Gestão e Decisão Interna',
    subtitle: 'Poderes, Teoria do Ato, Organização e Servidores',
    description:
      'A anatomia do ato estatal, poderes vinculados e discricionários, competências e o regime dos agentes públicos.',
    icon: '⚙️',
    badge: 'Núcleo Decisório',
    color: '#2563eb',
    accentGradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
    coreInstitutes: [
      'Regime Jurídico Administrativo',
      'Poderes da Administração',
      'Elementos do Ato (COM-FI-FOR-M-OB)',
      'Atributos do Ato (PATI)',
      'Convalidação vs. Anulação',
      'Organização Administrativa',
      'Regime Disciplinar & PAD'
    ]
  },
  {
    id: 'axis-2',
    number: 2,
    title: 'Relação com o Cidadão',
    subtitle: 'Polícia, Bens Públicos, Propriedade e Responsabilidade',
    description:
      'Os limites da autoridade estatal em face dos particulares, intervenção no domínio privado e reparação de danos públicos.',
    icon: '🛡️',
    badge: 'Garantias & Impacto',
    color: '#059669',
    accentGradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    coreInstitutes: [
      'Poder de Polícia & Autoexecutoriedade',
      'Classificação dos Bens Públicos',
      'Afetação e Desafetação',
      'Desapropriação & Tredestinação',
      'Servidão e Limitações Administrativas',
      'Responsabilidade Civil do Estado (Risco Administrativo)',
      'Dano por Omissão Estatal'
    ]
  },
  {
    id: 'axis-3',
    number: 3,
    title: 'Relação com o Mercado',
    subtitle: 'Licitações Lei 14.133, Contratos, Concessões e Regulação',
    description:
      'O Estado comprador, contratante e regulador da economia. Contratações diretas, equilíbrio financeiro e parcerias.',
    icon: '📈',
    badge: 'Contratações & Fomento',
    color: '#d97706',
    accentGradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    coreInstitutes: [
      'Princípios Licitatórios (Lei 14.133)',
      'Dispensa vs. Inexigibilidade',
      'Cláusulas Exorbitantes',
      'Equilíbrio Econômico-Financeiro',
      'Fato da Administração e Imprevisão',
      'Concessões, Permissões e PPPs',
      'Regulação Econômica & Agências'
    ]
  },
  {
    id: 'axis-4',
    number: 4,
    title: 'Julgamento e Controle',
    subtitle: 'Autotutela, Tribunais de Contas, Ações e Improbidade',
    description:
      'A fiscalização da legalidade, atuação do controle externo, remédios constitucionais e o regime restritivo de improbidade.',
    icon: '⚖️',
    badge: 'Fiscalização & Legalidade',
    color: '#7c3aed',
    accentGradient: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
    coreInstitutes: [
      'Autotutela e Decadência (Súmula 473)',
      'Controle pelos Tribunais de Contas',
      'Mandado de Segurança Coletivo e Individual',
      'Ação Popular e Ação Civil Pública',
      'Nova Lei de Improbidade (Dolo Específico)',
      'Tipicidade Estrita em Improbidade',
      'Sancionamento e Prescrição'
    ]
  }
];
