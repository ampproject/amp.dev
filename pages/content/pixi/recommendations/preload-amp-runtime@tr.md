---
$title: AMP Çalışma Zamanını önceden yükleyin
$order: 30
tags:
- lcp
- fid
---

Gerekli varlıkların önceden yüklenmesi, bunların önce mevcut olmalarını sağlayarak performansı artırır. Bir AMP sayfası, çerçevenin JavaScript'ini gerektirir, bu nedenle bunun önceden yüklendiğinden emin olun! Aşağıdakileri sayfanıza otomatik olarak eklemek için bir [AMP Optimizer](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) kullanın veya bunu manuel olarak yapın:

```
<link as=script href=https://ampjs.org/v0.js rel=preload>
```
