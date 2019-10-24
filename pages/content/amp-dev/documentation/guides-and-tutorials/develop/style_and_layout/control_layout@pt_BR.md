---
$title: Consultas de mídia e layout
---

A tecnologia AMP é compatível com **consultas de mídia** e **consultas de elemento**, além de ter um recurso integrado e eficiente para controlar o **layout** de elementos individuais. O atributo `layout` facilita muito o uso e a criação de design completamente responsivo em comparação com a aplicação somente de CSS.

## Imagens responsivas simplificadas

Crie imagens responsivas especificando `width` e `height`, ajustando o layout para `responsive`
e indicando com [`srcset`](art_direction.md)
qual recurso de imagem será usado conforme diferentes tamanhos de tela:

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

Este [`amp-img`](../../../../documentation/components/reference/amp-img.md) se ajusta automaticamente à largura
do próprio elemento contêiner,
e sua altura é automaticamente definida para a proporção
determinada pela largura e pela altura fornecidas. Faça um teste redimensionando esta janela do navegador:

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

[tip type="success"]

Veja demonstrações ao vivo lado a lado de [`amp-img`](../../../../documentation/components/reference/amp-img.md): [Demonstrações ao vivo no site AMP By Example](../../../../documentation/examples/documentation/amp-img.html).

[/tip]

## O atributo layout <a name="the-layout-attribute"></a>

Com o atributo `layout`, é fácil controlar a forma que cada elemento
será exibido na tela. Vários desses recursos podem ser usados com CSS puro. No entanto,
isso é muito mais difícil e requer uma infinidade de gambiarras. Em vez disso, use o atributo `layout`.

### Valores compatíveis com o atributo `layout`

Estes valores podem ser usados no atributo `layout`:

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-thirty">Tipo de layout</th>
      <th data-th="Width/height required" class="col-twenty">Largura/<br>altura necessárias</th>
      <th data-th="Behavior">Comportamento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type"><code>nodisplay</code></td>
      <td data-th="Description">Não</td>
      <td data-th="Behavior">O elemento não é exibido. Pode ser aplicado a cada elemento de AMP. O componente não ocupa espaço na tela, como se o seu estilo de exibição fosse "none". A ação esperada é que o elemento seja exibido mediante ação do usuário, por exemplo, <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed</code></td>
      <td data-th="Description">Sim</td>
      <td data-th="Behavior">O elemento tem largura e altura fixas sem compatibilidade com a responsividade. As únicas exceções são <a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> e <a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>responsive</code></td>
      <td data-th="Description">Sim</td>
      <td data-th="Behavior">O elemento é redimensionado para a largura do seu elemento contêiner e redimensiona sua altura automaticamente de acordo com a proporção determinada pelos atributos de largura e altura. Esse layout funciona bem para a maior parte dos elementos de AMP, incluindo <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> e <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>. O espaço disponível depende do elemento pai e também pode ser personalizado com o CSS <code>max-width</code>.<p><strong>Observação</strong>: os elementos com <code>"layout=responsive"</code> não têm valor intrínseco. O tamanho do elemento é determinado a partir do elemento contêiner correspondente. Para garantir que o elemento de AMP seja exibido, você precisa especificar a altura e a largura do elemento contêiner. Não especifique <code>"display:table"</code> no elemento contêiner, porque isso modifica a exibição do elemento de AMP, que é renderizado invisível.</p></td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed-height</code></td>
      <td data-th="Description">Somente altura</td>
      <td data-th="Behavior">O elemento ocupa o espaço disponibilizado para ele, mas mantém a altura inalterada. Este layout funciona bem para elementos como <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a>, que envolvem conteúdo posicionado horizontalmente. O atributo <code>width</code> não pode estar presente ou precisa ser igual a <code>auto</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fill</code></td>
      <td data-th="Description">Não</td>
      <td data-th="Behavior">O elemento ocupa o espaço disponibilizado para ele, tanto em largura quanto em altura. Em outras palavras, o layout de um elemento de preenchimento corresponde ao layout pai dele. Para que um elemento preencha o contêiner pai correspondente, o contêiner pai deve especificar `position:relative` ou `position:absolute`.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>container</code></td>
      <td data-th="Description">Não</td>
      <td data-th="Behavior">O elemento permite que os filhos definam o próprio tamanho, como um <code>div</code> de HTML normal. Supõe-se que o componente não tem um layout próprio específico e atua apenas como um contêiner. Os filhos dele são renderizados imediatamente.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>flex-item</code></td>
      <td data-th="Description">Não</td>
      <td data-th="Behavior">O elemento e outros elementos presentes no pai usam o espaço restante do contêiner pai quando ele é flexível (ou seja, <code>display:flex</code>). O tamanho do elemento é determinado pelo pai e pelo número de outros elementos dentro do pai de acordo com o layout de CSS de <code>display:flex</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>intrinsic</code></td>
      <td data-th="Description">Sim</td>
      <td data-th="Behavior">O elemento ocupa o espaço disponível para ele e redimensiona a própria altura automaticamente conforme a proporção determinada pelos atributos <code>width</code> e <code>height</code> <em>até</em> atingir o tamanho natural do elemento ou uma restrição de CSS (por exemplo, max-width). Os atributos de altura e largura precisam estar presentes. Esse layout funciona bem com a maior parte dos elemento de AMP, incluindo <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>, <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a> etc. O espaço disponível depende do elemento pai e pode ser personalizado com CSS de <code>max-width</code>. Esse layout é diferente de <code>responsive</code> porque tem largura e altura intrínsecas. Isso fica mais aparente dentro de um elemento flutuante em que o layout <code>responsive</code> renderizará 0 x 0 e um layout <code>intrinsic</code> aumentará para o menor tamanho natural ou qualquer restrição de CSS. </td>
    </tr>
  </tbody>
