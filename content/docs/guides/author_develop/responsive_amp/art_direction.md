---
$title: Art direction with srcset, sizes & heights
$order: 4
toc: true
---
[TOC]


## srcset

Use the `srcset` attribute to control an element’s assets
based on varying media expressions.
In particular, use it for all [`amp-img`](/docs/reference/amp-img.html) tags
to specify which image assets to use based on varying screen sizes.

In this simple example,
`srcset` specifies which image to use based on the screen width.
The `w` descriptor tells the browser the width
of each image in the list:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg 640w,
           narrow.jpg 320w">
</amp-img>
[/sourcecode]

{% call callout('Note', type='note') %}
AMP supports srcset with the `w` descriptor across all browsers.
{% endcall %}

Learn more about creating responsive images using `srcset`
in [Using Responsive Images (Now)](http://alistapart.com/article/using-responsive-images-now).

## sizes

You can also use the `sizes` attribute along with `srcset`.
The `sizes` attribute describes how to calculate the element size
based on any media expression.
Based on the element’s calculated size,
the user agent selects the most relative source supplied by the `srcset` attribute.

Consider the following example:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg 640w,
           narrow.jpg 320w"
    sizes="(min-width: 650px) 50vw, 100vw">
</amp-img>
[/sourcecode]

The `sizes` attribute defines the element’s width to be 50% the size of the viewport
when the viewport is 650px or more.
For example, if the viewport is 800px,
the element’s width is set to 400px.
The browser then selects the `srcset` resource relative to 400px,
assuming the device pixel ratio is 1,
which in this instance is `narrow.jpg` (320px).

{% call callout('Important', type='caution') %}
When sizes attribute is specified along with width and height,
layout defaults to `responsive`.
{% endcall %}

Learn more about how `sizes` and `srcset` attributes compare
to media queries in this
[Srcset and sizes](https://ericportis.com/posts/2014/srcset-sizes/) blog post.

## heights

All AMP custom elements that allow `responsive` layout, also support the `heights` attribute.
The value of this attribute is a sizes expression based on media expressions
as similar to the [img sizes attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img),
but with two key differences:

 1. It applies to the height and not width of the element.
 2. Percent values are allowed, e.g. `86%`. If a percent value is used, it indicates the percent
 of the element's width.

When the `heights` attribute is specified along with `width` and `height`, the `layout` is defaulted to `responsive`.

An example:

[sourcecode:html]
<amp-img src="https://acme.org/image1.png"
    width="320" height="256"
    heights="(min-width:500px) 200px, 80%">
</amp-img>
[/sourcecode]

In this example, the height of the element by default will be 80% of the width, but for the viewport
wider than `500px` it will be capped at `200px`.