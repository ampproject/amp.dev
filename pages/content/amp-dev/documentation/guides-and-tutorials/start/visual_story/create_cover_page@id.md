---
'$title': Membuat halaman sampul
$order: 4
description: 'Untuk membuat sebuah halaman, tambahkan elemen <amp-story-page> sebagai anak (turunan pertama) amp-story. Berikan ID unik untuk halaman tersebut. Untuk halaman pertama kita, yang merupakan halaman sampul, kita berikan ID sampul yang unik: ....'
author: bpaduch
---

Sebuah halaman dalam Cerita Web diwakili oleh komponen `<amp-story-page>`. Dalam [`amp-story`](../../../../documentation/components/reference/amp-story.md), Anda dapat memiliki satu atau beberapa komponen `<amp-story-page>`, yang berisi setiap layar individual dari sebuah cerita. Halaman pertama yang Anda tentukan dalam urutan dokumen adalah halaman pertama yang ditampilkan dalam Cerita Web.

Untuk membuat sebuah halaman, **tambahkan** elemen `<amp-story-page>` sebagai anak (turunan pertama) [`amp-story`](../../../../documentation/components/reference/amp-story.md). **Berikan** ID unik untuk halaman tersebut. Untuk halaman pertama kita, yang merupakan halaman sampul, kita berikan ID `cover` yang unik:

```html
<amp-story
  standalone
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
  <amp-story-page id="cover"> </amp-story-page>
</amp-story>
```

Sekarang kita sudah memiliki cangkang (shell) untuk halaman sampul. Namun, artikel kita masih belum valid. Dalam halaman ini, kita harus menetapkan minimal satu **lapisan**. {{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='halaman sampul memiliki dua lapisan', align='right third' ) }}

## Lapisan-lapisan pada sebuah halaman

Sebagaimana lapisan pada grafis, Anda dapat menggunakan lapisan-lapisan pada halaman cerita AMP untuk menciptakan efek visual. Satu lapisan ditumpuk di atas lapisan lainnya, sehingga lapisan pertama menjadi lapisan terbawah, lapisan berikutnya ditumpuk di atas, begitu seterusnya.

Halaman sampul kita ini terdiri dari dua lapisan:

- **Lapisan ke-1**: Gambar yang berfungsi sebagai latar belakang
- **Lapisan ke-2**: Judul dan baris awal untuk cerita

### Membuat lapisan ke-1

Mari kita tambahkan lapisan pertama ke halaman sampul. Lapisan ini berisi gambar yang akan mengisi layar.

Buat lapisan ini dengan menambahkan elemen `<amp-story-grid-layer>` sebagai anak dari `<amp-story-page>`. Karena kita ingin gambar mengisi layar, tetapkan atribut `template="fill"` untuk `amp-story-grid-layer`. Di dalam lapisan ini, tambahkan elemen [`amp-img`](../../../../documentation/components/reference/amp-img.md) untuk berkas `cover.jpg`, dan pastikan responsif (yaitu, `layout="responsive"`) dengan dimensi gambar 720 x 1280 piksel. Beginilah tampilan lapisan ini:

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img
      src="assets/cover.jpg"
      width="720"
      height="1280"
      layout="responsive"
    >
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

Mari kita lihat tampilan halaman ini. Buka halaman ini di browser: <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

Seperti inilah hasilnya:

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### Membuat lapisan ke-2

Setelah membuat latar belakang, sekarang kita membuat lapisan kedua yang menindih latar belakang dan berisi judul dan baris awal. Untuk menambahkan lapisan kedua, kita akan melakukan langkah yang sama seperti saat membuat lapisan ke-1, namun sebagai pengganti templat `fill`, sekarang kita akan menggunakan templat **`vertical`**. Tetapi sebelum melangkah lebih jauh, mari kita pelajari tentang templat dan cara menyusun elemen AMP dan HTML dalam `<amp-story-grid-layer>`.

#### Mengatur tata letak elemen dengan templat

