---
$title: amp-list
$category@: dynamic-content
teaser:
  text: Faz o download de dados dinamicamente e cria itens para listas usando um modelo.
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



Busca conteúdo dinamicamente a partir de um endpoint JSON CORS e o renderiza usando um modelo fornecido.

<table>
  <tr>
    <td width="40%"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemplos</strong></td>
    <td>Veja um <a href="https://ampbyexample.com/components/amp-list/">exemplo de amp-list</a> no site AMP By Example.</td>
  </tr>
</table>

## Uso <a name="usage"></a>

O componente `<amp-list>` busca conteúdo dinâmico de um endpoint JSON CORS. A resposta do endpoint contém dados, que são renderizados no modelo especificado.

[tip type="important"]
seu endpoint precisa implementar os requisitos definidos nas especificações de [Solicitações de CORS em AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md) (link em inglês).
[/tip]

Você pode especificar um modelo de duas maneiras:

* um atributo `template` que faça referência a um código de um elemento `template` ou `script` existente;
* um elemento `template` ou `script` aninhado diretamente no elemento `amp-list`.

Para ver mais detalhes sobre modelos, consulte [Modelos HTML para AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-templates.md) (link em inglês).

*Exemplo: exibição de uma lista dinâmica*

No exemplo a seguir, recuperamos dados JSON que contêm URLs e títulos e renderizamos o conteúdo em um [modelo amp-mustache](amp-mustache.md) aninhado.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
  {% endraw %}</template>
</amp-list>
```
[/example]

Veja o arquivo JSON que usamos:

```json
{
 "items": [
   {
     "title": "AMP YouTube Channel",
     "url": "https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw"
   },
   {
     "title": "AMP.dev",
     "url": "https://amp.dev/"
   },
   {
     "title": "AMP Validator",
     "url": "https://validator.amp.dev/"
   },
   {
     "title": "AMP Playground",
     "url": "https://playground.amp.dev/"
   }
 ]
}
```
Veja como estilizamos o conteúdo buscado:

```css
amp-list div[role="list"] {
  display: grid;
  grid-gap: 0.5em;
  }
```

## Comportamento <a name="behavior"></a>

A solicitação é sempre feita a partir do cliente, mesmo que o documento tenha sido veiculado pelo cache de AMP. O carregamento é acionado usando regras normais de AMP, dependendo da distância entre o elemento e a janela de visualização atual.

Se o `<amp-list>` precisar de mais espaço após o carregamento, ele solicitará que o ambiente de tempo de execução de AMP atualize a altura usando o fluxo AMP normal. Se o ambiente de tempo de execução de AMP não atender à solicitação da nova altura, ele exibirá o elemento `overflow`, quando disponível. No entanto, a colocação comum dos elementos `<amp-list>` na parte inferior do documento quase sempre garante que o ambiente de tempo de execução de AMP possa redimensioná-los.

Por padrão, o `<amp-list>` adiciona uma função ARIA `list` ao elemento de lista e uma função `listitem` aos elementos de item renderizados pelo modelo.

### Criação de lote XHR <a name="xhr-batching"></a>

A AMP cria lotes XMLHttpRequests (XHRs) para endpoints JSON, ou seja, você pode usar uma única solicitação de dados JSON como uma fonte de dados para vários consumidores (por exemplo, vários elementos `<amp-list>`) em uma página AMP.  Por exemplo, se seu `<amp-list>` fizer um XHR para um endpoint, durante o período de veiculação do XHR, todos os XHRs subsequentes para o mesmo endpoint não serão acionados e, em vez disso, retornarão os resultados do primeiro XHR.

No `<amp-list>`, você pode usar o atributo [`items`](#items-optional) para renderizar um subconjunto da resposta JSON, permitindo que vários elementos `<amp-list>` renderizem conteúdo diferente, mas compartilhem o mesmo XHR.

### Especificação de um menu flutuante <a name="specifying-an-overflow"></a>

Opcionalmente, o elemento `<amp-list>` pode conter um elemento com um atributo `overflow`. Esse elemento será mostrado se o ambiente de tempo de execução de AMP não puder redimensionar o elemento `<amp-list>` conforme solicitado.

*Exemplo: exibição de um menu flutuante quando a lista precisar de mais espaço*

No exemplo a seguir, mostramos uma lista de imagens e títulos. Como o conteúdo de `<amp-list>` requer mais espaço do que o disponível, o ambiente de tempo de execução de AMP exibe o elemento de menu flutuante.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="140"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-data.json">
  <template type="amp-mustache">{% raw %}
    <div class="image-entry">
      <amp-img src="{{imageUrl}}"
        width="100"
        height="75"></amp-img>
      <span class="image-title">{{title}}</span>
    </div>
  {% endraw %}</template>
  <div overflow
    class="list-overflow">
    See more
  </div>
</amp-list>
```
[/example]

