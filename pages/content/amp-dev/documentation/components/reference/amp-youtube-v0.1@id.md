---
$title: amp-youtube
$category@: media
teaser:
  text: Displays a YouTube video.
---


<!--
       Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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



Menampilkan video [YouTube](https://www.youtube.com/).

<table>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-youtube" src="https://ampjs.org/v0/amp-youtube-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Contoh</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-youtube/">Contoh kode yang dianotasi untuk amp-youtube</a></td>
  </tr>
</table>

## Contoh <a name="example"></a>

Dengan tata letak responsive, lebar dan tinggi dari contoh berikut akan menghasilkan tata letak yang benar untuk video dengan rasio tinggi lebar 16:9:

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
  [/sourcecode]

  [sourcecode:html]
  <amp-youtube
      id="myLiveChannel"
      data-live-channelid="UCB8Kb4pxYzsDsHxzBfnid4Q"
      width="358"
      height="204"
      layout="responsive">
    <amp-img
      src="https://i.ytimg.com/vi/Wm1fWz-7nLQ/hqdefault_live.jpg"
      placeholder
      layout="fill"
      />
  </amp-youtube>
  [/sourcecode]

## Atribut <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>autoplay</strong></td>
    <td>Jika atribut ini ada, dan browser mendukung fitur autoplay:
      <ul>
        <li>audio video otomatis dinonaktifkan sebelum autoplay dimulai
        </li>
        <li>saat di-scroll keluar dari tampilan, video akan dijeda
        </li>
        <li>saat di-scroll ke dalam tampilan, video akan melanjutkan pemutaran
        </li>
        <li>saat pengguna menge-tap video, audio video akan diaktifkan
        </li>
        <li>jika pengguna telah berinteraksi dengan video (misalnya menonaktifkan/mengaktifkan audio, menjeda/melanjutkan, dll.), dan video di-scroll ke dalam atau keluar dari tampilan, status video tetap sama seperti saat terakhir pengguna meninggalkannya. Misalnya, jika pengguna menjeda video, kemudian men-scroll video keluar dari tampilan lalu kembali ke video, video tersebut tetap dijeda.
        </li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-videoid</strong></td>
      <td>ID video YouTube yang ada di setiap URL halaman video YouTube.
          Misalnya, dalam URL ini: https://www.youtube.com/watch?v=Z1q71gFeRqM, ID video adalah <code>Z1q71gFeRqM</code>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-live-channelid</strong></td>
        <td>ID channel YouTube yang memberikan url livestream stabil. Misalnya, dalam URL ini: https://www.youtube.com/embed/live_stream?channel=UCB8Kb4pxYzsDsHxzBfnid4Q, ID channel adalah <code>UCB8Kb4pxYzsDsHxzBfnid4Q</code>. Anda dapat menyediakan atribut <code>data-live-channelid</code>, bukan <code>data-videoid</code>, untuk menyematkan URL stabil untuk sebuah live stream, bukan video. Channel tidak dilengkapi dengan placeholder default. Anda dapat menyediakan placeholder untuk video sesuai contoh 2 di atas.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-param-*</strong></td>
        <td>Semua atribut <code>data-param-*</code> akan ditambahkan sebagai parameter kueri ke iframe src YouTube. Ini dapat digunakan untuk meneruskan nilai kustom ke plugin YouTube, misalnya, apakah kontrol akan ditampilkan atau tidak.
            Kunci dan nilai akan dienkode URI. Kunci akan berbentuk camel case.
            <ul>
            <li>`data-param-controls=1` menjadi `&amp;controls=1`</li>
          </ul>
          Lihat <a href="https://developers.google.com/youtube/player_parameters">Parameter Pemutar Tersemat YouTube</a> untuk opsi parameter lainnya untuk YouTube.
        </td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong>Memerlukan ekstensi <code>amp-video-docking</code>.</strong> Jika atribut ini ada dan video sedang diputar secara manual, video akan "diminimalkan" dan dikunci ke suatu sudut atau elemen saat pengguna men-scroll keluar dari area visual komponen video.
            Untuk detail lebih lanjut, lihat <a href="amp-video-docking.md">dokumentasi tentang ekstensi docking</a>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>credentials (opsional)</strong></td>
          <td>Menentukan opsi <code>credentials</code> seperti yang ditentukan oleh <a href="https://fetch.spec.whatwg.org/">Fetch API</a>.
            <ul>
              <li>Nilai yang didukung: `omit`,` include`</li>
              <li>Default: `include`</li>
            </ul>
            Jika Anda ingin menggunakan <a href="http://www.google.com/support/youtube/bin/answer.py?answer=141046">pemutar YouTube dalam mode privasi yang ditingkatkan</a>, masukkan nilai <code>omit</code>.
            Biasanya YouTube menyetel cookie-nya saat pemutar dimuat. Dalam mode privasi yang ditingkatkan, cookie disetel setelah pengguna mengklik pemutar.</td>
          </tr>
          <tr>
            <td width="40%"><strong>atribut umum</strong></td>
            <td>Elemen ini mencakup <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atribut umum</a> yang diperluas ke komponen AMP.</td>
          </tr>
        </table>

## Validasi <a name="validation"></a>

Lihat [aturan amp-youtube](https://github.com/ampproject/amphtml/blob/main/extensions/amp-youtube/validator-amp-youtube.protoascii) dalam spesifikasi validator AMP.
