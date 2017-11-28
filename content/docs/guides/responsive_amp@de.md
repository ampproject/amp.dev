---
$title: Responsive AMP-Seiten erstellen
---

In AMP können Sie ganz leicht responsive Elemente erstellen, indem Sie einfach `layout=responsive` in sie einfügen.

[TOC]

## Responsive Bilder erstellen

Für alle extern geladenen Ressourcen, einschließlich Bildern, müssen Größe und Position angegeben werden, damit die Seite beim Laden der Ressourcen ohne Springen und Layoutänderung angezeigt wird.

Wenn Sie responsive Bilder erstellen, geben Sie Breite und Höhe an, legen Sie das Layout als responsiv fest und geben Sie mittels [`srcset`](/de/docs/guides/responsive/style_pages.html) an, welches Bild-Asset je nach Bildschirmgröße verwendet werden soll:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Dieses `amp-img`-Element passt die Breite seines Containerelements automatisch an. Die Höhe wird automatisch entsprechend dem Seitenverhältnis festgelegt, das sich aus den gegebenen Werten für Breite und Höhe ergibt:

<amp-img src="/static/img/docs/responsive_amp_img.png" width="500" height="857">
</amp-img>

Weitere Informationen finden Sie unter ["amp-img" bei AMP by Example](https://ampbyexample.com/components/amp-img/).

## Seite mit Stilen versehen

Fügen Sie alle Stile im `<style amp-custom>`-Tag im head-Abschnitt des Dokuments hinzu.
Beispiel:

[sourcecode:html]
<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
[/sourcecode]

**Wichtig:** Achten Sie darauf, dass Ihre Seite nur ein `<style amp-custom>`-Tag enthält. Mehr ist in AMP nicht zulässig.

Definieren Sie Komponentenstile mit class- oder element-Selektoren unter Verwendung gebräuchlicher CSS-Eigenschaften. Beispiel:

[sourcecode:html]
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

**Wichtig:** Prüfen Sie, ob Ihre Stile in AMP unterstützt werden. Bei einigen Stilen ist dies aus Leistungsgründen nicht der Fall. Weitere Informationen finden Sie unter [Unterstützte CSS-Stile](/de/docs/guides/responsive/style_pages.html).

## Größe und Position von Elementen festlegen

AMP entkoppelt das Dokumentlayout vom Laden der Ressourcen, damit AMP das Layout der Seite laden kann, ohne auf Ressourcendownloads warten zu müssen.

Geben Sie mithilfe der Attribute `width` und `height` Größe und Position aller sichtbaren AMP-Elemente an.
Aus diesen Attributen ergibt sich das Seitenverhältnis des Elements, das dann mit dem Container skaliert werden kann.

Legen Sie das Layout als responsiv fest.
Dadurch wird die Breite des Elements an die Breite des Containerelements angepasst. Seine Höhe wird automatisch entsprechend dem Seitenverhältnis festgelegt, dass sich aus den width- und height-Attributen ergibt.

Weitere Informationen finden Sie unter [Unterstützte Layouts in AMP](/de/docs/guides/responsive/control_layout.html).

## Stile und Layout überprüfen

Mit dem AMP-Validierungstool können Sie die CSS- und Layoutwerte Ihrer Seite testen.

Das Validierungstool bestätigt, dass der CSS-Code Ihrer Seite nicht die Beschränkung von 50.000 Byte überschreitet, sucht nach unzulässigen Stilen und prüft, ob das Layout der Seite unterstützt wird und korrekt formatiert ist.
[Hier finden Sie die vollständige Liste der Stil- und Layoutfehler.](/de/docs/reference/validation_errors.html#stil--und-layoutfehler)

Beispiel für einen Fehler in der Konsole bei einer Seite mit CSS-Code, der die Beschränkung von 50.000 Byte überschreitet:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

[Hier finden Sie weitere Informationen zum Überprüfen von AMP-Seiten](/de/docs/guides/debug/validate.html), einschließlich des Auffindens und Behebens von Stilfehlern.
