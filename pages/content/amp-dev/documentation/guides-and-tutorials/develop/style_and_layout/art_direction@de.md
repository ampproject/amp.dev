---
"$title": Responsive Bilder mit srcset, sizes & heights
"$order": '4'
description: Verwende das Attribut srcset, um die Assets eines Elements basierend auf unterschiedlichen Medienausdrücken zu steuern. Verwende es insbesondere für …
formats:
- websites
- email
- ads
- stories
components:
- iframe
author: pbakaus
contributors:
- bpaduch
---

## srcset

Verwende das Attribut `srcset`, um die Assets eines Elements basierend auf unterschiedlichen Medienausdrücken zu steuern. Verwende es insbesondere für alle [`amp-img`](../../../../documentation/components/reference/amp-img.md) Tags, um anzugeben, welche Bildobjekte je nach Bildschirmgröße verwendet werden sollen. AMP generiert automatisch das Attribut `sizes`, das <a data-md-type="link" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img">der HTML5 Definition von `sizes` entspricht</a>. Das Attribut wird für alle untergeordneten `<img>` Tags von `<amp-img>` generiert, wenn das `<amp-img>` ein Attribut `srcset`, aber kein `sizes` hat.

In diesem einfachen Beispiel gibt `srcset` basierend auf der Bildschirmbreite an, welches Bild verwendet werden soll. Der Deskriptor `w` teilt dem Browser die Breite der einzelnen Bilder in der Liste mit:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w">
</amp-img>
```
[/example]

[tip type="note"] **HINWEIS:** AMP unterstützt "srcset" mit dem Deskriptor `w` in allen Browsern. [/tip]

Erfahre mehr über das Erstellen responsiver Bilder mit `srcset` unter [Using Responsive Images (Now)](http://alistapart.com/article/using-responsive-images-now).

## sizes

Du kannst das optionale AMP Attribut `sizes` auch zusammen mit `srcset` verwenden. Das AMP Attribut `sizes` beschreibt, wie die Elementgröße basierend auf einem beliebigen Medienausdruck berechnet wird. <strong data-md-type="raw_html">Wenn du `sizes` für ein AMP Element definierst, legt AMP gemäß der entsprechenden Medienabfrage einen Inline Style für die Breite dieses Elements fest.</strong> Basierend auf der berechneten Größe des Elements wählt der User Agent die entsprechende Quelle aus, die vom Attribut `srcset` bereitgestellt wird.

Sieh dir das folgende Beispiel an:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw">
</amp-img>
```
[/example]

Das Attribut `sizes` legt die Breite des Elements auf 50 % der Größe des Viewports fest, wenn der Viewport 650px oder mehr beträgt. Ist der Viewport beispielsweise 800px groß, so wird die Breite des Elements auf 400px festgelegt. Der Browser wählt dann die für 400px passende `srcset` Ressource aus. Dabei wird angenommen, dass die Device Pixel Ratio 1 beträgt. In diesem Fall ist die Ressource `hummingbird-narrow.jpg` (320px).

[tip type="important"] **WICHTIG:** Wenn das Attribut "sizes" zusammen mit der Breite und Höhe angegeben wird, ist das Layout standardmäßig `responsive`. [/tip]

Weitere Infos über das [AMP Attribut `sizes` findest du hier](../../../../documentation/guides-and-tutorials/learn/common_attributes.md).

## heights

Alle AMP Elemente, die das Layout `responsive` erlauben, unterstützen auch das Attribut `heights`. Der Wert dieses Attributs ist ein Ausdruck vom Typ "sizes", der auf Medienausdrücken basiert, ähnlich wie das [Attribut "sizes" von img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), jedoch mit zwei Hauptunterschieden:

1. Er bezieht sich auf die Höhe des Elements, nicht auf die Breite.
2. Prozentwerte sind zulässig, z. B. `86%`. Wenn ein Prozentwert verwendet wird, gibt er den Wert relativ zur Elementbreite in Prozent an.

Wenn das Attribut `heights` zusammen mit `width` und `height` angegeben wird, ist das `layout` standardmäßig `responsive`.

Ein Beispiel:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%">
</amp-img>
```
[/example]

In diesem Beispiel beträgt die Höhe des Elements standardmäßig 80 % der Breite. Für einen Viewport, der breiter als `500px` ist, wird sie jedoch auf `200px` begrenzt.
