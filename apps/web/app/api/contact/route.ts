import { LeadSchema } from "@assistente-redes-sociais/shared";
import { NextResponse } from "next/server";
import { dispatchLeadWebhook } from "@/lib/lead-webhook";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = LeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  let webhook:
    | Awaited<ReturnType<typeof dispatchLeadWebhook>>
    | { status: "skipped_no_storage"; attempts: 0; error: "supabase_not_configured" } = {
    status: "disabled",
    attempts: 0
  };

  if (supabase) {
    const { data: leadRecord, error } = await supabase
      .from("leads")
      .insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        message: parsed.data.message,
        source: parsed.data.source,
        channel: parsed.data.channel,
        status: parsed.data.status,
        consent: parsed.data.consent
      })
      .select("id, created_at")
      .single();

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 502 });
    }

    webhook = await dispatchLeadWebhook(parsed.data, {
      leadId: leadRecord?.id,
      createdAt: leadRecord?.created_at
    });

    if (leadRecord?.id && webhook.status !== "disabled") {
      await supabase
        .from("leads")
        .update({
          webhook_status: webhook.status,
          webhook_attempts: webhook.attempts,
          webhook_attempted_at: new Date().toISOString(),
          webhook_error: webhook.status === "failed" ? webhook.error : null
        })
        .eq("id", leadRecord.id);
    }

    await supabase.from("analytics_events").insert({
      event_name: "contact_submit",
      source: parsed.data.source,
      metadata: { channel: parsed.data.channel, webhookStatus: webhook.status }
    });

    if (webhook.status === "sent" || webhook.status === "failed") {
      await supabase.from("analytics_events").insert({
        event_name: webhook.status === "sent" ? "lead_webhook_sent" : "lead_webhook_failed",
        source: parsed.data.source,
        metadata: {
          channel: parsed.data.channel,
          attempts: webhook.attempts,
          statusCode: webhook.statusCode,
          error: webhook.status === "failed" ? webhook.error : undefined
        }
      });
    }
  } else if (process.env.LEAD_WEBHOOK_URL) {
    webhook = { status: "skipped_no_storage", attempts: 0, error: "supabase_not_configured" };
  }

  return NextResponse.json({
    ok: true,
    storage: supabase ? "supabase" : "not_configured",
    webhook: {
      status: webhook.status,
      attempts: webhook.attempts
    },
    data: parsed.data
  });
}
