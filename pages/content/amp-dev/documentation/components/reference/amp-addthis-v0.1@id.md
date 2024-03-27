---
$title: amp-addthis
$category@: social
teaser:
  text: Displays an AddThis website tools embed.
---


<!--
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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



Menampilkan sematan fitur situs [AddThis](https://www.addthis.com).

<table>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-addthis" src="https://ampjs.org/v0/amp-addthis-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
</table>


## Mengapa AddThis? <a name="why-addthis"></a>

Komponen `amp-addthis` menyediakan tombol berbagi yang simpel dan cantik. Permudah pengunjung situs Anda untuk membagikan konten ke lebih dari 200 saluran sosial termasuk Messenger, WhatsApp, Facebook, Twitter, Pinterest, dan banyak lagi.

AddThis dipercaya oleh lebih dari 15.000.000 situs dengan lebih dari 2 miliar pengguna unik, yang membagikan konten ke seluruh dunia, dalam lebih dari 60 bahasa.

## Tombol Berbagi <a name="share-buttons"></a>

### Mengambang <a name="floating"></a>

Ditempatkan di samping, di atas, atau di bawah halaman, mengikuti gerakan scroll pembaca. Cara terbaik untuk mempromosikan fitur berbagi dengan cara yang tidak terlalu mencolok.

Contoh:
```html
<!--
  This example uses a placeholder pubId.
  Please replace the pubId value with your own after
  creating an account on https://www.addthis.com/dashboard.
-->
<amp-addthis
  width="320"
  height="92"
  layout="responsive"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="957l"
  data-widget-type="floating">
</amp-addthis>
```

### Inline <a name="inline"></a>

Integrasikan tombol berbagi ke dalam konten Anda untuk memberikan pengalaman berbagi yang lancar.

Contoh:
```html
<!--
  This example uses a placeholder pubId.
  Please replace the pubId value with your own after
  creating an account on https://www.addthis.com/dashboard.
-->
<amp-addthis
  width="320"
  height="92"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="mv93"
  data-widget-type="inline">
</amp-addthis>
```

## Atribut <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>data-pub-id</strong></td>
    <td>ID penerbit AddThis yang ada dalam URL di <a href="https://addthis.com/dashboard">dasbor AddThis</a> setelah login. Misalnya, dalam URL <code>https://www.addthis.com/dashboard#gallery/pub/ra-5c191331410932ff</code>, ID penerbitnya adalah <code>ra-5c191331410932ff</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-id</strong></td>
    <td>ID widget AddThis untuk fitur yang akan ditampilkan, juga terletak di <a href="https://addthis.com/dashboard">dasbor AddThis</a>. ID widget untuk fitur tertentu dapat ditemukan dengan membuka fitur tersebut di dasbor AddThis dan menyalin bagian terakhir URL. Misalnya, dalam URL <code>https://www.addthis.com/dashboard#tool-config/pub/ra-5c191331410932ff/widgetId/957l</code>, ID widget-nya adalah <code>957l</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-type</strong></td>
    <td>Atribut yang menjelaskan jenis widget.
      <ul>
        <li>Mengambang: <code>data-widget-type="floating"</code></li>
        <li>Inline: <code>data-widget-type="inline"</code></li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-title</strong></td>
      <td>Opsional. Jika ditetapkan, atribut ini adalah judul yang akan dicoba bagikan oleh fitur AddThis saat berbagi dilakukan. Jika tidak ditetapkan, judul dokumen yang memuat tag <code>amp-addthis</code> akan digunakan.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-url</strong></td>
      <td>Opsional. Jika ditetapkan, atribut ini adalah URL yang akan dicoba bagikan oleh fitur AddThis saat berbagi dilakukan. Jika tidak ditetapkan, properti <code>location.href</code> dari dokumen yang memuat tag <code>amp-addthis</code> akan digunakan.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-media</strong></td>
      <td>Opsional. Jika ditetapkan, atribut ini adalah URL untuk media (mis., gambar atau video) yang akan dicoba bagikan oleh fitur AddThis saat berbagi dilakukan. Jika tidak ditetapkan, atribut ini akan dibiarkan ada adanya.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-description</strong></td>
      <td>Opsional. Jika ditetapkan, atribut ini adalah deskripsi halaman yang akan dicoba bagikan oleh fitur AddThis saat berbagi dilakukan. Jika tidak ditetapkan, atribut ini akan dibiarkan ada adanya.</td>
    </tr>
  </table>

## Dokumentasi Penerapan <a name="implementation-documentation"></a>

1. Jika belum memiliki akun AddThis, Anda perlu membuatnya di [https://www.addthis.com/register](https://www.addthis.com/register). Akun AddThis sepenuhnya gratis dan dapat Anda gunakan untuk mengakses seluruh rangkaian fitur situs serta laporan analisis mendalam kami untuk memahami traffic media sosial situs Anda dengan lebih baik.
1. Buka [dasbor](https://addthis.com/dashboard) dan sesuaikan Tombol Berbagi Anda (saat ini AMP hanya mendukung Tombol Berbagi jenis Mengambang &amp; Inline).
1. Sesuaikan tombol berbagi sesuai keinginan Anda, lalu tekan “activate tool”. Tindakan ini akan mengalihkan Anda ke halaman Get The Code.
1. Terakhir, copy-paste kode inline ke dalam isi halaman tempat Anda ingin menampilkan tombol berbagi. Untuk Tombol Berbagi Mengambang, Anda dapat menempatkan kode ini di mana saja di dalam isi karena tombol akan otomatis muncul di sisi kiri atau kanan layar, tergantung di mana Anda mengatur posisi Tombol Berbagi pada setelan fitur.

Dan selesai! Anda akan melihat tombol berbagi di halaman Anda!

Lihat [video YouTube](https://www.youtube.com/watch?v=BSkuAB4er2o) kami untuk mendapatkan petunjuk langkah demi langkah:
<amp-youtube width="480" height="270" data-videoid="BSkuAB4er2o" layout="responsive"></amp-youtube>

## Validasi <a name="validation"></a>

Lihat [aturan amp-addthis](https://github.com/ampproject/amphtml/blob/main/extensions/amp-addthis/validator-amp-addthis.protoascii) dalam spesifikasi validator AMP.

## Privasi <a name="privacy"></a>

[http://www.addthis.com/privacy/privacy-policy/](http://www.addthis.com/privacy/privacy-policy/)

AddThis Tools dan AddThis Toolbar mengumpulkan informasi dari perangkat yang digunakan oleh Pengguna Akhir untuk berinteraksi dengan Situs Penerbit atau oleh Pengguna Toolbar untuk berinteraksi dengan AddThis Toolbar (“Data AddThis”).

Data AddThis dapat terdiri dari berikut ini:

* Alamat Internet Protocol (IP), ID Periklanan Seluler (MAID) (yang dapat digunakan oleh developer aplikasi seluler untuk mengidentifikasi siapa yang menggunakan aplikasi seluler mereka), ID aplikasi seluler, jenis browser, bahasa browser, jenis sistem operasi, serta tanggal dan waktu Pengguna Akhir mengunjungi Situs Penerbit atau Toolbar
* Pengguna yang menggunakan Toolbar;
* Perilaku di Situs Penerbit, seperti berapa lama Pengguna Akhir mengunjungi Situs Penerbit, perilaku berbagi Pengguna Akhir untuk Konten yang ada di Situs Penerbit, dan perilaku scroll Pengguna Akhir di Situs Penerbit;
* URL perujuk dan penelusuran web yang digunakan Pengguna Akhir untuk menemukan dan menavigasi ke Situs Penerbit;
* Kata kunci yang dimasukkan ke dalam fungsi penelusuran AddThis Toolbar, dan apakah dan kapan Pengguna Toolbar mendownload, menginstal, atau meng-uninstal AddThis Toolbar;
* Informasi mengenai seberapa sering Pengguna Akhir menggunakan AddThis Tools dan seberapa sering Pengguna Toolbar menggunakan AddThis Toolbar; dan
* Data geolokasi yang diambil dari Alamat IP Pengguna Akhir dan Pengguna Toolbar.

Data AddThis akan diperlakukan sebagai informasi pribadi sejauh yang diwajibkan berdasarkan undang-undang yang berlaku. Sesuai Persyaratan Layanan AddThis, penerbit diwajibkan memperoleh semua persetujuan dan otorisasi Pengguna Akhir yang diperlukan, dan menyampaikan semua pemberitahuan wajib terkait penyediaan Data AddThis yang dikumpulkan dari Pengguna Akhir ke Oracle.

## Dukungan <a name="support"></a>

Jika Anda memiliki pertanyaan atau memerlukan bantuan dalam menerapkan AddThis di AMP, hubungi tim dukungan kami yang luar biasa dengan mengirimkan tiket [di sini](https://www.addthis.com/support/) atau dengan mengirim email ke [help@addthis.com](mailto%3ahelp@addthis.com).
