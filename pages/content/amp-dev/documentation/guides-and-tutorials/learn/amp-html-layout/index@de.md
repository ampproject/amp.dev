---
'$title': AMPHTML Layoutsystem
$order: 1
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: 'Überblick '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

## Überblick

Das Hauptziel des Layoutsystems besteht darin, sicherzustellen, dass AMP Elemente ihr Layout so ausdrücken können, dass die Runtime die Größe von Elementen ableiten kann, bevor Remote Ressourcen wie JavaScript und Datenaufrufe abgeschlossen wurden. Dies ist wichtig, um Sprünge und Verzögerungen beim Rendern und Scrollen erheblich zu reduzieren.

Vor diesem Hintergrund ist das AMP Layoutsystem so konzipiert, dass es nur wenige, aber dafür flexible Layouts unterstützt, die eine stabile Leistung garantieren können. Dieses System stützt sich auf eine Reihe von Attributen wie `layout`, `width`, `height`, `sizes` und `heights`, um das Layout und den Größenbedarf von Elementen auszudrücken.

## Verhalten <a name="behavior"></a>

Ein AMP Element, das kein Container ist (d. h. `layout != container`), wird im nicht aufgelösten/nicht erstellten Modus gestartet, in dem alle untergeordneten Elemente bis auf einen Platzhalter ausgeblendet sind (siehe `placeholder`). Selbst wenn das JavaScript und die Nutzdaten, die notwendig sind, um das Element vollständig zu konstruieren, noch heruntergeladen und initialisiert werden, kennt die AMP Runtime bereits die Größe und das Layout der Elemente, da sie sich auf die CSS Klassen und die Attribute `layout` , `width` , `height` und `media` beruft. In den meisten Fällen wird ein `placeholder` (falls angegeben) so dimensioniert und positioniert, dass er den gesamten Platz des Elements einnimmt.

Der `placeholder` wird ausgeblendet, sobald das Element erstellt und sein erstes Layout vollständig ist. Zu diesem Zeitpunkt wird erwartet, dass das Element alle untergeordneten Elemente ordnungsgemäß erstellt und positioniert hat und bereit ist, angezeigt zu werden und die Eingaben des Benutzers zu akzeptieren. Das ist das Standardverhalten. Jedes Element kann dieses Verhalten überschreiben, um beispielsweise `placeholder` schneller auszublenden oder länger anzuzeigen.

Bei der Größenberechnung und Darstellung des Elements orientiert sich die Runtime an den Attributen `layout`, `width`, `height` und `media`. Alle Layoutregeln werden intern über CSS implementiert. Man sagt, dass ein Element die "Größe definiert", wenn seine Größe über CSS Stile abgeleitet werden kann und sich nicht aufgrund seiner untergeordneten Elemente ändert: ob sofort verfügbar oder dynamisch eingefügt. Das bedeutet nicht, dass sich die Größe dieses Elements nicht ändern kann. Das Layout kann durchaus responsiv sein, so wie es bei Layouts vom Typ `responsive`, `fixed-height`, `fill` und `flex-item` der Fall ist. Es bedeutet lediglich, dass sich die Größe nicht ohne explizite Benutzeraktion ändert, z. B. beim Rendern, Scrollen oder nach einem Download.

Wenn das Element falsch konfiguriert wurde, wird es in PROD überhaupt nicht gerendert, und im DEV Modus rendert die Runtime das Element im Fehlerzustand. Zu möglichen Fehlern gehören ungültige oder nicht unterstützte Werte der Attribute `layout`, `width` und `height`.

## Layoutattribute <a name="layout-attributes"></a>

### `width` und `height` <a name="width-and-height"></a>

Je nach Wert des Attributs `layout` müssen die Elemente der AMP Komponente die Attribute `width` und `height` besitzen, die einen ganzzahligen Pixelwert enthalten. Das tatsächliche Layoutverhalten wird wie nachfolgend beschrieben durch das Attribut `layout` bestimmt.

