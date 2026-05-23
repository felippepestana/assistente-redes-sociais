create extension if not exists pgcrypto;

do $$
begin
  create type compliance_mode as enum ('general', 'advocacy');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type profile_status as enum ('draft', 'qualified', 'published');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type channel as enum ('site', 'instagram', 'facebook', 'whatsapp', 'google_business', 'youtube', 'linkedin', 'tiktok');
exception
  when duplicate_object then null;
end $$;

create table if not exists professional_profiles (
  id uuid primary key default gen_random_uuid(),
  professional_name text not null,
  profession text not null,
  registration text,
  city text,
  state text,
  bio text,
  credentials text[] not null default '{}',
  services text[] not null default '{}',
  channels channel[] not null default '{site}',
  links jsonb not null default '{}',
  compliance_mode compliance_mode not null default 'general',
  status profile_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists qualification_submissions (
  id uuid primary key default gen_random_uuid(),
  professional_profile_id uuid references professional_profiles(id) on delete set null,
  professional_name text not null,
  profession text not null,
  city text,
  state text,
  target_audience text not null,
  services text[] not null default '{}',
  channels channel[] not null default '{site}',
  compliance_mode compliance_mode not null default 'general',
  consent jsonb not null,
  attachment_paths text[] not null default '{}',
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  source text not null default 'site',
  channel channel not null default 'site',
  status text not null default 'new',
  consent jsonb not null,
  webhook_status text not null default 'disabled' check (webhook_status in ('disabled', 'sent', 'failed')),
  webhook_attempts integer not null default 0,
  webhook_attempted_at timestamptz,
  webhook_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  source text not null default 'site',
  path text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists qualification_submissions_created_at_idx on qualification_submissions (created_at desc);
create index if not exists leads_status_created_at_idx on leads (status, created_at desc);
create index if not exists analytics_events_event_created_at_idx on analytics_events (event_name, created_at desc);

alter table professional_profiles enable row level security;
alter table qualification_submissions enable row level security;
alter table leads enable row level security;
alter table analytics_events enable row level security;

drop policy if exists "Public intake insert with consent" on qualification_submissions;
create policy "Public intake insert with consent"
  on qualification_submissions
  for insert
  to anon
  with check ((consent ->> 'accepted')::boolean = true);

drop policy if exists "Public lead insert with consent" on leads;
create policy "Public lead insert with consent"
  on leads
  for insert
  to anon
  with check ((consent ->> 'accepted')::boolean = true);

drop policy if exists "Public event insert" on analytics_events;
create policy "Public event insert"
  on analytics_events
  for insert
  to anon
  with check (true);

insert into storage.buckets (id, name, public)
values ('professional-assets', 'professional-assets', false)
on conflict (id) do nothing;
