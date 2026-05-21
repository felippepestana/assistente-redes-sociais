# Assistente de Redes Sociais

Plataforma para qualificar, estruturar e publicar presenca profissional centrada em nome proprio, com site, templates multicanal, compliance, mensuracao e governanca tecnica.

## Objetivo

- qualificar profissionais e coletar ativos de onboarding;
- gerar perfil mestre com credenciais, canais, provas e restricoes;
- publicar site profissional com SEO, paginas legais e formularios;
- exportar templates de perfis sociais por plataforma;
- medir conversoes essenciais e preparar deploy continuo.

## Stack

- Monorepo com pnpm workspaces
- Next.js App Router em `apps/web`
- Schemas e regras compartilhadas em `packages/shared`
- Supabase para Postgres e Storage
- Vercel para deploy do frontend
- GitHub Actions para CI

## Inicio Rapido

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

O app web roda em `http://localhost:3000`.

## Comandos

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Estrutura

```text
apps/web              Next.js App Router, paginas publicas e API routes
packages/shared       schemas Zod, tipos e templates sociais
docs                  questionarios, templates, compliance e operacao
supabase/migrations   schema inicial de banco e RLS
.github              CI, issues e PR template
```

## Ambientes

Crie as variaveis do `.env.example` em desenvolvimento e na Vercel. As rotas funcionam em modo degradado quando o Supabase nao esta configurado, mas a persistencia real de formularios e anexos exige `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY`.

## Criterios de Pronto

- lint, typecheck, testes e build passando;
- paginas essenciais e legais publicadas;
- formularios validando consentimento;
- templates sociais respeitando `general` e `advocacy`;
- migracao Supabase com RLS revisada;
- CI e PR draft ativos no GitHub.
