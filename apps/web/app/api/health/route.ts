import { buildHealthPayload } from "@/lib/health";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(buildHealthPayload(), {
    headers: {
      "Cache-Control": "no-store, max-age=0"
    }
  });
}
