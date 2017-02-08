---
$title: Layouts compatíveis
---

Torne seus elementos responsivos;
inclua `layout=responsive`.

[TOC]

## Valores compatíveis com o atributo de layout

Por padrão,
use os layouts responsivos.

Veja esta lista completa de valores compatíveis com o atributo de layout:

<table>
  <thead>
    <tr>
      <th class="col-twenty" data-th="Layout type">Tipo de layout</th>
      <th class="col-twenty" data-th="Width/height required">Largura/altura necessária</th>
      <th data-th="Behavior">Comportamento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>nodisplay</code></td>
      <td class="col-twenty" data-th="Description">Não</td>
      <td data-th="Behavior">Elemento não exibido. Pode ser aplicado a cada elemento da AMP. O componente não ocupa espaço na tela, como se o seu estilo de exibição fosse "none". A ação esperada é que o elemento seja exibido mediante ação do usuário, por exemplo, <a href="/docs/reference/extended/amp-lightbox.html"><code>amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed</code></td>
      <td class="col-twenty" data-th="Description">Sim</td>
      <td data-th="Behavior">O elemento tem largura e altura fixas sem suporte à responsividade. As únicas exceções são os elementos <a href="/docs/reference/amp-pixel.html"><code>amp-pixel</code></a> e <a href="/docs/reference/extended/amp-audio.html"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>responsive</code></td>
      <td class="col-twenty" data-th="Description">Sim</td>
      <td data-th="Behavior">O elemento é redimensionado para a largura do seu elemento contêiner e redimensiona a sua altura automaticamente de acordo com a proporção determinada pelos atributos de largura e altura. Este layout funciona muito bem na maioria dos elementos de AMP, incluindo <a href="/docs/reference/amp-img.html"><code>amp-img</code></a> e <a href="/docs/reference/amp-video.html"><code>amp-video</code></a>. O espaço disponível depende do elemento principal e também pode ser personalizado com a CSS <code>max-width</code>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed-height</code></td>
      <td class="col-twenty" data-th="Description">Somente altura</td>
      <td data-th="Behavior">O elemento ocupa o espaço disponibilizado para ele, mas mantém a altura inalterada. Este layout funciona bem para elementos como <a href="/docs/reference/extended/amp-carousel.html"><code>amp-carousel</code></a>, que envolvem conteúdo posicionado horizontalmente. O atributo <code>width</code> não deve estar presente ou deve ser igual a <code>auto</code>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fill</code></td>
      <td class="col-twenty" data-th="Description">Não</td>
      <td data-th="Behavior">O elemento ocupa o espaço disponibilizado para ele, tanto em largura quanto em altura. Em outras palavras, o layout de um elemento de preenchimento corresponde ao layout pai dele.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>container</code></td>
      <td class="col-twenty" data-th="Description">Não</td>
      <td data-th="Behavior">O elemento permite que seus derivados definam seu tamanho, quase como um <code>div</code> de HTML normal. Supõe-se que o componente não tem um layout próprio específico e apenas atua como um contêiner. Seus derivados são renderizados imediatamente.</td>
    </tr>
  </tbody>
</table>

### E se largura e altura estiverem indefinidas?

Em alguns casos, se `width` ou `height` não forem especificadas,
o tempo de execução da AMP poderá adotar os seguintes valores padrão:

* [`amp-pixel`](/docs/reference/amp-pixel.html): largura e altura adotam o padrão de 0.
* [`amp-audio`](/docs/reference/extended/amp-audio.html): largura e altura padrão são inferidas a partir do navegador.

### E se o atributo de layout não estiver definido?

O comportamento do layout é determinado assim:

* Se `height` estiver presente e `width` estiver ausente ou for igual a `auto`, o layout `fixed-height` será assumido.
* Se os atributos `width` ou `height` estiverem presentes juntamente com o atributo `sizes`, o layout `responsive` será assumido.
* Se os atributos `width` ou `height` estiverem presentes, o layout `fixed` será assumido.
* Se `width` e `height` não estiverem presentes, o layout `container` será assumido.

## Uso de @media e mídia

Use [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)
para controlar a aparência e o comportamento do layout da página, assim como você faria em outro site.
Quando a janela do navegador muda de tamanho ou de orientação,
as consultas de mídia são reavaliadas e os elementos são escondidos e mostrados
com base nos novos resultados.

