---
"$title": Sistem Tata Letak HTML AMP
order: '1'
formats:
- websites
- email
- stories
- ads
teaser:
  text: 'Gambaran Umum '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

## Gambaran Umum

Tujuan utama sistem tata letak adalah untuk memastikan bahwa elemen-elemen AMP dapat mengekspresikan tata letak mereka sehingga runtime mampu menduga pengaturan ukuran elemen sebelum sumber daya jarak jauh apa pun, seperti JavaScript dan pemanggilan data, telah diselesaikan. Hal ini penting karena ini sangat mengurangi perenderan dan jank pengguliran.

Berdasarkan hal ini, Sistem Tata Letak AMP dirancang untuk mendukung beberapa tata letak fleksibel yang memberikan jaminan kinerja yang baik. Sistem ini mengandalkan serangkaian atribut, seperti `layout`, `width`, `height`, `sizes`, dan `heights` untuk mengekspresikan kebutuhan pengaturan ukuran dan tata letak elemen.

## Perilaku <a name="behavior"></a>

Sebuah elemen AMP non-wadah (yaitu, `layout != container`) mengawali dalam mode yang belum diselesaikan/belum dibangun dan di dalam mode ini semua anak-anaknya disembunyikan, kecuali sebuah bakal tempat (placeholder) (lihat atribut `placeholder`). JavaScript dan payload data yang diperlukan untuk sepenuhnya membangun elemen mungkin masih diunduh dan diawali, namun runtime AMP sudah tahu bagaimana mengatur ukuran dan tata letak elemen hanya dengan mengandalkan kelas CSS dan atribut `layout`, `width`, `height`, dan `media`. Dalam banyak kasus, sebuah `placeholder`, jika telah ditentukan, diukur dan ditempatkan untuk mengambil semua ruang elemen tersebut.

`placeholder` disembunyikan begitu elemen dibuat dan tata letak pertamanya selesai. Pada titik ini, anak-anak elemen tersebut diperkirakan telah dibuat dan ditempatkan dengan baik serta siap ditampilkan dan menerima input pembaca. Ini adalah perilaku default. Setiap elemen dapat menindih untuk, cth.: menyembunyikan `placeholder` lebih cepat atau mempertahankannya lebih lama.

Elemen ini diatur ukurannya dan ditampilkan berdasarkan atribut `layout`, `width`, `height`, dan `media` sesuai runtime. Semua aturan tata letak diterapkan melalui CSS secara internal. Elemen dikatakan akan “menentukan ukuran” jika ukurannya tidak dapat disimpulkan melalui gaya CSS dan tidak berubah berdasarkan anak-anaknya: langsung tersedia atau dimasukkan secara dinamis. Ini tidak berarti bahwa ukuran elemen ini tidak dapat berubah. Tata letak dapat responsif sepenuhnya sebagaimana halnya dengan tata letak `responsive`, `fixed-height`, `fill`, dan `flex-item`. Ini hanya berarti bahwa ukuran tidak berubah tanpa tindakan pengguna yang eksplisit, cth.: selama perenderan atau pengguliran atau setelah pengunduhan.

Jika elemen telah dikonfigurasi secara tidak benar, maka di dalam PROD tidak akan dirender sama sekali dan di dalam mode DEV, runtime akan merender elemen dalam keadaan eror. Kemungkinan eror termasuk nilai-nilai yang tidak valid atau tidak didukung dari atribut `layout`, `width`, dan `height`.

## Atribut Tata Letak <a name="layout-attributes"></a>

### `width` dan `height` <a name="width-and-height"></a>

Sesuai dengan nilai atribut `layout`, elemen komponen AMP harus mempunyai atribut `width` dan `height` yang mengandung sebuah nilai piksel integer. Perilaku tata letak aktual ditentukan oleh atribut `layout` sebagaimana dijelaskan di bawah ini.

Di dalam beberapa kasus, jika `width` atau `height` tidak ditentukan, runtime AMP dapat distandarkan ke nilai-nilai ini, sebagai berikut:

- `amp-pixel`: Baik `width` maupun `height` distandarkan ke 0.
- `amp-audio`: Default atau standar `width` dan `height` disimpulkan dari browser.

### `layout` <a name="layout"></a>

AMP menyediakan serangkaian tata letak yang menentukan cara komponen AMP berperilaku di dalam tata letak dokumen. Anda dapat menentukan tata letak untuk sebuah komponen dengan menambahkan atribut `layout` dengan satu dari nilai-nilai yang telah ditentukan di dalam tabel di bawah ini.

**Contoh**: Sebuah gambar responsif sederhana di mana lebar dan tinggi digunakan untuk menentukan rasio aspek.

