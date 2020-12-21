---
formats:
- websites
- email
- ads
- stories
"$path": "/documentation/guides-and-tutorials/develop/style_and_layout/index.html"
"$localization":
  path: "/{locale}/documentation/guides-and-tutorials/develop/style_and_layout/index.html"
"$title": Style & layout
"$order": '0'
description: |-
  Styling and layout on AMP HTML pages is very similar to normal HTML pages – in
 "both cases, you'll use CSS."
"$hidden": 'true'
author: pbakaus
contributors:
- Meggin
---

Das Styling und Layout von AMP HTML Seiten ist gewöhnlichen HTML Seiten sehr ähnlich. In beiden Fällen verwendest du CSS.

Aus Gründen der Leistung und Benutzerfreundlichkeit beschränkt AMP einige [CSS Styles](style_pages.md) sowie die Gesamtanzahl der Bytes auf 75.000 pro Seite. AMP erweitert jedoch die Funktionen für reaktionsschnelles Design durch Funktionen wie [Platzhalter & Fallbacks](placeholders.md), [erweiterte Art Direction via srcset](art_direction.md) und das [Layoutattribut](control_layout.md), damit du die Anzeige deiner Elemente besser steuern kannst.

[tip type="tip"] **TIPP –** Es ist ganz leicht, Elemente in AMP reaktionsschnell zu machen. Setze sie einfach auf `layout="responsive"`. Mehr Infos über Reaktionsschnelles Design in AMP findest du unter [Erstelle reaktionsschnelle AMP Seiten](responsive_design.md). [/tip]

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

AMP allows inline styles:

[sourcecode:html]
<body>
  <p style="color:pink;margin-left:30px;">Hello, Kitty.</p>
</body>
[/sourcecode]

Jede Instanz eines Inline Styles hat ein Limit von 1.000 Byte. Inline Styles werden auf das Limit von 75.000 Byte angerechnet.

## Layout elements responsively

Specify the size and position for all visible AMP elements by providing a `width` and `height` attribute. These attributes imply the aspect ratio of the element, which can then scale with the container.

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
