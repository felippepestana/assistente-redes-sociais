import type { ComplianceMode } from "./schemas";

export const CURRENT_POLICY_VERSION = "2026-05-23";

export const ADVOCACY_SAFE_CALL_TO_ACTION = "Saiba mais no site e envie sua duvida para analise inicial.";

export const GENERAL_SAFE_CALL_TO_ACTION = "Fale comigo pelo site ou WhatsApp.";

export type AdvocacyLanguageRule = {
  id: string;
  description: string;
  pattern: RegExp;
};

export const ADVOCACY_FORBIDDEN_LANGUAGE_RULES: AdvocacyLanguageRule[] = [
  {
    id: "urgent-commercial-cta",
    description: "CTA de urgencia ou apelo comercial",
    pattern:
      /\b(compre|contrate|garanta|aproveite|ligue|chame|fale|clique)\s+(agora|j[a\u00e1]|hoje|imediatamente)\b/i
  },
  {
    id: "result-promise",
    description: "promessa, garantia ou inducao de resultado",
    pattern: /\b(resultado\s+garantido|garantia\s+de\s+resultado|causa\s+ganha|sem\s+risco|100%\s+de\s+chance)\b/i
  },
  {
    id: "price-discount",
    description: "referencia a preco, gratuidade, desconto ou promocao",
    pattern:
      /\b(gr[a\u00e1]tis|gratuito|desconto|promo[c\u00e7][a\u00e3]o|promocional|parcelamento|honor[a\u00e1]rios\s+reduzidos|pre[c\u00e7]o)\b/i
  },
  {
    id: "self-aggrandizement",
    description: "autoengrandecimento ou comparacao persuasiva",
    pattern: /\b(o\s+melhor|a\s+melhor|especialista\s+n[u\u00fa]mero\s+1|lider\s+absoluto|mais\s+barato)\b/i
  },
  {
    id: "litigation-inducement",
    description: "estimulo direto a litigio ou contratacao",
    pattern: /\b(processe|entre\s+com\s+acao|abra\s+uma\s+acao|indenizacao\s+garantida|recupere\s+seu\s+dinheiro)\b/i
  }
];

export function getSafeCallToAction(mode: ComplianceMode) {
  return mode === "advocacy" ? ADVOCACY_SAFE_CALL_TO_ACTION : GENERAL_SAFE_CALL_TO_ACTION;
}

export function reviewAdvocacyLanguage(text: string) {
  const violations = ADVOCACY_FORBIDDEN_LANGUAGE_RULES.filter((rule) => rule.pattern.test(text));

  return {
    ok: violations.length === 0,
    violations: violations.map(({ id, description }) => ({ id, description }))
  };
}
