---
$title: Praktik terbaik untuk membuat iklan Cerita AMP
$order: 16
description: Cerita AMP adalah pengalaman layar penuh yang dapat diketuk sehingga isinya dapat menghanyutkan para pembaca. Iklan yang muncul di Cerita AMP harus mempunyai desain yang konsisten dan terpadu dengan UX Cerita AMP.
---

Cerita AMP adalah pengalaman layar penuh yang dapat diketuk sehingga isinya dapat menghanyutkan para pembaca. Iklan yang muncul di Cerita AMP harus mempunyai desain yang konsisten dan terpadu dengan UX Cerita AMP. Ini mencegah pengalaman pengguna terganggu atau tersela. Panduan ini menunjukkan cara membuat sebuah iklan untuk Cerita AMP.

##Prinsip-prinsip iklan Cerita AMP Format iklan saat ini, seperti spanduk dan kotak, tidak mempunyai integrasi yang baik dengan format Cerita AMP. Iklan klasik lambat, mengganggu, dan terasa janggal di dalam pengalaman Cerita.

Iklan Cerita AMP mengikuti prinsip-prinsip berikut ini:

- Iklan AMPHTML Valid: mengikuti spesifikasi teknis yang sama seperti [iklan AMPHTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md) klasik.
- Visual yang utama: Menarik, berani, pernyataan undangan yang dimotivasi oleh konteks
- Asli: Halaman iklan mempunyai dimensi yang sama seperti halaman cerita organik.
- Model interaksi yang sama: Pengguna dapat melanjutkan ke layar selanjutnya, sama seperti dengan halaman cerita organik.
- Cepat: Iklan tidak pernah tampil kepada pengguna dalam keadaan setengah termuat.

Agar konsisten dengan prinsip-prinsip ini, runtime Cerita AMP menentukan penempatan yang tepat untuk sebuah halaman iklan di tengah-tengah Cerita AMP. Baca selengkapnya tentang mekanisme penempatan iklan di [Beriklan di Cerita AMP](advertise_amp_stories.md).

##Sampel Iklan Cerita Iklan Cerita AMP adalah iklan AMPHTML, tetapi mempunyai data tag meta yang diperlukan, memenuhi spesifikasi tata letak yang ditentukan, dan elemen-elemen UI yang dibutuhkan. Iklan Cerita AMP akan selalu menyertakan tombol permintaan aksi (CTA) dan label iklan yang ditampilkan sebagai penyangkalan teks pada bagian atas halaman.

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='Contoh iklan Cerita AMP', caption='Example of an AMP Story ad', align='' ) }}

Agar pengalaman pengguna tetap konsisten, runtime Cerita AMP bertanggung jawab untuk merender label iklan dan tombol CTA.

[tip type="important"] **PENTING –**Hanya tombol CTA yang dapat diklik di dalam iklan Cerita AMP, jadi ingatlah hal ini saat membuat kreatif Anda. [/tip]

##Data tag meta

Data tag meta menentukan bahwa iklan memenuhi format Cerita AMP, menetapkan enum teks tombol CTA, mengarahkan ke mana tombol akan membawa pengguna, dan apa jenis halaman tersebut.

[sourcecode:html]

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

```
<!-- Specifies where the user is directed -->
<meta name="amp-cta-url" content="%%CLICK_URL_UNESC%%%%DEST_URL%%">

<!-- Specifies the call to action button text enum -->
<meta name="amp-cta-type" content="EXPLORE">

<!-- Specifies what type of landing page the user is direct to -->
<meta name="amp-cta-landing-page-type" content="NONAMP">

<style amp4ads-boilerplate>body{visibility:hidden}</style>
<style amp-custom>
 amp-img {height: 100vh}
</style>
<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
```

    <amp-img src="%%FILE:JPG1%%" layout="responsive" height="1280" width="720"></amp-img>

