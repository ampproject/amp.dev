---
layout: page
title: Create Your AMP HTML Page
order: 0
---

The following markup is a decent starting point or boilerplate.
Copy this and save it to a file with a .html extension. 

{% highlight html %}
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style>body {opacity: 0}</style><noscript><style>body {opacity: 1}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
{% endhighlight %}

The content in the body, so far, is pretty straightforward. But there’s a lot of additional code in the head of the page that might not be immediately obvious. Let’s deconstruct the required mark-up.

## Required mark-up

AMP HTML documents MUST:

  - Start with the doctype <!doctype html>.
  - Contain a top-level <html ⚡> tag (<html amp> is accepted as well).
  - Contain <head> and <body> tags (They are optional in HTML).
  - Contain a <link rel="canonical" href="$SOME_URL" /> tag inside their head that points to the regular HTML version of the AMP HTML document or to itself if no such HTML version exists.
  - Contain a <meta charset="utf-8"> tag as the first child of their head tag.
  - Contain a <meta name="viewport" content="width=device-width,minimum-scale=1"> tag inside their head tag. It's also recommended to include initial-scale=1.
  - Contain a <script async src="https://cdn.ampproject.org/v0.js"></script> tag as the last element in their head (this includes and loads the AMP JS library).
  - Contain <style>body {opacity: 0}</style><noscript><style>body {opacity: 1}</style></noscript> in their head tag.

## Optional meta-data

In addition to the bare requirements, our sample also includes a Schema.org definition in the head, which isn’t a strict requirement for AMP, but is a requirement to get your content syndicated in certain places, for instance in the experimental [Google Search news carousel (try on your phone)](g.co/ampdemo).

To learn more about all the meta-data you’ll need in various other places, i.e. Twitter, [explore our samples](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples).

<hr>

Good news! That’s all we need to create our first AMP page, but of course, there’s not a lot going on in the body yet. In the next section, we’ll cover how to add basics like images, custom AMP elements, how to style your page and work out a responsive layout.

{% include button.html title="Continue to Step 2" link="/docs/get_started/create/include_image.html" %}