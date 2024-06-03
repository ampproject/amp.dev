---
$title: amp-bind
$category@: dynamic-content
teaser:
  text: Permite que os elementos se alterem em resposta às ações do usuário ou a mudanças nos dados por meio de expressões simples semelhantes às do JavaScript e vinculação de dados.
---



Adiciona interatividade personalizada com expressões e vinculação de dados.


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


<table>
  <tr>
    <td class="col-fourty"><strong>Script obrigatório</strong></td>
    <td>
      <div>
          <code>&lt;script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js">&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemplos</strong></td>
    <td>
      <ul>
        <li><a href="https://ampbyexample.com/components/amp-bind/">Exemplo de código introdutório com anotações</a></li>
        <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Exemplo de carrossel de imagens vinculado com anotações</a></li>
        <li><a href="https://ampbyexample.com/samples_templates/product/">Exemplo de página de produto de comércio eletrônico com anotações</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Tutoriais</strong></td>
    <td><a href="../../../documentation/guides-and-tutorials/develop/interactivity/index.md">Criação de páginas AMP interativas</a></td>
  </tr>
</table>

# Visão geral <a name="overview"></a>

O componente `amp-bind` permite que você adicione interatividade personalizada com estado às suas páginas AMP por meio de vinculação de dados e expressões semelhantes às do JavaScript.

<figure class="alignment-wrapper  margin-">
  <amp-youtube width="480" height="270" data-videoid="xzCFU8b5fCU" layout="responsive"></amp-youtube>
  <figcaption>Assista a este vídeo de introdução ao amp-bind.</figcaption></figure>

# Um exemplo simples <a name="a-simple-example"></a>

No exemplo a seguir, o toque no botão altera o texto do elemento `<p>` de “Hello World” para “Hello amp-bind”.

```html

<p [text]="'Hello ' + foo">Hello World</p>

<button on="tap:AMP.setState({foo: 'amp-bind'})">Say "Hello amp-bind"</button>
```

[tip type="note"]
para melhorar o desempenho e evitar o risco de saltos de conteúdo inesperados, o `amp-bind` não avalia expressões durante o carregamento da página. Isso significa que os elementos visuais precisam receber um estado padrão e não depender de `amp-bind` para a renderização inicial.
[/tip]

### Como funciona? <a name="how-does-it-work"></a>

`amp-bind` tem três componentes principais:

