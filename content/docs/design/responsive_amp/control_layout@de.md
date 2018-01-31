---
$title: Unterstützte Layouts
---

Sie können Ihre Elemente responsiv machen, indem Sie `layout` einschließen.

[TOC]

## Unterstützte Werte für layout-Attribut

Verwenden Sie standardmäßig responsive Layouts.

Hier eine vollständige Liste der unterstützten Werte für das layout-Attribut:

<table>
  <thead>
    <tr>
      <th class="col-twenty" data-th="Layout type">Layouttyp</th>
      <th class="col-twenty" data-th="Width/height required">Breite/Höhe erforderlich</th>
      <th data-th="Behavior">Verhalten</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>nodisplay</code></td>
      <td class="col-twenty" data-th="Description">Nein</td>
      <td data-th="Behavior">Das Element wird nicht angezeigt. Dieses Layout kann auf jedes AMP-Element angewendet werden. Die Komponente beansprucht keinen Platz auf dem Bildschirm, d. h., sie verhält sich, als ob ihr Anzeigestil "none" lauten würde. Es wird angenommen, dass sich das Element bei einer Nutzeraktion selbst anzeigen kann. Beispiel: <a href="/docs/reference/extended/amp-lightbox.html"><code>amp-lightbox</code></a></td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed</code></td>
      <td class="col-twenty" data-th="Description">Ja</td>
      <td data-th="Behavior">Das Element hat eine feste Breite und Höhe und kann nicht als responsiv festgelegt werden. Ausgenommen hiervon sind nur die Elemente <a href="/docs/reference/amp-pixel.html"><code>amp-pixel</code></a> und <a href="/docs/reference/extended/amp-audio.html"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>responsive</code></td>
      <td class="col-twenty" data-th="Description">Ja</td>
      <td data-th="Behavior">Die Breite des Elements wird an die Breite des Containerelements angepasst. Seine Höhe wird automatisch entsprechend dem Seitenverhältnis festgelegt, das sich aus den width- und height-Attributen ergibt. Dieses Layout funktioniert sehr gut mit den meisten AMP-Elementen einschließlich <a href="/docs/reference/amp-img.html"><code>amp-img</code></a> und <a href="/docs/reference/amp-video.html"><code>amp-video</code></a>. Der verfügbare Platz hängt vom übergeordneten Element ab und kann außerdem mittels <code>max-width</code>-CSS angepasst werden.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed-height</code></td>
      <td class="col-twenty" data-th="Description">Nur Höhe</td>
      <td data-th="Behavior">Das Element nimmt den verfügbaren Platz ein, aber die Höhe bleibt unverändert. Dieses Layout eignet sich gut für Elemente wie <a href="/docs/reference/extended/amp-carousel.html"><code>amp-carousel</code></a>, bei dem Inhalt horizontal positioniert wird. Das <code>width</code>-Attribut darf nicht vorkommen oder muss auf <code>auto</code> gesetzt sein.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fill</code></td>
      <td class="col-twenty" data-th="Description">Nein</td>
      <td data-th="Behavior">Das Element nimmt den für Breite und Höhe verfügbaren Platz ein. Das Layout eines fill-Elements stimmt also mit dem seines übergeordneten Elements überein.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>container</code></td>
      <td class="col-twenty" data-th="Description">Nein</td>
      <td data-th="Behavior">Die Größe der untergeordneten Elemente des Elements kann wie bei einem normalen HTML-<code>div</code>-Element definiert werden. Es wird angenommen, dass die Komponente selbst kein bestimmtes Layout hat, sondern nur als Container fungiert. Seine untergeordneten Elemente werden sofort gerendert.</td>
    </tr>
  </tbody>
</table>

### Was passiert, wenn Breite und Höhe nicht definiert sind?

In einigen Fällen, in denen `width` oder `height` nicht angegeben sind, kann die AMP-Laufzeit diese Werte standardmäßig wie folgt festlegen:

* [`amp-pixel`](/docs/reference/amp-pixel.html): Breite und Höhe erhalten standardmäßig den Wert 0.
* [`amp-audio`](/docs/reference/extended/amp-audio.html): Die Standardwerte für Breite und Höhe werden vom Browser abgeleitet.

### Was passiert, wenn das layout-Attribut nicht definiert ist?

Das Layoutverhalten wird wie folgt bestimmt:

* Wenn `height` vorhanden ist und `width` fehlt oder auf `auto` gesetzt ist, wird von einem `fixed-height`-Layout ausgegangen.
* Wenn das `width`- oder `height`-Attribut zusammen mit dem `sizes`-Attribut vorkommt, wird ein `responsive`-Layout angenommen.
* Wenn das `width`- oder `height`-Attribut vorhanden ist, wird von einem `fixed`-Layout ausgegangen.
* Wenn `width` und `height` fehlen, wird ein `container`-Layout angenommen.

## Verwendung von @media und media

Mittels [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) können Sie wie bei jeder anderen Website festlegen, wie das Seitenformat aussehen und sich verhalten soll.
Wenn sich die Größe oder Ausrichtung des Browserfensters ändert, werden die Medienabfragen neu ausgewertet und die Elemente werden entsprechend den neuen Ergebnissen ausgeblendet oder angezeigt.

