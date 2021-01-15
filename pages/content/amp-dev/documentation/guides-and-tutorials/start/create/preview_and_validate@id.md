---
"$title": Pratinjau dan validasi
"$order": '5'
description: 'Lihat pratinjau halaman AMP seperti Anda ingin melihat pratinjau situs HTML statis lainnya. Tidak ada langkah build (pembuatan) atau prapemrosesan yang diperlukan. Anda dapat memilih untuk: ....'
author: pbakaus
contributors:
- bpaduch
---

## Pratinjau

Lihat pratinjau halaman AMP seperti Anda ingin melihat pratinjau situs HTML statis lainnya. Tidak ada langkah build (pembuatan) atau prapemrosesan yang diperlukan. Anda dapat memilih untuk:

- **Membuka halaman secara langsung di browser dari sistem berkas** (elemen tertentu mungkin tidak berfungsi karena kegagalan XMLHttpRequests).
- **Menggunakan server web lokal, seperti Apache 2 atau Nginx**. *(Kiat: Agar server web cepat, jalankan `python -m SimpleHTTPServer`.)*

## Memvalidasi

Berikutnya, pastikan bahwa halaman AMP Anda **benar-benar merupakan halaman AMP yang valid**, jika tidak valid, halaman Anda tidak akan ditemukan dan didistribusikan oleh platform pihak ketiga, seperti Google Search. Untuk memvalidasi:

1. Buka halaman Anda di browser.
2. Tambahkan "`#development=1`" ke URL, contoh: `http://localhost:8000/released.amp.html#development=1`.
3. Buka [konsol Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) dan periksa apakah ada eror atau kesalahan validasi.

[tip type="read-on"] **BACA –** [Pelajari lebih lanjut tentang validasi](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), dan apa yang harus dilakukan jika ada eror. [/tip]
