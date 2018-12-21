---
$title: Meningkatkan interaktivitas
---

[TOC]

Kode pembuka memberikan pengalaman pengguna yang cukup sederhana. Ada beberapa cara yang dapat kita lakukan untuk meningkatkannya:

- Tambahkan indikator yang menampilkan slide saat ini dan jumlah total slide.
- Jika pengguna memilih warna kemeja yang berbeda, ubah carousel gambar untuk menampilkan gambar kemeja dengan warna yang dipilih.

Sebelum adanya komponen `<amp-bind>`, penambahan fitur seperti ini tidak mungkin dilakukan. Cobalah pengalaman langsung menggunakan komponen `<amp-bind>`, dan tambahkan fitur baru ini ke kode contoh kami.

## Menginstal ekstensi `<amp-bind>`

[`<amp-bind>`](/id/docs/reference/components/amp-bind.html) adalah komponen AMP baru yang menyediakan interaktivitas kustom melalui pengikatan data dan ekspresi yang berbentuk seperti JS. Untuk menggunakan komponen `<amp-bind>`, Anda harus menginstalnya di halaman.

Buka file [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html), dan tambahkan skrip berikut ke daftar komponen AMP di bagian `<head>` halaman:

```html
<script async custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
```

## Menambahkan indikator slide

