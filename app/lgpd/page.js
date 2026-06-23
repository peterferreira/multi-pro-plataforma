import Link from 'next/link';

export const metadata = {
  title: 'Portal de Privacidade (LGPD)',
  description: 'Exerça seus direitos sob a Lei Geral de Proteção de Dados (LGPD).',
};

export default function LGPDPortal() {
  const adminEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "admin@anapaulafaulhaber.com.br";
  
  // Pre-filled email for deletion request
  const mailToLink = `mailto:${adminEmail}?subject=LGPD%20-%20Solicita%C3%A7%C3%A3o%20de%20Exclus%C3%A3o%20de%20Dados&body=Ol%C3%A1%2C%0A%0AGostaria%20de%20solicitar%20a%20exclus%C3%A3o%20de%20todos%20os%20meus%20dados%20pessoais%20(incluindo%20registros%20de%20agendamento%20no%20Cal.com%20se%20houver)%20associados%20ao%20meu%20e-mail%20e%20nome.%0A%0AMeu%20Nome%3A%20%5BSeu%20Nome%5D%0AMeu%20E-mail%3A%20%5BSeu%20E-mail%5D%0A%0AAguardo%20confirma%C3%A7%C3%A3o.%0A%0AObrigado.`;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'var(--font-inter)' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', marginBottom: '1rem', color: '#111' }}>
          Portal de Privacidade e LGPD
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Transparência e controle total sobre os seus dados pessoais.
        </p>
      </div>
      
      <div style={{ lineHeight: '1.6', color: '#444' }}>
        <p>
          Em conformidade com a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong>, 
          garantimos a você o total controle sobre as informações que coletamos. 
          Como utilizamos serviços terceirizados seguros (como o Cal.com para agendamentos), os dados que processamos 
          limitam-se estritamente ao necessário para a marcação das suas consultas (Nome, E-mail e Telefone).
        </p>
        
        <h2 style={{ marginTop: '3rem', marginBottom: '1rem', color: '#222' }}>Seus Direitos</h2>
        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
          
          <div style={{ padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '8px', backgroundColor: '#fafafa' }}>
            <h3 style={{ color: '#111', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🗑️ Direito à Exclusão (Esquecimento)
            </h3>
            <p style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
              Você tem o direito de solicitar a exclusão de qualquer dado pessoal seu que esteja em nossa base, 
              incluindo o histórico de agendamentos no sistema do Cal.com.
            </p>
            <a 
              href={mailToLink}
              style={{
                display: 'inline-block',
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.9rem'
              }}
            >
              Solicitar Exclusão de Dados
            </a>
          </div>

          <div style={{ padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '8px', backgroundColor: '#fafafa' }}>
            <h3 style={{ color: '#111', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              👁️ Direito de Acesso e Retificação
            </h3>
            <p style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
              Você pode solicitar uma cópia de todos os dados que temos sobre você, ou pedir a correção de dados incompletos ou inexatos.
            </p>
            <a 
              href={`mailto:${adminEmail}?subject=LGPD%20-%20Solicita%C3%A7%C3%A3o%20de%20Acesso/Retifica%C3%A7%C3%A3o`}
              style={{
                display: 'inline-block',
                backgroundColor: '#3d5242',
                color: 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.9rem'
              }}
            >
              Solicitar Acesso/Retificação
            </a>
          </div>

        </div>

        <h2 style={{ marginTop: '3rem', marginBottom: '1rem', color: '#222' }}>Documentos Legais</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link href="/politica-de-privacidade" style={{ color: '#2b6cb0', textDecoration: 'underline' }}>
              Ler Política de Privacidade Completa
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link href="/termos-de-uso" style={{ color: '#2b6cb0', textDecoration: 'underline' }}>
              Ler Termos de Uso
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link href="/politica-de-cookies" style={{ color: '#2b6cb0', textDecoration: 'underline' }}>
              Ler Política de Cookies
            </Link>
          </li>
        </ul>

      </div>
      
      <div style={{ marginTop: '4rem', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#2b6cb0', textDecoration: 'none', fontWeight: '500' }}>
          &larr; Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
