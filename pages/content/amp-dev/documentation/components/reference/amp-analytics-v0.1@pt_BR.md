---
$title: amp-analytics
$category@: ads-analytics
teaser:
  text: Registra dados de análise de documentos AMP.
---


<!--
Copyright 2019 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



Registra dados de análise de documentos AMP.

<table>
  <tr>
    <td class="col-fourty"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemplos</strong></td>
    <td>Veja o exemplo de <a href="https://ampbyexample.com/components/amp-analytics/">amp-analytics</a> no site AMP By Example.</td>
  </tr>
</table>



## Pretende enviar análises para um fornecedor ou internamente? <a name="sending-analytics-to-a-vendor-or-in-house"></a>

Antes de começar a usar o AMP Analytics no seu site, é preciso decidir se você usará ferramentas de análise de terceiros para examinar o engajamento dos usuários ou sua própria solução interna.

[tip type="read-on"]
saiba tudo sobre o AMP Analytics no guia [Configurar Analytics](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md).
[/tip]

### Enviar dados para um fornecedor de análise <a name="analytics-vendors"></a>

O AMP Analytics foi criado especialmente para fazer a avaliação uma vez e gerar relatórios para vários destinos. Se você já está trabalhando com um ou mais fornecedores de análise, verifique a lista de [Fornecedores de análise](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) para ver se eles integraram as respectivas soluções às AMP.

Para fornecedores integrados ao AMP Analytics:

1. Na tag `<amp-analytics>`, adicione o atributo `type` e defina o valor dele para o [fornecedor](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) especificado.
1. Determine quais dados você quer coletar e rastrear e especifique esses detalhes nos dados de configuração. Consulte a documentação do fornecedor para ver instruções sobre como coletar os dados de análise.

