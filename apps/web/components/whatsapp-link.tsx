"use client";

import { MessageCircle } from "lucide-react";

type WhatsAppLinkProps = {
  phone: string;
  text: string;
};

export function WhatsAppLink({ phone, text }: WhatsAppLinkProps) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  function trackClick() {
    const payload = JSON.stringify({
      eventName: "whatsapp_click",
      source: "site",
      path: window.location.pathname,
      metadata: { phone }
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/events", new Blob([payload], { type: "application/json" }));
    } else {
      void fetch("/api/events", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: payload,
        keepalive: true
      });
    }
  }

  return (
    <a className="secondary-link" href={href} onClick={trackClick} target="_blank" rel="noreferrer">
      <MessageCircle size={17} aria-hidden="true" />
      WhatsApp
    </a>
  );
}
