---
formats:
- websites
- email
- ads
- stories
"$path": "/documentation/guides-and-tutorials/develop/style_and_layout/index.html"
"$localization":
  path: "/{locale}/documentation/guides-and-tutorials/develop/style_and_layout/index.html"
"$title": Style & Layout
"$order": '0'
description: |-
  Styling and layout on AMP HTML pages is very similar to normal HTML pages – in
 "both cases, you'll use CSS."
"$hidden": 'true'
author: pbakaus
contributors:
- Meggin
---

Styling and layout on AMP HTML pages is very similar to normal HTML pages – in both cases, you'll use CSS.

For performance and usability reasons, AMP [limits some CSS styles](style_pages.md) and total bytes to 75,000 per page. However, AMP expands responsive design capabilities with features like [placeholders & fallbacks](placeholders.md), [advanced art direction via srcset](art_direction.md) and the [layout attribute](control_layout.md) for better control over how your elements display.

[tip type="tip"] **TIP –** It is super easy to make elements responsive in AMP. Just put `layout="responsive"` on them. To learn more about Responsive Design in AMP, head to [Create Responsive AMP Pages](responsive_design.md). [/tip]

## Add styles to a page <a name="add-styles-to-a-page"></a>

Jede AMP Seite hat ein CSS Limit von 75.000 Byte. Styles, die im Header des Dokuments oder inline definiert sind, werden auf dieses Limit angerechnet.

### Definiere Styles im Header

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

Gestalte AMP Komponenten und HTML Elemente mithilfe von Klassen oder Selektoren und verwende dafür allgemeine CSS Eigenschaften:

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

### Definiere Inline Styles

AMP erlaubt inline Styles:

[sourcecode:html]
<body>
  <p style="color:pink;margin-left:30px;">Hello, Kitty.</p>
</body>
[/sourcecode]

Jede Instanz eines Inline Styles hat ein Limit von 1.000 Byte. Inline Styles werden auf das Limit von 75.000 Byte angerechnet.

## Layout elements responsively

Lege die Größe und Position aller sichtbaren AMP Elemente fest, indem du die Attribute `width` und `height` angibst. Diese Attribute implizieren das Seitenverhältnis des Elements, das dann mit dem Container skaliert werden kann.

Set the layout to responsive. This sizes the element to the width of its container element and resizes its height automatically to the aspect ratio given by width and height attributes.

[tip type="read-on"] **READ ON –** Learn more about [supported layouts in AMP](control_layout.md) [/tip]

## Provide placeholders & fallbacks

The built-in support for placeholders and fallbacks means your users never have to stare at a blank screen again.

[tip type="read-on"] **READ ON –** Learn more about [Placeholders and fallbacks](placeholders.md) [/tip]

## Art direct your images

AMP unterstützt die Attribute `srcset` und `sizes`. Dadurch kannst du präzise steuern, welche Bilder in welchem Szenario geladen werden.

[tip type="read-on"] **READ ON –** Learn more about [art direction with srcset and sizes](art_direction.md) [/tip]

## Validate your styles and layout

Verwende den AMP Validator, um die Werte für CSS und Layout deiner Seite zu testen.

Der Validator bestätigt, dass das CSS deiner Seite das Limit von 75.000 Byte einhält, sucht nach unzulässigen Styles und stellt sicher, dass das Seitenlayout unterstützt wird und korrekt formatiert ist. Siehe auch diese vollständige Liste der [Fehler bei Style und Layout](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md#style-and-layout-errors).

Beispiel eines Fehlers in der Konsole für eine Seite mit CSS, die das Limit von 75.000 Byte überschreitet:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

[tip type="read-on"] **READ ON –** Learn more about how to [validate and fix your AMP pages](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) [/tip]
