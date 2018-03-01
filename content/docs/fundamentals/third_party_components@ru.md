---
$title: Как добавлять сторонний контент
---

Ознакомьтесь с рекомендациями по размещению стороннего контента на ваших страницах.

[TOC]

## Как добавлять твиты

При публикации твитов на своих страницах используйте элемент [`amp-twitter`](/docs/reference/components/amp-twitter.html).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

В результате пропорции твита будут изменены автоматически в соответствии с заданными вами размерами, однако его внешний вид может быть неоптимальным.
В этом случае вручную укажите более подходящие значения ширины и высоты твита или используйте атрибут media, чтобы соотношение сторон менялось в зависимости от ширины экрана.

<!-- embedded twitter example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.twitter.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Как добавлять изображения из Instagram

При публикации изображений из Instagram на своих страницах используйте элемент [`amp-instagram`](/docs/reference/components/amp-instagram.html).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Затем вставьте код data-shortcode из URL изображения. Например, в URL `https://instagram.com/p/fBwFP` он выглядит так: `fBwFP`.
В адаптивных макетах Instagram используется фиксированное соотношение сторон, поэтому значения ширины и высоты должны быть соответствующими:

<!-- embedded Instagram example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.instagram.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Как добавлять записи или видео Facebook

При публикации записей или видео Facebook на своих страницах используйте элемент [`amp-facebook`](/docs/reference/components/amp-facebook.html).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### Пример кода для добавления записи Facebook

Source: 
```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```
Preview: 
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>

##### Пример кода для добавления видео Facebook

Source: 
```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```
Preview: 
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>

## Как добавлять видео YouTube

При публикации видео YouTube на своих страницах используйте элемент [`amp-youtube`](/docs/reference/components/amp-youtube.html).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Идентификатор `data-videoid` содержится в URL каждого видео YouTube. Например, в URL `https://www.youtube.com/watch?v=Z1q71gFeRqM` он выглядит так: `Z1q71gFeRqM`.

Добавьте элемент `layout="responsive"`, чтобы макеты для видео с соотношением сторон 16:9 создавались корректно:

<!-- embedded youtube example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.youtube.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Как добавлять объявления

При публикации объявлений на своих страницах используйте элемент [`amp-ad`](/docs/reference/components/amp-ad.html).
Помните о том, что поддерживаются только объявления, использующие протокол HTTPS.

Код JavScript, предоставляемый рекламными сетями, запрещено обрабатывать непосредственно в документах AMP,
поэтому среда выполнения AMP загружает iframe из другого источника в тестовую среду iframe и выполняет код JavaScript рекламной сети в этой среде.

Укажите ширину и высоту объявления,
а также тип рекламной сети с помощью атрибута `type`, который определяет ее шаблон.
У разных типов объявлений должны быть различные атрибуты `data-*`.

<!-- embedded ad example -->
<div>
<amp-iframe height="212"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

Если показ объявлений выполнить нельзя, но рекламная сеть поддерживает атрибут `placeholder`, вставьте его, чтобы проверить код:

<!-- embedded ad example -->
<div>
<amp-iframe height="232"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-placeholder.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

Технология AMP поддерживает множество рекламных сетей. Ознакомьтесь с их [полным списком](/docs/reference/components/amp-ad.html#supported-ad-networks).
