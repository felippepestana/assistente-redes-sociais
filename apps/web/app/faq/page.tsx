import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ"
};

const faqs = [
  {
    question: "O MVP publica automaticamente em redes sociais?",
    answer:
      "Nao. A primeira fase gera templates e checklists. Conectores completos entram depois, conforme politicas e aprovacoes das plataformas."
  },
  {
    question: "O modo advocacy substitui revisao juridica?",
    answer:
      "Nao. Ele reduz risco com regras iniciais de linguagem, mas conteudos sensiveis devem passar por revisao responsavel."
  },
  {
    question: "Os anexos sao publicos?",
    answer:
      "Nao. A migracao cria bucket privado e a API foi preparada para gravar anexos com chave de servico no servidor."
  }
];

export default function FaqPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <h1>Perguntas frequentes</h1>
          <p>Respostas operacionais para a primeira sprint da plataforma.</p>
        </div>
        <div className="grid-3">
          {faqs.map((faq) => (
            <article className="content-card" key={faq.question}>
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