Falls `width` oder `height` nicht angegeben sind, kann die AMP Runtime in einigen Fällen folgende Standardwerte für diese Attribute festlegen:

- `amp-pixel`: Sowohl `width` als auch `height` erhalten den Standardwert 0.
- `amp-audio`: Die Standardwerte für `width` und `height` werden vom Browser abgeleitet.

### `layout` <a name="layout"></a>

AMP stellt eine Auswahl an Layouts zur Verfügung, die festlegen, wie eine AMP Komponente sich im Layout des Dokuments verhält. Du kannst das Layout für eine Komponente angeben, indem du das Attribut `layout` mit einem der nachfolgend beschriebenen Layoutwerte für das Element hinzufügst.

**Beispiel**: Ein einfaches, responsives Bild, bei dem Breite und Höhe zur Bestimmung des Seitenverhältnisses verwendet werden.

[sourcecode:html]
<amp-img
src="/img/amp.jpg"
width="1080"
height="610"
layout="responsive"
alt="an image"

> </amp-img>
> [/sourcecode]

Unterstützte Werte für das Attribut `layout`:

<table>
  <thead>
    <tr>
      <th width="30%">Wert</th>
      <th>Verhalten und Anforderungen</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nicht vorhanden</td>
      <td>Wenn kein Wert angegeben wird, wird das Layout für die Komponente wie folgt abgeleitet:         <ul>           <li>Wenn <code>height</code> vorhanden ist und die <code>width</code> fehlt oder gleich <code>auto</code> gesetzt wurde, wird ein Layout vom Typ <code>fixed-height</code> angenommen. </li>           <li>Wenn <code>width</code> und <code>height</code> zusammen mit dem Attribut <code>sizes</code> oder <code>heights</code> vorhanden sind, wird ein Layout vom Typ <code>responsive</code> angenommen. </li>           <li>Wenn <code>width</code> und <code>height</code> vorhanden sind, wird ein Layout vom Typ <code>fixed</code> angenommen. </li>           <li> Wenn <code>width</code> und <code>height</code> fehlen, wird ein Layout vom Typ <code>container</code> angenommen. </li>         </ul>
