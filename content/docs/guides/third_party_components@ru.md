---
$title: Как добавлять сторонний контент
---

Ознакомьтесь с рекомендациями по размещению стороннего контента на ваших страницах.

[TOC]

## Как добавлять твиты

При публикации твитов на своих страницах используйте элемент [`amp-twitter`](/docs/reference/extended/amp-twitter.html).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

В результате пропорции твита будут изменены автоматически в соответствии с заданными вами размерами, однако его внешний вид может быть неоптимальным.
В этом случае вручную укажите более подходящие значения ширины и высоты твита или используйте атрибут media, чтобы соотношение сторон менялось в зависимости от ширины экрана.

Пример использования элемента `amp-twitter` в коде [twitter.amp](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html):

[sourcecode:html]
<amp-twitter width=390 height=50
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
[/sourcecode]

## Как добавлять изображения из Instagram

При публикации изображений из Instagram на своих страницах используйте элемент [`amp-instagram`](/docs/reference/extended/amp-instagram.html).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Затем вставьте код data-shortcode из URL изображения. Например, в URL `https://instagram.com/p/fBwFP` он выглядит так: `fBwFP`.
В адаптивных макетах Instagram используется фиксированное соотношение сторон, поэтому значения ширины и высоты должны быть соответствующими:

[sourcecode:html]
<amp-instagram
    data-shortcode="fBwFP"
    width="320"
    height="392"
    layout="responsive">
</amp-instagram>
[/sourcecode]

## Как добавлять записи или видео Facebook

При публикации записей или видео Facebook на своих страницах используйте элемент [`amp-facebook`](/docs/reference/extended/amp-facebook.html).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

Пример кода для добавления записи Facebook:

[sourcecode:html]
<amp-facebook width=486 height=657
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
[/sourcecode]

Пример кода для добавления видео Facebook:

[sourcecode:html]
<amp-facebook width=552 height=574
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/zuck/videos/10102509264909801/">
</amp-facebook>
[/sourcecode]

## Как добавлять видео YouTube

При публикации видео YouTube на своих страницах используйте элемент [`amp-youtube`](/docs/reference/extended/amp-youtube.html).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Идентификатор `data-videoid` содержится в URL каждого видео YouTube. Например, в URL https://www.youtube.com/watch?v=Z1q71gFeRqM он выглядит так: Z1q71gFeRqM.

Добавьте элемент `layout="responsive"`, чтобы макеты для видео с соотношением сторон 16:9 создавались корректно:

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
[/sourcecode]

## Как добавлять объявления

При публикации объявлений на своих страницах используйте элемент [`amp-ad`](/docs/reference/amp-ad.html).
Помните о том, что поддерживаются только объявления, использующие протокол HTTPS.

Код JavScript, предоставляемый рекламными сетями, запрещено обрабатывать непосредственно в документах AMP,
поэтому среда выполнения AMP загружает iframe из другого источника в тестовую среду iframe и выполняет код JavaScript рекламной сети в этой среде.

Укажите ширину и высоту объявления,
а также тип рекламной сети с помощью атрибута `type`, который определяет ее шаблон.
У разных типов объявлений должны быть различные атрибуты `data-*`.

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
[/sourcecode]

Если показ объявлений выполнить нельзя, но рекламная сеть поддерживает атрибут `placeholder`, вставьте его, чтобы проверить код:

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  <div placeholder>Have a great day!</div>
</amp-ad>
[/sourcecode]

Технология AMP поддерживает множество рекламных сетей. Ознакомьтесь с их [полным списком](/docs/reference/amp-ad.html#supported-ad-networks).
