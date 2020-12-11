---
$title: amp-lightbox
$category@: layout
teaser:
  text: Displays elements in a full-viewport “lightbox” modal.
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



<table>
  <tr>
    <td width="40%"><strong>Deskripsi</strong></td>
    <td>Menampilkan elemen dalam modal "lightbox" viewport penuh.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td width="40%"><strong>Contoh</strong></td>
    <td>Lihat contoh <a href="https://ampbyexample.com/components/amp-lightbox/">amp-lightbox</a> di AMP By Example.</td>
  </tr>
</table>


## Perilaku <a name="behavior"></a>

Komponen `amp-lightbox` menentukan elemen turunan yang ditampilkan dalam modal/overlay viewport penuh. Saat pengguna menge-tap atau mengklik sebuah elemen (misalnya tombol), ID `amp-lightbox` yang dirujuk dalam atribut `on` elemen yang diklik akan memicu lightbox agar mengisi viewport penuh dan menampilkan elemen turunan `amp-lightbox`.

Menekan tombol escape pada keyboard akan menutup lightbox. Cara lainnya, menetapkan atribut `on` pada satu atau beberapa elemen dalam lightbox dan menetapkan metodenya ke `close` akan menutup lightbox saat elemen di-tap atau diklik.

```html
<button on="tap:quote-lb">See Quote</button>
<amp-lightbox id="quote-lb" layout="nodisplay">
  <blockquote>"Don't talk to me about JavaScript fatigue" - Horse JS</blockquote>
  <button on="tap:quote-lb.close">Nice!</button>
</amp-lightbox>
```

[tip type="read"]
Untuk menampilkan gambar di lightbox, ada juga komponen [`<amp-image-lightbox>`](amp-image-lightbox.md).
[/tip]

## Atribut <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>animate-in (opsional)</strong></td>
    <td>Menentukan gaya animasi untuk membuka lightbox. Secara default, nilai ini ditetapkan ke <code>fade-in</code>. Nilai yang valid adalah <code>fade-in</code>, <code>fly-in-bottom</code>, dan <code>fly-in-top</code>.
      <br><br>
        <strong>Catatan</strong>: Preset animasi <code>fly-in-*</code> mengubah properti <code>transform</code> elemen <code>amp-lightbox</code>. Jangan mengandalkan transformasi elemen <code>amp-lightbox</code> secara langsung. Jika Anda perlu menerapkan transformasi, tetapkan hal itu pada elemen bertingkat.</td>
      </tr>
      <tr>
        <td width="40%"><strong>close-button (wajib dalam iklan AMPHTML)</strong></td>
        <td>Merender header tombol tutup di bagian atas lightbox. Atribut ini hanya wajib dan valid untuk penggunaan dengan <a href="#a4a">Iklan AMPHTML</a>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>id (wajib)</strong></td>
        <td>ID unik untuk lightbox.</td>
      </tr>
      <tr>
        <td width="40%"><strong>layout (wajib)</strong></td>
        <td>Harus ditetapkan ke <code>nodisplay</code>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>scrollable (opsional)</strong></td>
        <td>Apabila atribut <code>scrollable</code> ada, konten lightbox dapat di-scroll jika melebihi tinggi lightbox.
          <br><br>
            <strong>Catatan</strong>: Atribut <code>scrollable</code> tidak diizinkan saat menggunakan <code><amp-lightbox></code> di dalam iklan AMPHTML. Untuk selengkapnya, baca bagian <a href="#a4a">Menggunakan amp-lightbox dalam iklan AMPHTML</a>.</td>
          </tr>
          <tr>
            <td width="40%"><strong>scrollable (opsional)</strong></td>
            <td></td>
          </tr>
        </table>

## Penataan gaya <a name="styling"></a>

Anda dapat mengatur gaya `amp-lightbox` dengan CSS standar.

## Tindakan <a name="actions"></a>

`amp-lightbox` menampilkan tindakan berikut yang dapat Anda gunakan pada [AMP on-syntax untuk memicu](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md):

<table>
  <tr>
    <th width="20%">Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>open</code> (default)</td>
    <td>Membuka lightbox.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Menutup lightbox.</td>
  </tr>
</table>

## <a id="a4a"></a>Menggunakan `amp-lightbox` dalam iklan AMPHTML <a name="a4a"></a>

