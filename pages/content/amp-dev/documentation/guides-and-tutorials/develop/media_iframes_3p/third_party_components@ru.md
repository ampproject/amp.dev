---
$title: Как добавлять сторонний контент
---

Ознакомьтесь с рекомендациями по размещению стороннего контента на ваших страницах.

## Как добавлять твиты

При публикации твитов на своих страницах используйте элемент [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

В результате пропорции твита будут изменены автоматически в соответствии с заданными вами размерами, однако его внешний вид может быть неоптимальным.
В этом случае вручную укажите более подходящие значения ширины и высоты твита или используйте атрибут media, чтобы соотношение сторон менялось в зависимости от ширины экрана.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

## Как добавлять изображения из Instagram

При публикации изображений из Instagram на своих страницах используйте элемент [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Затем вставьте код data-shortcode из URL изображения. Например, в URL `https://instagram.com/p/fBwFP` он выглядит так: `fBwFP`.
В адаптивных макетах Instagram используется фиксированное соотношение сторон, поэтому значения ширины и высоты должны быть соответствующими:

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

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

При публикации видео YouTube на своих страницах используйте элемент [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md).

Для этого разместите между тегами `<head>` следующий скрипт:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Идентификатор `data-videoid` содержится в URL каждого видео YouTube. Например, в URL `https://www.youtube.com/watch?v=Z1q71gFeRqM` он выглядит так: `Z1q71gFeRqM`.

Добавьте элемент `layout="responsive"`, чтобы макеты для видео с соотношением сторон 16:9 создавались корректно:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

## Как добавлять объявления

При публикации объявлений на своих страницах используйте элемент [`amp-ad`](../../../../documentation/components/reference/amp-ad.md).
Помните о том, что поддерживаются только объявления, использующие протокол HTTPS.

Код JavScript, предоставляемый рекламными сетями, запрещено обрабатывать непосредственно в документах AMP,
поэтому среда выполнения AMP загружает iframe из другого источника в тестовую среду iframe и выполняет код JavaScript рекламной сети в этой среде.

Укажите ширину и высоту объявления,
а также тип рекламной сети с помощью атрибута `type`, который определяет ее шаблон.
У разных типов объявлений должны быть различные атрибуты `data-*`.

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

Если показ объявлений выполнить нельзя, но рекламная сеть поддерживает атрибут `placeholder`, вставьте его, чтобы проверить код:

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

Технология AMP поддерживает множество рекламных сетей. Ознакомьтесь с их [полным списком](../../../../documentation/components/reference/amp-ad.md#supported-ad-networks).
