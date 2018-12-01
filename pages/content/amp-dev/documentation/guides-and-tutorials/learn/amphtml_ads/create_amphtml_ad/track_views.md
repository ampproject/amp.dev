---
$title: Track ad views
$order: 2
---

Within AMPHTML ads, you can track metrics by using the [`amp-pixel`](/docs/reference/components/amp-pixel.html) or [`amp-analytics`](/docs/reference/components/amp-analytics.html) components.  In our basic sample, we'll add the ability to track pageviews with the `amp-pixel` component and point to a URL that logs the pageviews (in this case, a fictious URL):

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

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/docs/ads/amphtml_ads/create_amphtml_ad/image_ad.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="{{g.doc('/content/docs/ads/amphtml_ads/create_amphtml_ad/validate.md', locale=doc.locale).url.path}}"><span class="arrow-next">Next</span></a>
</div>
