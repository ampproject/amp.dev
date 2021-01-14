---
"$title": Layout & Medienabfragen
"$order": '1'
description: AMP unterstützt sowohl Medienabfragen als auch Elementabfragen und verfügt über eine leistungsstarke, integrierte Methode zur Steuerung des Layouts einzelner Elemente. Das Attribut layout macht …
formats:
- websites
- email
- ads
- stories
author: Meggin
contributors:
- pbakaus
---

AMP unterstützt sowohl **Medienabfragen** als auch **Elementabfragen** und verfügt über eine leistungsstarke, integrierte Methode zur Steuerung des **Layouts** einzelner Elemente. Im Vergleich zur ausschließlichen Verwendung von CSS macht das Attribut `layout` es erheblich einfacher, ein responsives Design zu erstellen und damit zu arbeiten.

## Responsive Bilder leicht gemacht

Erstelle wie folgt responsive Bilder: Gib `width` und `height` an, setze das Layout auf `responsive` und lege durch [`srcset`](art_direction.md) fest, welches Bildobjekt auf unterschiedlichen Bildschirmgrößen verwendet werden soll:

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

Dieses [`amp-img`](../../../../documentation/components/reference/amp-img.md) Element passt sich automatisch der Breite seines Containerelements an und seine Höhe wird automatisch auf das Seitenverhältnis eingestellt, das durch die vorgegebene Breite und Höhe bestimmt ist. Probiere es aus, indem du die Größe dieses Browserfensters änderst:

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

[tip type="tip"] **TIPP:** Sieh dir unsere Side-by-Side Live Demos zu [`amp-img`](../../../../documentation/components/reference/amp-img.md) an: [Live Demos bei AMP By Example](../../../../documentation/examples/documentation/amp-img.html?format=websites). [/tip]

## Das Attribut "layout"<a name="the-layout-attribute"></a>

Mit dem Attribut `layout` kannst du ganz einfach steuern, wie ein bestimmtes Element auf dem Bildschirm gerendert werden soll. Viele dieser Dinge sind auch mit reinem CSS machbar – aber sie sind viel schwieriger und erfordern eine Vielzahl von Hacks. Verwende stattdessen das Attribut `layout`.

### Unterstützte Werte für das Attribut `layout`

Die folgenden Werte können im Attribut `layout` verwendet werden:

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-thirty">Typ des Layouts</th>
      <th data-th="Width/height required" class="col-twenty">Breite/<br>Höhe erforderlich</th>
      <th data-th="Behavior">Verhalten</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type"><code>nodisplay</code></td>
      <td data-th="Description">Nein</td>
      <td data-th="Behavior">Das Element wird nicht angezeigt. Dieses Layout kann auf jedes AMP Element angewendet werden. Die Komponente nimmt auf dem Bildschirm keinen Platz ein, als hätte sie keinen Display Style. Es wird angenommen, dass sich das Element bei einer Benutzeraktion selbst anzeigen kann (z. B. <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>).</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed</code></td>
      <td data-th="Description">Ja</td>
      <td data-th="Behavior">Das Element hat eine feste Breite und Höhe. Responsivität wird nicht unterstützt. Die einzigen Ausnahmen sind die Elemente <a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> und <a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>responsive</code></td>
      <td data-th="Description">Ja</td>
      <td data-th="Behavior">Das Element wird an die Breite seines Containerelements angepasst und seine Höhe automatisch an das Seitenverhältnis, das durch die Attribute width und height angegeben ist. Dieses Layout funktioniert für die meisten AMP Elemente sehr gut, einschließlich <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> und <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>. Der verfügbare Platz ist vom übergeordneten Element abhängig und kann auch mithilfe der CSS Eigenschaft <code>max-width</code> angepasst werden.<p><strong>Hinweis</strong>: Elemente mit <code>"layout=responsive"</code> haben keine intrinsische Größe. Die Größe des Elements wird von seinem Containerelement bestimmt. Um sicherzustellen, dass dein AMP Element angezeigt wird, musst du eine Breite und Höhe für das enthaltende Element angeben. Gib für das enthaltende Element nicht <code>"display:table"</code> an, da dies die Anzeige des AMP Elements überschreibt und das AMP Element unsichtbar macht.</p>
