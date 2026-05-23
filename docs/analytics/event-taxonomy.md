# Taxonomia De Eventos

## Eventos Proprietarios

| Evento | Quando dispara | Origem | Consentimento |
|---|---|---|---|
| `page_view` | Visualizacao de pagina quando analytics estiver habilitado | GA4/GTM/Meta | nao essencial |
| `whatsapp_click` | Clique no link de WhatsApp | `/api/events` | operacional |
| `qualification_submit` | Envio validado do formulario de qualificacao | `/api/qualification` | operacional |
| `contact_submit` | Envio validado do formulario de contato | `/api/contact` | operacional |
| `lead_webhook_sent` | Webhook opcional de lead aceito pelo destino | `/api/contact` | operacional |
| `lead_webhook_failed` | Webhook opcional de lead falhou apos retry simples | `/api/contact` | operacional |

## Regras

- GA4, GTM e Meta Pixel so podem carregar apos consentimento de analytics.
- Eventos operacionais usados para seguranca, auditoria basica e atendimento podem ser enviados sem carregar scripts de terceiros.
- Payloads nao devem incluir anexos, documentos sensiveis ou segredos.
- Dados pessoais devem ser limitados ao necessario para qualificacao e resposta.

## Chaves De Metadata

- `source`: origem declarada do fluxo, inicialmente `site`.
- `path`: caminho da pagina quando aplicavel.
- `channel`: canal relacionado ao lead ou evento.
- `complianceMode`: `general` ou `advocacy` quando aplicavel.
- `webhookStatus`: `disabled`, `sent`, `failed` ou `skipped_no_storage`.
- `attempts`: numero de tentativas feitas para webhook de lead.

## Preferencia De Cookies

A preferencia fica no navegador em `assistente-redes-sociais.cookie-consent`, com:

- `analytics`: booleano.
- `version`: versao da politica.
- `updatedAt`: data ISO da escolha.
