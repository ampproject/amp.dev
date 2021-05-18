---
'$title': Sistema de layout do AMPHTML
$order: 1
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: 'Visão geral '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-layout.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

## Visão geral

O principal objetivo do sistema de layout é garantir que os elementos AMP possam expressar seu layout para que o runtime tenha condições de inferir o dimensionamento dos elementos antes que quaisquer recursos remotos, tais como JavaScript e chamadas de dados, tenham sido concluídos. Isto é importante já que reduz significativamente quaisquer interrupções na renderização e rolagem.

Com isto em mente, o sistema de layout AMP foi projetado para oferecer suporte a alguns poucos layouts, porém flexíveis, que oferecem boas garantias de desempenho. Esse sistema depende de um conjunto de atributos como `layout`, `width`, `height`, `sizes` e `heights` para expressar as necessidades de layout e dimensões do elemento.

## Comportamento <a name="behavior"></a>

Um elemento AMP que não é container (por exemplo, `layout != container`) inicia no modo unresolved/unbuilt (não resolvido / não construído) onde todos os seus elementos-filho estão ocultos, exceto por um placeholder que ocupa o lugar do elemento enquanto ele não está pronto (veja o atributo `placeholder`). O JavaScript e payload de dados necessários para construir o elemento totalmente ainda podem estar sendo baixados e inicializados, mas o runtime do AMP já sabe como dimensionar e posicionar o elemento contando apenas com as classes CSS e os atributos `layout`, `width`, `height` e `media`. Na maioria dos casos, um `placeholder`, se especificado, é dimensionado e posicionado para ocupar todo o espaço do elemento.

O `placeholder` fica oculto assim que o elemento é criado e seu primeiro layout é concluído. Nesse ponto, espera-se que todos os elementos-filho do elemento tenham sido corretamente construídos, posicionados e prontos para serem exibidos e a receberem entrada de dados fornecidas por um usuário. Este é o comportamento default. Cada elemento pode substituir o `placeholder` mais rapidamente (por exemplo, ocultá-lo) ou mantê-lo visível por mais tempo.

O elemento é dimensionado e exibido com base nos atributos `layout`, `width`, `height` e `media` pelo runtime. Todas as regras de layout são implementadas internamente via CSS. Diz-se que o elemento "define dimensões" se suas dimensões poderem ser inferidas pelos estilos CSS e não seja alterado com base nos seus elementos-filho: disponíveis imediatamente ou inseridos dinamicamente. Isto não significa que as dimensões desse elemento não possam ser alteradas. O layout pode ser totalmente responsivo, como acontece com os layouts `responsive`, `fixed-height`, `fill` e `flex-item`. Significa simplesmente que as dimensões não são alteradas sem uma ação explícita do usuário, por exemplo, durante a renderização, rolagem ou após um download.

Se o elemento tiver sido configurado incorretamente, ele não será renderizado no modo PROD e, no modo DEV, o runtime renderizará o elemento no estado de erro. Possíveis erros incluem valores inválidos ou não suportados dos atributos `layout`, `width` e `height`.

## Atributos de layout <a name="layout-attributes"></a>

### `width` e `height` <a name="width-and-height"></a>

Dependendo do valor do atributo `layout`, os elementos do componente AMP devem ter atributos `width` e `height` que contenham valores inteiros em pixels. O comportamento real do layout será determinado pelo atributo `layout`, como descrito abaixo.

Em alguns casos, se `width` ou `height` não forem especificados, o runtime do AMP poderá usar valores default para esses atributos da seguinte maneira:

- `amp-pixel`: Tanto `width` e `height` recebem valor default 0.
- `amp-audio`: O valor default para `width` e `height` são inferidos a partir do navegador.

### `layout` <a name="layout"></a>

O AMP fornece um conjunto de layouts que especificam como um componente AMP irá se comportar no layout do documento. Você pode especificar um layout para um componente adicionando o atributo `layout` com um dos valores especificados na tabela abaixo.

