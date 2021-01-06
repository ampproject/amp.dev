---
"$title": Struktur dan perenderan email AMP
order: '2'
formats:
- email
teaser:
  text: 'Struktur email sama dengan '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-structure.md.
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

Struktur email sama dengan pohon MIME. Pohon MIME ini berisi badan pesan dan lampiran apa pun pada email.

Untuk menyematkan AMP di dalam sebuah email, tambahkan bagian MIME baru dengan jenis konten `text/x-amp-html` sebagai turunan `multipart/alternative`. Ini harus berada bersama bagian `text/html` atau `text/plain` yang sudah ada. Ini memastikan bahwa pesan email tersebut akan berfungsi pada semua klien.

<amp-img alt="AMP for Email MIME Parts Diagram" layout="responsive" width="752" height="246" src="https://github.com/ampproject/amphtml/raw/master/spec/img/amp-email-mime-parts.png"><noscript data-md-type="raw_html" data-segment-id="12596198"> <img data-md-type="raw_html" alt="AMP for Email MIME Parts Diagram" src="../img/amp-email-mime-parts.png"> </noscript></amp-img>

Untuk mendapatkan informasi selengkapnya tentang subjenis `multipart/alternative`, rujuk [RFC 1521, bagian 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

## Informasi tambahan <a name="additional-information"></a>

Bagian `text/x-amp-html` harus ditempatkan di bawah sebuah nodus `multipart/alternative`. Sebuah email tidak boleh mempunyai lebih dari satu bagian `text/x-amp-html` di dalam sebuah nodus `multipart/alternative`.

`multipart/alternative` harus berisi minimal satu nodus (`text/plain` atau `text/html`) non-AMP, selain nodus `text/x-amp-html`. Ini akan ditampilkan kepada pengguna dengan klien email yang tidak mendukung AMP atau yang memilih menolaknya melalui pengaturan penyedia emailnya.

Catatan: Beberapa klien email[[1]](https://openradar.appspot.com/radar?id=6054696888303616) hanya akan merender bagian MIME terakhir, jadi sebaiknya tempatkan bagian MIME `text/x-amp-html` *sebelum* bagian MIME `text/html`.

### Membalas/meneruskan semantik <a name="replyingforwarding-semantics"></a>

Klien email melucuti bagian `text/x-amp-html` dari pohon MIME saat seorang pengguna membalas atau meneruskan sebuah pesan email AMP.

### Masa berlaku <a name="expiry"></a>

Klien email mungkin berhenti menampilkan bagian AMP suatu email setelah suatu jangka waktu tertentu, cth.: 30 hari. Di dalam kasus ini, email akan menampilkan bagian `text/html` atau `text/plain`.

## Contoh <a name="example"></a>

<!-- prettier-ignore-start -->

[sourcecode:html] Dari:  Orang A [persona@example.com](mailto:persona@example.com) Kepada: Orang B [personb@example.com](mailto:personb@example.com) Subjek: Email AMP! Jenis-Konten: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World (Halo Dunia) dalam teks polos!

--001a114634ac3555ae05525685ae Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>

    <meta charset="utf-8">   <style amp4email-boilerplate="">body{visibility:hidden}</style>   <script async="" src="https://cdn.ampproject.org/v0.js"></script>   Hello World in AMP!   --001a114634ac3555ae05525685ae Content-Type: text/html; charset="UTF-8"

<span>Hello World (Halo Dunia) dalam HTML!</span> --001a114634ac3555ae05525685ae-- [/sourcecode]

<!-- prettier-ignore-end -->
