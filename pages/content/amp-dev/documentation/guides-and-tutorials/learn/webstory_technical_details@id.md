---
'$title': Detail teknis Cerita Web
$order: 1
description: Detail teknis Cerita Web
'$category': Develop
formats:
  - stories
author: CrystalOnScript
---

Panduan ini menjelaskan semua detail teknis dan praktik terbaik yang seharusnya Anda tahu agar berhasil membuat Cerita Web dengan AMP.

## AMP Valid

Cerita Web secara teknis adalah halaman web tunggal yang dibuat dengan AMP dan mengikuti spesifikasi AMP:

- Mulai dengan jenis dokumen `<!doctype html>`.
- Berisi `<html ⚡>` tingkat atas atau tag `<html amp>`.
- Berisi tag `<head>` dan `<body>`.
- Berisi tag` <meta charset="utf-8">` sebagai anak atau turunan pertama dari tag `<head>`.
- Berisi tag `<script async src="https://ampjs.org/v0.js"></script>` di dalam `<head>`-nya. Sebagai praktik terbaik, Anda seharusnya menyertakan skrip ini sedini mungkin di dalam `<head>`.
- Berisi tag` <link rel="canonical" href="page/url">` di dalam `<head>`-nya dengan href yang mengarah ke URL Cerita Web.
- Berisi tag `<meta name="viewport" content="width=device-width">` di dalam `<head>`-nya. Disarankan juga untuk menyertakan skala inisial=1.
- Berisi kode [boilerplate AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) di dalam tag `<head>`.

Perbedaan antara halaman web AMP dan Cerita Web yang dibuat dengan AMP adalah komponen [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories). Ini adalah satu-satunya anak langsung dari `<body>` dokumen dan harus berisi atribut `standalone`. Semua halaman, lapisan, dan elemen Cerita Web ditentukan di dalam tag `<amp-story>`.

```html
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://ampjs.org/v0.js"></script>
    <script
      async
      custom-element="amp-video"
      src="https://ampjs.org/v0/amp-video-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-story"
      src="https://ampjs.org/v0/amp-story-1.0.js"
    ></script>
    <style amp-custom>
      ...;
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story
      standalone
      title="Joy of Pets"
      publisher="AMP tutorials"
      publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
      poster-portrait-src="assets/cover.jpg"
    >
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
        <amp-story-grid-layer template="vertical">
          <h1>The Joy of Pets</h1>
          <p>By AMP Tutorials</p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 1 -->
      <amp-story-page id="page1">
        <amp-story-grid-layer template="vertical">
          <h1>Cats</h1>
          <amp-img
            src="assets/cat.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
          <q
            >Dogs come when they're called. Cats take a message and get back to
            you. --Mary Bly</q
          >
        </amp-story-grid-layer>
      </amp-story-page>
      ...
    </amp-story>
  </body>
</html>
```

Ikuti [Membuat tutorial Cerita Web pertama Anda](../start/visual_story/?format=stories) dan [baca dokumentasi referensi amp-story ](../../components/reference/amp-story/?format=stories)untuk mengetahui selengkapnya.

## Kinerja puncak dan pengalaman pengguna

Pengguna mungkin melihat Cerita Web di area dengan koneksi jaringan yang lemah atau perangkat yang sudah tua. Pastikan mereka menikmati pengalaman mereka dengan mengikuti praktik terbaik ini.

### Warna latar belakang

Tentukan warna latar belakang untuk setiap halaman Cerita Web. Mempunyai warna latar belakang memberikan fallback yang baik jika kondisi pengguna mencegah mereka mengunduh gambar atau aset video. Pilih warna yang mewakili warna dominan aset latar belakang halaman yang diinginkan, atau gunakan tema warna yang konsisten untuk semua halaman cerita. Pastikan warna latar belakang berbeda dari teks untuk keterbacaan.

Tentukan warna latar belakang untuk halaman dalam tag `<style amp-custom>` di tajuk dokumen Cerita Web atau inline pada komponen [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories).

### Elemen pelapis

Tajuk sistem berisi kontrol, seperti ikon bisukan dan bagikan. Ini muncul pada indeks Z yang lebih tinggi dibanding video dan gambar latar belakang. Pastikan tidak ada informasi penting yang ditutupi oleh ikon ini.

### Rasio aspek

Desain aset Cerita Web pada rasio aspek 9:16. Karena tinggi dan lebar halaman berbeda di tiap browser dan perangkat, jangan tempatkan konten penting di dekat tepi halaman.

### Gambar poster

Gambar poster ditampilkan kepada pengguna sementara video diunduh. Gambar poster harus mewakili video agar transisi menjadi mulus. Tentukan gambar poster dengan menambahkan atribut `poster` ke elemen amp-video Anda dan menambahkannya ke lokasi gambar.

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## Video

Semua video harus ditambahkan melalui komponen [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories).

```
<amp-video controls
  width="640"
  height="360"
  layout="responsive"
  poster="/static/inline-examples/images/kitten-playing.png">
  <source src="/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

### Resolusi dan mutu

Enkode video untuk menyesuaikan mutu untuk pengoptimalan yang disarankan berikut ini:

<table>
  <tr>
   <td>MP4</td>
   <td>-crf 23</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>-b:v 1M</td>
  </tr>
</table>

Coba pertahankan segmen HLS di bawah durasi 10 detik.

### Format dan ukuran

Pertahankan video agar lebih kecil dari 4 MB untuk meraih kinerja optimum. Pertimbangkan untuk membagi video besar hingga beberapa halaman.

Jika Anda hanya dapat menyediakan format video tunggal, sediakan MP4. Jika mungkin, gunakan video HLS dan tentukan MP4 sebagai standar (fallback) untuk kompatibilitas browser. Gunakan kodek video berikut ini:

<table>
  <tr>
   <td>MP4, HLS, dan DASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### Tentukan &lt;source&gt; vs src

Gunakan elemen anak `<source>` dalam komponen `<amp-video>` untuk menentukan sumber video daripada atribut `src`. Menggunakan elemen `<source>` memungkinkan Anda untuk menentukan jenis video dan menambahkan sumber video cadangan. Anda harus menggunakan atribut `type` untuk menentukan jenis MIME. Gunakan `application/x-mpegurl` atau `application/vnd.apple.mpegurl` untuk video HLS. Untuk semua jenis video lain, gunakan awalan MIME `video/` dan ikuti dengan format video, seperti `”video/mp4”`.

```html
<amp-video
  id="video-page1"
  autoplay
  loop
  layout="fill"
  poster="https://example.com/media/poster.jpg"
>
  <source
    src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl"
  />
  <source src="https://amp-example.com/media/movie.mp4" type="video/mp4" />
</amp-video>
```

### Maju otomatis setelah video

Atribut [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D) diekspos dengan amp-story-page yang menentukan jika dan kapan sebuah halaman cerita harus maju tanpa harus diketuk pengguna. Untuk maju setelah sebuah video, arahkan atribut ke ID video.

```html
<amp-story-page auto-advance-after="myvideo"></amp-story-page>
```

## Pengalaman desktop

Format Cerita Web mendukung sebuah [pengalaman desktop opsional](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in). Ini mengubah pengalaman desktop menjadi mode bleed penuh menghanyutkan, menggantikan pengalaman tiga panel potret default dan memungkinkan pengguna perangkat seluler untuk melihat saat perangkat mereka dipegang secara horizontal.

Pilih dukungan desktop dengan menambahkan atribut `supports-landscape` ke komponen `<amp-story>`.

```html
<amp-story
  standalone
  supports-landscape
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
</amp-story>
```
