# Politica de Seguranca

## Escopo

Este projeto ainda esta em MVP. O escopo inicial de seguranca cobre:

- formularios publicos;
- API routes do Next.js;
- variaveis de ambiente;
- Supabase Postgres e Storage;
- GitHub Actions;
- deploy Vercel.

## Relato de Vulnerabilidades

Nao publique vulnerabilidades em issues publicas. Use contato privado com o mantenedor do repositorio.

Inclua, quando possivel:

- descricao do impacto;
- passos de reproducao;
- endpoint, pagina ou arquivo afetado;
- evidencias sem expor dados pessoais ou segredos.

## Segredos

Nunca commite:

- `SUPABASE_SERVICE_ROLE_KEY`;
- tokens Vercel, GitHub ou Supabase;
- chaves de API;
- dumps de banco;
- anexos reais de clientes.

Use `.env.example` apenas para nomes de variaveis.
