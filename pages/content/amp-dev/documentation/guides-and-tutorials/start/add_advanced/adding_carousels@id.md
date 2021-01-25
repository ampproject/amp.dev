---
"$title": Menambahkan korsel
"$order": '3'
description: Fitur umum lainnya di halaman seluler adalah korsel (carousel). Anda dapat dengan mudah menambahkan korsel ke halaman AMP dengan menggunakan komponen amp-carousel.
---

Fitur umum lainnya di halaman seluler adalah korsel (carousel). Anda dapat dengan mudah menambahkan korsel ke halaman AMP dengan menggunakan komponen [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md). Mari kita mulai dengan contoh sederhana, misalnya korsel gambar.

## Korsel gambar sederhana

Jangan lupa untuk menyertakan perpustakaan komponen [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) dengan **menambahkan** permintaan JavaScript berikut ini ke tag `<head>` pada dokumen Anda:

```html
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
```

Berikutnya, mari sematkan korsel gambar yang sederhana dengan tata letak responsif serta lebar dan tinggi yang sudah ditentukan sebelumnya. **Tambahkan** kode berikut ini ke halaman Anda:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel" >
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**Segarkan** halaman, maka Anda akan melihat korsel:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Korsel gambar sederhana') }}

Komponen [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) dapat dikonfigurasikan dalam berbagai cara.  Mari kita ubah UI agar hanya menampilkan gambar satu per satu dan membuat tata letak korsel menjadi responsif.

Untuk melakukannya, pertama-tama, **ubah** `type` [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) dari `carousel` menjadi `slides`, **ubah** `layout` menjadi `responsive` dan **tetapkan** `width` ke 300 (pastikan `height` dan `width` sudah ditentukan). <strong>Tambahkan</strong> atribut <code>"layout=responsive"</code> ke <a><code>amp-img</code></a> anak <a><code>amp-carousel</code></a>.

**Muat ulang** halaman. Kini, Anda akan melihat elemen satu per satu, bukannya daftar elemen yang dapat di-scroll secara berulang. Coba **usap** secara horizontal untuk berpindah antar-elemen. Jika Anda mengusap elemen ketiga, Anda tidak akan dapat mengusap lebih jauh lagi.

Berikutnya, **tambahkan** atribut `loop`. **Segarkan** halaman dan coba segra usap ke kiri. Korsel akan terus mengalami pengulangan.

Terakhir, mari buat korsel ini agar otomatis berputar setiap 2 detik. **Tambahkan** atribut `autoplay` dan atribut `delay` dengan nilai `2000` (cth.: `delay="2000"`) ke [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

Hasil akhirnya akan terlihat seperti berikut ini:

```html
<amp-carousel layout="responsive" width="300" height="168" type="slides" autoplay delay="2000" loop>
  <amp-img src="mountains-1.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168" layout="responsive"></amp-img>
</amp-carousel>
```

**Segarkan** halaman dan cobalah!

[tip type="note"] **CATATAN –** Anda mungkin telah mengetahui bahwa ketika [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) memiliki jenis `carousel`, kita menggunakan jenis layout `fixed-height`. Jenis tata letak yang didukung untuk jenis `carousel` terbatas; contohnya: jenis `carousel` tidak mendukung tata letak `responsive`. Sesuai dengan namanya, elemen tinggi tetap mengambil ruang yang tersedia bagi mereka, tetapi menjaga tinggi tidak berubah. Untuk elemen tinggi tetap, Anda harus menentukan atribut `height`, sedangkan atribut `width` harus `auto` atau tidak ditetapkan. [/tip]

## Konten korsel campuran

Korsel gambar sudah bagus, namun bagaimana cara untuk memunculkan konten yang lebih rumit di korsel? Mari kita coba mencampurkan berbagai hal sedikit demi sedikit dengan menempatkan iklan, beberapa teks, serta gambar dalam satu korsel. Dapatkah [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) menangani campuran semacam ini sekaligus? Tentu saja!

Pertama, mari **tambahkan** gaya ini ke `<style amp-custom>` untuk memastikan bahwa komponen [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) dan [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) dapat bekerja sama dengan aman:

```css
amp-fit-text {
    white-space: normal;
}
```

Sekarang, **ganti** korsel sederhana Anda dengan ini:

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

**Segarkan** halaman, maka seharusnya tampak seperti ini:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='Korsel konten campuran') }}

Untuk mempelajari lebih lanjut, lihat dokumentasi referensi komponen [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[tip type="note"] **CATATAN –** Dalam contoh terakhir kita, Anda mungkin telah menegtahui komponen [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) menyertakan elemen `div` anak dengan atribut `placeholder`. Di awal tutorial ini, ada skenario serupa dengan [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) yang menggunakan `fallback`. Apa perbedaan antara bakal tempat (placeholder) dan fallback? Elemen `Fallback` muncul ketika elemen induk gagal dimuat, yaitu jika tidak ada iklan yang tersedia. Elemen `placeholder` muncul menggantikan elemen induk, saat sedang dimuat. Dalam arti tertentu, elemen-elemen ini mengakhiri proses pemuatan elemen induk. Anda dapat mempelajari lebih lanjut dalam panduan [Bakal tempat & fallback](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]
