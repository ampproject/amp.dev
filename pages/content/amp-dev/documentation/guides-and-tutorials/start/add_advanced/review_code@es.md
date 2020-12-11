---
$title: Revisar el código de inicio
---

Antes de comenzar a agregar código, revisemos la página [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) de ejemplo, que debería ser la siguiente:

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

Esta es una página de AMP simple que pasa tanto la [validación de AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) como la validación de datos estructurados [schema.org](http://schema.org/). Si esta página se ha implementado en un sitio web de noticias, los usuarios pueden descubrir la página a través de ricas experiencias en Páginas de resultados de motores de búsqueda (por ejemplo, en el Carrusel de historias superiores de la Búsqueda de Google).

## Habilitación de Validator AMP

Antes de modificar la página, habilitemos el [validador de AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) para que sepamos que estamos trabajando con HTML válido de AMP. **Agregue** este identificador de fragmento a su URL:

```text
#development=1
```

Por ejemplo:

```text
http://localhost:8000/article.amp.html#development=1
```

Abra la [Consola del programador en Chrome](https://developer.chrome.com/devtools/docs/console) (o su navegador preferido) y verifique que no haya errores de AMP.

[tip]
Puede utilizar varias otras herramientas para validar su página AMP, como:

- La [extensión de validación AMP para Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- La [extensión de validación AMP para Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/)
- La [interfaz web de validación AMP](https://validator.ampproject.org/)
- ... y muchos más.

Obtenga más información en la guía de páginas de [Validación AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md).
[/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='Simulado en un dispositivo Nexus 5X') }}

## Simular la experiencia móvil

Estamos diseñando esta página para un dispositivo móvil, así que vamos a **simular** la experiencia del dispositivo móvil en las herramientas de desarrollo de su navegador. Por ejemplo, en Chrome DevTools, haz clic en el icono del teléfono móvil y selecciona un dispositivo móvil en el menú.

Ahora, podemos empezar a trabajar en la propia página. Añadamos algunos componentes de AMP a nuestra página.
