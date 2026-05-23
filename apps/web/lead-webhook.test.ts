import { describe, expect, it, vi } from "vitest";
import { buildLeadWebhookPayload, dispatchLeadWebhook } from "./lib/lead-webhook";

const baseLead = {
  name: "Nome Lead",
  email: "lead@example.com",
  phone: "5592999999999",
  message: "Mensagem com contexto suficiente.",
  source: "site",
  channel: "site" as const,
  consent: {
    accepted: true as const,
    policyVersion: "2026-05-23",
    acceptedAt: "2026-05-23T00:00:00.000Z"
  },
  status: "new" as const
};

describe("lead webhook", () => {
  it("monta payload sem consentimento completo ou anexos", () => {
    const payload = buildLeadWebhookPayload(baseLead, {
      leadId: "00000000-0000-4000-8000-000000000001",
      createdAt: "2026-05-23T00:00:00.000Z",
      now: new Date("2026-05-23T00:01:00.000Z"),
      idempotencyKey: "lead-1"
    });

    expect(payload.event).toBe("lead.created");
    expect(payload.lead.id).toBe("00000000-0000-4000-8000-000000000001");
    expect(payload.lead.consentPolicyVersion).toBe("2026-05-23");
    expect(JSON.stringify(payload)).not.toContain("acceptedAt");
    expect(JSON.stringify(payload)).not.toContain("attachments");
  });

  it("nao dispara quando webhook nao esta configurado", async () => {
    const fetchImpl = vi.fn();
    const result = await dispatchLeadWebhook(baseLead, { env: {}, fetchImpl });

    expect(result.status).toBe("disabled");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("assina e envia webhook configurado", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    const result = await dispatchLeadWebhook(baseLead, {
      env: {
        LEAD_WEBHOOK_URL: "https://crm.example.com/leads",
        LEAD_WEBHOOK_SECRET: "secret",
        NODE_ENV: "production"
      },
      fetchImpl,
      idempotencyKey: "lead-1",
      now: new Date("2026-05-23T00:01:00.000Z")
    });

    expect(result.status).toBe("sent");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [, request] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(request.headers).toMatchObject({
      "content-type": "application/json",
      "x-assistente-event": "lead.created"
    });
    expect((request.headers as Record<string, string>)["x-assistente-signature"]).toMatch(/^sha256=/);
  });

  it("registra falha apos retry simples sem lancar excecao", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null, { status: 503 }));
    const result = await dispatchLeadWebhook(baseLead, {
      env: {
        LEAD_WEBHOOK_URL: "https://crm.example.com/leads",
        NODE_ENV: "production"
      },
      fetchImpl
    });

    expect(result.status).toBe("failed");
    expect(result.attempts).toBe(2);
    expect(result.error).toBe("http_503");
  });
});
