---
"$title": Validierungsfehler beheben
"$order": '2'
description: In diesem Abschnitt untersuchen und beheben wir die AMP Validierungsfehler auf unserer AMP Seite. Möglicherweise werden die Fehler in deiner Konsole …
---

In diesem Abschnitt untersuchen und beheben wir die AMP Validierungsfehler auf unserer AMP Seite. Möglicherweise werden die Fehler in deiner Konsole in einer anderen Reihenfolge angezeigt.

## Binde einen Zeichensatz ein

Zuerst beheben wir den folgenden Fehler:

<pre class="error-text">The mandatory tag 'meta charset=utf-8' is missing or incorrect.</pre>

Damit Text korrekt angezeigt wird, erfordert AMP, dass du den Zeichensatz für die Seite angibst. Die Metainformationen für den Zeichensatz müssen das erste untergeordnete Element im Tag `<head>` sein. Dieses Tag muss an erster Stelle stehen, um eine Neuinterpretation von Inhalten zu vermeiden, die vor dem Metatag des Zeichensatzes hinzugefügt wurden.

**Füge** den folgenden Code als erste Zeile im Tag `<head>` hinzu:

```html
<meta charset="utf-8" />
```

**Speichere** die Datei und lade die Seite neu. Stelle sicher, dass der Zeichensatzfehler nicht mehr angezeigt wird.

## Binde den kanonischen Link ein

Sehen wir uns nun den folgenden Fehler an:

<pre class="error-text">The mandatory tag 'link rel=canonical' is missing or incorrect.</pre>

Jedes AMP Dokument benötigt einen Link, der auf die "kanonische" Version des Dokuments verweist. Weitere Informationen zu kanonischen Seiten und verschiedene Methoden für kanonische Verknüpfungen findest du in diesem Tutorial im Schritt [Stelle die Auffindbarkeit deiner Seiten sicher](discoverable.md).

In diesem Tutorial betrachten wir den ursprünglichen HTML Artikel, den wir konvertieren, als kanonische Seite.

**Füge** den folgenden Code unterhalb des Tags `<meta charset="utf-8" />` hinzu:

```html
<link rel="canonical" href="/article.html">
```

[tip type="note"] Du kannst eine eigenständige kanonische AMP Seite erstellen. Der kanonische Link ist trotzdem erforderlich, sollte aber auf den eigentlichen AMP Artikel verweisen:

```html
<link rel="canonical" href="article.amp.html">
```

[/tip]

**Lade** die Seite jetzt neu. Es gibt immer noch viele Fehler, aber der Fehler mit dem kanonischen Link ist jetzt behoben.

## Gib das AMP Attribut an

AMP erfordert ein Attribut im `<html>` Stammelement der Seite, um die Seite als AMP Dokument zu deklarieren.

<pre class="error-text">The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'<br>The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.</pre>

Um die oben genannten Fehler zu beheben, wird einfach das Attribut `⚡` zum `<html>` Tag hinzugefügt:

```html
<html ⚡ lang="en">
```

Lade die Seite jetzt neu und überprüfe, ob beide Fehler behoben sind.

[tip type="note"] Obwohl die Angabe von `⚡` empfohlen wird, kann anstelle des Attributs `⚡` auch das Attribut `amp` verwendet werden. Und zwar so:

```html
<html amp lang="en">
```

[/tip]

## Gib einen Viewport an

Als Nächstes beheben wir den folgenden Fehler:

<pre class="error-text">The mandatory tag 'meta name=viewport' is missing or incorrect.</pre>

AMP erfordert die Definition von `width` und `minimum-scale` für den Viewport. Diese Werte müssen als `device-width` und `1` definiert werden. Der Viewport ist ein gewöhnliches Tag, das im `<head>` einer HTML Seite enthalten ist.

Um den Fehler mit dem Viewport zu beheben, füge das folgende HTML Snippet zum Tag `<head>` hinzu:

```html
<meta name="viewport" content="width=device-width">
```

