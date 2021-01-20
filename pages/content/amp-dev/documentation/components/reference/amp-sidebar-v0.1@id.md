---
$category@: layout
formats:
  - websites
  - email
teaser:
  text: >-
    Provides a way to display meta content intended for temporary access such as navigation, links, buttons, menus.
toc: true
$title: amp-sidebar
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

       Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS-IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
-->




<table>
  <tr>
    <td width="40%"><strong>Deskripsi</strong></td>
    <td>
      Sidebar menyediakan cara untuk menampilkan konten meta yang ditujukan untuk akses sementara (link navigasi, tombol, menu, dll.). Sidebar dapat ditampilkan dengan menge-tap tombol sementara konten utama secara visual tetap berada di bawahnya.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Contoh</strong></td>
    <td>Lihat <a href="https://ampbyexample.com/components/amp-sidebar/">contoh amp-sidebar</a> di AMP By Example.</td>
  </tr>
</table>

## Ringkasan <a name="overview"></a>

`<amp-sidebar>` menyembunyikan konten meta yang ditujukan untuk akses sementara (link navigasi, tombol, menu, dll.). `<amp-sidebar>` dapat dibuka dan ditutup dengan menge-tap tombol, dan menge-tap di luar amp-sidebar.
Namun, atribut opsional yang menerima kueri media dapat digunakan untuk menampilkan konten meta di bagian lain pada situs. Elemen `<nav toolbar="(media query)" toolbar-target="elementID">` turunan memungkinkan konten dalam sidebar untuk ditampilkan di bagian lain konten utama.

## Perilaku <a name="behavior"></a>

* `<amp-sidebar>` harus merupakan turunan langsung dari `<body>`.
* Sidebar hanya dapat muncul di sisi kiri atau kanan halaman.
* `<amp-sidebar>` dapat memuat semua elemen HTML yang valid (didukung oleh AMP).
* `<amp-sidebar>` dapat memuat salah satu elemen AMP berikut:
    * `<amp-accordion>`
    * `<amp-img>`
    * `<amp-fit-text>`
    * `<amp-list>`
    * `</amp-live-list>`
    * `<amp-social-share>`</li>
* Tinggi maksimum sidebar adalah 100 vh, jika tinggi melebihi 100 vh maka scrollbar vertikal akan muncul. Tinggi default ditetapkan ke 100 vh di CSS dan dapat diganti dalam CSS.
* Lebar sidebar dapat disetel dan disesuaikan menggunakan CSS (lebar minimum adalah 45 px).
* Zoom sentuh dinonaktifkan pada `amp-sidebar` dan mask-nya saat sidebar terbuka.

*Contoh:*

Pada contoh berikut, kami menggunakan `amp-sidebar` untuk memuat item navigasi. Namun, item kedua dan keempat, Nav Item 2 dan Nav Item 4, ditetapkan ke ID elemen yang ada di halaman. Dengan menggunakan atribut [`on`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/../../spec/amp-actions-and-events.md), kami dapat men-scroll dengan lancar ke elemen tersebut, menggunakan ID elemen dan `scrollTo`.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>
</amp-sidebar>
```

### Membuka dan menutup sidebar <a name="opening-and-closing-the-sidebar"></a>

Untuk beralih, membuka, atau menutup sidebar saat elemen di-tap atau diklik, tetapkan atribut tindakan [`on`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) pada elemen tersebut, dan tentukan salah satu metode tindakan berikut:

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td>open (default)</td>
    <td>Membuka sidebar</td>
  </tr>
  <tr>
    <td>close</td>
    <td>Menutup sidebar</td>
  </tr>
  <tr>
    <td>toggle</td>
    <td>Mengalihkan status sidebar</td>
  </tr>
</table>

Jika pengguna menge-tap kembali area konten utama yang terlihat sebagian, tindakan ini akan menutup sidebar.

Atau, menekan tombol escape pada keyboard juga akan menutup sidebar.

*Contoh:*

```html
<button class="hamburger" on='tap:sidebar1.toggle'></button>
<button on='tap:sidebar1'>Open</button>
<button on='tap:sidebar1.open'>Open</button>
<button on='tap:sidebar1.close'>x</button>
```

### Toolbar <a name="toolbar"></a>

Anda dapat membuat elemen `toolbar` yang ditampilkan di `<body>` dengan menentukan atribut `toolbar` dengan kueri media dan atribut `toolbar-target` dengan ID elemen pada elemen `<nav>` yang merupakan turunan dari `<amp-sidebar>`. `toolbar` menduplikasi elemen `<nav>` dan turunannya, serta menambahkan elemen ke dalam elemen `toolbar-target`.

#### Perilaku <a name="behavior-1"></a>

* Sidebar dapat mengimplementasikan toolbar dengan menambahkan elemen navigasi dengan atribut `toolbar` dan atribut `toolbar-target`.
* Elemen navigasi harus merupakan turunan dari `<amp-sidebar>` dan mengikuti format ini: `<nav toolbar="(media-query)" toolbar-target="elementID">`.
    * Misalnya, berikut ini penggunaan toolbar yang valid: `<nav toolbar="(max-width: 1024px)" toolbar-target="target-element">`.</li>
* Navigasi yang memuat atribut toolbar hanya boleh memuat satu elemen `<ul>`, yang berisi elemen `<li>`.
    * Elemen `<li>` dapat memuat semua elemen HTML yang valid (didukung oleh AMP), atau salah satu elemen AMP yang didukung `<amp-sidebar>`.</li>
* Perilaku toolbar hanya diterapkan jika kueri media atribut `toolbar` valid. Selain itu, elemen dengan ID atribut `toolbar-target` harus ada pada halaman agar toolbar dapat diterapkan.

*Contoh: Toolbar Dasar*

Pada contoh berikut, kami menampilkan `toolbar` jika lebar jendela kurang dari atau sama dengan 767 piksel. `toolbar` memuat elemen input penelusuran. Elemen `toolbar` akan ditambahkan ke elemen `<div id="target-element">`.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Telusuri..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>
```

