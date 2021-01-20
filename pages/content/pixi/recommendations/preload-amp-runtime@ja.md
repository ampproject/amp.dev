---
$title: AMP ランタイムのプリロード
$order: 30
tags:
- lcp
- fid
---

必要なアセットをプリロードすると、アセットが最初に利用できるようになるため、パフォーマンスが改善されます。AMP ページにはフレームワークの JavaScript が必要であるため、それがプリロードされるようにしてください。[AMP Optimizer](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) を使って次のコードを自動的に追加することも、手動で追加することもできます。

```
<link as=script href=https://cdn.ampproject.org/v0.js rel=preload>
```
