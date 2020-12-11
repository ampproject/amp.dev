---
"$title": Как добавлять сторонний контент
"$order": '9'
description: Узнайте, как размещать сторонний контент на своих страницах ...
formats:
- websites
components:
- iframe
- facebook
author: Meggin
contributors:
- pbakaus
- bpaduch
---

Ознакомьтесь с рекомендациями по размещению стороннего контента на ваших страницах.

## Как добавлять твиты

При публикации твитов на своих страницах используйте элемент [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

В результате пропорции твита будут изменены автоматически в соответствии с заданными вами размерами, однако его внешний вид может быть неоптимальным. В этом случае вручную укажите более подходящие значения ширины и высоты твита или используйте атрибут media, чтобы соотношение сторон менялось в зависимости от ширины экрана.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

[tip type="tip"] **СОВЕТ.** Дополнительные примеры использования [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) можно увидеть в рамках курса [AMP By Example](../../../../documentation/examples/documentation/amp-twitter.html). [/tip]

## Как добавлять изображения из Instagram

При публикации изображений из Instagram на своих страницах используйте элемент [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Затем вставьте код data-shortcode из URL изображения. Например, в URL `https://instagram.com/p/fBwFP` он выглядит так: `fBwFP`. В адаптивных макетах Instagram используется фиксированное соотношение сторон, поэтому значения ширины и высоты должны быть соответствующими:

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

[tip type="tip"] **СОВЕТ.** Дополнительные примеры использования [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) можно найти на страницах курса [AMP By Example](../../../../documentation/examples/documentation/amp-instagram.html). [/tip]

## Как добавлять записи или видео Facebook

При публикации записей или видео Facebook на своих страницах используйте элемент [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md).

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

Preview: <amp-facebook width="486" height="657" layout="responsive" data-href="https://www.facebook.com/zuck/posts/10102593740125791"> </amp-facebook>

##### Пример кода для добавления видео Facebook

Source:

```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```

Preview: <amp-facebook width="476" height="316" layout="responsive" data-embed-as="video" data-href="https://www.facebook.com/nasaearth/videos/10155187938052139"> </amp-facebook>

[tip type="tip"] **СОВЕТ.** Больше примеров использования [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) можно увидеть в рамках курса [AMP By Example](../../../../documentation/examples/documentation/amp-facebook.html). [/tip]

## Как добавлять видео YouTube

Чтобы встроить на свою страницу видео с YouTube, используйте элемент [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Идентификатор `data-videoid` содержится в URL страницы видео YouTube. Например, в URL `https://www.youtube.com/watch?v=Z1q71gFeRqM` это `Z1q71gFeRqM`.

Используйте атрибут `layout="responsive"` для обеспечения корректной компоновки видео с соотношением сторон экрана 16:9:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

[tip type="tip"] **СОВЕТ.** Дополнительные примеры использования [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) можно увидеть в рамках курса [AMP By Example](../../../../documentation/examples/documentation/amp-youtube.html). [/tip]

## Как добавлять объявления

Чтобы показывать рекламу на своей странице, используйте элемент [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Поддерживается только реклама, передача которой осуществляется по протоколу HTTPS.

В документе AMP не разрешается запускать JavaScript, предоставляемый рекламной сетью. Вместо этого среда выполнения AMP загружает iframe из другого источника (через изолированную программную среду iframe) и выполняет JavaScript-код рекламной сети внутри изолированной программной среды iframe.

Следует указать ширину и высоту рекламы, а также тип рекламной сети. Атрибут `type` используется для выбора шаблона рекламной сети. Атрибуты `data-*` зависят от конкретной рекламной сети.

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
</amp-ad>
```
[/example]

Добавьте элемент `placeholder`, который будет отображен, если рекламу не удалось загрузить (если это поддерживается рекламной сетью):

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
  <div placeholder>Have a great day!</div>
</amp-ad>
```
[/example]

В AMP реализована поддержка широкого ассортимента рекламных сетей. Полный список см. в описании компонента [`amp-ad`](../../../../documentation/components/reference/amp-ad.md).

[tip type="read-on"] **ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ.** Подробнее о рекламе можно узнать в руководстве [Монетизация AMP-страницы с помощью рекламы](../../../../documentation/guides-and-tutorials/develop/monetization/index.md). [/tip]
