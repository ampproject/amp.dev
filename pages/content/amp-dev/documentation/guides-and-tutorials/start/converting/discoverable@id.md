---
"$title": Membuat halaman Anda dapat ditemukan
"$order": '3'
description: Penautan dua arah ini perlu disiapkan agar mesin pencarian memahami hubungan antara dokumen kanonis HTML reguler dan dokumen AMP kita.
---

Setelah Anda membuat artikel berita di AMP, pastikan pengguna dapat mencari dan menemukan konten Anda.

## Menautkan konten AMP

Situs web Anda dapat tersusun dari halaman AMP sepenuhnya, beberapa halaman AMP, atau tanpa halaman AMP. Bagian tutorial ini akan membahas tentang cara menerapkan AMP ke struktur situs web Anda.

Penautan kanonis dalam halaman HTML reguler adalah teknik umum untuk menyatakan halaman mana yang harus dipilih saat beberapa halaman berisi konten yang sama.

Satu pendekatan umum saat menambahkan AMP ke situs web adalah membuat versi AMP dari halaman HTML non-AMP tradisional. Kedua versi biasanya memiliki konten yang sama (cth.: teks artikel), tetapi memiliki presentasi yang berbeda. Dalam skenario ini, Anda harus memperlakukan halaman HTML tradisional sebagai halaman “kanonis” dan menyandingkan halaman AMP dengan halaman HTML tersebut.

Jika bisa, gunakan AMP seperti perpustakaan JavaScript lainnya untuk membuat situs Anda dan tak perlu melakukan penautan kanonis. Menggunakan AMP untuk membuat seluruh situs web mengurangi beban pemeliharaan secara signifikan.

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='Menautkan konten AMP') }}

Untuk keperluan tutorial ini, kita akan berfokus pada contoh yang menunjukkan bahwa Anda memiliki versi AMP dan non-AMP sebuah halaman. Di dalam tutorial ini, situs web kita berisi artikel berita yang memiliki halaman HTML non-AMP (`article.html`) dan versi AMP dari halaman tersebut (`article.amp.html`). Kita akan menghubungkan halaman ini melalui `link`.

Kita sudah menyelesaikan langkah pertama untuk mencapai tahap ini dalam dokumen AMP kita dengan menyertakan tag tautan di `<head>` kembali ke halaman kanonis:

```html
<link rel="canonical" href="/article.html">
```

Langkah selanjutnya adalah menautkan artikel kanonis ke halaman AMP. Langkah ini bisa dilakukan dengan menyertakan tag `<link rel="amphtml">` ke bagian `<head>` di artikel kanonis.

Di dalam berkas `article.html`, **tambahkan** kode berikut ini ke bagian `<head>`:

```html
<link rel="amphtml" href="/article.amp.html">
```

Diagram berikut ini menggambarkan arah tag tautan:

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='Menautkan konten AMP') }}

Anda perlu menyiapkan penautan dua arah ini sehingga mesin pencarian dapat memahami hubungan antara dokumen kanonis HTML reguler dan dokumen AMP kita. Jika tidak ada tautan yang diberikan, crawler tidak dapat mengetahui dengan jelas artikel mana yang merupakan “versi AMP” dari dokumen HTML reguler tersebut. Dengan memberikan tautan ini secara eksplisit, kita dapat memastikan bahwa tidak ada ambiguitas!

## Menambahkan data terstruktur

Halaman AMP yang valid tidak membutuhkan data terstruktur [schema.org](http://schema.org/), tetapi beberapa platform seperti Google Search memerlukannya untuk pengalaman tertentu, misalnya korsel cerita Utama. Pada umumnya, lebih baik Anda menyertakan data terstruktur. Data terstruktur membantu mesin pencarian memahami halaman Anda dengan lebih baik, dan menampilkan konten Anda dengan lebih baik di Halaman Hasil Mesin Pencarian (cth.: dalam cuplikan yang kaya). Data terstruktur dimasukkan ke dalam tag `<head>` halaman AMP Anda melalui sebuah tag skrip jenis `application/ld+json`.

Untuk artikel berita kita, **tambahkan** data terstruktur berikut ini ke bagian bawah bagian `<head>` pada dokumen AMP Anda:

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

[tip type="note"] **CATATAN –** Konten harus selalu sama. Untuk artikel berita, tentukan jenis "NewsArticle". Tajuk harus sesuai dengan judul artikel Anda. Objek gambar mengacu ke gambar hero (besar) artikel. [/tip]

**Muat ulang** halaman di browser dan verifikasi bahwa tidak ada eror Validasi AMP yang terjadi.

[tip type="note"] Selain format data terstruktur schema.org, ada format-format lain yang didukung oleh mesin pencarian dan jaringan media sosial. Lihat dokumentasi yang didukung:

- [Tag meta Twitter Cards](https://dev.twitter.com/cards/overview)
- [Tag meta Facebook Open Graph](https://developers.facebook.com/docs/sharing/webmasters) [/tip]

### Memvalidasi data terstruktur

Untuk memverifikasi bahwa data terstruktur Anda benar, banyak platform menyediakan alat validasi. Di dalam tutorial ini, kita akan memvalidasi data terstruktur dengan [Alat Validasi Data Terstruktur Google](https://developers.google.com/structured-data/testing-tool/).

1. Di jendela browser baru, buka [Alat Validasi Data Terstruktur Google](https://developers.google.com/structured-data/testing-tool/).
2. Pilih tab **Cuplikan Kode**.
3. Salin lalu rekatkan kode sumber lengkap dari halaman AMP Anda ke panel edit teks pada alat validasi.
4. Klik **Jalankan Pengujian**.

Jika data terstruktur valid, Anda seharusnya melihat **0 eror** dan **0 peringatan**.

[tip type="read-on"] **BACA –** Untuk mempelajari lebih lanjut tentang kemampuan halaman untuk ditemukan, kunjungi panduan [Membuat halaman Anda dapat ditemukan](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md). [/tip]

Bagus! Anda telah menyelesaikan artikel berita AMP Anda.