**Exemplo**: Uma imagem responsiva simples, em que largura (width) e altura (height) são usadas para determinar a proporção da imagem.

[sourcecode:html]
<amp-img
src="/img/amp.jpg"
width="1080"
height="610"
layout="responsive"
alt="an image"

> </amp-img>
> [/sourcecode]

Valores suportados para o atributo `layout`:

<table>
  <thead>
    <tr>
      <th width="30%">Valor</th>
      <th>Comportamento e requisitos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Não está presente</td>
      <td>Se nenhum valor for especificado, o layout do componente será inferido da seguinte maneira:         <ul>           <li>Se <code>height</code> estiver presente e <code>width</code> estiver ausente ou configurada com <code>auto</code>, um layout <code>fixed-height</code> será presumido.</li>           <li>Se <code>width</code> e <code>height</code> estiverem presentes junto com o atributo <code>sizes</code> ou <code>heights</code>, um layout <code>responsive</code> será presumido.</li>           <li>Se <code>width</code> e <code>height</code> estiverem presentes, um layout  <code>fixed</code> será presumido.</li>           <li> Se <code>width</code> e <code>height</code> estiverem ausentes, um layout <code>container</code> será presumido.</li>         </ul>
</td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>O elemento permite que seus filhos definam suas dimensões, de forma similar a um <code>div</code> HTML comum. Presume-se que o componente não terá um layout específico, mas aja apenas como um container; seus elementos-filho serão renderizados imediatamente.</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>O elemento ocupa todo o espaço disponível para ele:  largura e altura. Em outras palavras, o layout e dimensões de um elemento <code>fill</code> correspondem ao seu elemento-pai. Para que um elemento preencha seu container-pai, especifique o layout "fill" e garanta que o container-pai especifique <code>position:relative</code> ou <code>position:absolute</code>.</td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>O elemento possui largura e altura fixas, sem suporte à responsividade. Os atributos <code>width</code> e <code>height</code> precisam estar presentes. As únicas exceções são os componentes <code>amp-pixel</code> e <code>amp-audio</code>.</td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>O elemento ocupa todo o espaço disponível, mas mantém a altura inalterada. Este layout funciona bem para elementos como <code>amp-carousel</code> que envolve conteúdo que é posicionado horizontalmente. O atributo <code>height</code> precisa estar presente. O atributo <code>width</code> não deve estar presente ou deve ser igual a <code>auto</code>.</td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>O elemento e outros elementos do seu elemento-pai com o tipo de layout <code>flex-item</code> ocupam o espaço restante do container-pai quando o elemento-pai é um container flexível (ou seja, <code>display: flex</code>). Os atributos <code>width</code> e <code>height</code> não são necessários.</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>O elemento ocupa todo o espaço disponível e redimensiona sua altura automaticamente dentro da proporção dada pelos atributos <code>width</code> e <code>height</code> <em>até que</em> atinja as dimensões definidas pelos atributos `width` e` height` passadas ao <code>amp-img</code>, ou atinja uma restrição CSS, como por exemplo `max-width`. Os atributos height e width devem estar presentes. Este layout funciona muito bem para a maioria dos elementos AMP, inclusive <code>amp-img</code>, <code>amp-carousel</code>, etc. O espaço disponível depende do elemento-pai e também pode ser personalizado usando CSS <code>max-width</code>. Este layout difere de <code>responsive</code> por possuir altura e largura intrínsecas. Isto é mais fácil de perceber dentro de um elemento flutuante onde um layout <code>responsive</code> renderiza nas dimensões 0x0 e um layout <code>intrinsic</code> expande-se até seu tamanho natural ou qualquer restrição CSS, o que for menor.</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>O elemento não é exibido e não ocupa espaço algum na tela como se seu estilo de exibição fosse <code>none</code>. Esse layout pode ser aplicado qualquer elemento AMP. Pressupõe-se que o elemento possa ser exibido a partir de ação do usuário (por exemplo, <code>amp-lightbox</code>). Os atributos <code>width</code> e <code>height</code> não são necessários.</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>O elemento ocupa todo o espaço disponível e redimensiona sua altura automaticamente ajustando-se à proporção fornecida pelos atributos <code>width</code> e <code>height</code>. Esse layout funciona muito bem para a maioria dos elementos AMP, inclusive <code>amp-img</code>, <code>amp-video</code>, etc. O espaço disponível depende do elemento-pai e também pode ser personalizado usando <code>max-width</code>. Os atributos <code>width</code> e <code>height</code> devem estar presentes. <p><strong>Observação</strong>: Elementos com <code>"layout=responsive"</code>  não possuem dimensões intrínsecas. As dimensões do elemento são determinadas a partir do seu elemento container. Para garantir que seu elemento AMP seja exibido, você precisa especificar uma largura e altura para o elemento que o contém. Não especifique <code>"display:table"</code> no elemento externo, pois isso sobrepõe a exibição do elemento AMP, deixando o elemento AMP invisível.</p>
</td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