Die für `width` und `minimum-scale` angegebenen Werte sind die in AMP obligatorischen Werte. Die Angabe von `initial-scale` ist nicht zwingend, wird in der mobilen Webentwicklung jedoch gewöhnlich verwendet und ist empfohlen. Weitere Informationen zum Viewport und zum responsiven Design findest du unter [Darstellungsbereich festlegen](https://developers.google.com/speed/docs/insights/ConfigureViewport).

**Lade** die Seite noch einmal neu und prüfe, ob der Fehler verschwunden ist.

## Ersetze externe Stylesheets

Der folgende Fehler hängt mit der Verwendung unserer Stylesheets zusammen:

<pre class="error-text">The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.</pre>

Dieser Fehler bezieht sich auf einen Fehler mit dem folgenden Stylesheet Linktag in unserem Tag `<head>`:

```html
<link href="base.css" rel="stylesheet" />
```

Das Problem ist, dass dies eine Referenz auf ein externes Stylesheet ist. Damit Dokumente schnell geladen werden, kannst du in AMP keine externen Stylesheets einbinden. Stattdessen müssen alle Stylesheet Regeln mithilfe der Tags `<style amp-custom></style>` oder als Inlinestyles in das AMP Dokument eingebettet werden.

```html
<style amp-custom>

/* The content from base.css */

</style>
```

Beheben wir also den Fehler:

1. **Entferne** das Tag `<link>`, das auf das Stylesheet im `<head>` verweist, und ersetze es durch das Inlinetag `<style amp-custom></style>`. Das Attribut `amp-custom` für das Styletag ist obligatorisch.
2. **Kopiere** alle Styles aus der Datei [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) in die Tags `<style amp-custom></style>`.

**Lade** die Seite noch einmal neu und überprüfe, ob der Fehler mit den Stylesheets verschwunden ist.

[tip type="note"] **HINWEIS:** Neben dem geforderten eingebetteten Styling gilt für alle Stylinginformationen eine Dateigrößenbeschränkung von 50 Kilobyte. Du solltest CSS Präprozessoren wie [SASS](http://sass-lang.com/) verwenden, um dein CSS zu minimieren, bevor du das CSS in deine AMP Seiten einbindest. [/tip]

[tip type="important"] **WICHTIG:** Du kannst in deinem gesamten AMP Dokument nur ein einziges Styletag haben. Wenn du mehrere externe Stylesheets hast, auf die deine AMP Seiten verweisen, musst du diese Stylesheets in einem einzigen Regelsatz zusammenfassen. Welche CSS Regeln in AMP gültig sind, erfährst du unter [Unterstütztes CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md). [/tip]

## Schließe JavaScript von Drittanbietern aus

In AMP können Stylesheets durch Einfügen des CSS inline relativ einfach überarbeitet werden. Das gilt jedoch nicht für JavaScript.

<pre class="error-text">The tag 'script' is disallowed except in specific forms.</pre>

Skripte sind in AMP generell nur unter zwei Grundbedingungen zulässig:

1. Jedes JavaScript muss asynchron sein (d. h. es muss im Tag 'script' das Attribut `async` enthalten).
2. Das JavaScript gilt für die AMP Bibliothek und für beliebige AMP Komponenten auf der Seite.

Dadurch wird in AMP die Verwendung von jeglichem JavaScript, das benutzergeneriert ist oder von Drittanbietern stammt, effektiv unterbunden, mit Ausnahme der nachfolgend angegebenen Fälle.

[tip type="note"] Die einzigen Ausnahmen von der Einschränkung für benutzergenerierte Skripte bzw. Skripte von Drittanbietern sind:

1. Skripte, die Metadaten zu der Seite hinzufügen oder AMP Komponenten konfigurieren. Diese haben das Typenattribut `application/ld+json` oder `application/json`.
2. Skripte, die in iframes enthalten ist. Das Einfügen von JavaScript in ein iframe gilt als Notlösung. Anstelle von JavaScript Funktionalität sollten möglichst immer [AMP Komponenten](../../../../documentation/components/index.html) verwendet werden. Unsere erste AMP Komponente betrachten wir im nächsten Abschnitt. [/tip]

Versuche, die externe Datei [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js) zu öffnen. Was siehst du? Die Datei sollte keinen JavaScript Code enthalten, sondern nur einen Kommentar mit folgenden Informationen:

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

Da diese externe JavaScript Datei keine funktionale Komponente unserer Website ist, können wir den Verweis einfach vollständig entfernen.

**Entferne** die folgende externe JavaScript Referenz aus deinem Dokument:

```html
<script type="text/javascript" src="base.js"></script>
```

**Lade** die Seite jetzt neu und überprüfe, ob der Skriptfehler verschwunden ist.

## Füge AMP CSS Boilerplate hinzu

Die folgenden Fehler weisen auf fehlenden Boilerplate Code hin:

<pre class="error-text">The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.<br>The mandatory tag 'head > style : boilerplate' is missing or incorrect.<br>The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.</pre>

Jedes AMP Dokument erfordert den folgenden AMP Code:

```html
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
```

**Füge** den Code am Ende des Tags `<head>` in deinem Dokument hinzu.

Das Tag `<style amp-boilerplate>` verbirgt den Inhalt des Abschnitts "body", bis die AMP JavaScript Bibliothek geladen ist. Anschließend wird der Inhalt gerendert. Dadurch verhindert AMP, dass nicht gestylte Inhalte gerendert werden, was auch "Flash Of Unstyled Content" (FOUC) genannt wird. So wird eine verzögerungsfreie Benutzererfahrung sichergestellt, da der Seiteninhalt auf einmal angezeigt wird und alle Elemente im sichtbaren Bereich gleichzeitig gerendert werden. Das zweite Tag kehrt diese Logik um, wenn JavaScript im Browser deaktiviert ist.

## Ersetze `<img>` durch `<amp-img>`

AMP unterstützt nicht die standardmäßigen HTML Entsprechungen zur Anzeige von Medien. Das erzeugt die folgenden Fehler:

<pre class="error-text">The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?</pre>

AMP besitzt eine Webkomponente, die speziell entwickelt wurde, um das Tag `<img>` zu ersetzen, nämlich das Tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md):

```html
<amp-img src="mountains.jpg"></amp-img>
```

**Ersetze** das Tag `<img>` durch das obige Tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) und führe den Validator erneut aus. Du solltest mehrere neue Fehler erhalten:

