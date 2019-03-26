---
$title: Menambahkan komponen AMP yang diperpanjang
---

Sistem komponen AMP memungkinkan Anda membuat fitur yang efisien dan responsif ke dalam artikel dengan cepat dan mudah. Koleksi HTML AMP memiliki 3 klasifikasi komponen AMP:

- **bawaan**: Ini adalah komponen yang disertakan dalam koleksi JavaScript AMP dasar (yang ditentukan dalam tag `<head>`), seperti [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) dan [`amp-pixel`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-pixel.md', locale=doc.locale).url.path}}).  Komponen ini dapat digunakan langsung dalam dokumen AMP.

- **diperpanjang**: Ini adalah ekstensi koleksi dasar yang harus disertakan secara eksplisit di dalam dokumen sebagai elemen khusus.  Elemen khusus memerlukan skrip tertentu yang ditambahkan ke bagian `<head>` (misalnya, `<script async custom-element="amp-video" ...`).

- **eksperimental**: Ini adalah komponen yang dirilis, namun belum siap untuk digunakan secara luas. Developer dapat memilih untuk menggunakan fitur ini sebelum dirilis sepenuhnya.  Pelajari lebih lanjut di [Fitur eksperimental]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/experimental.md', locale=doc.locale).url.path}}).

Sampel kami sudah menggunakan komponen bawaan, [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}).  Sekarang, mari tambahkan beberapa komponen AMP **diperpanjang** yang umum digunakan di artikel berita.

## Monetisasi dengan iklan

Iklan di AMP dibuat menggunakan komponen [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}). Komponen [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) memungkinkan Anda mengonfigurasi iklan dalam beberapa cara, seperti lebar, tinggi, dan mode tata letak. Namun, banyak platform iklan memerlukan konfigurasi tambahan, seperti ID akun untuk jaringan iklan, iklan mana yang akan ditayangkan, atau opsi untuk menargetkan iklan. Opsi ini dapat ditentukan dengan mudah di dalam komponen [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) dengan menggunakan atribut HTML.

Lihat contoh iklan **DoubleClick** ini:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static">
</amp-ad>
```

Seperti yang Anda lihat, konfigurasi ini sangatlah mudah. Perhatikan atribut `type`, yang menunjukkan komponen [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) dari platform iklan yang ingin kami gunakan. Dalam kasus ini, kami ingin menggunakan platform [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md), sehingga kami menentukan `doubleclick` sebagai nilainya.

`data-slot` adalah atribut yang lebih unik. Dalam [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}), atribut apa pun yang diawali dengan  `data-` adalah atribut khusus vendor. Artinya, tidak semua vendor akan memerlukan atribut khusus ini, dan tidak semua vendor pula akan merespons jika atribut tersebut disediakan. Misalnya, bandingkan contoh **DoubleClick** di atas dengan iklan pengujian berikut dari platform [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md):

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302">
</amp-ad>
```

Coba **tambahkan** kedua contoh di atas ke dalam artikel tepat setelah tag `<header>`. **Refresh** halaman dan Anda akan melihat 2 iklan pengujian:

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Iklan pengujian') }}

Penting: Anda mungkin menemukan beberapa error di konsol developer, seperti `Konten Campuran` atau `XMLHttpRequest tidak dapat dimuat`. Error yang pertama kemungkinan berkaitan dengan iklan A9 karena tidak semua konten yang dimuat aman. Ini adalah persyaratan penting untuk semua iklan yang ditayangkan di AMP.

Dua [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) di bawah memberikan contoh fleksibilitas yang dimiliki [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) untuk mendukung fitur platform iklan.  Dalam kasus ini, kami telah mengonfigurasi (menggunakan dasbor DoubleClick) 2 iklan pengujian DoubleClick agar hanya ditampilkan di negara tertentu--pengujian pertama hanya akan ditampilkan di Inggris Raya dan pengujian kedua hanya akan ditampilkan di Amerika Serikat.  Coba **tambahkan** 2 konfigurasi iklan penargetan-geo ini dalam dokumen AMP di bawah iklan yang Anda tambahkan sebelumnya:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk">
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us">
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

**Refresh** halaman dan lihat hasilnya. Screenshot berikut diambil dari Kanada, sehingga tidak ada iklan yang dimuat:

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Iklan pengujian') }}

Catatan: Anda mungkin mengetahui bahwa yang ada dalam tag [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) ini adalah tag `div` tambahan dengan atribut yang diberi nama `fallback`. Dapatkah Anda menebak apa yang ditunjukkan oleh atribut `fallback`? Atribut ini memberi tahu sistem pemuatan AMP agar hanya menampilkan konten elemen tersebut saat elemen induk gagal dimuat. Pelajari lebih lanjut di [Placeholder & fallback]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}).

Baca lebih lanjut: Untuk melihat jaringan iklan yang didukung baru-baru ini, baca dokumentasi referensi untuk komponen [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}).

Catatan: Tidak ada JavaScript yang disediakan jaringan iklan yang diizinkan untuk dijalankan di dalam dokumen AMP. Sebagai gantinya, AMP runtime memuat iframe dari asal yang berbeda (melalui sandbox iframe) sebagai dokumen AMP dan menjalankan JavaScript jaringan iklan dalam sandbox iframe tersebut.

Dokumen AMP kami kini menyertakan teks, gambar, dan iklan yang disematkan di halaman, yang semuanya merupakan komponen utama untuk menceritakan kisah dan memonetisasi konten Anda. Namun, situs modern sering kali menyertakan lebih banyak fungsi daripada sekadar gambar dan teks.

