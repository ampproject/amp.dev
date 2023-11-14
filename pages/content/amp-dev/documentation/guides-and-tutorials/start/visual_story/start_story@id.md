---
$title: Memulai cerita kita
$order: 3
description: Seluruh Cerita Web diwakili oleh komponen amp-story, yang berfungsi sebagai wadah untuk semua halaman dalam sebuah cerita. Komponen amp-story juga bertanggung jawab untuk ....
author: bpaduch
---

Seluruh Cerita Web diwakili oleh komponen [`amp-story`](../../../../documentation/components/reference/amp-story.md) yang berfungsi sebagai wadah untuk semua halaman dalam sebuah cerita. Komponen [`amp-story`](../../../../documentation/components/reference/amp-story.md) juga bertanggung jawab untuk membuat cangkang (shell) UI, termasuk menangani isyarat (gesture) dan navigasi.

Komponen [`amp-story`](../../../../documentation/components/reference/amp-story.md) adalah komponen AMP kustom, dan seperti semua komponen kustom lainnya, Anda harus menambahkan skrip yang terkait untuk komponen tersebut di dokumen AMP.

**Buka** berkas `pets.html` di editor teks Anda, dan di bagian `<head>` section, **tambahkan** skrip berikut ini:

```html
<head>
<script async custom-element="amp-story"
        src="https://ampjs.org/v0/amp-story-1.0.js"></script>
</head>
```

**Tambahkan** elemen `<amp-story>` ke `<body>` dokumen Anda, dan tentukan atribut `standalone` wajib, seperti:

```html
<body>
  <amp-story standalone>
  </amp-story>
</body>
```

Penting untuk diperhatikan bahwa untuk mempunyai cerita AMP yang valid, elemen `<body>` hanya boleh mempunyai satu anak—komponen [`amp-story`](../../../../documentation/components/reference/amp-story.md) semua komponen lain dimasukkan ke [`amp-story`](../../../../documentation/components/reference/amp-story.md).

## Menyediakan informasi meta

Agar cerita dapat ditemukan di web, metadata tertentu diperlukan untuk menyediakan versi mini cerita, seperti:

- Judul cerita, diwakili oleh atribut `title` (cth., "Joy of Pets").
- Nama penayang, diwakili oleh atribut `publisher` (cth., "Tutorial AMP").
- Logo penayang, diwakili oleh atribut `publisher-logo-src`.  Ini adalah URL untuk gambar logo, dalam format persegi dengan rasio aspek 1x1.
- Gambar poster cerita, diwakili oleh atribut `poster-portrait-src`. Ini adalah URL untuk poster, dan gambar harus dalam format persegi dengan rasio aspek 3x4.

Mari kita tambahkan atribut-atribut ini ke tag [`amp-story`](../../../../documentation/components/reference/amp-story.md) kita:

```html
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
```

Selain atribut-atribut ini, ada atribut lain yang dapat Anda terapkan. Untuk mengetahui selengkapnya, kunjungi bagian [atribut](../../../../documentation/components/reference/amp-story.md#attributes) dari dokumentasi referensi [`amp-story`](../../../../documentation/components/reference/amp-story.md).

[tip type="note"] **CATATAN –**  Atribut-atribut metadata ini mendukung dan tidak menggantikan Data Terstruktur apa pun (cth.: JSON-LD) pada halaman. Untuk memastikan bahwa Cerita Web Anda dapat ditemukan di semua platform, Anda harus menambahkan [Data Terstruktur](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata) ke semua halaman AMP Anda, termasuk cerita AMP. [/tip]

Pada tahap ini, kita mempunyai cangkang (shell) cerita tanpa konten. Mari kita membuat halamannya.
