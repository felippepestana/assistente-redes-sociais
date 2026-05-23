import { describe, expect, it } from "vitest";
import { buildHealthPayload, HEALTH_CHECK_PATH, HEALTH_CHECK_SERVICE } from "./lib/health";
import { ADMIN_ROUTE_HEADERS, CONTENT_SECURITY_POLICY, NO_STORE_HEADERS, SECURITY_HEADERS } from "./lib/security-headers";

function findHeader(headers: Array<{ key: string; value: string }>, key: string) {
  return headers.find((header) => header.key.toLowerCase() === key.toLowerCase())?.value;
}

describe("security baseline", () => {
  it("configura headers essenciais e CSP inicial", () => {
    expect(findHeader(SECURITY_HEADERS, "Content-Security-Policy")).toBe(CONTENT_SECURITY_POLICY);
    expect(CONTENT_SECURITY_POLICY).toContain("frame-ancestors 'none'");
    expect(CONTENT_SECURITY_POLICY).toContain("object-src 'none'");
    expect(CONTENT_SECURITY_POLICY).toContain("base-uri 'self'");
    expect(CONTENT_SECURITY_POLICY).toContain("https://www.googletagmanager.com");
    expect(CONTENT_SECURITY_POLICY).not.toContain("'unsafe-eval'");
    expect(findHeader(SECURITY_HEADERS, "X-Content-Type-Options")).toBe("nosniff");
    expect(findHeader(SECURITY_HEADERS, "X-Frame-Options")).toBe("DENY");
    expect(findHeader(SECURITY_HEADERS, "Referrer-Policy")).toBe("strict-origin-when-cross-origin");
  });

  it("marca APIs e admin como no-store", () => {
    expect(findHeader(NO_STORE_HEADERS, "Cache-Control")).toBe("no-store, max-age=0");
    expect(findHeader(ADMIN_ROUTE_HEADERS, "Cache-Control")).toBe("no-store, max-age=0");
    expect(findHeader(ADMIN_ROUTE_HEADERS, "X-Robots-Tag")).toContain("noindex");
  });

  it("gera payload de health check sem expor secrets", () => {
    const payload = buildHealthPayload(
      {
        NODE_ENV: "production",
        VERCEL_ENV: "preview",
        NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon",
        SUPABASE_SERVICE_ROLE_KEY: "service-role"
      },
      new Date("2026-05-23T00:00:00.000Z")
    );

    expect(HEALTH_CHECK_PATH).toBe("/api/health");
    expect(payload.service).toBe(HEALTH_CHECK_SERVICE);
    expect(payload.checks.supabase).toBe("configured");
    expect(JSON.stringify(payload)).not.toContain("service-role");
  });
});
