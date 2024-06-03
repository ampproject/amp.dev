---
'$title': Revisão do código inicial
$order: 1
description: 'Antes de começar a adicionar código, revise a página de exemplo article.amp.html, que terá uma aparência semelhante a esta: ...'
---

Antes de começar a adicionar código, revise a página de exemplo [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html), que terá uma aparência semelhante a esta:

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

Essa é uma página AMP simples que passa tanto pela [validação da AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) quanto pela validação de dados estruturados de [schema.org](http://schema.org/). Se essa página fosse implementada em um site de notícias, os usuários poderiam descobri-la por meio de experiências avançadas nas páginas de resultados do mecanismo de pesquisa. Por exemplo, no carrossel de notícias principais da Pesquisa Google.

## Ativar o validador de AMP

Antes de alterar a página, ative o [validador de AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) para ter certeza de que está trabalhando com um HTML para AMP válido. **Adicione** este identificador de fragmento ao URL:

```text
# development=1

```

Exemplo:

```text
http://localhost:8000/article.amp.html#development=1
```

Abra o [Developers Console](https://developer.chrome.com/devtools/docs/console) no Chrome (ou outro navegador preferido) e verifique se há erros de AMP.

[tip] É possível usar várias outras ferramentas para validar a página AMP, como:

- a [extensão AMP Validator para Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc);
- a [extensão AMP Validator para Opera](https://addons.opera.com/pt-br/extensions/details/amp-validator/);
- a [interface da Web do validador de AMP](https://validator.ampproject.org/);
- … e muito mais.

Saiba mais no guia [Validar páginas AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). [/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='Simulated on a Nexus 5X device') }}

## Simular a experiência móvel

A página é projetada para dispositivos móveis, então, **simule** a experiência no dispositivo móvel nas ferramentas para desenvolvedores do seu navegador. Por exemplo, no Chrome DevTools, clique no ícone de smartphone e selecione um dispositivo móvel no menu.

Agora, é possível começar a trabalhar na página. Adicione alguns componentes de AMP à página.
