---
'$title': Besprechung des Startercodes
$order: 1
description: Bevor wir beginnen, Code hinzuzufügen, sehen wir uns die Beispielseite article.amp.html an. Sie sollte …
---

Bevor wir beginnen, Code hinzuzufügen, sehen wir uns die Beispielseite [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) an. Sie sollte wie folgt aussehen:

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

Das ist eine einfache AMP Seite, die sowohl die [AMP Validierung](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) als auch die Validierung der strukturierten Daten von [schema.org](http://schema.org/) besteht. Wird diese Seite zu Beispiel auf einer Nachrichtenwebsite bereitgestellt, so finden Benutzer sie via Rich Snippets bzw. Cards auf den Ergebnisseiten von Suchmaschinen (z. B. im Schlagzeilenkarussell der Google-Suche).

## AMP Validator aktivieren

Bevor wir die Seite verändern, aktivieren wir den [AMP Validator](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), um sicherzustellen, dass das verwendete AMP HTML gültig ist. **Füge** diese Fragment-ID zu deiner URL hinzu:

```text
#development=1
```

Zum Beispiel:

```text
http://localhost:8000/article.amp.html#development=1
```

Öffne die [Entwicklerkonsole](https://developer.chrome.com/devtools/docs/console) in Chrome (oder in deinem bevorzugten Browser) und stelle sicher, dass keine AMP Fehler vorliegen.

[tip] Du kannst auch andere Tools verwenden, um deine AMP Seite zu validieren, z. B.:

- die [AMP Validator Erweiterung für Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- die [AMP Validator Erweiterung für Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/)
- die [Webschnittstelle für AMP Validator](https://validator.ampproject.org/)
- … und viele andere

Weitere Informationen findest du im Leitfaden [Validierung von AMP Seiten](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). [/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='Simuliert auf einem Nexus 5X Gerät') }}

## Simulation der mobilen Erfahrung

Diese Seite ist für ein mobiles Gerät gedacht. Also wollen wir die mobile Erfahrung in den Entwicklertools deines Browsers **simulieren**. Dazu kannst du beispielsweise in Chrome DevTools auf das Smartphone Symbol klicken und im Menü ein Mobilgerät auswählen.

Nun können wir mit dem Aufbau der Seite beginnen. Fügen wir unserer Seite einige AMP Komponenten hinzu.
