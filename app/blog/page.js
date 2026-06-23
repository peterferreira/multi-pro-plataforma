import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';
import styles from './blog.module.css';

export const metadata = {
  title: 'Blog',
  description: 'Artigos sobre psicologia, imigração, luto, depressão e burnout no exterior.',
};

export default function BlogIndex() {
  const allPostsData = getSortedPostsData();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'var(--font-inter)' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '3rem', marginBottom: '1rem', color: '#111' }}>
          Diário de Bordo
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Reflexões psicanalíticas e orientações práticas para brasileiros vivendo os desafios da expatriação, do luto e da adaptação.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {allPostsData.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Nenhum artigo publicado ainda. Volte em breve!</p>
        ) : (
          allPostsData.map(({ slug, date, title, description }) => (
            <Link href={`/blog/${slug}`} key={slug} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className={styles.postCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <small style={{ color: '#888', fontWeight: '500', fontSize: '0.85rem' }}>{date}</small>
                  <span style={{ color: '#2b6cb0', fontSize: '0.85rem', fontWeight: '500' }}>Ler artigo &rarr;</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '0.5rem', color: '#222' }}>
                  {title}
                </h2>
                <p style={{ color: '#555', lineHeight: '1.5', margin: 0 }}>
                  {description}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
      
      <div style={{ marginTop: '4rem', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#2b6cb0', textDecoration: 'underline' }}>
          &larr; Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
