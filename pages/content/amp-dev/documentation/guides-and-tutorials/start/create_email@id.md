---
'$title': Membuat Email AMP pertama Anda
$order: 0
description: Pelajari apa yang membuat email AMP berbeda dengan membuat email pertama Anda.
tutorial: 'true'
formats:
  - email
author: CrystalOnScript
---

AMP untuk Email memungkinkan pengirim email menggunakan AMP di dalam pesan email mereka untuk mendukung seluruh host fitur baru. Email yang ditulis dengan AMP dapat berisi elemen interaktif, seperti korsel gambar atau akordeon, konten tetap terkini di dalam pesan, dan kemampuan bagi penerima untuk mengambil tindakan, seperti menanggapi sebuah formulir, semua ini tanpa keluar dari kotak masuk pesan.

AMP untuk Email kompatibel dengan email yang sudah ada. Versi AMP pesan disematkan ke dalam email sebagai bagian MIME yang baru, sebagai tambahan HTML dan teks polos, ini memastikan kompatibilitas di semua klien surat.

Untuk mengetahui daftar platform email (ESP), klien, dan penyedia yang mendukung AMP untuk Email, kunjungi [Platform Email yang Didukung](../../../support/faq/email-support.md) di dalam T&J.

Ikuti tutorial ini untuk membuat dan mengirimkan email dinamis pertama Anda yang didukung oleh AMP. Anda dapat melihat kode yang sudah selesai [di sini](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73).

# Memulai dengan boilerplate email AMP

