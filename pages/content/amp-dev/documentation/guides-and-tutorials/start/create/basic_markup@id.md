---
'$title': Membuat halaman HTML AMP Anda
$order: 1
description: 'Gunakan HTTPS: Saat membuat konten dan halaman AMP, Anda harus benar-benar mempertimbangkan untuk menggunakan protokol HTTPS (vs. HTTP). Meskipun HTTPS tidak diperlukan untuk dokumen AMP itu sendiri atau ....'
author: pbakaus
contributors:
  - bpaduch
---

Markah berikut ini merupakan titik awal atau boilerplate yang baik. Salin dan simpan ke dalam berkas berekstensi .html.

[sourcecode:html]

<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
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

Sejauh ini, konten pada badan halaman ini cukup mudah dipahami. Namun, banyak kode tambahan di bagian tajuk yang mungkin tidak bisa langsung dipahami. Mari kita uraikan markah yang diperlukan.

Gunakan HTTPS: Saat membuat konten dan halaman AMP, sebaiknya Anda memprioritaskan penggunaan protokol HTTPS (bukan HTTP). Meskipun HTTPS tidak wajib digunakan untuk dokumen AMP itu sendiri atau untuk gambar dan font, banyak fitur AMP yang mewajibkan penggunaan HTTPS (cth.: video, iframe, dan banyak lagi). Untuk memastikan halaman AMP Anda sepenuhnya memanfaatkan semua fitur AMP, gunakan protokol HTTPS. Anda dapat mempelajari HTTPS lebih lanjut dalam ["Mengapa HTTPS Penting"](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).

[tip type="tip"] Gunakan [Penghasil Boilerplate AMP](/boilerplate) agar dapat dengan cepat memulai pembuatan halaman AMP baru. [/tip]

## Markah yang diperlukan

Dokumen HTML AMP HARUS:

| Aturan                                                                                                                                                                                                         | Deskripsi                                                                                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mulai dengan jenis dokumen `<!doctype html>`.                                                                                                                                                                  | Standar untuk HTML.                                                                                                                                                                                                                                                                 |
| Berisi tag `<html ⚡>` level teratas <br>(`<html amp>` juga diterima).                                                                                                                                         | Mengidentifikasi halaman sebagai konten AMP.                                                                                                                                                                                                                                        |
| Berisi tag `<head>` dan `<body>`.                                                                                                                                                                              | Opsional pada HTML, tetapi tidak pada AMP.                                                                                                                                                                                                                                          |
| Berisi tag` <meta charset="utf-8">` sebagai anak atau turunan pertama dari tag `<head>` mereka.                                                                                                                | Mengidentifikasi pengodean untuk halaman tersebut.                                                                                                                                                                                                                                  |
| Berisi tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` di dalam `<head>`-nya. Sebagai praktik terbaik, Anda seharusnya menyertakan skrip ini sedini mungkin di dalam <code><head></code>. | Menyertakan dan memuat perpustakan JS AMP.                                                                                                                                                                                                                                          |
| Berisi tag `<link rel="canonical" href="$SOME_URL">` di dalam `<head>`.                                                                                                                                        | Mengarah ke versi HTML reguler dari dokumen HTML AMP, atau ke dokumen HTML AMP itu sendiri jika tidak ada versi HTML seperti itu. Pelajari lebih lanjut dalam [Membuat Halaman Anda Mudah Ditemukan](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md). |
| Berisi tag `<meta name="viewport" content="width=device-width">`. Disarankan juga untuk menyertakan skala inisial=1.                                                                                           | Menentukan viewport yang responsif. Pelajari lebih lanjut dalam [Membuat Halaman AMP yang Responsif](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md).                                                                                 |
| Berisi [Kode boilerplate AMP](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) di tag `<head>`.                                                                                   | Boilerplate CSS awalnya menyembunyikan konten hingga JS AMP dimuat.                                                                                                                                                                                                                 |

## Metadata opsional

Selain persyaratan dasar, contoh kita juga mencakup definisi Schema.org di bagian tajuk, yang bukan merupakan persyaratan wajib untuk AMP, tetapi diperlukan untuk mendistribusikan konten Anda di tempat-tempat tertentu (contoh: di korsel cerita teratas Google Search).

[tip type="read-on"] Kunjungi referensi berikut ini untuk mempelajari lebih lanjut:

- [Memulai AMP di Google Penelusuran](https://developers.google.com/amp/docs) - pelajari cara menyiapkan halaman AMP untuk Google Penelusuran.
- [Contoh metadata](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples) - pelajari lebih lanjut semua metadata yang diperlukan di berbagai tempat lain (misalnya Twitter). [/tip]

<hr>

Kabar baik! Itu saja yang diperlukan untuk membuat halaman AMP pertama kita, tetapi tentu saja, belum banyak yang masuk ke badan halaman. Di bagian selanjutnya, kita akan membahas cara menambahkan elemen dasar, seperti gambar, elemen AMP kustom, cara menata halaman, dan membuat tata letak yang responsif.
