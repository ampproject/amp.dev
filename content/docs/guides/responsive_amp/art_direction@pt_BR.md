---
$title: Imagens responsivas com os atributos "srcset", "sizes" e "heights"
---
[TOC]

## srcset

 Use o atributo `srcset` para controlar os recursos de um elemento com base em várias expressões de mídia. Use esse atributo principalmente para todas as tags [`amp-img`](pt_br/docs/reference/amp-img.html) a fim de especificar quais recursos de imagem usar com base nos vários tamanhos de tela.

Neste exemplo simples, o `srcset` especifica qual imagem usar com base na largura da tela. O descritor `w` informa ao navegador a largura de cada imagem na lista:

<!--embedded amp-img example using srcset -->
<div>
<amp-iframe height="231"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.srcset.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Observação', type='note') %}

As AMPs oferecem suporte ao atributo srcset com o descritor `w` em todos os navegadores. {% endcall %}

 Saiba mais sobre como criar imagens responsivas com o `srcset` em [Usar imagens responsivas (agora)](http://alistapart.com/article/using-responsive-images-now).

## sizes

Também é possível usar o atributo `sizes` junto com o `srcset`. O atributo `sizes` descreve como calcular o tamanho do elemento com base em qualquer expressão de mídia. Baseado no tamanho calculado do elemento, o user agent seleciona a origem mais relativa fornecida pelo atributo `srcset`.

Veja o seguinte exemplo:

<!--embedded amp-img example using sizes -->
<div>
<amp-iframe height="231"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.sizes.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

O atributo `sizes` define a largura do elemento como 50% do tamanho da janela de visualização, quando ela tiver 650 px ou mais. Por exemplo, se a janela de visualização tiver 800 px, a largura do elemento será definida como 400 px. Em seguida, o navegador seleciona o recurso `srcset` relativo a 400 px, assumindo que a proporção de pixels do dispositivo seja 1, que neste caso é `narrow.jpg` (320 px).

{% call callout('Importante', type='caution') %}

Quando o atributo sizes for especificado juntamente com width e height, o layout será `responsive` por padrão. {% endcall %}


Saiba mais sobre como os atributos `sizes` e `srcset` se comparam às consultas de mídia nesta postagem de blog [Srcset e sizes](https://ericportis.com/posts/2014/srcset-sizes/).

## heights

 Todos os elementos personalizados da AMP que permitem o layout `responsive` também são compatíveis com o atributo `heights`. O valor desse atributo é uma expressão de tamanhos baseada em expressões de mídia semelhante ao [atributo img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), mas com duas diferenças importantes:

1. Ele se aplica à altura e não à largura do elemento.
2. Valores percentuais são permitidos, por exemplo: `86%`. Se um valor percentual for usado, ele indicará a porcentagem da largura do elemento.

Quando o atributo `heights` for especificado juntamente com `width` e `height`, o `layout` será `responsive`, por padrão.

Exemplo:

<!--embedded amp-img example using heights -->
<div>
<amp-iframe height="193"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.heights.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

Neste exemplo, a altura do elemento será 80% da largura por padrão, mas para as janelas de visualização maiores que `500px`, ela será limitada a `200px`.

