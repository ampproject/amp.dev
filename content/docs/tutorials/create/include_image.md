---
$title: Include an Image
$order: 1
---

Most HTML tags can be used directly in AMP HTML, but certain tags, such as the `<img>` tag, are replaced with equivalent or slightly enhanced custom AMP HTML tags (and a few problematic tags are outright banned, see [HTML Tags in the specification](/docs/reference/spec.html)).

To demonstrate what additional markup could look like, here’s the code required to embed an image into the page:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

To learn why we’re replacing tags like `<img>` with `<amp-img>`, and how many are available, head to [Include Iframes and Media](/docs/guides/author-develop/amp_replacements.html).

<a class="go-button button" href="/docs/get_started/create/presentation_layout.html">Continue to Step 3</a>
