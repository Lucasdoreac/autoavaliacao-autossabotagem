// Recomendações específicas para cada categoria
const recommendations = {
    // Mentalidade e Crenças Limitantes
    mindset: [
        "Pratique o registro diário de pensamentos negativos e sua contestação com evidências contrárias (técnica da TCC).",
        "Adote afirmações positivas realistas baseadas em suas conquistas reais, mesmo que pequenas.",
        "Leia livros sobre mentalidade de crescimento, como 'Mindset: A Nova Psicologia do Sucesso' de Carol Dweck.",
        "Comece um 'diário de sucessos' onde você registra todas suas conquistas, por menores que sejam.",
        "Faça um exercício de visualização diário onde você se imagina tendo sucesso em seus objetivos.",
        "Preste atenção ao seu diálogo interno e substitua frases como 'Eu não posso' por 'Eu ainda não aprendi como'.",
        "Assista palestras ou leia sobre a Síndrome do Impostor e como superá-la.",
        "Estabeleça metas ligeiramente acima do seu nível de conforto para começar a expandir suas crenças sobre o que é possível."
    ],
    
    // Hábitos e Autodisciplina
    habits: [
        "Implemente a técnica Pomodoro: 25 minutos de trabalho concentrado seguidos de 5 minutos de pausa.",
        "Crie um sistema de 'se-então' para seus hábitos (Ex.: 'SE eu tomar café da manhã, ENTÃO farei 10 minutos de exercícios').",
        "Use a estratégia de 'não quebrar a corrente' - marque no calendário cada dia que você cumpre um hábito desejado.",
        "Reduza a 'fricção' para hábitos positivos e aumente-a para negativos (ex: deixe o livro que quer ler visível e esconda o celular).",
        "Implemente 'mínimos ridículos' para hábitos importantes (ex: 'fazer 1 flexão por dia' ou 'escrever 1 parágrafo').",
        "Use a regra dos 2 minutos: se algo leva menos de 2 minutos para ser feito, faça imediatamente.",
        "Pratique a técnica de implementação de intenções: defina antecipadamente quando, onde e como você realizará uma ação.",
        "Utilize aplicativos de controle de hábitos que ajudam a monitorar seu progresso e manter consistência."
    ],
    
    // Inteligência Emocional e Resiliência
    emotional: [
        "Pratique mindfulness ou meditação diariamente para aumentar sua consciência emocional (aplicativos como Calm ou Headspace podem ajudar).",
        "Mantenha um diário emocional onde você identifica suas emoções e os gatilhos que as provocam.",
        "Aprenda técnicas de respiração diafragmática para usar em momentos de forte emoção ou estresse.",
        "Crie um 'menu de autocuidado' com atividades que ajudam a regular suas emoções em momentos difíceis.",
        "Estabeleça uma rotina de 'pausa reflexiva' antes de reagir a situações emocionalmente carregadas.",
        "Pratique reenquadrar fracassos como oportunidades de aprendizado, listando pelo menos 3 lições de cada experiência negativa.",
        "Busque exemplos de pessoas que superaram obstáculos semelhantes para inspiração.",
        "Desenvolva um 'mantra de resiliência' personalizado para repetir durante momentos desafiadores."
    ],
    
    // Capacidade de Adaptação e Aprendizado Contínuo
    adaptability: [
        "Desafie-se a fazer algo novo ou diferente semanalmente, mesmo que pequeno.",
        "Pratique a técnica de 'desapego experimental' - tente fazer as coisas de maneira diferente por uma semana sem julgamentos.",
        "Dedique um tempo semanal específico para aprender algo novo em sua área ou fora dela.",
        "Procure ativamente feedback construtivo e pratique recebê-lo sem defensividade.",
        "Crie um 'banco de conhecimento' pessoal onde você registra novos aprendizados.",
        "Exponha-se deliberadamente a pontos de vista diferentes dos seus através de leituras, podcasts ou conversas.",
        "Pratique a 'curiosidade ativa', fazendo perguntas como 'por que isso funciona assim?' ou 'o que posso aprender aqui?'",
        "Desenvolva o hábito de refletir sobre experiências passadas para extrair lições e aplicá-las em novos contextos."
    ],
    
    // Tomada de Decisão e Resolução de Problemas
    decision: [
        "Pratique o método 10/10/10 para decisões: como você se sentirá sobre esta decisão em 10 minutos, 10 meses e 10 anos?",
        "Utilize a técnica de 'prospectiva compensatória' - liste os prós e contras de cada opção, atribuindo pesos a cada item.",
        "Implemente prazos para decisões importantes para evitar análise excessiva.",
        "Pratique dividir problemas complexos em partes menores e mais gerenciáveis.",
        "Mantenha um 'diário de decisões' onde você registra decisões importantes, suas razões e os resultados obtidos.",
        "Aprenda a distinguir entre decisões reversíveis (que podem ser mudadas facilmente) e irreversíveis (que exigem mais análise).",
        "Pratique a técnica de 'pré-mortem': imagine que sua decisão levou a um resultado ruim e identifique antecipadamente o que poderia dar errado.",
        "Desenvolva um sistema pessoal para resolver problemas recorrentes, criando 'regras de decisão' para situações semelhantes."
    ],
    
    // Relacionamentos e Habilidades Sociais
    relationships: [
        "Pratique pedir ajuda em pequenas coisas para se acostumar a ser vulnerável.",
        "Implemente a técnica da 'escuta ativa': concentre-se totalmente no que a outra pessoa está dizendo sem planejar sua resposta.",
        "Aprenda a expressar seus sentimentos usando frases na primeira pessoa ('Eu me sinto...') em vez de acusações.",
        "Pratique dizer 'não' educadamente, mas firmemente, começando com situações de baixo risco.",
        "Crie um sistema de networking onde você mantém contato regular com pessoas importantes em sua rede.",
        "Aprenda técnicas básicas de comunicação não-violenta para momentos de conflito.",
        "Estabeleça 'contratos relacionais' claros, expressando suas necessidades e limites em relacionamentos importantes.",
        "Reserve tempo regular para investir em relacionamentos significativos, mesmo quando está ocupado."
    ],
    
    // Gestão do Tempo e Produtividade
    time: [
        "Implemente a matriz de Eisenhower para classificar tarefas como urgentes/importantes e priorizar adequadamente.",
        "Pratique o planejamento da semana no domingo e revisão diária pela manhã.",
        "Use a técnica de 'bloco de tempo' (time blocking) para dedicar períodos específicos a tarefas importantes.",
        "Implemente a regra de 1-3-5: planeje fazer 1 tarefa grande, 3 médias e 5 pequenas por dia.",
        "Pratique a técnica de 'comer o sapo' - começar o dia com a tarefa mais difícil ou desagradável.",
        "Use a estratégia de 'buffer time' - adicione 50% mais tempo ao que você estima para cada tarefa.",
        "Implemente revisões semanais para identificar o que funcionou e o que precisa ser melhorado em sua gestão de tempo.",
        "Reduza multitarefas e pratique concentração profunda em uma tarefa por vez."
    ],
    
    // Saúde Física e Bem-Estar
    health: [
        "Estabeleça uma rotina consistente de sono, indo para a cama e acordando nos mesmos horários todos os dias.",
        "Implemente pausas ativas durante o dia de trabalho - levante-se e se movimente por 5 minutos a cada hora.",
        "Crie um 'ritual de descompressão' para o final do dia de trabalho/estudo.",
        "Pratique a 'regra das 2 horas' - não comer nem olhar telas 2 horas antes de dormir.",
        "Estabeleça um 'check-in corporal' diário, dedicando alguns minutos para perceber como você se sente fisicamente.",
        "Substitua gradualmente uma válvula de escape prejudicial por uma saudável (ex: trocar scrolling por uma caminhada).",
        "Incorpore micro-exercícios em sua rotina diária, mesmo que apenas 5-10 minutos.",
        "Crie um sistema de 'gatilhos ambientais' para hábitos saudáveis (ex: garrafa de água visível, tênis ao lado da cama)."
    ],
    
    // Consciência e Ilusão
    awareness: [
        "Pratique a técnica do 'advogado do diabo', questionando deliberadamente suas próprias suposições e crenças.",
        "Mantenha um 'diário de vieses', registrando momentos em que você percebe que pode estar sendo influenciado por vieses cognitivos.",
        "Implemente a prática de pedir feedback honesto de pessoas de confiança sobre seus pontos cegos.",
        "Pratique a técnica de 'ver como observador externo' - como uma terceira pessoa veria sua situação atual?",
        "Aprenda sobre os vieses cognitivos comuns e identifique quais você tende a apresentar mais frequentemente.",
        "Desenvolva o hábito de procurar evidências que contradizem suas crenças ou expectativas.",
        "Pratique a 'curiosidade epistêmica' - o genuíno desejo de entender por que outras perspectivas podem estar certas.",
        "Implemente revisões mensais de autoconsciência, refletindo sobre como suas ações se alinham com seus valores e crenças declarados."
    ]
};