# Matriz De Linguagem Advocacy

Versao da politica: `2026-05-23`

Esta matriz transforma o modo `advocacy` em regra operacional para textos de site, formularios, bios, CTAs e templates
sociais. Ela nao substitui revisao juridica ou etico-disciplinar antes de producao.

## Fontes Oficiais

- OAB, Provimento n. 205/2021: https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021
- OAB, cartilha "Principais duvidas sobre Publicidade na Advocacia", 2024:
  https://www.oab.org.br/Content/pdf/Cartilha%20Digital%20Publicidade%20Advocacia.pdf
- ANPD, Guia Orientativo Cookies e Protecao de Dados Pessoais:
  https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf
- ANPD, Guia de seguranca da informacao para agentes de tratamento de pequeno porte:
  https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte
- ANPD, Guia de agentes de tratamento e encarregado:
  https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-para-definicoes-dos-agentes-de-tratamento-de-dados-pessoais-e-do-encarregado
- LGPD, Lei n. 13.709/2018: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm

## Regra-Mae

No modo `advocacy`, o texto deve ser informativo, sobrio, verificavel e orientado a esclarecimento. Nao deve induzir
contratacao, estimular litigio, prometer resultado, comparar o profissional com terceiros, divulgar preco ou criar urgencia
comercial.

## CTA Padrao

Permitido:

```text
Saiba mais no site e envie sua duvida para analise inicial.
```

Esse CTA e intencionalmente neutro: permite contato, mas nao chama o usuario a contratar servico ou agir por urgencia.

## Frases Permitidas

| Contexto | Formula segura | Observacao |
|---|---|---|
| Bio | `Atuacao em [area], com conteudos informativos e credenciais verificaveis.` | Evita promessa de resultado. |
| Site | `Envie sua duvida para analise inicial.` | Nao usa urgencia comercial. |
| Publicacao | `Entenda pontos importantes sobre [tema].` | Conteudo educativo. |
| WhatsApp | `Recebemos sua mensagem e faremos uma verificacao inicial das informacoes.` | Sem promessa de resposta juridica imediata. |
| Credenciais | `[Titulo/registro] conforme documento verificavel.` | Publicar apenas o que puder ser comprovado. |

## Frases Bloqueadas

| Padrao | Motivo | Exemplo |
|---|---|---|
| Urgencia comercial | Induz contratacao imediata | `Compre agora`, `ligue ja`, `contrate hoje` |
| Promessa de resultado | Pode induzir erro ou mercantilizacao | `resultado garantido`, `causa ganha`, `100% de chance` |
| Preco/gratuidade/desconto | Pode configurar captacao por vantagem economica | `consulta gratis`, `desconto`, `preco promocional` |
| Autoengrandecimento/comparacao | Linguagem persuasiva e comparativa | `o melhor advogado`, `numero 1`, `mais barato` |
| Estimulo a litigio | Pode induzir demanda | `processe agora`, `entre com acao`, `indenizacao garantida` |

## Implementacao No Codigo

- `packages/shared/src/compliance.ts` centraliza a versao da politica, CTA seguro e regras proibidas.
- `reviewAdvocacyLanguage(text)` retorna as violacoes encontradas.
- `buildSocialProfileTemplates(profile)` usa CTA neutro quando `complianceMode` e `advocacy`.
- `ConsentSchema` grava `CURRENT_POLICY_VERSION` por padrao.

## Criterios De Revisao

- [ ] Texto nao contem promessa, garantia ou expectativa de resultado.
- [ ] Texto nao contem urgencia comercial.
- [ ] Texto nao divulga preco, desconto, gratuidade ou condicao promocional.
- [ ] Texto nao compara o profissional com concorrentes.
- [ ] Credenciais, titulos e registros podem ser comprovados.
- [ ] Links de contato redirecionam para meios autorizados e pagina informativa.
- [ ] Consentimento e politica vigente foram registrados quando houver formulario.
