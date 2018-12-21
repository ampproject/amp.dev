---
$title: Create your AMP HTML page
$order: 1
---

The following markup is a decent starting point or boilerplate.
Copy this and save it to a file with a .html extension.

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html">
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
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

The content in the body, so far, is pretty straightforward. But there’s a lot of additional code in the head of the page that might not be immediately obvious. Let’s deconstruct the required mark-up.

Use HTTPS: When creating AMP pages and content, you should strongly consider using the HTTPS protocol (vs. HTTP). Although, HTTPS is not required for the AMP document itself or for images and fonts, there are many AMP features that require HTTPS (e.g., video, iframes, and more). To ensure your AMP pages take full advantage of all AMP features, use the HTTPS protocol.  You can learn more about HTTPS in ["Why HTTPS Matters"](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).

[tip type="tip"]
Use the [AMP Boilerplate Generator](https://ampbyexample.com/boilerplate/) to quickly get started with creating new AMP pages.
[/tip]

## Required mark-up

AMP HTML documents MUST:

| Rule      | Description |
| --------- | ----------- |
| Start with the `<!doctype html>` doctype. | Standard for HTML. |
| Contain a top-level `<html ⚡>` tag <br>(`<html amp>` is accepted as well). | Identifies the page as AMP content. |
| Contain `<head>` and `<body>` tags. | Optional in HTML but not in AMP.
| Contain a `<meta charset="utf-8">` tag as the first child of their `<head>` tag. | Identifies the encoding for the page. |
| Contain a `<script async src="https://cdn.ampproject.org/v0.js"></script>` tag inside their `<head>` tag. As a best practice, you should include the script as early as possible in the `<head>`.| Includes and loads the AMP JS library. |
| Contain a `<link rel="canonical" href="$SOME_URL">` tag inside their `<head>`. | Points to the regular HTML version of the AMP HTML document or to itself if no such HTML version exists. Learn more in [Make Your Page Discoverable]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}}).
| Contain a `<meta name="viewport" content="width=device-width,minimum-scale=1">` tag inside their `<head>` tag. It's also recommended to include `initial-scale=1`. | Specifies a responsive viewport. Learn more in [Create Responsive AMP Pages]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md', locale=doc.locale).url.path}}). |
| Contain the [AMP boilerplate code](/docs/fundamentals/spec/amp-boilerplate.html) in their `<head>` tag.  | CSS boilerplate to initially hide the content until AMP JS is loaded. |

## Optional metadata

In addition to the bare requirements, our sample also includes a Schema.org definition in the head, which isn’t a strict requirement for AMP, but it is a requirement to get your content distributed in certain places (for example, in the Google Search top stories carousel).

[tip type="read-on"]Visit these resources to learn more:

 * [Getting Started with AMP on Google Search](https://developers.google.com/amp/docs) - learn to prepare your AMP pages for Google Search.
  * [Metadata samples](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples) - learn more about all the metadata you’ll need in various other places (e.g., Twitter).
[/tip]

<hr>

Good news! That’s all we need to create our first AMP page, but of course, there’s not a lot going on in the body yet. In the next section, we’ll cover how to add basics like images, custom AMP elements, how to style your page and work out a responsive layout.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/include_image.md', locale=doc.locale).url.path}}"><span class="arrow-next">Next</span></a>
</div>
