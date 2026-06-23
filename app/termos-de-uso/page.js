import { siteConfig } from '../../config/site';

export const metadata = {
  title: 'Termos de Uso',
  description: `Termos e Condições de Uso dos serviços de ${siteConfig.professional.name}`,
};

export default function TermosDeUso() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'var(--font-inter)' }}>
      <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', marginBottom: '2rem', color: '#111' }}>Termos e Condições de Uso</h1>
      
      <div style={{ lineHeight: '1.6', color: '#444' }}>
        <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
        
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar e utilizar este site e os serviços oferecidos por <strong>{siteConfig.professional.name}</strong>, 
          você concorda com estes Termos de Uso. Caso não concorde com qualquer parte destes termos, recomendamos que não utilize os serviços.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>2. Natureza dos Serviços</h2>
        <p>
          Os serviços oferecidos consistem em atendimentos especializados. É importante ressaltar que:
        </p>
        <ul>
          <li>O atendimento segue as regulamentações do conselho de classe responsável.</li>
          <li><strong>O atendimento online pode não ser recomendado para casos de emergência ou crise aguda.</strong> Em situações de risco, procure imediatamente um hospital ou serviço de emergência.</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>3. Agendamentos e Cancelamentos</h2>
        <p>
          As sessões devem ser agendadas previamente. Em caso de necessidade de cancelamento ou reagendamento, 
          solicitamos que seja feito com antecedência mínima. Cancelamentos de última hora podem 
          estar sujeitos a cobrança.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>4. Tecnologia e Conexão</h2>
        <p>
          Para a realização das sessões online, o cliente/paciente é responsável por garantir acesso a um dispositivo 
          com câmera e microfone funcionais, além de uma conexão de internet estável e 
          um ambiente privativo.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>5. Direitos Autorais e Propriedade Intelectual</h2>
        <p>
          Todo o conteúdo presente neste site (textos, logotipos, imagens) é de propriedade exclusiva de {siteConfig.professional.name} 
          e não pode ser reproduzido, copiado ou distribuído sem autorização prévia por escrito. É <strong>expressamente proibido</strong> gravar (áudio ou vídeo) as sessões sem consentimento mútuo.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>6. Alterações nos Termos</h2>
        <p>
          Reservamo-nos o direito de atualizar ou modificar estes Termos de Uso a qualquer momento. 
          Recomendamos que você revise esta página periodicamente.
        </p>
        
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>7. Contato</h2>
        <p>
          Para dúvidas ou mais informações sobre estes Termos de Uso, entre em contato através do e-mail:<br />
          <strong><a href={`mailto:${siteConfig.professional.email}`} style={{ color: '#2b6cb0' }}>{siteConfig.professional.email}</a></strong>
        </p>
      </div>
    </div>
  );
}
