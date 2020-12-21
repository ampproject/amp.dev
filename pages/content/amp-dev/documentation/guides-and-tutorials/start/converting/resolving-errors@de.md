---
"$title": Resolving validation errors
"$order": '2'
description: "In this section, we'll go through and resolve the AMP validation errors from our AMP page. Note that the errors may appear in a different order in your console."
---

In diesem Abschnitt untersuchen und beheben wir die AMP Validierungsfehler auf unserer AMP Seite. Möglicherweise werden die Fehler in deiner Konsole in einer anderen Reihenfolge angezeigt.

## Include charset

Zuerst beheben wir den folgenden Fehler:

<pre class="error-text">The mandatory tag 'meta charset=utf-8' is missing or incorrect.
</pre>

To correctly display text, AMP requires that you specify the charset for the page. The meta charset information must also be the first child of the `<head> ` tag. The reason this tag must be first is to avoid re-interpreting content that was added before the meta charset tag.

**Add** the following code as the first line of the `<head>` tag:

```html
<meta charset="utf-8" />
```

**Speichere** die Datei und lade die Seite neu. Stelle sicher, dass der Zeichensatzfehler nicht mehr angezeigt wird.

## Include canonical link

Now, let's look at the following error:

<pre class="error-text">The mandatory tag 'link rel=canonical' is missing or incorrect.
</pre>

Every AMP document needs to have a link referencing the "canonical" version of that document.  We'll learn more about what canonical pages are and different approaches to canonical linking in the [Making your page discoverable](discoverable.md) step of this tutorial.

In diesem Tutorial betrachten wir den ursprünglichen HTML Artikel, den wir konvertieren, als kanonische Seite.

Go ahead and **add** the following code below the `<meta charset="utf-8" />` tag:

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

AMP requires an attribute on the root `<html>` element of a page to declare the page as an AMP document.

<pre class="error-text">The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'
The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.
</pre>

Um die oben genannten Fehler zu beheben, wird einfach das Attribut `⚡` zum `<html>` Tag hinzugefügt:

```html
<html ⚡ lang="en">
```

Lade die Seite jetzt neu und überprüfe, ob beide Fehler behoben sind.

[tip type="note"] Although specifying the `⚡` is the recommended approach, it's also possible to use the `amp` attribute in place of the `⚡` attribute, like so:

```html
<html amp lang="en">
```

[/tip]

## Gib einen Viewport an

Next, let's address the following error:

<pre class="error-text">The mandatory tag 'meta name=viewport' is missing or incorrect.
</pre>

AMP requires the definition of a `width` and `minimum-scale` for the viewport. These values must be defined as `device-width` and `1`, respectively. The viewport is a common tag included in the `<head>` of an HTML page.

To resolve the viewport error, add the following HTML snippet to the `<head>` tag:

```html
<meta name="viewport" content="width=device-width">
```

The values specified for `width` and `minimum-scale` are the required values in AMP. Defining `initial-scale` is not mandatory but it’s a commonly included in mobile web development and it's recommended. You can read more about the viewport and responsive design in [Configure the Viewport](https://developers.google.com/speed/docs/insights/ConfigureViewport).

**Lade** die Seite noch einmal neu und prüfe, ob der Fehler verschwunden ist.

## Ersetze externe Stylesheets

Der folgende Fehler hängt mit der Verwendung unserer Stylesheets zusammen:

<pre class="error-text">The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.
</pre>

Specifically, this error is complaining about the following stylesheet link tag in our `<head>` tag:

```html
<link href="base.css" rel="stylesheet" />
```

The problem is that this is an external stylesheet reference. In AMP, to keep the load times of documents as fast as possible, you cannot include external stylesheets. Instead, all stylesheet rules must be embedded in the AMP document using <code><style amp-custom></style></code> tags, or as inline styles.

```html
<style amp-custom>

/* The content from base.css */

</style>
```

Beheben wir also den Fehler:

1. **Remove** the `<link>` tag pointing to the stylesheet in the `<head>` and replace it with an inline `<style amp-custom></style>` tag. The `amp-custom` attribute on the style tag is mandatory.
2. **Copy** all the styles from the [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) file into the `<style amp-custom></style>` tags.

**Lade** die Seite noch einmal neu und überprüfe, ob der Fehler mit den Stylesheets verschwunden ist.

