---
layout: page
title: Configurar Analytics
order: 5
folder: analytics
locale: pt-br
---

## Decida antes de começar

Todas as soluções de análise são baseadas no conhecimento dos dados de que você precisa
e de como pretende analisar esses dados. Decida antes de começar:

* Você vai usar ferramentas de análise de terceiros para analisar o envolvimento do usuário
ou sua própria solução interna?
* Que comportamentos você medirá para entender o envolvimento do usuário?

### Você pretende enviar os dados para o fornecedor ou para você mesmo?

Se você tiver sua própria solução interna para medir o envolvimento do usuário,
a única coisa que você precisa para integrar o Analytics do AMP a essa solução é um URL.
É para ele que você enviará os dados.
Você também podem enviar os dados a vários URLs.
Por exemplo, é possível enviar dados de visualização de páginas a um URL
e dados de envolvimento social a outro.

O Analytics do AMP foi projetado especificamente para medir uma vez e relatar a muitos.
Se você já está trabalhando com um ou mais fornecedores de análise,
verifique a
[especificação do amp-analytics](/docs/reference/extended/amp-analytics.html)
para ver se eles integraram a solução com o AMP.
Em caso positivo, basta vincular aos documentos da especificação
e começar a seguir as instruções.

Se o fornecedor de análise não tiver feito a integração com o AMP,
entre em contato com ele para obter suporte.
Também recomendamos [criar um problema no projeto AMP](https://github.com/ampproject/amphtml/issues/new)
solicitando que o fornecedor seja adicionado.
Consulte também
[Integrar suas ferramentas de análise no AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### De que dados você precisa?

Que dados sobre seus usuários você pretende capturar para medir o envolvimento?
Você deve identificar esses dados antes de fazer a configuração.

Os principais pontos a serem considerados:

* Você pretende rastrear somente as visualizações de páginas ou outros padrões de envolvimento do usuário
(consulte também [amp-pixel ou amp-analytics](/docs/guides/analytics/analytics_basics.html#use-amp-pixel-or-amp-analytics))?
* Que tipos de dados você pretende capturar sobre seus usuários, seu conteúdo,
o dispositivo ou navegador (consulte também [Substituição de variáveis](/docs/guides/analytics/analytics_basics.html#variable-substition))?
* Como você pretende identificar seus usuários (consulte também [Identificação de usuários](/docs/guides/analytics/analytics_basics.html#user-identification))?
