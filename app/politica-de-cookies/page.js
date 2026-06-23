export const metadata = {
  title: 'Política de Cookies',
  description: 'Como utilizamos cookies em nosso site',
};

export default function PoliticaCookies() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'var(--font-inter)' }}>
      <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', marginBottom: '2rem', color: '#111' }}>Política de Cookies</h1>
      
      <div style={{ lineHeight: '1.6', color: '#444' }}>
        <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
        
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>1. O que são cookies?</h2>
        <p>
          Cookies são pequenos arquivos de texto armazenados no seu navegador ou dispositivo quando você visita um site. 
          Eles ajudam a plataforma a "lembrar" de suas ações e preferências durante um certo período, evitando que você 
          tenha que reconfigurá-las toda vez que retornar ao site.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>2. Como usamos os cookies?</h2>
        <p>Utilizamos cookies para diferentes propósitos em nosso site:</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: '#333' }}>Cookies Estritamente Necessários</h3>
        <p>
          São essenciais para o funcionamento do site. Sem eles, recursos básicos como segurança e carregamento de páginas 
          não funcionariam corretamente. Por serem indispensáveis, eles não podem ser desativados em nosso sistema.
          <em>(Exemplo: O cookie que salva a sua preferência de rejeitar outros cookies).</em>
        </p>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: '#333' }}>Cookies de Desempenho e Análise (Ex: Google Analytics)</h3>
        <p>
          Nos ajudam a entender como os visitantes interagem com o site, coletando dados de forma <strong>anônima</strong>. 
          Eles informam quais páginas são mais acessadas e se há erros de carregamento, permitindo que melhoremos a 
          experiência de navegação. <strong>Estes cookies só são ativados com o seu consentimento.</strong>
        </p>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: '#333' }}>Cookies de Marketing</h3>
        <p>
          São utilizados para rastrear visitantes através de sites, com o objetivo de exibir anúncios relevantes. 
          <strong>Estes cookies só são ativados com o seu consentimento.</strong>
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>3. Como gerenciar seus cookies</h2>
        <p>
          Em nosso site, você tem controle total. Você pode alterar suas preferências a qualquer momento clicando no 
          ícone de "escudo" (Preferências de Privacidade) localizado no canto inferior direito da tela.
        </p>
        <p>
          Além disso, a maioria dos navegadores permite que você bloqueie ou exclua cookies através de suas configurações:
        </p>
        <ul>
          <li><strong>Google Chrome:</strong> Configurações &gt; Privacidade e segurança &gt; Cookies.</li>
          <li><strong>Mozilla Firefox:</strong> Opções &gt; Privacidade e Segurança &gt; Cookies e dados do site.</li>
          <li><strong>Safari:</strong> Preferências &gt; Privacidade &gt; Bloquear todos os cookies.</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>4. Dúvidas</h2>
        <p>
          Para mais informações sobre como tratamos seus dados pessoais, consulte nossa <a href="/politica-de-privacidade" style={{ color: '#2b6cb0', textDecoration: 'underline' }}>Política de Privacidade</a> ou 
          entre em contato conosco pelo e-mail <strong>admin@anapaulafaulhaber.com.br</strong>.
        </p>
      </div>
    </div>
  );
}
