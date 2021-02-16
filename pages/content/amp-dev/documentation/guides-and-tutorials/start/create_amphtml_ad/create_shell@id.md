---
'$title': Membuat shell untuk iklan
$order: 0
description: 'Dengan menggunakan editor teks favorit Anda, buat berkas HTML berjudul my-amphtml-ad.html. Salin markah HTML berikut ini ke dalam berkas tersebut: ...'
---

[HTML yang diperlukan untuk sebuah iklan HTML AMP](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) adalah varian dari [HTML AMP yang diperlukan untuk halaman AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md). Mari lebih mendalami kode yang dibutuhkan dengan membuat shell iklan HTML AMP kita.

Dengan menggunakan editor teks favorit Anda, buat berkas HTML berjudul <code>my-amphtml-ad.html</code>. Salin markah HTML berikut ini ke dalam berkas tersebut:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My amphtml ad</title>
    <meta name="viewport" content="width=device-width" />
  </head>
  <body></body>
</html>
```

Markah ini adalah untuk berkas HTML yang dasar dan valid. Perhatikan bahwa kita menyertakan tag viewport `meta` agar kita mempunyai [viewport yang responsif](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#controlling-the-viewport).

Sekarang, mari kita modifikasi HTML untuk menjadikannya sebuah iklan HTML AMP.

Di dalam tag `<html>`, tambahkan atribut `⚡4ads`, yang mengidentifikasi dokumen sebagai iklan HTML AMP. Atau, Anda dapat menentukan atribut `amp4ads`, dan ini juga valid.

```html
<!DOCTYPE html>
<html ⚡4ads>
  <head>
    ...
  </head>
</html>
```

[tip type="note"] **CATATAN –** Tidak seperti halaman AMP, [iklan HTML AMP tidak memerlukan tag `<link rel="canonical">`](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#amphtml-ad-format-rules). [/tip]

Iklan HTML AMP memerlukan versi runtime AMP sendiri, jadi tambahkan tag `<script>` berikut ini ke bagian `<head>`dokumen Anda:

```html
<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
```

Kreatif iklan HTML AMP membutuhkan baris gaya [boilerplate](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#boilerplate) yang jauh lebih sederhana dan berbeda dibanding halaman AMP pada umumnya. Tambahkan kode berikut ini ke bagian `<head>` Anda:

```html
<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>
```

Untuk membuat iklan HTML AMP Anda bergaya, CSS Anda harus disematkan inline di dalam dokumen HTML AMP dengan menggunakan tag <code><style amp-custom></style> </code>di dalam bagian <code><head></code>. Karena kita merender atau memuat iklan gambar dasar, kita tidak membutuhkan CSS apa pun, jadi kita tidak akan menambahkan tag-tag ini.

[tip type="note"] **CATATAN –** Untuk iklan HTML AMP, ukuran maksimum untuk sebuah lembar gaya inline adalah _20 kilobyte_. Pelajari lebih lanjut tentang [persyaratan CSS di dalam spek iklan HTML AMP](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#css). [/tip]

Berikut ini adalah kode lengkap untuk berkas HTML Anda:

```html
<!DOCTYPE html>
<html ⚡4ads>
  <head>
    <meta charset="utf-8" />
    <title>My amphtml ad</title>
    <meta name="viewport" content="width=device-width" />
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
    <style amp4ads-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
  </head>
  <body></body>
</html>
```

Kini, Anda memiliki iklan HTML AMP yang valid, walaupun kosong. Mari kita buat iklan gambar.
