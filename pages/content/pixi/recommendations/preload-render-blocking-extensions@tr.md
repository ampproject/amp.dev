---
$title: İşlemeyi engelleyen bileşenleri önceden yükleyin
$order: 40
tags:
- lcp
- fid
---

İlk işlemeyi engelleyebilecek bileşenleri önceden yükleyerek kullanıcıların içeriği en kısa sürede görmesine ve etkileşime girmesine izin verin. İşlemeyi engelleyebilecek dikkat edilmesi gereken bileşenler arasında [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) ve [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/) vardır. İçe aktarma betiğine `rel="preload"` özniteliğini ekleyerek bunları önceden yükleyin.

```
<link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">
```

Bunu otomatik olarak yapmak için bir [AMP Optimizer](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) kullanın!
