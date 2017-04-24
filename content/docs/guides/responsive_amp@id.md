---
$title: Membuat Laman AMP Responsif
toc: true
---

Membuat elemen responsif di AMP sangatlah mudah.
Cukup masukkan `layout=responsive` ke elemen.

[TOC]

## Membuat gambar responsif

Semua sumber daya yang dimuat secara eksternal termasuk gambar,
harus memiliki ukuran dan posisi tertentu
sehingga ketika sumber daya dimuat, laman tidak akan melompat dan dan mengalir balik.

Buat gambar responsif
dengan menentukan lebar dan tinggi,
menyetel tata letak menjadi responsif,
dan mengindikasikan dengan [`srcset`](/id/docs/guides/author-develop/responsive/style_pages.html)
aset gambar yang akan digunakan berdasarkan ukuran layar yang bervariasi:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Elemen `amp-img` ini secara otomatis disesuaikan dengan lebar
elemen kontennya,
dan tingginya secara otomatis disetel ke rasio aspek
yang ditentukan dengan lebar dan tinggi yang diberikan:

<amp-img src="/static/img/docs/responsive_amp_img.png" width="500" height="857"></amp-img>

Lihat juga [amp-img di AMP by Example](https://ampbyexample.com/components/amp-img/).

## Menambahkan gaya ke laman

Tambahkan semua gaya di dalam tag `<style amp-custom>`
di bagian head dokumen.
Misalnya:

[sourcecode:html]
<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html" >
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
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
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
[/sourcecode]

**Penting:**
Pastikan hanya ada satu tag `<style amp-custom>` di laman,
karena tidak boleh ada lebih dari satu tag di AMP.

Tentukan gaya komponen dengan pemilih elemen atau kelas
menggunakan properti CSS umum. Misalnya:

[sourcecode:html]
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

**Penting:**
Periksa bahwa gaya yang ditambahkan didukung di AMP;
beberapa gaya tidak untuk alasan performa
(lihat juga [CSS yang Didukung](/id/docs/guides/author-develop/responsive/style_pages.html)).

## Ukuran dan posisi elemen

AMP melepaskan tata letak dokumen dari pemuatan sumber daya
sehingga AMP dapat memuat tata letak laman tanpa menunggu sumber daya didownload.

Tentukan ukuran dan posisi semua elemen AMP yang terlihat
dengan memberikan atribut `width` dan `height`.
Atribut ini mengartikan rasio aspek elemen,
yang kemudian dapat disesuaikan dengan penampung.

Setel tata letak menjadi responsif.
Tindakan ini menetapkan ukuran elemen ke lebar elemen penampungnya
dan otomatis mengubah ukuran tingginya ke rasio aspek yang diberikan oleh atribut lebar dan tinggi.

Pelajari lebih lanjut tentang [tata letak yang didukung di AMP](/id/docs/guides/author-develop/responsive/control_layout.html).

## Memvalidasi gaya dan tata letak

Gunakan validator AMP untuk menguji
nilai CSS dan tata letak laman.

Validator mengonfirmasi bahwa CSS laman tidak melebihi batas 50.000 byte,
memeriksa gaya yang tidak diizinkan, serta memastikan bahwa tata letak didukung dan diformat dengan benar.
Lihat juga daftar lengkap [Kesalahan gaya dan tata letak](/id/docs/reference/validation_errors.html#kesalahan-gaya-dan-tata-letak).

Contoh kesalahan di konsol untuk laman dengan CSS yang melebihi batas 50.000 byte:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

Pelajari lebih lanjut tentang cara [memvalidasi laman AMP](/id/docs/guides/debug/validate.html),
termasuk cara melacak dan memperbaiki kesalahan gaya.
