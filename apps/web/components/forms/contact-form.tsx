"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setIsError(false);

    const formData = new FormData(event.currentTarget);
    const body = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
      source: "site",
      channel: "site",
      consent: {
        accepted: formData.get("consent") === "on",
        acceptedAt: new Date().toISOString()
      }
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const payload = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setIsError(true);
      setMessage("Revise os dados e o consentimento.");
      return;
    }

    event.currentTarget.reset();
    setMessage(payload.storage === "supabase" ? "Contato registrado." : "Contato validado; configure Supabase para persistir.");
  }

  return (
    <form className="form-panel" onSubmit={onSubmit}>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="name">Nome</label>
          <input id="name" name="name" required minLength={2} />
        </div>
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="field full">
          <label htmlFor="phone">Telefone</label>
          <input id="phone" name="phone" />
        </div>
        <div className="field full">
          <label htmlFor="message">Mensagem</label>
          <textarea id="message" name="message" required minLength={10} />
        </div>
        <div className="field full">
          <label className="checkbox-label">
            <input name="consent" type="checkbox" required /> Li e concordo com a politica de privacidade.
          </label>
        </div>
      </div>
      <div className="form-actions">
        <button className="button" type="submit" disabled={isSubmitting}>
          <Send size={17} aria-hidden="true" />
          {isSubmitting ? "Enviando" : "Enviar contato"}
        </button>
        {message ? <span className={`form-message${isError ? " error" : ""}`}>{message}</span> : null}
      </div>
    </form>
  );
}
