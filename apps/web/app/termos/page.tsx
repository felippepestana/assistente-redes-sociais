import type { Metadata } from "next";
import { CURRENT_POLICY_VERSION } from "@assistente-redes-sociais/shared";

export const metadata: Metadata = {
  title: "Termos"
};

export default function TermosPage() {
  return (
    <section className="section">
      <div className="container legal-content">
        <div className="page-title">
          <h1>Termos de Uso</h1>
          <p>Versao {CURRENT_POLICY_VERSION}. Condicoes iniciais de uso para a fundacao do MVP.</p>
        </div>
        <p>
          As informacoes do site e dos formularios servem para qualificacao e organizacao de presenca profissional. O uso
          da plataforma nao substitui revisoes tecnicas, juridicas ou reguladoras quando aplicaveis.
        </p>
        <p>
          Conteudos, templates e sugestoes devem ser tratados como apoio operacional. Em profissoes reguladas, a
          publicacao final depende da validacao do profissional responsavel e das regras setoriais aplicaveis.
        </p>
        <p>
          No modo advocacy, chamadas, biografias e materiais devem manter carater informativo e sobrio, sem promessa de
          resultado, inducao ao litigio, comparacao persuasiva, preco, gratuidade ou urgencia comercial.
        </p>
      </div>
    </section>
  );
}