</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed-height</code></td>
      <td data-th="Description">Nur Höhe</td>
      <td data-th="Behavior">Das Element nimmt den verfügbaren Platz ein, behält jedoch eine unveränderte Höhe bei. Dieses Layout eignet sich gut für Elemente wie <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a>, bei denen der Inhalt horizontal positioniert ist. Das Attribut <code>width</code> darf nicht vorhanden sein oder muss den Wert <code>auto</code> haben.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fill</code></td>
      <td data-th="Description">Nein</td>
      <td data-th="Behavior">Das Element nimmt den verfügbaren Platz ein, sowohl Breite als auch Höhe. Mit anderen Worten: Das Layout eines Füllelements entspricht dem übergeordneten Element. Damit ein Element seinen übergeordneten Container füllen kann, musst du sicherstellen, dass der übergeordnete Container "position:relative" oder "position:absolute" angibt.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>container</code></td>
      <td data-th="Description">Nein</td>
      <td data-th="Behavior">Untergeordnete Elemente können die Größe des Elements definieren, ähnlich wie ein normales HTML <code>div</code>. Es wird angenommen, dass die Komponente selbst kein bestimmtes Layout hat, sondern nur als Container agiert. Seine untergeordneten Elemente werden sofort gerendert.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>flex-item</code></td>
      <td data-th="Description">Nein</td>
      <td data-th="Behavior">Das Element und andere Elemente in seinem übergeordneten Element nehmen den verbleibenden Platz des übergeordneten Containers ein, wenn das übergeordnete Element ein flexibler Container ist (d. h. <code>display:flex</code>). Die Elementgröße wird durch das übergeordnete Element und die Anzahl der anderen Elemente im übergeordneten Element bestimmt (gemäß dem CSS Layout <code>display:flex</code>).</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>intrinsic</code></td>
      <td data-th="Description">Ja</td>
      <td data-th="Behavior">Das Element nimmt den verfübaren Platz ein und passt seine Höhe automatisch an das Seitenverhältnis an, das durch die Attribute <code>width</code> und <code>height</code> vorgegeben ist, <em>bis</em> es die natürliche Größe des Elements oder eine CSS Einschränkung (z. B. max-width) erreicht. Die Attribute width und height müssen vorhanden sein. Dieses Layout funktioniert für die meisten AMP Elemente sehr gut, einschließlich <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>, <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a> usw. Der verfügbare Platz hängt vom übergeordneten Element ab und kann auch mithilfe der CSS Eigenschaft <code>max-width</code> angepasst werden. Dieses Layout unterscheidet sich von <code>responsive</code> durch eine intrinsische Höhe und Breite. Am deutlichsten ist dies an einem schwebenden Element zu erkennen, bei dem das Layout <code>responsive</code> die Größe als 0x0 rendert und das Layout <code>intrinsic</code> eine Vergrößerung auf die kleinste natürliche Größe oder auf die CSS Einschränkung bewirkt.</td>
    </tr>
  </tbody>
</table>

[tip type="tip"] **TIP**: Besuche die [Seite Demonstration von AMP Layouts](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html), um zu sehen, wie die verschiedenen Layouts auf eine Größenänderung des Bildschirms reagieren. [/tip]

### Was, wenn Breite und Höhe nicht definiert sind? <a name="what-if-width-and-height-are-undefined"></a>

[tip type="tip"] **TIPP:** Besuche die Seite [Demonstration von AMP Layouts](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html), um zu sehen, wie die verschiedenen Layouts auf eine Größenänderung des Bildschirms reagieren. [/tip]

- [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md): Breite und Höhe werden standardmäßig auf 0 gesetzt.
- [`amp-audio`](../../../../documentation/components/reference/amp-audio.md): Die standardmäßige Breite und Höhe werden vom Browser abgeleitet.

### Was, wenn das Attribut <code>layout</code> nicht angegeben ist? <a name="what-if-the-layout-attribute-isnt-specified"></a>

Wenn das Attribut <code>layout</code> nicht angegeben ist, versucht AMP, den entsprechenden Wert abzuleiten oder zu schätzen:

<table>
  <thead>
    <tr>
      <th data-th="Rule">Regel</th>
      <th data-th="Inferred layout" class="col-thirty">Abgeleitetes Layout</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule"> <code>height</code> ist vorhanden und <code>width</code> fehlt oder entspricht <code>auto</code>
</td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule"> Die Attribute <code>width</code> oder <code>height</code> und das Attribut <code>sizes</code> sind vorhanden</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Die Attribute <code>width</code> und <code>height</code> sind vorhanden</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule"> <code>width</code> und <code>height</code> fehlen</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## Verwendung von Medienabfragen

### CSS Medienabfragen

Verwende [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media), um zu steuern, wie das Seitenlayout aussieht und sich verhält – genau wie du es auf jeder anderen Website tun würdest. Wenn sich die Größe oder Ausrichtung des Browserfensters ändert, werden die Medienabfragen neu ausgewertet und Elemente werden basierend auf den neuen Ergebnissen ausgeblendet oder angezeigt.

[tip type="read-on"] **ERFAHRE MEHR:** Unter [Use CSS media queries for responsiveness](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en) erfährst du mehr darüber, wie das Layout durch Medienabfragen gesteuert wird. [/tip]

### Medienabfragen für Elemente <a name="element-media-queries"></a>

Ein zusätzliches Merkmal des responsiven Designs in AMP ist das Attribut `media`. Dieses Attribut kann für jedes AMP Element verwendet werden. Es funktioniert ähnlich wie Medienabfragen in deinem globalen Stylesheet, wirkt sich jedoch nur auf das jeweilige Element auf einer einzelnen Seite aus.

Hier haben wir zum Beispiel zwei Bilder mit sich gegenseitig ausschließenden Medienabfragen.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="527"
    height="355"
    layout="responsive">
</amp-img>
[/sourcecode]

Abhängig von der Bildschirmbreite wird das jeweils eine oder andere abgerufen und gerendert.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="466"
    height="193"
    layout="responsive">
</amp-img>
[/sourcecode]
