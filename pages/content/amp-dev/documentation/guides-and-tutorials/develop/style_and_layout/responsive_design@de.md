---
"$title": Erstelle responsive AMP Seiten
"$order": '5'
description: Mit responsivem Webdesign werden flüssige Webseiten erstellt, die auf die Bedürfnisse deiner Benutzer reagieren – Seiten, die der Größe und Ausrichtung …
formats:
- websites
- email
- ads
- stories
components:
- iframe
- youtube
author: bpaduch
contributors:
- pbakaus
---

## Einführung

Mit responsivem Webdesign werden flüssige Webseiten erstellt, die auf die Bedürfnisse deiner Benutzer reagieren – Seiten, die der Größe und Ausrichtung des Gerätebildschirms entsprechen. In AMP ist das problemlos möglich. AMP unterstützt alle Kategorien von Bildschirmen und Geräten und bietet integrierte, responsive Komponenten.

Dieser Leitfaden zeigt, wie du diese responsiven Grundlagen mühelos in AMP implementieren kannst:

- [Steuerung des Viewports](#controlling-the-viewport)
- [Erstellung eines responsiven Layouts](#creating-a-responsive-layout)
- [Skalieren von Medien](#scaling-media-for-the-page)

[video src='https://www.youtube.com/watch?v=XDvbJ2apaiA' caption='Erfahre in diesem Video mehr über das responsive Design in AMP.']

## Steuerung des Viewports <a name="controlling-the-viewport"></a>

[filter formats="websites, ads, stories"] Um deine Webseite so zu optimieren, dass der Inhalt skaliert wird und in das Browserfenster für jedes Gerät passt, musst du ein `meta` Viewport Element angeben. Das Viewport Element weist den Browser an, wie der sichtbare Bereich (Viewport) der Webseite skaliert und dimensioniert werden soll.

Aber welche Werte sollst du verwenden? In AMP ist das bereits für dich geregelt. Im Rahmen des [erforderlichen Markups](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) für AMP Seiten musst du den folgenden Viewport angeben:

```html
<meta name="viewport" content="width=device-width" />
```

Das sind die typischen Einstellungen des Viewports, die du für eine responsive Website verwenden würdest. Zwar ist für eine gültige AMP Seite die Angabe von `initial-scale=1` nicht erforderlich, wird aber empfohlen, da es die Zoomstufe beim ersten Laden der Seite auf 1 setzt. [/filter]

[filter formats="email"] Dieser Abschnitt gilt nur für AMP Websites, Ads und Storys. [/filter]

## Erstellung eines responsiven Layouts <a name="creating-a-responsive-layout"></a>

Responsives Design erlaubt die Verwendung von CSS [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) Abfragen, um das Styling deiner Webseite an verschiedene Bildschirmgrößen anzupassen, ohne den Inhalt der Seite ändern zu müssen. In AMP kannst du weiterhin dieselben CSS `@media` Abfragen verwenden. Um ein AMP Element genauer zu steuern, kannst du außerdem das Attribut `media` für das Element angeben. Das ist besonders nützlich, wenn du ein Element basierend auf einer Medienabfrage entweder einblenden oder ausblenden musst. Ein Beispiel für die Verwendung des Attributs `media` findest du im Abschnitt [Art Direction eines Bildes ändern](#changing-the-art-direction-of-an-image).

Es kann schwierig sein, die Größe jedes Elements an einen Bildschirm anzupassen<sup><a id="ref1" href="#fn1">*</a></sup>.  In AMP kannst du ein Element jedoch problemlos responsiv machen, indem du einfach das Attribut `"layout=responsive"` zusammen mit den Attributen `width` und `height` des Elements angibst. Wenn du das Layout `responsive` auf ein Element anwendest, wird die Größe des Elements automatisch an die Breite seines Containerelements angepasst und die Höhe ändert sich entsprechend dem Seitenverhältnis, das durch die Attribute `width` und `height` des Elements angegeben ist. Fast alle AMP Elemente unterstützen das Layout `responsive`. In der Referenzdokumentation des Elements findest du Informationen zu den unterstützten Layouts.

Auch wenn du Elemente mithilfe von `"layout=responsive"` problemlos responsiv machen kannst, musst du berücksichtigen, wie deine Elemente auf unterschiedlichen Bildschirmgrößen angezeigt werden – einschließlich Desktop und Tablet. Ein häufiger Fehler liegt darin, dass einem Bild die gesamte Bildschirmbreite erlaubt wird, wodurch das Bild über die beabsichtigte Größe hinaus gedehnt wird. Das führt für Breitbildbenutzer zu einer schlechten Erfahrung. Standardmäßig nehmen Elemente mit `layout=responsive` die volle Breite des Elementcontainers ein, dessen Breite häufig nicht eingeschränkt ist (d. h. "width=100%"). Die Darstellung von Bildern lässt sich verbessern, indem du die Breite des Bildcontainers schlicht einschränkst. Wenn du beispielsweise eine "max-width" Regel für "body" oder "main" festlegst, kannst du alle Bilder auf eine bestimmte maximale Breite beschränken.

##### Beispiel: die Breite von responsiven Bildern einschränken

Im folgenden Beispiel haben wir ein Blumenbild (640 x 427 px), das auf allen Bildschirmgrößen angezeigt werden soll. Daher haben wir die Attribute `width` und `height` angegeben und das Layout auf `responsive` gesetzt.

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

Wir möchten aber, dass das Bild nicht über die beabsichtigte Größe hinaus gestreckt wird. Deshalb setzen wir die `max-width` des Containers mithilfe von benutzerdefiniertem CSS auf 700 px:

```html
<style amp-custom>
.resp-img {
    max-width: 700px;
  }
</style>
```

[tip type="read-on"] **ERFAHRE MEHR:** Weitere Infos zu den verschiedenen Layouts in AMP findest du im Leitfaden [Layout & Medienabfragen](control_layout.md#the-layout-attribute). [/tip]

<a id="fn1"></a> [tip type="note"] **Warum ist es so kompliziert, die Größe von Elementen an den Bildschirm anzupassen, wenn ich dies doch problemlos mit dem Style `width=100%` tun kann?**

Die Schwierigkeit besteht darin, responsive Elemente auf der Seite zu rendern, ohne die Leistungsmetriken oder die Benutzererfahrung zu beeinträchtigen. Ja, du kannst Bilder problemlos mit "width = 100%" an den Bildschirm anpassen, aber das reduziert die Leistung. Der Browser muss das Bild zuerst herunterladen, um die Abmessungen des Bildes zu erhalten, dann die Größe des Bildes gemäß der Bildschirmgröße ändern und schließlich alle Elemente auf der Seite neu anordnen und die Seite neu zeichnen. In AMP wird der Renderingpfad so optimiert, dass das Layout der Seite zuerst aufgebaut wird und die Positionen von Bildern mithilfe von Platzhaltern reserviert werden, deren Größen auf den in [`amp-img`](../../../../documentation/components/reference/amp-img.md) angegebenen Abmessungen basieren (mit diesen Werten wird das Seitenverhältnis bestimmt). Anschließend werden die Ressourcen heruntergeladen und die Seite wird dargestellt. Ein erneuter Reflow ist nicht erforderlich. [/tip]

## Medien auf der Seite skalieren <a name="scaling-media-for-the-page"></a>

Der wahrscheinlich schwierigste Aspekt des responsiven Designs ist die korrekte Anzeige von Medien auf der Seite, die auf die Eigenschaften des Bildschirms reagieren sollen. Dieser Abschnitt erklärt, wie du responsive Videos und Bilder auf AMP Seiten einbetten kannst.

### Videos einbetten

Wenn du ein Video in deine Webseite aufnimmst, möchtest du sicherstellen, dass die Benutzer den Inhalt des Videos und die Videosteuerelemente sehen können (d. h. es gibt kein Überlaufen). In der Regel erreichst du das mit einer Kombination aus CSS Medienabfragen, einem Container und sonstigem CSS. In AMP musst du nur das Videoelement zu deiner Seite hinzufügen und `layout=responsive` für das Element angeben – zusätzliches CSS ist nicht erforderlich.

##### Beispiel: ein YouTube Video einbetten

Im folgenden Beispiel möchten wir ein eingebettetes YouTube Video anzeigen, das auf die Größe und Ausrichtung des Gerätebildschirms reagiert. Durch Hinzufügen von `"layout=responsive"` zum Element [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) wird die Größe des Videos an das Fenster angepasst und das Seitenverhältnis entsprechend der angegebenen Werte von `width` und `height` beibehalten.

[example preview="top-frame" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

Es gibt viele Arten von Videos, die du deinen AMP Seiten hinzufügen kannst. Weitere Infos findest du in der Liste der verfügbaren [Medienkomponenten](../../../../documentation/components/index.html#media).

### Responsive Bilder anzeigen <a name="displaying-responsive-images"></a>

Ein großer Teil einer Webseite besteht aus Bildern (ungefähr [65% der Bytes einer Seite](http://httparchive.org/interesting.php#bytesperpage)). Deine Bilder sollten zumindest auf Bildschirmen verschiedener Größen und Ausrichtungen sichtbar sein (d. h. Benutzer müssen nicht scrollen, verkleinern oder zoomen, um das gesamte Bild zu sehen). In AMP ist das ganz einfach über das Attribut `"layout=responsive"` möglich (siehe [Füge Bilder in AMP hinzu](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)). Zusätzlich zum einfachen responsiven Bild möchtest du möglicherweise mehrere Bildressourcen bereitstellen, um:

- [gestochen scharfe Bilder bei passender Auflösung bereitzustellen,](#serving-crisp-images-for-the-right-resolution)
- [die Art Direction eines Bildes zu ändern,](#changing-the-art-direction-of-an-image)<br>
- [optimierte Bildformate bereitzustellen.](#providing-optimized-images)<br>

#### Gestochen scharfe Bilder bei passender Auflösung bereitstellen <a name="serving-crisp-images-for-the-right-resolution"></a>

Für hochauflösende Bildschirme (z. B. Retina Display) solltest du Bilder bereitstellen, die klar und scharf sind. Du wirst jedoch nicht dasselbe Bild auf Geräten mit niedriger Auflösung verwenden wollen, da dies die Ladedauer unnötig erhöhen würde. Auf nicht-AMP und AMP Seiten kannst du das zur Pixeldichte des Bildschirms passende Bild bereitstellen, indem du `srcset` mit dem Breitendeskriptor ( `w` ) verwendest.

[tip type="note"] **HINWEIS:** Der auf DPR (`x`) basierende srcset Selektor funktioniert ebenfalls. Für mehr Flexibilität empfehlen wir jedoch die Verwendung des Selektors `w`. Früher (in der alten srcset Version) beschrieb der Deskriptor `w` die Breite des Viewports. Jetzt steht er aber für die Breite der Bildquelldatei, sodass der Benutzeragent die effektive Pixeldichte jedes Bildes berechnen und das geeignete Bild zum Rendern auswählen kann. [/tip]

##### Beispiel: ein scharfes Bild anzeigen, das zum Bildschirm passt

Im folgenden Beispiel haben die Bilddateien dasselbe Seitenverhältnis, aber unterschiedliche Auflösungen. Durch die Bereitstellung verschiedener Bildauflösungen kann der Browser das Bild auswählen, das am besten zur Auflösung des Gerätes passt. Zusätzlich haben wir die Größe angegeben, in der das Bild gerendert werden soll:

- Bei einer Viewportbreite von bis zu 400 px wird das Bild mit 100 % der Viewportbreite gerendert.
- Bei einer Viewportbreite von bis zu 900 px wird das Bild mit 75 % der Viewportbreite gerendert.
- Bei Breiten über 900 px wird das Bild mit einer Breite von 600 px gerendert.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="apple"
  src="{{server_for_email}}/static/inline-examples/images/apple.jpg"
  height="596"
  width="900"
  srcset="{{server_for_email}}/static/inline-examples/images/apple-900.jpg 900w,
            {{server_for_email}}/static/inline-examples/images/apple-800.jpg 800w,
            {{server_for_email}}/static/inline-examples/images/apple-700.jpg 700w,
            {{server_for_email}}/static/inline-examples/images/apple-600.jpg 600w,
            {{server_for_email}}/static/inline-examples/images/apple-500.jpg 500w,
            {{server_for_email}}/static/inline-examples/images/apple-400.jpg 400w"
  sizes="(max-width: 400px) 100vw,
            (max-width: 900px) 75vw, 600px"
>
</amp-img>
```

[/example]

Angenommen, wir haben ein Gerät mit einer Viewportbreite von 412 px und einem DPR von 2,6. Basierend auf dem obigen Code muss das Bild eine Breite von 75 % der Viewportbreite haben, sodass der Browser ein Bild mit etwa 803 px (412 _ 0,75 _ 2,6) auswählt, das in unserem Fall `apple-800.jpg` ist.

[tip type="read-on"] **ERFAHRE MEHR:** Weitere Infos zur Verwendung von srcset und Größen in AMP findest du im Leitfaden [Art Direction mit srcset, Größen & Höhen](art_direction.md). [/tip]

#### Art Direction eines Bildes ändern <a name="changing-the-art-direction-of-an-image"></a>

Art Direction bezieht sich auf das Anpassen der visuellen Eigenschaften eines Bildes für bestimmte Übergangspunkte. Anstatt ein Bild für ein kleines Display nur zu skalieren, möchtest du möglicherweise eine zugeschnittene Version des Bildes bereitstellen, die den Fokus des Bildes hervorhebt, oder du möchtest völlig unterschiedliche Bilder an den verschiedenen Übergangspunkten bereitstellen. In HTML kannst du dies mit dem Element `picture` erreichen. In AMP implementierst du die Art Direction mithilfe des Attributs `media`.

##### Beispiel: Bilder mit unterschiedlichen Größen für verschiedene Übergangspunkte

Im folgenden Beispiel haben wir 3 verschiedene zugeschnittene Bilder einer Katze, die an verschiedenen Übergangspunkten angezeigt werden sollen. Ist die Breite des Viewports:

- 670 px oder höher, dann zeige `cat-large.jpg` (650 x 340 px)
- 470 – 669 px, dann zeige `cat-medium.jpg`  (450 x 340 px)
- 469 px oder kleiner, dann zeige `cat-small.jpg` (226 x 340 px)

[tip type="note"] **HINWEIS:** Da wir wollen, dass die Bilder eine feste Größe haben (d. h. nicht verzerrt werden), haben wir keinen Layoutwert angegeben. Somit wird standardmäßig `layout=fixed` festgelegt, da wir die Breite und Höhe angegeben haben. Weitere Infos findest du unter ["Was, wenn das Attribut layout nicht angegeben ist?"](control_layout.md#what-if-the-layout-attribute-isnt-specified). [/tip]

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="grey cat"
  media="(min-width: 670px)"
  width="650"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-large.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(min-width: 470px) and (max-width: 669px)"
  width="450"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-medium.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(max-width: 469px)"
  width="226"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-small.jpg"
></amp-img>
```

[/example]

[tip type="read-on"] **ERFAHRE MEHR:** Weitere Infos über Art Direction in AMP findest du im Leitfaden [Art Direction mit srcset, Größen & Höhen](art_direction.md). [/tip]

#### Optimierte Bilder bereitstellen <a name="providing-optimized-images"></a>

Für das schnelle Laden von Seiten sind optimierte Bilder im Hinblick auf Größe, Qualität und Format erforderlich. Reduziere die Dateigröße immer auf das niedrigste akzeptable Qualitätsniveau. Es gibt verschiedene Tools, mit denen du Bilder verkleinern kannst (z. B. [ImageAlph](http://pngmini.com/lossypng.html) oder [TinyPNG](https://tinypng.com/)). Was Bildformate betrifft, so lassen sich einige Bildformate besser komprimieren als andere (z. B. WebP und JPEG XR gegenüber JPEG). Du möchtest sicher das optimale Bild für deinen Benutzer bereitstellen und sicherstellen, dass der Browser des Benutzers das Bild unterstützt (denn [nicht alle Browser unterstützen alle Bildformate](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)).

In HTML kannst du mithilfe des Tags `picture` verschiedene Bildformate bereitstellen. Da in AMP das Tag `picture` nicht unterstützt wird, kannst du verschiedene Bilder mithilfe des Attributs `fallback` bereitstellen.

[tip type="read-on"] **ERFAHRE MEHR:** Weitere Infos über Fallbacks findest du im Leitfaden [Platzhalter & Fallbacks](placeholders.md) [/tip]

AMP bietet zwei Möglichkeiten, um optimierte Bilder bereitzustellen:

- Entwickler, die seltene Bildformate wie WebP verwenden, können ihren Server so konfigurieren, dass er den `Accept` Browserheader verarbeitet und mit Bildbytes und dem entsprechenden [`Content-Type` Header](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/client-hints/) antwortet. Dadurch wird verhindert, dass der Browser Bildtypen herunterlädt, die er nicht unterstützt. Erfahre mehr über die [Inhaltsaushandlung (Content Negotiation)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation).
    <pre>[sourcecode:html] Accept: image/webp,image/apng,image/,/*;q=0.8 [/sourcecode]</pre>
- Stelle verschachtelte Fallbacks für Bilder bereit, wie im folgenden Beispiel dargestellt.

##### Beispiel: unterschiedliche Bildformate bereitstellen

Wenn der Browser im folgenden Beispiel WebP unterstützt, stelle mountains.webp bereit, andernfalls mountains.jpg.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp"
>
  <amp-img
    alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"
  ></amp-img>
</amp-img>
```

[/example]

Ein nettes Extra ist, dass einige Caches, wie der Google AMP Cache, Bilder automatisch nach WebP und in die richtigen Auflösungen komprimieren und konvertieren, wenn du dies nicht tust. Da jedoch nicht alle Plattformen Caches verwenden, solltest du die Bilder besser manuell optimieren.

[tip type="read-on"] **ERFAHRE MEHR:** Weitere Informationen zu den Bildoptimierungen, die der Google AMP Cache anwendet, findest du im Blogbeitrag ["Google AMP Cache, AMP Lite, and the need for speed"](https://developers.googleblog.com/2017/01/google-amp-cache-amp-lite-and-need-for.html). [/tip]

## Inspirierende Beispiele

Hier einige Beispiele, die dich hoffentlich dazu inspirieren, responsive AMP Seiten zu erstellen:

#### Produktion

- [Getty Images "2016 in Focus" ](http://www.gettyimages.com/2016/)
- [BRIT + CO's holiday gift guide](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [The Guardian](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### Made by AMP

- [Beispiele](../../../../documentation/examples/index.html)
- [Vorlagen](../../../../documentation/templates/index.html)
- [AMP Conf Workshop Codelab: Making beautiful AMPs](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)
