---
"$title": Menambahkan font kustom
"$order": '6'
description: Halaman AMP tidak dapat menyertakan lembar gaya (stylesheet) eksternal, kecuali font kustom. Anda dapat menyematkan font kustom ke halaman Anda dengan dua cara ...
formats:
- websites
- ads
- stories
author: pbakaus
---

Halaman AMP tidak dapat menyertakan lembar gaya (stylesheet) eksternal, kecuali font kustom. Anda dapat menyematkan font kustom ke halaman Anda dengan 2 cara:

1. Melalui tag `<link>` (khusus penyedia font yang diizinkan)
2. Melalui `@font-face` (tidak ada batasan, semua font diizinkan)

### 1. Menggunakan `<link>`

Gunakan tag `<link>` (biasanya di bagian atas halaman), seperti berikut ini:

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Asal-asal berikut ini masuk dalam daftar yang diizinkan dan diperbolehkan untuk penyajian font melalui tag tautan:

- Typography.com: **https://cloud.typography.com**
- Fonts.com: **https://fast.fonts.net**
- Google Fonts: **https://fonts.googleapis.com**
- Typekit: **https://use.typekit.net**
- Font Awesome: **https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

### 2. Menggunakan `@font-face`

Atau, Anda dapat menggunakan [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) dalam lembar gaya AMP Anda:

[sourcecode:html]
<style amp-custom>
  @font-face {
    font-family: "Bitstream Vera Serif Bold";
    src: url("https://somedomain.org/VeraSeBd.ttf");
  }

  body {
    font-family: "Bitstream Vera Serif Bold", serif;
  }
</style>
[/sourcecode]

[tip type="note"] **CATATAN –** Font yang disertakan melalui `@font-face` harus diambil melalui skema HTTP atau HTTPS. [/tip]
