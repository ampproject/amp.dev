---
'$title': Karussells hinzufügen
$order: 3
description: Karussells sind ein verbreitetes Feature auf mobilen Seiten. Mit der Komponente amp-carousel kannst du mühelos Karussells zu AMP Seiten hinzufügen.
---

Karussells sind ein verbreitetes Feature auf mobilen Seiten. Mit der Komponente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) kannst du mühelos Karussells zu AMP Seiten hinzufügen. Beginnen wir mit einem einfachen Beispiel: einem Bilderkarussell.

## Einfaches Bilderkarussell

Vergiss nicht, die Bibliothek für die Komponente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) einzufügen, indem du die folgende JavaScript Anforderung zum Tag `<head>` deines Dokuments **hinzufügst**:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
```

Jetzt können wir ein einfaches Bilderkarussell mit einem responsiven Layout und einer vordefinierten Breite und Höhe einbetten. Dazu musst du deiner Seite Folgendes **hinzufügen**:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel">
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**Refresh** your page and you should see a carousel:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Simple images carousel') }}

Die Komponente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) kann auf verschiedene Arten konfiguriert werden. Passen wir die Benutzeroberfläche so an, dass jeweils nur ein Bild angezeigt wird und das Layout des Karussells responsiv wird.

<strong>Ändere</strong> dazu zunächst das Attribut <code>type</code> von <a><code data-md-type="codespan">amp-carousel</code></a> von `carousel` zu <code>slides</code>. **Ändere** auch das `layout` zu `responsive` und **ändere den Wert** von `width` zu 300 (sowohl `height` als auch `width` müssen definiert sein). Anschließend solltest du das Attribut <code>"layout=responsive"</code> zu den untergeordneten Elementen <a><code>amp-img</code></a> von <a><code>amp-carousel</code></a> <strong>hinzufügen</strong>.

**Lade** deine Seite neu. Anstelle einer scrollenden Liste von Elementen siehst du jetzt jeweils nur ein Element. Du kannst horizontal **wischen**, um durch die Elemente zu blättern. Sobald du beim dritten Element angekommen bist, kannst du nicht weiter blättern.

Next, **add** the `loop` attribute. **Refresh** the page and try swiping to the left immediately. The carousel loops endlessly.

Richten wir das Karussell schließlich so ein, dass es alle 2 Sekunden automatisch weiterläuft. **Füge** zu [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) die Attribute `autoplay` und `delay` mit dem Wert `2000` hinzu (also `delay="2000"`).

Dein Endergebnis sollte ungefähr so aussehen:

```html
<amp-carousel
  layout="responsive"
  width="300"
  height="168"
  type="slides"
  autoplay
  delay="2000"
  loop
>
  <amp-img
    src="mountains-1.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-2.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-3.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
</amp-carousel>
```

**Aktualisiere** die Seite und teste das Karussell!

[tip type="note"] **HINWEIS:** Vielleicht ist dir aufgefallen, dass wir als Layouttyp `fixed-height` verwendet haben, als [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) den Typ `carousel` besaß. Die unterstützten Layouttypen für den Typ `carousel` sind begrenzt; so unterstützt der Typ `carousel` z. B. nicht das Layout `responsive`. Wie der Name schon sagt, nehmen Elemente mit fester Höhe den ihnen zur Verfügung stehenden Platz ein, wobei ihre Höhe aber unverändert bleibt. Für Elemente mit fester Höhe musst du das Attribut `height` definieren, während das Attribut `width` entweder den Wert `auto` erhält oder gar nicht definiert wird. [/tip]

## Karussell mit gemischten Inhalten

Bilderkarusselle sind großartig, aber was, wenn wir komplexere Inhalte in unserem Karussell haben wollen? Bringen wir etwas Abwechslung hinein, indem wir eine Ad, Text und ein Bild in einem einzigen Karussell platzieren. Wird [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) mit dieser bunten Mischung wirklich fertig? Na klar!

Zunächst solltest du diesen Stil zu deinem `<style amp-custom>` **hinzufügen**, um sicherzustellen, dass die Komponenten [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) und [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) problemlos zusammenarbeiten:

```css
amp-fit-text {
  white-space: normal;
}
```

**Ersetze** nun dein einfaches Karussell durch Folgendes:

```html
<amp-carousel layout="fixed-height" height="250" type="carousel">
  <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

  <amp-ad
    width="300"
    height="250"
    type="doubleclick"
    data-slot="/35096353/amptesting/image/static"
  >
    <div placeholder>This ad is still loading.</div>
  </amp-ad>

  <amp-fit-text width="300" height="250" layout="fixed">
    Big, bold article quote goes here.
  </amp-fit-text>
</amp-carousel>
```

**Aktualisiere** die Seite. Jetzt solltest du so etwas Ähnliches sehen:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='Ein Karussell mit gemischten Inhalten') }}

Weitere Informationen dazu findest du in der Referenzdokumentation zur Komponente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[tip type="note"] **HINWEIS:** In unserem letzten Beispiel ist dir vielleicht aufgefallen, dass die Komponente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) ein untergeordnetes Element `div` mit dem Attribut `placeholder` enthält. Zu Beginn des Tutorials hatten wir ein ähnliches Szenario mit [`amp-ad`](../../../../documentation/components/reference/amp-ad.md), als wir `fallback` verwendeten. Was ist der Unterschied zwischen "placeholder" und "fallback"? Die Elemente `fallback` werden angezeigt, wenn das übergeordnete Element nicht geladen werden kann, d. h. wenn keine Ad verfügbar ist. Die Elemente `placeholder` werden anstelle des übergeordneten Elements angezeigt, während dieses geladen wird. In gewisser Weise bilden diese Elemente eine Stütze während des Ladevorgangs des übergeordneten Elements. Weitere Informationen dazu findest du im Leitfaden [Platzhalter & Fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]
