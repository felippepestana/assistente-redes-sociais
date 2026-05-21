import type { Metadata } from "next";
import { FileText, LockKeyhole, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Atuacao"
};

const areas = [
  {
    icon: FileText,
    title: "Perfil mestre",
    text: "Cadastro central de identidade, credenciais, servicos, links, provas e restricoes."
  },
  {
    icon: Share2,
    title: "Templates multicanal",
    text: "Base de apresentacao para site, Instagram, Facebook, WhatsApp, Google, YouTube, LinkedIn e TikTok."
  },
  {
    icon: LockKeyhole,
    title: "Governanca",
    text: "Paginas legais, consentimento, RLS, headers, CI e processo de revisao."
  }
];

export default function AtuacaoPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <h1>Atuacao do MVP</h1>
          <p>Fundacao tecnica e operacional para que cada nome profissional possa ser implantado com consistencia.</p>
        </div>
        <div className="grid-3">
          {areas.map((area) => (
            <article className="content-card" key={area.title}>
              <span className="panel-icon">
                <area.icon size={19} aria-hidden="true" />
              </span>
              <h2>{area.title}</h2>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
