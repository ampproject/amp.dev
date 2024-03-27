---
$title: Memuat terlebih dahulu komponen yang memblokir perenderan
$order: 40
tags:
- lcp
- fid
---

Izinkan pengguna untuk melihat dan berinteraksi dengan konten sesegera mungkin dengan melakukan pramuat komponen yang mungkin memblokir perenderan pertama. Komponen pemblokir perenderan yang harus diperhatikan, antara lain: [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) dan [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/). Muat sebelumnya dengan menyertakan atribut `rel="preload"` pada skrip impornya:

```
<link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">
```

Gunakan [Pengoptimal AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) untuk melakukannya secara otomatis!
