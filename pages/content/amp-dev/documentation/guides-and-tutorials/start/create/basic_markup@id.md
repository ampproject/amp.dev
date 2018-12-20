---
$title: Membuat halaman HTML AMP
---

Markup berikut merupakan titik awal atau boilerplate yang baik.
Salin dan simpan ke dalam file berekstensi .html.

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html">
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
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

Sejauh ini, konten pada isi halaman ini cukup mudah dipahami. Namun, ada banyak kode tambahan di bagian kepala yang mungkin tidak bisa langsung dipahami. Mari kita dekonstruksi markup yang diperlukan.

[tip type="note"]
Saat membuat konten dan halaman AMP, sebaiknya Anda memprioritaskan penggunaan protokol HTTPS (bukan HTTP). Meskipun HTTPS tidak wajib digunakan untuk dokumen AMP itu sendiri atau untuk gambar dan font, ada banyak fitur AMP yang mewajibkan penggunaan HTTPS (misalnya video, iframe, dan banyak lagi). Untuk memastikan halaman AMP Anda memanfaatkan sepenuhnya semua fitur AMP, gunakan protokol HTTPS.  Anda dapat mempelajari HTTPS lebih lanjut dalam ["Perlunya Menggunakan HTTPS"](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).
[/tip]

## Markup wajib

Dokumen HTML AMP HARUS:

| Aturan      | Deskripsi |
| --------- | ----------- |
| Mulai dengan doctype `<!doctype html>`. | Standar untuk HTML. |
| Berisi tag `<html ⚡>` level teratas <br>(`<html amp>` juga diterima). | Mengidentifikasi halaman sebagai konten AMP. |
| Berisi tag `<head>` dan `<body>`. | Opsional pada HTML tetapi tidak pada AMP.
| Berisi tag `<meta charset="utf-8">` sebagai turunan pertama dari tag `<head>`. | Mengidentifikasi encoding untuk halaman. |
| Berisi tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` sebagai turunan kedua dari tag `<head>`. | Menyertakan dan memuat library JS AMP. |
| Berisi tag `<link rel="canonical" href="$SOME_URL">` di dalam `<head>`. | Mengarah ke versi HTML reguler dari dokumen HTML AMP, atau ke dokumen HTML AMP itu sendiri jika tidak ada versi HTML seperti itu. Pelajari lebih lanjut di [Membuat Halaman Anda Mudah Ditemukan](/id/docs/fundamentals/discovery.html).
| Berisi tag `<meta name="viewport" content="width=device-width,minimum-scale=1">` di dalam tag `<head>`. Juga direkomendasikan untuk memasukkan `initial-scale=1`. | Menentukan viewport yang responsif. Pelajari lebih lanjut di [Membuat Halaman AMP Responsif](/id/docs/design/responsive/responsive_design.html). |
| Berisi [Kode boilerplate AMP](/id/docs/fundamentals/spec/amp-boilerplate.html) di tag `<head>`.  | Boilerplate CSS untuk mula-mula menyembunyikan konten hingga JS AMP dimuat. |

## Metadata opsional

Selain persyaratan dasar, contoh kita juga mencakup definisi Schema.org di bagian kepala, yang bukan merupakan persyaratan wajib untuk AMP, tetapi diperlukan untuk mendistribusikan konten di tempat-tempat tertentu (misalnya carousel berita teratas di Google Penelusuran).

[tip type="read-on"] Lihat referensi berikut untuk mempelajari lebih lanjut:

* [Memulai AMP di Google Penelusuran](https://developers.google.com/amp/docs) - pelajari cara menyiapkan halaman AMP untuk Google Penelusuran.
  * [Contoh metadata](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples) - pelajari lebih lanjut semua metadata yang diperlukan di berbagai tempat lain (misalnya Twitter).
[/tip]

<hr>

Kabar baik! Itu saja yang diperlukan untuk membuat halaman AMP pertama kita, tetapi tentu saja, belum banyak yang masuk ke isi halaman. Di bagian selanjutnya, kita akan membahas cara menambahkan elemen dasar seperti gambar, elemen AMP kustom, cara menata halaman, dan menyusun tata letak yang responsif.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>	  <a class="button prev-button" href="/id/docs/start/create.html"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/include_image.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>
 
