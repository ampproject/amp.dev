---
$title: Reviewing the starter code
$order: 1
description: "Before we start adding code, let's review the sample article.amp.html page, which should be as follows: ..."
---

Before we start adding code, let's review the sample [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) page, which should be as follows:

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

This is a simple AMP page that passes both [AMP validation](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) and the [schema.org](http://schema.org/) structured data validation. If this page were deployed on a news website, users can discover the page through rich experiences in Search Engine Result Pages (e.g., the Top stories carousel in Google Search).

## Enabling AMP Validator

Before we alter the page, let's enable the [AMP validator](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) so that we know we are working with valid AMP HTML. **Add** this fragment identifier to your URL:

```text
#development=1
```

For example:

```text
http://localhost:8000/article.amp.html#development=1
```

Open the [Developer Console](https://developer.chrome.com/devtools/docs/console) in Chrome (or your preferred browser), and verify there are no AMP errors.

[tip]
You can use several other tools to validate your AMP page, like:

- The [AMP Validator extension for Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- The [AMP Validator extension for Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/)
- The [AMP Validator Web Interface](https://validator.ampproject.org/)
- ... and much more

Learn more in the [Validate AMP pages](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) guide.
[/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='Simulated on a Nexus 5X device') }}

## Simulating the mobile experience

We're designing this page for a mobile device, so let's **simulate** the mobile device experience in your browser's developer tools. For example, in Chrome DevTools, click the mobile phone icon, and select a mobile device from the menu.

Now, we can start working on the page itself. Let’s add some AMP components to our page.