Todos os elementos AMP que suportam o layout `responsive` também suportam o atributo `sizes`. O valor desse atributo é uma expressão de dimensões, conforme descrito em [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), mas estendido a todos os elementos, não apenas às imagens. Em suma, o atributo `sizes` descreve como a largura do elemento é calculada dependendo das condições da mídia.

Quando o atributo `sizes` é especificado junto com `width` e `height`, o `layout` será `responsive` por default.

**Exemplo**: Usando o atributo `sizes`

No exemplo a seguir, se a viewport for mais larga que `320px`, a imagem terá 320px de largura; caso contrário, terá 100vw de largura (100% da largura da viewport).

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"

> </amp-img>
> [/sourcecode]

### `disable-inline-width` <a name="disable-inline-width"></a>

O atributo `sizes` por si só definirá um estilo inline `width` no elemento. Ao combinar `disable-inline-width` com `sizes`, o elemento AMP propagará o valor de `sizes` para a tag subjacente do elemento, de forma similar a um `img` aninhado dentro de um `amp-img`, **sem** definir a `width` embutida como `sizes` geralmente faz por conta própria no AMP.

**Exemplo**: Usando o atributo `disable-inline-width`

No exemplo a seguir, a largura do elemento `<amp-img>` não é afetada, e `sizes` é usado apenas para selecionar uma das fontes do `srcset`.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"
disable-inline-width

> </amp-img>
> [/sourcecode]

### `heights` <a name="heights"></a>

Todos os elementos AMP que suportam o layout`responsive` também suportam o atributo `heights`. O valor desse atributo é uma expressão de dimensões similar ao [atributo img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), mas com duas diferenças importantes:

1. É aplicado à altura, não à largura do elemento.
2. Valores percentuais são permitidos, por exemplo: `86%`. Se um valor percentual for usado, ele indica a porcentagem da largura do elemento.

Quando o atributo `heights` é especificado junto com `width` e `height`, o `layout` será `responsive` por default.

**Exemplo**: Usando o atributo `heights`

No exemplo a seguir, a altura da imagem será padronizada em 80% da largura, mas se a viewport for maior que `500px`, a altura será truncada em `200px`. Como o atributo `heights` é especificado junto com `width` e `height`, o layout será `responsive` por default.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="320"
height="256"
heights="(min-width:500px) 200px, 80%"

> </amp-img>
> [/sourcecode]

### `media` <a name="media"></a>

A maior parte dos elementos AMP suporta o atributo `media`. O valor de `media` é uma media query. Se não corresponder, o elemento não será renderizado e seus recursos, e potencialmente os recursos dos seus elementos-filho, não serão baixados. Se a janela do navegador alterar o tamanho ou a orientação, as media queries serão reavaliadas e os elementos serão ocultados ou exibidos com base nos novos resultados.

**Exemplo**: Usando o atributo `media`

No exemplo a seguir, temos duas imagens com consultas de mídia mutuamente excludentes. Dependendo da largura da tela, uma das duas imagens será baixada e renderizada. O atributo `media` está disponível em todos os elementos AMP, portanto, pode ser usado com elementos que não são de imagem, como anúncios.

