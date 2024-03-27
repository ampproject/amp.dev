---
'$title': Dasar-Dasar AMP untuk Email
$order: 1
description: Semua yang perlu Anda ketahui untuk mulai menulis Email AMP yang valid.
author: CrystalOnScript
formats:
  - email
---

Jika Anda akrab dengan AMP, ada kabar baik! AMP untuk Email hanyalah sebagian kecil dari perpustakaan HTML AMP. Jika Anda tidak akrab dengan AMP, ada kabar baik juga! Panduan ini akan menyediakan semua yang Anda butuhkan untuk bisa memulai menulis Email AMP yang valid!

## Penambahan yang Diperlukan

Email AMP terlihat seperti email HTML klasik, tetapi dengan sedikit perbedaan. Di bawah ini adalah jumlah penambahan minimum yang diperlukan untuk membuat sebuah email menjadi email AMP yang valid.

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
  </head>
  <body>
    Hello, AMP4EMAIL world.
  </body>
</html>
```

Penyedia email yang mendukung Email AMP telah mengatur pemeriksaan keamanan untuk memastikan pengguna mendapatkan pengalaman yang menyenangkan dan aman. Sebuah email yang dibuat dengan AMP harus memenuhi semua persyaratan:

- Dimulai dengan jenis dokumen `<!doctype html>`. Ini juga standar untuk HTML.
- Berisi tag `<html amp4email>` tingkat atas, atau tag `<html ⚡4email>` jika email Anda ekstra mantap. Ini mengidentifikasi dokumen sebagai Email AMP, jadi dapat diperlakukan seperti itu.
- Tentukan tag `<head>` dan `<body>`. Ini bersifat pilihan di dalam HTML, namun AMP mempertahankan semuanya tetap murni!
- Disertai tag `<meta charset="utf-8>` sebagai anak atau turunan pertama dari tag `<head>`. Ini mengidentifikasi pengodean untuk halaman.
- Perpustakaan AMP diimpor melalui sebuah tag `<script async src="https://ampjs.org/v0.js"></script>` yang ditempatkan di dalam `<head>`. Tanpanya, fungsionalitas mengagumkan dan dinamis yang diraih melalui AMP tidak akan berfungsi! Sebagai praktik terbaik, ini seharusnya disertakan sedini mungkin di dalam `<head>`, langsung di bawah tag `<meta charset="utf-8">`.
- Pada awalnya, sembunyikan konten email hingga perpustakaan AMP dimuat dengan menempatkan boilerplate AMP untuk Email di dalam `<head>`.

```html
<head>
  ...
  <style amp4email-boilerplate>
    body {
      visibility: hidden;
    }
  </style>
</head>
```

### Penggantian Tag yang Spesifik untuk AMP

Karena perpustakaan AMP untuk Email merupakan bagian dari perpustakaan HTML AMP, banyak aturan sama yang berlaku; tag yang spesifik untuk AMP menggantikan tag-tag HTML yang berat dan memerlukan lebar serta tinggi yang jelas. Ini memungkinkan boilerplate AMP untuk menyembunyikan konten hingga mengetahui bagaimana penampilannya pada perangkat pengguna.

#### Gambar

Untuk menampilkan halaman secara efektif, semua tag `<img>` diganti dengan [`<amp-img>`](../../../documentation/components/reference/amp-img.md). Tag `<amp-img>` memerlukan lebar dan tinggi yang jelas serta mendukung [sistem tata letak AMP](amp-html-layout/index.md).

```
<amp-img src="https://link/to/img.jpg"
    width="100"
    height="100"
    layout="responsive">
</amp-img>
```

Tag `<amp-img>` dilengkapi dengan beragam cara bawaan dan andal untuk mengontrol desain yang responsif dan menetapkan fallback.

