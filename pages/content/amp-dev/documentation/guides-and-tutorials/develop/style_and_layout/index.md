---
formats:
  - websites
  - email
  - ads
  - stories
$path: /documentation/guides-and-tutorials/develop/style_and_layout/index.html
$localization:
  path: /{locale}/documentation/guides-and-tutorials/develop/style_and_layout/index.html
$title: Style & layout
$order: 0
description: "Styling and layout on AMP HTML pages is very similar to normal HTML pages – in
both cases, you'll use CSS."
$hidden: true
author: pbakaus
contributors:
  - Meggin
---

Styling and layout on AMP HTML pages is very similar to normal HTML pages – in
both cases, you'll use CSS.

For performance and usability reasons, AMP [limits some CSS styles](style_pages.md) and total bytes to 75,000 per page. However, AMP expands responsive design capabilities with features like [placeholders & fallbacks](placeholders.md),
[advanced art direction via srcset](art_direction.md) and the [layout attribute](control_layout.md) for better control over how your elements display.

[tip type="tip"]
**TIP –** It is super easy to make elements responsive in AMP. Just put `layout="responsive"` on them. To learn more about Responsive Design in AMP, head to [Create Responsive AMP Pages](responsive_design.md).
[/tip]

## Add styles to a page <a name="add-styles-to-a-page"></a>
Each AMP page has a 75,000 byte CSS limit. Styles defined in the head of the document and inline count towards this limit. 

### Define styles in head 

Define CSS within the `<style amp-custom>` tag inside the head of the document. There is only one `<style amp-custom>` tag allowed on each AMP page. 

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

Style AMP components and HTML elements with class or selectors
using common CSS properties:

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

### Define inline styles

AMP allows inline styles:

[sourcecode:html]
<body>
  <p style="color:pink;margin-left:30px;">Hello, Kitty.</p>
</body>
[/sourcecode]

Each instance of an inline style has a 1,000 byte limit. Inline styles count toward the total 75,000 byte limit. 


## Layout elements responsively

Specify the size and position for all visible AMP elements
by providing a `width` and `height` attribute.
These attributes imply the aspect ratio of the element,
which can then scale with the container.

Set the layout to responsive.
This sizes the element to the width of its container element
and resizes its height automatically to the aspect ratio given by width and height attributes.

[tip type="read-on"]
**READ ON –** Learn more about [supported layouts in AMP](control_layout.md)
[/tip]

## Provide placeholders & fallbacks

The built-in support for placeholders and fallbacks means your users never have to stare at a blank screen again.

[tip type="read-on"]
**READ ON –** Learn more about [Placeholders and fallbacks](placeholders.md)
[/tip]

## Art direct your images

AMP supports both `srcset` and `sizes` attributes to give you fine grained control, of which images to load in which scenario.

[tip type="read-on"]
**READ ON –** Learn more about [art direction with srcset and sizes](art_direction.md)
[/tip]

## Validate your styles and layout

Use the AMP validator to test
your page's CSS and layout values.

The validator confirms that your page’s CSS doesn’t exceed 75,000 bytes limit,
checks for disallowed styles, and ensures that the page's layout
is supported and correctly formatted.
See also this complete list of [Style and layout errors](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md#style-and-layout-errors).

Example error in console for page with CSS that exceeds the 75,000 bytes limit:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

[tip type="read-on"]
**READ ON –** Learn more about how to [validate and fix your AMP pages](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)
[/tip]
