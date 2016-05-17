---
layout: page
title: Memodifikasi Presentasi dan Layout
order: 2
locale: id
---

## Memodifikasi presentasi

AMP adalah laman web, setiap penerapan gaya pada halaman dan elemen-elemennya dilakukan menggunakan properti CSS umum. Elemen gaya menggunakan pemilih kelas atau elemen dalam stylesheet sisipan dalam `<head>` yang disebut dengan `<style amp-custom>`:

{% highlight html %}
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
{% endhighlight %}

Setiap halaman AMP hanya bisa memiliki satu sylesheet yang disematkan, dan ada pemilih tertentu yang tidak bisa Anda gunakan. [Ketahui semua tentang penggayaan](/docs/guides/responsive/style_pages.html).

## Mengontrol layout

AMP mengikuti aturan yang lebih ketat saat melayout elemen pada halaman. Pada halaman HTML biasa, Anda hampir pasti menggunakan CSS secara eksklusif untuk melayout elemen. Namun karena alasan kinerja, AMP mewajibkan semua elemen untuk memiliki set ukuran eksplisit dari get-go.

Ketahui tentang cara AMP merender dan melayout halaman dan cara Anda bisa memodifikasi layout dalam [Cara Mengontrol Layout](/docs/guides/responsive/control_layout.html).

{% include button.html title="Lanjutkan ke Langkah 4" link="/docs/get_started/create/preview_and_validate.id.html" %}
