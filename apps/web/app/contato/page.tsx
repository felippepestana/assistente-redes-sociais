import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const metadata: Metadata = {
  title: "Contato"
};

export default function ContatoPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <section className="section">
      <div className="container grid-2">
        <div className="page-title">
          <h1>Contato</h1>
          <p>Envie uma mensagem com consentimento para registrar origem, canal e status inicial do lead.</p>
          {whatsappNumber ? (
            <div className="hero-actions">
              <WhatsAppLink phone={whatsappNumber} text="Ola, gostaria de enviar uma duvida profissional." />
            </div>
          ) : null}
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
