---
$title: amp-access
$category@: dynamic-content
teaser:
  text: Provides an AMP paywall and subscription support.
---



AMP Access atau “dukungan paywall dan langganan AMP” memberi Penayang kontrol atas konten mana yang dapat diakses oleh Pembaca beserta batasannya, berdasarkan status langganan Pembaca, jumlah tampilan, dan faktor lainnya.

# amp-access <a name="amp-access"></a>



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

<table>
  <tr>
    <td><strong>Ketersediaan</strong></td>
    <td>Stabil</td>
  </tr><tr>
  <td class="col-fourty"><strong>Skrip yang Diperlukan</strong></td>
  <td>
    <div>
      <code>&lt;script async custom-element="amp-access" src="https://cdn.ampproject.org/v0/amp-access-0.1.js">&lt;/script></code>
    </div>
  </td>
</tr>
<tr>
  <td class="col-fourty"><strong>Contoh</strong></td>
  <td><a href="https://ampbyexample.com/components/amp-access/">Contoh kode beranotasi untuk amp-access</a></td>
</tr>
</table>

## Hubungan dengan `amp-subscriptions` <a name="relationship-to-amp-subscriptions"></a>

Ekstensi [`amp-subscriptions`](amp-subscriptions.md) menawarkan fitur yang mirip dengan `amp-access`. Namun, ekstensi ini mendukung protokol paywall akses yang lebih khusus. Beberapa perbedaan penting yang perlu dicatat:

1. Respons hak kepemilikan `amp-subscriptions` mirip dengan otorisasi amp-access, tetapi ditetapkan dengan ketat dan distandarisasi.
1. Ekstensi `amp-subscriptions` memungkinkan beberapa layanan dikonfigurasi untuk halaman agar dapat berpartisipasi dalam keputusan akses/paywall. Layanan tersebut dijalankan secara bersamaan dan diprioritaskan berdasarkan layanan mana yang menampilkan respons positif.
1. AMP viewer diizinkan untuk memberi `amp-subscriptions` respons otorisasi bertanda tangan berdasarkan perjanjian independen dengan penayang sebagai bukti akses.
1. Pada `amp-subscriptions`, markup konten distandarisasi sehingga aplikasi dan crawler dapat mendeteksi bagian konten premium dengan mudah.

Dengan standarisasi markup, dukungan multi-penyedia, dan dukungan viewer yang lebih baik, `amp-subscriptions` direkomendasikan bagi penayang baru dan implementasi penyedia paywall.

## Solusi <a name="solution"></a>

Solusi yang diusulkan ini memberikan kontrol kepada pengguna atas keputusan dan alur berikut:
- Membuat dan mempertahankan pengguna
- Mengontrol pengukuran (memungkinkan penayangan gratis hingga jumlah tertentu)
- Tanggung jawab atas alur login
- Tanggung jawab untuk mengautentikasi pengguna
- Tanggung jawab atas aturan akses dan otorisasi
- Fleksibilitas atas parameter akses secara per dokumen

Solusi ini mencakup komponen berikut:

