---
$title: Building a regular HTML page
$order: 1
description: 'In the project directory, you will find a file named article.html. This is the news article that we are creating an AMP-equivalent page for ...'
---

In the project directory, you will find a file named [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html). This is the news article that we are creating an AMP-equivalent page for.

1.  **Copy** the entire code from the `article.html `file and paste it into a new file.
2.  **Save** the new file as `article.amp.html`.

[tip type="note"]
**NOTE –**  You don't have to name your AMP files as `.amp.html`. In fact, AMP files can have any extension you want. It's common to see publishers differentiating AMP pages from their canonical versions by using parameters in the url. For example:  `http://publisher.com/article.html?amp`.
[/tip]

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

Our AMP version of the article is just a copy of the original article right now. Let's convert it to an AMP.

To begin, we will add the AMP library file.  This alone won't make your new file a valid AMP page, but we'll see below how the AMP library can help us figure out what we need to do to fix that.

To include the AMP library, **add** this line to the bottom of the `<head>` tag:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

**Load** the new `article.amp.html` page in your browser at [http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html) and then, **open** the [Developer Console](https://developer.chrome.com/devtools/docs/console) in Chrome (or your preferred browser).

When you inspect the JavaScript output in the Developer Console (make sure you have the Console tab selected), you should see this log entry:

```text
Powered by AMP ⚡ HTML
```

The AMP library includes an [AMP validator](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) that will tell you if there is anything that is keeping your page from being a valid AMP document.  **Enable** the AMP validator by adding this fragment identifier to your document URL:

```text
#development=1
```

For example:

```text
http://localhost:8000/article.amp.html#development=1
```

In the Developer Console, you should receive several validation errors (you may need to manually refresh the page in your browser to see these):

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='AMP validation errors for our sample') }}

In order to make this a valid AMP document we're going to have to fix all of these errors--which is exactly what we'll be doing in this codelab.

Before we do that, let's **simulate** a mobile device experience in the browser's developer tools since we are working with a mobile news article.  For example, in Chrome DevTools, click the mobile phone icon, and select a mobile device from the menu.

You should see a mobile simulated resolution in your browser such as this:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Mobile simulation of our AMP page') }}

Now we're ready to get to work! Let's step through the validation errors one by one and address how they relate to AMP.