AMP Playground mendukung format AMP untuk Email, sehingga memungkinkan Anda untuk mengembangkan, menguji, dan memvalidasi Email AMP Anda. Buka [AMP Playground](https://playground.amp.dev/?runtime=amp4email) dan pastikan bahwa format sudah diatur ke `AMP for Email` pada sudut kiri atas. Anda akan melihat kode berikut ini:

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://ampjs.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <style amp-custom>
      h1 {
        margin: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Hello, I am an AMP EMAIL!</h1>
  </body>
</html>
```

Ini berisi semua kode minimum dan markah yang diperlukan untuk menjadi email AMP yang valid. Selain itu, perhatikan juga berbagai contoh templat email valid lain pada daftar tarik di kanan atas menu tarik.

Mari kita luangkan waktu untuk mempelajari perbedaan besar dari email HTML klasik:

- Email AMP harus mengidentifikasi diri sendiri dengan menyertakan `⚡4email` atau `amp4email`, pada tag HTML.
- Tag `<head>` juga harus berisi tag `<script>` yang memuat runtime AMP. `<script async src="https://ampjs.org/v0.js"></script>`
- Sebuah boilerplate CSS awalnya akan menyembunyikan konten hingga AMP dimuat. ` <style amp4email-boilerplate>body{visibility:hidden}</style>`

Jika Anda pernah mengerjakan email, ide untuk menempatkan skrip ke dalam email mungkin membuat Anda tegang! Tenang, penyedia email yang mendukung email AMP menerapkan pemeriksaan keamanan yang ketat yang hanya mengizinkan skrip AMP yang telah diperiksa untuk berjalan di klien mereka. Ini memungkinkan fitur-fitur interaktif dan dinamis untuk berjalan secara langsung di dalam kotak surat penerima tanpa kerentanan keamanan! Baca lebih lanjut tentang markah yang diperlukan untuk Email AMP di sini.

[tip type="important"] Hanya skrip AMP untuk [komponen yang didukung](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) yang dapat disertakan di dalam Email AMP. [/tip]

# Menyertakan gambar

Kebanyakan tag HTML yang digunakan di dalam email dapat digunakan di dalam email AMP. Namun, beberapa tag, seperti tag `<img>` diganti dengan yang setara AMP, [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md).

Tag `<amp-img>` mengharuskan lebar dan tinggi gambar ditentukan, dan tidak seperti `<img>`, `<amp-img>` harus secara jelas ditutup melalui `</amp-img>`.

```html
<amp-img
  src="https://link/to/img.jpg"
  alt="photo description"
  width="100"
  height="100"
>
</amp-img>
```

Selain itu, berkas GIF didukung melalui [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md).

Karena email tidak dikelola di server Anda, URL harus menggunakan jalur mutlak di dalam email AMP dan harus berupa HTTPS.

[Placekitten](https://placekitten.com/) adalah situs web yang menggunakan gambar anak kucing sebagai bakal tempat. Mereka mengizinkan Anda untuk memilih ukuran gambar secara langsung di URL!

Kita dapat menyertakan gambar di dalam email pertama kita dengan menambahkan kode di bawah ini.

```html
<body>
  <amp-img
    src="https://placekitten.com/800/400"
    alt="Welcome"
    width="800"
    height="400"
  >
  </amp-img>
</body>
```

## Menjadikan responsif

Email dilihat di berbagai perangkat dan ukuran layar, dan AMP dilengkapi dengan sistem tata letak bawaan! Dengan kueri media dan sistem [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md), menerapkan email responsif adalah hal mudah. Untuk mengatur ukuran gambar anak kucing yang ditempatkan agar sesuai layar, tambahkan atribut `layout="responsive"` ke `<amp-image>` Anda.

[tip type="read-on"] [Bacalah lebih lanjut tentang cara kerja AMP dengan kueri media dan tata letak](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

Perbesar dan perkecil jendela browser untuk melihat perubahan ukuran gambar! Lihat [daftar komponen yang spesifik untuk tata letak yang didukung di sini](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout).

# Memodifikasi presentasi dan tata letak

Satu gambar bukan masalah, namun bagaimana jika kita ingin menampilkan lebih banyak? AMP untuk Email mendukung elemen tata letak, seperti akordeon dan bilah samping.

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

Untuk tutorial ini, kita akan menggunakan [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md) untuk menampilkan foto-foto kucing yang tersedia untuk diadopsi.

Tambahkan skrip `amp-carousel` ke tajuk email Anda.

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
```

Lalu, bungkus gambar pertama kita di dalam tag `<amp-carousel>`.

```html
<amp-carousel layout="responsive" width="800" height="400" type="slides">
  <amp-img
    layout="fill"
    src="https://placekitten.com/800/400"
    alt="Welcome"
    height="400"
    width="800"
  ></amp-img>
</amp-carousel>
```

Anda mungkin tidak melihat ada yang berubah, dan itu adalah hal yang bagus! Korsel kita telah diberikan atribut `type=slides`, artinya, akan menampilkan foto satu per satu. Karena kita hanya menempatkan satu foto di dalam tag, itu tidak memberi pengguna tanda panah penggeser.

Selanjutnya, ganti gambar anak kucing dengan kucing AMP kita yang siap untuk diadopsi di dalam `<amp-carousel>` Anda.

```html
<amp-carousel
  id="carousel-with-preview"
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({currentCat: event.index})"
>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
</amp-carousel>
```

Kini, Anda akan bisa mengubah foto dengan mengeklik tanda panah navigasi pada sisi kiri atau kanan korsel!

## Mengirimkan dengan gaya

AMP mengizinkan penataan gaya pada tajuk dokumen di dalam tag `<style amp-custom>`. Selain itu, kelas dan kelas semu CSS yang sebelumnya dilarang kini dapat digunakan. [Bacalah daftar lengkapnya di sini](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

Mari kita perbarui `Hello, AMP4EMAIL world` ke judul asli.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

Lalu, tambahkan beberapa gaya ke dalam tajuk.

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# Menambahkan Kemampuan Dinamis

Pada dasarnya, email hanya mengizinkan konten statis. Melalui AMP, email menjadi terbuka untuk dunia peluang yang benar-benar baru! Pengguna kini dapat menanggapi [formulir](/content/amp-dev/documentation/components/reference/amp-form.md), mendapatkan [daftar konten yang diperbarui secara dinamis](/content/amp-dev/documentation/components/reference/amp-list.md), dan berinteraksi dengan konten.

Di dalam tutorial ini, kita akan menggunakan [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md) untuk menampilkan nama kucing kita yang bisa diadopsi dan deskripsi ketika pengguna berada pada slide kucing tersebut. Mulailah dengan menyertakan skrip `amp-bind` dalam tajuk email Anda.

```html
<script
  async
  custom-element="amp-bind"
  src="https://ampjs.org/v0/amp-bind-0.1.js"
></script>
```

Selanjutnya, kita akan menyatakan variabel pengikat AMP "myState" sebagai untai JSON di dalam tag [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state). Karena kita mempunyai empat foto kucing, kita akan menyertakan status untuk keempat kucing tersebut.

```html
<body>
  <amp-state id="myState">
    <script type="application/json">
      {
        "cats": [
          {
            "name": "Aakash",
            "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
          },
          {
            "name": "Filip",
            "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
          },
          {
            "name": "Julian",
            "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
          },
          {
            "name": "John",
            "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
          }
        ]
      }
    </script>
  </amp-state>
</body>
```

[Peristiwa dan tindakan AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md) memicu status yang berbeda. Di dalam kasus ini, kita ingin memperbarui status ketika pengguna mengeklik tanda panah navigasi korsel. amp-carousel memicu sebuah peristiwa [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides) dengan itu kita akan memperbarui variabel `currentCat` dengan menggunakan `AMP.setState`.

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({ currentCat: event.index} )"
>
  ...
</amp-carousel>
```

Kode ini menetapkan status `currentCat` agar sesuai dengan foto kucing pada indeks korsel. Jadi, jika kita berada pada slide `event.index=2`, status akan memetakan ke item pada indeks 2 susunan.

Satu-satunya yang tersisa adalah menampilkan nama dan deskripsi kucing kita. Tambahkan kode berikut ini di bawah `amp-carousel` penutup.

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

Ekstensi `amp-bind` menggunakan [ekspresi](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) dan [ikatan](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings) untuk mengubah konten secara dinamis. Contoh kode di atas menggunakan `[text]` yang terikat untuk memperbarui teks dalam tag `<span>` setiap kali status berubah dengan mengevaluasi ekspresi `"myState.cats[currentCat].name"`.

[tip type="note"] Demi kinerja dan untuk menghindari risiko loncatan konten di luar dugaan, amp-bind tidak mengevaluasi ekspresi pada pemuatan halaman. Ini berarti bahwa elemen visual harus diberikan status default dan tidak mengandalkan amp-bind untuk perenderan awal. [/tip]

Jangan lupa untuk menambahkan deskripsi kucing kita setelah tag `</div>`!

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

Setelah Anda mengubah foto kucing di dalam korsel, nama dan deskripsi mereka juga akan diperbarui!

# Mengirimkan email AMP Anda

Untuk mempelajari cara mengirimkan email Anda ke kotak masuk Anda, [baca lebih lanjut tentang menguji email AMP](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

Selamat! Anda telah mengirimkan email AMP pertama Anda!

Untuk langkah-langkah berikutnya, [baca lebih lanjut tentang dasar-dasar AMP untuk Email](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md).
