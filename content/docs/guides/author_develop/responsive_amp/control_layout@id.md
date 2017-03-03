---
$title: Tata Letak yang Didukung
---

Buat elemen Anda menjadi responsif;
sertakan `layout=responsive`.

[TOC]

## Nilai atribut tata letak yang didukung

Secara default,
gunakan tata letak responsif.

Berikut daftar lengkap atribut tata letak yang didukung:

<table>
  <thead>
    <tr>
      <th class="col-twenty" data-th="Layout type">Jenis tata letak</th>
      <th class="col-twenty" data-th="Width/height required">Lebar/tinggi diperlukan</th>
      <th data-th="Behavior">Perilaku</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>nodisplay</code></td>
      <td class="col-twenty" data-th="Description">Tidak</td>
      <td data-th="Behavior">Elemen tidak ditampilkan. Tata letak ini dapat diterapkan ke setiap elemen AMP. Komponen tersebut tidak menggunakan ruang sama sekali di layar karena tidak memiliki gaya tampilan. Hal ini diasumsikan bahwa elemen tersebut dapat tampil dengan sendirinya di tindakan pengguna, misalnya, <a href="/docs/reference/extended/amp-lightbox.html"><code>amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed</code></td>
      <td class="col-twenty" data-th="Description">Ya</td>
      <td data-th="Behavior">Elemen memiliki lebar dan tinggi yang tetap tanpa mendukung responsivitas. Pengecualian hanya untuk elemen <a href="/docs/reference/amp-pixel.html"><code>amp-pixel</code></a> dan <a href="/docs/reference/extended/amp-audio.html"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>responsive</code></td>
      <td class="col-twenty" data-th="Description">Ya</td>
      <td data-th="Behavior">Elemen diukur sesuai lebar elemen penampungnya dan ukuran panjangnya diubah secara otomatis ke rasio aspek yang diberikan oleh atribut lebar dan tinggi. Tata letak ini berfungsi sangat baik untuk sebagian besar elemen AMP, termasuk <a href="/docs/reference/amp-img.html"><code>amp-img</code></a> dan <a href="/docs/reference/amp-video.html"><code>amp-video</code></a>. Ruang yang tersedia tergantung pada elemen induk dan dapat disesuaikan menggunakan CSS <code>max-width</code>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed-height</code></td>
      <td class="col-twenty" data-th="Description">Hanya tinggi</td>
      <td data-th="Behavior">Elemen menggunakan ruang yang disediakan, namun tingginya tidak diubah. Tata letak ini berfungi dengan baik untuk elemen seperti <a href="/docs/reference/extended/amp-carousel.html"><code>amp-carousel</code></a> yang melibatkan konten yang diposisikan secara horizontal. Atribut <code>width</code> harus tidak ada atau harus sama dengan <code>auto</code>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fill</code></td>
      <td class="col-twenty" data-th="Description">Tidak</td>
      <td data-th="Behavior">Elemen menggunakan ruang yang disediakan, untuk tinggi dan lebarnya. Dengan kata lain, tata letak elemen isian sesuai dengan induknya.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>container</code></td>
      <td class="col-twenty" data-th="Description">Tidak</td>
      <td data-th="Behavior">Elemen memungkinkan elemen turunannya menentukan ukurannya, mirip seperti <code>div</code> HTML normal. Komponen diasumsikan tidak memiliki tata letak spesifik, tetapi bertindak sebagai penampung. Turunannya langsung dirender.</td>
    </tr>
  </tbody>
</table>

### Bagaimana jika lebar dan tinggi tidak ditentukan?

Dalam beberapa kasus, jika `width` atau `height` tidak ditentukan,
waktu proses AMP dapat mengubah nilai berikut menjadi default:

* [`amp-pixel`](/docs/reference/amp-pixel.html): Setelan default lebar dan tingginya adalah 0.
* [`amp-audio`](/docs/reference/extended/amp-audio.html): Setelan lebar dan tinggi disimpulkan dari browser.

### Bagaimana jika atribut tata letak tidak ditentukan?

Perilaku tata letak ditentukan seperti berikut:

* Jika `height` ada dan `width` tidak ada atau sama dengan `auto`, dianggap tata letak `fixed-height`.
* Jika atribut `width` atau `height` ada bersama dengan atribut `sizes`, dianggap tata letak `responsive`.
* Jika atribut `width` atau `height` ada, dianggap tata letak `fixed`.
* Jika `width` dan `height` tidak ada, dianggap tata letak `container`.

## Menggunakan @media dan media

Gunakan [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)
untuk mengontrol tampilan dan perilaku tata letak laman, seperti yang akan Anda lakukan di situs web lainnya.
Jika jendela browser merubah ukuran atau orientasi,
kueri media dievaluasi ulang serta elemen disembunyikan dan ditampilkan
berdasarkan hasil yang baru.

