"use client";

import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setIsError(false);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? "")
      })
    });

    const payload = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setIsError(true);
      setMessage(payload.message ?? "Nao foi possivel entrar.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="form-panel" onSubmit={onSubmit}>
      <div className="field-grid">
        <div className="field full">
          <label htmlFor="email">E-mail admin</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="field full">
          <label htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" required minLength={6} />
        </div>
      </div>
      <div className="form-actions">
        <button className="button" type="submit" disabled={isSubmitting}>
          <LogIn size={17} aria-hidden="true" />
          {isSubmitting ? "Entrando" : "Entrar"}
        </button>
        {message ? <span className={`form-message${isError ? " error" : ""}`}>{message}</span> : null}
      </div>
    </form>
  );
}
