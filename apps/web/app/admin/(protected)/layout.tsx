import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";
import { requireAdminUser } from "@/lib/admin-auth";

const adminNav = [
  ["Visao geral", "/admin"],
  ["Qualificacoes", "/admin/qualificacoes"],
  ["Leads", "/admin/leads"]
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdminUser();

  return (
    <section className="admin-shell">
      <div className="container admin-header">
        <div>
          <span className="small-text">Admin autenticado</span>
          <strong>{user.email ?? user.id}</strong>
        </div>
        <nav className="admin-nav" aria-label="Navegacao administrativa">
          {adminNav.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </div>
      <div className="container">{children}</div>
    </section>
  );
}
