---
"$title": Memodifikasi presentasi dan tata letak
"$order": '3'
description: "Halaman AMP adalah halaman web; pengaturan gaya apa pun pada halaman dan elemennya dilakukan dengan menggunakan properti CSS yang umum. Elemen gaya menggunakan pemilih kelas atau elemen ...."
author: pbakaus
contributors:
- bpaduch
---

## Memodifikasi presentasi

Halaman AMP adalah halaman web; pengaturan gaya apa pun pada halaman dan elemennya dilakukan dengan menggunakan properti CSS yang umum. Elemen gaya menggunakan pemilih kelas atau elemen dalam lembar gaya sematan dalam `<head>`, bernama `<style amp-custom>`:

[sourcecode:html]
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
[/sourcecode]

Setiap halaman AMP hanya bisa memiliki lembar gaya inline dan satu lembar gaya yang disematkan, namun ada pemilih tertentu yang tidak boleh Anda gunakan. [Pelajari semua tentang pengaturan gaya](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## Mengontrol tata letak

AMP mengikuti aturan yang lebih ketat saat menata letak elemen pada halaman. Pada halaman HTML biasa, Anda hampir pasti menggunakan CSS secara eksklusif untuk menata letak elemen. Namun, karena alasan kinerja, AMP mewajibkan semua elemen agar memiliki ukuran yang eksplisit yang ditetapkan sejak awal.

[tip type="read-on"] **BACA –** Pelajari selengkapnya tentang bagaimana AMP merender dan mengatur tata letak halaman dan bagaimana Anda dapat mengubah tata letak dalam [kueri Tata Letak & Media](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]