Pelajari lebih lanjut tentang mengontrol tata letak dengan menerapkan kueri media di
[Menggunakan kueri media CSS untuk responsivitas](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en).

Salah satu fitur tambahan untuk desain responsif yang tersedia di AMP adalah atribut `media`.
Atribut ini dapat digunakan di setiap elemen AMP;
atribut berfungsi seperti kueri media di stylesheet global,
tetapi hanya memengaruhi elemen spesifik di laman tunggal.

Misalnya, di sini terdapat 2 gambar dengan kueri media yang berdiri sendiri.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive" >
</amp-img>
[/sourcecode]

Tergantung pada lebar layar, salah satu atau yang lainnya akan diambil dan dirender.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive" >
</amp-img>
[/sourcecode]

## Menggunakan srcset dan ukuran

Gunakan atribut `srcset` untuk mengontrol aset elemen
berdasarkan berbagai ekspresi media.
Secara khusus, gunakan atribut tersebut untuk semua tag [`amp-img`](/docs/reference/amp-img.html)
guna menentukan aset gambar yang akan digunakan berdasarkan berbagai ukuran layar.

Dalam contoh sederhana ini,
`srcset` menentukan gambar yang akan digunakan berdasarkan lebar layar.
Alat deskripsi `w` memberi tahu browser tentang lebar
setiap gambar di daftar:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w >
</amp-img>
[/sourcecode]

**Catatan:** AMP mendukung alat deskripsi `w` di semua browser.

Pelajari lebih lanjut tentang membuat gambar responsif menggunakan `srcset`
di [Menggunakan Gambar Responsif (Sekarang)](http://alistapart.com/article/using-responsive-images-now).

Anda juga dapat menggunakan atribut `sizes` bersama `srcset`.
Atribut `sizes` mendeskripsikan cara menghitung ukuran elemen
berdasarkan ekspresi media apa pun.
Berdasarkan ukuran elemen yang dihitung,
agen pengguna memilih sumber paling relatif yang diberikan oleh atribut `srcset`.

Perhatikan contoh berikut:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w
    sizes="(min-width: 650px) 50vw, 100vw" >
</amp-img>
[/sourcecode]

Atribut `sizes` menentukan lebar elemen menjadi 50% dari ukuran tampilan yang terlihat
jika tampilan yang terlihat adalah 650 piksel atau lebih.
Misalnya, jika tampilan yang terlihat adalah 800 piksel,
lebar elemen disetel menjadi 400 piksel.
Kemudian, browser memilih sumber daya `srcset` yang sesuai dengan 400 piksel,
menganggap rasio piksel perangkat adalah 1,
yang dalam hal ini adalah `narrow.jpg` (320 piksel).

**Penting:** Jika atribut ukuran ditentukan bersama lebar dan tinggi,
default tata letak menjadi `responsive`.

Pelajari lebih lanjut tentang cara membandingkan atribut `sizes` dan `srcset`
dengan kueri media di
entri blog [Srcset dan ukuran](https://ericportis.com/posts/2014/srcset-sizes/).

## Menyertakan placeholder dan fallback

### placeholder

Elemen yang ditandai dengan atribut `placeholder` bertindak sebagai
placeholder untuk elemen AMP induk.
Jika ditentukan, elemen `placeholder` harus merupakan turunan langsung dari elemen AMP.

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive" >
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

Secara default, placeholder langsung ditampilkan untuk elemen AMP,
meskipun sumber daya elemen AMP belum didownload atau diinisialisasi.
Setelah siap, elemen AMP biasanya menyembunyikan placeholder-nya dan menampilkan kontennya.

**Catatan:** Placeholder tidak harus berupa elemen AMP;
elemen HTML apa pun dapat bertindak sebagai placeholder.

### fallback

Gunakan atribut `fallback` untuk mengindikasikan perilaku fallback
untuk elemen apa pun yang tidak didukung oleh browser.
Misalnya, gunakan atribut `fallback` untuk berkomunikasi dengan pengguna
yang fitur tertentunya tidak didukung oleh browser:

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg" >
  <div fallback>
        <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

Atribut `fallback` dapat disetel di elemen HTML apa pun, tidak hanya elemen AMP.
Jika ditentukan, elemen `fallback` harus berupa turunan langsung dari elemen AMP.

### noloading

Banyak elemen AMP dimasukkan ke daftar putih untuk menampilkan "indikator pemuatan",
yang merupakan animasi dasar yang menunjukkan bahwa elemen tersebut belum dimuat sepenuhnya.
Elemen dapat menyisih dari perilaku ini dengan menambahkan atribut `noloading`.
