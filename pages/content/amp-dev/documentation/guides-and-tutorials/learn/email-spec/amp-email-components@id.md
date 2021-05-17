---
'$title': Komponen yang Didukung AMP untuk Email
$order: 3
formats:
  - email
teaser:
  text: 'Yang berikut ini adalah daftar komponen AMP yang saat ini didukung di dalam pesan email AMP. Komponen-komponen ini dikelompokkan ke dalam kategori berikut ini:'
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

Yang berikut ini adalah daftar [komponen AMP](https://amp.dev/documentation/components/?format=email) yang saat ini didukung di dalam pesan email AMP. Komponen-komponen ini dikelompokkan ke dalam kategori berikut ini:

- [Konten Dinamis](#dynamic-content)
- [Tata Letak](#layout)
- [Media](#media)

## Konten Dinamis <a name="dynamic-content"></a>

| Elemen                                                                                                                                                                          | Deskripsi                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<amp-form>`](https://amp.dev/documentation/components/amp-form)                                                                                                               | Elemen formulir. Atribut tindakan-xhr harus digunakan sebagai pengganti atribut tindakan yang biasa. Dapat digunakan bersama-sama dengan `<template type="amp-mustache">` untuk merender suatu tanggapan. <br><br>**Catatan:** [Mengalihkan setelah pengiriman](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission) tidak diizinkan. |
| [`<amp-selector>`](https://amp.dev/documentation/components/amp-selector)                                                                                                       | Gawit (widget) multi-pilih untuk digunakan di dalam formulir.                                                                                                                                                                                                                                                                                                       |
| [`amp-bind`](https://amp.dev/documentation/components/amp-bind) dan [`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | Bahasa dengan skrip sederhana dalam AMP yang memungkinkan manipulasi mesin status untuk interaksi di antara elemen. Juga dapat digunakan untuk menambahkan perilaku pada peristiwa tertentu.<br><br>**Catatan:** Dilarang untuk diikatkan pada `[href]` atau `[src]`. Selain itu, dilarang menggunakan tindakan `AMP.print`, `AMP.navigateTo`, dan `AMP.goBack`.    |
| [`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification)                                                                                | `<amp-state>` digunakan untuk mendefinisikan status yang digunakan oleh `amp-bind`.<br><br>**Catatan:** Atribut `src` saat ini tidak didukung.                                                                                                                                                                                                                      |
| [`<amp-list>`](https://amp.dev/documentation/components/amp-list)                                                                                                               | Mengambil data JSON dari jarak jauh yang akan dirender oleh [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache).<br><br>**Catatan:** Mengikatkan ke atribut `[src]` tidak diizinkan. Menyertakan kredensial pengguna dengan `credentials="include"` juga dilarang.                                                                            |
| [`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache)                                                                                       | Penambahan templat Mustache (misai) untuk merender hasil dari panggilan `amp-list`.                                                                                                                                                                                                                                                                                 |

## Tata Letak <a name="layout"></a>

| Elemen                                                                                                            | Deskripsi                                                                     |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [Atribut Tata Letak](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | Perilaku tata letak ditentukan dengan atribut tata letak.                     |
| [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)                                       | Elemen UI yang memfasilitasi pemunculan/penyembunyian bagian yang berbeda.    |
| [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel)                                         | Komponen UI korsel.                                                           |
| [`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text)                                         | Komponen pembantu untuk mengepaskan teks di dalam area tertentu.              |
| [`<amp-layout>`](https://amp.dev/documentation/components/amp-layout)                                             | Wadah yang dapat mempunyai rasio aspek berdasarkan tata letak yang responsif. |
| [`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar)                                           | Bilah samping untuk keperluan navigasi.                                       |
| [`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago)                                           | Menyediakan cara yang mudah untuk merender cap waktu.                         |

## Media <a name="media"></a>

| Elemen                                                            | Deskripsi                                                                                           |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [`<amp-img>`](https://amp.dev/documentation/components/amp-img)   | Komponen AMP yang menggantikan `<img>`.<br><br>**Catatan:** Mengikatkan ke `[src]` tidak diizinkan. |
| [`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | Menyematkan berkas GIF.<br><br>**Catatan:** Mengikatkan ke `[src]` tidak diizinkan.                 |