Se o fornecedor de análise não tiver feito a integração com as AMP, entre em contato com ele para receber suporte. Também recomendamos que você abra um chamado no projeto AMP, pedindo que o fornecedor seja adicionado. Consulte também [Integrar suas ferramentas de análise em HTML para AMP](../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md) (link em inglês). Ou você pode pedir para seu fornecedor enviar os dados ao URL especificado. Saiba mais na seção [Enviar dados internamente](#sending-data-in-house) abaixo.

*Exemplo: envio de dados para um fornecedor de análise terceirizado*

No exemplo a seguir, os dados de análise são enviados à Nielsen, um fornecedor de análise terceirizado que fez a integração com a AMP. Detalhes sobre a configuração dos dados de análise para a Nielsen podem ser encontrados na documentação da [Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

```html
<amp-analytics type="nielsen">
  <script type="application/json">
  {
    "vars": {
      "apid": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
      "apv": "1.0",
      "apn": "My AMP Website",
      "section": "Entertainment",
      "segA": "Music",
      "segB": "News",
      "segC": "Google AMP"
    }
  }
  </script>
</amp-analytics>
```

### Enviar dados internamente <a name="sending-data-in-house"></a>

Caso você tenha sua própria solução interna para avaliar o engajamento dos usuários, basta um URL para integrar o AMP Analytics a essa solução. Será nele que você enviará os dados. Outra opção é enviar os dados a vários URLs. Por exemplo, é possível enviar dados de visualização de página para um URL e dados de envolvimento com redes sociais para outro.

[tip type="note"]
se sua solução interna envolve trabalhar com um fornecedor de análise que não fez a integração com as AMP, fale com o fornecedor para determinar quais informações de configuração são necessárias.
[/tip]

Para enviar dados para um URL específico:

1. Determine quais dados você quer coletar e rastrear e [especifique esses detalhes nos dados de configuração](#specifying-configuration-data).
1. No objeto de configuração [`requests`](#requests), especifique o tipo de solicitação a ser rastreada (por exemplo, visualização de página, eventos acionados específicos) e os URLs para onde você quer enviar os dados de rastreamento.

[tip type="note"]
ao processar URLs de AMP no cabeçalho do referenciador das solicitações de análise, remova ou ignore o parâmetro `usqp`. Esse parâmetro é usado pelo Google para acionar experimentos para o Google AMP Cache.
[/tip]

*Exemplo: envio de dados para um URL*

Veja um exemplo simples que rastreia visualizações de página.  Sempre que uma página estiver visível, o evento de acionamento será disparado e enviará os dados de visualização de página para um URL definido junto com um código aleatório.

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

[tip type="success"]
para alguns casos de uso comuns de rastreamento (por exemplo, visualizações de página, cliques em páginas, rolagem etc.), consulte [Analytics: casos de uso](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/use_cases.md).
[/tip]

## Especificar dados de configuração <a name="specifying-configuration-data"></a>

No elemento `<amp-analytics>`, você especifica um objeto de configuração JSON que contenha os detalhes do que medir e para onde enviar os dados de análise.

O objeto de configuração para `<amp-analytics>` usa o seguinte formato:

```javascript
{
  "requests": {
    request-name: request-value,
    ...
  },
  "vars": {
    var-name: var-value,
    ...
  },
  "extraUrlParams": {
    extraurlparam-name: extraurlparam-value,
    ...
  },
  "triggers": {
    trigger-name: trigger-object,
    ...
  },
  "transport": {
    "beacon": *boolean*,
    "xhrpost": *boolean*,
    "image": *boolean*,
  }
}
```

### Configuração in-line ou remota <a name="inline-or-remote-configuration"></a>

Os dados de configuração podem ser especificados in-line ou buscados remotamente especificando um URL no atributo `config`. Além disso, a configuração integrada para os fornecedores mais usados pode ser selecionada utilizando o atributo `type`.

Se forem usados dados de configuração de mais de uma dessas fontes, os objetos de configuração (variáveis, solicitações e acionadores) serão mesclados, de forma que:

1. a configuração remota terá prioridade sobre a configuração in-line;
1. e a configuração in-line terá precedência sobre a configuração do fornecedor.

#### Carregar configuração remota <a name="loading-remote-configuration"></a>

Para carregar uma configuração remota, no elemento `<amp-analytics>`, especifique o atributo `config` e o URL para os dados de configuração. O URL especificado precisa usar o esquema HTTPS. O URL pode incluir [variáveis de URL de AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md) (link em inglês). Para acessar cookies, consulte o atributo [`data-credentials`](#data-credentials). A resposta precisa seguir as [diretrizes de segurança de CORS nas AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md) (link em inglês).

Neste exemplo, especificamos o atributo `config` para carregar os dados de configuração a partir do URL especificado.

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

#### Reescritor de configuração <a name="configuration-rewriter"></a>

O recurso de reescrever configuração foi criado para permitir que os fornecedores de análise reescrevam dinamicamente uma configuração fornecida. Isso é semelhante ao recurso de configuração remota, mas inclui também qualquer configuração fornecida pelo usuário na solicitação feita ao servidor. No momento, esse recurso só pode ser ativado por um fornecedor de análise.

Um fornecedor de análise especifica uma propriedade configRewriter com um URL de servidor.
```js
export const VENDOR_ANALYTICS_CONFIG = {
    ...
    'configRewriter': {
      'url': 'https://www.vendor.com/amp-config-rewriter',
    },
    ...
}
```

O ambiente de execução envia ao endpoint do configRewriter entregue pelo fornecedor uma solicitação contendo a configuração in-line mesclada com a configuração remota fornecida. O fornecedor usa esse servidor de dados para a construção e retorna a nova configuração reescrita.

Em seguida, o ambiente de execução mescla toda a configuração fornecida para determinar a configuração final, na ordem da precedência mais alta para a mais baixa:

1. Configuração reescrita
1. Configuração in-line
1. Configuração definida pelo fornecedor

##### Grupos de variáveis <a name="variable-groups"></a>

Os grupos de variáveis são um recurso que permite aos fornecedores de análise agrupar um conjunto predefinido de variáveis que podem ser facilmente ativadas por um usuário. Depois, essas variáveis serão resolvidas e enviadas ao endpoint do `configRewriter` especificado.

Os fornecedores de análise precisam criar um novo objeto `varGroups` dentro da configuração de `configRewriter` para ativar esse recurso. Os editores podem, então, incluir qualquer fornecedor de análise nomeado responsável por criar `varGroups` que eles queiram ativar nas respectivas configurações de análise. Todas as variáveis compatíveis com o [Guia de substituições de HTML para AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md) (link em inglês) podem ser usadas. *Observação importante*: as variantes ${varName} não funcionarão.

Por exemplo, podemos ter um fornecedor com a seguinte configuração:
```js
// This is predefined by vendor.
export const VENDOR_ANALYTICS_CONFIG = {
  ...
  'configRewriter': {
    'url': 'https://www.vendor.com/amp-config-rewriter',
    'varGroups' : {
      'group1': {
        'referrer': 'DOCUMENT_REFERRER',
        'source': 'SOURCE_URL',
      'group2': {
        'title': 'TITLE',
      },
    },
  },
},
  ...
}
```

Você pode especificar quais grupos de variáveis são ativados incluindo `{enabled: true}` para os `varGroups` especificados na configuração `<amp-analytics>` do fornecedor. `enabled` é uma palavra-chave reservada e não pode ser usada como nome de variável.

No exemplo abaixo, `group1` e `group2` foram ativados. Todos os grupos que não tiverem sido ativados especificamente serão ignorados. O ambiente de execução resolverá todas essas variáveis ativadas e as mesclará em um único objeto `configRewriter.vars`, que será enviado ao URL do reescritor da configuração.

```html
  /* Included on publisher page */
  <amp-analytics type="myVendor" id="myVendor" data-credentials="include">
    <script type="application/json">
    {
      "configRewriter": {
        "varGroups": {
          "group1": {
            "enabled": true
          },
          "group2": {
            "enabled": true
          }
        }
      }
    }
    </script>
  </amp-analytics>
```

Neste exemplo, o corpo da solicitação seria semelhante a este:
```json
  /* Sent to configuration rewriter server. */
  "configRewriter": {
    "vars": {
      "referrer": "https://www.example.com",
      "source": "https://www.amp.dev",
      "title": "Cool Amp Tips"
    }
  }
```

### Objetos de dados de configuração <a name="configuration-data-objects"></a>

#### Solicitações <a name="requests"></a>

O objeto de configuração `requests` especifica os URLs usados para transmitir dados para uma plataforma de análise, bem como o comportamento de envio em lote ou de criação de relatórios da solicitação. O `request-name` especifica qual solicitação precisa ser enviada em resposta a um evento específico (por exemplo, `pageview`, `event` etc.). O `request-value` contém um URL HTTPS. O valor pode incluir tokens de marcadores que podem fazer referência a outras solicitações ou variáveis. O `request-value` também pode ser um objeto com configurações de solicitação opcionais.

##### Configurações de solicitação <a name="request-configs"></a>

As propriedades para definir uma solicitação com um objeto são:

- `baseUrl`: define o URL da solicitação (obrigatório).
- `reportWindow`: uma propriedade opcional para especificar o tempo (em segundos) para interromper solicitações de relatórios. O acionador com `important: true` modifica a restrição máxima da janela de relatório.

Neste exemplo, todas as solicitações são válidas.

```javascript
"requests": {
  "base": "https://example.com/analytics?a=${account}&u=${canonicalUrl}&t=${title}",
  "pageview": {
    "baseUrl": "${base}&type=pageview"
  },
  "event": {
    "baseUrl": "${base}&type=event&eventId=${eventId}",
    "batchInterval": 5,
    "reportWindow" : 30
  }
}
```

Alguns fornecedores de análise têm uma configuração já fornecida, que você usa por meio do atributo `type`. Se você estiver usando um fornecedor de análise, talvez não precise incluir informações de solicitações. Consulte a documentação do fornecedor para saber se as solicitações precisam ser configuradas e de que forma.

##### Configuração de lotes <a name="batching-configs"></a>

Para reduzir o número de pings de solicitação, especifique os comportamentos em lote na configuração da solicitação. Todos os [`extraUrlParams`](#extra-url-params) de `triggers` que usam a mesma solicitação são anexados ao `baseUrl` dela.

As propriedades de lotes são:

- `batchInterval`: esta propriedade especifica o intervalo de tempo (em segundos) para liberar os pings de solicitação na fila de lotes. `batchInterval` pode ser um número ou uma matriz de números (o intervalo de tempo mínimo é de 200 ms). A solicitação respeitará todos os valores da matriz e, em seguida, repetirá o último valor do intervalo (ou o valor único) quando chegar ao fim da matriz.

Por exemplo, a configuração a seguir envia um único ping de solicitação a cada dois segundos. Veja um exemplo de ping de solicitação: `https://example.com/analytics?rc=1&rc=2`.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": 2,
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

A configuração a seguir envia o primeiro ping de solicitação após um segundo e depois envia uma solicitação a cada três segundos. O primeiro ping de solicitação é semelhante a `https://example.com/analytics?rc=1`, e o segundo ping de solicitação é semelhante a `https://example.com/analytics?rc=2&rc=3&rc=4`.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": [1, 3],
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

#### Variáveis <a name="vars"></a>

O componente `amp-analytics` define muitas variáveis básicas que podem ser usadas em solicitações. Uma lista de todas essas variáveis está disponível no [Guia de variáveis do `amp-analytics`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md). Além disso, todas as variáveis compatíveis com o [Guia de substituições de AMP para HTML](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md) (link em inglês) também são compatíveis.

O objeto de configuração `vars` pode ser usado para definir novos pares de chave-valor ou modificar as variáveis existentes que podem ser referenciadas nos valores de `request`. Novas variáveis geralmente são usadas para especificar informações específicas do editor.  As matrizes podem ser usadas para especificar uma lista de valores que precisam ser codificados com URL separadamente, ao mesmo tempo em que
 preservam o delimitador de vírgula.

```javascript
"vars": {
  "account": "ABC123",
  "countryCode": "tr",
  "tags": ["Swift,Jonathan", "Gulliver's Travels"]
}
```

#### Parâmetros de URL extra <a name="extra-url-params"></a>

O objeto de configuração `extraUrlParams` especifica mais parâmetros a serem incluídos na solicitação. Por padrão, os parâmetros de URL extras são anexados à string de consulta de um URL de solicitação por meio da convenção “&foo=baz” normal.

Veja um exemplo que anexa `&a=1&b=2&c=3` a uma solicitação:

```javascript
"extraUrlParams": {
  "a": "1",
  "b": "2",
  "c": "3"
}
```

O `extraUrlParams` pode ser enviado por meio do corpo da solicitação, em vez do URL, se `useBody` estiver ativado e a solicitação for enviada por meio dos métodos de transporte `beacon` ou `xhrpost`. Nesse caso, os parâmetros não são codificados ou mesclados com o URL. Consulte [Usar corpo para outros parâmetros de URL](#use-body-for-extra-url-params) se quiser ver mais detalhes.

O atributo `extraUrlParamsReplaceMap` especifica um mapa de chaves e valores que atuam como parâmetros para `String.replace()` para pré-processar chaves na configuração `extraUrlParams`. Por exemplo, se uma configuração `extraUrlParams` definir `"page.title": "The title of my page"` e a `extraUrlParamsReplaceMap` definir `"page.": "_p_"`, então `&_p_title=The%20title%20of%20my%20page%20` será anexado à solicitação.

O `extraUrlParamsReplaceMap` não é necessário para usar `extraUrlParams`. Se o `extraUrlParamsReplaceMap` não for definido, nenhuma substituição de string ocorrerá, e as strings definidas em `extraUrlParams` serão usadas sem alteração.

Se `useBody` estiver ativado e a solicitação for enviada por meio do método de transporte `beacon` ou `xhrpost`, a substituição de string `extraUrlParamsReplaceMap` será realizada apenas nas chaves de nível superior em `extraUrlParams`.

#### Acionadores <a name="triggers"></a>

O objeto de configuração `triggers` descreve quando uma solicitação de análise precisa ser enviada. O atributo `triggers` contém um par de chave-valor de nome do acionador e configuração do acionador. Um nome de acionador pode ser qualquer string formada por caracteres alfanuméricos (a-z A-Z 0-9). Os acionadores de uma configuração com menor precedência serão substituídos por outros de mesmo nome que venham de uma configuração com maior precedência.

* `on` (obrigatório): evento a ser ouvido. Os valores válidos são `render-start`, `ini-load`, `click`, `scroll`, `timer`, `visible`, `hidden`, `user-error`, [`access-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md) e [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md).
* `request` (obrigatório): nome da solicitação a ser enviada (conforme especificado na seção `requests`).
* `vars`: um objeto que tem pares de chave-valor usados para modificar `vars` definidas na configuração de nível superior, ou para especificar vars exclusivas para esse acionador.
* `important` pode ser especificado para funcionar com solicitações compatíveis com o comportamento de lotes ou com a janela de relatórios. Configurar `important` como `true` pode ajudar na liberação da fila de solicitações em lote com alguns acionadores. Nesse caso, é possível reduzir o número de pings da solicitação sem perder eventos importantes do acionador. A configuração de `important` como `true` também pode modificar o valor de `reportWindow` da solicitação para enviar pings de solicitação importantes.
* `selector` e `selectionMethod` podem ser especificados para alguns acionadores, como `click` e `visible`. Consulte [Seletor de elementos](#element-selector) para ver detalhes.
* `scrollSpec` (obrigatório quando `on` é configurado como `scroll`): esta configuração é usada em conjunto com o acionador `scroll`. Veja mais detalhes abaixo.
* `timerSpec` (obrigatório quando `on` é configurado como `timer`): esta configuração é usada em conjunto com o acionador `timer`. Veja mais detalhes abaixo.
* `sampleSpec`: este objeto é usado para definir como as solicitações podem ser coletadas como amostra antes de serem enviadas. Esta configuração permite realizar a amostragem com base em uma entrada aleatória ou em outras variáveis compatíveis com a plataforma. O objeto contém a configuração para especificar uma entrada que é usada para gerar um hash e um limite que o hash precisa atender.
    * `sampleOn`: este modelo de string é expandido pelo preenchimento das variáveis da plataforma e, em seguida, com hash para gerar um número para fins da lógica de amostragem descrita abaixo do seguinte limite.
    * `threshold`: esta configuração é usada para filtrar as solicitações que não atendem a critérios específicos. Para que uma solicitação passe para o fornecedor de análise, a seguinte lógica precisa ser verdadeira: `HASH(sampleOn) < threshold`.</li>
* `videoSpec` (usado quando `on` é configurado como `video-*`): esta configuração é usada em conjunto com os acionadores [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md).

Por exemplo, a configuração a seguir pode ser usada para fazer uma amostragem de 50% das solicitações com base em uma entrada aleatória ou de 1% com base no ID do cliente.

```javascript
'triggers': {
  'sampledOnRandom': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${random}',
      'threshold': 50,
    },
  },
  'sampledOnClientId': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${clientId(cookieName)}',
      'threshold': 1,
    },
  },
},
```

##### Seletor de elementos <a name="element-selector"></a>

Alguns acionadores, como `click` e `visible`, permitem especificar um único elemento ou um conjunto de elementos usando as propriedades do seletor. Diferentes acionadores podem aplicar limitações e interpretações diferentes em elementos selecionados, por exemplo, definindo se um seletor se aplica a todos os elementos correspondentes ou ao primeiro elemento, ou quais elementos podem ser correspondidos: todos ou apenas os elementos AMP. Consulte a documentação de cada acionador relevante para ver mais detalhes.

As propriedades do seletor são:

- `selector`: esta propriedade é usada para localizar um elemento ou um conjunto de elementos usando a consulta CSS/DOM. A semântica de como é feita a correspondência com o elemento pode ser alterada usando `selectionMethod`. O valor dessa propriedade pode ser um dos seguintes:
    - um seletor de CSS válido, por exemplo, `#ad1` ou `amp-ad`.
    - `:root`: um seletor especial que corresponde à raiz do documento.
- `selectionMethod`: quando especificada, esta propriedade pode ter o valor `scope` ou `closest`. `scope` permite a seleção do elemento dentro do elemento pai da tag `amp-analytics`. `closest` pesquisa o ancestral mais próximo da tag `amp-analytics` que atenda ao seletor fornecido. O valor padrão é `scope`.

##### Incorporar acionador de início de renderização <a name="embed-render-start-trigger"></a>

Elementos AMP que incorporam outros documentos em iframes (por exemplo, anúncios) podem informar um evento de início de renderização (`"on": "render-start"`). Esse evento normalmente é emitido assim que é possível confirmar que a renderização do documento incorporado começou. Consulte a documentação de determinado elemento AMP para ver se ele emite esse evento.

O acionador do elemento de incorporação precisa incluir um [`selector`](#element-selector) que aponte para o elemento de incorporação:
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request",
    "selector": "#embed1"
  }
}
```

O evento de início de renderização também é emitido pelo próprio documento e pode ser configurado como:
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request"
  }
}

##### Acionador de carregamento inicial <a name="initial-load-trigger"></a>

O evento de carregamento inicial (`"on": "ini-load"`) é acionado quando o conteúdo inicial de um elemento ou documento AMP é carregado.

O "carregamento inicial" é definido em relação ao contêiner e ao tamanho inicial.
Mais especificamente:
- Para um documento: todos os elementos na primeira janela de visualização.

- Para um elemento incorporado: todos os elementos de conteúdo do documento incorporado que estão posicionados no tamanho inicial do elemento incorporado.

- Para um elemento AMP simples (por exemplo, `amp-img`): os próprios recursos, como uma imagem ou um vídeo.

O acionador do elemento AMP ou de incorporação precisa incluir um [`selector`](#element-selector) que aponte para o elemento:
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request",
    "selector": "#embed1"
  }
}
```

O evento de carregamento inicial também é emitido pelo próprio documento e pode ser configurado como:
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request"
  }
}
```

##### Acionador de visibilidade de página e elemento <a name="page-and-element-visibility-trigger"></a>

Use o acionador de visibilidade da página (`"on": "visible"`) para disparar uma solicitação quando a página se tornar visível. O disparo desse acionador pode ser configurado usando `visibilitySpec`.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
  }
}
```

O acionador de visibilidade de elemento pode ser configurado para qualquer elemento AMP ou raiz de documento usando [`selector`](#element-selector). O acionador será disparado quando o elemento especificado corresponder aos parâmetros de visibilidade que podem ser personalizados usando o `visibilitySpec`.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "elementview",
    "selector": "#ad1",
    "visibilitySpec": {/* optional visibility spec */}
  }
}
```

O seletor só pode ser usado para especificar um único elemento, não um conjunto deles. O elemento pode ser um [elemento AMP estendido](https://github.com/ampproject/amphtml/blob/main/spec/amp-tag-addendum.md#amp-specific-tags) ou uma raiz de documento.

O acionador de visibilidade de elemento aguarda o sinal especificado pela propriedade `waitFor` em `visibilitySpec` antes de rastrear a visibilidade do elemento. Se `waitFor` não for especificado, ele aguardará o sinal [`ini-load`](#initial-load-trigger) do elemento. Consulte a documentação de `waitFor` para ver mais detalhes.
Se `reportWhen` for especificado, o acionador aguardará esse sinal antes de enviar o evento. Isso é útil, por exemplo, para o envio de eventos de análise quando a página é fechada.

##### Acionador de erro <a name="error-trigger"></a>

O evento de erro do usuário (`"on": "user-error"`) é acionado quando ocorre um erro que pode ser atribuído ao autor da página ou ao software usado para publicar a página. Isso inclui, mas não se limita a, configuração incorreta de um componente AMP, anúncios configurados incorretamente ou declarações com falhas. Os erros do usuário também são informados no console para desenvolvedores.

```javascript
"triggers": {
  "userError": {
    "on": "user-error",
     "request": "error"
  }
}
```
[tip type="note"]
Há um [problema conhecido](https://github.com/ampproject/amphtml/issues/10891) de que ele ainda relata erros de incorporações de iframe A4A, que são irrelevantes para a página.
[/tip]

**<a id="visibility-spec"></a>Especificações de visibilidade**

O `visibilitySpec` é um conjunto de condições e propriedades que podem ser aplicadas a acionadores `visible` ou `hidden` para alterar o momento em que eles são disparados. Se várias propriedades forem especificadas, todas elas deverão ser "true" para que uma solicitação seja disparada. As propriedades de configuração aceitas por `visibilitySpec` são:

- `waitFor`: esta propriedade indica que o gatilho de visibilidade precisa aguardar determinado sinal antes de rastrear a visibilidade. Os valores aceitos são `none`, `ini-load` e `render-start`. Se `waitFor` não for definido, ele assumirá o padrão de [`ini-load`](#initial-load-trigger) quando o seletor for especificado, ou `none`, quando não for.

- `reportWhen` : esta propriedade indica que o acionador de visibilidade precisa aguardar determinado sinal antes de enviar o acionador. O único valor aceito é `documentExit`. Os valores `reportWhen` e `repeat` não podem ser usados no mesmo visibilitySpec. Quando `reportWhen` for especificado, o relatório será enviado no momento do sinal, mesmo que os requisitos de visibilidade não tenham sido atendidos naquele momento ou que não tenham sido atendidos anteriormente. Todas as variáveis relevantes (`totalVisibleTime` etc.) serão preenchidas de acordo com os requisitos de visibilidade do `visibilitySpec`.
- `continuousTimeMin` e `continuousTimeMax`: essas propriedades indicam que uma solicitação precisa ser disparada quando (qualquer parte de) um elemento estiver dentro da janela de visualização por um período contínuo entre os tempos mínimo e máximo especificados. Os tempos são expressos em milissegundos. O `continuousTimeMin` assume o padrão 0 quando não é especificado.

- `totalTimeMin` e `totalTimeMax`: essas propriedades indicam que uma solicitação precisa ser disparada quando (qualquer parte de) um elemento estiver dentro da janela de visualização por um período total entre os tempos mínimo e máximo especificados. Os tempos são expressos em milissegundos. O `totalTimeMin` assume o padrão 0 quando não é especificado.

- `visiblePercentageMin` e `visiblePercentageMax`: essas propriedades indicam que uma solicitação precisa ser disparada quando a proporção de um elemento visível na janela de visualização estiver entre as porcentagens mínima e máxima especificadas. Os valores percentuais entre 0 e 100 são válidos. O limite superior (`visiblePercentageMax`) é inclusivo. O limite inferior (`visiblePercentageMin`) é exclusivo, a menos que os dois limites sejam definidos como 0 ou como 100. Se ambos os limites forem definidos como 0, o acionador será disparado quando o elemento não estiver visível. Se ambos os limites forem definidos como 100, o acionador será disparado quando o elemento estiver totalmente visível. Quando essas propriedades são definidas junto com outras propriedades relacionadas ao tempo, apenas o tempo em que elas são atendidas é contado. Os valores padrão para `visiblePercentageMin` e `visiblePercentageMax` são 0 e 100, respectivamente.

- `repeat`: se essa propriedade for definida como `true`, o acionador será disparado sempre que as condições de `visibilitySpec` forem atendidas. No exemplo a seguir, se o elemento for rolado para 51% na visualização, depois para 49% e para 51% novamente, o acionador será disparado duas vezes. No entanto, se `repeat` for configurado como `false`, o acionador será disparado uma vez. O valor padrão de `repeat` é `false`. `reportWhen` e `repeat` não podem ser usados no mesmo visibilitySpec.

```javascript
visibilitySpec: {
  visiblePercentageMin: 50,
  repeat: true,
  }
