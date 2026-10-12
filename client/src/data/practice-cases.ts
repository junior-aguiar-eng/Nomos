import { PracticalCase } from '../types/nomos';

export const PRACTICE_CASES_DATA: PracticalCase[] = [
  // ==========================================
  // CASOS DO EIXO 1: GESTÃO E DECISÃO INTERNA
  // ==========================================
  {
    id: 'case-1-1',
    axisId: 'axis-1',
    caseNumber: 'PROCESSO ADM 1042/2026',
    title: 'O Dilema da Convalidação de Competência',
    assignedRole: 'Parecerista da Procuradoria Municipal',
    institutionalContext: 'Secretaria Municipal de Urbanismo e Obras',
    briefing:
      'Um Chefe de Gabinete praticou ato administrativo autorizando a ocupação de área pública para uma feira cultural beneficente. Posteriormente, constatou-se que a lei municipal atribui essa competência privativa ao Secretário Municipal, mas sem cláusula de exclusividade indelegável. O evento foi realizado, gerou benefícios para centenas de famílias de artesãos e não houve dano aos cofres públicos nem violação da moralidade. Agora, um servidor provocou a Procuradoria sustentando que o ato é nulo de pleno direito e que os organizadores devem ser notificados.',
    legalProblem:
      'Na qualidade de Parecerista, qual medida jurídica deve ser recomendada para resolver o vício identificado no ato administrativo?',
    difficulty: 'Iniciante',
    nightVisionHint:
      'Analise os elementos do ato: o vício é de Competência em matéria não privativa exclusiva. Não houve lesão ao interesse público nem prejuízo a terceiros de boa-fé. A lei prevê a ratificação (convalidação) com efeitos ex tunc.',
    availableDecisions: [
      {
        id: 'dec-1-1-convalidar',
        label: 'Recomendar a Convalidação (Ratificação pelo Secretário)',
        actionSummary:
          'O Secretário Municipal deve editar ato convalidador suprindo a incompetência relativa com efeitos retroativos (ex tunc).',
        actionType: 'convalidate'
      },
      {
        id: 'dec-1-1-anular',
        label: 'Recomendar a Anulação Sumária por Ilegalidade',
        actionSummary:
          'Declarar a nulidade absoluta do ato por vício de competência, desconstituindo todos os efeitos passados.',
        actionType: 'annul'
      },
      {
        id: 'dec-1-1-revogar',
        label: 'Recomendar a Revogação do Ato Administrativo',
        actionSummary:
          'Extinguir o ato por motivo de conveniência e oportunidade, com efeitos a partir de agora (ex nunc).',
        actionType: 'revoke'
      }
    ],
    compatibilityRules: [
      {
        decisionId: 'dec-1-1-convalidar',
        validConceptIds: ['c-convalidacao', 'c-elementos-ato'],
        fatalFlawConceptIds: ['c-pad-estabilidade'],
        outcome: {
          success: true,
          verdictTitle: 'PARECER ACOLHIDO: CONVALIDAÇÃO TÉCNICA PERFEITA',
          technicalFeedback:
            'Excelente fundamentação! O vício de competência não exclusiva (sujeito) e de forma não essencial é sanável pela própria Administração (ratificação). Como não houve prejuízo ao interesse público nem a terceiros, a convalidação opera efeitos retroativos (ex tunc), preservando a segurança jurídica e a eficiência.',
          legalGrounding:
            'Art. 55 da Lei 9.784/1999 c/c princípio da segurança jurídica e autotutela.',
          minervaReaction: 'triumph',
          xpEarned: 150
        }
      },
      {
        decisionId: 'dec-1-1-anular',
        validConceptIds: ['c-elementos-ato'],
        fatalFlawConceptIds: ['c-convalidacao'],
        outcome: {
          success: false,
          verdictTitle: 'PARECER REJEITADO: RIGORISMO EXCESSIVO E ANULAÇÃO INDEVIDA',
          technicalFeedback:
            'A anulação só é mandatória quando o vício for insanável ou causar lesão irreparável ao interesse público. No caso, o vício de competência relativa admite convalidação expressa. A anulação puniria terceiros de boa-fé e geraria instabilidade jurídica desnecessária.',
          legalGrounding:
            'Art. 55 da Lei 9.784/1999 (dever de convalidar atos com vícios sanáveis).',
          minervaReaction: 'nullity_alarm',
          xpEarned: 30
        }
      },
      {
        decisionId: 'dec-1-1-revogar',
        validConceptIds: ['c-convalidacao'],
        fatalFlawConceptIds: [],
        outcome: {
          success: false,
          verdictTitle: 'ERRO TÉCNICO CRASSO: CONFUSÃO ENTRE ANULAÇÃO E REVOGAÇÃO',
          technicalFeedback:
            'A revogação recai sobre atos VÁLIDOS e eficazes que se tornaram inoportunos ou inconvenientes. Atos com vício de legalidade (como a incompetência) jamais são revogados; eles devem ser ou convalidados (se sanáveis) ou anulados (se insanáveis).',
          legalGrounding:
            'Súmula 473 do STF (distinção entre anulação por ilegalidade e revogação por conveniência).',
          minervaReaction: 'nullity_alarm',
          xpEarned: 10
        }
      }
    ]
  },
  {
    id: 'case-1-2',
    axisId: 'axis-1',
    caseNumber: 'PAD DISCIPLINAR 089/2026',
    title: 'A Demissão do Servidor Estável e a Comissão de PAD',
    assignedRole: 'Presidente da Comissão Revisora da Controladoria',
    institutionalContext: 'Controladoria-Geral do Estado',
    briefing:
      'Um servidor público estável foi demitido sumariamente por portaria do Secretário de Estado, sob acusação de insubordinação grave. O processo administrativo disciplinar foi conduzido por uma comissão formada por 2 servidores ocupantes exclusivamente de cargos em comissão (não estáveis) e 1 estagiário de direito. O servidor demitido interpôs recurso administrativo requerendo a nulidade da demissão e a sua imediata reintegração com pagamento de vencimentos retroativos.',
    legalProblem:
      'Como autoridade julgadora revisora, qual decisão deve ser proferida em relação à validade da sanção de demissão aplicada?',
    difficulty: 'Intermediário',
    nightVisionHint:
      'A estabilidade protege o servidor contra demissão arbitrária. A legislação (Lei 8.112 e correlatas estaduais) exige que a comissão de PAD seja composta obrigatoriamente por 3 servidores estáveis de nível igual ou superior. O vício é de forma e competência insanável.',
    availableDecisions: [
      {
        id: 'dec-1-2-anular-reintegrar',
        label: 'Anular a Demissão e Determinar a Reintegração com Efeitos Financeiros',
        actionSummary:
          'Declarar a nulidade absoluta do PAD por vício insanável de composição da comissão processante e reintegrar o servidor estável.',
        actionType: 'annul'
      },
      {
        id: 'dec-1-2-manter-demissao',
        label: 'Manter a Demissão (Aproveitamento dos Atos e Provas)',
        actionSummary:
          'Considerar a composição da comissão mera irregularidade formal que não comprometeu a verdade material dos fatos.',
        actionType: 'maintain'
      },
      {
        id: 'dec-1-2-converter-suspensao',
        label: 'Converter a Demissão em Suspensão de 90 Dias',
        actionSummary:
          'Aplicar sanção mais branda por juízo de proporcionalidade, mantendo os atos processuais praticados.',
        actionType: 'sanction'
      }
    ],
    compatibilityRules: [
      {
        decisionId: 'dec-1-2-anular-reintegrar',
        validConceptIds: ['c-pad-estabilidade', 'c-regime-juridico'],
        fatalFlawConceptIds: ['c-licitacao-direta'],
        outcome: {
          success: true,
          verdictTitle: 'DECISÃO IRRETOCÁVEL: NULIDADE ABSOLUTA E REINTEGRAÇÃO',
          technicalFeedback:
            'Decisão impecável! A composição da comissão de PAD por servidores não estáveis viola garantia constitucional expressa do servidor público e vicia de morte o devido processo legal administrativo. A anulação da demissão ilegal impõe a REINTEGRAÇÃO do servidor estável, com ressarcimento integral de todas as vantagens e vencimentos do período de afastamento.',
          legalGrounding:
            'Art. 41, § 2º da CF/88 c/c art. 149 da Lei 8.112/1990 e Súmula 20 do STF.',
          minervaReaction: 'triumph',
          xpEarned: 180
        }
      },
      {
        decisionId: 'dec-1-2-manter-demissao',
        validConceptIds: ['c-poderes-adm'],
        fatalFlawConceptIds: ['c-pad-estabilidade'],
        outcome: {
          success: false,
          verdictTitle: 'DECISÃO CASSÁVEL: VIOLAÇÃO FRAGRANTE DO DEVIDO PROCESSO',
          technicalFeedback:
            'Erro gravíssimo. A garantia de comissão composta por servidores estáveis visa proteger a independência da apuração contra pressões políticas. Compor a comissão com comissionados e estagiário gera nulidade absoluta insanável por cerceamento de defesa.',
          legalGrounding: 'Art. 41, § 1º, II da CF/88 e Súmula Vinculante 3.',
          minervaReaction: 'nullity_alarm',
          xpEarned: 25
        }
      },
      {
        decisionId: 'dec-1-2-converter-suspensao',
        validConceptIds: [],
        fatalFlawConceptIds: ['c-pad-estabilidade'],
        outcome: {
          success: false,
          verdictTitle: 'DECISÃO ILEGAL: PROCESSO NULO NÃO ADMITE DOSIMETRIA',
          technicalFeedback:
            'Quando o processo nasce com vício insanável de comissão incompetente, todas as suas deliberações e relatórios são contaminados. Não cabe converter sanção em processo integralmente nulo.',
          legalGrounding: 'Princípio da causalidade e extensão da nulidade aos atos dependentes.',
          minervaReaction: 'nullity_alarm',
          xpEarned: 20
        }
      }
    ]
  },

  // ==========================================
  // CASOS DO EIXO 2: RELAÇÃO COM O CIDADÃO
  // ==========================================
  {
    id: 'case-2-1',
    axisId: 'axis-2',
    caseNumber: 'FISCALIZAÇÃO AMBIENTAL 512/2026',
    title: 'A Interdição Cautelar da Fábrica Poluidora',
    assignedRole: 'Superintendente de Vigilância e Polícia Administrativa',
    institutionalContext: 'Agência Ambiental do Estado',
    briefing:
      'Durante vistoria de emergência, fiscais constataram que uma indústria química estava vazando resíduos tóxicos no lençol freático que abastece 40 mil moradores, com risco iminente de contaminação aguda da população. Os fiscais lavraram auto de interdição cautelar imediata das atividades da fábrica e lacraram os dutos de escoamento. A empresa impetrou mandado de segurança alegando abuso de autoridade por ausência de autorização judicial prévia e inobservância de contraditório antes da interdição.',
    legalProblem:
      'Na resposta técnica ao Judiciário, como deve ser sustentada a legitimidade da atuação da autoridade de polícia?',
    difficulty: 'Intermediário',
    nightVisionHint:
      'O poder de polícia possui os atributos da discricionariedade, coercibilidade e AUTOEXECUTORIEDADE. Em situações de urgência e perigo iminente à saúde pública, a medida é tomada sem autorização judicial prévia, postergando-se o contraditório para momento posterior (contraditório diferido).',
    availableDecisions: [
      {
        id: 'dec-2-1-autoexecutoriedade',
        label: 'Sustentar a Autoexecutoriedade e o Contraditório Diferido por Urgência',
        actionSummary:
          'Demonstrar que o poder de polícia autoriza execução direta imediata para proteção da vida coletiva, com defesa garantida a posteriori.',
        actionType: 'maintain'
      },
      {
        id: 'dec-2-1-revogar-interdicao',
        label: 'Revogar a Interdição para Aguardar Ordem Judicial',
        actionSummary:
          'Desinterditar a fábrica preventivamente e ajuizar ação civil pública cautelar requerendo autorização do juiz.',
        actionType: 'revoke'
      },
      {
        id: 'dec-2-1-substituir-multa',
        label: 'Substituir a Interdição por Multa Pecuniária Autoexecutória',
        actionSummary:
          'Retirar os lacres e aplicar multa sumária com desconto automático em conta bancária.',
        actionType: 'sanction'
      }
    ],
    compatibilityRules: [
      {
        decisionId: 'dec-2-1-autoexecutoriedade',
        validConceptIds: ['c-poder-policia', 'c-regime-juridico'],
        fatalFlawConceptIds: ['c-licitacoes-principios'],
        outcome: {
          success: true,
          verdictTitle: 'TESE PLENAMENTE ACOLHIDA: DEFESA MAGISTRAL DA AUTOEXECUTORIEDADE',
          technicalFeedback:
            'Excelente! A autoexecutoriedade do poder de polícia existe exatamente para salvaguardar o interesse público em situações de perigo iminente, dispensando mandado judicial prévio. O contraditório não foi suprimido, mas postergado (contraditório diferido), medida plenamente proporcional em face da gravidade da ameaça à saúde coletiva.',
          legalGrounding:
            'Art. 78 do CTN e Teoria dos Atributos do Poder de Polícia (Autoexecutoriedade e Coercibilidade).',
          minervaReaction: 'triumph',
          xpEarned: 160
        }
      },
      {
        decisionId: 'dec-2-1-revogar-interdicao',
        validConceptIds: ['c-poder-policia'],
        fatalFlawConceptIds: [],
        outcome: {
          success: false,
          verdictTitle: 'OMISSÃO ILEGAL: RENÚNCIA AO DEVER DE PROTEÇÃO',
          technicalFeedback:
            'Desinterditar a fábrica colocaria 40 mil pessoas em risco imediato de morte/envenenamento. A Administração não necessita de aval judicial prévio para fazer cessar perigo grave e atual; renunciar à autoexecutoriedade viola o princípio da indisponibilidade do interesse público.',
          legalGrounding: 'Princípio da supremacia e indisponibilidade do interesse público.',
          minervaReaction: 'nullity_alarm',
          xpEarned: 20
        }
      },
      {
        decisionId: 'dec-2-1-substituir-multa',
        validConceptIds: [],
        fatalFlawConceptIds: ['c-poder-policia'],
        outcome: {
          success: false,
          verdictTitle: 'ERRO TÉCNICO DUPLO: INEFICÁCIA E COBRANÇA ILEGAL',
          technicalFeedback:
            'Dois erros graves: 1º) A multa não cessa o vazamento tóxico iminente; 2º) Multa NÃO possui autoexecutoriedade (não pode ser penhorada/debitada direto pela Administração, exigindo execução fiscal judicial).',
          legalGrounding:
            'Lei de Execuções Fiscais (Lei 6.830/80) e regime jurídico das multas administrativas.',
          minervaReaction: 'nullity_alarm',
          xpEarned: 15
        }
      }
    ]
  },
  {
    id: 'case-2-2',
    axisId: 'axis-2',
    caseNumber: 'AÇÃO INDENIZATÓRIA 844/2026',
    title: 'Acidente Noturno em Rodovia Esburacada e a Responsabilidade Civil',
    assignedRole: 'Procurador do Município',
    institutionalContext: 'Procuradoria-Geral do Município',
    briefing:
      'Um motociclista sofreu traumatismo craniano severo após cair em uma cratera de 40 cm de profundidade na pista de rolamento de avenida municipal. O laudo da perícia comprovou que a cratera existia há mais de 6 meses, que o Município já havia sido oficiado 3 vezes pelo batalhão de trânsito para recapear a via e que não havia qualquer sinalização luminosa no local. A vítima ajuizou ação de indenização diretamente em face do Município pedindo reparação integral por danos emergentes e morais.',
    legalProblem:
      'Qual é o enquadramento dogmático correto da responsabilidade estatal no caso de dano decorrente de omissão na conservação de via pública?',
    difficulty: 'Intermediário',
    nightVisionHint:
      'A omissão estatal genérica submete-se à teoria subjetiva da falta do serviço (faute du service). No entanto, quando há inércia qualificada com descumprimento de dever legal específico e ciência reiterada da administração, a omissão culposa do Estado é manifesta e gera o dever inafastável de indenizar.',
    availableDecisions: [
      {
        id: 'dec-2-2-reconhecer-falha',
        label: 'Reconhecer a Falha do Serviço (Faute du Service) e Buscar Acordo',
        actionSummary:
          'Reconhecer que houve omissão qualificada culposa do Município pelo descumprimento do dever de conservação e sinalização viária.',
        actionType: 'compensate'
      },
      {
        id: 'dec-2-2-alegar-caso-fortuito',
        label: 'Contestar Invocando Caso Fortuito e Responsabilidade Objetiva Inaplicável',
        actionSummary:
          'Sustentar que chuvas pretéritas causaram o buraco e que o Município não tem responsabilidade objetiva por omissões.',
        actionType: 'dismiss'
      },
      {
        id: 'dec-2-2-denunciar-prefeito',
        label: 'Denunciar a Lide ao Prefeito Anterior como Causador Pessoal',
        actionSummary:
          'Exigir que o ex-prefeito responda conjuntamente no polo passivo da ação indenizatória da vítima.',
        actionType: 'sanction'
      }
    ],
    compatibilityRules: [
      {
        decisionId: 'dec-2-2-reconhecer-falha',
        validConceptIds: ['c-responsabilidade-civil', 'c-bens-publicos'],
        fatalFlawConceptIds: ['c-contratos-equilibrio'],
        outcome: {
          success: true,
          verdictTitle: 'POSTURA JURÍDICA PRECISA: RECONHECIMENTO DA FAUTE DU SERVICE',
          technicalFeedback:
            'Enquadramento perfeito! No caso de danos por omissão estatal na conservação de bens públicos (vias de trânsito), a responsabilidade é subjetiva, fundamentada na Teoria da Falta do Serviço (faute du service). Diante de negligência reiterada e notificação prévia não atendida, o nexo causal entre a inércia administrativa e o dano é incontestável, gerando o dever de indenizar.',
          legalGrounding:
            'Art. 37, § 6º da CF/88 c/c art. 1º, § 3º do Código de Trânsito Brasileiro e jurisprudência consolidada do STJ.',
          minervaReaction: 'triumph',
          xpEarned: 170
        }
      },
      {
        decisionId: 'dec-2-2-alegar-caso-fortuito',
        validConceptIds: ['c-responsabilidade-civil'],
        fatalFlawConceptIds: [],
        outcome: {
          success: false,
          verdictTitle: 'TESE FRÁGIL E DERROTADA: NEGLIGÊNCIA NÃO É FORTUITO',
          technicalFeedback:
            'Caso fortuito exige evento imprevisível e inevitável. Uma cratera de 40 cm que perdurou por 6 meses com três ofícios de alerta descaracteriza qualquer fortuito e evidencia omissão culposa e descaso estatal inescusável.',
          legalGrounding: 'Teoria da Causalidade Direta e Imediata.',
          minervaReaction: 'warning',
          xpEarned: 40
        }
      },
      {
        decisionId: 'dec-2-2-denunciar-prefeito',
        validConceptIds: [],
        fatalFlawConceptIds: ['c-responsabilidade-civil'],
        outcome: {
          success: false,
          verdictTitle: 'ERRO PROCESSUAL VEDADO PELO STF: TEMA 940',
          technicalFeedback:
            'O STF fixou com repercussão geral (Tema 940) que a vítima de dano estatal deve demandar exclusivamente a pessoa jurídica de direito público, sendo vedado incluir o agente público no polo passivo da ação indenizatória.',
          legalGrounding: 'Tema 940 do STF (ação ajuizada unicamente contra a pessoa jurídica).',
          minervaReaction: 'nullity_alarm',
          xpEarned: 15
        }
      }
    ]
  },

  // ==========================================
  // CASOS DO EIXO 3: RELAÇÃO COM O MERCADO
  // ==========================================
  {
    id: 'case-3-1',
    axisId: 'axis-3',
    caseNumber: 'CONTRATO ADMINISTRATIVO 044/2026',
    title: 'O Choque Cambial e o Equilíbrio Econômico-Financeiro',
    assignedRole: 'Gestor de Contratos Públicos da Secretaria de Saúde',
    institutionalContext: 'Secretaria de Estado da Saúde',
    briefing:
      'Uma empresa fornecedora de válvulas cardíacas importadas firmou contrato de fornecimento por 12 meses. Três meses após a assinatura, sobreveio uma crise geopolítica global extraordinária que disparou a cotação da moeda estrangeira em 85% em menos de duas semanas, tornando o custo de aquisição dos insumos muito superior ao valor total a receber do Estado. A empresa protocolou pedido de reequilíbrio econômico-financeiro (revisão contratual), juntando invoices, comprovantes alfandegários e planilhas comparativas, informando que a recusa levará à falência do fornecedor e interrupção do envio das próteses a hospitais de urgência.',
    legalProblem:
      'Como deve o Gestor de Contratos se manifestar tecnicamente sobre o pleito de reequilíbrio extraordinário formulado pela contratada?',
    difficulty: 'Avançado',
    nightVisionHint:
      'A equação econômico-financeira é garantia constitucional intangível (art. 37, XXI da CF). Variações inflacionárias ordinárias resolvem-se por reajuste; porém, choque cambial súbito e imprevisível de grande escala decorrente de fato extraordinário atrai a Teoria da Imprevisão (álea econômica extraordinária), justificando a revisão por termo aditivo.',
    availableDecisions: [
      {
        id: 'dec-3-1-conceder-revisao',
        label: 'Acolher a Revisão Contratual por Teoria da Imprevisão e Álea Extraordinária',
        actionSummary:
          'Aprovar termo aditivo reequilibrando o valor unitário com base estrita na comprovação documental dos custos adicionais supervenientes.',
        actionType: 'convalidate'
      },
      {
        id: 'dec-3-1-negar-e-sancionar',
        label: 'Indeferir o Pedido e Ameaçar com Rescisão Punitiva',
        actionSummary:
          'Sustentar que a variação cambial é risco ordinário do mercado que deve ser suportado integralmente pela empresa.',
        actionType: 'sanction'
      },
      {
        id: 'dec-3-1-rescindir-sem-indenizacao',
        label: 'Rescindir Imediatamente o Contrato Unilateralmente',
        actionSummary:
          'Encerrar o contrato e convocar o segundo colocado da licitação no preço antigo.',
        actionType: 'annul'
      }
    ],
    compatibilityRules: [
      {
        decisionId: 'dec-3-1-conceder-revisao',
        validConceptIds: ['c-contratos-equilibrio', 'c-concessoes-servicos'],
        fatalFlawConceptIds: ['c-poder-policia'],
        outcome: {
          success: true,
          verdictTitle: 'DECISÃO EXEMPLAR: REEQUILÍBRIO TÉCNICO E MANUTENÇÃO DO SERVIÇO',
          technicalFeedback:
            'Solução perfeita e fundamentada. A garantia da equação econômico-financeira original protege tanto a Administração quanto o particular contra áleas extraordinárias extracontratuais. O choque cambial abrupto decorrente de conflito internacional inédito enquadra-se com precisão na Teoria da Imprevisão (art. 124, II, d da Lei 14.133/2021), legitimando a revisão por termo aditivo e evitando o desabastecimento hospitalar.',
          legalGrounding:
            'Art. 37, XXI da CF/88 c/c art. 124, II, d e art. 130 da Lei 14.133/2021.',
          minervaReaction: 'triumph',
          xpEarned: 200
        }
      },
      {
        decisionId: 'dec-3-1-negar-e-sancionar',
        validConceptIds: ['c-contratos-equilibrio'],
        fatalFlawConceptIds: [],
        outcome: {
          success: false,
          verdictTitle: 'DECISÃO ABUSIVA: ENRIQUECIMENTO SEM CAUSA DO ESTADO',
          technicalFeedback:
            'Indeferir pleito embasado em álea extraordinária imprevisível e devidamente comprovada configura abuso das prerrogativas contratuais. O Estado não pode impor ruína econômica ao particular contratado exigindo prestação em valor defasado por fato imprevisível de repercussão global.',
          legalGrounding: 'Princípio da vedação ao enriquecimento sem causa da Administração.',
          minervaReaction: 'nullity_alarm',
          xpEarned: 35
        }
      },
      {
        decisionId: 'dec-3-1-rescindir-sem-indenizacao',
        validConceptIds: [],
        fatalFlawConceptIds: ['c-contratos-equilibrio'],
        outcome: {
          success: false,
          verdictTitle: 'MEDIDA INVIÁVEL E ILÍCITA',
          technicalFeedback:
            'A rescisão unilateral sem culpa da empresa gera direito a indenização integral de perdas e danos. Além disso, o segundo colocado não é obrigado a aceitar o contrato em preço defasado com a mesma realidade cambial.',
          legalGrounding: 'Art. 137 da Lei 14.133/2021.',
          minervaReaction: 'nullity_alarm',
          xpEarned: 20
        }
      }
    ]
  },
  {
    id: 'case-3-2',
    axisId: 'axis-3',
    caseNumber: 'CONTRATAÇÃO DIRETA 018/2026',
    title: 'A Inexigibilidade de Licitação para Software Único de IA',
    assignedRole: 'Presidente da Comissão de Contratações Públicas',
    institutionalContext: 'Tribunal de Justiça do Estado',
    briefing:
      'A Diretoria de Tecnologia formulou requerimento para contratação direta de uma plataforma de Inteligência Artificial para transcrição e análise probatória de audiências judiciais, sob alegação de inexigibilidade de licitação (art. 74, I da Lei 14.133/2021). Constatou-se, contudo, que no mercado nacional existem pelo menos 4 outras empresas consolidadas que desenvolvem e fornecem ferramentas de IA idênticas com funcionalidades análogas de transcrição jurídica. O órgão técnico instruiu o processo alegando que a empresa escolhida tem interface mais amigável.',
    legalProblem:
      'É juridicamente viável a contratação por inexigibilidade de licitação nesse cenário?',
    difficulty: 'Intermediário',
    nightVisionHint:
      'A inexigibilidade pressupõe inviabilidade de competição comprovada (fornecedor exclusivo com atestado de exclusividade ou serviço singular de notória especialização). Se há pluralidade de soluções concorrentes equivalentes no mercado, a competição é viável, sendo obrigatório o procedimento licitatório (ex: Pregão).',
    availableDecisions: [
      {
        id: 'dec-3-2-negar-inexigibilidade',
        label: 'Rejeitar a Inexigibilidade e Determinar a Realização de Pregão Eletrônico',
        actionSummary:
          'Concluir pela viabilidade de competição e ordenar a deflagração de processo licitatório com padrões objetivos de desempenho.',
        actionType: 'convalidate'
      },
      {
        id: 'dec-3-2-aprovar-inexigibilidade',
        label: 'Aprovar a Inexigibilidade com Base na Preferência de Interface',
        actionSummary:
          'Considerar a preferência técnica de usabilidade suficiente para justificar a inviabilidade de competição.',
        actionType: 'maintain'
      },
      {
        id: 'dec-3-2-dispensar-por-emergencia',
        label: 'Converter o Procedimento em Dispensa por Emergência',
        actionSummary:
          'Enquadrar a necessidade de modernização tecnológica como urgência pública administrativa.',
        actionType: 'revoke'
      }
    ],
    compatibilityRules: [
      {
        decisionId: 'dec-3-2-negar-inexigibilidade',
        validConceptIds: ['c-licitacao-direta', 'c-licitacoes-principios'],
        fatalFlawConceptIds: ['c-bens-publicos'],
        outcome: {
          success: true,
          verdictTitle: 'DECISÃO PERFEITA: RESPEITO AO DEVER CONSTITUCIONAL DE LICITAR',
          technicalFeedback:
            'Brilhante! A inexigibilidade exige inviabilidade absoluta de competição. A mera preferência subjetiva por layout ou usabilidade não autoriza a contratação direta quando existem múltiplos fornecedores aptos a atender a demanda no mercado. A conduta correta é o Pregão Eletrônico, permitindo disputa isonômica e obtenção da melhor proposta.',
          legalGrounding:
            'Art. 37, XXI da CF/88 c/c art. 74 da Lei 14.133/2021 e jurisprudência unânime do TCU.',
          minervaReaction: 'triumph',
          xpEarned: 180
        }
      },
      {
        decisionId: 'dec-3-2-aprovar-inexigibilidade',
        validConceptIds: ['c-licitacao-direta'],
        fatalFlawConceptIds: [],
        outcome: {
          success: false,
          verdictTitle: 'ILEGALIDADE GRAVE: INEXIGIBILIDADE FORJADA E RISCO DE IMPROBIDADE',
          technicalFeedback:
            'Contratar por inexigibilidade objeto comum com mercado concorrente aberto é crime previsto no art. 337-E do Código Penal e ato de improbidade administrativa. Preferência pessoal de gestor não anula o dever de licitar.',
          legalGrounding: 'Art. 74 da Lei 14.133/2021 e Súmula 250 do TCU.',
          minervaReaction: 'nullity_alarm',
          xpEarned: 20
        }
      },
      {
        decisionId: 'dec-3-2-dispensar-por-emergencia',
        validConceptIds: [],
        fatalFlawConceptIds: ['c-licitacao-direta'],
        outcome: {
          success: false,
          verdictTitle: 'EMERGÊNCIA FABRICADA ILEGAL',
          technicalFeedback:
            'Atualização de software corporativo não configura situação emergencial ou calamitosa apta a justificar dispensa. Usar dispensa indevida viola os princípios da legalidade e moralidade.',
          legalGrounding: 'Art. 75, VIII da Lei 14.133/2021.',
          minervaReaction: 'nullity_alarm',
          xpEarned: 15
        }
      }
    ]
  },

  // ==========================================
  // CASOS DO EIXO 4: JULGAMENTO E CONTROLE
  // ==========================================
  {
    id: 'case-4-1',
    axisId: 'axis-4',
    caseNumber: 'REPRESENTAÇÃO TCE 331/2026',
    title: 'A Decadência Administrativa e a Segurança Jurídica',
    assignedRole: 'Conselheiro Relator do Tribunal de Contas do Estado',
    institutionalContext: 'Tribunal de Contas do Estado',
    briefing:
      'Uma servidora pública teve incorporada aos seus vencimentos, no ano de 2018, uma gratificação de função por decisão do Secretário de Administração da época. Em 2026 (oito anos depois), a nova gestão descobriu que a interpretação normativa adotada em 2018 estava equivocada e que a servidora não fazia jus à verba. A Administração instaurou processo sumário e cancelou a gratificação, determinando ainda a devolução de todas as parcelas recebidas nos últimos 5 anos. Restou cabalmente provado nos autos que a servidora agiu de absoluta boa-fé e nunca prestou qualquer informação falsa.',
    legalProblem:
      'Na condição de Conselheiro Relator, como deve o Tribunal de Contas decidir sobre a legalidade da anulação do ato e a ordem de devolução de valores?',
    difficulty: 'Avançado',
    nightVisionHint:
      'O poder de autotutela (Súmula 473 do STF) encontra limite intransponível na segurança jurídica e no prazo decadencial de 5 anos (art. 54 da Lei 9.784/99 e Tema 445 do STF). Passados 8 anos de ato favorável com boa-fé, o direito da administração de anular decaiu, sendo ainda indevida a devolução de verba alimentar recebida de boa-fé (Súmula 249 do TCU e Tema 531 do STJ).',
    availableDecisions: [
      {
        id: 'dec-4-1-reconhecer-decadencia',
        label: 'Reconhecer a Decadência Quinquenal e Afastar a Devolução de Valores',
        actionSummary:
          'Determinar o restabelecimento da vantagem pela consumação da decadência e vedar repetição de verba alimentar percebida de boa-fé.',
        actionType: 'convalidate'
      },
      {
        id: 'dec-4-1-manter-anulacao-com-devolucao',
        label: 'Manter a Anulação do Ato e Confirmar a Devolução aos Cofres Públicos',
        actionSummary:
          'Sustentar que a autotutela administrativa é imprescritível e que o erário não pode suportar pagamentos ilegais.',
        actionType: 'sanction'
      },
      {
        id: 'dec-4-1-manter-anulacao-sem-devolucao',
        label: 'Cessar Pagamentos Futuros mas Dispensar a Devolução Passada',
        actionSummary:
          'Revogar o pagamento para o futuro considerando que houve erro da administração, mantendo a boa-fé no passado.',
        actionType: 'maintain'
      }
    ],
    compatibilityRules: [
      {
        decisionId: 'dec-4-1-reconhecer-decadencia',
        validConceptIds: ['c-autotutela', 'c-regime-juridico'],
        fatalFlawConceptIds: ['c-licitacoes-principios'],
        outcome: {
          success: true,
          verdictTitle: 'VOTO ACOLHIDO POR UNANIMIDADE: SEGURANÇA JURÍDICA PREVALECE',
          technicalFeedback:
            'Julgamento irretocável! O direito da Administração de anular atos que produzam efeitos favoráveis aos destinatários decai em cinco anos, salvo comprovada má-fé. Como se passaram 8 anos e a boa-fé é inequívoca, operou-se a decadência do direito de anular. Ademais, verba alimentar recebida de boa-fé é irrepetível segundo a jurisprudência pacífica do STF e STJ.',
          legalGrounding: 'Art. 54 da Lei 9.784/1999 c/c Súmula 249 do TCU e Tema 531 do STJ.',
          minervaReaction: 'triumph',
          xpEarned: 220
        }
      },
      {
        decisionId: 'dec-4-1-manter-anulacao-com-devolucao',
        validConceptIds: ['c-autotutela'],
        fatalFlawConceptIds: [],
        outcome: {
          success: false,
          verdictTitle: 'DECISÃO ILEGAL: VIOLAÇÃO DA SEGURANÇA JURÍDICA E DA LEI',
          technicalFeedback:
            'Ignorar o prazo decadencial de 5 anos transforma a autotutela em poder ilimitado e arbitrário, violando frontalmente o art. 54 da Lei 9.784/99 e a garantia constitucional da segurança jurídica.',
          legalGrounding: 'Art. 54 da Lei 9.784/1999.',
          minervaReaction: 'nullity_alarm',
          xpEarned: 30
        }
      },
      {
        decisionId: 'dec-4-1-manter-anulacao-sem-devolucao',
        validConceptIds: ['c-autotutela'],
        fatalFlawConceptIds: [],
        outcome: {
          success: false,
          verdictTitle: 'EQUÍVOCO: A DECADÊNCIA ESTABILIZA O PRÓPRIO ATO',
          technicalFeedback:
            'A decadência não opera apenas para afastar a devolução pretérita; ela convalida e estabiliza a própria situação jurídica no tempo. A Administração decaiu do poder de suprimir o ato favorável após 5 anos de boa-fé.',
          legalGrounding: 'Tema 445 do STF e art. 54 da Lei 9.784/1999.',
          minervaReaction: 'warning',
          xpEarned: 45
        }
      }
    ]
  },
  {
    id: 'case-4-2',
    axisId: 'axis-4',
    caseNumber: 'AÇÃO DE IMPROBIDADE 022/2026',
    title: 'A Divergência Interpretativa e a Exigência de Dolo Específico',
    assignedRole: 'Procurador-Chefe de Defesa do Gestor Público',
    institutionalContext: 'Procuradoria-Geral do Estado / Defesa Técnica',
    briefing:
      'O Ministério Público ajuizou Ação de Improbidade Administrativa contra um Secretário Municipal de Educação com base no art. 11 da Lei 8.429/92, alegando que ele cometeu ato ímprobo atentatório aos princípios ao aplicar uma resolução municipal recente de interpretação controversa sobre jornada docente. A inicial não apontou enriquecimento ilícito do Secretário, não indicou desvio de dinheiro ou dano ao erário, e admitiu que o Secretário adotou a interpretação amparado em parecer técnico prévio da assessoria jurídica do Município, sustentando apenas que ele agiu com negligência ou culpa.',
    legalProblem:
      'Qual é a linha de defesa técnica mandatória a ser arguida com base na Nova Lei de Improbidade Administrativa (Lei 14.230/2021)?',
    difficulty: 'Intermediário',
    nightVisionHint:
      'A Lei 14.230/2021 extinguiu a modalidade culposa de improbidade e exigiu de forma expressa o DOLO ESPECÍFICO (intenção consciente e livre de praticar o ilícito tipificado). Além disso, o art. 1º, § 8º da lei declara que não configura improbidade a divergência interpretativa da lei baseada em jurisprudência ou doutrina razoável.',
    availableDecisions: [
      {
        id: 'dec-4-2-rejeicao-por-falta-dolo',
        label: 'Pleitear a Rejeição Sumária por Ausência de Dolo Específico e Tipicidade Estrita',
        actionSummary:
          'Demonstrar a inexistência de dolo e a atipicidade da conduta respaldada em parecer jurídico idôneo, extinguindo o processo sem julgamento de mérito.',
        actionType: 'convalidate'
      },
      {
        id: 'dec-4-2-propor-acordo-sem-dolo',
        label: 'Propor Acordo de Não Persecução Civil Confessando Culpa Simples',
        actionSummary:
          'Oferecer pagamento de multa civil simbólica para encerrar a ação rapidamente sem discutir mérito.',
        actionType: 'sanction'
      },
      {
        id: 'dec-4-2-reconhecer-improbidade-principios',
        label: 'Contestar Apenas o Valor da Multa Admitindo a Infração aos Princípios',
        actionSummary:
          'Concordar que houve ofensa formal aos princípios e pleitear redução de eventuais sanções.',
        actionType: 'maintain'
      }
    ],
    compatibilityRules: [
      {
        decisionId: 'dec-4-2-rejeicao-por-falta-dolo',
        validConceptIds: ['c-improbidade-administrativa', 'c-regime-juridico'],
        fatalFlawConceptIds: ['c-servicos-concessoes'],
        outcome: {
          success: true,
          verdictTitle: 'DEFESA VITORIOSA: EXTINÇÃO SUMÁRIA DA AÇÃO DE IMPROBIDADE',
          technicalFeedback:
            'Tese perfeita e irrespondível! A Lei 14.230/2021 estabeleceu a exigência inafastável de DOLO ESPECÍFICO para qualquer ato de improbidade administrativa. Condutas culposas ou decorrentes de divergência interpretativa amparada em parecer jurídico são absolutamente atípicas perante a Lei de Improbidade, impondo a rejeição sumária da petição inicial.',
          legalGrounding:
            'Art. 1º, §§ 1º, 2º e 8º da Lei 8.429/1992 (redação dada pela Lei 14.230/2021) c/c Tema 1199 do STF.',
          minervaReaction: 'triumph',
          xpEarned: 190
        }
      },
      {
        decisionId: 'dec-4-2-propor-acordo-sem-dolo',
        validConceptIds: ['c-improbidade-administrativa'],
        fatalFlawConceptIds: [],
        outcome: {
          success: false,
          verdictTitle: 'ESTRATÉGIA EQUIVOCADA: CONFISSÃO INDEVIDA DE ILÍCITO INEXISTENTE',
          technicalFeedback:
            'O Acordo de Não Persecução Civil pressupõe ato de improbidade com dolo confessado. Propor acordo quando a conduta é atípica impõe estigma indevido e penalidade a um gestor que não cometeu ilícito algum.',
          legalGrounding: 'Art. 17-B da Lei 8.429/1992.',
          minervaReaction: 'warning',
          xpEarned: 30
        }
      },
      {
        decisionId: 'dec-4-2-reconhecer-improbidade-principios',
        validConceptIds: [],
        fatalFlawConceptIds: ['c-improbidade-administrativa'],
        outcome: {
          success: false,
          verdictTitle: 'ERRO TÉCNICO FATAL: PREJUÍZO IRREPARÁVEL AO CLIENTE',
          technicalFeedback:
            'A reforma da Lei 14.230/2021 tornou o rol do art. 11 (princípios) taxativo e dependente de dolo manifesto. Admitir infração quando a lei protege expressamente a divergência interpretativa (art. 1º, § 8º) é erro profissional inaceitável.',
          legalGrounding: 'Art. 11 da Lei 8.429/1992 e Tema 1199 do STF.',
          minervaReaction: 'nullity_alarm',
          xpEarned: 10
        }
      }
    ]
  }
];
