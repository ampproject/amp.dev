---
$title: Memodifikasi Presentasi dan Layout
---

## Memodifikasi presentasi

AMP adalah laman web, setiap penerapan gaya pada halaman dan elemen-elemennya dilakukan menggunakan properti CSS umum. Elemen gaya menggunakan pemilih kelas atau elemen dalam stylesheet sisipan dalam `<head>` yang disebut dengan `<style amp-custom>`:

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

Setiap halaman AMP hanya bisa memiliki satu sylesheet yang disematkan, dan ada pemilih tertentu yang tidak bisa Anda gunakan. [Ketahui semua tentang penggayaan](/id/docs/guides/responsive/style_pages.html).

## Mengontrol layout

AMP mengikuti aturan yang lebih ketat saat melayout elemen pada halaman. Pada halaman HTML biasa, Anda hampir pasti menggunakan CSS secara eksklusif untuk melayout elemen. Namun karena alasan kinerja, AMP mewajibkan semua elemen untuk memiliki set ukuran eksplisit dari get-go.

Ketahui tentang cara AMP merender dan melayout halaman dan cara Anda bisa memodifikasi layout dalam [Cara Mengontrol Layout](/id/docs/guides/responsive/control_layout.html).

<div class="prev-next-buttons">
  <a class="button prev-button" href="/id/docs/tutorials/create/include_image.html"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="/id/docs/tutorials/create/preview_and_validate.html"><span class="arrow-next">Berikutnya</span></a>
</div>