<pre class="error-text">Layout not supported: container<br>The implied layout 'CONTAINER' is not supported by tag 'amp-img'.</pre>

Warum löst [`amp-img`](../../../../documentation/components/reference/amp-img.md) einen weiteren Fehler aus? Weil [`amp-img`](../../../../documentation/components/reference/amp-img.md) kein direkter Ersatz für das traditionelle HTML Tag "img" ist. Für die Verwendung von [`amp-img`](../../../../documentation/components/reference/amp-img.md) gelten zusätzliche Anforderungen.

### AMP Layoutsystem

Der Layoutfehler zeigt, dass [`amp-img`](../../../../documentation/components/reference/amp-img.md) den Layouttyp `container` nicht unterstützt. Für das AMP Design ist es grundlegend, beim Rendern der Webseiten den erforderlichen DOM Reflow zu reduzieren.

Um den DOM Reflow zu reduzieren, enthält AMP ein Layoutsystem, das sicherstellt, dass das Seitenlayout im Verlauf des Downloads und Renderns der Seite so früh wie möglich bekannt ist.

Das folgende Bild vergleicht das Layout, das häufig für HTML Seiten verwendet wird, mit der von AMP erzwungenen Methode. Bei der Methode auf der linken Seite fällt auf, dass der Text bei jedem Laden einer Ad oder eines Bildes erneut umgebrochen wird. Die Layoutmethode von AMP verhindert, dass sich der Text bewegt – selbst, wenn Bilder und Ads eine längere Ladezeit haben.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="Vergleich zwischen dem normalen Layout von Inhalten und der AMP Methode") }}

