---
"$title": Allgemeine Elementattribute
"$order": '1'
description: AMP bietet eine Reihe allgemeiner Attribute, die in vielen AMP Komponenten (und HTML Elementen) eingesetzt werden können. Dieses Dokument beschreibt jedes der allgemeinen Attribute.
toc: 'true'
---

AMP bietet eine Reihe allgemeiner Attribute, die in vielen AMP Komponenten (und HTML Elementen) eingesetzt werden können. Dieses Dokument beschreibt jedes der allgemeinen Attribute.

## fallback

Ein Fallback ist eine Konvention, mit deren Hilfe ein Element dem Leser mitteilen kann, dass der Browser das Element nicht unterstützt oder dass das Laden der Basisressource fehlgeschlagen ist. Das Attribut `fallback` kann für jedes HTML Element verwendet werden, das ein direktes untergeordnetes Element eines AMP Elements ist, welches Fallbacks unterstützt. Das genaue Verhalten in Bezug auf das Fallback hängt von der Implementierung des Elements ab, aber in der Regel wird das Fallback Element anstelle des regulären Elements angezeigt.

Wird häufig verwendet mit: Bildern, Animationen, Audio und Videos

Beispiel:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive" >
  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
```

Weitere Informationen dazu findest du unter [Platzhalter und Fallbacks](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## heights

Alle AMP Elemente, die das Layout `responsive` unterstützen, unterstützen auch das Attribut `heights`. Der Wert dieses Attributs ist ein Ausdruck vom Typ "sizes", der auf Ausdrücken vom Typ "media" basiert, ähnlich dem [Attribut "sizes" für Tags vom Typ `img`,](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) jedoch mit zwei Hauptunterschieden:

1. Der Wert bezieht sich auf die Höhe, nicht auf die Breite des Elements.
2. Prozentwerte sind zulässig. Ein Prozentwert gibt den Prozentsatz der Breite des Elements an. Ein Wert von `80%` gibt beispielsweise an, dass die Höhe des Elements 80 % der Breite des Elements beträgt.

Hinweis: Wenn das Attribut `heights` zusammen mit `width` und `height` angegeben wird, wird das Attribut `layout` standardmäßig auf `responsive` gesetzt.

Beispiel:

```html
<amp-img src="amp.png"
    width="320" height="256"
    heights="(min-width:500px) 200px, 80%">
</amp-img>
```

Weitere Informationen dazu findest du unter [Art Direction mit srcset, sizes und heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## layout

AMP stellt eine Auswahl an [Layouts](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) zur Verfügung, die festlegen, wie eine AMP Komponente sich im Layout des Dokuments verhält. Du kannst das Layout für eine Komponente angeben, indem du das Attribut `layout` mit einem der unterstützten Layoutwerte für das Element hinzufügst (die unterstützten Werte findest du in der Dokumentation zum Element).

Beispiel:

```html
<amp-img src="/img/amp.jpg"
    width="1080"
    height="610"
    layout="responsive"
    alt="an image">
</amp-img>
```

Weitere Informationen dazu findest du unter [Layout & Media Queries](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) und [Layoutspezifikationen](amp-html-layout/index.md).

## media <a name="media"></a>

Die meisten AMP Elemente unterstützen das Attribut `media`. Der Wert von `media` ist eine Medienabfrage (Media Query). Wenn die Abfrage nicht mit dem Wert übereinstimmt, wird das Element nicht gerendert und seine eigenen sowie etwaige untergeordnete Ressourcen werden nicht abgerufen. Wenn das Browserfenster die Größe oder Ausrichtung ändert, werden die Medienabfragen neu ausgewertet und Elemente werden basierend auf den neuen Ergebnissen ausgeblendet bzw. angezeigt.

Beispiel:

```html
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="466"
    height="355" layout="responsive"></amp-img>
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="527"
    height="193" layout="responsive"></amp-img>
```

Weitere Informationen dazu findest du unter [Layout & Media Queries](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries).

## noloading

Das Attribut `noloading` gibt an, ob die Ladeanzeige für dieses Element **deaktiviert** sein soll. Viele AMP Elemente zeigen einen Ladeindikator an. Das ist eine Standardanimation, die zeigt, dass ein Element noch nicht vollständig geladen ist.

Wird häufig verwendet mit: Bildern, Animationen, Videos und Ads.

Beispiel:

```html
<amp-img src="card.jpg"
    noloading
    height="190"
    width="297"
    layout="responsive">
</amp-img>
```

## on

Das Attribut `on` wird verwendet, um Event Handler für Elemente zu installieren.

Wird häufig verwendet mit: Lightboxes, Seitenleisten, Live Listen und Formularen.

Syntax:

```text
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
```

Beispiel:

```html
<button on="tap:my-lightbox">Open lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay">
  ...
</amp-lightbox>
```

Weitere Informationen dazu findest du unter [Aktionen und Events in AMP](amp-actions-and-events.md).

## placeholder

Das Attribut `placeholder` gibt an, dass das mit diesem Attribut gekennzeichnete Element als Platzhalter für ein übergeordnetes AMP Element fungiert. Das Attribut kann in jedem HTML Element verwendet werden, das ein direktes untergeordnetes Element eines AMP Elements ist, welches Platzhalter unterstützt. Standardmäßig wird der Platzhalter für das AMP Element sofort angezeigt, selbst wenn die Ressourcen des AMP Elements nicht heruntergeladen oder initialisiert wurden. Sobald das AMP Element bereit ist, verbirgt es in der Regel seinen Platzhalter und zeigt den Inhalt an. Das genaue Verhalten in Bezug auf den Platzhalter hängt von der Implementierung des Elements ab.

Wird häufig verwendet mit: Bildern, Animationen, Videos und Ads.

Beispiel:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
```

Weitere Informationen dazu findest du unter [Platzhalter und Fallbacks](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## sizes

Alle AMP Elemente, die das Layout `responsive` unterstützen, unterstützen auch das Attribut `sizes`. Der Wert des AMP Attributs `sizes` ist ein Ausdruck vom Typ "sizes", der eine Medienabfrage der aktuellen Fenstergröße durchführt, um die festgelegte Größe zu wählen. <strong>Darüber hinaus legt AMP einen Inline Stil für das Attribut <code>width</code> des Elements fest</strong>.

Beispiel:

```html
<amp-img src="amp.png"
    width="400" height="300"
    layout="responsive"
    sizes="(min-width: 320px) 320px, 100vw">
</amp-img>
```

Das resultiert im folgenden verschachtelten Tag vom Typ `img`:

```html
<img decoding="async"
    src="amp.png"
    sizes="(min-width: 320px) 320px, 100vw"
    class="i-amphtml-fill-content i-amphtml-replaced-content">
```

Weitere Informationen dazu findest du unter [Art Direction mit srcset, sizes und heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## width and height

Bei einigen [Layouts](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) benötigen AMP Komponenten die Attribute `width` und `height` mit ganzzahligen Pixelwerten.

Beispiel:

```html
<amp-anim width="245"
    height="300"
    src="/img/cat.gif"
    alt="cat animation">
</amp-anim>
```

Weitere Informationen dazu findest du unter [Layout & Media Queries](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) und [Layoutspezifikationen](amp-html-layout/index.md).
