---
layout: page
title: Include an Image
order: 1
---

Most HTML tags can be used directly in AMP HTML, but certain tags, such as the `<img>` tag, are replaced with equivalent or slightly enhanced custom AMP HTML tags (and a few problematic tags are outright banned, see [HTML Tags in the specification](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).

To demonstrate how additional markup could like like, here’s the code required to embed an image into the page:

{% highlight html %}
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
{% endhighlight %}

To learn why we’re replacing tags like `<img>` with `<amp-img>`, and how many are available, head to [Including Iframes and Media](/docs/guides/amp_replacements.html).

{% include button.html title="Continue to Step 3" link="/docs/get_started/create/presentation_layout.html" %}