---
$title: Mengatasi error validasi
---

[TOC]

Pada bagian ini, kita akan membahas dan menyelesaikan error validasi AMP dari halaman AMP.  Perhatikan bahwa error mungkin muncul dalam urutan yang berbeda di konsol Anda.

## Sertakan charset

Kita akan memulai dengan memperbaiki error berikut:

<pre class="error-text">
The mandatory tag 'meta charset=utf-8' is missing or incorrect.
</pre>

Untuk menampilkan teks dengan benar, AMP mewajibkan Anda menentukan charset untuk halaman. Informasi charset meta juga harus menjadi turunan pertama tag `<head>`. Tag ini harus menjadi turunan pertama untuk menghindari konten yang ditafsirkan ulang ditambahkan sebelum tag charset meta.

*Tambahkan** kode berikut sebagai baris pertama tag `<head>`:


```html
<meta charset="utf-8" />
```

**Simpan** file dan muat ulang halaman. Verifikasi bahwa error charset sudah tidak muncul.

## Sertakan link kanonis

Sekarang, mari kita lihat error berikut:

<pre class="error-text">
The mandatory tag 'link rel=canonical' is missing or incorrect.
</pre>

Setiap dokumen AMP harus memiliki link yang merujuk pada versi "kanonis" dokumen tersebut.  Kita akan mempelajari lebih lanjut apa itu halaman kanonis dan berbagai pendekatan terhadap penautan kanonis dalam langkah [Membuat halaman Anda dapat ditemukan]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/discoverable.md', locale=doc.locale).url.path}}) di tutorial ini.

Untuk tutorial ini, kita akan menggunakan artikel HTML asli yang dikonversi menjadi halaman kanonis.

Lanjutkan dan **tambahkan** kode berikut di bawah tag `<meta charset="utf-8" />`:

```html
<link rel="canonical" href="/article.html">
```

[tip type="note"]
Anda dapat membuat halaman AMP kanonis mandiri. Link kanonis masih diperlukan, tetapi harus mengarah ke artikel AMP itu sendiri:

```html
<link rel="canonical" href="article.amp.html">
```
[/tip]

Sekarang, **muat ulang** halaman. Meskipun masih ada banyak error yang perlu diperbaiki, error pada link kanonis sudah tidak ada.

## Tentukan atribut AMP

AMP memerlukan atribut di elemen `<html>` utama halaman untuk menyatakan halaman sebagai dokumen AMP.

<pre class="error-text">
The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'
The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.
</pre>

Error di atas dapat diatasi hanya dengan menambahkan atribut `⚡` ke tag `<html>` seperti berikut:

```html
<html ⚡ lang="en">
```

Sekarang, lanjutkan, muat ulang halaman, dan pastikan kedua error sudah tidak ada.

[tip type="note"]
Meskipun direkomendasikan untuk menentukan `⚡`, kita juga dapat menggunakan atribut `amp` untuk menggantikan atribut `⚡`, seperti yang berikut:

```html
<html amp lang="en">
```
[/tip]

## Tentukan viewport

Selanjutnya, mari kita selesaikan error berikut:

<pre class="error-text">
The mandatory tag 'meta name=viewport' is missing or incorrect.
</pre>

AMP memerlukan definisi `width` dan `minimum-scale` untuk viewport. Nilai ini masing-masing harus ditetapkan sebagai `device-width` dan `1`. Viewport adalah tag umum yang disertakan dalam `<head>` pada halaman HTML.

Untuk menyelesaikan error viewport, tambahkan cuplikan HTML berikut ke tag `<head>`:

```html
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
```

