# Contribuindo

## Fluxo

1. Abra ou selecione uma issue.
2. Crie uma branch `feat/...`, `fix/...` ou `codex/...`.
3. Implemente com commits pequenos.
4. Rode `pnpm lint`, `pnpm typecheck`, `pnpm test` e `pnpm build`.
5. Abra um PR com contexto, impacto e checklist.

## Padroes

- Produto em pt-BR.
- TypeScript estrito.
- Zod para schemas compartilhados.
- Sem segredos em codigo, docs ou fixtures.
- Mudancas em formularios devem atualizar schema, docs e testes.

## Checklist Antes Do PR

- [ ] lint sem erros
- [ ] typecheck sem erros
- [ ] testes passando
- [ ] build passando
- [ ] impacto em analytics revisado
- [ ] impacto em privacidade/compliance revisado
