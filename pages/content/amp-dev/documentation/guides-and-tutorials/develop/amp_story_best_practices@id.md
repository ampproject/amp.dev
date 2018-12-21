---
$title: Praktik terbaik untuk membuat artikel AMP
---

[TOC]

Panduan ini menyediakan beberapa praktik yang direkomendasikan yang sebaiknya Anda terapkan saat membuat [artikel AMP](/id/docs/reference/components/amp-story.html).


## Warna background  

Anda harus menentukan warna background untuk halaman artikel AMP. Dengan memiliki warna background, Anda memberikan pengalaman pengguna fallback yang baik meskipun kondisi jaringan yang buruk mencegah pengguna mendownload aset gambar atau video.

*   Warna background harus mewakili warna dominan pada aset background halaman.
*   Pilih warna yang memungkinkan transisi yang lancar dengan gambar atau halaman itu sendiri. Anda dapat memilih untuk:
    *   Menggunakan warna dominan yang mewakili gambar/video.
    *   Menggunakan warna tema yang konsisten untuk semua halaman dalam artikel. 
*   Warna background harus berbeda dengan warna font agar teks dapat dibaca bahkan sebelum gambar dimuat.

## Teks 

### Memastikan keterbacaan

Pastikan overlay teks pada halaman mudah dibaca:

* Pilih warna font yang kontras dengan gambar dan warna background.
* Tambahkan overlay gradien di antara gambar dan teks untuk mengontraskan teks dan gambar.

### Teks yang ringkas   

Perlu diingat bahwa artikel AMP didesain untuk menawarkan pengalaman yang lebih visual, sehingga teks pada halaman perlu dibuat seringkas mungkin (tidak lebih dari 1-2 kalimat). Pertimbangkan dengan cermat tujuan dan alur baca jika Anda yakin teks yang lebih panjang diperlukan.

## Video  

### Menentukan atribut poster 

`poster` adalah gambar yang ditampilkan di UI sampai video didownload. Secara umum, poster dapat berupa frame pertama video, walaupun gambar apa saja bisa digunakan.  Namun, Anda harus memilih gambar yang mewakili video dan memungkinkan transisi yang lancar. Jika Anda memilih frame pertama, pastikan itu bukan frame kosong sementara. 

Dimensi yang direkomendasikan untuk gambar poster adalah: 720 px (lebar 720 px x tinggi 1280 px).

*Contoh: Menentukan poster*

```html
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

### Menentukan `<source>` vs `src` 

Saat menentukan sumber untuk [amp-video](/id/docs/reference/components/amp-video.html), gunakan elemen turunan `<source>` dan bukan atribut `src`. Dengan menggunakan elemen `<source>`, Anda dapat menentukan jenis video, serta menambahkan lebih banyak sumber video. Dalam elemen `<source>`, tentukan jenis MIME melalui atribut `"type"`. Untuk video HLS, Anda harus menentukan salah satu dari jenis MIME berikut: `application/x-mpegurl` atau `application/vnd.apple.mpegurl`. Untuk semua video lainnya, tentukan awalan MIME `video/` dan format video (misalnya, "`video/mp4`").

*Contoh: Menentukan beberapa file sumber*

```html
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">
  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
```

### Ukuran/Panjang video

* Untuk mendapatkan performa optimal, Anda harus menyediakan video dengan ukuran maksimal 4 MB.
* Untuk video yang panjang, pertimbangkan membagi video di beberapa halaman.
* Untuk halaman sampul, hindari video berukuran sangat besar.

### Format video

Jika Anda hanya dapat menyediakan satu format video, sediakan **MP4**.  Namun, jika mungkin, gunakan video **HLS** dan tentukan MP4 sebagai fallback untuk browser yang belum mendukung video HLS. HLS menjalankan streaming kecepatan bit adaptif, yang dapat menyesuaikan kualitas video dengan kecepatan sambungan internet pengguna.

[tip type="note"]

Format video HLS tidak didukung pada browser Chrome untuk Desktop (bahkan melalui emulasi sekalipun), sehingga fallback MP4 harus ditentukan untuk semua traffic desktop ke halaman Anda. Untuk men-debug video HLS, Anda harus menggunakan perangkat seluler sebenarnya melalui proses debug USB.

[/tip]

### Resolusi video

Video artikel AMP selalu ditampilkan vertikal (tampilan potret) dengan rasio tinggi lebar yang diharapkan sebesar 16:9. Gunakan resolusi yang direkomendasikan untuk tiap jenis streaming video: 

<table>
  <thead>
    <tr>
     <th>Video streaming type</th>
     <th>Resolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Non-adaptive</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Adaptive</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>


[tip type="note"]

Untuk perangkat seluler yang rasio tinggi lebarnya tidak 16:9, video mungkin akan di-crop secara vertikal atau horizontal agar pas dengan viewport.

[/tip]


### Codec video

1.  Untuk MP4, gunakan `H.264`.
2.  Untuk WEBM, gunakan `VP9`.
3.  Untuk HLS atau DASH, gunakan `H.264`.


### Kualitas video

#### Pengoptimalan transcoding

Ada berbagai fitur yang dapat Anda gunakan untuk mengenkode video dan menyesuaikan kualitas video selama encoding.  Berikut ini beberapa di antaranya:

<table>
  <thead>
    <tr>
     <th>Tool</th>
     <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>An encoder that can also output the HLS format including the playlist.
     </td>
    </tr>
  </tbody>
</table>

#### Ukuran segmen HLS

Pastikan durasi segmen HLS tidak lebih dari 10 detik.

### Maju ke halaman berikutnya setelah video berakhir

Jika ingin maju otomatis dari satu halaman ke halaman berikutnya setelah video selesai diputar, Anda harus menetapkan nilai atribut `auto-advance-after` untuk `<amp-story-page>` ke id video, bukan ke panjang yang diharapkan dari video itu. Artinya, Anda harus menggunakan

```html
<amp-story-page auto-advance-after="myvideo">
```

bukan

```html
<amp-story-page auto-advance-after="9s">
```

Hal ini karena pemutaran video dan penayangan halaman mungkin tidak dimulai pada waktu yang persis sama, atau panjang yang diberikan mungkin tidak benar, sehingga terdapat perbedaan antara durasi yang diharapkan dengan durasi yang sebenarnya. Kondisi ini dapat menyebabkan video diulang, yang bisa mengganggu perhatian pengguna.
 
