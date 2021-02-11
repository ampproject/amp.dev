---
'$title': Révision du code de démarrage
$order: 1
description: "Avant de commencer à ajouter du code, passons en revue l'exemple de page article.amp.html, qui devrait être comme suit : ..."
---

Avant de commencer à ajouter du code, passons en revue l'exemple de page [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html), qui devrait être comme suit :

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

Il s'agit d'une page AMP simple qui passe à la fois la [validation AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) et la validation des données structurées [schema.org](http://schema.org/). Si cette page a été déployée sur un site Internet d'actualités, les utilisateurs peuvent découvrir la page à travers des expériences riches dans les pages de résultats du moteur de recherche (par exemple, les carrousel des stories les plus populaires dans la recherche Google).

## Activation du validateur AMP

Avant de modifier la page, activons le [validateur AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) afin de savoir si nous travaillons avec du HTML AMP valide. **Ajoutez** cet identifiant de fragment à votre URL :

```text
#development=1
```

Par exemple :

```text
http://localhost:8000/article.amp.html#development=1
```

Ouvrez la [console de développement](https://developer.chrome.com/devtools/docs/console) dans Chrome (ou votre navigateur préféré) et vérifiez qu'il n'y a aucune erreur AMP.

[tip] Vous pouvez utiliser plusieurs autres outils pour valider votre page AMP, comme :

- L'[extension Validateur AMP pour Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- L'[extension Validateur AMP pour Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/)
- L'[interface Web Validateur AMP](https://validator.ampproject.org/)
- ... et beaucoup plus

Apprenez-en davantage dans le guide [Valider les pages AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). [/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='Simulated on a Nexus 5X device') }}

## Simuler l'expérience mobile

Nous concevons cette page pour un appareil mobile, alors **simulons** l'expérience de l'appareil mobile dans les outils de développement de votre navigateur. Par exemple, dans Chrome DevTools, cliquez sur l'icône du téléphone mobile et sélectionnez un appareil mobile dans le menu.

Maintenant, nous pouvons commencer à travailler sur la page elle-même. Ajoutons quelques composants AMP à notre page.
