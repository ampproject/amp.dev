---
$title: Menambahkan font kustom
---

Halaman AMP tidak dapat menyertakan stylesheet, kecuali dengan font kustom. Anda dapat menyematkan font kustom ke halaman dengan 2 cara:

1.  Melalui `<link>` tag (khusus penyedia font yang diizinkan)
2.  Melalui `@font-face` (tidak ada batasan, semua font diizinkan)

###  1. Menggunakan `<link>`

 Gunakan `<link>` tag (biasanya di bagian atas halaman), seperti berikut:

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Domain asal berikut diizinkan untuk font yang ditayangkan melalui tag link:

*  Typography.com: **https://cloud.typography.com**
*  Fonts.com: **https://fast.fonts.net**
*  Google Fonts: **https://fonts.googleapis.com**
*  Typekit: **https://use.typekit.net**
*  Font Awesome: **https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

###  2. Menggunakan `@font-face`

 Atau, Anda dapat menggunakan [`@font-face` dalam stylesheet AMP:](https://developer.mozilla.org/id/docs/Web/CSS/@font-face)
within your AMP stylesheet:

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

Catatan: Font yang disertakan melalui `@font-face` harus diambil melalui skema HTTP atau HTTPS.