[tip type="note"] Bacalah lebih lanjut tentang penggunaan [kueri media dan tata letak](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md?format=email) AMP dan cara menetapkan [fallback gambar](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

#### GIF

AMP telah membuat [`<amp-anim>`](../../../documentation/components/reference/amp-anim.md?format=email), sebuah tag yang spesifik untuk gambar GIF yang memungkinkan runtime AMP mengurangi penggunaan CPU saat animasi tidak ada di layar. Serupa dengan `<amp-img>`, lebar serta tinggi ditentukan dan elemen harus menyertakan tag penutup.

```
<amp-anim
    width="400"
    height="300"
    src="my-gif.gif">
</amp-anim>
```

Selain itu, ini mendukung anak atau turunan `placeholder` opsional untuk tampil saat berkas `src` sedang dimuat, dan mendukung sistem tata letak AMP.

```
<amp-anim width=400 height=300 src="my-gif.gif" layout="responsive">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
```

## Email, dengan gaya <a name="emails-with-style"></a>

Seperti semua klien email, AMP mengizinkan atribut `style` inline, tetapi juga mendukung CSS di dalam tag `<style amp-custom>` di dalam tajuk email.

```html
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
</style>
...
</head>
```

Sebagaimana email HTML, AMP untuk Email mendukung properti dan pemilih bagian CSS yang terbatas.

Kunjungi [CSS yang Didukung AMP untuk Email](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) untuk mengetahui daftar lengkap CSS yang diizinkan di semua klien email yang mendukung AMP.

[tip type="important"] AMP menerapkan batas ukuran sebesar 75.000 byte untuk pembuatan gaya. [/tip]

## Komponen AMP yang Diizinkan

Fitur-fitur komponen AMP yang dinamis, visual, dan interaktif adalah hal-hal yang menjadikan Email AMP sebagai email masa depan.

Selengkapnya dari [daftar komponen yang didukung dalam AMP untuk Email](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) tersedia sebagai bagian dari spek AMP untuk Email.

## Mengesahkan permintaan

Konten email dinamis yang dipersonalisasi sering membutuhkan pengesahan pengguna. Namun, untuk melindungi data pengguna, semua permintaan HTTP yang dibuat dari dalam email AMP dapat menggunakan proksi dan cookie-nya dilucuti.

Untuk mengesahkan permintaan yang dibuat dari dalam email AMP, Anda dapat menggunakan token akses.

### Token akses

Anda dapat menggunakan token akses untuk mengesahkan pengguna. Token akses dipasok dan diperiksa oleh pengirim email. Pengirim menggunakan token untuk memastikan bahwa hanya mereka yang memiliki akses ke email AMP yang dapat membuat permintaan yang dimuat di dalam email itu. Token akses harus aman secara kriptografis, dan waktu serta cakupannya terbatas. Token ini disertakan dalam URL permintaan.

Contoh ini disampaikan dengan menggunakan `<amp-list>` untuk menampilkan data yang telah disahkan:

```html
<amp-list
  src="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  height="300"
>
  <template type="amp-mustache"> ... </template>
</amp-list>
```

Serupa seperti saat menggunakan `<amp-form>`, tempatkan token akses Anda di dalam URL `action-xhr`.

```html
<form
  action-xhr="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  method="post"
>
  <input type="text" name="data" />
  <input type="submit" value="Send" />
</form>
```

#### Contoh

Contoh berikut ini mempertimbangkan layanan pembuatan catatan hipotetis yang memungkinkan pengguna yang telah masuk untuk menambahkan catatan ke akunnya dan melihatnya nanti. Layanan ini ingin mengirimkan email kepada seorang pengguna, `jane@example.com`, yang menyertakan daftar catatan yang dibuat sebelumnya. Daftar catatan pengguna saat ini tersedia di endpoint `https://example.com/personal-notes` dalam format JSON.

Sebelum mengirimkan email, layanan ini menghasilkan token akses yang aman secara kriptografis dengan penggunaan terbatas untuk `jane@example.com: A3a4roX9x`. Token akses tersebut disertakan di dalam `exampletoken` nama bidang di dalam kueri URL:

```html
<amp-list
  src="https://example.com/personal-notes?exampletoken=A3a4roX9x"
  height="300"
>
  <template type="amp-mustache">
    <p>{{note}}</p>
  </template>
</amp-list>
```

Endpoint `https://example.com/personal-notes` bertanggung jawab untuk mengesahkan parameter exampletoken tersebut dan menemukan pengguna yang terkait dengan token tersebut.

### Token Akses untuk Penggunaan Terbatas

Token Akses untuk Penggunaan Terbatas memberikan perlindungan dari penyamaran (spoofing) permintaan dan [serangan balasan](https://en.wikipedia.org/wiki/Replay_attack), dengan memastikan bahwa tindakan tersebut memang dilakukan oleh pengguna yang menjadi tujuan pengiriman pesan. Perlindungan didapatkan dengan menambahkan parameter token yang unik pada parameter permintaan dan memverifikasinya saat tindakan tersebut diminta.

Parameter token harus dihasilkan sebagai kunci yang hanya dapat digunakan untuk tindakan tertentu dan pengguna tertentu. Sebelum tindakan yang diminta dilakukan, sebaiknya Anda memeriksa apakah token tersebut valid dan cocok dengan token yang Anda buat untuk pengguna tersebut. Jika token tersebut cocok, maka tindakan dapat dilakukan dan token menjadi tidak valid untuk permintaan di masa depan.

Token akses harus dikirimkan kepada pengguna sebagai bagian dari properti URL HttpActionHandler. Contohnya, jika aplikasi Anda menangani permintaan persetujuan di `http://www.example.com/approve?requestId=123`, Anda harus mempertimbangkan untuk menyertakan parameter `accessToken` tambahan padanya dan mendengarkan permintaan yang dikirimkan ke `http://www.example.com/approve?requestId=123&accessToken=xyz`.

Kombinasi `requestId=123` dan `accessToken=xyz` adalah kombinasi yang harus Anda buat sebelumnya, untuk memastikan bahwa `accessToken` tersebut tidak dapat disimpulkan dari `requestId`. Permintaan persetujuan apa pun dengan `requestId=123` dan tanpa `accessToken` atau dengan `accessToken` yang tidak sama dengan `xyz` harus ditolak. Setelah permintaan ini selesai, permintaan apa pun di masa depan dengan ID dan token akses yang sama harus ditolak juga.

## Menguji dalam klien email yang berbeda

Klien email yang mendukung AMP untuk Email menyediakan dokumentasi dan alat pengujian sendiri untuk membantu Anda melakukan integrasi.

Kunjungi [Menguji Email AMP](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md) untuk mendapatkan informasi selengkapnya dan tautan ke dokumentasi yang spesifik untuk klien email.
