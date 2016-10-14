---
$title: Styling & Layout
$order: 0
---
[TOC]

Styling and layout on AMP HTML pages is very similar to normal HTML pages – in
both cases, you'll use CSS.

However, AMP limits some use of CSS for performance and usability reasons, while
expanding responsive design capabilities with features like [placeholders & fallbacks](/docs/guides/responsive/placeholders.html),
[advanced art direction via srcset](https://ampproject.local/docs/guides/responsive/art_direction.html) and the [layout attribute](https://ampproject.local/docs/guides/responsive/control_layout.html) for better control over how your elements display.

<aside class="success">
  <strong>Tip:</strong>
  <span>It is super easy to make elements responsive in AMP.
Just put <code>layout="responsive"</code> on them.</span>
</aside>



## Add styles to a page

Add all CSS inside a `<style amp-custom>` tag in the head of the document.
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


## Layout elements responsively

Specify the size and position for all visible AMP elements
by providing a `width` and `height` attribute.
These attributes imply the aspect ratio of the element,
which can then scale with the container.

Set the layout to responsive.
This sizes the element to the width of it's container element
and resizes its height automatically to the aspect ratio given by width and height attributes.

<aside class="success">
  <strong>Read on:</strong>
  <span>Learn more about <a href="/docs/guides/responsive/control_layout.html">supported layouts in AMP</a>.</span>
</aside>

## Provide placeholders & fallbacks

The built-in support for placeholders and fallbacks means your users never have to stare at a blank screen again.

<aside class="success">
  <strong>Read on:</strong>
  <span>Learn more about <a href="/docs/guides/responsive/placeholders.html">Placeholders and fallbacks</a>.</span>
</aside>

## Art direct your images

AMP supports both `srcset` and `sizes` attributes to give you fine grained control, of which images to load in which scenario.

<aside class="success">
  <strong>Read on:</strong>
  <span>Learn more about <a href="/docs/guides/responsive/art_direction.html">art direction with srcset and sizes</a>.</span>
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
  <strong>Read on:</strong>
  <span>Learn more about how to <a href="/docs/guides/validate.html">validate and fix your AMP pages</a>.</span>
</aside>