Veja o CSS para o `overflow`:

```css
.list-overflow[overflow] {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  }
```

### Marcador e substituto <a name="placeholder-and-fallback"></a>

Opcionalmente, o `<amp-list>` é compatível com o uso de um marcador e/ou substituto.

* Um *marcador* é um elemento filho com o atributo `placeholder`. Esse elemento é mostrado até que o `<amp-list>` seja carregado. Se um substituto também for fornecido, o marcador ficará oculto quando `<amp-list>` não for carregado.
* Um *substituto* é um elemento filho com o atributo `fallback`. Esse elemento é exibido se há falha no carregamento do `<amp-list>`.

Saiba mais sobre [marcadores e substitutos](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). Um elemento filho não pode ser um marcador e um substituto ao mesmo tempo.

```html
<amp-list src="https://foo.com/list.json">
  <div placeholder>Loading ...</div>
  <div fallback>Failed to load data.</div>
</amp-list>
```

### Atualização de dados <a name="refreshing-data"></a>

O elemento `<amp-list>` expõe uma ação `refresh` que outros elementos podem referenciar nos atributos `on="tap:..."`.

```html
{% raw %}<button on="tap:myList.refresh">Refresh List</button>
<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}
```

### Redimensionamento dinâmico <a name="dynamic-resizing"></a>

##### Experimental: amp-list-resizable-children <a name="experiment-amp-list-resizable-children"></a>

Em muitos casos, o `<amp-list>` pode ser necessário para fazer o redimensionamento na interação do usuário. Por exemplo, quando o `<amp-list>` contém um amp-accordion em que um usuário pode tocar, quando o conteúdo do `<amp-list>` muda de tamanho devido a classes CSS vinculadas ou quando o número de itens dentro de um `<amp-list>` muda devido a um atributo `[src]` vinculado. A ação `changeToLayoutContainer` trata disso alterando o amp-list para `layout="CONTAINER"` ao acionar essa ação. Veja o exemplo a seguir:

```html
{% raw %}<button on="list.changeToLayoutContainer()">Show Grid</button>
<amp-list id="list"
          width="396" height="80" layout="responsive"
          src="/test/manual/amp-list-data.json?RANDOM">
  <template type="amp-mustache">
    {{title}}
  </template>
</amp-list>
{% endraw %}
```

Essa ação está disponível de modo experimental em `amp-list-resizable-children`.

## Atributos <a name="attributes"></a>

##### src (obrigatório) <a name="src-required"></a>

O URL do endpoint remoto que retorna o JSON que será renderizado dentro do `<amp-list>`. Ele precisa ser um serviço HTTP CORS. O protocolo do URL precisa ser HTTPS.

[tip type="important"]
seu endpoint precisa implementar os requisitos definidos nas especificações de [Solicitações de CORS em AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md) (link em inglês).
[/tip]

O atributo `src` pode ser omitido se o atributo `[src]` existir. Isso é útil ao renderizar conteúdo como resultado de um gesto do usuário, e não de um carregamento de página, ao trabalhar com [`amp-bind`](amp-bind.md).

##### credentials (opcional) <a name="credentials-optional"></a>

