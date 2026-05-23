# Runbook De Webhook CRM E Atendimento

Versao: `2026-05-23`

## Objetivo

Permitir que leads enviados pelo formulario de contato sejam roteados para CRM, automacao ou fila de atendimento sem
acoplar o MVP a um fornecedor especifico.

## Variaveis

```env
LEAD_WEBHOOK_URL=
LEAD_WEBHOOK_SECRET=
```

- `LEAD_WEBHOOK_URL`: destino HTTPS que recebera o lead.
- `LEAD_WEBHOOK_SECRET`: segredo opcional usado para assinar o corpo via HMAC SHA-256.

Em producao, `LEAD_WEBHOOK_URL` deve usar `https://`. URLs `http://localhost` sao aceitas apenas para desenvolvimento.

## Contrato

Metodo: `POST`

Headers:

- `content-type: application/json`
- `user-agent: assistente-redes-sociais/0.1`
- `x-assistente-event: lead.created`
- `x-assistente-timestamp: <ISO datetime>`
- `x-assistente-signature: sha256=<hmac>` quando `LEAD_WEBHOOK_SECRET` estiver configurado

Payload:

```json
{
  "event": "lead.created",
  "version": "2026-05-23",
  "idempotencyKey": "uuid-ou-id-do-lead",
  "sentAt": "2026-05-23T00:00:00.000Z",
  "lead": {
    "id": "uuid-do-lead",
    "name": "Nome",
    "email": "lead@example.com",
    "phone": "5592999999999",
    "message": "Mensagem enviada no formulario",
    "source": "site",
    "channel": "site",
    "status": "new",
    "consentPolicyVersion": "2026-05-23",
    "createdAt": "2026-05-23T00:00:00.000Z"
  }
}
```

O payload nao inclui anexos, caminhos de storage, documentos, chaves internas nem consentimento completo.

## Fluxo

1. `/api/contact` valida o lead com `LeadSchema`.
2. Se Supabase estiver configurado, o lead e salvo primeiro na tabela `leads`.
3. Depois do salvamento, o webhook e disparado quando `LEAD_WEBHOOK_URL` existir.
4. Falha no webhook nao apaga nem rejeita o lead salvo.
5. O status de entrega e gravado em `leads.webhook_status`, `webhook_attempts`, `webhook_attempted_at` e `webhook_error`.
6. Eventos `lead_webhook_sent` ou `lead_webhook_failed` sao registrados em `analytics_events`.

## Retry

O MVP faz ate 2 tentativas por envio, com timeout de 5 segundos por tentativa. Isso e intencionalmente simples para nao
transformar a API route em fila. Para escala, mover o envio para fila/worker ou provider de workflow.

## Validacao Do Recebedor

O recebedor deve:

- validar `x-assistente-event`;
- validar `x-assistente-timestamp` com tolerancia curta;
- recalcular `sha256=<hmac>` de `<timestamp>.<body>` usando `LEAD_WEBHOOK_SECRET`;
- usar `idempotencyKey` para evitar duplicidade;
- responder `2xx` somente depois de aceitar o lead.

## SLA De Atendimento

- Primeira resposta: ate 15 minutos em horario comercial.
- Fora do horario comercial: resposta no primeiro bloco util seguinte.
- Lead com modo advocacy: resposta sobria, sem promessa de resultado e sem urgencia comercial.
- Tentativa de contato: registrar pelo menos 3 tentativas em 48 horas antes de arquivar.
- Falha de webhook: revisar painel/admin e logs no mesmo dia util.

## Criterios Para Escolha De CRM

- Webhook inbound com HTTPS.
- Campo de idempotencia ou deduplicacao.
- Registro de origem/canal/UTM.
- Controle de permissao por usuario.
- Exportacao de dados e politica de retencao compativeis com LGPD.
- Capacidade de registrar SLA e status do atendimento.
