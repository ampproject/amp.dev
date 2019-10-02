---
$title: Membuat halaman Anda mudah ditemukan
---

Dalam beberapa kasus, Anda mungkin ingin memiliki versi AMP dan non-AMP dari halaman yang sama, misalnya, artikel berita. Coba pikirkan hal ini: Jika Google Penelusuran menemukan versi non-AMP dari halaman tersebut, bagaimana Google tahu bahwa ada versi AMP-nya?

### Menautkan halaman dengan &lt;link&gt;

Untuk memecahkan masalah ini, kami menambahkan informasi tentang halaman AMP ke halaman non-AMP dan sebaliknya, dalam bentuk tag `<link>` di `<head>`.

Tambahkan tag berikut ke halaman non-AMP:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Tambahkan tag ini ke halaman AMP:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### Bagaimana jika saya hanya memiliki satu halaman?

Jika hanya memiliki satu halaman, dan halaman tersebut adalah versi AMP, Anda tetap harus menambahkan link kanonis ke halaman tersebut, yang kemudian akan mengarahkan ke halaman itu sendiri:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"]
Pelajari lebih lanjut cara Google menemukan halaman AMP di [panduan Google Penelusuran untuk halaman AMP](https://support.google.com/webmasters/answer/6340290).
[/tip]

## Mengintegrasikan platform pihak ketiga melalui metadata tambahan <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

Terkadang situs pihak ketiga (yang menyematkan halaman AMP atau menyertakan link ke halaman AMP) perlu tahu lebih banyak tentang halaman Anda selain mengetahui bahwa halaman tersebut adalah versi AMP. Pertanyaan yang mungkin diajukan oleh platform tentang halaman Anda adalah seperti “Apakah halaman merupakan artikel berita?”, “Atau video?”, atau “Apakah Anda memiliki screenshot dan deskripsi singkat?”.

Hal ini tidak hanya relevan untuk halaman AMP, namun juga untuk semua halaman. Pada beberapa platform, metadata ini bersifat tambahan. Pada platform lainnya, metadata ini merupakan persyaratan, yang berarti platform **tidak akan menampilkan link ke konten jika Anda tidak menyertakan metadata yang tepat**. Pastikan Anda menyertakan metadata yang tepat untuk platform yang ingin Anda gunakan untuk menampilkan konten.

### Menggunakan Schema.org untuk sebagian besar mesin telusur

[Schema.org](http://schema.org/) menawarkan kosakata terbuka untuk menambahkan metadata ke berbagai hal. Dalam kasus AMP, properti yang dapat diterima dalam konteks mencakup jenis konten tertentu (yaitu, ‘artikel berita’), judul, tanggal terbit, dan gambar pratinjau yang terkait.

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

Contoh lainnya dapat ditemukan di [folder contoh ampproject](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples), termasuk sintaks atribut HTML alternatif).

[tip type="read-on"] Kunjungi referensi ini untuk informasi lebih lanjut tentang data terstruktur:

* Pelajari cara [Menyusun konten agar muncul di hasil kaya Google Penelusuran](https://developers.google.com/search/docs/guides/mark-up-content) (misalnya, carousel artikel teratas, kartu resep, dll.).
* Uji data terstruktur Anda dengan [Fitur Pengujian Data Terstruktur Google](https://developers.google.com/structured-data/testing-tool/).
[/tip]

### Metadata lainnya untuk platform yang lebih lengkap

Kunjungi [Panduan Temuan Sosial di Dasar-Dasar Web](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) untuk mempelajari semua cara lain dalam menyiapkan konten untuk penemuan dan distribusi.
 
 
