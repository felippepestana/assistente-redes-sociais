import { ShieldCheck } from "lucide-react";
import Link from "next/link";

const navItems = [
  ["Sobre", "/sobre"],
  ["Atuacao", "/atuacao"],
  ["Publicacoes", "/publicacoes"],
  ["FAQ", "/faq"],
  ["Contato", "/contato"]
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Assistente de Redes Sociais">
          <span className="brand-mark">
            <ShieldCheck size={19} aria-hidden="true" />
          </span>
          <span>Assistente de Redes Sociais</span>
        </Link>
        <nav className="nav" aria-label="Navegacao principal">
          {navItems.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/contato" className="primary-link">
          Contato
        </Link>
      </div>
    </header>
  );
}
