---
'$title': Adding carousels
$order: 3
description: Outra funcionalidade comum das páginas para dispositivos móveis são os carrosséis. Você pode adicionar facilmente carrosséis a páginas AMP ao utilizar o componente amp-carousel.
---

Outra funcionalidade comum das páginas para dispositivos móveis são os carrosséis. Você pode adicionar facilmente carrosséis a páginas AMP ao utilizar o componente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md). Vamos começar com um exemplo simples, como um carrossel de imagens.

## Carrossel simples de imagens

Não se esqueça de incluir a biblioteca do componente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) **ao adicionar** o seguinte pedido de JavaScript à tag `<head>` do seu documento:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
```

Em seguida, vamos incorporar um carrossel simples de imagens com um layout responsivo e largura e altura predefinidas. **Adicione** o seguinte à sua página:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel">
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**Atualize** a página para ver um carrossel:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Carrossel de imagens simples') }}

O componente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) pode ser configurado de várias formas. Vamos alterar a interface do usuário para mostrar apenas uma imagem de cada vez e deixar o layout do carrossel responsivo.

Para o fazer, primeiro, **altere** o `type` do [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) de `carousel` para `slides`, **altere** o `layout` para `responsive` e **defina** a `width` para 300 (assegure-se de que são definidas a `height` e a `width`). **Adicione** o atributo `"layout=responsive"` aos elementos secundários [`amp-img`](../../../../documentation/components/reference/amp-img.md) do [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

**Atualize** a página. Agora, em vez de uma lista de elementos para percorrer, verá um elemento de cada vez. Experimente **deslizar rapidamente** na horizontal para percorrer os elementos. Se deslizar rapidamente para o terceiro elemento, não poderá deslizar mais.

Em seguida, **adicione** o atributo `loop`. **Atualize** a página e tente deslizar rapidamente para a esquerda de imediato. O carrossel repete-se infinitamente.

Por último, vamos fazer com que este carrossel seja reproduzido automaticamente a cada 2 segundos. **Adicione** o atributo `autoplay` e o atributo `delay` com um valor de `2000` (por exemplo, `delay="2000"`) ao [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

O resultado final deverá ser semelhante ao seguinte:

```html
<amp-carousel
  layout="responsive"
  width="300"
  height="168"
  type="slides"
  autoplay
  delay="2000"
  loop
>
  <amp-img
    src="mountains-1.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-2.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-3.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
</amp-carousel>
```

**Atualize** a página e experimente!

[tip type="note"] <strong>NOTA –</strong> Você deverá ter observado que, quando o [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) tinha o tipo `carousel`, utilizamos o tipo de layout `fixed-height`. Os tipos de layout suportados para o tipo `carousel` são limitados. Por exemplo, o tipo `carousel` não suporta o layout `responsive`. Tal como o nome sugere, os elementos fixed-height ocupam o espaço disponível para os mesmos, mas mantêm a altura inalterada. Para elementos fixed-height, é necessário definir o atributo `height`, enquanto o atributo `width` deve estar definido como `auto` ou permanecer indefinido. [/tip]

## Conteúdo misto do carrossel

Os carrosséis de imagens são fantásticos. Mas, e se quisermos que apareçam conteúdos mais complexos no nosso carrossel? Vamos tentar misturar um pouco as coisas ao colocar um anúncio, algum texto e uma imagem, tudo num único carrossel. O [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) conseguirá processar tudo isto de uma só vez? Sem dúvida!

Primeiro, vamos **adicionar** este estilo ao seu `<style amp-custom>` para assegurar que os componentes [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) e [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) funcionem bem em conjunto:

```css
amp-fit-text {
  white-space: normal;
}
```

Agora, **substitua** o seu carrossel simples pelo seguinte:

```html
<amp-carousel layout="fixed-height" height="250" type="carousel">
  <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

  <amp-ad
    width="300"
    height="250"
    type="doubleclick"
    data-slot="/35096353/amptesting/image/static"
  >
    <div placeholder>This ad is still loading.</div>
  </amp-ad>

  <amp-fit-text width="300" height="250" layout="fixed">
    Big, bold article quote goes here.
  </amp-fit-text>
</amp-carousel>
```

**Atualize** a página e deverá ver algo como isto:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='Um carrossel de conteúdo misto') }}

Para saber mais, consulte a documentação de referência do componente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[tip type="note"] <strong>NOTE –</strong> No nosso último exemplo, você deverá ter observado que o componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) incluía um elemento `div` secundário com o atributo `placeholder`. Anteriormente, no tutorial, encontramos com um cenário semelhante com o [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) usando um `fallback`. Qual é a diferença entre um placeholder e um fallback? Os elementos `fallback` surgem quando ocorre uma falha ao carregar o elemento superior, ou seja, se não houver nenhum anúncio disponível. Os elementos `placeholder` aparecem em vez do elemento pai, enquanto este é carregado. De certo modo, estes elementos suportam o processo de carregamento do elemento pai. Para saber mais veja o guia [Placeholders e fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).[/tip]