```

`visiblePercentageThresholds` pode ser usado como um atalho para a criação de várias instâncias de `visibilitySpec` que sejam diferentes apenas quanto a `visiblePercentageMin` e `visiblePercentageMax`. Por exemplo, os exemplos a seguir são equivalentes:

```javascript
// Two triggers with visibilitySpecs that only differ in visiblePercentageMin and visiblePercentageMax:
"triggers": {
  "pageView_30_to_40": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 30,
      "visiblePercentageMax": 40,
      "continuousTimeMin": 1000,
    }
  }

  "pageView_40_to_50": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 40,
      "visiblePercentageMax": 50,
      "continuousTimeMin": 1000,
    }
  }
}

// A single trigger equivalent to both of the above:
"triggers": {
  "pageView": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageThresholds": [[30, 40], [40, 50]],
      "continuousTimeMin": 1000,
    }
  }
}
```

Além das condições acima, o `visibilitySpec` também permite algumas variáveis [documentadas aqui](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#visibility-variables).

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "waitFor": "ini-load",
      "reportWhen": "documentExit",
      "visiblePercentageMin": 20,
      "totalTimeMin": 500,
      "continuousTimeMin": 200
    }
  }
}
```

Além das variáveis fornecidas como parte dos acionadores, também é possível especificar outras substituições/modificações para [variáveis como atributos de dados](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute). Se usados, esses atributos de dados precisam fazer parte do elemento especificado como [`selector`](#element-selector).

##### Acionador de cliques <a name="click-trigger"></a>

Use o acionador de cliques (`"on": "click"`) para disparar uma solicitação quando um elemento especificado receber um clique. Use o [`selector`](#element-selector) para controlar quais elementos farão com que essa solicitação seja disparada. O acionador será disparado para todos os elementos correspondentes ao seletor especificado.

```javascript
"vars": {
  "id1": "#socialButtonId",
  "id2": ".shareButtonClass"
},
"triggers": {
  "anchorClicks": {
    "on": "click",
    "selector": "a, ${id1}, ${id2}",
    "request": "event",
    "vars": {
      "eventId": 128
    }
  }
}
```

Além das variáveis fornecidas como parte dos acionadores, também é possível especificar outras substituições/modificações para [variáveis como atributos de dados](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute). Se usados, esses atributos de dados precisam fazer parte do elemento especificado como `selector`.

##### Acionador de rolagem <a name="scroll-trigger"></a>

Use o acionador de rolagem (`"on": "scroll"`) para disparar uma solicitação sob determinadas condições quando a página for rolada. Esse acionador fornece [variáveis especiais](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#interaction) que indicam os limites que acionaram o envio de uma solicitação. Use `scrollSpec` para controlar quando isso será disparado:

- `scrollSpec`: esse objeto pode conter `verticalBoundaries` e `horizontalBoundaries`. Pelo menos uma das duas propriedades é necessária para que um evento de rolagem seja disparado. Os valores das duas propriedades precisam ser matrizes de números com os limites para a geração de eventos de rolagem. Por exemplo, no snippet de código a seguir, o evento de rolagem será disparado quando a página for rolada verticalmente em 25%, 50% e 90%. Além disso, o evento também será disparado quando a página for rolada horizontalmente para 90% da largura de rolagem. Para manter o desempenho da página, os limites de rolagem são arredondados para o múltiplo de `5` mais próximo.

```javascript
"triggers": {
  "scrollPings": {
    "on": "scroll",
    "scrollSpec": {
      "verticalBoundaries": [25, 50, 90],
      "horizontalBoundaries": [90]
    },
    "request": "event"
  }
}
```

##### Acionador de timer <a name="timer-trigger"></a>

Use o acionador do timer (`"on": "timer"`) para disparar uma solicitação em um intervalo de tempo normal. Use `timerSpec` para controlar quando isso será disparado:
- `timerSpec`: especificação para acionadores do tipo `timer`. A menos que um `startSpec` seja especificado, o timer será acionado imediatamente (por padrão, que pode ser alterado) e, em seguida, em um intervalo especificado.
      - `interval`: duração do intervalo do timer, em segundos.
      - `maxTimerLength`: duração máxima pela qual o timer será disparado, em segundos. Uma outra solicitação será acionada quando o `maxTimerLength` for atingido. O padrão é duas horas. Quando um `stopSpec` estiver presente, mas nenhum maxTimerLength for especificado, o padrão será infinito.

      - `immediate`: aciona o timer imediatamente ou não. Booleano, com padrão definido como "verdadeiro".

```javascript
"triggers": {
  "pageTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 10,
      "maxTimerLength": 600
    },
    "request": "pagetime"
  }
}
```

Para configurar um timer que é usado por eventos de tempo do usuário:

- `startSpec`: especificação para acionar quando um timer é iniciado. Use o valor de `on` e `selector` para rastrear eventos específicos. Uma configuração com um `startSpec` e sem um `stopSpec` só será interrompida depois que o `maxTimerLength` for atingido.
- `stopSpec`: especificação para acionar quando um timer é parado. Uma configuração com um `stopSpec` e sem um `startSpec` será iniciada imediatamente, mas será parada apenas no evento especificado.

```javascript
"triggers": {
  "videoPlayTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 5,
      "startSpec": {
        "on": "video-play",
        "selector": "amp-video"
      },
      "stopSpec": {
        "on": "video-pause",
        "selector": "amp-video"
      }
    },
    "request": "videoRequest"
  }
}
```

Consulte a especificação dos [acionadores](#triggers) para ver detalhes sobre como criar acionadores de timers aninhados. Não é permitido usar um acionador de timer para iniciar ou parar um timer.

##### Acionador oculto <a name="hidden-trigger"></a>

Use o acionador oculto (`"on": "hidden"`) para disparar uma solicitação quando a página ficar oculta.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
  }
}
```

Um [`visibilitySpec`](#visibility-spec) pode ser incluído para que uma solicitação só seja disparada se as condições de duração da visibilidade forem atendidas.
```json
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
    "visibilitySpec": {
      "selector": "#anim-id",
      "visiblePercentageMin": 20,
      "totalTimeMin": 3000,
    }
  }
}
```
A configuração acima é traduzida como:

<blockquote>
Quando a página ficar oculta, dispare uma solicitação se o elemento #anim-id ficar visível (em mais de 20% da área da janela de visualização) por mais de três segundos, no total.
</blockquote>

##### Acionadores de acesso <a name="access-triggers"></a>

O sistema AMP Access emite diversos eventos para diferentes estados do fluxo de acesso. Para ver detalhes sobre acionadores de acesso (`"on": "access-*"`), consulte [AMP Access e Analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md) (link em inglês).

#### Acionadores de análise de vídeo <a name="video-analytics-triggers"></a>

A análise de vídeo fornece vários acionadores (`"on": "video-*"`) que podem ser usados pelos editores para acompanhar diferentes eventos que ocorrem durante o ciclo de vida de um vídeo. Mais detalhes estão disponíveis em [Análise de vídeo de AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md) (link em inglês).

#### Transporte <a name="transport"></a>

O objeto de configuração `transport` especifica como enviar uma solicitação. O valor é um objeto com campos que indicam quais métodos de transporte são aceitáveis.

* `beacon`: indica que [`navigator.sendBeacon`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) pode ser usado para transmitir a solicitação. Isso enviará uma solicitação POST com credenciais. A solicitação será enviada com um corpo vazio, a menos que `useBody` seja configurado como "verdadeiro". Consulte [Usar corpo para outros parâmetros de URL](#use-body-for-extra-url-params) para ver mais informações sobre `useBody`.
* `xhrpost`: indica que `XMLHttpRequest` pode ser usado para transmitir a solicitação. Isso enviará uma solicitação POST com credenciais. A solicitação será enviada com um corpo vazio, a menos que `useBody` seja configurado como "verdadeiro". Consulte [Usar corpo para outros parâmetros de URL](#use-body-for-extra-url-params) para ver mais informações sobre `useBody`.
* `image`: indica que a solicitação pode ser enviada gerando uma tag `Image`. Isso enviará uma solicitação GET. Para suprimir avisos do console devido a respostas vazias ou falhas na solicitação, configure `"image": {"suppressWarnings": true}`.

Fornecedores certificados pelo MRC podem usar um quarto mecanismo de transporte, o "transporte de iframe", adicionando uma string de URL a iframe-transport-vendors.js. Isso indica que um iframe precisa ser criado, com o atributo `src` configurado para esse URL, e que as solicitações serão enviadas para esse iframe por meio de `window.postMessage()`. Nesse caso, as solicitações não precisam ser URLs plenamente desenvolvidos. O `iframe` só pode ser especificado em `iframe-transport-vendors.js`, não in-line dentro da tag `amp-analytics` nem por configuração remota. Além disso, o frame do fornecedor pode enviar uma resposta para ser usada pelo amp-ad-exit. Consulte [analytics-iframe-transport-remote-frame.html](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) e [fake_amp_ad_with_iframe_transport.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html): o primeiro arquivo envia um objeto JSON de resposta de {'collected-data': 'abc'}, e o último arquivo usa esse objeto para substituir "abc" por "bar_" em finalUrl.

Se mais de um dos métodos de transporte acima for ativado, a precedência será de `iframe` &gt; `beacon` &gt; `xhrpost` &gt; `image`. Somente um método de transporte será usado, e será aquele com a maior precedência e que estiver disponível e for permitido. Se o user agent do cliente não for compatível com um método, a próxima opção ativada com maior precedência será usada. Por padrão, os quatro métodos acima ficam ativados.

No exemplo abaixo, um URL de `iframe` não é especificado, e `beacon` e `xhrpost` são configurados como `false`. Portanto, eles não serão usados, embora tenham maior precedência que `image`. Nesse caso, `image` seria configurada como `true` por padrão, mas explicitamente declarada aqui. Se o user agent do cliente for compatível com o método `image`, ele será usado. Caso contrário, nenhuma solicitação será enviada.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true
}
```

