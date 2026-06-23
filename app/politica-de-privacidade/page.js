import { siteConfig } from '../../config/site';

export const metadata = {
  title: 'Política de Privacidade',
  description: `Política de Privacidade e Proteção de Dados de ${siteConfig.professional.name}`,
};

export default function PoliticaPrivacidade() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'var(--font-inter)' }}>
      <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', marginBottom: '2rem', color: '#111' }}>Política de Privacidade</h1>
      
      <div style={{ lineHeight: '1.6', color: '#444' }}>
        <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
        
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>1. Introdução</h2>
        <p>
          A privacidade e a segurança dos seus dados pessoais são fundamentais para <strong>{siteConfig.professional.name}</strong>. 
          Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações 
          quando você visita nosso site ou utiliza nossos serviços, em conformidade 
          com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>2. Dados Coletados</h2>
        <p>Coletamos diferentes tipos de informações para oferecer e aprimorar nossos serviços:</p>
        <ul>
          <li><strong>Dados de Contato:</strong> Nome, e-mail, telefone, quando você preenche formulários de agendamento.</li>
          <li><strong>Dados Sensíveis:</strong> Informações compartilhadas durante os atendimentos. Estes dados são protegidos por rigoroso sigilo profissional.</li>
          <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas e tempo de permanência, coletados através de cookies (mediante seu consentimento no nosso Gestor de Cookies).</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>3. Finalidade do Tratamento</h2>
        <p>Utilizamos seus dados para:</p>
        <ul>
          <li>Agendar e realizar atendimentos.</li>
          <li>Comunicação sobre agendamentos, pagamentos e links de acesso.</li>
          <li>Cumprimento de obrigações legais e regulatórias.</li>
          <li>Melhoria contínua do nosso site e serviços através da análise de tráfego (dados anonimizados).</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>4. Compartilhamento de Dados</h2>
        <p>
          As informações fornecidas durante os atendimentos <strong>não são compartilhadas</strong> com terceiros, 
          exceto em casos previstos em lei. Dados de navegação e agendamento podem 
          ser processados por plataformas parceiras (ex: sistemas de videoconferência, gateways de pagamento) que também 
          estão adequadas à LGPD.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>5. Seus Direitos (Titular dos Dados)</h2>
        <p>Você tem o direito de:</p>
        <ul>
          <li>Confirmar a existência de tratamento de seus dados.</li>
          <li>Acessar, corrigir ou atualizar seus dados.</li>
          <li>Solicitar a eliminação dos seus dados pessoais (quando não conflitarem com exigências legais).</li>
          <li>Revogar consentimento para uso de cookies ou envio de comunicações.</li>
        </ul>
        
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>6. Contato (DPO / Encarregado de Dados)</h2>
        <p>
          Para exercer seus direitos ou tirar dúvidas sobre esta Política de Privacidade, entre em contato através do e-mail:<br />
          <strong><a href={`mailto:${siteConfig.professional.email}`} style={{ color: '#2b6cb0' }}>{siteConfig.professional.email}</a></strong>
        </p>
      </div>
    </div>
  );
}
