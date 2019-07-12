---
$category@: layout
formats:
- websites
- email
- ads
teaser:
  text: Provides a way for viewers to have a glance at the outline of the content and jump to a section of their choice at will.
---


<!---
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

# amp-accordion

Menyediakan cara bagi pengunjung untuk melihat sekilas garis besar konten dan meloncat ke bagian mana pun. Cara ini berguna pada perangkat seluler yang bahkan beberapa kalimat dalam suatu bagian pun terkadang memerlukan scrolling.

<table>
  <tr>
    <td class="col-fourty"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Tata Letak yang Didukung</a></strong></td>
    <td>container</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Contoh</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-accordion/">Contoh kode yang dianotasi untuk amp-accordion</a></td>
  </tr>
</table>


## Perilaku

Komponen `amp-accordion` memungkinkan Anda menampilkan bagian konten yang dapat diciutkan dan diluaskan. Setiap turunan langsung dari komponen `amp-accordion` akan dianggap sebagai bagian dalam accordion. Setiap node tersebut harus berupa tag `<section>`.

* Suatu `amp-accordion` dapat berisi satu atau beberapa elemen `<section>` sebagai turunan langsungnya.
* Setiap `<section>` harus berisi persis dua turunan langsung.
* Turunan pertama (dari bagian tersebut) menunjukkan judul bagian dan harus berupa elemen judul (salah satu dari `h1`, `h2`, ..., `h6`, `header`).
* Turunan kedua (dari bagian tersebut) dapat berupa tag apa pun yang diizinkan dalam HTML AMP dan menunjukkan isi bagian.
* Mengklik/menge-tap judul bagian akan memperluas atau menciutkan bagian itu.
* Status diciutkan/diluaskan setiap bagian dalam elemen `amp-accordion` akan dipertahankan selama level sesi. Untuk berhenti mempertahankan status ini, tambahkan atribut `disable-session-states` ke elemen `amp-accordion`.

#### Contoh: Menampilkan accordion

Dalam contoh ini, kami menampilkan tiga bagian. Bagian ketiga diluaskan saat halaman dimuat.  Selain itu, kami tidak mempertahankan status yang diciutkan/diluaskan dengan menetapkan `disable-session-states`.

<!--embedded example - displays in ampproject.org -->

<div>
  <amp-iframe height="395" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampaccordion.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Tampilkan selengkapnya" overflow="" tabindex="0" role="button">Tampilkan kode lengkap</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

[tip type="success"]
Untuk melihat demo `amp-accordion` lainnya, buka [AMP By Example](https://ampbyexample.com/components/amp-accordion/).
[/tip]

### Peristiwa

Peristiwa di bawah akan dipicu pada `section` dari `accordion`.

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Peristiwa ini dipicu pada <code>section</code> target yang berubah dari status diciutkan menjadi diluaskan. Perhatikan bahwa memanggil <code>expand</code> pada <code>section</code> yang telah diluaskan tidak akan memicu peristiwa ini.</td>
  </tr>
  <tr>
    <td width="40%"><strong><strong><code>collapse</code></strong></strong>
    </td>
    <td>Peristiwa ini dipicu pada <code>section</code> target yang berubah dari status diluaskan menjadi diciutkan. Perhatikan bahwa memanggil <code>collapse</code> pada <code>section</code> yang telah diciutkan tidak akan memicu peristiwa ini.</td>
  </tr>
</table>

### Tindakan

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Peristiwa ini dipicu pada <code>section</code> target yang berubah dari status diciutkan menjadi diluaskan. Perhatikan bahwa memanggil <code>expand</code> pada <code>section</code> yang telah diluaskan tidak akan memicu peristiwa ini.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>toggle</code></strong></td>
    <td>Tindakan ini memicu peralihan status antara <code>expanded</code> dan <code>collapsed</code> pada <code>amp-accordion</code>. Jika dipanggil tanpa argumen, status semua bagian accordion akan dialihkan. Bagian tunggal dapat ditetapkan dengan argumen <code>section</code> dan <code>id</code> yang sesuai sebagai nilainya.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Tindakan ini meluaskan <code>amp-accordion</code>. Jika sudah <code>expanded</code>, statusnya akan tetap seperti itu. Jika dipanggil tanpa argumen, semua bagian accordion akan diluaskan. Bagian tunggal dapat ditetapkan dengan argumen <code>section</code> dan <code>id</code> yang sesuai sebagai nilainya.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>Tindakan ini menciutkan <code>amp-accordion</code>. Jika sudah diciutkan, statusnya akan tetap seperti itu. Jika dipanggil tanpa argumen, semua bagian accordion akan diciutkan. Bagian tunggal dapat ditetapkan dengan argumen <code>section</code> dan <code>id</code> yang sesuai sebagai nilainya.</td>
  </tr>
</table>

#### Atribut

<table>
  <tr>
    <td width="40%"><strong><code>animate</code></strong></td>
    <td>Tetapkan atribut ini pada <code>&lt;amp-accordion&gt;</code> untuk menganimasikan perluasan/penciutan semua bagian accordion.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>disable-session-states</code></strong></td>
    <td>Tetapkan atribut ini pada <code>&lt;amp-accordion&gt;</code> untuk memilih tidak mempertahankan status diciutkan/diluaskan accordion.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expanded</code></strong></td>
    <td>Tetapkan atribut ini pada <code>&lt;section&gt;</code> untuk menampilkan bagian sebagai diluaskan saat halaman dimuat.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand-single-section</code></strong></td>
    <td>Tetapkan atribut ini pada <code>&lt;amp-accordion&gt;</code> untuk mengizinkan hanya satu <code>&lt;section&gt;</code> yang diluaskan pada satu waktu. Jika pengguna berfokus pada satu <code>&lt;section&gt;</code>, <code>&lt;section&gt;</code> lain yang sebelumnya diluaskan akan diciutkan.</td>
  </tr>
</table>

## Penataan gaya

* Anda dapat menggunakan pemilih elemen `amp-accordion` untuk menata gayanya dengan bebas.
* Elemen `amp-accordion` selalu berupa `display: block`.
* Elemen `<section>`, judul, dan isi tidak dapat dibuat mengapung.
* Saat bagian diluaskan, elemen `<section>` memiliki atribut `expanded`.
* Elemen isi telah di-clearfix dengan `overflow: hidden`, sehingga tidak dapat memiliki scrollbar.
* Margin elemen `<amp-accordion>`, `<section>`, judul, dan isi ditetapkan ke 0 dan dapat diganti dalam gaya kustom.
* Baik elemen judul maupun isi bersifat `position: relative`.

## Validasi

Lihat [aturan amp-accordion](https://github.com/ampproject/amphtml/blob/master/extensions/amp-accordion/validator-amp-accordion.protoascii) dalam spesifikasi validator AMP.
