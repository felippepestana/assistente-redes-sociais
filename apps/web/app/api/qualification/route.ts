import { AnalyticsEventSchema, QualificationSubmissionSchema } from "@assistente-redes-sociais/shared";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAssetsBucketName, getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const parsed = await parseQualificationRequest(request);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const uploadedPaths: string[] = [];

  if (supabase && parsed.files.length > 0) {
    for (const file of parsed.files) {
      const storagePath = `qualification/${crypto.randomUUID()}-${safeFileName(file.name)}`;
      const { error } = await supabase.storage.from(getAssetsBucketName()).upload(storagePath, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false
      });

      if (error) {
        return NextResponse.json({ ok: false, message: error.message }, { status: 502 });
      }

      uploadedPaths.push(storagePath);
    }
  }

  const submission = {
    ...parsed.data,
    attachments: parsed.data.attachments.map((attachment, index) => ({
      ...attachment,
      storagePath: uploadedPaths[index]
    }))
  };

  if (supabase) {
    const { error } = await supabase.from("qualification_submissions").insert({
      professional_name: submission.professionalName,
      profession: submission.profession,
      city: submission.city,
      state: submission.state,
      target_audience: submission.targetAudience,
      services: submission.services,
      channels: submission.channels,
      compliance_mode: submission.complianceMode,
      consent: submission.consent,
      attachment_paths: uploadedPaths,
      payload: submission
    });

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 502 });
    }

    await supabase.from("analytics_events").insert({
      event_name: "qualification_submit",
      source: "site",
      metadata: AnalyticsEventSchema.parse({
        eventName: "qualification_submit",
        source: "site",
        metadata: { channels: submission.channels, complianceMode: submission.complianceMode }
      }).metadata
    });
  }

  return NextResponse.json({
    ok: true,
    storage: supabase ? "supabase" : "not_configured",
    uploadedPaths,
    data: submission
  });
}

async function parseQualificationRequest(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const files = formData.getAll("attachments").filter((value): value is File => value instanceof File && value.size > 0);
    const raw = {
      professionalName: getString(formData, "professionalName"),
      profession: getString(formData, "profession"),
      registration: getOptionalString(formData, "registration"),
      city: getOptionalString(formData, "city"),
      state: getOptionalString(formData, "state"),
      targetAudience: getString(formData, "targetAudience"),
      services: splitList(getString(formData, "services")),
      channels: formData.getAll("channels").map(String),
      complianceMode: getString(formData, "complianceMode") || "general",
      positioningNotes: getOptionalString(formData, "positioningNotes"),
      consent: {
        accepted: formData.get("consent") === "true",
        acceptedAt: new Date().toISOString()
      },
      attachments: files.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size
      }))
    };

    return { ...QualificationSubmissionSchema.safeParse(raw), files };
  }

  const body = await request.json();
  return { ...QualificationSubmissionSchema.safeParse(body), files: [] };
}

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key).trim();
  return value.length > 0 ? value : undefined;
}

function splitList(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 120);
}

export type QualificationRouteError = z.inferFlattenedErrors<typeof QualificationSubmissionSchema>;
