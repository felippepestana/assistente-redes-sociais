"use client";

import { CURRENT_POLICY_VERSION } from "@assistente-redes-sociais/shared";
import { Send } from "lucide-react";
import { useState } from "react";

const channels = [
  ["site", "Site"],
  ["instagram", "Instagram"],
  ["facebook", "Facebook"],
  ["whatsapp", "WhatsApp"],
  ["google_business", "Google"],
  ["youtube", "YouTube"],
  ["linkedin", "LinkedIn"],
  ["tiktok", "TikTok"]
];

export function QualificationForm() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setIsError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("consent", formData.get("consent") === "on" ? "true" : "false");
    formData.set("policyVersion", CURRENT_POLICY_VERSION);

    const response = await fetch("/api/qualification", {
      method: "POST",
      body: formData
    });

    const payload = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setIsError(true);
      setMessage("Revise os campos obrigatorios e o consentimento.");
      return;
    }

    form.reset();
    setMessage(payload.storage === "supabase" ? "Qualificacao registrada." : "Qualificacao validada; configure Supabase para persistir.");
  }

  return (
    <form className="form-panel" onSubmit={onSubmit}>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="professionalName">Nome profissional</label>
          <input id="professionalName" name="professionalName" required minLength={3} />
        </div>
        <div className="field">
          <label htmlFor="profession">Profissao</label>
          <input id="profession" name="profession" required minLength={2} />
        </div>
        <div className="field">
          <label htmlFor="registration">Registro profissional</label>
          <input id="registration" name="registration" />
        </div>
        <div className="field">
          <label htmlFor="city">Cidade</label>
          <input id="city" name="city" />
        </div>
        <div className="field">
          <label htmlFor="state">Estado</label>
          <input id="state" name="state" maxLength={2} />
        </div>
        <div className="field">
          <label htmlFor="complianceMode">Modo de compliance</label>
          <select id="complianceMode" name="complianceMode" defaultValue="advocacy">
            <option value="general">Geral</option>
            <option value="advocacy">Advocacy</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="targetAudience">Publico prioritario</label>
          <textarea id="targetAudience" name="targetAudience" required minLength={3} />
        </div>
        <div className="field full">
          <label htmlFor="services">Servicos ou areas de atuacao</label>
          <textarea id="services" name="services" required placeholder="Uma area por linha ou separada por virgula" />
        </div>
        <div className="field full">
          <label>Canais desejados</label>
          <div className="grid-2">
            {channels.map(([value, label]) => (
              <label className="checkbox-label" key={value}>
                <input name="channels" type="checkbox" value={value} defaultChecked={value === "site" || value === "whatsapp"} />
                {label}
              </label>
            ))}
          </div>
        </div>
        <div className="field full">
          <label htmlFor="attachments">Anexos</label>
          <input id="attachments" name="attachments" type="file" multiple />
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
          {isSubmitting ? "Enviando" : "Enviar qualificacao"}
        </button>
        {message ? <span className={`form-message${isError ? " error" : ""}`}>{message}</span> : null}
      </div>
    </form>
  );
}
