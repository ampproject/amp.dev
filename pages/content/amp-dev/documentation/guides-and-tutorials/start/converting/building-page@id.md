---
'$title': Membuat halaman HTML reguler
$order: 1
description: Di direktori proyek, Anda akan menemukan berkas bernama article.html. Ini adalah artikel berita yang kita buatkan halaman setara AMP untuk ....
---

Di direktori project, Anda akan menemukan berkas bernama [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html). Ini adalah artikel berita yang kita buatkan halaman setara AMP.

1. **Salin** seluruh kode dari berkas `article.html`, kemudian tempel ke berkas baru.
2. **Simpan** berkas baru sebagai `article.amp.html`.

[tip type="note"] **CATATAN –** Anda tidak perlu menama berkas AMP Anda sebagai `.amp.html`. Malah, berkas AMP dapat memiliki ekstensi apa pun yang Anda inginkan. Sangat umum melihat penayang membedakan halaman AMP dari versi kanonisnya dengan menggunakan parameter di URL. Contoh: `http://publisher.com/article.html?amp`. [/tip]

Berkas `article.amp.html` Anda akan terlihat seperti yang berikut ini:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>
    </article>
    <img src="mountains.jpg" />
  </body>
</html>
```

Ini adalah halaman yang sengaja disederhanakan dengan elemen artikel berita statis umum: CSS, JavaScript, dan tag gambar.

Artikel versi AMP milik kita hanya salinan dari artikel asli saat ini. Mari mengonversinya menjadi AMP.

Untuk memulai, kita akan menambahkan berkas perpustakaan AMP. Selain membuat berkas baru Anda menjadi halaman AMP yang valid, kita juga perlu melihat bagaimana perpustakaan AMP dapat membantu kita untuk mencari tahu apa yang perlu dilakukan untuk memperbaikinya.

Untuk menyertakan perpustakaan AMP, **tambahkan** baris berikut ini ke bagian bawah tag `<head>`:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

**Muat** halaman `article.amp.html` baru pada browser Anda di [http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html), kemudian **buka** [Konsol Pengembang](https://developer.chrome.com/devtools/docs/console) di Chrome (atau browser pilihan Anda).

Saat memeriksa output JavaScript di Konsol Pengembang (pastikan Anda telah memilih tab Konsol), Anda akan melihat entri catatan riwayat (log) berikut ini:

```text
Powered by AMP ⚡ HTML
```

Perpustakaan AMP menyertakan [validator AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) yang akan memberi tahu Anda jika ada sesuatu yang mencegah halaman Anda menjadi dokumen AMP yang valid. **Aktifkan** validator AMP dengan menambahkan pengenal fragmen berikut ini ke URL dokumen Anda:

```text
#development=1
```

Contohnya:

```text
http://localhost:8000/article.amp.html#development=1
```

Di Konsol Pengembang, Anda akan mengalami beberapa eror validasi (Anda mungkin perlu menyegarkan halaman di browser secara manual untuk melihat ini):

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='Eror validasi AMP untuk sampel kami') }}

Untuk menjadikannya dokumen AMP yang valid, kita perlu memperbaiki semua eror ini, dan ini sebenarnya akan kita lakukan dalam codelab ini.

Sebelum melakukannya, mari **simulasikan** pengalaman perangkat seluler di alat pengembang browser karena kita bekerja dengan artikel berita seluler. Contoh: di DevTools Chrome, klik ikon ponsel, lalu pilih perangkat seluler dari menu.

Anda akan melihat resolusi simulasi seluler di browser Anda, seperti berikut ini:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Simulasi seluler halaman AMP kami') }}

Sekarang kita siap untuk mulai bekerja! Mari periksa eror validasi satu per satu dan lihat bagaimana mereka berkaitan dengan AMP.
