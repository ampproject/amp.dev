---
"$title": Panduan Pengoptimal AMP Node.js
"$order": '2'
description: Panduan ini menjelaskan cara menyiapkan dan menggunakan versi Node.js Pengoptimal AMP.
formats:
- websites
- stories
author: sebastianbenz
---

Panduan ini menjelaskan cara menyiapkan dan menggunakan versi Node.js Pengoptimal AMP.

## Penyiapan

Instal melalui NPM dengan menggunakan:

```shell
npm install @ampproject/toolbox-optimizer
```

## Penggunaan

API Pengoptimal AMP mengambil sebuah untai HTML sebagai input dan menghasilkan/mengembalikan versi untai HTML yang telah dioptimalkan. Penggunaan dasarnya terlihat seperti ini:

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### Membuat AMP yang dioptimalkan pada Waktu-Build

Untuk situs statis, yang terbaik adalah mengoptimalkan halaman AMP pada waktu-build saat membangun situs Anda. Berikut ini adalah contoh tentang cara mengintegrasikannya ke dalam build berbasis [Gulp.js](https://gulpjs.com/). Contoh ini menambahkan transformasi kustom yang mengoptimalkan semua berkas HTML di dalam folder src:

```js
const {src, dest} = require('gulp');
const through2 = require('through2');

const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();

function build(cb) {
  return src('src/*.html')
    .pipe(
      through2.obj(async (file, _, cb) => {
        if (file.isBuffer()) {
          const optimizedHtml = await ampOptimizer.transformHtml(
            file.contents.toString()
          );
          file.contents = Buffer.from(optimizedHtml);
        }
        cb(null, file);
      })
    )
    .pipe(dest('dist/'));
}

exports.default = build;
```

### Waktu-Render

Untuk halaman yang dinamis, sering perlu untuk merender halaman di server. Di dalam hal ini, Anda dapat menjalankan Pengoptimal AMP setelah merender halaman Anda. Berikut ini adalah contoh integrasi ke dalam server [Express.js](https://expressjs.com/). Salah satu cara mengintegrasikan Pengoptimalan AMP ke dalam perute Ekspres adalah menjalankannya dalam sebuah callback setelah templat [dirender](https://expressjs.com/en/api.html#app.render):

```js
const express = require('express');
const router = express.Router();
const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();

router.get('/', (req, res) => {
  const locals = {title: 'Express with AMP Optimizer'};
  res.render('index', locals, async (err, html) => {
    const optimizedHtml = await ampOptimizer.transformHtml(html);
    res.send(optimizedHtml);
  });
});

module.exports = router;
```

Penting: Pastikan untuk menyiapkan penyimpanan di cache atau CDN saat menggunakan Pengoptimal AMP di server untuk menghindari penundaan perenderan.

## Konfigurasi

Pengoptimal AMP menyediakan konfigurasi default yang wajar yang akan bekerja dengan baik dalam banyak kasus. Namun, transformasi dapat dikustomisasi untuk kasus atau contoh penggunaan yang spesifik. Anda dapat melihat daftar semua pilihan yang tersedia [di sini](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options).

Beberapa pilihan yang perlu diperhatikan adalah:

- `lts: true` untuk memungkinkan [URL stabil dalam jangka panjang](https://github.com/ampproject/amphtml/blob/main/contributing/lts-release.md) untuk komponen dan runtime AMP.
- `verbose: true` untuk output debugging yang terperinci. Terutama sangat baik untuk mengetahui mengapa boilerplate AMP tidak dapat dihapus.
- `imageOptimizer`: memungkinkan pembuatan srcset gambar otomatis dengan menyediakan fungsi untuk menghitung URL srcset untuk serc gambar tertentu. Fungsi ini akan menghasilkan URL yang mengarah ke versi gambar <code>src</code> dengan lebar tertentu. Jika gambar tidak tersedia, yang dihasilkan adalah nilai semu (falsy). Selengkapnya tentang hal ini di dalam bagian selanjutnya.

### Pengoptimalan Gambar

Pengoptimal AMP dapat menghasilkan nilai-nilai `srcset` untuk `amp-img` tertentu berdasarkan definisi `layout`-nya. Agar ini dapat berfungsi, Anda perlu menyediakan fungsi yang memetakan `src` gambar dan sebuah `width` ke nilai sumber `srcset` yang telah diubah ukurannya. Pengubahan ukuran gambar tidak dilakukan oleh Pengoptimal AMP dan perlu agar terjadi pada waktu-build (cth.: untuk situs statis) atau melalui layanan pengelolaan atau penyediaan gambar, seperti [thumbor](https://github.com/thumbor/thumbor).

Berikut ini adalah penerapan contoh yang melampirkan lebar gambar ke `src`:

```js
const ampOptimizer = AmpOptimizer.create({
  // parameters are the amp-img `src` and the `width` of the to be generated srcset source value
  imageOptimizer: (src, width) => {
    // we cannot rename if the image does not have a file extension
    const index = src.lastIndexOf('.');
    if (index === -1) {
      // return null means we won't generate a srcset source value for this width
      return null;
    }
    const prefix = src.substring(0, index);
    const postfix = src.substring(index, src.length);
    return `${prefix}.${width}w${postfix}`;
  };
})
```

Dengan menggunakan penerapan ini, Pengoptimal AMP akan mengubah pernyataan `amp-img` berikut ini:

```html
<!-- Injects srcset for responsive layout -->
<amp-img
  src="image1.png"
  width="400"
  height="800"
  layout="responsive"
></amp-img>
<!-- Ignores existing srcset -->
<amp-img
  layout="fill"
  srcset="image-1x.png 1x,
                             image-2x.png 2x"
></amp-img>
```

menjadi:

```html
<!-- Injects srcset for responsive layout -->
<amp-img
  src="image1.png"
  width="400"
  height="800"
  layout="responsive"
  srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"
></amp-img>
<!-- Ignores existing srcset -->
<amp-img
  layout="fill"
  srcset="image-1x.png 1x,
                               image-2x.png 2x"
></amp-img>
```

Kiat: Saat menggunakan `layout=responsive` gunakan atribut `width` dan `height` untuk menentukan dimensi gambar minimum. Contohnya: untuk gambar hero dengan lebihan (bleed) penuh pada perangkat seluler, tentukan lebar sebagai `width=320`.