Disarankan untuk memilih tag amp-cta-jenis dari [pilihan teks Tombol CTA yang tersedia](#call-to-action-button-text-enum). AMP akan secara otomatis melokalkan pilihan yang telah ditentukan jika tepat.

Teks kustom diperbolehkan, namun Anda perlu menerapkan pelokalan Anda sendiri.

## Enum teks tombol permintaan aksi (CTA) <a name="call-to-action-button-text-enum"></a>

Tombol ajakan bertindak (CTA) dapat dikonfigurasi dari seperangkat pilihan yang telah ditentukan:

- `APPLY_NOW`: "Terapkan Sekarang"
- `BOOK_NOW`: "Pesan"
- `BUY_TICKETS`: "Beli Tiket"
- `DOWNLOAD`: "Unduh"
- `EXPLORE`: "Telusuri Sekarang"
- `GET_NOW`: "Dapatkan Sekarang"
- `INSTALL`: "Instal Sekarang"
- `LISTEN`: "Dengarkan Sekarang"
- `MORE`: "Selengkapnya"
- `OPEN_APP`: "Buka Aplikasi"
- `ORDER_NOW`: "Pesan Sekarang"
- `PLAY`: "Putar"
- `READ`: "Baca Sekarang"
- `SHOP`: "Berbelanja Sekarang"
- `SHOWTIMES`: "Showtime"
- `SIGN_UP`: "Mendaftar"
- `SUBSCRIBE`: "Berlangganan Sekarang"
- `USE_APP`: "Gunakan Aplikasi"
- `VIEW`: "Lihat"
- `WATCH`: "Tonton"
- `WATCH_EPISODE`: "Tonton Episode"

[tip type="note"] **CATATAN –** Tautan dalam ke aplikasi tidak didukung, tetapi tautan ke halaman App Store atau halaman Google Play Store didukung dengan menggunakan http/https. Enum teks tombol CTA ditentukan di dalam payload respons iklan. [/tip]

Jika dibutuhkan dukungan untuk enum teks tombol CTA, silakan buka [masalah GitHub](https://github.com/ampproject/amphtml/issues/new).

##Halaman Landing Iklan Anda dapat menentukan satu dari tiga pilihan untuk halaman landing iklan Cerita AMP.

- `STORY`: Halaman landing adalah sebuah [cerita bersponsor](story_ads_best_practices.md#sponsored-story).
- `AMP`: Halaman landing adalah sebuah Halaman AMP yang valid.
- `NONAMP`: Jenis halaman web lain.

##Tata Letak Cerita AMP horizontal dan layar penuh. Iklan cerita diharuskan mengikuti format ini untuk memberikan pengalaman pengguna yang konsisten.

##Dimensi hamparan (overlay) Label iklan menghamparkan batang gradien gelap di seluruh lebar iklan dan akan membentang dari atas hingga 46 px ke bawah.

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='Demonstration of ad overlay', caption='Hamparan iklan berada di bagian atas', align='' ) }}

CTA berada 32 px dari dasar dan ditempatkan di tengah secara horizontal. Ini 120 px x 36 px.

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='Demonstration of the CTA Button', caption='Tombol CTA berada hampir di dasar', align='' ) }}

##Gambar dan video Gambar dan video yang disertakan di dalam iklan Cerita AMP harus berukuran layar penuh standar 4:3. Iklan yang menyertakan video harus menggunakan [poster](../../../documentation/components/reference/amp-video.md#poster). Dimensi yang disarankan untuk gambar poster adalah 720 p (720 w x 1280 h).

[sourcecode:html] <amp-video controls="" width="720" height="1280" layout="responsive" poster="images/kitten-playing.png"></amp-video>

  <source src="videos/kitten-playing.webm" type="video/webm">   <source src="videos/kitten-playing.mp4" type="video/mp4">   <div fallback="">     <p>Browser ini tidak mendukung elemen video.</p>   </div>  [/sourcecode]</source></source>

###Gambar Gambar latar belakang dapat diatur sesuai skala layar penuh. CSS berikut ini adalah cara yang berhasil untuk memotong dan menempatkan video dan gambar di tengah.

[sourcecode:html]

<style amp-custom=""><br>    amp-img, amp-video {<br>        height: 100vh;<br>    }<br>    amp-video video {<br>        object-fit: cover;<br>    }<br>    amp-img img{<br>        object-fit: cover;<br>    }<br></style>

[/sourcecode]

###Video

####Tentukan `<source>` vs `src` Saat menetapkan sumber untuk sebuah [`amp-video`](../../../documentation/components/reference/amp-video.md)

Contoh: Menentukan beberapa berkas sumber

[sourcecode:html] <amp-video id="video-page1" autoplay="" loop="" layout="fill" poster="https://example.com/media/poster.jpg"></amp-video>

  <source src="https://amp-example.com/media/movie.m3u8" type="application/vnd.apple.mpegurl">   <source src="https://amp-example.com/media/movie.mp4" type="video/mp4">  [/sourcecode]</source></source>

####Ukuran & Durasi video Demi kinerja yang optimal, Anda perlu menargetkan untuk menyediakan video yang tidak lebih besar daripada 4 MB. Ukuran berkas yang lebih kecil memungkinkan pengunduhan yang lebih cepat, jadi pertahankan agar ukurannya sekecil mungkin.

