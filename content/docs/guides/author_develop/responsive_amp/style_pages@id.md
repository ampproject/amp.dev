---
$title: CSS yang Didukung
---

Seperti halnya semua laman web, laman AMP ditata dengan CSS,
tetapi Anda tidak dapat mereferensikan stylesheet eksternal
(dengan pengecualian [font khusus](#pengecualian-font-khusus)).
Gaya tertentu juga tidak diperbolehkan karena implikasi performa;
atribut gaya sebaris tidak diperbolehkan.

Semua gaya harus berada di bagian head dokumen
(lihat [Menambahkan gaya ke laman](/id/docs/guides/debug/validate.html)).
Tetapi Anda dapat menggunakan prapemrosesan CSS dan pemberian template untuk membuat laman statis
guna mengelola konten dengan lebih baik.

**Catatan:**
Komponen AMP dilengkapi dengan gaya default
agar pembuatan laman responsif menjadi sangat mudah.
Gaya ini ditentukan di
[`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css).

[TOC]

## Menggunakan prapemrosesan CSS

Keluaran prapemrosesan yang dihasilkan juga berfungsi di AMP seperti laman web lain.
Misalnya, situs [ampproject.org](https://www.ampproject.org/) menggunakan
[Sass](http://sass-lang.com/).
(Kami menggunakan [Grow](http://grow.io/) untuk membuat laman AMP statis
yang membentuk situs [ampproject.org](https://www.ampproject.org/).)

Jika menggunakan prapemrosesan,
perhatikan baik-baik apa yang Anda sertakan; hanya muat laman yang digunakan.
Misalnya,
[head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html)
menyertakan semua markup AMP yang dibutuhkan dan CSS sebaris dari file sumber `*.scss`.
Hal tersebut juga menyertakan skrip elemen khusus untuk
[`amp-youtube`](/docs/reference/extended/amp-youtube.html), di antara yang lain,
sehingga berbagai laman di situs dapat menyertakan video youtube yang disematkan.

[sourcecode:html] {% raw %}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">

  <title>Accelerated Mobile Pages Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="https://www.ampproject.org{{doc.url.path}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
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
{% endraw %} [/sourcecode]

Untuk mengetahui cara hal di atas dialihkan ke HTML AMP terformat,
lihat sumber laman apa pun di [ampproject.org](https://www.ampproject.org/).
(Di Chrome, klik kanan dan `Lihat Sumber Laman`.)

## Gaya terlarang

Gaya berikut tidak diizinkan di laman AMP:

<table>
  <thead>
    <tr>
      <th data-th="Banned style">Gaya yang dicekal</th>
      <th data-th="Description">Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Atribut gaya sebaris</td>
      <td data-th="Description">Semua gaya harus ditentukan di <code>&lt;head&gt;</code> laman,
       dalam tag <code>&lt;style amp-custom&gt;</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!</code>kualifikasi penting </td>
      <td data-th="Description">Penggunaan tidak diizinkan.
      Hal ini merupakan persyaratan yang dibutuhkan untuk mengaktifkan AMP guna menerapkan aturan pengubahan ukuran elemen.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description">Dilarang dengan pengecualian <a href="#pengecualian-font-khusus">font khusus</a>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code> (pemilih universal)</td>
      <td data-th="Description">Implikasi performa negatif dan dapat digunakan
      untuk mengelak dari pembatasan pemilih lainnya.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">Dapat digunakan untuk menyimulasikan pemilih universal.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Pemilih Pseudo, kelas pseudo, dan elemen pseudo</td>
      <td data-th="Description">Pemilih Pseudo, kelas pseudo, dan elemen pseudo hanya diizinkan
      di pemilih yang berisi nama tag, dan nama tag tersebut tidak boleh dimulai dengan <code>amp-</code>.
      Contoh yang diizinkan: <code>a:hover, div:last-of-type</code>
      Contoh yang dilarang: <code>amp-img:hover, amp-img:last-of-type</code></td>
    </tr>
    <tr>
      <td data-th="Banned style">Kelas <code>-amp-</code> dan nama tag <code>i-amp-</code></td>
      <td data-th="Description">Nama kelas, di stylesheet penulis, tidak boleh dimulai dengan <code>-amp-</code> string. Hal ini hanya untuk penggunaan internal oleh waktu proses AMP. Karena itu, stylesheet pengguna tidak boleh mereferensikan pemilih CSS untuk kelas <code>-amp-</code> dan tag <code>i-amp</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>behavior</code>, <code>-moz-binding</code></td>
      <td data-th="Description">Properti ini tidak diizinkan
      untuk alasan keamanan.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>filter</code></td>
      <td data-th="Description">Dimasukkan ke daftar hitam karena masalah performa.</td>
    </tr>
  </tbody>
</table>

## Properti animasi dan transisi yang dimasukkan dalam daftar putih

AMP hanya mengizinkan transisi dan animasi properti
yang dapat dipercepat oleh GPU di browser umum.
Saat ini, proyek AMP memasukkan ke daftar putih `opacity`, `transform`,
dan `-vendorPrefix-transform`.

Pada contoh berikut, `<property>` harus dimasukkan ke dalam daftar putih:

* `transition <property> (Also -vendorPrefix-transition)`
* @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

Properti `overflow` (dan `overflow-y`, `overflow-x`)
tidak boleh diberi gaya “auto” atau “scroll”.
Tidak ada elemen yang ditentukan pengguna di dokumen AMP yang boleh memiliki bilah gulir.

## Pengecualian font khusus

Laman AMP tidak dapat menyertakan stylesheet eksternal, dengan pengecualian font khusus.
2 metode yang didukung untuk menyebutkan font khusus adalah
tag tautan yang mengarahkan ke penyedia font yang masuk dalam daftar putih dan penyertaan `@font-face`.

Penyedia font hanya dapat dimasukkan dalam daftar putih
jika mereka mendukung integrasi hanya CSS dan menyajikannya melalui HTTPS.
Saat ini, hanya font asal tersebut yang dimasukkan dalam daftar putih
dan diizinkan untuk disajikan melalui tag tautan:

* [https://fast.fonts.net](https://fast.fonts.net)
* [https://fonts.googleapis.com](https://fonts.googleapis.com)

Contoh tag tautan yang mengarah ke penyedia font yang masuk dalam daftar putih, Google Fonts:

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Atau, Anda dapat menggunakan [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face).
Font yang disertakan melalui `@font-face` harus diambil
melalui skema HTTP atau HTTPS.
