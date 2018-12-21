---
$title: Menyiapkan Halaman Anda untuk Pencarian dan Distribusi
---

Dalam beberapa kasus, Anda mungkin menginginkan versi non-AMP dan AMP dari halaman yang sama, misalnya, artikel berita. Pertimbangkan ini: Jika Google Penelusuran menemukan versi non-AMP dari halaman itu, *bagaimana Google Penelusuran mengetahui bahwa ada versi AMP dari halaman itu*?

## Menautkan halaman dengan &lt;link>

Untuk menyelesaikan masalah ini, kami menambahkan informasi tentang halaman AMP ke halaman non-AMP dan sebaliknya, dalam bentuk tag `<link>` dalam `<head>`.

Tambahkan yang berikut ini ke halaman non-AMP:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Tambahkan ini ke halaman AMP

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## Bagaimana jika saya memiliki satu halaman saja?

Jika Anda hanya menautkan satu halaman, dan halaman itu adalah halaman AMP, Anda masih harus menambahkan tautan kanonis ke halaman itu, yang kemudian hanya akan menunjuk pada halaman itu sendiri:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/preview_and_validate.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/publish.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>
