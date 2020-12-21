---
"$title": Füge Inhalte von Drittanbietern hinzu
"$order": '9'
description: Erfahre, wie du Komponenten von Drittanbietern in deine Seiten aufnimmst …
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

Um einen Tweet in deine Seite einzubetten, binde zunächst das folgende Skript in `<head>` ein:

[sourcecode:html]
<script async custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Tweets werden derzeit automatisch proportional skaliert, damit sie zur angegebenen Größe passen. Damit erreichst du aber eventuell nicht deine ideale Darstellung. Passe die angegebene Breite und Höhe manuell an oder verwende das Attribut "media", um das Seitenverhältnis auf Basis der Bildschirmbreite auszuwählen.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

[tip type="tip"] **TIPP:** Mehr Beispiele für [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) findest du bei [Beispiele für AMP](../../../../documentation/examples/documentation/amp-twitter.html). [/tip]

## Bild aus Instagram einbetten

Bette mithilfe des Elements [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) Bild aus Instagram in deine Seite ein.

Um einen Beitrag aus Instagram in deine Seite einzubetten, binde zunächst das folgende Skript in `<head>` ein:

[sourcecode:html]
<script async custom-element="amp-instagram"
  src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Füge den Instagram "data-shortcode" aus der Instagram Foto URL hinzu. In `https://instagram.com/p/fBwFP` ist der Wert von "data-shortcode" beispielsweise `fBwFP` . Außerdem verwendet Instagram ein festes Seitenverhältnis für responsive Layouts, sodass der Wert für Breite und Höhe universell sein sollte.

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

[tip type="tip"] **TIPP:** Mehr Beispiele für [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) findest du bei [AMP By Example](../../../../documentation/examples/documentation/amp-instagram.html). [/tip]

## Beitrag oder Video aus Facebook anzeigen

Zeige mit dem Element [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) einen Beitrag oder ein Video aus Facebook auf deiner Seite an.

Binde das folgende Skript in `<head>` ein:

[sourcecode:html]
<script async custom-element="amp-facebook"
  src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### Beispiel: Einbetten eines Beitrags

Quellcode:

```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```

Vorschau: <amp-facebook width="486" height="657" layout="responsive" data-href="https://www.facebook.com/zuck/posts/10102593740125791"> </amp-facebook>

##### Beispiel: Einbetten eines Videos

Quellcode:

```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```

Vorschau: <amp-facebook width="476" height="316" layout="responsive" data-embed-as="video" data-href="https://www.facebook.com/nasaearth/videos/10155187938052139"> </amp-facebook>

[tip type="tip"] **TIPP:** Mehr Beispiele für [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) findest du bei [AMP By Example](../../../../documentation/examples/documentation/amp-facebook.html). [/tip]

## YouTube Video einbetten

Bette mithilfe des Elements [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) ein Youtube Video in deine Seite ein.

Binde das folgende Skript in `<head>` ein:

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

[tip type="tip"] **TIPP:** Mehr Beispiele für [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) findest du bei [AMP By Example](../../../../documentation/examples/documentation/amp-youtube.html). [/tip]

## Eine Ad anzeigen

Zeige mit dem Element [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) eine Ad auf deiner Seite an. Es werden nur Ads unterstützt, die über HTTPS bereitgestellt werden.

Innerhalb des AMP Dokuments darf kein vom Werbenetzwerk bereitgestelltes JavaScript ausgeführt werden. Stattdessen lädt die AMP Runtime ein iframe aus einer anderen Quelle (über die iframe Sandbox) und führt das JS des Werbenetzwerks in dieser iframe Sandbox aus.

Du musst die Breite und Höhe der Ad sowie den Typ des Werbenetzwerks angeben. `type` identifiziert das Template des Werbenetzwerks. Unterschiedliche Typen von Ads erfordern unterschiedliche `data-*` Attribute.

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

[tip type="read-on"] **ERFAHRE MEHR:** Mehr Infos über Ads findest du im Leitfaden zur [Bereitstellung von Ads in AMP](../../../../documentation/guides-and-tutorials/develop/monetization/index.md). [/tip]
