---
$title: Kueri Tata Letak & Media
---

[TOC]

AMP mendukung **kueri media** & **kueri elemen**, juga dilengkapi dengan cara yang canggih untuk mengontrol**tata letak** masing-masing elemen. Atribut `layout` mempermudah pengerjaan dan pembuatan desain yang benar-benar responsif dibandingkan dengan hanya menggunakan CSS.

## Memudahkan pembuatan gambar yang responsif

Buat gambar yang responsif dengan menetapkan `width` dan `height`, menyetel tata letak ke `responsive`, dan menunjukkan dengan [`srcset`](/id/docs/guides/responsive/art_direction.html) aset gambar mana yang digunakan berdasarkan berbagai ukuran layar:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Elemen `amp-img` ini otomatis menyesuaikan lebar elemen penampungnya, dan tingginya otomatis disetel ke rasio aspek yang ditentukan oleh lebar dan tinggi yang diberikan. Cobalah dengan mengubah ukuran jendela browser ini:

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

{% call callout('Tips', type='success') %}
Lihat demo live `amp-img` bersamaan yang ditampilkan dalam dua sisi untuk contoh dasar dan lanjutan: [Demo Live](https://ampbyexample.com/components/amp-img/)
{% endcall %}

## Atribut tata letak

Atribut `layout` memudahkan Anda mengontrol masing-masing elemen terkait perenderan elemen di layar. Kebanyakan perenderan mungkin dapat dilakukan dengan CSS saja - namun hal tersebut lebih sulit dilakukan, dan memerlukan banyak cara. Sebagai gantinya, gunakan atribut `layout`.

### Nilai yang didukung untuk atribut `layout`

Nilai berikut dapat digunakan di atribut `layout`:

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-twenty">Jenis tata letak</th>
      <th data-th="Width/height required" class="col-twenty">Lebar/tinggi yang diperlukan</th>
      <th data-th="Behavior">Perilaku</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>nodisplay</code></td>
      <td data-th="Description" class="col-twenty">Tidak</td>
      <td data-th="Behavior"> Elemen tidak ditampilkan. Tata letak ini dapat diterapkan untuk setiap elemen AMP. Komponen tidak memerlukan ruang di layar seakan-akan gaya tampilannya tidak ada. Diasumsikan bahwa elemen dapat ditampilkan dengan sendirinya pada tindakan pengguna, misalnya,<a href="/docs/reference/extended/amp-lightbox.html"><code> amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code> fixed</code></td>
      <td data-th="Description" class="col-twenty">Ya</td>
      <td data-th="Behavior"> Elemen memiliki lebar dan tinggi tetap tanpa ada responsivitas yang didukung. Satu-satunya pengecualian adalah elemen<a href="/docs/reference/amp-pixel.html"><code> amp-pixel</code></a>  dan<a href="/docs/reference/extended/amp-audio.html"><code> amp-audio</code></a> .</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code> responsive</code></td>
      <td data-th="Description" class="col-twenty"> Ya</td>
      <td data-th="Behavior"> Ukuran elemen ditentukan oleh lebar elemen penampungnya, dan ukuran tingginya otomatis diubah ke rasio aspek yang diberikan oleh atribut lebar dan tinggi. Tata letak ini berfungsi sangat baik untuk sebagian besar elemen AMP, termasuk<a href="/docs/reference/amp-img.html"><code> amp-img</code></a>,<a href="/docs/reference/amp-video.html"><code> amp-video</code></a> . Ruang yang tersedia bergantung pada elemen induk dan dapat disesuaikan menggunakan<code> max-width</code> CSS.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fixed-height</code></td>
      <td data-th="Description" class="col-twenty">Tinggi saja</td>
      <td data-th="Behavior"> Elemen mengambil ruang yang tersedia, namun tingginya tetap tidak berubah. Tata letak ini berfungsi dengan baik untuk elemen seperti<a href="/docs/reference/extended/amp-carousel.html"><code> amp-carousel</code></a>  yang menyertakan konten dengan posisi horizontal. Atribut<code> width</code>  tidak boleh ada atau harus sama dengan<code> auto</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fill</code></td>
      <td data-th="Description" class="col-twenty">Tidak</td>
      <td data-th="Behavior">Elemen mengambil ruang yang tersedia, baik lebar dan tingginya. Dengan kata lain, tata letak elemen pengisian cocok dengan elemen induknya.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>container</code></td>
      <td data-th="Description" class="col-twenty">Tidak</td>
      <td data-th="Behavior"> Elemen mengizinkan elemen turunannya menentukan ukurannya, mirip dengan HTML normal<code> div</code>. Komponen ini diasumsikan tidak memiliki tata letak spesifik dengan sendirinya, namun hanya bertindak sebagai penampung. Elemen turunannya dirender dengan segera.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>flex-item</code></td>
      <td data-th="Description" class="col-twenty">Tidak</td>
      <td data-th="Behavior"> Elemen dan elemen lain di dalam elemen induknya mengambil ruang penampung induk yang tersisa, jika elemen induk adalah penampung fleksibel (mis.,<code>display:flex</code> ). Ukuran elemen ditentukan oleh elemen induk dan jumlah elemen lain di dalam elemen induk sesuai dengan tata letak CSS <code>display:flex</code> .</td>
    </tr>
  </tbody>
</table>

### Bagaimana jika lebar dan tinggi tidak ditentukan?

Dalam kasus tertentu, jika `width` atau `height` tidak ditetapkan, waktu proses AMP dapat menetapkan nilai tersebut secara default seperti berikut:

* [`amp-pixel`](/id/docs/reference/amp-pixel.html): Lebar dan tinggi ditetapkan sebagai default ke 0.
* [`amp-audio`](/id/docs/reference/extended/amp-audio.html): Lebar dan tinggi default diperkirakan dari browser.

###  Bagaimana jika atribut<code>layout</code> tidak ditetapkan?

Jika atribut<code>layout</code> tidak ditetapkan, AMP mencoba memperkirakan atau menduga nilai yang sesuai:

<table>
  <thead>
    <tr>
      <th data-th="Rule">Aturan</th>
      <th data-th="Inferred layout" class="col-thirty">Perkiraan tata letak</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule"><code>height</code> ada dan <code>width</code>  tidak ada atau sama dengan<code>auto</code></td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Atribut <code>width</code> atau <code>height</code>  ada bersama dengan atribut <code>sizes</code> type:</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Atribut <code>width</code> atau <code>height</code> ada</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code> dan <code>height</code> tidak ada</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## Menggunakan kueri media

### Kueri media CSS

Gunakan [`@media`](https://developer.mozilla.org/id-ID/docs/Web/CSS/@media) untuk mengontrol tampilan dan perilaku tata letak halaman, seperti yang akan Anda lakukan di situs lainnya. Jika jendela browser mengubah ukuran atau orientasi, kueri media akan dievaluasi ulang serta elemen disembunyikan dan ditampilkan berdasarkan hasil yang baru.

{% call callout('Tips', type='success') %}
Pelajari lebih lanjut tentang cara mengontrol tata letak dengan menerapkan kueri media di [Menggunakan kueri media CSS untuk responsivitas](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en).
{% endcall %}

### Kueri media elemen

Fitur tambahan lain untuk desain responsif yang tersedia di AMP adalah atribut `media`. Atribut ini dapat digunakan di setiap elemen AMP; cara kerjanya sama dengan kueri media di stylesheet global Anda, namun hanya memengaruhi elemen tertentu pada satu halaman.

Misalnya, di sini kami memiliki 2 gambar dengan kueri media yang bersifat sama.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive">
</amp-img>
[/sourcecode]

Bergantung pada lebar layar, salah satu gambar atau gambar lainnya akan diambil dan dirender.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive">
</amp-img>
[/sourcecode]

