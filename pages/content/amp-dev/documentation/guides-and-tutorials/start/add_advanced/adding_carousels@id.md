---
$title: Menambahkan carousel
---

[TOC]

Fitur umum lainnya di halaman seluler adalah carousel.  Anda dapat dengan mudah menambahkan carousel ke halaman AMP dengan menggunakan komponen [amp-carousel](/id/docs/reference/components/amp-carousel.html). Mari kita mulai dengan contoh sederhana, misalnya carousel gambar.

## Carousel gambar yang sederhana

Jangan lupa untuk menyertakan library komponen amp-carousel dengan **menambahkan** permintaan JavaScript berikut ke tag `<head>` pada dokumen Anda:

```html
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
```

Berikutnya, mari sematkan carousel gambar yang sederhana dengan tata letak responsif serta lebar dan tinggi yang sudah ditentukan sebelumnya. **Tambahakan** kode berikut ke halaman:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel" >
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**Refresh** halaman dan Anda akan melihat carousel:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Carousel gambar yang sederhana') }}

Komponen `amp-carousel` dapat dikonfigurasikan dalam berbagai cara.  Mari kita ubah UI agar hanya menampilkan gambar satu per satu dan membuat tata letak carousel menjadi responsif.

Untuk melakukannya, pertama-tama, **ubah** `type` `amp-carousel` dari `carousel` menjadi `slides`, **ubah** `layout` menjadi `responsive` dan **tetapkan** `width` ke 300 (pastikan `height` dan `width` sudah ditentukan).  **Tambahkan ** atribut `"layout=responsive"` ke `amp-img` turunan `amp-carousel`.

**Muat ulang** halaman. Kini, Anda akan melihat elemen satu per satu, bukannya daftar elemen yang dapat di-scroll secara berulang. Coba **geser** secara horizontal untuk berpindah antar-elemen. Jika Anda menggeser elemen ketiga, Anda tidak akan dapat menggeser lebih jauh lagi.

Berikutnya, **tambahkan** atribut `loop`. **Refresh** halaman dan coba geser ke kiri dengan segera. Carousel akan terus mengalami pengulangan.

Terakhir, mari buat carousel ini agar otomatis berputar setiap 2 detik. **Tambahkan** atribut `autoplay` dan atribut `delay` dengan nilai `2000` (misalnya, `delay="2000"`) ke `amp-carousel`.

Hasil akhirnya akan terlihat seperti berikut:

```html
<amp-carousel layout="responsive" width="300" height="168" type="slides" autoplay delay="2000" loop>
  <amp-img src="mountains-1.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168" layout="responsive"></amp-img>
</amp-carousel>
```

**Refresh** halaman dan cobalah.

Catatan: Anda mungkin menyadari bahwa ketika `amp-carousel` memiliki jenis `carousel`, kami menggunakan jenis tata letak `fixed-height`.  Jenis tata letak untuk jenis `carousel` terbatas; misalnya, jenis `carousel` tidak mendukung tata letak `responsive`.  Sesuai dengan namanya, elemen fixed-height mengambil ruang yang tersedia untuknya, namun lebarnya tidak berubah. Untuk elemen fixed-height, Anda harus menentukan atribut `height`, sementara atribut `width` sebaiknya tidak disetel atau disetel ke `auto`.

## Konten carousel campuran

Carousel gambar sudah bagus namun, bagaimana cara untuk memunculkan konten yang lebih rumit di carousel? Mari kita coba mencampurkan berbagai hal sedikit demi sedikit dengan menempatkan iklan, beberapa teks, serta gambar dalam 1 carousel. Dapatkah amp-carousel menangani campuran semacam ini sekaligus? Tentu saja!

Pertama, mari **tambahkan** gaya ini ke `<style amp-custom>` untuk memastikan bahwa komponen `amp-fit-text` dan `amp-carousel` dapat bekerja sama dengan aman:

```css
amp-fit-text {
    white-space: normal;
}
```

Sekarang, **ganti** carousel sederhana Anda dengan ini:

```html
<amp-carousel layout="fixed-height" height="250" type="carousel" >
    <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

    <amp-ad width="300" height="250"
      type="doubleclick"
      data-slot="/35096353/amptesting/image/static">
        <div placeholder>This ad is still loading.</div>
    </amp-ad>

    <amp-fit-text width="300" height="250" layout="fixed">
        Big, bold article quote goes here.
    </amp-fit-text>
</amp-carousel>
```

**Refresh** halaman dan seharusnya tampak seperti ini:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='Carousel konten campuran') }}

Untuk mempelajari lebih lanjut, lihat dokumentasi referensi komponen [amp-carousel](/id/docs/reference/components/amp-carousel.html).

Catatan: Pada contoh terakhir, Anda mungkin menyadari bahwa komponen `amp-ad` menyertakan elemen `div` turunan dengan atribut `placeholder`. Sebelumnya pada tutorial ini, kita menghadapi skenario serupa terkait `amp-ad` yang menggunakan `fallback`. Apa perbedaan antara placeholder dan fallback? Elemen `Fallback` muncul ketika elemen induk gagal dimuat, misalnya, jika tidak ada iklan yang tersedia. Elemen `placeholder` muncul di tempat elemen induk, saat elemen induk sedang dimuat. Artinya, elemen ini menandai berakhirnya proses pemuatan elemen induk. Anda dapat mempelajari lebih lanjut di panduan [Placeholder & fallback]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}).

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/adding_components.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/tracking_data.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>
