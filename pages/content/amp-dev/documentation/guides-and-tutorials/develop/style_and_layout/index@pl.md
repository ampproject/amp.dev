---
formats:
  - websites
  - email
  - ads
  - stories
'$path': '/documentation/guides-and-tutorials/develop/style_and_layout/index.html'
'$localization':
  path: '/{locale}/documentation/guides-and-tutorials/develop/style_and_layout/index.html'
'$title': Style & layout
$order: 0
description: Określanie stylów i układ na stronach AMP HTML jest bardzo podobne jak w przypadku zwykłych stron HTML — w obu przypadkach będziesz używać CSS.
'$hidden': 'true'
author: pbakaus
contributors:
  - Meggin
---

Styling and layout on AMP HTML pages is very similar to normal HTML pages – in both cases, you'll use CSS.

Ze względu na wydajność i użyteczność, AMP [ogranicza niektóre style CSS](style_pages.md) i całkowitą liczbę bajtów do 75 000 na jedną stronę. AMP rozszerza jednak możliwości responsywnego projektowania o funkcje takie jak: [symbole zastępcze i zasoby rezerwowe](placeholders.md), [zaawansowane sterowanie grafiką przy użyciu atrybutu srcset](art_direction.md) oraz [atrybut layout](control_layout.md) zwiększający kontrolę nad sposobem wyświetlania elementów.

[tip type="tip"] **PORADA —** w AMP bardzo łatwo jest tworzyć elementy responsywne. Wystarczy umieścić w nich `layout="responsive"`. Aby dowiedzieć się więcej o projektowaniu elementów responsywnych w AMP, przejdź do artykułu [Tworzenie responsywnych stron AMP](responsive_design.md). [/tip]

## Add styles to a page <a name="add-styles-to-a-page"></a>

Każda strona AMP ma limit 75 000 bajtów kodu CSS. Style zdefiniowane w nagłówku dokumentu i inline liczą się do tego limitu.

### Definiowanie stylów w sekcji head

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

Style AMP components and HTML elements with class or selectors using common CSS properties:

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

W AMP można stosować style inline:

[sourcecode:html]

<body>
  <p style="color:pink;margin-left:30px;">Hello, Kitty.</p>
</body>
[/sourcecode]

Każde wystąpienie stylu inline ma limit 1000 bajtów. Style inline liczą się do całkowitego limitu 75 000 bajtów.

## Layout elements responsively

Określ rozmiar i położenie wszystkich widocznych elementów AMP poprzez podanie atrybutów `width` i ` height`. Atrybuty te określają współczynnik proporcji elementu, który można następnie skalować wraz z kontenerem.

Set the layout to responsive. This sizes the element to the width of its container element and resizes its height automatically to the aspect ratio given by width and height attributes.

[tip type="read-on"] **READ ON –** Learn more about [supported layouts in AMP](control_layout.md) [/tip]

## Provide placeholders & fallbacks

The built-in support for placeholders and fallbacks means your users never have to stare at a blank screen again.

[tip type="read-on"] **READ ON –** Learn more about [Placeholders and fallbacks](placeholders.md) [/tip]

## Art direct your images

AMP supports both `srcset` and `sizes` attributes to give you fine grained control, of which images to load in which scenario.

[tip type="read-on"] **READ ON –** Learn more about [art direction with srcset and sizes](art_direction.md) [/tip]

## Validate your styles and layout

Use the AMP validator to test your page's CSS and layout values.

The validator confirms that your page’s CSS doesn’t exceed 75,000 bytes limit, checks for disallowed styles, and ensures that the page's layout is supported and correctly formatted. See also this complete list of [Style and layout errors](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md#style-and-layout-errors).

Przykładowy błąd w konsoli, dotyczący strony z kodem CSS, który przekracza limit 75 000 bajtów:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

[tip type="read-on"] **READ ON –** Learn more about how to [validate and fix your AMP pages](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) [/tip]
