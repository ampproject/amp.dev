---
"$title": 跟踪广告观看
"$order": '2'
description: 在 AMPHTML 广告中，您可以使用 amp-pixel 或 amp-analytics 组件跟踪指标。在我们的基本示例中，我们将添加使用…
---

在 AMPHTML 广告中，您可以使用 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 或 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 组件跟踪指标。在我们的基本示例中，我们将添加使用 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 组件跟踪网页浏览的功能，并指向记录网页浏览的网址（在这种情况下为虚构的网址）：

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
<amp-pixel src="https://www.amp.dev/tracker/foo"></amp-pixel>
</body>
```

就这样，您已经制作自己的 AMPHTML 广告！

在将您的广告上传到广告服务器之前，您应当采取的最后一个步骤是确保语法有效。