</td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>Die Größe dieses Elements wird durch seine untergeordneten Elemente definiert, ähnlich wie bei einem gewöhnlichen HTML Container <code>div</code>. Es wird davon ausgegangen, dass die Komponente selbst kein bestimmtes Layout hat, sondern nur als Container fungiert. Seine untergeordneten Elemente werden sofort gerendert.</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Dieses Element nimmt den verfügbaren Platz ein, sowohl in der Breite als auch in der Höhe. Mit anderen Worten: Das Layout und die Größe eines Elements vom Typ <code>fill</code> entsprechen dem übergeordneten Element. Damit ein Element seinen übergeordneten Container ausfüllen kann, musst du als Layout "fill" angeben und sicherstellen, dass der übergeordnete Container die Eigenschaften <code>position:relative</code> oder <code>position:absolute</code> besitzt.</td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Das Element hat eine feste Breite und Höhe. Die Reaktionsfähigkeit wird nicht unterstützt. Die Attribute <code>width</code> und <code>height</code> müssen vorhanden sein. Die einzigen Ausnahmen sind die Elemente <code>amp-pixel</code> und <code>amp-audio</code>.</td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>Das Element nimmt den verfügbaren Platz ein, dabei bleibt die Höhe jedoch unverändert. Dieses Layout eignet sich gut für Elemente wie <code>amp-carousel</code>, bei denen der Inhalt horizontal positioniert ist. Das Attribut <code>height</code> muss vorhanden sein. Das Attribut <code>width</code> darf nicht vorhanden sein oder muss gleich <code>auto</code> sein.</td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>Das Element und andere Elemente in seinem übergeordneten Container mit dem Layouttyp <code>flex-item</code> nehmen den verbleibenden Platz des übergeordneten Containers ein, wenn der übergeordnete Container flexibel ist (d. h., <code>display: flex</code>). Die Attribute <code>width</code> und <code>height</code> sind nicht erforderlich.</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Das Element nimmt den ihm zur Verfügung stehenden Platz ein und passt seine Höhe automatisch an das Seitenverhältnis an, das durch die Attribute <code>width</code> und <code>height</code> vorgegeben wird, <em>bis</em> es die Größe des Elements erreicht, die durch die Attribute 'width' und 'height' definiert ist und an <code>amp-img</code> weitergegeben wird, oder bis es eine CSS Einschränkung wie 'max-width' erreicht. Die Attribute 'width' und 'height' müssen vorhanden sein. Dieses Layout eignet sich sehr gut für die meisten AMP Elemente, einschließlich <code>amp-img</code>, <code>amp-carousel</code> usw. Der verfügbare Platz hängt vom übergeordneten Element ab und kann auch mithilfe von CSS mit <code>max-width</code> angepasst werden. Dieses Layout unterscheidet sich von <code>responsive</code>, da es eine intrinsische Höhe und Breite hat. Das wird sehr deutlich bei einem schwebenden Element, bei dem ein Layout vom Typ <code>responsive</code> als 0x0 gerendert wird, während das Element bei einem Layout vom Typ <code>intrinsic</code> auf die kleinere Variante seiner natürlichen Größe oder auf die CSS Einschränkung vergrößert wird.</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>Das Element wird nicht angezeigt und nimmt keinen Platz auf dem Bildschirm ein, so als wäre sein Anzeigestil <code>none</code>. Dieses Layout kann auf jedes AMP Element angewendet werden. Es wird angenommen, dass sich das Element bei einer Benutzeraktion selbst anzeigen kann (z. B. <code>amp-lightbox</code>). Die Attribute <code>width</code> und <code>height</code> sind nicht erforderlich.</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Das Element nimmt den ihm verfügbaren Platz ein und passt seine Höhe automatisch an das durch die Attribute <code>width</code> und <code>height</code> vorgegebene Seitenverhältnis an. Dieses Layout eignet sich sehr gut für die meisten AMP Elemente, einschließlich <code>amp-img</code>, <code>amp-video</code> usw. Der verfügbare Platz hängt vom übergeordneten Element ab und kann mithilfe von CSS mit <code>max-width</code> angepasst werden. Die Attribute <code>width</code> und <code>height</code> müssen vorhanden sein. <p><strong>Hinweis</strong>: Elemente mit <code>"layout=responsive"</code> haben keine intrinsische Größe. Die Größe eines Elements wird von seinem Containerelement bestimmt. Um sicherzustellen, dass dein AMP Element angezeigt wird, musst du eine Breite und Höhe für das enthaltende Element angeben. Gib für das enthaltende Element nicht <code>"display:table"</code> an, da dies die Anzeige des AMP Elements überschreibt und das AMP Element unsichtbar macht.</p>
</td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

Alle AMP Elemente, die das Layout `responsive` unterstützen, unterstützen auch das Attribut `sizes`. Der Wert dieses Attributs ist ein Ausdruck vom Typ 'sizes' (wie unter [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) beschrieben), der jedoch nicht nur für Bilder, sondern für alle Elemente gilt. Kurz gesagt: Das Attribut `sizes` beschreibt, wie die Breite eines Elements in Abhängigkeit von den Medienbedingungen berechnet wird.

Wenn das Attribut `sizes` zusammen mit `width` und `height` angegeben wird, ist das `layout` standardmäßig `responsive`.

**Beispiel**: Verwendung des Attributs `sizes`

Im folgenden Beispiel gilt: Ist das Ansichtsfenster breiter als `320px`, so ist das Bild 320px breit. Andernfalls ist es 100vw breit (100 % der Breite des Ansichtsfensters).

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"

