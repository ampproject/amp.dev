---
"$title": Советы по созданию рекламы в Web-истории
"$order": '16'
description: Web-истории — полноэкранные, пролистываемые касанием истории, обеспечивающие эффект глубокого погружения в контент. Реклама, размещаемая в Web-историях, должна обладать цельным дизайном, согласованным с UX Web-историй.
formats:
- ads
- stories
---

Web-истории — полноэкранные, пролистываемые касанием истории, обеспечивающие эффект глубокого погружения в контент. Реклама, размещаемая в Web-историях, должна обладать цельным дизайном, согласованным с UX Web-историй, для того чтобы избежать ощущения «прерывистости» просмотра истории. В данном руководстве рассказывается, как создать рекламу для Web-историй.

## Принципы рекламы в Web-историях

Современные форматы рекламы, такие как баннеры и боксы, плохо интегрируются с форматом AMP-историй. Классическая реклама медленно загружается, отвлекает и не способна органично вписаться в процесс просмотра истории.

Реклама в Web-историях соответствует следующим принципам:

- Корректно сформированная реклама на AMPHTML: следует тем же техническим спецификациям, что и классическая [реклама на AMPHTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md).
- Visual first: Inviting, bold, context-driven invitation state.
- Native: The ad page has the same dimensions as an organic story page.
- Same interaction model: User can continue to the next screen just like they would with an organic story page.
- Fast: The ad never appears to a user in a half-loaded state.

Для обеспечения согласованности с этими принципами среда выполнения Web-историй определяет подходящее размещение рекламной страницы в пределах Web-истории. Подробнее о принципах размещения рекламы читайте в статье [Размещение рекламы в Web-историях](advertise_amp_stories.md).

## Образец рекламы в Web-истории

Реклама в Web-историях представляет собой AMPHTML-рекламу, которая, однако, соответствует установленным спецификациям макета и содержит требуемые UI-элементы и теги meta. Реклама для Web-историй всегда содержит кнопку призыва к действию (CTA), а также отметку «Реклама», представленную в виде текстового уведомления вверху страницы.

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='Example of an AMP Story ad', caption='Example of an AMP Story ad', align='' ) }}

Для согласованности впечатлений пользователя рендеринг отметки «Реклама» и кнопки CTA осуществляется самой средой выполнения Web-историй.

[tip type="important"] **ВАЖНО!** В рекламе для Web-историй кликабельной является только кнопка CTA; учитывайте это при разработке креатива. [/tip]

## Данные в тегах meta

Meta tag data specifies that the ad meets the Web Story format, sets the CTA button text enum, directs where the button will send the user and what type of page it is.

[sourcecode:html]

<html amp4ads>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

    <!-- Specifies where the user is directed -->
    <meta name="amp-cta-url" content="%%CLICK_URL_UNESC%%%%DEST_URL%%">

    <!-- Specifies the call to action button text enum -->
    <meta name="amp-cta-type" content="EXPLORE">

    <!-- Specifies what type of landing page the user is direct to -->
    <meta name="amp-cta-landing-page-type" content="NONAMP">

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>
     amp-img {height: 100vh}
    </style>
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>

  </head>
  <body>
    <amp-img src=%%FILE:JPG1%% layout="responsive" height="1280" width="720"></amp-img>
  </body>
</html>
[/sourcecode]

При выборе [доступных вариантов кнопки CTA](#call-to-action-button-text-enum) рекомендуем использовать тег `amp-cta-type`. В нужный момент AMP автоматически выполняет локализацию предопределенных вариантов.

Custom text is allowed, but you will need to implement your own localization.

## Перечисляемый тип (enum) с текстами для кнопки призыва к действию <a name="call-to-action-button-text-enum"></a>

The call to action button can be configured from a predefined set of choices:

- `APPLY_NOW`: «Подать заявку»
- `BOOK_NOW`: «Забронировать»
- `BUY_TICKETS`: «Купить билеты»
- `DOWNLOAD`: «Скачать»
- `EXPLORE`: «Интересное»
- `GET_NOW`: «Получить»
- `INSTALL`: «Установить»
- `LISTEN`: «Слушать»
- `MORE`: «Еще»
- `OPEN_APP`: "Открыть приложение"
- `ORDER_NOW`: «Заказать»
- `PLAY`: «Играть»
- `READ`: «Читать»
- `SHOP`: «В магазин»
- `SHOWTIMES`: «Расписание сеансов»
- `SIGN_UP`: «Зарегистрироваться»
- `SUBSCRIBE`: «Подписаться»
- `USE_APP`: «Использовать приложение»
- `VIEW`: «Посмотреть»
- `WATCH`: «Смотреть»
- `WATCH_EPISODE`: «Смотреть выпуск»

[tip type="note"] **ПРИМЕЧАНИЕ. ** Диплинки, ведущие в приложения, не поддерживаются, однако ссылки на страницы App Store и Google Play поддерживаются по протоколам http и https. Тип enum с текстами для кнопки CTA включается в полезную нагрузку ответа на запрос рекламы. [/tip]

Если вам требуется помощь c применением самостоятельно созданного перечисления текстовых значений для кнопки CTA, создайте [задачу на GitHub](https://github.com/ampproject/amphtml/issues/new).

## Целевая страница рекламы

При указании целевой страницы рекламы в AMP-историях вы можете использовать один из трех вариантов.

- `STORY`: целевая страница является [рекламной историей](story_ads_best_practices.md#sponsored-story).
- `AMP`: целевая страница является корректно сформированной AMP-страницей.
- `NONAMP`: целевая страница является веб-страницей любого другого типа.

## Компоновка

AMP-истории являются горизонтальными и отображаются во весь экран. Чтобы пользователь получал согласованные впечатления от истории, реклама в историях должна соответствовать этому формату.

## Размеры оверлея

Отметка «реклама» отображается на фоне темной градиентной панели во всю ширину рекламы с высотой 46px от верхней кромки экрана.

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='Demonstration of ad overlay', caption='The ad overlay sits at the top', align='' ) }}

