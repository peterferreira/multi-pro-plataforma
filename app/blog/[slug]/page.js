import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostData, getAllPostSlugs } from '../../../lib/posts';
import { siteConfig } from '../../../config/site';
import styles from './post.module.css';

// Generating static params for static site generation (SSG)
export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const postData = getPostData(slug);
  
  if (!postData) {
    return {
      title: 'Artigo não encontrado',
    };
  }

  return {
    title: `${postData.title} | ${siteConfig.professional.name}`,
    description: postData.excerpt || `Leia sobre ${postData.title} no blog.`,
    openGraph: {
      title: postData.title,
      description: postData.description,
      type: 'article',
      publishedTime: postData.date,
    }
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const postData = getPostData(slug);

  if (!postData) {
    notFound();
  }

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'var(--font-inter)' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <Link href="/blog" style={{ color: '#2b6cb0', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', display: 'inline-block', marginBottom: '2rem' }}>
          &larr; Voltar para o Blog
        </Link>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', marginBottom: '1rem', color: '#111', lineHeight: '1.2' }}>
          {postData.title}
        </h1>
        <div style={{ color: '#888', fontSize: '0.9rem' }}>
          Publicado em {postData.date}
        </div>
      </div>

      <div className={styles.markdownBody}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {postData.content}
        </ReactMarkdown>
      </div>

      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #eaeaea', textAlign: 'center' }}>
        <p style={{ color: '#555', marginBottom: '1rem' }}>Precisa conversar sobre isso? Agende uma sessão de acolhimento.</p>
        <Link href="/#agendar" style={{ 
          display: 'inline-block',
          background: '#3d5242', 
          color: 'white', 
          padding: '0.8rem 1.5rem', 
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: '500'
        }}>
          Agendar Consulta
        </Link>
      </div>
    </article>
  );
}
