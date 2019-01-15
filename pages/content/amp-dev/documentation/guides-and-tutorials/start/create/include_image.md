---
$title: Include an image
$order: 2
---

Most HTML tags can be used directly in AMP HTML, but certain tags, such as the `<img>` tag, are replaced with equivalent or slightly enhanced custom AMP HTML tags (and a few problematic tags are outright banned, see [HTML Tags in the specification](/docs/fundamentals/spec.html#html-tags)).

To demonstrate what additional markup could look like, here’s the code required to embed an image into the page:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

Read on: To learn why we’re replacing tags like `<img>` with `<amp-img>`, and how many are available, visit [Include Images & Video]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/amp_replacements.md', locale=doc.locale).url.path}}).
