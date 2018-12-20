---
$title: Preview and validate
$order: 6
---

## Preview

Preview the AMP page just as you would preview any other static HTML site. There’s no build step or preprocessing required. You can choose to:

  - **Open the page directly in the browser from the file system** (certain elements might not work due to XMLHttpRequests failing).
  - **Use a local web server like Apache 2 or Nginx**.
    *(Tip: For a quick web server, run `python -m SimpleHTTPServer`.)*

## Validate

Next, make sure that your AMP page **is actually valid AMP**, or it won’t get discovered and distributed by third-party platforms like Google Search. To validate:

  1. Open your page in your browser.
  1. Add "`#development=1`" to the URL, for example, `http://localhost:8000/released.amp.html#development=1`.
  1. Open the [Chrome DevTools console](https://developers.google.com/web/tools/chrome-devtools/debug/console/) and check for validation errors.

Read on: [Learn more about validation]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validate.md', locale=doc.locale).url.path}}), and what to do when you get errors.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/presentation_layout.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/prepare_for_discovery.md', locale=doc.locale).url.path}}"><span class="arrow-next">Next</span></a>
</div>