</table>

[tip type="success"]

Acesse a página [Demonstração de layouts AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html#keyframes-stylesheet) para ver como diferentes layouts respondem ao redimensionamento de tela.

[/tip]

### O que acontece se a largura e a altura não estiverem definidas? <a name="what-if-width-and-height-are-undefined"></a>

Em alguns casos, se o atributo `width` ou `height` não estiver especificado,
o ambiente de tempo de execução de AMP poderá usar o seguinte padrão para esses valores:

* [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md): o valor padrão da largura e da altura será 0.
* [`amp-audio`](../../../../documentation/components/reference/amp-audio.md): o valor padrão da largura e da altura é inferido a partir do navegador.

### E se o atributo <code>layout</code> não estiver definido? <a name="what-if-the-layout-attribute-isnt-specified"></a>

Se o atributo <code>layout</code> não tiver sido especificado, a página AMP tentará inferir ou adivinhar
o valor adequado:

<table>
  <thead>
    <tr>
      <th data-th="Rule">Regra</th>
      <th data-th="Inferred layout" class="col-thirty">Layout inferido</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule"><code>height</code> está presente, e <code>width</code> está ausente ou é igual a <code>auto</code></td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Os atributos <code>width</code> ou <code>height</code> estão presentes com o atributo <code>sizes</code></td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule">O atributo <code>width</code> ou <code>height</code> está presente</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code> e <code>height</code> não estão presentes</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## Como usar consultas de mídia

### Consultas de mídia CSS

Use [`@media`](https://developer.mozilla.org/pt-BR/docs/Web/CSS/@media)
para controlar a aparência e o comportamento do layout da página, como em qualquer outro site.
Quando o tamanho ou a orientação da janela do navegador mudar,
as consultas de mídia serão avaliadas outra vez e os elementos serão ocultos e exibidos
com base nos novos resultados.

[tip type="read-on"]

Saiba mais sobre como controlar o layout aplicando consultas de mídia em [Usar consultas de mídia CSS para gerar responsividade](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=pt-BR).

[/tip]

### Consultas de mídia do elemento <a name="element-media-queries"></a>

Outro recurso extra para a geração de um design responsivo disponibilizado na AMP é o atributo `media`.
Esse atributo pode ser usado em cada elemento de AMP.
Ele funciona de modo semelhante às consultas de mídia em sua folha de estilo global,
mas impacta apenas esse determinado elemento em uma única página.

Por exemplo, aqui temos duas imagens com consultas de mídia que se excluem mutuamente.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="527"
    height="355"
    layout="responsive">
</amp-img>
[/sourcecode]

Dependendo da largura da tela, uma ou outra será buscada e processada.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="466"
    height="193"
    layout="responsive">
</amp-img>
[/sourcecode]
