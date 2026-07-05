# Assistente de Redes Sociais

MVP para promoção de nome profissional em canais digitais, com foco em presença institucional, captação qualificada, governança técnica e compliance para profissões reguladas, especialmente advocacia.

## Objetivo

Transformar o planejamento inicial em uma aplicação web operacional, segura e evolutiva. A primeira versão prioriza site institucional, formulário de intake, painel administrativo básico, documentação de compliance e preparação para deploy contínuo.

## Stack definida para o MVP

- Next.js com App Router
- TypeScript
- Supabase Postgres
- Supabase Storage
- Supabase Auth no painel administrativo
- Zod para validação
- GitHub Actions para CI
- Vercel para deploy da aplicação web

## Escopo da versão 0.1

A versão 0.1 deve entregar:

- páginas institucionais essenciais;
- formulário de qualificação de lead;
- persistência dos dados no Supabase;
- estrutura inicial para anexos;
- painel administrativo básico;
- políticas legais mínimas;
- regras iniciais de compliance para publicidade jurídica;
- CI com lint, typecheck e build.

Ficam fora da versão 0.1: publicação automática em redes sociais, automações de anúncios, CRM completo, mensageria ativa e geração autônoma de conteúdo por IA.

## Estrutura do projeto

```txt
.
├── app/
│   ├── api/intake/route.ts
│   ├── admin/page.tsx
│   ├── contato/page.tsx
│   ├── privacidade/page.tsx
│   └── termos/page.tsx
├── components/
├── docs/
├── lib/
│   ├── compliance/
│   ├── supabase/
│   └── validators/
├── supabase/migrations/
└── .github/workflows/
```

## Execução local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Variáveis de ambiente

Consulte `.env.example`. Nunca versionar `.env`, `.env.local`, tokens, chaves privadas, credenciais de Supabase, chaves de OpenAI, chaves de Meta, Google ou Vercel.

## Banco de dados

A migration inicial está em `supabase/migrations/0001_initial_schema.sql`. Ela cria as tabelas centrais para perfil profissional, canais, leads, anexos e regras de compliance.

## Fluxo de trabalho

1. Criar branch a partir de `main`.
2. Implementar alteração pequena e revisável.
3. Abrir pull request.
4. Aguardar CI.
5. Revisar segurança, compliance e critérios de aceite.
6. Fazer merge somente após checks passarem.

## Segurança mínima

- Ativar 2FA na conta GitHub.
- Proteger a branch `main`.
- Ativar push protection e secret scanning.
- Configurar variáveis somente nos ambientes GitHub/Vercel/Supabase.
- Manter revisão humana antes de qualquer publicação sensível.

## Documentos principais

- `PLANEJAMENTO_SOLUCAO_NOME_PROFISSIONAL.md`
- `docs/PRD.md`
- `docs/ROADMAP.md`
- `docs/COMPLIANCE_ADVOCACIA.md`
- `docs/DEPLOY.md`
