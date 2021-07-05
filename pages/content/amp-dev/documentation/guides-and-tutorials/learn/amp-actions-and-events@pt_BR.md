---
'$title': Ações e eventos
$order: 0
formats:
  - websites
  - stories
  - ads
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
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

[tip type="note"] Esta documentação cobre ações e eventos para sites, histórias e anúncios AMP. Leia [Ações e eventos no e-mail AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-email-actions-and-events.md) para o formato de e-mail do AMP. [/tip]

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
    <td>Isto é para elementos com ações default.<br><p>Este é o método que o elemento alvo (referenciado por <code>targetId</code>) expõe e que você gostaria de executar quando o evento for disparado.</p> <p>O AMP possui um conceito de ação default que elementos podem implementar. Portanto, ao omitir o <code>methodName</code>, o AMP irá executar esse método default.</p>
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

Você pode executar múltiplas ações em sequência para o mesmo evento, separando as ações com uma vírgula ','.

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
  <!-- change -->
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Disparado quando o valor do elemento é alterado e confirmado.<p>As propriedades de dados espelham as do <a>HTMLInputElement</a> e do <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a>.</p>
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
  <!-- input-debounced -->
  <tr>
    <td><code>input-debounced</code></td>
    <td>Disparado quando o valor do elemento é alterado. Isto é semelhante ao evento <code>change</code> padrão, mas só dispara depois que se passaram 300ms desde que o valor da entrada parou de mudar.</td>
    <td>Elementos que disparam o evento <code>input</code>.</td>
    <td>Mesmos dados do evento <code>change</code>.</td>
  </tr>
    <!-- input-throttled -->
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
    <td>Disparado quando uma seção do acordeon abre.</td>
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
    <td><code>changeToLayoutContainer</code></td>
    <td>Atualiza o layout de <code>amp-list</code> para <code>layout="CONTAINTER"</code> para permitir <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">redimensionamento dinâmico</a>.</td>
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

### amp-state <a name="amp-state-1"></a>

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

### amp-video, amp-youtube <a name="amp-video-amp-youtube"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrição</th>
    <th width="40%">Dados</th>
  </tr>
  <tr>
    <td> <code>firstPlay</code> (baixa confiança)</td>
    <td>Disparado na primeira vez que o vídeo for executado pelo usuário. Em videos autoplay, este evento é disparado assim que o usuário interage com o vídeo. Este evento é de baixa confiança, o que significa que ele não pode desencadear a maioria das ações; apenas ações de baixa confiança, como ações <code>amp-animation</code> podem ser executadas.</td>
    <td></td>
  </tr>
  <tr>
    <td> <code>timeUpdate</code> (baixa confiança)</td>
    <td>Disparado quando a posição de reprodução de um vídeo é alterada. A frequência do evento é controlada pelo AMP e está definida atualmente em intervalos de 1 segundo. Este evento é de baixa confiança, o que significa que ele não pode desencadear a maioria das ações; apenas ações de baixa confiança, como ações <code>amp-animation</code> podem ser executadas.</td>
    <td>
<code>{time, percent}</code><code>time</code> time indica o tempo atual em segundos, <code>percent</code> é um número entre 0 e 1 e indica a posição atual como uma porcentagem do tempo total.</td>
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
    <td>Fired when the form submission response is success.</td>
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

## Ações específicas por elemento <a name="element-specific-actions"></a>

### \* (todos os elementos) <a name="-all-elements"></a>

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
    <td><code>scrollTo(duration=INTEGER, position=STRING)</code></td>
    <td>Rola um elemento para a visualização com uma animação suave.<br><br><code>duration</code> é opcional. Especifica a duração da animação em milissegundos. Se não for especificado, um valor relativo à diferença de rolagem menor ou igual a 500 milissegundos é usado.<br><br><code>position</code> é opcional. Um dentre <code>top</code>, <code>center</code> ou <code>bottom</code> (padrão <code>top</code>). Especifica a posição do elemento em relação à janela de visualização após a rolagem.<br><br>Como prática recomendada de acessibilidade, junte isto com uma chamada para <code>focus()</code> para focar no elemento que está sendo rolado.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Faz o elemento alvo ganhar foco. Para perder o foco, aplique <code>focus</code> em outro elemento (geralmente no elemento pai). Aconselhamos fortemente contra perder o foco ao focar no <code>body</code>/<code>documentElement</code> por razões de acessibilidade.</td>
  </tr>
</table>

### amp-audio <a name="amp-audio"></a>

<table>
  <tr>
    <th width="20%">Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Executa o áudio. É um no-op se o elemento <code>&lt;amp-audio></code> for um descendente de <code>&lt;amp-story></code>.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Pausa o áudio. É um no-op se o elemento <code>&lt;amp-audio></code> for um descendente de <code>&lt;amp-story></code>.</td>
  </tr>
</table>

### amp-bodymovin-animation <a name="amp-bodymovin-animation"></a>

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Executa a animação.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Pausa a animação.</td>
  </tr>
  <tr>
    <td><code>stop</code></td>
    <td>Interrompe a animação.</td>
  </tr>
  <tr>
    <td><code>seekTo(time=INTEGER)</code></td>
    <td>Define o currentTime da animação para o valor especificado e pausa a animação.</td>
  </tr>
  <tr>
    <td><code>seekTo(percent=[0,1])</code></td>
    <td>Usa o valor percentual fornecido para determinar o currentTime da animação para o valor especificado e pausa a animação.</td>
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
    <td>Abre as seções do acordeon. Se uma seção já estiver aberta, ela permanece aberta. Quando chamado sem argumentos, ele alterna todas as seções do acordeon. Dispare numa seção específica fornecendo o id da seção: <code>on="tap:myAccordion.expand(section='section-id')"</code>.</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>Fecha as seções do acordeon. Se uma seção já estiver fechada, ela permanece fechada. Quando chamado sem argumentos, ele alterna todas as seções do acordeon. Dispare numa seção específica fornecendo o id da seção: <code>on="tap:myAccordion.collapse(section='section-id')"</code>.</td>
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
  <tr>
    <td><code>toggleAutoplay(toggleOn=true|false)</code></td>
    <td>Alterna o status de reprodução automática do carrossel. <code>toggleOn</code> é opcional.</td>
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