Para saber mais, consulte [este exemplo que implementa a API de cliente para transporte de iframe](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) e [esta página de exemplo que incorpora esse iframe](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport.amp.html) (links em inglês). O exemplo carrega um [anúncio falso](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html), que contém a tag `amp-analytics`. O conteúdo falso do anúncio inclui algumas instruções extras de configuração que precisam ser seguidas.

##### Usar corpo para outros parâmetros de URL <a name="use-body-for-extra-url-params"></a>

A opção de configuração `useBody` indica se os `extraUrlParams` precisam ou não ser incluídos no corpo da solicitação POST, e não no URL, como parâmetros de consulta codificados pelo URL.

O `useBody` só está disponível para os métodos de transporte `beacon` e `xhrpost`. Se `useBody` for definido como "verdadeiro" e usado em conjunto com um desses métodos de transporte, `extraUrlParams` serão enviados no corpo da solicitação POST. Caso contrário, a solicitação será enviada com corpo vazio, e os `extraUrlParams` serão incluídos como parâmetros de URL.

Com o `useBody`, é possível incluir objetos aninhados em `extraUrlParams`. No entanto, se a solicitação retornar para outras opções de transporte que não sejam compatíveis com `useBody` (por exemplo, `image`), esses objetos aninhados serão convertidos em strings no URL como `[object Object]`.

