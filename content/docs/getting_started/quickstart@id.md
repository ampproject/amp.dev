---
$title: Memulai
---
[TOC]

Ini adalah panduan memulai cepat untuk membantu Anda agar dapat bekerja dengan AMP tanpa kendala.

Untuk petunjuk lebih mendetail, buka tutorial [Membuat halaman AMP pertama Anda](/id/docs/tutorials/create.html).

### Langkah 1: Dapatkan template HTML AMP

Ini adalah template HTML biasa yang Anda butuhkan untuk halaman AMP:

```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Halo dunia AMP</title>
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Halo dunia AMP!</h1>
  </body>
</html>
```

{% call callout('Baca lebih lanjut', type='read') %}
Pelajari lebih lanjut tentang [markup yang diperlukan](/id/docs/reference/spec.html#required-markup) untuk halaman AMP.
{% endcall %}

### Langkah 2: Tambahkan komponen ke halaman Anda

Lanjutkan pembuatan halaman AMP Anda dengan menambahkan komponen, misalnya gambar:

```html
<amp-img src="https://www.ampproject.org/examples/images/amp.jpg"
  width="900" height="508" layout="responsive"></amp-img>
```

Atau video YouTube:

```html
<!-- skrip ini diperlukan untuk amp-youtube dan harus berada di bagian <head>  -->
<script async custom-element="amp-youtube"
      src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>

...

<amp-youtube data-videoid="9Cfxm7cikMY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
```

Dan masih banyak lagi. Lihat daftar [komponen yang tersedia di AMP](/id/docs/reference/components.html).

### Langkah 3: Sesuaikan gaya elemen Anda

Untuk menyesuaikan gaya elemen di halaman AMP, tambahkan CSS ke lembar gaya inline dengan nama `<style amp-custom>` di bagian `<head>` dokumen Anda:

```html
<style amp-custom>
  amp-img {
    margin: 0.5em;
  }
  body {
    max-width: 900px;
  }
</style>
```

{% call callout('Baca lebih lanjut', type='read') %}
Pelajari lebih lanjut tentang [CSS yang didukung](/id/docs/guides/responsive/style_pages.html) untuk halaman AMP.
{% endcall %}

### Langkah 4: Lakukan validasi HTML AMP

Pastikan halaman AMP Anda adalah HTML AMP yang valid dengan memverifikasi halaman menggunakan [Validator AMP](https://validator.ampproject.org/).

Untuk fitur validasi lainnya yang dapat Anda gunakan, lihat [Memvalidasi halaman AMP](/id/docs/guides/validate.html).

### Langkah Berikutnya

Untuk mempelajari lebih lanjut tentang dasar-dasar halaman AMP, buka tutorial [Membuat halaman AMP pertama Anda](/id/docs/tutorials/create.html).

Berikut referensi lain untuk meningkatkan pengalaman Anda:

* [Membuat halaman mudah ditemukan](/id/docs/guides/discovery.html)
* [Menambahkan analytics ke halaman](/id/docs/guides/analytics_amp.html)
* [Meningkatkan interaksi pengguna](/id/docs/guides/engagement.html)
* Demo langsung di [AMP BY Example](https://ampbyexample.com/)
 
 
