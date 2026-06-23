"use client";

import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already set cookies
    const consent = localStorage.getItem('lgpd_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      // Load saved preferences in case we need them elsewhere
      try {
        const parsed = JSON.parse(consent);
        setPreferences(parsed);
      } catch (e) {
        console.error("Error parsing cookie consent", e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const handleRejectNonEssential = () => {
    const rejected = { necessary: true, analytics: false, marketing: false };
    setPreferences(rejected);
    saveConsent(rejected);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const saveConsent = (prefs) => {
    localStorage.setItem('lgpd_cookie_consent', JSON.stringify(prefs));
    setIsVisible(false);
    
    // Dispatch a custom event so other components (like GA) know consent changed
    window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: prefs }));
  };

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) {
    return (
      <button 
        onClick={() => { setIsVisible(true); setShowPreferences(true); }} 
        className={styles.floatingButton}
        aria-label="Preferências de Privacidade"
        title="Preferências de Privacidade"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      </button>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {!showPreferences ? (
          <>
            <div className={styles.header}>
              <h2 className={styles.title}>Nós respeitamos sua privacidade</h2>
            </div>
            <div className={styles.content}>
              <p>
                Utilizamos cookies para melhorar sua experiência em nosso site, 
                personalizar conteúdo e analisar nosso tráfego. Ao clicar em 
                "Aceitar todos", você concorda com o uso de todos os cookies. 
                Você pode personalizar suas escolhas clicando em "Preferências". 
                Para mais informações, consulte nossa <a href="/politica-de-privacidade" className={styles.link}>Política de Privacidade</a>.
              </p>
            </div>
            <div className={styles.actions}>
              <button onClick={() => setShowPreferences(true)} className={styles.btnSecondary}>
                Preferências
              </button>
              <button onClick={handleRejectNonEssential} className={styles.btnSecondary}>
                Rejeitar Opcionais
              </button>
              <button onClick={handleAcceptAll} className={styles.btnPrimary}>
                Aceitar Todos
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.header}>
              <h2 className={styles.title}>Preferências de Privacidade</h2>
              <p className={styles.subtitle}>Escolha quais cookies você permite que utilizemos.</p>
            </div>
            <div className={styles.preferencesList}>
              <div className={styles.preferenceItem}>
                <div className={styles.preferenceInfo}>
                  <h3>Estritamente Necessários</h3>
                  <p>Essenciais para o funcionamento básico do site. Não podem ser desativados.</p>
                </div>
                <div className={styles.toggle}>
                  <input type="checkbox" checked disabled className={styles.checkbox} />
                </div>
              </div>
              <div className={styles.preferenceItem}>
                <div className={styles.preferenceInfo}>
                  <h3>Desempenho e Análise</h3>
                  <p>Ajudam a entender como os visitantes interagem com o site (ex: Google Analytics).</p>
                </div>
                <div className={styles.toggle}>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox" 
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
              <div className={styles.preferenceItem}>
                <div className={styles.preferenceInfo}>
                  <h3>Marketing</h3>
                  <p>Usados para rastrear visitantes através de sites para exibir anúncios relevantes.</p>
                </div>
                <div className={styles.toggle}>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox" 
                      checked={preferences.marketing}
                      onChange={() => togglePreference('marketing')}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <button onClick={() => setShowPreferences(false)} className={styles.btnSecondary}>
                Voltar
              </button>
              <button onClick={handleSavePreferences} className={styles.btnPrimary}>
                Salvar Preferências
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
