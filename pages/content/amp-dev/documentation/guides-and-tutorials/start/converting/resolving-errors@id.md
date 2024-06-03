---
'$title': Memperbaiki eror validasi
$order: 2
description: Pada bagian ini, kita akan memeriksa dan memperbaiki eror validasi AMP dari halaman AMP kita. Harap ketahui bahwa eror mungkin muncul dalam urutan yang berbeda di konsol Anda.
---

Pada bagian ini, kita akan memeriksa dan memperbaiki eror validasi AMP dari halaman AMP kita. Harap ketahui bahwa eror mungkin muncul dalam urutan yang berbeda di konsol Anda.

## Menyertakan charset

Kita akan memulai dengan memperbaiki eror berikut ini:

<pre class="error-text">
The mandatory tag 'meta charset=utf-8' is missing or incorrect.
</pre>

Untuk menampilkan teks dengan benar, AMP mewajibkan Anda menentukan charset untuk halaman. Informasi charset meta juga harus menjadi anak pertama tag `<head>`. Tag ini harus menjadi yang pertama untuk menghindari penafsiran ulang konten yang ditambahkan sebelum tag charset meta.

**Tambahkan** kode berikut ini sebagai baris pertama tag `<head>`:

```html
<meta charset="utf-8" />
```

**Simpan** berkas, lalu muat ulang halaman. Verifikasi bahwa eror charset sudah tidak muncul.

## Menyertakan tautan kanonis

Sekarang, mari kita lihat eror berikut ini:

<pre class="error-text">
The mandatory tag 'link rel=canonical' is missing or incorrect.
</pre>

Setiap dokumen AMP harus memiliki tautan yang merujuk ke versi "kanonis" dokumen tersebut. Kita akan mempelajari lebih lanjut tentang halaman kanonis dan berbagai pendekatan terhadap penautan kanonis dalam langkah [Membuat halaman Anda dapat ditemukan](discoverable.md) di tutorial ini.

Untuk tutorial ini, kita akan menggunakan artikel HTML asli yang dikonversi menjadi halaman kanonis.

Lanjutkan dan **tambahkan** kode berikut ini di bawah tag `<meta charset="utf-8" />`:

```html
<link rel="canonical" href="/article.html" />
```

[tip type="note"] Anda dapat membuat halaman AMP kanonis mandiri. Tautan kanonis masih diperlukan, tetapi harus mengarah ke artikel AMP itu sendiri:

```html
<link rel="canonical" href="article.amp.html" />
```

[/tip]

Sekarang, **muat ulang** halaman. Meskipun masih banyak eror yang perlu diperbaiki, eror pada tautan kanonis sudah tidak ada.

## Menentukan atribut AMP

AMP memerlukan atribut di elemen `<html>` akar halaman untuk menyatakan halaman sebagai dokumen AMP.

<pre class="error-text">
The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'
The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.
</pre>

Eror di atas ini dapat diatasi hanya dengan menambahkan atribut `⚡` ke tag `<html>`, seperti yang berikut ini:

```html
<html ⚡ lang="en"></html>
```

Sekarang, lanjutkan, muat ulang halaman, dan pastikan bahwa kedua eror tersebut sudah tidak ada.

[tip type="note"] Meskipun direkomendasikan untuk menentukan `⚡`, kita juga dapat menggunakan atribut `amp` untuk menggantikan atribut `⚡`, seperti yang berikut ini:

```html
<html amp lang="en"></html>
```

[/tip]

## Menentukan viewport

Selanjutnya, mari kita selesaikan eror berikut ini:

<pre class="error-text">
The mandatory tag 'meta name=viewport' is missing or incorrect.
</pre>

AMP memerlukan definisi `width` dan `minimum-scale` untuk viewport. Nilai-nilai ini masing-masing harus ditetapkan sebagai `device-width` dan `1`. Viewport adalah tag umum yang disertakan dalam `<head>` pada halaman HTML.

Untuk memperbaiki eror viewport, tambahkan cuplikan HTML berikut ini ke tag `<head>`:

```html
<meta name="viewport" content="width=device-width" />
```