> </amp-img>
> [/sourcecode]

### `disable-inline-width` <a name="disable-inline-width"></a>

Das Attribut `sizes` allein legt einen Inlinestil mit `width` für das Element fest. Wenn `disable-inline-width` mit `sizes` kombiniert wird, gibt das AMP Element den Wert von `sizes` an das zugrunde liegende Tag des Elements weiter, genau wie bei einer Verschachtelung des Tags `img` innerhalb von `amp-img`, **ohne** dass der Inlinewert `width` festgelegt wird, so wie `sizes` allein das in der Regel in AMP macht.

**Beispiel**: Verwendung des Attributs `disable-inline-width`

Im folgenden Beispiel wird die Breite des Elements `<amp-img>` nicht beeinflusst, und `sizes` wird nur verwendet, um eine der Quellen aus `srcset` auszuwählen.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"
disable-inline-width

> </amp-img>
> [/sourcecode]

### `heights` <a name="heights"></a>

Alle AMP Elemente, die das Layout `responsive` unterstützen, unterstützen auch das Attribut `heights`. Der Wert dieses Attributs ist ein auf Medienausdrücken basierender Ausdruck vom Typ 'sizes', der dem [Attribut 'img sizes'](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) ähnlich ist, jedoch zwei wesentliche Unterschiede aufweist:

1. Er bezieht sich auf die Höhe, nicht auf die Breite des Elements.
2. Prozentwerte sind zulässig, z. B. `86%`. Wenn ein Prozentwert verwendet wird, gibt er den Prozentsatz der Elementbreite an.

Wenn das Attribut `heights` zusammen mit `width` und `height` angegeben wird, ist das `layout` standardmäßig `responsive`.

**Beispiel**: Verwendung des Attributs `heights`

Im folgenden Beispiel beträgt die Höhe des Bildes standardmäßig 80 % der Breite. Wenn das Ansichtsfenster jedoch breiter ist als `500px`, wird die Höhe auf `200px` begrenzt. Da das Attribut `heights` zusammen mit `width` und `height` angegeben wird, erhält das Layout den Standardwert `responsive`.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="320"
height="256"
heights="(min-width:500px) 200px, 80%"

> </amp-img>
> [/sourcecode]

### `media` <a name="media"></a>

Die meisten AMP Elemente unterstützen das Attribut `media`. Der Wert von `media` ist eine Medienabfrage (Media Query). Wenn die Abfrage nicht mit dem Wert übereinstimmt, wird das Element nicht gerendert und seine eigenen sowie etwaige untergeordnete Ressourcen werden nicht abgerufen. Wenn das Browserfenster die Größe oder Ausrichtung ändert, werden die Medienabfragen neu ausgewertet und Elemente werden basierend auf den neuen Ergebnissen ausgeblendet bzw. angezeigt.

**Beispiel**: Verwendung des Attributs `media`

Im folgenden Beispiel haben wir zwei Bilder mit sich gegenseitig ausschließenden Medienabfragen. Abhängig von der Bildschirmbreite wird eines der beiden Bilder abgerufen und gerendert. Das Attribut `media` ist in allen AMP Elementen verfügbar und kann deshalb mit Elementen verwendet werden, die keine Bilder sind, z. B. Ads.

[sourcecode:html]
<amp-img
media="(min-width: 650px)"
src="wide.jpg"
width="466"
height="355"
layout="responsive"

> </amp-img>
> <amp-img
>   media="(max-width: 649px)"
>   src="narrow.jpg"
>   width="527"
>   height="193"
>   layout="responsive"
> </amp-img>
> [/sourcecode]

### `placeholder` <a name="placeholder"></a>

