---
"$title": 広告ビューの追跡
"$order": '2'
description: AMPHTML 広告内で、amp-pixel または amp-analytics コンポーネントを使用してメトリクスを追跡できます。この基本的なサンプルでは、ページビューを追跡する機能を追加します
---

AMPHTML 広告内で、[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) または [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) コンポーネントを使用してメトリクスを追跡できます。この基本的なサンプルでは、[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) コンポーネントを使用してページビューを追跡し、ページビューをログに記録する URL にポイントします（この場合、架空の URL を使用します）。

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

これで、AMPHTML 広告は完成です！

広告サーバーに広告をアップロードする前に、後 1 つ手順が残っています。構文が有効であることを確認することです。