1. [Estado](#state): um estado JSON mutável com escopo de documento. No exemplo acima, o estado está vazio antes do toque no botão.  Depois de tocar no botão, o estado é `{foo: 'amp-bind'}`.
2. [Expressões](#expressions): são expressões semelhantes às do JavaScript que podem fazer referência ao **estado**. O exemplo acima tem uma única expressão, `Hello ' + foo`, que concatena a string literal `Hello` e a variável de estado `foo`.
Há um limite de 100 operandos que podem ser usados em uma expressão.
3. [Vinculações](#bindings): são atributos especiais da forma `[property]` que vinculam a propriedade de um elemento a uma **expressão**. O exemplo acima tem uma única vinculação, `[text]`, que atualiza o texto do elemento `<p>` toda vez que o valor da expressão é alterado.

O `amp-bind` tem um cuidado especial para garantir velocidade, segurança e desempenho para as páginas AMP.

### Um exemplo um pouco mais complexo <a name="a-slightly-more-complex-example"></a>

```html
<!-- Store complex nested JSON data in <amp-state> elements. -->
<amp-state id="myAnimals">
  <script type="application/json">
    {
      "dog": {
        "imageUrl": "/img/dog.jpg",
        "style": "greenBackground"
      },
      "cat": {
        "imageUrl": "/img/cat.jpg",
        "style": "redBackground"
      }
    }
  </script>
</amp-state>

<p [text]="'This is a ' + currentAnimal + '.'">This is a dog.</p>

<!-- CSS classes can also be added or removed with [class]. -->
<p class="greenBackground" [class]="myAnimals[currentAnimal].style">
  Each animal has a different background color.
</p>

<!-- Or change an image's src with the [src] binding. -->
<amp-img width="300" height="200" src="/img/dog.jpg" [src]="myAnimals[currentAnimal].imageUrl">
</amp-img>

<button on="tap:AMP.setState({currentAnimal: 'cat'})">Set to Cat</button>
```

  Quando o botão é pressionado:

  1. O **estado** é atualizado com `currentAnimal` definido como `'cat'`.
  1. As **expressões** que dependem de `currentAnimal` são avaliadas:

    * `'This is a ' + currentAnimal + '.'` =&gt; `'This is a cat.'`
    * `myAnimals[currentAnimal].style` =&gt; `'redBackground'`
    * `myAnimals[currentAnimal].imageUrl` =&gt;  `/img/cat.jpg`</li>

  1. As **vinculações** que dependem das expressões alteradas são atualizadas:

    * O texto do primeiro elemento `<p>` será "This is a cat".
    * O atributo `class` do segundo elemento `<p>` será "redBackground".
    * O elemento `amp-img` mostrará a imagem de um gato.</li>

  [tip type="success"]
[teste a **demonstração ao vivo**](https://ampbyexample.com/components/amp-bind/) desse exemplo com anotações de código.
[/tip]

# Detalhes <a name="details"></a>

# Estado <a name="state"></a>

Cada documento AMP que usa o `amp-bind` tem dados JSON mutáveis com escopo de documento, ou **estado**.

# Inicializar o estado com `amp-state` <a name="initializing-state-with-amp-state"></a>

O estado do `amp-bind` pode ser inicializado com o componente `amp-state`:

```html
<amp-state id="myState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>
```

As [expressões](#expressions) podem referenciar variáveis de estado com a sintaxe de dot. Neste exemplo, `myState.foo` será avaliado como `"bar"`.

* O JSON filho de um elemento `<amp-state>` tem o tamanho máximo de 100 KB.
* Um elemento `<amp-state>` também pode especificar um URL CORS em vez de um script JSON filho. Consulte o [Apêndice](#amp-state-specification) para ver mais detalhes.

# Estado de atualização <a name="refreshing-state"></a>

A ação `refresh` é compatível com este componente e pode ser usada para atualizar o conteúdo do estado.

```html
<amp-state id="amp-state" ...></amp-state>
<!-- Clicking the button will refresh and refetch the json in amp-state. -->
<button on="tap:amp-state.refresh"></button>
```

# Atualizar o estado com `AMP.setState()` <a name="updating-state-with-ampsetstate"></a>

A ação [`AMP.setState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) mescla o literal de um objeto ao estado. Por exemplo, quando o botão abaixo for pressionado, o `AMP.setState()` [mesclará](#deep-merge-with-ampsetstate) o literal do objeto com o estado.

```html
<!-- Like JavaScript, you can reference existing
       variables in the values of the  object literal. -->
<button on="tap:AMP.setState({foo: 'bar', baz: myAmpState.someVariable})"></button>
```

Em geral, os objetos aninhados são mesclados com uma profundidade máxima de 10. Todas as variáveis, incluindo as introduzidas pelo `amp-state`, podem ser modificadas.

Quando acionado por determinados eventos, o `AMP.setState()` também pode acessar dados relacionados a eventos na propriedade `event`.

```html
<!-- The "change" event of this <input> element contains
    a "value" variable that can be referenced via "event.value". -->
<input type="range" on="change:AMP.setState({myRangeValue: event.value})">
```

# Modificar o histórico com `AMP.pushState()` <a name="modifying-history-with-amppushstate"></a>

A ação [`AMP.pushState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) é semelhante à `AMP.setState()`, mas também envia uma nova entrada para a pilha do histórico do navegador. Abrir essa entrada do histórico (por exemplo, navegando de volta) restaura o valor anterior de variáveis definidas por `AMP.pushState()`.

Por exemplo:
```html
<button on="tap:AMP.pushState({foo: '123'})">Set 'foo' to 123</button>
```

* Tocar no botão configura a variável `foo` como 123 e envia uma nova entrada de histórico.
* Navegar de volta restaura `foo` para o valor anterior, "bar" (o que é equivalente a chamar `AMP.setState({foo: 'bar'})`.

# Expressões <a name="expressions"></a>

As expressões são semelhantes às do JavaScript, mas têm algumas diferenças importantes.

# Diferenças em relação ao JavaScript <a name="differences-from-javascript"></a>

* As expressões só podem acessar o [estado](#state) do documento que as contém.
* As expressões **não** têm acesso a globais, como `window` ou `document`.
* Apenas operadores e [funções da lista de permissões](#allow-listed-functions) podem ser usados.
* Funções, classes e loops personalizados geralmente não são permitidos. As funções de seta são permitidas como parâmetros, por exemplo, `Array.prototype.map`.
* Variáveis indefinidas e array-index-out-of-bounds retornam `null`, em vez de `undefined` ou de gerar erros.
* Uma expressão única atualmente está limitada a 50 operandos, por motivos de desempenho. [Fale conosco](https://github.com/ampproject/amphtml/issues/new) se esse número for insuficiente para seu caso de uso.

A gramática e a implementação completas da expressão podem ser encontradas em [bind-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expr-impl.jison) e [bind-expression.js](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expression.js).

# Exemplos <a name="examples"></a>

Todas as expressões a seguir são válidas:

```javascript
1 + '1'           // 11
1 + (+'1')        // 2
!0                // true
null || 'default' // 'default'
```

# Funções da lista de permissões <a name="allow-listed-functions"></a>

<table>
  <tr>
    <th>Tipo de objeto </th>
    <th>Funções</th>
    <th>Exemplo</th>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods"><code>Array</code></a><sup>1</sup></td>
    <td class="col-thirty">
      <code>concat</code><br>
      <code>filter</code><br>
      <code>includes</code><br>
      <code>indexOf</code><br>
      <code>join</code><br>
      <code>lastIndexOf</code><br>
      <code>map</code><br>
      <code>reduce</code><br>
      <code>slice</code><br>
      <code>some</code><br>
      <code>sort</code> (não em vigor)<br>
      <code>splice</code> (não em vigor)<br>
    </td>
    <td>
      <pre>// Returns [1, 2, 3].
          [3, 2, 1].sort()</pre>
        <pre>// Returns [1, 3, 5].
            [1, 2, 3].map((x, i) =&gt; x + i)</pre>
          <pre>// Returns 6.
              [1, 2, 3].reduce((x, y) =&gt; x + y)</pre>
          </td>
        </tr>
        <tr>
          <td><a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number#Methods"><code>Number</code></a></td>
          <td>
            <code>toExponential</code><br>
            <code>toFixed</code><br>
            <code>toPrecision</code><br>
            <code>toString</code>
            <td>
            <pre>// Returns 3.
                (3.14).toFixed()</pre>
              <pre>// Returns '3.14'.
                  (3.14).toString()</pre>
              </td>
            </tr>
            <tr>
              <td><a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String#Methods"><code>String</code></a></td>
              <td>
                <code>charAt</code><br>
                <code>charCodeAt</code><br>
                <code>concat</code><br>
                <code>indexOf</code><br>
                <code>lastIndexOf</code><br>
                <code>slice</code><br>
                <code>split</code><br>
                <code>substr</code><br>
                <code>substring</code><br>
                <code>toLowerCase</code><br>
                <code>toUpperCase</code></td>
                <td>
                  <pre>// Returns 'abcdef'.
                      abc'.concat('def')</pre>
                  </td>
                </tr>
                <tr>
                  <td><a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math"><code>Math</code></a><sup>2</sup></td>
                  <td>
                    <code>abs</code><br>
                    <code>ceil</code><br>
                    <code>floor</code><br>
                    <code>max</code><br>
                    <code>min</code><br>
                    <code>random</code><br>
                    <code>round</code><br>
                    <code>sign</code></td>
                    <td>
                      <pre>// Returns 1.
                          abs(-1)</pre>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object"><code>Object</code></a><sup>2</sup></td>
                      <td>
                        <code>keys</code><br>
                        <code>values</code>
                        <td>
                        <pre>// Returns ['a', 'b'].
                            keys({a: 1, b: 2})</pre>
                          <pre>// Returns [1, 2].
                              values({a: 1, b: 2}</pre>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects"><code>Global</code></a><sup>2</sup>
                          </td>
                          <td>
                            <code>encodeURI</code><br>
                            <code>encodeURIComponent</code>
                          </td>
                          <td>
                            <pre>// Returns 'Hello%20world'.
                                encodeURIComponent('Hello world')</pre>
                            </td>
                          </tr>
                        </table>

<sup>1</sup>As funções de seta com um único parâmetro não podem ter parênteses. Por exemplo, use `x => x + 1`, em vez de `(x) => x + 1`. Além disso, `sort()` e `splice()` retornam cópias modificadas em vez de operar no local.

<sup>2</sup>Funções estáticas não contêm namespaces. Por exemplo, use `abs(-1)` em vez de `Math.abs(-1)`.

# Definir macros com `amp-bind-macro` <a name="defining-macros-with-amp-bind-macro"></a>

Fragmentos da expressão `amp-bind` podem ser reutilizados definindo uma `amp-bind-macro`. O elemento `amp-bind-macro` permite que você defina uma expressão que use zero ou mais argumentos e faça referência ao estado atual. Uma macro pode ser invocada da mesma forma que uma função, referenciando o valor do atributo `id` em qualquer lugar no seu documento.

```html
<amp-bind-macro id="circleArea" arguments="radius" expression="3.14 * radius * radius"></amp-bind-macro>

<div>
  The circle has an area of <span [text]="circleArea(myCircle.radius)">0</span>.
</div>

```

Uma macro também pode chamar outras macros <i>definidas antes dela mesma</i>. Uma macro não pode chamar a si mesma recorrentemente.

# Vinculações <a name="bindings"></a>

Uma **vinculação** é um atributo especial da forma `[property]` que vincula a propriedade de um elemento a uma [expressão](#expressions). Como alternativa, uma sintaxe compatível com XML também pode ser usada na forma de `data-amp-bind-property`.

Quando o **estado** é alterado, as expressões são reavaliadas e as propriedades dos elementos vinculados são atualizadas com os resultados da nova expressão.

`amp-bind` é compatível com vinculações de dados em quatro tipos de estados de elementos:

<table>
  <tr>
    <th>Tipo</th>
    <th>Atributos</th>
    <th>Detalhes</th>
  </tr>
  <tr>
    <td class="col-thirty"><a href="https://developer.mozilla.org/pt-BR/docs/Web/API/Node/textContent"><code>Node.textContent</code></a></td>
    <td class="col-thirty"><code>[text]</code></td>
    <td>Compatível com a maioria dos elementos de texto.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Global_attributes/class">Classes CSS</a></td>
    <td><code>[class]</code></td>
    <td>O resultado da expressão precisa ser uma string delimitada por espaços.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Global_attributes/hidden">Atributo <code>hidden</code></a></td>
    <td><code>[hidden]</code></td>
    <td>Precisa ser uma expressão booleana.</td>
  </tr>
  <tr>
    <td>Tamanho dos <a href="../../../documentation/components/index.html">elementos AMP</a></td>
    <td><code>[width]</code><br><code>[height]</code></td>
    <td>Altera a largura e/ou altura do elemento AMP.</td>
  </tr>
  <tr>
    <td>Atributos específicos de elementos</td>
    <td><a href="#element-specific-attributes">Vários</a></td>
    <td></td>
  </tr>
</table>

Observações sobre vinculações:

* Por motivos de segurança, a vinculação a `innerHTML` não é permitida.
* Todas as vinculações de atributo são verificadas em busca de valores não seguros (por exemplo, `javascript:`).
* Resultados de expressão booleana alternam atributos booleanos. Por exemplo: `<amp-video [controls]="expr"...>`. Quando `expr` é avaliado como `true`, o elemento `<amp-video>` tem o atributo `controls`. Quando `expr` é avaliado como `false`, o atributo `controls` é removido.
* Os caracteres de colchete `[` e `]` em nomes de atributos podem ser problemáticos quando se escreve em XML (por exemplo, XHTML, JSX) ou ao escrever atributos por meio de APIs DOM. Nesses casos, use a sintaxe alternativa `data-amp-bind-x="foo"`, em vez de `[x]="foo"`.

# Atributos específicos de elementos <a name="element-specific-attributes"></a>

Apenas a vinculação aos seguintes componentes e atributos é permitida:

<table>
  <tr>
    <th>Componente</th>
    <th>Atributos</th>
    <th>Comportamento</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>&lt;amp-brightcove&gt;</code></td>
    <td class="col-fourty"><code>[data-account]</code><br><code>[data-embed]</code><br><code>[data-player]</code><br><code>[data-player-id]</code><br><code>[data-playlist-id]</code><br><code>[data-video-id]</code></td>
    <td class="col-thirty">Altera o vídeo Brightcove exibido.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-carousel type=slides&gt;</code></td>
    <td><code>[slide]</code><sup>*</sup></td>
    <td>Altera o índice do slide exibido no momento. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Veja um exemplo</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-date-picker&gt;</code></td>
    <td>
      <code>[min]</code><br>
      <code>[max]</code>
    </td>
    <td>
      Define a data selecionável mais antiga.<br>
      Define a data selecionável mais recente.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-google-document-embed&gt;</code></td>
    <td><code>[src]</code><br><code>[title]</code></td>
    <td>Exibe o documento no URL atualizado.<br>Altera o título do documento.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-iframe&gt;</code></td>
    <td><code>[src]</code></td>
    <td>Altera o URL de origem do iframe.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-img&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[src]</code><br><code>[srcset]</code></td>
    <td>Ao vincular a <code>[src]</code>, vincule também a <code>[srcset]</code> para que a vinculação funcione no cache.<br>Veja os <a href="amp-img.md#attributes">atributos amp-img</a> correspondentes.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-lightbox&gt;</code></td>
    <td><code>[open]</code><sup>*</sup></td>
    <td>
      Alterna a exibição do lightbox. Dica: use <code>on="lightboxClose: AMP.setState(...)"</code> para atualizar variáveis quando o lightbox estiver fechado.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-list&gt;</code></td>
    <td><code>[src]</code></td>
    <td>
      Se a expressão for uma string, o atributo buscará e renderizará JSON a partir do URL da string.
      Se a expressão for um objeto ou matriz, o atributo renderizará os dados da expressão.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-selector&gt;</code></td>
    <td><code>[selected]</code><sup>*</sup><br><code>[disabled]</code></td>
    <td>Altera os elementos filhos selecionados atualmente<br>identificados pelos valores do atributo <code>option</code>. Aceita uma lista separada por vírgulas de valores para seleção múltipla. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Veja um exemplo</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-state&gt;</code></td>
    <td><code>[src]</code></td>
    <td>Busca JSON a partir do novo URL e mescla-o com o estado existente. <em>Observe que a atualização seguinte ignorará os elementos <code>&lt;amp-state&gt;</code> para evitar ciclos.</em></td>
  </tr>
  <tr>
    <td><code>&lt;amp-video&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[controls]</code><br><code>[loop]</code><br><code>[poster]</code><br><code>[preload]</code><br><code>[src]</code></td>
    <td>Veja os <a href="amp-video.md#attributes">atributos amp-video</a> correspondentes.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-youtube&gt;</code></td>
    <td><code>[data-videoid]</code></td>
    <td>Altera o vídeo do YouTube exibido.</td>
  </tr>
  <tr>
    <td><code>&lt;a&gt;</code></td>
    <td><code>[href]</code></td>
    <td>Altera o link.</td>
  </tr>
  <tr>
    <td><code>&lt;button&gt;</code></td>
    <td><code>[disabled]</code><br><code>[type]</code><br><code>[value]</code></td>
    <td>Veja os <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/button#Attributes">atributos de button</a> correspondentes.</td>
  </tr>
  <tr>
    <td><code>&lt;details&gt;</code></td>
    <td><code>[open]</code></td>
    <td>Veja os <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/details#Attributes">atributos de details</a> correspondentes.</td>
  </tr>
  <tr>
    <td><code>&lt;fieldset&gt;</code></td>
    <td><code>[disabled]</code></td>
    <td>Ativa ou desativa o conjunto de campos.</td>
  </tr>
  <tr>
    <td><code>&lt;image&gt;</code></td>
    <td><code>[xlink:href]</code><br>
      <td> Veja os <a href="https://developer.mozilla.org/pt-BR/docs/Web/SVG/Element/image">atributos de image</a> correspondentes.</td>
    </tr>
    <tr>
      <td><code>&lt;input&gt;</code></td>
      <td><code>[accept]</code><br><code>[accessKey]</code><br><code>[autocomplete]</code><br><code>[checked]</code><br><code>[disabled]</code><br><code>[height]</code><br><code>[inputmode]</code><br><code>[max]</code><br><code>[maxlength]</code><br><code>[min]</code><br><code>[minlength]</code><br><code>[multiple]</code><br><code>[pattern]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[selectiondirection]</code><br><code>[size]</code><br><code>[spellcheck]</code><br><code>[step]</code><br><code>[type]</code><br><code>[value]</code><br><code>[width]</code></td>
      <td>Veja os <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input#Attributes">atributos de input</a> correspondentes.</td>
    </tr>
    <tr>
      <td><code>&lt;option&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code><br><code>[selected]</code><br><code>[value]</code></td>
      <td>Veja os <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/option#Attributes">atributos de option</a> correspondentes.</td>
    </tr>
    <tr>
      <td><code>&lt;optgroup&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code></td>
      <td>Veja os <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/optgroup#Attributes">atributos de optgroup</a> correspondentes.</td>
    </tr>
    <tr>
      <td><code>&lt;select&gt;</code></td>
      <td><code>[autofocus]</code><br><code>[disabled]</code><br><code>[multiple]</code><br><code>[required]</code><br><code>[size]</code></td>
      <td>Veja os <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/select#Attributes">atributos de select</a> correspondentes.</td>
    </tr>
    <tr>
      <td><code>&lt;source&gt;</code></td>
      <td><code>[src]</code><br><code>[type]</code></td>
      <td>Veja os <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/source#Attributes">atributos de source</a> correspondentes.</td>
    </tr>
    <tr>
      <td><code>&lt;track&gt;</code></td>
      <td><code>[label]</code><br><code>[src]</code><br><code>[srclang]</code></td>
      <td>Veja os <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/track#Attributes">atributos de track</a> correspondentes.</td>
    </tr>
    <tr>
      <td><code>&lt;textarea&gt;</code></td>
      <td><code>[autocomplete]</code><br><code>[autofocus]</code><br><code>[cols]</code><br><code>[disabled]</code><br><code>[maxlength]</code><br><code>[minlength]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[rows]</code><br><code>[selectiondirection]</code><br><code>[selectionend]</code><br><code>[selectionstart]</code><br><code>[spellcheck]</code><br><code>[wrap]</code></td>
      <td>Veja os <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/textarea#Attributes">atributos de textarea</a> correspondentes.</td>
    </tr>
  </table>

  <sup>*</sup>Indica atributos vinculáveis que não têm uma contraparte não vinculável.

# Depuração <a name="debugging"></a>

Teste no modo de desenvolvimento (com o fragmento de URL `#development=1`) para destacar avisos e erros durante o desenvolvimento e para acessar funções especiais de depuração.

# Avisos <a name="warnings"></a>

No modo de desenvolvimento, o `amp-bind` emite um aviso quando o valor padrão de um atributo vinculado não corresponde ao resultado inicial da expressão correspondente. Isso pode ajudar a evitar mutações não intencionais causadas por alterações em outras variáveis de estado. Exemplo:

```html
<!-- The element's default class value ('def') doesn't match the expression result for [class] ('abc'),
so a warning will be issued in development mode. -->
<p class="def" [class]="'abc'"></p>
```

No modo de desenvolvimento, o `amp-bind` também emite um aviso ao desreferenciar variáveis ou propriedades indefinidas. Isso também pode ajudar a evitar mutações não intencionais devido a resultados de expressão `null`. Exemplo:

```html
<amp-state id="myAmpState">
  <script type="application/json">
    { "foo": 123 }
</script>
</amp-state></p>

<!-- The amp-state#myAmpState does not have a `bar` variable, so a warning
  will be issued in development mode. -->
<p [text]="myAmpState.bar">Some placeholder text.</p>
```

# Erros <a name="errors"></a>

Há vários tipos de erros de tempo de execução que podem ser encontrados ao trabalhar com o `amp-bind`.

<table>
  <tr>
    <th>Tipo</th>
    <th>Mensagem</th>
    <th>Sugestão</th>
  </tr>
  <tr>
    <td class="col-thirty">Vinculação inválida</td>
    <td class="col-fourty"><em>A vinculação a [someBogusAttribute] em &lt;P> não é permitida</em>.</td>
    <td class="col-thirty">Use somente <a href="#element-specific-attributes">vinculações da lista de permissões</a>.</td>
  </tr>
  <tr>
    <td>Erro de sintaxe</td>
    <td><em>Erro de compilação de expressão em…</em></td>
    <td>Verifique se há erros de digitação na expressão.</td>
  </tr>
  <tr>
    <td>Funções não permitidas</td>
    <td><em>alert não é uma função compatível.</em></td>
    <td>Use somente <a href="#allow-listed-functions">funções da lista de permissões</a>.</td>
  </tr>
  <tr>
    <td>Resultado corrigido</td>
    <td><em>"javascript:alert(1)" não é um resultado válido para [href].</em></td>
    <td>Evite protocolos ou expressões de URL banidos que possam ser reprovados pelo Validador de AMP.</td>
  </tr>
  <tr>
    <td>Violação da CSP</td>
    <td><em>Criação de um worker a partir de 'blob:...' recusada porque isso viola a seguinte diretiva da Política de Segurança de Conteúdo…</em></td>
    <td>Adicione <code>default-src blob:</code> à Política de Segurança de Conteúdo da sua origem. O <code>amp-bind</code> delega o trabalho dispendioso a um <a href="https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Workers_API/Using_web_workers#Dedicated_workers">worker da Web dedicado</a> para garantir um bom desempenho.</td>
  </tr>
</table>

# Estado de depuração <a name="debugging-state"></a>

Use o `AMP.printState()` para imprimir o estado atual no console.

# Apêndice <a name="appendix"></a>

# Especificação `<amp-state>` <a name="amp-state-specification"></a>

Um elemento `amp-state` pode conter um elemento `<script>` filho **OU** um atributo `src` contendo um URL CORS para um endpoint JSON remoto, mas não ambos.

```html
<amp-state id="myLocalState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>

<amp-state id="myRemoteState" src="https://data.com/articles.json">
</amp-state>
```

# Criação de lote XHR <a name="xhr-batching"></a>

O AMP cria lotes XMLHttpRequests (XHRs) em endpoints JSON, ou seja, você pode usar uma única solicitação de dados JSON como uma fonte de dados para vários consumidores (por exemplo, vários elementos `<amp-state>`) em uma página AMP.  Por exemplo, se seu elemento `<amp-state>` fizer um XHR para um endpoint durante o período de veiculação do XHR, todos os XHRs subsequentes para o mesmo endpoint não serão acionados e, em vez disso, retornarão os resultados do primeiro XHR.

# Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>O URL do endpoint remoto que retornará o JSON que atualizará esse <code>amp-state</code>. Ele precisa ser um serviço HTTP CORS.
        O atributo <code>src</code> permite todas as substituições de variáveis de URL padrão. Consulte o <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md">Guia de substituições</a> (em inglês) para ver mais informações.
        [tip type="important"]
      o endpoint precisa implementar os requisitos definidos nas especificações de <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md">Solicitações CORS nas AMP</a> (link em inglês).
      [/tip]</td>
  </tr>
  <tr>
    <td width="40%"><strong>credentials (opcional)</strong></td>
    <td>Define uma opção de <code>credentials</code> conforme especificado pela <a href="https://fetch.spec.whatwg.org/">API Fetch</a>.
      <ul>
        <li>Valores aceitos: `omit`, `include`</li>
        <li>Padrão: `omit`</li>
      </ul>
      Para enviar credenciais, passe o valor de <code>include</code>. Se esse valor estiver configurado, a resposta precisará seguir as <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp">diretrizes de segurança do CORS AMP</a> (link em inglês).</td>
    </tr>
  </table>

# Mesclagem com `AMP.setState()` <a name="deep-merge-with-ampsetstate"></a>

Quando o `AMP.setState()` é chamado de `amp-bind`, ele mescla o literal do objeto fornecido com o estado atual. Todas as variáveis do literal do objeto são escritas diretamente no estado, exceto para objetos aninhados, que são mesclados de modo recorrente. Primitivas e matrizes que estão no estado são sempre substituídas por variáveis com o mesmo nome do literal do objeto.

Veja o exemplo a seguir:

```javascript
{
  <!-- State is empty -->
  }
```

```html
<button on="tap:AMP.setState({employee: {name: 'John Smith', age: 47, vehicle: 'Car'}})"...></button>
<button on="tap:AMP.setState({employee: {age: 64}})"...></button>
```

Quando o primeiro botão é pressionado, o estado muda para:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 47,
    vehicle: 'Car',
    }
  }
```

Quando o segundo botão for pressionado, o `amp-bind` mesclará recursivamente o argumento do literal do objeto, `{employee: {age: 64}}`, com o estado existente.

```javascript
{
  employee: {
    name: 'John Smith',
    age: 64,
    vehicle: 'Car',
    }
  }
```

`employee.age` foi atualizado, mas as chaves `employee.name` e `employee.vehicle` não foram alteradas.

O `amp-bind` gerará um erro se você chamar `AMP.setState()` com um literal de objeto que contenha referências circulares.

# Remover uma variável <a name="circular-references"></a>

Remova uma variável de estado existente definindo o valor dela como `null` em `AMP.setState()`. Começando com o estado do exemplo anterior, pressionar:

```html
<button on="tap:AMP.setState({employee: {vehicle: null}})"...></button>
```

Mudará o estado para:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 48,
    }
  }
```

Da mesma forma:

```html
<button on="tap:AMP.setState({employee: null})"...></button>
```

Mudará o estado para:

```javascript
{
  <!-- State is empty -->
  }
```

# Gramática de expressões <a name="expression-grammar"></a>

A gramática semelhante a BNF para expressões `amp-bind`:

```text
expr:
    operation
  | invocation
  | member_access
  | '(' expr ')'
  | variable
  | literal

operation:
    '!' expr
  | '-' expr
  | '+' expr
  | expr '+' expr
  | expr '-' expr
  | expr '*' expr
  | expr '/' expr
  | expr '%' expr
  | expr '&&' expr
  | expr '||' expr
  | expr '<=' expr
  | expr '<' expr
  | expr '>=' expr
  | expr '>' expr
  | expr '!=' expr
  | expr '==' expr
  | expr '?' expr ':' expr

invocation:
    expr '.' NAME args

args:
    '(' ')'
  | '(' array ')'
  ;

member_access:
    expr member
  ;

member:
    '.' NAME
  | '[' expr ']'

variable:
    NAME
  ;

literal:
    STRING
  | NUMBER
  | TRUE
  | FALSE
  | NULL
  | object_literal
  | array_literal

array_literal:
    '[' ']'
  | '[' array ']'

array:
    expr
  | array ',' expr

object_literal:
    '{' '}'
  | '{' object '}'

object:
    key_value
  | object ',' key_value

key_value:
  expr ':' expr
```
