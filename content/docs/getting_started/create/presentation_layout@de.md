---
$title: Stil und Layout anpassen
---

## Stil anpassen

AMPs sind Webseiten, das heißt, der Stil der Seite und ihrer Elemente wird mithilfe allgemeiner CSS-Eigenschaften bearbeitet. Elemente mit Klassen- oder Elementselektoren können Sie in einem Inline-Stylesheet innerhalb des `<head>`-Elements anpassen. Dieses Stylesheet heißt `<style amp-custom>`:

[sourcecode:html]
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
[/sourcecode]

Jede AMP-Seite darf nur über ein einziges eingebettetes Stylesheet verfügen und bestimmte Selektoren dürfen nicht verwendet werden. [Weitere Informationen zu Stylesheets](/de/docs/guides/responsive/style_pages.html)

## Layout anpassen

Für das Layout von Elementen auf der AMP-Seite gelten strengere Regeln. Auf einer normalen HTML-Seite verwenden Sie für das Layout von Elementen fast ausschließlich CSS. Aus Leistungsgründen müssen jedoch bei AMP alle Elemente von Anfang an eine eindeutige Größe besitzen.

Mehr über das Rendering und Layout von AMP-Seiten und darüber, wie Sie das Layout bearbeiten können, erfahren Sie [im Artikel zu den unterstützten Layouts](/de/docs/guides/responsive/control_layout.html).

<div class="prev-next-buttons">
  <a class="button prev-button" href="/de/docs/tutorials/create/include_image.html"><span class="arrow-prev">Bisherige</span></a>
  <a class="button next-button" href="/de/docs/tutorials/create/preview_and_validate.html"><span class="arrow-next">Nächster</span></a>
</div>
