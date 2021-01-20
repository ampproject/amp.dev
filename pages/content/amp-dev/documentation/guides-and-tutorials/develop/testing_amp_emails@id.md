---
"$title": Menguji email AMP
"$order": '2'
"$category": Develop
description: Pastikan pengalaman pengguna yang sangat baik dengan menguji email AMP Anda sebelum mengirimkannya kepada audiens yang lebih banyak.
formats:
- email
author: fstanis
---

Pastikan pengalaman pengguna yang sangat baik dengan menguji email AMP Anda sebelum mengirimkannya kepada audiens yang lebih banyak.

## Menguji daftar periksa

1. Sertakan sebuah HTML dan/atau versi teks polos dari email AMP Anda. Klien email yang tidak mendukung AMP akan menampilkan ini sebagai standar (fallback).
2. Pastikan AMP Anda valid dengan mengikuti langkah-langkah yang diuraikan di dalam  [Validasi Email AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails.md).
3. Tinjau [CSS yang Didukung AMP untuk Email](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) untuk memastikan bahwa CSS yang Anda gunakan didukung di semua klien email.
4. Cobalah email Anda di [AMP Playground](https://playground.amp.dev/?runtime=amp4email) dan pastikan bahwa semua fitur dinamis, seperti formulir, berfungsi dengan benar.

## Pengujian yang spesifik untuk klien email

Klien email yang mendukung AMP juga menyediakan dokumentasi pengembang yang mungkin berisi panduan dan persyaratan tambahan.

### Gmail

Dokumentasi Gmail mencantumkan panduan untuk pengujian di [Uji email AMP Anda di Gmail](https://developers.google.com/gmail/ampemail/testing-dynamic-email).

Pengguna Gmail dapat menggunakan [Playground AMP untuk Email Gmail](https://amp.gmail.dev/playground/) untuk mengirimkan email kepada diri mereka sendiri untuk diuji.

### Mail.ru

[Email AMP Mail.ru](https://postmaster.mail.ru/amp) menyediakan informasi tentang cara mengaktifkan pengujian di akun Mail.ru Anda.

Pengguna Mail.ru dapat menggunakan [AMP Playground Mail.ru](https://postmaster.mail.ru/amp/playground.html) untuk mengirimkan email kepada diri mereka sendiri untuk diuji.