## Menata Gaya Toolbar <a name="styling-toolbar"></a>

Elemen `toolbar` dalam elemen `<amp-sidebar>` akan memiliki class yang diterapkan ke elemen tersebut, bergantung pada apakah elemen `toolbar-target` ditampilkan atau disembunyikan. Hal ini berguna untuk menerapkan gaya berbeda pada elemen `toolbar` dan kemudian elemen `toolbar-target`. Class-nya adalah `amp-sidebar-toolbar-target-shown`, dan `amp-sidebar-toolbar-target-hidden`. Class `amp-sidebar-toolbar-target-shown` diterapkan ke elemen `toolbar` jika elemen `toolbar-target` ditampilkan. Class `amp-sidebar-toolbar-target-hidden` diterapkan ke elemen `toolbar` jika elemen `toolbar-target` disembunyikan.

*Contoh: Class Status Toolbar*

Pada contoh berikut, kami menampilkan `toolbar` jika lebar jendela kurang dari atau sama dengan 767 piksel. `toolbar` memuat elemen input penelusuran. Elemen `toolbar` akan ditambahkan ke elemen `<div id="target-element">`. Namun, kami menambahkan beberapa gaya kustom untuk menyembunyikan elemen `toolbar`, jika elemen `<div id="toolbar-target">` ditampilkan.

```html
<style amp-custom="">

  .amp-sidebar-toolbar-target-shown {
      display: none;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Telusuri..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

[tip type="ll callout('Tips:</b> <a class="type_success"]Lihat demo langsung di [AMP By Example](https://ampbyexample.com/components/amp-sidebar/).
[/tip]

## Sidebar untuk Artikel <a name="sidebar-for-stories"></a>

Penggunaan `amp-sidebar` didukung dalam [komponen](../../../about/stories.html) `amp-story`.

### Perilaku <a name="behavior-2"></a>

* `<amp-sidebar>` harus merupakan turunan langsung dari `<amp-story>`.
* Sidebar didefaultkan ke sisi "mulai" untuk dokumen AMP reguler, artinya sebelah kanan untuk bahasa kiri-kanan dan sebelah kiri untuk bahasa kanan-kiri.
* `<amp-sidebar>` memiliki warna latar belakang default putih dan dapat diganti di CSS.
* Lebar maksimum `<amp-sidebar>` diterapkan pada `280 piksel` dan `320 piksel` untuk perangkat desktop.
* Tombol gaya 'hamburger' yang membuka/menutup sidebar akan muncul di UI artikel.

Ada batasan tertentu terkait atribut dan fitur apa saja yang diizinkan untuk memberikan pengalaman UI yang konsisten di seluruh platform artikel. Berikut adalah atribut dan fitur `amp-sidebar` yang diizinkan dalam `amp-story`.

### Atribut yang Diizinkan <a name="allowed-attributes"></a>

* [layout](#layout)
* [data-close-button-aria-label](#data)
* [atribut umum](#common)

*Contoh: Sidebar Dasar dalam Artikel*

Contoh berikut menampilkan `amp-sidebar` sederhana dalam `amp-story`.

```html
...
<body>
  <amp-story standalone>
  <amp-sidebar id="sidebar1" layout="nodisplay">
    <ul>
      <li><a href="https://amp.dev"> External Link </a></li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
    </ul>
  </amp-sidebar>
  <amp-story-page id="cover">
    <amp-story-grid-layer template="fill">
      <h1>Hello World</h1>
      <p>This is the cover page of this story.</p>
    </amp-story-grid-layer>
  </amp-story-page>
  ...
