---
layout: page
title: Membuat Halaman AMP HTML
order: 0
locale: id
---

Markup berikut merupakan titik awal yang sesuai atau boilerplate.
Salin yang berikut ini dan simpanlah ke file dengan ekstensi .html.

{% highlight html %}
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
{% endhighlight %}

Materi dalam badan teks sejauh ini tidak sulit dipahami. Namun ada banyak kode tambahan dalam kepala halaman yang mungkin tidak langsung bisa dipahami. Mari kita uraikan markup wajib ini:

## Markup wajib

Dokumen AMP HTML HARUS:

  - Mulai dengan tipe dokumen `<!doctype html>`.
  - Berisi tag `<html ⚡>` tingkat atas (`<html amp>` juga berterima).
  - Berisi tag `<head>` dan `<body>` (Keduanya opsional dalam HTML).
  - Berisi tag `<link rel="canonical" href="$SOME_URL" />` dalam bagian kepala yang menunjuk pada versi HTML reguler dari dokumen AMP HTML atau menunjuk pada dirinya sendiri jika tidak ada versi HTML seperti itu.
  - Berisi tag `<meta charset="utf-8">` sebagai anak pertama dari tag kepalanya.
  - Berisi tag `<meta name="viewport" content="width=device-width,minimum-scale=1">` di dalam tag kepalanya. Juga disarankan untuk menyertakan initial-scale=1.
  - Berisi tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` sebagai elemen terakhir dalam kepalanya (ini mencakup dan memuat pustaka AMP JS).
  - Berisi yang berikut dalam tag `<head>`-nya:
    `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

## Meta-data opsional

Selain persyaratan yang tak mendetail, sampel kami juga menyertakan definisi Schema.org pada bagian kepalanya, yang bukan merupakan persyaratan ketat bagi AMP, namun diwajibkan agar materi Anda didistribusikan di beberapa tempat, misalnya dalam [Demo menu korsel berita Google Penelusuran (cobalah pada ponsel Anda)](https://g.co/ampdemo).

Untuk mengetahui selengkapnya tentang meta-data yang akan Anda butuhkan di berbagai tempat berbeda, misalnya Twitter, [jelajahilah sampel kami](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples) Untuk mempelajari secara khusus tentang AMP dalam Google Penelusuran, lihat [Cerita Teratas dengan AMP](https://developers.google.com/structured-data/carousels/top-stories).

<hr>

Kabar gembira! Itulah semua yang kita perlukan untuk membuat halaman AMP kita yang pertama, belum banyak yang terjadi di dalam bagian badan. Dalam bagian berikutnya, kita akan membahas mengenai cara menambahkan hal-hal dasar seperti gambar, elemen AMP khusus, cara menggayakan halaman Anda dan mengerjakan layout responsif.

{% include button.html title="Lanjutkan ke Langkah 2" link="/docs/get_started/create/include_image.id.html" %}