Das Attribut `placeholder` kann nicht nur für AMP Elemente, sondern für jedes HTML Element verwendet werden. Das Attribut `placeholder` gibt an, dass das mit diesem Attribut gekennzeichnete Element als Platzhalter für das übergeordnete AMP Element fungiert. Wird ein Platzhalter angegeben, so muss er dem AMP Element direkt untergeordnet sein. Standardmäßig wird der Platzhalter für das AMP Element sofort angezeigt, selbst wenn die Ressourcen des AMP Elements noch nicht heruntergeladen oder initialisiert wurden. Sobald das AMP Element bereit ist, verbirgt es in der Regel seinen Platzhalter und zeigt den eigentlichen Inhalt an. Das genaue Verhalten in Bezug auf den Platzhalter hängt von der Implementierung des Elements ab.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
<amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

Das Attribut `fallback` kann nicht nur für AMP Elemente, sondern für jedes HTML Element verwendet werden. Ein Fallback ist eine Konvention, mit der ein Element dem Benutzer mitteilen kann, dass der Browser das Element nicht unterstützt. Wird ein Fallback Element angegeben, so muss es dem AMP Element direkt untergeordnet sein. Das genaue Verhalten in Bezug auf das Fallback hängt von der Implementierung des Elements ab.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">

  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

Das Attribut `noloading` gibt an, ob die Ladeanzeige für dieses Element deaktiviert sein soll. Viele AMP Elemente lassen die Anzeige eines Ladeindikators zu. Das ist eine Standardanimation, die zeigt, dass ein Element noch nicht vollständig geladen ist. Mithilfe dieses Attributs können Elemente ein solches Verhalten unterbinden.

## (tl;dr) Überblick über die Anforderungen und das Verhalten der Layouts <a name="tldr-summary-of-layout-requirements--behaviors"></a>

In der folgenden Tabelle sind die zulässigen Parameter, CSS Klassen und Stile beschrieben, die für das Attribut `layout` verwendet werden. Bitte beachte:

1. Alle CSS Klassen mit `-amp-` sowie Elemente mit `i-amp-` als Präfix gelten als AMP intern. Ihre Verwendung in benutzerdefinierten Stylesheets ist nicht zulässig. Sie werden hier nur zu Informationszwecken angezeigt.
2. Selbst wenn `width` und `height` in der Tabelle als 'erforderlich' angegeben sind, gelten möglicherweise die Standardregeln (wie dies bei `amp-pixel` und `amp-audio` der Fall ist).

<table>
  <thead>
    <tr>
      <th width="21%">Layout</th>
      <th width="20%">Width/<br>Height erforderlich?</th>
      <th width="20%">Definiert Größe?</th>
      <th width="20%">Zusätzliche Elemente</th>
      <th width="19%">CSS "display"</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>Nein</td>
      <td>Nein</td>
      <td>Nein</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Nein</td>
      <td>Ja, Größe des übergeordneten Elements.</td>
      <td>Nein</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Ja</td>
      <td>Ja, angegeben durch <code>width</code> und <code>height</code>.</td>
      <td>Nein</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>Nur <code>height</code>; <code>width</code> kann <code>auto</code> sein.</td>
      <td>Ja, angegeben durch den übergeordneten Container und <code>height</code>.</td>
      <td>Nein</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>Nein</td>
      <td>Nein</td>
      <td>Ja, basierend auf dem übergeordneten Container.</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Ja</td>
      <td>Ja, basierend auf dem übergeordneten Container und dem Seitenverhältnis von <code>width:height</code>.</td>
      <td>Ja, <code>i-amphtml-sizer</code>.</td>
      <td>
<code>block</code> (verhält sich wie ein <a rel="nofollow" href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element">ersetztes Element</a> )</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>Nein</td>
      <td>Nein</td>
      <td>Nein</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Ja</td>
      <td>Ja, basierend auf dem übergeordneten Container und dem Seitenverhältnis von <code>width:height</code>.</td>
      <td>Ja, <code>i-amphtml-sizer</code>.</td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>
