# AGENTS

## Visao do Projeto

Este repositorio implementa uma plataforma de promocao de nome profissional em redes sociais e site proprio, com foco em autoridade, compliance, qualificacao de leads e governanca.

## Objetivos do Agente

1. Priorizar seguranca, LGPD, SEO, acessibilidade e compliance setorial.
2. Manter textos de produto em pt-BR por padrao.
3. Preservar o modo `advocacy` para profissoes reguladas.
4. Nao remover consentimento, paginas legais, validacoes ou trilhas de auditoria.
5. Nunca commitar segredos ou dados reais de clientes.

## Layout

- `apps/web`: Next.js App Router, paginas publicas, formularios e API routes.
- `packages/shared`: schemas, tipos e geradores compartilhados.
- `docs`: questionarios, templates e playbooks.
- `supabase`: migracoes e politicas de banco.

## Comandos

- instalar: `pnpm install`
- desenvolvimento: `pnpm dev`
- lint: `pnpm lint`
- tipos: `pnpm typecheck`
- testes: `pnpm test`
- build: `pnpm build`

## Convencoes

- TypeScript estrito.
- Zod para contratos de entrada.
- API routes do Next.js no MVP.
- Supabase inicializado de forma lazy, nunca no escopo global.
- CTAs do modo `advocacy` devem ser sobrios, informativos e sem apelo comercial agressivo.

## Done Means

- CI local passa.
- Mudancas de schema atualizam docs e testes.
- Formularios mantem consentimento explicito.
- Alteracoes de UX preservam acessibilidade basica.
- Qualquer nova integracao externa documenta variaveis e fallback.
