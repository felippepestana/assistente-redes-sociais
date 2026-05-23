import { createHmac, randomUUID } from "node:crypto";
import { LeadSchema, LeadWebhookPayloadSchema, type Lead, type LeadWebhookPayload } from "@assistente-redes-sociais/shared";

const WEBHOOK_PAYLOAD_VERSION = "2026-05-23";
const WEBHOOK_TIMEOUT_MS = 5000;
const WEBHOOK_MAX_ATTEMPTS = 2;

type LeadWebhookEnv = {
  LEAD_WEBHOOK_URL?: string;
  LEAD_WEBHOOK_SECRET?: string;
  NODE_ENV?: string;
};

export type LeadWebhookDeliveryResult = {
  status: "disabled" | "sent" | "failed";
  attempts: number;
  statusCode?: number;
  error?: string;
  deliveredAt?: string;
};

type DispatchLeadWebhookOptions = {
  env?: LeadWebhookEnv;
  fetchImpl?: typeof fetch;
  leadId?: string;
  createdAt?: string;
  now?: Date;
  idempotencyKey?: string;
};

export function buildLeadWebhookPayload(lead: Lead, options: DispatchLeadWebhookOptions = {}): LeadWebhookPayload {
  const parsedLead = LeadSchema.parse(lead);
  const now = options.now ?? new Date();
  const idempotencyKey = options.idempotencyKey ?? options.leadId ?? randomUUID();

  return LeadWebhookPayloadSchema.parse({
    event: "lead.created",
    version: WEBHOOK_PAYLOAD_VERSION,
    idempotencyKey,
    sentAt: now.toISOString(),
    lead: {
      id: options.leadId,
      name: parsedLead.name,
      email: parsedLead.email,
      phone: parsedLead.phone,
      message: parsedLead.message,
      source: parsedLead.source,
      channel: parsedLead.channel,
      status: parsedLead.status,
      consentPolicyVersion: parsedLead.consent.policyVersion,
      createdAt: options.createdAt
    }
  });
}

export async function dispatchLeadWebhook(
  lead: Lead,
  options: DispatchLeadWebhookOptions = {}
): Promise<LeadWebhookDeliveryResult> {
  const env = options.env ?? process.env;
  const webhookUrl = env.LEAD_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return { status: "disabled", attempts: 0 };
  }

  const url = parseWebhookUrl(webhookUrl, env.NODE_ENV);

  if (!url) {
    return { status: "failed", attempts: 0, error: "invalid_webhook_url" };
  }

  const payload = buildLeadWebhookPayload(lead, options);
  const body = JSON.stringify(payload);
  const fetcher = options.fetchImpl ?? fetch;
  let lastStatusCode: number | undefined;
  let lastError = "unknown_error";

  for (let attempt = 1; attempt <= WEBHOOK_MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

    try {
      const response = await fetcher(url.toString(), {
        method: "POST",
        headers: buildWebhookHeaders(body, env.LEAD_WEBHOOK_SECRET),
        body,
        signal: controller.signal
      });

      lastStatusCode = response.status;

      if (response.ok) {
        return {
          status: "sent",
          attempts: attempt,
          statusCode: response.status,
          deliveredAt: new Date().toISOString()
        };
      }

      lastError = `http_${response.status}`;
    } catch (error) {
      lastError = error instanceof Error && error.name === "AbortError" ? "timeout" : "request_failed";
    } finally {
      clearTimeout(timeout);
    }
  }

  return {
    status: "failed",
    attempts: WEBHOOK_MAX_ATTEMPTS,
    statusCode: lastStatusCode,
    error: lastError
  };
}

function buildWebhookHeaders(body: string, secret?: string) {
  const timestamp = new Date().toISOString();
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "user-agent": "assistente-redes-sociais/0.1",
    "x-assistente-event": "lead.created",
    "x-assistente-timestamp": timestamp
  };

  if (secret) {
    headers["x-assistente-signature"] = signWebhookBody(body, timestamp, secret);
  }

  return headers;
}

function signWebhookBody(body: string, timestamp: string, secret: string) {
  const signature = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
  return `sha256=${signature}`;
}

function parseWebhookUrl(value: string, nodeEnv?: string) {
  try {
    const url = new URL(value);
    const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);

    if (url.protocol === "https:" || (nodeEnv !== "production" && url.protocol === "http:" && isLocalhost)) {
      return url;
    }

    return null;
  } catch {
    return null;
  }
}
