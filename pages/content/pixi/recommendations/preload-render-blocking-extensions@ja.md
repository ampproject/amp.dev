---
$title: レンダリングブロックコンポーネントのプリロード
$order: 40
tags:
- lcp
- fid
---

初期レンダリングをブロックする可能性のあるコンポーネントをプリロードし、できるだけ早期にユーザーがコンポーネントを閲覧し、操作できるようにします。注意が必要なレンダリングブロックコンポーネントには、[`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) や [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/) などがあります。インポートスクリプトに `rel="preload"` 属性を含めると、プリロードされるようになります。

```
<link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">
```

[AMP Optimizer](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) を使用すれば、前述の作業を自動的に実行できます。
