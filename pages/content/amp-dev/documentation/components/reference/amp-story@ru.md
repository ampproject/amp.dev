---
$category@: presentation
formats:
- websites
teaser:
  text: Насыщенный и наглядный формат для историй
---



<!---
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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

# amp-story

<table>
  <tr>
    <td width="40%"><strong>Описание</strong></td>
    <td>Насыщенный и наглядный формат для историй.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Доступность</strong></td>
    <td><div><a href="https://www.ampproject.org/docs/reference/experimental.html">Экспериментальная функция</a></div></td>
  </tr>
  <tr>
    <td width="40%"><strong>Скрипт</strong></td>
    <td><code>&lt;script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Поддерживаемые шаблоны</a></strong></td>
    <td>Нет</td>
  </tr>
  <tr>
    <td width="40%"><strong>Примеры</strong></td>
    <td><ul>
      <li>Пример кода <a href="https://ampbyexample.com/stories/introduction/amp_story_hello_world/">Hello World</a> на сайте AMP By Example.</li>
      <li><a href="https://www.ampproject.org/docs/tutorials/visual_story">Руководство</a> по созданию визуальных AMP-историй.</li>
    </ul></td>
  </tr>
</table>

[tip type="ll callout('Важно!</b><a class="type_caution"]
Этот компонент экспериментальный и находится в разработке. О проблемах вы можете сообщать на [GitHub](https://github.com/ampproject/amphtml/issues/new).
[/tip]

## Примечания к версии

| Версия | Описание                                                            |
|-------|----------------------------------------------------------------------|
| 1.0     | Текущая версия, работает с 16 июля 2018 г.                                     |
| 0.1     | Первоначальная версия.  Устарела, удалена 19 марта 2019 г. |

## Переход с версии 0.1 на версию 1.0

По данным на 16 июля 2018 г. версия 0.1 больше не поддерживается. Ее удаление запланировано на 19 марта 2019 г.  Во время автоматического перехода на версию 1.0 в ваших AMP-историях могут произойти критические изменения.  Рекомендуем вручную перейти на версию 1.0 до указанной даты, чтобы обеспечить функциональность и правильный дизайн.

### Новые возможности форзацев

Мы добавили новые возможности для форзацев в AMP-историях. Вот несколько примеров:

* Сортировка поставщиков с учетом конфигурации JSON.
* Новые компоненты:
    * Ссылки с призывом к действию.
    * Текстовое поле.
    * Вертикальные и горизонтальные карточки.</li>

Чтобы воспользоваться этими возможностями, добавьте тег `<amp-story-bookend>` в качестве последнего дочернего тега для `<amp-story>`. Обязательные атрибуты:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `src` and `layout=nodisplay` are required. -->
  <amp-story-bookend src="bookendv1.json" layout="nodisplay">
  </amp-story-bookend>
</amp-story>
```

В разделе [amp-story-bookend](#bookend-amp-story-bookend) вы можете подробнее узнать о новых компонентах и о том, как указать их в конфигурации JSON.

### Новые требования к метаданным

Мы добавили в элемент `<amp-story>` новые атрибуты метаданных. Они будут использоваться для предварительного просмотра истории в экосистеме AMP-историй. Например, с помощью этих атрибутов можно добавить на форзац ссылку для предварительного просмотра, которая будет привлекать внимание пользователей. Эти функции гарантируют, что ваша история будет поддерживать расширенные возможности AMP-историй, которые мы реализуем в будущем.

```html
<!--</code>title<code>,</code>publisher<code>,</code>publisher-logo-src<code>and</code>poster-portrait-src` will soon be required. -->
<amp-story title="История" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"></amp-story></p>

<!-- <code>poster-square-src</code> and <code>poster-landscape-src</code> are optional, but strongly recommended. -->
<amp-story title="История" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg" poster-square-src="https://example.com/my-story/poster/1x1.jpg" poster-landscape-src="https://example.com/my-story/poster/4x3.jpg">
```

Учтите, что эти атрибуты метаданных дополняют, но не заменяют структурированные данные (например, JSON-LD) на странице. Мы по-прежнему рекомендуем добавить [структурированные данные](https://developers.google.com/search/docs/data-types/article#amp-sd) на все AMP-страницы, в том числе и в истории.

Новые атрибуты:

| АТРИБУТ | ОПИСАНИЕ |
|--|--|
| `title` [обязательно] | Название истории. |
| `publisher` [обязательно] | Имя или название издателя истории. |
| `publisher-logo-src` [обязательно] | Квадратный логотип издателя (соотношение сторон 1 x 1). |
| `poster-portrait-src` [обязательно] | Вертикальный постер для истории (соотношение сторон 3 x 4). |
| `poster-square-src` | Квадратный постер для истории (соотношение сторон 1 x 1). |
| `poster-landscape-src` | Горизонтальный постер для истории (соотношение сторон 4 x 3). |

#### Рекомендации по использованию `publisher-logo-src`

Требования к логотипу издателя:

* Необходимо использовать растровое изображение в формате `JPG`, `PNG` или `GIF`.  Векторные изображения, например в формате `SVG` или `EPS`, не поддерживаются.
* Нельзя использовать анимированные изображения, в том числе в формате GIF.
* Графическая часть логотипа должна быть четко различима на фоне страницы.

<table>
  <tr>
    <td>
      <amp-img alt="Логотип с синим текстом на белом фоне" width="107" height="112" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-1.png" layout="fixed">
        <noscript>
          <img alt="Логотип с синим текстом на белом фоне" src="img/publisher-logo-1.png">
        </noscript>
      </amp-img>
      Хороший вариант
    </td>
    <td>
      <amp-img alt="Логотип с белым текстом на синем фоне" width="107" height="101" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-2.png" layout="fixed">
        <noscript>
          <img alt="Логотип с белым текстом на синем фоне" src="img/publisher-logo-2.png">
        </noscript>
      </amp-img>
      Хороший вариант
    </td>
    <td>
      <amp-img alt="Логотип с синим текстом на синем фоне" width="103" height="102" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-3.png" layout="fixed">
        <noscript>
          <img alt="Логотип с синим текстом на синем фоне" src="img/publisher-logo-3.png">
        </noscript>
      </amp-img>
      Плохой вариант
    </td>
  </tr>
</table>

* Логотип должен быть квадратным, а не прямоугольным.
* Фон должен быть непрозрачным.
* Необходимо использовать только один логотип для каждого бренда, который будет одинаково выглядеть во всех AMP-историях.
* Допустимый размер изображения – не менее 96 x 96 пикселей.

#### Рекомендации по созданию постеров (для `poster-portrait-src`, `poster-landscape-src` и `poster-square-src`)

Ниже приведены рекомендации в отношении изображений для постеров в историях.

* Постер должен точно отражать содержание всей AMP-истории.
* Постер должен показываться пользователю в начале просмотра AMP-истории.  При этом URL графического файла, указанный в метаданных, может не совпадать в точности с URL, который используется на первой странице истории.  В метаданных можно изменить размер, обрезать изображение или немного подкорректировать стиль для предварительного просмотра.
* Допустимы только растровые изображения в формате `JPG`, `PNG` или `GIF`.  Векторные изображения, например в формате `SVG` или `EPS`, не поддерживаются.
* Соотношение сторон вертикального изображения – 3 х 4, горизонтального – 4 х 3, квадратного – 1 х 1.
* Если постер представляет собой кадр из видеоролика, этот значок видео должен точно отражать содержание всей AMP-истории. Самый первый кадр подходит редко.
* Минимальные размеры постеров:
    * Вертикальный: 696 x 928 пикселей.
    * Горизонтальный: 928 x 696 пикселей.
    * Квадратный: 928 x 928 пикселей.</li>

## Обзор

Расширение `amp-story` – новый формат для визуального контента. Благодаря этому вы можете предложить пользователям визуально насыщенные истории в удобной форме.

<figure class="centered-fig">
  <amp-anim width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="Пример AMP-истории" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

## Формат AMP-историй

[AMP-история](#story%3a-amp-story) – это документ AMPHTML, который состоит из [страниц](#pages%3a-amp-story-page). На страницах есть [слои](#layers%3a-amp-story-grid-layer), а в каждом слое – элементы AMP и HTML, например мультимедиа, аналитика, тексты и т. п.

<amp-img alt="Иерархия тегов в AMP-истории" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="Иерархия тегов в AMP-истории" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png">
  </noscript>
</amp-img>

### Шаблон

Ниже приведен неплохой шаблон для начала работы. Скопируйте этот код и сохраните его в файл с расширением `.html`.

```html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <title>Hello, amp-story</title>
    <link rel="canonical" href="http://example.ampproject.org/my-story.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal
    both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript>
      <style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none
        }
      </style>
    </noscript>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="my-first-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>Hello, amp-story!</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="my-second-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg2.gif" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>The End</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-bookend src="bookendv1.json" layout="nodisplay">
      </amp-story-bookend>
    </amp-story>
  </body>
</html>
```

С помощью этого кода создается история с двумя страницами.  На каждой из них – полноцветное фоновое изображение с простой строкой текста сверху.

### Обязательная разметка для amp-story

К формату HTML для AMP-историй применимы те же [требования](https://www.ampproject.org/docs/reference/spec#required-markup), что и к обычным документам AMPHTML. Есть также несколько дополнительных правил:

| ПРАВИЛО | ОПИСАНИЕ |
|----|---|
| Элемент `<amp-story standalone>` – единственный дочерний элемент для `<body>`. | Указывает на то, что документ является AMP-историей. |
| Необходимо добавить тег `<script async src="https://cdn.ampproject.org/v0/amp-story-1.0.js" custom-element="amp-story"></script>` в качестве третьего дочернего элемента в раздел `<head>`. | Включает и загружает библиотеку JavaScript для AMP-истории. |
| Необходимо добавить тег `<link rel="canonical" href="$STORY_URL">` в раздел `<head>`. | Ссылка указывает на саму историю и определяет ее как канонический документ. |

## История: `amp-story`

Компонент `amp-story` содержит всю историю.  Сам компонент реализует оболочку пользовательского интерфейса, включая обработку жестов и навигацию, а также вставку интерфейса (элементы управления, индикатор выполнения и т. д.).

<figure class="centered-fig">
  <amp-anim alt="Пример amp-story" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="Пример amp-story" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

### Пример

```html
<amp-story
    standalone
    title="My Story"
    publisher="The AMP Team"
    publisher-logo-src="https://example.com/logo/1x1.png"
    poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"
    poster-square-src="https://example.com/my-story/poster/1x1.jpg"
    poster-landscape-src="https://example.com/my-story/poster/4x3.jpg"
    background-audio="my.mp3">
    <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-bookend src="./related.json"></amp-story-bookend>
</amp-story>
```

### Атрибуты

##### standalone [обязательно]

Указывает на то, что документ является AMP-историей.

##### title [обязательно]

Название истории.

##### publisher [обязательно]

Имя или название издателя истории.

##### publisher-logo-src [обязательно]

URL квадратного логотипа издателя (соотношение сторон 1 x 1). Пример: `publisher-logo-src="https://example.com/logo/1x1.png"`, где файл 1x1.png – это логотип размером 36 x 36 пикселей.

##### poster-portrait-src [обязательно]

URL вертикального [постера для истории](#posters) (соотношение сторон 3 x 4).

##### supports-landscape [необязательно]

Включает поддержку горизонтальной ориентации на мобильных устройствах и отображение без полей на обычных компьютерах.

##### background-audio [необязательно]

URL аудиофайла, который воспроизводится на протяжении всей истории.

##### poster-square-src [необязательно]

URL квадратного [постера для истории](#posters) (соотношение сторон 1 x 1).

##### poster-landscape-src [необязательно]

URL горизонтального [постера для истории](#posters) (соотношение сторон 4 x 3).

### Плакаты

Плакат – это изображение, которое показывается в интерфейсе во время загрузки истории. Это может быть как первый ее экран, так и просто картинка, отражающая содержание.

### Дочерние элементы amp-story

Компонент `<amp-story>` содержит несколько компонентов [`<amp-story-page>`](#pages%3a-amp-story-page) с отдельными экранами для истории.  С первой из указанных страниц должна начинаться история.

### Горизонтальная ориентация и полноэкранный показ

Если в элементе `<amp-story>` есть атрибут `supports-landscape`, происходит следующее:

* Историю становится можно смотреть на мобильном устройстве в горизонтальном положении.
* На обычных компьютерах история показывается в полноэкранном режиме без полей, а не в виде трех вертикальных панелей по умолчанию.

Использование: `<amp-story ... supports-landscape>...</amp-story>`

<figure class="centered-fig">
  <span class="special-char">До:</span>
  <amp-anim alt="Пример для компьютера с тремя панелями" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif"></noscript>
  </amp-anim>
  <span class="special-char">После:</span>
  <amp-anim alt="Полный пример для компьютера" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif"></noscript>
  </amp-anim>
</figure>

## Страницы: `amp-story-page`

Компонент `<amp-story-page>` содержит контент для одной из страниц истории.

<figure class="centered-fig">
  <amp-anim alt="Пример стр. 1" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif" layout="fixed">
    <noscript>
      <img alt="Пример стр. 1" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif">
      </noscript>
    </amp-anim>
  </figure>
  <figure class="centered-fig">
    <amp-anim alt="Пример стр. 2" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif" layout="fixed">
      <noscript>
        <img alt="Пример стр. 2" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif">
        </noscript>
      </amp-anim>
    </figure>

### Пример

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-video layout="fill" src="background.mp4" poster="background.png" muted autoplay></amp-video>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical">
    <h1>These are the Top 5 World's Most...</h1>
    <p>Jon Bersch</p>
    <p>May 18</p>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="thirds">
    <amp-img grid-area="bottom-third" src="a-logo.svg" width="64" height="64"></amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

### Атрибуты

##### id [обязательно]

Уникальный идентификатор страницы. Может использоваться для определения стиля страницы и ее дочерних элементов в CSS, а также для идентификации страницы во фрагменте URL.

##### auto-advance-after [необязательно]

Указывает, когда автоматически переходить на следующую страницу.  Если этот атрибут отсутствует, автоматический переход не будет работать. Допустимые значения для `auto-advance-after`:

* Положительное [время](https://developer.mozilla.org/en-US/docs/Web/CSS/time) ожидания до автоматического перехода на следующую страницу.
* Идентификатор интерфейса [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) или видео, завершение которого активирует автоматический переход.

Пример:

```html
<amp-story-page id="tokyo" auto-advance-after="1s">
```

##### background-audio [необязательно]

URL аудиофайла, который воспроизводится, пока открыта страница.

Пример:

```html
<amp-story-page id="zurich" background-audio="./media/switzerland.mp3">
```

### Дочерние элементы amp-story-page

Компонент `<amp-story-page>` содержит один или несколько [слоев](#layers).  Они располагаются снизу вверх (первый слой, указанный в DOM, находится внизу, а последний – вверху).

## Слои

Слои накладываются друг на друга, чтобы создать нужный визуальный эффект.

### `amp-story-grid-layer`

Компонент `<amp-story-grid-layer>` располагает свои дочерние элементы по сетке.  Его реализация основана на [спецификации CSS Grid](https://www.w3.org/TR/css-grid-1/).

<div class="flex-images">
  <amp-img alt="Слой 1" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif" width="200" height="355" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif"></noscript>
  </amp-img>
  <span class="special-char">+</span>
  <amp-img alt="Слой 2" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg"></noscript>
  </amp-img>
    <span class="special-char">+</span>
  <amp-img alt="Слой 3" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg"></noscript>
  </amp-img>
    <span class="special-char">=</span>
  <amp-img alt="Все слои" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif"></noscript>
  </amp-img>
</div>

#### Атрибуты

##### template [обязательно]

Атрибут `template` определяет вид слоя с сеткой. Доступные варианты описаны в разделе [Шаблоны](#templates) ниже.

##### grid-area [необязательно]

Атрибут для дочерних элементов `<amp-story-grid-layer>`. Атрибут `grid-area` указывает на именованную область (из определяющего шаблона `template`), в которой должен показываться элемент.

Пример:

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Шаблоны

Ниже перечислены шаблоны, которые можно использовать для слоя с сеткой.

[tip type="ll callout('Совет</b><a class="type_success"]
Ознакомьтесь со [статьей на сайте AMP By Example](https://ampbyexample.com/stories/features/layouts/), где рассказывается, как использовать шаблоны.
[/tip]

##### fill

Шаблон `fill` показывает первый дочерний элемент в полноэкранном режиме без полей. Все остальные дочерние элементы не показываются.

Именованные области: нет.

Пример:

<amp-img alt="Пример шаблона заполнения" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Пример горизонтального шаблона" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="fill">
  <amp-img src="cat.jpg"></amp-img>
</amp-story-grid-layer>
```

##### vertical

Шаблон `vertical` располагает все элементы вдоль оси Y.  По умолчанию они выровнены по верхней границе и могут занимать весь экран вдоль оси X.

Именованные области: нет.

<amp-img alt="Пример вертикального шаблона" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Пример горизонтального шаблона" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="vertical">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### horizontal

Шаблон `horizontal` располагает все элементы вдоль оси X.  По умолчанию они выровнены по началу линии и могут занимать весь экран вдоль оси Y.

Именованные области: нет.

<amp-img alt="Пример горизонтального шаблона" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Пример горизонтального шаблона" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="horizontal">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### thirds

Шаблон `thirds` делит экран на три одинаковых столбца и позволяет размещать контент во всех этих областях.

Именованные области:

* `upper-third`
* `middle-third`
* `lower-third`

<amp-img alt="Пример горизонтального шаблона" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Пример шаблона с третями" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Дочерние элементы

В таблице ниже перечислены все возможные элементы `amp-story-grid-layer`.

**Примечание.** Этот список со временем будет расширяться.

<table>
  <tr>
    <th width="40%">Область
    </th><th>Допустимые теги </th>
  </tr>
  <tr>
    <td>Медиа</td>
    <td>
      <ul>
        <li><code>&lt;amp-audio></code></li>
        <li><code>&lt;amp-gfycat></code></li>
        <li><code>&lt;amp-google-vrview-image></code></li>
        <li><code>&lt;amp-img></code></li>
        <li><code>&lt;amp-video></code></li>
        <li><code>&lt;source></code></li>
        <li><code>&lt;track></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Аналитика и отслеживание</td>
    <td>
      <ul>
        <li><code>&lt;amp-analytics></code></li>
        <li><code>&lt;amp-experiment></code></li>
        <li><code>&lt;amp-pixel></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Создание разделов</td>
    <td>
      <ul>
        <li><code>&lt;address></code></li>
        <li><code>&lt;article></code></li>
        <li><code>&lt;aside></code></li>
        <li><code>&lt;footer></code></li>
        <li><code>&lt;h1>-&lt;h6></code></li>
        <li><code>&lt;header></code></li>
        <li><code>&lt;hgroup></code></li>
        <li><code>&lt;nav></code></li>
        <li><code>&lt;section></code></li>
        <li><code>&lt;amp-story-cta-layer></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Текст</td>
    <td>
      <ul>
        <li><code>&lt;abbr></code></li>
        <li><code>&lt;amp-fit-text></code></li>
        <li><code>&lt;amp-font></code></li>
        <li><code>&lt;amp-gist></code></li>
        <li><code>&lt;b></code></li>
        <li><code>&lt;bdi></code></li>
        <li><code>&lt;bdo></code></li>
        <li><code>&lt;blockquote></code></li>
        <li><code>&lt;br></code></li>
        <li><code>&lt;cite></code></li>
        <li><code>&lt;code></code></li>
        <li><code>&lt;data></code></li>
        <li><code>&lt;del></code></li>
        <li><code>&lt;dfn></code></li>
        <li><code>&lt;div></code></li>
        <li><code>&lt;em></code></li>
        <li><code>&lt;figcaption></code></li>
        <li><code>&lt;figure></code></li>
        <li><code>&lt;hr></code></li>
        <li><code>&lt;i></code></li>
        <li><code>&lt;ins></code></li>
        <li><code>&lt;kbd></code></li>
        <li><code>&lt;main></code></li>
        <li><code>&lt;mark></code></li>
        <li><code>&lt;p></code></li>
        <li><code>&lt;pre></code></li>
        <li><code>&lt;q></code></li>
        <li><code>&lt;rp></code></li>
        <li><code>&lt;rt></code></li>
        <li><code>&lt;rtc></code></li>
        <li><code>&lt;ruby></code></li>
        <li><code>&lt;s></code></li>
        <li><code>&lt;samp></code></li>
        <li><code>&lt;small></code></li>
        <li><code>&lt;span></code></li>
        <li><code>&lt;strong></code></li>
        <li><code>&lt;sub></code></li>
        <li><code>&lt;sup></code></li>
        <li><code>&lt;time></code></li>
        <li><code>&lt;u></code></li>
        <li><code>&lt;var></code></li>
        <li><code>&lt;wbr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Списки</td>
    <td>
      <ul>
        <li><code>&lt;amp-list></code></li>
        <li><code>&lt;amp-live-list></code></li>
        <li><code>&lt;dd></code></li>
        <li><code>&lt;dl></code></li>
        <li><code>&lt;dt></code></li>
        <li><code>&lt;li></code></li>
        <li><code>&lt;ol></code></li>
        <li><code>&lt;ul></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Таблицы</td>
    <td>
      <ul>
        <li><code>&lt;caption></code></li>
        <li><code>&lt;col></code></li>
        <li><code>&lt;colgroup></code></li>
        <li><code>&lt;table></code></li>
        <li><code>&lt;tbody></code></li>
        <li><code>&lt;td></code></li>
        <li><code>&lt;tfoot></code></li>
        <li><code>&lt;th></code></li>
        <li><code>&lt;thead></code></li>
        <li><code>&lt;tr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Другое</td>
    <td>
      <ul>
        <li><code>&lt;amp-install-serviceworker></code></li>
        <li><code>&lt;noscript></code></li>
      </ul>
    </td>
  </tr>
</table>

### `amp-story-cta-layer`

Компонент `<amp-story-cta-layer>` поддерживает использование элементов `<a>` и `<button>` внутри `<amp-story-page>`.

#### Ограничения

* Если `<amp-story-cta-layer>` указан, он должен быть последним слоем в рамках `<amp-story-page>`. Таким образом, каждая страница `<amp-story-page>` может содержать или один элемент `<amp-story-cta-layer>`, или ни одного.
* Расположение и размер этого слоя нельзя контролировать. Он всегда занимает 100 % ширины страницы и 20 % ее высоты, а также выровнен по нижней части.

#### Пример

```html
<amp-story-page id="vertical-template-thirds">
  <amp-story-grid-layer template="thirds">
    <div class="content" grid-area="upper-third">Paragraph 1</div>
    <div class="content" grid-area="middle-third">Paragraph 2</div>
    <div class="content" grid-area="lower-third">Paragraph 3</div>
  </amp-story-grid-layer>
  <amp-story-cta-layer>
    <a href="https://www.ampproject.org" class="button">Outlink here!</a>
  </amp-story-cta-layer>
</amp-story-page>
```

<amp-img alt="Слой с призывом к действию" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png" width="404" height="678" layout="fixed">
  <noscript>
    <img width="404" height="678" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png">
  </noscript>
</amp-img>

  [Полный пример доступен в каталоге](https://github.com/ampproject/amphtml/blob/master/examples/amp-story/cta-layer-outlink.html)

#### Дочерние элементы

Слой `amp-story-cta-layer` поддерживает в основном те же дочерние элементы, что и `amp-story-grid-layer`, а также теги `<a>` и `<button>`.

Обновленный список дочерних элементов можно найти в поле [amp-story-cta-layer-allowed-descendants](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) в правилах валидации. Рекомендуем с ним ознакомиться.

## Вложения на страницах

### `amp-story-page-attachment`

<amp-img alt="Вложение на странице с AMP-историей" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif" width="240" height="480" layout="fixed">
  <noscript>
    <img alt="Вложение на странице с AMP-историей" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif">
  </noscript>
</amp-img>

Вы можете добавлять на страницы с историями дополнительный контент!

Таким образом можно разместить на некоторых страницах дополнительный контент AMPHTML. Чтобы увидеть его, пользователю нужно будет провести пальцем по экрану снизу вверх или нажать на призыв к действию.
Предложение открыть этот контент будет автоматически добавлено в нижнюю часть страницы с ним.

Элемент `<amp-story-page-attachment>` должен быть последним в рамках `<amp-story-page>`. Также для него необходимо задать атрибут `layout="nodisplay"`. С помощью тега `<amp-story-page-attachment>` можно встроить контент AMPHTML непосредственно в AMP-историю.

### Допустимый контент и компоненты

Вложения на страницах поддерживают те же HTML-элементы, что и AMP-истории, а также перечисленные ниже дополнительные компоненты (например, сторонние видеопроигрыватели или встраивание из социальных сетей). Таким образом можно добавить дополнительный контент, который слишком объемен для страниц с AMP-историей или не поддерживается непосредственно ими.

<details>
  <summary>Список компонентов AMP, которые можно использовать в приложении к странице:</summary>

  * `<amp-3d-gltf>`
  * `<amp-3q-player>`
  * `<amp-accordion>`
  * `<amp-audio>`
  * `<amp-beopinion>`
  * `<amp-bodymovin-animation>`
  * `<amp-brid-player>`
  * `<amp-brightcove>`
  * `<amp-byside-content>`
  * `<amp-call-tracking>`
  * `<amp-carousel>`
  * `<amp-dailymotion>`
  * `<amp-date-countdown>`
  * `<amp-embedly-card>`
  * `<amp-facebook>`
  * `<amp-facebook-comments>`
  * `<amp-facebook-like>`
  * `<amp-facebook-page>`
  * `<amp-fit-text>`
  * `<amp-fx-collection>`
  * `<amp-fx-flying-carpet>`
  * `<amp-gfycat>`
  * `<amp-gfycat>`
  * `<amp-gist>`
  * `<amp-gist>`
  * `<amp-google-document-embed>`
  * `<amp-google-vrview-image>`
  * `<amp-google-vrview-image>`
  * `<amp-hulu>`
  * `<amp-ima-video>`
  * `<amp-image-slider>`
  * `<amp-img>`
  * `<amp-imgur>`
  * `<amp-instagram>`
  * `<amp-izlesene>`
  * `<amp-jwplayer>`
  * `<amp-kaltura-player>`
  * `<amp-list>`
  * `<amp-list>`
  * `<amp-live-list>`
  * `<amp-live-list>`
  * `<amp-mathml>`
  * `<amp-mowplayer>`
  * `<amp-nexxtv-player>`
  * `<amp-o2-player>`
  * `<amp-ooyala-player>`
  * `<amp-pan-zoom>`
  * `<amp-pinterest>`
  * `<amp-playbuzz>`
  * `<amp-powr-player>`
  * `<amp-reach-player>`
  * `<amp-reddit>`
  * `<amp-riddle-quiz>`
  * `<amp-soundcloud>`
  * `<amp-springboard-player>`
  * `<amp-timeago>`
  * `<amp-twitter>`
  * `<amp-video>`
  * `<amp-video-iframe>`
  * `<amp-vimeo>`
  * `<amp-vine>`
  * `<amp-viqeo-player>`
  * `<amp-vk>`
  * `<amp-wistia-player>`
  * `<amp-yotpo>`
  * `<amp-youtube>`

</details>

### Пример

```html
<amp-story-page id="foo">
  <amp-story-grid-layer template="fill">
    <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600">
    </amp-story-grid-layer>
    <amp-story-page-attachment layout="nodisplay">
      <h1>My title</h1>
      <p>Lots of interesting text with <a href="https://example.ampproject.org">links</a>!</p>
      <p>More text and a YouTube video!</p>
      <amp-youtube
          data-videoid="b4Vhdr8jtx0"
          layout="responsive"
          width="480" height="270">
      </amp-youtube>
      <p>And a tweet!</p>
      <amp-twitter
          data-tweetid="885634330868850689"
          layout="responsive"
          width="480" height="270">
      </amp-twitter>
  </amp-story-page-attachment>
</amp-story-page>
```

## Анимация

Для каждого элемента в рамках `<amp-story-page>` можно добавить анимацию входа.

Чтобы настроить ее, воспользуйтесь [атрибутами анимации](#animation-attributes) для элемента. Дополнительные конфигурации и расширения AMP не требуются.

### Анимационные эффекты

Ниже приведен список анимационных эффектов, доступных для AMP-историй.

| Название       | Продолжительность по умолчанию (мс) | Задержка по умолчанию (мс) |
|-----------------|---------------------| ------------------ |
| `drop`            | 1600                  | 0 |
| `fade-in`         | 500                   | 0 |
| `fly-in-bottom`   | 500                   | 0 |
| `fly-in-left`     | 500                   | 0 |
| `fly-in-right`    | 500                   | 0 |
| `fly-in-top`      | 500                   | 0 |
| `pulse`           | 500                   | 0 |
| `rotate-in-left`  | 700                   | 0 |
| `rotate-in-right` | 700                   | 0 |
| `twirl-in`        | 1000                  | 0 |
| `whoosh-in-left`  | 500                   | 0 |
| `whoosh-in-right` | 500                   | 0 |
| `pan-left`        | 1000                  | 0 |
| `pan-right`       | 1000                  | 0 |
| `pan-down`        | 1000                  | 0 |
| `pan-up`          | 1000                  | 0 |
| `zoom-in`         | 1000                  | 0 |
| `zoom-out`        | 1000                  | 0 |

[tip type="ll callout('Совет</b><a class="type_success"]
Ознакомьтесь с [демонстрационной статьей](https://ampbyexample.com/stories/features/animations/) об анимации на сайте AMP By Example.
[/tip]

### Атрибуты анимации

##### animate-in [обязательно]

С помощью этого атрибута можно задать название [набора настроек](#animation-effects) для входной анимации.

*Пример.* Заголовок вылетает с левого края страницы.

```html

<h2 animate-in="fly-in-left">
  Вылет слева!
</h2>

```

##### animate-in-duration [необязательно]

С помощью этого атрибута можно задать продолжительность входной анимации в секундах или миллисекундах (например, 0,2 с или 200 мс). Продолжительность анимации по умолчанию зависит от заданного набора настроек.

*Пример.* Заголовок вылетает с левого края страницы. Анимация завершается за полсекунды.

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s">
  Вылет слева!
</h2>

```

##### animate-in-delay [необязательно]

Используйте этот атрибут, чтобы задать задержку перед запуском анимации. Значение должно быть больше или равно 0, время задается в секундах или миллисекундах (например, 0,2 с. или 200 мс). Продолжительность задержки по умолчанию зависит от заданного набора настроек.

*Пример.* Через 0,4 с. заголовок вылетает с левого края страницы. Процесс завершается в течение 0,5 с.

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s" animate-in-delay="0.4s">
  Вылет слева!
</h2>

```

[tip type="ll callout('Примечание.</b><a class="type_note"]
Точность задержки анимации не гарантируется. Время задержки может увеличиться из-за загрузки расширения `amp-animation` в фоновом режиме при сканировании первого анимированного элемента. Контракт атрибута определяется как *задержать эту анимацию как минимум на N миллисекунд*. Это правило относится ко всем элементам, даже если для них задана задержка в 0 секунд.
[/tip]

##### animate-in-after [необязательно]

С помощью этого атрибута можно задать цепочку или последовательность анимаций (допустим, чтобы анимация №2 показывалась только после анимации №1). Укажите идентификатор анимированного элемента с той же страницы `<amp-story-page>`, после которого нужно запустить текущий элемент. Задержка применяется после завершения анимации предыдущего элемента. Более подробную информацию можно найти в разделе [Последовательность анимации](#sequencing-animations) ниже.

В примере ниже `object2` анимируется только после завершения показа элемента `object1`.

```html
<amp-story-page id="page1">
  <amp-story-grid-layer template="vertical">
    <div id="object1"
        animate-in="rotate-in-left">
      1
    </div>
    <div id="object2"
        animate-in="fly-in-right"
        animate-in-after="object1">
      2. <!-- will start after object1 has finished -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

##### scale-start, scale-end [необязательно, работает только для анимаций `zoom-in` и `zoom-out`]

С помощью этих двух атрибутов можно указать дополнительные параметры анимации для увеличения и уменьшения масштаба. Значение должно быть больше или равно 0, допускаются десятичные дроби. По умолчанию для увеличения используются значения "scale-start: 1" and "scale-start: 3", а для уменьшения – наоборот.

*Пример.* Увеличение масштаба с 2х до 5х за 4 секунды.

```html
<amp-img animate-in="zoom-in" scale-start="2" scale-end="5" animate-in-duration="4s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-x [необязательно, работает только для анимаций `pan-left` и `pan-right`]

Используйте этот атрибут, чтобы задать горизонтальное панорамирование для изображения в анимации со сдвигом влево или вправо. Значение должно быть в пикселях, больше или равно 0. Значение по умолчанию будет панорамировать всю ширину указанного изображения.

*Пример.* Изображение сдвигается на 200 пикселей влево за 10 секунд.

```html
<amp-img animate-in="pan-left" translate-x="200px" animate-in-duration="10s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-y [необязательно, работает только для анимаций `pan-up` и `pan-down`]

Используйте этот атрибут, чтобы задать вертикальное панорамирование для изображения в анимации со сдвигом вверх или вниз. Значение должно быть в пикселях, больше или равно 0. Значение по умолчанию будет панорамировать всю высоту указанного изображения.

*Пример.* Изображение сдвигается на 50 пикселей вниз за 15 секунд.

```html
<amp-img animate-in="pan-down" translate-y="50px" animate-in-duration="15s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

### Последовательность анимации

Задать последовательность анимации можно с помощью атрибута `animate-in-after`. Все элементы в цепочке должны располагаться на одной и той же странице `<amp-story-page>`. Элементы без атрибута `animate-in-after` не относятся к последовательности и будут запускаться независимо при входе на страницу.

```html
<amp-story-page id="my-sequencing-page">
  <amp-story-grid-layer template="vertical">
    <div class="circle"
        animate-in="drop-in"
        animate-in-duration="1.8s">
        1. <!-- will start independently -->
    </div>
    <div id="rotate-in-left-obj"
        class="square"
        animate-in="rotate-in-left"
        animate-in-after="fade-in-obj"
        animate-in-delay="0.2s">
        2. <!-- will start after fade-in-obj has finished -->
    </div>
    <div class="square"
        animate-in-after="rotate-in-left-obj"
        animate-in="whoosh-in-right"
        animate-in-delay="0.2s">
        3. <!-- will start after rotate-in-left-obj has finished -->
    </div>
    <div id="fade-in-obj"
        class="circle"
        animate-in="fade-in"
        animate-in-duration="2.2s">
        1. <!-- will start independently -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

### Объединение нескольких анимаций

Вы можете задать несколько анимаций для одного и того же элемента (например, чтобы он вылетал и постепенно исчезал). Задать несколько наборов настроек для одного и того же элемента нельзя, но вы можете добавить вложенные элементы с разными анимациями, чтобы объединить их.

```html

<div animate-in="fly-in-left">
  <div animate-in="fade-in">
    Текст вылетает и постепенно исчезает!
  </div>
</div>

```

[tip type="ll callout('Примечание.</b><a class="type_note"]
Если объединенная анимация должна начинаться после завершения анимации отдельного элемента, убедитесь, что во всех вложенных элементах есть атрибут `animate-in-after` с тем же `id`.
[/tip]

## Последний экран: `amp-story-bookend`

Элемент `amp-story-bookend` – это последний экран в истории. Там публикуются ссылки на статьи по теме, призывы к действию, виджеты для публикации в социальных сетях и т. п.

<figure class="centered-fig">
  <amp-anim alt="пример связанной статьи" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif" layout="fixed">
    <noscript>
      <img alt="пример связанной статьи" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif">
      </noscript>
    </amp-anim>
  </figure>

  Чтобы воспользоваться этими возможностями, добавьте тег `<amp-story-bookend>` в качестве последнего дочернего тега для `<amp-story>` и обязательно добавьте атрибут `layout=nodisplay`.
  Затем можно будет задать конфигурацию JSON в отдельном файле и импортировать ее с помощью атрибута `src` или же добавить прямо в код.

  Импорт конфигурации JSON с помощью атрибута `src`:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `layout=nodisplay` is required. -->
  <amp-story-bookend src="bookendv1.json" layout=nodisplay>
  </amp-story-bookend>
</amp-story>
```

Если вы не хотите получать конфигурацию с сервера, ее можно добавить прямо в код:

```html
<amp-story standalone>
  ...
  <amp-story-bookend layout=nodisplay>
    <script type="application/json">
      {
        bookendVersion: "v1.0",
        shareProviders: [ ... ],
        components: [ ... ]
      }
    </script>
  </amp-story-bookend>
</amp-story>
```

Затем необходимо заполнить конфигурацию JSON, то есть задать настройки для последнего экрана. Общая структура выглядит так:

```text
{
  bookendVersion: "v1.0",
  shareProviders: [
    ...
  ],
  components: [
    ...
  ]
}
```

        В первой строке необходимо указать, что вы используете версию v1.0.

#### Компоненты последнего экрана

В этой части AMP-истории используется множество компонентов. Это могут быть ссылки на статьи по теме, призывы к действию, текстовый контент и многое другое.

Компоненты задаются в поле `components` конфигурации JSON. Ознакомьтесь с [примером ответа JSON](#example-json-response) ниже.

##### heading

В компоненте <code>heading</code> есть поле ```text</code>, где можно указать заголовок для группы статей.

```json
{
  type: "heading",
  text: "More to Read"
  }
```

<amp-img alt="Компонент heading для последней страницы" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-heading.png" width="386" height="123" layout="fixed">
  <noscript>
    <img alt="Компонент heading для последней страницы" src="img/amp-story-bookend-component-heading.png">
  </noscript>
</amp-img>

##### small

С помощью компонента `small` можно добавить ссылки на статьи по теме. В нем должны быть поля `title` и `url`, а также по желанию можно добавить `image`.

```json
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/article.html",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Компонент small для последней страницы" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-small.png" width="379" height="192" layout="fixed">
  <noscript>
    <img alt="Компонент small для последней страницы" src="img/amp-story-bookend-component-small.png">
  </noscript>
</amp-img>

##### landscape

Компонент `landscape` можно использовать для альтернативных форматов контента, например для видео. В нем должны быть поля `title`, `url` и `image`. При желании также можно добавить поле `category` для подзаголовка.

```json
{
  type: "landscape",
  title: "TRAPPIST-1 Planets May Still Be Wet Enough for Life",
  url: "http://example.com/article.html",
  category: "astronomy",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Компонент landscape для последней страницы" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-landscape.png" width="388" height="410" layout="fixed">
  <noscript>
    <img alt="Компонент landscape для последней страницы" src="img/amp-story-bookend-component-landscape.png">
  </noscript>
</amp-img>

##### portrait

С помощью компонента `portrait` можно добавить ссылки на другие истории. В нем должны быть поля `title`, `url` и `image`. При желании также можно добавить поле `category` для подзаголовка.

```json
{
  type: "portrait",
  category: "Science",
  title: "New discovery found",
  url: "http://example.com/article.html",
  image: "http://placehold.it/312x416"
}
```

<amp-img alt="Компонент portrait для последней страницы" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-portrait.png" width="382" height="522" layout="fixed">
  <noscript>
    <img alt="Компонент portrait для последней страницы" src="img/amp-story-bookend-component-portrait.png">
  </noscript>
</amp-img>

##### cta-link

С помощью компонента <code>cta-link</code> можно добавить ссылки с призывом к действию, например <code>Читайте подробнее</code> или <code>Подписывайтесь</code>. В нем есть ключ <code>links</code>, который позволяет указать массив ссылок. Каждая ссылка – это объект со значениями ```text</code> и <code>url</code>.

```json
{
  type: "cta-link",
  links: [
    {
      text: "Sign Up",
      url: "example.com/signup"
      },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
}
```

<amp-img alt="Компонент cta-links для последней страницы" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-cta-links.png" width="381" height="81" layout="fixed">
  <noscript>
    <img alt="Компонент cta-links для последней страницы" src="img/amp-story-bookend-component-cta-links.png">
  </noscript>
</amp-img>

##### textbox

Компонент ```textbox</code> позволяет вам указать текст для последней страницы (например, список авторов фото). Для него требуется массив <code>text</code>, в котором каждый элемент представляет собой строку текста.

```json
{
  type: "textbox",
  text: [
    Food by Enrique McPizza,
    Choreography by Gabriel Filly,
    Script by Alan Ecma S.,
    Direction by Jon Tarantino
  ]
}
```

<amp-img alt="Компонент textbox для последней страницы" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-textbox.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="Компонент textbox для последней страницы" src="img/amp-story-bookend-component-textbox.png">
    </noscript>
  </amp-img>

  **Ссылки на другие AMP-страницы**

  Для документов, которые отображаются в средстве просмотра AMP, обычно задается значение `_top` или же настраивается открытие в новом окне. Однако ссылки на AMP-страницы могут открываться в том же средстве просмотра. Чтобы включить эту функцию, добавьте `"amphtml": true` в компонент, который поддерживает ссылки. Пример:

```json
...
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/my-amp-document.html",
  image: "http://placehold.it/256x128",
  amphtml: true
  },
  {
  type: "cta-link",
  links: [
    {
      text: "Sign Up",
      url: "example.com/signup",
      amphtml: true
      },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
},
...
```

#### Публикация в социальных сетях

Конфигурация для публикации контента в социальных сетях определяется в поле `shareProviders` объекта ответа. Делать это не обязательно.

Значение в поле представляет собой строку. Каждая строка – название поставщика (например, `twitter`).

Если необходимы дополнительные параметры, используйте объект с парами "ключ-значение". В нем должен быть ключ `provider` со значением, соответствующим названию поставщика (например, `facebook`). Дальнейшие ключи и значения зависят от поставщика.

Поддерживаются те же поставщики, что и для компонента [amp-social-share](https://www.ampproject.org/docs/reference/components/amp-social-share).

У каждого из поставщиков свой список поддерживаемых параметров ([см. `data-param-*`](https://www.ampproject.org/docs/reference/components/amp-social-share#data-param-%2a)). Объект конфигурации принимает эти параметры без префикса `data-param-`. Например, `data-param-app_id` отображается в нем как `app_id`.

#### Конфигурация JSON

У элемента `<amp-story-bookend>` должен быть атрибут `src`, который указывает на соответствующую конфигурацию JSON. Это конечная точка URL, которая принимает запросы GET и возвращает ответ JSON с контентом последней страницы.  Если такой атрибут отсутствует, компонент amp-story обрабатывает интерфейс по умолчанию для конечного экрана. Система отвечает за выборку данных, необходимых для отображения статей по теме и списков популярного контента.  Данные могут быть предоставлены в статическом файле JSON или же генерироваться динамически (чтобы определить, какие материалы популярны на данный момент).

#### Пример запроса JSON

```text
{
  // You must specify version v1.0.
  bookendVersion: "v1.0",
  shareProviders: [
    email,
    tumblr,
    {
      provider: "twitter",
      // You can add custom sharing parameters depending on the social platform.
      text: "This is custom share text that I would like for the Twitter platform"
    },
    {
      provider: "facebook",
      // Facebook requires an</code>app_id` param
      app_id: "MY_FACEBOOK_APP_ID"
    }
  ],
  components: [
    {
      type: "heading",
      text: "More to read"
    },
    {
      type: "small",
      title: "This is India an the best places you should go",
      url: "<a href="
      http: //example.com/article.html">http://example.com/article.html</a>",
        image: "<a href="
      http: //placehold.it/256x128">http://placehold.it/256x128</a>"
    },
    ...
  ]
}
```

## Другие полезные компоненты для AMP-историй

Вот ещё пара полезных компонентов для AMP-историй:

* [amp-sidebar](https://www.ampproject.org/docs/reference/components/amp-sidebar#sidebar-for-stories)
* [amp-consent](https://www.ampproject.org/docs/reference/components/amp-consent#prompt-ui-for-stories)

Более широко используемые компоненты перечислены в [списке допустимых дочерних элементов](https://www.ampproject.org/docs/reference/components/amp-story#children).

## Валидация

Ознакомьтесь с [правилами для amp-story](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) в спецификации валидатора AMP.

## Локализация

Чтобы локализовать свою историю, укажите языковой код в атрибуте `lang` внутри тега `<html>`. Пример для английского языка: `<html lang="en">`.  Поддерживаемые языковые коды:

* ar (арабский)
* de (немецкий)
* en-GB (английский, Великобритания)
* en (английский, США)
* es-419 (испанский, Центральная и Латинская Америка)
* es (испанский, Испания)
* fr-CA (французский, Канада)
* fr (французский, франция)
* hi (хинди)
* id (индонезийский)
* it (итальянский)
* ja (японский)
* ko (корейский)
* nl (нидерландский)
* no (норвежский)
* pt-BR (португальский, Бразилия)
* pt (португальский, Португалия)
* ru (русский)
* tr (турецкий)
* vi (вьетнамский)
* zh-TW (традиционный китайский)
* zh (упрощенный китайский)

Кроме того, для языков с письмом справа налево можно добавить в тег `<html>` атрибут `dir="rtl"`.  Этот атрибут можно сочетать и с языковым кодом, например `<html lang="ar" dir="rtl">`.

## Ресурсы по теме

* [Руководство по созданию визуальных AMP-историй](https://www.ampproject.org/docs/tutorials/visual_story)
* [Примеры на сайте AMP By Example](https://ampbyexample.com/stories/#stories/introduction)
* [Рекомендации по созданию AMP-истории](https://www.ampproject.org/docs/guides/amp_story_best_practices)

</amp-story></body>
