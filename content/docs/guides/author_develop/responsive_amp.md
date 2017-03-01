---
$title: Styling & Layout
$order: 0
---

Styling and layout on AMP HTML pages is very similar to normal HTML pages – in
both cases, you'll use CSS.

However, AMP limits some use of CSS for performance and usability reasons, while
expanding responsive design capabilities with features like [placeholders & fallbacks](/docs/guides/responsive/placeholders.html),
[advanced art direction via srcset](/docs/guides/responsive/art_direction.html) and the [layout attribute](/docs/guides/responsive/control_layout.html) for better control over how your elements display.

{% call callout('Tip', type='success') %}
It is super easy to make elements responsive in AMP. Just put `layout="responsive"` on them.
{% endcall %}

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

{% call callout('Important', type='caution') %}
Make sure there’s only one `<style amp-custom>` tag on your page,
as more than one isn’t allowed in AMP.
{% endcall %}

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
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

{% call callout('Important', type='caution') %}
Check that your styles are supported in AMP;
some styles aren't for performance reasons
(see also [Supported CSS](/docs/guides/responsive/style_pages.html)).
{% endcall %}

## Layout elements responsively

Specify the size and position for all visible AMP elements
by providing a `width` and `height` attribute.
These attributes imply the aspect ratio of the element,
which can then scale with the container.

Set the layout to responsive.
This sizes the element to the width of its container element
and resizes its height automatically to the aspect ratio given by width and height attributes.

{% call callout('Read on', type='read') %}
Learn more about [supported layouts in AMP](/docs/guides/responsive/control_layout.html)
{% endcall %}

## Provide placeholders & fallbacks

The built-in support for placeholders and fallbacks means your users never have to stare at a blank screen again.

{% call callout('Read on', type='read') %}
Learn more about [Placeholders and fallbacks](/docs/guides/responsive/placeholders.html)
{% endcall %}

## Art direct your images

AMP supports both `srcset` and `sizes` attributes to give you fine grained control, of which images to load in which scenario.

{% call callout('Read on', type='read') %}
Learn more about [art direction with srcset and sizes](/docs/guides/responsive/art_direction.html)
{% endcall %}

## Validate your styles and layout

Use the AMP validator to test
your page's CSS and layout values.

The validator confirms that your page’s CSS doesn’t exceed 50,000 bytes limit,
checks for disallowed styles, and ensures that the page's layout
is supported and correctly formatted.
See also this complete list of [Style and layout errors](/docs/reference/validation_errors.html#style-and-layout-errors).

Example error in console for page with CSS that exceeds the 50,000 bytes limit:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

{% call callout('Read on', type='read') %}
Learn more about how to [validate and fix your AMP pages](/docs/guides/validate.html)
{% endcall %}
