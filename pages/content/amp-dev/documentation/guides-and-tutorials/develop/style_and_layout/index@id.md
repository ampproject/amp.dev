---
$title: Gaya & Tata Letak
---
[TOC]

Gaya dan tata letak pada halaman HTML AMP sangat mirip dengan halaman HTML normal – pada kedua kasus tersebut, Anda akan menggunakan CSS.

Namun, AMP membatasi beberapa penggunaan CSS untuk alasan performa dan kegunaan, sekaligus memperluas kemampuan desain yang responsif dengan fitur seperti [placeholder & fallback]({{g.doc('/content/docs/design/responsive_amp/placeholders.md', locale=doc.locale).url.path}}), [pengarahan seni lanjutan melalui srcset]({{g.doc('/content/docs/design/responsive_amp/art_direction.md', locale=doc.locale).url.path}}) dan [atribut tata letak]({{g.doc('/content/docs/design/responsive_amp/control_layout.md', locale=doc.locale).url.path}}) untuk kontrol yang lebih baik terkait tampilan elemen Anda.

Tip: Membuat elemen responsif di AMP sangatlah mudah. Cukup letakkan `layout="responsive"` pada elemen. Untuk mempelajari lebih lanjut tentang Desain Responsif di AMP, buka [Membuat Halaman AMP Responsif](/id/docs/design/responsive/responsive_design.html).

{{ youtube('y6kA3u3GIws', 480, 270, caption='Tonton UpperQuad yang menyampaikan perancangan ulang situs proyek AMP, termasuk tantangan dalam menggunakan AMP untuk pertama kalinya.') }}

## Tambahkan gaya ke halaman

Tambahkan semua CSS di dalam `<style amp-custom>` tag pada bagian atas dokumen. Misalnya:

[sourcecode:html]
<!doctype html>
<head>
    ...
    <style amp-custom>
      /* any custom styles go here. */
      body {
        background-color: white;
      }

      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    ...
</head>
[/sourcecode]

Penting: Pastikan hanya ada satu `<style amp-custom>` tag di halaman Anda, karena tag yang berjumlah lebih dari satu tidak diizinkan di AMP.

Tentukan gaya komponen dengan pemilih elemen atau kelas menggunakan properti CSS umum. Misalnya:

[sourcecode:html]
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

Penting: Periksa apakah gaya Anda didukung di AMP. Beberapa gaya tidak didukung karena alasan performa (lihat juga [CSS yang Didukung]({{g.doc('/content/docs/design/responsive_amp/style_pages.md', locale=doc.locale).url.path}})).

## Atur tata letak elemen secara responsif

Tentukan ukuran dan posisi untuk semua elemen AMP yang terlihat dengan memberikan atribut `width` dan `height`. Atribut ini menunjukkan rasio aspek elemen, yang kemudian dapat disesuaikan dengan penampung.

Setel tata letak ke responsif. Tindakan ini akan mengubah ukuran elemen selebar penampungnya dan ukuran panjangnya diubah secara otomatis ke rasio aspek yang diberikan oleh atribut lebar dan tinggi.

Baca lebih lanjut: Pelajari lebih lanjut tentang [tata letak yang didukung di AMP]({{g.doc('/content/docs/design/responsive_amp/control_layout.md', locale=doc.locale).url.path}})

## Berikan placeholder & fallback

Berkat dukungan yang sudah ada untuk placeholder dan fallback, pengguna Anda tidak perlu melihat layar kosong lagi.

Baca lebih lanjut: Pelajari lebih lanjut tentang [Placeholder dan fallback]({{g.doc('/content/docs/design/responsive_amp/placeholders.md', locale=doc.locale).url.path}})

## Seni mengarahkan gambar Anda

AMP mendukung atribut `srcset` dan `sizes` agar Anda dapat mengontrol secara mendalam gambar mana yang dimuat dalam skenario tertentu.

Baca lebih lanjut: Pelajari lebih lanjut tentang [pengarahan seni dengan srcset dan ukuran]({{g.doc('/content/docs/design/responsive_amp/art_direction.md', locale=doc.locale).url.path}})

## Validasikan gaya dan tata letak Anda

Gunakan validator AMP untuk menguji CSS dan nilai tata letak halaman.

Validator mengonfirmasi bahwa halaman CSS Anda tidak melebihi batas 50.00 byte, memeriksa gaya yang tidak diizinkan, dan memastikan tata letak halaman didukung dan diformat dengan benar. Lihat juga daftar lengkap [Error gaya dan tata letak](/id/docs/troubleshooting/validation_errors.html#style-and-layout-errors).

Contoh error di konsol halaman dengan CSS yang melebihi batas 50.000 byte:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

Baca lebih lanjut: Pelajari lebih lanjut tentang [memvalidasi dan memperbaiki halaman AMP]({{g.doc('/content/docs/fundamentals/validate.md', locale=doc.locale).url.path}})
