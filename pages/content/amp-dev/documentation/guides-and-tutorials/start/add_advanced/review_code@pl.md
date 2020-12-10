---
'$title': Analiza kodu startowego
'$order': '1'
description: Zanim zaczniemy dodawać kod, przeanalizujmy przykładową stronę article.amp.html, która powinna wyglądać następująco...
---

Zanim zaczniemy dodawać kod, przeanalizujmy przykładową stronę article.amp.html, która powinna wyglądać następująco:

```html
<!DOCTYPE html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />

    <link rel="canonical" href="/article.html" />
    <link rel="shortcut icon" href="amp_favicon.png" />

    <title>News Article</title>

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
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://example.com/my-article.html"
        },
        "headline": "My First AMP Article",
        "image": {
          "@type": "ImageObject",
          "url": "https://example.com/article_thumbnail1.jpg",
          "height": 800,
          "width": 800
        },
        "datePublished": "2015-02-05T08:00:00+08:00",
        "dateModified": "2015-02-05T09:20:00+08:00",
        "author": {
          "@type": "Person",
          "name": "John Doe"
        },
        "publisher": {
          "@type": "Organization",
          "name": "⚡ AMP Times",
          "logo": {
            "@type": "ImageObject",
            "url": "https://example.com/amptimes_logo.jpg",
            "width": 600,
            "height": 60
          }
        },
        "description": "My first experience in an AMPlified world"
      }
    </script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>

      <amp-img
        src="mountains.jpg"
        layout="responsive"
        width="266"
        height="150"
      ></amp-img>
    </article>
  </body>
</html>
```

Jest to prosta strona AMP, która przechodzi zarówno walidację [AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), jak i walidację danych strukturalnych [schema.org](http://schema.org/). Jeśli strona ta została umieszczona w witrynie internetowej z wiadomościami, użytkownicy mogą ją odkryć dzięki bogatym doświadczeniom na stronach wyników wyszukiwania (np. karuzela Top Stories w wyszukiwarce Google).

## Włączanie narzędzia AMP Validator

Zanim zmodyfikujemy stronę, włączmy [walidator AMP ](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), żebyśmy wiedzieli, czy pracujemy z prawidłowym kodem AMP HTML. **Dodaj** ten identyfikator fragmentu do Twojego adresu URL:

```text
#development=1
```

Przykład:

```text
http://localhost:8000/article.amp.html#development=1
```

Otwórz [konsolę programistyczną](https://developer.chrome.com/devtools/docs/console) w Chrome (lub preferowanej przez Ciebie przeglądarce) i sprawdź, czy nie ma błędów AMP.

[tip] Możesz użyć kilku innych narzędzi do walidacji strony AMP, np:

- [Rozszerzenia AMP Validator do przeglądarki Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- [Rozszerzenia AMP Validator do przeglądarki Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/)
- [Interfejsu internetowego narzędzia AMP Validator](https://validator.ampproject.org/)
- ...i wielu innych

Dowiedz się więcej z przewodnika [Walidacja stron AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). [/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='Simulated on a Nexus 5X device') }}

## Symulacja działania na urządzeniu mobilnym

Projektujemy tę stronę na urządzenie mobilne, więc **zasymulujmy** jej działanie na urządzeniu mobilnym w narzędziach programistycznych Twojej przeglądarki. Na przykład w konsoli DevTools w Chrome kliknij ikonę telefonu komórkowego, a następnie wybierz z menu żądane urządzenie mobilne.

Teraz możemy zacząć pracować nad samą stroną. Dodajmy kilka składników AMP do naszej strony.