[sourcecode:html]
<amp-img
  src="/img/amp.jpg"
  width="1080"
  height="610"
  layout="responsive"
  alt="an image"
></amp-img>
[/sourcecode]

Nilai-nilai yang didukung untuk atribut `layout`:

<table>
  <thead>
    <tr>
      <th width="30%">Nilai</th>
      <th>Perilaku dan Persyaratan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tidak ada</td>
      <td>Jika tidak ada nilai yang ditentukan, tata letak untuk komponen disimpulkan sebagai berikut:         <ul>           <li>Jika <code>height</code> ada, tetapi <code>width</code> tidak ada atau ditetapkan sebagai <code>auto</code>, tata letak <code>fixed-height</code> diasumsikan.</li>           <li>Jika <code>width</code> dan <code>height</code> ada bersama atribut <code>sizes</code> atau atribut <code>heights</code>, tata letak <code>responsive</code> diasumsikan.</li>           <li>Jika <code>width</code> dan <code>height</code> ada, tata letak  <code>fixed</code> diasumsikan.</li>           <li> Jika <code>width</code> dan <code>height</code> tidak ada tata letak <code>container</code> diasumsikan.</li>         </ul> </td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>Elemen ini membiarkan anak-anaknya untuk menentukan ukurannya, persis seperti <code>div</code>HTML normal. Komponen dianggap tidak mempunyai tata letak spesifik sendiri, tetapi bertindak hanya sebagai wadah, anak-anaknya dirender segera.</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Elemen ini mengambil ruang yang tersedia untuknya—baik lebar maupun tinggi. Dengan kata lain, tata letak dan ukuran suatu elemen <code>fill</code> sesuai dengan induknya. Agar elemen mengisi wadah induknya, tentukan tata letak “fill” (isi), dan pastikan bahwa wadah induknya menentukan <code>position:relative</code> atau <code>position:absolute</code>.</td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Elemen ini mempunyai lebar dan tinggi tetap, namun ketanggapan tidak didukung. Atribut <code>width</code> dan <code>height</code> harus ada. Satu-satunya pengecualian adalah komponen <code>amp-pixel</code> dan <code>amp-audio</code>.</td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>Elemen ini mengambil ruang yang tersedia untuknya, namun mempertahankan tinggi. Tata letak ini berfungsi dengan baik untuk elemen seperti <code>amp-carousel</code> yang melibatkan konten yang diposisikan horizontal. Atribut <br> <code>height</code> harus ada. Atribut <code>width</code> tidak boleh ada atau harus setara dengan <code>auto</code>.</td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>Elemen ini dan elemen lain di dalam induknya dengan jenis tata letak <code>flex-item</code> mengambil sisa ruang wadah induknya jika induknya adalah wadah yang fleksibel (yaitu, <code>display: flex</code>). Atribut <code>width</code> dan <code>height</code> tidak diperlukan.</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Elemen ini mengambil ruang yang tersedia untuknya dan mengubah ukuran tingginya secara otomatis sesuai rasio aspek yang diberikan oleh atribut <code>width</code> dan <code>height</code> <em>hingga</em> mencapai ukuran elemen yang ditentukan oleh atribut `width` dan `height` yang diteruskan ke <code>amp-img</code>, atau mencapai batas CSS, seperti `max-width`. Atribut lebar (width) dan tinggi (height) harus ada. Tata letak ini berfungsi dengan sangat baik untuk sebagian besar elemen AMP, termasuk <code>amp-img</code>, <code>amp-carousel</code>, dll. Ruang yang tersedia bergantung pada elemen induk dan dapat juga disesuaikan dengan menggunakan CSS <code>max-width</code>. Tata letak ini berbeda dari <code>responsive</code> karena mempunyai tinggi dan lebar intrinsik. Ini adalah yang paling jelas di dalam sebuah elemen yang mengambang di mana sebuah tata letak <code>responsive</code> akan merender 0x0 dan tata letak <code>intrinsic</code> akan mengecil sesuai ukuran alaminya atau batasan CSS apa pun.</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>Elemen ini tidak ditampilkan, dan sama sekali tidak menggunakan ruang pada layar, seakan-akan gaya tampilannya adalah <code>none</code>. Tata letak ini dapat diterapkan pada setiap elemen AMP. Diasumsikan bahwa elemen dapat menampilkan diri sendiri pada tindakan pengguna (cth., <code>amp-lightbox</code>). Atribut <code>width</code> dan <code>height</code> tidak diperlukan.</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Elemen ini mengambil ruang yang tersedia untuknya dan mengubah ukuran tingginya secara otomatis sesuai rasio aspek yang diberikan oleh atribut <code>width</code> dan <code>height</code>. Tata letak ini berfungsi dengan sangat baik untuk sebagian besar elemen AMP, termasuk <code>amp-img</code>, <code>amp-video</code>dll. Ruang yang tersedia bergantung pada elemen induk dan dapat juga disesuaikan dengan menggunakan CSS  <code>max-width</code>. Atribut <code>width</code> dan <code>height</code> harus ada.<p><strong>Catatan</strong>: Elemen-elemen dengan <code>"layout=responsive"</code> tidak mempunyai ukuran intrinsik. Ukuran elemen ditentukan dari elemen wadahnya. Untuk memastikan tampilan elemen AMP, Anda harus menentukan lebar dan tinggi untuk elemen pengisi. Jangan tentukan <code>"display:table"</code> pada elemen pengisi karena ini menimpa tampilan elemen AMP, sehingga menjadikan elemen AMP tidak terlihat.</p> </td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

