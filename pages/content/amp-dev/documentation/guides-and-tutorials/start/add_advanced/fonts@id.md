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

[tip type="note"]
Menyertakan font di dokumen tidak memerlukan komponen tambahan apa pun. Meskipun demikian, ada komponen yang disebut [`amp-font`](/id/docs/reference/components/amp-font.html). Komponen `amp-font` tidak digunakan untuk memuat font web, sebagai gantinya Anda dapat menggunakannya untuk mendeteksi apakah font web berhasil dimuat atau tidak dan memberikan respons sesuai, jika perlu.

Anda dapat menggunakan amp-font untuk menyembunyikan teks sampai font dimuat sepenuhnya sehingga pengguna tidak akan melihat perubahan teks dari font sementara ke font aslinya. Jika font gagal dimuat, sebaiknya Anda menampilkan font sementara. Bagaimanapun, kemungkinan terburuknya adalah jika pengguna tidak membaca teks apa pun! Pelajari lebih lanjut dengan membaca dokumentasi referensi [`amp-font`](/id/docs/reference/components/amp-font.html).
[/tip]

Anda telah menyelesaikan artikel berita AMP! AMP akan terlihat seperti ini:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Completed news article') }}


<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/navigating.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/congratulations.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>