Nilai untuk `width` dan `minimum-scale` wajib ditetapkan di AMP. Menetapkan `initial-scale` tidak wajib dilakukan, tapi biasanya disertakan dalam pengembangan web seluler dan hal itu direkomendasikan. Anda dapat membaca selengkapnya tentang viewport dan desain yang responsif di [Mengonfigurasi Area Pandang](https://developers.google.com/speed/docs/insights/ConfigureViewport).

Seperti sebelumnya, **muat ulang** halaman dan periksa apakah error sudah tidak muncul.

## Ganti stylesheet eksternal

Error berikut berkaitan dengan penggunaan kita atas stylesheet:

<pre class="error-text">
The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.
</pre>

Secara spesifik, error ini berkaitan dengan tag link stylesheet berikut di tag `<head>`:

```html
<link href="base.css" rel="stylesheet" />
```

Masalahnya, ini adalah referensi stylesheet eksternal. Di AMP, agar kecepatan waktu pemuatan dokumen tetap maksimal, Anda tidak dapat menyertakan stylesheet eksternal. Sebagai gantinya, semua aturan stylesheet harus ditambahkan secara inline dalam dokumen AMP menggunakan tag `<style amp-custom></style>`.

```html
<style amp-custom>

/* The content from base.css */

</style>
```

Mari kita selesaikan error-nya:

1.  **Hapus** tag `<link>` yang mengarah ke stylesheet di `<head>` dan ganti dengan tag `<style amp-custom></style>` inline. Atribut `amp-custom` wajib disertakan di tag gaya.
2. **Salin** semua gaya dari file [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) ke tag `<style amp-custom></style>`.

Sekali lagi, **muat ulang** halaman dan verifikasi bahwa error stylesheet sudah tidak muncul.

Catatan: Tidak hanya gaya inline yang diperlukan tetapi ada batas ukuran file sebesar 50 kilobyte untuk semua informasi gaya. Anda harus menggunakan prapemrosesan CSS seperti [SASS](http://sass-lang.com/) untuk memperkecil CSS sebelum membuat CSS di halaman AMP menjadi inline.

Penting: Anda hanya dapat memiliki 1 tag gaya di seluruh dokumen AMP. Jika Anda memiliki beberapa stylesheet eksternal yang dirujuk oleh halaman AMP, Anda harus menyusun stylesheet ini menjadi 1 kumpulan aturan. Untuk mempelajari tentang aturan CSS apa yang berlaku di AMP, baca [CSS yang Didukung]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md', locale=doc.locale).url.path}}).

## Jangan sertakan JavaScript pihak ketiga

Meskipun stylesheet dapat dikerjakan ulang dengan relatif mudah menggunakan AMP dengan membuat CSS menjadi inline, hal yang sama tidak berlaku untuk JavaScript.

<pre class="error-text">
The tag 'script' is disallowed except in specific forms.
</pre>

Secara umum, skrip di AMP hanya diizinkan jika mengikuti 2 persyaratan utama:

1.  Semua JavaScript harus asinkron (yaitu, menyertakan atribut `async` di tag skrip).
2.  JavaScript ditujukan untuk library AMP dan komponen AMP apa pun di halaman.

Ini secara efektif mengesampingkan penggunaan semua JavaScript buatan pengguna/pihak ketiga dalam AMP, kecuali seperti disebutkan di bawah.

[tip type="note"]
Pembatasan pada skrip buatan pengguna/pihak ketiga tidak berlaku untuk skrip berikut:

1.  Skrip yang menambahkan metadata ke halaman atau yang mengonfigurasi komponen AMP. Skrip ini akan memiliki atribut jenis `application/ld+json` atau `application/json`.
2.  Skrip yang disertakan dalam iframe.  Menyertakan JavaScript dalam iframe harus dianggap sebagai upaya terakhir. Jika memungkinkan, fungsi JavaScript harus diganti menggunakan [Komponen AMP](/id/docs/reference/components.html). Kita akan mempelajari komponen AMP pertama di bagian selanjutnya.
[/tip]

Coba buka file [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js) eksternal. Apa yang Anda lihat? File tidak boleh berisi kode JavaScript sama sekali dan hanya boleh menyertakan komentar informasi sebagaimana berikut:

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

Karena file JavaScript eksternal ini bukan komponen fungsional pada situs, kita dapat menghapus referensi sepenuhnya.

**Hapus** referensi JavaScript eksternal berikut dari dokumen Anda:

```html
<script type="text/javascript" src="base.js"></script>
```

Sekarang, **muat ulang** halaman dan verifikasi bahwa error skrip sudah tidak muncul.

## Sertakan boilerplate CSS AMP

Error berikut merujuk pada kode boilerplate yang tidak ada:

<pre class="error-text">
The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.
The mandatory tag 'head > style : boilerplate' is missing or incorrect.
The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.
</pre>

Setiap dokumen AMP memerlukan kode boilerplate AMP berikut:

```html
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
```

**Tambahkan** kode boilerplate ke bagian bawah tag `<head>` pada dokumen Anda.

Tag `<style amp-boilerplate>`  awalnya menyembunyikan konten di bagian isi sampai library JavaScript AMP dimuat, kemudian konten tersebut akan dirender. AMP melakukannya untuk mencegah agar konten yang tidak bergaya tidak render, juga dikenal sebagai Flash Of Unstyled Content (FOUC). Ini membantu memastikan bahwa pengalaman pengguna terasa benar-benar instan karena konten halaman muncul sekaligus dan semua yang ada di paruh atas ditampilkan secara bersamaan. Tag kedua akan mengalihkan logika ini jika JavaScript dinonaktifkan di browser.

## ganti `<img>` dengan `<amp-img>`

AMP tidak mendukung partner HTML default untuk menampilkan media, yang menjelaskan error berikut:

<pre class="error-text">
The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?
</pre>

AMP memiliki komponen web yang secara spesifik dirancang untuk menggantikan tag `<img>`, yaitu tag [`<amp-img>`](/id/docs/reference/components/amp-img.html):

```html
<amp-img src="mountains.jpg"></amp-img>
```

**Ganti** tag `<img>` dengan tag `<amp-img>` di atas, dan jalankan validator lagi. Anda akan menerima beberapa error baru:

<pre class="error-text">
Layout not supported: container
The implied layout 'CONTAINER' is not supported by tag 'amp-img'.
</pre>

Mengapa `amp-img` memicu error lain? Karena `amp-img` bukanlah pengganti langsung untuk tag img HTML tradisional. Terdapat persyaratan tambahan saat menggunakan `amp-img`.

### Sistem tata letak AMP

Error tata letak menyatakan bahwa `amp-img` tidak mendukung jenis tata letak `container`. Salah satu konsep paling penting dalam desain AMP adalah fokusnya untuk mengurangi jumlah perubahan posisi DOM yang diperlukan untuk merender halaman webnya.

Untuk mengurangi perubahan posisi DOM, AMP menyertakan sistem tata letak untuk memastikan tata letak halaman dikenal sedini mungkin dalam siklus proses download dan perenderan halaman.

Gambar di bawah ini menunjukkan bagaimana halaman HTML jika sering ditata dibandingkan dengan pendekatan yang diterapkan AMP.  Perhatikan dalam pendekatan di sebelah kiri, posisi teks berubah setiap kali iklan atau gambar dimuat.  Pendekatan AMP untuk tata letak membuat teks tidak bergerak - meskipun pemuatan gambar dan iklan perlu waktu yang lama.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="Perbandingan antara penataan konten biasanya dengan pendekatan AMP") }}

