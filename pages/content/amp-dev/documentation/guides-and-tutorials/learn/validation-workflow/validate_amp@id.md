---
"$title": Memvalidasi halaman AMP
"$order": '0'
description: Tonton video kami tentang berbagai opsi validasi. Kekuatan utama AMP tidak hanya karena membuat halaman Anda cepat, tetapi juga membuat halaman Anda ....
formats:
- websites
- stories
- ads
---

[video src='https://www.youtube.com/watch?v=npum8JsITQE' caption='Tonton video kami tentang berbagai opsi validasi.']

Kekuatan utama AMP tidak hanya karena membuat halaman Anda cepat, tetapi juga membuat halaman Anda cepat dengan cara yang dapat *divalidasi*. Dengan begitu, pihak ketiga, seperti Twitter, Instagram, atau Google Search dapat merasa puas dengan penayangan halaman AMP kepada pembaca melalui cara yang semakin menarik.

## Bagaimana cara memeriksa validitas halaman AMP saya?

Ada beberapa cara untuk memvalidasi dokumen AMP. Semua cara akan memberikan hasil yang sama persis, jadi gunakan cara mana saja yang paling sesuai dengan gaya pengembangan Anda.

Selain memvalidasi AMP, Anda juga mungkin ingin mengonfirmasi bahwa dokumen AMP Anda [dapat ditemukan](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) oleh platform pihak ketiga.

### Konsol Pengembang Browser

Validator AMP hadir sepaket dengan perpustakaan JS AMP, sehingga perpustakaan ini tersedia di setiap halaman AMP tanpa perlu diotak-atik. Untuk memvalidasi:

1. Buka halaman Anda di browser.
2. Lampirkan "`#development=[1,actions,amp,amp4ads,amp4email]`" ke URL, contoh: `http://localhost:8000/released.amp.html#development=1` adalah cara lama atau warisan untuk memvalidasi format <code>AMP</code>. URL berikut ini, <code>http://localhost:8000/released.amp.html#development=amp4email</code> akan memvalidasi dokumen sesuai spek AMP untuk email.
3. Buka [konsol Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) dan periksa apakah ada eror atau kesalahan validasi.

Eror Konsol Pengembang akan terlihat seperti ini:

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" layout="responsive" alt="Screen grab of AMP Validator errors in chrome developer console"></amp-img>

### Antarmuka Web

The AMP Validator can be used as a web interface at <a href="https://validator.ampproject.org/">validator.ampproject.org</a>. This interface shows errors displayed inline alongside the HTML source of the page. The interface is an interactive editor: changes to the html source result in interactive revalidation.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" layout="responsive" alt="Screen grab of validator.ampproject.org with error examples."></amp-img>

### Ekstensi Browser

The AMP Validator can be accessed directly from your browser's toolbar using a browser extension. As you browse, it will automatically validate each AMP page visited and gives a visual indication of the validity of the page as a colored icon.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" layout="fixed" alt="Red AMP icon indicating invalid AMP document.">
      </amp-img>
    </td>
    <td>Jika terjadi eror dalam halaman AMP, ikon ekstensi akan       muncul dalam warna merah dan menampilkan jumlah eror yang ditemukan.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" layout="fixed" alt="Green AMP icon indicating valid AMP document.">
      </amp-img>
    </td>
    <td>Jika tidak ada eror dalam halaman AMP, ikon muncul dalam       warna hijau dan menampilkan jumlah peringatan, jika ada.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" layout="fixed" alt="Blue AMP icon indicating AMP HTML variant if clicked.">
      </amp-img>
    </td>
    <td>Jika halaman itu bukan AMP, namun mengindikasikan ada versi AMP-nya, ikon akan muncul dalam warna biru dengan ikon tautan, dan jika ekstensi tersebut diklik, browser akan dialihkan ke versi AMP tersebut.</td>
  </tr>
</table>

