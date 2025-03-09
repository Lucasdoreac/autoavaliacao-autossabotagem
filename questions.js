// Definição das categorias
const categories = [
    {
        id: 'mindset',
        name: 'Mentalidade e Crenças Limitantes',
        description: 'Como seus pensamentos e crenças afetam suas ações',
        color: '#4a6fa5',
        maxScore: 30, // 6 perguntas * 5 pontos máximos
        lowThreshold: 13,
        highThreshold: 23,
        interpretation: {
            low: 'Você demonstra uma mentalidade positiva, com poucas crenças limitantes. Isso é um grande diferencial para seu sucesso.',
            medium: 'Você tem algumas crenças limitantes que ocasionalmente podem estar impedindo seu progresso.',
            high: 'Suas crenças e pensamentos negativos são uma grande barreira para seu sucesso. Esta área merece atenção prioritária.'
        }
    },
    {
        id: 'habits',
        name: 'Hábitos e Autodisciplina',
        description: 'Padrões diários que influenciam seus resultados',
        color: '#e55c30',
        maxScore: 30, // 6 perguntas * 5 pontos máximos
        lowThreshold: 13,
        highThreshold: 23,
        interpretation: {
            low: 'Você mantém hábitos positivos e demonstra boa autodisciplina, o que contribui significativamente para seu sucesso.',
            medium: 'Você tem alguns hábitos que podem estar prejudicando seu progresso. Melhorias na consistência e autodisciplina seriam benéficas.',
            high: 'Seus hábitos diários e falta de autodisciplina estão sabotando significativamente seu potencial de sucesso.'
        }
    },
    {
        id: 'emotional',
        name: 'Inteligência Emocional e Resiliência',
        description: 'Como você gerencia emoções e se recupera de desafios',
        color: '#ffc107',
        maxScore: 30, // 6 perguntas * 5 pontos máximos
        lowThreshold: 13,
        highThreshold: 23,
        interpretation: {
            low: 'Você demonstra boa inteligência emocional e resiliência, o que te ajuda a lidar bem com desafios e contratempos.',
            medium: 'Você tem algumas dificuldades para gerenciar emoções ou se recuperar de fracassos, o que pode estar limitando seu progresso em situações desafiadoras.',
            high: 'Sua dificuldade em gerenciar emoções e baixa resiliência são barreiras significativas para seu sucesso, especialmente em ambientes desafiadores.'
        }
    },
    {
        id: 'adaptability',
        name: 'Capacidade de Adaptação e Aprendizado Contínuo',
        description: 'Como você lida com mudanças e busca novos conhecimentos',
        color: '#28a745',
        maxScore: 25, // 5 perguntas * 5 pontos máximos
        lowThreshold: 11,
        highThreshold: 19,
        interpretation: {
            low: 'Você demonstra boa capacidade de adaptação e valoriza o aprendizado contínuo, o que é essencial no mundo atual em constante mudança.',
            medium: 'Você mostra alguma resistência a mudanças ou nem sempre busca ativamente novos conhecimentos, o que pode limitar suas oportunidades.',
            high: 'Sua dificuldade para se adaptar a mudanças e relutância em aprender coisas novas estão comprometendo seriamente seu crescimento pessoal e profissional.'
        }
    },
    {
        id: 'decision',
        name: 'Tomada de Decisão e Resolução de Problemas',
        description: 'Como você avalia opções e enfrenta desafios',
        color: '#20c997',
        maxScore: 30, // 6 perguntas * 5 pontos máximos
        lowThreshold: 13,
        highThreshold: 23,
        interpretation: {
            low: 'Você possui boas capacidades de tomada de decisão e resolução de problemas, o que te ajuda a navegar eficientemente por desafios.',
            medium: 'Você enfrenta algumas dificuldades ao tomar decisões ou resolver problemas complexos, o que pode estar te atrasando em momentos críticos.',
            high: 'Seus processos de tomada de decisão e abordagem de problemas estão significativamente comprometidos, levando a escolhas ruins ou paralisia.'
        }
    },
    {
        id: 'relationships',
        name: 'Relacionamentos e Habilidades Sociais',
        description: 'Como suas interações sociais impactam suas oportunidades',
        color: '#6f42c1',
        maxScore: 30, // 6 perguntas * 5 pontos máximos
        lowThreshold: 13,
        highThreshold: 23,
        interpretation: {
            low: 'Você mantém relacionamentos saudáveis e possui boas habilidades sociais, o que amplia suas oportunidades e rede de apoio.',
            medium: 'Você tem algumas dificuldades em relacionamentos ou habilidades sociais que podem estar limitando suas conexões e oportunidades.',
            high: 'Suas dificuldades significativas em relacionamentos e habilidades sociais estão comprometendo seu sucesso e bem-estar.'
        }
    },
    {
        id: 'time',
        name: 'Gestão do Tempo e Produtividade',
        description: 'Como você organiza seus recursos e prioridades',
        color: '#fd7e14',
        maxScore: 25, // 5 perguntas * 5 pontos máximos
        lowThreshold: 11,
        highThreshold: 19,
        interpretation: {
            low: 'Você gerencia bem seu tempo e demonstra boa produtividade, o que maximiza seu potencial de realização.',
            medium: 'Você enfrenta alguns desafios na gestão do tempo e produtividade que podem estar limitando o que consegue realizar.',
            high: 'Sua dificuldade significativa em gerenciar o tempo e manter produtividade está comprometendo seriamente sua capacidade de alcançar objetivos.'
        }
    },
    {
        id: 'health',
        name: 'Saúde Física e Bem-Estar',
        description: 'Como você cuida do seu corpo e mente',
        color: '#17a2b8',
        maxScore: 25, // 5 perguntas * 5 pontos máximos
        lowThreshold: 11,
        highThreshold: 19,
        interpretation: {
            low: 'Você mantém bons hábitos de saúde e bem-estar, o que sustenta sua energia e capacidade de perseguir objetivos.',
            medium: 'Você negligencia alguns aspectos de sua saúde e bem-estar, o que pode comprometer sua energia e desempenho a longo prazo.',
            high: 'Seu descuido significativo com saúde e bem-estar está comprometendo sua energia, foco e capacidade de alcançar objetivos.'
        }
    },
    {
        id: 'awareness',
        name: 'Consciência e Ilusão',
        description: 'Como você enxerga a si mesmo e a realidade',
        color: '#6c757d',
        maxScore: 25, // 5 perguntas * 5 pontos máximos
        lowThreshold: 11,
        highThreshold: 19,
        interpretation: {
            low: 'Você demonstra boa autoconsciência e capacidade de enxergar a realidade sem filtros, o que contribui para decisões mais acertadas.',
            medium: 'Você tem alguns pontos cegos em sua autopercepção ou na forma como vê a realidade, o que pode levar a decisões subótimas.',
            high: 'Sua dificuldade significativa em reconhecer seus vieses e enxergar a realidade está comprometendo seriamente sua capacidade de tomar boas decisões.'
        }
    }
];

