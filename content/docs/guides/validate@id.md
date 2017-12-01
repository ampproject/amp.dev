---
$title: Memvalidasi Halaman AMP
---
[TOC]

Kekuatan utama AMP bukan hanya membuat halaman cepat dimuat, tetapi melakukannya dengan cara yang dapat *divalidasi*. Dengan cara ini, pihak ketiga seperti Twitter, Instagram, atau Google Penelusuran dapat merasa puas dalam menayangkan halaman AMP kepada pembaca dengan cara yang semakin menarik.

## Bagaimana saya mengetahui apakah halaman saya merupakan AMP yang valid?

Ada beberapa cara untuk memvalidasi dokumen AMP. Semuanya akan memberikan hasil yang sama persis, jadi gunakan cara mana saja yang paling sesuai dengan gaya pengembangan Anda.

Selain memvalidasi AMP, Anda mungkin juga ingin mengonfirmasi bahwa dokumen AMP Anda [dapat ditemukan](/id/docs/guides/discovery.html) oleh platform pihak ketiga.

### Konsol Developer Browser

Validator AMP hadir sepaket dengan pustaka JS AMP, jadi validator tersedia di setiap halaman AMP tanpa perlu diutak-atik. Untuk memvalidasi:

  1. Buka halaman AMP di browser Anda.
  1. Tambahkan "`#development=1`" ke URL, misalnya, `http://localhost:8000/released.amp.html#development=1`.
  1. Buka [konsol DevTools Chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/) dan periksa apakah ada error validasi.

Error Konsol Developer akan terlihat seperti ini:

<amp-img    src="/static/img/docs/validator_errors.png"
            width="713" height="243" layout="responsive"
            alt="Screen grab of AMP Validator errors in chrome developer console">
</amp-img>

### Antarmuka Web

Validator AMP dapat digunakan sebagai antarmuka web di <a href="https://validator.ampproject.org/">validator.ampproject.org</a>. Antarmuka ini menunjukkan error yang ditampilkan sebaris dengan sumber HTML halaman. Antarmuka adalah editor yang interaktif: perubahan pada sumber html menyebabkan validasi ulang yang interaktif.

<amp-img    src="/static/img/docs/validator_web_ui.png"
            width="660" height="507" layout="responsive"
            alt="Screen grab of validator.ampproject.org with error examples.">
</amp-img>

### Ekstensi Browser

Validator AMP dapat langsung diakses dari toolbar browser menggunakan ekstensi browser. Saat Anda melakukan browsing, secara otomatis validator akan memvalidasi setiap halaman AMP yang dikunjungi dan memberikan indikasi visual terkait validitas halaman dengan ikon berwarna.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png"
               width="20" height="20" layout="fixed"
               alt="Red AMP icon indicating invalid AMP document.">
      </amp-img>
    </td>
    <td>
    Jika ada error dalam halaman AMP, ikon ekstensi akan muncul dalam warna merah dan menampilkan jumlah error yang ditemukan.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png"
               width="20" height="20" layout="fixed"
               alt="Green AMP icon indicating valid AMP document.">
      </amp-img>
    </td>
    <td>Jika tidak ada error dalam halaman AMP, ikon muncul dalam warna hijau dan menampilkan jumlah peringatan, jika ada.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png"
               width="20" height="20" layout="fixed"
               alt="Blue AMP icon indicating AMP HTML variant if clicked.">
      </amp-img>
    </td>
    <td>Jika halaman bukan merupakan AMP namun menunjukkan bahwa versi AMP tersedia, ikon akan muncul dalam warna biru dengan ikon link, dan mengklik ekstensi akan mengalihkan browser ke versi AMP.
    </td>
  </tr>
</table>

