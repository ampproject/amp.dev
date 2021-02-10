---
'$title': Menambahkan font
$order: 6
description: 'Anda dapat menyematkan font khusus ke halaman AMP dengan dua cara: 1. Melalui tag <link>: hanya untuk penyedia font yang diizinkan. 2. Dengan menggunakan ....'
---

Di AMP, agar kecepatan waktu pemuatan dokumen tetap maksimal, Anda tidak dapat menyertakan lembar gaya (stylesheet) eksternal. Namun, ada satu pengecualian untuk aturan ini—**font**.

Anda dapat menyematkan font kustom ke halaman AMP Anda dengan dua cara:

1. Melalui tag `<link>`: hanya untuk penyedia font yang diizinkan.
2. Dengan menggunakan aturan CSS `@font-face`: tidak ada batasan, semua font diizinkan.

Di dalam tutorial ini, kita akan menggunakan tag `<link>` untuk menambahkan font ke halaman. **Tambahkan** tautan lembar gaya di `<head>` untuk meminta font Raleway:

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://fonts.googleapis.com/css?family=Raleway"
/>
```

Sekarang, **perbarui** pemilih `body` CSS Anda untuk menyertakan referensi ke Raleway:

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

**Segarkan** halaman Anda, lalu lihat tampilan serta nuansa barunya. Selain itu, periksa output validator AMP. Seharusnya tidak ada eror untuk permintaan lembar gaya eksternal ini.

[tip type="note"] Font web dapat merusak kinerja situs web, bahkan pada situs AMP yang cepat. Gunakan properti CSS [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) untuk mengoptimalkan perilaku pemuatan font Anda. [/tip]

Anda telah menyelesaikan artikel berita AMP Anda! Artikel Anda akan terlihat seperti yang berikut ini:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Artikel berita yang telah selesai') }}
