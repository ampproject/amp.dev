---
'$title': Ações e eventos no e-mail AMP
$order: 0
formats:
  - email
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-email-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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

[tip type="note"] Esta documentação cobre ações e eventos para o formato de e-mail AMP. Leia [Ações e eventos](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-actions-and-events.md) para sites AMP, histórias e anúncios. [/tip]

O atributo `on` é usado para instalar handlers de eventos em elementos. Os eventos que são suportados dependem do elemento.

O valor para a sintaxe é uma simples linguagem de domínio específica da forma:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

Veja a tabela abaixo para descrições de cada parte da sintaxe.

<table>
  <tr>
    <th width="30%">Sintaxe</th>
    <th width="18%">Obrigatório?</th>
    <th width="42%">Descrição</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>sim</td>
    <td>Este é o nome do evento que um elemento expõe.</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>sim</td>
    <td>Este é a id do DOM para o elemento, ou um <a href="#special-targets">alvo especial</a> predefinido sobre o qual você gostaria de executar uma ação em resposta ao evento. No exemplo a seguir, o <code>targetId</code> é o id do DOM para o alvo <code>amp-lightbox</code>, <code>photo-slides</code>. <pre>&lt;amp-lightbox id="photo-slides">&lt;/amp-lightbox> &lt;button on="tap:photo-slides">Mostrar Imagens&lt;/button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>não</td>
    <td>Isto é para elementos com ações default.<br><p>Este é o método que o elemento alvo (referenciado por <code>targetId</code>) expõe e que você gostaria de executar quando o evento for disparado.</p> <p>AMP possui um conceito de ação default que elementos podem implementar. Portanto, ao omitir o <code>methodName</code>, o AMP irá executar esse método default.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>não</td>
    <td>Algumas ações, se documentadas, podem aceitar argumentos. Os argumentos são definidos entre parênteses na notação <code>chave=valor</code>. Os valores aceitos são: <ul> <li>cadeias de caracteres simples sem aspas: <code>simple-value</code> </li> <li>cadeias de caracteres com aspas: <code>"string value"</code> ou <code>'string value'</code> </li> <li>valores booleanos: <code>true</code> ou <code>false</code> </li> <li>números: <code>11</code> ou <code>1.1</code> </li> <li>referência para dados do evento usando sintaxe-ponto: <code>event.someDataVariableName</code> </li> </ul>
</td>
  </tr>
</table>

## Lidando com múltiplos eventos <a name="handling-multiple-events"></a>

Você pode escutar múltiplos eventos em um elemento separando os eventos com um ponto-e-vírgula `;`.

Exemplo: `on="submit-success:lightbox1;submit-error:lightbox2"`

## Múltiplas ações para um evento <a name="multiple-actions-for-one-event"></a>

Você pode executar múltiplas ações em sequência para o mesmo evento, separando as ações com uma vírgula

Exemplo: `on="tap:target1.actionA,target2.actionB"`

## Eventos e ações definidos globalmente <a name="globally-defined-events-and-actions"></a>

O AMP define um evento `tap` no escopo global que você pode escutar em qualquer elemento HTML (inclusive elementos AMP).

O AMP também define as ações `hide`, `show` e `toggleVisibility` globalmente, que você pode ativar em qualquer elemento HTML.

[tip type="note"]

Um elemento só pode ser mostrado se estiver anteriormente oculto por uma ação `hide` ou `toggleVisibility` ou usando o atributo [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden). A ação `show` não suporta elementos ocultos pela propriedade `display:none` do CSS ou pelo `layout=nodisplay` do AMP.

Por exemplo, o seguinte é possível em AMP:

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## Eventos específicos por elemento <a name="element-specific-events"></a>

### \* - todos os elementos <a name="---all-elements"></a>

<table>
  <tr>
    <th>Evento</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>Disparado quando o elemento recebe um clique/toque.</td>
  </tr>
</table>

