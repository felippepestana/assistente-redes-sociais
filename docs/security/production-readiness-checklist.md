# Checklist De Seguranca Para Producao

Versao: `2026-05-23`

## Aplicacao

- [x] `X-Powered-By` desativado em `next.config.ts`.
- [x] CSP inicial configurada.
- [x] `X-Content-Type-Options: nosniff`.
- [x] `X-Frame-Options: DENY` e `frame-ancestors 'none'`.
- [x] `Referrer-Policy: strict-origin-when-cross-origin`.
- [x] `Permissions-Policy` restritiva.
- [x] Rotas `/api/*` com `Cache-Control: no-store`.
- [x] Rotas `/admin/*` com `Cache-Control: no-store` e `X-Robots-Tag`.
- [ ] Migrar CSP de `'unsafe-inline'` para nonce antes de producao critica.
- [ ] Definir HSTS no provedor somente apos dominio final, HTTPS e subdominios estarem validados.

## Autenticacao E Admin

- [x] Cookies admin `HttpOnly`, `SameSite=Lax`, `Secure` em producao e `maxAge` curto.
- [x] Admin depende de Supabase Auth server-side.
- [ ] Ativar 2FA do usuario administrador no Supabase/GitHub/Vercel.
- [ ] Definir rate limit externo para `/api/admin/login`.
- [ ] Revisar roles e permissao de leitura das tabelas administrativas.

## Dados E LGPD

- [x] Consentimento registra versao da politica.
- [x] Formulario exige aceite antes do envio.
- [x] Storage planejado como privado.
- [ ] Definir retencao e descarte de leads/anexos.
- [ ] Confirmar controlador, operador e canal de privacidade.

## Backup E Recuperacao

- [ ] Confirmar plano Supabase e janela de backup.
- [ ] Habilitar PITR se RPO exigir recuperacao inferior a 24 horas.
- [ ] Executar dump logico inicial.
- [ ] Executar restore drill em projeto separado.
- [ ] Registrar restore drill em Google Drive `05 Relatorios`.

## Monitoramento

- [x] `/api/health` retorna payload seguro para monitor externo.
- [ ] Configurar monitor externo a cada 5 minutos.
- [ ] Configurar alertas para 2 falhas consecutivas.
- [ ] Revisar logs Vercel apos cada deploy de producao.
- [ ] Registrar incidentes e acoes corretivas.
