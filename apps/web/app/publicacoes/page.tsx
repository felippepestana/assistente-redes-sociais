import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publicacoes"
};

const posts = [
  "Como transformar credenciais profissionais em prova de autoridade",
  "Checklist de presenca digital para profissoes reguladas",
  "Taxonomia minima de eventos para formularios e WhatsApp"
];

export default function PublicacoesPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <h1>Publicacoes</h1>
          <p>Espaco inicial para artigos, notas, midia e conteudo de autoridade conectado ao perfil profissional.</p>
        </div>
        <div className="grid-3">
          {posts.map((post) => (
            <article className="content-card" key={post}>
              <span className="small-text">Rascunho editorial</span>
              <h2>{post}</h2>
              <p>
                Conteudo planejado para alimentar site, redes sociais e bibliotecas de prova sem romper criterios de
                compliance.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
