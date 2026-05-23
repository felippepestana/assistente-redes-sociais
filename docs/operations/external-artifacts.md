# Artefatos Externos Da Sprint 1

## GitHub

- Repositorio privado: https://github.com/felippepestana/assistente-redes-sociais
- Branch de implementacao: `codex/fundacao-mvp`
- PR draft: https://github.com/felippepestana/assistente-redes-sociais/pull/1
- Milestone Sprint 2: https://github.com/felippepestana/assistente-redes-sociais/milestone/1
- Issues Sprint 2: https://github.com/felippepestana/assistente-redes-sociais/issues?q=is%3Aissue%20milestone%3A%22Sprint%202%20-%20Persistencia%2C%20Deploy%20e%20Admin%22

## Notion

Artefatos criados dentro da pagina existente `Redes Sociais`:

- PRD - Assistente de Redes Sociais MVP: https://www.notion.so/367008359d9e81368166f0b92a3d4b32
- Roadmap - Assistente de Redes Sociais: https://www.notion.so/367008359d9e819386abdfc07f89d409
- Board Sprint 1 - Fundacao MVP: https://www.notion.so/367008359d9e81189a7aff68b4c8008c
- Checklist LGPD e Compliance - Assistente de Redes Sociais: https://www.notion.so/367008359d9e8163af32ce7faaf923d6

## Google Drive

Busca realizada por pasta `Assistente Redes Sociais` nao retornou resultados.

As ferramentas do Google Drive carregadas nesta sessao permitiram busca, listagem e importacao de arquivos, mas nao expuseram uma operacao de criacao de pastas. A estrutura desejada esta documentada em `docs/drive/google-drive-structure.md` para criacao quando a permissao/ferramenta de escrita estiver disponivel.

Status em 2026-05-23: ainda pendente por ausencia de ferramenta de criacao de pastas no conector disponivel.

## Vercel

- Configuracao de projeto documentada em `docs/deploy/vercel.md`.
- Headers de seguranca iniciais definidos em `apps/web/next.config.ts` via `apps/web/lib/security-headers.ts`.
- A CLI global `vercel` nao estava instalada.
- `pnpm dlx vercel --version` confirmou Vercel CLI `54.3.0`.
- `pnpm dlx vercel whoami` nao concluiu dentro do tempo limite, indicando ausencia de sessao autenticada interativa nesta maquina.
- `pnpm doctor:deploy` foi adicionado para checar pre-requisitos antes do link/deploy.

## Supabase

- Migracao inicial criada em `supabase/migrations/0001_initial_schema.sql`.
- A CLI global `supabase` nao estava instalada.
- A persistencia real depende de projeto Supabase, aplicacao da migracao e configuracao das variaveis do `.env.example`.
- `pnpm doctor:deploy` foi adicionado para apontar variaveis e comandos pendentes sem expor segredos.
