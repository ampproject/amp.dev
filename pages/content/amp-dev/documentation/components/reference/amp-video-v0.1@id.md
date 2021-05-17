---
$title: amp-video
$category@: media
teaser:
  text: Replaces the HTML5 video tag.
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

       Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS-IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
-->



Penggantian untuk tag `video` HTML5; digunakan hanya untuk sematan file video HTML5 langsung.

<table>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td width="40%"><strong>Contoh</strong></td>
    <td>AMP By Example:<ul>
      <li><a href="https://ampbyexample.com/components/amp-video/">Contoh amp-video</a></li>
      <li><a href="https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/">Overlay klik-untuk-putar untuk amp-video</a></li></ul></td>
    </tr>
    <tr>
      <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
      <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
    </tr>
  </table>

## Perilaku <a name="behavior"></a>

Komponen `amp-video` memuat resource video yang ditentukan oleh atribut `src` secara longgar, pada suatu waktu yang ditentukan oleh runtime. Anda dapat mengontrol komponen `amp-video` dengan cara yang hampir sama dengan tag `<video>` HTML5.

Komponen `amp-video` menerima hingga empat jenis node HTML unik sebagai turunan:

* tag `source`: Sama seperti pada tag `<video>` HTML, Anda dapat menambahkan turunan tag `<source>` untuk menentukan file media sumber berbeda yang ingin diputar.
* tag `track` untuk mengaktifkan subtitel dalam video. Jika track dihosting pada asal yang berbeda dengan dokumen, Anda harus menambahkan atribut `crossorigin` ke `<amp-video>`.
* sebuah placeholder untuk sebelum video dimulai
* sebuah fallback jika browser tidak mendukung video HTML5: Satu atau nol node turunan langsung dapat memiliki atribut `fallback`. Jika ada, node ini dan turunannya akan membentuk konten yang ditampilkan jika video HTML5 tidak didukung pada browser pengguna.

#### Contoh <a name="example"></a>

