---
'$title': Creating the cover page
$order: 4
description: 'Para criar uma página, adicione o elemento <amp-story-page> como filho de um amp-story. Atribua um ID exclusivo à página. Para nossa primeira página, que será a de abertura, atribuiremos um ID exclusivo chamado cover: ...'
author: bpaduch
---

Uma página dentro de uma História Web é representada pelo componente `<amp-story-page>`. Em um [`amp-story`](../../../../documentation/components/reference/amp-story.md), você pode ter um ou mais componentes`<amp-story-page>`, contendo cada uma das telas individuais de uma história. A primeira página que você especificar na ordem do documento é a primeira página exibida na História Web.

Para criar uma página, **adicione** o elemento `<amp-story-page>` como filho de um [`amp-story`](../../../../documentation/components/reference/amp-story.md). **Atribua** um ID exclusivo à página. Para nossa primeira página, que será a de abertura, atribuiremos um ID exclusivo chamado `cover`:

```html
<amp-story
  standalone
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
  <amp-story-page id="cover"> </amp-story-page>
</amp-story>
```

Agora temos o shell da nossa página de abertura. No entanto, a história ainda não é válida. É preciso especificar pelo menos uma **camada** na página. {{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='página de capa tem duas camadas', align='right third' ) }}

## Camadas em uma página

Assim como as camadas em gráficos, você pode usar camadas em páginas de histórias AMP para criar efeitos visuais. As camadas são posicionadas umas em cima das outras. Assim, a primeira será a camada inferior, a próxima camada será posicionada em cima dela e assim por diante.

Nossa página de abertura é composta por duas camadas:

- **Camada 1**: uma imagem que serve como pano de fundo
- **Camada 2**: o título e a autoria da história

### Criando a camada 1

Vamos adicionar a primeira camada à página de abertura. Essa camada contém uma imagem que preenche a tela.

Crie essa camada adicionando o elemento `<amp-story-grid-layer>` como filho de `<amp-story-page>`. Como a ideia é que a imagem preencha a tela, especifique o atributo `template="fill"` para `amp-story-grid-layer`. Dentro da camada, adicione um elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md) ao arquivo `cover.jpg` e certifique-se de que ele seja responsivo (ou seja, `layout="responsive"`) com as dimensões de 720 x 1280 px da imagem. A camada terá esta aparência:

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img
      src="assets/cover.jpg"
      width="720"
      height="1280"
      layout="responsive"
    >
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

Vejamos como a página é exibida. Abra a página no navegador: <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

Ela terá esta aparência:

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### Criando a camada 2

Já temos nosso pano de fundo. Agora, precisamos da segunda camada, que fica em cima do pano de fundo e contém o título e a autoria. Para adicionar a segunda camada, realizaremos as mesmas tarefas da criação da camada 1, mas, em vez de usar o modelo `fill`, usaremos o modelo **`vertical`**. No entanto, antes de continuar, vamos conhecer os modelos e aprender como podemos organizar os elementos AMP e HTML em um `<amp-story-grid-layer>`.

#### Layout dos elementos com um modelo

O elemento `<amp-story-grid-layer>` insere os respectivos elementos filhos em uma grade (baseada na [CSS grid](https://www.w3.org/TR/css-grid-1/)). Para indicar como você quer organizar os elementos-filho, é preciso especificar um dos seguintes modelos de layout:

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">Modelo: fill</h5></td>
</tr>
<tr>
    <td width="65%">O modelo de <strong>preenchimento</strong> preenche a tela com o primeiro elemento filho na camada. Nenhum outro filho é mostrado nessa camada. <p>O modelo de preenchimento é bom para planos de fundo, incluindo imagens e vídeos.</p>    <code class="nopad"><pre>&lt;amp-story-grid-layer template="fill">   &lt;amp-img src="dog.png" width="720" height="1280" layout="responsive">   &lt;/amp-img> &lt;/amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">Modelo: vertical</h5></td>
</tr>
<tr>
    <td width="65%">O modelo <strong>vertical</strong> insere os elementos-filho ao longo do eixo y. Os elementos são alinhados na parte superior da tela e ocupam a tela inteira ao longo do eixo x. O modelo vertical funciona bem quando você deseja empilhar elementos um sobre o outro.  <code class="nopad"><pre>&lt;amp-story-grid-layer template="vertical">   &lt;p>element 1&lt;/p>   &lt;p>element 2&lt;/p>   &lt;p>element 3&lt;/p> &lt;/amp-story-grid-layer></pre></code>
</td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">Modelo: horizontal</h5></td>
</tr>
<tr>
    <td width="65%">O modelo <strong>horizontal</strong> posiciona os elementos filhos no eixo x.  Eles são alinhados no início da tela e a ocupam completamente ao longo do eixo y.     <p>O modelo horizontal funciona bem quando o objetivo é empilhar elementos horizontalmente, um após o outro.</p>     <code class="nopad"><pre>&lt;amp-story-grid-layer template="horizontal">   &lt;p>element 1&lt;/p>   &lt;p>element 2&lt;/p>   &lt;p>element 3&lt;/p> &lt;/amp-story-grid-layer></pre></code>     </td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">Modelo: terços</h5></td>
</tr>
<tr>
<td width="65%">O modelo <strong>thirds</strong> divide a tela em três linhas de tamanho igual e permite inserir conteúdo dentro de cada área. Você também pode especificar um  <code>grid-area</code> para indicar qual terça parte da tela você deseja usar para seu conteúdo. Pode ser : <code>upper-third</code>, <code>middle-third</code> ou <code>lower-third</code>. As áreas de grade identificadas são úteis para alterar o comportamento padrão de onde os elementos aparecem. Por exemplo, se você tiver dois elementos na camada, você pode especificar o primeiro elemento para estar em <code>grid-area="upper-third"</code> e o segundo para estar em <code>grid-area="lower-third"</code>. <code class="nopad"><pre>&lt;amp-story-grid-layer template="thirds">   &lt;h1 grid-area="upper-third">element 1&lt;/h1>   &lt;p grid-area="lower-third">element 2&lt;/p> &lt;/amp-story-grid-layer> </pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### Concluir a página de abertura

Agora que você conhece os modelos de camadas, vamos concluir a segunda camada da página de abertura.

Para a camada 2, vamos posicionar o título e a autoria na parte superior, e queremos que os elementos estejam um após o outro, por isso, especificaremos o modelo `vertical`. Nosso segundo elemento `amp-story-grid-layer` seguirá o primeiro, da seguinte forma:

```html
<amp-story-grid-layer>
  <!--nossa primeira camada -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

Atualize o navegador e revise seu trabalho. A página de abertura está pronta.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Página de capa, pronta' ) }}
