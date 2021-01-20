---
$title: amp-selector
$category@: dynamic-content
teaser:
  text: Representa um controle que exibe um menu de opções para escolha do usuário.
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



Representa um controle que exibe um menu de opções para escolha do usuário.

<table>
  <tr>
    <td class="col-fourty" width="40%"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>Todos</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemplos</strong></td>
    <td>Consulte um exemplo de <a href="https://ampbyexample.com/components/amp-selector/">amp-selector</a> no site AMP By Example.</td>
  </tr>
</table>


## Comportamento <a name="behavior"></a>

O seletor de AMP é um controle que representa uma lista de opções para que o usuário escolha uma ou mais delas. O conteúdo das opções não se limita apenas a texto.

* Um `amp-selector` pode conter elementos HTML arbitrários ou componentes AMP (por exemplo, `amp-carousel`, `amp-img` etc.).
* Um `amp-selector` não pode conter nenhum controle aninhado de `amp-selector`.
* As opções selecionáveis podem ser definidas adicionando o atributo `option` ao elemento e atribuindo um valor ao atributo (por exemplo, `<li option='value'></li>`).
* As opções desativadas podem ser definidas adicionando o atributo `disabled` ao elemento (por exemplo, `<li option='d' disabled></li>`).
* Opções pré-selecionadas podem ser definidas adicionando o atributo `selected` ao elemento (por exemplo, `<li option='b' selected></li>`).
* Para permitir várias seleções, adicione o atributo `multiple` ao elemento `amp-selector`.  Por padrão, o `amp-selector` permite uma seleção por vez.
* Para desativar o `amp-selector` inteiro, adicione o atributo `disabled` ao elemento `amp-selector`.
* Quando um `amp-selector` contém um atributo `name` e o `amp-selector` está dentro de uma tag `form`, se um evento de envio ocorrer no formulário, o `amp-selector` se comportará como um botão de opção/caixa de seleção e enviará os valores selecionados (atribuídos à opção) para o nome do `amp-selector`.

Exemplo:

```html

<form id="form1" action="/" method="get" target="_blank">
  <amp-selector name="single_image_select" layout="container">
    <ul>
      <li><amp-img src="/img1.png" width="50" height="50" option="1"></amp-img></li>
      <li><amp-img src="/img2.png" width="50" height="50" option="2"></amp-img></li>
      <li option="na" selected="">None of the Above</li>
    </ul>
  </amp-selector>
  <amp-selector name="multi_image_select" layout="container" multiple="">
    <amp-img src="/img1.png" width="50" height="50" option="1"></amp-img>
    <amp-img src="/img2.png" width="50" height="50" option="2"></amp-img>
    <amp-img src="/img3.png" width="50" height="50" option="3"></amp-img>
  </amp-selector>
  <amp-selector name="multi_image_select_1" layout="container" multiple="">
    <amp-carousel id="carousel-1" width="200" height="60" controls="">
      <amp-img src="/img1.png" width="80" height="60" option="a"></amp-img>
      <amp-img src="/img2.png" width="80" height="60" option="b" selected=""></amp-img>
      <amp-img src="/img3.png" width="80" height="60" option="c"></amp-img>
      <amp-img src="/img4.png" width="80" height="60" option="d" disabled=""></amp-img>
    </amp-carousel>
  </amp-selector>
</form>

<p><amp-selector name="multi_image_select_2" layout="container" multiple="" form="form1">
  <amp-carousel height="300" id="carousel-1" type="slides" width="400" controls="">
    <amp-img height="60" src="/img1.png" width="80" option="a"></amp-img>
    <amp-img height="60" src="/img2.png" width="80" option="b" selected=""></amp-img>
    <amp-img height="60" src="/img3.png" width="80" option="c"></amp-img>
    <amp-img height="60" src="/img4.png" width="80" option="d"></amp-img>
  </amp-carousel>
</amp-selector>
```

## Apagar seleções <a name="clearing-selections"></a>

Para limpar todas as seleções quando se toca ou clica em um elemento, defina o atributo de ação [`on`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) no elemento e especifique o `id` seletor de AMP com o método de ação `clear`.

Exemplo:

```html
<button on="tap:mySelector.clear">Clear Selection</button>
<amp-selector id="mySelector" layout="container" multiple>
  <div option>Option One</div>
  <div option>Option Two</div>
  <div option>Option Three</div>
</amp-selector>
```

[tip type="success"]
veja demonstrações ativas no [AMP By Example](https://ampbyexample.com/components/amp-selector/).
[/tip]

## Atributos <a name="attributes"></a>

### Atributos em `<amp-selector>` <a name="attributes-on-"></a>

<table>
  <tr>
    <td width="40%"><strong>disabled, form, multiple, name</strong></td>
    <td>Os atributos acima se comportam da mesma maneira que em um elemento HTML padrão <code>select</code>  [](https://developer.mozilla.org/en/docs/Web/HTML/Element/select).</td>
  </tr>
  <tr>
    <td width="40%"><strong>keyboard-select-mode</strong></td>
    <td>O atributo <code>keyboard-select-mode</code> determina o comportamento de navegação do teclado para opções dentro de <code>amp-selector</code>.

    <ul><li><code>none</code> (padrão): a tecla Tab altera o foco entre os itens em <code>amp-selector</code>. O usuário precisa pressionar Enter ou espaço para alterar a seleção. As teclas de seta estão desativadas. </li><li>
    <code>focus</code>: a tecla Tab coloca o foco em <code>amp-selector</code>. O usuário navega entre os itens usando as teclas de seta. Pressione a tecla de espaço ou Enter para alterar a seleção.</li><li>
    <code>select</code>: a tecla Tab coloca o foco em <code>amp-selector</code>. A seleção muda conforme o usuário navega pelas opções com as teclas de seta. </li></ul></td>
      </tr>
    </table>

### Atributos nas opções de `<amp-selector>` <a name="attributes-on--options"></a>

<table>
  <tr>
    <td width="40%"><strong>option</strong></td>
    <td>Indica que a opção é selecionável.  Se um valor for especificado, o conteúdo do valor será enviado junto com o formulário.</td>
  </tr>
  <tr>
    <td width="40%"><strong>disabled, selected</strong></td>
    <td>Os atributos acima se comportam da mesma maneira que em um elemento HTML padrão [<code>option</code>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option).</td>
  </tr>
</table>

## Eventos <a name="events"></a>

Os eventos podem acionar ações em outros componentes AMP usando o atributo `on`.
Por exemplo, `on="select: my-tab.show"`

Leia mais sobre [ações e eventos de AMP](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md).

<table>
  <tr>
    <td width="40%"><strong>select</strong></td>
    <td><code>amp-selector</code>  aciona o evento <code>select</code> quando o usuário seleciona uma opção.
        Os seletores múltiplos e únicos acionam essa opção ao selecionar ou desmarcar opções.
        Tocar em opções desativadas não aciona o evento <code>select</code>.
        <ul>
        <li>
          <code>event.targetOption</code> contém o valor do atributo <code>option</code>  do elemento selecionado.</li>
          <li>
            <code>event.selectedOptions</code> contém uma matriz dos valores do atributo <code>option</code>  de todos os elementos selecionados.
          </li>
        </ul></td>
      </tr>

    </table>

## Validação <a name="validation"></a>

Veja as [regras do amp-selector](https://github.com/ampproject/amphtml/blob/master/extensions/amp-selector/validator-amp-selector.protoascii) (link em inglês) nas especificações do validador de AMP.
