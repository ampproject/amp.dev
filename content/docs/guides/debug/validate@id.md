---
$title: Memvalidasi Laman AMP
---

Kekuatan utama AMP tidak hanya membuat laman cepat dimuat, tetapi AMP membuat laman cepat dimuat dengan cara yang dapat *divalidasi*. Dengan cara ini, pihak ketiga seperti Twitter, Instagram, atau Google Penelusuran dapat merasa puas terkait penyajian laman AMP kepada pembaca dengan cara yang semakin menarik.

## Bagaimana cara memeriksa validitas laman AMP saya?

Ada beberapa cara untuk memvalidasi dokumen AMP. Semuanya akan
memberikan hasil yang sama persis, jadi gunakan cara mana saja yang paling sesuai dengan gaya
pengembangan Anda.

Selain untuk memvalidasi AMP, Anda mungkin juga ingin mengonfirmasi bahwa dokumen AMP [dapat ditemukan](/id/docs/guides/deploy/discovery.html) oleh platform pihak ketiga.

### Developer Console Browser.

Validator AMP hadir sepaket dengan pustaka JS AMP, jadi validator tersedia di setiap laman AMP tanpa perlu diotak-atik. Untuk memvalidasi:

  * Buka laman AMP di browser
  * Tambahkan "`#development=1`" ke URL, misalnya, `http://localhost:8000/released.amp.html#development=1`.
  * Buka [konsol Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) dan periksa kesalahan validasi.

Kesalahan Developer Console akan terlihat seperti ini:

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" alt="Tangkapan layar kesalahan Validator AMP di Developer Console Chrome" layout="responsive"></amp-img>


### Antarmuka Web

