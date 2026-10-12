import { LegalConcept } from '../types/nomos';

export const LEGAL_CONCEPTS_DATA: LegalConcept[] = [
  // ==========================================
  // EIXO 1: GESTÃO E DECISÃO INTERNA
  // ==========================================
  {
    id: 'c-regime-juridico',
    axisId: 'axis-1',
    category: 'principio',
    title: 'Regime Jurídico-Administrativo',
    tagline: 'O binômio fundamental: prerrogativas estatais vs. sujeições à lei.',
    mechanics: 'Estrutura basilar que confere à Administração poderes especiais (supremacia do interesse público) para cumprir suas funções, contrabalançados por severas restrições (indisponibilidade do interesse público, legalidade estrita e finalidade). Não há poder sem dever correlato.',
    keyElements: [
      'Supremacia do Interesse Público sobre o particular (fundamento das prerrogativas e atos unilaterais)',
      'Indisponibilidade do Interesse Público (os bens e direitos públicos pertencem à coletividade, não ao gestor)',
      'Legalidade Estrita (o particular pode fazer tudo o que a lei não proíbe; o administrador só pode fazer o que a lei expressamente autoriza)'
    ],
    attributesOrSpecies: ['Princípios Expressos (LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência)', 'Princípios Implícitos (Proporcionalidade, Razoabilidade, Autotutela, Continuidade, Segurança Jurídica)'],
    fatalFlaws: [
      'Atuação contra legem ou praeter legem sem autorização normativa',
      'Desvio de finalidade (usar prerrogativa pública para interesse privado ou perseguição/favorecimento)',
      'Rendição ou transigência indevida com o interesse público indisponível'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Supremacia vs. Indisponibilidade',
        difference: 'A supremacia confere armas e vantagens instrumentais ao Estado; a indisponibilidade cria amarras e vedações intransponíveis ao gestor.'
      }
    ],
    supremeCourtTheses: [
      'Súmula Vinculante 13 (Vedação ao nepotismo decorrente dos princípios da impessoalidade e moralidade)',
      'Tema 525/STF: A Administração tem o dever de anular atos ilegais, resguardados os direitos de terceiros de boa-fé e o prazo decadencial.'
    ],
    mnemonic: 'LIMPE (Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência)',
    relatedConceptIds: ['c-poderes-adm', 'c-elementos-ato', 'c-autotutela']
  },
  {
    id: 'c-poderes-adm',
    axisId: 'axis-1',
    category: 'poder',
    title: 'Poderes e Deveres Administrativos',
    tagline: 'Instrumentos instrumentais de ação: vinculação, discricionariedade e abuso.',
    mechanics: 'Os poderes administrativos são poderes-deveres; seu exercício não é mera faculdade, mas obrigação irrenunciável orientada ao bem comum. Dividem-se quanto à margem de escolha (vinculado vs. discricionário) e quanto à hierarquia/estrutura (hierárquico, disciplinar, regulamentar). Qualquer extrapolação configura abuso de poder.',
    keyElements: [
      'Poder Vinculado: a lei predetermina a conduta sem margem de valoração (ex: concessão de licença preenchidos os requisitos)',
      'Poder Discricionário: a lei confere margem de oportunidade e conveniência (mérito administrativo) dentro dos limites legais',
      'Poder Hierárquico: distribuição interna de competências, ordenação, delegação e avocação',
      'Poder Disciplinar: apuração de faltas e aplicação de penalidades a quem possua vínculo específico com o Estado'
    ],
    fatalFlaws: [
      'Excesso de Poder: atuar fora dos limites da competência legal atribuída',
      'Desvio de Poder (ou de Finalidade): atuar dentro da competência formal, mas com finalidade diversa da prevista em lei',
      'Omissão Abusiva: deixar de agir quando a lei impõe o dever de atuação'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Excesso de Poder vs. Desvio de Finalidade',
        difference: 'Excesso é vício de Competência (agente faz o que a lei não lhe outorgou); Desvio é vício de Finalidade (agente usa sua competência legal para alcançar fim proibido ou privado).'
      },
      {
        versusTitle: 'Poder Disciplinar vs. Poder de Polícia',
        difference: 'O disciplinar pune quem tem vínculo especial/funcional com o Estado (servidor ou contratado); o de polícia alcança a coletividade em geral sem vínculo prévio.'
      }
    ],
    supremeCourtTheses: [
      'Súmula Vinculante 5: A falta de defesa técnica por advogado no processo administrativo disciplinar não ofende a Constituição.',
      'Tema 138/STF: O controle jurisdicional de ato discricionário é legítimo quanto à legalidade, razoabilidade e proporcionalidade, vedada a invasão do mérito.'
    ],
    mnemonic: 'Abuso de Poder = Excesso (Competência) + Desvio (Finalidade)',
    relatedConceptIds: ['c-regime-juridico', 'c-elementos-ato', 'c-pad-estabilidade']
  },
  {
    id: 'c-elementos-ato',
    axisId: 'axis-1',
    category: 'ato',
    title: 'Elementos do Ato Administrativo',
    tagline: 'A anatomia quintuplicada da validade: COM-FI-FOR-M-OB.',
    mechanics: 'Todo ato administrativo exige a conjunção imperativa de 5 elementos constitutivos para ser válido. Se faltar ou estiver viciado qualquer um dos cinco, o ato é imperfeito ou nulo. Competência, Finalidade e Forma são sempre vinculados; Motivo e Objeto podem ser vinculados ou discricionários.',
    keyElements: [
      'Competência (Sujeito): atribuição legal para a prática do ato. É irrenunciável e intransferível, admitindo delegação e avocação em casos legais.',
      'Finalidade: o objetivo de interesse público tutelado pela norma. Não admite discricionariedade.',
      'Forma: exteriorização do ato no mundo jurídico (escrita, motivação, publicidade).',
      'Motivo: a situação fática e o fundamento de direito que justificam a edição do ato.',
      'Objeto (Conteúdo): o efeito jurídico imediato produzido pelo ato (criação, modificação ou extinção de direito).'
    ],
    attributesOrSpecies: ['Presunção de Legitimidade e Veracidade', 'Autoexecutoriedade', 'Tipicidade', 'Imperatividade (PATI)'],
    fatalFlaws: [
      'Incompetência insanável (usurpação de função ou competência exclusiva improrrogável)',
      'Desvio de finalidade (vício absoluto e insanável)',
      'Inexistência ou falsidade do motivo alegado (Teoria dos Motivos Determinantes)',
      'Objeto ilícito, impossível, indeterminado ou proibido por lei'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Motivo vs. Motivação',
        difference: 'Motivo é o fato e o direito que aconteceram no mundo real; Motivação é a justificativa escrita e formal exposta pela autoridade.'
      }
    ],
    supremeCourtTheses: [
      'Teoria dos Motivos Determinantes: A validade do ato vincula-se aos motivos invocados como seu fundamento; se falsos ou inexistentes, o ato é nulo.'
    ],
    mnemonic: 'COM-FI-FOR-M-OB (Competência, Finalidade, Forma, Motivo, Objeto)',
    relatedConceptIds: ['c-convalidacao', 'c-poderes-adm']
  },
  {
    id: 'c-convalidacao',
    axisId: 'axis-1',
    category: 'ato',
    title: 'Convalidação vs. Extinção do Ato',
    tagline: 'O dilema do aproveitamento: sanar o vício ou exterminar o ato?',
    mechanics: 'Quando um ato possui vício, a regra é verificar se o vício é sanável. Se o vício for de Competência (não exclusiva) ou de Forma (não essencial) e não houver lesão ao interesse público nem prejuízo a terceiros, a convalidação (sanatória retroativa - ex tunc) é possível. Se o vício for insanável (motivo falso, finalidade desviada, objeto ilícito), impõe-se a anulação (ex tunc). Já atos válidos, convenientes e inoportunos são extintos por revogação (ex nunc).',
    keyElements: [
      'Convalidação (Sanatória): ato pelo qual a autoridade supre vício sanável de ato anterior, com efeitos retroativos (ex tunc)',
      'Anulação: supressão de ato ilegal/ilegítimo, praticada pela própria Administração ou pelo Judiciário, com efeitos retroativos (ex tunc)',
      'Revogação: extinção de ato válido, mas que se tornou inoportuno ou inconveniente para a Administração, exclusiva do Executivo, com efeitos futuros (ex nunc)'
    ],
    attributesOrSpecies: ['Cassação (o particular descumpriu condições)', 'Caducidade (norma jurídica superveniente impede o ato)', 'Contraposição (ato posterior com efeitos antagônicos)'],
    fatalFlaws: [
      'Tentar convalidar vício de Motivo, Finalidade ou Objeto (são sempre insanáveis)',
      'Tentar revogar ato vinculado, ato consumado ou ato que gerou direito adquirido',
      'Anular ato após 5 anos sem comprovação de má-fé (decadência administrativa - art. 54 da Lei 9.784/99)'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Anulação vs. Revogação',
        difference: 'Anulação ataca ilegalidade com efeito retroativo (ex tunc); Revogação ataca mérito/conveniência de ato válido com efeito futuro (ex nunc).'
      },
      {
        versusTitle: 'Vício de Competência vs. Exclusividade',
        difference: 'Incompetência em razão da pessoa ou hierarquia pode ser convalidada por ratificação; incompetência exclusiva ou em razão da matéria é insanável.'
      }
    ],
    supremeCourtTheses: [
      'Súmula 473/STF: A Administração pode anular seus próprios atos, quando eivados de vícios que os tornam ilegais, porque deles não se originam direitos; ou revogá-los, por motivo de conveniência ou oportunidade.',
      'Súmula 346/STF: A Administração Pública pode declarar a nulidade dos seus próprios atos.'
    ],
    mnemonic: 'FO-CO convalidável (Forma e Competência sanáveis)',
    relatedConceptIds: ['c-elementos-ato', 'c-autotutela']
  },
  {
    id: 'c-pad-estabilidade',
    axisId: 'axis-1',
    category: 'agente',
    title: 'Regime Disciplinar, PAD e Estabilidade',
    tagline: 'As garantias funcionais do servidor e o devido processo legal punitivo.',
    mechanics: 'O servidor público estatutário adquire estabilidade após 3 anos de efetivo exercício com avaliação especial de desempenho. A perda do cargo de estável só ocorre em virtude de sentença judicial transitada em julgado, processo administrativo com ampla defesa ou procedimento de avaliação periódica. O PAD exige comissão imparcial, contraditório real e proporcionalidade na dosimetria.',
    keyElements: [
      'Estabilidade: adquirida após 3 anos de efetivo exercício de servidor aprovado em concurso público',
      'Comissão Processante: formada por 3 servidores estáveis de cargo igual ou superior ao do acusado',
      'Garantia do Contraditório e Ampla Defesa prévios à aplicação de qualquer sanção grave'
    ],
    attributesOrSpecies: ['Advertência', 'Suspensão', 'Demissão', 'Cassação de Aposentadoria', 'Destituição de Cargo em Comissão'],
    fatalFlaws: [
      'Demissão sem instauração formal de PAD (portaria inaugural, indiciação e defesa final)',
      'Comissão disciplinar composta por servidores não estáveis ou com impedimento/suspeição comprovada',
      'Exoneração de servidor em estágio probatório sem garantir direito de defesa prévio'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Demissão vs. Exoneração',
        difference: 'Demissão é sanção disciplinar punitiva por infração grave; Exoneração é extinção de vínculo sem caráter punitivo (a pedido ou de ofício por reprovação em estágio probatório/corte de gastos).'
      }
    ],
    supremeCourtTheses: [
      'Súmula Vinculante 21: É inconstitucional a exigência de depósito ou arrolamento prévio de dinheiro ou bens para admissibilidade de recurso administrativo.',
      'Súmula 20/STF: É necessário processo administrativo com ampla defesa para demissão de funcionário admitido por concurso.'
    ],
    mnemonic: 'Reversão (aposentado que volta), Reintegração (demitido ilegalmente que volta), Recondução (estável volta ao cargo anterior)',
    relatedConceptIds: ['c-regime-juridico', 'c-poderes-adm']
  },

  // ==========================================
  // EIXO 2: RELAÇÃO COM O CIDADÃO
  // ==========================================
  {
    id: 'c-poder-policia',
    axisId: 'axis-2',
    category: 'policia',
    title: 'Poder de Polícia Administrativa',
    tagline: 'A limitação de direitos individuais em prol do interesse coletivo.',
    mechanics: 'Atividade da administração pública que, regulando a prática de ato ou a abstenção de fato em razão de interesse público, limita ou disciplina direito, interesse ou liberdade individual (art. 78 do CTN). Opera preventivamente (fiscalização, licenças, autorizações) ou repressivamente (apreensão, interdição, multas).',
    keyElements: [
      'Discricionariedade: margem legal para dosar sanções e medidas fiscalizatórias (embora certos atos como a licença sejam vinculados)',
      'Autoexecutoriedade: prerrogativa de executar diretamente a decisão sem precisar de prévia autorização judicial',
      'Coercibilidade: imposição imperativa da medida ao particular, admitindo uso legítimo da força proporcional'
    ],
    attributesOrSpecies: ['Ordem de Polícia', 'Consentimento de Polícia (Licença/Autorização)', 'Fiscalização de Polícia', 'Sanção de Polícia'],
    fatalFlaws: [
      'Uso da autoexecutoriedade para cobrança forçada de multa pecuniária (multa não é autoexecutória; exige execução fiscal)',
      'Delegação de atos sancionatórios ou normativos de poder de polícia para pessoas jurídicas de direito privado com fins lucrativos',
      'Excesso na sanção desrespeitando o princípio da proporcionalidade'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Polícia Administrativa vs. Judiciária',
        difference: 'A polícia administrativa atua sobre bens, direitos e atividades com foco preventivo (órgãos civis); a judiciária atua sobre pessoas infratoras com foco repressivo penal (Polícia Civil e Federal).'
      },
      {
        versusTitle: 'Licença vs. Autorização',
        difference: 'Licença é ato vinculado e definitivo (preenchidos os requisitos, há direito subjetivo); Autorização é ato discricionário e precário (revogável a qualquer tempo).'
      }
    ],
    supremeCourtTheses: [
      'Tema 532/STF: É constitucional a delegação do poder de polícia (fiscalização e sanção) a pessoas jurídicas de direito privado integrantes da administração pública indireta de capital social majoritariamente público que prestem serviços públicos em regime não concorrencial.'
    ],
    mnemonic: 'DAC (Discricionariedade, Autoexecutoriedade, Coercibilidade)',
    relatedConceptIds: ['c-regime-juridico', 'c-elementos-ato', 'c-responsabilidade-civil']
  },
  {
    id: 'c-bens-publicos',
    axisId: 'axis-2',
    category: 'bem',
    title: 'Regime Jurídico dos Bens Públicos',
    tagline: 'A titularidade estatal e a proteção intransponível do patrimônio comum.',
    mechanics: 'Bens pertencentes às pessoas jurídicas de direito público interno. Dividem-se quanto à destinação em bens de uso comum do povo, bens de uso especial e bens dominicais. Submetem-se ao regime de direito público: são inalienáveis enquanto afetados, impenhoráveis, imprescritíveis (não sujeitos a usucapião) e não oneráveis.',
    keyElements: [
      'Bens de Uso Comum do Povo: fruição geral da coletividade (ruas, praças, praias, rios)',
      'Bens de Uso Especial: destinados à execução de serviços administrativos específicos ou prédios públicos (hospitais, escolas, fóruns)',
      'Bens Dominicais (ou Dominicais): patrimônio do Estado sem destinação pública específica; compõem o acervo disponível'
    ],
    attributesOrSpecies: ['Afetação (destinação do bem a uma finalidade pública específica)', 'Desafetação (retirada da destinação pública, convertendo-o em bem dominical alienável)'],
    fatalFlaws: [
      'Pretensão de aquisição de qualquer bem público por usucapião (vedação constitucional absoluta)',
      'Alienação de bem público afetado (sem prévia desafetação legislativa/administrativa formal)',
      'Penhora judicial sobre bens públicos (pagamentos judiciais do Estado ocorrem exclusivamente por precatório)'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Bem Afetado vs. Bem Dominical',
        difference: 'Bens de uso comum e especial estão afetados (inalienáveis); bens dominicais não possuem destinação pública imediata e podem ser alienados cumpridos os requisitos da lei.'
      }
    ],
    supremeCourtTheses: [
      'Súmula 340/STF: Desde a vigência do Código Civil, os bens dominicais, como os demais bens públicos, não podem ser adquiridos por usucapião.',
      'Súmula 619/STJ: A ocupação indevida de bem público configura mera detenção, de natureza precária, insuscetível de retenção ou indenização por benfeitorias.'
    ],
    mnemonic: 'Os 4 "Is" dos bens afetados: Inalienabilidade, Impenhorabilidade, Imprescritibilidade, Inonerabilidade',
    relatedConceptIds: ['c-propriedade-desapropriacao', 'c-regime-juridico']
  },
  {
    id: 'c-propriedade-desapropriacao',
    axisId: 'axis-2',
    category: 'propriedade',
    title: 'Intervenção na Propriedade e Desapropriação',
    tagline: 'A soberania territorial: transferência compulsória e restrições públicas.',
    mechanics: 'Forma originária de aquisição de propriedade pelo Estado, baseada em necessidade pública, utilidade pública ou interesse social, mediante justa e prévia indenização em dinheiro (ressalvadas hipóteses constitucionais de títulos da dívida pública ou agrária). Divide-se em fase declaratória (decreto) e fase executória (administrativa ou judicial).',
    keyElements: [
      'Fase Declaratória: expedição do decreto expropriatório declarando a utilidade ou interesse social',
      'Fase Executória: avaliação do bem, fixação do preço e transferência da propriedade',
      'Justa e Prévia Indenização em Dinheiro como regra geral'
    ],
    attributesOrSpecies: ['Desapropriação Comum', 'Desapropriação Sancionatória Urbana/Rural', 'Desapropriação Confiscatória (art. 243 CF)', 'Desapropriação Indireta (esbulho estatal fático)'],
    fatalFlaws: [
      'Tredestinação Ilícita: dar ao bem desapropriado uma finalidade puramente privada ou espúria (gera direito de retrocessão ao antigo proprietário)',
      'Imissão provisória na posse sem depósito prévio do valor fixado pelo juiz',
      'Decadência do decreto expropriatório (5 anos para utilidade pública; 2 anos para interesse social)'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Tredestinação Lícita vs. Tredestinação Ilícita',
        difference: 'Tredestinação lícita ocorre quando o Estado muda a destinação original para outra finalidade que também atende ao interesse público (ex: ia construir escola e constrói creche/posto de saúde - não há retrocessão); Ilícita é desviar para fim privado.'
      },
      {
        versusTitle: 'Desapropriação vs. Servidão Administrativa',
        difference: 'Desapropriação extingue o domínio e transfere a titularidade do bem ao Estado; Servidão grava direito real sobre coisa alheia com ônus parcial (ex: passagem de cabos elétricos).'
      }
    ],
    supremeCourtTheses: [
      'Tema 1019/STF: A retrocessão é cabível apenas na tredestinação ilícita, inexistindo direito à recomposição caso o bem tenha sido empregado em outra finalidade pública legítima.'
    ],
    mnemonic: 'Retrocessão: devolver o bem ao dono se houver desvio ilícito total',
    relatedConceptIds: ['c-bens-publicos', 'c-regime-juridico']
  },
  {
    id: 'c-responsabilidade-civil',
    axisId: 'axis-2',
    category: 'responsabilidade',
    title: 'Responsabilidade Civil do Estado',
    tagline: 'A repartição dos encargos sociais: Teoria do Risco Administrativo.',
    mechanics: 'O Estado responde civilmente pelos danos que seus agentes, nessa qualidade, causarem a terceiros (art. 37, § 6º, da CF). A responsabilidade por atos comissivos é OBJETIVA: exige conduta oficial, dano efetivo e nexo de causalidade, dispensando prova de dolo ou culpa. O Estado tem direito de ação regressiva contra o agente público causador caso comprovado dolo ou culpa.',
    keyElements: [
      'Conduta comissiva de agente estatal atuando nessa qualidade',
      'Dano material ou moral certo e anormal sofrido pela vítima',
      'Nexo de causalidade direto e imediato entre a conduta e o prejuízo'
    ],
    attributesOrSpecies: ['Teoria do Risco Administrativo (admite excludentes)', 'Teoria do Risco Integral (não admite excludentes: dano nuclear, terrorismo aéreo e dano ambiental extremo)'],
    fatalFlaws: [
      'Cobrar responsabilidade objetiva por omissão genérica sem comprovar o dever legal específico de agir e a culpa do serviço (faute du service)',
      'Negar direito de regresso contra servidor que agiu com dolo manifesto',
      'Ajuizamento direto da ação indenizatória contra o servidor público (o STF exige ação direta contra o Estado)'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Responsabilidade Comissiva vs. Omissiva',
        difference: 'Atos comissivos (fazer): responsabilidade objetiva pura (Teoria do Risco Administrativo); Atos omissivos (não fazer genérico): responsabilidade subjetiva (exige comprovação de falta/falha do serviço - faute du service).'
      },
      {
        versusTitle: 'Risco Administrativo vs. Risco Integral',
        difference: 'O Risco Administrativo admite que o Estado se exima provando culpa exclusiva da vítima, caso fortuito ou força maior; o Risco Integral não aceita excludente alguma.'
      }
    ],
    supremeCourtTheses: [
      'Tema 940/STF: A ação por danos causados por agente público deve ser ajuizada contra o Estado ou pessoa jurídica prestadora de serviço público, sendo vedado o ajuizamento direto contra o agente público.',
      'Tema 592/STF: Em caso de morte de detento sob custódia estatal, a responsabilidade é objetiva se houver inobservância do dever constitucional de vigilância e proteção.'
    ],
    mnemonic: 'Conduta + Dano + Nexo = Indenização (Culpa só no regresso)',
    relatedConceptIds: ['c-regime-juridico', 'c-poder-policia']
  },

  // ==========================================
  // EIXO 3: RELAÇÃO COM O MERCADO
  // ==========================================
  {
    id: 'c-licitacoes-principios',
    axisId: 'axis-3',
    category: 'licitacao',
    title: 'Contratações e Licitações (Lei 14.133)',
    tagline: 'Competitividade isonômica, melhor proposta e interesse público.',
    mechanics: 'Procedimento administrativo formal obrigatório para contratação de obras, serviços, compras e alienações pela Administração Pública (Lei 14.133/2021). Visa assegurar a seleção da proposta mais vantajosa para o interesse público, a isonomia de tratamento e o desenvolvimento nacional sustentável, combatendo direcionamentos e sobrepreço.',
    keyElements: [
      'Modalidades Principais: Pregão (bens e serviços comuns), Concorrência (bens e serviços especiais e obras), Diálogo Competitivo (soluções inovadoras/complexas), Concurso e Leilão',
      'Critérios de Julgamento: menor preço, maior desconto, melhor técnica/conteúdo artístico, técnica e preço, maior lance, maior retorno econômico',
      'Fase Preparatória (ETP e Termo de Referência) como coração do planejamento da contratação'
    ],
    attributesOrSpecies: ['Planejamento', 'Transparência no PNCP', 'Segregação de Funções', 'Julgamento Objetivo'],
    fatalFlaws: [
      'Fracionamento de despesa para fugir à modalidade ou aos limites de dispensa por valor',
      'Direcionamento de edital com cláusulas restritivas de competitividade sem justificativa técnica',
      'Utilização de convite ou tomada de preços sob a égide da Lei 14.133 (modalidades extintas)'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Pregão vs. Concorrência',
        difference: 'Pregão é obrigatório para bens e serviços com padrões de desempenho definíveis no mercado (bens comuns); Concorrência destina-se a obras e serviços de engenharia e serviços especiais.'
      }
    ],
    supremeCourtTheses: [
      'Súmula 222/TCU: As decisões dos Tribunais de Contas quanto a licitações vinculam os órgãos sob sua jurisdição.',
      'Súmula Vinculante 43: É inconstitucional toda modalidade de provimento que propicie ao servidor investir-se em cargo diverso daquele para o qual foi concursado.'
    ],
    mnemonic: 'P-C-D-C-L (Pregão, Concorrência, Diálogo Competitivo, Concurso, Leilão)',
    relatedConceptIds: ['c-licitacao-direta', 'c-contratos-equilibrio']
  },
  {
    id: 'c-licitacao-direta',
    axisId: 'axis-3',
    category: 'licitacao',
    title: 'Contratação Direta: Dispensa vs. Inexigibilidade',
    tagline: 'As exceções legais à disputa: inviabilidade de competição vs. autorização de lei.',
    mechanics: 'Hipóteses taxativas ou excepcionais em que a lei autoriza a contratação sem o certame licitatório formal. A inexigibilidade ocorre quando há INVIABILIDADE DE COMPETIÇÃO (rol exemplificativo). A dispensa ocorre quando a competição seria faticamente possível, mas a lei dispensa (rol taxativo de dispensa ou dispensada para bens).',
    keyElements: [
      'Inexigibilidade (art. 74): inviabilidade de competição (fornecedor exclusivo, profissional de notória especialização em serviço técnico intelectual, contratação artística consagrada)',
      'Dispensa de Licitação (art. 75): viabilidade de competição, mas a lei autoriza a contratação direta (baixo valor, emergência ou calamidade pública, licitação deserta/fracassada, guerra/grave perturbação)'
    ],
    fatalFlaws: [
      'Contratar por inexigibilidade objeto comum que possua múltiplos concorrentes aptos no mercado',
      'Forjar emergência artificial (fabricada pela inércia dolosa do gestor) para justificar dispensa indevida',
      'Ausência de processo de justificação de preços (mesmo na contratação direta, o preço deve ser compatível com o mercado)'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Inexigibilidade vs. Dispensa',
        difference: 'Na Inexigibilidade não há como disputar (competição inviável/impossível - rol exemplificativo); na Dispensa a disputa seria viável, mas a lei autoriza não licitar por conveniência pública (rol taxativo).'
      },
      {
        versusTitle: 'Licitação Deserta vs. Fracassada',
        difference: 'Deserta: nenhum interessado comparece ao certame; Fracassada: interessados comparecem, mas todos são desclassificados ou inabilitados.'
      }
    ],
    supremeCourtTheses: [
      'Tema 64/STF: A contratação de serviços advocatícios por inexigibilidade de licitação exige notória especialização do prestador e singularidade do serviço, demonstrada a inadequação da via licitatória comum.'
    ],
    mnemonic: 'Inexigibilidade = Impossível competir; Dispensa = Disponível na lei',
    relatedConceptIds: ['c-licitacoes-principios', 'c-contratos-equilibrio']
  },
  {
    id: 'c-contratos-equilibrio',
    axisId: 'axis-3',
    category: 'contrato',
    title: 'Contratos e Equilíbrio Econômico-Financeiro',
    tagline: 'Prerrogativas públicas exorbitantes vs. equação financeira intangível.',
    mechanics: 'Acordo de vontades regido pelo direito público, caracterizado pela presença de cláusulas exorbitantes em favor da Administração (alteração unilateral, rescisão unilateral, fiscalização, aplicação direta de penalidades e ocupação provisória). Como contrapartida protetiva fundamental do particular contratado, a Constituição assegura a intangibilidade do equilíbrio econômico-financeiro da proposta original.',
    keyElements: [
      'Cláusulas Exorbitantes: prerrogativas que seriam nulas no direito privado comum, mas válidas no contrato público',
      'Equação Econômico-Financeira: relação inicial de encargos e remuneração fixada na proposta e protegida pelo art. 37, XXI da CF',
      'Exceção do Contrato Não Cumprido mitigada (o particular não pode suspender os serviços de imediato, exceto após mora estatal superior a prazos legais)'
    ],
    attributesOrSpecies: ['Reajuste por Índices', 'Repactuação por Planilha', 'Revisão (Reequilíbrio Extraordinário)'],
    fatalFlaws: [
      'Alteração unilateral do contrato pela Administração afetando a remuneração ou a essência do objeto',
      'Recusa injustificada da Administração em restabelecer o equilíbrio financeiro rompido por álea extraordinária',
      'Alteração unilateral qualitativa ou quantitativa superior a 25% (ou 50% para reformas) sem previsão legal'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Fato da Administração vs. Fato do Príncipe',
        difference: 'Fato da Administração: ato ou omissão direta do órgão contratante que atinge aquele contrato específico (ex: atraso na entrega do terreno); Fato do Príncipe: ato estatal geral de autoridade que onera reflexamente os contratos (ex: criação de novo tributo).'
      },
      {
        versusTitle: 'Reajuste vs. Revisão Econômica',
        difference: 'Reajuste recompõe a inflação ordinária por índices contratuais previstos; Revisão recompõe desequilíbrios imprevisíveis ou de consequências incalculáveis (Teoria da Imprevisão).'
      }
    ],
    supremeCourtTheses: [
      'Súmula 331/TST: A inadimplência do contratado não transfere automaticamente a responsabilidade trabalhista à Administração, salvo comprovação de falha culposa na fiscalização.'
    ],
    mnemonic: 'Álea Ordinária (risco do contratado) vs. Álea Extraordinária (gera reequilíbrio)',
    relatedConceptIds: ['c-licitacoes-principios', 'c-concessoes-servicos']
  },
  {
    id: 'c-concessoes-servicos',
    axisId: 'axis-3',
    category: 'servico',
    title: 'Serviços Públicos, Concessões e PPPs',
    tagline: 'A prestação indireta do serviço público e as formas de extinção contratual.',
    mechanics: 'Transferência da prestação de serviços públicos da Administração para pessoas jurídicas privadas, por sua conta e risco, mediante tarifa paga pelos usuários ou contraprestação pública (PPPs patrocinada e administrativa). O regime é balizado pelos princípios da continuidade, modicidade tarifária e atualidade técnica.',
    keyElements: [
      'Concessão Comum (Lei 8.987/95): concessionária remunerada pela tarifa do usuário',
      'PPP Patrocinada (Lei 11.079/04): tarifa paga pelo usuário acrescida de contraprestação pecuniária do parceiro público',
      'PPP Administrativa: contrato de prestação de serviços em que a Administração Pública é a devedora integral da contraprestação'
    ],
    attributesOrSpecies: ['Encampação', 'Caducidade', 'Rescisão Judicial', 'Anulação', 'Falência da Concessionária'],
    fatalFlaws: [
      'Encampação sem prévia autorização em lei específica e sem pagamento prévio de indenização',
      'Decretação de caducidade sem processo administrativo prévio assegurando ampla defesa à concessionária',
      'Contratação de PPP com valor inferior a R$ 10 milhões ou prazo inferior a 5 anos (vedações expressas da lei)'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Encampação vs. Caducidade',
        difference: 'Encampação é a retomada do serviço por motivo de interesse público durante a vigência do contrato (exige lei e prévia indenização); Caducidade é a extinção punitiva por inadimplemento culposo da concessionária.'
      },
      {
        versusTitle: 'Concessão vs. Permissão',
        difference: 'Concessão é celebrada com pessoa jurídica após concorrência; Permissão pode ser com pessoa física ou jurídica, formalizada por contrato de adesão precário.'
      }
    ],
    supremeCourtTheses: [
      'Tema 84/STF: É legítimo o corte do fornecimento de serviço público por inadimplemento do usuário, desde que precedido de aviso e resguardadas unidades essenciais (hospitais e escolas).'
    ],
    mnemonic: 'En-campa = interesse público com indenização; Cadu-ca = culpa da concessionária',
    relatedConceptIds: ['c-contratos-equilibrio', 'c-regime-juridico']
  },

  // ==========================================
  // EIXO 4: JULGAMENTO E CONTROLE
  // ==========================================
  {
    id: 'c-autotutela',
    axisId: 'axis-4',
    category: 'controle',
    title: 'Autotutela e Decadência Administrativa',
    tagline: 'O poder de rever os próprios atos e o limite temporal da segurança jurídica.',
    mechanics: 'Prerrogativa da Administração Pública de exercer o controle sobre seus próprios atos, revendo-os quanto à legalidade (anulação) ou quanto ao mérito (revogação), independentemente de provocação do Poder Judiciário. Todavia, a autotutela não é eterna: o direito de anular atos que produzam efeitos favoráveis aos destinatários decai em 5 anos, salvo comprovada má-fé (art. 54 da Lei 9.784/99).',
    keyElements: [
      'Controle Interno e de Ofício da legalidade dos próprios atos',
      'Prazo Decadencial de 5 anos para atos favoráveis de boa-fé',
      'Exigência de contraditório prévio se a anulação atingir interesses individuais consolidados'
    ],
    fatalFlaws: [
      'Anulação sumária de ato sem oportunidade de defesa prévia ao particular beneficiado',
      'Anulação de ato decorridos mais de 5 anos sem prova cabal de má-fé',
      'Confundir anulação da autotutela com revogação de conveniência'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Autotutela vs. Tutela Administrativa',
        difference: 'Autotutela é o controle interno da entidade sobre seus próprios atos (órgão fiscaliza órgão); Tutela é o controle finalístico exercido pela Administração Direta sobre entidades da Indireta (supervisão ministerial).'
      }
    ],
    supremeCourtTheses: [
      'Súmula Vinculante 3: Nos processos perante o Tribunal de Contas da União que resultem em anulação ou revogação de ato administrativo que beneficie o interessado, são assegurados o contraditório e a ampla defesa, excetuada a apreciação da legalidade do ato de concessão inicial de aposentadoria, reforma e pensão.',
      'Súmula 473/STF: A Administração pode anular seus próprios atos quando eivados de vícios que os tornam ilegais ou revogá-los por conveniência e oportunidade.'
    ],
    mnemonic: '5 anos para anular de boa-fé; má-fé nunca decai',
    relatedConceptIds: ['c-elementos-ato', 'c-convalidacao', 'c-controle-tce']
  },
  {
    id: 'c-controle-tce',
    axisId: 'axis-4',
    category: 'controle',
    title: 'Controle Externo e Tribunais de Contas',
    tagline: 'O auxílio constitucional ao Legislativo e a fiscalização orçamentária.',
    mechanics: 'O controle externo é exercido pelo Poder Legislativo com o auxílio técnico autônomo dos Tribunais de Contas (TCU, TCEs e TCMs). O Tribunal de Contas fiscaliza a legalidade, legitimidade, economicidade e aplicação de recursos públicos, julgando as contas de gestores públicos e emitindo parecer prévio sobre as contas do Chefe do Executivo.',
    keyElements: [
      'Julgamento das contas dos administradores públicos (decisão que impõe débito/multa tem eficácia de título executivo extrajudicial)',
      'Apreciação e Parecer Prévio sobre as contas de governo prestadas anualmente pelo Presidente/Governador/Prefeito',
      'Poder Cautelar do Tribunal de Contas para suspender atos irregulares graves'
    ],
    fatalFlaws: [
      'Tribunal de Contas anular diretamente contrato administrativo (o Tribunal assina prazo para o órgão anular; se descumprido, susta a execução com comunicação ao Legislativo)',
      'Julgar em definitivo as contas do Chefe do Executivo (a competência para julgar contas de Prefeito/Governador é exclusiva da Câmara/Assembleia Legislativa)',
      'Aplicação de sanção pecuniária sem observância da ampla defesa'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Contas de Governo vs. Contas de Gestão',
        difference: 'Contas de Governo (atos políticos e cumprimento de metas globais): o TC dá Parecer Prévio e o Legislativo julga; Contas de Gestão (atos concretos de despesa e ordenação): o próprio Tribunal de Contas julga em definitivo.'
      }
    ],
    supremeCourtTheses: [
      'Tema 835/STF: Para os fins do art. 1º, I, g, da LC 64/90, a apreciação das contas de prefeitos, tanto as de governo quanto as de gestão, compete exclusivamente à Câmara Municipal, com auxílio do Tribunal de Contas.',
      'Súmula 222/TCU: As decisões do TCU relativas à aplicação de normas orçamentárias e licitatórias vinculam os órgãos sob sua jurisdição.'
    ],
    mnemonic: 'TC julga gestor (título executivo); Legislativo julga Chefe do Executivo',
    relatedConceptIds: ['c-autotutela', 'c-improbidade-administrativa']
  },
  {
    id: 'c-remedios-constitucionais',
    axisId: 'axis-4',
    category: 'remedio',
    title: 'Ações Constitucionais de Controle',
    tagline: 'A blindagem judicial dos direitos e do patrimônio moral coletivo.',
    mechanics: 'Instrumentos processuais previstos na Constituição para assegurar o controle judicial sobre a atividade administrativa arbitrária ou lesiva. Destacam-se o Mandado de Segurança (para proteger direito líquido e certo contra ilegalidade ou abuso de autoridade), a Ação Popular (proposta por qualquer cidadão contra ato lesivo ao patrimônio público ou moralidade) e a Ação Civil Pública (defesa difusa e coletiva).',
    keyElements: [
      'Mandado de Segurança: exige prova pré-constituída documental; prazo decadencial de 120 dias da ciência do ato impugnado',
      'Ação Popular: legitimidade ativa exclusiva de Cidadão (eleitor em dia com as obrigações eleitorais); isenção de custas salvo má-fé',
      'Ação Civil Pública: legitimidade do Ministério Público, Defensoria Pública, entes federados e associações temáticas'
    ],
    fatalFlaws: [
      'Impetração de Mandado de Segurança com pretensão de dilação probatória (perícia, testemunhas)',
      'Impetração de Mandado de Segurança após 120 dias da notificação do ato (decadência extintiva da via mandamental)',
      'Ajuizamento de Ação Popular por pessoa jurídica (apenas pessoa física com título eleitoral é cidadão)'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Mandado de Segurança vs. Ação Popular',
        difference: 'O MS protege direito próprio, líquido e certo do impetrante lesado; a Ação Popular é manejada pelo cidadão para defender patrimônio público e moralidade difusa.'
      }
    ],
    supremeCourtTheses: [
      'Súmula 269/STF: O mandado de segurança não é substitutivo de ação de cobrança.',
      'Súmula 365/STF: Pessoa jurídica não tem legitimidade para propor ação popular.'
    ],
    mnemonic: 'MS = Prova documental pré-constituída em 120 dias; AP = Cidadão com título de eleitor',
    relatedConceptIds: ['c-autotutela', 'c-improbidade-administrativa']
  },
  {
    id: 'c-improbidade-administrativa',
    axisId: 'axis-4',
    category: 'improbidade',
    title: 'Lei de Improbidade Administrativa (Lei 14.230)',
    tagline: 'O combate à desonestidade estatal com exigência inafastável de Dolo Específico.',
    mechanics: 'Regime sancionatório para atos desonestos praticados por agentes públicos ou particulares beneficiários (Lei 8.429/92 com redação dada pela Lei 14.230/2021). Com a reforma legislativa, foi extinta a modalidade culposa: todo e qualquer ato de improbidade exige agora a comprovação inequívoca de DOLO ESPECÍFICO (intenção livre e consciente de alcançar o resultado ilícito). A mera divergência de interpretação da lei não configura improbidade.',
    keyElements: [
      'Enriquecimento Ilícito (art. 9º): auferir vantagem patrimonial indevida em razão do cargo',
      'Prejuízo ao Erário (art. 10): perda patrimonial efetiva e comprovada aos cofres públicos (exige dano real, vedado dano presumido)',
      'Atentado contra Princípios (art. 11): rol taxativo e estrito de condutas dolosas (quebra de sigilo, fraude de concurso, etc.)'
    ],
    fatalFlaws: [
      'Imputar improbidade administrativa com base em negligência, imprudência ou imperícia (modalidade culposa foi totalmente revogada)',
      'Condenação no art. 11 (princípios) por conduta não descrita taxativamente nos incisos da lei',
      'Configurar improbidade por simples divergência jurisprudencial razoável ou erro grosseiro sem dolo de lesar o erário'
    ],
    practicalDistinctions: [
      {
        versusTitle: 'Improbidade vs. Infração Administrativa Simples',
        difference: 'Improbidade exige desonestidade qualificada e vontade consciente de cometer o ilícito (dolo); mera irregularidade formal ou erro técnico é apurado em processo disciplinar comum ou ressarcimento sem estigma de improbidade.'
      }
    ],
    supremeCourtTheses: [
      'Tema 1199/STF: A revogação da modalidade culposa do ato de improbidade administrativa é irretroativa, aplicando-se aos atos praticados na vigência da lei anterior sem condenação transitada em julgado caso não haja comprovação de dolo.'
    ],
    mnemonic: 'DOLO ESPECÍFICO: Sem vontade consciente de fraudar, NÃO há improbidade.',
    relatedConceptIds: ['c-regime-juridico', 'c-controle-tce', 'c-remedios-constitucionais']
  }
];
