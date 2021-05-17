---
$title: Configurar Analytics
---

## Decida antes de começar

Todas as soluções de análise dependem dos dados de que você precisa
e de como pretende analisar esses dados. Decida antes de começar:

* Você usará ferramentas de análise de terceiros para analisar o engajamento do usuário
ou sua própria solução interna?
* Que comportamentos você avaliará para entender o engajamento do usuário?

### Você pretende enviar os dados para um fornecedor ou para você mesmo?

Caso você tenha sua própria solução interna para avaliar o engajamento do usuário,
basta um URL para integrar o AMP Analytics a essa solução.
Você enviará os dados para esse destino.
Outra opção é enviar os dados a vários URLs.
Por exemplo, é possível enviar dados de exibição de página a um URL
e dados de envolvimento com redes sociais a outro.

O AMP Analytics foi criado especialmente para fazer a avaliação uma vez e gerar relatórios para vários destinos.
Se você já estiver trabalhando com um ou mais fornecedores de análise,
verifique a lista de [fornecedores de análise](analytics-vendors.md) para ver se eles integraram a solução com as AMP.
Em caso afirmativo, veja os dados de configuração e siga as instruções.

Se o fornecedor de análise não tiver feito a integração com as AMP,
entre em contato com ele para receber suporte.
Também recomendamos [indicar um problema no projeto AMP](https://github.com/ampproject/amphtml/issues/new) (em inglês)
solicitando que o fornecedor seja adicionado.
Veja também como
[integrar suas ferramentas de análise no HTML para AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/integrating-analytics.md) (em inglês).

### De que dados você precisa?

Você pretende coletar que dados sobre seus usuários para avaliar o engajamento?
É preciso determinar isso antes de fazer a configuração.

Principais pontos a serem considerados:

Você pretende rastrear somente as exibições de página ou outros padrões de engajamento do usuário
(consulte também [amp-pixel ou amp-analytics](analytics_basics.md#use-amp-pixel-or-amp-analytics))?
Que tipos de dados você pretende coletar sobre seus usuários, seu conteúdo,
o dispositivo ou o navegador (consulte também [Substituição de variáveis](analytics_basics.md#variable-substitution))?
* Como você pretende identificar seus usuários (consulte também [Identificação de usuários](analytics_basics.md#user-identification))?

[tip type="read-on"]

Conheça os recursos de análise no artigo [Analytics: conceitos básicos](analytics_basics.md).

[/tip]
