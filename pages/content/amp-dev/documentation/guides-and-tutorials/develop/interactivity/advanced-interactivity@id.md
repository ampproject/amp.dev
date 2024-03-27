---
'$title': Meningkatkan interaktivitas
$order: 2
description: 'Kode awal memberikan pengalaman pengguna yang cukup sederhana. Ada beberapa cara untuk memperbaikinya - Tambahkan indikator yang menampilkan ....'
---

Kode awal memberikan pengalaman pengguna yang cukup sederhana. Ada beberapa cara untuk memperbaikinya:

- Tambahkan indikator yang menampilkan slide saat ini dan total jumlah slide.
- Jika pengguna memilih warna baju yang berbeda, ubah korsel gambar untuk memperlihatkan gambar baju dengan warna yang dipilih.

Sebelum adanya komponen [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), penambahan fitur seperti ini tidak mungkin dilakukan. Cobalah pengalaman langsung menggunakan komponen [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), dan tambahkan fitur baru ini ke kode contoh kita!

## Instal komponen `amp-bind`

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) adalah komponen AMP yang memberikan interaktivitas kustom melalui pengikatan data dan ekspresi serupa JS. Untuk menggunakan [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), Anda harus menginstalnya di halaman.

Buka berkas [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html), dan tambahkan skrip berikut ini ke daftar komponen AMP di bagian `<head>` halaman:

```html
<script
  async
  custom-element="amp-bind"
  src="https://ampjs.org/v0/amp-bind-0.1.js"
></script>
```

## Menambahkan indikator slide

Komponen [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) berfungsi dengan mengikat atribut elemen ke ekspresi kustom. Ekspresi tersebut dapat merujuk "status" (data JSON yang dapat berubah). Kita dapat melakukan inisialiasi status ini melalui komponen [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) yang disertakan dengan [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

### Melakukan inisialiasi status slide

Lakukan inisialiasi variabel status untuk melacak indeks dari slide yang ditampilkan saat ini di korsel gambar. Buka [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html), dan tambahkan skrip berikut ini ke bagian atas `<body>` halaman (sebelum `<header>`):

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

Data dalam elemen `<amp-state>` dapat diakses berdasarkan ID-nya yang terkait. Contohnya: kita dapat merujuk ke variabel ini dengan menggunakan fragmen ekspresi berikut ini:

```javascript
selected.slide; // Evaluates to 0.
```

### Memperbarui status slide

Berikutnya, perbarui variabel ini jika pengguna mengubah slide di korsel dengan menambahkan tindakan `"on"` berikut ini pada elemen [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) yang sudah ada:

```html
<amp-carousel
  type="slides"
  layout="fixed-height"
  height="250"
  id="carousel"
  on="slideChange:AMP.setState({selected: {slide: event.index}})"
></amp-carousel>
```

Kapan pun slide yang ditampilkan untuk [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) berubah, tindakan `AMP.setState` akan dipanggil dengan argumen berikut ini:

```javascript
{
  selected: {
    slide: event.index;
  }
}
```

Ekspresi `event.index` dievaluasi terhadap indeks slide yang baru, dan tindakan `AMP.setState()` akan menggabungkan literal objek ini ke dalam status saat ini. Tindakan ini mengganti nilai `selected.slide` saat ini dengan nilai `event.index`.

[tip type="tip"] **KIAT –** `AMP.setState()` menjalankan penggabungan mendalam dari literal objek bertingkat. Untuk detail selengkapnya, lihat dokumentasi [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

### Mengikat elemen indikator

Berikutnya, gunakan variabel status ini yang melacak slide yang saat ini ditampilkan, dan buat indikator slide. Temukan elemen indikator slide (cari `<!-- TODO: "Add a slide indicator" -->`), dan tambahkan pengikatan berikut ini ke elemen anak atau turunannya:

```html
<!-- TODO: "Add a slide indicator" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

`[class]` adalah pengikatan yang mengubah atribut `class`, dan Anda dapat menggunakannya untuk menambahkan atau menghapus kelas CSS dari elemen apa pun.

**Cobalah**: Muat ulang halaman dan ubah slide!

Dengan mengubah slide di korsel, perubahan ini:

1. Memicu `slideChange event` ....
2. Yang memanggil tindakan `AMP.setState` ....
3. Yang mengupdate variabel status `selected.slide` ...
4. Yang memperbarui pengikatan `[class]` pada elemen `<span>` indikator!

Bagus! Sekarang kita memiliki indikator slide yang dapat dijalankan.

[tip type="success"]

Coba apakah Anda dapat menambahkan fungsi sehingga jika pengguna mengetuk titik indikator slide, titik tersebut akan memperbarui korsel gambar dengan item yang dipilih. Sebagai petunjuk, gunakan peristiwa `tap` dan pengikatan `[slide]` di [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[/tip]

## Mengubah gambar di korsel

Sangatlah bagus jika kita dapat melihat berbagai warna baju saat mengubah warna yang dipilih. Dengan [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) kita dapat melakukannya dengan mengikat `[src]` di elemen [`amp-img`](../../../../documentation/components/reference/amp-img.md) dalam [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

### Melakukan inisialiasi status SKU

Pertama, kita perlu melakukan inisialiasi data status dengan URL sumber gambar untuk setiap warna baju. Kita dapat melakukannya dengan elemen `<amp-state>` yang baru:

```html
<!-- Available shirts. Maps unique string identifier to color and image URL string. -->
<amp-state id="shirts">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg"
      },
      "1002": {
        "color": "blue",
        "image": "./shirts/blue.jpg"
      },
      "1010": {
        "color": "brown",
        "image": "./shirts/brown.jpg"
      },
      "1014": {
        "color": "dark green",
        "image": "./shirts/dark-green.jpg"
      },
      "1015": {
        "color": "gray",
        "image": "./shirts/gray.jpg"
      },
      "1016": {
        "color": "light gray",
        "image": "./shirts/light-gray.jpg"
      },
      "1021": {
        "color": "navy",
        "image": "./shirts/navy.jpg"
      },
      "1030": {
        "color": "wine",
        "image": "./shirts/wine.jpg"
      }
    }
  </script>
