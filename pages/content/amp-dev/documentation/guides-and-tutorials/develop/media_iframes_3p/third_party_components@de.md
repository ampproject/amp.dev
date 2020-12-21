---
"$title": Füge Inhalte von Drittanbietern hinzu
"$order": '9'
description: Learn how to include third-party components in your pages ...
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

Erfahre, wie du Komponenten von Drittanbietern in deine Seiten aufnimmst.

## Einen Tweet einbetten

Bette mithilfe des Elements [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) einen Tweet von Twitter in deine Seite ein.

To embed a tweet in your page, first include the following script in the `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Currently, tweets are automatically proportionally scaled to fit the provided size, but this may yield less than the ideal appearance. Manually tweak the provided width and height or use the media attribute to select the aspect ratio based on screen width.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

[tip type="tip"] **TIP –** See more [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) examples at [AMP By Example](../../../../documentation/examples/documentation/amp-twitter.html). [/tip]

## Bild aus Instagram einbetten

Bette mithilfe des Elements [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) Bild aus Instagram in deine Seite ein.

To embed an Instagram, first include the following script in the `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram"
  src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Include the Instagram data-shortcode found in the Instagram photo URL. For example, in `https://instagram.com/p/fBwFP`, `fBwFP` is the data-shortcode. Also, Instagram uses a fixed aspect ratio for responsive layouts, so the value for width and height should be universal.

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

[tip type="tip"] **TIP –** See more [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) examples at [AMP By Example](../../../../documentation/examples/documentation/amp-instagram.html). [/tip]

## Beitrag oder Video aus Facebook anzeigen

Zeige mit dem Element [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) einen Beitrag oder ein Video aus Facebook auf deiner Seite an.

You must include the following script in the `<head>`:

[sourcecode:html]
<script async custom-element="amp-facebook"
  src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### Beispiel: Einbetten eines Beitrags

Source:

```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```

Vorschau: <amp-facebook width="486" height="657" layout="responsive" data-href="https://www.facebook.com/zuck/posts/10102593740125791"> </amp-facebook>

##### Beispiel: Einbetten eines Videos

Source:

```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```

Vorschau: <amp-facebook width="476" height="316" layout="responsive" data-embed-as="video" data-href="https://www.facebook.com/nasaearth/videos/10155187938052139"> </amp-facebook>

[tip type="tip"] **TIP –** See more [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) examples at [AMP By Example](../../../../documentation/examples/documentation/amp-facebook.html). [/tip]

## YouTube Video einbetten

Bette mithilfe des Elements [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) ein Youtube Video in deine Seite ein.

You must include the following script in the `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube"
  src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Die YouTube `data-videoid` findest du in jeder URL für eine YouTube Videoseite. In `https://www.youtube.com/watch?v=Z1q71gFeRqM` ist die Video ID beispielsweise `Z1q71gFeRqM`.

Verwende `layout="responsive"`, um korrekte Layouts für Videos mit einem Seitenverhältnis von 16:9 zu erreichen:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

[tip type="tip"] **TIP –** See more [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) examples at [AMP By Example](../../../../documentation/examples/documentation/amp-youtube.html). [/tip]

## Eine Ad anzeigen

Display an ad in your page by using the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) element. Only ads served via HTTPS are supported.

No ad network-provided JavaScript is allowed to run inside the AMP document. Instead, the AMP runtime loads an iframe from a different origin (via iframe sandbox) and executes the ad network’s JS inside that iframe sandbox.

You must specify the ad width and height, and the ad network type. The `type` identifies the ad network's template. Different ad types require different `data-*` attributes.

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

Wenn das Werbenetzwerk dies unterstützt, füge einen `placeholder` hinzu, der angezeigt wird, wenn keine Ad verfügbar ist:

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

AMP unterstützt eine Vielzahl von Werbenetzwerken. Eine vollständige Liste findest du bei [`amp-ad`](../../../../documentation/components/reference/amp-ad.md).

[tip type="read-on"] **READ ON –** Learn more about ads in the [Serving Ads on AMP](../../../../documentation/guides-and-tutorials/develop/monetization/index.md) guide. [/tip]
