---
layout: page
title: Create Responsive AMP Pages
order: 0
folder: responsive
---

It is super easy to make responsive elements in AMP.
Just put `layout=responsive` on them.

{% include toc.html %}

## Create responsive images

All externally-loaded resources including images,
must have a specified size and position
so as the resources load, the page won't jump and reflow.

Create responsive images
by specifying the width and height,
setting layout to responsive,
and indicating with [`srcset`](/docs/guides/responsive/style_pages.html)
which image asset to use based on varying screen sizes:

{% highlight html %}
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg" 640w,
           "/img/narrow.jpg" 320w
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
{% endhighlight %}

This `amp-img` element automatically fits the width
of its container element,
and its height is automatically set to the aspect ratio
determined by the given width and height:

<amp-img src="/docs/assets/responsive_amp_img.png" width="500" height="857" layout="responsive"></amp-img>

See also [AMP by Example's amp-img](https://ampbyexample.com/components/amp-img/).

## Add styles to a page

Add all styles inside the `<style amp-custom>` tag
in the head of the document. 
For example:

{% highlight html %}
<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html" >
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
{% endhighlight %}

**Important:**
Make sure there’s only one `<style amp-custom>` tag on your page,
as more than one isn’t allowed in AMP.

Define component styles with class or element selectors
using common CSS properties. For example:

{% highlight html %}
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg" 640w,
           "/img/kitten.jpg" 320w
    width=500
    height=300>
    layout="responsive"
  </amp-img>
</body>
{% endhighlight %}

**Important:**
Check that your styles are supported in AMP;
some styles aren't for performance reasons
(see also [Supported CSS](/docs/guides/responsive/style_pages.html)).

## Size and position elements

AMP uncouples document layout from resource loading
so that AMP can load the layout of the page without waiting for resource downloads.

Specify the size and position for all visible AMP elements
by providing a `width` and `height` attribute.
These attributes imply the aspect ratio of the element,
which can then scale with the container.

Set the layout to responsive.
This sizes the element to the width of it's container element
and resizes its height automatically to the aspect ratio given by width and height attributes.

Learn more about [supported layouts in AMP](/docs/guides/responsive/control_layout).

## Validate your styles and layout

Use the AMP validator to test
your page's CSS and layout values.

The validator confirms that your page’s CSS doesn’t exceed 50,000 bytes limit,
checks for disallowed styles, and ensures that the page's layout
is supported and correctly formatted.
See also this complete list of [Style and layout errors](/docs/reference/validation_errors.html#style-and-layout-errors).

Example error in console for page with CSS that exceeds the 50,000 bytes limit:

<amp-img src="/docs/assets/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

Learn more about how to [validate your AMP pages](/docs/guides/validate.html),
including how to track down style errors and fix them.