Semua elemen AMP yang mendukung tata letak `responsive` juga mendukung atribut `sizes`. Nilai atribut ini adalah ekspresi ukuran sebagaimana dijelaskan di dalam [ukuran img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), tetapi diperluas ke semua elemen, bukan cuma gambar. Pendeknya, atribut `sizes` menjelaskan cara lebar elemen dihitung sesuai dengan kondisi media.

Jika atribut `sizes` ditentukan bersama `width` dan `height`, `layout` distandarkan pada `responsive`.

**Contoh**: Menggunakan atribut `sizes`

Di dalam contoh berikut ini, jika viewport lebih lebar dari `320px`, gambar akan selebar 320px, jika tidak, akan selebar 100vw (100% lebar viewport).

[sourcecode:html]
<amp-img
  src="https://acme.org/image1.png"
  width="400"
  height="300"
  layout="responsive"
  sizes="(min-width: 320px) 320px, 100vw"
>
</amp-img>
[/sourcecode]

### `disable-inline-width` <a name="disable-inline-width"></a>

Atribut `sizes` sendiri akan menetapkan gaya `width` inline pada elemen. Saat menyandingkan `disable-inline-width` dengan `sizes`, elemen AMP akan menyebarkan nilai `sizes` hingga ke tag dasar elemen, seperti pada `img` yang berada di dalam `amp-img`, **tanpa** menetapkan `width` inline karena `sizes` biasanya melakukannya sendiri dalam AMP.

**Contoh**: Menggunakan atribut `disable-inline-width`

Di dalam contoh berikut ini, lebar elemen `<amp-img>` tidak terpengaruh, dan `sizes` hanya digunakan untuk memilih salah satu sumber dari `srcset`.

[sourcecode:html]
<amp-img
  src="https://acme.org/image1.png"
  width="400"
  height="300"
  layout="responsive"
  sizes="(min-width: 320px) 320px, 100vw"
  disable-inline-width
>
</amp-img>
[/sourcecode]

### `heights` <a name="heights"></a>

Semua elemen AMP yang mendukung tata letak `responsive`, juga mendukung atribut `heights`. Nilai atribut ini adalah ekspresi ukuran berdasarkan ekspresi media yang serupa dengan [atribut ukuran img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), tetapi dengan dua perbedaan utama:

1. Ini berlaku pada tinggi, bukan lebar elemen.
2. Nilai persen diperbolehkan, cth. `86%`. Jika sebuah nilai persen digunakan, ini mengindikasikan persentase lebar elemen.

Jika atribut `heights` ditentukan bersama `width` dan `height`, `layout` distandarkan pada `responsive`.

**Contoh**: Menggunakan atribut `heights`

Di dalam contoh berikut ini, tinggi gambar akan distandarkan pada 80% dari lebarnya, namun jika viewport lebih lebar dari `500px`, tingginya dibatasi pada `200px`. Karena atribut `heights` ditentukan bersama `width` and `height`, tata letak distandarkan pada `responsive`.

[sourcecode:html]
<amp-img
  src="https://acme.org/image1.png"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
[/sourcecode]

### `media` <a name="media"></a>

Sebagian besar elemen AMP mendukung atribut `media`. Nilai `media` adalah kueri media. Jika kueri tidak sesuai, elemen tidak akan dirender sama sekali dan sumber daya serta sumber daya anaknya kemungkinan besar tidak akan diambil. Jika jendela browser berubah ukuran atau orientasinya, kueri media dievaluasi kembali dan elemen disembunyikan serta diperlihatkan berdasarkan hasil yang baru.

**Contoh**: Menggunakan atribut `media`

