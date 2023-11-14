---
'$title': Menambahkan komponen AMP yang diperluas
$order: 2
description: 'Sistem komponen AMP memungkinkan Anda membuat fitur yang efisien dan responsif ke dalam artikel Anda dengan cepat dan mudah. Perpustakaan HTML AMP memiliki tiga klasifikasi untuk komponen AMP: ....'
---

Sistem komponen AMP memungkinkan Anda membuat fitur yang efisien dan responsif ke dalam artikel dengan cepat dan mudah. Perpustakaan HTML AMP memiliki tiga klasifikasi untuk komponen AMP:

- **bawaan**: Ini adalah komponen yang disertakan dalam perpustakaan JavaScript AMP dasar (yang ditentukan dalam tag `<head>`), seperti [`amp-img`](../../../../documentation/components/reference/amp-img.md) dan [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Komponen ini dapat digunakan langsung dalam dokumen AMP.

- **diperluas**: Ini adalah ekstensi perpustakaan dasar yang harus disertakan secara eksplisit di dalam dokumen sebagai elemen khusus. Elemen khusus memerlukan skrip tertentu yang ditambahkan ke bagian `<head>` (cth.: `<script async custom-element="`[`amp-video`](../../../../documentation/components/reference/amp-video.md)`...`).

- **eksperimental**: Ini adalah komponen yang dirilis, namun belum siap untuk digunakan secara luas. Pengembang dapat memilih untuk menggunakan fitur ini sebelum dirilis sepenuhnya. Pelajari lebih lanjut dalam [Fitur-fitur eksperimental](../../../../documentation/guides-and-tutorials/learn/experimental.md).

Sampel kita sudah menggunakan komponen bawaan, [`amp-img`](../../../../documentation/components/reference/amp-img.md), dan kita telah menelusuri bagaimana komponen terkait dengan sistem tata letak AMP dalam <a>"Mengonversi HTML menjadi AMP"</a>. Sekarang, mari tambahkan beberapa komponen AMP **diperpanjang** yang umum digunakan ke artikel berita kita.

## Monetisasi dengan iklan

Iklan di AMP dibuat dengan menggunakan komponen [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Komponen [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) memungkinkan Anda mengonfigurasi iklan dalam beberapa cara, seperti lebar, tinggi, dan mode tata letak. Namun, banyak platform iklan memerlukan konfigurasi tambahan, seperti ID akun untuk jaringan iklan, iklan mana yang akan ditayangkan, atau opsi untuk menargetkan iklan. Opsi ini dapat ditentukan dengan mudah di dalam komponen [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) dengan menggunakan atribut HTML.

Lihat contoh iklan **DoubleClick** ini:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static"
>
</amp-ad>
```

Seperti yang Anda lihat, konfigurasi ini sangatlah mudah. Perhatikan atribut `type`, yang menunjukkan komponen [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) dari platform iklan yang ingin kita gunakan. Dalam kasus ini, kita ingin menggunakan platform [DoubleClick](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md), sehingga kita menentukan `doubleclick` sebagai nilainya.

`data-slot` adalah atribut yang lebih unik. Dalam [`amp-ad`](../../../../documentation/components/reference/amp-ad.md), atribut apa pun yang diawali dengan `data-` adalah atribut khusus vendor. Artinya, tidak semua vendor akan memerlukan atribut khusus ini, dan tidak semua vendor pula akan merespons jika atribut tersebut disediakan. Contohnya: bandingkan contoh **DoubleClick** di atas dengan iklan pengujian berikut ini dari platform [A9](https://github.com/ampproject/amphtml/blob/main/ads/a9.md):

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

Coba **tambahkan** kedua contoh di atas ke dalam artikel tepat setelah tag `<header>`.

Perlu diingat, tidak semua komponen disertakan di dalam berkas JavaScript perpustakaan AMP inti. Kita perlu menyertakan permintaan JavaScript tambahan untuk komponen iklan tersebut.

**Tambahkan** skrip berikut ini ke tag `<head>`:

```html
<script
  async
  custom-element="amp-ad"
  src="https://ampjs.org/v0/amp-ad-0.1.js"
></script>
```

**Segarkan** halaman, maka Anda akan melihat dua iklan percobaan:

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Test ads') }}

[tip type="important"] **PENTING –** Mungkin memiliki ada beberapa eror pada konsol pengembang Anda, seperti `Mixed Content` atau `XMLHttpRequest cannot load`. Eror sebelumnya kemungkinan besar terkait dengan iklan A9 karena tidak semua konten yang dimuatnya aman. Ini adalah persyaratan penting untuk semua iklan yang ditayangkan di AMP. [/tip]

Dua [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) di bawah ini memberikan contoh fleksibilitas yang disediakan [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) untuk mendukung fitur platform iklan. Dalam kasus ini, kita telah mengonfigurasi (menggunakan dasbor DoubleClick) dua iklan percobaan DoubleClick agar hanya tampil di negara tertentu - yang pertama hanya akan tampil di Inggris dan yang kedua hanya akan tampil di AS. Coba **tambahkan** dua konfigurasi iklan penargetan-geo ini di dokumen AMP di bawah iklan yang telah Anda tambahkan sebelumnya:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk"
>
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us"
>
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

**Segarkan** halaman dan lihat. Tangkapan layar berikut ini diambil dari Kanada, jadi tidak ada iklan yang termuat:

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Test ads') }}

[tip type="note"] <strong>CATATAN –</strong> Anda mungkin mengetahui bahwa yang ada di dalam tag <a><code>amp-ad</code></a> ini adalah tag <code>div</code> tambahan dengan atribut yang diberi nama <code>fallback</code>. Dapatkah Anda menebak apa yang ditunjukkan oleh atribut <code>fallback</code>? Atribut ini memberi tahu sistem pemuatan AMP agar hanya menampilkan konten elemen tersebut saat elemen induk gagal dimuat. Pelajari lebih lanjut dalam <a>Bakal tempat & fallback</a>. [/tip]

[tip type="read-on"] **BACA –** Untuk melihat jaringan iklan terbaru yang didukung, bacalah dokumentasi referensi untuk komponen [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). [/tip]

[tip type="note"] **CATATAN –** Tidak ada JavaScript yang disediakan jaringan iklan yang diizinkan untuk berjalan di dalam dokumen AMP. Sebagai gantinya, runtime AMP memuat iframe dari asal yang berbeda (melalui sandbox iframe) sebagai dokumen AMP dan menjalankan JS jaringan iklan di dalam sandbox iframe tersebut. [/tip]

Dokumen AMP kita kini menyertakan teks, gambar, dan iklan yang disematkan di halaman, yang semuanya merupakan komponen penting untuk menyampaikan cerita dan memonetisasi konten Anda. Namun, situs modern sering kali menyertakan lebih banyak fungsi daripada sekadar gambar dan teks.

Tingkatkan dokumen AMP kita dan tambahkan fungsi web yang lebih canggih yang umumnya ditemukan di artikel berita, seperti:

- Video YouTube
- Tweet
- Kutipan artikel

## Menyematkan video YouTube

Mari kita coba menyematkan video YouTube ke dalam dokumen. **Tambahkan** kode berikut ini, tepat setelah `<header>` di dokumen AMP Anda (di atas [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) yang baru saja Anda tambahkan):

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270"
>
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

**Segarkan** halaman. Sebagai ganti video, Anda akan melihat teks ini: _"Video tidak dapat dimuat"._

Bahkan browser Anda dapat menampilkan video YouTube tanpa masalah, eror ini akan tetap muncul. Mengapa? Video tersebut sebenarnya tidak gagal dimuat, tetapi komponennya sendiri yang gagal.

Ingat, tidak semua komponen disertakan di dalam berkas JavaScript perpustakaan AMP inti. Kita perlu menyertakan permintaan JavaScript tambahan untuk komponen YouTube.

[tip type="note"] **CATATAN –** Jika konsol pengembang Anda masih terbuka dan `#development=1` di URL Anda, Anda akan melihat eror validator AMP pada tahap ini yang mengingatkan Anda untuk menambahkan JavaScript [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) dan tautan ke dokumentasi yang akan memberi tahu Anda tag `script` yang perlu ditambahkan. [/tip]

**Tambahkan** skrip berikut ini ke tag `<head>`:

```html
<script
  async
  custom-element="amp-youtube"
  src="https://ampjs.org/v0/amp-youtube-0.1.js"
></script>
```

**Segarkan** halaman, maka Anda akan melihat video YouTube tersebut:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Video YouTube yang Disematkan') }}

Seperti elemen lain di halaman, kita menentukan `width` dan `height` video sehingga sistem tata letak AMP dapat menghitung rasio aspek. Selain itu, kita mengatur `layout` menjadi `responsive`, sehingga video memenuhi lebar elemen induknya.

Untuk mempelajari lebih lanjut tentang menyematkan video YouTube, bacalah dokumentasi komponen [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md). Untuk komponen video dan media lainnya, lihat [daftar komponen AMP media](../../../../documentation/components/index.html#media).

[tip type="tip"] **KIAT –** Gunakan atribut [`fallback`](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md#fallbacks) untuk memberi tahu pengguna jika ada komponen yang gagal dimuat atau jika komponen tidak didukung di browser mereka. [/tip]

## Menampilkan Tweet

Menyematkan tweet yang telah diformat sebelumnya dari Twitter adalah fitur umum dalam artikel berita. Komponen [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) dapat menyediakan fungsionalitas ini dengan mudah.

Mulailah dengan menambahkan permintaan JavaScript berikut ini ke tag `<head>` dokumen Anda:

```html
<script
  async
  custom-element="amp-twitter"
  src="https://ampjs.org/v0/amp-twitter-0.1.js"
></script>
```

Di artikel Anda, **tambahkan** kode ini untuk menyematkan Tweet:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985"
>
</amp-twitter>
```

Atribut `data-tweetid` adalah contoh lain dari atribut kustom yang dibutuhkan oleh platform tertentu. Dalam hal ini, Twitter menghubungkan nilai atribut `data-tweetid` ke Tweet tertentu.

**Segarkan** browser Anda dan lihat halamannya. Anda akan melihat Tweet tersebut muncul:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Tweet yang Disematkan') }}

Untuk mempelajari lebih lanjut tentang menyematkan Tweet Twitter, bacalah dokumentasi komponen [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

[tip type="tip"] **KIAT –** AMP menyediakan lebih banyak komponen untuk menyematkan konten dari jaringan sosial. Lihat [komponen AMP sosial](../../../../documentation/components/index.html#social) terbaru. [/tip]

## Menyorot kutipan artikel

Fitur umum dalam artikel berita adalah menyoroti cuplikan teks yang sangat menarik dari artikel tersebut. Contoh: kutipan dari sumber tertentu atau fakta penting mungkin diulangi dalam font yang lebih besar untuk menarik perhatian pembaca.

Namun, tidak semua cuplikan teks memiliki panjang karakter yang sama, dan ini dapat menyulitkan untuk menyeimbangkan ukuran font yang lebih besar dengan jumlah ruang yang digunakan teks pada halaman tersebut.

AMP menyediakan komponen lain yang dirancang khusus untuk jenis situasi ini, disebut komponen [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md). Komponen [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) memungkinkan Anda untuk menentukan elemen lebar dan tinggi tetap, dan ukuran font maksimum. Komponen ini secara cerdas menskalakan ukuran font agar **pas** dengan teks dalam lebar dan tinggi yang tersedia.

Mari kita coba. Pertama, **tambahkan** perpustakaan komponen ke tag `<head>`:

```html
<script
  async
  custom-element="amp-fit-text"
  src="https://ampjs.org/v0/amp-fit-text-0.1.js"
></script>
```

Tambahkan yang berikut ini ke halaman Anda:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**Segarkan** halaman dan lihat hasilnya!

Sekarang, ayo bereksperimen lebih jauh. Apa yang terjadi jika kutipannya jauh lebih pendek?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

Atau, bagaimana jika kutipannya lebih panjang?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  And the Raven, never flitting, still is sitting, still is sitting. On the
  pallid bust of Pallas just above my chamber door; And his eyes have all the
  seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming
  throws his shadow on the floor; And my soul from out that shadow that lies
  floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

Sebagai eksperimen terakhir dengan [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md), coba buat teks pendek, seperti, "Halo," yang jauh lebih tinggi (misalnya, sebesar 400), dan pertahankan nilai atribut max-font-size sebesar 42. Seperti apa tampilan halaman yang dihasilkan? Apakah teks sudah berada di tengah secara vertikal? Atau, apakah tinggi tag [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) menyusut agar sesuai dengan ukuran font maks? Berbekal informasi yang sudah Anda ketahui tentang sistem tata letak AMP, coba cari tahu jawaban dari pertanyaan di atas sebelum mengutak-atik kode!

Anda dapat mempelajari lebih lanjut tentang [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) dari [Demo langsung AMP berdasarkan Contoh](../../../../documentation/examples/documentation/amp-fit-text.html).
