import { describe, expect, it } from "vitest";
import { ProfessionalProfileSchema } from "./schemas";
import { buildSocialProfileTemplates, getComplianceCallToAction } from "./templates";

describe("templates sociais", () => {
  it("gera CTA sobrio para modo advocacy", () => {
    expect(getComplianceCallToAction("advocacy")).toContain("analise inicial");
    expect(getComplianceCallToAction("advocacy")).not.toMatch(/compre|agora|garanta/i);
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
  });
});
