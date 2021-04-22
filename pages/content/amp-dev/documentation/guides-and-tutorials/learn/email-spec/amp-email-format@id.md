---
'$title': Format AMP untuk Email
$order: 1
formats:
  - email
teaser:
  text: 'Penambahan yang diperlukan '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

AMP adalah teknologi yang dikenal mengembangkan halaman web super cepat pada klien seluler. AMP adalah seperangkat tag HTML yang didukung oleh JavaScript yang dengan mudah memungkinkan fungsionalitas dengan fokus tambahan pada kinerja dan keamanan. Ada [komponen AMP](https://amp.dev/documentation/components/) untuk segalanya, mulai dari korsel hingga elemen formulir responsif, sampai pengambilan konten baru dari endpoint jarak jauh.

Format AMP untuk Email menyediakan [bagian komponen AMP](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-components.md) yang dapat Anda gunakan di dalam pesan email. Penerima email AMP dapat melihat dan berinteraksi dengan komponen AMP secara langsung di dalam email.

## Penambahan yang diperlukan

Kode berikut ini mewakili jumlah penambahan minimum yang menjadi bagian pesan email AMP yang valid:

[sourcecode:html]

<!DOCTYPE html>
<html ⚡4email>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

Sebuah pesan email AMP HARUS

- <a name="dctp"></a>dimulai dengan jenis dokumen `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a>berisi tag `<html ⚡4email>` tingkat atas, (`<html amp4email>` juga diterima). [🔗](#ampd)
- <a name="crps"></a>berisi tag `<head>` dan `<body>` (Ini bersifat opsional dalam HTML). [🔗](#crps)
- <a name="chrs"></a>berisi tag `<meta charset="utf-8">` sebagai anak atau turunan pertama dari tag tajuknya. [🔗](#chrs)
- <a name="scrpt"></a>berisi tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` di dalam tag tajuknya. [🔗](#scrpt)
- <a name="boilerplate"></a>berisi boilerplate amp4email (`<style amp4email-boilerplate>body{visibility:hidden}</style>`) di dalam tag tajuknya untuk pada awalnya menyembunyikan konten hingga JS AMP dimuat. [🔗](#boilerplate)

Seluruh markup AMPHTML tidak boleh melebihi 200.000 byte.

## Struktur dan perenderan <a name="structure-and-rendering"></a>

AMP untuk Email mengandalkan subjenis [MIME](https://en.wikipedia.org/wiki/MIME) `multipart/alternative`, sebagaimana ditentukan di dalam [RFC 1521, bagian 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

_Untuk mendapatkan informasi selengkapnya, kunjungi [Struktur dan perenderan email AMP](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-structure.md)._

## Komponen AMP yang didukung <a name="supported-amp-components"></a>

_Kunjungi [Komponen yang Didukung AMP untuk Email](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-components.md)._

## Persyaratan HTML <a name="html-requirements"></a>

_Kunjungi [HTML yang Didukung dalam AMP untuk Email](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-html.md)._

## Persyaratan CSS <a name="css-requirements"></a>

### Properti dan pemilih yang didukung <a name="supported-selectors-and-properties"></a>

_Kunjungi [HTML yang Didukung dalam AMP untuk Email](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-css.md)._

### Menentukan CSS di dalam sebuah dokumen AMP <a name="specifying-css-in-an-amp-document"></a>

Semua CSS di dalam dokumen AMP apa pun harus disertakan dalam tag `<style amp-custom>` dalam tajuk atau sebagai atribut `style` inline.

[sourcecode:html]
...

<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
  amp-img.grey-placeholder {
    background-color: grey;
  }
</style>

...

</head>
[/sourcecode]

Catatan: Seluruh tag `<style>` tidak boleh melampaui 50.000 byte. Pengesah atau validator akan memeriksa ini.

## Dimensi dokumen <a name="document-dimensions"></a>

- **Lebar optimum**: 800px atau kurang (jika lebih lebar, konten dapat secara tidak terduga terpotong pada beberapa klien).

- **Tinggi**: variabel, klien memungkinkan pengguna untuk menggulir melalui konten.

## Validasi <a name="validation"></a>

Untuk memastikan bahwa pesan email Anda memenuhi kriteria yang ketat untuk format AMP untuk Email, Anda dapat menggunakan alat validasi atau pengesahan AMP yang sudah ada.

Kunjungi [Mengesahkan Email AMP](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/) untuk mendapatkan informasi selengkapnya.

## Privasi dan Keamanan <a name="privacy-and-security"></a>

### Melacak interaksi dan pembukaan email <a name="tracking-email-opens-and-interaction"></a>

AMPHTML memungkinkan pelacakan pembukaan email dengan teknik pelacakan piksel, sama seperti email HTML biasa. Permintaan apa pun yang diajukan pengguna untuk data dari layanan eksternal juga akan mengindikasikan bahwa pengguna berinteraksi dengan pesan tersebut. Klien email mungkin menawari pengguna kemampuan untuk menonaktifkan pemuatan gambar jarak jauh, dan permintaan eksternal lainnya.

### Analitis yang spesifik untuk AMP <a name="amp-specific-analytics"></a>

Teknik analitis yang spesifik untuk AMP berikut ini tidak didukung:

- [AMP `CLIENT_ID`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [Penggantian variabel](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### Pertimbangan yang spesifik untuk Komponen <a name="component-specific-considerations"></a>

Permintaan untuk gambar di dalam [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) atau [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) dapat mengindikasikan kepada pengirim bahwa pengguna berinteraksi dengan pesan tersebut.

Pengalihan dalam [`<amp-form>`](https://amp.dev/documentation/components/amp-form) tidak diizinkan pada runtime.

## Umpan Balik & Dukungan <a name="feedback--support"></a>

Untuk mendapatkan dukungan dan umpan balik tentang AMP untuk Email, silakan gunakan saluran berikut ini: [ partisipasi yang sedang aktif](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#ongoing-participation)