Weitere Informationen zur Steuerung des Layouts durch Anwenden von Medienabfragen finden Sie unter [CSS-Medienabfragen für Responsivität verwenden](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=de).

Eine zusätzliche Funktion für das in AMP verfügbare Responsive Webdesign ist das `media`-Attribut.
Dieses Attribut kann mit jedem AMP-Element verwendet werden. Es funktioniert ähnlich wie Medienabfragen in Ihrem globalen Stylesheet, wirkt sich aber nur auf einer einzigen Seite auf das konkrete Element aus.

Im folgenden Beispiel haben wir zwei Bilder mit sich gegenseitig ausschließenden Medienabfragen.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive" >
</amp-img>
[/sourcecode]

In Abhängigkeit von der Bildschirmbreite wird entweder das eine oder das andere Bild abgerufen und gerendert.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive" >
</amp-img>
[/sourcecode]

## srcset und sizes verwenden

Mit dem `srcset`-Attribut können Sie die Assets eines Elements basierend auf unterschiedlichen Medienausdrücken steuern.
Verwenden Sie es insbesondere für alle [`amp-img`](/docs/reference/amp-img.html)-Tags, um anzugeben, welche Bild-Assets je nach Bildschirmgröße verwendet werden sollen.

In diesem einfachen Beispiel wird mit `srcset` angegeben, welches Bild je nach Bildschirmbreite verwendet werden soll.
Mit dem `w`-Deskriptor wird dem Browser die Breite der einzelnen Bilder in der Liste mitgeteilt:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w >
</amp-img>
[/sourcecode]

**Hinweis:** AMP unterstützt den `w`-Deskriptor in allen Browsern.

Weitere Informationen zum Erstellen responsiver Bilder mittels `srcset` finden Sie unter [Using Responsive Images (Now)](http://alistapart.com/article/using-responsive-images-now).

Sie können auch das `sizes`-Attribut zusammen mit `srcset` verwenden.
Mit dem `sizes`-Attribut wird beschrieben, wie die Elementgröße basierend auf einem Medienausdruck berechnet wird.
Je nach der berechneten Größe des Elements wählt der User-Agent die am besten passende Quelle aus, die vom `srcset`-Attribut bereitgestellt wird.

Betrachten Sie das folgende Beispiel:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w
    sizes="(min-width: 650px) 50vw, 100vw" >
</amp-img>
[/sourcecode]

Die Breite des Elements wird durch das `sizes`-Attribut als 50 % der Größe des Darstellungsbereichs definiert, wenn dieser 650 px oder mehr beträgt.
Wenn der Darstellungsbereich z. B. 800 px groß ist, wird die Breite des Elements auf 400 px gesetzt.
Der Browser wählt dann die passende `srcset`-Ressource für 400 px aus. Unter der Annahme, dass das Gerätepixelverhältnis 1 beträgt, ist das in diesem Fall `narrow.jpg` (320 px).

**Wichtig:** Wenn das sizes-Attribut zusammen mit Breite und Höhe angegeben wird, wird das Layout standardmäßig auf `responsive` gesetzt.

Weitere Informationen zur Verwendung der Attribute `sizes` und `srcset` bei Medienabfragen finden Sie in diesem Blogpost zu [srcset und sizes](https://ericportis.com/posts/2014/srcset-sizes/).

## Platzhalter und Fallbacks einschließen

### placeholder

Das mit dem `placeholder`-Attribut gekennzeichnete Element fungiert als Platzhalter für das übergeordnete AMP-Element.
Bei Angabe eines `placeholder`-Elements muss dieses dem AMP-Element direkt untergeordnet sein.

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive" >
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

Standardmäßig wird der Platzhalter für das AMP-Element sofort angezeigt, auch wenn die Ressourcen des AMP-Elements nicht heruntergeladen oder initialisiert wurden.
Wenn das AMP-Element bereit ist, blendet es in der Regel seinen Platzhalter aus und zeigt den Inhalt an.

**Hinweis:** Der Platzhalter braucht kein AMP-Element zu sein. Jedes HTML-Element kann als Platzhalter fungieren.

### fallback

Mit dem `fallback`-Attribut können Sie das Fallback-Verhalten für jedes Element festlegen, das vom Browser nicht unterstützt wird.
So können Sie z. B. dem Nutzer mithilfe des `fallback`-Attributs mitteilen, dass eine bestimmte Funktion vom Browser nicht unterstützt wird:

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg" >
  <div fallback>
        <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

Das `fallback`-Attribut kann für jedes HTML-Element und nicht nur für AMP-Elemente festgelegt werden.
Bei Angabe des `fallback`-Elements muss dieses dem AMP-Element direkt untergeordnet sein.

### noloading

Viele AMP-Elemente wurden auf die weiße Liste für das Einblenden einer "Ladeanzeige" gesetzt. Diese Anzeige ist eine einfache Animation, die darauf hinweist, dass das Element noch nicht vollständig geladen wurde.
Durch Hinzufügen des `noloading`-Attributs kann dieses Verhalten für Elemente deaktiviert werden.