Saiba mais sobre como controlar o layout aplicando consultas de mídia em
[Usar consultas de mídia CSS para gerar responsividade](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en).

Outro recurso extra para a geração de um design responsivo disponibilizado na AMP é o atributo `media`.
Esse atributo pode ser usado em cada elemento da AMP.
Ele funciona de modo semelhante às consultas de mídia em sua folha de estilo global,
mas impacta apenas esse determinado elemento em uma única página.

Por exemplo, aqui temos duas imagens com consultas de mídia que se excluem mutuamente.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive" >
</amp-img>
[/sourcecode]

Dependendo da largura da tela, uma ou outra será buscada e processada.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive" >
</amp-img>
[/sourcecode]

## Uso de srcset e tamanhos

Use o atributo `srcset` para controlar os recursos de um elemento
com base em expressões de mídia variantes.
Em particular, use-o em todas as tags [`amp-img`](/docs/reference/amp-img.html)
para especificar quais recursos de imagem serão usados com base em tamanhos de tela diferentes.

Neste exemplo simples,
`srcset` especifica qual a imagem será usada conforme a largura da tela.
O descritor `w` informa ao navegador a largura
de cada imagem na lista:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w >
</amp-img>
[/sourcecode]

**Observação:** a AMP é compatível com o descritor `w` em todos os navegadores.

Saiba mais sobre a criação de imagens responsivas usando `srcset`
em [Uso de imagens responsivas (agora)](http://alistapart.com/article/using-responsive-images-now).

Você também pode usar o atributo `sizes` juntamente com `srcset`.
O atributo `sizes` descreve como calcular o tamanho do elemento
com base em qualquer expressão de mídia.
Com base no tamanho calculado do elemento,
o user agent seleciona a fonte mais relativa fornecida pelo atributo `srcset`.

Considere o seguinte exemplo:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w
    sizes="(min-width: 650px) 50vw, 100vw" >
</amp-img>
[/sourcecode]

O atributo `sizes` definirá a largura do elemento como 50% do tamanho da janela de visualização
quando esta tiver 650 px ou mais.
Por exemplo, se a janela de visualização tiver 800 px,
a largura do elemento será definida como 400 px.
O navegador então seleciona o recurso `srcset` relativo a 400 px,
supondo que a proporção de pixels do dispositivo é de 1,
que neste caso é `narrow.jpg` (320 px).

**Importante:** quando o atributo de tamanhos é especificado juntamente com a largura e a altura,
o layout assume o padrão de `responsive`.

Saiba mais sobre os atributos `sizes` e `srcset` em comparação
com as consultas de mídia nesta
postagem do blog: [Srcset e tamanhos](https://ericportis.com/posts/2014/srcset-sizes/).

## Incluir marcadores de posição e substitutos

### placeholder

O elemento marcado com o atributo `placeholder` atua
como um marcador de posição para o elemento de AMP principal.
Se especificado, um elemento `placeholder` deve ser um derivado direto do elemento da AMP.

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive" >
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

Por padrão, o marcador de posição é imediatamente mostrado para o elemento da AMP,
mesmo que os recursos do elemento da AMP não tenham sido transferidos ou inicializados.
Depois de pronto, o elemento da AMP normalmente esconde seu marcador de posição e mostra o conteúdo.

**Observação:** o marcador de posição não precisa ser um elemento da AMP.
Qualquer elemento HTML pode atuar como marcador de posição.

### fallback

Use o atributo `fallback` para indicar o comportamento de substituição
de qualquer elemento incompatível com o navegador.
Por exemplo, use o atributo `fallback` para comunicar o usuário
que o navegador não é compatível com um determinado recurso:

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg" >
  <div fallback>
        <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

O atributo `fallback` pode ser definido em qualquer elemento HTML, e não apenas em elementos da AMP.
Se especificado, o elemento `fallback` deve ser um derivado direto do elemento da AMP.

### noloading

Muitos elementos da AMP estão na lista de permissões para a exibição de um "indicador de carregamento",
ou seja, uma animação básica que mostra que o elemento ainda não foi totalmente carregado.
Os elementos podem desativar esse comportamento adicionando o atributo `noloading`.
