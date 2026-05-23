# Runbook Supabase

## Objetivo

Criar o backend real de persistencia para qualificacoes, leads, eventos e anexos privados.

## Pre-requisitos

- Projeto Supabase criado.
- Acesso de owner/admin ao projeto.
- `SUPABASE_ACCESS_TOKEN` ou login interativo na CLI.
- `PROJECT_REF` do projeto Supabase.

## Passos

1. Criar o projeto no painel Supabase.
2. Copiar `Project URL` para `NEXT_PUBLIC_SUPABASE_URL`.
3. Copiar `anon public` para `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Copiar `service_role` para `SUPABASE_SERVICE_ROLE_KEY`.
5. Vincular a CLI ao projeto e aplicar migrations:

```bash
pnpm dlx supabase login
pnpm dlx supabase link --project-ref "<PROJECT_REF>"
pnpm dlx supabase db push
```

6. Conferir se a tabela `leads` contem colunas de webhook:
   - `webhook_status`
   - `webhook_attempts`
   - `webhook_attempted_at`
   - `webhook_error`
7. Confirmar que o bucket `professional-assets` esta privado.
8. Se houver CRM/atendimento, configurar `LEAD_WEBHOOK_URL` e `LEAD_WEBHOOK_SECRET` no provedor de deploy.
9. Testar `POST /api/qualification`, `POST /api/contact` e `POST /api/events`.
10. Criar pelo menos um usuario autorizado em Supabase Auth para acessar `/admin`.

## Validacao

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm doctor:deploy
```

Depois de configurar as variaveis, respostas das APIs devem retornar `storage: "supabase"` em vez de `storage: "not_configured"`.

A area `/admin` deve aceitar login com usuario do Supabase Auth e bloquear usuarios anonimos.
Detalhes do fluxo administrativo estao em `docs/runbooks/admin-setup.md`.
Detalhes do webhook de atendimento estao em `docs/runbooks/crm-webhook.md`.

## Cuidados

- A `SUPABASE_SERVICE_ROLE_KEY` deve ficar somente no servidor.
- RLS deve permanecer habilitado.
- Dados pessoais e anexos devem ser minimizados e mantidos privados.
