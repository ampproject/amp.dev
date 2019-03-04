---
$title: Create the image ad
$order: 1
---

Inside the `<body>` of your AMPHTML ad document, you can include HTML and AMP tags; however, not all tags are allowed.  Refer to the [AMPHTML ad spec]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/a4a_spec.md', locale=doc.locale).url.path}}#allowed-amp-extensions-and-builtins) for a list of allowed tags.

Our ad is a simple image with a hyperlink to the advertised site (a shameless plug for ampproject.org).  We'll display the image using the [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) tag.  Here's the code:

```html hl_lines="2 3 4 5 6"
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
</body>
```

If you open your html file in your browser, you should see the following image:

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='learn about AMP ad') }}

If you click the image ad, it takes you to the advertised site (i.e., the AMP Project site).
