"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { siteConfig } from "../../config/site";

// Dados iniciais das 4 semanas de Reels
const defaultPromptsData = [
  // SEMANA 1
  {
    day: 1,
    week: 1,
    title: "Quem sou eu",
    goal: "Apresentar a Ana Paula e quebrar o gelo sobre a terapia.",
    format: "Talking Head (Ela falando para a câmera)",
    roteiro: "Olá, sou Ana Paula Faulhaber. Muita gente acha que a psicanálise é só ficar em silêncio, mas é um espaço de fala. Eu ajudo pessoas a atravessarem lutos, depressões e angústias. Se você sente que carrega um peso maior que pode suportar, este perfil é para você.",
    legenda: "Olá! Sou psicanalista clínica e ajudo pessoas a ressignificarem suas dores emocionais. Agende uma conversa através do link na minha bio.",
    prompt: "Foto profissional e acolhedora de um consultório de psicologia moderno, com uma poltrona confortável vazia, luz natural suave entrando pela janela, plantas verdes, foco suave, estilo clean e minimalista."
  },
  {
    day: 2,
    week: 1,
    title: "A dor que não fala",
    goal: "Chamar atenção para a somatização das emoções no corpo.",
    format: "Indireto/Cênico (B-Roll)",
    roteiro: "Vídeo de B-Roll (Ana Paula servindo um chá ou abrindo a janela do consultório). Texto na tela: \"A dor que não fala, o corpo sente.\"",
    legenda: "Quando engolimos nossos sentimentos, angústias e dores, o corpo encontra uma saída de escape. Dores de cabeça, cansaço crônico e apertos no peito costumam ter raízes emocionais. Como você tem lidado com sua dor silenciosa?",
    prompt: "Close cinematográfico de mãos segurando uma xícara de chá quente soltando vapor, perto de uma janela com dia nublado. Atmosfera introspectiva e calma."
  },
  {
    day: 3,
    week: 1,
    title: "Mito x Verdade sobre Depressão",
    goal: "Desmistificar julgamentos comuns e oferecer empatia.",
    format: "Apontando para textos",
    roteiro: "Texto na Tela: \"Coisas que não ajudam na depressão: 1. Dizer 'vai passar'; 2. Mandar 'reagir'; 3. Julgar a falta de energia.\" Final: Ela faz um gesto de acolhimento: \"O que ajuda? Escuta profissional.\"",
    legenda: "Depressão não é frescura, preguiça ou falta de força de vontade. É uma dor séria que requer acolhimento adequado e escuta qualificada. Não julgue quem está passando por isso, ofereça suporte e incentive a busca por terapia.",
    prompt: "Fundo abstrato suave com formas orgânicas em tons de bege e azul sereno, espaço negativo no centro para colocar texto, estilo minimalista e elegante."
  },
  {
    day: 4,
    week: 1,
    title: "O Luto não é linha reta",
    goal: "Acolher o processo individual de dor pela perda.",
    format: "Falando para a câmera (Talking Head)",
    roteiro: "O luto não é uma linha reta. Tem dias que você está bem, tem dias que a saudade derruba. E não existe prazo de validade para a dor. Como tem sido o seu processo?",
    legenda: "Respeite seu próprio tempo no luto. Não há prazo preestabelecido para a saudade ou para a dor. A análise oferece um espaço seguro para que essa dor seja nomeada e elaborada.",
    prompt: "Imagem artística de um caminho em uma floresta com folhas de outono no chão, luz do sol atravessando as árvores, simbolizando a jornada e o tempo. Fotografia de natureza."
  },
  {
    day: 5,
    week: 1,
    title: "Bastidores do Consultório",
    goal: "Gerar proximidade e mostrar profissionalismo.",
    format: "Time-lapse de preparação",
    roteiro: "Filmagem acelerada (Time-lapse) dela estudando ou organizando a agenda de atendimentos. Texto na Tela: \"Preparando o espaço de escuta para os atendimentos da semana.\"",
    legenda: "Os bastidores do trabalho de uma psicanalista envolvem estudo, dedicação e preparo clínico diário para garantir um espaço de fala acolhedor e ético a cada paciente.",
    prompt: "Mesa de estudos organizada com livros de psicanálise, um caderno aberto, óculos e uma caneta. Iluminação quente de abajur, foco em detalhes."
  },
  {
    day: 6,
    week: 1,
    title: "A coragem de visitar porões",
    goal: "Frase de impacto gerando reflexão existencial.",
    format: "Vídeo conceitual (B-Roll) com texto",
    roteiro: "Vídeo de uma paisagem calma ou chuva na janela. Texto na Tela: \"Fazer análise é ter a coragem de visitar os porões da própria história para acender a luz.\"",
    legenda: "Olhar para o passado e para o que guardamos no inconsciente pode dar medo, mas é o único caminho para nos libertarmos de amarras emocionais antigas. Você tem coragem de olhar para dentro?",
    prompt: "Paisagem de um mar calmo no amanhecer, cores pastéis suaves (rosa, azul, lilás), transmitindo paz infinita e profundidade."
  },
  {
    day: 7,
    week: 1,
    title: "Convite à Psicoterapia",
    goal: "Chamada comercial ética para abertura de agenda.",
    format: "Talking Head / Falando direto",
    roteiro: "Se você viu meus vídeos essa semana e se identificou, saiba que minha agenda está aberta para novos pacientes. O link para agendar no fuso horário do seu país está na bio.",
    legenda: "Cuidar de si é um processo constante. Realizo atendimentos de psicanálise online para brasileiros no Brasil e expatriados em todo o mundo. Agenda aberta na bio.",
    prompt: "Uma porta entreaberta revelando um ambiente aconchegante e iluminado lá dentro, simbolizando boas-vindas e abertura para o novo."
  },

  // SEMANA 2
  {
    day: 8,
    week: 2,
    title: "A Depressão Invisível",
    goal: "Identificar a depressão funcional ou atípica.",
    format: "Transição de semblante / Cênico",
    roteiro: "Texto na Tela: \"A depressão nem sempre é ficar na cama. Às vezes, é sorrir o dia todo e desabar quando chega em casa.\" (Vídeo com semblante neutro sorridente, depois expressando cansaço).",
    legenda: "Muitas pessoas sofrem em silêncio mantendo rotinas ativas e sorrisos sociais. Se você se sente exausto(a) por dentro enquanto precisa parecer bem por fora, lembre-se que há espaço para sua dor real na análise.",
    prompt: "Fotografia conceitual de um espelho refletindo um céu azul, enquanto fora do espelho o ambiente é levemente cinza. Simbolizando o que mostramos versus o que sentimos."
  },
  {
    day: 9,
    week: 2,
    title: "Por que repetimos padrões?",
    goal: "Explicar brevemente a repetição inconsciente.",
    format: "Talking Head",
    roteiro: "Por que repetimos padrões afetivos e profissionais? Na psicanálise, entendemos que o inconsciente tenta resolver conflitos antigos repetindo as mesmas dinâmicas. Identificar isso é o primeiro passo para mudar.",
    legenda: "Escolher o mesmo tipo de relacionamento destrutivo, ou cair nas mesmas armadilhas profissionais, pode ser um sintoma de repetição inconsciente. Romper esses ciclos é o foco do processo analítico.",
    prompt: "Imagem macro de uma espiral natural (como uma concha ou uma suculenta), focando na geometria perfeita e na ideia de repetição cíclica."
  },
  {
    day: 10,
    week: 2,
    title: "5 sinais de ansiedade alta",
    goal: "Identificar sintomas físicos e mentais de ansiedade.",
    format: "Apontando / Textos na tela",
    roteiro: "Texto na Tela: \"5 sinais de que sua ansiedade está alta demais: 1. Pensamento acelerado que não desliga; 2. Insônia ou sono agitado; 3. Tensão muscular; 4. Medo constante do futuro; 5. Sensação de aperto no peito.\"",
    legenda: "A ansiedade não é apenas uma preocupação boba; ela afeta o corpo de forma profunda. Reconhecer estes sinais físicos e mentais ajuda a dar o limite e buscar acolhimento profissional antes que vire pânico.",
    prompt: "Imagem abstrata representando 'ruído mental', com linhas suaves e um pouco caóticas que se transformam em linhas retas e calmas, tons de azul e cinza."
  },
  {
    day: 11,
    week: 2,
    title: "A culpa de estar triste",
    goal: "Desconstruir a cobrança da positividade tóxica.",
    format: "Talking Head",
    roteiro: "Uma vez um paciente me disse que se sentia culpado por estar triste quando deveria estar feliz. A culpa é um sintoma muito comum na depressão. A tristeza não deve ser motivo de punição interna.",
    legenda: "Vivemos cobrados pela felicidade imediata. Quando a tristeza bate, nos sentimos culpados. Mas a tristeza é uma emoção humana válida. Entender e acolher essa tristeza, em vez de puni-la, é onde a cura começa.",
    prompt: "Silhueta suave de uma pessoa olhando para uma paisagem vasta (montanhas ou horizonte), contra a luz, preservando a identidade, transmitindo reflexão."
  },
  {
    day: 12,
    week: 2,
    title: "Minhas leituras e referências",
    goal: "Demonstrar embasamento clínico na psicanálise.",
    format: "Cênico / Close em livros",
    roteiro: "Close estético de livros de Freud, Lacan e Winnicott. Música de fundo serena. Texto na tela: \"Estudo e fundamentação teórica para acolher cada história de vida com ética.\"",
    legenda: "A psicanálise exige uma formação tripé: análise pessoal, supervisão clínica e muito estudo teórico. Cada sessão é sustentada por séculos de teorias que validam a escuta qualificada.",
    prompt: "Estante de livros antiga e charmosa, com foco na lombada de livros clássicos de capa dura, iluminação dramática e intelectual."
  },
  {
    day: 13,
    week: 2,
    title: "Terapia online funciona?",
    goal: "Responder dúvida comum que barra o agendamento.",
    format: "Talking Head / Resposta a caixinha",
    roteiro: "Muita gente pergunta: 'A terapia online realmente funciona?'. Sim! A psicanálise se baseia na palavra e na escuta. A videochamada oferece a mesma conexão terapêutica e a segurança que você teria presencialmente.",
    legenda: "A terapia online oferece a praticidade de realizar sua análise no conforto do seu lar, de qualquer lugar do mundo. O sigilo e o acolhimento permanecem idênticos. Dúvidas? Me envie um direct.",
    prompt: "Design minimalista com balões de fala suaves e transparentes flutuando em um fundo degradê calmo. Estilo moderno 3D soft."
  },
  {
    day: 14,
    week: 2,
    title: "Não se cobre no domingo",
    goal: "Mensagem de relaxamento e acolhimento para o final de semana.",
    format: "Vídeo de descanso (B-Roll)",
    roteiro: "Vídeo relaxante de domingo. Texto na tela: \"Não se cobre produtividade quando sua alma pede descanso.\"",
    legenda: "Domingo à noite é a hora em que a ansiedade pela semana que se inicia costuma bater. Dê-se a permissão de descansar sem culpa. O descanso é essencial para recarregar sua saúde mental.",
    prompt: "Uma rede de descanso vazia em uma varanda com vista para o jardim, transmitindo descanso absoluto e preguiça boa de domingo."
  },

  // SEMANA 3
  {
    day: 15,
    week: 3,
    title: "O que o seu vazio diz?",
    goal: "Problematizar a sensação de vazio existencial.",
    format: "Talking Head",
    roteiro: "A sensação de vazio não precisa ser preenchida imediatamente com compras, comida ou telas de celular. Ela precisa ser ouvida. O que o seu vazio está tentando te dizer sobre a sua vida?",
    legenda: "O vazio existencial é um sinal de que algo na nossa história precisa de espaço e atenção. Tentar tampá-lo correndo só adia a angústia. Na psicanálise, sentamos e ouvimos o que o vazio quer dizer.",
    prompt: "Uma cadeira solitária em uma sala ampla e iluminada, estilo galeria de arte minimalista. O vazio não como algo ruim, mas como espaço."
  },
  {
    day: 16,
    week: 3,
    title: "O luto é amor represado",
    goal: "Sensibilizar e validar a dor da saudade.",
    format: "B-Roll ao ar livre com texto",
    roteiro: "Vídeo dela caminhando em um parque ou olhando para o horizonte. Texto na tela: \"O luto é o amor que não tem para onde ir.\"",
    legenda: "Quando perdemos alguém, o amor que sentíamos por aquela pessoa permanece em nós, mas perde o seu destinatário físico. Lutar é encontrar novos destinos para esse amor que ficou órfão. Permita-se sentir.",
    prompt: "Pôr do sol dourado no horizonte do mar, nostálgico e belo. A luz dourada tocando a água. Sensação de saudade e paz."
  },
  {
    day: 17,
    week: 3,
    title: "Você não é um peso",
    goal: "Mensagem direta de prevenção ao suicídio.",
    format: "Talking Head séria e acolhedora",
    roteiro: "Se você sente que a sua existência é um peso para os que estão à sua volta, por favor saiba que isso é um sintoma da depressão, e não uma verdade. Há tratamento e você não precisa carregar isso só.",
    legenda: "A dor profunda pode turvar nossa visão e nos fazer acreditar em mentiras que a depressão conta. Você é importante e existe ajuda. Se precisar conversar agora, ligue para o CVV no número 188.",
    prompt: "Close-up de uma pequena planta (broto) nascendo no meio de rochas ou concreto, simbolizando resiliência e a força da vida. Foco nítido, luz da manhã."
  },
  {
    day: 18,
    week: 3,
    title: "Como ajudar quem está deprimido",
    goal: "Educar familiares e amigos no acolhimento correto.",
    format: "Dicas diretas",
    roteiro: "Como ajudar alguém com depressão? 1. Não dê conselhos vazios; 2. Ouça sem julgar a falta de ânimo; 3. Demonstre presença física ou afetiva; 4. Ajude e incentive a pessoa a encontrar ajuda psicológica.",
    legenda: "Muitas vezes, a nossa pressa em ver a pessoa feliz nos faz dar conselhos que soam como cobrança para quem está deprimido. Apenas estar presente e sugerir ajuda profissional é o maior ato de amor.",
    prompt: "Duas mãos se tocando suavemente ou uma mão sobre o ombro da outra, transmitindo apoio, empatia e suporte humano. Tons quentes."
  },
  {
    day: 19,
    week: 3,
    title: "Pedir ajuda é sinal de força",
    goal: "Desconstruir o estigma da autossuficiência extrema.",
    format: "Cênico / Texto na tela",
    roteiro: "Vídeo de uma rocha resistindo à água. Texto na tela: \"Ser forte não é aguentar tudo sozinho. Ser forte é saber o momento de pedir ajuda.\"",
    legenda: "Acreditamos na fantasia de que precisamos dar conta de tudo sozinhos. Mas a verdadeira força consiste em reconhecer a nossa vulnerabilidade humana e buscar apoio quando o fardo fica pesado demais.",
    prompt: "Uma rocha grande e firme no meio de um rio com água fluindo ao redor. Longa exposição para deixar a água sedosa. Simbolizando resistência."
  },
  {
    day: 20,
    week: 3,
    title: "Psicanalista também faz análise",
    goal: "Humanizar a figura da terapeuta.",
    format: "Cênico / Autocuidado",
    roteiro: "Vídeo calmo dela tomando café ou respirando fundo no consultório. Texto: \"Para cuidar da mente do outro, também preciso cuidar da minha. Psicanalista faz análise.\"",
    legenda: "A análise pessoal e supervisão da analista garantem que seus próprios conflitos internos não interfiram na escuta ética do paciente. Cuidar de si é a premissa de qualquer cuidado profissional.",
    prompt: "Flat lay (foto de cima) de um momento de autocuidado: um livro, uma vela aromática acesa e uma flor sobre um lençol branco texturizado."
  },
  {
    day: 21,
    week: 3,
    title: "Novos horários na agenda",
    goal: "Converter seguidores em pacientes agendados.",
    format: "Talking Head / Direta",
    roteiro: "A partir da próxima semana, abrirei alguns novos horários na minha agenda para terapia online. Se você sente que é o momento de falar sobre luto ou depressão, clique no link na bio.",
    legenda: "Dê o primeiro passo para o seu processo analítico. Agendamento automático integrado ao fuso horário internacional disponível no meu site. Vagas limitadas.",
    prompt: "Uma agenda elegante aberta com uma caneta tinteiro em cima, ao lado de um vaso de flores minimalista. Foco na organização e disponibilidade."
  },

  // SEMANA 4
  {
    day: 22,
    week: 4,
    title: "Psicanálise ou TCC?",
    goal: "Explicar brevemente o foco da psicanálise.",
    format: "Talking Head explicativo",
    roteiro: "Qual a diferença entre TCC e Psicanálise? A TCC foca em mudar comportamentos e pensamentos no presente. A Psicanálise vai além, investigando as raízes inconscientes que causam esses comportamentos.",
    legenda: "Não existe melhor ou pior abordagem, mas sim aquela que combina melhor com seu momento de vida. Se você deseja explorar sua história em profundidade para compreender seus sintomas, a psicanálise é para você.",
    prompt: "Ilustração ou foto conceitual de raízes profundas de uma árvore embaixo da terra (corte transversal), mostrando a profundidade que não se vê na superfície."
  },
  {
    day: 23,
    week: 4,
    title: "Dica de livro para a alma",
    goal: "Indicar uma leitura sobre sentimentos.",
    format: "Cênico / Livro na mão",
    roteiro: "Vídeo mostrando a capa de um livro inspirador (ex: sobre luto ou superação). Texto: \"Uma leitura que nos ajuda a dar nome para as nossas dores mais difíceis.\"",
    legenda: "Livros nos oferecem espelhos para as nossas próprias angústias. Ler ajuda a acolher nossos sentimentos. Qual livro marcou sua história emocional?",
    prompt: "Mãos femininas segurando um livro aberto, com um fundo desfocado de uma biblioteca ou sala de estar aconchegante. Luz de leitura."
  },
  {
    day: 24,
    week: 4,
    title: "Setup de atendimento online",
    goal: "Transmitir profissionalismo, privacidade e conforto.",
    format: "Bastidores do Home Office",
    roteiro: "Vídeo de close no notebook aberto, fone de ouvido de qualidade e abajur com luz quente. Texto na tela: \"Acolhimento profissional e sigilo absoluto no conforto do seu lar.\"",
    legenda: "O atendimento de terapia por vídeo segue regras rígidas de segurança digital e sigilo profissional. Tudo o que você precisa é de um ambiente privado para falar em paz.",
    prompt: "Laptop aberto em uma mesa de madeira, mostrando uma tela de chamada (borrada/abstrata), com uma planta e uma caneca ao lado. Ambiente home office tranquilo."
  },
  {
    day: 25,
    week: 4,
    title: "O que é a angústia?",
    goal: "Conceituar a angústia na psicanálise.",
    format: "Cênico / Abstrato com texto",
    roteiro: "Texto na Tela: \"Aquele aperto no peito que parece não ter motivo e não tem nome... nós chamamos de angústia. E ela tem muito a te dizer.\"",
    legenda: "A angústia surge quando o que sentimos por dentro não cabe nas palavras que conhecemos. É um sinalizador de que algo precisa mudar na nossa vida subjetiva. Vamos decifrá-la juntos?",
    prompt: "Arte abstrata representando um nó feito de cordas suaves que está começando a se desatar. Cores pastéis, simbolizando o alívio da tensão."
  },
  {
    day: 26,
    week: 4,
    title: "Se você já tentou e desistiu",
    goal: "Acolher quem teve experiências ruins em terapia.",
    format: "Talking Head acolhedora",
    roteiro: "Se você já fez terapia, sentiu que não deu certo e desistiu, não se sinta culpado. A conexão com o terapeuta e a abordagem contam muito. Permita-se tentar novamente sob outra perspectiva.",
    legenda: "Encontrar o analista certo é como construir um relacionamento de confiança: leva tempo. Se você quer dar uma nova chance ao seu cuidado mental, as portas da minha clínica estão abertas.",
    prompt: "Uma escada em caracol vista de baixo para cima, indo em direção a uma luz brilhante no topo. Arquitetura bonita e inspiradora."
  },
  {
    day: 27,
    week: 4,
    title: "Um momento de calma na rotina",
    goal: "Vídeo relaxante (trend adaptada).",
    format: "B-Roll tranquilo da natureza ou do consultório",
    roteiro: "Vídeo estético e silencioso, usando apenas um áudio instrumental sereno. Texto: \"Silencie o barulho do mundo por um instante e respire.\"",
    legenda: "A rotina nos atropela e esquecemos de respirar. Salve este post para lembrar de fazer uma pausa consciente ao longo do seu dia de hoje.",
    prompt: "Vídeo ou foto de água cristalina de um riacho correndo sobre pedras, transmitindo fluidez e limpeza emocional. Alta resolução."
  },
  {
    day: 28,
    week: 4,
    title: "Obrigada pelo mês",
    goal: "Mural de melhores momentos.",
    format: "Recapitulação",
    roteiro: "Imagens rápidas em formato polaroid ou colagens dos principais ensinamentos dos posts deste mês.",
    legenda: "Encerramos nosso ciclo de 30 dias de reflexões. Agradeço a cada um que curtiu, comentou e compartilhou. Que a saúde mental continue sendo sua prioridade.",
    prompt: "Mural de fotos estilo polaroid coladas em uma parede branca, organizadas, mostrando momentos felizes e tranquilos."
  },
  {
    day: 29,
    week: 4,
    title: "Agende sua consulta online",
    goal: "Vídeo direto focado em conversão.",
    format: "Talking Head direta",
    roteiro: "Você quer começar o seu processo de análise para lidar com luto, luto migratório ou depressão? Eu atendo online e ajudo você nesse caminho. Clique no botão da bio para agendar.",
    legenda: "Não adie mais o seu bem-estar. Agenda disponível de forma simples no site oficial. Acesse pelo link no perfil.",
    prompt: "Imagem clean de um smartphone na mão, mostrando um calendário na tela, com fundo neutro de escritório."
  },
  {
    day: 30,
    week: 4,
    title: "Mensagem de Gratidão",
    goal: "Mensagem carinhosa de encerramento do plano.",
    format: "B-Roll estético de papel escrito à mão",
    roteiro: "Corte para ela escrevendo a palavra 'Gratidão' em um papel. Foco na caligrafia. Fundo suave.",
    legenda: "Obrigada por este mês de conexões, compartilhamento e reflexões profundas. Continuo à disposição para atendimentos clínicos online na bio.",
    prompt: "A palavra 'Gratidão' escrita à mão em um papel bonito, com uma flor seca ao lado, sobre uma mesa de madeira rústica."
  }
];