### Elementos de entrada <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">Evento</th>
    <th width="30%">Descrição</th>
    <th width="40%">Elementos</th>
    <th>Dados</th>
  </tr>
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Disparado quando o valor do elemento é alterado e confirmado.<p>As propriedades de dados espelham as do <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> e do <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a>.</p>
</td>
    <td><code>input</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value<br>event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td> <code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value</pre>
    </td>
  </tr>
  <tr>
    <td><code>input-debounced</code></td>
    <td>Disparado quando o valor do elemento é alterado. Isto é semelhante ao evento <code>change</code> padrão, mas só dispara depois que se passaram 300ms desde que o valor da entrada parou de mudar.</td>
    <td>Elementos que disparam o evento <code>input</code>.</td>
    <td>Mesmos dados do evento <code>change</code>.</td>
  </tr>
  <tr>
    <td><code>input-throttled</code></td>
    <td>Disparado quando o valor do elemento é alterado. Isto é semelhante ao evento <code>change</code> padrão, mas disparar no máximo uma vez a cada 100ms enquanto o valor da entrada está mudando.</td>
    <td>Elementos que disparam o evento <code>input</code>.</td>
    <td>Mesmos dados do evento <code>change</code>.</td>
  </tr>
</table>

### amp-accordion > section <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrição</th>
    <th width="40%">Dados</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>Disparado quando uma seção do acordeon expande.</td>
    <td>Nenhum.</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>Disparado quando uma seção do acordeon fecha.</td>
    <td>Nenhum.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrição</th>
    <th width="40%">Dados</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>Disparado quando o carrossel muda de slide.</td>
    <td><pre>// Slide number.<br>event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrição</th>
    <th width="40%">Dados</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>Disparado quando a lightbox estiver totalmente visível.</td>
    <td>Nenhum.</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>Disparado quando a lightbox estiver totalmente fechada.</td>
    <td>Nenhum.</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrição</th>
    <th width="40%">Dados</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code> (baixa confiança)</td>
    <td>Disparado quando a recuperação de dados falha.</td>
    <td>Nenhum.</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrição</th>
    <th width="40%">Dados</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>Disparado quando uma opção é selecionada ou deselecionada.</td>
    <td><pre>// Target element's "option" attribute value.<br>event.targetOption<br>// Array of "option" attribute values of all selected elements.<br>event.selectedOptions</pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrição</th>
    <th width="40%">Dados</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>Disparado quando a barra lateral estiver totalmente aberta depois que uma transição é finalizada.</td>
    <td>Nenhum.</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>Disparado quando a barra lateral estiver totalmente fechada depois que uma transição é finalizada.</td>
    <td>Nenhum.</td>
  </tr>
</table>

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrição</th>
    <th width="40%">Dados</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code> (baixa confiança)</td>
    <td>Disparado quando a recuperação de dados falha.</td>
    <td>Nenhum.</td>
  </tr>
</table>

### form <a name="form"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrição</th>
    <th width="40%">Dados</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Disparado quando o formulário é enviado.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>Disparado quando a resposta ao formulário for bem sucedida.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>Disparado quando a resposta ao formulário for um erro.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>Disparado quando o formulário é válido.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>Disparado quando o formulário é inválido.</td>
    <td></td>
  </tr>
</table>

## Element-specific actions <a name="element-specific-actions"></a>

### \* (all elements) <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>Oculta o elemento-alvo</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Exibe o elemento-alvo. Se um <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">elemento <code>autofocus</code></a> se torna visível como resultado, ele ganha foco.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>Alterna a visibilidade do elemento alvo. Se um <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">elemento <code>autofocus</code></a> se torna visível como resultado, ele ganha foco.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>Alterna a classe do elemento-alvo. <code>force</code> é opcional e, se definido, garante que a classe seja apenas adicionada, mas não removida, se configurada como  <code>true</code> e removida, mas não adicionada, se configurada como <code>false</code>.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Faz o elemento alvo ganhar foco. Para perder o foco, aplique <code>focus</code> em outro elemento (geralmente no elemento pai). Aconselhamos fortemente contra perder o foco ao focar no <code>body</code>/<code>documentElement</code> por razões de acessibilidade.</td>
  </tr>
</table>

