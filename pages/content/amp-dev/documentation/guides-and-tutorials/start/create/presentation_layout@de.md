---
"$title": Bearbeite Präsentation und Layout
"$order": '3'
description: 'AMP Seiten sind Webseiten: Die Seite und ihre Elemente werden mit gewöhnlichen CSS Eigenschaften gestylt. Styleelemente verwenden Klassen oder …'
author: pbakaus
contributors:
- bpaduch
---

## Bearbeite die Präsentation

AMP Seiten sind Webseiten: Die Seite und ihre Elemente werden mit gewöhnlichen CSS Eigenschaften gestylt. Styleelemente verwenden Klassen oder Elementselektoren in einem eingebetteten Stylesheet im `<head>`, das `<style amp-custom>` heißt:

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

Jede AMP Seite kann nur ein einziges eingebettetes Stylesheet und Inline Styles enthalten. Es gibt aber bestimmte Selektoren, die du nicht verwenden darfst. [Erfahre alles über Styling](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## Steuere das Layout

Wenn Elemente auf der Seite angeordnet werden, gelten in AMP strengere Regeln. Auf einer normalen HTML Seite verwendest du fast ausschließlich CSS, um Elemente zu gestalten. AMP erfordert aber aus Leistungsgründen, dass für alle Elemente von Anfang an eine explizite Größe festgelegt wird.

[tip type="read-on"] **ERFAHRE MEHR:** Unter [Layout & Medienabfragen](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) erfährst du alles darüber, wie AMP eine Seite rendert und gestaltet, und wie du das Layout ändern kannst. [/tip]
