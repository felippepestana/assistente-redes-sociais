import type { Metadata } from "next";
import { CURRENT_POLICY_VERSION } from "@assistente-redes-sociais/shared";

export const metadata: Metadata = {
  title: "Politica de Privacidade"
};

export default function PrivacidadePage() {
  return (
    <section className="section">
      <div className="container legal-content">
        <div className="page-title">
          <h1>Politica de Privacidade</h1>
          <p>
            Versao {CURRENT_POLICY_VERSION}. Documento-base do MVP, pendente de revisao final conforme controlador,
            operador, bases legais e operacao real.
          </p>
        </div>
        <h2>Escopo</h2>
        <p>
          Coletamos dados informados em formularios para qualificar demandas, responder contatos e estruturar presenca
          profissional. Os dados podem incluir nome, contato, profissao, localidade, canais desejados, mensagens e anexos.
        </p>
        <h2>Finalidades</h2>
        <p>
          Os dados sao tratados para responder contatos, registrar qualificacoes, organizar ativos aprovados, preparar
          templates de presenca digital, cumprir obrigacoes legais e manter seguranca do site e dos registros.
        </p>
        <h2>Bases e minimizacao</h2>
        <p>
          O MVP registra consentimento quando o usuario envia formularios e limita a coleta aos campos necessarios para a
          finalidade declarada. Qualquer uso posterior para analytics, midia paga, CRM ou automacoes deve ser revisado e
          documentado antes da producao.
        </p>
        <h2>Compartilhamento e armazenamento</h2>
        <p>
          Os dados podem ser armazenados em Supabase, Vercel e provedores operacionais configurados pelo controlador.
          Anexos devem permanecer em storage privado, com acesso restrito e registro de quem pode consultar ou baixar.
        </p>
        <h2>Direitos do titular</h2>
        <p>
          O tratamento segue principios de finalidade, adequacao, necessidade, transparencia e seguranca. O titular pode
          solicitar acesso, correcao, informacao, oposicao ou exclusao pelos canais oficiais do controlador.
        </p>
        <h2>Contato de privacidade</h2>
        <p>
          O canal definitivo do encarregado ou responsavel de privacidade deve ser informado antes da publicacao em
          producao. Ate la, este texto funciona como minuta tecnica e checklist de implementacao.
        </p>
      </div>
    </section>
  );
}
