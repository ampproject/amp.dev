---
'$title': Criar páginas AMP responsivas
$order: 5
description: O Web design responsivo é a criação de páginas web fáceis de usar e que atendam às necessidades dos usuários. Essas páginas se ajustam ao tamanho e à orientação da tela do dispositivo. Com AMP, é muito fácil conseguir ...
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
  - youtube
author: bpaduch
contributors:
  - pbakaus
---

## Introdução

O Web design responsivo é a criação de páginas web fáceis de usar e que atendam às necessidades dos usuários. Essas páginas se ajustam ao tamanho e à orientação da tela do dispositivo. Com AMP, é muito fácil conseguir isso. O AMP suporta todas as categorias de tela e dispositivos e oferece componentes responsivos integrados.

Neste guia, você verá como implementar facilmente estes princípios básicos em páginas AMP:

- [Como controlar a janela de visualização](#controlling-the-viewport)
- [Como criar um layout responsivo](#creating-a-responsive-layout)
- [Como dimensionar mídias](#scaling-media-for-the-page)

[video src='https://www.youtube.com/watch?v=XDvbJ2apaiA' caption='Saiba mais sobre design responsivo através deste vídeo.']

## Como controlar a janela de visualização <a name="controlling-the-viewport"></a>

[filter formats="websites, ads, stories"] Para otimizar sua página web e fazer com que seu conteúdo seja dimensionado e se ajuste ao tamanho da janela do navegador em qualquer dispositivo, é preciso especificar o elemento `meta` da viewport. Esse elemento indica ao navegador como dimensionar e ajustar a área visível (a viewport) da página web.

Quais valores devem ser usados? Isto já está especificado nas páginas AMP. Como parte da <a>marcação obrigatória</a> das páginas AMP, você precisa especificar a viewport abaixo:

```html
<meta name="viewport" content="width=device-width" />
```

Essas são as configurações comuns da viewport que você usaria num site responsivo. Embora <code>initial-scale=1</code> não seja obrigatório para uma página AMP válida, esse elemento é recomendado porque define o nível de zoom como 1 quando a página é carregada pela primeira vez. [/filter]

[filter formats="email"] Esta seção é válida apenas para sites, anúncios e histórias AMP. [/filter]

## Como criar um layout responsivo <a name="creating-a-responsive-layout"></a>

No design responsivo, você pode usar consultas de mídia CSS ([`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)) para definir o estilo da sua página da Web para diferentes dimensões de tela. É possível fazer isto sem alterar o conteúdo da página. Numa página AMP, você pode continuar usando essas mesmas consultas de CSS `@media`. Além disso, para um controle mais preciso sobre o elemento da página AMP, especifique nele o atributo `media`. Isto será muito útil caso você precise mostrar ou ocultar um elemento com base numa consulta de mídia. Consulte a seção [Como alterar a direção artística de uma imagem](#changing-the-art-direction-of-an-image) para um exemplo que usa o atributo `media`.

Redimensionar cada elemento para que ele se ajuste à tela pode ser uma tarefa complicada<sup><a href="#fn1" id="ref1">\*</a></sup>. No entanto, é fácil criar um elemento responsivo usando AMP. Basta você especificar o atributo `"layout=responsive"` junto com os atributos `width` e `height` do elemento. Quando você aplicar o layout `responsive`, o elemento a que ele é aplicado será redimensionado automaticamente à largura do elemento que o contém. A altura será alterada com base na proporção especificada pelos atributos `width` e `height` do elemento. Quase todos os elementos da página AMP são compatíveis com o layout `responsive`. Consulte a documentação de referência do elemento para ver a compatibilidade dos layouts.

É fácil criar elementos responsivos com `"layout=responsive"`. No entanto, é preciso considerar como seus elementos aparecerão em todos os tamanhos de tela, incluindo as dimensões para computador e tablet. Um erro comum é permitir que a imagem preencha toda a largura da tela. Como consequência disso, a imagem se expandirá para um tamanho maior que o pretendido, causando uma experiência ruim aos usuários de widescreen. Por padrão, os elementos com `layout=responsive` preencherão toda a largura do elemento de contêiner, que geralmente não tem limites para essa dimensão (como width=100%). Restrinja a largura do contêiner da imagem para aprimorar a maneira como ela é exibida. Por exemplo, ao configurar uma regra "max-width" em "body" ou "main", você pode limitar uma largura máxima específica para todas as imagens.

##### Exemplo: como restringir a largura de imagens responsivas

No exemplo a seguir, temos uma imagem de flores (640 x 427 pixels) que será exibida em todos os tamanhos de tela. Por isso, especificaremos os atributos `width` e `height` e definiremos o layout como `responsive`.

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

No entanto, queremos que a imagem não se expanda além do tamanho pretendido. Por isso, definiremos `max-width` no contêiner para 700 pixels com um CSS personalizado:

```html
<style amp-custom>
  .resp-img {
    max-width: 700px;
  }
</style>
```

Leia mais: Para saber mais sobre os diferentes layouts em AMP, consulte o guia [Consultas de mídia e layout](control_layout.md#the-layout-attribute).

<a id="fn1"></a>[tip type="note"] **\*Por que é complicado redimensionar elementos para que eles se ajustem ao tamanho da tela quando posso fazer isso facilmente com o estilo <code>width=100%</code>?**

A parte complicada é renderizar os elementos responsivos na página sem prejudicar as métricas de desempenho nem a experiência do usuário. Sim, é fácil ajustar imagens à tela com "width=100%", mas isto afetará o desempenho. Primeiro, o navegador precisa fazer download da imagem para identificar as dimensões dela. Depois, ele redimensionará a imagem para que ela se ajuste ao tamanho da tela. Por fim, fará o reflow e preencherá a página novamente. Ao usar AMP, o caminho de renderização é otimizado para que a página seja gerada primeiro com placeholders de imagens, com base nas dimensões fornecidas no <a><code>amp-img</code></a>, a partir dos números usados para definir a proporção. Depois, os recursos são baixados e a página é desenhada. O reflow não é obrigatório. [/tip]

## Como dimensionar mídias na página <a name="scaling-media-for-the-page"></a>

Provavelmente, um dos aspectos mais desafiadores do design responsivo seja a exibição correta de mídias na página para que elas respondam às características da tela. Nesta seção, veremos como incorporar imagens e vídeos responsivos em páginas AMP.

### Como incorporar vídeos

Ao incluir um vídeo na sua página da Web, verifique se o usuário consegue ver o conteúdo e os controles do vídeo (por exemplo, sem transbordamento). Normalmente, é possível fazer isso com uma combinação de consultas de mídia CSS, um contêiner e outro CSS. Ao usar AMP, você só precisa incluir o elemento de vídeo na sua página e especificar `layout=responsive` nesse elemento. Não é necessário um CSS adicional.

##### Exemplo: como incorporar um vídeo do YouTube

No exemplo a seguir, queremos exibir um vídeo do YouTube incorporado que se adapte ao tamanho e orientação da tela do dispositivo. Ao adicionar <code>"layout=responsive"</code> ao elemento <a><code>amp-youtube</code></a>, o vídeo é redimensionado para caber na janela e sua proporção é mantida de acordo com largura (<code>width</code>) e altura (<code>height</code>) especificadas.

[example preview="top-frame" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

Existem vários tipos de vídeos que podem ser adicionados às suas páginas AMP. Para mais detalhes, consulte a lista de <a class="" href="https://gitlocalize.com/repo/4863/pt_BR/pages/content/amp-dev/documentation/components/index.html#media">componentes de mídia</a> disponíveis.

### Como exibir imagens responsivas <a name="displaying-responsive-images"></a>

As imagens compõem grande parte de uma página da Web, (aproximadamente [65% dos bytes da página](http://httparchive.org/interesting.php#bytesperpage)). No mínimo, suas imagens devem ser visíveis em vários tamanhos e orientações de tela. Por exemplo, um usuário não precisará rolar a tela, fazer gesto de pinça ou usar o zoom para ver a imagem completa. Isso é fácil de fazer em páginas AMP com o atributo `"layout=responsive"`. Consulte o artigo [Incluir imagens em páginas AMP](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md). Além da imagem responsiva básica, você poderá veicular vários recursos de imagens para:

- [Como veicular imagens nítidas na resolução correta](#serving-crisp-images-for-the-right-resolution);
- [Como alterar a direção de arte de uma imagem](#changing-the-art-direction-of-an-image);
- [Como fornecer formatos de imagem otimizados](#providing-optimized-images).

#### Como veicular imagens nítidas na resolução correta <a name="serving-crisp-images-for-the-right-resolution"></a>

Para telas de alta resolução, como a tela Retina, você deve fornecer imagens claras e nítidas. Porém, não convém usar essas mesmas imagens em dispositivos de baixa resolução porque isso aumentará o tempo de carregamento. Em páginas AMP e não AMP, é possível veicular a imagem correta para a densidade de pixels da tela usando o `srcset` com o descritor de largura ( `w` ).

[tip type="note"] **OBSERVAÇÃO –** O seletor srcset baseado no DPR (`x`) também funciona. No entanto, para uma maior flexibilidade, recomendamos o uso do seletor `w`. Anteriormente, (na proposta srcset antiga), o descritor `w` definia a largura da janela de visualização. Agora, ele descreve a largura do arquivo de origem da imagem. Isso permite que o user agent calcule a densidade de pixels efetiva de cada imagem e escolha a mais apropriada para renderizar. [/tip]

##### Exemplo: como exibir uma imagem nítida que se ajusta à tela

No exemplo a seguir, há diversos arquivos de imagem que têm a mesma proporção, mas resoluções diferentes. Ao fornecer várias resoluções de imagem, o navegador pode escolher a imagem mais adequada à resolução do dispositivo. Além disso, a imagem foi especificada para renderizar de acordo com o tamanho:

- Para uma largura da janela de visualização de até 400 pixels, renderizar a imagem a 100% da dimensão correspondente.
- Para uma largura da janela de visualização de até 900 pixels, renderizar a imagem a 75% da dimensão correspondente.
- Para resoluções acima de 900 pixels, renderizar a imagem a 600 pixels de largura.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="apple"
  src="{{server_for_email}}/static/inline-examples/images/apple.jpg"
  height="596"
  width="900"
  srcset="{{server_for_email}}/static/inline-examples/images/apple-900.jpg 900w,
            {{server_for_email}}/static/inline-examples/images/apple-800.jpg 800w,
            {{server_for_email}}/static/inline-examples/images/apple-700.jpg 700w,
            {{server_for_email}}/static/inline-examples/images/apple-600.jpg 600w,
            {{server_for_email}}/static/inline-examples/images/apple-500.jpg 500w,
            {{server_for_email}}/static/inline-examples/images/apple-400.jpg 400w"
  sizes="(max-width: 400px) 100vw,
            (max-width: 900px) 75vw, 600px"
>
</amp-img>
```

[/example]

Por exemplo, digamos que você tenha um dispositivo com a largura da janela de visualização de 412 pixels e um DPR de 2,6. Com base no código acima, a imagem precisa ser exibida em 75% da largura da janela de visualização. Assim, o navegador escolherá uma imagem de tamanho próximo a 803 pixels (412 _ ,75 _ 2,6), que é `apple-800.jpg`.

Leia mais: Para saber mais sobre o uso de srcset e tamanhos em páginas AMP, consulte o guia [Direção de arte com srcset, tamanhos e alturas](art_direction.md).

#### Como alterar a direção de arte de uma imagem <a name="changing-the-art-direction-of-an-image"></a>

A direção de arte refere-se a uma adaptação de características visuais da imagem para determinados pontos de interrupção. Por exemplo, em vez de só dimensionar uma imagem à medida que a tela se estreita, você pode veicular uma versão cortada que restringe o foco dela. Também é possível veicular imagens completamente diferentes em pontos de interrupção distintos. Em páginas HTML, você pode fazer isso com o elemento `picture`. Já em páginas AMP, a direção de arte pode ser aplicada com o atributo `media`.

##### Exemplo: imagens de tamanhos diferentes para pontos de interrupção distintos

No exemplo a seguir, você verá três diferentes imagens de um gato cortadas que serão exibidas em diferentes pontos de interrupção. Assim, se a largura da janela de visualização for de:

- 670 pixels ou mais, será exibida `cat-large.jpg` (650 x 340 pixels);
- 470 a 669 pixels, será exibida `cat-medium.jpg` (450 x 340 pixels);
- 469 pixels ou menos, será exibida `cat-small.jpg` (226 x 340 pixels).

[tip type="note"] OBSERVAÇÃO – Como queríamos que as imagens tivessem tamanhos fixos (ou seja, não distorcidas), não especificamos um valor de layout, que por default será definido como layout=fixed porque configuramos altura e largura. Para mais detalhes, veja "E se o atributo layout não for especificado?". [/tip]

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="grey cat"
  media="(min-width: 670px)"
  width="650"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-large.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(min-width: 470px) and (max-width: 669px)"
  width="450"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-medium.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(max-width: 469px)"
  width="226"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-small.jpg"
></amp-img>
```

[/example]

[tip type="read-on"] **READ ON –** Para saber mais sobre direção artística no AMP, veja o guia [Direção artística com srcset, dimensões e alturas](art_direction.md). [/tip]

#### Como fornecer imagens otimizadas <a name="providing-optimized-images"></a>

A entrega de páginas de carregamento rápido requer imagens otimizadas - em tamanho, qualidade e formato. Sempre reduza os tamanhos dos arquivos para o nível de qualidade mais baixo que seja aceitável. Existem várias ferramentas que você pode usar para "triturar" imagens (por exemplo, [ImageAlph](http://pngmini.com/lossypng.html) ou [TinyPNG](https://tinypng.com/)). Quanto aos formatos de imagem, alguns garantem uma melhor capacidade de compressão que outros (por exemplo, WebP e JPEG XR vs JPEG). O ideal é fornecer a imagem mais otimizada para seu usuário, e ao mesmo tempo garantir que a imagem seja compatível com o navegador do usuário ([nem todos os navegadores suportam todos os formatos de imagem](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)).

Em HTML, você pode veicular diferentes formatos de imagem usando a tag `picture`. Em AMP, embora a tag `picture` não seja compatível, é possível veicular diferentes imagens com o atributo `fallback`.

[tip type="read-on"] **LEIA MAIS –** Para saber mais sobre fallbacks, veja o guia [Placeholders e fallbacks](placeholders.md). [/tip]

Em AMP, há duas maneiras de conseguir servir imagens otimizadas:

- Desenvolvedores que usam formatos de imagem que não são amplamente suportados, como WebP, podem configurar seu servidor para processar os cabeçalhos <code>Accept</code> do navegador e responder com bytes de imagem e o cabeçalho <a><code>Content-Type</code></a>. Isto evita que o navegador baixe tipos de imagem incompatíveis. Leia mais sobre negociação de conteúdo.[sourcecode:html] Accept: image/webp,image/apng,image/_,_/\*;q=0.8 [/sourcecode]
- Forneça fallbacks de imagem aninhados, como no exemplo abaixo.

##### Exemplo: como veicular diferentes formatos de imagem

No exemplo a seguir, se o navegador oferecer suporte a WebP, sirva mountains.webp, caso contrário, sirva mountains.jpg.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp"
>
  <amp-img
    alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"
  ></amp-img>
</amp-img>
```

[/example]

Alguns caches têm um ótimo recurso de bônus, como o cache de AMP do Google. Eles compactam e convertem automaticamente imagens para WebP e em resoluções corretas caso você não consiga fazer isso. Porém, nem todas as plataformas usam caches. Isso significa que talvez você precise otimizar manualmente as imagens.

[tip type="read-on"] **LEIA MAIS –** Para saber mais sobre as otimizações de imagem aplicadas pelo Google AMP Cache, veja o artigo ["Google AMP Cache, AMP Lite e a necessidade de velocidade"](https://developers.googleblog.com/2017/01/google-amp-cache-amp-lite-and-need-for.html). [/tip]

## Exemplos para inspirar você

Eis alguns exemplos que poderão lhe inspirar a criar páginas AMP responsivas:

#### Produção

- [Getty Images "2016 em foco" ](http://www.gettyimages.com/2016/)
- [Guia de presentes para o feriado da BRIT + CO](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [The Guardian](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### Criado pela AMP

- [Examples: modelos e amostras](../../../../documentation/examples/index.html)
- [Modelos](../../../../documentation/templates/index.html)
- [Codelab do workshop da conferência sobre AMP: como criar lindas páginas AMP](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)
