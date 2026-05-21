# Runbook GitHub

## Estado Atual

- Repositorio privado: `felippepestana/assistente-redes-sociais`
- Branch base: `main`
- Branch de trabalho: `codex/fundacao-mvp`
- PR draft: #1
- Milestone Sprint 2: #1

## Regras

- Usar PR para toda mudanca em `main`.
- Manter CI verde antes de merge.
- Nao commitar segredos.
- Atualizar docs quando schemas, formularios ou deploy mudarem.

## Labels Principais

- `sprint-2`
- `supabase`
- `vercel`
- `google-drive`
- `notion`
- `compliance`
- `admin`
- `analytics`
- `security`
- `blocked-external`

## Checks Obrigatorios

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
