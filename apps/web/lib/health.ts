export const HEALTH_CHECK_PATH = "/api/health";
export const HEALTH_CHECK_SERVICE = "assistente-redes-sociais";

type HealthEnv = Partial<
  Record<
    "NODE_ENV" | "VERCEL_ENV" | "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY" | "SUPABASE_SERVICE_ROLE_KEY",
    string
  >
>;

export function buildHealthPayload(env: HealthEnv = process.env, now = new Date()) {
  const supabaseConfigured = Boolean(
    env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY && env.SUPABASE_SERVICE_ROLE_KEY
  );

  return {
    ok: true,
    service: HEALTH_CHECK_SERVICE,
    environment: env.VERCEL_ENV ?? env.NODE_ENV ?? "local",
    timestamp: now.toISOString(),
    checks: {
      app: "ok",
      supabase: supabaseConfigured ? "configured" : "not_configured"
    }
  };
}
