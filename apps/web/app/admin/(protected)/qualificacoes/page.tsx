import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Qualificacoes"
};

type QualificationRow = {
  id: string;
  professional_name: string;
  profession: string;
  channels: string[];
  compliance_mode: string;
  created_at: string;
};

export default async function AdminQualificacoesPage() {
  const rows = await getQualificationRows();

  return (
    <div className="section">
      <div className="page-title">
        <h1>Qualificacoes</h1>
        <p>Ultimos formularios de qualificacao recebidos pelo MVP.</p>
      </div>
      <div className="admin-table">
        <div className="admin-table-row admin-table-head">
          <span>Nome</span>
          <span>Profissao</span>
          <span>Canais</span>
          <span>Compliance</span>
          <span>Data</span>
        </div>
        {rows.length > 0 ? (
          rows.map((row) => (
            <div className="admin-table-row" key={row.id}>
              <span>{row.professional_name}</span>
              <span>{row.profession}</span>
              <span>{row.channels.join(", ")}</span>
              <span>{row.compliance_mode}</span>
              <span>{formatDate(row.created_at)}</span>
            </div>
          ))
        ) : (
          <div className="admin-empty">Nenhuma qualificacao encontrada ou Supabase ainda nao configurado.</div>
        )}
      </div>
    </div>
  );
}

async function getQualificationRows(): Promise<QualificationRow[]> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("qualification_submissions")
    .select("id, professional_name, profession, channels, compliance_mode, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return [];
  }

  return data ?? [];
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(value));
}
