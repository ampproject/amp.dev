---
$title: Menggunakan versi Modul JavaScript Runtime AMP
$order: 25
tags:
- lcp
- fid
---

Penting untuk mempertimbangkan pengguna Anda dan bandwidth mereka. Menggunakan [Modul JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) dapat membuat perbedaan positif besar pada kinerja halaman Anda di browser web modern. Anda dapat ikut serta dalam Runtime AMP versi Modul JavaScript serta komponen AMP dengan menggunakan tanda [`experimentEsm`](https://www.npmjs.com/package/@ampproject/toolbox-optimizer#experimentesm) dengan versi [Pengoptimal AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) terbaru. Mempertahankan agar penerapan Anda tetap mutakhir membagi program JavaScript menjadi beberapa modul terpisah, dan hanya mengimpor yang diperlukan! Harap ketahui bahwa karena fitur ini bersifat eksperimental (segera diluncurkan!), menggunakan fitur ini akan membuat halaman AMP Anda tidak valid.
