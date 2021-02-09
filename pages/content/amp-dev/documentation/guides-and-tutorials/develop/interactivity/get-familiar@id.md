---
'$title': Mempelajari kode pembuka
$order: 1
description: Halaman AMP adalah halaman HTML dengan beberapa batasan untuk menghasilkan kinerja yang andal. Halaman AMP memiliki sedikit markah khusus yang mengidentifikasinya sebagai halaman AMP.
---

## Boilerplate AMP

Halaman AMP adalah halaman HTML dengan beberapa batasan untuk menghasilkan kinerja yang andal. Halaman AMP memiliki sedikit markah khusus yang mengidentifikasinya sebagai halaman AMP.

Halaman AMP dasar terlihat seperti berikut ini:

```html
<!DOCTYPE html>
<html amp>
  <head>
    <meta charset="utf-8" />
    <link rel="canonical" href="hello-world.html" />
    <meta name="viewport" content="width=device-width" />
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
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello World!
  </body>
</html>
```

[tip] Anda dapat menggunakan [pembuat boilerplate](https://amp.dev/boilerplate) agar dapat dengan cepat menyiapkan kerangka dasar untuk halaman AMP Anda. Ini juga menyediakan snippet untuk data terstruktur, untuk membuat PWA dan masih banyak lagi! [/tip]

## Komponen AMP

Kode awal tutorial ([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)) membangun halaman AMP dasar dengan konten halaman (gambar, teks, dll.) serta menyertakan beberapa komponen AMP:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
<script
  async
  custom-template="amp-mustache"
  src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"
></script>
<script
  async
  custom-element="amp-form"
  src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
></script>
<script
  async
  custom-element="amp-selector"
  src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"
></script>
```

Komponen AMP menawarkan fungsionalitas tambahan dan komponen UI yang menambahkan interaktivitas penuh warna ke halaman AMP. Kode awal menggunakan komponen AMP berikut ini:

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): Korsel gambar yang menampilkan beberapa tampilan produk.
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): Sistem pemberian templat untuk merender respons server dari amp-form.
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): Menambahkan fungsi khusus untuk elemen `<form>` yang penting bagi halaman AMP.
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): Menawarkan cara semantik untuk memilih satu atau banyak elemen dari kelompok elemen. Dapat digunakan sebagai sumber masukan untuk amp-form.

## Interaktivitas dasar

Kode awal menawarkan beberapa interaktivitas dasar:

- Korsel gambar ([`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)) menampilkan beberapa tampilan produk.
- Produk dapat ditambahkan ke keranjang pengguna (melalui [`amp-form`](../../../../documentation/components/reference/amp-form.md)) dengan mengetuk tombol "Tambahkan ke keranjang" di bagian bawah halaman.

**Cobalah**: Usap korsel gambar dan ketuk tombol "Tambahkan ke keranjang".
