---
'$title': Spesifikasi AMP untuk Iklan
$order: 3
formats:
  - ads
teaser:
  text: _Jika Anda ingin mengusulkan perubahan pada standar, silakan tuliskan komentar di [Intent
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

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

_Jika Anda ingin mengusulkan perubahan pada standar, silakan tuliskan komentar di [Rencana yang Ingin Diterapkan](https://github.com/ampproject/amphtml/issues/4264)_.

Iklan AMPHTML adalah sebuah mekanisme untuk merender iklan yang cepat dan efektif pada halaman AMP. Untuk memastikan bahwa dokumen iklan AMPHTML ("kreatif AMP") dapat dirender dengan cepat dan mulus di browser serta tidak menurunkan mutu pengalaman pengguna, kreatif AMP harus mematuhi seperangkat aturan validasi. Serupa dengan inti [Aturan format AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml), iklan AMPHTML mempunyai akses ke seperangkat tag, kemampuan, dan ekstensi terbatas yang diizinkan.

## Aturan format iklan AMPHTML <a name="amphtml-ad-format-rules"></a>

Kecuali ditentukan secara lain di bawah ini, kreatif harus mematuhi semua aturan yang diberikan oleh [Aturan format AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html), disertakan di sini dengan referensi. Contohnya, [Boilerplate](#boilerplate) (templat) iklan AMPHTML yang menyimpang dari boilerplate standar AMP.

Selain itu, kreatif harus mematuhi aturan-aturan berikut ini:

<table>
<thead><tr>
  <th>Aturan</th>
  <th>Alasan</th>
</tr></thead>
<tbody>
<tr>
<td>Harus menggunakan <code><html ⚡4ads></code> atau <code><html amp4ads></code> sebagai tag yang membalutnya.</td>
<td>Mengizinkan validator untuk mengidentifikasi sebuah dokumen kreatif sebagai dokumen AMP umum atau dokumen iklan AMPHTML terbatas dan untuk mengirimkannya dengan tepat.</td>
</tr>
<tr>
<td>Harus menyertakan <code><script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script></code> sebagai skrip runtime, bukan <code>https://cdn.ampproject.org/v0.js</code>.</td>
<td>Mengizinkan perilaku runtime yang disesuaikan untuk iklan AMPHTML disajikan di iframe lintas asal (cross-origin).</td>
</tr>
<tr>
<td>Tidak boleh menyertakan <code><link rel="canonical"></code>.</td>
<td>Kreatif iklan tidak mempunyai "versi kanon non-AMP" dan tidak akan diindeks sesuai pencarian secara independen, sehingga referensi sendiri tidak akan ada gunanya.</td>
</tr>
<tr>
<td>Dapat menyertakan tag-tag meta opsional di tajuk HTML sebagai pengenal, dalam format <code><meta name="amp4ads-id" content="vendor=${vendor},type=${type},id=${id}"></code>. Tag-tag meta tersebut harus ditempatkan sebelum skrip <code>amp4ads-v0.js</code>. Nilai <code>vendor</code> dan <code>id</code> adalah untai yang hanya berisi [0-9a-zA-Z_-]. Nilai <code>type</code> adalah <code>creative-id</code> atau <code>impression-id</code>.</td>
<td>Pengenal kustom tersebut dapat digunakan untuk mengidentifikasi kesan (impresi) atau produk kreatif. Ini dapat berguna untuk pelaporan dan debugging.<br><br><p>Contoh:</p>
<pre>
<meta name="amp4ads-id"
  content="vendor=adsense,type=creative-id,id=1283474">
<meta name="amp4ads-id"
  content="vendor=adsense,type=impression-id,id=xIsjdf921S"></pre>
</td>
</tr>
<tr>
<td> Pelacakan keterlihatan <code>&lt;amp-analytics></code> hanya boleh menyasar pemilih iklan penuh, melalui <code>"visibilitySpec": { "selector": "amp-ad" }</code> sebagaimana ditentukan di dalam <a href="https://github.com/ampproject/amphtml/issues/4018">Masalah #4018</a> dan <a href="https://github.com/ampproject/amphtml/pull/4368">PR #4368</a>. Secara khusus, ini mungkin tidak akan menyasar pemilih mana pun untuk elemen di dalam produk kreatif iklan.</td>
<td>Dalam beberapa kasus, iklan AMPHTML mungkin memilih untuk merender produk kreatif iklan di dalam sebuah iframe. Dalam hal ini, analitik halaman pengelola (host) memang hanya dapat menyasar seluruh iframe, dan tidak akan mempunyai akses ke pemilih yang sangat mendetail.<br><br> <p>Contoh:</p> <pre>
<amp-analytics id="nestedAnalytics">
  <script type="application/json">
  {
    "requests": {
      "visibility": "https://example.com/nestedAmpAnalytics"
    },
    "triggers": {
      "visibilitySpec": {
      "selector": "amp-ad",
      "visiblePercentageMin": 50,
      "continuousTimeMin": 1000
      }
    }
  }
  </script>
</amp-analytics>
</pre> <p>Konfigurasi ini mengirimkan permintaan ke URL <code>https://example.com/nestedAmpAnalytics</code> saat 50% dari iklan penutup telah tampil terus-menerus pada layar selama 1 detik.</p>
</td>
</tr>
</tbody>
</table>

### Boilerplate (templat) <a name="boilerplate"></a>

Kreatif iklan AMPHTML membutuhkan baris gaya boilerplate yang jauh lebih sederhana dan berbeda dibanding [yang dilakukan dokumen AMP umum](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md):

[sourcecode:html]

<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>

[/sourcecode]

_Alasan:_ Gaya `amp-boilerplate` menyembunyikan konten isi hingga runtime AMP siap dan dapat menampilkannya. Jika Javascript dinonaktifkan atau runtime AMP gagal dimuat, boilerplate default memastikan bahwa konten pada akhirnya akan ditampilkan. Namun, dalam iklan AMPHTML, jika Javascript dinonaktifkan sepenuhnya, iklan AMPHTML tidak akan berjalan dan tidak ada iklan yang akan ditampilkan, jadi bagian `<noscript>` tidak diperlukan. Jika runtime AMP tidak ada, sebagian besar mesin yang diandalkan iklan AMPHTML (misalnya, analitik untuk pelacakan visibilitas atau `amp-img` untuk tampilan konten) tidak akan tersedia, jadi lebih baik tidak menampilkan iklan daripada menampilkan yang tidak berfungsi.

Terakhir, boilerplate iklan AMPHTML menggunakan `amp-a4a-boilerplate`, bukan `amp-boilerplate`, sehingga validator dapat dengan mudah mengidentifikasinya dan menghasilkan pesan kesalahan (eror) yang lebih akurat untuk membantu pengembang.

Perhatikan bahwa aturan yang sama tentang mutasi pada teks boilerplate berlaku seperti pada [boilerplate AMP umum](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md).

### CSS <a name="css"></a>

<table>
<thead><tr>
  <th>Aturan</th>
  <th>Alasan</th>
</tr></thead>
<tbody>
  <tr>
    <td>
<code>position:fixed</code> dan <code>position:sticky</code> dilarang di dalam CSS kreatif.</td>
    <td> <code>position:fixed</code> keluar dari DOM bayangan, yang diandalkan oleh iklan AMPHTML. Jadi, iklan dalam AMP sudah tidak diizinkan untuk menggunakan posisi tetap.</td>
  </tr>
  <tr>
    <td>
<code>touch-action</code> dilarang.</td>
    <td>Iklan yang dapat memanipulasi <code>touch-action</code> dapat mengganggu kemampuan pengguna untuk menggulir di dokumen host.</td>
  </tr>
  <tr>
    <td>Kreatif CSS dibatas hingga 20.000 byte.</td>
    <td>Blok CSS yang besar membuat kreatif membengkak, meningkatkan latensi jaringan, dan menurunkan kinerja halaman.</td>
  </tr>
  <tr>
    <td>Transisi dan animasi akan dikenakan pembatasan tambahan.</td>
    <td>AMP harus dapat mengontrol semua animasi pada sebuah iklan sehingga dapat menghentikan mereka saat iklan tidak ada di layar atau saat sumber daya sistem sangat rendah.</td>
  </tr>
  <tr>
    <td>Prefiks yang khusus untuk vendor tertentu dianggap sebagai alias untuk simbol yang sama tanpa prefiks untuk keperluan validasi. Ini berarti bahwa jika sebuah <code>foo</code> simbol dilarang oleh aturan validasi CSS, maka simbol <code>-vendor-foo</code> juga akan dilarang.</td>
    <td>Beberapa properti yang telah diberikan prefiks sebelumnya oleh vendor memberikan fungsionalitas yang setara dengan properti yang dilarang atau dibatasi sesuai dengan aturan-aturan ini.<br><br><p>Contoh: <code>-webkit-transition</code> dan <code>-moz-transition</code> dianggap sebagai alias untuk <code>transition</code>.  Mereka hanya akan diizinkan di dalam konteks di mana <code>transition</code> dasar akan diizinkan (lihat bagian <a href="#selectors">Pemilih</a> di bawah ini).</p>
</td>
  </tr>
</tbody>
</table>

#### Transisi dan animasi CSS <a name="css-animations-and-transitions"></a>

##### Pemilih <a name="selectors"></a>

Properti `transition` dan `animation` hanya diperbolehkan pada pemilih yang:

- Hanya berisi properti `transition`, `animation`, `transform`, `visibility`, atau `opacity`.

  _Alasan:_ : Ini memungkinkan runtime AMP untuk menghapus kelas ini dari konteks untuk menonaktifkan animasi, saat diperlukan untuk kinerja halaman.

**Bagus**

[sourcecode:css]
.box {
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

**Buruk**

Properti yang tidak diizinkan di kelas CSS.

[sourcecode:css]
.box {
color: red; // non-animation property not allowed in animation selector
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

##### Properti yang dapat ditransisikan dan dianimasikan <a name="transitionable-and-animatable-properties"></a>

Satu-satunya properti yang dapat ditransisikan adalah keburaman (opasitas) dan transformasi. ([Alasan](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/))

**Bagus**

[sourcecode:css]
transition: transform 2s;
[/sourcecode]

**Buruk**

[sourcecode:css]
transition: background-color 2s;
[/sourcecode]

**Bagus**

[sourcecode:css]
@keyframes turn {
from {
transform: rotate(180deg);
}

to {
transform: rotate(90deg);
}
}
[/sourcecode]

**Buruk**

[sourcecode:css]
@keyframes slidein {
from {
margin-left: 100%;
width: 300%;
}

to {
margin-left: 0%;
width: 100%;
}
}
[/sourcecode]

### Bawaan dan ekstensi AMP yang diizinkan <a name="allowed-amp-extensions-and-builtins"></a>

Yang berikut ini adalah tag bawaan AMP dan modul ekstensi AMP _yang diizinkan_ di dalam sebuah kreatif iklan AMPHTML. Tag bawaan atau ekstensi yang tidak dicantumkan secara tegas berarti dilarang.

- [amp-accordion](https://amp.dev/documentation/components/amp-accordion)
- [amp-ad-exit](https://amp.dev/documentation/components/amp-ad-exit)
- [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- [amp-anim](https://amp.dev/documentation/components/amp-anim)
- [amp-animation](https://amp.dev/documentation/components/amp-animation)
- [amp-audio](https://amp.dev/documentation/components/amp-audio)
- [amp-bind](https://amp.dev/documentation/components/amp-bind)
- [amp-carousel](https://amp.dev/documentation/components/amp-carousel)
- [amp-fit-text](https://amp.dev/documentation/components/amp-fit-text)
- [amp-font](https://amp.dev/documentation/components/amp-font)
- [amp-form](https://amp.dev/documentation/components/amp-form)
- [amp-img](https://amp.dev/documentation/components/amp-img)
- [amp-layout](https://amp.dev/documentation/components/amp-layout)
- [amp-lightbox](https://amp.dev/documentation/components/amp-lightbox)
- amp-mraid, berbasis eksperimental. Jika Anda mempertimbangkan untuk menggunakan ini, silakan buka masalah di [wg-monetization](https://github.com/ampproject/wg-monetization/issues/new).
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

Sebagian besar yang ditiadakan adalah demi kinerja atau untuk membuat iklan AMPHTML lebih sederhana untuk dianalisis.

_Contoh:_ `<amp-ad>` ditiadakan dari daftar ini. Ini secara tegas tidak diizinkan karena mengizinkan sebuah `<amp-ad>` di dalam sebuah `<amp-ad>` dapat berpotensi menimbulkan aliran pemuatan iklan yang tidak dapat dikendalikan, dan ini tidak sesuai dengan tujuan kinerja iklan AMPHTML.

_Contoh:_ `<amp-iframe>` ditiadakan dari daftar ini. Ini tidak diizinkan karena iklan dapat menggunakannya untuk mengeksekusi JavaScript sesuka hati dan memuat konten sesuka hati. Iklan yang ingin menggunakan kemampuan seperti ini harus menghasilkan `false` dari entri [a4aRegistry](https://github.com/ampproject/amphtml/blob/main/ads/_a4a-config.js#L40)-nya dan menggunakan mekanisme perenderan iklan '3p iframe' yang sudah ada.

_Contoh:_ `<amp-facebook>`, `<amp-instagram>`, `<amp-twitter>`, dan `<amp-youtube>`, kesemuanya ditiadakan karena alasan yang sama dengan `<amp-iframe>`: Semua ini menciptakan iframe dan berpotensi menggunakan sumber daya yang tidak terbatas yang mereka miliki.

_Contoh:_ `<amp-ad-network-*-impl>` ditiadakan dari daftar ini. Tag `<amp-ad>` menangani penugasan ke tag-tag penerapan ini; kreatif tidak boleh berupaya untuk menyertakan mereka secara langsung.

_Contoh:_ `<amp-lightbox>` masih belum disertakan karena bahkan beberapa kreatif iklan AMPHTML dapat dirender di dalam sebuah iframe dan saat ini belum ada mekanisme bagi sebuah iklan untuk keluar melampaui iframe. Dukungan mungkin ditambahkan untuk hal ini di masa mendatang jika dirasa perlu.

### Tag HTML <a name="html-tags"></a>

Yang berikut ini adalah tag-tag _yang diizinkan_ di dalam kreatif iklan AMPHTML. Tag-tag yang tidak dicantumkan secara tegas berarti dilarang. Daftar ini adalah sebagian dari [Daftar tambahan tag AMP yang diizinkan](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/../../spec/amp-tag-addendum.md) yang umum. Seperti daftar tersebut, ini diurutkan sesuai dengan spesifikasi HTML5 di dalam bagian 4: [Elemen HTML](http://www.w3.org/TR/html5/single-page.html#html-elements).

Sebagian besar yang ditiadakan adalah demi kinerja atau karena tag-tag tersebut bukan standar HTML5. Contohnya, `<noscript>` ditiadakan karena iklan AMPHTML membutuhkan JavaScript, sehingga blok `<noscript>` tidak akan pernah mengeksekusi dan, oleh karena itu, hanya akan membengkakkan kreatif dan menguasai bandwidth serta mengakibatkan latensi. Demikian juga dengan `<acronym>`, `<big>`, dan yang semacamnya, mereka dilarang karena tidak kompatibel dengan HTML5.

#### 4.1 Elemen root <a name="41-the-root-element"></a>

4.1.1 `<html>`

- Harus menggunakan jenis `<html ⚡4ads>` atau `<html amp4ads>`

#### 4.2 Metadata dokumen <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- Tag-tag `<link rel=...>` tidak diizinkan, kecuali untuk `<link rel=stylesheet>`.

- **Catatan:** Tidak seperti di AMP umum, tag-tag `<link rel="canonical">` dilarang.

  4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 Bagian <a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, dan `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 Mengelompokkan Konten <a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 Semantik tingkat teks <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` and `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>`

#### 4.6 Edit <a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 Konten yang Disematkan <a name="47-embedded-content"></a>

- Konten yang disematkan hanya didukung melalui tag AMP, seperti `<amp-img>` atau `<amp-video>`.

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

Tag-tag SVG tidak ada di dalam namespace HTML5. Mereka dicantumkan di bawah tanpa ID bagian.

` <svg>``<g>``<path>``<glyph>``<glyphref>``<marker>``<view>``<circle>``<line>``<polygon>``<polyline>``<rect>``<text>``<textpath>``<tref>``<tspan>``<clippath>``<filter>``<lineargradient>``<radialgradient>``<mask>``<pattern>``<vkern>``<hkern>``<defs>``<use>``<symbol>``<desc>``<title> `

#### 4.9 Data tabel <a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 Formulir <a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11 Pembuatan skrip <a name="411-scripting"></a>

- Seperti dokumen AMP umum, tag `<head>` kreatif harus berisi tag `<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>`.
- Tidak seperti AMP umum, `<noscript>` dilarang.
  - _Alasan:_ Karena iklan AMPHTML memerlukan JavaScript agar dapat berfungsi, blok `<noscript>` tidak berguna di dalam iklan AMPHTML dan hanya menghabiskan bandwidth jaringan.
- Tidak seperti AMP umum, `<script type="application/ld+json">` dilarang.
  - _Alasan:_ JSON LD digunakan untuk penandaan data berstruktur di halaman host, namun kreatif iklan bukan dokumen mandiri dan tidak berisi data berstruktur. Blok JSON LD pada kreatif iklan hanya akan menghabiskan bandwidth.
- Semua pengecualian dan aturan pembuatan skrip lainnya adalah bawaan dari AMP umum.
