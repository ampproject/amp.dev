---
layout: page
title: Modify presentation and layout
order: 2
---

## Modify the presentation

AMPs are web pages; any styling to the page and its elements is done using common CSS properties. Style elements using class or element selectors in an inline stylesheet in the `<head>`, called `<style amp-custom>`:

{% highlight html %}
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
{% endhighlight %}

Every AMP page can only have a single embedded stylesheet, and there are certain selectors you’re not allowed to use. [Learn all about styling](/docs/guides/responsive/style_pages.html).

## Control the layout

AMP follows stricter rules when laying out elements on the page. On a normal HTML page, you almost exclusively use CSS to lay out elements. But for performance reasons, AMP requires all elements to have an explicit size set from the get-go.

Learn all about how AMP renders and layouts a page and how you can modify in [How to Control Layout](/docs/guides/responsive/control_layout.html).

{% include button.html title="Continue to Step 4" link="/docs/get_started/create/preview_and_validate.html" %}