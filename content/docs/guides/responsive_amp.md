---
$title: Styling & Layout
$order: 0
---
[TOC]

It is super easy to make elements responsive in AMP.
Just put `layout="responsive"` on them.

## Create responsive images

All externally-loaded resources including images,
must have a specified size and position
so as the resources load, the page won't jump and reflow.

Create responsive images
by specifying the width and height,
setting layout to responsive,
and indicating with [`srcset`](/docs/guides/responsive/style_pages.html)
which image asset to use based on varying screen sizes:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

This `amp-img` element automatically fits the width
of its container element,
and its height is automatically set to the aspect ratio
determined by the given width and height. Try it out by resizing this browser window:

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

<aside class="success">
  <strong>Tip:</strong>
  <span>See our side-by-side live demo of <code>amp-img</code> for a basic and advanced example: <a href="https://ampbyexample.com/components/amp-img/">Live Demo</a></span>
</aside>

## Add styles to a page

Add all styles inside a `<style amp-custom>` tag in the head of the document.
For example:

[sourcecode:html]
<!doctype html>
  <head>
    ...
    <style amp-custom>
      /* any custom styles go here. */
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
    ...
  </head>
[/sourcecode]

<aside class="caution">
  <strong>Important:</strong>
  <span>Make sure there’s only one <code>&lt;style amp-custom&gt;</code> tag on your page,
as more than one isn’t allowed in AMP.</span>
</aside>

Define component styles with class or element selectors
using common CSS properties. For example:

[sourcecode:html]
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive"
  </amp-img>
</body>
[/sourcecode]

<aside class="caution">
  <strong>Important:</strong>
  <span>Check that your styles are supported in AMP;
some styles aren't for performance reasons
(see also <a href="/docs/guides/responsive/style_pages.html">Supported CSS</a>).</span>
</aside>


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

<aside class="success">
  <strong>Tip:</strong>
  <span>Learn more about <a href="/docs/guides/responsive/control_layout.html">supported layouts in AMP</a>.</span>
</aside>

## Validate your styles and layout

Use the AMP validator to test
your page's CSS and layout values.

The validator confirms that your page’s CSS doesn’t exceed 50,000 bytes limit,
checks for disallowed styles, and ensures that the page's layout
is supported and correctly formatted.
See also this complete list of [Style and layout errors](/docs/reference/validation_errors.html#style-and-layout-errors).

Example error in console for page with CSS that exceeds the 50,000 bytes limit:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

<aside class="success">
  <strong>Tip:</strong>
  <span>Learn more about how to <a href="/docs/guides/validate.html">validate and fix your AMP pages</a>.</span>
</aside>