Validator AMP dapat digunakan sebagai antarmuka web di
[validator.ampproject.org](https://validator.ampproject.org/). Antarmuka
ini menunjukkan kesalahan yang ditampilkan sebaris bersama dengan sumber HTML laman.
Antarmuka adalah editor yang interaktif: perubahan pada sumber html menyebabkan
validasi ulang yang interaktif.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" alt="Tangkapan layar validator.ampproject.org dengan contoh kesalahan." layout="responsive"></amp-img>


### Ekstensi Browser

Validator AMP dapat diakses langsung dari bilah alat browser menggunakan
ekstensi browser. Saat Anda menjelajah, secara otomatis validator akan memvalidasi setiap laman AMP
yang dikunjungi dan memberikan indikasi visual terkait validitas laman dengan ikon
berwarna.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" alt="Ikon AMP Merah menunjukkan dokumen AMP yang tidak valid."></amp-img>
      
    </td>
    <td>Jika terjadi kesalahan dalam laman AMP, ikon ekstensi
      muncul dalam warna merah dan menampilkan jumlah kesalahan yang ditemukan.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" alt="Ikon AMP Hijau menunjukkan dokumen AMP yang valid."></amp-img>
      
    </td>
    <td>Jika tidak ada kesalahan dalam laman AMP, ikon muncul dalam warna hijau
      dan menampilkan jumlah peringatan, jika ada.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" alt="Ikon AMP Biru menunjukkan varian HTML AMP jika diklik."></amp-img>
      
    </td>
    <td>Jika laman bukan merupakan AMP namun mengindikasikan bahwa versi AMP tersedia,
      ikon muncul dalam warna biru dengan ikon tautan, dan mengeklik
      ekstensi tersebut akan mengalihkan browser ke versi AMP.
    </td>
  </tr>
</table>

Ekstensi Validator AMP untuk
[Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) dan [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### Alat Baris Perintah

Sebagai prasyarat, Anda harus memasang <a href="https://docs.npmjs.com/getting-started/installing-node">Node.js dengan `npm` pengelola paketnya
di sistem</a>.

Untuk memasang [alat baris perintah validator HTML AMP ](https://www.npmjs.com/package/amphtml-validator), ketik `npm install -g amphtml-validator`.

Sekarang, mari memvalidasi laman HTML AMP yang sesungguhnya.

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]

Ternyata laman ini adalah HTML AMP valid. Mari coba laman yang tidak valid:
[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Untuk menjalankan perintah `amphtml-validator`, Anda dapat menyediakan URL laman atau nama file lokal. Download dan simpan [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) ke file, lalu jalankan:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see https://www.ampproject.org/docs/reference/amp-img.html)
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see https://www.ampproject.org/docs/reference/amp-ad.html)
...
[/sourcecode]

Format pesan kesalahan terdiri dari nama file, baris, kolom, dan pesan,
sering kali diikuti oleh tautan ke referensi HTML AMP. Beberapa editor, termasuk Emacs
(cari mode kompilasi dan perintah kompilasi), dapat menafsirkan format ini dan memungkinkan
Anda melompat ke kesalahan di file asli.

Untuk titik awal yang baik guna membuat laman AMP sendiri, pertimbangkan [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

Alat baris perintah menawarkan fitur tambahan yang meliputi menonaktifkan
warna, mencetak keluaran JSON, atau menjalankan versi tertentu dari
Javascript validator (secara default menjalankan skrip terbaru yang dipublikasikan).

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## Apa yang terjadi jika laman saya tidak valid?

Validator AMP tidak hanya memudahkan Anda selama pengembangan. Validator juga digunakan oleh platform seperti Twitter atau Google yang mengintegrasikan laman AMP ke konten dan hasil penelusurannya. Selain itu, mereka biasanya tidak meminta laman langsung dari server, tetapi menggunakan Cache AMP Google, layanan gratis yang menyimpan cache laman Anda dan membuatnya tersedia di seluruh dunia, sehingga laman tersebut dimuat dengan lebih cepat.

Jika layanan validasi AMP mendeteksi ada sesuatu yang salah di laman Anda, laman tidak akan dapat ditemukan dan didistribusikan oleh situs web pihak ketiga dan tidak akan muncul di Cache AMP Google. Jadi tidak hanya akan kehilangan manfaat kecepatan menyimpan dalam cache, tetapi laman tidak akan terlihat di banyak tempat! Sangat disayangkan, jadi pastikan itu tidak terjadi.

## Bagaimana cara saya memperbaiki kesalahan validasi?

Kebanyakan kesalahan validasi cukup mudah dideteksi dan diperbaiki. Perhatikan tag HTML ini:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Hal yang menyebabkan kesalahan validasi AMP ini ditampilkan di alat yang berbeda berikut:

 * Developer Console Browser
<amp-img alt="Kesalahan AMP: Tag &#39;img&#39; mungkin hanya muncul sebagai turunan tag &#39;noscript&#39;. Apakah maksud Anda &#39;amp-img&#39;? baris 11, kolom 2" height="30" src="/static/img/docs/validator_console_imgerror.png" width="696" layout="responsive"></amp-img>

 * Antarmuka Web
<amp-img alt="Kesalahan AMP: Tag &#39;img&#39; mungkin hanya muncul sebagai turunan tag &#39;noscript&#39;. Apakah maksud Anda &#39;amp-img&#39;? baris 11, kolom 2" height="58" src="/static/img/docs/validator_webui_imgerror.png" width="676" layout="responsive"></amp-img>

 * Ekstensi Browser
<amp-img alt="Kesalahan AMP: Tag &#39;img&#39; mungkin hanya muncul sebagai turunan tag &#39;noscript&#39;. Apakah maksud Anda &#39;amp-img&#39;? baris 11, kolom 2" height="108" src="/static/img/docs/validator_extension_imgerror.png" width="724" layout="responsive"></amp-img>

Setiap alat memberikan beberapa informasi:

  1. Lokasi (baris dan kolom) di dokumen HTML tempat kesalahan terjadi,
     dapat diklik pada beberapa antarmuka untuk menyorot lokasi tersebut. Pada kasus
     ini, masalah terjadi di baris 11, kolom 2.
  1. Baris teks mendeskripsikan kesalahannya. Pada kasus ini, teks menunjukkan bahwa
     kami menggunakan tag `<img>`, ketika seharusnya menggunakan tag `<amp-img>`.
  1. Tautan ke dokumen yang relevan tentang kesalahan. Pada kasus ini,
     dokumentasi tersebut untuk tag `<amp-img>`. Tidak semua kesalahan menghasilkan
     tautan dokumentasi.

Berhati-hatilah saat membaca ulang spek, kami menyadari bahwa kami menggunakan tag `<img>`, yang seharusnya menggunakan tag `<amp-img>`.

Untuk memahami daftar lengkap potensi masalah dengan lebih baik,
lihat [panduan Kesalahan Validasi AMP](/id/docs/reference/validation_errors.html).
Jika masih mengalami masalah setelah mengevaluasi secara hati-hati, <a href="http://stackoverflow.com/questions/tagged/amp-html">ajukan
pertanyaan</a> dan kami akan mencoba
membantu.
