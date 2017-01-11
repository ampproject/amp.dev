---
$title: Inhalte von Drittanbietern einschließen
---

In diesem Artikel wird beschrieben, wie Sie Drittanbieterkomponenten in Ihre Seiten einschließen können.

[TOC]

## Tweet integrieren

Wenn Sie auf Ihrer Seite einen Twitter-Tweet einbetten möchten, verwenden Sie das Element [`amp-twitter`](/docs/reference/extended/amp-twitter.html).

Fügen Sie dazu zunächst das folgende Skript in den `<head>`-Abschnitt ein:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Derzeit werden Tweets automatisch entsprechend dem verfügbaren Platz skaliert. Die Darstellung ist dabei aber nicht immer optimal.
Passen Sie Breite und Höhe manuell an oder verwenden Sie das media-Attribut, um das Seitenverhältnis entsprechend der Bildschirmbreite festzulegen.

Beispiel für `amp-twitter` aus dem [twitter.amp-Beispiel](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html):

[sourcecode:html]
<amp-twitter width="390" height="50"
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
[/sourcecode]

## Instagram einbetten

Wenn Sie auf Ihrer Seite ein Instagram einbetten möchten, verwenden Sie das Element [`amp-instagram`](/docs/reference/extended/amp-instagram.html).

Fügen Sie dazu zunächst das folgende Skript in den `<head>`-Abschnitt ein:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Schließen Sie den Instagram-Data-Shortcode aus der Instagram-Foto-URL ein. In `https://instagram.com/p/fBwFP` ist z. B. `fBwFP` der Data-Shortcode.
Außerdem wird bei Instagram für responsive Layouts ein festes Seitenverhältnis verwendet. Darum sollten die Werte für Breite und Höhe universell sein.

[sourcecode:html]
<amp-instagram
    data-shortcode="fBwFP"
    width="320"
    height="392"
    layout="responsive">
</amp-instagram>
[/sourcecode]

## Beitrag oder Video von Facebook anzeigen

Wenn Sie auf Ihrer Seite einen Beitrag oder ein Video von Facebook anzeigen möchten, verwenden Sie das Element [`amp-facebook`](/docs/reference/extended/amp-facebook.html).

Fügen Sie dazu das folgende Skript dem `<head>`-Abschnitt hinzu:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

Beispiel für das Einbetten eines Beitrags:

[sourcecode:html]
<amp-facebook width=486 height=657
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
[/sourcecode]

Beispiel für das Einbetten eines Videos:

[sourcecode:html]
<amp-facebook width=552 height=574
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/zuck/videos/10102509264909801/">
</amp-facebook>
[/sourcecode]

## YouTube-Video einschließen

Wenn Sie auf Ihrer Seite ein YouTube-Video einschließen möchten, verwenden Sie das Element [`amp-youtube`](/docs/reference/extended/amp-youtube.html).

Fügen Sie dazu das folgende Skript dem `<head>`-Abschnitt hinzu:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Die YouTube-`data-videoid`-ID ist in jeder Videoseiten-URL von YouTube enthalten. In https://www.youtube.com/watch?v=Z1q71gFeRqM, ist z. B. Z1q71gFeRqM die Video-ID.

Verwenden Sie `layout="responsive"`, um das richtige Layout für Videos mit dem Seitenverhältnis 16:9 zu erhalten:

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
[/sourcecode]

## Werbeanzeige einblenden

Wenn Sie auf Ihrer Seite eine Werbeanzeige einblenden möchten, verwenden Sie das Element [`amp-ad`](/docs/reference/amp-ad.html).
Es werden nur über HTTPS bereitgestellte Werbeanzeigen unterstützt.

Innerhalb des AMP-Dokuments darf kein vom Werbenetzwerk bereitgestellter JavaScript-Code ausgeführt werden.
Stattdessen lädt die AMP-Laufzeit einen iFrame über die iFrame-Sandbox aus einer anderen Quelle und führt den JavaScript-Code des Werbenetzwerks innerhalb dieser iFrame-Sandbox aus.

Sie müssen Breite und Höhe der Werbeanzeige sowie den Typ des Werbenetzwerks angeben.
Mit `type` wird die Vorlage des Werbenetzwerks angegeben.
Unterschiedliche Anzeigentypen erfordern unterschiedliche `data-*`-Attribute.

[sourcecode:html]
<amp-ad width="300" height="250"
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
[/sourcecode]

Falls das Werbenetzwerk dies unterstützt, schließen Sie ein `placeholder`-Element ein, wenn keine Werbeanzeige verfügbar ist:

[sourcecode:html]
<amp-ad width="300" height="250"
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  <div placeholder>Have a great day!</div>
</amp-ad>
[/sourcecode]

AMP unterstützt viele verschiedene Werbenetzwerke. [Eine vollständige Liste finden Sie hier.](/docs/reference/amp-ad.html#supported-ad-networks)
