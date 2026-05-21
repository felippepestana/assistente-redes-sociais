import { LeadSchema } from "@assistente-redes-sociais/shared";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = LeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
      source: parsed.data.source,
      channel: parsed.data.channel,
      status: parsed.data.status,
      consent: parsed.data.consent
    });

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 502 });
    }

    await supabase.from("analytics_events").insert({
      event_name: "contact_submit",
      source: parsed.data.source,
      metadata: { channel: parsed.data.channel }
    });
  }

  return NextResponse.json({
    ok: true,
    storage: supabase ? "supabase" : "not_configured",
    data: parsed.data
  });
}
