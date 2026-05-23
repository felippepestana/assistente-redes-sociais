import type { Metadata } from "next";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { getReadinessSummary } from "@/lib/env-readiness";
import { getSupabaseAdmin } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Admin"
};

export default async function AdminPage() {
  const readiness = getReadinessSummary();
  const stats = await getAdminStats();

  return (
    <div className="section">
      <div className="page-title">
        <h1>Operacao do MVP</h1>
        <p>Readiness de ambiente e sinais basicos de intake, sem expor valores de segredos.</p>
      </div>

      <div className="metric-panel" aria-label="Resumo administrativo">
        <div className="metric-item">
          <span className="metric-value">{readiness.requiredConfigured}/{readiness.requiredTotal}</span>
          <span className="metric-label">variaveis obrigatorias</span>
        </div>
        <div className="metric-item">
          <span className="metric-value">{stats.qualificationCount}</span>
          <span className="metric-label">qualificacoes</span>
        </div>
        <div className="metric-item">
          <span className="metric-value">{stats.leadCount}</span>
          <span className="metric-label">leads</span>
        </div>
        <div className="metric-item">
          <span className="metric-value">{readiness.isReady ? "OK" : "Setup"}</span>
          <span className="metric-label">estado do ambiente</span>
        </div>
      </div>

      <div className="section">
        <div className="section-heading">
          <h2>Variaveis de ambiente</h2>
          <p>Status booleano apenas. Valores nunca sao exibidos no admin.</p>
        </div>
        <div className="admin-readiness-grid">
          {readiness.items.map((item) => (
            <div className="content-card admin-readiness-card" key={item.name}>
              <span className={`status-icon ${item.configured ? "success" : "warning"}`}>
                {item.configured ? <CheckCircle2 size={18} aria-hidden="true" /> : <CircleAlert size={18} aria-hidden="true" />}
              </span>
              <div>
                <strong>{item.name}</strong>
                <p>{item.label}</p>
                <span className="small-text">
                  {item.required ? "Obrigatoria" : "Opcional"} · {item.scope}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function getAdminStats() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return {
      qualificationCount: 0,
      leadCount: 0
    };
  }

  const [qualifications, leads] = await Promise.all([
    supabase.from("qualification_submissions").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true })
  ]);

  return {
    qualificationCount: qualifications.count ?? 0,
    leadCount: leads.count ?? 0
  };
}
