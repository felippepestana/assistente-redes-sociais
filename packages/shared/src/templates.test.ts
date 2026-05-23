import { describe, expect, it } from "vitest";
import { CURRENT_POLICY_VERSION, reviewAdvocacyLanguage } from "./compliance";
import { ConsentSchema, ProfessionalProfileSchema } from "./schemas";
import { buildSocialProfileTemplates, getComplianceCallToAction } from "./templates";

describe("templates sociais", () => {
  it("gera CTA sobrio para modo advocacy", () => {
    expect(getComplianceCallToAction("advocacy")).toContain("analise inicial");
    expect(getComplianceCallToAction("advocacy")).not.toMatch(/compre|agora|garanta/i);
    expect(reviewAdvocacyLanguage(getComplianceCallToAction("advocacy")).ok).toBe(true);
  });

  it("gera templates para todos os canais selecionados", () => {
    const profile = ProfessionalProfileSchema.parse({
      professionalName: "Nome Profissional",
      profession: "Advogada",
      city: "Manaus",
      state: "AM",
      services: ["direito civil", "consultoria preventiva"],
      channels: ["site", "instagram", "whatsapp"],
      complianceMode: "advocacy"
    });

    const templates = buildSocialProfileTemplates(profile);

    expect(templates).toHaveLength(3);
    expect(templates.map((template) => template.platform)).toEqual(["site", "instagram", "whatsapp"]);
    expect(templates.every((template) => template.checklist.includes("evitar promessa de resultado"))).toBe(true);
    expect(templates.every((template) => reviewAdvocacyLanguage(template.callToAction).ok)).toBe(true);
  });

  it("bloqueia linguagem advocacy de urgencia, promessa e preco", () => {
    const examples = [
      "Compre agora e resolva seu caso.",
      "Resultado garantido para sua causa.",
      "Consulta gratis com desconto especial.",
      "O melhor advogado para recuperar seu dinheiro."
    ];

    expect(examples.every((example) => reviewAdvocacyLanguage(example).ok === false)).toBe(true);
  });

  it("registra a versao atual da politica por padrao no consentimento", () => {
    const consent = ConsentSchema.parse({ accepted: true });

    expect(consent.policyVersion).toBe(CURRENT_POLICY_VERSION);
  });
});