1. [**ID Pembaca AMP**](#amp-reader-id): disediakan oleh ekosistem AMP, merupakan ID unik bagi Pembaca seperti yang terlihat oleh AMP.
1. [**Markup Konten Akses**](#access-content-markup): dibuat oleh Penayang, menentukan bagian dokumen mana yang dapat dilihat dalam situasi apa.
1. [**Endpoint Otorisasi**](#authorization-endpoint): disediakan oleh Penayang, menampilkan respons yang menjelaskan bagian dokumen mana yang dapat digunakan oleh Pembaca.
1. [**Endpoint Pingback**](#pingback-endpoint): disediakan oleh Penayang, digunakan untuk mengirim tayangan “tampilan” untuk sebuah dokumen.
1. [**Link Login dan Halaman Login**](#login-page-and-login-link): memungkinkan Penayang mengautentikasi Pembaca dan menghubungkan ID mereka dengan ID Pembaca AMP.

Cache AMP Google menampilkan dokumen kepada Pembaca dengan beberapa bagian yang disamarkan menggunakan Markup Konten Akses. AMP Runtime memanggil endpoint Otorisasi dan menggunakan responsnya untuk menyembunyikan atau menampilkan bagian berbeda seperti yang ditentukan oleh Markup Konten Akses. Setelah dokumen ditampilkan kepada Pembaca, AMP Runtime memanggil endpoint Pingback yang dapat digunakan oleh Penayang untuk memperbarui pengukur hitung mundur (jumlah tampilan gratis yang digunakan).

Solusi ini juga memungkinkan Penayang untuk menempatkan Link Login di dokumen AMP yang akan membuka halaman Login/Berlangganan tempat Penayang dapat mengautentikasi Pembaca dan mengaitkan ID Pembaca di sistem mereka dengan ID Pembaca AMP.

Dalam bentuk dasarnya, solusi ini mengirimkan dokumen lengkap (meskipun disamarkan) ke Pembaca dan hanya menampilkan/menyembunyikan bagian terbatas berdasarkan respons Otorisasi. Namun, solusi ini juga menyediakan opsi “server”, di mana bagian yang dibatasi dapat dikecualikan dari pengiriman dokumen awal dan didownload hanya setelah otorisasi dikonfirmasi.

Untuk mendukung AMP Access, Penayang harus mengimplementasikan komponen yang dijelaskan di atas. Markup Konten Akses dan endpoint Otorisasi bersifat wajib. Endpoint Pingback dan Halaman Login bersifat opsional.

### ID Pembaca AMP <a name="amp-reader-id"></a>

Untuk membantu layanan akses dan kasus penggunaan, AMP Access memperkenalkan konsep *ID Pembaca*.

ID Pembaca adalah ID anonim dan unik yang dibuat oleh ekosistem AMP. ID ini unik untuk setiap pasangan Pembaca/Penayang - Pembaca diidentifikasi secara berbeda ke dua Penayang berbeda. ID ini tidak dapat dibalik. ID Pembaca disertakan dalam semua komunikasi AMP/Penayang dan memiliki entropi yang sangat tinggi. Penayang dapat menggunakan ID Pembaca untuk mengidentifikasi Pembaca dan memetakannya ke sistem identitas mereka sendiri.

ID Pembaca dibuat di perangkat pengguna dan dimaksudkan untuk bertahan lama. Namun, ID ini mengikuti aturan penyimpanan browser normal, termasuk aturan untuk jendela penyamaran. Siklus proses yang dimaksudkan untuk ID Pembaca adalah 1 tahun antara penggunaan atau hingga pengguna menghapus cookie mereka. ID Pembaca saat ini tidak dibagikan antar-perangkat.

ID Pembaca dibuat dengan cara yang mirip dengan mekanisme yang digunakan untuk membuat ExternalCID yang dijelaskan [di sini](https://docs.google.com/document/d/1f7z3X2GM_ASb3ZCI_7tngglxwS6WoWi1EB3aKzdf6vo/edit#heading=h.hb9q0wpwwhuf). Contoh ID Pembaca adalah `amp-OFsqR4pPKynymPyMmplPNMvxSTsNQob3TnK-oE3nwVT0clORaZ1rkeEz8xej-vV6`.

### AMP Access dan Cookie <a name="amp-access-and-cookies"></a>

Penayang dapat menggunakan cookie autentikasi mereka sendiri, mengandalkan ID Pembaca, atau kombinasi keduanya.

### Markup Konten Akses <a name="access-content-markup"></a>

Markup Konten Akses menentukan bagian mana yang terlihat atau tersembunyi berdasarkan respons Otorisasi yang ditampilkan dari endpoint Otorisasi. Hal ini dijelaskan melalui atribut markup khusus.

### Endpoint Otorisasi <a name="authorization-endpoint"></a>

Otorisasi adalah endpoint yang disediakan oleh penayang dan dipanggil oleh AMP Runtime atau Cache AMP Google. Endpoint ini merupakan endpoint CORS GET berkredensial. Endpoint ini menampilkan parameter akses yang dapat digunakan oleh Markup Konten untuk menyembunyikan atau menampilkan bagian-bagian berbeda dari dokumen.

### Endpoint Pingback <a name="pingback-endpoint"></a>

Pingback adalah endpoint yang disediakan oleh penayang dan dipanggil oleh AMP Runtime atau Cache AMP Google. Endpoint ini merupakan endpoint CORS POST berkredensial. AMP Runtime otomatis memanggil endpoint ini setelah Pembaca mulai menampilkan dokumen. Endpoint ini juga dipanggil setelah Pembaca berhasil menyelesaikan Alur Login. Salah satu tujuan utama Pingback adalah agar Penayang memperbarui informasi pengukuran.

Pingback bersifat opsional. Pingback dapat dinonaktifkan dengan menetapkan properti konfigurasi `noPingback` ke `true`.

### Halaman Login dan Link Login <a name="login-page-and-login-link"></a>

Halaman Login diimplementasikan dan ditampilkan oleh Penayang dan dipanggil oleh AMP Runtime. Biasanya, tampilannya berupa dialog browser.

Halaman Login dipicu saat Pembaca menge-tap Link Login yang dapat ditempatkan oleh Penayang di mana saja dalam dokumen.

## Spesifikasi v0.1 <a name="specification-v01"></a>

### Konfigurasi <a name="configuration"></a>

Semua endpoint dikonfigurasi dalam dokumen AMP sebagai objek JSON di HEAD dokumen:

```html

<script id="amp-access" type="application/json">
  {
    "property": value,
    ...
    }
</script>

```

Properti berikut ditetapkan dalam konfigurasi ini:

<table>
  <tr>
    <th>Properti</th>
    <th>Nilai</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorization</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>URL HTTPS untuk endpoint Otorisasi.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>pingback</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>URL HTTPS untuk endpoint Pingback.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>noPingback</code></td>
    <td>true/false</td>
    <td>Jika true, pingback dinonaktifkan.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>login</code></td>
    <td class="col-twenty"><code>&lt;URL&gt;</code> atau<br><code>&lt;Map[string, URL]&gt;</code></td>
    <td>URL HTTPS untuk Halaman Login atau sekumpulan URL untuk berbagai jenis halaman login.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationFallbackResponse</code></td>
    <td><code>&lt;object&gt;</code></td>
    <td>Objek JSON yang akan digunakan sebagai pengganti respons otorisasi jika otorisasi gagal.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationTimeout</code></td>
    <td><code>&lt;number&gt;</code></td>
    <td>Waktu tunggu (dalam milidetik) yang setelah itu permintaan otorisasi akan dianggap gagal. Default-nya adalah 3000. Nilai di atas 3000 hanya diizinkan di lingkungan developer. </td>
  </tr>
  <tr>
    <td class="col-fourty"><code>type</code></td>
    <td>"client" atau "server"</td>
    <td>Default-nya adalah “client”. Opsi "server" masih dalam diskusi pengembangan dan dokumen ini akan diperbarui saat opsi tersebut siap.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>namespace</code></td>
    <td>string</td>
    <td>Default-nya kosong. Namespace diperlukan jika beberapa penyedia akses ditentukan.</td>
  </tr>
</table>

Nilai *`<URL>`* menentukan URL HTTPS dengan variabel substitusi. Variabel substitusi dibahas lebih detail di bagian [Variabel URL Akses](#access-url-variables) di bawah.

Berikut ini contoh konfigurasi AMP Access:

```html

<script id="amp-access" type="application/json">
{
  "authorization":
      "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
  "pingback":
      "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
  "login":
      "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
  "authorizationFallbackResponse": {"error": true}
}
</script>

```

#### Beberapa penyedia akses <a name="multiple-access-providers"></a>

Anda dapat menentukan beberapa penyedia akses menggunakan array, bukan objek tunggal, dan menyediakan `namespace` untuk setiap entri.

```html

<script id="amp-access" type="application/json">
[
  {
    "property": value,
    ...
    "namespace": value
  },
  ...
]
</script>
```

### Variabel URL Akses <a name="access-url-variables"></a>

Saat mengonfigurasi URL untuk berbagai endpoint, Penayang dapat menggunakan variabel substitusi. Daftar lengkap variabel ini ditetapkan dalam [Spesifikasi Variabel AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md). Selain itu, spesifikasi ini menambahkan beberapa variabel khusus akses seperti `READER_ID` dan `AUTHDATA`. Beberapa variabel yang paling relevan dijelaskan dalam tabel di bawah:

<table>
  <tr>
    <th>Var</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>READER_ID</code></td>
    <td>ID Pembaca AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AUTHDATA(field)</code></td>
    <td>Nilai untuk kolom ini dalam respons otorisasi.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RETURN_URL</code></td>
    <td>Placeholder untuk URL kembali yang ditentukan oleh AMP runtime untuk Dialog Login yang akan menjadi tujuan kembali.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>SOURCE_URL</code></td>
    <td>URL Sumber dari dokumen AMP ini. Jika dokumen ditayangkan dari CDN, AMPDOC_URL akan berupa URL CDN, sedangkan SOURCE_URL akan berupa URL sumber asli.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AMPDOC_URL</code></td>
    <td>URL dokumen AMP ini.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>CANONICAL_URL</code></td>
    <td>URL kanonis dokumen AMP ini.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>DOCUMENT_REFERRER</code></td>
    <td>URL Perujuk.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>VIEWER</code></td>
    <td>URL AMP Viewer.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RANDOM</code></td>
    <td>Nomor acak. Bermanfaat untuk menghindari penyimpanan ke cache browser.</td>
  </tr>
</table>

Berikut ini contoh URL yang diperluas dengan ID Pembaca, URL Kanonis, informasi Perujuk dan cachebuster acak:
```text
https://pub.com/access?
  rid=READER_ID
  &url=CANONICAL_URL
  &ref=DOCUMENT_REFERRER
  &_=RANDOM
```

Variabel AUTHDATA tersedia untuk URL Login dan Pingback. Dengan variabel ini, kolom apa pun dalam respons otorisasi dapat diteruskan sebagai parameter URL. Misalnya, `AUTHDATA(isSubscriber)`. Ekspresi bertingkat juga diizinkan, seperti `AUTHDATA(other.isSubscriber)`. Jika menggunakan namespace, namespace dapat ditambahkan ke awal kolom misalnya `AUTHDATA(anamespace.afield)`.

### Markup Konten Akses <a name="access-content-markup-1"></a>

Markup Konten Akses menjelaskan bagian mana dari dokumen yang terlihat atau tersembunyi. Markup ini terdiri dari dua atribut AMP: `amp-access` dan `amp-access-hide` yang dapat ditempatkan pada sembarang elemen HTML.

Atribut `amp-access` menyediakan ekspresi yang menghasilkan true atau false berdasarkan respons otorisasi yang ditampilkan oleh endpoint Otorisasi. Nilai yang dihasilkan menunjukkan apakah elemen dan isinya terlihat atau tidak.

Nilai `amp-access` adalah ekspresi boolean yang ditentukan dalam bahasa yang mirip SQL. Tata bahasanya ditentukan dalam [Lampiran A](#appendix-a-amp-access-expression-grammar) dan terlihat sebagai berikut:
```html

<div amp-access="expression">...</div>
```
Properti dan nilai merujuk ke properti dan nilai respons Otorisasi yang ditampilkan oleh endpoint Otorisasi. Hal ini menghasilkan sistem yang fleksibel untuk mendukung berbagai skenario akses. Jika menggunakan namespace, cukup tambahkan namespace ke awal nama properti, misalnya `anamespace.aproperty`.

Atribut `amp-access-hide` dapat digunakan untuk menyembunyikan elemen secara optimal sebelum respons Otorisasi diterima, yang dapat menampilkannya. Ini memberikan semantik “tak terlihat secara default”. Respons otorisasi yang ditampilkan oleh Otorisasi nantinya dapat membatalkan setelan default ini dan membuat bagian menjadi terlihat. Jika atribut `amp-access-hide` dihilangkan, bagian akan ditampilkan/disertakan secara default. Atribut `amp-access-hide` hanya dapat digunakan bersama dengan atribut` amp-access`.
```html
<div amp-access="expression" amp-access-hide>...</div>
```

Jika permintaan Otorisasi gagal, ekspresi `amp-access` tidak dievaluasi dan apakah suatu bagian terlihat atau disembunyikan ditentukan oleh keberadaan atribut `amp-access-hide` yang awalnya disediakan oleh dokumen.

Kita dapat memperluas kumpulan atribut `amp-access-*` sesuai keperluan untuk mendukung berbagai macam kebutuhan obfuscation dan rendering.

Jika permintaan Otorisasi gagal dan respons "authorizationFallbackResponse" tidak ditentukan dalam dokumentasi, ekspresi `amp-access` tidak dievaluasi dan apakah suatu bagian terlihat atau disembunyikan ditentukan oleh keberadaan atribut `amp-access-hide` yang awalnya yang disediakan oleh dokumen.

Berikut ini contoh yang menampilkan link login atau konten lengkap berdasarkan status langganan:
```html
<header>
Judul dokumen
</header>

<div>
  Cuplikan pertama dalam dokumen.
</div>

<div amp-access="NOT subscriber" amp-access-hide>
  <a on="tap:amp-access.login">Become a subscriber now!</a>
</div>

<div amp-access="subscriber">
  Konten lengkap.
</div>

```
Di sini:
- *subscriber* adalah kolom boolean dalam respons otorisasi yang ditampilkan oleh endpoint Otorisasi. Bagian ini secara default disembunyikan, yang bersifat opsional.
- Contoh ini memilih untuk menampilkan konten lengkap secara optimal.

Berikut ini contoh lain yang menunjukkan penafian bagi Pembaca tentang status pengukuran:
```html
{% raw %}
<section amp-access="views <= maxViews">
  <template amp-access-template type="amp-mustache">
    You are reading article {{views}} out of {{maxViews}}.
  </template>
</section>
{% endraw %}
```

Dan berikut ini contoh yang menunjukkan konten tambahan ke subscriber premium:
```html
<section amp-access="subscriptonType = 'premium'">
  Shhh… No one but you can read this content.
</section>
```

### Endpoint Otorisasi <a name="authorization-endpoint-1"></a>

Otorisasi dikonfigurasi melalui properti `authorization` di bagian [Konfigurasi AMP Access](#configuration). Endpoint ini merupakan endpoint CORS GET berkredensial. Lihat [Keamanan Asal CORS](#cors-origin-security) tentang metode pengamanan permintaan ini.

Otorisasi dapat menerima parameter apa pun seperti yang ditetapkan di bagian [Variabel URL Akses](#access-url-variables). Sebagai contoh, otorisasi dapat meneruskan ID Pembaca AMP dan URL dokumen. Selain parameter URL, Penayang dapat menggunakan informasi apa pun yang lazimnya dikirim melalui protokol HTTP, seperti alamat IP Pembaca. Penyertaan `READER_ID` bersifat wajib.

Endpoint ini menghasilkan respons otorisasi yang dapat digunakan dalam ekspresi markup konten untuk menampilkan/menyembunyikan bagian konten yang berbeda.

Format permintaannya adalah:
```text
https://publisher.com/amp-access.json?
rid=READER_ID
&url=SOURCE_URL
```

Responsnya adalah objek JSON format bebas: dapat berisi properti dan nilai apa pun dengan beberapa batasan. Batasannya adalah: - Nama properti harus sesuai dengan batasan yang ditentukan oleh tata bahasa ekspresi `amp-access` (lihat [Lampiran A](#appendix-a-amp-access-expression-grammar)). Pada sebagian besar kasus, hal ini berarti bahwa nama properti tidak boleh berisi karakter seperti spasi, tanda hubung, dan karakter lain yang tidak sesuai dengan spesifikasi “amp-access”.
- Nilai properti hanya dapat berupa salah satu jenis: string, angka, boolean.
- Nilai juga dapat disarangkan sebagai objek dengan nilai dari jenis yang sama: string, angka, boolean.
- Ukuran total respons otorisasi yang diserialkan tidak boleh melebihi 500 byte.
- Pastikan respons tidak menyertakan informasi identitas pribadi (PII) atau data pribadi apa pun.

Berikut ini beberapa ide yang mungkin untuk properti yang dapat ditampilkan dari endpoint Otorisasi: - Informasi pengukuran: jumlah penayangan maksimum yang diizinkan dan jumlah penayangan saat ini.
- Apakah Pembaca login atau seorang subscriber.
- Jenis subscription yang lebih mendetail: basic, premium - Geografis: negara, wilayah, wilayah publikasi kustom

Berikut ini contoh respons saat Pembaca bukan merupakan subscriber dan dibatasi 10 artikel/bulan dan telah melihat 6 artikel:
```json
{
  "maxViews": 10,
  "currentViews": 6,
  "subscriber": false
}
```
Berikut ini contoh respons saat pembaca login dan memiliki jenis langganan premium:
```json
{
  "loggedIn": true,
  "subscriptionType": "premium"
}
```
RPC ini dapat dipanggil dalam fase pra-rendering dan karena itu tidak boleh digunakan untuk hitung mundur pengukuran, karena Pembaca mungkin tidak pernah benar-benar melihat dokumen.

Pertimbangan penting lainnya adalah bahwa, dalam beberapa kasus, AMP runtime mungkin perlu memanggil endpoint Otorisasi beberapa kali per tayangan dokumen. Hal ini dapat terjadi jika AMP Runtime meyakini bahwa parameter akses untuk Pembaca telah berubah signifikan, misalnya setelah Alur Login yang berhasil.

Respons otorisasi dapat digunakan oleh AMP Runtime dan ekstensi untuk tiga keperluan:

1. Saat mengevaluasi ekspresi `amp-access`.
2. Saat mengevaluasi template `<template>` seperti `amp-mustache`.
3. Saat menyediakan variabel tambahan untuk pingback dan login URL menggunakan `AUTHDATA(field)`.

Endpoint Otorisasi dipanggil oleh AMP Runtime sebagai endpoint CORS berkredensial. Karena itu, endpoint ini harus mengimplementasikan protokol CORS. Ia harus menggunakan Asal CORS dan asal sumber untuk membatasi akses ke layanan ini seperti dijelaskan dalam [Keamanan Asal CORS](#cors-origin-security). Endpoint ini dapat menggunakan cookie Penayang untuk kebutuhannya. Sebagai contoh, ia dapat mengaitkan binding antara ID Pembaca dan identitas pengguna yang diberikan Penayang. AMP sendiri tidak perlu mengetahui hal ini (dan lebih suka tidak mengetahuinya). Untuk penjelasan selengkapnya, lihat [ID Pembaca AMP](#amp-reader-id) dan dokumentasi [Cookie dan AMP Access](#amp-access-and-cookies).

AMP Runtime (atau lebih tepatnya browser) mengamati header respons cache saat memanggil endpoint Otorisasi. Dengan demikian, respons yang disimpan dalam cache dapat digunakan kembali. Hal ini mungkin dikehendaki, mungkin juga tidak. Jika tidak dikehendaki, Penayang dapat menggunakan header kontrol cache yang sesuai dan/atau substitusi variabel `RANDOM` untuk URL endpoint.

Jika permintaan Otorisasi gagal, AMP Runtime akan melakukan fallback ke “authorizationFallbackResponse”, jika ditetapkan dalam konfigurasi. Dalam hal ini, alur otorisasi akan berjalan seperti biasa dengan nilai properti "authorizationFallbackResponse" menggantikan respons otorisasi. Jika "authorizationFallbackResponse" tidak ditentukan, alur otorisasi akan gagal, dan dalam hal ini ekspresi `amp-access` tidak akan dievaluasi dan apakah bagian diperlihatkan atau disembunyikan akan ditentukan oleh keberadaan atribut `amp-access-hide` yang awalnya disediakan oleh dokumen.

Permintaan Otorisasi dibatasi waktunya secara otomatis dan dianggap gagal setelah 3 detik.

AMP Runtime menggunakan class CSS berikut selama alur otorisasi:

1. class CSS `amp-access-loading` ditetapkan pada root dokumen saat alur otorisasi dimulai dan dihapus setelah selesai atau gagal.
2. class CSS `amp-access-error` ditetapkan pada root dokumen saat alur otorisasi gagal.

Pada opsi *server*, panggilan ke endpoint Otorisasi dibuat oleh Cache AMP Google sebagai endpoint HTTPS sederhana. Dalam kasus ini, cookie Penayang tidak dapat dikirim.

### Endpoint Pingback <a name="pingback-endpoint-1"></a>

Pingback dikonfigurasi melalui properti `pingback` di bagian [Konfigurasi AMP Access](#configuration). Endpoint ini merupakan endpoint CORS POST berkredensial. Lihat [Keamanan Asal CORS](#cors-origin-security) tentang metode pengamanan permintaan ini.

URL Pingback bersifat opsional, dan dapat dinonaktifkan dengan `"noPingback": true`.

URL Pingback dapat menerima parameter apa pun seperti yang ditetapkan di bagian [Variabel URL Akses](#access-url-variables). Misalnya, URL Pingback dapat meneruskan ID Pembaca AMP dan URL dokumen. Penyertaan `READER_ID` bersifat wajib.

Pingback tidak menghasilkan respons - semua respons diabaikan oleh AMP runtime.

Endpoint Pingback dipanggil saat Pembaca mulai menampilkan dokumen dan setelah Pembaca berhasil menyelesaikan Alur Login.

Penayang dapat memilih untuk menggunakan pingback:
- untuk menghitung mundur jumlah penayangan gratis halaman
- untuk memetakan ID Pembaca AMP ke identitas yang diberikan Penayang, karena sebagai endpoint CORS berkredensial, Pingback mungkin memuat cookie Penayang

Format permintaan adalah:
```text
https://publisher.com/amp-pingback?
rid=READER_ID
&url=SOURCE_URL
```

### Halaman Login <a name="login-page"></a>

URL Halaman Login dikonfigurasi melalui properti `login` di bagian [Konfigurasi AMP Access](#configuration).

Konfigurasi ini dapat menentukan URL Login tunggal atau peta beberapa URL Login yang dikunci oleh jenis login. Contoh URL Login tunggal:
```json
{
  "login": "https://publisher.com/amp-login.html?rid={READER_ID}"
  }
```

Contoh beberapa URL Login:
```json
{
  "login": {
    "signin": "https://publisher.com/signin.html?rid={READER_ID}",
    "signup": "https://publisher.com/signup.html?rid={READER_ID}"
    }
  }
```

URL dapat menerima parameter apa pun seperti yang ditetapkan di bagian [Variabel URL Akses](#access-url-variables). Misalnya, URL tersebut dapat meneruskan ID Pembaca AMP dan URL dokumen. Substitusi kueri `RETURN_URL` dapat digunakan untuk menentukan parameter kueri untuk URL return, misalnya `?ret=RETURN_URL`. URL return harus ada dan jika substitusi `RETURN_URL` tidak ditentukan, maka URL tersebut akan otomatis dimasukkan dengan nama parameter kueri default “return”.

Halaman Login adalah halaman web biasa tanpa batasan khusus, selain harus berfungsi dengan baik sebagai [dialog browser](https://developer.mozilla.org/en-US/docs/Web/API/Window/open). Lihat bagian [Alur Login](#login-flow) untuk penjelasan selengkapnya.

Format permintaannya adalah:
```text
https://publisher.com/amp-login.html?
rid=READER_ID
&url=SOURCE_URL
&return=RETURN_URL
```
Perhatikan bahwa parameter URL “return” ditambahkan oleh AMP Runtime secara otomatis jika substitusi `RETURN_URL` tidak ditentukan. Setelah menyelesaikan tugasnya, Halaman Login harus mengalihkan kembali ke “Return URL” dengan format berikut:
```text
RETURN_URL#success=true|false
```
Perhatikan penggunaan parameter hash URL “success”. Nilainya dapat “true” atau “false”, bergantung pada apakah login berhasil atau ditinggalkan. Idealnya, jika memungkinkan, Halaman Login akan mengirimkan sinyal jika berhasil atau gagal.

Jika sinyal `success=true` ditampilkan, AMP Runtime akan mengulangi panggilan ke endpoint Otorisasi dan Pingback untuk memperbarui status dokumen dan melaporkan "tampilan" dengan profil akses baru.

#### Link Login <a name="login-link"></a>

Penayang dapat memilih untuk menempatkan Link Login di mana saja dalam isi dokumen.

Satu atau beberapa URL Login dikonfigurasi melalui properti “login” di bagian [Konfigurasi AMP Access](#configuration).

Link Login dapat dideklarasikan pada sembarang elemen HTML yang mendukung atribut “on”. Biasanya ini akan menjadi anchor atau elemen tombol. Jika URL Login tunggal dikonfigurasi, formatnya adalah:
```html
<a on="tap:amp-access.login">Login or subscribe</a>
```

Jika beberapa URL Login dikonfigurasi, formatnya adalah `tap:amp-access.login-{type}`. Contoh:
```html
<a on="tap:amp-access.login-signup">Subscribe</a>
```

Jika namespace digunakan, formatnya adalah: `tap:amp-access.login-{namespace}` atau `tap:amp-access.login-{namespace}-{type}`.

AMP tidak membedakan antara login dan subscribe. Perbedaan ini dapat dikonfigurasi oleh Penayang menggunakan beberapa URL Login/link atau pada sistem Penayang.

## Integrasi dengan *amp-analytics* <a name="integration-with-amp-analytics"></a>

Integrasi dengan *amp-analytics* didokumentasikan dalam [amp-access-analytics.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md).

## Keamanan Asal CORS <a name="cors-origin-security"></a>

Endpoint Otorisasi dan Pingback adalah endpoint CORS dan harus mengimplementasikan protokol keamanan yang dijelaskan dalam [Spesifikasi Keamanan AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

## Pengukuran <a name="metering"></a>

Pengukuran adalah sistem di mana konten premium gratis diperlihatkan kepada Pembaca untuk beberapa penayangan dokumen selama periode tertentu. Setelah kuota tertentu tercapai, Pembaca akan mulai melihat paywall dengan penggalan konten disertai pesan upsell dan link untuk mendaftar/login. Misalnya, pengukuran dapat ditetapkan sebagai “Pembaca dapat membaca 10 artikel per bulan secara gratis”.

AMP Access menyediakan fasilitas berikut untuk mengimplementasikan akses dengan pengukuran:

1. READER_ID harus digunakan untuk menyimpan informasi pengukuran. Karena Penayang tidak selalu dapat menyetel cookie dalam konteks pihak ketiga, data ini harus disimpan di sistem server.
2. “Jumlah baca” hanya dapat diperbarui di endpoint Pingback.
3. Hanya dokumen unik yang diperhitungkan terhadap kuota. Misalnya, memuat ulang dokumen yang sama sepuluh kali akan dihitung sebagai satu tampilan. Untuk keperluan ini, endpoint Otorisasi dan Pingback dapat memasukkan `SOURCE_URL` atau variabel URL serupa. Lihat [Variabel URL Akses](#access-url-variables).

## Klik Pertama Gratis <a name="first-click-free"></a>

Kebijakan Klik Pertama Gratis (atau FCF) Google dijelaskan [di sini](https://support.google.com/news/publisher/answer/40543), dengan update terbaru yang dijelaskan lebih mendetail [di sini](https://googlewebmastercentral.blogspot.com/2015/09/first-click-free-update.html).

Untuk mengimplementasikan FCF, Penayang harus (1) dapat menentukan layanan perujuk untuk setiap penayangan, dan (2) dapat menghitung jumlah penayangan per hari untuk setiap pembaca.

Kedua langkah tersebut dicakup dalam spesifikasi AMP Access. Perujuk dapat dimasukkan ke URL Otorisasi dan Pingback menggunakan substitusi URL `DOCUMENT_REFERRER` seperti dijelaskan dalam [Variabel URL Akses](#access-url-variables). Penghitungan penayangan dapat dilakukan menggunakan endpoint Pingback pada sistem server. Ini sangat mirip dengan implementasi pengukuran yang dijelaskan di bagian [Pengukuran](#metering).

## Alur Login <a name="login-flow"></a>

AMP meluncurkan Dialog Login sebagai jendela pihak pertama atau pop-up atau tab. Kapan pun dimungkinkan, AMP Viewer akan mencoba meluncurkan Dialog Login dalam konteks browser sehingga dapat memanfaatkan API browser tingkat paling atas.

Alur login dimulai oleh AMP Runtime saat Pembaca mengaktifkan Link Login dan, secara deskriptif, alur ini mengikuti langkah-langkah berikut:

1. Dialog Login (jendela pihak pertama) dibuka oleh AMP Runtime atau Viewer untuk URL Login yang ditentukan. URL ini berisi parameter kueri URL "Return URL" tambahan (`&amp;return=RETURN_URL`). Sejumlah parameter lain juga dapat diperluas ke URL, seperti ID Pembaca. Untuk penjelasan selengkapnya, lihat bagian [Halaman Login](#login-page).
2. Penayang menampilkan halaman Login format bebas.
3. Pembaca mengikuti langkah-langkah login, seperti memasukkan nama pengguna/sandi atau menggunakan login sosial.
4. Pembaca mengirimkan login. Penayang menyelesaikan autentikasi, menetapkan cookie, dan akhirnya mengalihkan Pembaca ke "Return URL" yang diminta sebelumnya. Pengalihan ini memuat parameter hash URL `success` yang dapat bernilai `true` atau `false`.
5. Dialog Login mengikuti pengalihan ke "Return URL".
6. AMP Runtime mengotorisasi ulang dokumen.

Hanya langkah 2-5 yang memerlukan penanganan oleh Penayang: Penayang hanya menyediakan Halaman Login miliknya sendiri dan memastikan pengalihan yang benar setelah proses ini selesai. Tidak ada batasan khusus yang diberlakukan pada halaman login, selain harus berfungsi dengan baik sebagai dialog.

Seperti biasa, ID Pembaca harus disertakan dalam panggilan ke Halaman Login dan dapat digunakan oleh Penayang untuk pemetaan identitas. Sebagai jendela pihak pertama, Penayang juga akan menerima cookie mereka dan akan dapat menyetelnya. Jika ternyata Pembaca sudah login ke sistem Penayang, sebaiknya penayang segera mengalihkan kembali ke "Return URL" dengan respons `success=true`.

## Glosarium AMP <a name="amp-glossary"></a>

* **Dokumen AMP** - dokumen HTML yang mengikuti format AMP dan divalidasi oleh Validator AMP. Dokumen AMP dapat di-cache oleh Cache AMP Google.
* **Validator AMP** - program komputer yang menjalankan analisis statis atas dokumen HTML dan menampilkan keberhasilan atau kegagalan bergantung pada apakah dokumen sesuai dengan format AMP atau tidak.
* **AMP Runtime** - runtime JavaScript yang menjalankan Dokumen AMP.
* **Cache AMP Google** - cache proxy untuk dokumen AMP.
* **AMP Viewer** - aplikasi Web atau native yang menampilkan/menyematkan Dokumen AMP.
* **Publisher.com** - situs penayang AMP.
* **Endpoint CORS** - endpoint HTTPS lintas asal. Buka [https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) untuk informasi selengkapnya. Lihat [Keamanan Asal CORS](#cors-origin-security) untuk mengetahui metode pengamanan permintaan tersebut.
* **Pembaca** - orang sebenarnya yang menampilkan dokumen AMP.
* **Pra-rendering AMP** - AMP Viewer dapat memanfaatkan pra-rendering, yang merender dokumen tersembunyi sebelum dokumen tersebut dapat ditampilkan. Pra-rendering meningkatkan performa secara signifikan. Namun, perlu diingat bahwa pra-rendering dokumen tidak dihitung sebagai penayangan karena Pembaca mungkin tidak benar-benar melihat dokumen itu.

## Revisi <a name="revisions"></a>

* 02-Sep-2016: Properti konfigurasi "noPingback" dan pingback opsional.
* 03-Mar-2016: Pingback kirim ulang setelah login (v0.5).
* 19-Feb-2016: Sampel dikoreksi untuk menghapus `{}` dari substitusi variabel URL.
* 15-Feb-2016: [Konfigurasi](#configuration) dan [Endpoint Otorisasi](#authorization-endpoint) kini mendukung properti "authorizationFallbackResponse" yang dapat digunakan saat otorisasi gagal.
* 11-Feb-2016: Waktu tunggu permintaan otorisasi di [Endpoint Otorisasi](#authorization-endpoint).
* 11-Feb-2016: Referensi kolom bertingkat seperti `object.field` kini diizinkan.
* 09-Feb-2016: Bagian [Klik Pertama Gratis](#metering) dan [Pengukuran](#first-click-free).
* 03-Feb-2016: Spesifikasi keamanan "asal sumber" ditambahkan ke [Keamanan Asal CORS](#cors-origin-security).
* 01-Feb-2016: Parameter kueri "return" untuk Halaman Login dapat disesuaikan menggunakan substitusi URL RETURN_URL.

## Lampiran A: Tata bahasa ekspresi “amp-access” <a name="appendix-a-amp-access-expression-grammar"></a>

Tata bahasa BNF terbaru tersedia di file [access-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/0.1/access-expr-impl.jison).

Nukilan utama dari tata bahasa ini adalah sebagai berikut:

```javascript
search_condition:
  search_condition OR search_condition
  | search_condition AND search_condition
  | NOT search_condition
  | '(' search_condition ')'
  | predicate

predicate:
    comparison_predicate | truthy_predicate

comparison_predicate:
    scalar_exp '=' scalar_exp
    | scalar_exp '!=' scalar_exp
    | scalar_exp '<' scalar_exp
    | scalar_exp '<=' scalar_exp
    | scalar_exp '>' scalar_exp
    | scalar_exp '>=' scalar_exp

truthy_predicate: scalar_exp

scalar_exp: literal | field_ref

field_ref: field_ref '.' field_name | field_name

literal: STRING | NUMERIC | TRUE | FALSE | NULL
```

Perhatikan bahwa ekspresi `amp-access` dievaluasi oleh AMP Runtime dan Cache AMP Google. Ini BUKAN bagian dari spesifikasi yang perlu diterapkan oleh Penayang. Ini hanya untuk keperluan penyampaian informasi.

## Diskusi Mendetail <a name="detailed-discussion"></a>

Bagian ini akan membahas penjelasan mendetail tentang desain yang mendasari spesifikasi amp-access, dan mengklarifikasi pilihan desain. Segera hadir.

## Validasi <a name="validation"></a>

Lihat [aturan amp-access](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/validator-amp-access.protoascii) dalam spesifikasi validator AMP.
