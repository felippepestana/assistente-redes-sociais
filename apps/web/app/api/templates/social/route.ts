import { ProfessionalProfileSchema, buildSocialProfileTemplates } from "@assistente-redes-sociais/shared";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const demoProfile = ProfessionalProfileSchema.parse({
  professionalName: "NOME PROFISSIONAL",
  profession: "Profissional",
  city: "Manaus",
  state: "AM",
  services: ["consultoria", "conteudo de autoridade"],
  channels: ["site", "instagram", "facebook", "whatsapp", "google_business", "youtube", "linkedin", "tiktok"],
  complianceMode: "advocacy"
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const profileId = url.searchParams.get("profileId");
  const supabase = getSupabaseAdmin();

  if (profileId && supabase) {
    const { data, error } = await supabase.from("professional_profiles").select("*").eq("id", profileId).single();

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 404 });
    }

    const profile = ProfessionalProfileSchema.parse({
      id: data.id,
      professionalName: data.professional_name,
      profession: data.profession,
      registration: data.registration,
      city: data.city,
      state: data.state,
      bio: data.bio,
      credentials: data.credentials ?? [],
      services: data.services ?? [],
      channels: data.channels ?? ["site"],
      links: data.links ?? {},
      complianceMode: data.compliance_mode,
      status: data.status
    });

    return NextResponse.json({
      ok: true,
      source: "supabase",
      templates: buildSocialProfileTemplates(profile)
    });
  }

  return NextResponse.json({
    ok: true,
    source: "demo",
    templates: buildSocialProfileTemplates(demoProfile)
  });
}
