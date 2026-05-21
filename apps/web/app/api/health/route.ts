import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "assistente-redes-sociais",
    timestamp: new Date().toISOString()
  });
}
