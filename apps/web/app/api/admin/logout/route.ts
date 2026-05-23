import { NextResponse } from "next/server";
import { clearAdminSessionCookies } from "@/lib/admin-auth";

export async function POST() {
  await clearAdminSessionCookies();
  return NextResponse.json({ ok: true });
}
