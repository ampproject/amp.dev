---
"$title": Анимация элементов
"$order": '6'
description: Вы можете сделать веб-историю еще лучше, снабдив элементы внутри страницы начальной анимацией. Например, вы можете заставить свой заголовок лететь из...
components:
- anim
author: bpaduch
---

Вы можете сделать веб-историю еще лучше, снабдив элементы внутри страницы начальной анимацией. Например, вы можете сделать так, чтобы ваш заголовок выезжал слева, падал на страницу, плавно появлялся и т. п. Платформа AMP-историй предоставляет следующие встроенные анимации:

<table>
<thead><tr>
  <th width="50%">Пресет анимации</th>
  <th width="25%">Продолжительность по умолчанию (мс)</th>
  <th width="25%">Задержка по умолчанию (мс)</th>
</tr></thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1600</td>
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
  <td>1000</td>
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
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
</tbody>
</table>

Чтобы применить начальную анимацию к элементу, следует указать атрибут <code>animate-in="<em data-md-type="raw_html"><animation data-md-type="raw_html" preset></animation></em>"</code> с одним из значений пресетов анимации. Например, чтобы текст «упал» на страницу, добавьте в текстовый элемент атрибут `animate-in="drop"`:

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="note"] Опробуйте различные эффекты анимации, добавляя атрибут `animate-in="<animation preset>"` в элементы на страницах истории. [/tip]

## Время анимации

Каждый пресет анимации имеет встроенное значение по умолчанию для следующих параметров:

- **delay**: время задержки запуска анимации. Например, задержка в 0,3 секунды означает, что анимация запускается через 0,3 секунды после отображения страницы. Задержка в 0 с запускает анимацию сразу же.
- **duration**: количество времени, в течение которого выполняется анимация. Например, анимация плавного появления элемента занимает 500 мс от начала до конца.

Вы можете настроить время анимации, изменив задержку или продолжительность с помощью атрибутов `animate-in-delay` и `animate-in-duration`. В следующем примере `my-element` «влетает» в страницу слева через 0,3 секунды и завершает «влет» течение 0,5 секунды:

```html
<amp-story-page id="my-page">
  ...
  <p class="my-element"
      animate-in="fly-in-left"
      animate-in-delay="0.3s"
      animate-in-duration="0.5s">
    I'm going to fly into the page from the left!
  </p>
</amp-story-page>
```

## Анимируем нашу последнюю страницу

Последняя страница нашей веб-истории состоит из двух слоев: первый слой представляет собой коллаж из изображений животных, а второй содержит текст баннера. Чтобы создать эту страницу, **добавьте** следующий код сразу после предыдущей страницы истории:

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

Перезагрузите AMP-историю в своем браузере и убедитесь, что страница отображается правильно и выглядит следующим образом:

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

Выглядит отлично, но статично! Давайте оживим ее.

Начнем с входной анимации текста баннера, чтобы он «влетал» на страницу справа. Добавьте в элемент `<p>` атрибут `animate-in="whoosh-in-right"`следующим образом:

```html
<p class="banner-text"
  animate-in="whoosh-in-right">
Pets can lower your stress levels!</p>
```

Перезагрузите страницу истории в браузере и убедитесь, что баннер «въезжает» на страницу.

Затем давайте сделаем так, чтобы все изображения постепенно проявлялись. Добавьте во все элементы [`amp-img`](../../../../documentation/components/reference/amp-img.md) атрибут `animate-in="fade-in"`, чтобы код выглядел так:

```html
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

Обновив и перезагрузив страницу, вы увидите, что изображения теперь отображаются с эффектом плавного появления. Это здорово, но эффект едва ли будет заметным, так как плавное появление всех изображений происходит одновременно! Мы можем сделать визуальный эффект более «эффектным», изменив скорость и время начала анимаций.

Давайте отложим появление первого изображения так, чтобы оно начиналось приблизительно к завершению «влета» текстового баннера — скажем, на отметке 0,4 с. Что касается остальных трех изображений, появление каждого из них мы будем начинать через 0,2 секунды после начала анимации появления предыдущего изображения. В каждый элемент [`amp-img`](../../../../documentation/components/reference/amp-img.md) добавьте атрибут `animate-in-delay=""` с соответствующим значением задержки. Ваш код должен выглядеть так:

```html
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

Обновите и перезагрузите свою историю. Ваша последняя страница должна выглядеть так:

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

Возможности анимации в веб-историях очень обширны (например, комбинирование анимаций, объединение анимаций в цепочку) и в этом уроке рассматриваются лишь поверхностно. Подробнее об анимации можно узнать в справочной документации по [`amp-story`](../../../../documentation/components/reference/amp-story.md).