[example preview="inline" playground="true" imports="amp-video"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  layout="responsive"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

## Analisis <a name="analytics"></a>

`amp-video` mendukung analisis yang siap digunakan. Lihat [analisis video](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md) untuk informasi selengkapnya.

## Atribut <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>Wajib ada jika turunan <code>&lt;source&gt;</code> tidak ada. Harus berupa HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>poster</strong></td>
    <td>Gambar untuk frame yang akan ditampilkan sebelum pemutaran video dimulai. Secara default, frame pertama ditampilkan.
      <br>
        Sebagai alternatif, Anda dapat menyajikan overlay klik-untuk-putar. Untuk selengkapnya, lihat bagian <a href="#click-to-play-overlay">Overlay klik-untuk-putar</a> di bawah.</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay</strong></td>
        <td>Jika atribut ini ada, dan browser mendukung fitur autoplay, video akan otomatis diputar begitu terlihat. Ada beberapa kondisi yang harus dipenuhi oleh komponen ini agar video dapat diputar, <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-video-interface.md#autoplay">seperti dijelaskan dalam spesifikasi Video di AMP</a>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>controls</strong></td>
        <td>Atribut ini mirip dengan atribut <code>controls</code> dalam <code>video</code> HTML5. Jika atribut ini ada, browser menyediakan kontrol yang dapat digunakan pengguna untuk mengontrol pemutaran video.</td>
      </tr>
      <tr>
        <td width="40%"><strong>controlsList</strong></td>
        <td>Sama seperti atribut <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">controlsList</a> elemen video HTML5. Hanya didukung oleh browser tertentu. Lihat <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList</a> untuk selengkapnya.</td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong>Memerlukan ekstensi <code>amp-video-docking</code>.</strong> Jika atribut ini ada dan video diputar secara manual, video akan "diminimalkan" dan dikunci ke suatu sudut atau elemen saat pengguna men-scroll keluar dari area visual komponen video.
            Untuk penjelasan selengkapnya, lihat <a href="amp-video-docking.md">dokumentasi ekstensi dok.</a></td>
        </tr>
        <tr>
          <td width="40%"><strong>loop</strong></td>
          <td>Jika ada, video akan otomatis diulang kembali ke awal setelah mencapai akhir.</td>
        </tr>
        <tr>
          <td width="40%"><strong>crossorigin</strong></td>
          <td>Diperlukan jika resource <code>track</code> dihosting pada asal yang berbeda dengan dokumen.</td>
        </tr>
        <tr>
          <td width="40%"><strong>disableremoteplayback</strong></td>
          <td>Menentukan apakah elemen media diizinkan memiliki UI pemutaran jarak jauh seperti Chromecast atau AirPlay atau tidak.</td>
        </tr>
        <tr>
          <td width="40%"><strong>muted (tidak digunakan lagi)</strong></td>
          <td>Atribut <code>muted</code> sudah tidak digunakan dan tidak lagi memiliki efek apa pun. Atribut <code>autoplay</code> otomatis mengontrol perilaku mute (matikan suara).</td>
        </tr>
        <tr>
          <td width="40%"><strong>noaudio</strong></td>
          <td>Menganotasi video sebagai tidak memiliki audio. Atribut ini menyembunyikan ikon equalizer yang ditampilkan pada video yang memiliki fitur autoplay.</td>
        </tr>
        <tr>
          <td width="40%"><strong>rotate-to-fullscreen</strong></td>
          <td>Jika video terlihat, video akan ditampilkan secara layar penuh setelah pengguna memutar perangkat ke mode lanskap. Untuk penjelasan selengkapnya, baca <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-video-interface.md#rotate-to-fullscreen">spesifikasi Video di AMP</a>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>atribut umum</strong></td>
          <td>Elemen ini mencakup <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atribut umum</a> yang diperluas ke komponen AMP.</td>
        </tr>
      </table>

## Atribut Media Session API <a name="media-session-api-attributes"></a>

Komponen `amp-video` menerapkan [Media Session API](https://developers.google.com/web/updates/2017/02/media-session), yang memungkinkan developer untuk menentukan informasi lebih lanjut tentang file video. Informasi tambahan untuk video ditampilkan di pusat notifikasi perangkat pengguna (bersama kontrol putar/jeda).

<table>
  <tr>
    <td width="40%"><strong>artwork</strong></td>
    <td>Menentukan URL ke gambar PNG/JPG/ICO yang berfungsi sebagai poster video. Jika `artwork` tidak ada, helper Media Session API akan menggunakan kolom `image` dalam definisi `schema.org`, `og: image`, atau `favicon` situs.</td>
  </tr>
  <tr>
    <td width="40%"><strong>artist</strong></td>
    <td>Menunjukkan pembuat file video, yang ditetapkan sebagai string.</td>
  </tr>
  <tr>
    <td width="40%"><strong>album</strong></td>
    <td>Menunjukkan album/koleksi dari mana video diambil, yang ditentukan sebagai string.</td>
  </tr>
  <tr>
    <td width="40%"><strong>title</strong></td>
    <td>Menunjukkan nama/judul video, yang ditetapkan sebagai string. Jika tidak disediakan, helper Media Session API akan menggunakan atribut `aria-label` atau melakukan fallback ke judul halaman.</td>
  </tr>
</table>

Contoh:

Contoh di bawah berisi atribut `poster` dan `artwork`. Atribut `poster` berfungsi sebagai gambar placeholder sebelum video diputar, sedangkan `artwork` adalah gambar yang ditampilkan di notifikasi melalui MediaSession API.

```html
<amp-video width="720" height="305" layout="responsive"
    src="https://yourhost.com/videos/myvideo.mp4"
    poster="https://yourhost.com/posters/poster.png"
    artwork="https://yourhost.com/artworks/artwork.png"
    title="Awesome video" artist="Awesome artist"
    album="Amazing album">
</amp-video>
```

## Overlay klik-untuk-putar <a name="click-to-play-overlay"></a>

Overlay klik-untuk-putar adalah fitur UX umum untuk pemutar video di web.  Misalnya, Anda dapat menampilkan ikon putar kustom yang dapat diklik pengguna, serta menyertakan judul video, gambar poster berukuran berbeda, dan sebagainya.  Karena komponen `amp-video` mendukung tindakan AMP `play` standar, Anda dapat menerapkan klik-untuk-putar dengan mudah.

Untuk contoh lebih lengkap, kunjungi [Overlay klik-untuk-putar untuk amp-video](https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/) di AMP By Example.

## Validasi <a name="validation"></a>

Lihat [aturan amp-video](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) dalam spesifikasi validator AMP.
