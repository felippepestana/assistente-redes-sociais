import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre"
};

export default function SobrePage() {
  return (
    <section className="section">
      <div className="container grid-2">
        <div className="page-title">
          <h1>Sobre a plataforma</h1>
          <p>
            A solucao organiza presenca digital profissional como um sistema unico: qualificacao, posicionamento, site,
            redes, compliance, conversao e mensuracao.
          </p>
        </div>
        <div className="content-card">
          <h2>Principios</h2>
          <ul className="list">
            <li>Nome profissional como ativo central.</li>
            <li>Informacao verificavel antes de promessa comercial.</li>
            <li>Consentimento e minimizacao de dados desde o primeiro formulario.</li>
            <li>Automacao progressiva, respeitando politicas das plataformas.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