[tip type="note"]
Komponen `amp-lightbox` untuk digunakan dalam ikan AMPHTML masih bersifat [eksperimental](../../../documentation/guides-and-tutorials/learn/experimental.md) dan terus mengalami pengembangan. Untuk menggunakan `amp-lightbox` dalam iklan AMPHTML, [aktifkan eksperimen `amp-lightbox-a4a-proto`](http://cdn.ampproject.org/experiments.html).
[/tip]

Ada beberapa perbedaan antara menggunakan `amp-lightbox` dalam dokumen AMP normal dengan [iklan yang ditulis dalam AMPHTML](../../../documentation/guides-and-tutorials/learn/a4a_spec.md):

### Memerlukan close-button <a name="requires-close-button"></a>

Untuk iklan AMPHTML, atribut `close-button` wajib ada. Atribut ini menyebabkan header dirender di bagian atas lightbox. Header berisi tombol tutup dan label yang menampilkan "Ad" (Iklan). Persyaratan header ini diperlukan untuk:

* Menetapkan pengalaman pengguna yang konsisten dan dapat diprediksi untuk iklan AMPHTML.
* Memastikan bahwa titik keluar untuk lightbox selalu ada; jika tidak, materi iklan dapat secara efektif membajak konten dokumen host melalui lightbox.

Atribut `close-button` wajib dan hanya diizinkan dalam iklan AMPHTML. Dalam dokumen AMP reguler, Anda dapat merender tombol tutup di mana pun diperlukan sebagai bagian dari konten `<amp-lightbox>`.

### Lightbox yang dapat di-scroll tidak diizinkan <a name="scrollable-lightboxes-are-disallowed"></a>

Untuk iklan AMPHTML, lightbox yang dapat di-scroll tidak diizinkan.

### Latar belakang transparan <a name="transparent-background"></a>

Ketika Anda menggunakan `<amp-lightbox>` dalam iklan AMPHTML, latar belakang elemen `<body>` menjadi transparan karena AMP runtime berubah ukuran dan menyusun kembali konten materi iklan Anda sebelum lightbox diperluas. Hal ini dilakukan untuk mencegah visual "jump" (loncatan visual) materi iklan saat lightbox terbuka. Jika materi iklan Anda membutuhkan latar belakang, tetapkan nilainya pada container (seperti `<div>` ukuran penuh), bukan `<body>`.

Saat iklan AMPHTML berjalan di lingkungan pihak ketiga (misalnya dalam dokumen non-AMP), materi iklan tersebut akan ditempatkan di tengah viewport, baru kemudian diperluas. Hal ini karena iframe pihak ketiga harus mengandalkan postMessage API untuk mengaktifkan fitur seperti pengubahan ukuran bingkai, yang bersifat asinkron. Jadi, dengan mula-mula menempatkan materi iklan di tengah viewport, transisi akan berjalan lancar tanpa visual jump.

### Contoh transisi dalam lightbox untuk iklan AMPHTML <a name="examples-of-transitions-in-lightbox-for-amphtml-ads"></a>

Pada contoh di bawah, kami menunjukkan tampilan transisi untuk iklan AMPHTML dengan atribut `animate-in="fly-in-bottom"` yang ditetapkan pada elemen lightbox untuk iklan AMPHTML dalam iframe yang sesuai, dan iklan AMPHTML dalam iframe pihak ketiga.

##### Pada iframe yang sesuai (misalnya, yang berasal dari cache AMP) <a name="on-friendly-iframes-eg-coming-from-an-amp-cache"></a>

<amp-img alt="iklan lightbox dalam iframe yang sesuai" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/master/spec/img/lightbox-ad-fie.gif" layout="fixed">
  <noscript>
    <img alt="iklan lightbox dalam iframe yang sesuai" src="../../spec/img/lightbox-ad-fie.gif">
    </noscript>
  </amp-img>

##### Pada iframe pihak ketiga (misalnya, dari luar cache AMP) <a name="on-third-party-iframes-eg-outside-the-amp-cache"></a>

<amp-img alt="iklan lightbox dalam iframe 3p" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/master/spec/img/lightbox-ad-3p.gif" layout="fixed">
  <noscript>
    <img alt="iklan lightbox dalam iframe 3p" src="../../spec/img/lightbox-ad-3p.gif">
    </noscript>
  </amp-img>

## Validasi <a name="validation"></a>

Lihat [aturan amp-lightbox](https://github.com/ampproject/amphtml/blob/master/extensions/amp-lightbox/validator-amp-lightbox.protoascii) dalam spesifikasi validator AMP.
