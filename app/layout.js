import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "../config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(siteConfig.seo.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.professional.name}`
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.professional.name }],
  creator: siteConfig.professional.name,
  publisher: siteConfig.professional.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.seo.url,
    siteName: siteConfig.professional.name,
    images: [
      {
        url: '/hero_placeholder.jpg', 
        width: 800,
        height: 600,
        alt: `Imagem de destaque - ${siteConfig.professional.name}`,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: ['/hero_placeholder.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness", // Generico. Pode ser alterado para MedicalBusiness, LegalService, etc.
  "name": siteConfig.professional.name,
  "image": `${siteConfig.seo.url}/hero_placeholder.jpg`,
  "url": siteConfig.seo.url,
  "telephone": siteConfig.professional.whatsapp,
  "description": siteConfig.seo.description,
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR"
  },
  "makesOffer": siteConfig.services.items.map(service => ({
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": service.title
    }
  }))
};

import CookieConsent from "../components/CookieConsent";
import ChatAssistant from "../components/ChatAssistant";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
        <CookieConsent />
        <ChatAssistant />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
