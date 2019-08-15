---
$title: Animação de elementos
---

Para incrementar ainda mais uma história AMP, você pode aplicar entradas com animação a elementos na página. Por exemplo, faça o título surgir do lado esquerdo, descer da parte superior da página, aparecer lentamente e muito mais.  A estrutura das histórias AMP conta com as seguintes animações predefinidas:

<table>
<thead>
<tr>
  <th width="50%">Animação predefinida</th>
  <th width="25%">Duração padrão (ms)</th>
  <th width="25%">Atraso padrão (ms)</th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1.600</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fade-in</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-bottom</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-top</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pulse</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-left</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-right</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>twirl-in</code></td>
  <td>1.000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-left</code></td>
  <td>1.000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1.000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1.000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1.000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1.000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1.000</td>
  <td>0</td>
</tr>
</tbody>
</table>

Para aplicar uma entrada com animação a um elemento, é preciso especificar <code>animate-in="<em>&lt;animation preset></em>"</code> com um dos valores de animação predefinida.  Por exemplo, para fazer o texto descer da parte superior da página, adicione `animate-in="drop"` ao elemento text:

```html
<amp-story-page id="page3">
  …
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="success"]

Adicione o atributo `animate-in="<animação predefinida>"` a elementos das suas páginas de histórias para aplicar vários efeitos de animação.

[/tip]

## Tempo de animação

Cada animação predefinida tem valores de tempo padrão:

* **Atraso**: é o tempo decorrido até o início da animação.  Por exemplo, com um atraso de 0,3s, a animação entrará na página após 0,3 segundos. Se o atraso for de 0s, a animação começará imediatamente.
* **Duração**: é o tempo total da animação.  Por exemplo, a animação de aparecimento lento leva 500ms do início ao fim.

É possível personalizar o tempo da animação alterando o atraso ou a duração dela por meio dos atributos `animate-in-delay` e `animate-in-duration`. No exemplo a seguir, `my-element` entra pelo lado esquerdo da página após 0,3 segundos, e a animação termina em 0,5 segundos:

```html
<amp-story-page id="my-page">
  …
  <p class="my-element"
      animate-in="fly-in-left"
      animate-in-delay="0.3s"
      animate-in-duration="0.5s">
    I'm going to fly into the page from the left!
  </div>
</amp-story-page>
```

## Animação da última página

A última página da nossa história AMP é composta por duas camadas: a primeira é uma colagem de imagens de animais, e a segunda exibe um texto de banner.  Para criar essa página, **adicione** o código a seguir logo após a página anterior da história:

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img src="assets/cat.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/dog.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/bird.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/rabbit.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```
Atualize a história AMP no seu navegador e verifique se a página é renderizada corretamente e tem a seguinte aparência:

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

A página está ótima, mas o conteúdo é estático. Vamos dar um toque de animação.

Primeiro, animamos a entrada do texto de banner com o efeito "whoosh in" a partir da direita da página. Insira `animate-in="whoosh-in-right"` ao elemento `<p>` da seguinte maneira:

```html hl_lines="2"
<p class="banner-text"
  animate-in="whoosh-in-right">
Pets can lower your stress levels!</p>
```

Atualize a página da história no seu navegador e verifique se ela surge da direita.

Em seguida, faremos todas as imagens aparecerem lentamente. Insira `animate-in="fade-in"` em todos os elementos [`amp-img`](../../../../documentation/components/reference/amp-img.md). Seu código será semelhante a este:

```html hl_lines="4 9 14 19"
<amp-img src="assets/cat.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/dog.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/bird.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/rabbit.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
```

Se você atualizar a página, todas as imagens aparecerão lentamente.  Isso é ótimo, mas quase não é possível ver o efeito porque todas as imagens aparecem ao mesmo tempo. Para melhorar o efeito visual, podemos alterar o tempo das animações.

Vamos atrasar a entrada da primeira imagem para que ela apareça próximo de quando a animação do banner de texto terminar: por exemplo, 0,4s. As três imagens restantes podem aparecer 0,2s após a entrada da anterior. Adicione `animate-in-delay=""` a cada elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md) com o valor de atraso adequado. Seu código será semelhante a este exemplo:

```html hl_lines="5 11 17 23"
<amp-img src="assets/cat.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="0.4s">
</amp-img>
<amp-img src="assets/dog.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="0.6s">
</amp-img>
<amp-img src="assets/bird.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay=".8s">
</amp-img>
<amp-img src="assets/rabbit.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="1s">
</amp-img>

```

Atualize sua história.  A última página terá a seguinte aparência:

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

As histórias AMP oferecem muitas possibilidades de animações (por exemplo, com a combinação e encadeamento de efeitos). Este tutorial mostra somente o básico. Para saber mais sobre animações, consulte a [`amp-story`](../../../../documentation/components/reference/amp-story.md).
