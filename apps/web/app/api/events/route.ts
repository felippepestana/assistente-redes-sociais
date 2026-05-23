import { AnalyticsEventSchema } from "@assistente-redes-sociais/shared";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = AnalyticsEventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { error } = await supabase.from("analytics_events").insert({
      event_name: parsed.data.eventName,
      source: parsed.data.source,
      path: parsed.data.path,
      metadata: parsed.data.metadata
    });

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true, storage: supabase ? "supabase" : "not_configured" });
}
