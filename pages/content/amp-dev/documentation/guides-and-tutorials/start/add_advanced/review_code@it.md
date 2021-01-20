---
"$title": Revisione del codice di avvio
"$order": '1'
description: 'Prima di iniziare ad aggiungere codice, esaminiamo la pagina di esempio article.amp.html, che dovrebbe essere la seguente: ...'
---

Prima di iniziare ad aggiungere codice, esaminiamo la pagina di esempio [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) che dovrebbe essere la seguente:

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

Questa è una semplice pagina AMP che supera sia la [convalida AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) che la convalida dei dati strutturati di [schema.org](http://schema.org/). Se questa pagina è distribuita su un sito web di notizie, gli utenti possono individuarla attraverso moduli avanzati nelle pagine di risultati dei motori di ricerca (ad esempio, le sequenze delle notizie principali in Google Search).

## Abilitazione dello strumento di convalida AMP

Prima di modificare la pagina, abilitiamo lo strumento di [convalida AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) per sapere se stiamo lavorando con codice AMP HTML valido. **Aggiungere** questo identificatore di frammento al proprio URL:

```text
# development=1

```

Per esempio:

```text
http://localhost:8000/article.amp.html#development=1
```

Aprire la [Console degli sviluppatori](https://developer.chrome.com/devtools/docs/console) in Chrome (o sul proprio browser preferito), e verificare che non ci sono errori AMP.

[tip] Si possono utilizzare diversi altri strumenti per convalidare le pagine AMP, quali:

- L'[estensione AMP Validator di Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- L'[estensione AMP Validator per Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/)
- L'[interfaccia web AMP validator](https://validator.ampproject.org/)
- ... e molto altro

Ulteriori informazioni sono disponibili nella guida alla [convalida delle pagine AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). [/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='Simulated on a Nexus 5X device') }}

## Simulazione di applicazioni mobili

Stiamo progettando questa pagina per un dispositivo mobile, quindi **simuliamo** l'esperienza di utilizzo di un dispositivo mobile negli strumenti di sviluppo del browser. Ad esempio, in Chrome DevTools, fare clic sull'icona del cellulare e selezionare un dispositivo mobile dal menu.

Ora possiamo iniziare a lavorare sulla pagina stessa. Aggiungiamo alcuni componenti AMP alla nostra pagina.
