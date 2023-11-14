---
'$title': Обзор стартового кода
$order: 1
description: 'Прежде чем мы начнем добавлять код, рассмотрим в качестве примера страницу article.amp.html, которая имеет следующий вид: ...'
---

Прежде чем мы начнем добавлять код, рассмотрим в качестве примера страницу [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html), которая имеет следующий вид:

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
    <script async src="https://ampjs.org/v0.js"></script>
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

Это простая AMP-страница, которая проходит как [валидацию AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), так и проверку структурированных данных [schema.org](http://schema.org/). Если эта страница была развернута на новостном сайте, пользователи могут найти ее с помощью расширенных возможностей на страницах результатов поисковой системы (например, с помощью кольцевой галереи главных новостей в Поиске Google).

## Активация AMP-валидатора

Прежде чем вносить изменения в страницу, давайте включим [AMP-валидатор](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), чтобы мы знали, что работаем с корректно сформированным AMP HTML. **Добавьте** в свой URL следующий идентификатор фрагмента:

```text
#development=1
```

Например:

```text
http://localhost:8000/article.amp.html#development=1
```

Откройте [консоль разработчика](https://developer.chrome.com/devtools/docs/console) в Chrome (или в предпочитаемом вами браузере) и убедитесь, что в ней отсутствуют ошибки AMP.

[tip] Вы можете использовать ряд других инструментов для валидации своей AMP-страницы, например, таких как:

- Расширение [AMP Validator для Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- Расширение [AMP Validator для Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/)
- [Веб-интерфейс AMP-валидатора](https://validator.ampproject.org/)
- ... и многие другие

Дополнительные сведения см. в руководстве по [валидации AMP-страниц](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). [/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='Simulated on a Nexus 5X device') }}

## Имитация мобильного опыта

Мы разрабатываем страницу для мобильного устройства, поэтому давайте **смоделируем работу** с мобильным устройством в инструментах разработчика вашего браузера. Например, в Chrome DevTools щелкните значок мобильного телефона и выберите мобильное устройство в меню.

Теперь мы можем приступить к работе над самой страницей. Давайте добавим на нашу страницу несколько компонентов AMP.