Sistem tata letak AMP memungkinkan elemen pada halaman diposisikan dan diskalakan dengan berbagai cara - dimensi tetap, desain yang responsif, tinggi tetap, dan lainnya.

Pada contoh dalam artikel ini, sistem tata letak menganggap jenis tata letak untuk `amp-img` sebagai jenis `container`. Namun, jenis `container` hanya berlaku untuk elemen yang berisi elemen turunan. Jenis `container` tidak kompatibel dengan tag `amp-img`, yang menjadi alasan untuk error ini.

Mengapa dianggap jenis `container`? Karena kita tidak menentukan atribut `height` untuk tag `amp-img`. Dalam HTML, perubahan posisi dapat dikurangi dengan selalu menetapkan lebar dan tinggi tetap untuk elemen pada halaman. Di AMP, Anda perlu menentukan lebar dan tinggi untuk elemen amp-img agar AMP dapat lebih dahulu menentukan rasio tinggi lebar elemen.

**Tambahkan** `width` dan `height` ke tag `<amg-img>` sebagai berikut:

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

Muat ulang halaman dan periksa validatornya. Seharusnya sudah tidak muncul error apa pun!

Anda kini memiliki dokumen AMP yang valid, tetapi gambarnya tidak terlihat bagus karena diposisikan dengan tidak tepat pada halaman.  Secara default, jika Anda menentukan tinggi dan lebar untuk `amp-img`, AMP akan memperbaiki dimensi sesuai dengan yang Anda tentukan. Namun, bukankah akan lebih baik jika AMP akan menskalakan gambar agar *secara responsif* meregang dan sesuai dengan halaman, terlepas dari ukuran layarnya?

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="Gambar tidak responsif.") }}

Untungnya AMP dapat mengetahui rasio tinggi lebar elemen dari lebar & tinggi yang Anda tentukan.  Hal ini memungkinkan sistem tata letak AMP untuk memosisikan dan menskalakan elemen dengan berbagai cara.  Atribut `layout` memberi tahu AMP tentang pemosisian dan penskalaan elemen yang Anda inginkan.

**Tetapkan** atribut tata letak menjadi `responsive` agar gambar diskalakan dan diubah ukurannya:

```html
<amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
```

Bagus! Gambar kita memiliki aspek tinggi lebar yang benar dan secara responsif memenuhi lebar layar.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="Gambar kini menjadi responsif!") }}

Baca selengkapnya: Pelajari lebih lanjut Sistem Tata Letak AMP di [Spesifikasi Tata Letak AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-html-layout.md', locale=doc.locale).url.path}}).

## Berhasil!

Sekarang dokumen AMP Anda akan terlihat seperti berikut:

```html
<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

    <link rel="canonical" href="/article.html">
    <link rel="shortcut icon" href="amp_favicon.png">

    <title>Artikel Berita</title>

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <header>
      Situs Berita
    </header>
    <article>
      <h1>Nama Artikel</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>

      <amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
    </article>
  </body>
</html>
```

Muat ulang halaman dan lihat keluaran konsolnya. Anda seharusnya disambut dengan pesan berikut:

<pre class="success-text">
AMP validation successful.
</pre>

### Pertanyaan Umum (FAQ)

- [Apa yang dimaksud dengan perubahan posisi DOM?](http://stackoverflow.com/a/27637245)
- [Bagaimana jika atribut tata letak tidak ditentukan?](/id/docs/design/responsive/control_layout.html#what-if-the-layout-attribute-isn’t-specified?)
- [Bagaimana jika lebar dan tinggi tidak ditentukan?](/id/docs/design/responsive/control_layout.html#what-if-width-and-height-are-undefined?)


<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/building-page.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/discoverable.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>
