---
'$title': Zapoznanie się z kodem startowym
$order: 1
description: Strona AMP jest stroną HTML z pewnymi ograniczeniami, zapewniającymi jej niezawodne działanie. Strony AMP zawierają nieco specjalnych znaczników, które identyfikują je jako strony AMP.
---

## Standardowy kod AMP

Strona AMP jest stroną HTML z pewnymi ograniczeniami, zapewniającymi jej niezawodne działanie. Strony AMP zawierają nieco specjalnych znaczników, które identyfikują je jako strony AMP.

Podstawowa strona AMP wygląda tak:

```html
<!DOCTYPE html>
<html amp>
  <head>
    <meta charset="utf-8" />
    <link rel="canonical" href="hello-world.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello World!
  </body>
</html>
```

[tip] W celu szybkiego utworzenia podstawowego szkieletu strony AMP można użyć [generatora kodu standardowego](https://amp.dev/boilerplate). Dostarcza on również fragmenty kodu danych strukturalnych, umożliwiające utworzenie PWA itd.! [/tip]

## Składniki AMP

Kod startowy samouczka ([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)) tworzy podstawową stronę AMP z jej zawartością (obrazami, tekstem, itd.), a także zawiera kilka składników AMP:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
<script
  async
  custom-template="amp-mustache"
  src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"
></script>
<script
  async
  custom-element="amp-form"
  src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
></script>
<script
  async
  custom-element="amp-selector"
  src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"
></script>
```

Składniki AMP oferują dodatkową funkcjonalność i składniki interfejsu użytkownika dodające bogatą interaktywność na stronie AMP. Kod startowy wykorzystuje następujące składniki AMP:

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): karuzela obrazów, która wyświetla wiele widoków produktu.
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): system generowania szablonów do renderowania odpowiedzi serwera ze składnika amp-form.
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): dodaje specjalne funkcje elementów `<form>`, które są niezbędne dla stron AMP.
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): oferuje semantyczny sposób wyboru jednego lub wielu elementów z grupy elementów. Można go użyty jako źródła danych wejściowych składnika amp-form.

## Podstawowa interaktywność

Kod startowy oferuje pewną podstawową interaktywność:

- Karuzela obrazów (składnik [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)) wyświetla wiele widoków produktu.
- Produkt można dodać do koszyka użytkownika (przy użyciu składnika [`amp-form`](../../../../documentation/components/reference/amp-form.md)), dotykając przycisku „Add to cart” u dołu strony.

**Wypróbuj to**: przesuń karuzelę z obrazami i dotknij przycisku „Add to cart”.
