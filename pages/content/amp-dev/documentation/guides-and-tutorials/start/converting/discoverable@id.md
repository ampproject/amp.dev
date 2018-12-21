---
$title: Membuat halaman Anda dapat ditemukan
---

Setelah Anda membuat artikel berita di AMP, pastikan pengguna dapat mencari dan menemukan konten Anda.

## Tautkan konten AMP

Situs Anda dapat tersusun dari halaman AMP sepenuhnya, beberapa halaman AMP, atau tanpa halaman AMP.  Bagian tutorial ini akan membahas tentang cara menerapkan AMP ke struktur situs Anda.

Penautan kanonis dalam halaman HTML reguler adalah teknik umum untuk menyatakan halaman mana yang harus dipilih saat beberapa halaman berisi konten yang sama.

Satu pendekatan umum saat menambahkan AMP ke situs adalah membuat versi AMP dari halaman HTML non-AMP tradisional.  Kedua versi biasanya memiliki konten yang sama (misalnya teks artikel) tapi memiliki presentasi yang berbeda.  Dalam skenario ini, Anda harus memperlakukan halaman HTML tradisional sebagai halaman “kanonis” dan menghubungkan halaman AMP dengan halaman HTML tersebut.

Jika bisa, gunakan AMP seperti library JavaScript lainnya untuk membuat situs dan tak perlu melakukan penautan kanonis.  Menggunakan AMP untuk membuat seluruh situs akan mengurangi beban pemeliharaan secara signifikan.

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='Menautkan konten AMP') }}

Untuk tutorial ini, kami akan berfokus pada kasus yang menunjukkan bahwa Anda memiliki versi AMP dan non-AMP dari sebuah halaman.  Dalam tutorial ini, situs kami berisi artikel berita yang memiliki halaman HTML non-AMP (`article.html`) dan versi AMP dari halaman tersebut (`article.amp.html`).  Kami akan menghubungkan halaman ini melalui `link`.

Kami sudah menyelesaikan langkah pertama, yaitu menghubungkan halaman, dalam dokumen AMP kami dengan menyertakan kembali tag link di `<head>` pada halaman kanonis:

```html
<link rel="canonical" href="/article.html">
```

Langkah selanjutnya adalah menautkan artikel kanonis ke halaman AMP. Langkah ini bisa dilakukan dengan menyertakan tag `<link rel="amphtml">` ke bagian `<head>` di artikel kanonis.

Dalam file `article.html`, **tambahkan** kode berikut ke bagian `<head>`:

```html
<link rel="amphtml" href="/article.amp.html">
```

Diagram berikut menunjukkan arah tag link:

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='Menautkan konten AMP') }}

Anda perlu menyiapkan penautan dua arah ini sehingga mesin telusur dapat memahami hubungan antara dua dokumen kanonis HTML reguler dan dokumen AMP kami. Jika tidak ada link yang diberikan, crawler harus mengetahui dengan jelas artikel mana yang merupakan “versi AMP” dari dokumen HTML reguler. Dengan memberikan link ini secara eksplisit, kami dapat memastikan bahwa tidak ada ambiguitas.

## Tambahkan data terstruktur

Halaman AMP yang valid tidak membutuhkan data terstruktur [schema.org](http://schema.org/), tapi beberapa platform seperti Google Penelusuran memerlukannya untuk pengalaman tertentu, misalnya carousel Berita utama. Pada umumnya, lebih baik Anda menyertakan data terstruktur. Data terstruktur membantu mesin telusur memahami halaman Anda dengan lebih baik, dan menampilkan konten Anda dengan lebih baik di Halaman Hasil Mesin Telusur (misalnya, dalam cuplikan kaya).  Data terstruktur dimasukkan dalam tag `<head>` di halaman AMP Anda melalui tag skrip jenis `application/ld+json`.

Untuk artikel berita kami, **tambahkan** data terstruktur berikut ke bagian bawah bagian `<head>` pada dokumen AMP Anda:

```html
<script type="application/ld+json">
{
"@context": "http://schema.org",
"@type": "NewsArticle",
"mainEntityOfPage":{
   "@type":"WebPage",
   "@id":"https://example.com/my-article.html"
},
"headline": "My First AMP Article",
"image": {
   "@type": "ImageObject",
   "url": "https://example.com/article_thumbnail1.jpg",
   "height": 800,
   "width": 800
},
"datePublished": "2015-02-05T08:00:00+08:00",
"dateModified": "2015-02-05T09:20:00+08:00",
"author": {
   "@type": "Person",
   "name": "John Doe"
},
"publisher": {
   "@type": "Organization",
   "name": "⚡ AMP Times",
   "logo": {
     "@type": "ImageObject",
     "url": "https://example.com/amptimes_logo.jpg",
     "width": 600,
     "height": 60
   }
},
"description": "My first experience in an AMPlified world"
}
</script>
```

Catatan: Konten harus selalu sama. Untuk artikel berita, tentukan jenis “NewsArticle”. Judulnya harus cocok dengan judul artikel Anda. Objek gambar merujuk pada banner besar artikel.

**Muat ulang** halaman di browser dan verifikasi bahwa tidak ada error Validasi AMP yang ditunjukkan.

[tip type="note"]
Selain format data terstruktur schema.org, ada format lain yang didukung oleh mesin telusur dan jaringan media sosial. Lihat dokumentasi yang didukung:

- [Tag meta Twitter Cards](https://dev.twitter.com/cards/overview)
- [Tag meta Facebook Open Graph](https://developers.facebook.com/docs/sharing/webmasters)
[/tip]

### Validasi data terstruktur

Untuk memverifikasi bahwa data terstruktur Anda benar, banyak platform menyediakan fitur validasi.  Dalam tutorial ini, kami akan memvalidasi data terstruktur dengan [Fitur Validasi Data Terstruktur Google](https://developers.google.com/structured-data/testing-tool/).

1.  Di jendela browser baru, buka [Fitur Validasi Data Terstruktur Google](https://developers.google.com/structured-data/testing-tool/).
2.  Pilih tab **Cuplikan Kode**.
3.  Copy-paste kode sumber lengkap dari halaman AMP ke panel edit teks pada fitur validasi.
4.  Klik **Jalankan Pengujian**.

Jika data terstruktur valid, Anda seharusnya melihat **0 error** dan **0 peringatan**.

<<<<<<< HEAD
Baca lebih lanjut: Untuk mempelajari lebih lanjut tentang kemampuan halaman untuk ditemukan, lihat panduan [Membuat halaman Anda dapat ditemukan]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}}).
=======
Baca lebih lanjut: Untuk mempelajari lebih lanjut tentang kemampuan halaman untuk ditemukan, lihat panduan [Membuat halaman Anda dapat ditemukan]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}}).
>>>>>>> 3aeec0a67c667957f9f54faf118da91faf46313f

Kerja bagus!  Anda telah menyelesaikan artikel berita AMP.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/resolving-errors.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/congratulations.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>
