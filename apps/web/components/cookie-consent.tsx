"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import { Settings } from "lucide-react";

const CONSENT_KEY = "assistente-redes-sociais.cookie-consent";
const CONSENT_VERSION = "2026-05-22";

type CookieConsentValue = {
  analytics: boolean;
  version: string;
  updatedAt: string;
};

type CookieConsentProps = {
  gaId?: string;
  gtmId?: string;
  metaPixelId?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function CookieConsent({ gaId, gtmId, metaPixelId }: CookieConsentProps) {
  const hasAnalytics = Boolean(gaId || gtmId || metaPixelId);
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setConsent(readStoredConsent());
      setIsLoaded(true);
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  useEffect(() => {
    function openPreferences() {
      setIsPanelOpen(true);
    }

    window.addEventListener("cookie-preferences:open", openPreferences);
    return () => window.removeEventListener("cookie-preferences:open", openPreferences);
  }, []);

  const analyticsEnabled = hasAnalytics && consent?.analytics === true;
  const shouldShowBanner = isLoaded && !consent;
  const shouldShowPanel = isLoaded && isPanelOpen;

  function saveConsent(analytics: boolean) {
    const nextConsent = {
      analytics,
      version: CONSENT_VERSION,
      updatedAt: new Date().toISOString()
    };

    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(nextConsent));
    setConsent(nextConsent);
    setIsPanelOpen(false);
  }

  const scripts = useMemo(
    () => (
      <>
        {analyticsEnabled && gtmId ? (
          <Script id="gtm-consented" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        ) : null}
        {analyticsEnabled && gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4-consented" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                window.gtag = function gtag(){window.dataLayer.push(arguments);}
                window.gtag('js', new Date());
                window.gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        {analyticsEnabled && metaPixelId ? (
          <Script id="meta-pixel-consented" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              window.fbq('init', '${metaPixelId}');
              window.fbq('track', 'PageView');
            `}
          </Script>
        ) : null}
      </>
    ),
    [analyticsEnabled, gaId, gtmId, metaPixelId]
  );

  return (
    <>
      {scripts}
      {shouldShowBanner ? (
        <section className="cookie-banner" aria-label="Preferencias de cookies">
          <div>
            <strong>Privacidade e cookies</strong>
            <p>
              Usamos cookies essenciais para o site funcionar. Analytics e pixels so carregam com seu consentimento.
            </p>
          </div>
          <div className="cookie-actions">
            <button className="secondary-link" type="button" onClick={() => setIsPanelOpen(true)}>
              Preferencias
            </button>
            <button className="secondary-link" type="button" onClick={() => saveConsent(false)}>
              Recusar
            </button>
            <button className="button" type="button" onClick={() => saveConsent(true)}>
              Aceitar
            </button>
          </div>
        </section>
      ) : null}
      {shouldShowPanel ? (
        <div className="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
          <div className="cookie-modal-panel">
            <div>
              <h2 id="cookie-modal-title">Preferencias de cookies</h2>
              <p>Cookies essenciais permanecem ativos. Analytics e pixels podem ser ativados ou recusados.</p>
            </div>
            <div className="cookie-option">
              <span>
                <strong>Analytics e pixels</strong>
                <span>GA4, Google Tag Manager e Meta Pixel quando configurados.</span>
              </span>
              <span>{consent?.analytics ? "Ativo" : "Inativo"}</span>
            </div>
            <div className="cookie-actions">
              <button className="secondary-link" type="button" onClick={() => saveConsent(false)}>
                Manter recusado
              </button>
              <button className="button" type="button" onClick={() => saveConsent(true)}>
                Permitir analytics
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function CookiePreferencesButton() {
  function openPreferences() {
    window.dispatchEvent(new Event("cookie-preferences:open"));
  }

  return (
    <button className="secondary-link" type="button" onClick={openPreferences}>
      <Settings size={17} aria-hidden="true" />
      Gerenciar preferencias
    </button>
  );
}

function readStoredConsent() {
  const stored = window.localStorage.getItem(CONSENT_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as CookieConsentValue;
  } catch {
    window.localStorage.removeItem(CONSENT_KEY);
    return null;
  }
}