The CTA sits 32px from the bottom and is centered horizontally. It is 120px by 36px.

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='Demonstration of the CTA Button', caption='The CTA Button sits near the bottom', align='' ) }}

## Изображения и видео

Изображения и видео, включенные в рекламу в AMP-историях, должны быть в полноэкранном формате с соотношением сторон 4:3. В рекламе, содержащей видео, должна использоваться [обложка](../../../documentation/components/reference/amp-video.md#poster). Рекомендуемые размеры обложки — 720p (720 в ширину x 1280 в высоту) .

[sourcecode:html]
<amp-video controls
  width="720"
  height="1280"
  layout="responsive"
  poster="images/kitten-playing.png">

  <source src="videos/kitten-playing.webm"
    type="video/webm" />
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
[/sourcecode]

### Images

Фоновые изображения можно масштабировать на весь экран. Приведенный ниже код CSS позволяет обрезать и центрировать видео и изображения.

[sourcecode:html]

<style amp-custom>
    amp-img, amp-video {
        height: 100vh;
    }
    amp-video video {
        object-fit: cover;
    }
    amp-img img{
        object-fit: cover;
    }
</style>

[/sourcecode]

### Видео

#### Specify `<source>` vs `src`

When specifying the source for an [`amp-video`](../../../documentation/components/reference/amp-video.md)

Example: Specifying multiple source files

[sourcecode:html]
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">

  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
[/sourcecode]

#### Размер и длительность видео

Для оптимальной производительности старайтесь использовать видео размером не более 4 МБ. Чем меньше размер файла, тем быстрее он скачивается, поэтому стремитесь к тому, чтобы медиаобъекты были как можно меньше.

#### Форматы видео

Если вы можете указать только один формат видео, указывайте **MP4**. Однако по возможности используйте видео **HLS** и указывайте MP4 в качестве запасного варианта для браузеров, которые еще не поддерживают видео HLS. HLS выполняет потоковую передачу с адаптивным битрейтом, в ходе которой качество видео автоматически подстраивается под скорость сетевого подключения пользователя.

[tip type="note"] **ПРИМЕЧАНИЕ.** Видеоформат HLS не поддерживается в десктопной версии Chrome (даже посредством эмуляции), поэтому для получения трафика с компьютеров необходимо указать MP4 в качестве запасного варианта. Для отладки видео HLS потребуется использовать реальное мобильное устройство с применением отладки по USB. [/tip]

#### Разрешение видео

Видео в составе Web-историй всегда вертикальные (т. е. в портретной ориентации) с ожидаемым соотношением сторон экрана 16:9. Используйте рекомендуемое разрешение в зависимости от типа потоковой передачи видео:

<table>
  <thead>
    <tr>
     <th>Video streaming type</th>
     <th>Resolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Non-adaptive</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Adaptive</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>

[tip type="note"] **ПРИМЕЧАНИЕ.** На мобильных устройствах, соотношение сторон экрана которых отличается от 16:9, видео может быть обрезано по горизонтали или по вертикали, чтобы соответствовать размерам viewport. [/tip]

#### Video codec

1. Для MP4 используйте `H.264`.
2. Для WEBM используйте `VP9`.
3. Для HLS или DASH используйте `H.264`.

#### Video quality

##### Transcoding optimizations

There are various tools you can use to encode videos and adjust the quality of the video during encoding. Here are just a few:

<table>
  <thead>
    <tr>
     <th>Tool</th>
     <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a></td>
     <td>Рекомендуемые оптимизации:       <ul>         <li>Для MP4 используйте <code>-crf 23</code>.</li>         <li>Для WEBM используйте <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a></td>
     <td>Рекомендуемые оптимизации:       <ul>         <li>Для MP4 используйте <code>-crf 23</code>.</li>         <li>Для WEBM используйте <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>An encoder that can also output the HLS format including the playlist.      </td>
    </tr>
  </tbody>
</table>

##### HLS segment size

Ensure the size of your HLS segments are typically no more than 10 seconds in duration.

## Animation

Animations have a few caveats in stories, such as the concept of what is "visible". For instance, in our "3 panel" desktop view your creative may be visible on the page but not yet the center focus. This can be problematic if the desired effect is to start animations when a page becomes the main focal point.

Чтобы помочь решить подобные проблемы, AMP добавляет в тело вашего креатива специальный атрибут `amp-story-visible`, когда креатив становится центральным объектом внимания во всех возможных вариантах отображения. Запуск анимаций рекомендуется инициировать на основании именно этого сигнала.

Example: this animation will fire when the page comes into focus, and restart if a user clicks to another page in the story and returns.

[sourcecode:html]

<style amp-custom>
    body[amp-story-visible] .my-animation-class {
      animation: 2s my-animation-name;
    }
</style>

[/sourcecode]

## Рекламная история <a name="sponsored-story"></a>

A Sponsored Story exists as a URL on the web, enabling the drive of user traffic to a Sponsored Story from the call to action button on an AMP Story ad. A Sponsored Story is an AMP Story, but with focus on an immersive and expansive ad experience.

{{ image('/static/img/docs/stampads/sponsored_story_full.png', 1600, 900, layout='intrinsic', alt='CTA button directs to a Sponsored Story', caption='CTA button directs to a Sponsored Story', align='' ) }}

Подробнее о том, как создать Web-историю, [читайте здесь](../start/create_successful_stories.md).
