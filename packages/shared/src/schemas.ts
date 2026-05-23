import { z } from "zod";
import { CURRENT_POLICY_VERSION } from "./compliance";

export const ComplianceModeSchema = z.enum(["general", "advocacy"]);
export type ComplianceMode = z.infer<typeof ComplianceModeSchema>;

export const ChannelSchema = z.enum([
  "site",
  "instagram",
  "facebook",
  "whatsapp",
  "google_business",
  "youtube",
  "linkedin",
  "tiktok"
]);
export type Channel = z.infer<typeof ChannelSchema>;

export const ProfileStatusSchema = z.enum(["draft", "qualified", "published"]);
export type ProfileStatus = z.infer<typeof ProfileStatusSchema>;

export const ConsentSchema = z.object({
  accepted: z.literal(true),
  policyVersion: z.string().default(CURRENT_POLICY_VERSION),
  acceptedAt: z.string().datetime().optional()
});
export type Consent = z.infer<typeof ConsentSchema>;

export const AttachmentMetadataSchema = z.object({
  name: z.string().min(1),
  type: z.string().optional(),
  size: z.number().int().nonnegative().optional(),
  storagePath: z.string().optional()
});
export type AttachmentMetadata = z.infer<typeof AttachmentMetadataSchema>;

export const ProfessionalProfileSchema = z.object({
  id: z.string().uuid().optional(),
  professionalName: z.string().min(3),
  profession: z.string().min(2),
  registration: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  bio: z.string().max(1000).optional(),
  credentials: z.array(z.string().min(2)).default([]),
  services: z.array(z.string().min(2)).default([]),
  channels: z.array(ChannelSchema).default(["site"]),
  links: z.record(z.string(), z.string().url()).default({}),
  complianceMode: ComplianceModeSchema.default("general"),
  status: ProfileStatusSchema.default("draft")
});
export type ProfessionalProfile = z.infer<typeof ProfessionalProfileSchema>;

export const QualificationSubmissionSchema = z.object({
  professionalName: z.string().min(3),
  profession: z.string().min(2),
  registration: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  targetAudience: z.string().min(3),
  services: z.array(z.string().min(2)).min(1),
  channels: z.array(ChannelSchema).min(1),
  complianceMode: ComplianceModeSchema.default("general"),
  positioningNotes: z.string().optional(),
  consent: ConsentSchema,
  attachments: z.array(AttachmentMetadataSchema).default([])
});
export type QualificationSubmission = z.infer<typeof QualificationSubmissionSchema>;

export const LeadStatusSchema = z.enum(["new", "in_review", "contacted", "qualified", "archived"]);
export type LeadStatus = z.infer<typeof LeadStatusSchema>;

export const LeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  source: z.string().default("site"),
  channel: ChannelSchema.default("site"),
  consent: ConsentSchema,
  status: LeadStatusSchema.default("new")
});
export type Lead = z.infer<typeof LeadSchema>;

export const LeadWebhookPayloadSchema = z.object({
  event: z.literal("lead.created"),
  version: z.literal("2026-05-23"),
  idempotencyKey: z.string().min(1),
  sentAt: z.string().datetime(),
  lead: z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    message: z.string().min(10),
    source: z.string(),
    channel: ChannelSchema,
    status: LeadStatusSchema,
    consentPolicyVersion: z.string(),
    createdAt: z.string().datetime().optional()
  })
});
export type LeadWebhookPayload = z.infer<typeof LeadWebhookPayloadSchema>;

export const AnalyticsEventSchema = z.object({
  eventName: z.enum([
    "page_view",
    "whatsapp_click",
    "qualification_submit",
    "contact_submit",
    "lead_webhook_sent",
    "lead_webhook_failed"
  ]),
  source: z.string().default("site"),
  path: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).default({})
});
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;
