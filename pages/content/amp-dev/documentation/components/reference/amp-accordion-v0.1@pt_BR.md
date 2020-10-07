---
$title: amp-accordion
$category@: layout
teaser:
  text: Oferece aos usuários uma visualização rápida do conteúdo e permite pular para a seção desejada.
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



Oferece aos usuários uma visualização rápida do conteúdo e permite pular para qualquer seção. Isso é útil para dispositivos móveis, em que é preciso rolar para ver até mesmo algumas frases.

<table>
  <tr>
    <td class="col-fourty"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>container</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemplos</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-accordion/">Exemplo de código com notas para amp-accordion</a></td>
  </tr>
</table>


## Comportamento <a name="behavior"></a>

O componente `amp-accordion` permite exibir seções de conteúdo que podem ser recolhidas e expandidas. Cada um dos filhos imediatos do componente `amp-accordion` é considerado uma seção do accordion. Cada um desses nós precisa ser uma tag `<section>`.

* Um `amp-accordion` pode conter um ou mais elementos `<section>` como filhos diretos.
* Cada `<section>` precisa conter exatamente dois filhos diretos.
* O primeiro filho da seção representa o cabeçalho e precisa ser um elemento de cabeçalho (ou seja, `h1`, `h2`, …, `h6`, `header`).
* O segundo filho da seção pode ser qualquer tag permitida no HTML para AMP e representa o conteúdo da seção.
* Ao clicar ou tocar no título de uma seção, ela se expande ou recolhe.
* O estado recolhido/expandido de cada seção do elemento `amp-accordion` será preservado em cada nível. Para desativar a preservação desse estado, adicione o atributo `disable-session-states` ao elemento `amp-accordion`.

#### Exemplo: exibição de um accordion <a name="example-displaying-an-accordion"></a>

Neste exemplo, exibimos três seções, sendo que a terceira é expandida no carregamento da página.  Além disso, desativamos a preservação do estado recolhido/expandido definindo `disable-session-states`.

[example preview="inline" playground="true" imports="amp-accordion"]
```html
<amp-accordion{% if not format=='email'%} disable-session-states{% endif %}>
  <section>
    <h2>Section 1</h2>
    <p>Content in section 1.</p>
  </section>
  <section>
    <h2>Section 2</h2>
    <div>Content in section 2.</div>
  </section>
  <section expanded>
    <h2>Section 3</h2>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/squirrel.jpg"
      width="320"
      height="256"></amp-img>
  </section>
</amp-accordion>
```
[/example]

[tip type="success"]
Para ver mais demonstrações do `amp-accordion`, visite o site [AMP By Example](https://ampbyexample.com/components/amp-accordion/).
[/tip]


### Eventos <a name="events"></a>

Os eventos abaixo serão acionados nas `section`s do `accordion`.

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Este evento é acionado na <code>section</code> de destino que muda do estado recolhido para o expandido. Se você chamar <code>expand</code> em uma <code>section</code> já expandida, o evento não será acionado.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>Este evento é acionado na <code>section</code> de destino que muda do estado expandido para o recolhido. Se você chamar <code>collapse</code> em uma <code>section</code> já recolhida, o evento não será acionado.</td>
  </tr>
</table>

### Ações <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Este evento é acionado na <code>section</code> de destino que muda do estado recolhido para o expandido. Se você chamar <code>expand</code> em uma <code>section</code> já expandida, o evento não será acionado.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>toggle</code></strong></td>
    <td>Esta ação alterna entre os estados <code>expanded</code> e <code>collapsed</code> do <code>amp-accordion</code>. Quando chamada sem argumentos, ela alterna todas as seções do accordion. Uma única seção pode ser especificada com o argumento <code>section</code> e o <code>id</code> correspondente como valor.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Esta ação expande um <code>amp-accordion</code>. Se ele já for <code>expanded</code>, permanecerá assim. Quando chamada sem argumentos, ela expande todas as seções do accordion. Uma única seção pode ser especificada com o argumento <code>section</code> e o <code>id</code> correspondente como valor.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>Esta ação recolhe um <code>amp-accordion</code>. Se ele já estiver recolhido, permanecerá assim. Quando chamada sem argumentos, ela recolhe todas as seções do accordion. Uma única seção pode ser especificada com o argumento <code>section</code> e o <code>id</code> correspondente como valor.</td>
  </tr>
</table>

#### Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong><code>animate</code></strong></td>
    <td>Defina este atributo no <code>&lt;amp-accordion&gt;</code> para animar a expansão/recolhimento de todas as seções do accordion.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>disable-session-states</code></strong></td>
    <td>Defina este atributo no <code>&lt;amp-accordion&gt;</code> para desativar a preservação do estado recolhido/expandido do accordion.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expanded</code></strong></td>
    <td>Defina este atributo em uma <code>&lt;section&gt;</code> para exibir a seção como expandida no carregamento da página.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand-single-section</code></strong></td>
    <td>Defina este atributo no <code>&lt;amp-accordion&gt;</code> para permitir que apenas uma <code>&lt;section&gt;</code> seja expandida por vez. Se o usuário colocar o foco sobre uma <code>&lt;section&gt;</code>, qualquer outra <code>&lt;section&gt;</code> expandida anteriormente será recolhida.</td>
  </tr>
</table>

## Estilo <a name="styling"></a>

* Você pode usar o seletor de elemento do `amp-accordion` para estilizá-lo à vontade.
* Os elementos `amp-accordion` são sempre `display: block`.
* Os elementos `<section>`, de cabeçalho e conteúdo não podem ser flutuantes.
* Quando a seção é expandida, o elemento `<section>` tem um atributo `expanded`.
* O elemento de conteúdo é clear-fixed com `overflow:hidden` e, portanto, não pode ter barras de rolagem.
* As margens dos elementos `<amp-accordion>`, `<section>`, de cabeçalho e conteúdo são definidas como 0 e podem ser modificadas em estilos personalizados.
* Os elementos de cabeçalho e conteúdo são `position:relative`.

## Validação <a name="validation"></a>

Consulte as [regras do amp-accordion](https://github.com/ampproject/amphtml/blob/master/extensions/amp-accordion/validator-amp-accordion.protoascii) (em inglês) nas especificações do validador de AMP.
