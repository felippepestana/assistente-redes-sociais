import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/forms/admin-login-form";
import { getReadinessSummary } from "@/lib/env-readiness";

export const metadata: Metadata = {
  title: "Admin Login"
};

export default function AdminLoginPage() {
  const readiness = getReadinessSummary();

  return (
    <section className="section">
      <div className="container grid-2">
        <div className="page-title">
          <h1>Entrar no admin</h1>
          <p>
            A area administrativa usa Supabase Auth. Configure Supabase e crie usuarios autorizados antes de usar em
            producao.
          </p>
          <div className="admin-readiness-summary">
            <strong>
              {readiness.requiredConfigured}/{readiness.requiredTotal}
            </strong>
            <span>variaveis obrigatorias configuradas</span>
          </div>
        </div>
        <AdminLoginForm />
      </div>
    </section>
  );
}
