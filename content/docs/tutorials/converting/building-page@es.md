---
$title: Creación de una página HTML normal
$order: 1
---

In the project directory, you will find a file named [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html). This is the news article that we are creating an AMP-equivalent page for.

1.  **Copy** the entire code from the `article.html `file and paste it into a new file.
2.  **Save** the new file as `article.amp.html`.

{% call callout('Nota', type='note') %}
You don't have to name your AMP files as `.amp.html`. In fact, AMP files can have any extension you want. It's common to see publishers differentiating AMP pages from their canonical versions by using parameters in the url. For example:  `http://publisher.com/article.html?amp`.
{% endcall %}


Your `article.amp.html` file should look like the following:

```html
<!doctype html>
<html lang="en">
  <head>

    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>
    </article>
    <img src="mountains.jpg">
  </body>
</html>
```

This is an intentionally simplistic page with common static news article elements: CSS, JavaScript, and an image tag.

Our AMP version of the article is just a copy of the original article right now. Let's convert it to an AMP. To begin, we will add the AMP JavaScript library file and view what errors appear when the AMP validator is turned on.

To include the AMP library, **add** this line to the bottom of the `<head>` tag:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

**Load** the new `article.amp.html` page in your browser at [http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html) and then, **open** the [Developer Console](https://developer.chrome.com/devtools/docs/console) in Chrome (or your preferred browser).

When you inspect the JavaScript output in the Developer Console (make sure you have the Console tab selected), you should see this log entry:

```text
Powered by AMP ⚡ HTML
```

**Enable** the [AMP validator](https://www.ampproject.org/docs/guides/validate.html) by adding this fragment identifier to your URL:

```text
#development=1
```

For example:

```text
http://localhost:8000/article.amp.html#development=1
```

You may need to manually refresh the page in your browser.

In the Developer Console, you should receive several validation errors:

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='AMP validation errors for our sample') }}


As we are working with a mobile news article, let's **simulate** a mobile device experience in the browser's developer tools. For example, in Chrome Developer Tools, click the mobile phone icon, and select a mobile device from the menu.

You should see a mobile simulated resolution in your browser such as this:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Mobile simulation of our AMP page') }}

Now we're ready to get to work! Let's step through the validation errors one by one and address how they relate to AMP.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/es/docs/tutorials/converting/setting-up.html"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="/es/docs/tutorials/converting/resolving-errors.html"><span class="arrow-next">Próximo</span></a>
</div>