### amp-lightbox-gallery <a name="amp-lightbox-gallery"></a>

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>open</code></td>
    <td>Abre a galeria lightbox. Pode ser disparado tocando em outro elemento, se você especificar o ID da imagem: `on="tap:amp-lightbox-gallery.open(id='image-id')"`.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Atualiza os dados do <code>src</code> e renderiza novamente a lista.</td>
  </tr>
</table>

### amp-live-list <a name="amp-live-list"></a>

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>update (default)</code></td>
    <td>Atualiza os itens do DOM para mostrar o conteúdo atualizado.</td>
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

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Atualiza os dados vinculados ao atributo `src` enquanto ignora o cache do navegador.</td>
  </tr>
</table>

### amp-user-notification <a name="amp-user-notification"></a>

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>dismiss (default)</code></td>
    <td>Oculta o elemento de notificação do usuário referenciado.</td>
  </tr>
</table>

### Elementos de vídeo <a name="video-elements"></a>

As ações abaixo são suportadas nos seguintes elementos de vídeo AMP: `amp-video`, `amp-youtube`, `amp-3q-player`, `amp-brid-player`, `amp-dailymotion`, `amp-delight-player`, `amp-ima-video`.

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Executa o vídeo.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Pausa o vídeo.</td>
  </tr>
  <tr>
    <td><code>mute</code></td>
    <td>Silencia o vídeo.</td>
  </tr>
  <tr>
    <td><code>unmute</code></td>
    <td>Ativa o som do vídeo.</td>
  </tr>
  <tr>
    <td><code>fullscreencenter</code></td>
    <td>Coloca o vídeo em tela cheia.</td>
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

O alvo `AMP` é fornecido pelo runtime AMP e implementa ações top-level que se aplicam a todo o documento.

<table>
  <tr>
    <th width="40%">Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>navigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Navega a janela atual para a URL fornecida, para o alvo opcional especificado, se fornecido (atualmente, suporta apenas <code>_top</code> r <code>_blank </code>). O parâmetro opcional <code>opener</code> parameter can be specified when using a target of <code>_blank</code> para permitir que a página recém-aberta acesse <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/opener"><code>window.opener</code></a>. Suporta <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md">substituições de URL padrão</a>.</p>
      <p><strong>Advertência:</strong> o uso de links <code>&lt;a&gt;</code> normais é recomendado sempre que possível, já que <code>AMP.navigateTo</code> não é reconhecido por rastreadores da web.</p>
    </td>
  </tr>
  <tr>
    <td><code>closeOrNavigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Tenta fechar a janela se permitido, caso contrário, navega de forma semelhante à ação <code>navigateTo</code>. Útil para casos de uso em que um botão "Voltar" poderá precisar fechar a janela se ela foi aberta numa nova janela da página anterior ou navegar, se não foi aberta.</p>
      <p><strong>Advertência:</strong> o uso de links <code>&lt;a&gt;</code> normais é recomendado sempre que possível, já que <code>AMP.closeOrNavigateTo</code> não é reconhecido por rastreadores da web.</p>
    </td>
  </tr>
  <tr>
    <td><code>goBack</code></td>
    <td>Navega para trás no histórico.</td>
  </tr>
  <tr>
    <td><code>print</code></td>
    <td>Abre o Diálogo de Impressão para imprimir a página atual.</td>
  </tr>
  <tr>
    <td>scrollTo(id=STRING, duration=INTEGER, position=STRING)</td>
    <td>Rola para o ID do elemento fornecido na página atual.</td>
  </tr>
  <tr>
    <td>optoutOfCid</td>
    <td>Desativa a geração de ID do cliente para todos os escopos.</td>
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
  <tr>
    <td>
<code>pushState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Requer <a href="https://amp.dev/documentation/components/amp-bind.html#modifying-history-with-amppushstate">amp-bind</a>.</p>
      <p>Funde um literal de objeto para o estado bindable insere um novo dado na pilha do histórico do navegador. A extração do dado irá restaurar valores anteriores das variáveis (neste exemplo,  <code>foo</code>).</p>
</td>
  </tr>
</table>

<sup>1</sup>Quando usado com <a href="#multiple-actions-for-one-event">múltiplas ações</a>, ações subsequentes irão aguardar a conclusão de <code>setState()</code> ou <code>pushState()</code> antes da chamada. Apenas um único <code>setState()</code> ou <code>pushState()</code> é permitido por evento.

### Alvo: amp-access <a name="target-amp-access"></a>

O alvo `amp-access` é fornecido pelo componente [amp-access](https://amp.dev/documentation/components/amp-access.html) component.

O alvo `amp-access` é especial pelas razões a seguir:

1. Você não pode fornecer um ID arbitrário para este alvo. O alvo é sempre `amp-access`.
2. As ações para `amp-access` são dinâmicas dependendo da estrutura da [Configuração de Acesso AMP](https://amp.dev/documentation/components/amp-access#configuration).

Veja [detalhes](https://amp.dev/documentation/components/amp-access#login-link) sobre o uso do alvo `amp-access` target.
