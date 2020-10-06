---
$title: Memuat Runtime AMP Sebelumnya
$order: 30
tags:
- lcp
- fid
---

Jika aset yang diperlukan dimuat terlebih dahulu, maka kinerja akan meningkat, ini dapat dilakukan setelah sebelumnya memastikannya telah tersedia. Halaman AMP memerlukan kerangka kerja JavaScript, jadi pastikan sudah dimuat sebelumnya! Gunakan [Pengoptimal AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) agar dapat secara otomatis menambahkan yang berikut ini ke halaman Anda, atau lakukan secara manual:

```
<link as=script href=https://cdn.ampproject.org/v0.js rel=preload>
```
