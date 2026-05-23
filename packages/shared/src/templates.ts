import type { Channel, ComplianceMode, ProfessionalProfile } from "./schemas";
import { getSafeCallToAction } from "./compliance";

export type SocialProfileTemplate = {
  platform: Channel;
  displayName: string;
  headline: string;
  bio: string;
  callToAction: string;
  checklist: string[];
};

const channelLabels: Record<Channel, string> = {
  site: "Site profissional",
  instagram: "Instagram",
  facebook: "Facebook",
  whatsapp: "WhatsApp Business",
  google_business: "Perfil da Empresa no Google",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  tiktok: "TikTok"
};

export function getComplianceCallToAction(mode: ComplianceMode) {
  return getSafeCallToAction(mode);
}

export function buildSocialProfileTemplates(profile: ProfessionalProfile): SocialProfileTemplate[] {
  const services = profile.services.slice(0, 2).join(" e ") || "sua area de atuacao";
  const location = [profile.city, profile.state].filter(Boolean).join(" - ");
  const locationText = location ? ` em ${location}` : "";
  const callToAction = getComplianceCallToAction(profile.complianceMode);

  return profile.channels.map((platform) => ({
    platform,
    displayName: profile.professionalName,
    headline: `${profile.profession} | ${services}${locationText}`,
    bio: `${profile.professionalName} atua com ${services}${locationText}. Conteudo informativo, credenciais verificaveis e contato responsavel.`,
    callToAction,
    checklist: buildChecklist(platform, profile.complianceMode)
  }));
}

function buildChecklist(platform: Channel, mode: ComplianceMode) {
  const base = [
    "usar nome profissional consistente",
    "incluir site oficial",
    "validar credenciais antes de publicar",
    "ativar autenticacao de dois fatores"
  ];

  const platformItems: Record<Channel, string[]> = {
    site: ["publicar paginas legais", "validar schema e SEO tecnico"],
    instagram: ["configurar conta profissional", "criar destaques Sobre, Atuacao e Publicacoes"],
    facebook: ["publicar pagina", "conectar Business Manager quando houver anuncios"],
    whatsapp: ["completar perfil comercial", "preparar respostas padronizadas"],
    google_business: ["validar categoria principal", "preparar fotos e verificacao"],
    youtube: ["configurar banner, handle e secoes", "organizar playlists por tema"],
    linkedin: ["ajustar headline e destaque", "revisar URL publica curta"],
    tiktok: ["configurar conta business", "organizar series de videos curtos"]
  };

  const complianceItems =
    mode === "advocacy"
      ? [
          "manter publicidade sobria, discreta e informativa",
          "evitar promessa de resultado",
          "evitar CTA de urgencia ou apelo comercial",
          "evitar mencao a preco, gratuidade, desconto ou promocao",
          "revisar credenciais e titulos antes de publicar"
        ]
      : ["alinhar CTA ao funil comercial", "definir oferta principal"];

  return [...base, ...platformItems[platform], ...complianceItems];
}

export { channelLabels };
