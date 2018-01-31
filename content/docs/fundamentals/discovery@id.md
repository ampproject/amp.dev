---
$title: Membuat Laman Dapat Ditemukan
---

[TOC]

Dalam beberapa kasus, Anda mungkin ingin memiliki versi AMP dan non-AMP dari laman yang sama, misalnya, artikel berita. Coba pikirkan hal ini: Jika Google Penelusuran menemukan versi non-AMP dari laman tersebut, bagaimana Google mengetahuinya?

### Menautkan laman dengan `link`

Untuk memecahkan masalah ini, kami menambahkan informasi tentang laman AMP ke laman non-AMP dan sebaliknya, dalam bentuk tag `<link>` di `<head>`.

Tambahkan tag berikut ke laman non-AMP:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Tambahkan tag ini ke laman AMP:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### Bagaimana jika saya hanya memiliki satu laman?

Jika hanya memiliki satu laman, dan laman tersebut adalah versi AMP, Anda tetap harus menambahkan tautan kanonis ke laman tersebut, yang kemudian akan diarahkan ke laman tersebut:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

## Mengintegrasikan platform pihak ketiga melalui metadata tambahan

Terkadang situs pihak ketiga (yang menyematkan laman AMP atau menyertakan tautan ke laman AMP) perlu tahu lebih banyak tentang laman Anda selain mengetahui bahwa laman tersebut adalah laman AMP. Pertanyaan yang mungkin diajukan oleh platform tentang laman Anda adalah seperti “Apakah laman merupakan artikel berita?”, “Atau video?”, atau “Apakah Anda memiliki tangkapan layar dan deskripsi singkat?”.

Hal ini tidak hanya relevan untuk laman AMP, tetapi juga untuk semua laman web. Untuk beberapa platform, metadata ini bersifat tambahan. Untuk platform lainnya, metadata ini merupakan persyaratan, yang berarti platform **tidak akan menampilkan tautan ke konten jika Anda tidak menyertakan metadata yang tepat**. Pastikan Anda menyertakan metadata yang tepat untuk platform yang ingin ditampilkan di konten.

### Menggunakan Schema.org untuk sebagian besar mesin penelusuran

[Schema.org](http://schema.org/) menawarkan kosa kata terbuka untuk menambahkan metadata ke berbagai hal. Dalam kasus AMP, properti yang dapat diterima di konten termasuk jenis konten tertentu (yaitu, ‘artikel berita’), judul, tanggal terbit, dan gambar pratinjau terkait.

Contoh:

[sourcecode:html]
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>
[/sourcecode]

Anda dapat menemukan lebih banyak contoh di [folder contoh ampproject ](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples), termasuk sintaksis atribut HTML alternatif).

Catatan: Definisi Schema.org ini merupakan persyaratan untuk membuat konten layak dimunculkan di demo [korsel berita Google Penelusuran (coba di ponsel)](https://g.co/ampdemo).
Lihat juga [Berita Utama dengan AMP](https://developers.google.com/structured-data/carousels/top-stories), dan [Alat Pengujian Data Terstruktur](https://developers.google.com/structured-data/testing-tool/).

### Metadata lainnya untuk platform yang lebih lengkap

Kunjungi [panduan Temuan Sosial di Dasar-Dasar Web](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) untuk mempelajari tentang semua cara lain guna menyiapkan konten untuk temuan dan distribusi.
