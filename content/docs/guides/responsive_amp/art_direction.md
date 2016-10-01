---
$title: Art direction with srcset and sizes
$order: 4
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

<aside class="note">
  <strong>Note:</strong>
  <span>AMP supports srcset with the <code>w</code> descriptor across all browsers.</span>
</aside>

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

<aside class="caution">
  <strong>Important:</strong>
  <span>When sizes attribute is specified along with width and height,
layout defaults to <code>responsive</code>.</span>
</aside>

Learn more about how `sizes` and `srcset` attributes compare
to media queries in this
[Srcset and sizes](https://ericportis.com/posts/2014/srcset-sizes/) blog post.