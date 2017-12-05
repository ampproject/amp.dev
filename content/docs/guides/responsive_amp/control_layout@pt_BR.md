---
$title: Consultas de layout e mídia
---

[TOC]

A AMP é compatível com**consultas de mídia**  e**consultas de elementos** e também conta com um modo avançado e integrado de controlar o**layout** de elementos individuais. O atributo `layout` facilita muito o uso e a criação de design totalmente responsivo em comparação com o uso de somente CSS.

## Imagens responsivas mais fáceis

Crie imagens responsivas especificando `width` e `height`, definindo o layout para `responsive` e indicando com [`srcset`](/pt/docs/guides/responsive/art_direction.html) qual recurso de imagem usar com base em diferentes tamanhos de tela:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Esse elemento `amp-img` se ajusta automaticamente à largura do elemento contêiner, e a altura é automaticamente definida de acordo com a proporção determinada pela largura e a altura. Teste o recurso redimensionando essa janela de navegador:

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

{% call callout('Dica', type='success') %}
Confira nossa demonstração lado a lado de `amp-img` ao vivo para ver um exemplo básico e um avançado: [Demonstração ao vivo](https://ampbyexample.com/components/amp-img/)
{% endcall %}

## Atributo de layout

O atributo `layout` dá a você controle fácil e por elemento sobre como seu elemento deve ser renderizado na tela. Muitas dessas opções são possíveis com CSS puro, mas são muito mais complicadas e exigem diversas modificações. Em vez disso, use o atributo `layout`.

### Valores compatíveis com o atributo `layout`

Os valores a seguir podem ser usados no atributo `layout`:

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-twenty">Tipo de layout</th>
      <th data-th="Width/height required" class="col-twenty">Largura/altura necessárias</th>
      <th data-th="Behavior">Comportamento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>nodisplay</code></td>
      <td data-th="Description" class="col-twenty">Não</td>
      <td data-th="Behavior"> O elemento não é exibido. Esse layout pode ser aplicado a todos os elementos da AMP. O componente não ocupa espaço na tela, pois não tem estilo de exibição. Presume-se que o elemento pode exibir a si mesmo por uma ação do usuário, como<a href="/docs/reference/extended/amp-lightbox.html"><code> amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fixed</code></td>
      <td data-th="Description" class="col-twenty">Sim</td>
      <td data-th="Behavior"> O elemento tem uma largura e uma altura sem responsividade compatível. As únicas exceções são os elementos<a href="/docs/reference/amp-pixel.html"><code> amp-pixel</code></a>  e<a href="/docs/reference/extended/amp-audio.html"><code> amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>responsive</code></td>
      <td data-th="Description" class="col-twenty">Sim</td>
      <td data-th="Behavior"> O elemento é dimensionado seguindo a largura do contêiner dele e redimensiona a altura automaticamente de acordo com a proporção determinada pelos atributos de largura e altura. Esse layout funciona muito bem com a maioria dos elementos da AMP, incluindo<a href="/docs/reference/amp-img.html"><code> amp-img</code></a> e<a href="/docs/reference/amp-video.html"><code> amp-video</code></a>. O espaço disponível depende do elemento pai e também pode ser personalizado usando CSS<code> max-width</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fixed-height</code></td>
      <td data-th="Description" class="col-twenty">Somente altura</td>
      <td data-th="Behavior"> O elemento ocupa o espaço disponível, mas mantém a altura inalterada. Esse layout funciona bem para elementos como<a href="/docs/reference/extended/amp-carousel.html"><code> amp-carousel</code></a>  ,que envolve conteúdo posicionado horizontalmente. Se o atributo <code> width</code>  estiver presente, precisa ser igual a<code> auto</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fill</code></td>
      <td data-th="Description" class="col-twenty">Não</td>
      <td data-th="Behavior">O elemento ocupa o espaço disponível na largura e na altura. Em outras palavras, o layout de um elemento de preenchimento corresponde ao pai dele.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>container</code></td>
      <td data-th="Description" class="col-twenty">Não</td>
      <td data-th="Behavior"> O elemento permite que o filho defina o tamanho, como um HTML normal <code>div</code>. Presume-se que o componente não tenha um layout específico, mas somente aja como um contêiner. Os filhos são renderizados imediatamente.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>flex-item</code></td>
      <td data-th="Description" class="col-twenty">Não</td>
      <td data-th="Behavior"> O elemento e outros elementos no pai dele ocupam o espaço restante no contêiner do pai quando este é um contêiner flexível (ou seja,<code> display:flex</code> ). O tamanho do elemento é determinado pelo elemento pai, e o número de elementos dentro do pai pelo layout CSS<code> display:flex</code>.</td>
    </tr>
  </tbody>
</table>

### O que acontece se largura e a altura não estiverem definidas?

Em alguns casos, se `width` ou `height` não forem especificados, o tempo de execução da AMP pode usar o padrão desses valores, como mostrado a seguir:

* [`amp-pixel`](/pt/docs/reference/amp-pixel.html): a largura e a altura estão definidas como o padrão de 0.
* [`amp-audio`](/pt/docs/reference/extended/amp-audio.html): a largura e a altura padrão são inferidas do navegador.

###  O que acontece se o atributo <code>layout</code> não estiver especificado?

Se o atributo<code>layout</code> não estiver especificado, a AMP tenta inferir ou adivinhar o valor adequado:

<table>
  <thead>
    <tr>
      <th data-th="Rule">Regra</th>
      <th data-th="Inferred layout" class="col-thirty">Layout inferido</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule"><code>height</code>  está presente e<code>width</code>  está ausente ou é igual a<code>auto</code>.</td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Os atributos <code>width</code>  ou<code>height</code>  estão presentes com o atributo<code>sizes</code> .</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Os atributos <code>width</code>  ou<code>height</code> estão presentes.</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code>  e<code>height</code> não estão presentes.</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## Uso de consultas de mídia

### Consultas de mídia CSS

Use [`@media`](https://developer.mozilla.org/pt-BR/docs/Web/CSS/@media) para controlar a aparência e o comportamento do layout da página, como em qualquer outro website. Quando o tamanho ou a orientação da janela do navegador mudam, as consultas de mídia são reavaliadas, e os elementos são ocultos e exibidos com base nos novos resultados.

{% call callout('Dica', type='success') %}
Saiba mais sobre como controlar o layout aplicando consultas de mídia em [Usar consultas de mídia CSS para responsividade](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en).
{% endcall %}

### Consultas de mídia de elementos

Um recurso adicional para design responsivo disponível na AMP é o atributo `media`. O atributo pode ser usado em todos os elementos da AMP. Ele funciona de modo semelhante às consultas de mídia na folha de estilo global, mas só impacta o elemento específico em uma única página.

Por exemplo, aqui temos duas imagens com consultas de mídia mutuamente excludentes.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive">
</amp-img>
[/sourcecode]

Dependendo da largura da tela, uma ou a outra será buscada e renderizada.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive">
</amp-img>
[/sourcecode]
