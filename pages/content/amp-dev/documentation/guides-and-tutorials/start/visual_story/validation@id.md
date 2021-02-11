---
'$title': Validating your AMP HTML
$order: 8
description: Kapan pun Anda membuat sebuah halaman AMP, Anda harus selalu memvalidasi bahwa HTML AMP Anda sudah benar. Ada [beberapa metode yang dapa Anda gunakan untuk memvalidasi halaman AMP Anda ....
author: bpaduch
---

Karena Cerita Web dibuat dengan AMP, Anda harus selalu memvalidasi bahwa HTML AMP Anda benar. Ada [beberapa metode yang dapa Anda gunakan untuk memvalidasi halaman AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). Di dalam tutorial ini, kita akan mengaktifkan Validator AMP dengan menjalankan mode pengembang. Untuk menjalankan mode pengembang, tambahkan pengenal fragmen berikut ini ke URL Anda, lalu muat ulang halaman:

```text
#development=1
```

Contohnya:

```text
http://localhost:8000/pets.html#development=1
```

Buka [Konsol Pengembang](https://developer.chrome.com/devtools/docs/console) di Chrome (atau browser pilihan Anda), lalu verifikasi bahwa tidak ada eror AMP. Anda mungkin perlu menyegarkan browser Anda untuk melihat pesan validasi. Jika halaman Anda bebas dari eror, Anda akan melihat pesan:

```text
Validasi AMP berhasil.
```
