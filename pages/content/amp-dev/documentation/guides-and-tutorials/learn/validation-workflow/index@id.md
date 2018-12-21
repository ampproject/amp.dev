---
$title: Memvalidasi halaman AMP
---
[TOC]

[video src='https://www.youtube.com/watch?v=npum8JsITQE' caption='Tonton video kami tentang berbagai opsi validasi.']

Keunggulan utama AMP terletak bukan hanya pada membuat halaman cepat dimuat, namun juga membuat halaman cepat dimuat dengan cara yang dapat *divalidasi*. Dengan begitu, pihak ketiga seperti Twitter, Instagram, atau Google Penelusuran dapat merasa puas dengan penayangan halaman AMP kepada pembaca melalui cara yang semakin menarik.

## Bagaimana cara memeriksa validitas halaman AMP saya?

Ada beberapa cara untuk memvalidasi dokumen AMP. Semua cara akan
memberikan hasil yang sama persis, jadi gunakan cara mana saja yang paling sesuai
dengan gaya pengembangan Anda.

<<<<<<< HEAD
Selain memvalidasi AMP, ada baiknya Anda juga mengonfirmasi bahwa dokumen AMP Anda [dapat ditemukan]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}}) oleh platform pihak ketiga.
=======
Selain memvalidasi AMP, ada baiknya Anda juga mengonfirmasi bahwa dokumen AMP Anda [dapat ditemukan]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}}) oleh platform pihak ketiga.
>>>>>>> 3aeec0a67c667957f9f54faf118da91faf46313f

### Developer Console Browser

Validator AMP hadir sepaket dengan library JS AMP, sehingga library ini tersedia di setiap halaman AMP tanpa perlu diotak-atik. Untuk memvalidasi:

  1. Buka halaman AMP di browser.
  2. Tambahkan "`#development=1`" ke akhir URL, misalnya, `http://localhost:8000/released.amp.html#development=1`.
  3. Buka [konsol DevTools Chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/) dan periksa apakah ada error validasi.

Error Developer Console akan terlihat seperti ini:

<amp-img src="/static/img/docs/validator_errors.png"
         width="713" height="243" layout="responsive"
         alt="Tangkapan layar error Validator AMP di developer console chrome">
</amp-img>

### Antarmuka Web

Validator AMP dapat digunakan sebagai antarmuka web di
<a href="https://validator.ampproject.org/">validator.ampproject.org</a>. Antarmuka
ini menunjukkan error yang ditampilkan inline beserta sumber HTML halaman.
Antarmuka ini adalah editor interaktif: perubahan pada sumber HTML menyebabkan
validasi ulang yang interaktif.

<amp-img src="/static/img/docs/validator_web_ui.png"
         width="660" height="507" layout="responsive"
         alt="Tangkapan layar validator.ampproject.org dengan contoh error.">
</amp-img>

### Ekstensi Browser

Validator AMP dapat diakses langsung dari toolbar browser menggunakan
ekstensi browser. Saat Anda menjelajah, Validator AMP akan otomatis memvalidasi setiap halaman AMP
yang dikunjungi dan memberikan indikasi visual terkait validitas halaman
dengan ikon berwarna.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png"
               width="20" height="20" layout="fixed"
               alt="Ikon AMP merah menunjukkan dokumen AMP yang tidak valid.">
      </amp-img>
    </td>
    <td>Jika terjadi error dalam halaman AMP, ikon ekstensi akan
      muncul dalam warna merah dan menampilkan jumlah error yang ditemukan.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png"
               width="20" height="20" layout="fixed"
               alt="Ikon AMP hijau menunjukkan dokumen AMP yang valid.">
      </amp-img>
    </td>
    <td>Jika tidak ada error dalam halaman AMP, ikon muncul dalam
      warna hijau dan menampilkan jumlah peringatan, jika ada.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png"
               width="20" height="20" layout="fixed"
               alt="Ikon AMP biru menunjukkan varian HTML AMP jika diklik.">
      </amp-img>
    </td>
    <td>Jika halaman itu bukan AMP, namun mengindikasikan ada versi AMP-nya,
      ikon akan muncul dalam warna biru dengan ikon link, dan
      jika ekstensi diklik, browser akan dialihkan ke versi AMP tersebut.
    </td>
  </tr>
</table>

