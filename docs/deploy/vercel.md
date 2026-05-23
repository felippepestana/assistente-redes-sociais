# Deploy Na Vercel

## Projeto

- Framework: Next.js
- Root directory: `apps/web`
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm --filter @assistente-redes-sociais/web build`
- Production branch: `main`
- Preview branch atual: `codex/fundacao-mvp`

## Variaveis

Configure em Preview e Production:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ASSETS_BUCKET`
- `GA_MEASUREMENT_ID`
- `GTM_CONTAINER_ID`
- `META_PIXEL_ID`
- `INTERNAL_EVENT_SECRET`
- `LEAD_WEBHOOK_URL`
- `LEAD_WEBHOOK_SECRET`

## CLI

```bash
pnpm dlx vercel login
pnpm dlx vercel link
pnpm dlx vercel env pull apps/web/.env.local
pnpm dlx vercel
```

No dashboard, selecione `apps/web` como Root Directory para o projeto do monorepo. Apos alterar variaveis na Vercel, gere
novo preview para que os valores entrem no deployment.

## Git

- `main`: producao.
- `codex/fundacao-mvp`: PR draft inicial.
- Previews devem ser criados em PRs antes de promover para producao.