export default function Painel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [editingDay, setEditingDay] = useState(null);
  
  // Estados de Geração
  const [generatingImg, setGeneratingImg] = useState({});
  const [generatingTxt, setGeneratingTxt] = useState({});
  const [generatedImgs, setGeneratedImgs] = useState({});
  const [generatedTxts, setGeneratedTxts] = useState({});
  const [isLocal, setIsLocal] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  const [listingModels, setListingModels] = useState(false);

  // Estado para adicionar novos dias
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDay, setNewDay] = useState({
    title: "",
    goal: "",
    format: "",
    roteiro: "",
    legenda: "",
    prompt: ""
  });

  // 1. Verificar Autenticação no Load
  useEffect(() => {
    // Verifica se estamos no localhost
    if (typeof window !== "undefined") {
      setIsLocal(
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      );
    }

    // Tenta carregar o token de login do Decap CMS
    const decapUser = localStorage.getItem("decap-cms-user");
    if (decapUser) {
      try {
        const parsed = JSON.parse(decapUser);
        if (parsed.token) {
          setToken(parsed.token);
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Erro ao ler decap-cms-user:", e);
      }
    }

    // Carrega a chave de API do Gemini do localStorage
    const savedApiKey = localStorage.getItem("gemini-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }

    // Carrega o plano de prompts do localStorage ou usa o padrão
    const savedPrompts = localStorage.getItem("psico-plataforma-reels");
    if (savedPrompts) {
      try {
        setPrompts(JSON.parse(savedPrompts));
      } catch (e) {
        setPrompts(defaultPromptsData);
      }
    } else {
      setPrompts(defaultPromptsData);
      localStorage.setItem("psico-plataforma-reels", JSON.stringify(defaultPromptsData));
    }
  }, []);

  // 2. Fluxo de Login via GitHub OAuth (idêntico ao Decap CMS)
  const handleGithubLogin = () => {
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    const popup = window.open(
      "/api/auth",
      "Github OAuth",
      `width=${width},height=${height},top=${top},left=${left},status=no,resizable=yes,scrollbars=yes`
    );

    const receiveMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      const data = event.data;
      if (typeof data === "string" && data.startsWith("authorization:github:success:")) {
        const jsonStr = data.replace("authorization:github:success:", "");
        try {
          const parsed = JSON.parse(jsonStr);
          if (parsed.token) {
            const userObj = {
              backendName: "github",
              token: parsed.token,
              provider: "github"
            };
            localStorage.setItem("decap-cms-user", JSON.stringify(userObj));
            setToken(parsed.token);
            setIsLoggedIn(true);
            window.removeEventListener("message", receiveMessage);
          }
        } catch (err) {
          console.error("Erro ao analisar token:", err);
        }
      }
    };

    window.addEventListener("message", receiveMessage, false);
  };

  const handleLogout = () => {
    localStorage.removeItem("decap-cms-user");
    setToken("");
    setIsLoggedIn(false);
  };

  // 3. Salvar Chave do Gemini
  const handleSaveApiKey = (val) => {
    setApiKey(val);
    localStorage.setItem("gemini-api-key", val);
  };

  // 4. Resetar Planos de Conteúdo
  const handleResetPlan = () => {
    if (confirm("Tem certeza que deseja resetar todo o plano de conteúdo para os 30 dias originais? Suas customizações serão apagadas.")) {
      setPrompts(defaultPromptsData);
      localStorage.setItem("psico-plataforma-reels", JSON.stringify(defaultPromptsData));
    }
  };

  // 5. Salvar alteração de um dia
  const handleSaveDayEdits = (dayId, updatedFields) => {
    const updated = prompts.map(item => item.day === dayId ? { ...item, ...updatedFields } : item);
    setPrompts(updated);
    localStorage.setItem("psico-plataforma-reels", JSON.stringify(updated));
    setEditingDay(null);
  };

  // 6. Adicionar Novo Dia
  const handleAddNewDay = (e) => {
    e.preventDefault();
    const nextDayNum = prompts.length > 0 ? Math.max(...prompts.map(p => p.day)) + 1 : 1;
    const added = {
      ...newDay,
      day: nextDayNum,
      week: Math.ceil(nextDayNum / 7)
    };
    const updated = [...prompts, added];
    setPrompts(updated);
    localStorage.setItem("psico-plataforma-reels", JSON.stringify(updated));
    setShowAddModal(false);
    setNewDay({
      title: "",
      goal: "",
      format: "",
      roteiro: "",
      legenda: "",
      prompt: ""
    });
  };

  // 7. Remover um dia
  const handleRemoveDay = (dayId) => {
    if (confirm(`Excluir permanentemente o Dia ${dayId}?`)) {
      const updated = prompts.filter(p => p.day !== dayId);
      setPrompts(updated);
      localStorage.setItem("psico-plataforma-reels", JSON.stringify(updated));
    }
  };

  // 8. Carregar Imagem Localmente
  const handleImageUpload = (dayId, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setGeneratedImgs(prev => ({ ...prev, [dayId]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // 9. Chamar Gemini para gerar Artigo (Markdown)
  const handleGenerateArticle = async (dayId, dayData) => {
    if (!apiKey) {
      alert("Por favor, configure sua chave de API do Gemini no topo da página primeiro!");
      return;
    }
    setGeneratingTxt(prev => ({ ...prev, [dayId]: true }));
    try {
      const systemPrompt = `Você é ${siteConfig.professional.name}, ${siteConfig.professional.title} ${siteConfig.professional.councilID ? '(' + siteConfig.professional.councilID + ')' : ''}.
Escreva um artigo completo e aprofundado para o blog do meu site baseado no tema: "${dayData.title}".
O objetivo do conteúdo é: "${dayData.goal}".
Ideia inicial (Roteiro do vídeo): "${dayData.roteiro}".

Diretrizes obrigatórias de redação:
- Tom de voz: Acolhedor, sereno, profundo, profissional e ético.
- Idioma: Português do Brasil.
- Ética: Siga estritamente as regras éticas do Conselho Federal de Psicologia (CFP). Não exponha casos clínicos reais identificáveis (use exemplos fictícios, metáforas ou conceituações amplas). Não use linguagem puramente comercial, promessas fáceis de cura rápida ou termos de autoajuda vazia. Foque em psicoeducação e acolhimento clínico.
- PROIBIÇÃO DE TERMOS FINANCEIROS (COMPLIANCE CRP): É absolutamente PROIBIDO mencionar palavras como "investimento", "valor", "preço", "dinheiro", "cifras", "promoção", "desconto", "custo", "pagamento" ou expressões do tipo "investimento em si mesmo". Não faça nenhuma alusão direta ou indireta a transações monetárias, cobrança de sessões ou custos. Foque unicamente no cuidado à saúde mental, desenvolvimento pessoal e autoconhecimento.
- Estrutura: Use títulos claros (com marcações Markdown like ## e ###), parágrafos bem espaçados, boa escaneabilidade e inclua uma conclusão reflexiva e convidativa.
- Contextualização (se fizer sentido): Lembre-se de acolher expatriados (brasileiros morando no exterior) que sofrem com distanciamento familiar ou luto migratório.
- Se falar de depressão ou ideação suicida: Adicione no rodapé do artigo de forma ética os contatos do CVV (Ligue 188 ou cvv.org.br).

Formato de saída:
Retorne APENAS o código do artigo formatado em Markdown, iniciando diretamente com o frontmatter YAML básico no topo, contendo title, date e description (exemplo abaixo):
---
title: "Título do Artigo"
date: "${new Date().toISOString().split('T')[0]}"
description: "Uma breve descrição focada em SEO para o artigo."
---

Corpo do artigo aqui...`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: systemPrompt }] }]
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(await response.text());
      const result = await response.json();
      const articleText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!articleText) throw new Error("Nenhum texto foi retornado pela API.");
      setGeneratedTxts(prev => ({ ...prev, [dayId]: articleText }));
    } catch (e) {
      console.error(e);
      alert(`Erro ao gerar rascunho de artigo: ${e.message || e}`);
    } finally {
      setGeneratingTxt(prev => ({ ...prev, [dayId]: false }));
    }
  };

  // 9b. Salvar artigo localmente via API
  const [savingArticle, setSavingArticle] = useState({});

  const handleSaveArticleLocal = async (dayId, dayData) => {
    const text = generatedTxts[dayId];
    if (!text) {
      alert("Gere ou digite o texto do artigo primeiro!");
      return;
    }

    setSavingArticle(prev => ({ ...prev, [dayId]: true }));
    try {
      const payload = {
        title: dayData.title,
        date: new Date().toISOString().split('T')[0],
        description: dayData.goal || dayData.title,
        body: text,
      };

      // Se houver uma imagem carregada
      const loadedImg = generatedImgs[dayId];
      if (loadedImg && loadedImg.startsWith("data:")) {
        payload.imageBase64 = loadedImg;
        const cleanTitle = dayData.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        payload.imageName = `capa-dia-${dayId}-${cleanTitle}.png`;
      }

      const res = await fetch("/api/salvar-artigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      alert(`Artigo salvo localmente com sucesso!\nArquivo criado: content/blog/${data.filename}`);
    } catch (e) {
      console.error(e);
      alert(`Erro ao salvar artigo: ${e.message || e}`);
    } finally {
      setSavingArticle(prev => ({ ...prev, [dayId]: false }));
    }
  };

  // Listar modelos suportados da API
  const handleListModels = async () => {
    if (!apiKey) {
      alert("Por favor, configure sua chave de API do Gemini no topo da página primeiro!");
      return;
    }
    setListingModels(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      const modelNames = data.models?.map(m => m.name.replace("models/", "")) || [];
      setAvailableModels(modelNames);
      
      const formattedList = modelNames.join("\n");
      alert(`Modelos Disponíveis na sua API Key:\n\n${formattedList}`);
    } catch (e) {
      console.error(e);
      alert(`Erro ao buscar modelos: ${e.message || e}`);
    } finally {
      setListingModels(false);
    }
  };

  // Filtrar os prompts por semanas
  const filteredPrompts = prompts.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "custom") return item.day > 30; // Customizados são aqueles criados depois do dia 30
    return item.week === parseInt(activeTab);
  });

  // TELA DE LOGIN (Caso não esteja logado no Decap CMS)
  if (!isLoggedIn) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.logo}>🍃</div>
          <h1>Painel de Conteúdo</h1>
          <p className={styles.loginSubtitle}>
            Área restrita de criação de conteúdo para a plataforma.
          </p>
          <p className={styles.loginHint}>
            Autentique-se com a sua conta do GitHub associada ao site para ter acesso.
          </p>
          <button onClick={handleGithubLogin} className={styles.loginBtn}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Entrar com GitHub (Login Único)
          </button>
          
          {isLocal && (
            <button onClick={() => setIsLoggedIn(true)} className={styles.bypassBtn}>
              Usar Modo de Teste Local (Sem GitHub)
            </button>
          )}
        </div>
      </div>
    );
  }

  // TELA DO PAINEL DE CONTROLE
  return (
    <div className={styles.dashboard}>
      
      {/* Top Header */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>🍃</span>
          <div>
            <h1>Painel de Conteúdo</h1>
            <p>{siteConfig.professional.name} | {siteConfig.professional.title}</p>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.apiKeyWrapper}>
            <label htmlFor="apiKey">Chave de API do Gemini:</label>
            <div className={styles.apiKeyInputGroup}>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => handleSaveApiKey(e.target.value)}
                placeholder="Insira sua API Key AI..."
                className={styles.apiKeyInput}
              />
              {apiKey && (
                <button
                  onClick={() => handleSaveApiKey("")}
                  className={styles.btnClearKey}
                  title="Limpar chave"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Sair
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className={styles.container}>
        
        {/* Navigation & Sidebar Actions */}
        <div className={styles.sidebar}>
          <div className={styles.tabList}>
            <button
              onClick={() => setActiveTab("all")}
              className={`${styles.tabBtn} ${activeTab === "all" ? styles.activeTab : ""}`}
            >
              Todos os Dias ({prompts.length})
            </button>
            <button
              onClick={() => setActiveTab("1")}
              className={`${styles.tabBtn} ${activeTab === "1" ? styles.activeTab : ""}`}
            >
              Semana 1: Conexão Inicial
            </button>
            <button
              onClick={() => setActiveTab("2")}
              className={`${styles.tabBtn} ${activeTab === "2" ? styles.activeTab : ""}`}
            >
              Semana 2: Sintomas
            </button>
            <button
              onClick={() => setActiveTab("3")}
              className={`${styles.tabBtn} ${activeTab === "3" ? styles.activeTab : ""}`}
            >
              Semana 3: Temas Sensíveis
            </button>
            <button
              onClick={() => setActiveTab("4")}
              className={`${styles.tabBtn} ${activeTab === "4" ? styles.activeTab : ""}`}
            >
              Semana 4: Conversão
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`${styles.tabBtn} ${activeTab === "custom" ? styles.activeTab : ""}`}
            >
              Customizados ({prompts.filter(p => p.day > 30).length})
            </button>
          </div>

          <div className={styles.sidebarActions}>
            <button onClick={() => setShowAddModal(true)} className={styles.btnAddDay}>
              + Adicionar Novo Dia
            </button>
            
            <button onClick={handleResetPlan} className={styles.btnReset}>
              Resetar para Padrão de 30 Dias
            </button>
            
            <button 
              onClick={handleListModels} 
              disabled={listingModels} 
              className={styles.btnReset}
              style={{ marginTop: '0.5rem', borderColor: 'var(--color-accent)', color: 'var(--color-primary)' }}
            >
              {listingModels ? "Buscando..." : "🔍 Listar Modelos da API"}
            </button>
          </div>
        </div>

        {/* Prompts Cards Area */}
        <main className={styles.content}>
          
          {filteredPrompts.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Nenhum post encontrado nesta categoria.</p>
              {activeTab === "custom" && (
                <button onClick={() => setShowAddModal(true)} className={styles.btnInlineAdd}>
                  Adicionar seu primeiro post customizado
                </button>
              )}
            </div>
          ) : (
            <div className={styles.cardsGrid}>
              {filteredPrompts.map((item) => {
                const isEditing = editingDay === item.day;
                
                return (
                  <div key={item.day} className={styles.card}>
                    
                    {/* Header do Card */}
                    <div className={styles.cardHeader}>
                      <div>
                        <span className={styles.dayBadge}>Dia {item.day}</span>
                        {item.week && (
                          <span className={styles.weekBadge}>Semana {item.week}</span>
                        )}
                      </div>
                      <div className={styles.cardActions}>
                        <button
                          onClick={() => setEditingDay(isEditing ? null : item.day)}
                          className={styles.editBtn}
                        >
                          {isEditing ? "Cancelar" : "Editar"}
                        </button>
                        <button
                          onClick={() => handleRemoveDay(item.day)}
                          className={styles.deleteBtn}
                          title="Excluir dia"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Conteúdo do Card (Modo Editável / Visualização) */}
                    <div className={styles.cardBody}>
                      {isEditing ? (
                        <div className={styles.editForm}>
                          <div className={styles.formGroup}>
                            <label>Título do Post:</label>
                            <input
                              type="text"
                              defaultValue={item.title}
                              id={`edit-title-${item.day}`}
                              className={styles.textInput}
                            />
                          </div>
                          
                          <div className={styles.formGroup}>
                            <label>Objetivo do Conteúdo:</label>
                            <input
                              type="text"
                              defaultValue={item.goal}
                              id={`edit-goal-${item.day}`}
                              className={styles.textInput}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label>Formato Recomendado:</label>
                            <input
                              type="text"
                              defaultValue={item.format}
                              id={`edit-format-${item.day}`}
                              className={styles.textInput}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label>Roteiro do Vídeo (Script):</label>
                            <textarea
                              defaultValue={item.roteiro}
                              id={`edit-roteiro-${item.day}`}
                              className={styles.textareaInput}
                              rows={3}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label>Legenda Sugerida:</label>
                            <textarea
                              defaultValue={item.legenda}
                              id={`edit-legenda-${item.day}`}
                              className={styles.textareaInput}
                              rows={3}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label>Prompt para Gerador de Capa:</label>
                            <textarea
                              defaultValue={item.prompt}
                              id={`edit-prompt-${item.day}`}
                              className={styles.textareaInput}
                              rows={2}
                            />
                          </div>

                          <button
                            onClick={() => {
                              const t = document.getElementById(`edit-title-${item.day}`).value;
                              const g = document.getElementById(`edit-goal-${item.day}`).value;
                              const f = document.getElementById(`edit-format-${item.day}`).value;
                              const r = document.getElementById(`edit-roteiro-${item.day}`).value;
                              const l = document.getElementById(`edit-legenda-${item.day}`).value;
                              const p = document.getElementById(`edit-prompt-${item.day}`).value;
                              handleSaveDayEdits(item.day, {
                                title: t,
                                goal: g,
                                format: f,
                                roteiro: r,
                                legenda: l,
                                prompt: p
                              });
                            }}
                            className={styles.saveBtn}
                          >
                            Salvar Alterações
                          </button>
                        </div>
                      ) : (
                        <div className={styles.viewContent}>
                          <h3 className={styles.cardTitle}>{item.title}</h3>
                          
                          <div className={styles.infoMeta}>
                            <p><strong>Objetivo:</strong> {item.goal}</p>
                            <p><strong>Formato:</strong> {item.format}</p>
                          </div>

                          <div className={styles.scriptBox}>
                            <h4>Roteiro do Vídeo:</h4>
                            <p>{item.roteiro}</p>
                          </div>

                          <div className={styles.captionBox}>
                            <h4>Legenda:</h4>
                            <p>{item.legenda}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Divisor de Ações IA */}
                    <div className={styles.iaTools}>
                      
                      {/* Aba Gerador de Capas */}
                      <div className={styles.iaToolSection}>
                        <h4>Capa para o Reel:</h4>
                        
                        {!isEditing && (
                          <div className={styles.imgGeneratorWrapper}>
                            <textarea
                              id={`prompt-field-${item.day}`}
                              defaultValue={item.prompt}
                              className={styles.promptInputText}
                              rows={2}
                              placeholder="Prompt da imagem..."
                            />
                            
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button
                                onClick={() => {
                                  const pt = document.getElementById(`prompt-field-${item.day}`).value;
                                  navigator.clipboard.writeText(pt);
                                  alert("Prompt de imagem copiado! Cole no site do Gemini (gemini.google.com) para gerar.");
                                }}
                                className={styles.iaBtn}
                                style={{ flex: 1 }}
                              >
                                📋 Copiar Prompt
                              </button>

                              <label
                                htmlFor={`upload-image-${item.day}`}
                                className={styles.iaBtn}
                                style={{ 
                                  flex: 1, 
                                  cursor: "pointer", 
                                  textAlign: "center",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: "var(--color-primary)",
                                  color: "#ffffff"
                                }}
                              >
                                📤 Carregar Imagem
                              </label>
                              <input
                                type="file"
                                id={`upload-image-${item.day}`}
                                accept="image/*"
                                onChange={(e) => handleImageUpload(item.day, e.target.files?.[0])}
                                style={{ display: "none" }}
                              />
                            </div>

                            {/* Área do resultado da Imagem */}
                            <div className={styles.imageResultBox}>
                              {generatedImgs[item.day] ? (
                                <div className={styles.imageContainer}>
                                  <img src={generatedImgs[item.day]} alt={`Capa Dia ${item.day}`} />
                                  <button
                                    onClick={() => setGeneratedImgs(prev => {
                                      const next = { ...prev };
                                      delete next[item.day];
                                      return next;
                                    })}
                                    className={styles.downloadBtn}
                                    style={{ background: "rgba(217, 83, 79, 0.9)", color: "#ffffff", borderColor: "#d9534f" }}
                                  >
                                    Remover Imagem
                                  </button>
                                </div>
                              ) : (
                                <span className={styles.placeholderText}>Nenhuma imagem carregada</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Aba Gerador de Artigos do Blog */}
                      <div className={styles.iaToolSection}>
                        <h4>Artigo Completo para o Blog:</h4>
                        
                        {!isEditing && (
                          <div className={styles.txtGeneratorWrapper}>
                            <button
                              onClick={() => handleGenerateArticle(item.day, item)}
                              disabled={generatingTxt[item.day]}
                              className={`${styles.iaBtn} ${styles.iaBtnText}`}
                            >
                              {generatingTxt[item.day] ? "Escrevendo..." : "Gerar Rascunho de Artigo (Markdown)"}
                            </button>

                            {/* Área do resultado do Artigo */}
                            <div className={styles.textResultBox}>
                              {generatingTxt[item.day] && (
                                <div className={styles.loadingSpinner}>
                                  <div className={styles.spinner}></div>
                                  <span>Redigindo texto ético...</span>
                                </div>
                              )}

                              {!generatingTxt[item.day] && generatedTxts[item.day] && (
                                <div className={styles.textContainer}>
                                  <textarea
                                    value={generatedTxts[item.day]}
                                    onChange={(e) => setGeneratedTxts(prev => ({ ...prev, [item.day]: e.target.value }))}
                                    className={styles.articleOutput}
                                    style={{ paddingBottom: "3.5rem" }}
                                  />
                                  <div style={{ display: "flex", gap: "0.5rem", position: "absolute", bottom: "0.5rem", left: "0.5rem", right: "0.5rem" }}>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(generatedTxts[item.day]);
                                        alert("Artigo em Markdown copiado para a Área de Transferência!");
                                      }}
                                      className={styles.copyBtn}
                                      style={{ position: "static", transform: "none", flex: 1, textAlign: "center" }}
                                    >
                                      📋 Copiar Artigo
                                    </button>
                                    <button
                                      onClick={() => handleSaveArticleLocal(item.day, item)}
                                      disabled={savingArticle[item.day]}
                                      className={styles.copyBtn}
                                      style={{ 
                                        position: "static", 
                                        transform: "none", 
                                        flex: 1, 
                                        textAlign: "center",
                                        backgroundColor: "var(--color-primary)",
                                        color: "#ffffff",
                                        borderColor: "var(--color-primary)"
                                      }}
                                    >
                                      {savingArticle[item.day] ? "Salvando..." : "💾 Salvar no Blog"}
                                    </button>
                                  </div>
                                </div>
                              )}

                              {!generatingTxt[item.day] && !generatedTxts[item.day] && (
                                <span className={styles.placeholderText}>O rascunho do artigo aparecerá aqui</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Modal para Adicionar Novo Post */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Novo Conteúdo / Post customizado</h2>
              <button onClick={() => setShowAddModal(false)} className={styles.modalCloseX}>✕</button>
            </div>
            
            <form onSubmit={handleAddNewDay} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Título:</label>
                <input
                  type="text"
                  required
                  value={newDay.title}
                  onChange={(e) => setNewDay(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Superando a autossuficiência extrema"
                  className={styles.textInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Objetivo do Conteúdo:</label>
                <input
                  type="text"
                  value={newDay.goal}
                  onChange={(e) => setNewDay(prev => ({ ...prev, goal: e.target.value }))}
                  placeholder="Ex: Incentivar a busca por ajuda na terapia"
                  className={styles.textInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Formato:</label>
                <input
                  type="text"
                  value={newDay.format}
                  onChange={(e) => setNewDay(prev => ({ ...prev, format: e.target.value }))}
                  placeholder="Ex: Talking Head ou B-Roll"
                  className={styles.textInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Roteiro / Ideia de Vídeo:</label>
                <textarea
                  required
                  value={newDay.roteiro}
                  onChange={(e) => setNewDay(prev => ({ ...prev, roteiro: e.target.value }))}
                  placeholder="Escreva as falas ou a descrição das cenas..."
                  className={styles.textareaInput}
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Legenda Completa:</label>
                <textarea
                  value={newDay.legenda}
                  onChange={(e) => setNewDay(prev => ({ ...prev, legenda: e.target.value }))}
                  placeholder="Escreva a legenda que irá no Instagram..."
                  className={styles.textareaInput}
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Prompt para Gerar Imagem de Capa:</label>
                <textarea
                  value={newDay.prompt}
                  onChange={(e) => setNewDay(prev => ({ ...prev, prompt: e.target.value }))}
                  placeholder="Prompt descritivo da imagem que represente este tema..."
                  className={styles.textareaInput}
                  rows={2}
                />
              </div>

              <div className={styles.modalButtons}>
                <button type="button" onClick={() => setShowAddModal(false)} className={styles.modalCancelBtn}>
                  Cancelar
                </button>
                <button type="submit" className={styles.modalSubmitBtn}>
                  Adicionar ao Calendário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