Nilai-nilai untuk `width` dan `minimum-scale` wajib ditetapkan di AMP. Menetapkan `initial-scale` tidak wajib dilakukan, tetapi biasanya disertakan dalam pengembangan web seluler dan hal ini direkomendasikan. Anda dapat membaca selengkapnya tentang viewport dan desain yang responsif di [Mengonfigurasi Viewport](https://developers.google.com/speed/docs/insights/ConfigureViewport).

Seperti sebelumnya, **muat ulang** halaman dan periksa apakah eror sudah hilang.

## Mengganti lembar gaya eksternal <a></a>

Eror berikut ini berkaitan dengan penggunaan atas lembar gaya (stylesheet):

<pre class="error-text">
The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.
</pre>

Secara spesifik, eror ini berkaitan dengan tag tautan lembar gaya berikut ini di tag `<head>`:

```html
<link href="base.css" rel="stylesheet" />
```

Masalahnya, ini adalah referensi lembar gaya eksternal. Di AMP, agar kecepatan waktu pemuatan dokumen tetap maksimal, Anda tidak dapat menyertakan lembar gaya eksternal. Sebagai gantinya, semua aturan lembar gaya harus disematkan ke dalam dokumen AMP dengan menggunakan tag `<style amp-custom></style>` atau sebagai gaya inline.

```html
<style amp-custom>
  /* The content from base.css */
</style>
```

Mari kita perbaiki eror ini:

1. **Hapus** tag `<link>` yang mengarah ke lembar gaya di `<head>` dan ganti dengan tag `<style amp-custom></style>` inline. Atribut `amp-custom` wajib disertakan di tag gaya.
2. **Salin** semua gaya dari berkas [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) ke tag `<style amp-custom></style>`.

Sekali lagi, **muat ulang** halaman dan pastikan bahwa eror lembar gaya sudah hilang.

[tip type="note"] **CATATAN –** Bukan hanya gaya tersemat yang diperlukan, tetapi juga batas ukuran berkas sebesar 50 kilobyte untuk semua informasi pengaturan gaya. Anda harus menggunakan praprosesor CSS, seperti [SASS](http://sass-lang.com/), untuk mengecilkan CSS Anda sebelum membuat CSS di halaman AMP inline. [/tip]

[tip type="important"] **PENTING –** Anda hanya boleh memiliki satu tag gaya di seluruh dokumen AMP Anda. Jika Anda memiliki beberapa lembar gaya eksternal yang dirujuk oleh halaman AMP Anda, lembar gaya ini perlu disusun menjadu seperangkat aturan. Untuk mempelajari aturan CSS apa yang valid di AMP, baca [CSS yang Didukung](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md). [/tip]

## Mengecualikan JavaScript pihak ketiga

Meskipun lembar gaya dapat dikerjakan ulang relatif mudah menggunakan AMP dengan membuat CSS inline, hal yang sama tidak berlaku untuk JavaScript.

<pre class="error-text">
The tag 'script' is disallowed except in specific forms.
</pre>

Secara umum, skrip di AMP hanya diizinkan jika mengikuti dua persyaratan utama:

1. Semua JavaScript harus asinkron (yaitu, menyertakan atribut `async` di tag skrip).
2. JavaScript adalah untuk perpustakaan AMP dan komponen AMP apa pun di halaman tersebut.

Ini secara efektif mengesampingkan penggunaan semua JavaScript buatan pengguna/pihak ketiga dalam AMP, kecuali seperti disebutkan di bawah ini.

[tip type="note"] Pembatasan pada skrip buatan pengguna/pihak ketiga tidak berlaku untuk skrip berikut ini:

1. Skrip yang menambahkan metadata ke halaman atau yang mengonfigurasi komponen AMP. Skrip ini akan memiliki atribut jenis `application/ld+json` atau `application/json`.
2. Skrip yang disertakan dalam iframe. Menyertakan JavaScript ke dalam iframe harus dianggap sebagai upaya terakhir. Jika memungkinkan, fungsi JavaScript harus diganti dengan menggunakan [Komponen AMP](../../../../documentation/components/index.html). Kita akan mempelajari komponen AMP pertama di bagian selanjutnya. [/tip]

Coba buka berkas [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js) eksternal. Apa yang Anda lihat? Berkas ini tidak boleh berisi kode JavaScript sama sekali dan hanya boleh menyertakan komentar tentang informasi sebagaimana berikut ini:

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

Karena berkas JavaScript eksternal ini bukan komponen fungsional pada situs web, kita dapat menghapus referensi sepenuhnya.

**Hapus** referensi JavaScript eksternal berikut ini dari dokumen Anda:

```html
<script type="text/javascript" src="base.js"></script>
```

Sekarang, **muat ulang** halaman dan pastikan bahwa eror skrip sudah hilang.

## Menyertakan boilerplate CSS AMP

Eror berikut ini merujuk ke kode boilerplate yang tidak ada:

<pre class="error-text">
The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.
The mandatory tag 'head > style : boilerplate' is missing or incorrect.
The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.
</pre>

Setiap dokumen AMP memerlukan kode boilerplate AMP berikut ini:

```html
<style amp-boilerplate>
  body {
    -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    animation: -amp-start 8s steps(1, end) 0s 1 normal both;
  }
  @-webkit-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-moz-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-ms-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-o-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }</style
><noscript
  ><style amp-boilerplate>
    body {
      -webkit-animation: none;
      -moz-animation: none;
      -ms-animation: none;
      animation: none;
    }
  </style></noscript
>
```

**Tambahkan** kode boilerplate ke bagian bawah tag `<head>` pada dokumen Anda.

Tag `<style amp-boilerplate>` awalnya menyembunyikan konten di bagian badan sampai perpustakaan JavaScript AMP dimuat, kemudian konten tersebut akan dirender. AMP melakukan ini untuk mencegah agar konten yang tanpa gaya tidak dirender, juga dikenal sebagai Flash Of Unstyled Content (FOUC). Ini membantu memastikan bahwa pengalaman pengguna terasa benar-benar instan karena konten halaman muncul sekaligus dan semua yang ada di paruh atas ditampilkan secara bersamaan. Tag kedua akan membalikkan logika ini jika JavaScript dinonaktifkan di browser.

## Mengganti `<img>` dengan `<amp-img>`

AMP tidak mendukung partner HTML standar untuk menampilkan media, dan hal ini menjelaskan eror berikut ini:

<pre class="error-text">
The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?
</pre>

AMP memiliki komponen web yang secara spesifik dirancang untuk menggantikan tag `<img>`, yaitu tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md):

```html
<amp-img src="mountains.jpg"></amp-img>
```

**Ganti** tag `<img>` dengan tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) di atas, dan jalankan validator lagi. Anda akan mendapatkan beberapa eror baru:

<pre class="error-text">
Layout not supported: container
The implied layout 'CONTAINER' is not supported by tag 'amp-img'.
</pre>

Mengapa [`amp-img`](../../../../documentation/components/reference/amp-img.md) memicu eror lain? Karena [`amp-img`](../../../../documentation/components/reference/amp-img.md) bukanlah pengganti langsung untuk tag img HTML tradisional. Ada persyaratan tambahan saat menggunakan [`amp-img`](../../../../documentation/components/reference/amp-img.md).

### Sistem tata letak AMP

Eror tata letak menyatakan bahwa [`amp-img`](../../../../documentation/components/reference/amp-img.md) tidak mendukung jenis tata letak `container`. Salah satu konsep paling penting dalam desain AMP adalah fokusnya untuk mengurangi jumlah perubahan posisi DOM yang diperlukan untuk merender halaman webnya.

Untuk mengurangi perubahan posisi DOM, AMP menyertakan sistem tata letak untuk memastikan tata letak halaman diketahui sedini mungkin di dalam siklus aktif pengunduhan dan perenderan halaman.

Gambar di bawah ini menunjukkan bagaimana halaman HTML sering digelar dibandingkan dengan pendekatan yang diterapkan AMP. Perhatikan dalam pendekatan di sebelah kiri, posisi teks berubah setiap kali iklan atau gambar dimuat. Pendekatan AMP untuk tata letak membuat teks tidak bergerak - meskipun pemuatan gambar dan iklan memerlukan waktu yang lama.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="Perbandingan antara bagaimana konten biasanya digelar dan pendekatan AMP") }}