Ekstensi Validator AMP untuk [Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) dan [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### Paket NPM untuk CI

Sebagai bagian dari rangkaian pembuatan dan pengujian, Anda dapat mengintegrasikan validasi AMP melalui paket NPM Validator AMP: [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) atau [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator) (plugin gulp). Misalnya, Anda dapat menggunakan paket NPM Validator AMP untuk pengujian integrasi atau dalam menjadwalkan tugas untuk memverifikasi halaman AMP produksi.

##### Misalnya: Memvalidasi file HTML AMP

Dalam contoh ini, kita memvalidasi file HTML AMP menggunakan paket NPM [amphtml-validator](https://www.npmjs.com/package/amphtml-validator). Status validasi dikirimkan ke konsol.

```javascript
'use strict';
var amphtmlValidator = require('amphtml-validator');
var fs = require('fs');

amphtmlValidator.getInstance().then(function (validator) {
  var input = fs.readFileSync('index.html', 'utf8');
  var result = validator.validateString(input);
  ((result.status === 'PASS') ? console.log : console.error)(result.status);
  for (var ii = 0; ii < result.errors.length; ii++) {
    var error = result.errors[ii];
    var msg = 'line ' + error.line + ', col ' + error.col + ': ' + error.message;
    if (error.specUrl !== null) {
      msg += ' (see ' + error.specUrl + ')';
    }
    ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
  }
});
```

##### Mislanya: Menggunakan tugas gulp untuk memvalidasi HTML AMP

Dalam contoh ini, kita memiliki tugas gulp yang memvalidasi semua file HTML AMP. Jika ada error validasi AMP, tugas berhenti dengan kode error (1).

```javascript
const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');

const paths = {
  src: 'src/*.html'
};

gulp.task('amphtml:validate', () => {
  return gulp.src(paths.src)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});
gulp.task('default', ['amphtml:validate'], function () { 
});
```

### Alat Baris Perintah

Anda dapat memvalidasi file HTML AMP menggunakan [alat baris perintah validator HTML AMP](https://www.npmjs.com/package/amphtml-validator).

Memulai:

1.  Pastikan Anda memiliki [Node.js dengan pengelola paketnya 'npm'](https://docs.npmjs.com/getting-started/installing-node) di sistem Anda.
2.  Instal [alat baris perintah validator HTML AMP](https://www.npmjs.com/package/amphtml-validator) dengan menjalankan perintah berikut: `npm install -g amphtml-validator`

Sekarang, mari kita memvalidasi halaman HTML AMP yang sebenarnya:

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]


Ternyata, halaman ini adalah HTML AMP yang valid. Mari mencoba memvalidasi halaman yang tidak valid: [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Untuk menjalankan perintah `amphtml-validator`, Anda dapat memberikan URL halaman atau nama file lokal. Download dan simpan [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) dalam bentuk file, lalu jalankan:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see https://www.ampproject.org/docs/reference/amp-img.html)
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see https://www.ampproject.org/docs/reference/amp-ad.html)
...
[/sourcecode]

Format pesan error terdiri dari nama file, baris, kolom, dan pesan, sering kali diikuti oleh link ke referensi HTML AMP. Beberapa editor, termasuk Emacs (cari mode kompilasi dan perintah kompilasi), dapat menafsirkan format ini dan memungkinkan Anda melompat ke error di file asli.

Untuk permulaan yang baik dalam membuat halaman AMP sendiri, pertimbangkan [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

Alat baris perintah ini menawarkan fitur tambahan yang meliputi menonaktifkan warna, mencetak keluaran JSON, atau menjalankan versi tertentu dari Javascript validator (secara default yang dijalankan adalah skrip terbaru yang dipublikasikan).

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

## Apa yang terjadi jika halaman saya tidak valid?

Validator AMP tidak hanya memudahkan Anda selama pengembangan. Validator juga digunakan oleh platform seperti Twitter atau Google yang mengintegrasikan halaman AMP Anda ke konten dan hasil penelusurannya. Selain itu, mereka biasanya tidak meminta halaman langsung dari server tetapi menggunakan Cache AMP Google, layanan gratis yang menyimpan cache halaman Anda dan membuatnya tersedia di seluruh dunia, sehingga halaman tersebut dimuat dengan lebih cepat.

Jika layanan validasi AMP mendeteksi ada sesuatu yang salah di halaman Anda, halaman tidak akan dapat ditemukan dan didistribusikan oleh situs web pihak ketiga dan tidak akan muncul di Cache AMP Google. Jadi Anda tidak hanya akan kehilangan manfaat kecepatan cache, tetapi halaman tidak akan terlihat di banyak tempat! Sangat disayangkan, jadi pastikan hal itu tidak terjadi.

## Bagaimana cara memperbaiki error validasi?

Kebanyakan kesalahan validasi cukup mudah dideteksi dan diperbaiki. Perhatikan tag HTML ini:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Hal yang menyebabkan error validasi AMP ini ditampilkan di fitur yang berbeda berikut:

* Konsol Developer Browser
<amp-img src="/static/img/docs/validator_console_imgerror.png"
         width="696" height="30" layout="responsive"
         alt="AMP error: The tag 'img' may only appear as a descendant of tag
         'noscript'. Did you mean 'amp-img'? line 11, column 2">
</amp-img>

* Antarmuka Web
<amp-img src="/static/img/docs/validator_webui_imgerror.png"
         width="676" height="58" layout="responsive"
         alt="AMP error: The tag 'img' may only appear as a descendant of tag
         'noscript'. Did you mean 'amp-img'? line 11, column 2">
</amp-img>

* Ekstensi Browser
<amp-img src="/static/img/docs/validator_extension_imgerror.png"
         width="724" height="108" layout="responsive"
         alt="AMP error: The tag 'img' may only appear as a descendant of tag
         'noscript'. Did you mean 'amp-img'? line 11, column 2">
</amp-img>

Setiap fitur memberikan beberapa informasi:

  1.  Lokasi (baris dan kolom) di dokumen HTML tempat error terjadi, dapat diklik pada beberapa antarmuka untuk memperjelas lokasi tersebut. Pada kasus ini, masalah terjadi di baris 11, kolom 2.
  1.  Baris teks mendeskripsikan kesalahannya. Pada kasus ini, teks menunjukkan bahwa kami menggunakan tag `<img>`, padahal tag yang digunakan seharusnya `<amp-img>`.
  1.  Link ke dokumen yang relevan tentang error. Pada kasus ini, dokumentasi tersebut untuk tag `<amp-img>`. Tidak semua error menghasilkan link dokumentasi.

Saat membaca ulang [spesifikasi](/id/docs/reference/spec.html), kami menyadari bahwa kami menggunakan tag `<img>`, padahal tag yang digunakan seharusnya `<amp-img>`.

Untuk lebih memahami daftar lengkap error yang mungkin terjadi, lihat [panduan Error Validasi AMP](https://www.ampproject.org/docs/reference/validation_errors.html). Jika masih mengalami masalah setelah mengevaluasi dengan saksama, [ajukan pertanyaan](http://stackoverflow.com/questions/tagged/amp-html) dan kami akan mencoba membantu.
