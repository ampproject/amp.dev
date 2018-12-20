---
$title: Menyertakan Konten Pihak Ketiga
---

Pelajari cara menyertakan komponen pihak ketiga di laman.

[TOC]

## Menyematkan Tweet

Sematkan Tweet Twitter di laman
menggunakan elemen [`amp-twitter`](/id/docs/reference/components/amp-twitter.html).

Untuk menyertakan tweet di laman,
sertakan dahulu skrip berikut di `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Tweet saat ini otomatis diskalakan secara proporsional
agar sesuai dengan ukuran yang disediakan,
namun tindakan ini dapat menghasilkan tampilan yang kurang ideal.
Sesuaikan lebar dan tinggi yang diberikan secara manual atau gunakan atribut media
untuk memilih rasio aspek berdasarkan lebar layar.

<!-- embedded twitter example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.twitter.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

Tip: Lihat lebih banyak contoh `amp-twitter` di [AMP Menurut Contoh](https://ampbyexample.com/components/amp-twitter/).

## Menyematkan Instagram

Sematkan Instagram di laman
menggunakan elemen [`amp-instagram`](/id/docs/reference/components/amp-instagram.html)

Untuk menyertakan Instagram,
sertakan dahulu skrip berikut di `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Sertakan data-shortcode Instagram yang ditemukan di URL foto Instagram.
Misalnya, pada `https://instagram.com/p/fBwFP`,
`fBwFP` adalah data-shortcode-nya.
Instagram juga menggunakan rasio aspek tetap untuk tata letak responsif,
sehingga nilai lebar dan tinggi harus universal

<!-- embedded Instagram example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.instagram.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

Tip: Lihat lebih banyak contoh `amp-instagram` di [AMP Menurut Contoh](https://ampbyexample.com/components/amp-instagram/).

## Menampilkan pos atau video Facebook

Tampilkan pos atau video Facebook di laman
menggunakan elemen [`amp-facebook`](/id/docs/reference/components/amp-facebook.html).

Anda harus menyertakan skrip berikut di `<head>`:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### Contoh: Menyematkan pos

Sumber:
```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```
Pratinjau:
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>

##### Contoh: Menyematkan video

Sumber:
```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```
Pratinjau:
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>

Tip: Lihat lebih banyak contoh `amp-facebook` di [AMP Menurut Contoh](https://ampbyexample.com/components/amp-facebook/).

## Menyertakan video youtube

Sertakan video youtube di laman
menggunakan elemen [`amp-youtube`](/id/docs/reference/components/amp-youtube.html).

Anda harus menyertakan skrip berikut di `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

`data-videoid` Youtube dapat ditemukan di setiap URL laman video Youtube.
Misalnya, pada `https://www.youtube.com/watch?v=Z1q71gFeRqM`,
`Z1q71gFeRqM` adalah ID videonya.

Gunakan `layout="responsive"` guna menghasilkan tata letak yang benar untuk video dengan rasio aspek 16:9:

<!-- embedded youtube example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.youtube.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

Tip: Lihat lebih banyak contoh `amp-youtube` di [AMP Menurut Contoh](https://ampbyexample.com/components/amp-youtube/).

## Menampilkan iklan

Tampilkan iklan di laman
menggunakan elemen [`amp-ad`](/id/docs/reference/components/amp-ad.html).
Hanya iklan yang ditayangkan melalui HTTPS yang didukung.

Tidak ada JavaScript yang disediakan jaringan iklan yang diizinkan untuk berjalan di dalam dokumen AMP.
Sebagai gantinya, waktu proses AMP memuat iframe dari
asal yang berbeda (melalui kotak pasir iframe)
dan menjalankan JavaScript jaringan iklan dalam kotak pasir iframe tersebut.

Anda harus menentukan lebar, tinggi, dan jenis jaringan iklan.
`type` mengidentifikasi template jaringan iklan.
Jenis iklan yang berbeda membutuhkan atribut `data-*` yang berbeda.

<!-- embedded ad example -->
<div>
<amp-iframe height="212"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

Jika didukung oleh jaringan iklan,
sertakan `placeholder`
untuk ditampilkan jika tidak ada iklan yang tersedia:

<!-- embedded ad example -->
<div>
<amp-iframe height="232"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-placeholder.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

AMP mendukung berbagai jaringan iklan. Lihat [referensi daftar lengkap](/id/docs/reference/components/amp-ad.html#supported-ad-networks).

Baca lebih lanjut: Pelajari lebih lanjut tentang iklan di panduan [Menayangkan Iklan di AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/monetization.md', locale=doc.locale).url.path}}) guide.
