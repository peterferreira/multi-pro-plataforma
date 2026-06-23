# Multi-Pro-Plataforma

O **Multi-Pro-Plataforma** é um projeto "esqueleto" (template) em Next.js projetado para acelerar a criação de sites institucionais inteligentes para profissionais liberais que dependem de agendamento de consultas ou reuniões. 

Ele é ideal para: Psicólogos, Médicos, Dentistas, Advogados, Consultores, Professores Particulares, etc.

Ele vem integrado com:
- Integração de agendamentos visuais (ex: Cal.com / Calendly)
- Um **Assistente Virtual de Inteligência Artificial** focado no nicho do profissional para tirar dúvidas e direcionar ao agendamento.
- Painel de geração de conteúdo focado em redes sociais e blog.

---

## 🛠 Como usar e configurar um novo cliente?

A grande vantagem deste esqueleto é que **praticamente todo o conteúdo do site e a personalidade da Inteligência Artificial são controlados por um único arquivo.** 

### 1. Configure as Variáveis do Cliente (`config/site.js`)

Abra o arquivo `config/site.js` e preencha com as informações do seu cliente. 
Este arquivo atua como a *Single Source of Truth* (Fonte Única da Verdade) do projeto.

Dentro dele você configurará:
- **Dados Profissionais**: Nome, Título, E-mail, WhatsApp, ID de Conselho (Ex: CRP, CRM, OAB - que é opcional).
- **SEO**: Título do site e descrições para o Google.
- **Cal.com / Agendamento**: O link ou ID do calendário para injetar na página principal.
- **Inteligência Artificial (Persona)**: A configuração da IA leal ao seu cliente. O resumo do que o profissional faz (`systemInstruction`) que está neste arquivo é lido diretamente pela API quando um visitante abre o chat do site.
- **Interface e FAQs**: Textos da página inicial, botões e perguntas frequentes.

### 2. Configure a Chave de Inteligência Artificial (Variáveis de Ambiente)

O Chatbot integrado e o gerador de conteúdo utilizam a API da Inteligência Artificial. Para o site funcionar plenamente na máquina local ou em produção (Vercel), o próprio dono do site ou desenvolvedor precisa gerar uma chave no Google AI Studio.

1. Crie um arquivo chamado `.env.local` na raiz do projeto copiando a base existente:
   ```bash
   cp .env.example .env.local
   ```
2. Adicione a sua chave de API gerada no Google AI Studio:
   ```env
   GEMINI_API_KEY="AIzaSySuaChaveGeradaAqui..."
   ```

> **Nota:** Não é necessário ter o assistente *Antigravity* ou nada instalado no ambiente de produção do profissional. O próprio código do Next.js lê o resumo do profissional no `config/site.js` e se comunica com a API via chave!

### 3. Substitua as Imagens

As imagens padrão do site encontram-se na pasta `/public`.
Substitua a foto do herói da página principal (`/public/hero_placeholder.jpg`) e o ícone do site (`/public/favicon.ico`) com a identidade visual do profissional atual.

---

## 💻 Rodando o Projeto Localmente

Após preencher o `config/site.js`, o `.env.local` e trocar as imagens, basta instalar as dependências e rodar o projeto:

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado do clone já completamente adaptado ao novo profissional.
