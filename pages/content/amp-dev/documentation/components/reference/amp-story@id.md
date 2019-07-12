---
$category@: presentation
formats:
- websites
teaser:
  text: A rich, visual storytelling format.
---



<!---
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

# amp-story

<table>
  <tr>
    <td width="40%"><strong>Deskripsi</strong></td>
    <td>Format bercerita visual yang kaya.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Ketersediaan</strong></td>
    <td><div><a href="https://www.ampproject.org/docs/reference/experimental.html">Eksperimental</a></div></td>
  </tr>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Tata Letak yang Didukung</a></strong></td>
    <td>tidak ada</td>
  </tr>
  <tr>
    <td width="40%"><strong>Contoh</strong></td>
    <td><ul>
      <li>Lihat sampel <a href="https://ampbyexample.com/stories/introduction/amp_story_hello_world/">Hello World</a> di AMP By Example.</li>
      <li>Belajar dari tutorial <a href="https://www.ampproject.org/docs/tutorials/visual_story">Membuat artikel AMP visual</a>.</li>
    </ul></td>
  </tr>
</table>

[tip type="caution"]
Komponen ini bersifat eksperimental dan masih terus dikembangkan. Jika ada masalah apa pun, harap [ajukan masalah di GitHub](https://github.com/ampproject/amphtml/issues/new).
[/tip]


## Catatan versi

| Versi | Deskripsi                                                            |
|-------|----------------------------------------------------------------------|
| 1.0     | Versi saat ini, sejak 16-07-2018.                                     |
| 0.1     | Implementasi awal.  Tidak digunakan lagi, dan akan dihapus pada 19-03-2019 |

## Bermigrasi dari 0.1 ke 1.0

Mulai 16-07-2018, versi 0.1 dianggap tidak digunakan lagi dan akan dihapus pada 19-03-2019.  Ada potensi terjadinya perubahan yang dapat menyebabkan gangguan minor, karena artikel Anda akan otomatis diupgrade untuk menggunakan versi 1.0.  Sebaiknya migrasikan halaman Anda ke versi 1.0 secara manual sebelum tanggal ini untuk memastikan fungsionalitas dan desain yang sesuai.

### Kapabilitas bookend baru

Kami telah menambahkan kapabilitas baru ke bookend amp-stories, yang memungkinkan dukungan komponen dan tata letak visual yang lebih beragam. Sebagian dari perubahan ini meliputi:

* Penyedia berbagi diurutkan sesuai dengan konfigurasi JSON.
* Komponen bookend baru:
    * Link pesan ajakan
    * Kotak teks
    * Kartu potret dan lanskap</li>

Untuk menggunakan kapabilitas baru ini, tambahkan tag `<amp-story-bookend>` sebagai turunan terakhir dari `<amp-story>` dengan atribut yang diperlukan seperti:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `src` and `layout=nodisplay` are required. -->
  <amp-story-bookend src="bookendv1.json" layout="nodisplay">
  </amp-story-bookend>
<amp-story>
```

Pelajari lebih lanjut komponen baru ini dan cara menetapkannya dalam konfigurasi JSON di bagian [amp-story-bookend](#bookend-amp-story-bookend).

### Persyaratan metadata baru

Kami telah menambahkan atribut metadata baru ke elemen `<amp-story>`. Atribut metadata ini akan digunakan untuk menampilkan pratinjau artikel di seluruh ekosistem artikel AMP. Misalnya, atribut ini dapat digunakan untuk merender link pratinjau yang menarik di bookend artikel terkait. Dengan menyediakan atribut ini, Anda dapat memastikan bahwa artikel akan tetap berlaku untuk pengalaman yang kaya dan tersemat di menu artikel AMP yang akan datang.

```html
<!--<code></code>title<code>,</code>publisher<code>,</code>publisher-logo-src and poster-portrait-src` will soon be required.</code> -->
<amp-story title="Artikel Saya" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"></amp-story></p>

<!-- <code>poster-square-src</code> and <code>poster-landscape-src</code> are optional, but strongly recommended. -->
<amp-story title="Artikel Saya" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg" poster-square-src="https://example.com/my-story/poster/1x1.jpg" poster-landscape-src="https://example.com/my-story/poster/4x3.jpg">
```

Perlu diperhatikan bahwa atribut metadata ini bersifat melengkapi dan tidak menggantikan Data Terstruktur apa pun (misalnya JSON-LD) di halaman ini. Kami tetap merekomendasikan penambahan [Data Terstruktur](https://developers.google.com/search/docs/data-types/article#amp-sd) ke semua halaman AMP Anda, termasuk artikel AMP.

Atribut baru:

| ATRIBUT | DESKRIPSI |
|--|--|
| `title` [wajib] | Judul artikel. |
| `publisher` [wajib] | Nama penayang artikel. |
| `publisher-logo-src` [wajib] | Logo penayang dalam format persegi (rasio tinggi lebar 1x1). |
| `poster-portrait-src` [wajib] | Poster artikel dalam format potret (rasio tinggi lebar 3x4). |
| `poster-square-src` | Poster artikel dalam format persegi (rasio tinggi lebar 1x1). |
| `poster-landscape-src` | Poster artikel dalam format lanskap (rasio tinggi lebar 4x3). |

#### Panduan `publisher-logo-src`

Panduan berikut berlaku untuk gambar yang digunakan di logo penayang:

* File harus berupa file raster, seperti `.jpg`, `.png`, atau `.gif`.  Hindari file vektor, seperti `.svg` atau `.eps`.
* Hindari gambar animasi, seperti gif animasi.
* Bagian grafis logo harus terbaca pada warna latar belakang.

<table>
  <tr>
    <td>
      <amp-img alt="Logo dengan teks biru pada latar belakang putih" width="107" height="112" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-1.png" layout="fixed">
        <noscript>
          <img alt="Logo dengan teks biru pada latar belakang putih" src="img/publisher-logo-1.png">
        </noscript>
      </amp-img>
      Lebih disukai
    </td>
    <td>
      <amp-img alt="Logo dengan teks putih pada latar belakang biru" width="107" height="101" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-2.png" layout="fixed">
        <noscript>
          <img alt="Logo dengan teks putih pada latar belakang biru" src="img/publisher-logo-2.png">
        </noscript>
      </amp-img>
      Lebih disukai
    </td>
    <td>
      <amp-img alt="Logo dengan teks biru pada latar belakang biru" width="103" height="102" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-3.png" layout="fixed">
        <noscript>
          <img alt="Logo dengan teks biru pada latar belakang biru" src="img/publisher-logo-3.png">
        </noscript>
      </amp-img>
      Hindari
    </td>
  </tr>
</table>

* Bentuk logo sebaiknya persegi, bukan segi panjang.
* Warna latar belakang sebaiknya tidak transparan.
* Gunakan satu logo per brand yang konsisten di seluruh artikel AMP.
* Logo berukuran setidaknya 96x96 piksel.

#### Panduan poster (untuk `poster-portrait-src`, `poster-landscape-src`, dan `poster-square-src`)

Panduan berikut berlaku untuk gambar yang digunakan di poster artikel:

* Gambar poster sebaiknya mencerminkan seluruh artikel AMP.
* Gambar poster sebaiknya terlihat oleh pengguna saat memulai artikel AMP.  Namun, URL file gambar yang digunakan dalam metadata tidak harus sama persis dengan URL yang digunakan di halaman pertama artikel.  URL yang digunakan dalam metadata dapat menyertakan pengaturan ukuran, cropping, atau perubahan gaya minor untuk keperluan pratinjau.
* Gambar poster sebaiknya berupa file raster, seperti `.jpg`, `.png`, atau `.gif`.  Hindari file vektor, seperti `.svg` atau `.eps`.
* Gambar poster sebaiknya memiliki rasio tinggi lebar 3x4 untuk potret, 4x3 untuk lanskap, dan 1x1 untuk persegi.
* Jika gambar poster diambil dari sebuah bingkai dalam video, thumbnail sebaiknya mencerminkan video. Misalnya, bingkai pertama dalam video sering kali tidak representatif.
* Setiap gambar poster sebaiknya memenuhi rekomendasi ukuran minimum:
    * Potret: 696x928 piksel
    * Lanskap: 928x696 piksel
    * Persegi: 928x928 piksel</li>

## Ringkasan

Ekstensi `amp-story` menyediakan format baru untuk menampilkan konten visual yang dapat disusun menjadi pengalaman bercerita. Dengan artikel AMP, Anda dapat menyajikan informasi dan konten yang berukuran kecil tetapi kaya secara visual kepada pengguna.

<figure class="centered-fig">
  <amp-anim width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="Contoh Artikel AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
</figure>

## Format artikel AMP

[Artikel AMP](#story%3a-amp-story) adalah dokumen HTML AMP lengkap yang terdiri dari [sejumlah halaman](#pages%3a-amp-story-page), yang di dalam halaman tersebut terdapat [lapisan-lapisan](#layers%3a-amp-story-grid-layer), dan di dalam lapisan terdapat elemen AMP &amp; HTML, seperti media, analisis, teks, dan sebagainya.

<amp-img alt="Hierarki tag artikel AMP" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="Hierarki tag artikel AMP" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png">
  </noscript>
</amp-img>

### Boilerplate

Markup berikut merupakan titik awal atau boilerplate yang baik. Salin dan simpan markup ini ke dalam file berekstensi `.html`.

```html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <title>Hello, amp-story</title>
    <link rel="canonical" href="http://example.ampproject.org/my-story.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal
    both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript>
      <style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none
        }
      </style>
    </noscript>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="my-first-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>Hello, amp-story!</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="my-second-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg2.gif" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>The End</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-bookend src="bookendv1.json" layout="nodisplay">
      </amp-story-bookend>
    </amp-story>
  </body>
</html>
```

Isi kode di atas menghasilkan artikel dengan dua halaman.  Setiap halaman memiliki gambar latar belakang dengan tampilan penuh, dengan string teks sederhana di bagian atasnya.

### Markup yang diperlukan untuk amp-story

Format HTML artikel AMP mematuhi [persyaratan markup yang sama dengan dokumen HTML AMP yang valid](https://www.ampproject.org/docs/reference/spec#required-markup), beserta persyaratan tambahan berikut:

| ATURAN | DESKRIPSI |
|----|---|
| Elemen `<amp-story standalone>` adalah satu-satunya elemen turunan dari `<body>`. | Mengidentifikasi bahwa dokumen merupakan artikel AMP. |
| Berisi tag `<script async src="https://cdn.ampproject.org/v0/amp-story-1.0.js" custom-element="amp-story"></script>` sebagai turunan ketiga tag `<head>`. | Menyertakan dan memuat library JS amp-story. |
| Berisi tag `<link rel="canonical" href="$STORY_URL">` di dalam `<head>`. | Link mengarah ke artikel itu sendiri, mengidentifikasi artikel sebagai dokumen kanonis. |

## Artikel: `amp-story`

Komponen `amp-story` merepresentasikan seluruh artikel.  Komponen itu sendiri mengimplementasikan shell UI, termasuk menangani gestur dan navigasi, serta menyisipkan UI application shell (kontrol, status progres, dll.).

<figure class="centered-fig">
  <amp-anim alt="contoh amp-story" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="contoh amp-story" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

### Contoh

```html
<amp-story
    standalone
    title="My Story"
    publisher="The AMP Team"
    publisher-logo-src="https://example.com/logo/1x1.png"
    poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"
    poster-square-src="https://example.com/my-story/poster/1x1.jpg"
    poster-landscape-src="https://example.com/my-story/poster/4x3.jpg"
    background-audio="my.mp3">
    <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-bookend src="./related.json"></amp-story-bookend>
</amp-story>
```

### Atribut

##### standalone [wajib]

Mengidentifikasi bahwa dokumen AMP merupakan artikel.

##### title [wajib]

Judul artikel.

##### publisher [wajib]

Nama penayang artikel.

##### publisher-logo-src [wajib]

URL ke logo penayang artikel dalam format persegi (rasio tinggi lebar 1x1). Misalnya `publisher-logo-src="https://example.com/logo/1x1.png"`, di mana 1x1.png merupakan logo berukuran 36x36 piksel.

##### poster-portrait-src [wajib]

URL ke [poster artikel](#posters) dalam format potret (rasio tinggi lebar 3x4).

##### supports-landscape [opsional]

Mengaktifkan dukungan orientasi lanskap di perangkat seluler dan pengalaman lanskap tampilan penuh di perangkat desktop.

##### background-audio [opsional]

URL ke file audio yang diputar sepanjang artikel.

##### poster-square-src [opsional]

URL ke [poster artikel](#posters) dalam format persegi (rasio tinggi lebar 1x1).

##### poster-landscape-src [opsional]

URL ke [poster artikel](#posters) dalam format lanskap (rasio tinggi lebar 4x3).

### Poster

"Poster" adalah gambar yang ditampilkan di UI sampai artikel dimuat. Umumnya, poster merupakan layar pertama artikel, meskipun Anda dapat menggunakan gambar apa saja yang merepresentasikan artikel.

### Turunan (dari amp-story)

Komponen `<amp-story>` berisi satu atau beberapa komponen [`<amp-story-page>`](#pages%3a-amp-story-page), yang masing-masing berisi layar individual dari artikel.  Halaman pertama yang ditetapkan dalam urutan dokumen akan menjadi halaman pertama yang ditampilkan dalam artikel tersebut.

### Penyertaan orientasi lanskap dan pengalaman desktop tampilan penuh

Jika atribut `supports-landscape` ditetapkan pada elemen `<amp-story>`, atribut tersebut akan:

* Memungkinkan artikel dilihat saat perangkat seluler dipegang dalam orientasi lanskap.
* Mengubah pengalaman desktop ke mode tampilan penuh yang imersif, menggantikan pengalaman tiga panel potret default.

Penggunaan: `<amp-story ... supports-landscape>...</amp-story>`

<figure class="centered-fig">
  <span class="special-char">Sebelum:</span>
  <amp-anim alt="Pengalaman tiga panel desktop" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif"></noscript>
  </amp-anim>
  <span class="special-char">Sesudah:</span>
  <amp-anim alt="Pengalaman tampilan penuh desktop" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif"></noscript>
  </amp-anim>
</figure>

## Halaman: `amp-story-page`

Komponen `<amp-story-page>` merepresentasikan konten untuk ditampilkan di satu halaman artikel.

<figure class="centered-fig">
  <amp-anim alt="Contoh halaman 1" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif" layout="fixed">
    <noscript>
      <img alt="Contoh halaman 1" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif">
      </noscript>
    </amp-anim>
  </figure>
  <figure class="centered-fig">
    <amp-anim alt="Contoh halaman 2" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif" layout="fixed">
      <noscript>
        <img alt="Contoh halaman 2" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif">
        </noscript>
      </amp-anim>
    </figure>

### Contoh

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-video layout="fill" src="background.mp4" poster="background.png" muted autoplay></amp-video>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical">
    <h1>These are the Top 5 World's Most...</h1>
    <p>Jon Bersch</p>
    <p>May 18</p>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="thirds">
    <amp-img grid-area="bottom-third" src="a-logo.svg" width="64" height="64"></amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

### Atribut

##### id [wajib]

ID unik untuk halaman. Dapat digunakan untuk menata gaya halaman dan turunannya di CSS, dan juga digunakan untuk mengidentifikasi halaman secara unik di fragmen URL.

##### auto-advance-after [opsional]

Menentukan waktu untuk maju otomatis ke halaman berikutnya.  Jika dihilangkan, halaman tidak akan maju secara otomatis. Nilai untuk `auto-advance-after` harus salah satu dari:

* Bilangan positif [waktu](https://developer.mozilla.org/en-US/docs/Web/CSS/time) tunggu sebelum otomatis maju ke halaman berikutnya
* ID untuk video [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) atau video-interface yang penyelesaiannya akan memicu maju otomatis

Contoh:

```html
<amp-story-page id="tokyo" auto-advance-after="1s">
```

##### background-audio [opsional]

URI ke file audio yang diputar selama halaman ini ditampilkan.

Contoh:

```html
<amp-story-page id="zurich" background-audio="./media/switzerland.mp3">
```

### Turunan (dari amp-story-page)

Komponen `<amp-story-page>` berisi satu atau beberapa [lapisan](#layers).  Lapisan ditumpuk dari bawah ke atas (lapisan pertama yang ditetapkan di DOM berada di bagian paling bawah; lapisan terakhir yang ditetapkan di DOM berada di bagian paling atas).

## Lapisan

Lapisan ditumpuk satu di atas yang lain untuk membuat efek visual yang diinginkan.


### `amp-story-grid-layer`

Komponen `<amp-story-grid-layer>` menata turunannya ke dalam sebuah petak.  Implementasinya didasarkan pada [Spesifikasi Petak CSS](https://www.w3.org/TR/css-grid-1/).

<div class="flex-images">
  <amp-img alt="Lapisan 1" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif" width="200" height="355" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif"></noscript>
  </amp-img>
  <span class="special-char">+</span>
  <amp-img alt="Lapisan 2" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg"></noscript></amp-img>
  <span class="special-char">+</span>
  <amp-img alt="Lapisan 3" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg"></noscript></amp-img>
  <span class="special-char">=</span>
  <amp-img alt="Semua lapisan" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif"></noscript></amp-img>
</div>

#### Atribut

##### template [wajib]

Atribut `template` menentukan tata letak lapisan petak. Template yang tersedia dijelaskan di bagian [Template](#templates) di bawah.

##### grid-area [opsional]

Atribut ini ditetapkan pada turunan `<amp-story-grid-layer>`. Atribut `grid-area` menetapkan area bernama (dari penggunaan `template` yang menentukannya) di mana elemen yang berisi atribut ini seharusnya muncul.

Contoh:

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Template

Berikut adalah template yang tersedia untuk menentukan tata letak lapisan petak.

[tip type="success"]
Untuk mengetahui template tata letak yang digunakan, lihat [demo tata letak di AMP By Example](https://ampbyexample.com/stories/features/layouts/).
[/tip]

##### fill

Template `fill` menampilkan turunan pertamanya dalam tampilan penuh. Semua turunan lainnya tidak ditampilkan.

Area Bernama: (tidak ada)

Contoh:

<amp-img alt="Contoh template fill" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Contoh template horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="fill">
  <amp-img src="cat.jpg"></amp-img>
</amp-story-grid-layer>
```

##### vertical

Template `vertical` menata elemennya di sepanjang sumbu Y.  Secara default, elemennya disejajarkan dengan bagian atas, dan dapat memenuhi seluruh layar di sepanjang sumbu X.

Area Bernama: (tidak ada)

<amp-img alt="Contoh template vertical" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Contoh template horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png">
  </noscript>
</amp-img>

```html
<amp-story-grid-layer template="vertical">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### horizontal

Template `horizontal` menata elemennya di sepanjang sumbu X.  Secara default, elemennya disejajarkan dengan bagian awal baris dan dapat memenuhi seluruh layar di sepanjang sumbu Y.

Area Bernama: (tidak ada)

<amp-img alt="Contoh template horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Contoh template horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="horizontal">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### thirds

Template `thirds` membagi layar menjadi tiga area berjarak sama, yang masing-masing dapat diisi dengan konten.

Area Bernama:

* `upper-third`
* `middle-third`
* `lower-third`

<amp-img alt="Contoh template horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Contoh template thirds" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Turunan

Komponen `amp-story-grid-layer` dapat berisi salah satu dari elemen berikut:

**Catatan**: Daftar ini akan terus dilengkapi seiring waktu.

<table>
  <tr>
    <th width="40%">Area
    </th><th>Tag yang dapat diizinkan </th>
  </tr>
  <tr>
    <td>Media</td>
    <td>
      <ul>
        <li><code>&lt;amp-audio></code></li>
        <li><code>&lt;amp-gfycat></code></li>
        <li><code>&lt;amp-google-vrview-image></code></li>
        <li><code>&lt;amp-img></code></li>
        <li><code>&lt;amp-video></code></li>
        <li><code>&lt;source></code></li>
        <li><code>&lt;track></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Analisis &amp; Pengukuran</td>
    <td>
      <ul>
        <li><code>&lt;amp-analytics></code></li>
        <li><code>&lt;amp-experiment></code></li>
        <li><code>&lt;amp-pixel></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Pembagian</td>
    <td>
      <ul>
        <li><code>&lt;address></code></li>
        <li><code>&lt;article></code></li>
        <li><code>&lt;aside></code></li>
        <li><code>&lt;footer></code></li>
        <li><code>&lt;h1>-<h6></code></li>
        <li><code>&lt;header></code></li>
        <li><code>&lt;hgroup></code></li>
        <li><code>&lt;nav></code></li>
        <li><code>&lt;section></code></li>
        <li><code>&lt;amp-story-cta-layer></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Teks</td>
    <td>
      <ul>
        <li><code>&lt;abbr></code></li>
        <li><code>&lt;amp-fit-text></code></li>
        <li><code>&lt;amp-font></code></li>
        <li><code>&lt;amp-gist></code></li>
        <li><code>&lt;b></code></li>
        <li><code>&lt;bdi></code></li>
        <li><code>&lt;bdo></code></li>
        <li><code>&lt;blockquote></code></li>
        <li><code>&lt;br></code></li>
        <li><code>&lt;cite></code></li>
        <li><code>&lt;code></code></li>
        <li><code>&lt;data></code></li>
        <li><code>&lt;del></code></li>
        <li><code>&lt;dfn></code></li>
        <li><code>&lt;div></code></li>
        <li><code>&lt;em></code></li>
        <li><code>&lt;figcaption></code></li>
        <li><code>&lt;figure></code></li>
        <li><code>&lt;hr></code></li>
        <li><code>&lt;i></code></li>
        <li><code>&lt;ins></code></li>
        <li><code>&lt;kbd></code></li>
        <li><code>&lt;main></code></li>
        <li><code>&lt;mark></code></li>
        <li><code>&lt;p></code></li>
        <li><code>&lt;pre></code></li>
        <li><code>&lt;q></code></li>
        <li><code>&lt;rp></code></li>
        <li><code>&lt;rt></code></li>
        <li><code>&lt;rtc></code></li>
        <li><code>&lt;ruby></code></li>
        <li><code>&lt;s></code></li>
        <li><code>&lt;samp></code></li>
        <li><code>&lt;small></code></li>
        <li><code>&lt;span></code></li>
        <li><code>&lt;strong></code></li>
        <li><code>&lt;sub></code></li>
        <li><code>&lt;sup></code></li>
        <li><code>&lt;time></code></li>
        <li><code>&lt;u></code></li>
        <li><code>&lt;var></code></li>
        <li><code>&lt;wbr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Daftar</td>
    <td>
      <ul>
        <li><code>&lt;amp-list></code></li>
        <li><code>&lt;amp-live-list></code></li>
        <li><code>&lt;dd></code></li>
        <li><code>&lt;dl></code></li>
        <li><code>&lt;dt></code></li>
        <li><code>&lt;li></code></li>
        <li><code>&lt;ol></code></li>
        <li><code>&lt;ul></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tabel</td>
    <td>
      <ul>
        <li><code>&lt;caption></code></li>
        <li><code>&lt;col></code></li>
        <li><code>&lt;colgroup></code></li>
        <li><code>&lt;table></code></li>
        <li><code>&lt;tbody></code></li>
        <li><code>&lt;td></code></li>
        <li><code>&lt;tfoot></code></li>
        <li><code>&lt;th></code></li>
        <li><code>&lt;thead></code></li>
        <li><code>&lt;tr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Lainnya</td>
    <td>
      <ul>
        <li><code>&lt;amp-install-serviceworker></code></li>
        <li><code>&lt;noscript></code></li>
      </ul>
    </td>
  </tr>
</table>

### `amp-story-cta-layer`

Komponen `<amp-story-cta-layer>` memungkinkan penggunaan elemen `<a>` dan `<button>` di dalam `<amp-story-page>`.

#### Batasan

* Jika ditentukan, elemen `<amp-story-cta-layer>` harus menjadi lapisan terakhir dalam `<amp-story-page>`. Akibatnya, setiap `<amp-story-page>` hanya dapat memiliki satu atau nol elemen `<amp-story-cta-layer>`.
* Pengaturan posisi dan ukuran lapisan ini tidak dapat dikontrol. Ukurannya akan selalu 100% lebar halaman, 20% tinggi halaman, dengan posisi yang sejajar dengan bagian bawah halaman.

#### Contoh

```html
<amp-story-page id="vertical-template-thirds">
  <amp-story-grid-layer template="thirds">
    <div class="content" grid-area="upper-third">Paragraph 1</div>
    <div class="content" grid-area="middle-third">Paragraph 2</div>
    <div class="content" grid-area="lower-third">Paragraph 3</div>
  </amp-story-grid-layer>
  <amp-story-cta-layer>
    <a href="https://www.ampproject.org" class="button">Outlink here!</a>
  </amp-story-cta-layer>
</amp-story-page>
```

<amp-img alt="Lapisan CTA" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png" width="404" height="678" layout="fixed">
  <noscript>
    <img width="404" height="678" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png">
    </noscript>
  </amp-img>

  [Contoh lengkap dapat dilihat di direktori contoh](https://github.com/ampproject/amphtml/blob/master/examples/amp-story/cta-layer-outlink.html)

#### Turunan

Komponen `amp-story-cta-layer` mendukung sebagian besar turunan yang sama dengan `amp-story-grid-layer`, dan juga mendukung tag `<a>` dan `<button>`.

Untuk mengetahui daftar terbaru turunan yang didukung, pastikan untuk melihat kolom [amp-story-cta-layer-allowed-desendedants](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) di aturan validasi.

## Lampiran halaman

### `amp-story-page-attachment`

<amp-img alt="Lampiran halaman Artikel AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif" width="240" height="480" layout="fixed">
  <noscript>
    <img alt="Lampiran halaman Artikel AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif">
    </noscript>
  </amp-img>

  Lampirkan konten tambahan ke halaman artikel!

  Lampiran halaman artikel memungkinkan Anda menambahkan konten AMPHTML ke halaman tertentu. Konten ini dapat ditampilkan oleh pengguna melalui gestur "geser ke atas", atau tap pada elemen pesan ajakan.
  Prompt UI untuk membuka lampiran akan otomatis ditambahkan di bagian bawah setiap halaman yang mengonfigurasikan lampiran.

  Elemen `<amp-story-page-attachment>` harus menjadi turunan terakhir dari `<amp-story-page>`, dan harus memiliki atribut `layout="nodisplay"`. Konten AMPHTML lampiran diharapkan untuk disediakan secara inline dalam Artikel AMP Anda, dalam tag `<amp-story-page-attachment>`.

### Konten dan komponen yang diizinkan

Lampiran halaman artikel mendukung elemen HTML yang sama dengan Artikel AMP beserta komponen tambahan yang tercantum di bawah, seperti pemutar video pihak ketiga atau sematan media sosial. Ini berarti Anda dapat menambahkan konten lain yang terlalu verbose atau yang tidak diizinkan di halaman Artikel AMP.

<details>
  <summary>Daftar komponen AMP yang diizinkan di lampiran halaman</summary>

  * `<amp-3d-gltf>`
  * `<amp-3q-player>`
  * `<amp-accordion>`
  * `<amp-audio>`
  * `<amp-beopinion>`
  * `<amp-bodymovin-animation>`
  * `<amp-brid-player>`
  * `<amp-brightcove>`
  * `<amp-byside-content>`
  * `<amp-call-tracking>`
  * `<amp-carousel>`
  * `<amp-dailymotion>`
  * `<amp-date-countdown>`
  * `<amp-embedly-card>`
  * `<amp-facebook>`
  * `<amp-facebook-comments>`
  * `<amp-facebook-like>`
  * `<amp-facebook-page>`
  * `<amp-fit-text>`
  * `<amp-fx-collection>`
  * `<amp-fx-flying-carpet>`
  * `<amp-gfycat>`
  * `<amp-gfycat>`
  * `<amp-gist>`
  * `<amp-gist>`
  * `<amp-google-document-embed>`
  * `<amp-google-vrview-image>`
  * `<amp-google-vrview-image>`
  * `<amp-hulu>`
  * `<amp-ima-video>`
  * `<amp-image-slider>`
  * `<amp-img>`
  * `<amp-imgur>`
  * `<amp-instagram>`
  * `<amp-izlesene>`
  * `<amp-jwplayer>`
  * `<amp-kaltura-player>`
  * `<amp-list>`
  * `<amp-list>`
  * `<amp-live-list>`
  * `<amp-live-list>`
  * `<amp-mathml>`
  * `<amp-mowplayer>`
  * `<amp-nexxtv-player>`
  * `<amp-o2-player>`
  * `<amp-ooyala-player>`
  * `<amp-pan-zoom>`
  * `<amp-pinterest>`
  * `<amp-playbuzz>`
  * `<amp-powr-player>`
  * `<amp-reach-player>`
  * `<amp-reddit>`
  * `<amp-riddle-quiz>`
  * `<amp-soundcloud>`
  * `<amp-springboard-player>`
  * `<amp-timeago>`
  * `<amp-twitter>`
  * `<amp-video>`
  * `<amp-video-iframe>`
  * `<amp-vimeo>`
  * `<amp-vine>`
  * `<amp-viqeo-player>`
  * `<amp-vk>`
  * `<amp-wistia-player>`
  * `<amp-yotpo>`
  * `<amp-youtube>`

</details>

### Contoh

```html
<amp-story-page id="foo">
  <amp-story-grid-layer template="fill">
    <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600">
  </amp-story-grid-layer>
  <amp-story-page-attachment layout="nodisplay">
    <h1>My title</h1>
    <p>Lots of interesting text with <a href="https://example.ampproject.org">links</a>!</p>
    <p>More text and a YouTube video!</p>
    <amp-youtube
        data-videoid="b4Vhdr8jtx0"
        layout="responsive"
        width="480" height="270">
    </amp-youtube>
    <p>And a tweet!</p>
    <amp-twitter
        data-tweetid="885634330868850689"
        layout="responsive"
        width="480" height="270">
    </amp-twitter>
  </amp-story-page-attachment>
</amp-story-page>
```

## Animasi

Setiap elemen di dalam `<amp-story-page>` dapat memiliki animasi masuk.

Anda dapat mengonfigurasi animasi dengan menentukan kumpulan [atribut animasi](#animation-attributes) pada elemen; tidak perlu ekstensi atau konfigurasi AMP tambahan.

### Efek animasi

Efek animasi berikut tersedia sebagai preset untuk artikel AMP:

| Nama preset       | Durasi default (milidetik) | Penundaan default (milidetik) |
|-----------------|---------------------| ------------------ |
| `drop`            | 1600                  | 0 |
| `fade-in`         | 500                   | 0 |
| `fly-in-bottom`   | 500                   | 0 |
| `fly-in-left`     | 500                   | 0 |
| `fly-in-right`    | 500                   | 0 |
| `fly-in-top`      | 500                   | 0 |
| `pulse`           | 500                   | 0 |
| `rotate-in-left`  | 700                   | 0 |
| `rotate-in-right` | 700                   | 0 |
| `twirl-in`        | 1000                  | 0 |
| `whoosh-in-left`  | 500                   | 0 |
| `whoosh-in-right` | 500                   | 0 |
| `pan-left`        | 1000                  | 0 |
| `pan-right`       | 1000                  | 0 |
| `pan-down`        | 1000                  | 0 |
| `pan-up`          | 1000                  | 0 |
| `zoom-in`         | 1000                  | 0 |
| `zoom-out`        | 1000                  | 0 |

[tip type="success"]
Lihat [demo langsung semua animasi artikel AMP](https://ampbyexample.com/stories/features/animations/) di AMP By Example.
[/tip]

### Atribut animasi

##### animate-in [wajib]

Gunakan atribut ini untuk menentukan nama [preset animasi](#animation-effects) masuk.

*Contoh*: Judul melayang masuk dari sebelah kiri halaman.

```html
<h2 animate-in="fly-in-left">
  Fly from left!
</h2>
```

##### animate-in-duration [opsional]

Gunakan atribut ini untuk menentukan durasi animasi masuk, dalam hitungan detik atau milidetik (misalnya 0,2 detik atau 200 milidetik). Durasi default bergantung pada preset animasi yang ditentukan.

*Contoh*: Judul melayang masuk dari sebelah kiri halaman dan animasi selesai dalam setengah detik.

```html
<h2 animate-in="fly-in-left" animate-in-duration="0.5s">
  Fly from left!
</h2>
```

##### animate-in-delay [opsional]

Gunakan atribut ini untuk menentukan penundaan sebelum memulai animasi. Nilai ini harus lebih besar atau sama dengan 0, dalam hitungan detik atau milidetik (misalnya 0,2 detik atau 200 milidetik). Penundaan default bergantung pada preset animasi yang ditentukan.

*Contoh*: Setelah 0,4 detik, judul melayang masuk dari sebelah kiri halaman dan menyelesaikan animasi masuknya dalam 0,5 detik.

```html
<h2 animate-in="fly-in-left" animate-in-duration="0.5s" animate-in-delay="0.4s">
  Fly from left!
</h2>
```

[tip type="note"]
Penundaan animasi tidak dijamin selalu tepat. Penundaan tambahan dapat disebabkan oleh pemuatan ekstensi `amp-animation` di latar belakang saat elemen animasi pertama selesai dipindai. Kontrak atribut ditetapkan sebagai *tunda animasi ini selama setidaknya N milidetik*. Hal ini berlaku untuk semua elemen termasuk yang memiliki penundaan 0 detik.
[/tip]

##### animate-in-after [opsional]

Gunakan atribut ini untuk merangkai atau mengurutkan animasi (misalnya, animasi2 dimulai setelah animasi1 selesai). Tentukan ID elemen animasi yang akan diikuti oleh animasi elemen ini. Elemen tersebut harus ada di `<amp-story-page>` yang sama. Penundaan diterapkan setelah animasi elemen sebelumnya selesai. Untuk detail lebih lanjut, lihat bagian [Mengurutkan animasi](#sequencing-animations) di bawah.

Misalnya, dalam kode berikut, `object2` mulai dianimasikan setelah `object1` menyelesaikan animasi masuknya:

```html
<amp-story-page id="page1">
  <amp-story-grid-layer template="vertical">
    <div id="object1"
        animate-in="rotate-in-left">
      1
    </div>
    <div id="object2"
        animate-in="fly-in-right"
        animate-in-after="object1">
      2. <!-- will start after object1 has finished -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

##### scale-start, scale-end [opsional, hanya berfungsi dengan animasi `zoom-in` &amp; `zoom-out`]

Gunakan kedua atribut ini untuk menentukan lebih lanjut parameter animasi zoom-in dan zoom-out. Nilai ini harus lebih besar atau sama dengan 0, dan bilangan desimal diperbolehkan. Defaultnya adalah scale-start: 1 dan scale-start: 3 untuk zoom-in, dan kebalikannya untuk zoom-out.

*Contoh*: Gambar diperbesar 2x hingga 5x dari ukuran aslinya dalam waktu 4 detik.

```html
<amp-img animate-in="zoom-in" scale-start="2" scale-end="5" animate-in-duration="4s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-x [opsional, hanya berfungsi dengan animasi `pan-left` &amp; `pan-right`]

Gunakan atribut ini untuk menentukan penggeseran horizontal gambar Anda dalam animasi pan-left/pan-right. Nilainya harus lebih besar atau sama dengan 0 dalam piksel. Nilai default akan menggeser keseluruhan lebar dari gambar yang ditentukan.

*Contoh*: Gambar digeser 200 piksel ke kiri dalam waktu 10 detik.

```html
<amp-img animate-in="pan-left" translate-x="200px" animate-in-duration="10s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-y [opsional, hanya berfungsi dengan animasi `pan-up` &amp; `pan-down`]

Gunakan atribut ini untuk menentukan penggeseran vertikal gambar Anda dalam animasi pan-up/pan-down. Nilainya harus lebih besar atau sama dengan 0 dalam piksel. Nilai default akan menggeser keseluruhan tinggi dari gambar yang ditentukan.

*Contoh*: Gambar digeser 50 piksel ke bawah dalam waktu 15 detik.

```html
<amp-img animate-in="pan-down" translate-y="50px" animate-in-duration="15s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

### Mengurutkan animasi

Untuk merangkai animasi secara berurutan, gunakan atribut `animate-in-after`. Semua elemen dalam rangkaian tertentu harus ada di `<amp-story-page>` yang sama. Elemen tanpa atribut `animate-in-after` tidak termasuk dalam rangkaian urutan, dan akan dimulai secara terpisah di halaman masuk.

```html
<amp-story-page id="my-sequencing-page">
  <amp-story-grid-layer template="vertical">
    <div class="circle"
        animate-in="drop-in"
        animate-in-duration="1.8s">
      1. <!-- will start independently -->
    </div>
    <div id="rotate-in-left-obj"
        class="square"
        animate-in="rotate-in-left"
        animate-in-after="fade-in-obj"
        animate-in-delay="0.2s">
      2. <!-- will start after fade-in-obj has finished -->
    </div>
    <div class="square"
        animate-in-after="rotate-in-left-obj"
        animate-in="whoosh-in-right"
        animate-in-delay="0.2s">
      3. <!-- will start after rotate-in-left-obj has finished -->
    </div>
    <div id="fade-in-obj"
        class="circle"
        animate-in="fade-in"
        animate-in-duration="2.2s">
      1. <!-- will start independently -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

### Menggabungkan beberapa animasi

Anda dapat menerapkan beberapa animasi masuk pada satu elemen (misalnya, elemen melayang ke halaman dan memudar pada saat yang sama). Anda tidak dapat menetapkan lebih dari satu preset animasi ke satu elemen; tetapi, elemen dengan animasi masuk berbeda dapat disarangkan untuk menggabungkannya menjadi satu.

```html
<div animate-in="fly-in-left">
  <div animate-in="fade-in">
    I will fly-in and fade-in!
  </div>
</div>
```

[tip type="note"]
Jika animasi yang terbentuk diharapkan untuk dimulai setelah akhir dari animasi elemen lain, pastikan semua elemen tersarang yang menyusun animasi tersebut memiliki atribut `animate-in-after` yang ditetapkan ke `id` yang sama.
[/tip]

## Bookend: `amp-story-bookend`

`amp-story-bookend` adalah layar terakhir dari artikel. Komponen ini memuat link terkait, opsi berbagi, link pesan ajakan, dan sebagainya.

<figure class="centered-fig">
  <amp-anim alt="contoh artikel terkait" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif" layout="fixed">
    <noscript>
      <img alt="contoh artikel terkait" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif">
      </noscript>
    </amp-anim>
  </figure>

  Untuk menggunakannya, sertakan tag `<amp-story-bookend>` sebagai turunan dari `<amp-story>` dengan atribut wajib `layout=nodisplay`.
  Selanjutnya, Anda dapat menentukan konfigurasi JSON dalam file terpisah dan mengimpornya melalui atribut `src`, atau Anda dapat menempatkannya secara inline.

  Mengimpor konfigurasi JSON melalui atribut `src`:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `layout=nodisplay` is required. -->
  <amp-story-bookend src="bookendv1.json" layout=nodisplay>
  </amp-story-bookend>
<amp-story>
```

Jika tidak ingin mengambil konfigurasi bookend dari server, Anda dapat menentukannya secara inline:

```html
<amp-story standalone>
  ...
  <amp-story-bookend layout=nodisplay>
    <script type="application/json">
      {
        bookendVersion: "v1.0",
        shareProviders: [ ... ],
        components: [ ... ]
      }
    </script>
  </amp-story-bookend>
<amp-story>
```

Selanjutnya, Anda harus mengisi konfigurasi JSON. Di sinilah Anda menyesuaikan bookend. Struktur keseluruhan konfigurasi terlihat seperti ini:

```text
{
  bookendVersion: "v1.0",
  shareProviders: [
    ...
  ],
  components: [
    ...
  ]
}
```

Anda wajib menentukan bahwa Anda menggunakan versi v1.0 dengan menyertakan baris pertama.

#### Komponen bookend

Bookend terdiri dari beberapa komponen berbeda. Komponen ini dapat berupa artikel, link pesan ajakan, teks, dan sebagainya.

Komponen ini ditentukan dalam kolom `components` dari JSON yang dikonfigurasi. Lihat bagian [Contoh respons JSON](#example-json-response) di bawah sebagai contoh.

##### heading

Komponen <code>heading</code> memiliki kolom ```text</code>, yang dapat digunakan untuk menambahkan judul ke akhir sekelompok artikel.

```json
{
  type: "heading",
  text: "More to Read"
}
```

<amp-img alt="Komponen heading bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-heading.png" width="386" height="123" layout="fixed">
  <noscript>
    <img alt="Komponen heading bookend" src="img/amp-story-bookend-component-heading.png">
  </noscript>
</amp-img>

##### small

Komponen `small` dapat digunakan untuk menaut ke artikel terkait. Komponen ini memerlukan kolom berikut: `title`, `url`, dan `image` (opsional).

```json
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/article.html",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Komponen small bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-small.png" width="379" height="192" layout="fixed">
  <noscript>
    <img alt="Komponen small bookend" src="img/amp-story-bookend-component-small.png">
  </noscript>
</amp-img>

##### landscape

Komponen `landscape` dapat digunakan untuk format alternatif konten, seperti video. Komponen ini memerlukan kolom berikut: `title`, `url`, dan `image`. Jika ingin, Anda dapat menambahkan kolom `category`, yang menampilkan subjudul di atas judul.

```json
{
  type: "landscape",
  title: "TRAPPIST-1 Planets May Still Be Wet Enough for Life",
  url: "http://example.com/article.html",
  category: "astronomy",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Komponen landscape bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-landscape.png" width="388" height="410" layout="fixed">
  <noscript>
    <img alt="Komponen landscape bookend" src="img/amp-story-bookend-component-landscape.png">
  </noscript>
</amp-img>

##### portrait

Komponen `portrait` dapat digunakan untuk menaut ke artikel lain. Komponen ini memerlukan kolom berikut: `title`, `url`, dan `image`. Jika ingin, Anda dapat menambahkan kolom `category`, yang menampilkan subjudul di atas judul.

```json
{
  type: "portrait",
  category: "Science",
  title: "New discovery found",
  url: "http://example.com/article.html",
  image: "http://placehold.it/312x416"
}
```

<amp-img alt="Komponen portrait bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-portrait.png" width="382" height="522" layout="fixed">
  <noscript>
    <img alt="Komponen portrait bookend" src="img/amp-story-bookend-component-portrait.png">
  </noscript>
</amp-img>

##### cta-link

Komponen <code>cta-link</code> memungkinkan Anda menentukan link pesan ajakan (misalnya <code>Read More</code> atau <code>Subscribe</code>). Komponen ini memiliki kunci <code>links</code>, yang menentukan array link. Setiap link adalah objek dengan nilai ```text</code> dan <code>url</code>.

```json
{
  type: "cta-link",
  links: [{
    text: "Sign Up",
    url: "example.com/signup"
  }, {
    text: "Subscribe",
    url: "example.com/subscribe"
  }]
}
```

<amp-img alt="Komponen cta-link bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-cta-links.png" width="381" height="81" layout="fixed">
  <noscript>
    <img alt="Komponen cta-link bookend" src="img/amp-story-bookend-component-cta-links.png">
  </noscript>
</amp-img>

##### textbox

Komponen ```textbox</code> memungkinkan Anda menentukan teks di dalam bookend (misalnya kredit foto). Komponen ini memerlukan array <code>text</code>, di mana setiap elemen array berupa baris teks.

```json
{
  type: "textbox",
  text: [
    Food by Enrique McPizza,
    Choreography by Gabriel Filly,
    Script by Alan Ecma S.,
    Direction by Jon Tarantino
  ]
}
```

<amp-img alt="Komponen textbox bookend" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-textbox.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="Komponen textbox bookend" src="img/amp-story-bookend-component-textbox.png">
    </noscript>
  </amp-img>

  **Penautan AMP-ke-AMP**

  Untuk dokumen yang ditampilkan di AMP viewer, link biasanya mengarah ke `_top` atau terbuka di jendela baru. Namun, link ke halaman AMP dapat terus ditampilkan di viewer. Untuk mengaktifkan perilaku ini, tambahkan `"amphtml": true` ke komponen yang mendukung link. Contoh:

```json
  ...
  {
    type: "small",
    title: "This is India an the best places you should go",
    url: "http://example.com/my-amp-document.html",
    image: "http://placehold.it/256x128",
    amphtml: true
  },
  {
    type: "cta-link",
    links: [{
        text: "Sign Up",
        url: "example.com/signup",
        amphtml: true
      },
      {
        text: "Subscribe",
        url: "example.com/subscribe"
      }
    ]
  },
  ...
```

#### Berbagi di media sosial

Konfigurasi untuk berbagi di media sosial ditentukan dalam kolom `shareProviders` objek respons, dan bersifat opsional.

Kolom ini harus berisi string, di mana setiap string mewakili nama penyedia layanan berbagi (misalnya `twitter`).

Jika parameter tambahan diperlukan, objek yang memiliki key-value pair harus digunakan. Objek ini harus memuat kunci `provider` dengan nilai yang sesuai dengan nama penyedia (misalnya `facebook`). Key-value berikutnya akan bergantung pada penyedia layanan berbagi.

Daftar penyedia layanan yang tersedia sama dengan yang ada di komponen [amp-social-share](https://www.ampproject.org/docs/reference/components/amp-social-share).

Masing-masing penyedia layanan ini memiliki kumpulan parameter yang tersedia yang berbeda ([lihat `data-param-*`](https://www.ampproject.org/docs/reference/components/amp-social-share#data-param-%2a)). Objek konfigurasi menggunakan parameter tersebut tanpa awalan `data-param-` (misalnya, `data-param-app_id` akan muncul dalam objek konfigurasi sebagai `app_id`).

#### Konfigurasi JSON

Komponen `<amp-story-bookend>` harus memiliki atribut `src` yang mengarah ke konfigurasi JSON bookend. Komponen ini dideskripsikan sebagai endpoint URL yang menerima permintaan GET dan menampilkan respons JSON beserta isi bookend.  Jika dihilangkan, komponen amp-story akan merender UI default untuk layar akhir. Sistem bertanggung jawab mengambil data yang diperlukan untuk merender artikel terkait dan yang sedang tren.  Konten ini dapat ditayangkan dari file JSON statis, atau yang dibuat secara dinamis (misalnya, untuk menghitung apa yang sedang tren saat ini).

#### Contoh respons JSON

```text
{
  // You must specify version v1.0.
  bookendVersion: "v1.0",
  shareProviders: [
    email,
    tumblr,
    {
      provider: "twitter",
      // You can add custom sharing parameters depending on the social platform.
      text: "This is custom share text that I would like for the Twitter platform"
    },
    {
      provider: "facebook",
      // Facebook requires an</code>app_id` param
      app_id: "MY_FACEBOOK_APP_ID"
    }
  ],
  components: [
    {
      type: "heading",
      text: "More to read"
    },
    {
      type: "small",
      title: "This is India an the best places you should go",
      url: "<a href="
      http: //example.com/article.html">http://example.com/article.html</a>",
        image: "<a href="
      http: //placehold.it/256x128">http://placehold.it/256x128</a>"
    },
    ...
  ]
}
```

## Komponen lain yang dapat digunakan dalam artikel AMP

Berikut adalah komponen lain yang dapat digunakan dalam artikel AMP yang memerlukan beberapa penjelasan khusus artikel.

* [amp-sidebar](https://www.ampproject.org/docs/reference/components/amp-sidebar#sidebar-for-stories)
* [amp-consent](https://www.ampproject.org/docs/reference/components/amp-consent#prompt-ui-for-stories)

Untuk mengetahui komponen lain yang umumnya dapat digunakan, lihat [daftar turunan yang diizinkan](https://www.ampproject.org/docs/reference/components/amp-story#children).

## Validasi

Lihat [aturan amp-story](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) dalam spesifikasi validator AMP.

## Pelokalan

Untuk melokalkan artikel, sertakan kode bahasa dalam atribut `lang` pada tag `<html>` artikel Anda, misalnya `<html lang="en">` untuk bahasa Inggris.  Kode bahasa yang didukung adalah:

* ar (Arab)
* de (Jerman)
* en-GB (Inggris, Inggris Raya)
* en (Inggris, Amerika Serikat)
* es-419 (Spanyol, Amerika Tengah/Latin)
* es (Spanyol, Spanyol)
* fr-CA (Prancis, Kanada)
* fr (Prancis, Prancis)
* hi (Hindi)
* id (Indonesia)
* it (Italia)
* ja (Jepang)
* ko (Korea)
* nl (Belanda)
* no (Norwegia)
* pt-BR (Portugis, Brasil)
* pt (Portugis, Portugal)
* ru (Rusia)
* tr (Turki)
* vi (Vietnam)
* zh-TW (China Tradisional)
* zh (China Aks. Sederhana)

Selain itu, untuk bahasa yang penulisannya dari kanan ke kiri, Anda dapat menyertakan atribut `dir="rtl"` pada tag `<html>` artikel Anda.  Kode ini juga dapat digunakan bersama dengan kode bahasa, misalnya `<html lang="ar" dir="rtl">`.

## Referensi terkait

* [Tutorial: Membuat artikel AMP visual](https://www.ampproject.org/docs/tutorials/visual_story)
* [Sampel di AMP By Example](https://ampbyexample.com/stories/#stories/introduction)
* [Praktik terbaik untuk membuat artikel AMP](https://www.ampproject.org/docs/guides/amp_story_best_practices)

</amp-story></body>
