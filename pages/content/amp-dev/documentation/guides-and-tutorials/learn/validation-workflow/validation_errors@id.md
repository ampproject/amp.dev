---
$title: Error validasi AMP
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

Tidak boleh ada error validasi apa pun dalam dokumen AMP yang valid.
Tujuan dokumen ini adalah untuk membantu Anda memahami dengan lebih baik
dan memperbaiki error validasi apa pun yang dihadapi
saat Anda [memvalidasi halaman AMP](../../../../documentation/guides-and-tutorials/start/create_amphtml_ad/validate.md).
Untuk ringkasan lengkap mengenai error validasi,
lihat [spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

## Error atribut dan tag HTML AMP

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Tambahkan (atau perbaiki) tag HTML wajib.</td>
  </tr>
</table>

Tag berikut harus ada di semua dokumen AMP:

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> atau <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`

Tag wajib ini mencakup kolom `mandatory: true` dalam <a href="https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii">spesifikasi validator AMP</a>;
tag tersebut juga dirujuk dalam [spesifikasi AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md).

### Tag yang dibutuhkan oleh tag lain tidak tersedia

<table>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Kode</strong></td>
                <td>TAG_REQUIRED_BY_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Format</strong></td>
                <td>"The '%1' tag is missing or incorrect, but required by '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Tambahkan (atau perbaiki) tag HTML yang diperlukan.</td>
  </tr>
</table>

Validator menampilkan error `TAG_REQUIRED_BY_MISSING`
ketika menemukan komponen yang diperpanjang dalam dokumen AMP,
tapi tidak menemukan `<script>` yang setara.

[Komponen yang diperpanjang](../../../../documentation/components/index.html)
harus disertakan secara eksplisit dalam dokumen AMP sebagai elemen kustom.
Untuk memperbaiki error ini, buka halaman referensi komponen yang diperpanjang,
salin skrip yang diperlukan, lalu tempel ke `<head>` dokumen AMP.

### Tag tidak diizinkan

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Hapus tag yang tidak diizinkan.</td>
  </tr>
</table>

Tag disertakan dalam daftar yang disetujui, sehingga tidak ada daftar definitif semua tag yang tidak diizinkan;
namun, [spesifikasi AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)
secara luas mendefinisikan kumpulan tag yang tidak diizinkan.

### JavaScript kustom tidak diizinkan

<table>
   <tr>
                <td class="col-thirty"><strong>Kode</strong></td>
                <td>DISALLOWED_SCRIPT_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Format</strong></td>
                <td>"Custom JavaScript is not allowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Hapus tag javascript.</td>
  </tr>
</table>

Format AMP tidak mengizinkan penambahan JavaScript kustom ke halaman, kecuali untuk file JavaScript
yang disediakan oleh Project AMP itu sendiri. Kebanyakan penggunaan umum JavaScript memiliki
implementasi setara library HTML AMP. Lihat [komponen
AMP](../../../../documentation/components/index.html) untuk mengetahui kumpulan komponen yang dapat
digunakan untuk menyempurnakan halaman HTML AMP.

Jika kasus penggunaan Anda tidak tercakup, Anda juga dapat menyertakan komponen
baru ke Project AMP. Lihat dokumen
[berkontribusi](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md)
Project AMP untuk informasi selengkapnya.

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Tambahkan atribut wajib ke tag.</td>
  </tr>
</table>

Atribut wajib tag AMP didefinisikan dalam
[spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Perbaiki nilai atribut menjadi nilai yang valid.</td>
  </tr>
</table>

Error ini menunjukkan bahwa tag HTML memiliki atribut dengan nama yang dibolehkan,
tetapi bukan nilai yang diizinkan.
Misalnya, satu pemicu umum kesalahan ini adalah nilai yang tidak valid untuk URL.
Semua nilai URL (di atribut `href` dan `src`) harus cocok dengan salah satu dari
[nilai atribut yang memungkinkan](http://www.w3schools.com/tags/att_a_href.asp).

<strong>PENTING:</strong> Banyak nilai URL di AMP memerlukan HTTPS.
Jika Anda mendapati error ini, dan tidak yakin dengan alasan error tersebut,
periksa spesifikasi tag AMP yang relevan
untuk melihat apakah atribut membutuhkan HTTPS.

### Atribut tidak diizinkan

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Hapus atribut dari tag HTML.</td>
  </tr>
</table>

Atribut disertakan dalam daftar yang disetujui, sehingga tidak ada daftar definitif semua atribut yang tidak diizinkan.
Untuk memeriksa atribut yang didukung untuk setiap tag tertentu,
telusuri tag HTML, lalu `attrs`
di [spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

Selain daftar atribut tertentu yang disetujui untuk setiap tag,
semua tag AMP dapat menggunakan salah satu atribut dalam daftar yang disetujui di `$GLOBAL_ATTRS`;
semua atribut dengan awalan `"data-"` juga tercantum dalam daftar yang disetujui.

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Tambahkan atau perbaiki teks wajib dalam tag.</td>
  </tr>
</table>

CDATA adalah data konten antara tag HTML awal dan akhir
serta saat ini dievaluasi dengan daftar yang diizinkan dan tidak diizinkan.
Tag dengan CDATA wajib termasuk:

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

Dan:

[sourcecode:html]
<style amp-custom>
[/sourcecode]

Pesan mendetail error ini dapat berupa salah satu dari yang berikut:

* "Gaya wajib yang diulang (js diaktifkan)"
* "Gaya wajib yang diulang (noscript)"
* "Awalan nama kelas CSS -amp- yang tidak diizinkan"
* "Atribut !important yang tidak diizinkan di CSS!"
* "@charset yang tidak diizinkan di CSS"
* "@import yang tidak diizinkan di CSS"
* "@namespace yang tidak diizinkan di CSS"
* "@support yang tidak diizinkan di CSS"
* "@document yang tidak diizinkan di CSS"
* "@page yang tidak diizinkan di CSS"
* "@viewport yang tidak diizinkan di CSS"

### Teks tidak diizinkan dalam tag

<table>
   <tr>
                <td class="col-thirty"><strong>Kode</strong></td>
                <td>CDATA_VIOLATES_DENYLIST</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Format</strong></td>
                <td>"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Hapus teks yang tidak diizinkan.</td>
  </tr>
</table>

Data CSS tertentu dimasukkan ke daftar yang tidak diizinkan
untuk memvalidasi aturan AMP CSS yang penting.

Berikut adalah daftar data CSS yang tidak diizinkan
(lihat juga [`disallowed_cdata_regex` di spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)):

* `"\\.i?-amp-"` ("Awalan nama kelas -amp- CSS")
* `"!important"`
* `"charset"`
* `"&#64;import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### Properti tidak diizinkan dalam atribut di tag

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Hapus properti yang tidak diizinkan di atribut tertentu.</td>
  </tr>
</table>

Error ini terjadi ketika nama properti dalam atribut tidak diizinkan.
Istilah properti dalam konteks ini berarti data kunci/nilai terstruktur dalam atribut.
Misalnya, dalam
`<meta name="viewport content="width=device-width;minimum-scale=1">`,
`width` dan `minimum-scale` adalah nama properti.

Berikut ini yang menyebabkan error DISALLOWED_PROPERTY_IN_ATTR_VALUE:

`<meta name="viewport content="width=device-width;invalidfoo=1">`

Contoh lainnya,
yang berikut akan menyebabkan error:

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Perbaiki nilai properti yang tidak valid.</td>
  </tr>
</table>

Error ini terjadi jika nilai properti dalam atribut tidak valid.
Istilah properti dalam konteks ini berarti data kunci/nilai terstruktur dalam atribut.
Misalnya, dalam
`<meta name="viewport content="width=device-width;minimum-scale=1">`,
`device-width` dan `1` adalah nilai properti.

Berikut ini yang menyebabkan error INVALID_PROPERTY_VALUE_IN_ATTR_VALUE:

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

Perhatikan bahwa jika Anda mencoba membuat atribut yang tidak bernilai (misalnya, atribut seperti `autoplay`, `controls`, atau `loop` untuk komponen [`amp-video`](../../../../documentation/components/reference/amp-video.md)), tapi proses pembuatan HTML menghasilkan nilai default (tapi tidak valid) seperti `true` (misalnya, React akan menghasilkan `<amp-video autoplay="true" ...>` [secara default](https://reactjs.org/docs/jsx-in-depth.html#props-default-to-true)), solusinya adalah membuat nama atribut sebagai nilai. Misalnya, `<amp-video autoplay="autoplay" ...>`.

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
    <td class="col-thirty"><strong>Perbaiki</strong></td>
    <td>Tambahkan URL yang valid.</td>
  </tr>
</table>

Error ini terjadi jika URL yang dibutuhkan atribut tidak tersedia,
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
    <td class="col-thirty"><strong>Perbaiki</strong></td>
    <td>Perbaiki URL yang rusak.</td>
  </tr>
</table>

Error ini terjadi jika atribut memiliki URL,
tetapi URL tersebut tidak valid.

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
    <td class="col-thirty"><strong>Perbaiki</strong></td>
    <td>Ubah ke protokol yang valid, misalnya, `http` mungkin perlu diubah menjadi `https`.</td>
  </tr>
</table>

Error ini terjadi karena tag yang memiliki `href` atau `src`
harus ditetapkan ke protokol tertentu.
Misalnya, banyak tag yang memerlukan 'https'.

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Tambahkan properti yang tidak tersedia.</td>
  </tr>
</table>

Saat ini, error ini terjadi jika properti wajib berikut tidak tersedia:

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Hapus salah satu atribut yang saling lepas.</td>
  </tr>
</table>

Error ini terjadi jika tag memiliki atribut yang saling lepas.
Misalnya, hanya satu yang diizinkan dari tag berikut:

* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` atau `srcdoc`
* [`amp-jwplayer`](../../../../documentation/components/reference/amp-jwplayer.md): `data-media-id` atau `data-playlist-id`

### Atribut wajib tidak tersedia di daftar

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Tambahkan atribut wajib yang tidak tersedia dari pilihan atribut yang tersedia.</td>
  </tr>
</table>

Error ini terjadi jika atribut yang dibutuhkan tag tidak tersedia
di pilihan.
Misalnya, tag berikut memerlukan salah satu atribut dari dua pilihan yang tersedia:

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md): `data-tweetid` atau `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md): `data-shortcode` atau `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` atau `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md): `src` atau `data-videoid`

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Buat tag turunan langsung dari tag induk yang dibutuhkan.</td>
  </tr>
</table>

Tag tertentu memerlukan induk langsung (bukan induk jauh).
Berikut ini daftar tag tertentu yang membutuhkan induk
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
* `source` membutuhkan tag media ([`amp-audio`](../../../../documentation/components/reference/amp-audio.md), [`amp-video`](../../../../documentation/components/reference/amp-video.md), dll.).

### Induk tag tidak diizinkan

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Hapus (atau pindahkan) tag bertingkat yang tidak diizinkan.</td>
  </tr>
</table>

Error ini terjadi jika tag merupakan turunan dari tag lain
yang tidak memvalidasi.
Saat ini, contohnya hanya tag <code>template</code>,
yang tidak dapat bertingkat di bawah tag <code>template</code> lain.

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Hapus tag atau jadikan tag itu sebagai turunan tag tertentu.</td>
  </tr>
</table>

Turunan wajib didefinisikan di
[spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)
sebagai `mandatory_ancestor`.

Error ini terjadi saat tag berikut
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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Hapus tag, jadikan tag itu sebagai turunan tag tertentu, atau ganti tag dengan tag yang diberi petunjuk.</td>
  </tr>
</table>

Error tersebut terjadi ketika salah satu tag berikut ditemukan di dokumen AMP,
dan tidak bertumpuk dengan benar pada induk wajibnya:

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Hapus salah satu tag duplikat dari dokumen AMP.</td>
  </tr>
</table>

Error ini terjadi jika hanya satu kemunculan tag yang diizinkan,
dan ditemukan duplikatnya.

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

## Error gaya dan tata letak <a name="style-and-layout-errors"></a>

Sebelum mendalami error gaya dan tata letak,
penting untuk memahami cara kerja
[pengaturan gaya](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md) dan
[tata letak](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) di AMP.
Karena halaman AMP adalah halaman HTML, pengaturan gaya kurang lebih sama seperti pada halaman HTML.
Tetapi ada beberapa pembatasan untuk memastikan halaman dimuat dengan cepat,
dan validator AMP memberlakukan pembatasan ini.

Tata letak jadi lebih terkontrol di halaman AMP.
Tag apa pun yang ditampilkan pada halaman
membutuhkan tinggi dan lebar yang telah ditetapkan sebelumnya,
untuk mengurangi rendering dan scroll yang tidak perlu secara signifikan.
Hal ini tidak berarti Anda perlu menyertakan atribut ini secara manual.
Untuk jenis tata letak tertentu,
validator AMP tidak akan menampilkan error
karena nilai default telah diasumsikan.

Setiap tag AMP memiliki akhiran `supported_layouts`,
seperti yang didefinisikan dalam
[spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
Validator akan menampilkan error untuk tata letak yang tidak didukung,
dan akan memeriksa aturan validasi untuk tata letak yang telah didefinisikan sebelumnya.

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Kurangi ukuran stylesheet menjadi di bawah 50.000 byte.</td>
  </tr>
</table>

Error ini akan ditampilkan jika validator AMP
mengukur ukuran konten gaya
dalam `<style amp-custom>` dan ukurannya melebihi batas 50.000 byte.

### Error sintaks CSS

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Perbaiki error sintaks CSS.</td>
  </tr>
</table>

Error ini terjadi jika Anda memiliki error sintaks CSS
di tag tertentu.
Jika tidak yakin penyebab error,
coba jalankan CSS
lewat validator CSS online, misalnya,
[csslint](http://csslint.net/).

### Error sintaks CSS pada aturan tertentu

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Perbaiki error sintaks CSS tertentu.</td>
  </tr>
</table>

Error ini mengacu pada @-rules dalam CSS,
untuk AMP yang hanya mengizinkan beberapa aturan.
(lihat juga [spesifikasi AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).
Misalnya, <code>@import</code> tidak diizinkan.
Error validasi secara spesifik
memberi tahu Anda aturan yang tidak valid,
sehingga memudahkan perbaikan aturan tersebut.

### Tata letak tersirat tidak didukung oleh tag AMP

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Berikan atribut tata letak yang valid untuk tag tersebut.</td>
  </tr>
</table>

Error ini terjadi jika Anda tidak menentukan tata letak untuk tag AMP,
dan tata letak tersirat (berdasarkan lebar, tinggi, dan ukuran) tidak didukung.
Periksa nilai `supported_layout` untuk tag
di [spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

Perilaku tata letak yang sebenarnya ditentukan oleh atribut `layout`.
Untuk mengetahui selengkapnya tentang cara kerja tata letak,
lihat [Cara Mengontrol Tata Letak](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) dan
[spesifikasi sistem tata letak HTML AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md).

**Catatan:** Jika Anda tidak menentukan tata letak,
serta tidak menyertakan nilai `width` dan `height`,
tata letak akan ditetapkan secara default ke CONTAINER.
Validator menampilkan error
karena CONTAINER tidak didukung di tag AMP apa pun.
Tentukan tata letak selain CONTAINER,
atau tambahkan nilai `width` dan/atau `height`, maka error akan hilang.

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
    <td class="col-thirty"><strong>Perbaiki</strong></td>
    <td>Hapus atribut yang tidak diizinkan dari tag,
      atau tentukan tata letak yang mengizinkannya.</td>
  </tr>
</table>

Error ini terjadi jika Anda tidak menentukan tata letak untuk tag AMP,
dan tata letak tersirat berisi atribut yang tidak diizinkan.
Atribut yang tidak diizinkan untuk jenis tata letak dijelaskan di
[spesifikasi sistem tata letak HTML AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md).

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Tentukan tata letak yang didukung oleh tag.</td>
  </tr>
</table>

Error ini terjadi jika tata letak yang ditentukan
untuk tag tidak didukung.
Periksa nilai `supported_layout` untuk tag
di [spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

Perilaku tata letak yang sebenarnya ditentukan oleh atribut `layout`.
Untuk mengetahui selengkapnya tentang cara kerja tata letak,
lihat [Cara Mengontrol Tata Letak](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) dan
[spesifikasi sistem tata letak HTML AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md).

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
    <td class="col-thirty"><strong>Perbaiki</strong></td>
    <td>Hapus atribut yang tidak diizinkan dari tag,
      atau tentukan tata letak yang mengizinkannya.</td>
  </tr>
</table>

Error ini terjadi jika Anda menentukan tata letak untuk tag AMP,
dan tata letak tersebut berisi atribut yang tidak diizinkan.
Atribut yang tidak diizinkan untuk jenis tata letak dijelaskan di
[spesifikasi sistem tata letak HTML AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md).

### Nilai untuk atribut yang dibutuhkan tata letak tidak valid

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Tetapkan atribut ke nilai tertentu.</td>
  </tr>
</table>

Error ini terjadi jika nilai atribut tata letak tertentu tidak valid.
Untuk memahami hal yang memicu error ini,
Anda perlu memahami
[perilaku tata letak yang berbeda](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute).

Anggap saja tata letak ditetapkan ke `fixed-height` dan
Anda menyertakan nilai numerik untuk `height` dan `width`.
Tata letak `fixed-height` memiliki nilai `height`.
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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Berikan unit lebar dan tinggi yang konsisten.</td>
  </tr>
</table>

Dengen pengecualian `layout=fixed`,
atribut lebar dan tinggi harus dinyatakan dalam unit yang sama.
Jika tidak, hal ini akan memicu error.

Misalnya, `<amp-img src="" layout="responsive" width="42px" height="42rem">`,
akan menyebabkan pesan error ini:

"Inconsistent units for width and height in tag '[`amp-img`](../../../../documentation/components/reference/amp-img.md)  - width is specified in 'px' whereas height is specified in 'rem'."

## Error pemberian template

Halaman AMP tidak dapat menyertakan sintaks pemberian template,
kecuali sintaks tersebut dalam tag AMP yang
dirancang khusus untuk menyertakan template, misalnya,
[`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md).

Diperbolehkan menyertakan template di file sumber,
selama keluaran yang dihasilkan file tersebut tidak berisi template
(lihat juga
[Menggunakan prapemrosesan CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md#using-css-preprocessors)).

### Atribut berisi sintaks template

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Hapus sintaks template Mustache dari atribut.</td>
  </tr>
</table>

Error ini terjadi kapan saja validator menemukan
[Sintaks template Mustache](https://mustache.github.io/mustache.5.html)
dalam nilai atribut.

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Loloskan template Mustache.</td>
  </tr>
</table>

Error ini terjadi kapan saja validator menemukan
[sintaks template Mustache yang tidak dapat lolos](https://mustache.github.io/mustache.5.html)
dalam nilai atribut.

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Hapus Mustache sebagian.</td>
  </tr>
</table>

Error ini terjadi kapan saja validator menemukan
[Mustache sebagian](https://mustache.github.io/mustache.5.html)
dalam nilai atribut.

## Error penghentian penggunaan

### Tag sudah tidak berlaku

<table>
  <tr>
                <td class="col-thirty"><strong>Kode</strong></td>
                <td>DEPRECATED_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Format</strong></td>
                <td>Belum ada pesan error yang ditentukan saat ini (tidak ada tag yang tidak berlaku).</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Hapus tag yang tidak berlaku.</td>
  </tr>
</table>

Peringatan ini terjadi jika tag AMP yang sebelumnya valid ditemukan di dokumen AMP.
Ini hanya peringatan; dokumen AMP dengan peringatan ini masih tetap valid.
Saat ini tidak ada tag yang tidak berlaku; peringatan ini dipesan untuk penghentian mendatang.

### Atribut sudah tidak berlaku

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
                <td class="col-thirty"><strong>Perbaiki</strong></td>
                <td>Sebagai praktik yang baik, hapus atribut yang sudah tidak berlaku.</td>
  </tr>
</table>

Peringatan ini terjadi jika atribut AMP yang sebelumnya valid ditemukan di dokumen AMP.
Ini hanya peringatan; dokumen AMP dengan peringatan ini masih tetap valid.

Identifikasi atribut yang sudah tidak berlaku untuk setiap tag AMP
dengan menelusuri `deprecation` di
[spesifikasi validator AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