Ekstensi Validator AMP untuk [Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) dan [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### Paket NPM untuk CI

Sebagai bagian dari pipeline build dan pengujian, Anda dapat mengintegrasikan validasi AMP melalui paket NPM Validator AMP: [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) atau [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator) (plugin gulp).  Misalnya: Anda dapat menggunakan paket NPM Validator AMP untuk uji integrasi atau dalam tugas terjadwal untuk memverifikasi halaman AMP produksi.

##### Example: Validating an AMP HTML file

Dalam contoh ini, kita memvalidasi berkas HTML AMP dengan menggunakan paket NPM [amphtml-validator](https://www.npmjs.com/package/amphtml-validator). Status validasi diteruskan ke konsol.

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

##### Contoh: Menggunakan tugas gulp untuk memvalidasi HTML AMP

Dalam contoh ini, kita menggunakan tugas gulp untuk memvalidasi semua berkas HTML AMP. Jika ada eror validasi AMP, tugas akan keluar dengan kode eror (1).

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

Anda dapat memvalidasi berkas HTML AMP dengan menggunakan [alat baris perintah validator HTML AMP](https://www.npmjs.com/package/amphtml-validator).

Memulai:

1. Pastikan Anda memiliki [Node.js dengan pengelola paket 'npm'](https://docs.npmjs.com/getting-started/installing-node) dalam sistem Anda.
2. Instal [alat baris perintah validator HTML AMP](https://www.npmjs.com/package/amphtml-validator) dengan menjalankan perintah berikut ini: `npm install -g amphtml-validator`.

Sekarang, mari kita validasi halaman HTML AMP yang sebenarnya:

[sourcecode:console]
$ amphtml-validator https://amp.dev/
https://amp.dev/: PASS
[/sourcecode]

Ternyata halaman ini adalah HTML AMP yang valid. Mari kita coba halaman yang tidak valid: [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Untuk menjalankan perintah `amphtml-validator`, Anda dapat memasukkan URL halaman atau nama berkas lokal. Unduh dan simpan [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) menjadi berkas, lalu jalankan:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
...
[/sourcecode]

Format pesan eror ini terdiri dari nama berkas, baris, kolom, dan pesan, yang sering kali diikuti oleh tautan ke referensi HTML AMP. Beberapa editor, termasuk Emacs (Editor MACroS), dapat menafsirkan format ini dan memungkinkan Anda langsung menuju ke eror pada berkas asli.

Sebagai titik awal yang baik untuk membuat halaman AMP Anda sendiri, pertimbangkan [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

Alat baris perintah menawarkan fitur tambahan yang meliputi menonaktifkan warna, mencetak output JSON, atau menjalankan versi tertentu dari JavaScript validator (sebagai standar, fitur ini menjalankan skrip terbaru yang dipublikasikan).

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

Validator AMP tidak hanya memudahkan Anda selama pengembangan. Validator juga digunakan oleh platform seperti Twitter atau Google yang mengintegrasikan halaman AMP ke konten dan hasil penelusurannya. Selain itu, mereka biasanya tidak meminta halaman langsung dari server, tetapi menggunakan Cache AMP Google, layanan gratis yang menyimpan cache halaman Anda dan membuatnya tersedia di seluruh dunia, sehingga halaman tersebut dimuat jauh lebih cepat.

Jika layanan validasi AMP mendeteksi ada sesuatu yang salah di halaman Anda, halaman tidak akan dapat ditemukan dan didistribusikan oleh situs web pihak ketiga dan tidak akan muncul di Cache AMP Google. Jadi, Anda tidak hanya akan kehilangan manfaat kecepatan menyimpan dalam cache, tetapi halaman tidak akan terlihat di banyak tempat! Sangat disayangkan, jadi pastikan itu tidak terjadi.

## Bagaimana cara memperbaiki eror validasi?

Kebanyakan eror validasi cukup mudah dideteksi dan diperbaiki. Perhatikan tag HTML ini:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Yang menyebabkan eror validasi AMP, seperti ditunjukkan pada alat lain berikut ini:

- Browser Developer Console
    <amp-img src="/static/img/docs/validator_console_imgerror.png" width="696" height="30" layout="responsive" alt="AMP error: The tag 'img' may only appear as a descendant of tag'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>



- Web Interface
    <amp-img src="/static/img/docs/validator_webui_imgerror.png" width="676" height="58" layout="responsive" alt="AMP error: The tag 'img' may only appear as a descendant of tag'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>



- Browser Extension
    <amp-img src="/static/img/docs/validator_extension_imgerror.png" width="724" height="108" layout="responsive" alt="AMP error: The tag 'img' may only appear as a descendant of tag'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>



Setiap alat memberikan beberapa informasi:

1. Lokasi (baris dan kolom) dalam dokumen HTML tempat eror terjadi, yang pada beberapa antarmuka dapat diklik untuk menyorot lokasi tersebut. Pada kasus ini, masalah terjadi di baris 11, kolom 2.
2. Baris teks yang menjelaskan eror itu. Pada kasus ini, teks menunjukkan bahwa kita menggunakan tag `<img>`, saat seharusnya menggunakan tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).
3. A link to a relevant document about the error. In this case the documentation for the [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) tag. Not all errors generate documentation links.

Dengan membaca ulang [spek](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md) secara cermat, kita akan tahu bahwa kita menggunakan tag`<img>`, saat seharusnya menggunakan tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).

Untuk memahami daftar lengkap potensi eror dengan lebih baik, kunjungi [panduan Kesalahan Validasi AMP](validation_errors.md). Jika masih mengalami masalah setelah melakukan evaluasi dengan cermat, [ajukan pertanyaan](http://stackoverflow.com/questions/tagged/amp-html) dan kami akan mencoba untuk membantu.
