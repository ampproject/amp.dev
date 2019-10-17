---
$title: Responsive images with srcset, sizes & heights
$order: 4
description: 'Use the srcset attribute to control an element’s assets based on varying media expressions. In particular, use it for all amp-img tags to specify which ...'
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
author: pbakaus
contributors:
  - bpaduch
---

## srcset

Use the `srcset` attribute to control an element’s assets
based on varying media expressions.
In particular, use it for all [`amp-img`](../../../../documentation/components/reference/amp-img.md) tags to specify which image assets to use based on varying screen sizes. AMP will autogenerate a `sizes` attribute, [that meets the HTML5 definition of `sizes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), for all underlying `<img>` tags of `<amp-img>` if the `<amp-img>` has a `srcset` attribute but no `sizes`.

In this simple example,
`srcset` specifies which image to use based on the screen width.
The `w` descriptor tells the browser the width
of each image in the list:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w">
</amp-img>
```
[/example]

[tip type="note"]
**NOTE –**  AMP supports srcset with the `w` descriptor across all browsers.
[/tip]

Learn more about creating responsive images using `srcset`
in [Using Responsive Images (Now)](http://alistapart.com/article/using-responsive-images-now).

## sizes

You can also use the optional AMP `sizes` attribute along with `srcset`.
The AMP `sizes` attribute describes how to calculate the element size
based on any media expression.
<strong>Defining `sizes` on any AMP Element will cause AMP to set an inline style for width on that element according to the matched media query.</strong>
Based on the element’s calculated size,
the user agent selects the most relative source supplied by the `srcset` attribute.

Consider the following example:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw">
</amp-img>
```
[/example]

The `sizes` attribute defines the element’s width to be 50% the size of the viewport
when the viewport is 650px or more.
For example, if the viewport is 800px,
the element’s width is set to 400px.
The browser then selects the `srcset` resource relative to 400px,
assuming the device pixel ratio is 1,
which in this instance is `hummingbird-narrow.jpg` (320px).

[tip type="important"]
**IMPORTANT –** When sizes attribute is specified along with width and height, layout defaults to `responsive`.
[/tip]

Read more about the [AMP `sizes` attribute here](../../../../documentation/guides-and-tutorials/learn/common_attributes.md).

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

[example preview="top-frame" playground="true"]
```html
<amp-img alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%">
</amp-img>
```
[/example]

In this example, the height of the element by default will be 80% of the width, but for the viewport
wider than `500px` it will be capped at `200px`.
