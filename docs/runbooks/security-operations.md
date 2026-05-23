# Runbook De Seguranca, Backup E Monitoramento

Versao: `2026-05-23`

Este runbook cobre os controles minimos da Sprint 2 para operar o MVP com Next.js, Vercel, Supabase e GitHub privado.
Ele deve ser revisado novamente antes de publicar dados reais de clientes.

## Fontes Oficiais

- Next.js headers: https://nextjs.org/docs/app/api-reference/config/next-config-js/headers
- Vercel response headers: https://vercel.com/docs/headers/response-headers
- OWASP HTTP Headers Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
- Supabase database backups: https://supabase.com/docs/guides/platform/backups
- Supabase logical backups: https://supabase.com/docs/guides/troubleshooting/download-logical-backups

## Headers E CSP

Implementacao: `apps/web/lib/security-headers.ts` e `apps/web/next.config.ts`.

Headers ativos no MVP:

- `Content-Security-Policy`
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `X-DNS-Prefetch-Control`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- `Origin-Agent-Cluster`

Rotas `/api/*` e `/admin/*` recebem `Cache-Control: no-store, max-age=0`. Rotas `/admin/*` tambem recebem
`X-Robots-Tag: noindex, nofollow, noarchive`.

Observacao: a CSP inicial permite `'unsafe-inline'` em `script-src` e `style-src` para compatibilidade com Next.js,
JSON-LD e scripts consentidos de GA/GTM/Meta. Antes de producao critica, abrir tarefa para migrar para CSP com nonce.
`'unsafe-eval'` nao deve ser usado.

## Health Check Externo

Endpoint: `/api/health`

Resposta esperada:

- HTTP `200`
- JSON com `ok: true`
- `service: "assistente-redes-sociais"`
- `checks.app: "ok"`
- `checks.supabase: "configured"` quando Supabase estiver configurado

Configuracao recomendada do monitor:

- URL: `${NEXT_PUBLIC_SITE_URL}/api/health`
- Metodo: `GET`
- Intervalo: 5 minutos
- Timeout: 10 segundos
- Alerta: 2 falhas consecutivas
- Canais: e-mail operacional e canal interno do projeto

O health check nao deve expor segredos, tokens, URLs internas sensiveis ou detalhes de erro de dependencias.

## Backup Supabase

Politica minima:

- Confirmar plano Supabase e janela de retencao antes de entrar em producao.
- Projetos Pro tem backups diarios com retencao de 7 dias; Team, 14 dias; Enterprise, ate 30 dias, conforme documentacao
  da Supabase consultada em 2026-05-23.
- Habilitar PITR quando o RPO aceitavel for menor que 24 horas.
- Em ambiente Free ou validacao, executar export logico periodico com Supabase CLI ou `pg_dump` e manter copia fora do
  projeto.
- Testar restauracao pelo menos mensalmente ou antes de campanhas de captura relevantes.

Procedimento de backup logico:

```bash
supabase db dump --project-ref "$SUPABASE_PROJECT_REF" --file backups/profname-$(date +%Y%m%d).sql
```

Procedimento de restauracao:

- Restaurar primeiro em projeto/clonagem separada.
- Validar tabelas principais: `professional_profiles`, `qualification_submissions`, `leads`, `analytics_events`.
- Validar RLS, bucket privado e politicas de storage antes de qualquer troca de producao.
- Registrar data, operador, origem do backup e resultado em `05 Relatorios` no Google Drive.

## Storage Privado

- Bucket `professional-assets` deve permanecer privado.
- Downloads devem passar por URL assinada ou rota autenticada.
- Anexos devem usar nomes gerados no servidor, nunca caminho controlado pelo usuario.
- Revisar tipos e tamanho maximo antes de ativar uploads publicos de volume alto.

## Secrets E Acessos

Secrets controlados:

- `SUPABASE_SERVICE_ROLE_KEY`
- `INTERNAL_EVENT_SECRET`
- tokens Vercel/GitHub/Supabase usados por automacoes
- credenciais de e-mail/CRM quando forem adicionadas

Regras:

- Nunca commitar `.env`, `.env.local`, dumps ou arquivos de credenciais.
- Usar GitHub secret scanning e Dependabot alerts.
- Exigir 2FA em GitHub, Vercel, Supabase, Google e Notion.
- Rotacionar `SUPABASE_SERVICE_ROLE_KEY` apos vazamento, troca de fornecedor, desligamento de pessoa com acesso ou a cada
  90 dias em producao.
- Revisar acessos administrativos mensalmente.

## Resposta A Incidente

1. Pausar campanhas e formularios se houver vazamento de lead ou anexo.
2. Revogar/rotacionar secrets afetados.
3. Revisar logs Vercel, Supabase Auth, Storage e banco.
4. Exportar evidencia minima sem dados desnecessarios.
5. Restaurar backup em ambiente isolado se houver corrupcao de dados.
6. Registrar causa, impacto, titulares possivelmente afetados e correcao aplicada.

## Checklist De Pronto Para Producao

- [x] Headers globais configurados no app.
- [x] API/admin sem cache compartilhado.
- [x] Health check publico sem segredos.
- [ ] Monitor externo configurado e testado.
- [ ] Supabase backup/PITR confirmado conforme plano.
- [ ] Restore drill executado.
- [ ] Bucket privado validado com upload e download controlado.
- [ ] 2FA confirmado em todas as plataformas.
- [ ] Secrets registrados apenas em provedores autorizados.
- [ ] Rotacao inicial de secrets documentada.