[sourcecode:html]
<amp-img
media="(min-width: 650px)"
src="wide.jpg"
width="466"
height="355"
layout="responsive"

> </amp-img>
> <amp-img
>   media="(max-width: 649px)"
>   src="narrow.jpg"
>   width="527"
>   height="193"
>   layout="responsive"
> </amp-img>
> [/sourcecode]

### `placeholder` <a name="placeholder"></a>

O atributo `placeholder` pode ser definido em qualquer elemento HTML, não apenas nos elementos AMP. O atributo `placeholder` indica que o elemento marcado com este atributo age como um espaço reservado para o elemento AMP pai. Se especificado, um elemento de placeholder deve ser filho direto do elemento AMP correspondente. Por default, o placeholder é exibido imediatamente para o elemento AMP, mesmo que os recursos do elemento AMP não tenham sido ainda baixados ou inicializados. Assim que estiver pronto, o elemento AMP tipicamente esconde seu placeholder e exibe o conteúdo. O comportamento exato em relação ao elemento de placeholder depende da sua implementação.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
<amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

O atributo `fallback` pode ser definido para qualquer elemento HTML, não apenas em elementos AMP. Um fallback (reserva) é uma convenção que permite ao elemento comunicar ao usuário que o navegador não suporta o elemento. Se especificado, o elemento de reserva deve ser filho direto do elemento AMP. O comportamento exato em relação ao elemento de reserva depende da sua implementação.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">

  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

O atributo `noloading` indica se o "indicador de carregamento" deve ser desativado para este elemento. Muitos elementos AMP têm permissão para mostrar um "indicador de carregamento", que é uma animação básica que mostra que o elemento ainda não foi totalmente carregado. Os elementos podem desativar esse comportamento adicionando esse atributo.

## (tl;dr) Resumo dos requisitos de layout e comportamentos <a name="tldr-summary-of-layout-requirements--behaviors"></a>

A tabela a seguir descreve os parâmetros aceitos, classes CSS e estilos usados para o atributo `layout`. Observe que:

1. Qualquer classe CSS marcada com o prefixo `-amp-` e elementos com o prefixo `i-amp-` é considerada interna ao AMP e seu uso nas folhas de estilo do usuário não é permitido. Elas estão mostradas aqui simplesmente com finalidade informativa.
2. Embora `width` e `height` sejam especificados na tabela conforme necessário, as regras default podem ser aplicadas como é o caso de `amp-pixel` e `amp-audio`.

<table>
  <thead>
    <tr>
      <th width="21%">Layout</th>
      <th width="20%">Atributos width/height obrigatórios? <br>
</th>
      <th width="20%">Define dimensões?</th>
      <th width="20%">Elementos adicionais</th>
      <th width="19%">CSS "display"</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>Não</td>
      <td>Não</td>
      <td>Não</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Não</td>
      <td>Sim, dimensões do componente-pai.</td>
      <td>Não</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Não</td>
      <td>Sim, especificado por <code>width</code> e <code>height</code>.</td>
      <td>Não</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td> Apenas <code>height</code>; <code>width</code> pode ser <code>auto</code>
</td>
      <td>Sim, especificado pelo container-pai e <code>height</code>.</td>
      <td>Não</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>Não</td>
      <td>Não</td>
      <td>Sim, baseado no container-pai.</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Sim</td>
      <td>Sim, baseado no container pai e na proporção de <code>width:height</code>.</td>
      <td>Sim, <code>i-amphtml-sizer</code>.</td>
      <td> <code>block</code> (comporta-se como um <a rel="nofollow" href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element">elemento substituído</a>)</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>Não</td>
      <td>Não</td>
      <td>Não</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Sim</td>
      <td>Sim, baseado no container pai e na proporção de <code>width:height</code>.</td>
      <td>Sim, <code>i-amphtml-sizer</code>.</td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>
