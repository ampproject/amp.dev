---
$title: Informações detalhadas sobre o AMP Analytics
---
[TOC]

Neste guia, você verá os detalhes do
[componente amp-analytics](/pt_br/docs/reference/components/amp-analytics.html).
Para isso, dividiremos um exemplo de configuração `amp-analytics` nos principais elementos básicos:

O restante do guia usa este exemplo de configuração,
que rastreia as exibições de página e os cliques de usuários em links
e envia os dados de análise ao provedor de terceiros,
o [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

```html
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
```

[tip type="note"]

O código de exemplo acima serve para mostrar como funciona o processo, mas não é uma amostra realista. Se você estiver trabalhando com provedores de análise, talvez essa amostra não faça sentido, já que as configurações do provedor são menos complexas. Consulte a [documentação do provedor de análise](/pt_br/docs/analytics/analytics-vendors.html) para saber mais sobre as configurações de exemplo.
[/tip]

## Para onde devo enviar os dados de análise: atributo "type"

A tecnologia AMP é compatível com dois padrões comuns de coleta de dados:

* o processamento feito por um ponto de extremidade do editor para sistemas de análise internos
* o processamento feito por um ponto de extremidade do fornecedor para interoperabilidade com uma solução própria,
como o [Adobe Analytics](https://helpx.adobe.com/br/support/analytics.html), o [Chartbeat](http://support.chartbeat.com/docs/) (em inglês) e o [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)

Para enviar dados a um provedor de análise,
inclua o atributo `type` na tag `amp-analytics` e defina o valor dele de acordo com
o fornecedor, conforme a lista de
[fornecedores de análise](/pt_br/docs/analytics/analytics-vendors.html).

Por exemplo: `<amp-analytics type="googleanalytics">` envia dados
ao Google Analytics, provedor de análise de terceiros.
Para enviar dados a um ponto de extremidade do editor,
basta não incluir o atributo `type`.
Os dados de análise serão enviados aos pontos de extremidade definidos para
[cada solicitação](/pt_br/docs/analytics/deep_dive_analytics.html#what-data-gets-sent-requests-attribute).

As configurações do fornecedor de análise são uma maneira rápida
de dar os primeiros passos com a tag `amp-analytics`.
Consulte a documentação
e os recursos de ajuda do seu fornecedor para mais informações.
Como mencionamos antes,
os nomes dos fornecedores que têm integração com a tecnologia AMP e os links
para a documentação específica a cada um deles estão na lista de
[fornecedores de análise](/pt_br/docs/analytics/analytics-vendors.html).

Se você for um fornecedor de análise,
saiba mais sobre
[como integrar sua própria configuração de análise ao HTML para AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md) (em inglês).

## Como carregar uma configuração remota: atributo "config"

Não é preciso incluir todas as configurações
de `amp-analytics` na sua página AMP.
Você pode chamar um URL remoto
para usar essas configurações ou uma parte delas.

Isso permite variar a configuração
com base em uma solicitação específica, por exemplo.
Se você, como editor, tiver controle sobre o arquivo remoto,
poderá fazer todo o processamento de servidor necessário
para definir os dados de configuração.

Para carregar as configurações remotas, primeiro
inclua o atributo "config" na tag `amp-analytics`:

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

Depois disso, crie o conteúdo JSON do URL remoto.
Neste exemplo simples,
a configuração do objeto JSON é somente o valor da variável referente à conta de análise.

Veja o conteúdo de exemplo em `https://example.com/analytics.account.config.json`:

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
```

Por fim, verifique se o conteúdo do arquivo remoto é inserido
no local adequado na configuração de `amp-analytics`.
Nas solicitações `pageview` e `event`,
o valor da variável `account` é definido automaticamente
como o valor da conta no URL remoto (`"account": "UA-XXXXX-Y"`):

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```


[tip type="important"]

A AMP não valida diversos usos da mesma variável.
Os valores são preenchidos seguindo uma ordem de preferência da substituição de variáveis,
e os valores nos URLs remotos têm prioridade. Consulte [Ordem da substituição de variáveis](/pt_br/docs/analytics/deep_dive_analytics.html#variable-substitution-ordering)).

[/tip]

## Solicitações, acionadores e transportes

O atributo `requests` define quais dados são enviados
(por exemplo, `pageviews` e `events`)
e onde isso acontece (os URLs usados para transmitir os dados).

O atributo `triggers` descreve quando os dados de análise são enviados,
seja a partir da visualização de uma página ou do clique em um link, por exemplo.

O atributo `transport` especifica como enviar uma solicitação,
ou seja, define o protocolo.

Continue lendo para saber mais sobre essas configurações.
Veja outras informações na
[referência de amp-analytics](/pt_br/docs/reference/components/amp-analytics.html).

### Quais dados são enviados: atributo "requests"

O atributo `request-name` é usado na configuração do acionador para especificar
qual solicitação é enviada como resposta a um evento específico.
O atributo `request-value` é um URL `https`.
Esses valores podem incluir tokens de marcadores
com referências a outras solicitações ou variáveis.

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

Alguns provedores de análise (incluindo o Google Analytics)
já fornecem configurações,
e você as usa com o atributo `type`.
Se você estiver usando um provedor de análise,
não será preciso incluir a informação de `requests`.
Consulte a documentação do seu fornecedor para ver
se é necessário configurar `requests` e como fazer isso.

#### Como anexar um URL de solicitação: parâmetros de URL adicionais

O atributo [extraUrlParams](/pt_br/docs/reference/components/amp-analytics.html#extra-url-params)
especifica parâmetros adicionais para anexar à string de consulta do URL da solicitação com uma convenção "&foo=baz" comum.

O exemplo de `amp-analytics` adiciona outro parâmetro, `cd1`,
à solicitação e define o valor do parâmetro como "AMP":

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### Quando os dados são enviados: atributo "triggers"

O atributo `triggers` descreve quando uma solicitação de análise é enviada.
Ele contém um par de chave-valor de "trigger-name" e "trigger-configuration".
O nome do acionador pode ser qualquer string de
caracteres alfanuméricos (a-z A-Z 0-9).

Por exemplo:
o elemento `amp-analytics` a seguir é configurado para enviar uma solicitação a
`https://example.com/analytics` quando o documento é carregado pela primeira vez
e cada vez que uma tag `a` recebe um clique:

```js
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
```

[tip type="important"]
 A abordagem acima só é recomendada para páginas AMP, e não para anúncios HTML para AMP. Como a prioridade da análise é menor que a do conteúdo da página, recomendamos rastrear os cliques usando um redirecionamento do navegador para evitar perdas. 
[/tip]

A tecnologia AMP é compatível com as seguintes configurações de acionador:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Configuração do acionador</th>
      <th data-th="Description">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (obrigatório)</td>
      <td data-th="Description"> É o evento do listener. Os valores válidos são <code>click</code>, <code>scroll</code>, <code>timer</code> e <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (obrigatório)</td>
      <td data-th="Description">É o nome da solicitação a ser enviada, conforme <a href="/pt_br/docs/analytics/deep_dive_analytics.html#what-data-gets-sent-requests-attribute">especificado nas solicitações</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">É um objeto que tem pares de chave-valor usados para modificar <code>vars</code> definidos na configuração de nível superior ou para especificar <code>vars</code> exclusivos a esse acionador. Consulte também <a href="/pt_br/docs/analytics/deep_dive_analytics.html#variable-substitution-ordering">Ordem da substituição de variáveis</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (obrigatório quando <code>on</code> está definido como <code>click</code>)</td>
      <td data-th="Description">É um seletor de CSS usado para definir quais elementos serão rastreados. Use o valor <code>*</code> para rastrear todos os elementos. Essa configuração é usada junto com o acionador <code>click</ code>. Saiba como usar o seletor para <a href="/pt_br/docs/analytics/use_cases.html#tracking-page-clicks">rastrear cliques na página</a> e <a href="/pt_br/docs/analytics/use_cases.html#tracking-social-interactions">interações sociais</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (obrigatório quando <code>on</code> é definido como <code>scroll</code>)</td>
      <td data-th="Description">Controla as condições de acionamento do evento <code>scroll</code> na rolagem da página. Esse objeto pode conter <code>verticalBoundaries</code> e <code>horizontalBoundaries</code>. Pelo menos uma das duas propriedades é necessária para que um evento <code>scroll</code> seja acionado. Os valores das duas propriedades precisam ser matrizes de números com os limites para a geração de eventos de rolagem. Veja este exemplo sobre <a href="/pt_br/docs/analytics/use_cases.html#tracking-scrolling">como rastrear a rolagem</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (obrigatório quando <code>on</code> é definido como <code>timer</code>)</td>
      <td data-th="Description">Controla quando o evento <code>timer</code> é acionado. O evento será acionado imediatamente, e depois disso, em um intervalo especificado. Essa configuração é usada junto com o acionador <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

[tip type="important"]

Os acionadores de uma configuração com menor precedência serão substituídos por outros de mesmo nome que venham de uma configuração com maior precedência. Consulte [Ordem da substituição de variáveis](/pt_br/docs/analytics/deep_dive_analytics.html#variable-substitution-ordering).

[/tip]

### Como os dados são enviados: atributo "transport"

O atributo `transport` especifica como enviar uma solicitação.
Os três métodos a seguir são ativados por padrão:

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
      <td data-th="Description">Indica que <a href="https://developer.mozilla.org/pt-BR/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> (em inglês) pode ser usado para transmitir a solicitação. Isso enviará uma solicitação <code>POST</code> com credenciais e um corpo vazio.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Indica que <code>XMLHttpRequest</code> pode ser usado para transmitir a solicitação. Isso enviará uma solicitação <code>POST</code> com credenciais e um corpo vazio.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Indica que a solicitação pode ser enviada gerando uma tag <code>Image</code>. Isso enviará uma solicitação <code>GET</code>.</td>
    </tr>
  </tbody>
</table>

Somente um método de transporte é usado,
e aquele com maior precedência
é ativado, permitido e disponibilizado.
A precedência é `beacon` > `xhrpost` > `image`.
Se o user agent do cliente não for compatível com um método,
o próxima opção ativada de maior precedência será usada.

Só inclua o atributo `transport` na sua configuração
se você quiser limitar as opções de transporte.
Caso contrário, isso poderá interromper as solicitações.

No exemplo abaixo,
`beacon` e `xhrpost` são definidos como "false".
Por isso, eles não serão usados mesmo que tenham precedência superior a `image`.
Se o user agent do cliente for compatível com o método `image`,
ele será usado. Caso contrário, nenhuma solicitação será enviada.

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## Ordem da substituição de variáveis

A tecnologia AMP preenche variáveis com valores em uma ordem de precedência:

1. configurações remotas (via `config`)
2. `vars` aninhado em um acionador em `triggers`
3. `vars` no nível superior aninhado em `amp-analytics`
4. valores fornecidos pela plataforma

Neste exemplo, há uma configuração remota
e variáveis definidas no nível superior, nos acionadores e no nível da plataforma:

```html
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
```

Quando o mesmo `var` é definido em vários locais,
a ordem de precedência das variáveis define o valor dele uma vez.
Assim, se a configuração remota tiver definido `account` como UA-XXXXX-Y no exemplo acima,
os valores de diversos "vars" serão os seguintes:

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">Value</th>
      <th data-th="Defined By" class="col-thirty">Defined By</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">Platform</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">Trigger</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Remote configuration</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Trigger</td>
    </tr>
  </tbody>
</table>
 
