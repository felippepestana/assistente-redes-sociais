# Runbook Admin

## Objetivo

Operar a primeira area administrativa do MVP em `/admin`.

## Fluxo De Autenticacao

- Login em `/admin/login`.
- Credenciais validadas por Supabase Auth via `POST /api/admin/login`.
- Sessao armazenada em cookies `httpOnly`.
- Rotas dentro de `/admin` exigem usuario autenticado validado no servidor.
- Logout via `POST /api/admin/logout`.

## Configuracao Necessaria

1. Configurar Supabase conforme `docs/runbooks/supabase-setup.md`.
2. Criar ao menos um usuario no Supabase Auth.
3. Garantir que `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` estejam configuradas.
4. Acessar `/admin/login`.

## Telas

- `/admin`: readiness de variaveis e contadores.
- `/admin/qualificacoes`: ultimas qualificacoes.
- `/admin/leads`: ultimos leads.

## Seguranca

- Valores de variaveis nunca sao exibidos.
- A service role fica apenas no servidor.
- Sem Supabase configurado, login retorna erro operacional e dados administrativos nao sao exibidos.
