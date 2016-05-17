---
layout: page
title: Apa yang dimaksud dengan AMP?
order: 0
locale: id
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

"AMP merupakan cara untuk membangun laman web untuk materi statis yang merender dengan cepat.
Tindakan AMP terdiri dari tiga bagian berbeda:

{% include toc.html %}

**AMP HTML** adalah HTML dengan beberapa pembatasan untuk kinerja yang bisa diandalkan
dan beberapa ekstensi untuk membangun materi kaya yang melampaui HTML dasar.
Pustaka **AMP JS** memastikan perenderan halaman AMP HTML yang cepat.
**Google AMP Cache** (secara opsional) menghasilkan halaman AMP HTML.

## AMP HTML

AMP HTML pada dasarnya adalah HTML yang diperluas dengan properti AMP khusus.
File AMP HTML paling sederhana tampak seperti ini:

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

Meski sebagian besar tag dalam halaman AMP HTML adalah tag HTML reguler,
sebagian tag HTML digantikan dengan tag spesifik AMP (lihat juga
[Tag HTML dalam spesifikasi AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).
Elemen khusus ini disebut sebagai komponen AMP HTML,
membuat pola-pola umum menjadi mudah diimplementasikan berdasarkan kinerja.

Misalnya, tag [`amp-img`](/docs/reference/amp-img.html)
menyediakan dukungan `srcset` lengkap meski dalam browser yang belum mendukungnya.
Pelajari cara [membuat halaman AMP HTML pertama Anda](/docs/get_started/create_page.html).

## AMP JS

[Pustaka AMP JS](https://github.com/ampproject/amphtml/tree/master/src) mengimplementasikan
semua [praktik kinerja terbaik AMP](/docs/get_started/technical_overview.html),
mengelola pemuatan sumber daya dan memberi Anda tag khusus seperti yang disebut di atas,
yang semuanya memastikan perenderan halaman Anda dengan cepat.

Di antara optimalisasi terbesar adalah fakta bahwa hal tersebut memastikan semua yang berasal dari sumber daya eksternal menjadi asinkron, sehingga tidak ada satu pun yang bisa menghalangi perenderan di halaman.

Teknik kinerja lainnya meliputi dilakukannya sandbox semua iframe, perhitungan awal layout setiap elemen pada halaman sebelum sumber daya dimuat dan menonaktifkan pemilih CSS yang lambat.

Untuk mengetahui selengkapnya tentang tidak hanya [optimalisasi](/docs/get_started/technical_overview.html) namun juga pembatasannya, [baca spesifikasi AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

## Google AMP Cache

Google AMP Cache adalah jaringan penyajian materi berbasis proxy
untuk menyajikan semua dokumen AMP yang valid.
Jaringan ini mengambil halaman AMP HTML, menempatkannya dalam cache, dan memperbaiki halaman kinerja secara otomatis.
Ketika menggunakan Google AMP Cache, semua file JS dan semua gambar yang dimuat
dari asal yang sama yang menggunakan
[HTTP 2.0](https://http2.github.io/) untuk efisiensi maksimum.

Cache ini juga disertai dengan 
[sistem validasi](https://github.com/ampproject/amphtml/tree/master/validator)
bawaan yang memastikan bahwa halaman dijamin bekerja,
dan halaman tidak bergantung pada sumber daya eksternal.
Sistem validasi ini menjalankan serangkaian pernyataan
yang mengonfirmasi terpenuhinya markup halaman sesuai dengan spesifikasi AMP HTML.

Versi validator lainnya hadir dalam bentuk dibundel dengan setiap halaman AMP. Versi ini bisa mencatat kesalahan validasi secara langsung ke konsol browser ketika halaman dirender,
sehingga Anda bisa melihat bagaimana perubahan kompleks dalam kode Anda
mungkin berdampak pada kinerja dan pengalaman pengguna.

Ketahui selengkapnya tentang [menguji halaman AMP HTML](/docs/guides/validate.html).