</amp-state>
```

Elemen [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) ini berisi objek JSON yang memetakan untai ID baju (yaitu SKU) ke URL gambar dan warna dari baju yang sesuai. Susunan JSON juga akan berfungsi di sini, namun penggunaan objek memungkinkan kita melakukan beberapa penyempurnaan yang menarik, yang akan segera Anda lihat.

Sekarang kita dapat mengakses URL gambar melalui ID baju. Contohnya: `shirts['10014'].color` dievaluasi ke `"dark green"` dan `shirts['10030'].image `menampilkan URL gambar untuk warna baju `"wine"`.

### Melacak SKU yang dipilih

Jika menambahkan variabel status lain yang melacak SKU yang dipilih, kita dapat mengikat ekspresi ke elemen [`amp-img`](../../../../documentation/components/reference/amp-img.md) untuk memperbarui atribut `src`-nya saat SKU yang dipilih berubah. Tambahkan kunci `sku` baru ke JSON elemen `amp-state#selected` yang sudah ada:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0,
      "sku": "1001"
    }
  </script>
</amp-state>
```

### Memperbarui status SKU

Tambahkan tindakan "on" ke [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) yang akan memperbarui variabel `selected.sku` kapan pun warna baru dipilih:

```html
<amp-selector
  name="color"
  on="select:AMP.setState({selected: {sku: event.targetOption}})"
></amp-selector>
```

[tip type="tip"] **KIAT –** Hal ini juga dapat dilakukan dengan menambahkan tindakan `on="tap:AMP.setState(...)` ke setiap elemen anak [`amp-img`](../../../../documentation/components/reference/amp-img.md) dalam [`amp-selector`](../../../../documentation/components/reference/amp-selector.md). Salah satu kelebihan komponen [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) adalah menyederhanakan markah dengan cara seperti ini. [/tip]

### Mengikat elemen gambar

Kemudian, tambahkan pengikatan ke elemen [`amp-img`](../../../../documentation/components/reference/amp-img.md):

```html
<!-- Update `src` untuk setiap <amp-img> jika variabel `selected.sku` berubah. -->
<amp-img
  width="200"
  height="250"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="300"
  height="375"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="400"
  height="500"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
```

[tip type="note"] <strong>CATATAN –</strong> Dalam praktiknya, setiap gambar di korsel kemungkinan akan memiliki `src` yang berbeda. Hal ini dapat dilakukan dengan mengganti satu gambar dengan deretan gambar. Ringkasnya, tutorial ini menggunakan satu gambar dengan berbagai pembesaran. [/tip]

**Cobalah**: Muat ulang halaman dan pilih warna baju yang berbeda. Saat Anda melakukannya, gambar korsel akan diperbarui untuk menampilkan baju dengan warna yang dipilih.
