---
'$title': Создание титульной страницы
$order: 4
description: 'Чтобы создать страницу, добавьте элемент <amp-story-page> в качестве дочернего элемента amp-story. Назначьте странице уникальный идентификатор. Для нашей первой страницы, которая является титульной страницей, давайте назначим уникальный идентификатор cover: ...'
author: bpaduch
---

Страница в веб-истории представлена компонентом `<amp-story-page>`. В [`amp-story`](../../../../documentation/components/reference/amp-story.md) у вас может быть один или несколько компонентов `<amp-story-page>`, каждый из которых содержит отдельный экран истории. Первая страница, которую вы указываете в порядке тегов документа, — это первая страница, отображаемая в веб-истории.

Чтобы создать страницу, **добавьте** элемент `<amp-story-page>` в качестве дочернего элемента [`amp-story`](../../../../documentation/components/reference/amp-story.md). **Назначьте** странице уникальный идентификатор. Для нашей первой страницы, которая является титульной страницей, давайте назначим уникальный идентификатор `cover`:

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

Теперь у нас есть оболочка для нашей титульной страницы. Однако наша история все еще не является корректно сформированной. На странице нужно указать хотя бы один **слой**. {{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='титульная страница состоит из двух слоев', align='right third' ) }}

## Слои на странице

Вы можете использовать слои на страницах AMP-истории для создания визуальных эффектов, подобно слоям в графических редакторах. Слои накладываются друг на друга, поэтому первый слой является нижним, следующий отображается поверх него и так далее.

Наша титульная страница состоит из двух слоев:

- **Слой 1.** Изображение, выполняющее функции фона
- **Слой 2**. Название статьи и ее автор

### Создание слоя 1

Давайте добавим первый слой на нашу титульную страницу. Слой содержит изображение, заполняющее экран.

Создайте слой, добавив элемент `<amp-story-grid-layer>` в виде дочернего элемента `<amp-story-page>`. Поскольку мы хотим, чтобы изображение заполняло экран, укажите для элемента `amp-story-grid-layer` атрибут `template="fill"`. Внутри слоя добавьте элемент [`amp-img`](../../../../documentation/components/reference/amp-img.md) для файла `cover.jpg` и убедитесь, что он является адаптивным (т. е. содержит `layout="responsive"`) и имеет размеры 720 x 1280 px. Вот как будет выглядеть наш слой:

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

Посмотрим, как будет отображаться страница. Откройте страницу в своем браузере: <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

Вот как она должна выглядеть:

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### Создание слоя 2

Итак, у нас есть фон, но теперь нам нужен второй слой, который размещается поверх фона и содержит наш заголовок и имя автора. Чтобы добавить второй слой, давайте выполним те же задачи, что и для слоя 1, но вместо использования шаблона `fill` мы будем использовать шаблон **`vertical`**. Однако, прежде чем идти дальше, давайте подробнее изучим шаблоны и то, как мы можем упорядочить элементы AMP и HTML внутри элемента `<amp-story-grid-layer>`.

#### Размещение элементов с помощью шаблона

Элемент `<amp-story-grid-layer>` размещает свои дочерние элементы в сетке (на основе [сетки CSS](https://www.w3.org/TR/css-grid-1/)). Чтобы указать, как вы хотите расположить дочерние элементы, вам необходимо указать один из следующих шаблонов макета:

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">Шаблон: Fill</h5></td>
</tr>
<tr>
    <td width="65%">Шаблон <strong>fill</strong> заполняет экран первым дочерним элементом слоя. Остальные дочерние элементы слоя не отображаются. Шаблон fill хорошо подходит для создания фона с помощью изображений и видео. <code class="nopad"><pre><amp-story-grid-layer template="fill">   <amp-img src="dog.png" width="720" height="1280" layout="responsive">   </amp-img> </amp-story-grid-layer></pre></code>
</td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">Шаблон: Vertical</h5></td>
</tr>
<tr>
    <td width="65%">Шаблон <strong>vertical</strong> размещает дочерние элементы вдоль оси Y. Элементы выравниваются по верху экрана и занимают весь экран по оси X. Шаблон vertical подходит для ситуаций, когда вы хотите расположить элементы «стопкой» сверху вниз.  <code class="nopad"><pre><amp-story-grid-layer template="vertical">   <p>element 1</p>   <p>element 2</p>   <p>element 3</p> </amp-story-grid-layer></pre></code>
</td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">Шаблон: Horizontal</h5></td>
</tr>
<tr>
    <td width="65%">Шаблон <strong>horizontal</strong> размещает дочерние элементы вдоль оси X.  Элементы выравниваются по начальной стороне экрана и занимают экран целиком по оси Y. Шаблон horizontal подходит для того, чтобы размещать элементы в виде горизонтальной очереди.    <code class="nopad"><pre><amp-story-grid-layer template="horizontal">   <p>element 1</p>   <p>element 2</p>   <p>element 3</p> </amp-story-grid-layer></pre></code>
</td>
    <td> {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">Шаблон: Thirds</h5></td>
</tr>
<tr>
<td width="65%">Шаблон <strong>thirds</strong> делит экран на три равных горизонтальных части и позволяет вам вставлять контент в каждую из них. Вы также можете использовать именованный элемент <code>grid-area</code>, чтобы указать, какую треть вы хотите использовать для контента: верхнюю (<code>upper-third</code>), среднюю (<code>middle-third</code>) или нижнюю (<code>lower-third</code>). Именованные элементы grid-area полезны для изменения стандартного порядка размещения элементов. Например, если в вашем слое два элемента, вы можете заставить первый отображаться в верхней трети (<code>grid-area="upper-third"</code>), а второй — в нижней (<code>grid-area="lower-third"</code>). <code class="nopad"><pre><amp-story-grid-layer template="thirds">   <h1 grid-area="upper-third">element 1</h1>   <p grid-area="lower-third">element 2</p> </amp-story-grid-layer> </pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### Завершение нашей титульной страницы

Теперь, когда вы освоили шаблоны слоев, давайте завершим наш второй слой для титульной страницы.

Для слоя 2 мы хотим, чтобы заголовок и имя были вверху, а элементы следовали друг за другом, поэтому мы укажем шаблон `vertical`. Наш второй элемент `amp-story-grid-layer` следует за первым:

```html
<amp-story-grid-layer>
  <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

Обновите браузер и посмотрите, что получилось. Наша титульная страница готова.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Completed cover page' ) }}
