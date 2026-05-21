# Planejamento da Solução — Promoção de Nome Profissional

## 1) Objetivo
Estruturar um plano de implementação para uma plataforma de promoção de **nome profissional** com:
- presença multicanal (site + redes),
- operação orientada a compliance (incluindo modo advocacia),
- captura e qualificação de leads,
- governança técnica (repositório, CI/CD, segurança, métricas),
- automação gradual com integrações oficiais.

---

## 2) Escopo inicial (MVP)

### 2.1 Entregáveis obrigatórios (Must)
1. **Base institucional**
   - Site profissional com páginas essenciais (Home, Sobre, Atuação/Serviços, Publicações, FAQ, Contato, Privacidade, Cookies, Termos).
   - SEO técnico inicial + dados estruturados básicos.
2. **Intake e qualificação**
   - Formulário de qualificação com anexos.
   - Dossiê único do profissional (identidade, credenciais, posicionamento, canais, restrições de compliance).
3. **Templates multicanal**
   - Templates por plataforma (Meta, Google, YouTube, LinkedIn, TikTok, WhatsApp Business).
4. **Mensuração e conversão**
   - Eventos mínimos: page view, clique WhatsApp, envio formulário, origem de tráfego.
5. **Governança mínima**
   - Repositório GitHub com CI,
   - deploy automatizado,
   - 2FA,
   - backups,
   - cabeçalhos de segurança,
   - política de privacidade e cookies.

### 2.2 Entregáveis recomendados (Should)
- Workflow editorial (rascunho → revisão → publicação).
- Integração CRM e status de atendimento.
- Biblioteca de provas de autoridade (publicações, mídia, depoimentos autorizados).

### 2.3 Evoluções (Could/Later)
- Sugestão de pauta assistida por IA.
- Geração de rascunhos para anúncios e UTMs.
- Conectores API completos para sincronização bidirecional.

---

## 3) Arquitetura proposta

### 3.1 Stack recomendada
- **Frontend**: Next.js (App Router)
- **API**: Node.js (Fastify ou Nest)
- **Banco**: PostgreSQL (Supabase opcional)
- **Storage**: bucket para mídia/documentos
- **Auth/Admin**: RBAC + 2FA
- **Infra/deploy**: Vercel (web) + Render/Fly/Cloud Run (API) + Supabase/Neon (DB)

### 3.2 Módulos funcionais
1. **Core de Perfil Profissional**
   - cadastro mestre (nome, bio, credenciais, provas, canais, compliance mode)
2. **Motor de Compliance**
   - regras de linguagem/CTA por segmento (general vs advocacy)
3. **Gerador de Templates**
   - exportação de checklist + copy-base por canal
4. **CMS/Conteúdo**
   - artigos, FAQs, notícias, mídia
5. **Conversão**
   - formulários, WhatsApp click-to-chat, roteamento para CRM
6. **Analytics & Atribuição**
   - GA4/GTM + eventos proprietários
7. **Governança e Segurança**
   - auditoria, logs, backup, hardening

---

## 4) Mapeamento de conectores, MCPs, APIs e serviços

## 4.1 Conectores/MCPs já disponibilizados para operação

| Conector/MCP | Papel no projeto | Fase principal |
|---|---|---|
| **GitHub (plugin)** | criar repositório, issues, PRs, gestão de roadmap e CI | Fundacional + contínua |
| **Vercel (plugin)** | deploy do frontend, previews por PR, variáveis de ambiente | Fundacional + contínua |
| **Notion (plugin)** | PRD, backlog, cronograma, playbooks operacionais e compliance checklists | Planejamento + operação |
| **Google Drive (plugin)** | central de ativos (briefings, documentos, credenciais, mídia aprovada) | Descoberta + operação |

## 4.2 APIs/plataformas de produto (prioridade por fase)

| Plataforma | API/Serviço | Uso no MVP | Observações |
|---|---|---|---|
| Google | GA4 Data/Measurement + GTM | evento e mensuração | Must |
| Google | Business Profile (manual no MVP, API depois) | gestão de presença local | Later para sincronização |
| Meta | Instagram/Facebook/Ads/WhatsApp assets | operação de perfil + mídia + mensagens | início manual guiado |
| WhatsApp | Business App/Platform | canal de conversão principal | API completa no pós-MVP |
| LinkedIn | perfil profissional (operação assistida) | autoridade B2B | automação limitada por políticas |
| YouTube | canal e biblioteca de conteúdo | prova de autoridade em vídeo | publicação inicial manual |
| TikTok | Business Center + Suite | descoberta por vídeo curto | maturidade após base pronta |

## 4.3 Serviços técnicos auxiliares

| Domínio | Serviço recomendado | Finalidade |
|---|---|---|
| Banco | Supabase/Neon/Postgres gerenciado | dados centrais da solução |
| Storage | Supabase Storage/S3 | uploads de documentação e mídia |
| E-mail transacional | Resend/SendGrid | notificações e confirmação de lead |
| Observabilidade | Sentry + logs centralizados | erros, alertas e rastreio |
| Monitoramento | Uptime/health checks | disponibilidade |
| Segurança | WAF/CDN (Cloudflare opcional) | proteção básica |

