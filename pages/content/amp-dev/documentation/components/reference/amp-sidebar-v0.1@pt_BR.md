---
$category@: layout
formats:
  - websites
  - email
teaser:
  text: >-
    Permite a exibição de metaconteúdo para acesso temporário, como itens de navegação, links, botões e menus.
toc: true
$title: amp-sidebar
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



<table>
  <tr>
    <td width="40%"><strong>Descrição</strong></td>
    <td>
      Uma barra lateral permite a exibição de metaconteúdo para acesso temporário (links de navegação, botões, menus etc.). A barra lateral pode ser revelada tocando em um botão, enquanto o conteúdo principal permanece visualmente abaixo.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemplos</strong></td>
    <td>Consulte um <a href="https://ampbyexample.com/components/amp-sidebar/">exemplo de amp-sidebar</a> no site AMP By Example.</td>
  </tr>
</table>

## Visão geral <a name="overview"></a>

O `<amp-sidebar>` oculta o metaconteúdo para acesso temporário (links de navegação, botões, menus etc.). O `<amp-sidebar>` pode ser aberto e fechado tocando em botões e depois tocando fora da barra do amp-sidebar.
No entanto, os atributos opcionais que aceitam consultas de mídia podem ser usados para exibir metaconteúdo em outras partes do site. Os elementos filho `<nav toolbar="(media query)" toolbar-target="elementID">` permitem que o conteúdo da barra lateral seja exibido em outras partes do conteúdo principal.

## Comportamento <a name="behavior"></a>

* O `<amp-sidebar>` precisa ser um filho direto do `<body>`.
* A barra lateral só pode ser exibida no lado esquerdo ou direito de uma página.
* O `<amp-sidebar>` pode conter qualquer elemento HTML válido (compatível com AMP).
* O `<amp-sidebar>` pode conter qualquer um dos seguintes elementos AMP:
    * `<amp-accordion>`
    * `<amp-img>`
    * `<amp-fit-text>`
    * `<amp-list>`
    * `<amp-live-list>`
    * `<amp-social-share>`</li>
* A altura máxima da barra lateral é 100 vh. Se a altura exceder 100 vh, uma barra de rolagem vertical será exibida. A altura padrão é definida como 100 vh no CSS e pode ser modificada.
* A largura da barra lateral pode ser configurada e ajustada usando CSS (a largura mínima é de 45 px).
* O recurso de tocar no zoom é desativado no `amp-sidebar` e é uma máscara quando a barra lateral está aberta.

*Exemplo:*

