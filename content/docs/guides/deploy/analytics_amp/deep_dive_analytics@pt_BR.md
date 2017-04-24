---
$title: Informações detalhadas sobre o AMP Analytics
toc: true
---
[TOC]


Este guia fornece informações detalhadas sobre o
[componente amp-analytics](/docs/reference/extended/amp-analytics.html),
dividindo uma configuração de exemplo do `amp-analytics` nestas três categorias básicas:

O restante deste guia usa esse exemplo de configuração,
que rastreia as visualizações de páginas e os cliques de usuários em links
e envia os dados de análise ao provedor de terceiros,
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

[sourcecode:html]
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
[/sourcecode]

**Observação:** o exemplo de código acima tem por objetivo ajudá-lo a aprender, mas não é de forma alguma um exemplo realista. Se você estiver trabalhando com provedores de análise, é provável que o exemplo acima não faça sentido; as configurações dos provedores removem a complexidade. Consulte a documentação do seu provedor de análises para obter exemplos de configurações.

## Onde enviar dados de análise: atributo type

O AMP foi projetado para oferecer suporte a dois padrões comuns de coleta de dados:

* Ingestão por um endpoint de propriedade do editor para sistemas de análise internos.
* Ingestão por um endpoint de propriedade de um fornecedor para interoperabilidade com uma solução desse fornecedor
(por exemplo, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

Para enviar dados de análise a um provedor de análises,
inclua o atributo `type` na tag `amp-analytics` e defina seu valor
para o fornecedor adequado, segundo definido na
[especificação do amp-analytics](/docs/reference/extended/amp-analytics.html).

Por exemplo: `<amp-analytics type="googleanalytics">` envia dados de análise
ao provedor de análise de terceiros, Google Analytics.
Para enviar dados para um endpoint de propriedade do editor,
basta não incluir o atributo `type`;
os dados de análise são enviados para endpoints definidos para cada
[solicitação](/pt_br/docs/guides/analytics/deep_dive_analytics.html#quais-dados-são-enviados:-atributo-requests).

As configurações de fornecedores de análises são uma forma rápida
de dar os primeiros passos com o `amp-analytics`.
Você deve consultar a documentação e os recursos de ajuda
do fornecedor para obter mais orientações.
Como mencionado anteriormente,
a lista de fornecedores que já foram integrados ao AMP, assim como os links
para suas documentações específicas, pode ser encontrada na
[especificação do amp-analytics](/docs/reference/extended/amp-analytics.html).

Se você é um fornecedor de análises,
saiba mais sobre
[como integrar sua própria configuração de análise no AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Carregar configuração remota: atributo config

Você não precisa incluir toda a configuração
para `amp-analytics` inteiramente na sua página AMP.
Em vez disso, você pode chamar um URL remoto
para toda a configuração ou parte dela.

Isso permite que você faça coisas como variar a configuração
com base em uma solicitação específica.
Se você, como editor, tem controle sobre o arquivo remoto,
é possível realizar qualquer procedimento necessário no lado do servidor
para construir os dados de configuração.

O primeiro passo para carregar configurações remotas é
incluir o atributo config na tag `amp-analytics`:

[sourcecode:html]
<amp-analytics config="https://example.com/analytics.account.config.json">
[/sourcecode]

O próximo passo é criar o conteúdo JSON que reside no URL remoto.
Neste exemplo simples,
a configuração contida no objeto JSON é exatamente o valor da variável para a conta de análise.

Conteúdo de exemplo em `https://example.com/analytics.account.config.json`:

[sourcecode:html]
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
[/sourcecode]

A etapa final é assegurar-se de que o arquivo remoto tenha sido extraído
para o lugar adequado na configuração do `amp-analytics`.
Nas duas solicitações de `pageview` e `event` do exemplo,
o valor da variável `account` é definido automaticamente
para o valor de conta no URL remoto (`"account": "UA-XXXXX-Y"`):

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

**Importante:** o AMP não realiza a validação em relação a diversos usos da mesma variável.
Os valores são preenchidos seguindo uma ordem de preferência de substituição de variável
e os valores nos URLs remotos estão no topo dessa ordem
(consulte [Ordem de substituição de variáveis](/pt_br/docs/guides/analytics/deep_dive_analytics.html#ordem-de-substituição-de-variáveis)).

## Solicitações, acionamento e transportes

O atributo `requests` define “quais dados são enviados”
(por exemplo, `pageviews`, `events`),
e para onde os dados são enviados (os URLs usados para transmitir dados).

O atributo `triggers` descreve quando dados de análise devem ser enviados,
por exemplo, quando um usuário visualiza uma página ou clica em um link.

O atributo `transport` especifica como enviar a solicitação,
mais especificamente, o protocolo.

Continue lendo para saber mais sobre essas configurações.
(Você também pode ler sobre essas configurações na
[referência do amp-analytics](/docs/reference/extended/amp-analytics.html).)

### Quais dados são enviados: atributo requests

O `request-name` é usado na configuração de acionamento para especificar
que solicitação deve ser enviada em resposta a um evento específico.
O `request-value` é um URL `https`.
Esses valores podem incluir tokens de marcadores de posição
que podem fazer referência a outras solicitações ou variáveis.

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

Alguns provedores de análise (incluindo o Google Analytics)
já forneceram configurações,
que você usará por meio do atributo `type`.
Se você estiver usando um provedor de análises,
pode ser que não precise incluir informações de `requests`.
Consulte a documentação do seu fornecedor para descobrir
se `requests` precisa ser configurado, e como.

#### Anexar o URL de solicitação: parâmetros de URL adicionais

O atributo [extraUrlParams](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#extra-url-params)
especifica parâmetros adicionais para anexar à string de consulta do URL da solicitação por meio da convenção habitual "&foo=baz".

O exemplo `amp-analytics` adiciona um parâmetro adicional <code>cd1</code>
à solicitação e define o valor do parâmetro para “AMP”:

[sourcecode:html]
  "extraUrlParams": {
    "cd1": "AMP"
  }
[/sourcecode]

### Quando os dados são enviados: atributo trigger

O atributo `triggers` descreve quando uma solicitação de análise deve ser enviada.
Ele contém um par de valores-chave de trigger-name e trigger-configuration.
O nome do trigger pode ser qualquer string composta
por caracteres alfanuméricos (a-zA-Z0-9).

Por exemplo,
o seguinte elemento `amp-analytics` está configurado para enviar uma solicitação para
`https://example.com/analytics` quando o documento for carregado pela primeira vez,
e cada vez que uma tag `a` for clicada:

[sourcecode:html]
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
  "trackAnchorClicks": {
    "on": "click",
    "selector": "a",
    "request": "event",
    "vars": {
      "eventId": "42",
      "eventLabel": "clicked on a link"
    }
  }
}
[/sourcecode]

O AMP oferece suporte às seguintes configurações de acionamento:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Configuração de acionamento</th>
      <th data-th="Description">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (obrigatório)</td>
      <td data-th="Description">O evento a ouvir. Os valores válidos são <code>click</code>, <code>scroll</code>, <code>timer</code> e <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (obrigatório)</td>
      <td data-th="Description">Nome da solicitação a enviar (segundo especificado nas <a href="/pt_br/docs/guides/analytics/deep_dive_analytics.html#quais-dados-são-enviados:-atributo-requests">solicitações</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Um objeto que contém pares de valor-chave usados para modificar<code>vars</code> definidas na configuração de nível superior ou para especificar <code>vars</code> exclusivas para esse acionamento (consulte também <a href="/pt_br/docs/guides/analytics/deep_dive_analytics.html#ordem-de-substituição-de-variáveis">Ordem da substituição de variáveis</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (obrigatório quando <code>on</code> for definido como <code>click</code>)</td>
      <td data-th="Description">Um seletor CSS usado para refinar quais elementos devem ser rastreados. Use o valor <code>*</code> para rastrear todos os elementos. Essa configuração é usada em conjunto com o acionamento <code>click</code>. Saiba como usar o seletor para <a href="/pt_br/docs/guides/analytics/use_cases.html#rastrear-cliques-de-páginas">rastrear cliques de página</a> e <a href="/pt_br/docs/guides/analytics/use_cases.html#rastrear-interações-sociais">interações sociais</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (obrigatório quando <code>on</code> for definido como <code>scroll</code>)</td>
      <td data-th="Description">Controla sob que condições o evento <code>scroll</code> é acionado quando a página é rolada. Esse objeto pode conter<code>verticalBoundaries</code> e <code>horizontalBoundaries</code>. Pelo menos uma das duas propriedades é obrigatória para que um evento <code>scroll</code> seja acionado. Os valores para ambas as propriedades devem ser matrizes de números que contenham os limites nos quais um evento de rolagem é gerado. Consulte exemplos em <a href="/pt_br/docs/guides/analytics/use_cases.html#rastrear-rolagem">rastrear rolagem</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (obrigatório quando <code>on</code> for definido como <code>timer</code>)</td>
      <td data-th="Description">Controla quando o evento <code>timer</code> é acionado. O temporizador será acionado imediatamente e, depois, a um intervalo especificado. Essa configuração é usada em conjunto com o acionamento <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

**Importante:** acionamentos de uma configuração com menor precedência são sobrepostos
por acionamentos com os mesmos nomes de uma configuração com maior precedência.
(consulte [Ordem de substituição de variáveis](/pt_br/docs/guides/analytics/deep_dive_analytics.html#ordem-de-substituição-de-variáveis)).

### Como os dados são enviados: atributo transport

O atributo `transport` especifica como enviar a solicitação.
Os três seguintes métodos são ativados por padrão:

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Método de transporte</th>
      <th data-th="Description">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Indica que <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> pode ser usado para transmitir a solicitação. Isso enviará uma solicitação de <code>POST</code> com credenciais e o corpo vazio.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Indica que <code>XMLHttpRequest</code> pode ser usado para transmitir a solicitação. Isso enviará uma solicitação de <code>POST</code> com credenciais e corpo vazio.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Indica que a solicitação pode ser enviada gerando uma tag <code>Image</code>. Isso enviará uma solicitação <code>GET</code>.</td>
    </tr>
  </tbody>
</table>

Somente um método de transporte é usado:
aquele com a precedência mais alta
que esteja ativado, autorizado e disponível.
A precedência é `beacon` > `xhrpost` > `image`.
Se o user agent do cliente não oferecer suporte a um método,
o próximo método de precedência mais alta ativado será usado.

Somente inclua o atributo `transport` em sua configuração
se quiser limitar as opções de transporte,
caso contrário, você poderá interromper as solicitações.

No exemplo abaixo,
`beacon` e `xhrpost` são definidos como falsos,
de forma que não serão usados, mesmo que tenham precedência mais alta do que `image`.
Se o user agent do cliente oferecer suporte ao método `image`,
ele será usado; caso contrário, a solicitação não será enviada.

[sourcecode:html]
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
[/sourcecode]

## Ordem de substituição de variáveis

O AMP preenche as variáveis com valores em uma ordem de precedência:

1. Configurações remotas (via `config`).
2. `vars` aninhadas em um acionamento dentro de `triggers`.
3. `vars` no nível superior aninhadas dentro de `amp-analytics`.
4. Valores fornecidos pela plataforma.

Neste exemplo, há uma configuração remota,
variáveis definidas no nível superior, em acionamentos e no nível de plataforma:

[sourcecode:html]
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
[/sourcecode]

Quando a mesma `var` é definida em vários locais,
a ordem de precedência da variável define seu valor uma vez.
Assim, se a configuração remota definiu `account` como UA-XXXXX-Y no exemplo acima,
os valores de várias variáveis serão os seguintes:

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">Valor</th>
      <th data-th="Defined By" class="col-thirty">Definido por</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">Plataforma</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">Acionamento</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Configurações remotas</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Acionamento</td>
    </tr>
  </tbody>
</table>
