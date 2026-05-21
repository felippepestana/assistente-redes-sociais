# Runbook Supabase

## Objetivo

Criar o backend real de persistencia para qualificacoes, leads, eventos e anexos privados.

## Pre-requisitos

- Projeto Supabase criado.
- Acesso de owner/admin ao projeto.
- `SUPABASE_ACCESS_TOKEN` ou login interativo na CLI.

## Passos

1. Criar o projeto no painel Supabase.
2. Copiar `Project URL` para `NEXT_PUBLIC_SUPABASE_URL`.
3. Copiar `anon public` para `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Copiar `service_role` para `SUPABASE_SERVICE_ROLE_KEY`.
5. Aplicar `supabase/migrations/0001_initial_schema.sql`.
6. Confirmar que o bucket `professional-assets` esta privado.
7. Testar `POST /api/qualification`, `POST /api/contact` e `POST /api/events`.

## Validacao

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Depois de configurar as variaveis, respostas das APIs devem retornar `storage: "supabase"` em vez de `storage: "not_configured"`.

## Cuidados

- A `SUPABASE_SERVICE_ROLE_KEY` deve ficar somente no servidor.
- RLS deve permanecer habilitado.
- Dados pessoais e anexos devem ser minimizados e mantidos privados.