[tip type="note"] **NOTE –**  Not only is embedded styling required but there is a file size limit of 50 kilobytes for all styling information. You should use CSS preprocessors such as [SASS](http://sass-lang.com/) to minify your CSS before inlining the CSS in your AMP pages. [/tip]

[tip type="important"] **IMPORTANT –** You can only have one style tag in your entire AMP document. If you have several external stylesheets referenced by your AMP pages, you will need to collate these stylesheets into a single set of rules. To learn what CSS rules are valid in AMP, read [Supported CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md). [/tip]

## Schließe JavaScript von Drittanbietern aus

While stylesheets can be reworked relatively easily with AMP by inlining the CSS, the same is not true for JavaScript.

<pre class="error-text">The tag 'script' is disallowed except in specific forms.
</pre>

Skripte sind in AMP generell nur unter zwei Grundbedingungen zulässig:

1. Jedes JavaScript muss asynchron sein (d. h. es muss im Tag 'script' das Attribut `async` enthalten).
2. The JavaScript is for the AMP library and for any AMP components on the page.

This effectively rules out the use of all user-generated/third-party JavaScript in AMP except as noted below.

[tip type="note"] Die einzigen Ausnahmen von der Einschränkung für benutzergenerierte Skripte bzw. Skripte von Drittanbietern sind:

1. Script that adds metadata to the page or that configures AMP components. These will have the type attribute  `application/ld+json` or `application/json`.
2. Script included in iframes.  Including JavaScript in an iframe should be considered a measure of last resort. Wherever possible, JavaScript functionality should be replaced by using [AMP components](../../../../documentation/components/index.html). We will explore our first AMP component in the next section. [/tip]

Try opening the external [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js) file. What do you see? The file should be empty of any JavaScript code and only include a comment of information such as this:

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

<pre class="error-text">The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.
The mandatory tag 'head > style : boilerplate' is missing or incorrect.
The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.
</pre>

Jedes AMP Dokument erfordert den folgenden AMP Code:

```html
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
```

**Add** the boilerplate code to the bottom of the `<head>` tag of your document.

The `<style amp-boilerplate>`  tag initially hides the content of the body until the AMP JavaScript library is loaded, then the content is rendered. AMP does this to prevent unstyled content from rendering, also known as Flash Of Unstyled Content (FOUC). This helps ensure that the user experience feels truly instant as the page’s content appears all at once and everything above the fold is rendered together. The second tag reverts this logic if JavaScript is disabled in the browser.

## Ersetze `<img>` durch `<amp-img>`

AMP doesn't support the default HTML counterparts to displaying media, which explains the following error:

<pre class="error-text">The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?
</pre>

AMP has a web component specifically designed to replace the `<img>` tag, it's the [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) tag:

```html
<amp-img src="mountains.jpg"></amp-img>
```

**Replace** the `<img>` tag with the above [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) tag and run the validator again. You should receive several new errors:

<pre class="error-text">Layout not supported: container
The implied layout 'CONTAINER' is not supported by tag 'amp-img'.
</pre>

Why did [`amp-img`](../../../../documentation/components/reference/amp-img.md) trigger another error? Because [`amp-img`](../../../../documentation/components/reference/amp-img.md) is not a direct substitute of the traditional HTML img tag. There are additional requirements when using [`amp-img`](../../../../documentation/components/reference/amp-img.md).

### AMP Layoutsystem

The layout error is telling us that [`amp-img`](../../../../documentation/components/reference/amp-img.md) does not support the `container` layout type. One of the most important concepts in AMP’s design is its focus on reducing the amount of DOM reflow required to render its web pages.

To reduce DOM reflow, AMP includes a layout system to ensure the layout of the page is known as early as possible in the lifecycle of downloading and rendering the page.

The image below compares how an HTML page is often laid out compared to the approach AMP enforces.  Notice in the approach on the left how the text reflows each time an ad or image is loaded.  AMP's approach to layout keeps the text from moving around--even if the images and ads take a long time to load.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="Vergleich zwischen dem normalen Layout von Inhalten und der AMP Methode") }}

The AMP layout system allows for elements on a page to be positioned and scaled in a variety of ways -- fixed dimensions, responsive design, fixed height and more.

In the case of our article, the layout system inferred the layout type for the [`amp-img`](../../../../documentation/components/reference/amp-img.md) as the `container` type. However, the `container` type is only applicable to elements that contain children elements. The `container` type is incompatible with the [`amp-img`](../../../../documentation/components/reference/amp-img.md) tag, which is the reason for this error.

Why was the `container` type inferred? Because we did not specify a `height` attribute for the [`amp-img`](../../../../documentation/components/reference/amp-img.md) tag. In HTML, reflow can be reduced by always specifying a fixed width and height for elements on a page. In AMP, you need to define the width and height for [`amp-img`](../../../../documentation/components/reference/amp-img.md) elements so that AMP can pre-determine the aspect ratio of the element.

**Füge** <code>width</code> und `height` wie folgt zu deinem <a><code data-md-type="codespan">amp-img</code></a> Tag hinzu:

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

Aktualisiere die Seite und überprüfe den Validator. Jetzt sollte es keine Fehler mehr geben!

You now have a valid AMP document, but the image doesn’t look so great because it is awkwardly positioned on the page.  By default when you specify the height and width for an [`amp-img`](../../../../documentation/components/reference/amp-img.md) AMP will fix the dimensions to what you specify--but wouldn't it be great if AMP would scale the image to *responsively* stretch and fit the page no matter the screen size?

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="Our image isn't responsive.") }}

Fortunately AMP can figure out the aspect ratio of elements from the width & height you specify.  This allows the AMP layout system to position and scale the element in a variety of ways.  The `layout` attribute informs AMP of how you want the element positioned and scaled.

Let's **set** the layout attribute to `responsive` so that our image scales and resizes:

```html
<amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
```

Na also! Unser Bild hat das richtige Seitenverhältnis und passt zur Bildschirmbreite.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="Our image is now responsive!") }}

[tip type="read-on"] **READ ON –** Learn more about the AMP Layout System in the [AMP Layout Specification](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md). [/tip]

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

Refresh the page and look at the console output. You should be greeted with the following message:

<pre class="success-text">AMP validation successful.
</pre>

### Häufig gestellte Fragen

- [What is DOM reflow?](http://stackoverflow.com/a/27637245)
- [What if the layout attribute isn’t defined?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [What if width and height are undefined?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
