---
'$title': Дополнительные технические сведения о веб-историях
$order: 1
description: Дополнительные технические сведения о веб-историях
'$category': Develop
formats:
  - stories
author: CrystalOnScript
---

В этом руководстве дается описание всех технических подробностей и проверенных методик, которые потребуются вам для успешного создания веб-историй на AMP.

## Соответствие требованиям AMP

С технической точки зрения веб-история представляет собой одну веб-страницу, которая создана на AMP и соответствует спецификациям AMP:

- Начинается с ключевого слова `<!doctype html>`.
- Содержит тег верхнего уровня `<html ⚡>` или `<html amp>`.
- Содержит теги `<head>` и `<body>`.
- Содержит тег `<meta charset="utf-8">` в качестве первого дочернего элемента `<head>`.
- Содержит `<script async src="https://ampjs.org/v0.js"></script>` внутри элемента `<head>`. Размещать этот скрипт рекомендуется как можно ближе к началу `<head>`.
- Содержит `<link rel="canonical" href="page/url">` внутри элемента `<head>`; значение href является URL-адресом веб-истории.
- Содержит `<meta name="viewport" content="width=device-width">` внутри тега `<head>`. Также рекомендуется включить атрибут initial-scale=1.
- Содержит [шаблонный код AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) внутри тега `<head>`.

Разница между веб-страницей AMP и веб-историей, созданной с помощью AMP, заключается в наличии компонента [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories). Это единственный непосредственный дочерний элемент тега `<body>`, и он должен содержать атрибут `standalone`. Определение всех страниц, слоев и элементов веб-историй размещается внутри тегов `<amp-story>`.

```html
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://ampjs.org/v0.js"></script>
    <script
      async
      custom-element="amp-video"
      src="https://ampjs.org/v0/amp-video-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-story"
      src="https://ampjs.org/v0/amp-story-1.0.js"
    ></script>
    <style amp-custom>
      ...;
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story
      standalone
      title="Joy of Pets"
      publisher="AMP tutorials"
      publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
      poster-portrait-src="assets/cover.jpg"
    >
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
        <amp-story-grid-layer template="vertical">
          <h1>The Joy of Pets</h1>
          <p>By AMP Tutorials</p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 1 -->
      <amp-story-page id="page1">
        <amp-story-grid-layer template="vertical">
          <h1>Cats</h1>
          <amp-img
            src="assets/cat.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
          <q
            >Dogs come when they're called. Cats take a message and get back to
            you. --Mary Bly</q
          >
        </amp-story-grid-layer>
      </amp-story-page>
      ...
    </amp-story>
  </body>
</html>
```

Чтобы узнать больше, следуйте инструкциям по [созданию первой веб-истории](../start/visual_story/?format=stories) и [ознакомьтесь со справочной документацией по amp-story](../../components/reference/amp-story/?format=stories).

## Максимальная производительность и удобство использования

Веб-истории могут иногда просматриваться в зонах с низким уровнем сетевого подключения или с помощью устаревших устройств. Следуйте этим рекомендациям, чтобы обеспечить гладкую работу историй в таких условиях.

### Цвет фона

Укажите цвет фона для каждой страницы веб-истории. Наличие окрашенного фона — хороший запасной вариант на тот случай, если условия не позволяют пользователю загружать изображения или видеоконтент. Выберите цвет, который близок к основному фоновому цвету контента страницы, или используйте согласованную цветовую схему для всех страниц истории. Для удобства чтения убедитесь, что цвет фона отличается от цвета текста.

Цвет фона для страниц веб-историй задается либо внутри тегов `<style amp-custom>` в элементе head, либо во встраиваемом виде размещается в компоненте [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories).

### Распределение элементов по слоям

Системная панель содержит элементы управления, такие как иконки действий «Отключить звук» и «Поделиться». Она отображается с более высоким z-индексом, чем фоновое изображение и видео. Убедитесь, что эти значки не закрывают какой-либо важной информации.

### Соотношение сторон

Ассеты веб-историй следует проектировать с соотношением сторон 9:16. Поскольку высота и ширина страницы различаются в зависимости от браузера, не размещайте основное содержимое близко к краям страницы.

### Обложки

Изображение обложки показывается пользователю во время загрузки видео. Обложка должна соответствовать содержанию видео, чтобы обеспечить органичный переход к нему. Чтобы указать изображение обложки, добавьте в элемент amp-video атрибут `poster` и укажите в нем местоположение изображения.

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## Видео

Все видео необходимо добавлять с помощью компонента [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories).

```
<amp-video controls
  width="640"
  height="360"
  layout="responsive"
  poster="/static/inline-examples/images/kitten-playing.png">
  <source src="/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

### Разрешение и качество

При кодировании видео используйте следующие рекомендуемые оптимизации:

<table>
  <tr>
   <td>MP4</td>
   <td>-crf 23</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>-b:v 1M</td>
  </tr>
</table>

Старайтесь делать так, чтобы длительность каждого сегмента HLS составляла не более 10 секунд.

### Формат и размер

Для оптимальной производительности используйте видео размером менее 4 МБ. Большие видео лучше разделять на несколько страниц.

Если вы можете предоставить только один видеоформат, используйте MP4. По возможности используйте видео HLS и укажите MP4 в качестве альтернативы для несовместимых браузеров. Используйте следующий видеокодек:

<table>
  <tr>
   <td>MP4, HLS и DASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### Используйте &lt;source&gt; вместо src

Чтобы указать источник видео в компоненте `<amp-video>`, используйте дочерние элементы `<source>` вместо `src` — элемент `<source>` позволяет указать тип видео и добавить резервные источники видео. Необходимо также использовать атрибут `type`, чтобы указать MIME-тип. Используйте `application/x-mpegurl` или `application/vnd.apple.mpegurl` для видео HLS. Для других типов видео используйте MIME-префикс `video/`, за которым должен следовать формат видео, например `”video/mp4”`.

```html
<amp-video
  id="video-page1"
  autoplay
  loop
  layout="fill"
  poster="https://example.com/media/poster.jpg"
>
  <source
    src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl"
  />
  <source src="https://amp-example.com/media/movie.mp4" type="video/mp4" />
</amp-video>
```

### Автоматический переход по завершении видео

Доступный в компоненте amp-story-page атрибут [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D) указывает, должна ли страница истории переходить на следующий этап без нажатия со стороны пользователя. Чтобы переходить после завершения видео, укажите в атрибуте идентификатор видео.

```html
<amp-story-page auto-advance-after="myvideo"></amp-story-page>
```

## Версия для компьютеров

В формате веб-истории предусмотрена опциональная поддержка [горизонтального режима просмотра](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in). Она меняет стандартный режим «три портретных панели» на иммерсивный режим, в котором изображение растянуто на весь экран, что позволяет мобильным пользователям просматривать историю, повернув телефон горизонтально.

Чтобы включить поддержку горизонтального режима просмотра, добавьте в компонент `<amp-story>` атрибут `supports-landscape`.

```html
<amp-story
  standalone
  supports-landscape
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
</amp-story>
```
