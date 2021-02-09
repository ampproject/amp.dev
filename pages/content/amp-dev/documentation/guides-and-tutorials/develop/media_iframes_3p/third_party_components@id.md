---
'$title': Menyertakan konten pihak ketiga
$order: 9
description: Pelajari cara menyertakan komponen pihak ketiga di halaman Anda ....
formats:
  - websites
components:
  - iframe
  - facebook
author: Meggin
contributors:
  - pbakaus
  - bpaduch
---

Pelajari cara menyertakan komponen pihak ketiga di halaman Anda.

## Menyematkan Tweet

Sematkan Tweet Twitter di halaman Anda dengan menggunakan elemen [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

Untuk menyertakan tweet di halaman Anda, sertakan dahulu skrip berikut ini dalam `<head>`:

[sourcecode:html]

<script async custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>

[/sourcecode]

Saat ini, tweet otomatis diskalakan secara proporsional agar sesuai dengan ukuran yang disediakan, namun tindakan ini dapat menghasilkan tampilan yang kurang ideal. Sesuaikan lebar dan tinggi yang diberikan secara manual atau gunakan atribut media untuk memilih rasio aspek berdasarkan lebar layar.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]

```html
<amp-twitter
  width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985"
>
</amp-twitter>
```

[/example]

[tip type="tip"] **KIAT –** Lihat lebih banyak contoh [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) di [AMP Berdasarkan Contoh](../../../../documentation/examples/documentation/amp-twitter.html). [/tip]

## Menyematkan Instagram

Sematkan Instagram di halaman Anda dengan menggunakan elemen [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md).

Untuk menyertakan Instagram, sertakan dahulu skrip berikut ini dalam `<head>`:

[sourcecode:html]

<script async custom-element="amp-instagram"
  src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>

[/sourcecode]

Sertakan data-shortcode Instagram yang ditemukan di URL foto Instagram. Contoh: di `https://instagram.com/p/fBwFP`, `fBwFP` adalah data-shortcode-nya. Selain itu, Instagram menggunakan rasio aspek tetap untuk tata letak responsif, sehingga nilai lebar dan tinggi harus bersifat universal.

[example preview="inline" playground="true" imports="amp-instagram:0.1"]

```html
<amp-instagram
  data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive"
>
</amp-instagram>
```

[/example]

[tip type="tip"] **KIAT –** Lihat lebih banyak contoh [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) di [AMP Berdasarkan Contoh](../../../../documentation/examples/documentation/amp-instagram.html). [/tip]

## Menampilkan muatan/berita atau video Facebook

Tampilkan muatan/berita atau video Facebook di halaman Anda dengan menggunakan elemen [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md).

Anda harus menyertakan skrip berikut ini dalam `<head>`:

[sourcecode:html]

<script async custom-element="amp-facebook"
  src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>

[/sourcecode]

##### Contoh: Menyematkan muatan/berita

Sumber:

```html
<amp-facebook
  width="486"
  height="657"
  layout="responsive"
  data-href="https://www.facebook.com/zuck/posts/10102593740125791"
>
</amp-facebook>
```

Pratinjau: <amp-facebook width="486" height="657" layout="responsive" data-href="https://www.facebook.com/zuck/posts/10102593740125791"> </amp-facebook>

##### Contoh: Menyematkan video

Sumber:

```html
<amp-facebook
  width="476"
  height="316"
  layout="responsive"
  data-embed-as="video"
  data-href="https://www.facebook.com/nasaearth/videos/10155187938052139"
>
</amp-facebook>
```

Pratinjau: <amp-facebook width="476" height="316" layout="responsive" data-embed-as="video" data-href="https://www.facebook.com/nasaearth/videos/10155187938052139"> </amp-facebook>

[tip type="tip"] **KIAT –** Lihat lebih banyak contoh [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) di [AMP Berdasarkan Contoh](../../../../documentation/examples/documentation/amp-facebook.html). [/tip]

## Menyematkan video YouTube

Sertakan video YouTube di halaman Anda dengan menggunakan elemen [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md).

Anda harus menyertakan skrip berikut ini dalam `<head>`:

[sourcecode:html]

<script async custom-element="amp-youtube"
  src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>

[/sourcecode]

`data-videoid` YouTube dapat ditemukan di setiap URL halaman video YouTube. Contoh: di `https://www.youtube.com/watch?v=Z1q71gFeRqM`, `Z1q71gFeRqM` adalah ID videonya.

Gunakan `layout="responsive"` guna menghasilkan tata letak yang benar untuk video dengan rasio aspek 16:9:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

[tip type="tip"] **KIAT –** Lihat lebih banyak contoh [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) di [AMP Berdasarkan Contoh](../../../../documentation/examples/documentation/amp-youtube.html). [/tip]

## Menampilkan iklan

Tampilkan iklan di halaman Anda dengan menggunakan elemen [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Hanya iklan yang ditayangkan melalui HTTPS yang didukung.

Tidak ada JavaScript yang disediakan jaringan iklan yang diizinkan untuk berjalan di dalam dokumen AMP. Sebagai gantinya, runtime AMP memuat iframe dari asal yang berbeda (melalui sandbox iframe) dan menjalankan JavaScript jaringan iklan di dalam sandbox iframe tersebut.

Anda harus menentukan lebar, tinggi, dan jenis jaringan iklan. `type` mengidentifikasi templat jaringan iklan. Jenis iklan yang berbeda membutuhkan atribut `data-*` yang berbeda.

[example preview="inline" playground="true" imports="amp-ad:0.1"]

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
>
</amp-ad>
```

[/example]

Jika didukung oleh jaringan iklan, sertakan `placeholder` yang akan ditampilkan jika tidak ada iklan yang tersedia:

[example preview="inline" playground="true" imports="amp-ad:0.1"]

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
>
  <div placeholder>Have a great day!</div>
</amp-ad>
```

[/example]

AMP mendukung berbagai jaringan iklan. Kunjungi [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) untuk melihat daftar lengkap.

[tip type="read-on"] **BACA –** Pelajari lebih lanjut tentang iklan di panduan [Menayangkan Iklan di AMP](../../../../documentation/guides-and-tutorials/develop/monetization/index.md). [/tip]
