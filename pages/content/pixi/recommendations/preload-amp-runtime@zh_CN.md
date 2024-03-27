---
$title: 预加载 AMP 运行时
$order: 30
tags:
- lcp
- fid
---

通过预加载所需的素材资源，可以确保它们最先可用，从而提高性能。AMP 网页需要框架的 JavaScript，因此，确保预加载 JavaScript！使用 [AMP 优化工具](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/)可以将以下内容自动添加到网页，您也可以手动添加：

```
<link as="script" href="https://ampjs.org/v0.js" rel="preload">
```