Sistem tata letak AMP memungkinkan elemen pada halaman diposisikan dan diskalakan dengan berbagai cara - dimensi tetap, desain yang responsif, tinggi tetap, dan lainnya.

Pada contoh dalam artikel ini, sistem tata letak menganggap jenis tata letak untuk [`amp-img`](../../../../documentation/components/reference/amp-img.md) sebagai jenis `container`. Namun, jenis `container` hanya berlaku untuk elemen yang berisi elemen anak (turunan pertama). Jenis `container` tidak kompatibel dengan tag [`amp-img`](../../../../documentation/components/reference/amp-img.md), yang menjadi sebab timbulnya eror ini.

Mengapa jenis `container` disimpulkan? Karena kita tidak menentukan atribut `height` untuk tag [`amp-img`](../../../../documentation/components/reference/amp-img.md). Dalam HTML, perubahan posisi dapat dikurangi dengan selalu menetapkan lebar dan tinggi tetap untuk elemen pada halaman. Dalam AMP, Anda perlu menentukan lebar dan tinggi untuk elemen [`amp-img`](../../../../documentation/components/reference/amp-img.md) agar AMP dapat lebih dahulu menentukan rasio aspek (tinggi dan lebar) elemen.

**Tambahkan** `width` dan `height` ke tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) Anda sebagai berikut:

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

Segarkan halaman dan periksa validator. Seharusnya sudah tidak muncul eror apa pun!

Anda kini memiliki dokumen AMP yang valid, tetapi gambarnya tidak terlihat bagus karena diposisikan dengan tidak tepat pada halaman. Sebagai standar, jika Anda menentukan tinggi dan lebar untuk [`amp-img`](../../../../documentation/components/reference/amp-img.md), AMP akan memperbaiki dimensi sesuai dengan yang Anda tentukan. Namun, bukankah akan lebih baik jika AMP akan menskalakan gambar agar _secara responsif_ meregang dan memenuhi halaman, berapa pun ukuran layarnya?

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="Gambar tidak responsif.") }}

Untungnya, AMP dapat mengetahui rasio aspek elemen dari lebar & tinggi yang Anda tentukan. Hal ini memungkinkan sistem tata letak AMP untuk memosisikan dan menskalakan elemen dengan berbagai cara. Atribut `layout` memberi tahu AMP tentang pemosisian dan penskalaan elemen yang Anda inginkan.

**Tetapkan** atribut tata letak menjadi `responsive` agar gambar diskalakan dan diubah ukurannya:

```html
<amp-img
  src="mountains.jpg"
  layout="responsive"
  width="266"
  height="150"
></amp-img>
```

Bagus! Gambar kita memiliki aspek rasio yang benar dan secara responsif memenuhi lebar layar.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="Gambar kini menjadi responsif!") }}

[tip type="read-on"] **BACA –** Pelajari lebih lanjut tentang Sistem Tata Letak AMP dalam [Spesifikasi Tata Letak AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md). [/tip]

## Berhasil!

Sekarang dokumen AMP Anda akan terlihat seperti berikut ini:

```html
<!DOCTYPE html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />

    <link rel="canonical" href="/article.html" />
    <link rel="shortcut icon" href="amp_favicon.png" />

    <title>Artikel Berita</title>

    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
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
    <header>Situs Berita</header>
    <article>
      <h1>Nama Artikel</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>

      <amp-img
        src="mountains.jpg"
        layout="responsive"
        width="266"
        height="150"
      ></amp-img>
    </article>
  </body>
</html>
```

Segarkan halaman dan lihat output konsolnya. Anda seharusnya disambut oleh pesan berikut ini:

<pre class="success-text">
AMP validation successful.
</pre>

### Tanya & Jawab (T&J)

- [Apa yang dimaksud dengan perubahan posisi DOM?](http://stackoverflow.com/a/27637245)
- [Bagaimana jika atribut tata letak tidak ditentukan?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [Bagaimana jika lebar dan tinggi tidak ditentukan?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
