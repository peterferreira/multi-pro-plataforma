"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCalApi } from "@calcom/embed-react";
import styles from "./page.module.css";
import { siteConfig } from "../config/site";

// Configurações lidas das variáveis de ambiente (.env.local)
const BOOKING_URL_PRIMARY = process.env.NEXT_PUBLIC_BOOKING_URL_PRIMARY || "seu-usuario/consulta-primaria";
const BOOKING_URL_SECONDARY = process.env.NEXT_PUBLIC_BOOKING_URL_SECONDARY || "";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@exemplo.com.br";

// Extrai apenas o namespace do link caso venha a URL completa (necessário para o modal)
const calLinkPrimary = BOOKING_URL_PRIMARY.replace("https://cal.com/", "");
const calLinkSecondary = BOOKING_URL_SECONDARY.replace("https://cal.com/", "");

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        styles: { branding: { brandColor: "#3d5242" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
      
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          // No esqueleto base, redirecionamos para uma página de sucesso genérica
          // ou podemos manter a lógica baseada na string.
          const eventData = JSON.stringify(e).toLowerCase();
          if (eventData.includes("exterior") || eventData.includes("secundaria")) {
            router.push("/sucesso-exterior"); // Pode ser alterado no projeto filho
          } else {
            router.push("/sucesso-brasil");
          }
        }
      });
    })();
  }, [router]);

  return (
    <div className={styles.container}>
      
      {/* Header */}
      <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className={styles.brand}>
          <span className={styles.brandName}>{siteConfig.professional.name}</span>
          <span className={styles.brandSubtitle}>
            {siteConfig.professional.title} 
            {siteConfig.professional.councilID ? ` | ${siteConfig.professional.councilID}` : ""}
          </span>
        </div>
        <nav>
          <a href="/blog" className={`${styles.btn} ${styles.btnSecondary}`} style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
            Ver Artigos
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.kicker}>{siteConfig.hero.kicker}</span>
          <h1 className={styles.title}>{siteConfig.hero.title}</h1>
          <p className={styles.description}>{siteConfig.hero.description}</p>
          <div id="agendar" className={styles.ctas}>
            <button 
              data-cal-link={calLinkPrimary}
              data-cal-config='{"layout":"month_view"}'
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              {siteConfig.hero.primaryButton.text}
            </button>
            {calLinkSecondary && (
              <button 
                data-cal-link={calLinkSecondary}
                data-cal-config='{"layout":"month_view"}'
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                {siteConfig.hero.secondaryButton.text}
              </button>
            )}
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src="/hero_placeholder.jpg"
              alt={`Atendimento com ${siteConfig.professional.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className={styles.specialties}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionKicker}>{siteConfig.services.kicker}</span>
          <h2 className={styles.sectionTitle}>{siteConfig.services.title}</h2>
        </div>
        
        <div className={styles.specialtiesGrid}>
          {siteConfig.services.items.map((service, index) => (
            <div key={index} className={styles.specialtyCard}>
              <span className={styles.cardIcon}>{service.icon}</span>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlight Section */}
      <section className={styles.expatriates}>
        <div className={styles.expatQuote}>
          {siteConfig.highlight.quote}
        </div>
        
        <div className={styles.expatContent}>
          <h2 className={styles.expatTitle}>{siteConfig.highlight.title}</h2>
          <p className={styles.expatText}>
            {siteConfig.highlight.text}
          </p>
          <div className={styles.bulletList}>
            {siteConfig.highlight.bullets.map((bullet, index) => (
              <div key={index} className={styles.bulletItem}>
                <span className={styles.bulletCheck}>✓</span>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className={styles.contactSection}>
        <div className={styles.faqContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>Contato Assíncrono</span>
            <h2 className={styles.sectionTitle}>Tem alguma dúvida?</h2>
            <p className={styles.contactSubtitle}>
              Caso queira tirar alguma dúvida antes de agendar, envie uma mensagem. Retornaremos em seu e-mail de contato em até 48 horas úteis.
            </p>
          </div>

          <form className={styles.contactForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Nome Completo</label>
                <input type="text" id="name" required className={styles.input} placeholder="Seu nome" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>E-mail de Contato</label>
                <input type="email" id="email" required className={styles.input} placeholder="seu@email.com" />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>Assunto</label>
              <select id="subject" className={styles.select}>
                <option value="duvida">Dúvida sobre os serviços</option>
                <option value="outro">Outro assunto</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Sua Mensagem</label>
              <textarea id="message" required className={styles.textarea} rows={5} placeholder="Como posso ajudar você?"></textarea>
            </div>
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSubmit}`}>
              Enviar Mensagem
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionKicker}>{siteConfig.faq.kicker}</span>
          <h2 className={styles.sectionTitle}>{siteConfig.faq.title}</h2>
        </div>

        <div className={styles.faqContainer}>
          <div className={styles.faqGrid}>
            {siteConfig.faq.questions.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <span className={styles.footerBrandName}>{siteConfig.professional.name}</span>
            <p className={styles.footerBrandDesc}>
              {siteConfig.professional.shortDescription}
            </p>
          </div>
          
          <div>
            <h4 className={styles.footerLinksTitle}>Contato</h4>
            <div className={styles.footerLinks}>
              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.footerLink}>{CONTACT_EMAIL}</a>
              {siteConfig.professional.instagram && (
                <a href={siteConfig.professional.instagram} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Instagram</a>
              )}
            </div>
          </div>

          <div>
            <h4 className={styles.footerLinksTitle}>Legal & Privacidade</h4>
            <div className={styles.footerLinks}>
              <a href="/lgpd" className={styles.footerLink} style={{ fontWeight: '600', color: '#2b6cb0' }}>Portal de Privacidade (LGPD)</a>
              <a href="/politica-de-privacidade" className={styles.footerLink}>Política de Privacidade</a>
              <a href="/termos-de-uso" className={styles.footerLink}>Termos de Uso</a>
              <a href="/politica-de-cookies" className={styles.footerLink}>Política de Cookies</a>
            </div>
          </div>

          <div className={styles.footerInfo}>
            <h4 className={styles.footerLinksTitle}>Registro Profissional</h4>
            <div className={styles.crpInfo}>
              {siteConfig.professional.title}<br />
              {siteConfig.professional.councilID ? `${siteConfig.professional.councilID}` : ""}
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerLegal}>{siteConfig.professional.name} {siteConfig.professional.councilID ? `| ${siteConfig.professional.councilID}` : ""}</div>
          <div className={styles.footerCopyright}>
            <span>&copy; {new Date().getFullYear()} {siteConfig.professional.name}. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
