import { ArrowRight, FileCheck2, Gauge, MessagesSquare, SearchCheck, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { QualificationForm } from "@/components/forms/qualification-form";
import { StructuredData } from "@/components/structured-data";

const capabilities = [
  {
    icon: SearchCheck,
    title: "Presenca pesquisavel",
    text: "Site, paginas essenciais, dados estruturados e caminho claro para Google, redes e canais de contato."
  },
  {
    icon: ShieldCheck,
    title: "Compliance por modo",
    text: "Regras iniciais para linguagem geral e modo advocacy, com CTAs sobrios para profissoes reguladas."
  },
  {
    icon: MessagesSquare,
    title: "Conversao responsavel",
    text: "Formulario de qualificacao, contato e WhatsApp com consentimento, origem e trilha de mensuracao."
  }
];

const foundationItems = [
  {
    title: "Perfil mestre",
    text: "Nome, credenciais, canais, servicos e restricoes em uma base unica.",
    icon: FileCheck2
  },
  {
    title: "Templates sociais",
    text: "Checklists e copys para Meta, Google, LinkedIn, YouTube, TikTok e WhatsApp.",
    icon: Sparkles
  },
  {
    title: "Mensuracao",
    text: "Eventos de formulario, contato e clique para WhatsApp preparados para analytics.",
    icon: Gauge
  }
];

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>Nome profissional com autoridade, dados e governanca.</h1>
            <p className="hero-copy">
              Fundacao de MVP para transformar briefing, credenciais e canais em um site profissional, templates sociais e
              fluxo de qualificacao preparado para Supabase, Vercel e GitHub.
            </p>
            <div className="hero-actions">
              <Link href="#qualificacao" className="primary-link">
                Iniciar qualificacao <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/publicacoes" className="secondary-link">
                Ver estrutura editorial
              </Link>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Resumo da fundacao">
            {foundationItems.map(({ title, text, icon: Icon }) => (
              <div className="panel-row" key={title}>
                <span className="panel-icon">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Arquitetura inicial para operar antes de automatizar.</h2>
            <p>
              O MVP evita dependencia prematura de APIs de redes sociais e concentra o primeiro valor em intake, site,
              compliance, templates e mensuracao.
            </p>
          </div>
          <div className="grid-3">
            {capabilities.map((item) => (
              <article className="content-card" key={item.title}>
                <span className="panel-icon">
                  <item.icon size={19} aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="metric-panel" aria-label="Indicadores do MVP">
            {[
              ["9", "paginas essenciais"],
              ["4", "rotas API iniciais"],
              ["8", "canais modelados"],
              ["2", "modos de compliance"]
            ].map(([value, label]) => (
              <div className="metric-item" key={label}>
                <span className="metric-value">{value}</span>
                <span className="metric-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="qualificacao">
        <div className="container grid-2">
          <div className="section-heading">
            <h2>Qualificacao com consentimento e anexos.</h2>
            <p>
              O formulario envia dados para a API do Next.js. Com Supabase configurado, as respostas sao persistidas e
              anexos seguem para bucket privado.
            </p>
          </div>
          <QualificationForm />
        </div>
      </section>
    </>
  );
}
