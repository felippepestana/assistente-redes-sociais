import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© 2026 Assistente de Redes Sociais</span>
        <div className="footer-links">
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/termos">Termos</Link>
        </div>
      </div>
    </footer>
  );
}
