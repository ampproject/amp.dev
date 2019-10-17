---
$title: Atributos comuns
---

[TOC]

A tecnologia AMP oferece um conjunto de atributos comuns estendidos a diversos componentes AMP (e elementos HTML).  Este documento descreve cada um dos atributos comuns.

## substituto

Um substituto é uma convenção que permite ao elemento comunicar ao leitor que o navegador não é compatível ou que houve falha no carregamento do recurso subjacente. É possível colocar o atributo `fallback` em qualquer elemento HTML que seja derivado direto de um elemento AMP compatível com substitutos. O comportamento exato em relação ao substituto depende da implementação do elemento. No entanto, o elemento substituto normalmente é mostrado em vez do habitual.

Geralmente usado com: imagens, animações, áudio e vídeos.

Por exemplo:

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive" >
  <div fallback>Não é possível reproduzir imagens animadas neste dispositivo.</div>
</amp-anim>
[/sourcecode]

Para saber mais, consulte [Marcadores e substitutos](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## alturas

Todos os elementos AMP compatíveis com o layout `responsive` também oferecem compatibilidade com o atributo `heights`. O valor desse atributo é uma expressão de tamanhos baseada em expressões de mídia, semelhantes ao [atributo "sizes" em tags `img`](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/img), mas com duas diferenças fundamentais:


1. O valor se aplica à altura, e não à largura do elemento.
2. São permitidos valores percentuais. Esses valores indicam a porcentagem da altura em relação à largura do elemento. Por exemplo, um valor de `80%` indica que a altura do elemento será 80% da largura dele.

Observação: Quando o atributo `heights` é especificado juntamente com `width` e `height`, o `layout` assume o padrão `responsive`.

Por exemplo:

[sourcecode:html]
<amp-img src="amp.png"
    width="320" height="256"
    heights="(min-width:500px) 200px, 80%">
</amp-img>
[/sourcecode]

Para saber mais, consulte [Imagens responsivas com os atributos "srcset", "sizes" e "heights"](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## layout

A tecnologia AMP oferece um conjunto de [layouts](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) que descreve o comportamento de um componente AMP no layout do documento. É possível especificar um layout para um componente adicionando o atributo `layout` com um dos valores de layout compatíveis com o elemento. Consulte a documentação do elemento para ver os valores compatíveis.

Por exemplo:

[sourcecode:html]
<amp-img src="/img/amp.jpg"
    width="1080"
    height="610"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Para saber mais, consulte [Consultas de mídia e layout](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) e a [Especificação de layout](amp-html-layout/index.md).

## mídia <a name="media"></a>

Todos os elementos AMP são compatíveis com o atributo `media`. O valor de `media` é uma consulta de mídia. Se a consulta não for correspondente, o elemento não será renderizado e os recursos dele, o que provavelmente inclui os recursos derivados, não serão buscados. Se a janela do navegador mudar de tamanho ou de orientação, as consultas de mídia serão reavaliadas e os elementos serão ocultados e mostrados com base nos novos resultados.

Por exemplo:

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="466"
    height="355" layout="responsive"></amp-img>
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="527"
    height="193" layout="responsive"></amp-img>
[/sourcecode]

Para saber mais, consulte [Consultas de layout e mídia](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries).

## noloading

O atributo `noloading` indica se o "indicador de carregamento" deve ser **desativado** para esse elemento. Vários elementos AMP mostram um "indicador de carregamento". Esse indicador é uma animação básica que mostra que o elemento ainda não foi totalmente carregado.

Geralmente usado com: imagens, animações, vídeos e anúncios.

Por exemplo:

[sourcecode:html]
<amp-img src="card.jpg"
    noloading
    height="190"
    width="297"
    layout="responsive">
</amp-img>
[/sourcecode]

## on

O atributo `on` é usado para instalar manipuladores de eventos em elementos. Os eventos compatíveis dependem do elemento.

Geralmente usado com: lightboxes, barras laterais, listas ativas e formulários.

Sintaxe:

[sourcecode:text]
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
[/sourcecode]

Por exemplo:

[sourcecode:html]
<button on="tap:my-lightbox">Abrir lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay">
  …
</amp-lightbox>
[/sourcecode]

Para saber mais, consulte [Ações e eventos em AMP](amp-actions-and-events.md).

## marcador

O atributo `placeholder` indica que o elemento marcado com esse atributo atua como um marcador para o elemento AMP principal. O atributo pode ser colocado em qualquer elemento HTML que seja derivado direto de um elemento AMP compatível com marcadores. Por padrão, o marcador é imediatamente mostrado para o elemento AMP, mesmo que os recursos desse elemento não tenham sido transferidos por download nem inicializados. Depois de pronto, o elemento AMP geralmente oculta seu marcador de posição e mostra o conteúdo. O comportamento exato em relação ao marcador depende da implementação do elemento.

Geralmente usado com: imagens, animações, vídeos e anúncios.

Por exemplo:

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

Para saber mais, consulte [Marcadores e substitutos](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## tamanhos

Todos os elementos AMP compatíveis com o layout `responsive` também são compatíveis com o atributo `sizes`. O valor do atributo `sizes` é uma expressão de tamanhos, conforme descrito no [atributo "sizes" em tags `img`](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/img). No entanto, ele abrange todos os elementos, não apenas imagens.

Por exemplo:

[sourcecode:html]
<amp-img src="amp.png"
    width="400" height="300"
    layout="responsive"
    sizes="(min-width: 320px) 320px, 100vw">
</amp-img>
[/sourcecode]

Para saber mais, consulte [Imagens responsivas com os atributos "srcset", "sizes" e "heights"](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## largura e altura

Em alguns [layouts](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute), os componentes AMP precisam ter um atributo `width` e `height` que contenha um valor inteiro de pixel.

Por exemplo:

[sourcecode:html]
<amp-anim width="245"
    height="300"
    src="/img/cat.gif"
    alt="cat animation">
</amp-anim>
[/sourcecode]

Para saber mais, consulte [Consultas de mídia e layout](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) e a [Especificação de layout](amp-html-layout/index.md).
