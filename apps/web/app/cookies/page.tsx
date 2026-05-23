import type { Metadata } from "next";
import { CURRENT_POLICY_VERSION } from "@assistente-redes-sociais/shared";
import { CookiePreferencesButton } from "@/components/cookie-consent";

export const metadata: Metadata = {
  title: "Cookies"
};

export default function CookiesPage() {
  return (
    <section className="section">
      <div className="container legal-content">
        <div className="page-title">
          <h1>Politica de Cookies</h1>
          <p>
            Versao {CURRENT_POLICY_VERSION}. Minuta para registrar categorias e preferencias antes da ativacao plena de
            analytics e pixels.
          </p>
        </div>
        <p>
          O site pode usar cookies essenciais para funcionamento e, quando configurado, tecnologias de mensuracao como
          GA4, GTM e Meta Pixel. Cookies nao essenciais devem respeitar consentimento e configuracao de preferencias.
        </p>
        <h2>Categorias</h2>
        <p>
          Cookies essenciais sustentam navegacao, formularios, preferencias e seguranca basica. Eles nao podem ser
          desativados pelo painel do site porque sao necessarios para a operacao minima.
        </p>
        <p>
          Cookies de analytics e pixels ajudam a entender visualizacoes, origem de trafego e conversoes. Eles permanecem
          inativos ate que a preferencia de analytics seja permitida.
        </p>
        <h2>Preferencias</h2>
        <p>
          Cookies essenciais ficam ativos para formularios, seguranca e navegacao. Analytics e pixels so sao carregados
          quando a preferencia permite.
        </p>
        <p>
          A configuracao deve oferecer informacao clara, possibilidade de mudar preferencias e registro da escolha feita.
          Novas ferramentas de rastreamento devem ser adicionadas a esta pagina antes de serem ativadas.
        </p>
        <CookiePreferencesButton />
      </div>
    </section>
  );
}
