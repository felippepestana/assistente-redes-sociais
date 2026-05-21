import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos"
};

export default function TermosPage() {
  return (
    <section className="section">
      <div className="container legal-content">
        <div className="page-title">
          <h1>Termos de Uso</h1>
          <p>Condicoes iniciais de uso para a fundacao do MVP.</p>
        </div>
        <p>
          As informacoes do site e dos formularios servem para qualificacao e organizacao de presenca profissional. O uso
          da plataforma nao substitui revisoes tecnicas, juridicas ou reguladoras quando aplicaveis.
        </p>
      </div>
    </section>
  );
}
