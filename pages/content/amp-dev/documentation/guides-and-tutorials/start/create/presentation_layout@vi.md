---
"$title": Modify presentation and layout
"$order": '3'
description: "AMP pages are web pages; any styling to the page and its elements is done using common CSS properties. Style elements using class or element selectors ..."
author: pbakaus
contributors:
- bpaduch
---

## Modify the presentation

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

Every AMP page can only have a single embedded stylesheet and inline styles, but there are certain selectors you’re not allowed to use. [Learn all about styling](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## Control the layout

AMP follows stricter rules when laying out elements on the page. On a normal HTML page, you almost exclusively use CSS to lay out elements. But for performance reasons, AMP requires all elements to have an explicit size set from the get-go.

[tip type="read-on"] **READ ON –** Learn all about how AMP renders and layouts a page and how you can modify the layout in [Layout & Media queries](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]
