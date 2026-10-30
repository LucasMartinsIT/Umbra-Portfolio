const pt = {
  meta: {
    locale: 'pt-BR',
    title: 'Lucas Martins | Desenvolvedor de Software',
    description:
      'Portfólio de Lucas Martins, Desenvolvedor Back-End e Engenheiro de Software que trabalha com C++, game engines, sistemas back-end e arte 3D.',
  },
  nav: {
    home: 'Início',
    skills: 'Habilidades',
    experience: 'Experiência',
    projects: 'Projetos',
    'gallery-3d': 'Galeria 3D',
    education: 'Formação',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    main: 'Principal',
    mobileMenu: 'Menu móvel',
    sections: 'Seções',
    language: 'Idioma',
  },
  darkHour: {
    enter: 'Entrar na Dark Hour',
    leave: 'Sair da Dark Hour',
    title: 'Dark Hour',
    subtitle: 'A hora oculta entre os dias',
  },
  welcome: {
    name: 'Lucas Martins',
    role: 'DEVELOPER',
    portraitAlt: 'Retrato de Lucas Martins de terno',
    message:
      'Bem-vindo ao meu portfólio! Espero que goste do que está vendo — estou pronto para novos desafios e oportunidades na sua equipe.',
    choicesLabel: 'Como você quer explorar?',
    withMusic: '🎵 Explorar com Música',
    withMusicDetail: 'Tocar "No More What Ifs"',
    silent: '🔇 Explorar em Silêncio',
    silentDetail: 'Sem áudio',
    playMusic: 'Tocar música',
    muteMusic: 'Silenciar música',
    minimize: 'Minimizar diálogo',
    restore: 'Abrir diálogo de boas-vindas',
    audioMissing: 'A trilha sonora está indisponível no momento.',
  },
  moon: {
    label: 'Fase da lua',
    phases: {
      new: 'Lua Nova',
      waxingCrescent: 'Lua Crescente',
      firstQuarter: 'Quarto Crescente',
      waxingGibbous: 'Crescente Gibosa',
      full: 'Lua Cheia',
      waningGibbous: 'Minguante Gibosa',
      lastQuarter: 'Quarto Minguante',
      waningCrescent: 'Lua Minguante',
    },
  },
  hero: {
    availability: 'Aberto a vagas Júnior em Software, Back-End e Jogos',
    role: 'Desenvolvedor Back-End / Engenheiro de Software',
    summary:
      'Estudante de Engenharia de Computação no último ano, com base sólida em desenvolvimento de software e arquitetura de sistemas. Domino C++, Python, C# e JavaScript, com experiência prática em AWS, bancos de dados relacionais e scripts que automatizam processos e ferramentas internas.',
    resumes: { backend: 'Currículo: Backend', game: 'Currículo: Jogos' },
  },
  skills: {
    kicker: 'Status',
    title: 'Habilidades Técnicas',
    groups: [
      {
        title: 'Linguagens',
        items: [
          { name: 'C++' },
          { name: 'C#' },
          { name: 'Python' },
          { name: 'Java' },
          { name: 'JavaScript' },
          { name: 'TypeScript' },
          { name: 'SQL' },
          { name: 'HLSL' },
        ],
      },
      {
        title: 'Bancos de Dados',
        items: [{ name: 'SQL Server' }, { name: 'MongoDB' }, { name: 'Firebird' }, { name: 'SQLite' }],
      },
      {
        title: 'Desenvolvimento Web',
        items: [
          { name: 'HTML / CSS' },
          { name: 'Angular' },
          { name: 'React' },
          { name: 'Tailwind CSS' },
          { name: 'Vite' },
          { name: 'Node.js' },
        ],
      },
      {
        title: 'Jogos & Computação Gráfica',
        items: [
          { name: 'Unity', detail: 'UI Toolkit, Shader Graph, Multiplayer' },
          { name: 'Realidade Aumentada', detail: 'AR Foundation / Core' },
          { name: 'OpenGL' },
          { name: 'Arquitetura de Game Engines' },
          { name: 'Three.js / R3F' },
        ],
      },
      {
        title: 'Engenharia & Automação',
        items: [
          { name: 'Arquitetura de Software' },
          { name: 'Automação de Infraestrutura' },
          { name: 'Pipeline de Renderização Gráfica' },
          { name: 'Correção de Bugs & Troubleshooting Avançado' },
          { name: 'AWS', detail: 'EC2, Lambda, CloudFormation, Step Functions' },
          { name: 'Git' },
          { name: 'CMake' },
        ],
      },
      {
        title: 'Design 3D',
        items: [
          { name: 'Blender 5.2', detail: 'Escultura, modelagem low-poly, rigging com Rigify' },
          { name: 'Substance Painter' },
          { name: 'Pixel Art' },
        ],
      },
    ],
  },
  experience: {
    kicker: 'Vínculos',
    title: 'Experiência Profissional',
    jobs: [
      {
        role: 'Analista de Suporte de TI',
        company: 'DP Automação',
        period: 'Abr 2025 – Atual',
        highlights: [
          'Desenvolvimento Web: Reconstrução e manutenção do site corporativo, correção de bugs sistêmicos e implementação de melhorias.',
          'Automação de Infraestrutura: Criação de scripts PowerShell para automatizar a liberação de portas TCP/UDP no Firewall do Windows e configurar exclusões de serviços no Windows Defender.',
          'Administração de Banco de Dados: Manipulação e execução de consultas complexas em bancos de dados relacionais Firebird SQL de clientes, utilizando a IDE IBExpert.',
          'Suporte Nível 3: Gerenciamento do ciclo de vida de chamados técnicos complexos, criação de documentação técnica e padronização de processos operacionais.',
        ],
      },
      {
        role: 'Customer Success',
        company: 'Deeliv',
        period: 'Mar 2023 – Mar 2025',
        highlights: [
          'Desenvolvimento de Ferramenta Interna: Desenvolvimento de uma ferramenta em JavaScript para a equipe de suporte, facilitando a manipulação de cores e imagens diretamente nos sites dos clientes e reduzindo significativamente o tempo de resolução de chamados.',
          'Customer Success: Condução do onboarding de clientes, treinamento técnico de colaboradores e acompanhamento da base de clientes, utilizando análise de dados para estratégias de retenção.',
        ],
      },
    ],
  },
  projects: {
    kicker: 'Missões',
    title: 'Projetos em Destaque',
    links: { github: 'GitHub', chromeWebStore: 'Chrome Web Store', play: 'Jogar' },
    items: {
      umbracore: {
        name: 'UmbraCore-Engine',
        mediaAlt: 'UmbraCore Engine executando uma cena 3D',
        label: 'Trabalho de Conclusão de Curso',
        description:
          'Game engine 3D própria, construída do zero em C++ e OpenGL 3.3, com foco em programação de baixo nível, gerenciamento de memória e desempenho. Conta com Entity-Component System, editor integrado em ImGui, Bullet Physics, carregamento de GLTF, shaders customizados, serialização de cenas em JSON e geração procedural de masmorras com Golden Path.',
      },
      capybara: {
        name: 'Capybara Zoo Break',
        mediaAlt: 'Gameplay de Capybara Zoo Break',
        label: 'Jogo Mobile · Em Desenvolvimento',
        description:
          'Endless runner 3D estilizado com geração procedural de cidade e comboios, object pooling sem alocação em tempo de execução, shader global de mundo curvo, contornos toon com casco invertido e ferramentas próprias para o editor da Unity.',
      },
      gastoja: {
        name: 'GastoJá Desktop',
        mediaAlt: 'Painel do GastoJá Desktop',
        label: 'Aplicativo Desktop',
        description:
          'Aplicativo de finanças pessoais com foco em regras de negócio e persistência de dados, HUD inspirado em RPG, motor de previsão de caixa, conciliação automática de faturas e arquitetura MVC, empacotado como executável independente.',
      },
      picscreen: {
        name: 'Picscreen',
        mediaAlt: 'Ícone da extensão Picscreen',
        label: 'Publicado na Chrome Web Store',
        description:
          'Extrator de referências e paletas, disponível oficialmente na Chrome Web Store. Extrai paletas HEX de páginas e imagens, captura cores com conta-gotas nativo e baixa referências visuais em lote em um ZIP, tudo processado localmente.',
      },
      gaiaProtector: {
        name: 'Gaia Protector',
        mediaAlt: 'Tela do jogo Gaia Protector',
        label: '1º Lugar · Facens Code',
        description:
          'Jogo educativo sobre sustentabilidade que conquistou o 1º lugar na competição de programação Facens Code e rendeu a Bolsa de Mérito Acadêmico na Facens.',
      },
      rocketBuilder: {
        name: 'RocketBuilder-AR',
        mediaAlt: 'Foguete montado em realidade aumentada',
        label: 'Realidade Aumentada',
        description:
          'Projeto universitário de RA em que o jogador monta um foguete modular sobre uma imagem rastreada, e cada peça altera seu peso, aerodinâmica e potência.',
      },
      crossyRoad: {
        name: 'Crossy Road Like',
        mediaAlt: 'Gameplay de Crossy Road Like',
        label: 'Jogo Mobile',
        description:
          'Endless runner rogue-like com movimentação em grid, combate automático com canhão, escolha de upgrades ao final de cada fase e loja de moedas para desbloquear personagens.',
      },
    },
  },
  gallery: {
    kicker: 'Compêndio',
    title: 'Galeria 3D',
    previous: 'Modelo anterior',
    next: 'Próximo modelo',
    modelLabel: 'Modelo 3D',
    animations: 'Animações',
    viewerError: 'O visualizador 3D não pôde ser iniciado neste dispositivo.',
    stats: { tris: 'Tris', verts: 'Verts', rig: 'Rig', yes: 'Sim', no: 'Não' },
    types: { character: 'Personagem', prop: 'Objeto' },
    clips: { idle: 'Parada', run: 'Correr', jump: 'Pular', slide: 'Deslizar' },
    models: {
      capybara: {
        name: 'Capivara',
        type: 'character',
        description:
          'A protagonista de Capybara Zoo Break: personagem com rig em Rigify e as animações de parada, corrida, pulo e deslize usadas no jogo.',
      },
      watermelon: {
        name: 'Fatia de Melancia',
        type: 'prop',
        description:
          'Pintada à mão no Blender: 56 triângulos sustentados por uma textura pintada em 1K, com sementes, pinceladas e detalhes em meio-tom.',
      },
      survivor: {
        name: 'Sobrevivente',
        type: 'character',
        description:
          'A personagem mais detalhada do conjunto: com rig, malhas separadas de cabelo, roupas e botas, e texturas em 1K.',
      },
      ninja: {
        name: 'Ninja',
        type: 'character',
        description: 'Rig feito com Rigify e textura 2K no Substance Painter, com malhas separadas de camisa, saia e corda.',
      },
      loveChan: {
        name: 'Love-chan',
        type: 'character',
        description: 'Personagem com rig, modelada a partir de folhas de turnaround, com texturas próprias de corpo e rosto.',
      },
      rpg: {
        name: 'RPG',
        type: 'prop',
        description: 'Lança-foguetes texturizado com malha de míssil separada.',
      },
      sword: {
        name: 'Espada',
        type: 'prop',
        description: 'Espada low-poly com menos de 400 triângulos e textura base em 1K.',
      },
    },
  },
  education: {
    kicker: 'Acadêmico',
    title: 'Formação Acadêmica',
    degree: 'Bacharelado em Engenharia de Computação',
    school: 'Centro Universitário Facens (UniFACENS)',
    period: 'Fev 2022 – Atual',
    status: 'Último Ano',
    award: {
      kicker: '1º Lugar · Facens Code',
      title: 'Bolsa de Mérito Acadêmico',
      description:
        'Bolsa de Mérito Acadêmico na Facens, conquistada com o 1º lugar na competição de programação Facens Code antes do início da graduação, com o Gaia Protector, um jogo educativo sobre sustentabilidade.',
      link: 'Jogar Gaia Protector',
    },
    languagesTitle: 'Idiomas',
    languages: [
      { name: 'Português', level: 'Nativo' },
      { name: 'Inglês', level: 'Avançado' },
    ],
  },
};

export default pt;