Define uma opção de `credentials`, conforme especificado pela [API Fetch](https://fetch.spec.whatwg.org/).

* Valores aceitos: `omit`, `include`
* Padrão: `omit`

Para enviar credenciais, transmita o valor de `include`. Se esse valor for definido, a resposta precisará seguir as [diretrizes de segurança do AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

Veja um exemplo que especifica a inclusão de credenciais para exibir conteúdo personalizado em uma lista:

```html
{% raw %}
<amp-list credentials="include"
          src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)">
  <template type="amp-mustache">
    Your personal offer: ${{price}}
  </template>
</amp-list>
{% endraw %}
```

##### items (opcional) <a name="items-optional"></a>

Define a expressão para localizar a matriz a ser renderizada dentro da resposta. Essa é uma expressão com notação dot que navega pelos campos da resposta JSON.
Por padrão, o `<amp-list>` espera uma matriz. O atributo `single-item` pode ser usado para carregar dados de um objeto.

* O valor padrão é `"items"`. A resposta esperada é: `{items: [...]}`.
* Se a resposta em si for a matriz desejada, use o valor `"."`. A resposta esperada é: `[...]`.
* A navegação aninhada é permitida (por exemplo, `"field1.field2"`). A resposta esperada é: `{field1: {field2: [...]}}`.

Quando `items="items"` é especificado (que é o padrão), a resposta precisa ser um objeto JSON que contenha uma propriedade de matriz chamada `"items"`:
```text
{
  "items": [...]
}
```

#### max-items (opcional) <a name="max-items-optional"></a>

Um valor inteiro que especifica o comprimento máximo da matriz de itens a ser renderizada.
A matriz `items` será truncada para entradas `max-items` se o valor retornado exceder `max-items`.

#### single-item (opcional) <a name="single-item-optional"></a>

Faz com que `<amp-list>` trate o resultado retornado como se fosse uma única matriz de elementos. Uma resposta de objeto será agrupada em uma matriz, de modo que
`{items: {...}}` se comportará como se fosse `{items: [{...}]}`.

#### reset-on-refresh (opcional) <a name="reset-on-refresh-optional"></a>

Exibe novamente um marcador e um indicador de carregamento quando a origem da lista é atualizada por `amp-bind` ou pela ação `refresh()`.

Por padrão, isso só será acionado em atualizações que gerem uma busca na rede. Para redefinir em todas as atualizações, use `reset-on-refresh="always"`.

#### [is-layout-container] (experimental, opcional) <a name="binding-optional"></a>

Este é um atributo vinculável que deve sempre ser falso por padrão. Quando definido como verdadeiro por meio de `bind`, ele altera o layout do `<amp-list>` para o layout `CONTAINER`. Esse atributo é útil para lidar com o redimensionamento dinâmico de amp-list. Esse atributo não pode ser verdadeiro por padrão pelo mesmo motivo pelo qual `<amp-list>` não é compatível com o layout `CONTAINER`, ou seja, por que ele pode fazer com que haja saltos de conteúdo no primeiro carregamento. Esse atributo está disponível de modo experimental em `amp-list-resizable-children`. Como alternativa, também é possível usar a ação `changeToLayoutContainer`.

#### binding (opcional) <a name="is-layout-container-optional"></a>

Para páginas que usam o `<amp-list>` e também o `amp-bind`, o atributo controla se a renderização deve ou não ser bloqueada na avaliação de vinculações (por exemplo, `[text]` ) em filhos renderizados.

Recomendamos o uso de `binding="no"` ou `binding="refresh"` para um desempenho mais rápido.

* `binding="no"`: nunca bloquear a renderização **(o mais rápido de todos)**.
* `binding="refresh"`: não bloquear a renderização no carregamento inicial **(mais rápido)**.
* `binding="always"`: sempre bloquear a renderização **(lento)**.

Se o atributo `binding` não for fornecido, o padrão será `always`.

## Experimental: carregar mais e rolagem infinita (amp-list-load-more) <a name="common-attributes"></a>

Introduzimos o experimento `amp-list-load-more` como uma implementação de paginação e rolagem infinita em `<amp-list>`. É possível ativar esse recurso ativando o experimento "amp-list-load-more" na [página de experimentos](https://cdn.ampproject.org/experiments.html) (link em inglês) e adicionando o atributo `load-more` a `<amp-list>`. Esse recurso está em versão de teste de origem, e as APIs finais podem mudar.

#### Exemplo de uso <a name="load-more-and-infinite-scroll"></a>

```html
<amp-list height="200" src="https://my.rest.endpoint/" width="100" load-more="auto">
  <template type="amp-mustache">
    // ...
  </template>
</amp-list>

```

Para ver exemplos de funcionamento, consulte [test/manual/amp-list/infinite-scroll-1.amp.html](https://github.com/ampproject/amphtml/blob/main/test/manual/amp-list/infinite-scroll-1.amp.html) e [test/manual/amp-list/infinite-scroll-2.amp.html](https://github.com/ampproject/amphtml/blob/main/test/manual/amp-list/infinite-scroll-1.amp.html) (links em inglês).

### Atributos <a name="sample-usage"></a>

#### load-more (obrigatório) <a name="attributes-1"></a>

Este atributo aceita dois valores: "auto" ou "manual". A configuração do valor "manual" para o atributo exibe um botão "load-more" ao final de `<amp-list>`. A configuração do valor "auto" para esse atributo faz com que o `<amp-list>` carregue automaticamente mais elementos em três janelas de visualização para baixo, causando um efeito de rolagem infinita.

#### load-more-bookmark (opcional) <a name="load-more-mandatory"></a>

Este atributo especifica um nome de campo nos dados retornados que fornecem o URL dos próximos itens a serem carregados. Se o atributo não for especificado, o `<amp-list>` espera que o payload json tenha o campo `load-more-src`, que corresponde ao próximo URL a ser carregado. No caso em que esse campo recebe outro nome, você pode especificar o nome dele no campo `load-more-bookmark`.Por exemplo, no payload a seguir, especificaríamos `load-more-bookmark="next"`.

```
{ "items": [...], "next": "https://url.to.load" }
```

### Personalização de elementos load-more <a name="load-more-bookmark-optional"></a>

O `<amp-list>` com o atributo `load-more` contém estes elementos de IU: um botão "load-more ", um carregador, um elemento de falha no carregamento e, opcionalmente, uma marcação do fim da lista. Esses elementos podem ser personalizados fornecendo elementos `<amp-list-load-more>` como filhos de `<amp-list>` com os seguintes atributos:

#### load-more-button <a name="customizing-load-more-elements"></a>

Um elemento `<amp-list-load-more>` com o atributo `load-more-button`, que aparece no fim da lista (para o load-more manual) se houver mais elementos a serem carregados. Clicar nesse elemento acionará uma busca para carregar mais elementos do URL contido no campo `load-more-src` ou no campo dos dados retornados correspondente ao atributo `load-more-bookmark`. Esse elemento pode ser personalizado fornecendo ao `<amp-list>` um elemento filho que tenha o atributo `load-more-button`.

##### Exemplo: <a name="load-more-button"></a>

```html
{% raw %}
<amp-list load-more="manual" src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-button>
    <button>See More</button> /* My custom see more button */
  </amp-list-load-more>
</amp-list>
{% endraw %}
```
  Pode ser criado a partir de um modelo via `amp-mustache`.

##### Exemplo: <a name="example"></a>

```html
{% raw %}<amp-list load-more="auto" width="100" height="500" src="https://www.load.more.example.com/">
  ...
  <amp-list-load-more load-more-button>
    <template type="amp-mustache">
      Showing {{#count}} out of {{#total}} items
      <button>
        Click here to see more!
      </button>
    </template>
  </amp-list-load-more>
</amp-list>
{% endraw %}
```

#### load-more-loading <a name="example-1"></a>

Este elemento é um carregador que será exibido se o usuário chegar ao fim da lista e o conteúdo ainda estiver carregando, ou se o usuário clicar no elemento `load-more-button` enquanto os novos filhos do `<amp-list>` ainda estiverem carregando. Esse elemento pode ser personalizado fornecendo ao `<amp-list>` um elemento filho que tenha o atributo `load-more-loading`. Veja o exemplo a seguir:
```html
<amp-list load-more=auto src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-loading>
    <svg>...</svg> /* My custom loader */
  </amp-list-load-more>
</amp-list>
```

#### load-more-failed <a name="load-more-loading"></a>

Um elemento `<amp-list-load-more>` que contém o atributo `load-more-failed` com um botão com o atributo `load-more-clickable`, que será exibido na parte inferior do `<amp-list>` se o carregamento falhar. Clicar nesse elemento aciona uma atualização do URL que falhou. Esse elemento pode ser personalizado fornecendo ao `<amp-list>` um elemento filho que tenha o atributo `load-more-failed`. Veja um exemplo a seguir:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <button>Unable to Load More</button>
  </amp-list-load-more>
</amp-list>
```

No exemplo acima, o elemento `load-more-failed` inteiro é clicável. No entanto, um padrão comum para esse elemento é um elemento de "falha no carregamento" geralmente não clicável, que contém um botão "atualizar". Para compensar, você pode ter um elemento que geralmente não é clicável com um botão que contenha o elemento `load-more-clickable`. Exemplo:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <div>
      Here is some unclickable text saying sorry loading failed.
    </div>
    <button load-more-clickable>Click me to reload!</button>
  </amp-list-load-more>
</amp-list>
```

#### load-more-end <a name="load-more-failed"></a>

Este elemento não é fornecido por padrão, mas se um elemento `<amp-list-load-more>` que contenha o atributo `load-more-end` estiver anexado ao `<amp-list>` como um elemento filho, o elemento será exibido na parte inferior do `<amp-list>` se não houver mais itens.  Esse elemento pode ser baseado em um modelo por meio do `amp-mustache`. Veja um exemplo a seguir:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-end>
    Congratulations! You've reached the end. /* Custom load-end element */
  </amp-list-load-more>
</amp-list>
```

##### common attributes <a name="load-more-end"></a>

Este elemento inclui [atributos comuns](../../../documentation/guides-and-tutorials/learn/common_attributes.md) estendidos a componentes de AMP.

## Substituições <a name="substitutions"></a>

O `<amp-list>` permite todas as substituições de variáveis de URL padrão.
Consulte o [Guia de substituições](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) (em inglês) para ver mais informações.

Por exemplo:
```html
<amp-list src="https://foo.com/list.json?RANDOM"></amp-list>
```
pode fazer uma solicitação para algo como `https://foo.com/list.json?0.8390278471201`, em que o valor de RANDOM é gerado aleatoriamente em cada impressão.

## Validação <a name="validation"></a>

Consulte as [regras do amp-list](https://github.com/ampproject/amphtml/blob/main/extensions/amp-list/validator-amp-list.protoascii) (em inglês) nas especificações do validador de AMP.
