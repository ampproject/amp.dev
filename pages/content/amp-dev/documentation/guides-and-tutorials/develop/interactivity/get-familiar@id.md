---
$title: Mempelajari kode pembuka
---

## Boilerplate AMP

Halaman AMP adalah halaman HTML yang memiliki beberapa batasan untuk memberikan performa yang andal. Halaman AMP memiliki markup khusus yang menandainya sebagai halaman AMP.

Halaman AMP dasar terlihat seperti berikut:

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
    Halo, Dunia!
  </body>
</html>
```

## Komponen AMP

Kode pembuka tutorial ([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)) membangun berdasarkan halaman AMP dasar dengan konten halamannya (gambar, teks, dll.) dan menyertakan beberapa komponen AMP:

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

Komponen AMP menawarkan komponen UI dan fungsi tambahan yang menambahkan interaktivitas yang kaya ke halaman AMP. Kode pembuka menggunakan komponen AMP berikut:

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): Carousel gambar yang menampilkan beberapa tampilan produk.
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): Sistem pemberian template untuk merender respons server dari amp-form.
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): Menambahkan fungsi khusus untuk elemen `<form>` yang penting bagi halaman AMP.
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): Menawarkan cara semantik untuk memilih 1 atau banyak elemen dari grup elemen. Dapat digunakan sebagai sumber masukan untuk amp-form.

## Interaktivitas dasar

Kode pembuka menawarkan beberapa interaktivitas dasar:

- Carousel gambar ([`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)) menampilkan beberapa tampilan produk.
- Produk dapat ditambahkan ke keranjang pengguna (melalui [`amp-form`](../../../../documentation/components/reference/amp-form.md)) dengan menge-tap tombol "Tambahkan ke keranjang" di bagian bawah halaman.

**Cobalah**: Geser carousel gambar lalu tap tombol "Tambahkan ke keranjang".
