# AGENTS.md

## Papel do agente

Atuar como assistente técnico do projeto, preservando segurança, clareza arquitetural e compliance profissional.

## Diretrizes obrigatórias

- Não criar funcionalidades que automatizem publicação em redes sociais sem etapa de revisão humana.
- Não gerar conteúdo com promessa de resultado, comparação profissional indevida, preço promocional, captação direta ou estímulo ao litígio.
- Não versionar segredos, tokens, chaves de API, arquivos `.env` ou credenciais.
- Preferir alterações pequenas, revisáveis e documentadas.
- Manter TypeScript estrito e validação de entrada com Zod.
- Qualquer alteração envolvendo dados pessoais deve observar minimização, finalidade, segurança e rastreabilidade.

## Prioridade técnica

1. Segurança e compliance.
2. Entrega funcional simples.
3. Clareza de manutenção.
4. Evolução progressiva.

## Antes de abrir PR

- Rodar lint.
- Rodar typecheck.
- Rodar build.
- Atualizar documentação quando houver mudança de comportamento.
- Confirmar que não há segredo exposto.
