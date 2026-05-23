import { NextResponse } from "next/server";
import { z } from "zod";
import { setAdminSessionCookies } from "@/lib/admin-auth";
import { getSupabasePublic } from "@/lib/supabase";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = LoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = getSupabasePublic();

  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        message: "Supabase Auth ainda nao esta configurado."
      },
      { status: 503 }
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error || !data.session) {
    return NextResponse.json({ ok: false, message: "Credenciais invalidas." }, { status: 401 });
  }

  await setAdminSessionCookies(data.session.access_token, data.session.refresh_token);

  return NextResponse.json({ ok: true });
}
