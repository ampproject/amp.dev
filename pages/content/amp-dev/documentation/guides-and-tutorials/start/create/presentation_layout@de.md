---
"$title": Modify presentation and layout
"$order": '3'
description: "AMP pages are web pages; any styling to the page and its elements is done using common CSS properties. Style elements using class or element selectors ..."
author: pbakaus
contributors:
- bpaduch
---

## Bearbeite die Präsentation

AMP pages are web pages; any styling to the page and its elements is done using common CSS properties. Style elements using class or element selectors in an embedded stylesheet in the `<head>`, called `<style amp-custom>`:

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

[tip type="read-on"] **READ ON –** Learn all about how AMP renders and layouts a page and how you can modify the layout in [Layout & Media queries](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]