Ekstensi Validator AMP untuk
[Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) dan [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### Paket NPM untuk CI

Sebagai bagian dari pipeline build dan pengujian, Anda dapat mengintegrasikan validasi AMP melalui paket NPM Validator AMP: [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) atau [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator) (plugin gulp).  Misalnya, Anda dapat menggunakan paket NPM Validator AMP untuk uji integrasi atau dalam tugas terjadwal untuk memverifikasi halaman AMP produksi.


##### Contoh: Memvalidasi file HTML AMP

Dalam contoh ini, kita memvalidasi file HTML AMP menggunakan paket NPM [amphtml-validator](https://www.npmjs.com/package/amphtml-validator). Status validasi diteruskan ke konsol.

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

#####Contoh: Menggunakan tugas gulp untuk memvalidasi HTML AMP

Dalam contoh ini, kita menggunakan tugas gulp untuk memvalidasi semua file HTML AMP.  Jika ada error validasi AMP, tugas akan keluar dengan kode error (1).

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

### Fitur Command-Line

Anda dapat memvalidasi file HTML AMP menggunakan [fitur command-line validator HTML AMP](https://www.npmjs.com/package/amphtml-validator).

Memulai:

1.  Pastikan Anda memiliki [Node.js dengan pengelola paket
'npm'](https://docs.npmjs.com/getting-started/installing-node) dalam sistem Anda.
2.  Instal [fitur command-line validator HTML AMP](https://www.npmjs.com/package/amphtml-validator) dengan menjalankan perintah berikut: `npm install -g amphtml-validator`.

Sekarang, mari kita validasi halaman HTML AMP yang sebenarnya:

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]

Ternyata halaman ini adalah HTML AMP yang valid. Mari kita coba halaman yang tidak valid:
[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Untuk menjalankan perintah `amphtml-validator`, Anda dapat memasukkan URL halaman atau nama file lokal. Download dan simpan [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) ke file, lalu jalankan:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see https://www.ampproject.org/id/docs/reference/components/amp-img.html)
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see https://www.ampproject.org/id/docs/reference/components/amp-ad.html)
...
[/sourcecode]

Format pesan error ini terdiri dari nama file, baris, kolom, dan pesan,
yang sering kali diikuti dengan link ke referensi HTML AMP. Beberapa editor, termasuk Emacs
(temukan compile command dan compilation mode), dapat menafsirkan format ini
dan memungkinkan Anda langsung menuju ke error pada file asli.

Sebagai titik awal yang baik untuk membuat halaman AMP Anda sendiri, pertimbangkan [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

Fitur command-line menawarkan fitur tambahan yang meliputi menonaktifkan
warna, mencetak output JSON, atau menjalankan versi tertentu dari
JavaScript validator (secara default, fitur ini menjalankan skrip terbaru yang dipublikasikan).

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

Validator AMP tidak hanya memudahkan Anda selama pengembangan. Validator juga digunakan oleh platform seperti Twitter atau Google yang mengintegrasikan halaman AMP ke konten dan hasil penelusurannya. Selain itu, mereka biasanya tidak meminta halaman langsung dari server, tetapi menggunakan Cache AMP Google, layanan gratis yang menyimpan cache halaman Anda dan membuatnya tersedia di seluruh dunia, sehingga halaman tersebut dimuat dengan lebih cepat.

Jika layanan validasi AMP mendeteksi ada sesuatu yang salah di halaman Anda, halaman tidak akan dapat ditemukan dan didistribusikan oleh situs web pihak ketiga dan tidak akan muncul di Cache AMP Google. Jadi Anda tidak hanya akan kehilangan manfaat kecepatan menyimpan dalam cache, tetapi halaman tidak akan terlihat di banyak tempat! Sangat disayangkan, jadi pastikan itu tidak terjadi.

## Bagaimana cara memperbaiki error validasi?

Kebanyakan error validasi cukup mudah dideteksi dan diperbaiki. Perhatikan tag HTML ini:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

yang menyebabkan error validasi AMP seperti ditunjukkan pada fitur lain berikut:

* Developer Console Browser
<amp-img src="/static/img/docs/validator_console_imgerror.png"
         width="696" height="30" layout="responsive"
         alt="Error AMP: Tag 'img' mungkin hanya muncul sebagai turunan dari tag
         'noscript'. Mungkin maksud Anda 'amp-img'? line 11, column 2">
</amp-img>

* Antarmuka Web
<amp-img src="/static/img/docs/validator_webui_imgerror.png"
         width="676" height="58" layout="responsive"
         alt="Error AMP: Tag 'img' mungkin hanya muncul sebagai turunan dari tag
         'noscript'. Mungkin maksud Anda 'amp-img'? line 11, column 2">
</amp-img>

* Ekstensi Browser
<amp-img src="/static/img/docs/validator_extension_imgerror.png"
         width="724" height="108" layout="responsive"
         alt="Error AMP: Tag 'img' mungkin hanya muncul sebagai turunan dari tag
         'noscript'. Mungkin maksud Anda 'amp-img'? line 11, column 2">
</amp-img>

Setiap fitur memberikan beberapa informasi:


  1. Lokasi (baris dan kolom) dalam dokumen HTML tempat error terjadi,
     yang pada beberapa antarmuka dapat diklik untuk menyorot lokasi tersebut. Pada
     kasus ini, masalah terjadi di baris 11, kolom 2.
  2. Baris teks yang menjelaskan error itu. Pada kasus ini, teks menunjukkan bahwa
     kita menggunakan tag `<img>`, saat seharusnya menggunakan tag `<amp-img>`.
  3. Link ke dokumen yang relevan tentang error itu. Pada kasus ini,
     dokumentasi untuk tag `<amp-img>`. Tidak semua error menghasilkan
     link dokumentasi.

Dengan membaca ulang [spek]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/spec/index.md', locale=doc.locale).url.path}}) secara cermat, kita akan tahu bahwa kita menggunakan tag`<img>`, saat seharusnya menggunakan tag `<amp-img>`.

Untuk memahami daftar lengkap potensi error dengan lebih baik,
baca [panduan Error Validasi AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md', locale=doc.locale).url.path}}).
Jika masih mengalami masalah setelah menjalankan evaluasi dengan cermat, [ajukan
pertanyaan](http://stackoverflow.com/questions/tagged/amp-html) dan kami akan
mencoba untuk membantu.



