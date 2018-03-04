---

$title: "Analytics: conceitos básicos"
$order: 0
toc: true
---

Conheça os conceitos básicos da análise de AMP.

[TOC]

## Usar amp-pixel ou amp-analytics?


A AMP oferece dois componentes para atender às suas necessidades de análise e medição: [amp-pixel](/pt_br/docs/reference/amp-pixel.html) 
e [amp-analytics](/pt_br/docs/reference/extended/amp-analytics.html). As duas opções enviam dados de análise para um ponto de extremidade definido.


Se você quiser um comportamento semelhante ao de um simples [pixel de rastreamento](https://en.wikipedia.org/wiki/Web_beacon#Implementation), o componente `amp-pixel` fornecerá um rastreamento básico de exibições de página. Os dados de exibição de página são enviados para um URL definido. Algumas integrações com fornecedores podem precisar desse componente. Nesse caso, elas especificarão o ponto de extremidade exato do URL.

 Na maioria das soluções de análise, use `amp-analytics`. O rastreamento de exibições de página também funciona em `amp-analytics`. No entanto, também é possível rastrear o engajamento dos usuários com qualquer tipo de conteúdo da página, incluindo cliques em links e botões. Além disso, você pode medir até onde o usuário rolou a página, se ele interagiu ou não com mídias sociais e muito mais.

{% call callout('Saiba mais', type='read') %}
 Consulte [Informações detalhadas sobre o AMP Analytics](/pt_br/docs/guides/analytics/deep_dive_analytics.html). {% endcall %}

Como parte da integração com a plataforma AMP, os fornecedores ofereceram configurações predefinidas de `amp-analytics` 
para que seja mais fácil coletar dados e movê-los para suas ferramentas de rastreamento. Acesse a documentação de fornecedores na lista [Fornecedores de análise](/pt_br/docs/guides/analytics/analytics-vendors.html).

 Você pode usar `amp-pixel` e `amp-analytics` 
nas suas páginas: `amp-pixel` para rastreamento simples de exibições de página e `amp-analytics` para todo o restante. Também é possível adicionar várias instâncias de cada tag. Se estiver trabalhando com vários fornecedores de análise, será necessário usar uma tag por solução. As páginas AMP mais simples são melhores para os usuários, portanto se você não precisar de tags adicionais, não as use.

## Criar uma configuração de análise simples


Saiba como criar uma configuração simples de [amp-pixel](/pt_br/docs/reference/amp-pixel.html) 
e [amp-analytics](/pt_br/docs/reference/extended/amp-analytics.html) .

### Configuração simples de amp-pixel

 Para criar uma configuração simples de `amp-pixel`, insira algo parecido com o seguinte no corpo da página AMP:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
[/sourcecode]

 Neste exemplo, os dados de exibição de página são enviados para o URL definido, juntamente com um número aleatório. A variável `RANDOM` 
é uma entre as muitas [variáveis ​​de substituição na plataforma AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). Saiba mais sobre a [substituição de variáveis](/pt_br/docs/guides/analytics/analytics_basics.html#variable-substitution).

 O componente [amp-pixel](/pt_br/docs/reference/amp-pixel.html) é integrado, de modo que não é necessário fazer uma declaração de inclusão, como ocorre com os componentes estendidos de AMP, incluindo `amp-analytics`. Entretanto, é necessário colocar a tag `amp-pixel` o mais perto possível do início de `<body>`. O pixel de rastreamento será acionado somente quando a tag for exibida. Se `amp-pixel` estiver posicionado perto da parte inferior da página, talvez ele não seja acionado.

### Configuração simples de amp-analytics


Para criar uma configuração simples de [amp-analytics](/pt_br/docs/reference/extended/amp-analytics.html), primeiro é necessário incluir esta declaração `custom-element` no `<head>` 
documento de AMP (consulte também [Declaração de inclusão de componente](/pt_br/docs/reference/extended.html#component-inclusion-declaration)):

[sourcecode:html]

<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>

[/sourcecode]

 O exemplo a seguir é semelhante ao [exemplo de "amp-pixel"](/pt_br/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration). Todas as vezes que uma página estiver visível, o evento será acionado e enviará os dados de exibição de página para um URL definido, juntamente com um código aleatório:

[sourcecode:html]
<amp-analytics>

<script type="application/json">

  {"requests": 
    {"pageview": "https://foo.com/pixel?RANDOM
  ", },"triggers": 
    {"trackPageview": 
      {"on": "visible",
      "request": "pageview"
    
} } }</script>

</amp-analytics>
[/sourcecode]

 No exemplo acima, definimos uma solicitação chamada "pageview" comohttps://foo.com/pixel?RANDOM. Como visto anteriormente, RANDOM é substituído por um número aleatório, de modo que a solicitação será algo parecido com https://foo.com/pixel?0.23479283687235653498734.

 Quando a página se tornar visível (como especificado pelo uso da palavra-chave de acionamento `visible`), um evento será acionado, e a solicitação `pageview` será enviada. O atributo "triggers" determinará quando a solicitação "pageview" será acionada. Saiba mais sobre [solicitações e acionamentos](/pt_br/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports).

## Substituição de variáveis

 Tanto o componente [amp-pixel](/pt_br/docs/reference/amp-pixel.html) 
quanto [amp-analytics](/pt_br/docs/reference/extended/amp-analytics.html) 
permitem todas as substituições de variáveis ​​de URL padrão (consulte [Substituições de variáveis ​​de AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)). No exemplo abaixo, a solicitação de exibição de página é enviada ao URL juntamente com o URL canônico do documento AMP atual, o title e um [código de cliente](/pt_br/docs/guides/analytics/analytics_basics.html#user-identification):

[sourcecode:html]
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
[/sourcecode]

Por ser bastante simples, a tag `amp-pixel` só pode incluir variáveis ​​definidas pela plataforma ou que possam ser analisadas pelo tempo de execução da AMP a partir da página AMP. No exemplo acima, a plataforma preenche os valores de `canonicalURL` e `clientId(site-user-id)`. A tag `amp-analytics` pode incluir as mesmas variáveis que `amp-pixel`, assim como as variáveis ​​definidas de modo exclusivo dentro da configuração da tag.

 Use o formato `${varName}` em strings de solicitação para variáveis definidas pela página ou pela plataforma. As variáveis `amp-analytics` 
substituirão o modelo por seu valor real no momento da construção da solicitação de análise (consulte também [Variáveis ​​permitidas em amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

 No exemplo de `amp-analytics` abaixo, a solicitação de exibição de página é enviada ao URL com dados adicionais extraídos de substituições de variáveis, algumas fornecidas pela plataforma, outras definidas in-line, dentro da configuração de `amp-analytics`:

[sourcecode:html]
<amp-analytics>

<script type="application/json">

  {"requests": 
    {"pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": 
    {"account": 
  "ABC123", },"triggers": 
    {"someEvent": 
      {"on": "visible",
      "request": "pageview",
      "vars": 
        {"title": 
"Minha página inicial", } } } }</script>

</amp-analytics>
[/sourcecode]

 No exemplo acima, as variáveis `account` e `title` são definidas na configuração de `amp-analytics`. As variáveis `canonicalUrl` e `clientId` não são definidas na configuração, por isso os valores delas são substituídos pela plataforma.

{% call callout('Importante:', type='caution') %}
 a substituição de variáveis é flexível. As mesmas variáveis ​​podem ser definidas em locais diferentes, e o tempo de execução da AMP analisará os valores nessa ordem de precedência (consulte [Ordem da substituição de variáveis](/pt_br/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)
). {% endcall %}

## Identificação do usuário


Os websites usam cookies para armazenar informações específicas dos usuários no navegador. Os cookies podem ser usados ​​para informar que um usuário já visitou um site antes. Na AMP, as páginas podem ser veiculadas pelo site de um editor ou por um cache (como o Google AMP Cache). O website do editor e o cache provavelmente terão domínios diferentes. Por motivos de segurança, os navegadores podem limitar o acesso a cookies de outros domínios (consulte também [Rastrear usuários em diferentes origens](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)).

 Por padrão, a AMP fornecerá um código de cliente, seja a página acessada pelo site original do editor ou por um cache. O código de cliente gerado pela AMP tem o valor da string codificada `"amp-"`
followed by a random `base64` e permanece o mesmo para o usuário, caso ele volte a acessar a página.

A AMP administra a leitura e a gravação do código de cliente em todos os casos. Isso é importante principalmente no caso de páginas veiculadas por meio de um cache ou de alguma outra forma fora do contexto de exibição do site original do editor. Nessa circunstância, o acesso aos cookies do site do editor não estará disponível.

 Quando uma página AMP é veiculada pelo site do editor, é possível fazer com que a estrutura de código de cliente usada pela AMP busque e use um cookie substituto. Nesse caso, o argumento `cid-scope-cookie-fallback-name` da variável `clientId` será interpretado como o nome do cookie. A formatação pode aparecer como `CLIENT_ID(cid-scope-cookie-fallback-name)` 
ou `${clientId(cid-scope-cookie-fallback-name)}`.

Por exemplo:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
[/sourcecode]

 Se a AMP descobrir que o cookie está definido, a substituição do código de cliente retornará o valor do cookie. Se a AMP descobrir que esse cookie não está definido, ela gerará um valor no formato `amp-` seguido de uma string aleatória codificada base64.


Saiba mais sobre a substituição do código de cliente, incluindo como adicionar um código de notificação de usuário opcional em [Variáveis ​​permitidas na análise de AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).

{% call callout('Saiba mais', type='read') %}
 Continue seu aprendizado sobre análises em [Informações detalhadas sobre o AMP Analytics](/pt_br/docs/guides/analytics/deep_dive_analytics.html) e [Casos de uso](/pt_br/docs/guides/analytics/use_cases.html). {% endcall %}

