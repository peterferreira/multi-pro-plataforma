// config/site.js

export const siteConfig = {
  // Informações do Profissional
  professional: {
    name: "Nome do Profissional",
    title: "Profissão & Especialidade", // Ex: "Psicóloga & Psicanalista", "Advogado Trabalhista"
    councilID: "", // Ex: "CRP 04/57993" ou "OAB/SP 123456" (Pode ficar vazio)
    shortDescription: "Acolhimento e escuta profunda para suas questões, onde quer que você esteja.",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@exemplo.com.br",
    whatsapp: "5511999999999", // Número para o botão "Falar com Humano"
    instagram: "https://www.instagram.com/seu.perfil/",
  },

  // SEO e Meta Tags
  seo: {
    title: "Nome do Profissional | Profissão e Especialidade",
    description: "Descrição curta para aparecer no Google sobre o profissional e suas especialidades.",
    keywords: "especialidade 1, especialidade 2, profissao, cidade",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.seusite.com.br",
  },

  // Configurações da IA (Gemini)
  aiAssistant: {
    role: "Você é a assistente virtual da clínica/escritório do(a) [Nome do Profissional].",
    persona: "Você é acolhedora, empática, ética e profissional.",
    guidelines: `Seu papel é responder dúvidas comuns de potenciais clientes/pacientes sobre:
- Modalidade de atendimento (ex: sessões de 50 minutos online).
- Atendimento por WhatsApp e Google Meet. Para situações diferentes do padrão, use exatamente a frase: "Situações diferentes da padrão, devem ser tratadas diretamente com o(a) [Nome]." e ofereça a opção de falar com um humano.
- Especialidade 1: [Descrição breve]
- Especialidade 2: [Descrição breve]

Regras muito importantes:
1. Você NÃO realiza os serviços do profissional. Você é apenas uma assistente para informações e agendamento.
2. Você NÃO faz diagnósticos ou consultorias aprofundadas.
3. Se você não souber a resposta, sugira preencher o contato para falar diretamente com o profissional.
4. Mantenha as respostas curtas, diretas e fáceis de ler (use parágrafos curtos).
5. Você trata APENAS de assuntos pertinentes ao atendimento do local. Se o usuário perguntar sobre qualquer outro assunto fora desse contexto, responda educadamente que você foi projetada para ajudar apenas com dúvidas sobre os atendimentos e sugira que ele use o botão "Falar com Humano".`,
    fallbackMessage: "Desculpe, no momento estou com uma instabilidade. Se precisar de ajuda, por favor, clique no botão 'Falar com Humano' para conversar diretamente com nossa equipe."
  },

  // Hero Section
  hero: {
    kicker: "Slogan ou Frase de Impacto",
    title: "Título Principal Forte e Direto",
    description: "Um parágrafo explicando como você pode ajudar o seu cliente a resolver um problema ou alcançar um objetivo.",
    primaryButton: {
      text: "Agendar Consulta",
      calLinkEnv: "NEXT_PUBLIC_BOOKING_URL_PRIMARY", // Chave da variável de ambiente com o link (ex: "seu-usuario/consulta")
    },
    secondaryButton: {
      text: "Outro Agendamento (Opcional)",
      calLinkEnv: "NEXT_PUBLIC_BOOKING_URL_SECONDARY", // Se existir a variável, o botão aparece
    }
  },

  // Especialidades / Serviços
  services: {
    kicker: "Como Posso Ajudar",
    title: "Especialidades Clínicas",
    items: [
      {
        icon: "🍃",
        title: "Especialidade 1",
        description: "Descrição detalhada do serviço ou especialidade oferecida ao cliente."
      },
      {
        icon: "⏳",
        title: "Especialidade 2",
        description: "Descrição detalhada do serviço ou especialidade oferecida ao cliente."
      },
      {
        icon: "💭",
        title: "Especialidade 3",
        description: "Descrição detalhada do serviço ou especialidade oferecida ao cliente."
      },
      {
        icon: "🌍",
        title: "Especialidade 4",
        description: "Descrição detalhada do serviço ou especialidade oferecida ao cliente."
      }
    ]
  },

  // Destaque (Seção Secundária)
  highlight: {
    quote: "\"Uma frase inspiradora ou depoimento que reforce a autoridade e empatia do profissional.\"",
    title: "Uma conexão direta com o cliente.",
    text: "Um texto explicativo sobre os desafios que o cliente enfrenta e como o seu método ou abordagem é o diferencial ideal.",
    bullets: [
      "Benefício prático ou facilidade 1 (ex: Sessões online flexíveis)",
      "Benefício prático ou facilidade 2 (ex: Atendimento via Google Meet)",
      "Benefício prático ou facilidade 3 (ex: Foco total na sua necessidade)"
    ]
  },

  // FAQ
  faq: {
    kicker: "Dúvidas Frequentes",
    title: "Perguntas Comuns",
    questions: [
      {
        q: "Como funcionam os atendimentos?",
        a: "Os atendimentos têm duração média de 50 minutos e ocorrem por meio de videochamadas seguras. Você só precisa de uma conexão estável à internet."
      },
      {
        q: "O atendimento funciona para pessoas em outros países?",
        a: "Sim, o atendimento online permite flexibilidade geográfica. Nossa agenda se ajusta ao seu fuso horário local automaticamente."
      },
      {
        q: "Como é feita a confirmação do agendamento?",
        a: "Após escolher o horário na agenda, você deve enviar o comprovante de pagamento para o nosso WhatsApp. O link da videochamada será enviado em seguida."
      }
    ]
  }
};
