export type EnvReadinessItem = {
  name: string;
  label: string;
  required: boolean;
  configured: boolean;
  scope: "client" | "server";
};

const envItems = [
  ["NEXT_PUBLIC_SITE_URL", "URL publica do site", true, "client"],
  ["NEXT_PUBLIC_SUPABASE_URL", "URL do projeto Supabase", true, "client"],
  ["NEXT_PUBLIC_SUPABASE_ANON_KEY", "Chave anon publica do Supabase", true, "client"],
  ["SUPABASE_SERVICE_ROLE_KEY", "Chave de servico Supabase", true, "server"],
  ["SUPABASE_ASSETS_BUCKET", "Bucket privado de ativos", false, "server"],
  ["NEXT_PUBLIC_WHATSAPP_NUMBER", "Numero de WhatsApp", false, "client"],
  ["GA_MEASUREMENT_ID", "GA4 Measurement ID", false, "server"],
  ["GTM_CONTAINER_ID", "Google Tag Manager", false, "server"],
  ["META_PIXEL_ID", "Meta Pixel", false, "server"],
  ["INTERNAL_EVENT_SECRET", "Segredo para eventos internos", false, "server"]
] as const;

export function getEnvReadiness(): EnvReadinessItem[] {
  return envItems.map(([name, label, required, scope]) => ({
    name,
    label,
    required,
    scope,
    configured: Boolean(process.env[name])
  }));
}

export function getReadinessSummary() {
  const items = getEnvReadiness();
  const required = items.filter((item) => item.required);
  const configuredRequired = required.filter((item) => item.configured);

  return {
    items,
    requiredTotal: required.length,
    requiredConfigured: configuredRequired.length,
    isReady: configuredRequired.length === required.length
  };
}
