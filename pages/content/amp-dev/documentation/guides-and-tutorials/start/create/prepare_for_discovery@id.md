---
"$title": Menyiapkan halaman Anda untuk pencarian dan distribusi
"$order": '4'
description: 'Di dalam beberapa kasus, Anda mungkin ingin memiliki versi non-AMP dan AMP dari halaman yang sama, contohnya: artikel berita. Pertimbangkan ini: Jika Google Search ....'
author: pbakaus
contributors:
- bpaduch
---

Di dalam beberapa kasus, Anda mungkin ingin memiliki versi non-AMP dan AMP dari halaman yang sama, contohnya: artikel berita. Pertimbangkan ini: Jika Google Search menemukan versi non-AMP halaman itu, *bagaimana Google Search mengetahui bahwa ada versi AMP "sandingan" halaman tersebut*?

## Menautkan halaman dengan `<link>`

Untuk menegaskan bahwa halaman non-AMP dan halaman AMP harus diperlakukan sebagai "sandingan", kita menambahkan informasi tentang halaman AMP ke halaman non-AMP dan sebaliknya, dalam bentuk tag `<link>` di `<head>`.

Tambahkan yang berikut ini ke halaman non-AMP:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Tambahkan ini ke halaman AMP:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## Bagaimana jika saya hanya memiliki satu halaman?

Jika Anda hanya memiliki satu halaman, dan itu adalah halaman AMP, Anda masih harus menambahkan tautan kanonis ke halaman itu, yang kemudian hanya akan mengarah ke halaman itu sendiri:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **BACA –** Pelajari lebih lanjut tentang cara Google menemukan halaman AMP di [panduan Google Search untuk halaman AMP](https://support.google.com/webmasters/answer/6340290). [/tip]
