---
"$title": Getting familiar with the starter code
"$order": '1'
description: Eine AMP Seite ist eine HTML Seite, die bestimmte Einschränkungen hat, um zuverlässige Leistung zu garantieren. AMP Seiten haben ein spezielles Markup, das sie als AMP Seite identifiziert.
---

## AMP Boilerplate

Eine AMP Seite ist eine HTML Seite, die bestimmte Einschränkungen hat, um zuverlässige Leistung zu garantieren. AMP Seiten haben ein spezielles Markup, das sie als AMP Seite identifiziert.

Eine blanke AMP Seite sieht wie folgt aus:

```html
<!DOCTYPE html>
<html amp>
  <head>
    <meta charset="utf-8" />
    <link rel="canonical" href="hello-world.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello World!
  </body>
</html>
```

[tip] You can use the [boilerplate generator](https://amp.dev/boilerplate) to quickly setup a basic skeleton for your AMP page. It also provides snippets for structured data, to create a PWA and more! [/tip]

## AMP Komponenten

Der Startercode des Tutorials ([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)) baut auf der blanken AMP Seite mit ihrem Seiteninhalt (Bilder, Text usw.) auf und enthält einige AMP Komponenten:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
<script
  async
  custom-template="amp-mustache"
  src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"
></script>
<script
  async
  custom-element="amp-form"
  src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
></script>
<script
  async
  custom-element="amp-selector"
  src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"
></script>
```

AMP components offer additional functionality and UI components that add rich interactivity to AMP pages. The starter code uses the following AMP components:

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): Ein Bilderkarussell, das mehrere Ansichten des Produkts anzeigt.
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): Ein Vorlagensystem zum Rendern von Serverantworten aus amp-form.
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): Bietet spezielle Funktionen für `<form>` Elemente, die für AMP Seiten erforderlich sind.
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): Offers a semantic way to select one or many elements of a group of elements. Can be used as an input source to amp-form.

## Grundlegende Interaktivität

Der Startercode bietet eine grundlegende Interaktivität:

- Das Bilderkarussell (ein [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)) zeigt mehrere Ansichten des Produkts an.
- The product can be added to the user's cart (via [`amp-form`](../../../../documentation/components/reference/amp-form.md)) by tapping the "Add to cart" button on the bottom of the page.

**Try it out**: Swipe the image carousel and tap the "Add to cart" button.
