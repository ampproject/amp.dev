---
$title: Modify presentation and layout
$order: 2
---

## Modify the presentation

AMP pages are web pages; any styling to the page and its elements is done using common CSS properties. Style elements using class or element selectors in an inline stylesheet in the `<head>`, called `<style amp-custom>`:

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

Every AMP page can only have a single embedded stylesheet, and there are certain selectors you’re not allowed to use. [Learn all about styling](/docs/guides/responsive/style_pages.html).

## Control the layout

AMP follows stricter rules when laying out elements on the page. On a normal HTML page, you almost exclusively use CSS to lay out elements. But for performance reasons, AMP requires all elements to have an explicit size set from the get-go.

{% call callout('Read on', type='read') %}
Learn all about how AMP renders and layouts a page and how you can modify the layout in [Layout & Media queries](/docs/guides/responsive/control_layout.html).
{% endcall %}

<div class="prev-next-buttons">
  <a class="button prev-button" href="/docs/tutorials/create/include_image.html"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="/docs/tutorials/create/preview_and_validate.html"><span class="arrow-next">Next</span></a>
</div>