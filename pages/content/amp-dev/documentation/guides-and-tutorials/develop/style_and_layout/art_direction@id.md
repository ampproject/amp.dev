---
'$title': Gambar responsif dengan srcset, ukuran, & tinggi
$order: 4
description: Gunakan atribut srcset untuk mengontrol aset elemen berdasarkan berbagai ekspresi media. Secara khusus, gunakan ini untuk semua tag amp-img untuk menentukan mana ...
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
author: pbakaus
contributors:
  - bpaduch
---

## srcset

Gunakan atribut `srcset` untuk mengontrol aset elemen berdasarkan berbagai ekspresi media. Secara khusus, gunakan ini untuk semua tag [`amp-img`](../../../../documentation/components/reference/amp-img.md) guna menentukan aset gambar mana yang akan digunakan berdasarkan berbagai ukuran layar. AMP akan membuat atribut `sizes` secara otomatis, <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img" data-md-type="link">yang memenuhi definisi `sizes` HTML5</a>, untuk semua tag `<img>` yang mendasari `<amp-img>` jika `<amp-img>` memiliki atribut `srcset`, tetapi tidak memiliki `sizes`.

Dalam contoh sederhana ini, `srcset` menentukan gambar yang akan digunakan berdasarkan lebar layar. Deskriptor `w` memberi tahu browser tentang lebar setiap gambar di dalam daftar:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
>
</amp-img>
```

[/example]

[tip type="note"] **CATATAN –** AMP mendukung srcset dengan deskriptor `w` di semua browser. [/tip]

Pelajari lebih lanjut tentang cara membuat gambar responsif dengan menggunakan `srcset` dalam [Menggunakan Gambar Responsif (Sekarang)](http://alistapart.com/article/using-responsive-images-now).

## sizes

Anda juga dapat menggunakan atribut `sizes` (ukuran) AMP opsional bersama `srcset`. Atribut `sizes` AMP menjelaskan cara menghitung ukuran elemen berdasarkan ekspresi media apa pun. <strong data-md-type="raw_html">Menentukan `sizes` pada Elemen AMP apa pun akan menyebabkan AMP menetapkan gaya inline untuk lebar pada elemen tersebut sesuai dengan kueri media yang cocok.</strong> Berdasarkan ukuran elemen yang dihitung, agen pengguna memilih sumber paling relatif yang diberikan oleh atribut `srcset`.

Pertimbangkan contoh berikut ini:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw"
>
</amp-img>
```

[/example]

Atribut `sizes` menentukan lebar elemen menjadi 50% dari ukuran viewport jika viewport berukuran 650px atau lebih. Contoh, jika viewport berukuran 800px, lebar elemen diatur pada 400px. Kemudian, browser akan memilih sumber daya `srcset` yang relatif dengan 400px, dengan asumsi bahwa rasio piksel perangkat adalah 1, yang dalam kasus ini adalah `hummingbird-narrow.jpg` (320px).

[tip type="important"] **PENTING –** Jika atribut ukuran ditentukan bersama dengan lebar dan tinggi, tata letak distandarkan pada `responsive`. [/tip]

Baca lebih lanjut tentang [atribut `sizes` AMP di sini](../../../../documentation/guides-and-tutorials/learn/common_attributes.md).

## heights

Semua elemen kustom AMP yang memungkinkan tata letak `responsive`, juga mendukung atribut `heights` (tinggi). Nilai atribut ini adalah ekspresi ukuran berdasarkan ekspresi media yang serupa dengan [atribut ukuran img](https://developer.mozilla.org/id/docs/Web/HTML/Element/img), tetapi dengan dua perbedaan utama:

1. Berlaku pada tinggi, bukan pada lebar elemen.
2. Nilai dalam bentuk persen diizinkan, misalnya: `86%`. Jika nilai dalam bentuk persen digunakan, nilai akan menunjukkan persentase lebar elemen.

Jika atribut `heights` ditentukan beserta `width` dan `height`, `layout` distandarkan pada `responsive`.

Contoh:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
```

[/example]

Dalam contoh ini, standar tinggi elemen adalah 80% dari lebar, namun untuk viewport yang lebih lebar dari `500px`, akan dibatasi pada `200px`.