####Format video Jika Anda hanya dapat menyediakan format video tunggal, sediakan **MP4**. Namun, di mana pun bisa, gunakan video **HLS** dan tentukan MP4 sebagai standar (fallback) bagi browser yang belum mendukung video HLS. HLS melakukan streaming bitrate adaptif, di mana mutu video dapat diubah agar paling sesuai dengan koneksi jaringan pengguna.

[tip type="note"] **CATATAN –** Format video HLS tidak didukung di Chrome untuk browser Desktop (bahkan melalui emulasi juga tidak), jadi menetapkan standar MP4 diperlukan untuk lalu lintas desktop apa pun ke halaman Anda. Untuk melakukan debug video HLS, Anda perlu menggunakan perangkat seluler aktual melalui debugging pada USB. [/tip]

####Resolusi video

Video cerita AMP selalu vertikal (yaitu tampilan potret), dengan rasio aspek yang diharapkan pada 16:9. Gunakan resolusi yang disarankan untuk jenis streaming video:

<table>
  <thead>
    <tr>
     <th>Jenis streaming video</th>
     <th>Resolusi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Non-adaptif</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Adaptif</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>

[tip type="note"] **CATATAN –** Untuk perangkat seluler dengan rasio aspek yang tidak sama dengan 16:9, video mungkin dipotong secara horizontal atau vertikal agar muat di dalam viewport. [/tip]

#### Kodek video

1. Untuk MP4, gunakan `H.264`.
2. Untuk WEBM, gunakan `VP9`.
3. Untuk HLS atau DASH, gunakan `H.264`.

#### Mutu video

##### Pengoptimalan transkoding

Ada berbagai alat yang dapat Anda gunakan untuk mengode video dan menyesuaikan mutu video selama pengodean. Berikut ini beberapa di antaranya:

<table>
  <thead>
    <tr>
     <th>Alat</th>
     <th>Catatan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a></td>
     <td>Pengoptimalan yang disarankan:       <ul>         <li>Untuk MP4, gunakan <code>-crf 23</code>.</li>         <li>Untuk WEBM, gunakan <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a></td>
     <td>Pengoptimalan yang disarankan:       <ul>         <li>Untuk MP4, gunakan <code>-crf 23</code>.</li>         <li>Untuk WEBM, gunakan <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>Sebuah pengode juga dapat menghasilkan format HLS, termasuk daftar putarnya.</td>
    </tr>
  </tbody>
</table>

##### Ukuran segmen HLS

Pastikan bahwa segmen HLS Anda pada umumnya tidak lebih lama dari 10 detik.

## Animasi

Animasi mempunyai beberapa pembatasan di dalam cerita, seperti konsep tentang apa yang "dapat dilihat". Contohnya, di dalam tampilan desktop "3 panel", kreatif Anda mungkin dapat dilihat di halaman, namun fokus tengah belum. Ini dapat menimbulkan masalah jika efek yang diinginkan adalah memulai animasi ketika suatu halaman menjadi titik fokus utama.

Untuk membantu dalam hal ini, AMP akan menambahkan atribut khusus `amp-story-visible` ke badan kreatif Anda jika itu adalah titik fokus pada semua konteks penyajian. Disarankan untuk memulai animasi Anda berdasarkan sinyal ini.

Contoh: animasi ini akan dimulai saat halaman menjadi fokus, dan dimulai ulang jika pengguna mengeklik halaman lain di dalam cerita, lalu kembali.

[sourcecode:html]

<style amp-custom=""><br>    body[amp-story-visible] .my-animation-class {<br>      animation: 2s my-animation-name;<br>    }<br></style>

[/sourcecode]

## Cerita Bersponsor <a name="sponsored-story"></a>

Cerita Bersponsor hadir sebagai URL di web, ini memungkinkan lalu lintas pengguna didorong ke Cerita Bersponsor dari tombol permintaan aksi (CTA) di sebuah iklan Cerita AMP. Sebuah Cerita Bersponsor adalah Cerita Bersponsor, namun dengan fokus pada pengalaman iklan yang menghanyutkan dan luas.

{{ image('/static/img/docs/stampads/sponsored_story_full.png', 1600, 900, layout='intrinsic', alt='CTA button directs to a Sponsored Story', caption='Tombol CTA mengarahkan ke Cerita Bersponsor', align='' ) }}

Baca selengkapnya tentang membuat [Cerita AMP di sini](../start/create_successful_stories.md).
