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

However, AMP limits some use of CSS for performance and usability reasons, while
expanding responsive design capabilities with features like [placeholders & fallbacks](placeholders.md),
[advanced art direction via srcset](art_direction.md) and the [layout attribute](control_layout.md) for better control over how your elements display.

[tip type="tip"]
**TIP –** It is super easy to make elements responsive in AMP. Just put `layout="responsive"` on them. To learn more about Responsive Design in AMP, head to [Create Responsive AMP Pages](responsive_design.md).
[/tip]

[video src='https://www.youtube.com/watch?v=y6kA3u3GIws' caption='Watch UpperQuad talk about the AMPproject site redesign, including the challenges of using AMP for the first time.']

## Add styles to a page <a name="add-styles-to-a-page"></a>

Add your CSS inside a `<style amp-custom>` tag in the head of the document.
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

[tip type="important"]
**IMPORTANT –** Make sure there’s only one `<style amp-custom>` tag on your page, as more than one isn’t allowed in AMP.
[/tip]

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

[tip type="important"]
**IMPORTANT –**: Check that your styles are supported in AMP; some styles aren't for performance reasons (see also [Supported CSS](style_pages.md)).
[/tip]

If needed, AMP also allows inline styles. For example:

[sourcecode:html]

<body>
  <p style="color:pink;margin-left:30px;">Hello, Kitty.</p>
</body>
[/sourcecode]

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

The validator confirms that your page’s CSS doesn’t exceed 50,000 bytes limit,
checks for disallowed styles, and ensures that the page's layout
is supported and correctly formatted.
See also this complete list of [Style and layout errors](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md#style-and-layout-errors).

Example error in console for page with CSS that exceeds the 50,000 bytes limit:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

[tip type="read-on"]
**READ ON –** Learn more about how to [validate and fix your AMP pages](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)
[/tip]
