import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Leads"
};

type LeadRow = {
  id: string;
  name: string;
  email: string;
  source: string;
  channel: string;
  status: string;
  created_at: string;
};

export default async function AdminLeadsPage() {
  const rows = await getLeadRows();

  return (
    <div className="section">
      <div className="page-title">
        <h1>Leads</h1>
        <p>Ultimos contatos recebidos pelo site.</p>
      </div>
      <div className="admin-table">
        <div className="admin-table-row admin-table-head">
          <span>Nome</span>
          <span>E-mail</span>
          <span>Origem</span>
          <span>Status</span>
          <span>Data</span>
        </div>
        {rows.length > 0 ? (
          rows.map((row) => (
            <div className="admin-table-row" key={row.id}>
              <span>{row.name}</span>
              <span>{row.email}</span>
              <span>{row.source} / {row.channel}</span>
              <span>{row.status}</span>
              <span>{formatDate(row.created_at)}</span>
            </div>
          ))
        ) : (
          <div className="admin-empty">Nenhum lead encontrado ou Supabase ainda nao configurado.</div>
        )}
      </div>
    </div>
  );
}

async function getLeadRows(): Promise<LeadRow[]> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("leads")
    .select("id, name, email, source, channel, status, created_at")
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
