---
$title: Kesalahan Validasi AMP
---

<!---
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

Tidak boleh ada kesalahan validasi apa pun dalam dokumen AMP yang valid.
Tujuan dokumen ini adalah untuk membantu Anda memahami
dengan lebih baik dan memperbaiki kesalahan validasi yang dihadapi
ketika [memvalidasi laman AMP](/id/docs/guides/validate.html).
Untuk ringkasan lengkap kesalahan validasi,
lihat [spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

[TOC]

## Kesalahan atribut dan tag HTML AMP

### Tag wajib tidak tersedia

<table>
   <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>MANDATORY_TAG_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Tambahkan (atau perbaiki) tag HTML wajib.</td>
  </tr>
</table>

Tag berikut harus ada di semua dokumen AMP:

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`body`

Tag wajib ini termasuk bidang `mandatory: true` di [spek validator AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii);
juga dirujuk dalam [spesifikasi AMP](/docs/reference/spec.html).

### Tag yang dibutuhkan oleh tag lain tidak tersedia

<table>
   <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>TAG_REQUIRED_BY_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The '%1' tag is missing or incorrect, but required by '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Tambahkan (atau perbaiki) tag HTML yang dibutuhkan.</td>
  </tr>
</table>

Validator memunculkan kesalahan `TAG_REQUIRED_BY_MISSING`
ketika menemukan komponen yang diperpanjang di dokumen AMP,
tetapi tidak menemukan persamaannya `<script>`.

[Komponen yang diperpanjang](/docs/reference/components.html)
harus disertakan dalam dokumen AMP sebagai komponen khusus.
Untuk memperbaiki kesalahan ini, navigasikan ke laman referensi komponen yang diperpanjang,
salin skrip yang dibutuhkan, dan tempel ke dokumen AMP `<head>`.

### Tag terlarang

<table>
   <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>DISALLOWED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Hapus tag terlarang.</td>
  </tr>
</table>

Tag dimasukkan ke daftar putih, sehingga tidak ada daftar definitif semua tag terlarang;
namun, [spesifikasi AMP](/docs/reference/spec.html)
mendefinisikan secara luas kumpulan tag terlarang.

### Atribut wajib tidak tersedia

<table>
   <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>MANDATORY_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory attribute '%1' is missing in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Tambahkan atribut wajib ke tag.</td>
  </tr>
</table>

Atribut wajib tag AMP didefinisikan dalam
[spek validator AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
Cukup telusuri tag,
lihat atribut yang tercantum,
dan periksa `mandatory: true`.
Atribut wajib setiap tag AMP juga tercantum
dalam spesifikasi tag.

### Nilai atribut tidak valid

<table>
   <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>INVALID_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Perbaiki nilai atribut menjadi nilai yang valid.</td>
  </tr>
</table>

Kesalahan ini menunjukkan bahwa tag HTML memiliki atribut dengan nama yang diizinkan,
tetapi nilainya terlarang.
Misalnya, pemicu umum kesalahan ini adalah nilai yang tidak valid untuk URL.
Semua nilai URL (di atribut `href` dan `src`) harus cocok dengan salah satu
[nilai atribut yang mungkin](http://www.w3schools.com/tags/att_a_href.asp) berikut.

<strong>PENTING:</strong> Banyak nilai URL di AMP membutuhkan HTTPS.
Jika Anda mendapati kesalahan ini, dan tidak yakin tentang penyebabnya,
periksa spesifikasi tag AMP yang relevan
untuk melihat atribut yang membutuhkan HTTPS.

### Atribut terlarang

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>DISALLOWED_ATTR</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' may not appear in tag '%2'."</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Hapus atribut dari tag HTML.</td>
  </tr>
</table>

Atribut dimasukkan ke daftar putih, sehingga tidak ada daftar definitif atribut terlarang.
Untuk memeriksa atribut yang didukung untuk setiap tag tertentu,
telusuri tag HTML, kemudian `attrs`
di [spek validator AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

Selain daftar putih atribut tertentu untuk setiap tag,
semua tag AMP dapat menggunakan atribut apa pun yang tercantum dalam daftar putih di `$GLOBAL_ATTRS`;
semua atribut dengan awalan `"data-"` juga dimasukkan dalam daftar putih.

### Teks wajib tidak tersedia atau salah

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>MANDATORY_CDATA_MISSING_OR_INCORRECT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Tambahkan atau perbaiki teks wajib dalam tag.</td>
  </tr>
</table>

CDATA adalah data konten antara tag HTML awal dan akhir
serta saat ini dievaluasi dengan daftar putih dan daftar hitam.
Tag dengan CDATA wajib termasuk:

[sourcecode:YKL]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

Dan:

[sourcecode:YKL]
<style amp-custom>
[/sourcecode]

Pesan mendetail kesalahan ini dapat berupa salah satu dari yang berikut:

* "Gaya wajib yang diulang (js diaktifkan)"
* "Gaya wajib yang diulang (noscript)"
* "Awalan nama kelas CSS -amp- terlarang"
* "Atribut penting terlarang di CSS!"
* "@charset terlarang di CSS"
* "@import terlarang di CSS"
* "@namespace terlarang di CSS"
* "@support terlarang di CSS"
* "@document terlarang di CSS"
* "@page terlarang di CSS"
* "@viewport terlarang di CSS"

### Teks terlarang dalam tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>CDATA_VIOLATES_BLACKLIST</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Hapus teks terlarang.</td>
  </tr>
</table>

Data CSS tertentu dimasukkan ke daftar hitam
untuk memvalidasi aturan AMP CSS yang penting.

Berikut adalah daftar data CSS yang dimasukkan ke daftar hitam
(lihat juga <a href="https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii">`blacklisted_cdata_regex` di spek validator AMP</a>):

* `"\\.i?-amp-"` ("Awalan nama kelas -amp- CSS")
* `"!important"`
* `"charset"`
* `"@import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### Properti terlarang dalam atribut di tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>DISALLOWED_PROPERTY_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Hapus properti terlarang di atribut tertentu.</td>
  </tr>
</table>

Kesalahan ini terjadi ketika nama properti dalam atribut tidak diperbolehkan.
Properti istilah dalam konteks ini berarti data kunci/nilai terstruktur dalam atribut.
Misalnya, di
`<meta name="viewport content="width=device-width;minimum-scale=1">`,
`width` dan `minimum-scale` adalah nama properti.

Berikut ini yang menyebabkan kesalahan DISALLOWED_PROPERTY_IN_ATTR_VALUE:

`<meta name="viewport content="width=device-width;invalidfoo=1">`

Contoh lainnya,
yang berikut akan menyebabkan kesalahan:

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

Seharusnya: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.

### Nilai properti tidak valid

<table>
   <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Perbaiki nilai properti yang tidak valid.</td>
  </tr>
</table>

Kesalahan ini terjadi jika nilai properti dalam atribut tidak valid.
Properti istilah dalam konteks ini berarti data kunci/nilai terstruktur dalam atribut.
Misalnya, di
`<meta name="viewport content="width=device-width;minimum-scale=1">`,
`device-width` dan `1` adalah nilai properti.

Berikut ini yang menyebabkan kesalahan INVALID_PROPERTY_VALUE_IN_ATTR_VALUE:

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

Contoh lainnya,
yang berikut akan menyebabkan kesalahan:

`<meta http-equiv="X-UA-Compatible" content="ie=invalidfoo">`

Seharusnya: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`

### URL tidak tersedia

<table>
  <tr>
    <td class="col-thirty"><strong>Kode</strong></td>
    <td>MISSING_URL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"Missing URL for attribute '%1' in tag '%2'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Perbaikan</strong></td>
    <td>Tambahkan URL yang valid.</td>
  </tr>
</table>

Kesalahan ini terjadi jika URL yang dibutuhkan atribut tidak tersedia,
misalnya, atribut `href` atau `src` kosong.

### URL tidak valid

<table>
  <tr>
    <td class="col-thirty"><strong>Kode</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"Malformed URL '%3' for attribute '%1' in tag '%2'"</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Perbaikan</strong></td>
    <td>Perbaiki URL yang rusak.</td>
  </tr>
</table>

Kesalahan ini terjadi jika atribut memiliki URL,
tetapi URL-nya tidak valid.

### Protokol URL tidak valid

<table>
  <tr>
    <td class="col-thirty"><strong>Kode</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Perbaikan</strong></td>
    <td>Ubah ke protokol yang valid, misalnya, `http` mungkin perlu diubah ke `https`.</td>
  </tr>
</table>

Kesalahan ini terjadi karena tag yang memiliki `href` atau `src`
harus ditetapkan ke protokol tertentu.
Misalnya, banyak tag yang memerlukan `https`.

### Properti wajib tidak tersedia di atribut

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' is missing from attribute '%2' in tag '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Tambahkan properti yang tidak tersedia.</td>
  </tr>
</table>

Saat ini, kesalahan ini terjadi jika properti wajib berikut tidak tersedia:

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

Properti tersebut mengacu pada tag yang diharapkan:

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### Atribut saling lepas

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>MUTUALLY_EXCLUSIVE_ATTRS</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Hapus salah satu atribut yang saling lepas.</td>
  </tr>
</table>

Kesalahan ini terjadi jika tag memiliki atribut yang saling lepas.
Misalnya, hanya satu yang diizinkan dari tag berikut:

* [amp-twitter](/docs/reference/components/amp-twitter.html): `data-tweetid` atau `src`
* [amp-instagram](/docs/reference/components/amp-instagram.html): `data-shortcode` atau `src`
* [amp-iframe](/docs/reference/components/amp-iframe.html): `src` atau `srcdoc`
* [amp-youtube](/docs/reference/components/amp-youtube.html): `src` atau `data-videoid`

### Atribut wajib di daftar tidak tersedia

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>MANDATORY_ONEOF_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' is missing a mandatory attribute - pick one of %2." </td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Tambahkan atribut wajib yang tidak tersedia dari pilihan atribut yang tersedia.</td>
  </tr>
</table>

Kesalahan ini terjadi jika atribut yang dibutuhkan tag tidak tersedia
di pilihan.
Misalnya, tag berikut memerlukan salah satu atribut dari pilihan yang tersedia:

* [amp-twitter](/docs/reference/components/amp-twitter.html): `data-tweetid` atau `src`
* [amp-instagram](/docs/reference/components/amp-instagram.htm): `data-shortcode` atau `src`
* [amp-iframe](/docs/reference/components/amp-iframe.html): `src` atau `srcdoc`
* [amp-youtube](/docs/reference/components/amp-youtube.html): `src` atau `data-videoid`

### Tag induk salah

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>WRONG_PARENT_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The parent tag of tag '%1' is '%2', but it can only be '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Buat tag turunan langsung dari tag induk yang dibutuhkan.</td>
  </tr>
</table>

Tag tertentu memerlukan induk langsung (bukan induk jauh).
Berikut daftar tag tertentu yang membutuhkan induk
(tag, induk):

* `!doctype` membutuhkan tag induk `root`.
* `html` membutuhkan tag induk `!doctype`.
* `head` membutuhkan tag induk `html`.
* `body` membutuhkan tag induk `html`.
* `link` membutuhkan tag induk `head`.
* `meta` membutuhkan tag induk `head`.
* `style amp-custom` membutuhkan tag induk `head`.
* `style` membutuhkan tag induk `boilerplate (noscript)`.
* `noscript` membutuhkan tag induk `head`.
* `script` membutuhkan tag induk `head`.
* `source` membutuhkan tag media (`amp-audio`, `amp-video`, dll.).

### Induk tag terlarang

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>DISALLOWED_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may not appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Hapus (atau pindahkan) tag bertingkat terlarang.</td>
  </tr>
</table>

Kesalahan ini terjadi jika tag merupakan turunan dari tag lain
yang tidak memvalidasi.
Saat ini, contohnya hanya tag `template`,
yang tidak dapat bertingkat di tag `template` lain.

### Induk tag wajib

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Hapus tag atau buat turunan tag tertentu.</td>
  </tr>
</table>

Turunan wajib didefinisikan di
[spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)
sebagai `mandatory_ancestor`.

Kesalahan ini terjadi saat tag berikut
tidak memiliki `mandatory_ancestor` (tag, induk):

* `img` harus berupa turunan dari `noscript`.
* `video` harus berupa turunan dari `noscript`.
* `audio` harus berupa turunan dari `noscript`.
* `noscript` harus berupa turunan dari `body`.

### Induk tag wajib dengan petunjuk

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR_WITH_HINT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Hapus tag, buat turunan tag tertentu, atau ganti tag dengan tag yang diberi petunjuk.</td>
  </tr>
</table>

Kesalahan terjadi jika salah satu tag berikut ditemukan di dokumen AMP,
dan tidak bertumpuk dengan benar di induk wajibnya:

* `img` tidak dalam induk `noscript`.
* `video` tidak dalam induk `noscript`.
* `audio` tidak dalam induk `noscript`.
* `noscript` tidak dalam induk `body`.

### Tag unik duplikat

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>DUPLICATE_UNIQUE_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' appears more than once in the document."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Hapus salah satu tag duplikat dari dokumen AMP.</td>
  </tr>
</table>

Kesalahan ini terjadi jika hanya satu kemunculan tag yang diizinkan,
dan ditemukan diplikatnya.

Daftar lengkap tag unik yang diketahui:

* `<doctype html>`
* `<html amp>`
* `<head>`
* `<link rel=canonical href=...>`
* `<link rel=amphtml href=...>`
* `<meta charset="utf-8">`
* `<meta viewport>`
* `<style amp-custom>`
* `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* `<body>`
* `<script src="https://cdn.ampproject.org/v0.js">`

## Kesalahan gaya dan tata letak

Sebelum mendalami kesalahan gaya dan tata letak,
Anda perlu memahami cara kerja
[pemberian gaya](/id/docs/guides/responsive/style_pages.html) dan
[tata letak](/id/docs/guides/responsive/control_layout.html) di AMP.
Karena laman AMP adalah laman HTML, pemberian gaya kurang lebih sama seperti pada laman HTML.
Tetapi ada beberapa pembatasan untuk memastikan laman dimuat dengan cepat,
dan validator AMP memberlakukan pembatasan ini.

Tata letak lebih terkontrol di laman AMP.
Setiap tag yang ditampilkan pada laman
membutuhkan tinggi dan lebar yang telah ditetapkan sebelumnya,
untuk mengurangi perenderan dan pengguliran yang tidak perlu secara signifikan.
Hal ini tidak berarti Anda perlu menyertakan atribut ini secara manual.
Untuk jenis tata letak tertentu,
validator AMP tidak akan menampilkan kesalahan
karena nilai default telah diasumsikan.

Setiap tag AMP memiliki akhiran `supported_layouts`,
seperti yang didefinisikan dalam
[spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
Validator akan menampilkan kesalahan untuk tata letak yang tidak didukung,
dan akan memeriksa aturan validasi tata letak yang telah didefinisikan sebelumnya.

### Stylesheet terlalu panjang

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>STYLESHEET_TOO_LONG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Kurangi ukuran stylesheet menjadi di bawah 50.000 byte.</td>
  </tr>
</table>

Kesalahan ini akan ditampilkan
jika validator AMP mengukur konten gaya
dalam `<style amp-custom>` dan ukurannya melebihi batas 50.000 byte.

### Kesalahan sintaksis CSS

<table>
   <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>CSS_SYNTAX</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"CSS syntax error in tag '%1' - %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Perbaiki kesalahan sintaksis CSS.</td>
  </tr>
</table>

Kesalahan ini terjadi jika Anda memiliki kesalahan sintaksis CSS
di tag tertentu.
Jika tidak yakin penyebab kesalahan,
coba jalankan CSS
lewat validator CSS online, misalnya,
[csslint](http://csslint.net/).

### Kesalahan sintaksis CSS pada aturan tertentu

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>CSS_SYNTAX_INVALID_AT_RULE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Perbaiki kesalahan sintaksis CSS tertentu.</td>
  </tr>
</table>

Kesalahan ini mengacu pada @-aturan dalam CSS,
untuk setiap AMP yang hanya mengizinkan beberapa aturan.
(lihat juga [spesifikasi AMP ](/docs/reference/spec.html)).
Misalnya, `@import` tidak diizinkan.
Kesalahan validasi secara khusus
memberi tahu Anda aturan yang tidak valid,
memudahkan untuk memperbaiki aturan.

### Tata letak tersirat tidak didukung tag AMP

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>IMPLIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The implied layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Berikan atribut tata letak yang valid kepada tag.</td>
  </tr>
</table>

Kesalahan ini terjadi jika Anda tidak menentukan tata letak untuk tag AMP,
dan tata letak tersirat (berdasarkan lebar, tinggi, dan ukuran) tidak didukung.
Periksa nilai `supported_layout` untuk tag
di [spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

Perilaku tata letak yang sebenarnya ditentukan oleh atribut `layout`.
Untuk mengetahui lebih banyak tentang cara kerja tata letak,
lihat [Cara Mengontrol Tata Letak](/id/docs/guides/responsive/control_layout.html) dan
[Spesifikasi sistem tata letak HTML AMP](/docs/reference/spec/amp-html-layout.html).

**Catatan:** Jika tata letak tidak ditentukan,
serta nilai `width` dan `height` tidak disertakan,
default tata letak menjadi PENAMPUNG.
Validator menampilkan kesalahan
karena PENAMPUNG tidak didukung di tag AMP mana pun.
Tentukan tata letak selain PENAMPUNG,
atau tambahkan nilai `width` dan/atau `height`, maka kesalahan akan hilang.

### Atribut tidak diizinkan oleh tata letak tersirat

<table>
  <tr>
    <td class="col-thirty"><strong>Kode</strong></td>
    <td>ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Perbaikan</strong></td>
    <td>Hapus atribut terlarang dari tag,
      atau tentukan tata letak lain yang mengizinkannya.</td>
  </tr>
</table>

Kesalahan ini terjadi jika Anda tidak menentukan tata letak untuk tag AMP,
dan tata letak tersirat berisi atribut terlarang.
Atribut terlarang untuk jenis tata letak dijelaskan di
[spesifikasi sistem tata letak HTML AMP](/docs/reference/spec/amp-html-layout.html).

### Tata letak yang ditentukan tidak didukung oleh tag AMP

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>SPECIFIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The specified layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Tentukan tata letak yang didukung oleh tag.</td>
  </tr>
</table>

Kesalahan ini terjadi jika tata letak yang ditentukan
untuk tag tidak didukung.
Periksa nilai `supported_layout` untuk tag
di [spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

Perilaku tata letak yang sebenarnya ditentukan oleh atribut `layout`.
Untuk mengetahui lebih banyak tentang cara kerja tata letak,
lihat [Cara Mengontrol Tata Letak](/id/docs/guides/responsive/control_layout.html) dan
[Spesifikasi sistem tata letak HTML AMP](/docs/reference/spec/amp-html-layout.html).

### Atribut tidak diizinkan oleh tata letak tertentu

<table>
  <tr>
    <td class="col-thirty"><strong>Kode</strong></td>
    <td>ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Perbaikan</strong></td>
    <td>Hapus atribut terlarang dari tag,
      atau tentukan tata letak lain yang mengizinkannya.</td>
  </tr>
</table>

Kesalahan ini terjadi jika Anda menentukan tata letak untuk tag AMP,
dan tata letak berisi atribut terlarang.
Atribut terlarang untuk jenis tata letak dijelaskan di
[spesifikasi sistem tata letak HTML AMP](/docs/reference/spec/amp-html-layout.html).

### Nilai yang dibutuhkan tata letak tidak valid

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>ATTR_VALUE_REQUIRED_BY_LAYOUT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Tentukan atribut ke nilai tertentu.</td>
  </tr>
</table>

Kesalahan ini terjadi jika nilai atribut tata letak tertentu tidak valid.
Untuk memahami hal yang memicu kesalahan ini,
Anda perlu membiasakan diri dengan
[perilaku tata letak yang berbeda](/id/docs/guides/responsive/control_layout.html).

Anggap tata letak ditetapkan ke `fixed-height` dan
Anda menyertakan nilai numerik `height` dan `width`.
Tata letak `fixed-height` bernilai `height`.
Atribut `width` tidak boleh ada, atau setel ke `auto`.
Validator menampilkan ATTR_VALUE_REQUIRED_BY_LAYOUT.

### Unit lebar dan tinggi tidak konsisten

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Berikan unit lebar dan tinggi yang konsisten.</td>
  </tr>
</table>

Dengan pengecualian `layout=fixed`,
atribut lebar dan tinggi harus dinyatakan dalam unit yang sama.
Jika tidak, hal ini akan memicu kesalahan.

Misalnya, `<amp-img src="" layout="responsive" width="42px" height="42rem">`,
menyebabkan pesan kesalahan:

"Unit lebar dan tinggi pada tag 'amp-img' tidak konsisten- lebar ditentukan dalam 'px' sedangkan tinggi ditentukan dalam 'rem'."

## Kesalahan pemberian template

Laman AMP tidak dapat menyertakan sintaksis pemberian template,
kecuali sintaksis tersebut dalam tag AMP yang
dirancang khusus untuk menyertakan template, misalnya,
[amp-mustache](/docs/reference/components/amp-mustache.html).

Diperbolehkan menyertakan template di file sumber,
selama keluaran yang dihasilkan file tersebut tidak berisi template
(lihat juga
[Menggunakan prapemrosesan CSS](/id/docs/guides/responsive/style_pages.html)).

### Atribut berisi sintaksis template

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>TEMPLATE_IN_ATTR_NAME</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Mustache template syntax in attribute name '%1' in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Hapus sintaksis template Mustache dari atribut.</td>
  </tr>
</table>

Kesalahan ini terjadi kapan pun validator menemukan
[sintaksis template Mustache](https://mustache.github.io/mustache.5.html)
di nilai atribut.

### Atribut berisi sintaksis template yang tidak dapat lolos

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>UNESCAPED_TEMPLATE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Loloskan template Mustache.</td>
  </tr>
</table>

Kesalahan ini terjadi kapan pun validator menemukan
[sintaksis template Mustache yang tidak dapat lolos](https://mustache.github.io/mustache.5.html)
di nilai atribut.

### Atribut berisi sebagian template

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>TEMPLATE_PARTIAL_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Hapus sebagian mustache.</td>
  </tr>
</table>

Kesalahan ini terjadi kapan saja validator menemukan
[Mustache sebagian](https://mustache.github.io/mustache.5.html)
di nilai atribut.

## Kesalahan penghentian

### Tag tidak berlaku lagi

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>DEPRECATED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>No error message defined as yet (no deprecated tags).</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Hapus tag yang tidak berlaku lagi.</td>
  </tr>
</table>

Peringatan ini terjadi jika tag AMP yang sebelumnya valid ditemukan di dokumen AMP.
Ini hanya peringatan; dokumen AMP dengan peringatan ini masih tetap valid.
Saat ini tidak ada tag yang tidak berlaku; peringatan ini dipesan untuk penghentian mendatang.

### Atribut tidak berlaku lagi

<table>
  <tr>
  	<td class="col-thirty"><strong>Kode</strong></td>
  	<td>DEPRECATED_ATTR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Perbaikan</strong></td>
  	<td>Sebagai praktik yang baik, hapus atribut yang tidak berlaku lagi.</td>
  </tr>
</table>

Peringatan ini terjadi jika atribut AMP yang sebelumnya valid ditemukan di dokumen AMP.
Ini hanya peringatan; dokumen AMP dengan peringatan ini masih tetap valid.

Identifikasikan atribut setiap tag AMP yang tidak berlaku lagi
dengan menelusuri `deprecation` di
[spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
</body>
</html>
