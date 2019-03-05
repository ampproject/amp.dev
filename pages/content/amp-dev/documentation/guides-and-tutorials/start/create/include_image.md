---
$title: Include an image
$order: 2
author: pbakaus
contributors:
  - bpaduch
---

Most HTML tags can be used directly in AMP HTML, but certain tags, such as the `<img>` tag, are replaced with equivalent or slightly enhanced custom AMP HTML tags (and a few problematic tags are outright banned, see [HTML Tags in the specification]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/spec/index.html', locale=doc.locale).url.path}}#html-tags)).

To demonstrate what additional markup could look like, here’s the code required to embed an image into the page:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

[tip type="read-on"]
**READ ON –** To learn why we’re replacing tags like `<img>` with [`<amp-img>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}), and how many are available, visit [Include Images & Video]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/media_iframes_3p/index.md', locale=doc.locale).url.path}}).
[/tip]
