---
$title: Imagens responsivas com os atributos "srcset", "sizes" e "heights"
---

## srcset

 Use o atributo `srcset` para controlar os recursos de um elemento com base em várias expressões de mídia. Use esse atributo principalmente para todas as tags [`amp-img`](../../../../documentation/components/reference/amp-img.md) a fim de especificar quais recursos de imagem usar com base nos vários tamanhos de tela.

Neste exemplo simples, o `srcset` especifica qual imagem usar com base na largura da tela. O descritor `w` informa ao navegador a largura de cada imagem na lista:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w">
</amp-img>
```
[/example]

Observação: As AMPs oferecem suporte ao atributo srcset com o descritor `w` em todos os navegadores.

 Saiba mais sobre como criar imagens responsivas com o `srcset` em [Usar imagens responsivas (agora)](http://alistapart.com/article/using-responsive-images-now).

## sizes

Também é possível usar o atributo `sizes` junto com o `srcset`. O atributo `sizes` descreve como calcular o tamanho do elemento com base em qualquer expressão de mídia. Baseado no tamanho calculado do elemento, o user agent seleciona a origem mais relativa fornecida pelo atributo `srcset`.

Veja o seguinte exemplo:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw">
</amp-img>
```
[/example]

O atributo `sizes` define a largura do elemento como 50% do tamanho da janela de visualização, quando ela tiver 650 px ou mais. Por exemplo, se a janela de visualização tiver 800 px, a largura do elemento será definida como 400 px. Em seguida, o navegador seleciona o recurso `srcset` relativo a 400 px, assumindo que a proporção de pixels do dispositivo seja 1, que neste caso é `narrow.jpg` (320 px).

Importante: Quando o atributo sizes for especificado juntamente com width e height, o layout será `responsive` por padrão.

Saiba mais sobre como os atributos `sizes` e `srcset` se comparam às consultas de mídia nesta postagem de blog [Srcset e sizes](https://ericportis.com/posts/2014/srcset-sizes/).

## heights

 Todos os elementos personalizados da AMP que permitem o layout `responsive` também são compatíveis com o atributo `heights`. O valor desse atributo é uma expressão de tamanhos baseada em expressões de mídia semelhante ao [atributo img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), mas com duas diferenças importantes:

1. Ele se aplica à altura e não à largura do elemento.
2. Valores percentuais são permitidos, por exemplo: `86%`. Se um valor percentual for usado, ele indicará a porcentagem da largura do elemento.

Quando o atributo `heights` for especificado juntamente com `width` e `height`, o `layout` será `responsive`, por padrão.

Exemplo:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%">
</amp-img>
```
[/example]

Neste exemplo, a altura do elemento será 80% da largura por padrão, mas para as janelas de visualização maiores que `500px`, ela será limitada a `200px`.