```javascript
"transport": {
  "beacon": true,
  "xhrpost": true,
  "useBody": true,
  "image": false
}
```

##### Política do referenciador <a name="referrer-policy"></a>

A política do referenciador pode ser especificada como um campo `referrerPolicy` na configuração `transport`. Atualmente, apenas o valor `no-referrer` é aceito.
A política do referenciador só está disponível para o transporte `image`. Se `referrerPolicy: no-referrer` for especificado, os transportes `beacon` e `xhrpost` serão modificados para `false`.

```javascript
transport: {
  beacon: false,
  xhrpost: false,
  image: true,
  referrerPolicy: "no-referrer"
  }
```

#### Vinculadores <a name="linkers"></a>

O recurso `linkers` é usado para ativar a sincronização de códigos entre domínios. O `amp-analytics` usará um [objeto de configuração](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md#format) para criar uma "string de vinculação", que será anexada aos links de saída especificados na página como parâmetro de URL. Quando um usuário clica em um desses links, a página de destino lê a string do vinculador no parâmetro de URL para executar a sincronização de código. Geralmente, esse recurso é usado para entrar em sessões de usuário em um domínio proxy de AMP e em um domínio do editor

Veja detalhes sobre como configurar o vinculador em [Encaminhamento do código do vinculador](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md).

Se você precisar ingerir esse parâmetro, consulte as informações sobre como o parâmetro é criado em [Recebimento de código do vinculador](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md).

#### Cookies <a name="cookies"></a>

O recurso de `cookies` é compatível com a gravação de cookies no domínio de origem extraindo as informações de [`QUERY_PARAM`](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md#query-parameter) e [`LINKER_PARAM`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#linker-param) do URL do documento. Ele pode ser usado com os recursos `linkers` para executar a sincronização de código do domínio de AMP em proxy para páginas AMP no domínio de um editor.

Detalhes sobre como configurar os `cookies` podem ser encontrados em [Receber parâmetros do vinculador em páginas AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#receiving-linker-params-on-amp-pages)

## Validação <a name="validation"></a>

Consulte [as regras do amp-analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/validator-amp-analytics.protoascii) nas especificações do validador de AMP.

### Atributos válidos para `<amp-analytics>` <a name="valid-attributes-for-"></a>

Estes são os atributos válidos para o componente `amp-analytics`:

**type**

Especifica o tipo de fornecedor.  Para ver detalhes, consulte a lista de [fornecedores do Analytics](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md).

Exemplo:

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json"></amp-analytics>
```

**config**

Este é um atributo opcional, que pode ser usado para carregar uma configuração de um URL remoto especificado. O URL especificado precisa usar o esquema HTTPS. Consulte também o atributo `data-include-credentials` abaixo. O URL pode incluir [variáveis de URL de AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md) (link em inglês). A resposta precisa seguir as [diretrizes de segurança de CORS nas AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md) (link em inglês).

Exemplo:

```html
<amp-analytics config="https://example.com/analytics.config.json"></amp-analytics>
```

**data-credentials**<a name="data-credentials"></a>

Se for configurado como `include`, isso ativará a capacidade de ler e gravar cookies na solicitação especificada pelo atributo `config`. Trata-se de um atributo opcional.

**data-consent-notification-id**

Se fornecido, a página não processará as solicitações de análise até que uma [amp-user-notification](amp-user-notification.md) com o código de elemento HTML especificado seja confirmada (aceita) pelo usuário. Trata-se de um atributo opcional.

## Análise para componentes AMP <a name="analytics-for-amp-components"></a>

Os desenvolvedores de componentes AMP podem implementar a coleta de dados usando análise de AMP. Para ver mais informações, consulte a seção [Implementar análises para componentes AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-components-analytics.md).
