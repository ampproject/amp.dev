---
$title: Menambahkan font
---

Di AMP, agar kecepatan waktu pemuatan dokumen tetap maksimal, Anda tidak dapat menyertakan stylesheet eksternal. Namun, ada 1 pengecualian untuk aturan ini&mdash;**font**.

Anda dapat menyematkan font kustom ke halaman AMP dengan 2 cara:

1. Melalui tag `<link>`: hanya untuk provider font yang diizinkan.
2. Dengan menggunakan aturan CSS `@font-face`: tidak ada batasan, semua font diizinkan.

Dalam tutorial ini, kami akan menggunakan tag `<link>` untuk menambahkan font ke halaman. **Tambahkan** link stylesheet di `<head>` untuk meminta font Raleway:

```html
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway">
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

**Muat ulang** halaman dan lihat tampilan serta nuansa baru halaman Anda. Selain itu, periksa keluaran validator AMP.  Seharusnya tidak ada error untuk permintaan stylesheet eksternal ini.

Anda telah menyelesaikan artikel berita AMP! AMP akan terlihat seperti ini:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Completed news article') }}