---

## 5) Fases de execução

### Fase 0 — Kickoff e governança (Semana 1)
- Definir escopo, personas, segmentos e compliance mode.
- Abrir repositório GitHub com padrões:
  - `README`, `AGENTS.md`, templates de issue/PR, workflow CI.
- Definir ambientes (dev/staging/prod), owners e matriz de acesso.

### Fase 1 — Fundação técnica e institucional (Semanas 1–2)
- Provisionar frontend, API e banco.
- Entregar arquitetura de páginas essenciais no site.
- Implementar políticas legais e consentimento de cookies.
- Configurar deploy contínuo via Vercel + CI GitHub.

### Fase 2 — Intake, perfil mestre e compliance (Semanas 2–4)
- Formulário de qualificação com upload.
- Modelo de dados do perfil profissional.
- Regras iniciais do motor de compliance (general/advocacy).
- Geração de checklist e copies-base por plataforma.

### Fase 3 — Conversão e mensuração (Semanas 4–6)
- Eventos GA4/GTM + taxonomia de eventos.
- CTA WhatsApp, formulário de contato e roteamento para CRM.
- Dashboard executivo inicial (tráfego, leads, resposta, origem).

### Fase 4 — Operação recorrente (Semanas 6–8)
- Rotina editorial mensal.
- Publicação multicanal assistida por templates.
- Otimização contínua de páginas/conteúdo/conversão.

### Fase 5 — Escala e automações API (pós-MVP)
- Integrações API por plataforma conforme viabilidade/política.
- Automatizações de atualização de perfil, campanhas e relatórios.
- Reforço de segurança/compliance e auditoria contínua.

---

## 6) Backlog técnico inicial

## Epic A — Plataforma base
- A1: monorepo (`apps/web`, `apps/api`, `packages/shared`)
- A2: autenticação admin + RBAC
- A3: modelo de dados (perfil, ativos, credenciais, canal, lead)
- A4: infraestrutura e ambientes

## Epic B — Site profissional
- B1: layout institucional e componentes
- B2: páginas legais e consentimento
- B3: SEO técnico e schema básico
- B4: acessibilidade mínima dos formulários

## Epic C — Qualificação e compliance
- C1: questionário dinâmico + upload
- C2: parser/normalizador de dados de intake
- C3: regras de compliance por modo
- C4: dossiê final de posicionamento

## Epic D — Conversão e operação
- D1: captura de lead + webhook CRM
- D2: tracking de eventos e funil
- D3: dashboards operacionais
- D4: playbook de SLA de atendimento

## Epic E — Segurança e qualidade
- E1: headers, CSP, HSTS, rate limiting
- E2: logs, auditoria e backup
- E3: CI (lint, test, build)
- E4: critérios de DoD e checklist de release

---

## 7) Matriz RACI resumida

| Frente | Produto | Engenharia | Conteúdo/Marketing | Compliance/Jurídico | Operação |
|---|---|---|---|---|---|
| Requisitos e roadmap | A/R | C | C | C | C |
| Implementação técnica | C | A/R | I | C | I |
| Templates editoriais | C | I | A/R | C | C |
| Regras de compliance | C | C | C | A/R | I |
| Publicação e campanhas | C | C | A/R | C | R |
| Métricas e otimização | A | R | R | C | R |

---

## 8) Riscos e mitigação

1. **Risco regulatório (profissões reguladas)**
   - Mitigação: modo advocacy desde o desenho + revisão de conteúdo sensível.
2. **Dependência de políticas de terceiros (APIs/redes)**
   - Mitigação: operação híbrida (manual assistida no MVP, automação progressiva).
3. **Baixa qualidade de resposta comercial**
   - Mitigação: SLA, playbook de triagem e monitor de tempo de primeira resposta.
4. **Medição inconsistente**
   - Mitigação: taxonomia única de eventos + validação em staging.
5. **Segurança e vazamento de acesso**
   - Mitigação: 2FA obrigatório, gestor de senhas, trilha de auditoria, backups.

---

## 9) Critérios de sucesso (MVP)

- Site institucional no ar com páginas essenciais e consentimento.
- Fluxo de qualificação completo gerando dossiê utilizável.
- Templates de perfil para os canais prioritários.
- Eventos críticos medidos e dashboard inicial ativo.
- Governança técnica ativa (GitHub + CI + deploy + backup + 2FA).

---

## 10) Próximos passos imediatos (execução)
1. Criar repositório GitHub dedicado do produto.
2. Estruturar monorepo inicial com `AGENTS.md` e padrões de contribuição.
3. Configurar projeto Vercel e variáveis por ambiente.
4. Criar espaço Notion:
   - PRD,
   - roadmap por sprint,
   - checklist compliance,
   - calendário editorial.
5. Criar pasta no Google Drive para onboarding de clientes e ativos.
6. Iniciar Sprint 1 (fundação técnica + páginas essenciais + intake v1).