</body>
```

## Atribut <a name="attributes"></a>

##### side <a name="side"></a>

Menunjukkan dari sisi halaman mana sidebar akan dibuka, `left` atau `right`.  Jika `side` tidak ditentukan, nilai `side` akan diturunkan dari atribut `dir` tag `body` (`ltr` => `left` , `rtl` => `right`); jika tidak ada `dir`, `side` didefaultkan ke `left`.

##### layout <a name="layout"></a>

Menentukan tata letak tampilan sidebar, yang harus berupa `nodisplay`.

##### open <a name="open"></a>

Atribut ini ada saat sidebar terbuka.

##### data-close-button-aria-label <a name="data"></a>

Atribut opsional yang digunakan untuk menetapkan label ARIA untuk tombol tutup yang ditambahkan untuk aksesibilitas.

##### toolbar <a name="toolbar-1"></a>

Atribut ini ada di elemen `<nav toolbar="(media-query)" toolbar-target="elementID">` turunan, dan menerima kueri media tentang kapan toolbar ditampilkan. Lihat bagian [Toolbar](#toolbar) untuk informasi selengkapnya tentang cara menggunakan toolbar.

##### toolbar-target <a name="toolbar-target"></a>

Atribut ini ada di elemen `<nav toolbar="(media-query)" toolbar-target="elementID">` turunan, dan menerima ID dari elemen yang ada di halaman itu.  Atribut `toolbar-target` akan menempatkan toolbar dalam ID yang ditentukan untuk elemen di halaman tersebut, tanpa penataan gaya toolbar default. Lihat bagian [Toolbar](#toolbar) untuk informasi selengkapnya tentang cara menggunakan toolbar.

##### atribut umum <a name="common"></a>

Elemen ini mencakup [atribut umum](../../../documentation/guides-and-tutorials/learn/common_attributes.md) yang diperluas ke komponen AMP.

## Penataan gaya <a name="styling"></a>

Komponen `amp-sidebar` dapat ditata gayanya menggunakan CSS standar.

* `width` dari `amp-sidebar` dapat disetel untuk menyesuaikan lebar antara nilai min (45 piksel) dan maks (80 vw) pra-setel.
* Tinggi `amp-sidebar` dapat disetel untuk menyesuaikan tinggi sidebar, jika perlu. Jika tingginya melebihi 100 vw, sidebar akan memiliki scrollbar vertikal. Tinggi preset sidebar adalah 100 vw dan dapat diganti di CSS untuk membuatnya lebih pendek.
* Status sidebar saat ini ditunjukkan melalui atribut `open` yang ditetapkan pada tag `amp-sidebar` saat sidebar terbuka di halaman.

[tip type="success"]
Kunjungi [Memulai AMP](https://ampstart.com/components#navigation) untuk menu navigasi responsif dengan gaya bawaan yang dapat digunakan di halaman AMP.
[/tip]

## Scroll otomatis dalam area tambahan <a name="auto-scrolling-within-overflowing-areas"></a>

`amp-sidebar` dapat otomatis men-scroll container tambahan ke elemen pertama yang dilengkapi atribut `autoscroll` baik pada kasus sidebar maupun toolbar.

Fitur ini berguna saat menangani daftar navigasi yang panjang dan menginginkan sidebar men-scroll ke item navigasi terbaru saat halaman dimuat.

Saat menggunakan fitur `toolbar`, `autoscroll` hanya berfungsi jika elemen `<nav toolbar>` ditetapkan ke `overflow: auto` atau `overflow: scroll`.

```html
<style amp-custom="">

  nav [toolbar] {
    overflow: auto;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>Nav item 1</li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
      <li autoscroll class="currentPage">Nav item 4</li>
      <li>Nav item 5</li>
      <li>Nav item 6</li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

Lihat [file contoh ini](https://github.com/ampproject/amphtml/blob/master/examples/amp-sidebar-autoscroll.amp.html) untuk kode contoh yang berfungsi.

## Pertimbangan UX <a name="ux-considerations"></a>

Saat menggunakan `<amp-sidebar>`, perlu diingat bahwa pengguna akan sering menampilkan halaman Anda di perangkat seluler pada AMP viewer, yang mungkin menampilkan header posisi tetap. Selain itu, browser sering kali menampilkan header tetapnya sendiri di bagian atas halaman. Menambahkan elemen posisi tetap lainnya di bagian atas layar akan memerlukan banyak ruang layar seluler dengan konten yang tidak memberikan informasi baru kepada pengguna.

Karena alasan ini, sebaiknya kemampuan untuk membuka sidebar tidak ditempatkan dalam header lebar-penuh yang tetap.

## Validasi <a name="validation"></a>

Lihat [aturan amp-sidebar](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/validator-amp-sidebar.protoascii) dalam spesifikasi validator AMP.
