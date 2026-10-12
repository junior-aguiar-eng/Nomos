export interface DoctrineSection {
  id: string;
  number: string;
  title: string;
  content: string[];
  keyTheses?: string[];
  statutoryBasis?: string[];
}

export interface DoctrineTopic {
  id: string;
  number: number;
  axisId: 'axis-1' | 'axis-2' | 'axis-3' | 'axis-4';
  title: string;
  subtitle: string;
  analyticalEmenta: string;
  readingTimeMinutes: number;
  sections: DoctrineSection[];
  relatedCaseId?: string;
  relatedConceptId?: string;
}

export const DOCTRINE_LIBRARY_DATA: DoctrineTopic[] = [
  // =========================================================================
  // EIXO 1: GESTÃO E DECISÃO INTERNA
  // =========================================================================
  {
    id: 'doc-cap-1',
    number: 1,
    axisId: 'axis-1',
    title: 'Direito Administrativo e Regime Jurídico-Administrativo',
    subtitle: 'Origens dogmáticas, fontes normativas e o binômio prerrogativas-sujeições',
    analyticalEmenta: 'A gênese do Estado de Direito e a distinção entre governar e administrar. O regime jurídico-administrativo como sistema fundado sobre dois pilares mestres: a supremacia do interesse público (prerrogativas) e a indisponibilidade do interesse público (sujeições). Princípios constitucionais expressos (art. 37, caput) e princípios implícitos da ordem administrativa.',
    readingTimeMinutes: 25,
    relatedConceptId: 'c-regime-juridico',
    relatedCaseId: 'case-1-1',
    sections: [
      {
        id: 'sec-1-1',
        number: '1.1',
        title: 'O Estado e a Função Administrativa',
        content: [
          'A evolução do Estado moderno culminou no postulado fundamental do Estado de Direito (rule of law), segundo o qual o Estado, ao mesmo tempo em que cria o ordenamento jurídico positivo, sujeita-se indelevelmente a ele.',
          'Em nosso regime federativo constitucional, a separação dos Poderes (art. 2º da CF) opera sob a lógica da preponderância e não da exclusividade estrita. Cada Poder exerce funções típicas e funções atípicas expressamente autorizadas pelo texto constitucional.',
          'A função administrativa caracteriza-se pela gestão concreta, direta e imediata dos interesses coletivos sob regime de direito público, atuando de forma subjacente à ordem constitucional e legal.'
        ],
        statutoryBasis: ['Art. 2º da Constituição Federal', 'Art. 37, caput da Constituição Federal'],
        keyTheses: [
          'A função administrativa é residual em relação à legislação (ius novum) e à jurisdição (coisa julgada formal e material).'
        ]
      },
      {
        id: 'sec-1-2',
        number: '1.2',
        title: 'O Binômio Fundamental do Regime Jurídico-Administrativo',
        content: [
          'O regime jurídico-administrativo não se confunde com o mero direito comum aplicável às relações privadas. Ele repousa sobre uma equação assimétrica justificada pela finalidade pública: a supremacia do interesse público e a indisponibilidade do interesse público.',
          '1. Supremacia do Interesse Público: confere à Administração prerrogativas instrumentais que inexistem no direito privado, tais como a presunção de legitimidade dos atos administrativos, a autoexecutoriedade, a imperatividade e a faculdade de alteração unilateral de contratos.',
          '2. Indisponibilidade do Interesse Público: estabelece os limites intransponíveis da atuação estatal. Os bens, prerrogativas e direitos públicos não pertencem ao administrador, mas à coletividade; portanto, o gestor não pode renunciar, transigir ou dispor deles sem autorização expressa em lei.'
        ],
        keyTheses: [
          'Princípio da Legalidade Estrita: enquanto o particular goza da autonomia da vontade (art. 5º, II da CF - licitude de tudo o que a lei não proíbe), o administrador só pode agir secundum legem (conforme autorização expressa da lei).'
        ]
      },
      {
        id: 'sec-1-3',
        number: '1.3',
        title: 'Princípios Expressos e Reconhecimento Jurisprudencial',
        content: [
          'O caput do art. 37 da Constituição consagra cinco princípios expressos de observância cogente em todos os níveis federativos: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência.',
          'A Impessoalidade desdobra-se na vedação de autopromoção de agentes em obras ou serviços públicos (art. 37, § 1º) e no dever de tratamento isonômico de todos os administrados.',
          'A Moralidade Administrativa constitui conceito jurídico autônomo em relação à legalidade formal: um ato pode ser formalmente legal, mas materialmente imoral e, portanto, eivado de nulidade absoluta.'
        ],
        statutoryBasis: ['Art. 37, § 1º da CF/88', 'Súmula Vinculante 13 do STF'],
        keyTheses: [
          'Súmula Vinculante 13/STF: A nomeação de cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau, viola a Constituição (nepotismo).'
        ]
      }
    ]
  },
  {
    id: 'doc-cap-2',
    number: 2,
    axisId: 'axis-1',
    title: 'Poderes e Deveres da Administração Pública',
    subtitle: 'Vinculação, discricionariedade, poder regulamentar e a patologia do abuso de poder',
    analyticalEmenta: 'Natureza jurídica dos poderes administrativos como poderes-deveres irrenunciáveis. O espectro entre atos vinculados e atos discricionários: mérito administrativo, limites normativos e controle de razoabilidade. Poder hierárquico (delegação e avocação). Poder disciplinar perante vínculos especiais. Teoria do abuso de poder: desvio de finalidade versus excesso de poder.',
    readingTimeMinutes: 20,
    relatedConceptId: 'c-poderes-adm',
    relatedCaseId: 'case-1-2',
    sections: [
      {
        id: 'sec-2-1',
        number: '2.1',
        title: 'Vinculação versus Discricionariedade e o Mérito Administrativo',
        content: [
          'No poder vinculado, a norma jurídica estabelece com precisão cirúrgica a única conduta cabível diante do pressuposto fático, não restando qualquer margem de liberdade ao agente (ex: expedição de licença para construir preenchidos todos os requisitos urbanísticos).',
          'No poder discricionário, a lei outorga expressamente ao administrador uma margem de valoração subjetiva balizada por critérios de oportunidade e conveniência (o chamado mérito administrativo).',
          'Controle Jurisdicional do Mérito: O Poder Judiciário não pode substituir a escolha discricionária legítima do Executivo; todavia, tem o dever constitucional de anular atos discricionários que extrapolem os limites da lei ou violem os princípios da razoabilidade e proporcionalidade.'
        ],
        keyTheses: [
          'Tema 138/STF: O controle jurisdicional do ato administrativo discricionário é legítimo sob a ótica da legalidade, moralidade, razoabilidade e proporcionalidade, sendo vedada apenas a invasão do mérito puramente político.'
        ]
      },
      {
        id: 'sec-2-2',
        number: '2.2',
        title: 'A Teoria do Abuso de Poder',
        content: [
          'O abuso de poder constitui espécie do gênero ilícito administrativo, caracterizando-se pela atuação estatal defeituosa. Subdivide-se em duas modalidades perfeitamente diferenciadas pela dogmática jurídica:',
          '1. Excesso de Poder (Vício de Competência): o agente público atua além ou fora dos limites da competência legal que lhe foi atribuída.',
          '2. Desvio de Poder ou Desvio de Finalidade (Vício de Finalidade): o agente atua formalmente dentro de sua esfera de atribuições, mas desvia a finalidade do ato para alcançar objetivo privado, perseguição pessoal, favorecimento de terceiros ou finalidade pública diversa daquela tipificada pela lei.'
        ],
        statutoryBasis: ['Lei 4.717/1965 (Ação Popular, art. 2º, e e parágrafo único, e)'],
        keyTheses: [
          'O desvio de finalidade constitui vício absoluto e insanável, fulminando o ato de nulidade de pleno direito.'
        ]
      }
    ]
  },
  {
    id: 'doc-cap-3',
    number: 3,
    axisId: 'axis-2',
    title: 'Poder de Polícia Administrativa',
    subtitle: 'Conceito positivo, atributos executórios, limites constitucionais e delegação',
    analyticalEmenta: 'A atividade de contenção e disciplina de direitos individuais em prol da convivência coletiva e da segurança pública. Conceito dogmático nos termos do art. 78 do Código Tributário Nacional. Atributos clássicos: discricionariedade, autoexecutoriedade e coercibilidade. Distinção entre polícia administrativa e polícia judiciária. A controvérsia sobre a delegação a empresas estatais.',
    readingTimeMinutes: 20,
    relatedConceptId: 'c-poder-policia',
    relatedCaseId: 'case-2-1',
    sections: [
      {
        id: 'sec-3-1',
        number: '3.1',
        title: 'Conceito e Atributos Clássicos',
        content: [
          'Define-se poder de polícia (art. 78 do CTN) como a atividade da Administração Pública que, regulando a prática de ato ou abstenção de fato, em razão de interesse público concernente à segurança, à higiene, à ordem, aos costumes ou aos direitos individuais e coletivos, limita ou disciplina direito ou liberdade.',
          '1. Discricionariedade: faculdade da Administração de selecionar o momento de agir e a escala sancionatória cabível, ressalvadas as hipóteses vinculadas (como a concessão de licenças).',
          '2. Autoexecutoriedade: faculdade de impor e executar diretamente a medida de polícia (apreender bens impróprios, embargar obra clandestina, interditar estabelecimento) sem necessidade de autorização judicial prévia.',
          '3. Coercibilidade: imposição imperativa que autoriza o emprego de força estatal proporcional em caso de resistência do particular.'
        ],
        statutoryBasis: ['Art. 78 da Lei 5.172/1966 (Código Tributário Nacional)'],
        keyTheses: [
          'Exceção da Autoexecutoriedade: A sanção de multa pecuniária não goza de autoexecutoriedade; seu adimplemento forçado exige ajuizamento de Execução Fiscal perante o Judiciário.'
        ]
      },
      {
        id: 'sec-3-2',
        number: '3.2',
        title: 'O Ciclo de Polícia e a Delegação a Entidades Privadas',
        content: [
          'O poder de polícia desdobra-se em quatro fases sucessivas: 1) Ordem de polícia (legislação); 2) Consentimento de polícia (anuência prévia, como alvarás); 3) Fiscalização de polícia (vistorias e monitoramento); 4) Sanção de polícia (aplicação de penalidades).',
          'A jurisprudência constitucional do Supremo Tribunal Federal assentou que o consentimento e a fiscalização podem ser delegados a pessoas jurídicas de direito privado da Administração Indireta.',
          'Quanto à sanção de polícia, o STF evoluiu seu entendimento no Tema 532 de Repercussão Geral, autorizando a aplicação de sanções de trânsito por empresas públicas ou sociedades de economia mista sob requisitos estritos.'
        ],
        keyTheses: [
          'Tema 532/STF: É constitucional a delegação do poder de polícia, por meio de lei, a pessoas jurídicas de direito privado integrantes da administração pública indireta de capital social majoritariamente público que prestem exclusivamente serviço público de atuação própria do Estado e em regime não concorrencial.'
        ]
      }
    ]
  },
  {
    id: 'doc-cap-4',
    number: 4,
    axisId: 'axis-1',
    title: 'Teoria Geral do Ato Administrativo',
    subtitle: 'Elementos constitutivos, atributos, vícios de legalidade, convalidação e extinção',
    analyticalEmenta: 'A anatomia do ato administrativo unilateral. Os cinco elementos de validade: Competência, Finalidade, Forma, Motivo e Objeto. Os atributos da presunção de legitimidade, autoexecutoriedade, tipicidade e imperatividade. A Teoria dos Motivos Determinantes. O regime das nulidades: vícios sanáveis e insanáveis. Convalidação retroativa (ex tunc), anulação (ex tunc) e revogação (ex nunc).',
    readingTimeMinutes: 30,
    relatedConceptId: 'c-elementos-ato',
    relatedCaseId: 'case-1-1',
    sections: [
      {
        id: 'sec-4-1',
        number: '4.1',
        title: 'Os Cinco Elementos Constitutivos de Validade',
        content: [
          'A perfeição e validade do ato administrativo subordinam-se à presença concomitante de cinco elementos imperativos (art. 2º da Lei 4.717/1965):',
          '1. Competência (Sujeito): poder funcional outorgado por lei ao agente. Possui as características de irrenunciabilidade, imprescritibilidade e intransferibilidade, admitindo delegação e avocação quando não exclusivas.',
          '2. Finalidade: o escopo mediato de interesse público tutelado pela norma jurídica. É sempre vinculada.',
          '3. Forma: a maneira pela qual a vontade administrativa se exterioriza formalmente no mundo do direito. Em regra, o ato administrativo é formal, escrito e motivado.',
          '4. Motivo: os pressupostos fáticos de fato e os fundamentos de direito que ensejam a edição do ato.',
          '5. Objeto (Conteúdo): a alteração jurídica imediata produzida pelo ato na ordem jurídica (criar, alterar, extinguir direitos).'
        ],
        statutoryBasis: ['Art. 2º da Lei 4.717/1965', 'Art. 50 da Lei 9.784/1999'],
        keyTheses: [
          'Teoria dos Motivos Determinantes: Se a autoridade motiva o ato administrativo, a validade dele fica indelevelmente vinculada à veracidade e legalidade dos motivos declarados; caso sejam falsos ou inexistentes, o ato é nulo de pleno direito.'
        ]
      },
      {
        id: 'sec-4-2',
        number: '4.2',
        title: 'Convalidação, Anulação e Revogação',
        content: [
          '1. Convalidação (Sanatória): ato administrativo pelo qual a autoridade competente supre o defeito de ato anterior que padeça de vício sanável, com eficácia retroativa (ex tunc). São convalidáveis apenas os vícios de competência (desde que não exclusiva) e de forma (desde que a lei não a exija como requisito ad solemnitatem), contanto que não acarretem lesão ao interesse público nem prejuízo a terceiros.',
          '2. Anulação: declaração de invalidade do ato praticado com vício de legalidade ou ilegitimidade. Pode ser pronunciada pela própria Administração ou pelo Poder Judiciário, produzindo efeitos retroativos (ex tunc) e desconstituindo todos os efeitos já operados.',
          '3. Revogação: supressão de ato administrativo perfeito, válido e plenamente eficaz, fundamentada em juízo superveniente de conveniência e oportunidade da Administração. É ato privativo do Poder Executivo, não podendo ser decretada pelo Judiciário em controle externo de mérito, e produz efeitos prospectivos (ex nunc).'
        ],
        statutoryBasis: ['Art. 53 a 55 da Lei 9.784/1999', 'Súmula 473 do STF'],
        keyTheses: [
          'Súmula 473/STF: A Administração pode anular seus próprios atos, quando eivados de vícios que os tornam ilegais, porque deles não se originam direitos; ou revogá-los, por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos.'
        ]
      }
    ]
  },
  {
    id: 'doc-cap-5',
    number: 5,
    axisId: 'axis-3',
    title: 'Contratos Administrativos',
    subtitle: 'Cláusulas exorbitantes, equilíbrio econômico-financeiro e a teoria da imprevisão',
    analyticalEmenta: 'A natureza bilateral dos ajustes celebrados pela Administração sob regime de direito público. As cláusulas exorbitantes: modificação unilateral, rescisão unilateral, fiscalização, sanções diretas e ocupação temporária. A intangibilidade constitucional da equação econômico-financeira (art. 37, XXI da CF). Diferenças entre reajuste por índices, repactuação e revisão extraordinária.',
    readingTimeMinutes: 25,
    relatedConceptId: 'c-contratos-equilibrio',
    relatedCaseId: 'case-3-1',
    sections: [
      {
        id: 'sec-5-1',
        number: '5.1',
        title: 'O Regime Exorbitante do Contrato Público',
        content: [
          'Os contratos administrativos distinguem-se ontologicamente dos negócios jurídicos privados em razão da derrogação parcial do princípio da igualdade entre as partes.',
          'A lei confere à Administração prerrogativas soberanas denominadas cláusulas exorbitantes (art. 104 da Lei 14.133/2021):',
          '1. Modificação unilateral qualitativa e quantitativa (limitada aos tetos legais de 25% para acréscimos/supressões e 50% para reformas de edifícios);',
          '2. Rescisão unilateral por motivo de interesse público ou inadimplemento;',
          '3. Aplicação direta de penalidades administrativas contratualmente previstas;',
          '4. Ocupação provisória de bens e serviços vinculados à execução em caso de serviços essenciais.'
        ],
        statutoryBasis: ['Art. 104 e 124 da Lei 14.133/2021'],
        keyTheses: [
          'A mitigação da exceptio non adimpleti contractus: o particular não pode paralisar imediatamente a prestação por atraso de pagamento estatal, devendo aguardar os prazos legais mínimos antes de suspender a execução.'
        ]
      },
      {
        id: 'sec-5-2',
        number: '5.2',
        title: 'A Intangibilidade do Equilíbrio Econômico-Financeiro',
        content: [
          'Como contrapartida protetiva às cláusulas exorbitantes, a Constituição Federal (art. 37, XXI) assegura a preservação do equilíbrio econômico-financeiro inicial da proposta contratada.',
          'A doutrina distingue com rigor as hipóteses de recomposição patrimonial:',
          '1. Reajuste em Sentido Estrito: destina-se a neutralizar a perda do poder aquisitivo da moeda decorrente da inflação ordinária, mediante aplicação dos índices previstos no edital após o decurso de 1 ano.',
          '2. Repactuação: modalidade de reajuste aplicada a serviços contínuos com dedicação exclusiva de mão de obra, decorrente de variação dos custos em convenções coletivas de trabalho.',
          '3. Revisão (Reequilíbrio Extraordinário): fundamenta-se na Teoria da Imprevisão e decorre de fatos imprevisíveis, ou previsíveis de consequências incalculáveis, que desfigurem completamente a equação econômico-financeira do pacto (álea extraordinária, fato do príncipe ou fato da administração).'
        ],
        statutoryBasis: ['Art. 37, XXI da Constituição Federal', 'Art. 124, II, d da Lei 14.133/2021'],
        keyTheses: [
          'Fato da Administração: ato ou omissão direta do órgão público contratante que onera ou impede a execução do ajuste específico (ex: atraso na liberação da área desapropriada).'
        ]
      }
    ]
  },
  {
    id: 'doc-cap-6',
    number: 6,
    axisId: 'axis-3',
    title: 'Licitações Públicas (Nova Lei 14.133)',
    subtitle: 'Princípios fundamentais, modalidades, critérios de julgamento e contratação direta',
    analyticalEmenta: 'O regime unificado das licitações sob a égide da Lei 14.133/2021. Princípios norteadores: planejamento, segregação de funções e competitividade. Modalidades vigentes: Pregão, Concorrência, Diálogo Competitivo, Concurso e Leilão. A extinção formal de Tomada de Preços e Convite. Contratação Direta: Inexigibilidade de licitação (inviabilidade de competição) versus Dispensa de licitação (viabilidade da disputa com autorização normativa expressa).',
    readingTimeMinutes: 30,
    relatedConceptId: 'c-licitacoes-principios',
    relatedCaseId: 'case-3-2',
    sections: [
      {
        id: 'sec-6-1',
        number: '6.1',
        title: 'As Modalidades na Lei 14.133/2021',
        content: [
          'A Lei 14.133/2021 estabeleceu rol taxativo de cinco modalidades de licitação (art. 28), extinguindo o Convite e a Tomada de Preços:',
          '1. Pregão: modalidade obrigatória para aquisição de bens e serviços comuns, cujos padrões de desempenho possam ser objetivamente definidos pelo edital por meio de especificações usuais de mercado. Critérios: menor preço ou maior desconto.',
          '2. Concorrência: destinada à contratação de bens e serviços especiais e de obras e serviços de engenharia. Admite múltiplos critérios de julgamento.',
          '3. Diálogo Competitivo: modalidade inovadora para contratações complexas em que a Administração não possui a solução técnica plenamente definida, dialogando previamente com licitantes previamente qualificados.',
          '4. Concurso: escolha de trabalho técnico, científico ou artístico, mediante concessão de prêmio ou remuneração.',
          '5. Leilão: alienação de bens móveis inservíveis ou imóveis da Administração.'
        ],
        statutoryBasis: ['Art. 28 da Lei 14.133/2021'],
        keyTheses: [
          'A fase preparatória (planejamento, Estudos Técnicos Preliminares e Termo de Referência) tornou-se a espinha dorsal de conformidade do certame licitatório.'
        ]
      },
      {
        id: 'sec-6-2',
        number: '6.2',
        title: 'Contratação Direta: Inexigibilidade versus Dispensa',
        content: [
          'A Constituição prevê o dever de licitar como regra geral, admitindo hipóteses expressas de contratação direta em caráter estritamente excepcional:',
          '1. Inexigibilidade de Licitação (art. 74): ocorre quando há inviabilidade fática ou jurídica de competição. O rol do art. 74 é exemplificativo e abrange o fornecedor exclusivo, a contratação de profissional de notória especialização para serviço técnico intelectual singular, e profissionais do setor artístico consagrados.',
          '2. Dispensa de Licitação (art. 75): ocorre em hipóteses nas quais a competição seria perfeitamente viável, mas a lei autoriza a contratação direta por conveniência pública (baixo valor, emergência ou calamidade pública, licitação deserta ou fracassada).'
        ],
        statutoryBasis: ['Art. 74 e 75 da Lei 14.133/2021', 'Art. 337-E do Código Penal'],
        keyTheses: [
          'Súmula 250/TCU: A contratação direta por inexigibilidade fundada em fornecedor exclusivo exige comprovação cabal da exclusividade por atestado idôneo, vedada a escolha por mera preferência subjetiva.'
        ]
      }
    ]
  },
  {
    id: 'doc-cap-7',
    number: 7,
    axisId: 'axis-3',
    title: 'Serviços Públicos e Regime Tarifário',
    subtitle: 'Conceito positivo, princípios setoriais e a distinção entre taxa e tarifa',
    analyticalEmenta: 'A titularidade estatal na prestação de utilidades aos cidadãos. Princípios do serviço público: continuidade, modicidade tarifária, generalidade e atualidade. Classificação dos serviços públicos: uti singuli versus uti universi. A controvérsia sobre a remuneração: natureza jurídica de taxa (tributo vinculado compulsório) versus tarifa ou preço público (remuneração contratual facultativa). Legalidade da interrupção do serviço por inadimplemento.',
    readingTimeMinutes: 20,
    relatedConceptId: 'c-concessoes-servicos',
    sections: [
      {
        id: 'sec-7-1',
        number: '7.1',
        title: 'Princípios Regentes e Continuidade do Serviço',
        content: [
          'Os serviços públicos orientam-se pelo princípio da continuidade, vedada a paralisação arbitrária das prestações essenciais.',
          'Todavia, a Lei 8.987/1995 (art. 6º, § 3º) autoriza expressamente a interrupção da prestação em duas hipóteses: 1) em situação de emergência ou por razões de ordem técnica; 2) por inadimplemento do usuário, após prévio aviso.',
          'A jurisprudência fixou limites estritos à interrupção: veda-se o corte de energia ou água em hospitais, prontos-socorros e unidades cuja paralisação ponha em risco a vida humana ou a segurança coletiva.'
        ],
        statutoryBasis: ['Art. 6º da Lei 8.987/1995'],
        keyTheses: [
          'Tema 84/STF: É legítimo o corte no fornecimento de serviços públicos por inadimplemento do usuário, condicionado à notificação prévia e resguardados estabelecimentos essenciais.'
        ]
      },
      {
        id: 'sec-7-2',
        number: '7.2',
        title: 'Taxa versus Preço Público (Tarifa)',
        content: [
          'A diferenciação entre taxa e tarifa é matriz clássica do Direito Administrativo e Tributário:',
          '1. Taxa: tributo cobrado pela utilização efetiva ou potencial de serviços públicos específicos e divisíveis (uti singuli) prestados diretamente pelo Estado ou postos à sua disposição (art. 145, II da CF). Rege-se pelo princípio da legalidade estrita e da compulsoriedade.',
          '2. Tarifa (Preço Público): remuneração de natureza contratual e facultativa, devida pelo usuário pela fruição efetiva de serviço delegado a concessionárias ou permissionárias.'
        ],
        keyTheses: [
          'Súmula Vinculante 19: A taxa cobrada exclusivamente em razão dos serviços públicos de coleta, remoção e tratamento de lixo não viola o artigo 145, II, da Constituição Federal.'
        ]
      }
    ]
  },
  {
    id: 'doc-cap-8',
    number: 8,
    axisId: 'axis-3',
    title: 'Concessões, Permissões e Parcerias Público-Privadas',
    subtitle: 'Modalidades de delegação, equação do parceiro privado e formas de extinção',
    analyticalEmenta: 'Regime jurídico da concessão comum (Lei 8.987/1995) e das Parcerias Público-Privadas (Lei 11.079/2004: PPP Patrocinada e PPP Administrativa). As formas jurídicas de extinção antecipada da concessão: Encampação (retomada por interesse público com prévia lei e indenização), Caducidade (extinção punitiva por inadimplemento culposo da concessionária), Rescisão e Anulação.',
    readingTimeMinutes: 25,
    relatedConceptId: 'c-concessoes-servicos',
    sections: [
      {
        id: 'sec-8-1',
        number: '8.1',
        title: 'Extinção da Concessão: Encampação versus Caducidade',
        content: [
          'A concessão extingue-se normalmente pelo advento do termo contratual (reversão dos bens). Todavia, a extinção anormal antes do termo pode ocorrer por diferentes institutos:',
          '1. Encampação (Resgate): retomada coativa do serviço pelo poder concedente durante o prazo da concessão, por motivo de interesse público superveniente. Exige obrigatoriamente: lei autorizativa específica e pagamento prévio de indenização das parcelas dos investimentos ainda não amortizados.',
          '2. Caducidade: decretação de rescisão unilateral pela Administração fundada no inadimplemento total ou parcial das obrigações contratuais pela concessionária (má prestação do serviço, descumprimento de cronograma de obras). Exige processo administrativo prévio com contraditório e ampla defesa.',
          '3. Rescisão Judicial: promovida pela concessionária perante o Judiciário em razão de descumprimento das obrigações pelo poder concedente.'
        ],
        statutoryBasis: ['Arts. 35 a 39 da Lei 8.987/1995'],
        keyTheses: [
          'Encampação = Interesse público com lei e prévia indenização; Caducidade = Culpa e inadimplemento da concessionária.'
        ]
      }
    ]
  },
  {
    id: 'doc-cap-9',
    number: 9,
    axisId: 'axis-1',
    title: 'Organização Administrativa do Estado',
    subtitle: 'Centralização, desconcentração, descentralização e o regime da Administração Indireta',
    analyticalEmenta: 'A estrutura orgânica da Administração Pública brasileira. Centralização versus Descentralização (política e administrativa). Desconcentração como técnica de partição interna de competências em órgãos sem personalidade jurídica. A Administração Pública Indireta: Autarquias, Fundações Públicas, Empresas Públicas e Sociedades de Economia Mista. O Terceiro Setor (OS, OSCIP e parcerias).',
    readingTimeMinutes: 25,
    relatedConceptId: 'c-regime-juridico',
    sections: [
      {
        id: 'sec-9-1',
        number: '9.1',
        title: 'Desconcentração versus Descentralização',
        content: [
          '1. Desconcentração: distribuição interna de competências dentro de uma mesma pessoa jurídica. Cria órgãos públicos desprovidos de personalidade jurídica própria, mantendo vínculo estrito de subordinação hierárquica (ex: criação de uma secretaria ou departamento).',
          '2. Descentralização: transferência da atividade estatal para outra pessoa jurídica distinta (da Administração Indireta ou particular). Não gera hierarquia nem subordinação, mas controle finalístico ou tutela administrativa (supervisão ministerial).'
        ],
        keyTheses: [
          'Desconcentração divide órgãos na mesma pessoa (gera hierarquia); Descentralização transfere para outra pessoa (não há hierarquia, apenas tutela).'
        ]
      },
      {
        id: 'sec-9-2',
        number: '9.2',
        title: 'Entidades da Administração Indireta',
        content: [
          'A Administração Indireta é integrada por quatro categorias criadas ou autorizadas por lei específica (art. 37, XIX da CF):',
          '1. Autarquias: pessoas jurídicas de direito público criadas diretamente por lei para desempenhar atividades típicas de Estado. Gozam de imunidade tributária recíproca, prazo em dobro e precatório.',
          '2. Fundações Públicas: patrimônio personalizado destinado a fins sociais e não lucrativos. Podem ser de direito público (autarquias fundacionais) ou de direito privado.',
          '3. Empresas Públicas: pessoas jurídicas de direito privado, com capital 100% público, sob qualquer forma societária.',
          '4. Sociedades de Economia Mista: pessoas jurídicas de direito privado, capital misto (maioria com direito a voto pertencente ao ente público), constituídas obrigatoriamente sob a forma de Sociedade Anônima (S/A).'
        ],
        statutoryBasis: ['Art. 37, XIX da CF/88', 'Decreto-Lei 200/1967']
      }
    ]
  },
  {
    id: 'doc-cap-10',
    number: 10,
    axisId: 'axis-2',
    title: 'Responsabilidade Civil do Estado',
    subtitle: 'Evolução dogmática, Teoria do Risco Administrativo, dano por omissão e ação regressiva',
    analyticalEmenta: 'Da irresponsabilidade feudal à consagração constitucional da responsabilidade objetiva (art. 37, § 6º da CF). A Teoria do Risco Administrativo e seus três pressupostos inafastáveis: conduta oficial, dano certo e nexo causal direto. Causas excludentes da responsabilidade estatal. A responsabilidade por condutas omissivas: Teoria da Falta do Serviço (faute du service). O direito de regresso contra o agente culpado.',
    readingTimeMinutes: 25,
    relatedConceptId: 'c-responsabilidade-civil',
    relatedCaseId: 'case-2-2',
    sections: [
      {
        id: 'sec-10-1',
        number: '10.1',
        title: 'A Teoria do Risco Administrativo',
        content: [
          'O art. 37, § 6º da Constituição consagra a responsabilidade civil objetiva das pessoas jurídicas de direito público e das de direito privado prestadoras de serviços públicos pelos danos que seus agentes causarem a terceiros.',
          'A caracterização prescinde de demonstração de dolo ou culpa, exigindo apenas a tríade:',
          '1. Conduta comissiva estatal perpetrada por agente público atuando nessa qualidade;',
          '2. Dano jurídico certo e anormal suportado pelo administrado;',
          '3. Nexo de causalidade direto e imediato entre a conduta e o evento lesivo.',
          'Excludentes: Por adotar a Teoria do Risco Administrativo (e não do risco integral), o Estado pode elidir sua responsabilidade demonstrando culpa exclusiva da vítima, caso fortuito ou força maior.'
        ],
        statutoryBasis: ['Art. 37, § 6º da Constituição Federal', 'Art. 43 do Código Civil'],
        keyTheses: [
          'Tema 940/STF: A ação de indenização por danos causados por agente público deve ser ajuizada contra o Estado ou pessoa jurídica prestadora de serviço público, sendo vedado o ajuizamento direto contra o servidor público causador do dano.'
        ]
      },
      {
        id: 'sec-10-2',
        number: '10.2',
        title: 'Responsabilidade por Omissão Estatal (Faute du Service)',
        content: [
          'Em relação aos atos omissivos genéricos (ex: crimes cometidos por terceiros na via pública, desastres naturais decorrentes de chuvas), a doutrina e a jurisprudência majoritárias aplicam a Teoria Subjetiva da Falta do Serviço (faute du service).',
          'Nessa hipótese, a vítima deve comprovar que o Estado tinha o dever legal específico de agir para impedir o dano, e que o serviço não funcionou, funcionou tardiamente ou funcionou de forma manifestamente defeituosa.',
          'Exceção de Omissão Específica: Quando o Estado assume a custódia física de pessoas ou coisas (detentos em presídios, pacientes em hospitais públicos, alunos em escolas públicas), sua omissão atrai a responsabilidade objetiva em razão do dever de proteção e vigilância especial.'
        ],
        keyTheses: [
          'Tema 592/STF: Em caso de morte de detento sob custódia estatal, a responsabilidade civil do Estado é objetiva caso haja inobservância do dever constitucional de preservação da integridade física do preso.'
        ]
      }
    ]
  },
  {
    id: 'doc-cap-11',
    number: 11,
    axisId: 'axis-1',
    title: 'Regime Jurídico dos Servidores Públicos',
    subtitle: 'Classificação dos agentes, investidura, estabilidade constitucional e regime disciplinar',
    analyticalEmenta: 'A distinção entre agentes políticos, servidores públicos estatutários e empregados públicos celetistas. Concurso público e suas diretrizes constitucionais. A aquisição da estabilidade após 3 anos de efetivo exercício e avaliação de desempenho. Hipóteses constitucionais de perda do cargo público estável. Processo Administrativo Disciplinar (PAD): princípios do devido processo legal, composição da comissão processante e garantias de defesa.',
    readingTimeMinutes: 30,
    relatedConceptId: 'c-pad-estabilidade',
    relatedCaseId: 'case-1-2',
    sections: [
      {
        id: 'sec-11-1',
        number: '11.1',
        title: 'Estabilidade Constitucional e Perda do Cargo',
        content: [
          'O servidor público nomeado para cargo de provimento efetivo em virtude de concurso público adquire estabilidade após 3 anos de efetivo exercício (art. 41 da CF), condicionado à aprovação em avaliação especial de desempenho.',
          'O servidor público estável só perderá o cargo em quatro hipóteses taxativas:',
          '1. Sentença judicial transitada em julgado;',
          '2. Processo administrativo disciplinar no qual lhe seja assegurada ampla defesa;',
          '3. Procedimento de avaliação periódica de desempenho, na forma de lei complementar;',
          '4. Excesso de despesa com pessoal além dos limites fiscais estabelecidos (art. 169 da CF).'
        ],
        statutoryBasis: ['Art. 41 e 169 da Constituição Federal'],
        keyTheses: [
          'Reintegração: Invalidada por sentença judicial a demissão do servidor estável, ele será reintegrado ao cargo, e o eventual ocupante da vaga será reconduzido ao cargo de origem, sem direito a indenização.'
        ]
      },
      {
        id: 'sec-11-2',
        number: '11.2',
        title: 'O Processo Administrativo Disciplinar (PAD)',
        content: [
          'O regime disciplinar exige a estrita observância das garantias constitucionais do contraditório e da ampla defesa sob pena de nulidade absoluta insanável do procedimento.',
          'A comissão processante do PAD deve ser composta obrigatoriamente por 3 servidores estáveis (art. 149 da Lei 8.112/1990) de nível de escolaridade igual ou superior ao do indiciado.',
          'A jurisprudência sumulada do Supremo Tribunal Federal assentou que a presença de advogado é facultativa, não gerando nulidade automática caso o servidor prefira exercer a autodefesa.'
        ],
        statutoryBasis: ['Art. 143 a 182 da Lei 8.112/1990', 'Súmula Vinculante 5 do STF'],
        keyTheses: [
          'Súmula Vinculante 5/STF: A falta de defesa técnica por advogado no processo administrativo disciplinar não ofende a Constituição.'
        ]
      }
    ]
  },
  {
    id: 'doc-cap-12',
    number: 12,
    axisId: 'axis-2',
    title: 'Intervenção do Estado na Propriedade Privada',
    subtitle: 'Modalidades restritivas e supressivas: servidão, requisição, tombamento e limitações',
    analyticalEmenta: 'A função social da propriedade e as formas de intervenção pública. Intervenções restritivas (que mantêm o domínio nas mãos do particular): servidão administrativa, requisição administrativa em perigo público iminente, ocupação temporária, tombamento de patrimônio histórico-cultural e limitações administrativas gerais. Comparativo de institutos e regime indenizatório.',
    readingTimeMinutes: 20,
    relatedConceptId: 'c-propriedade-desapropriacao',
    sections: [
      {
        id: 'sec-12-1',
        number: '12.1',
        title: 'Espécies Restritivas de Intervenção',
        content: [
          '1. Servidão Administrativa: direito real público sobre coisa alheia, que grava imóvel particular com ônus de uso público (ex: passagem de cabos de transmissão elétrica ou aquedutos). Indeniza-se apenas o prejuízo efetivo causado ao uso da propriedade.',
          '2. Requisição Administrativa: ato unilateral e autoexecutório pelo qual o Estado utiliza temporariamente bens ou serviços particulares em situação de perigo público iminente (art. 5º, XXV da CF). A indenização é ulterior e condicionada à comprovação de dano.',
          '3. Tombamento: intervenção restritiva destinada a proteger o patrimônio histórico, artístico, arqueológico ou paisagístico. Não retira a propriedade do particular, mas impõe restrições severas à modificação ou demolição do bem.',
          '4. Limitações Administrativas: preceitos gerais e abstratos decorrentes do poder de polícia que afetam indeterminadamente propriedades para impor obrigações de não fazer (ex: recuo obrigatório de calçada).'
        ],
        statutoryBasis: ['Art. 5º, XXV da CF/88', 'Decreto-Lei 3.365/1941']
      }
    ]
  },
  {
    id: 'doc-cap-13',
    number: 13,
    axisId: 'axis-2',
    title: 'Desapropriação e Soberania Territorial',
    subtitle: 'Fases declaratória e executória, justa indenização, tredestinação e retrocessão',
    analyticalEmenta: 'Forma originária de aquisição da propriedade pelo Poder Público. Pressupostos: necessidade pública, utilidade pública ou interesse social. O princípio da justa e prévia indenização em dinheiro e as exceções constitucionais de títulos da dívida pública. A fase declaratória por decreto expropriatório e a fase executória. A tredestinação lícita versus tredestinação ilícita e o direito de retrocessão.',
    readingTimeMinutes: 25,
    relatedConceptId: 'c-propriedade-desapropriacao',
    sections: [
      {
        id: 'sec-13-1',
        number: '13.1',
        title: 'As Fases da Desapropriação e a Justa Indenização',
        content: [
          'A desapropriação compreende duas fases procedimentais distintas:',
          '1. Fase Declaratória: consubstancia-se no decreto expropriatório editado pelo Chefe do Executivo declarando a utilidade pública ou interesse social do bem. O decreto produz eficácia jurídica imediata, submetendo o bem à força expropriatória e fixando o prazo decadencial de 5 anos para a fase executória (no caso de utilidade pública).',
          '2. Fase Executória: compreende os atos concretos de avaliação do valor, imissão provisória na posse e transferência do domínio, podendo ocorrer pela via administrativa consensual ou pela via judicial contenciosa.'
        ],
        statutoryBasis: ['Decreto-Lei 3.365/1941', 'Art. 5º, XXIV da CF/88'],
        keyTheses: [
          'A imissão provisória na posse pelo Poder Público exige prévia avaliação e depósito judicial do valor arbitrado, ressalvada a comprovação de urgência em lei.'
        ]
      },
      {
        id: 'sec-13-2',
        number: '13.2',
        title: 'Tredestinação Lícita versus Ilícita e Retrocessão',
        content: [
          'A destinação dos bens desapropriados subordina-se à teoria da tredestinação:',
          '1. Tredestinação Lícita: ocorre quando o Poder Público desvia a destinação originária do bem prevista no decreto expropriatório, mas o emprega em outra finalidade igualmente de interesse público (ex: o imóvel foi desapropriado para construir escola e o Estado nele constrói posto de saúde). Não há ilegalidade e não cabe retrocessão.',
          '2. Tredestinação Ilícita: ocorre quando o bem desapropriado é transferido para particular ou empregado em finalidade privada espúria. Essa conduta viola a finalidade pública e gera o direito de retrocessão ao antigo proprietário (dever de devolução do bem pelo valor atualizado da indenização).'
        ],
        keyTheses: [
          'Tema 1019/STF: A retrocessão só é cabível na tredestinação ilícita, inexistindo direito à recomposição patrimonial caso o imóvel tenha sido aproveitado em outra destinação legítima de interesse público.'
        ]
      }
    ]
  },
  {
    id: 'doc-cap-14',
    number: 14,
    axisId: 'axis-3',
    title: 'Atuação do Estado no Domínio Econômico e Regulação',
    subtitle: 'Monopólio constitucional, exploração direta da atividade econômica e agências reguladoras',
    analyticalEmenta: 'Os princípios da ordem econômica constitucional (art. 170 da CF). A atuação do Estado como agente normativo e regulador da atividade econômica versus exploração direta em caráter excepcional (art. 173 da CF: relevante interesse coletivo ou imperativo de segurança nacional). O poder normativo técnico das agências reguladoras autárquicas e seus limites perante a lei.',
    readingTimeMinutes: 20,
    relatedConceptId: 'c-concessoes-servicos',
    sections: [
      {
        id: 'sec-14-1',
        number: '14.1',
        title: 'Exploração Econômica Direta versus Atividade Reguladora',
        content: [
          'O modelo econômico constitucional brasileiro é fundado na livre iniciativa e na livre concorrência.',
          'A exploração direta da atividade econômica pelo Estado é subsidiária e excepcional, permitida apenas quando necessária a imperativos da segurança nacional ou a relevante interesse coletivo (art. 173 da CF), atuando por meio de empresas públicas e sociedades de economia mista que se sujeitam ao regime jurídico próprio das empresas privadas.',
          'Como agente normativo e regulador (art. 174 da CF), o Estado exerce as funções de fiscalização, incentivo e planejamento, operando preponderantemente por meio de Agências Reguladoras de natureza autárquica especial.'
        ],
        statutoryBasis: ['Arts. 170, 173 e 174 da Constituição Federal', 'Lei 13.848/2019 (Lei Geral das Agências Reguladoras)']
      }
    ]
  },
  {
    id: 'doc-cap-15',
    number: 15,
    axisId: 'axis-4',
    title: 'Controle da Administração Pública e Improbidade',
    subtitle: 'Autotutela, controle pelos Tribunais de Contas, remédios constitucionais e a Lei 14.230',
    analyticalEmenta: 'A fiscalização da atividade administrativa sob a ótica dos Poderes da República. Autotutela e prazo decadencial quinquenal (art. 54 da Lei 9.784/1999). Controle Externo: competências constitucionais dos Tribunais de Contas e limites cautelares. Controle Judicial: Mandado de Segurança, Ação Popular e Ação Civil Pública. O regime da Nova Lei de Improbidade Administrativa (Lei 14.230/2021) e a revogação da modalidade culposa.',
    readingTimeMinutes: 30,
    relatedConceptId: 'c-autotutela',
    relatedCaseId: 'case-4-1',
    sections: [
      {
        id: 'sec-15-1',
        number: '15.1',
        title: 'Autotutela e o Limite da Decadência Quinquenal',
        content: [
          'O poder de autotutela autoriza a Administração a anular seus próprios atos ilegais e revogar os inoportunos.',
          'Todavia, esse poder não é perpétuo: o art. 54 da Lei 9.784/1999 consagra que o direito da Administração de anular atos que produzam efeitos favoráveis aos destinatários decai em 5 anos, salvo comprovada má-fé.',
          'A decadência estabiliza a situação jurídica no tempo em homenagem ao princípio da segurança jurídica, vedando a anulação sumária após o transcurso do prazo quinquenal.'
        ],
        statutoryBasis: ['Art. 54 da Lei 9.784/1999', 'Súmula 473 do STF'],
        keyTheses: [
          'Tema 445/STF: Em atenção aos princípios da segurança jurídica e da confiança legítima, os Tribunais de Contas estão sujeitos ao prazo de 5 anos para o julgamento da legalidade do ato de concessão inicial de aposentadoria.'
        ]
      },
      {
        id: 'sec-15-2',
        number: '15.2',
        title: 'A Nova Lei de Improbidade Administrativa (Lei 14.230/2021)',
        content: [
          'A reforma da Lei de Improbidade Administrativa operou transformação estrutural no sancionamento da conduta pública:',
          '1. Extinção da Modalidade Culposa: foi revogada toda forma de improbidade culposa por negligência ou imperícia. Toda conduta ímproba exige agora DOLO ESPECÍFICO (vontade livre e consciente de alcançar o resultado ilícito tipificado nos arts. 9º, 10 ou 11).',
          '2. Divergência Interpretativa: o art. 1º, § 8º prevê expressamente que não configura improbidade a divergência interpretativa da lei baseada em jurisprudência ou doutrina razoável.',
          '3. Taxatividade dos Princípios: o rol do art. 11 tornou-se taxativo e estrito.'
        ],
        statutoryBasis: ['Lei 8.429/1992 com redação dada pela Lei 14.230/2021'],
        keyTheses: [
          'Tema 1199/STF: É necessária a comprovação de responsabilidade subjetiva para a tipificação dos atos de improbidade administrativa, exigindo-se nos casos dos artigos 9º, 10 e 11 a presença de dolo.'
        ]
      }
    ]
  },
  {
    id: 'doc-cap-16',
    number: 16,
    axisId: 'axis-2',
    title: 'Regime Jurídico dos Bens Públicos',
    subtitle: 'Classificação tripartida, afetação e desafetação, regime protetivo e uso privativo',
    analyticalEmenta: 'O patrimônio das pessoas jurídicas de direito público. A classificação do Código Civil (art. 99): bens de uso comum do povo, bens de uso especial e bens dominicais. O fenômeno da afetação e desafetação. As prerrogativas de proteção: inalienabilidade dos bens afetados, impenhorabilidade, imprescritibilidade (vedação absoluta de usucapião) e não onerabilidade. O uso privativo de bens públicos por particulares.',
    readingTimeMinutes: 20,
    relatedConceptId: 'c-bens-publicos',
    sections: [
      {
        id: 'sec-16-1',
        number: '16.1',
        title: 'Classificação Tripartida e os Quatro "Is"',
        content: [
          'O art. 99 do Código Civil categoriza os bens públicos sob a ótica de sua destinação:',
          '1. Bens de Uso Comum do Povo: destinados ao uso franqueado a toda a coletividade sem necessidade de consentimento especial (mares, rios, praças, estradas).',
          '2. Bens de Uso Especial: afetados à prestação de serviços públicos específicos ou ao aparelhamento estatal (fóruns, hospitais públicos, quartéis, escolas públicas).',
          '3. Bens Dominicais: constituem o patrimônio disponível do Estado, desprovidos de afetação pública imediata. São os únicos passíveis de alienação, cumpridos os requisitos de interesse público e licitação.',
          'Regime Protetivo: Os bens públicos em geral são imprescritíveis (impossíveis de usucapião) e impenhoráveis (pagamentos decorrem de precatórios judiciais). Enquanto afetados, são inalienáveis e inoneráveis.'
        ],
        statutoryBasis: ['Art. 98 a 103 do Código Civil', 'Art. 183, § 3º e 191, parágrafo único da CF/88'],
        keyTheses: [
          'Súmula 340/STF: Os bens dominicais, como os demais bens públicos, não podem ser adquiridos por usucapião.',
          'Súmula 619/STJ: A ocupação indevida de bem público configura mera detenção, de natureza precária, insuscetível de retenção ou indenização por benfeitorias.'
        ]
      }
    ]
  }
];
