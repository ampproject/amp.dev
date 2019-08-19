---
$title: Track ad views
$order: 2
description: Within AMPHTML ads, you can track metrics by using the amp-pixel or amp-analytics components. In our basic sample, we'll add the ability to track pageviews ...
---

Within AMPHTML ads, you can track metrics by using the [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) or [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) components.  In our basic sample, we'll add the ability to track pageviews with the [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) component and point to a URL that logs the pageviews (in this case, a fictious URL):

```html hl_lines="7"
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
<amp-pixel src="https://www.amp.dev/tracker/foo"></amp-pixel>
</body>
```

That's it, you've created your AMPHTML ad!

Before uploading your ad to your ad server, there's one last step you should take&mdash;ensuring your syntax is valid.