Im AMP Layoutsystem können die Elemente auf einer Seite auf verschiedene Weise positioniert und skaliert werden – feste Abmessungen, responsives Design, feste Höhe und mehr.

In unserem Artikel hat das Layoutsystem den Layouttyp für [`amp-img`](../../../../documentation/components/reference/amp-img.md) als `container` abgeleitet. Der Typ `container` gilt jedoch nur für Elemente, die untergeordnete Elemente enthalten. Der Typ `container` ist mit dem Tag [`amp-img`](../../../../documentation/components/reference/amp-img.md) nicht kompatibel. Das ist der Grund für diesen Fehler.

Warum wurde der Typ `container` abgeleitet? Weil wir kein `height` Attribut für das Tag [`amp-img`](../../../../documentation/components/reference/amp-img.md) angegeben haben. In HTML kann der Reflow reduziert werden, indem für Elemente auf einer Seite stets eine feste Breite und Höhe angegeben wird. In AMP musst du die Breite und Höhe für [`amp-img`](../../../../documentation/components/reference/amp-img.md) Elemente definieren, damit AMP das Seitenverhältnis des Elements vorab festlegen kann.

**Füge** <code>width</code> und `height` wie folgt zu deinem <a><code data-md-type="codespan">amp-img</code></a> Tag hinzu:

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

Aktualisiere die Seite und überprüfe den Validator. Jetzt sollte es keine Fehler mehr geben!

Jetzt ist dein AMP Dokument gültig. Nur das Bild sieht nicht besonders gut aus: Es ist etwas ungeschickt positioniert. Wenn du die Höhe und Breite für ein [`amp-img`](../../../../documentation/components/reference/amp-img.md) angibst, fixiert AMP standardmäßig die angegebenen Maße. Aber wie wäre es, wenn AMP das Bild skalieren würde, damit es sich *responsiv* strecken würde, um sich unabhängig von der Bildschirmgröße der Seite anzupassen?

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="Unser Bild ist nicht responsiv.") }}

Glücklicherweise kann AMP das Seitenverhältnis von Elementen anhand der von dir vorgegebenen Breite und Höhe ermitteln. Auf diese Weise kann das AMP Layoutsystem das Element auf verschiedene Arten positionieren und skalieren. Das Attribut `layout` informiert AMP darüber, wie das Element positioniert und skaliert werden soll.

<strong>Setzen</strong> wir das Layoutattribut auf <code>responsive</code>, damit unser Bild skaliert und die Größe angepasst wird:

```html
<amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
```

Na also! Unser Bild hat das richtige Seitenverhältnis und passt zur Bildschirmbreite.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="Jetzt ist unser Bild responsiv!") }}

[tip type="read-on"] **ERFAHRE MEHR:** Weitere Informationen über das AMP Layoutsystem findest du in der [Spezifikation des AMP Layouts](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md). [/tip]

## Hervorragend!

Jetzt sollte dein AMP Dokument etwa so aussehen:

```html
<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width">

    <link rel="canonical" href="/article.html">
    <link rel="shortcut icon" href="amp_favicon.png">

    <title>News Article</title>

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>

      <amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
    </article>
  </body>
</html>
```

Aktualisiere die Seite und sieh dir die Konsolenausgabe an. Du solltest die folgende Nachricht erhalten:

<pre class="success-text">AMP validation successful.</pre>

### Häufig gestellte Fragen

- [Was ist der DOM Reflow?](http://stackoverflow.com/a/27637245)
- <a class="" href="https://gitlocalize.com/repo/4863/de/pages/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified">Was, wenn das Attribut <code>layout</code> nicht angegeben ist?</a>
- [Was, wenn Breite und Höhe nicht definiert sind?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
