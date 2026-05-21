# Runbook Vercel

## Objetivo

Conectar o repositorio privado ao Vercel e publicar previews por PR.

## Pre-requisitos

- Acesso ao repositorio `felippepestana/assistente-redes-sociais`.
- Conta Vercel autenticada.
- Projeto Supabase ou variaveis temporarias vazias para preview sem persistencia.

## Configuracao Do Projeto

- Framework: Next.js
- Root directory: `apps/web`
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm --filter @assistente-redes-sociais/web build`

## Variaveis

Configurar em Preview e Production:

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

## Validacao

1. Abrir preview do PR.
2. Validar `/api/health`.
3. Validar homepage e `/contato`.
4. Testar formulario de contato.
5. Confirmar que segredos nao aparecem no bundle cliente.

## Observacao

Sem login/token Vercel disponivel, o projeto fica pronto no codigo, mas a vinculacao remota precisa ser feita no painel ou por CLI autenticada.
