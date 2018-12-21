---
$title: Memvalidasi HTML AMP Anda
---

Setiap kali membuat halaman AMP, Anda harus selalu memvalidasi bahwa HTML AMP sudah benar. Terdapat [beberapa metode yang dapat digunakan untuk memvalidasi halaman AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/index.md', locale=doc.locale).url.path}}).  Dalam tutorial ini, kita akan mengaktifkan Validator AMP dengan mengaktifkan mode developer.  Untuk mengaktifkan mode developer, tambahkan ID fragmen berikut ke URL Anda lalu muat ulang halaman:

```text
#development=1
```

Misalnya:

```text
http://localhost:8000/pets.html#development=1
```

Buka [Konsol Developer](https://developer.chrome.com/devtools/docs/console) di Chrome (atau browser pilihan Anda), dan pastikan tidak ada error pada halaman AMP. Anda mungkin perlu memuat ulang browser agar dapat melihat pesan validasi. Jika tidak ada error pada halaman, Anda akan melihat pesan berikut:

```text
Validasi AMP berhasil.
```

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_bookend.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/congratulations.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>

