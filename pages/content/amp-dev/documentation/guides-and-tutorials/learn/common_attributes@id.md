---
'$title': Common element attributes
$order: 1
description: AMP menyediakan kumpulan atribut umum yang diperluas untuk berbagai komponen AMP (dan elemen HTML).  Dokumen ini menjelaskan setiap atribut umum.
toc: '[TOC]'
---

AMP menyediakan kumpulan atribut umum yang diperluas untuk berbagai komponen AMP (dan elemen HTML). Dokumen ini menjelaskan setiap atribut umum.

## fallback

Fallback merupakan konvensi yang memungkinkan elemen menyampaikan kepada pembaca bahwa browsernya tidak mendukung elemen tersebut atau gagal memuat resource utama. Atribut `fallback` dapat diletakkan pada elemen HTML apa pun yang merupakan turunan langsung elemen AMP yang mendukung fallback. Perilaku persis terkait fallback bergantung pada implementasi elemen, namun biasanya elemen fallback akan ditampilkan menggantikan elemen reguler.

Sering digunakan dengan: gambar, animasi, audio, dan video

Contoh:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
```

Untuk informasi selengkapnya, lihat [Placeholder & fallback](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## heights

Semua elemen AMP yang mendukung tata letak `responsive`, juga mendukung atribut `heights`. Nilai atribut ini merupakan ekspresi ukuran berdasarkan ekspresi media, serupa dengan [atribut ukuran pada tag `img`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) namun dengan dua perbedaan utama:

1. The value applies to the height, not the width of the element.
2. Percent values are allowed. A percent value indicates the percent of the element's width. For example, a value of `80%` indicates that the height of the element will be 80% of the element's width.

Catatan: Jika atribut `heights` ditentukan bersamaan dengan `width` dan `height`, setelan default `layout` diubah menjadi `responsive`.

Example:

```html
<amp-img
  src="amp.png"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
```

For more information, see [Art direction with srcset, sizes & heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## layout

AMP menyediakan kumpulan [tata letak](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) yang menentukan perilaku komponen AMP dalam tata letak dokumen. Anda dapat menentukan tata letak komponen dengan menambahkan atribut `layout` menggunakan salah satu nilai tata letak yang didukung untuk elemen tersebut (lihat dokumentasi elemen untuk mengetahui nilai apa saja yang didukung).

Contoh:

```html
<amp-img
  src="/img/amp.jpg"
  width="1080"
  height="610"
  layout="responsive"
  alt="an image"
>
</amp-img>
```

Untuk informasi selengkapnya, lihat [Kueri Tata Letak & Media](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) dan [Spesifikasi Tata Letak](amp-html-layout/index.md).

## media <a name="media"></a>

Semua elemen AMP mendukung atribut `media`. Nilai `media` adalah kueri media. Jika kueri tidak cocok, elemen tidak dirender dan resource serta kemungkinan resource turunannya tidak akan diambil. Jika jendela browser berubah ukuran atau orientasi, kueri media dievaluasi ulang dan elemen disembunyikan serta ditampilkan berdasarkan hasil yang baru.

Contoh:

```html
<amp-img
  media="(min-width: 650px)"
  src="wide.jpg"
  width="466"
  height="355"
  layout="responsive"
></amp-img>
<amp-img
  media="(max-width: 649px)"
  src="narrow.jpg"
  width="527"
  height="193"
  layout="responsive"
></amp-img>
```

Untuk informasi selengkapnya, lihat [Kueri Tata Letak & Media](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries).

## noloading

Atribut `noloading` menunjukkan apakah "indikator pemuatan" harus **dinonaktifkan** untuk elemen ini. Banyak elemen AMP menampilkan "indikator pemuatan", yaitu animasi dasar yang menunjukkan bahwa elemen belum dimuat sepenuhnya.

Sering digunakan dengan: gambar, animasi, video, dan iklan

Contoh:

```html
<amp-img src="card.jpg" noloading height="190" width="297" layout="responsive">
</amp-img>
```

## on

Atribut `on` digunakan untuk menginstal penangan kejadian pada elemen. Kejadian yang didukung bergantung pada elemen.

Sering digunakan dengan: lightbox, sidebar, daftar langsung, dan formulir

Sintaks:

```text
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
```

Contoh:

```html
<button on="tap:my-lightbox">Open lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay"> ... </amp-lightbox>
```

For more information, see [Actions and Events in AMP](amp-actions-and-events.md).

## placeholder

Atribut `placeholder` menunjukkan bahwa elemen yang ditandai dengan atribut ini bertindak sebagai placeholder untuk elemen AMP induk. Atribut ini dapat diletakkan pada elemen HTML apa pun yang merupakan turunan langsung elemen AMP yang mendukung placeholder. Secara default, placeholder langsung ditampilkan untuk elemen AMP, meskipun resource elemen AMP belum didownload atau diinisialisasi. Setelah siap, elemen AMP biasanya menyembunyikan placeholder-nya dan menampilkan kontennya. Perilaku persis terkait placeholder bergantung pada implementasi elemen.

Sering digunakan dengan: gambar, animasi, video, dan iklan

Contoh:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
```

Untuk informasi selengkapnya, lihat [Placeholder & fallback](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## sizes

Semua elemen AMP yang mendukung tata letak `responsive`, juga mendukung atribut `sizes`. Nilai atribut `sizes` adalah ekspresi ukuran seperti yang dijelaskan di [atribut ukuran di tag `img`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), namun diperluas ke semua elemen, tidak hanya gambar.

Contoh:

```html
<amp-img
  src="amp.png"
  width="400"
  height="300"
  layout="responsive"
  sizes="(min-width: 320px) 320px, 100vw"
>
</amp-img>
```

Untuk informasi selengkapnya, lihat [Gambar responsif dengan atribut srcset, sizes & heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

```html
<img
  decoding="async"
  src="amp.png"
  sizes="(min-width: 320px) 320px, 100vw"
  class="i-amphtml-fill-content i-amphtml-replaced-content"
/>
```

For more information, see [Art direction with srcset, sizes & heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## width and height

Untuk sebagian [tata letak](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute), komponen AMP harus memiliki atribut `width` dan `height` yang berisi nilai piksel bilangan bulat.

Contoh:

```html
<amp-anim width="245" height="300" src="/img/cat.gif" alt="cat animation">
</amp-anim>
```

Untuk informasi selengkapnya, lihat [Kueri Tata Letak & Media](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) dan [Spesifikasi Tata Letak](amp-html-layout/index.md).
