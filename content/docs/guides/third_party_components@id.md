---
$title: Menyertakan Konten Pihak Ketiga
---

Pelajari cara menyertakan komponen pihak ketiga di laman.

[TOC]

## Menyematkan Tweet

Sematkan Tweet Twitter di laman
menggunakan elemen [`amp-twitter`](/docs/reference/extended/amp-twitter.html).

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

Misalnya `amp-twitter` dari
[contoh twitter.amp](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html):

[sourcecode:html]
<amp-twitter width="390" height="50"
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
[/sourcecode]

## Menyematkan Instagram

Sematkan Instagram di laman
menggunakan elemen [`amp-instagram`](/docs/reference/extended/amp-instagram.html)

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

[sourcecode:html]
<amp-instagram
    data-shortcode="fBwFP"
    width="320"
    height="392"
    layout="responsive">
</amp-instagram>
[/sourcecode]

## Menampilkan pos atau video Facebook

Tampilkan pos atau video Facebook di laman
menggunakan elemen [`amp-facebook`](/docs/reference/extended/amp-facebook.html).

Anda harus menyertakan skrip berikut di `<head>`:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

Contoh - Menyematkan pos:

[sourcecode:html]
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
[/sourcecode]

Contoh - Menyematkan video:

[sourcecode:html]
<amp-facebook width="552" height="574"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/zuck/videos/10102509264909801/">
</amp-facebook>
[/sourcecode]

## Menyertakan video youtube

Sertakan video youtube di laman
menggunakan elemen [`amp-youtube`](/docs/reference/extended/amp-youtube.html).

Anda harus menyertakan skrip berikut di `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

`data-videoid` Youtube dapat ditemukan di setiap URL laman video Youtube.
Misalnya, pada https://www.youtube.com/watch?v=Z1q71gFeRqM,
Z1q71gFeRqM adalah ID videonya.

Gunakan `layout="responsive"` guna menghasilkan tata letak yang benar untuk video dengan rasio aspek 16:9:

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
[/sourcecode]

## Menampilkan iklan

Tampilkan iklan di laman
menggunakan elemen [`amp-ad`](/docs/reference/amp-ad.html).
Hanya iklan yang ditayangkan melalui HTTPS yang didukung.

Tidak ada JavaScript yang disediakan jaringan iklan yang diizinkan untuk berjalan di dalam dokumen AMP.
Sebagai gantinya, waktu proses AMP memuat iframe dari
asal yang berbeda (melalui kotak pasir iframe)
dan menjalankan JavaScript jaringan iklan dalam kotak pasir iframe tersebut.

Anda harus menentukan lebar, tinggi, dan jenis jaringan iklan.
`type` mengidentifikasi template jaringan iklan.
Jenis iklan yang berbeda membutuhkan atribut `data-*` yang berbeda.

[sourcecode:html]
<amp-ad width="300" height="250"
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
[/sourcecode]

Jika didukung oleh jaringan iklan,
sertakan `placeholder`
untuk ditampilkan jika tidak ada iklan yang tersedia:

[sourcecode:html]
<amp-ad width="300" height="250"
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  <div placeholder>Have a great day!</div>
</amp-ad>
[/sourcecode]

AMP mendukung berbagai jaringan iklan. Lihat [referensi daftar lengkap](/docs/reference/amp-ad.html#supported-ad-networks).
