#!/usr/bin/env node
import { existsSync } from "node:fs";
import { access } from "node:fs/promises";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const strictMode = process.argv.includes("--strict");

const requiredLocalFiles = [
  "apps/web/package.json",
  "apps/web/next.config.ts",
  "packages/shared/src/schemas.ts",
  "supabase/migrations/0001_initial_schema.sql",
  ".env.example",
  "docs/deploy/vercel.md",
  "docs/runbooks/supabase-setup.md",
  "docs/runbooks/google-drive-setup.md"
];

const requiredEnvNames = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_ASSETS_BUCKET"
];

const optionalEnvNames = [
  "NEXT_PUBLIC_WHATSAPP_NUMBER",
  "GA_MEASUREMENT_ID",
  "GTM_CONTAINER_ID",
  "META_PIXEL_ID",
  "INTERNAL_EVENT_SECRET",
  "LEAD_WEBHOOK_URL",
  "LEAD_WEBHOOK_SECRET"
];

const externalTokenNames = ["VERCEL_TOKEN", "SUPABASE_ACCESS_TOKEN", "SUPABASE_PROJECT_REF"];

const checks = [];

function addCheck(name, ok, detail, action) {
  checks.push({ name, ok, detail, action });
}

function commandExists(command, args = ["--version"]) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });

  return {
    ok: result.status === 0,
    output: `${result.stdout ?? ""}${result.stderr ?? ""}`.trim()
  };
}

for (const file of requiredLocalFiles) {
  addCheck(`arquivo: ${file}`, existsSync(join(root, file)), "arquivo necessario para setup/deploy", "criar ou recuperar arquivo");
}

for (const name of requiredEnvNames) {
  addCheck(`env obrigatoria: ${name}`, Boolean(process.env[name]), process.env[name] ? "configurada" : "ausente", "configurar localmente e na Vercel");
}

for (const name of optionalEnvNames) {
  addCheck(`env opcional: ${name}`, true, process.env[name] ? "configurada" : "ausente", "configurar quando a frente correspondente for ativada");
}

const gh = commandExists("gh", ["--version"]);
addCheck("GitHub CLI", gh.ok, gh.ok ? firstLine(gh.output) : "nao encontrado", "instalar e autenticar gh");

const vercel = commandExists("vercel", ["--version"]);
addCheck("Vercel CLI global", vercel.ok, vercel.ok ? firstLine(vercel.output) : "nao encontrado", "usar pnpm dlx vercel ou instalar CLI global");

const supabase = commandExists("supabase", ["--version"]);
addCheck(
  "Supabase CLI global",
  supabase.ok,
  supabase.ok ? firstLine(supabase.output) : "nao encontrado",
  "usar pnpm dlx supabase ou instalar CLI global"
);

for (const name of externalTokenNames) {
  addCheck(`token externo opcional: ${name}`, true, process.env[name] ? "configurado" : "ausente", "configurar somente em ambiente seguro");
}

const gitStatus = spawnSync("git", ["status", "--short"], {
  cwd: root,
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"]
});
addCheck(
  "git working tree",
  gitStatus.status === 0 && gitStatus.stdout.trim().length === 0,
  gitStatus.stdout.trim() ? "ha mudancas locais" : "limpo",
  "commitar ou revisar mudancas antes de deploy"
);

await access(join(root, "supabase/migrations/0001_initial_schema.sql"));

const failed = checks.filter((check) => !check.ok);

console.log("# Deployment Doctor");
console.log("");
for (const check of checks) {
  console.log(`${check.ok ? "OK" : "PENDENTE"} - ${check.name}: ${check.detail}`);
  if (!check.ok) {
    console.log(`  acao: ${check.action}`);
  }
}

console.log("");
console.log("## Proximos comandos externos");
console.log("");
console.log("Supabase:");
console.log("  pnpm dlx supabase login");
console.log("  pnpm dlx supabase link --project-ref <PROJECT_REF>");
console.log("  pnpm dlx supabase db push");
console.log("");
console.log("Vercel:");
console.log("  pnpm dlx vercel login");
console.log("  pnpm dlx vercel link");
console.log("  pnpm dlx vercel env pull apps/web/.env.local");
console.log("  pnpm dlx vercel");
console.log("");
console.log("Google Drive:");
console.log("  Criar pasta raiz e subpastas conforme docs/drive/google-drive-structure.md");
console.log("  Registrar link em docs/operations/external-artifacts.md");

if (failed.length > 0 && strictMode) {
  process.exitCode = 1;
}

function firstLine(value) {
  return value.split(/\r?\n/).find(Boolean) ?? "ok";
}