// Definição de todas as perguntas
const questions = [
    // 1. Mentalidade e Crenças Limitantes
    {
        id: 1,
        category: 'mindset',
        text: 'Eu duvido de mim mesmo(a): Acredito intimamente que não sou bom o bastante para alcançar sucesso significativo.'
    },
    {
        id: 2,
        category: 'mindset',
        text: 'Medo do fracasso: Antes mesmo de tentar algo novo, já imagino que vou fracassar e isso muitas vezes me impede de agir.'
    },
    {
        id: 3,
        category: 'mindset',
        text: 'Mindset fixo: Penso que minhas capacidades (inteligência, talentos) são fixas e não há muito o que eu possa fazer para melhorá-las.'
    },
    {
        id: 4,
        category: 'mindset',
        text: 'Síndrome do impostor: Sinto que não mereço minhas conquistas ou coisas boas, atribuindo meu sucesso à sorte ou engano dos outros.'
    },
    {
        id: 5,
        category: 'mindset',
        text: 'Foco no negativo: Diante de um desafio, minha primeira reação mental é listar motivos pelos quais pode dar errado, em vez de oportunidades de dar certo.'
    },
    {
        id: 6,
        category: 'mindset',
        text: 'Metas baixas por autolimitação: Evito definir metas muito altas ou ambiciosas porque, no fundo, duvido da minha capacidade de alcançá-las.'
    },

    // 2. Hábitos e Autodisciplina
    {
        id: 7,
        category: 'habits',
        text: 'Procrastinação: Deixo tarefas importantes para última hora, mesmo sabendo que isso pode prejudicar meus resultados.'
    },
    {
        id: 8,
        category: 'habits',
        text: 'Rotina inconsistente: Tenho dificuldade em manter uma rotina estável de hábitos positivos – frequentemente começo hábitos novos e logo abandono.'
    },
    {
        id: 9,
        category: 'habits',
        text: 'Falta de foco: Distraio-me facilmente com atividades irrelevantes (redes sociais, TV etc.) em vez de focar no que é prioritário.'
    },
    {
        id: 10,
        category: 'habits',
        text: 'Desistência rápida: Se não vejo resultados rápidos em algo que estou fazendo (ex: dieta, estudo, projeto), desanimo e paro com facilidade.'
    },
    {
        id: 11,
        category: 'habits',
        text: 'Preferência pelo conforto imediato: Frequentemente escolho o que é mais confortável agora (descansar, lazer) em vez de tarefas que trazem benefícios futuros, mas exigem esforço no presente.'
    },
    {
        id: 12,
        category: 'habits',
        text: 'Inconsistência em objetivos pessoais: Tenho dificuldade em me manter consistente em atividades que sei que me fariam progredir (ex: exercícios, curso, plano de negócio), acabando por sabotá-las com desculpas ou adiamentos.'
    },

    // 3. Inteligência Emocional e Resiliência
    {
        id: 13,
        category: 'emotional',
        text: 'Autocrítica destrutiva: Quando algo dá errado por minha causa, sou muito duro(a) comigo mesmo(a) – fico me culpando por bastante tempo e tenho dificuldade em deixar pra lá.'
    },
    {
        id: 14,
        category: 'emotional',
        text: 'Dificuldade com fracasso: Tenho problema em lidar com fracassos ou críticas de forma construtiva – geralmente tomo como algo pessoal e me sinto incapaz.'
    },
    {
        id: 15,
        category: 'emotional',
        text: 'Reação emocional impulsiva: Costumo agir impulsivamente quando estou dominado(a) por emoções fortes (raiva, tristeza, ansiedade), fazendo ou dizendo coisas que depois atrapalham situações importantes.'
    },
    {
        id: 16,
        category: 'emotional',
        text: 'Baixa resiliência: Diante de um obstáculo ou derrota, demoro muito para me recompor – é difícil "dar a volta por cima" e seguir em frente rapidamente.'
    },
    {
        id: 17,
        category: 'emotional',
        text: 'Pouca consciência emocional: Muitas vezes não consigo identificar nem expressar claramente o que estou sentindo, o que dificulta resolver meus sentimentos ou comunicar aos outros.'
    },
    {
        id: 18,
        category: 'emotional',
        text: 'Estresse mal gerenciado: Em situações estressantes, acabo perdendo a calma facilmente ou me desesperando, em vez de manter o foco na solução ou pedir ajuda.'
    },

    // 4. Capacidade de Adaptação e Aprendizado Contínuo
    {
        id: 19,
        category: 'adaptability',
        text: 'Apego à zona de conforto: Evito sair da minha zona de conforto, mesmo sabendo que isso me impede de crescer ou aproveitar oportunidades novas.'
    },
    {
        id: 20,
        category: 'adaptability',
        text: 'Resistência à mudança: Sinto dificuldade em me adaptar quando as circunstâncias mudam – mudanças repentinas me causam muita ansiedade ou reação negativa.'
    },
    {
        id: 21,
        category: 'adaptability',
        text: 'Estagnação de aprendizado: Não busco ativamente aprender coisas novas ou melhorar minhas habilidades; passo longos períodos sem adquirir conhecimentos fora da obrigação.'
    },
    {
        id: 22,
        category: 'adaptability',
        text: 'Rejeição a feedback: Quando alguém dá feedback ou sugere que eu faça algo de outra maneira, tendo a ignorar ou rejeitar ao invés de considerar e aprender com isso.'
    },
    {
        id: 23,
        category: 'adaptability',
        text: 'Métodos ultrapassados: Prefiro continuar fazendo as coisas do meu jeito habitual, e me estresso ou travo quando preciso adotar uma abordagem diferente ou aprender uma ferramenta nova.'
    },

    // 5. Tomada de Decisão e Resolução de Problemas
    {
        id: 24,
        category: 'decision',
        text: 'Adiar decisões difíceis: Costumo postergar decisões importantes por medo de escolher a opção errada, às vezes até perco prazos/opções por hesitar demais.'
    },
    {
        id: 25,
        category: 'decision',
        text: 'Paralisia diante de problemas: Quando enfrento um problema complexo, frequentemente fico paralisado(a) sem saber por onde começar a resolver, protelando a busca de solução.'
    },
    {
        id: 26,
        category: 'decision',
        text: 'Decisões impulsivas: Em certas ocasiões tomo decisões por impulso, sem analisar adequadamente as consequências – e depois me arrependo ou tenho problemas por causa disso.'
    },
    {
        id: 27,
        category: 'decision',
        text: 'Análise excessiva (overthinking): Passo tanto tempo analisando e planejando (buscando a decisão perfeita) que muitas vezes não executo o que planejei ou perco oportunidades.'
    },
    {
        id: 28,
        category: 'decision',
        text: 'Evitação de conflitos/problemas: Quando surge um conflito ou problema difícil, minha tendência é evitar lidar com ele, torcendo para que se resolva sozinho, em vez de tomar uma atitude.'
    },
    {
        id: 29,
        category: 'decision',
        text: 'Repetir erros: Acabo cometendo erros parecidos em decisões diferentes, porque não costumo revisar minhas escolhas passadas nem aprender com o que deu errado anteriormente.'
    },

    // 6. Relacionamentos e Habilidades Sociais
    {
        id: 30,
        category: 'relationships',
        text: 'Não pedir ajuda: Tenho dificuldade em pedir ajuda ou apoio às pessoas, mesmo quando estou precisando – acabo tentando fazer tudo sozinho(a) e isso às vezes me atrasa ou sobrecarrega.'
    },
    {
        id: 31,
        category: 'relationships',
        text: 'Desconfiança: Costumo desconfiar das intenções dos outros ou presumir que vão me decepcionar, o que dificulta criar vínculos ou trabalhar em equipe plenamente.'
    },
    {
        id: 32,
        category: 'relationships',
        text: 'Falta de comunicação emocional: Evito falar sobre meus sentimentos ou problemas com amigos, familiares ou parceiro(a), e isso às vezes afasta as pessoas ou cria mal-entendidos nos meus relacionamentos.'
    },
    {
        id: 33,
        category: 'relationships',
        text: 'Limites frouxos: Tenho dificuldade em estabelecer limites saudáveis – frequentemente digo "sim" quando não quero, ou deixo que as demandas dos outros atrapalhem minhas prioridades e bem-estar.'
    },
    {
        id: 34,
        category: 'relationships',
        text: 'Networking limitado: Evito conhecer pessoas novas ou fazer networking, mesmo sabendo que conexões podem trazer oportunidades pessoais ou profissionais – por timidez, insegurança ou por achar que pode ser inconveniente.'
    },
    {
        id: 35,
        category: 'relationships',
        text: 'Lidar mal com conflitos: Em situações de conflito interpessoal, acabo reagindo de forma defensiva ou agressiva, prejudicando relacionamentos importantes ao invés de resolver o problema com calma e empatia.'
    },

    // 7. Gestão do Tempo e Produtividade
    {
        id: 36,
        category: 'time',
        text: 'Tempo "perdido": Percebo que passo muito tempo em atividades improdutivas (como navegar sem rumo na internet) enquanto tarefas importantes ficam pendentes.'
    },
    {
        id: 37,
        category: 'time',
        text: 'Falta de planejamento: Raramente planejo meu dia ou semana com antecedência – como consequência, frequentemente acumulo tarefas e tenho que correr contra o tempo depois.'
    },
    {
        id: 38,
        category: 'time',
        text: 'Priorização falha: Não priorizo efetivamente minhas tarefas – às vezes gasto um tempão em detalhes pouco importantes e deixo coisas urgentes para depois.'
    },
    {
        id: 39,
        category: 'time',
        text: 'Estouro de prazos: Frequentemente perco prazos ou me atraso em compromissos devido à má gestão do tempo (subestimo o tempo necessário ou esqueço compromissos).'
    },
    {
        id: 40,
        category: 'time',
        text: 'Desorganização geral: Mesmo quando tenho tempo livre, sinto dificuldade em progredir nas minhas metas, pois me faltam organização e foco – muitas vezes termino o dia com a sensação de "não ter rendido".'
    },

    // 8. Saúde Física e Bem-Estar
    {
        id: 41,
        category: 'health',
        text: 'Privação de sono: Regularmente sacrifico horas de sono ou descanso por causa de trabalho/estudo – ou fico acordado até tarde procrastinando – e no dia seguinte meu humor e desempenho caem.'
    },
    {
        id: 42,
        category: 'health',
        text: 'Sedentarismo e má alimentação: Não mantenho hábitos saudáveis consistentes – por exemplo, exercício físico regular ou alimentação equilibrada – mesmo sabendo que isso afeta minha disposição e saúde a longo prazo.'
    },
    {
        id: 43,
        category: 'health',
        text: 'Ignorar sinais de esgotamento: Quando estou estressado ou exausto, tendo a ignorar esses sinais e continuar me pressionando, em vez de fazer pausas ou autocuidado para recarregar as energias.'
    },
    {
        id: 44,
        category: 'health',
        text: 'Saúde em segundo plano: Coloco as minhas necessidades de saúde em segundo plano – por exemplo, adio consultas médicas/exames, não cuido de pequenos problemas – priorizando sempre outras tarefas "mais importantes".'
    },
    {
        id: 45,
        category: 'health',
        text: 'Válvulas de escape prejudiciais: Para lidar com problemas ou tensões, acabo recorrendo com frequência a hábitos pouco saudáveis (como comer besteiras em excesso, fumar, beber álcool ou ficar muito tempo inativo) que aliviam na hora mas atrapalham minha saúde depois.'
    },

    // 9. Consciência e Ilusão
    {
        id: 46,
        category: 'awareness',
        text: 'Pontos cegos: Custa-me reconhecer meus pontos fracos ou erros – muitas vezes me pego arranjando justificativas externas em vez de admitir minhas falhas para mim mesmo(a).'
    },
    {
        id: 47,
        category: 'awareness',
        text: 'Viés de confirmação: Tendência a manter uma visão teimosamente otimista ou pessimista sobre situações, filtrando apenas o que confirma minhas crenças e ignorando fatos ou opiniões contrárias (posso estar me iludindo sem perceber).'
    },
    {
        id: 48,
        category: 'awareness',
        text: 'Locus de controle externo: Acredito que meus problemas ou falhas são principalmente causados por fatores externos (circunstâncias, ações dos outros), em vez de reconhecer meu papel ou minhas escolhas nas situações.'
    },
    {
        id: 49,
        category: 'awareness',
        text: 'Falta de auto-reflexão: Raramente reavalio minhas crenças profundas ou certezas para ver se podem estar equivocadas – mantenho convicções antigas mesmo sem ter certeza absoluta de que são verdade.'
    },
    {
        id: 50,
        category: 'awareness',
        text: 'Autoengano: Às vezes percebo que insisto em certas ilusões sobre mim ou sobre a realidade (ex.: "tudo dará certo sem eu fazer nada" ou "não tenho nenhum viés prejudicial"), mesmo quando há evidências ou pessoas de confiança me mostrando o contrário.'
    }
];