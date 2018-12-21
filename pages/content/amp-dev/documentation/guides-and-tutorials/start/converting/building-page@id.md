---
$title: Membuat halaman HTML reguler
---

Di direktori project, Anda akan menemukan file dengan nama [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html). Ini adalah artikel berita yang kita buatkan halaman setara AMP-nya.

1.  **Salin** seluruh kode dari file `article.html` kemudian tempel ke file baru.
2.  **Simpan** file baru sebagai `article.amp.html`.

Catatan: Anda tidak perlu memberi nama file AMP sebagai `.amp.html`. Bahkan, file AMP dapat memiliki ekstensi apa pun yang Anda inginkan. Penayang umumnya membedakan halaman AMP dari versi kanonisnya menggunakan parameter dalam URL. Misalnya:  `http://publisher.com/article.html?amp`.

File `article.amp.html` Anda akan terlihat seperti berikut:

```html
<!doctype html>
<html lang="en">
  <head>

    <title>Artikel Berita</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>
      Situs Berita
    </header>
    <article>
      <h1>Nama Artikel</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>
    </article>
    <img src="mountains.jpg">
  </body>
</html>
```

Ini adalah halaman yang sengaja disederhanakan dengan elemen artikel berita statis umum: CSS, JavaScript, dan tag gambar.

Artikel versi AMP milik kita hanya salinan dari artikel asli saat ini. Mari mengonversinya menjadi AMP.

Untuk memulai, kita akan menambahkan file library AMP.  Selain membuat file baru Anda menjadi halaman AMP yang valid, kita juga perlu melihat bagaimana library AMP dapat membantu kita untuk mencari tahu apa yang perlu dilakukan untuk memperbaikinya.

Untuk menyertakan library AMP, **tambahkan** baris berikut ke bagian bawah tag `<head>`:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

**Muat** halaman `article.amp.html` baru pada browser Anda di [http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html) kemudian, **buka** [Developer Console](https://developer.chrome.com/devtools/docs/console) di Chrome (atau browser pilihan Anda).

Saat memeriksa output JavaScript di Developer Console (pastikan Anda telah memilih tab Console), Anda akan melihat entri log berikut:

```text
Diberdayakan oleh AMP ⚡ HTML
```

Library AMP menyertakan [validator AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validate.md', locale=doc.locale).url.path}}) yang akan memberi tahu Anda jika ada sesuatu yang mencegah halaman Anda menjadi dokumen AMP yang valid.  **Aktifkan** validator AMP dengan menambahkan ID fragmen berikut ke URL dokumen Anda:

```text
#development=1
```

Misalnya:

```text
http://localhost:8000/article.amp.html#development=1
```

Di Developer Console, Anda akan menerima beberapa error validasi (Anda mungkin perlu memuat ulang halaman di browser secara manual untuk melihat ini):

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='Error validasi AMP untuk sampel kami') }}

Untuk menjadikannya dokumen AMP yang valid, kita perlu memperbaiki semua error ini--yang sebenarnya akan kita lakukan dalam codelab ini.

Sebelum melakukannya, mari **simulasikan** pengalaman perangkat seluler di Developer Tools browser karena kita bekerja dengan artikel berita seluler.  Misalnya, di DevTools Chrome, klik ikon ponsel, lalu pilih perangkat seluler dari menu.

Anda akan melihat resolusi simulasi seluler di browser seperti berikut:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Simulasi seluler halaman AMP kami') }}

Sekarang kita siap untuk mulai bekerja! Mari periksa error validasi satu per satu dan lihat bagaimana mereka berkaitan dengan AMP.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/setting-up.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/resolving-errors.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>
