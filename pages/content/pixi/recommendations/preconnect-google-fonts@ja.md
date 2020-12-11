---
$title: Google フォントへの事前接続
$order: 150
tags:
- lcp
---

`preconnect` などのリソースヒントは最新のブラウザがサポートする機能であり、ウェブサイトのパフォーマンスを促進し、読み込み時間を短縮することができます。<br><br> これらは、次のコードを手動でページに追加して使用します。

```
<link href=https://fonts.gstatic.com rel="dns-prefetch preconnect" crossorigin>
```
