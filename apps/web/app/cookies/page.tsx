import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies"
};

export default function CookiesPage() {
  return (
    <section className="section">
      <div className="container legal-content">
        <div className="page-title">
          <h1>Politica de Cookies</h1>
          <p>Versao inicial para registrar categorias e preferencias antes da ativacao plena de analytics e pixels.</p>
        </div>
        <p>
          O site pode usar cookies essenciais para funcionamento e, quando configurado, tecnologias de mensuracao como
          GA4, GTM e Meta Pixel. Cookies nao essenciais devem respeitar consentimento e configuracao de preferencias.
        </p>
      </div>
    </section>
  );
}
