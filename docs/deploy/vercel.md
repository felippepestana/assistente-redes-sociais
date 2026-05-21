# Deploy Na Vercel

## Projeto

- Framework: Next.js
- Root directory: `apps/web`
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm --filter @assistente-redes-sociais/web build`

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

## Git

- `main`: producao.
- `codex/fundacao-mvp`: PR draft inicial.
- Previews devem ser criados em PRs antes de promover para producao.