Elemen `<amp-story-grid-layer>` mengatur tata letak berbagai elemen anaknya dalam sebuah petak (didasarkan pada [petak atau kisi CSS](https://www.w3.org/TR/css-grid-1/)). Untuk mengarahkan pengaturan elemen anak tersebut, tentukan salah satu templat tata letak berikut ini:

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">Templat: Fill</h5></td>
</tr>
<tr>
    <td width="65%">Templat <strong>fill</strong> akan mengisi layar dengan elemen anak pertama pada lapisan ini. Elemen anak lainnya pada lapisan ini tidak ditampilkan. Templat fill berfungsi dengan baik untuk latar belakang, termasuk gambar dan video. <code><pre>&lt;amp-story-grid-layer template="fill"> &lt;amp-img src="https://github.com/ampproject/amp.dev/blob/future/pages/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/dog.png?raw=true" width="720" height="1280" layout="responsive"> &lt;/amp-img> &lt;/amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">Templat: Vertical</h5></td>
</tr>
<tr>
    <td width="65%">Templat <strong>vertikal</strong> menempatkan elemen anak di sepanjang sumbu y. Elemen-elemen ini sejajar dengan bagian atas layar, dan menguasai seluruh layar di sepanjang sumbu x. Templat vertikal bekerja dengan baik jika Anda menginginkan tumpukan elemen vertikal satu demi satu. <code><pre>&lt;amp-story-grid-layer template="vertical"> &lt;p>element 1&lt;/p> &lt;p>element 2&lt;/p> &lt;p>element 3&lt;/p> &lt;/amp-story-grid-layer></pre></code>
</td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">Templat: Horizontal</h5></td>
</tr>
<tr>
    <td width="65%">Templat <strong>horizontal</strong> menata elemen anak di sepanjang sumbu x. Elemen-elemen ini sejajar dengan bagian awal layar, dan memenuhi seluruh layar di sepanjang sumbu Y. Templat horizontal berfungsi dengan baik jika Anda ingin menumpuk elemen secara horizontal satu setelah yang lain. <code><pre>&lt;amp-story-grid-layer template="horizontal"> &lt;p>element 1&lt;/p> &lt;p>element 2&lt;/p> &lt;p>element 3&lt;/p> &lt;/amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">Templat: Third</h5></td>
</tr>
<tr>
<td width="65%">Templat <strong>sepertiga</strong> membagi layar menjadi tiga baris berukuran sama, dan memungkinkan Anda membagikan konten ke dalam masing-masing area. Anda juga dapat menentukan sebuah <code>grid-area</code> bernama untuk mengindikasikan bagian sepertiga mana yang ingin Anda jadikan tempat konten — <code>upper-third</code>, <code>middle-third</code>, atau <code>lower-third</code>. Area kisi yang memiliki nama berguna untuk mengubah perilaku standar terkait di mana elemen-elemen muncul. Contohnya: jika Anda mempunyai dua elemen pada lapisan tersebut, Anda dapat menentukan bahwa elemen pertama ditempatkan di dalam <code>grid-area="upper-third"</code> dan elemen kedua di dalam <code>grid-area="lower-third"</code>. <code><pre>&lt;amp-story-grid-layer template="thirds"> &lt;h1 grid-area="upper-third">element 1&lt;/h1> &lt;p grid-area="lower-third">element 2&lt;/p> &lt;/amp-story-grid-layer> </pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### Menyelesaikan halaman sampul kita

Setelah memahami templat lapisan, mari selesaikan lapisan kedua untuk halaman sampul kita.

Untuk lapisan ke-2, kita ingin elemen judul dan baris awal terlihat di atas, serta muncul satu setelah yang lain. Untuk itu, kita akan menetapkan templat `vertical`. Elemen `amp-story-grid-layer` kedua kita akan muncul setelah elemen pertama, seperti ini:

```html
<amp-story-grid-layer>
  <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

Segarkan browser dan lihat hasil kerja Anda. Halaman sampul kita sudah jadi.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Halaman sampul yang telah selesai' ) }}
