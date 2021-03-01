---
'$title': Добавление новых страниц
$order: 5
description: Процедура добавления следующих страниц в нашу историю «Домашние питомцы» довольно схожа с уже знакомым вам процессом добавления страницы в веб-историю.
author: bpaduch
---

Процедура добавления следующих страниц в нашу историю «Домашние питомцы» довольно схожа с уже знакомым вам процессом добавления страницы в веб-историю. Используя уже имеющиеся у вас знания и информацию, представленную ниже, **создайте оставшиеся страницы**. Если вы зашли в тупик, вы можете свериться с завершенным кодом (<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>).

[tip type="tip"] **СОВЕТ.** Помните, что каждой странице нужен уникальный атрибут «id» (например, `id="page1"`). [/tip]

## Страница 1. Кошки

Демонстрирует, как отобразить изображение и текст на одном слое.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>Содержит 1 слой: <ul> <li>Реализует шаблон <a href="create_cover_page.md#vertical"><code>vertical</code></a>.</li> <li>Содержит 3 элемента: <ul> <li>Элемент  <code> <h1> </code>с заголовком <em>Cats</em> </li> <li>Адаптивный элемент <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">cat.jpg</code>, 720 x 1280px)</li> <li>Элемент <code><q></code> со следующим текстом: <em>Dogs come when they're called. Cats take a message and get back to you. --Mary Bly</em> </li> </ul> </li> </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Page 1 - Cats' ) }}</td>
  </tr>
</table>

## Страница 2. Собаки

Демонстрирует, как расположить текст и отобразить изображение, заполняющее экран, используя два слоя.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>Состоит из двух слоев: <ul> <li> <b> Слой 1</b>: реализует шаблон <a href="create_cover_page.md#fill"> <code>fill</code></a> и содержит адаптивный элемент <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>(<code class="filename">dog.jpg</code>, 720 x 1280px).</li>
<li>
<b>Слой 2</b>: реализует шаблон <a href="create_cover_page.md#thirds"><code> thirds </code></a> и содержит 2 элемента: <ul>
<li> Элемент <code><h1></code> с заголовком: <em>Dogs</em>
</li>
<li>Элемент<code><p></code>, указывающий <a href="create_cover_page.md#thirds"><code>grid-area</code></a>, занимающий <a href="create_cover_page.md#thirds"><code>lower-third</code></a> (нижнюю треть экрана) и содержит следующий текст: <em>Dogs were probably the first tame animals. They have accompanied humans for some 10,000 years. Some scientists assert that all dogs, domestic and wild, share a common ancestor in the small South Asian wolf.</em>
</li>
</ul>
</li>
</ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Page 2 - Dogs' ) }}</td>
  </tr>
</table>

## Страница 3. Птицы

Демонстрирует, как расположить текст, добавить изображение, заполняющее экран, а также обеспечить фоновое звуковое сопровождение страницы.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Содержит 3 слоя: <ul> <li> <b>Слой 1</b>: реализует шаблон <a href="create_cover_page.md#fill"><code>fill</code></a> и содержит адаптивный элемент <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">bird.jpg</code>, 720 x 1280px).</li> <li> <b>Слой 2</b>: реализует шаблон <a href="create_cover_page.md#vertical"><code>vertical</code></a> и содержит один элемент: <ul> <li>Элемент <code><h1></code> с заголовком <em>Birds</em> </li> </ul> </li> <li> <b>Слой 3</b>: реализует шаблон <a href="create_cover_page.md#vertical"><code>vertical</code></a> и содержит один элемент: <ul> <li>Элемент <code><q></code> для следующей информации: <em>A bird is three things: Feathers, flight and song, And feathers are the least of these.--Marjorie Allen Seiffert</em> </li> <li>Третий слой использует свойство <code>class="bottom"</code> для выравнивания дочерних элементов по низу экрана.</li> </ul> </li> </ul>
</li>
      <li>Воспроизводит аудиофайл в фоновом режиме, пока страница продолжает отображаться. Воспроизводить фоновое аудио можно как во всей истории, так и на одной странице. Чтобы воспроизводить аудио только на странице, добавьте в элемент <code><amp-story-page></code> атрибут <code>background-audio="assets/bird-singing.mp3"</code>.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Page 3 - Birds' ) }}</td>
  </tr>
</table>

## Страница 4. Кролики

Демонстрирует, как расположить текст и отобразить заполняющее экран видео.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Содержит 3 слоя: <ul> <li> <b>Слой 1</b>: реализует шаблон <code>fill</code> и содержит адаптивный элемент <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> (<code class="filename">rabbit.mp4</code>). <ul> <li>Не забывайте о размещении <strong>обязательного скрипта</strong> для компонента <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> в своем разделе <code><head></code>, чтобы видео отображалось.</li> <li>Укажите изображение <code>poster</code> (<code class="filename">rabbit.jpg</code>). Этот атрибут является <strong>обязательным</strong> для корректно сформированных AMP-историй.</li> <li>Чтобы видео воспроизводилось автоматически, установите атрибут <code>autoplay</code>. Этот атрибут является <strong>обязательным</strong> для корректно сформированных AMP-историй.</li> <li>Чтобы видео воспроизводилось циклически, установите атрибут <code>loop</code>.</li> <li>Установите размер: <code>width="720"</code> <code>height="1280"</code> и макет: <code>layout="responsive"</code>.</li> </ul> </li> <li> <b>Слой 2:</b> реализует шаблон <code>vertical</code> и содержит один элемент: <ul> <li>Элемент <code><h1></code> с заголовком: <em>Rabbits</em> </li> </ul> </li> <li> <b>Слой 3</b>: реализует шаблон <code>vertical</code> и содержит один элемент: <ul> <li>Элемент <code><p></code>, который содержит следующий текст: <em>Rabbits can learn to follow simple voice commands and come when called by name, and are curious and playful.</em>
</li> <li>Примените к слою CSS-класс <code>bottom</code>, чтобы корректно выровнять дочерние элементы по низу экрана.</li> </ul> </li> </ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Page 4 - Rabbits' ) }}</td>
  </tr>
</table>

Наша история «Домашние питомцы» почти завершена. На нашей последней странице мы используем анимацию, чтобы собрать всех питомцев вместе.
