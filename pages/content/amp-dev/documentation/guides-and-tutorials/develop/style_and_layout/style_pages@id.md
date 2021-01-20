---
$title: CSS yang didukung
---

Seperti semua halaman, halaman AMP digayakan dengan CSS, tapi tidak dapat mereferensikan stylesheet eksternal (dengan pengecualian [font kustom](#the-custom-fonts-exception)). Selain itu, gaya tertentu tidak diizinkan karena implikasi performa. Atribut gaya sisipan pun tidak diizinkan.

Semua gaya harus ada di kepala dokumen (lihat [Tambahkan gaya ke halaman](index.md#add-styles-to-a-page)). Namun Anda dapat menggunakan pembuatan template dan praprosesor CSS untuk membuat halaman statis agar dapat mengelola konten Anda dengan lebih baik.

Catatan: Komponen AMP hadir dengan gaya default untuk mempermudah pembuatan halaman responsif. Gaya ini ditentukan di [`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css).

## Gaya yang tidak diizinkan

Gaya berikut tidak diizinkan di halaman AMP:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Gaya yang dilarang</th>
      <th data-th="Description">Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Atribut gaya sisipan</td>
      <td data-th="Description">Semua gaya harus ditentukan di <code>&lt;head&gt;</code> halaman,
        dalam tag <code>&lt;style amp-custom&gt;</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Penentu <code>!important</code></td>
      <td data-th="Description">Penggunaan tidak diizinkan. Ini adalah persyaratan yang dibutuhkan guna mengaktifkan AMP untuk menerapkan aturan pengukuran elemennya.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description"> Tidak diizinkan dengan pengecualian <a href="#the-custom-fonts-exception">font kustom</a>.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Nama kelas <code>-amp-</code> dan tag<code> i-amp-</code> tag names</td>
      <td data-th="Description">Nama kelas, di stylesheets penulis, tidak dapat dimulai dengan string<code> -amp-</code>. Ini dikhususkan untuk penggunaan internal oleh waktu proses AMP. Demikian pula, stylesheet pengguna tidak dapat mereferensikan pemilih CSS untuk kelas<code> -amp-</code> dan tag<code> i-amp</code>.</td>
    </tr>
  </tbody>
</table>

## Gaya yang dibatasi

Gaya berikut diizinkan, namun dibatasi dalam hal nilai yang didukung:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Gaya yang dibatasi</th>
      <th data-th="Description">Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Restricted style">Properti <code>transition</code></td>
      <td data-th="Description"> Hanya properti yang dipercepat GPU (saat ini<code> opacity</code>, <code>transform</code>, dan<code> -vendorPrefix-transform</code>).</td>
    </tr>
    <tr>
      <td data-th="Restricted style"><code>@keyframes {...}</code></td>
      <td data-th="Description"> Hanya properti yang dipercepat GPU (saat ini<code> opacity</code>, <code>transform</code>, dan<code> -vendorPrefix-transform</code>).</td>
    </tr>
  </tbody>
</table>

## Pengecualian font kustom <a name="the-custom-fonts-exception"></a>

Halaman AMP tidak dapat menyertakan stylesheet eksternal, dengan pengecualian font kustom.

Baca lebih lanjut: Pelajari lebih lanjut tentang [font kustom di AMP](custom_fonts.md).

## Menggunakan praprosesor CSS <a name="using-css-preprocessors"></a>

Keluaran praprosesor berfungsi sama baiknya di AMP dengan di halaman web lainnya. Misalnya, situs [amp.dev](https://amp.dev/)
menggunakan [Sass](http://sass-lang.com/) . (Kami menggunakan [Grow](http://grow.io/) untuk membangun halaman AMP statis yang menyusun situs [amp.dev](https://amp.dev/) .)

Jika menggunakan praprosesor, selalu perhatikan hal yang Anda sertakan. Muatlah hanya yang digunakan halaman Anda. Misalnya, [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html)
menyertakan semua markup AMP yang diperlukan dan CSS yang disisipkan dari file sumber `*.scss`. Juga disertakan skrip elemen kustom untuk [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md), di antara lainnya, agar banyak halaman di seluruh situs dapat menyertakan video YouTube yang disematkan.

[sourcecode:html]{% raw %}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>Proyek AMP</title>
  <link rel="icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %}[/sourcecode]

Untuk melihat cara di atas diterapkan dalam HTML AMP terformat, lihat sumber setiap halaman di [amp.dev](https://amp.dev/). (Di Chrome, klik kanan dan `View Page Source`.)
