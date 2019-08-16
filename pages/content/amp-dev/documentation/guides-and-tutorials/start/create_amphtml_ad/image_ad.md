---
$title: Create the image ad
$order: 1
description: "Our ad is a simple image with a hyperlink to the advertised site.  We'll display the image using the amp-img tag. Here's the code: ..."
---

Inside the `<body>` of your AMPHTML ad document, you can include HTML and AMP tags; however, not all tags are allowed.  Refer to the [AMPHTML ad spec](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins) for a list of allowed tags.

Our ad is a simple image with a hyperlink to the advertised site.  We'll display the image using the [`amp-img`](../../../../documentation/components/reference/amp-img.md) tag.  Here's the code:

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