Di dalam contoh berikut ini, ada 2 gambar dengan kueri media yang sama-sama eksklusif. Tergantung lebar layar, satu dari kedua gambar ini akan diambil dan dirender. Atribut `media` tersedia pada semua elemen AMP, jadi dapat digunakan dengan elemen non-gambar, seperti iklan.

[sourcecode:html]
<amp-img
  media="(min-width: 650px)"
  src="wide.jpg"
  width="466"
  height="355"
  layout="responsive"
></amp-img>
<amp-img
  media="(max-width: 649px)"
  src="narrow.jpg"
  width="527"
  height="193"
  layout="responsive"
></amp-img>
[/sourcecode]

### `placeholder` <a name="placeholder"></a>

Atribut `placeholder` dapat ditetapkan pada elemen HTML apa pun, bukan hanya elemen AMP. Atribut `placeholder` mengindikasikan bahwa elemen yang ditandai dengan atribut ini bertindak sebagai bakal tempat untuk elemen AMP induk. Jika ditentukan, elemen bakal tempat harus berupa anak atau turunan langsung dari elemen AMP. Sebagai default, bakal tempat segera diperlihatkan untuk elemen AMP, bahkan jika sumber daya elemen AMP belum diunduh atau dimulai. Setelah siap, elemen AMP biasanya menyembunyikan bakal tempatnya dan memperlihatkan konten. Perilaku ini, yang terkait dengan bakal tempat, bergantung pada penerapan elemen.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

Atribut `fallback` dapat ditetapkan pada elemen HTML apa pun, bukan hanya elemen AMP. Sebuah fallback adalah ketentuan yang memungkinkan elemen untuk menyampaikan kepada pembaca bahwa browser tidak mendukung elemen tersebut. Jika ditentukan, elemen fallback harus berupa anak atau turunan langsung dari elemen AMP. Perilaku ini, yang terkait dengan fallback, bergantung pada penerapan elemen.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

Atribut `noloading` mengindikasikan apakah “indikator pemuatan” harus dinonaktifkan untuk elemen ini. Banyak elemen AMP yang masuk ke dalam daftar yang diperbolehkan untuk memperlihatkan “indikator pemuatan”, ini adalah animasi dasar yang memperlihatkan bahwa elemen belum sepenuhnya dimuat. Elemen dapat menolak perilaku ini dengan menambahkan atribut ini.

## (tl;dr) Rangkuman Perilaku & Persyaratan Tata Letak <a name="tldr-summary-of-layout-requirements--behaviors"></a>

Tabel berikut ini menjelaskan tentang parameter yang dapat diterima, kelas CSS, dan berbagai gaya yang digunakan untuk atribut `layout`. Perhatikan bahwa:

1. Kelas CSS apa pun yang ditandai dengan prefiks  `-amp-` dan elemen yang diberikan prefiks `i-amp-` dianggap internal untuk AMP dan penggunaannya di dalam stylesheet pengguna tidak diizinkan. Mereka diperlihatkan hanya untuk keperluan informasi.
2. Walaupun `width` dan `height` ditentukan di dalam tabel sebagaimana diperlukan, aturan default dapat berlaku sebagaimana dengan `amp-pixel` dan `amp-audio`.

<table>
  <thead>
    <tr>
      <th width="21%">Tata Letak</th>
      <th width="20%">Lebar/<br>Diperlukan?</th>
      <th width="20%">Menentukan Ukuran?</th>
      <th width="20%">Elemen Tambahan</th>
      <th width="19%">"Tampilan" CSS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>Tidak</td>
      <td>Tidak</td>
      <td>Tidak</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Tidak</td>
      <td>Ya, ukuran induk.</td>
      <td>Tidak</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Ya</td>
      <td>Ya, ditentukan dengan <code>width</code> dan <code>height</code>.</td>
      <td>Tidak</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td> <code>height</code> saja; <code>width</code> dapat <code>auto</code> </td>
      <td>Ya, ditentukan oleh wadah induk dan <code>height</code>.</td>
      <td>Tidak</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>Tidak</td>
      <td>Tidak</td>
      <td>Ya, berdasarkan wadah induk.</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Ya</td>
      <td>Ya, berdasarkan wadah induk dan rasio aspek <code>width:height</code>.</td>
      <td>Ya, <code>i-amphtml-sizer</code>.</td>
      <td> <code>block</code> (berperilaku seperti <a rel="nofollow" href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element">elemen yang diganti</a>)</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>Tidak</td>
      <td>Tidak</td>
      <td>Tidak</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Ya</td>
      <td>Ya, berdasarkan wadah induk dan rasio aspek <code>width:height</code>.</td>
      <td>Ya, <code>i-amphtml-sizer</code>.</td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>
