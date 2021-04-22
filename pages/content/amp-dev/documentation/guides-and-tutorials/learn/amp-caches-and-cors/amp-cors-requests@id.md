---
'$title': CORS dalam AMP
$order: 12
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: Banyak ekstensi dan komponen AMP memanfaatkan endpoint jarak jauh dengan menggunakan
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/amp-cors-requests.md.
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

Banyak ekstensi dan komponen AMP memanfaatkan endpoint jarak jauh dengan menggunakan permintaan Berbagi Sumber Daya Lintas Asal (CORS). Dokumen ini menjelaskan aspek-aspek kunci menggunakan CORS dalam AMP. Untuk mempelajari CORS sendiri, kunjungi [Spek W3 CORS](https://www.w3.org/TR/cors/).

<div class="noshowtoc"></div>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#why-do-i-need-cors-for-my-own-origin-" data-md-type="link">Mengapa saya membutuhkan CORS untuk asal (origin) saya sendiri?</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#utilizing-cookies-for-cors-requests" data-md-type="link">Memanfaatkan cookie untuk permintaan CORS</a></li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#cors-security-in-amp" data-md-type="link">Keamanan CORS dalam AMP</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#verify-cors-requests" data-md-type="link">Memverifikasi permintaan CORS</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#1-allow-requests-for-specific-cors-origins" data-md-type="link">1) Mengizinkan permintaan untuk asal CORS yang spesifik</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#2-allow-same-origin-requests" data-md-type="link">2) Mengizinkan permintaan dari asal yang sama</a></li>
</ul>
</li></ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#send-cors-response-headers" data-md-type="link">Mengirimkan tajuk tanggapan CORS</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered"><a href="#access-control-allow-origin-origin" data-md-type="link">Akses-Kontrol-Izinkan-Asal: *</a></li></ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#processing-state-changing-requests" data-md-type="link">Memproses permintaan perubahan status</a></li>
</ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#example-walkthrough-handing-cors-requests-and-responses" data-md-type="link">Uraian contoh: Menangani tanggapan dan permintaan CORS</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#testing-cors-in-amp" data-md-type="link">Menguji CORS dalam AMP</a></li>
</ul>
</li>
</ul>
<div data-md-type="block_html"></div>

## Mengapa saya membutuhkan CORS untuk asal (origin) saya sendiri? <a name="why-do-i-need-cors-for-my-own-origin"></a>

Anda mungkin bingung mengapa membutuhkan CORS untuk permintaan ke asal Anda sendiri, mari kita bahas.

Komponen AMP yang mengambil data dinamis (cth., amp-form, amp-list, dll.) membuat permintaan CORS ke endpoint jarak jauh untuk mengambil data. Jika halaman AMP Anda menyertakan komponen yang seperti itu, Anda perlu menangani CORS agar permintaan tersebut tidak gagal.

Mari kita gambarkan dengan contoh:

Anggap bahwa Anda mempunyai halaman AMP yang mencantumkan produk beserta harganya. Untuk memperbarui harga pada halaman tersebut, pengguna mengeklik sebuah tombol, dan ini akan mengambil harga terbaru dari endpoint JSON (dilakukan melalui komponen amp-list). JSON itu di domain Anda.

Baik, jadi halaman itu ada _di domain saya_ dan JSON tersebut ada _di domain saya _. Saya tidak melihat ada masalah!

Ah, tetapi bagaimana pengguna Anda sampai ke halaman AMP Anda? Apakah karena halaman di cache yang mereka akses? Kemungkinan besar bahwa pengguna Anda tidak mengakses halaman AMP secara langsung, tetapi menemukan halaman Anda melalui platform lain. Contohnya: Google Search menggunakan Cache AMP Google untuk merender halaman AMP dengan cepat; ini adalah halaman yang disimpan di cache yang disajikan dari Cache AMP Google, dan ini adalah domain yang _berbeda_. Saat pengguna Anda mengeklik tombol untuk memperbarui harga pada halaman Anda, halaman AMP di dalam cache mengirimkan permintaan ke domain asal Anda untuk mendapatkan harga, dan ini adalah ketidakcocokan antara asal (cache -> domain asal). Untuk memungkinkan permintaan lintas asal seperti ini, Anda harus menangani CORS, jika tidak, permintaan akan gagal.

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript><img alt="CORS dan Cache" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png"></noscript></amp-img>

**Baik, jadi saya harus bagaimana?**

1. Untuk halaman AMP yang mengambil data dinamis, pastikan Anda menguji versi cache halaman tersebut; _jangan cuma uji di domain Anda sendiri_. (Kunjungi bagian [Menguji CORS dalam AMP](#testing-cors-in-amp) di bawah ini)
2. Ikuti instruksi di dalam dokumen ini untuk menangani tanggapan dan permintaan CORS.

## Memanfaatkan cookie untuk permintaan CORS <a name="utilizing-cookies-for-cors-requests"></a>

Kebanyakan komponen AMP yang menggunakan permintaan CORS akan secara otomatis menetapkan [mode kredensial](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) atau mengizinkan penulis untuk memilih mengaktifkannya. Contohnya: komponen [`amp-list`](https://amp.dev/documentation/components/amp-list) mengambil konten dinamis dari endpoint JSON CORS, dan mengizinkan penulis untuk menetapkan mode kredensial melalui atribut `credentials`.

_Contoh: Termasuk konten yang dipersonalisasi di dalam amp-list melalui cookie_

[sourcecode:html]
<amp-list
credentials="include"
src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)"

>   <template type="amp-mustache">

    Your personal offer: ${% raw %}{{price}}{% endraw %}

  </template>
</amp-list>
[/sourcecode]

Dengan menentukan mode kredensial, asal (origin) dapat menyertakan cookie di dalam permintaan CORS dan juga menempatkan cookie sebagai tanggapan (tergantung [pembatasan cookie pihak ketiga](#third-party-cookie-restrictions)).

### Pembatasan cookie pihak ketiga <a name="third-party-cookie-restrictions"></a>

Pembatasan cookie pihak ketiga yang sama dengan yang ditentukan di browser juga berlaku pada permintaan CORS berkredensial di AMP. Pembatasan ini tergantung browser dan platform, namun bagi beberapa browser, asal hanya dapat menempatkan cookie jika pengguna sebelumnya telah mengunjungi asal di jendela (atas) pihak ke-1. Atau, dengan kata lain, hanya setelah pengguna telah langsung mengunjungi situs web asal tersebut. Oleh karena itu, layanan yang diakses melalui CORS tidak dapat menganggap akan dapat menempatkan cookie sebagai default.

## Keamanan CORS dalam AMP <a name="cors-security-in-amp"></a>

Untuk memastikan tanggapan dan permintaan yang valid dan aman untuk halaman AMP Anda, Anda harus:

1. [Memverifikasi permintaan](#verify-cors-requests).
2. [Mengirimkan tajuk tanggapan yang tepat](#send-cors-response-headers).

Jika Anda menggunakan Nodus di backend, Anda dapat menggunakan <br> [middleware CORS AMP](https://www.npmjs.com/package/amp-toolbox-cors), yang merupakan bagian dari [Kotak Alat AMP](https://github.com/ampproject/amp-toolbox).

### Memverifikasi permintaan CORS <a name="verify-cors-requests"></a>

Saat endpoint Anda menerima permintaan CORS:

1. [Verifikasi bahwa tajuk <code>Origin</code> CORS adalah asal yang diizinkan (asal penayang + cache AMP)](#verify-cors-header).
2. [Jika tidak ada tajuk Asal, periksa apakah permintaan tersebut mempunyai asal yang sama (melalui `AMP-Same-Origin`)](#allow-same-origin-requests).

#### 1) Mengizinkan permintaan untuk asal CORS yang spesifik <a name="1-allow-requests-for-specific-cors-origins"></a>

<span id="verify-cors-header"></span>

Endpoint CORS menerima asal peminta melalui tajuk HTTP `Origin`. Endpoint hanya boleh mengizinkan permintaan dari: (1) asal penayang sendiri; dan (2) setiap asal <br> `cacheDomain` yang tercantum di [https://cdn.ampproject.org/caches.json](https://cdn.ampproject.org/caches.json).

Contohnya: endpoint harus mengizinkan permintaan dari:

- Google AMP Cache subdomain: `https://<publisher's domain>.cdn.ampproject.org` <br>(for example, `https://nytimes-com.cdn.ampproject.org`)

[tip type="read-on"] Untuk mengetahui format URL Cache AMP, kunjungi sumber daya ini:

- [Gambaran Umum Cache AMP Google](https://developers.google.com/amp/cache/overview) [/tip]

#### 2) Mengizinkan permintaan dari asal yang sama <a name="2-allow-same-origin-requests"></a>

<span id="allow-same-origin-requests"></span>

Untuk permintaan asal yang sama di mana tajuk `Origin` tidak ada, AMP menetapkan tajuk kustom berikut ini:

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

Tajuk kustom ini dikirimkan oleh Runtime AMP saat permintaan XHR dilakukan untuk asal yang sama (yaitu, dokumen yang disajikan dari URL non-cache). Izinkan permintaan yang mengandung tajuk `AMP-Same-Origin:true`.

### Mengirimkan tajuk tanggapan CORS <a name="send-cors-response-headers"></a>

Setelah memverifikasi permintaan CORS, hasil tanggapan HTTP harus mengandung tajuk berikut ini:

##### Akses-Kontrol-Izinkan-Asal: <origin> </origin><a name="access-control-allow-origin-origin"></a>

Tajuk ini adalah persyaratan <a href="https://www.w3.org/TR/cors/">Spek W3 CORS Spec</a>, di mana <code>origin</code> merujuk asal peminta yang diizinkan melalui tajuk permintaan CORS <code>Origin</code> (contohnya, <code>"https://<publisher's subdomain>.cdn.ampproject.org"</code>).

Walaupun spek W3 CORS mengizinkan nilai <code>\*</code> dihasilkan di dalam tanggapan, untuk keamanan yang lebih baik, Anda sebaiknya:

- Jika tajuk `Origin` ada, validasi dan cerminkan nilai tajuk <code>Origin</code>.

### Memproses permintaan perubahan status <a name="processing-state-changing-requests"></a>

[tip type="important"] Lakukan pemeriksaan validasi ini _sebelum_ Anda memproses permintaan. Validasi ini membantu menyediakan perlindungan dari serangan CSRF, dan menghindari pemrosesan permintaan sumber yang tidak dipercayai. [/tip]

Sebelum memproses permintaan yang dapat mengubah status sistem Anda (contohnya: pengguna yang berlangganan atau berhenti berlangganan dari daftar pengiriman surat), periksa yang berikut ini:

**Jika tajuk `Origin` sudah ditentukan**:

1. Jika asal tidak sesuai dengan salah satu dari nilai-nilai berikut ini, hentikan dan buat tanggapan eror:

   - `<publisher's domain>.cdn.ampproject.org`
   - asal penayang (alias domain Anda)

   di mana `*` mewakili kecocokan karakter pengganti, dan bukan tanda bintang yang sesungguhnya ( \* ).

2. Jika tidak, proses permintaan tersebut.

**Jika tajuk `Origin` BELUM ditentukan**:

1. Verifikasi bahwa permintaan tersebut mengandung tajuk `AMP-Same-Origin: true`. Jika permintaan tidak mengandung tajuk ini, hentikan dan buat tanggapan eror.
2. Jika tidak, proses permintaan tersebut.

## Uraian contoh: Menangani tanggapan dan permintaan CORS <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

Ada dua skenario yang harus diperhitungkan dalam permintaan CORS ke endpoint Anda:

1. Permintaan dari asal yang sama.
2. Permintaan dari asal di cache (dari Cache AMP).

Mari kita bahas kedua skenario ini disertai contoh. Di dalam contoh ini, kita mengelola situs `example.com` yang menjadi host halaman AMP berjudul `article-amp.html.`Halaman AMP tersebut berisi `amp-list` untuk mengambil data dinamis dari berkas `data.json` yang juga dikelola di `example.com`. Kita ingin memproses permintaan ke berkas `data.json` kita yang berasal dari halaman AMP kita. Permintaan ini bisa berasal dari halaman AMP pada asal yang sama (non-cache) atau dari halaman AMP di asal yang berbeda (di cache).

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript><img alt="Contoh CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png"></noscript></amp-img>

### Asal yang diizinkan <a name="allowed-origins"></a>

Berdasarkan apa yang kita ketahui tentang CORS dan AMP (dari [Memverifikasi permintaan CORS](#verify-cors-requests) di atas), untuk contoh kita, kita akan mengizinkan permintaan dari domain berikut ini:

- `example.com` --- Domain penayang
- `example-com.cdn.ampproject.org` --- Subdomain Cache AMP Google

### Tajuk tanggapan untuk permintaan yang diizinkan <a name="response-headers-for-allowed-requests"></a>

Untuk permintaan dari asal yang diizinkan, tanggapan kita akan berisi tajuk berikut ini:

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

Ini adalah tajuk tanggapan tambahan yang mungkin kita sertakan di dalam tanggapan CORS kita:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### Logika CORS semu <a name="pseudo-cors-logic"></a>

Logika kita untuk menangani tanggapan dan permintaan CORS dapat disederhanakan menjadi kode semu berikut ini:

[sourcecode:text]
IF CORS header present
IF origin IN allowed-origins
allow request & send response
ELSE
deny request
ELSE
IF "AMP-Same-Origin: true"
allow request & send response
ELSE
deny request
[/sourcecode]

#### Kode sampel CORS <a name="cors-sample-code"></a>

Berikut ini adalah fungsi JavaScript sampel yang dapat kita gunakan untuk menangani tanggapan dan permintaan CORS:

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var origin;
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
'https://cdn.ampproject.org',
];
var allowedSourceOrigin = 'https://example.com'; //publisher's origin
// If same origin
if (req.headers['amp-same-origin'] == 'true') {
origin = sourceOrigin;
// If allowed CORS origin & allowed source origin
} else if (
allowedOrigins.indexOf(req.headers.origin) != -1 &&
sourceOrigin == allowedSourceOrigin
) {
origin = req.headers.origin;
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}

res.setHeader('Access-Control-Allow-Credentials', 'true');
res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

**Catatan**: : Untuk mengetahui sampel kode yang berhasil, kunjungi [amp-cors.js](https://github.com/ampproject/amphtml/blob/main/build-system/server/amp-cors.js).

### Skenario ke-1: Mendapatkan permintaan dari halaman AMP pada asal yang sama <a name="scenario-1-get-request-from-amp-page-on-same-origin"></a>

Di dalam skenario berikut ini, halaman `article-amp.html` meminta berkas `data.json`; asalnya sama.

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript><img alt="Contoh CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png"></noscript></amp-img>

Jika kita memeriksa permintaan ini, kita akan menemukan:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

Karena permintaan ini dari asal yang sama, tidak ada tajuk `Origin`, tetapi tajuk permintaan AMP kustom `AMP-Same-Origin: true` ada. Kita dapat mengizinkan permintaan ini karena asalnya sama (`https://example.com`).

Tajuk tanggapan kita akan berupa:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### Skenario ke-2: Mendapatkan permintaan dari halaman AMP di cache <a name="scenario-2-get-request-from-cached-amp-page"></a>

Di dalam skenario berikut ini, halaman `article-amp.html` di Cache AMP Google meminta berkas `data.json`; asalnya berbeda.

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript><img alt="Contoh CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png"></noscript></amp-img>

Jika kita memeriksa permintaan ini, kita akan menemukan:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

Karena permintaan ini berisi tajuk `Origin`, kita akan memverifikasi bahwa ini dari asal yang diizinkan. Kita dapat mengizinkan permintaan ini karena dari asal yang diizinkan.

Tajuk tanggapan kita akan berupa:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## Bekerja dengan font di cache <a name="working-with-cached-fonts"></a>

Cache AMP Google menyimpan, font, gambar, dan dokumen HTML untuk mengoptimalkan kecepatan halaman AMP. Walaupun membuat halaman AMP menjadi cepat, kita juga perlu berhati-hati dalam mengamankan sumber daya yang disimpan di cache. Kita akan melakukan perubahan tentang cara cache AMP menanggapi sumber daya yang disimpan di cache, umumnya untuk font, dengan memperhatikan nilai `Access-Control-Allow-Origin` asal.

### Perilaku sebelumnya (sebelum Oktober 2019) <a name="past-behavior-before-october-2019"></a>

Saat sebuah halaman AMP memuat atribut `https://example.com/some/font.ttf` dari `@font-face src`, Cache AMP akan menyimpan berkas font dan menyajikan sumber daya sebagaimana di bawah ini dengan memiliki karakter pengganti `Access-Control-Allow-Origin`.

- URL `https://example-com.cdn.ampproject.org/r/s/example.com/some/font.tff`
- Akses-Kontrol-Izinkan-Asal: \*

### Perilaku baru (Oktober 2019 dan setelahnya) <a name="new-behavior-october-2019-and-after"></a>

Walaupun penerapan saat ini diizinkan, namun ini dapat menyebabkan penggunaan yang tidak terduga atas font dari situs-situs lintas asal. Di dalam perubahan ini, Cache AMP akan mulai menanggapi dengan nilai `Access-Control-Allow-Origin` yang persis sama dengan yang ditanggapi server asal. Agar dapat memuat font dari dokumen AMP di cache, Anda perlu menerima asal Cache AMP melalui tajuk.

Penerapan sampel akan berupa:

[sourcecode:javascript]
function assertFontCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
];
// If allowed CORS origin
if (allowedOrigins.indexOf(req.headers.origin) != -1) {
res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}
}
[/sourcecode]

Sebagai contoh, jika Anda ingin memuat /some/font.ttf dalam `https://example.com/amp.html`, server asal harus menanggapi dengan tajuk Akses-Kontrol-Izinkan-Asal (Access-Control-Allow-Origin) seperti di bawah ini.

<amp-img alt="CORS font example" layout="responsive" src="https://amp.dev/static/img/docs/cors-font.jpg" width="2268" height="1594">
  <noscript><img alt="Contoh font CORS" src="https://amp.dev/static/img/docs/cors-font.jpg"></noscript></amp-img>

[tip type="note"] Jika berkas font Anda dapat diakses dari asal apa saja, Anda dapat menanggapi dengan karakter pengganti `Access-Control-Allow-Origin`, cache AMP juga akan memantulkan nilai tersebut, artinya akan menanggapinya dengan `Access-Control-Allow-Origin: *`. Jika Anda sudah menerapkan pengaturan ini, tidak perlu mengubah apa pun. [/tip]

Kami berencana menerapkan perubahan ini pada sekitar pertengahan Oktober 2019 dan mengharapkan setiap penayang AMP menggunakan font yang dikelola sendiri untuk memeriksa apakah terkena pengaruhnya.

#### Rencana pelaksanaan <a name="roll-out-plan"></a>

- 30-09-2019: rilis yang berisi kontrol yang lebih tepat tentang domain mana yang mendapatkan penerapan perubahan ini. Bentuk ini harus digulirkan sepanjang minggu ini.
- 07-10-2019: domain uji akan diaktifkan untuk pengujian manual.
- 14-10-2019: (tetapi tergantung bagaimana hasil pengujian): fitur akan digulirkan secara umum.

Ikuti masalah [yang terkait di sini.](https://github.com/ampproject/amphtml/issues/24834)

## Menguji CORS dalam AMP <a name="testing-cors-in-amp"></a>

Saat Anda menguji halaman AMP Anda, pastikan untuk menyertakan uji dari versi cache halaman AMP Anda.

### Memverifikasi halaman melalui URL cache <a name="verify-the-page-via-the-cache-url"></a>

Untuk memastikan halaman AMP Anda di cache merender dan berfungsi dengan benar:

1. Dari browser Anda, buka URL yang akan digunakan Cache AMP untuk mengakses halaman AMP Anda. Anda dapat menentukan format URL cache dari [alat ini di AMP berdasarkan Contoh.](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/).

   Contohnya:

   - URL: `https://amp.dev/documentation/guides-and-tutorials/start/create/`
   - Format URL Cache AMP: `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2. Buka alat pengembangan browser Anda dan pastikan bahwa tidak ada eror dan bahwa semua sumber daya telah dimuat dengan benar.

### Memverifikasi tajuk tanggapan server Anda <a name="verify-your-server-response-headers"></a>

Anda dapat menggunakan perintah `curl` untuk memverifikasi bahwa server Anda mengirimkan tajuk tanggapan HTTP yang benar. Di dalam perintah `curl` berikan URL permintaan dan tajuk kustom apa pun yang ingin Anda tambahkan.

**Sintaks**: `curl <request-url> -H <custom-header> - I`

#### Menguji permintaan dari asal yang sama <a name="test-request-from-same-origin"></a>

Di dalam permintaan dengan asal yang sama, sistem AMP menambahkan tajuk `AMP-Same-Origin:true` kustom.

Ini adalah perintah curl kita untuk menguji permintaan dari berkas `https://ampbyexample.com` untuk `examples.json` (pada domain yang sama):

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

Hasil dari perintah ini memperlihatkan tajuk tanggapan yang benar (catatan: informasi ekstra telah dipangkas):

[sourcecode:http]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### Menguji permintaan dari halaman AMP di cache <a name="test-request-from-cached-amp-page"></a>

Di dalam permintaan CORS yang bukan berasal dari domain yang sama (yaitu, cache), tajuk `origin` merupakan bagian dari permintaan.

Berikut ini adalah perintah curl kita untuk menguji permintaan dari halaman AMP di cache pada Cache AMP Google untuk berkas `examples.json`:

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

Hasil dari perintah ini memperlihatkan tajuk tanggapan yang benar:

```http
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```