Tingkatkan dokumen AMP dan tambahkan fungsi web lanjutan lainnya yang umumnya ditemukan di artikel berita, seperti:

- Video YouTube
- Tweet
- Kutipan artikel

##  Menyematkan video YouTube
Coba sematkan video YouTube ke dalam dokumen. **Tambahkan** kode berikut tepat setelah `<header>` di dokumen AMP (di atas [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) yang baru ditambahkan):

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270">
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

**Refresh** halaman. Video tidak akan muncul, dan Anda akan melihat teks ini: *“Video tidak dapat dimuat.”*

Meskipun browser dapat menampilkan video YouTube tanpa masalah, Anda masih akan mengalami error ini. Mengapa demikian? Video sebenarnya belum gagal dimuat, melainkan komponennya yang gagal dimuat.

Perlu diingat, tidak semua komponen disertakan dalam file JavaScript koleksi AMP dasar. Kami perlu menyertakan permintaan JavaScript tambahan untuk komponen YouTube.

Catatan: Jika konsol developer masih terbuka dan `#development=1` masih ada di dalam URL, pada saat ini Anda akan melihat error validator AMP yang mengingatkan Anda untuk menambahkan JavaScript [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}) dan link ke dokumentasi yang akan menunjukkan tag `script` yang akan ditambahkan.

**Tambahkan** skrip berikut ke tag `<head>`:

```html
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

**Refresh** halaman dan Anda akan melihat video YouTube:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Video YouTube yang disematkan') }}

Seperti elemen lainnya di halaman, kami menentukan `lebar` dan `tinggi` video, sehingga sistem tata letak AMP dapat menghitung rasio tinggi lebar. Selain itu, kami menyetel `tata letak` menjadi `responsif`, sehingga video akan mengisi lebar elemen induknya.

Untuk mempelajari lebih lanjut tentang menyematkan video YouTube, baca dokumentasi komponen [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}).

Tips: Gunakan atribut [`fallback`]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}#fallbacks) untuk memberi tahu pengguna jika ada komponen yang gagal dimuat atau jika komponen tersebut tidak didukung di browser mereka.

## Menampilkan Tweet
Menyematkan tweet yang telah diformat sebelummnya dari Twitter merupakan fitur umum dalam artikel berita. Komponen [`amp-twitter`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}) dapat memberikan fungsi ini dengan mudah.

Mulai dengan menambahkan permintaan JavaScript berikut ke tag `<head>` di dokumen Anda:

```html
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
```

Sekarang, **tambahkan** kode ini untuk menyematkan Tweet di artikel Anda:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```

Atribut `data-tweetid` adalah contoh lain dari atribut khusus yang diperlukan oleh platform tertentu. Dalam hal ini, Twitter menghubungkan nilai atribut `data-tweetid` ke Tweet tertentu.

**Refresh** browser dan lihat halaman. Anda akan melihat Tweet:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Tweet yang disematkan') }}

Untuk mempelajari lebih lanjut tentang menyematkan Tweet dari Twitter, baca dokumentasi komponen [`amp-twitter`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}).

Tips: AMP memberikan lebih banyak komponen untuk menyematkan konten dari jaringan sosial. Lihat [komponen AMP sosial]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}) terbaru.

## Menandai kutipan artikel

Fungsi fitur umum dalam artikel berita adalah untuk menandai cuplikan teks yang sangat menarik dari artikel. Misalnya, kutipan dari sumber tertentu atau fakta penting dapat diulang dalam font yang lebih besar guna menarik perhatian pembaca.

Namun, tidak semua cuplikan teks memiliki panjang karakter yang sama. Hal itu dapat mempersulit penyeimbangan font yang lebih besar dengan ruang yang digunakan teks di halaman.

AMP menyediakan komponen lain yang didesain khusus dalam situasi semacam ini, yang disebut komponen [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}). Komponen [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) memungkinkan Anda menentukan elemen lebar dan tinggi yang tetap, dan ukuran font maksimum. Komponen ini dengan cerdas mengubah ukuran font agar teks **sesuai** dengan lebar dan tinggi yang tersedia.

Cobalah. **Tambahkan** koleksi komponen ke tag `<head>` terlebih dahulu:

```html
<script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
```

Tambahkan hal berikut ke halaman Anda:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**Refresh** halaman dan lihat hasilnya.

Sekarang, lakukan eksperimen lebih lanjut. Apa yang terjadi jika kutipannya jauh lebih pendek?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

Atau, apa yang terjadi jika kutipannya lebih panjang?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
   And the Raven, never flitting, still is sitting, still is sitting. On the pallid bust of Pallas just above my chamber door; And his eyes have all the seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming throws his shadow on the floor; And my soul from out that shadow that lies floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

Sebagai eksperimen terakhir dengan [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}), coba buat teks pendek,  seperti "Halo" yang jauh lebih tinggi (misalnya, sebesar 400), dan pertahankan nilai atribut max-font-size sebesar 42. Seperti apa tampilan halaman yang dihasilkan? Apakah teks sudah berada di tengah secara vertikal? Atau, apakah tinggi tag [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) menyusut agar sesuai dengan ukuran font maks? Berbekal informasi yang sudah Anda ketahui tentang sistem tata letak AMP, coba cari tahu jawaban dari pertanyaan di atas sebelum mengutak-atik kode.

Anda dapat mempelajari lebih lanjut tentang [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) dari [Demo langsung AMP by Example]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-fit-text.html', locale=doc.locale).url.path}}).
