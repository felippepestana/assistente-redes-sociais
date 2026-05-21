import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Privacidade"
};

export default function PrivacidadePage() {
  return (
    <section className="section">
      <div className="container legal-content">
        <div className="page-title">
          <h1>Politica de Privacidade</h1>
          <p>Versao inicial para o MVP. Deve ser revisada conforme controlador, operador, bases legais e operacao real.</p>
        </div>
        <p>
          Coletamos dados informados em formularios para qualificar demandas, responder contatos e estruturar presenca
          profissional. Os dados podem incluir nome, contato, profissao, localidade, canais desejados, mensagens e anexos.
        </p>
        <p>
          O tratamento segue principios de finalidade, adequacao, necessidade, transparencia e seguranca. O titular pode
          solicitar acesso, correcao ou exclusao pelos canais oficiais do controlador.
        </p>
      </div>
    </section>
  );
}