No exemplo a seguir, usamos o `amp-sidebar` para incluir itens de navegação. No entanto, o segundo e quarto itens, Nav Item 2 e Nav Item 4, são atribuídos ao código do elemento que está na página. Por meio do atributo [`on`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/../../spec/amp-actions-and-events.md), podemos rolar suavemente até o elemento, usando o código e o `scrollTo` do elemento.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>
</amp-sidebar>
```

### Abrir e fechar a barra lateral <a name="opening-and-closing-the-sidebar"></a>

Para alternar, abrir ou fechar a barra lateral quando um elemento é tocado ou clicado, defina o atributo de ação [`on`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) do elemento e especifique um dos seguintes métodos de ação:

<table>
  <tr>
    <th>Ação</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td>open (padrão)</td>
    <td>Abre a barra lateral</td>
  </tr>
  <tr>
    <td>close</td>
    <td>Fecha a barra lateral</td>
  </tr>
  <tr>
    <td>alternar</td>
    <td>Alterna o estado da barra lateral</td>
  </tr>
</table>

Se o usuário tocar novamente na área do conteúdo principal parcialmente visível, isso fechará a barra lateral.

Outra alternativa é pressionar a tecla Esc no teclado para fechar a barra lateral.

*Exemplo:*

```html
<button class="hamburger" on='tap:sidebar1.toggle'></button>
<button on='tap:sidebar1'>Open</button>
<button on='tap:sidebar1.open'>Open</button>
<button on='tap:sidebar1.close'>x</button>
```

### Barra de ferramentas <a name="toolbar"></a>

Você pode criar um elemento `toolbar` exibido no `<body>` especificando o atributo `toolbar` com uma consulta de mídia e um atributo `toolbar-target` com um código em um elemento `<nav>` que seja filho de `<amp-sidebar>`. O `toolbar` duplica o elemento `<nav>` e os filhos dele, além de anexá-los ao elemento `toolbar-target`.

#### Comportamento <a name="behavior-1"></a>

* A barra lateral pode implementar barras de ferramentas adicionando elementos nav com os atributos `toolbar` e `toolbar-target`.
* O elemento nav deve ser filho de `<amp-sidebar>` e seguir este formato: `<nav toolbar="(media-query)" toolbar-target="elementID">`.
    * Por exemplo, este seria um uso válido da barra de ferramentas: `<nav toolbar="(max-width: 1024px)" toolbar-target="target-element">`.</li>
* O nav com o atributo toolbar precisa conter apenas um elemento `<ul>`, que contenha elementos `<li>`.
    * Os elementos `<li>` podem conter qualquer elemento HTML válido (compatível com AMP) ou qualquer um dos elementos AMP compatíveis com `<amp-sidebar>`.</li>
* O comportamento da barra de ferramentas só é aplicado enquanto a consulta de mídia do atributo `toolbar` é válida. Além disso, é necessário que haja um elemento com o código do atributo `toolbar-target` na página para que a barra de ferramentas seja aplicada.

*Exemplo: barra de ferramentas básica*

No exemplo a seguir, exibimos um `toolbar` se a largura da janela for menor ou igual a 767 px. O `toolbar` contém um elemento de entrada de pesquisa. O elemento `toolbar` será anexado ao elemento `<div id="target-element">`.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Pesquisar..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

## Estilo da barra de ferramentas <a name="styling-toolbar"></a>

O elemento `toolbar` do elemento `<amp-sidebar>` tem classes aplicadas a ele, dependendo de se o elemento `toolbar-target` é mostrado ou ocultado. Isso é útil para aplicar diferentes estilos no elemento `toolbar` e, em seguida, no elemento `toolbar-target`. As classes são `amp-sidebar-toolbar-target-shown` e `amp-sidebar-toolbar-target-hidden`. A classe `amp-sidebar-toolbar-target-shown` é aplicada ao elemento `toolbar-target` quando o elemento `toolbar-target` é mostrado. A classe `amp-sidebar-toolbar-target-hidden` é aplicada ao elemento `toolbar-target` quando o elemento `toolbar-target` está oculto.

*Exemplo: classes de estado da barra de ferramentas*

No exemplo a seguir, exibimos um `toolbar` se a largura da janela for menor ou igual a 767 px. O `toolbar` contém um elemento de entrada de pesquisa. O elemento `toolbar` será anexado ao elemento `<div id="target-element">`. No entanto, adicionamos alguns estilos personalizados para ocultar o elemento `toolbar` quando o elemento `<div id="toolbar-target">` é mostrado.

```html
<style amp-custom="">

  .amp-sidebar-toolbar-target-shown {
      display: none;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Pesquisar..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

[tip type="success"]
veja demonstrações ao vivo no [AMP By Example](https://ampbyexample.com/components/amp-sidebar/).
[/tip]

## Barra lateral para matérias <a name="sidebar-for-stories"></a>

O uso do `amp-sidebar` é compatível com o [componente](../../../about/stories.html) `amp-story`.

### Comportamento <a name="behavior-2"></a>

* O `<amp-sidebar>` precisa ser filho direto de `<amp-story>`.
* A barra lateral tem como padrão o lado "inicial" "de documentos AMP normais, ou seja, o lado direito para idiomas escritos da esquerda para a direita e o esquerdo para idiomas da direita para a esquerda.
* O `<amp-sidebar>` tem a cor branca como plano de fundo padrão, que pode ser modificada no CSS.
* A largura máxima do `<amp-sidebar>` é aplicada como `280 px` e como `320 px` para experiências em computadores.
* Um botão de estilo "hambúrguer" que abre/fecha a barra lateral aparecerá na interface do usuário da matéria.

Há algumas restrições sobre quais atributos e recursos são permitidos para fornecer uma experiência de interface do usuário consistente na plataforma de matérias. Veja abaixo os atributos e recursos permitidos de um `amp-sidebar` dentro de um `amp-story`.

### Atributos permitidos <a name="allowed-attributes"></a>

* [layout](#layout)
* [data-close-button-aria-label](#data)
* [common attributes](#common)

*Exemplo: barra lateral básica em uma matéria*

O exemplo a seguir mostra um `amp-sidebar` simples dentro de um `amp-story`.

```html
...
<body>
  <amp-story standalone>
  <amp-sidebar id="sidebar1" layout="nodisplay">
    <ul>
      <li><a href="https://amp.dev"> External Link </a></li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
    </ul>
  </amp-sidebar>
  <amp-story-page id="cover">
    <amp-story-grid-layer template="fill">
      <h1>Hello World</h1>
      <p>This is the cover page of this story.</p>
    </amp-story-grid-layer>
  </amp-story-page>
  ...
</body>
```

## Atributos <a name="attributes"></a>

##### side <a name="side"></a>

Indica em qual lado da página a barra lateral deve ser aberta, `left` (esquerdo) ou `right` (direito).  Se um `side` não for especificado, o valor do `side` será herdado do atributo `dir` da tag `body` (`ltr` =&gt; `left` , `rtl` =&gt; `right`). Se não houver um `dir`, o atributo `side` assumirá como padrão `left`.

##### layout <a name="layout"></a>

Especifica o layout de exibição da barra lateral, que precisa ser `nodisplay`.

##### open <a name="open"></a>

Este atributo está presente quando a barra lateral está aberta.

##### data-close-button-aria-label <a name="data"></a>

Atributo opcional usado para definir o rótulo ARIA para o botão "Fechar", adicionado para que haja acessibilidade.

##### toolbar <a name="toolbar-1"></a>

Este atributo está presente em elementos `<nav toolbar="(media-query)" toolbar-target="elementID">` filhos e aceita uma consulta de mídia sobre quando mostrar uma barra de ferramentas. Consulte a seção [Barra de ferramentas](#toolbar-1) para ver mais informações sobre como usar barras de ferramentas.

##### toolbar-target <a name="toolbar-target"></a>

Este atributo está presente no `<nav toolbar="(media-query)" toolbar-target="elementID">` filho e aceita um código de um elemento na página.  O atributo `toolbar-target` colocará a barra de ferramentas no código especificado do elemento na página, sem o estilo padrão da barra de ferramentas. Consulte a seção [Barra de ferramentas](#toolbar-1) para ver mais informações sobre como usar barras de ferramentas.

##### common attributes <a name="common"></a>

Este elemento inclui [atributos comuns](../../../documentation/guides-and-tutorials/learn/common_attributes.md) estendidos a componentes de AMP.

## Estilo <a name="styling"></a>

O componente `amp-sidebar` pode ser estilizado com o CSS padrão.

* O `width` do `amp-sidebar` pode ser configurado para ajustar a largura entre os valores mínimo (45 px) e máximo (80 vw) predefinidos.
* O height do `amp-sidebar` pode ser configurado para ajustar a altura da barra lateral, se necessário. Se a altura exceder 100 vw, a barra lateral terá uma barra de rolagem vertical. A altura predefinida da barra lateral é de 100 vw e pode ser modificada no CSS para que seja menor.
* O estado atual da barra lateral é exposto por meio do atributo `open`, que é configurado na tag `amp-sidebar` quando a barra lateral está aberta na página.

[tip type="success"]
visite a página [AMP Start](https://ampstart.com/components#navigation) (link em inglês) para acessar menus de navegação responsivos e com estilos predefinidos que você pode usar nas suas páginas AMP.
[/tip]

## Rolagem automática em áreas flutuantes <a name="auto-scrolling-within-overflowing-areas"></a>

O `amp-sidebar` pode rolar automaticamente o contêiner flutuante para o primeiro elemento que esteja decorado com `autoscroll` como um atributo na barra lateral ou na barra de ferramentas.

Esse recurso é útil para lidar com uma lista de navegação longa e quando você quiser que a barra lateral role até os itens de navegação atuais enquanto a página é carregada.

Ao usar o recurso `toolbar`, o `autoscroll` só funciona se o elemento `<nav toolbar>` estiver configurado como `overflow: auto` ou `overflow: scroll`.

```html
<style amp-custom="">

  nav [toolbar] {
    overflow: auto;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>Nav item 1</li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
      <li autoscroll class="currentPage">Nav item 4</li>
      <li>Nav item 5</li>
      <li>Nav item 6</li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

Consulte [este arquivo de exemplo](https://github.com/ampproject/amphtml/blob/main/examples/amp-sidebar-autoscroll.amp.html) (link em inglês) para ver um código de exemplo em funcionamento.

## Considerações sobre UX <a name="ux-considerations"></a>

Ao usar o `<amp-sidebar>`, lembre-se de que seus usuários geralmente visualizarão a página em dispositivos móveis usando um visualizador de AMP, que pode exibir um cabeçalho de posição fixa. Além disso, os navegadores costumam exibir o próprio cabeçalho fixo na parte superior da página. Adicionar outro elemento de posição fixa à parte superior da tela ocuparia uma grande quantidade de espaço de exibição em dispositivos móveis com conteúdo que não ofereceria nenhuma informação nova ao usuário.

Por esse motivo, recomendamos que as permissões para abrir a barra lateral não sejam colocadas em um cabeçalho fixo de largura total.

## Validação <a name="validation"></a>

Consulte as [regras do amp-sidebar](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/validator-amp-sidebar.protoascii) (link em inglês) nas especificações do validador de AMP.
