---
'$title': Responsive images with srcset, sizes & heights
$order: 4
description: Use o atributo srcset para controlar os recursos de um elemento com base em várias expressões de mídia. Use esse atributo principalmente para todas as tags amp-img a fim de especificar quais ...
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
author: pbakaus
contributors:
  - bpaduch
---

## srcset

Use o atributo `srcset` para controlar os recursos de um elemento com base em várias expressões de mídia. Use esse atributo principalmente para todas as tags [`amp-img`](../../../../documentation/components/reference/amp-img.md) a fim de especificar quais recursos de imagem usar com base nos vários tamanhos de tela. O AMP irá gerar automaticamente o atributo <code>sizes</code>, <a> que está de acordo com a definição do HTML5 de <code>sizes</code></a>, para todas as tags `<img>` de `<amp-img>` se o `<amp-img>` tiver um atributo <code>srcset</code> mas nenhum <code>sizes</code>.

Neste exemplo simples, o `srcset` especifica qual imagem usar com base na largura da tela. O descritor `w` informa ao navegador a largura de cada imagem na lista:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
>
</amp-img>
```

[/example]

[tip type="note"] <strong>OBSERVAÇÃO –</strong> O AMP oferecem suporte ao atributo srcset com o descritor `w` em todos os navegadores.[/tip]

Saiba mais sobre como criar imagens responsivas com o `srcset` em [Como Usar Imagens Responsivas (Agora)](http://alistapart.com/article/using-responsive-images-now).

## sizes

Também é possível usar o atributo AMP opcional `sizes` junto com `srcset`. O atributo AMP `sizes` descreve como calcular o tamanho do elemento com base em qualquer expressão de mídia. <strong>A definição de <code>sizes</code> em qualquer elemento AMP fará com que o AMP defina um estilo inline para a largura (width) naquele elemento de acordo com a media query correspondente.</strong> Baseado no tamanho calculado do elemento, o navegador seleciona a origem mais relativa fornecida pelo atributo `srcset`.

Veja o seguinte exemplo:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw"
>
</amp-img>
```

[/example]

O atributo `sizes` define a largura do elemento como 50% do tamanho da janela de visualização, quando ela tiver 650px ou mais. Por exemplo, se a janela de visualização tiver 800px, a largura do elemento será definida como 400px. Em seguida, o navegador seleciona o recurso `srcset` relativo a 400px, assumindo que a proporção de pixels do dispositivo seja 1, que neste caso é `hummingbird-narrow.jpg` (320px).

[tip type="important"] <strong>IMPORTANTE –</strong>Quando o atributo sizes for especificado juntamente com width e height, o layout será `responsive` por default. [/tip]

Saiba mais sobre os atributo <a>AMP <code data-md-type="codespan">sizes</code> aqui</a>

## heights

Todos os elementos personalizados da AMP que permitem o layout `responsive` também são compatíveis com o atributo `heights`. O valor desse atributo é uma expressão de sizes baseada em expressões de mídia semelhante ao [atributo img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), mas com duas diferenças importantes:

1. Ele se aplica à altura e não à largura do elemento.
2. Valores percentuais são permitidos, por exemplo: `86%`. Se um valor percentual for usado, ele indicará a porcentagem da largura do elemento.

Quando o atributo `heights` for especificado juntamente com `width` e `height`, o `layout` será `responsive`, por default.

Exemplo:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
```

[/example]

Neste exemplo, a altura do elemento será 80% da largura por default, mas para as janelas de visualização maiores que `500px`, ela será truncada em `200px`.