### amp-accordion <a name="amp-accordion-1"></a>

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>toggle(section=STRING)</code></td>
    <td>Alterna os estados <code>expanded</code> e <code>collapsed</code> das seções <code>amp-accordion</code>. Quando chamado sem argumentos, ele alterna todas as seções do acordeon. Dispare numa seção específica fornecendo o id da seção: <code>on="tap:myAccordion.toggle(section=id')"</code>.</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>Abre as seções do acordeon. Se uma seção já estiver aberta, ela permanece aberta. Quando chamado sem argumentos, ele alterna todas as seções do acordeon. Dispare numa seção específica fornecendo o id da seção: <code>on="tap:myAccordion.expand(section=</code>
</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>Fecha as seções do acordeon. Se uma seção já estiver fechada, ela permanece fechada. Quando chamado sem argumentos, ele alterna todas as seções do acordeon. Dispare numa seção específica fornecendo o id da seção: <code>on="tap:myAccordion.collapse(section=</code>
</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>goToSlide(index=INTEGER)</code></td>
    <td>Avança o carrossel para um índice de slide especificado.</td>
  </tr>
</table>

### amp-image-lightbox <a name="amp-image-lightbox"></a>

<table>
  <tr>
    <th width="40%">Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Abre a lightbox da imagem, com a imagem-fonte sendo a que disparou a ação.</td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox"></a>

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Abre a lightbox.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Fecha a lightbox.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrição</th>
    <th width="40%">Dados</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>Atualiza o layout de <code>amp-list</code> para <code>layout="CONTAINTER"</code> para permitir <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">redimensionamento dinâmico</a>.</td>
  </tr>
  <tr>
    <td> <code>fetch-error</code> (baixa confiança)</td>
    <td>Disparado quando a recuperação de dados falha.</td>
    <td>Nenhum.</td>
  </tr>
</table>

### amp-selector <a name="amp-selector"></a>

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Limpa todas as seleções de um <code>amp-selector</code> definido.</td>
  </tr>
  <tr>
    <td><code>selectUp(delta=INTEGER)</code></td>
    <td>Move a seleção para cima pelo valor `delta`. O `delta` default é definido como -1. Se nenhuma opção for selecionada, o estado selecionado será o valor da última opção.</td>
  </tr>
  <tr>
    <td><code>selectDown(delta=INTEGER)</code></td>
    <td>Move a seleção para baixo pelo valor `delta`. O `delta` default é definido como 1. Se nenhuma opção for selecionada, o estado selecionado será o valor da primeira opção.</td>
  </tr>
  <tr>
    <td><code>toggle(index=INTEGER, value=BOOLEAN)</code></td>
    <td>Alterna a aplicação do `selected`. Se o atributo select estiver ausente, esta ação o adiciona. Se o atributo select estiver presente, esta ação o remove. Você pode forçar e manter uma adição ou remoção incluindo um valor booleano no argumento `value`. Um valor `true` forçará a adição do atributo `selected` e não o removerá se ele já estiver presente. Um valor `false` removerá o atributo, mas não o adicionará se ausente.</td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar"></a>

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Abre a barra lateral.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Fecha a barra lateral.</td>
  </tr>
  <tr>
    <td><code>toggle</code></td>
    <td>Alterna o estado da barra lateral.</td>
  </tr>
</table>

### form <a name="form-1"></a>

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Limpa quaisquer valores nas entradas do formulário.</td>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Envia o formulário.</td>
  </tr>
</table>

## Alvos especiais <a name="special-targets"></a>

A seguir, estão listados os alvos fornecidos pelo sistema AMP que possuem requisitos especiais:

### Alvo: AMP <a name="target-amp"></a>

O alvo `AMP` é fornecido pelo runtime do AMP e implementa ações top-level que se aplicam a todo o documento.

<table>
  <tr>
    <th width="40%">Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Requer <a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a>.</p>
      <p>Funde um literal de objeto para o estado bindable.</p>
      <p></p>
    </td>
  </tr>
</table>

<sup>1</sup>Quando usado com <a href="#multiple-actions-for-one-event">múltiplas ações</a>, ações subsequentes irão aguardar a conclusão de <code>setState()</code> antes da chamada. Apenas um único <code>setState()</code> é permitido por evento.
