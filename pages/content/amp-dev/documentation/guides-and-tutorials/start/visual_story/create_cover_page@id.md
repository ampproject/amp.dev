---
$title: Membuat halaman sampul
---

[TOC]

Halaman dalam artikel AMP diwakili oleh komponen `<amp-story-page>`. Dalam `<amp-story>`, Anda bisa memiliki satu atau beberapa komponen `<amp-story-page>`, yang masing-masing berisi layar individual dari sebuah artikel. Halaman pertama yang Anda tetapkan dalam urutan dokumen akan menjadi halaman pertama yang ditampilkan dalam artikel tersebut.

Untuk membuat halaman, **tambahkan** elemen `<amp-story-page>` sebagai turunan dari `amp-story`. **Tetapkan** ID unik untuk halaman itu. Untuk halaman pertama, yang merupakan halaman sampul, mari kita tetapkan ID unik yaitu `cover`:

```html hl_lines="6 7"
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
   <amp-story-page id="cover">
   </amp-story-page>
</amp-story>
```

Sekarang kita sudah memiliki kerangka untuk halaman sampul. Namun artikel kita masih belum valid.  Dalam halaman ini, kita harus menetapkan minimal satu **lapisan**.
{{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='halaman sampul memiliki dua lapisan', align='right third' ) }}

## Lapisan pada sebuah halaman

Sebagaimana lapisan pada gambar, Anda dapat menggunakan lapisan pada halaman artikel AMP untuk membuat efek visual. Lapisan ditumpuk satu di atas yang lain, sehingga lapisan pertama menjadi lapisan terbawah, yang di atasnya terdapat lapisan berikutnya, begitu seterusnya.

Halaman sampul kita ini terdiri dari dua lapisan:

* **Lapisan 1**: Gambar yang berfungsi sebagai tampilan latar
* **Lapisan 2**: Judul dan subjudul artikel

### Membuat lapisan 1

Mari kita tambahkan lapisan pertama ke halaman sampul. Lapisan ini berisi gambar yang akan mengisi layar.

Buat lapisan ini dengan menambahkan elemen `<amp-story-grid-layer>` sebagai turunan dari `<amp-story-page>`. Karena kita ingin gambar mengisi layar, tetapkan atribut `template="fill"` untuk `amp-story-grid-layer`. Di dalam lapisan ini, tambahkan elemen `<amp-image>` untuk file `cover.jpg`, dan pastikan responsif (artinya, `layout="responsive"`) dengan gambar berukuran 720 x 1280 piksel.  Beginilah tampilan lapisan kita:

```html hl_lines="2 3 4 5 6 7"
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img src="assets/cover.jpg"
        width="720" height="1280"
        layout="responsive">
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

Mari kita lihat bagaimana halaman ini ditampilkan.  Buka halaman ini di browser: <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

Seperti inilah hasilnya:

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### Membuat lapisan 2

Setelah membuat tampilan latar, sekarang kita ingin membuat lapisan kedua yang menindih tampilan latar dan berisi judul dan subjudul.  Untuk menambahkan lapisan kedua, kita akan melakukan langkah yang sama seperti saat membuat lapisan 1, namun sebagai pengganti template `fill`, sekarang kita akan menggunakan template **`vertical`**. Namun, sebelum melangkah lebih jauh, mari kita pelajari tentang template dan cara menyusun elemen AMP dan HTML di `<amp-story-grid-layer>`.

#### Mengatur tata letak elemen dengan template

Elemen `<amp-story-grid-layer>` mengatur tata letak berbagai elemen turunannya dalam sebuah petak (didasarkan pada [petak CSS](https://www.w3.org/TR/css-grid-1/)).  Untuk menunjukkan cara pengaturan elemen turunan tersebut, tentukan salah satu template tata letak berikut:

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">Template: Fill</h5></td>
</tr>
<tr>
    <td width="65%">Template <strong>fill</strong> akan mengisi layar dengan elemen turunan pertama pada lapisan ini. Elemen turunan lainnya tidak ditampilkan.

    <p>Template fill berfungsi dengan baik untuk latar belakang, termasuk gambar dan video.</p>
   <code class="nopad"><pre>&lt;amp-story-grid-layer template="fill">
  &lt;amp-img src="dog.png"
      width="720" height="1280"
      layout="responsive">
  &lt;/amp-img>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>
    {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">Template: Vertical</h5></td>
</tr>
<tr>
    <td width="65%">Template <strong>vertical</strong> menata elemen turunan di sepanjang sumbu Y. Elemen ini sejajar dengan bagian atas layar, dan memenuhi seluruh layar di sepanjang sumbu X.

    <p>Template vertical berfungsi dengan baik jika Anda ingin menumpuk elemen secara vertikal satu di atas yang lain.</p>

   <code class="nopad"><pre>&lt;amp-story-grid-layer template="vertical">
  &lt;p>element 1&lt;/p>
  &lt;p>element 2&lt;/p>
  &lt;p>element 3&lt;/p>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">Template: Horizontal</h5></td>
</tr>
<tr>
    <td width="65%">Template <strong>horizontal</strong> menata elemen turunan di sepanjang sumbu X.  Elemen ini sejajar dengan bagian awal layar, dan memenuhi seluruh layar di sepanjang sumbu Y.

    <p>Template horizontal berfungsi dengan baik jika Anda ingin menumpuk elemen secara horizontal satu di sebelah yang lain.</p>

    <code class="nopad"><pre>&lt;amp-story-grid-layer template="horizontal">
  &lt;p>element 1&lt;/p>
  &lt;p>element 2&lt;/p>
  &lt;p>element 3&lt;/p>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>
    {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">Template: Thirds</h5></td>
</tr>
<tr>
<td width="65%">
Template <strong>thirds</strong> membagi layar menjadi tiga area berjarak sama, yang masing-masing dapat Anda isi dengan konten.

<p>Anda juga dapat menetapkan <code>grid-area</code> (area petak) bernama untuk menunjukkan area pertiga yang ingin Anda isi konten: <code>upper-third</code> (pertiga atas), <code>middle-third</code> (pertiga tengah), atau <code>lower-third</code> (pertiga bawah). Area petak bernama berguna untuk mengubah perilaku default dari tempat dimunculkannya elemen.  Sebagai contoh, jika memiliki dua elemen pada lapisan, Anda bisa menetapkan elemen pertama sebagai <code>grid-area="upper-third"</code> dan elemen kedua sebagai <code>grid-area="lower-third"</code>.</p>

<code class="nopad"><pre>&lt;amp-story-grid-layer template="thirds">
  &lt;h1 grid-area="upper-third">element 1&lt;/h1>
  &lt;p grid-area="lower-third">element 2&lt;/p>
&lt;/amp-story-grid-layer>
</pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### Menyelesaikan halaman sampul kita

Setelah memahami template lapisan, sekarang mari selesaikan lapisan kedua untuk halaman sampul kita.

Untuk lapisan 2, kita ingin elemen judul dan subjudul terlihat di atas, serta muncul satu setelah yang lain. Untuk itu, kita akan menetapkan template `vertical`. Elemen `amp-story-grid-layer` kedua kita akan muncul setelah elemen pertama, seperti ini:

```html hl_lines="4 5 6 7"
<amp-story-grid-layer>
 <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

Refresh browser dan lihat hasil kerja Anda.  Halaman sampul kita sudah jadi.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Halaman sampul jadi' ) }}

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/add_more_pages.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>