Komponen `<amp-bind>` berfungsi dengan mengikat atribut elemen ke ekspresi kustom. Ekspresi tersebut dapat merujuk "status" (data JSON yang dapat berubah). Kita dapat melakukan inisialiasi status ini melalui komponen [`<amp-state>`](/id/docs/reference/components/amp-bind.html#state) yang disertakan dengan `<amp-bind>`.

### Melakukan inisialiasi status slide

Lakukan inisialiasi variabel status untuk melacak indeks dari slide yang ditampilkan saat ini di carousel gambar. Buka [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html), dan tambahkan skrip berikut ke bagian atas `<body>` halaman (sebelum `<header>`):

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

Data dalam elemen `<amp-state>` dapat diakses berdasarkan ID-nya yang terkait. Misalnya, kita dapat merujuk ke variabel ini dengan menggunakan fragmen ekspresi berikut:

```javascript
selected.slide // Dievaluasi ke 0.
```

### Mengupdate status slide

Berikutnya, update variabel ini jika pengguna mengubah slide di carousel, dengan menambahkan tindakan `"on"` berikut pada elemen [`<amp-carousel>`](/id/docs/reference/components/amp-carousel.html) yang sudah ada:

```html
<amp-carousel type="slides" layout="fixed-height" height=250 id="carousel"
    on="slideChange:AMP.setState({selected: {slide: event.index}})">
```

Sekarang, kapan pun slide yang ditampilkan untuk `<amp-carousel>`  berubah, tindakan `AMP.setState` akan dipanggil dengan argumen berikut:

```javascript
{
  selected: {
    slide: event.index
  }
}
```

Ekspresi `event.index` dievaluasi ke indeks slide yang baru, dan tindakan `AMP.setState()` akan menggabungkan literal objek ini ke dalam status saat ini. Tindakan ini mengganti nilai `selected.slide` saat ini dengan nilai `event.index`.

Tip: `AMP.setState()` menjalankan penggabungan mendalam dari literal objek bertingkat. Untuk detail selengkapnya, lihat dokumentasi [`<amp-bind>`](/id/docs/reference/components/amp-bind.html).

### Mengikat elemen indikator

Berikutnya, gunakan variabel status ini yang melacak slide yang saat ini ditampilkan, dan buat indikator slide. Temukan elemen indikator slide (cari `<!-- TODO: "Tambahkan indikator slide" -->`), dan tambahkan pengikatan berikut ke elemen turunannya:

```html
<!-- TODO: "Tambahkan indikator slide" -->
<p class="dots">
  <!-- Elemen <span> yang sesuai dengan slide yang saat ini ditampilkan
       akan memiliki kelas CSS 'current'. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

`[class]` adalah pengikatan yang mengubah atribut `class`, dan Anda dapat menggunakannya untuk menambahkan atau menghapus kelas CSS dari elemen apa pun.

**Cobalah**: Muat ulang halaman dan ubah slide.

Dengan mengubah slide di carousel, perubahan ini:

1.  Memicu `slideChange event` ...
2.  Yang memanggil tindakan `AMP.setState` ...
3.  Yang mengupdate variabel status `selected.slide` ...
4.  Yang mengupdate pengikatan `[class]` pada elemen `<span>` indikator.

Bagus. Sekarang kita memiliki indikator slide yang dapat dijalankan.

[tip type="success"]

Lihat apakah Anda dapat menambahkan fungsi sehingga jika pengguna menge-tap titik indikator slide, titik tersebut akan mengudate carousel gambar dengan item yang dipilih. Sebagai petunjuk, gunakan peristiwa `tap` dan pengikatan `[slide]` di [`<amp-carousel>`](/id/docs/reference/components/amp-carousel.html).

[/tip]

## Mengubah gambar di carousel

Sangatlah bagus jika kita dapat melihat berbagai warna kemeja saat mengubah warna yang dipilih. Dengan amp-bind, kita dapat melakukannya dengan mengikat `[src]` di elemen `<amp-img>` dalam `<amp-carousel>`.


### Melakukan inisialiasi status SKU

Pertama, kita perlu melakukan inisialiasi data status dengan URL sumber gambar untuk setiap warna kemeja. Kita dapat melakukannya dengan elemen `<amp-state>` yang baru:

```html
<!-- Kemeja yang tersedia. Memetakan ID string unik ke string URL gambar dan warna. -->
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

Elemen `<amp-state> `ini berisi objek JSON yang memetakan string ID kemeja (yaitu SKU) ke URL gambar dan warna dari kemeja yang sesuai. Array JSON juga akan berfungsi di sini, namun penggunaan objek memungkinkan kita melakukan beberapa penyempurnaan yang menarik, yang akan segera Anda lihat.

Sekarang kita dapat mengakses URL gambar melalui ID kemeja. Misalnya, `shirts['10014'].color` dievaluasi ke `"dark green"` dan `shirts['10030'].image `menampilkan URL gambar untuk warna kemeja `"wine"`.

### Melacak SKU yang dipilih

Jika menambahkan variabel status lain yang melacak SKU yang dipilih, kita dapat mengikat ekspresi ke elemen `<amp-img>` untuk mengupdate atribut `src`-nya saat SKU yang dipilih berubah. Tambahkan kunci `sku` baru ke JSON elemen `amp-state#selected` yang sudah ada:

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

### Mengupdate status SKU

Tambahkan tindakan "on" ke [`<amp-selector>`](/id/docs/reference/components/amp-selector.html) yang akan mengupdate variabel `selected.sku` kapan pun warna baru dipilih:

```html
<amp-selector name="color"
    on="select:AMP.setState({selected: {sku: event.targetOption}})">
```

Tip: Hal ini juga dapat dilakukan dengan menambahkan tindakan `on="tap:AMP.setState(...)` ke setiap elemen turunan `<amp-img>` dalam `<amp-selector>`. Salah satu kelebihan komponen `<amp-selector>` adalah menyederhanakan markup dengan cara seperti ini.

### Mengikat elemen gambar

Kemudian, tambahkan pengikatan ke elemen [`<amp-img>`](/id/docs/reference/components/amp-img.html) dalam `<amp-carousel>` (cari `<!-- TODO: "Mengubah gambar di amp-carousel-->"`):

```html
<!-- Update `src` untuk setiap <amp-img> jika variabel `selected.sku` berubah. -->
<amp-img width=200 height=250 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=300 height=375 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=400 height=500 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
```

Catatan: Dalam praktiknya, setiap gambar di carousel kemungkinan akan memiliki `src` yang berbeda. Hal ini dapat dilakukan dengan mengganti 1 gambar dengan deretan gambar. Ringkasnya, tutorial ini menggunakan 1 gambar dengan berbagai pembesaran.

**Cobalah**: Muat ulang halaman dan pilih warna kemeja yang berbeda. Saat Anda melakukannya, gambar carousel akan diupdate untuk menampilkan kemeja dengan warna yang dipilih.


<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/get-familiar.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/remote-data.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>

