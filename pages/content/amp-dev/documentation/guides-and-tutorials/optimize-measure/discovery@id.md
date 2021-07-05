---
formats:
  - websites
'$title': Membuat halaman Anda dapat ditemukan
'$titles':
  teaser: Make your pages discoverable
$order: 5
description: 'Dalam beberapa kasus, Anda mungkin ingin memiliki versi non-AMP dan AMP dari halaman yang sama, contoh: artikel berita. Pertimbangkan ini: Jika Google Search ....'
teaser:
  icon: temukan
  text: Mempelajari cara mesin pencarian mengetahui bahwa situs Anda memiliki versi AMP.
  label: Pelajari lebih lanjut
---

Di dalam beberapa kasus, Anda mungkin ingin memiliki versi non-AMP dan AMP dari halaman yang sama, contoh: artikel berita. Pertimbangkan ini: Jika Google Search menemukan versi non-AMP halaman tersebut, bagaimana Google Search tahu bahwa ada versi AMP-nya?

### Menautkan halaman dengan &lt;link&gt;

Untuk memecahkan masalah ini, kami menambahkan informasi tentang halaman AMP ke halaman non-AMP dan sebaliknya, dalam bentuk tag `<link>` di `<head>`.

Tambahkan tag berikut ini ke halaman non-AMP:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Tambahkan tag ini ke halaman AMP:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### Bagaimana jika saya hanya memiliki satu halaman?

Jika Anda hanya memiliki satu halaman, dan halaman tersebut dalam versi AMP, Anda tetap harus menambahkan tautan kanonis ke halaman tersebut, yang kemudian akan mengarahkan ke halaman itu sendiri:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **BACA –** Pelajari lebih lanjut tentang cara Google menemukan halaman AMP di [panduan Google Search untuk halaman AMP](https://support.google.com/webmasters/answer/6340290). [/tip]

## Mengintegrasikan platform pihak ketiga melalui metadata tambahan <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

Terkadang, situs pihak ketiga (yang menyematkan halaman AMP Anda atau menyertakan tautan ke halaman tersebut) perlu tahu lebih banyak tentang halaman Anda, selain mengetahui bahwa halaman tersebut adalah versi AMP. Pertanyaan yang mungkin diajukan oleh platform tentang halaman Anda adalah seperti, “Apakah ini halaman artikel berita?”, “Atau sebuah video?”, atau “Apakah ini memiliki tangkapan layar dan deskripsi singkat?”.

Hal ini tidak hanya relevan untuk halaman AMP, namun untuk semua halaman web. Pada beberapa platform, metadata ini bersifat tambahan. Pada platform lainnya, metadata ini merupakan persyaratan, artinya, platform **tidak akan menampilkan tautan ke konten jika Anda tidak menyertakan metadata yang tepat**. Pastikan Anda menyertakan metadata yang tepat untuk platform yang Anda inginkan untuk menampilkan konten Anda.

### Menggunakan Schema.org untuk mesin pencarian pada umumnya

[Schema.org](http://schema.org/) menawarkan kosakata terbuka untuk menambahkan metadata ke berbagai hal. Dalam kasus AMP, properti yang dapat diterima dalam konteks mencakup jenis konten tertentu (yaitu, ‘artikel berita’), judul, tanggal penayangan, dan gambar pratinjau yang terkait.

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

Contoh-contoh lainnya dapat ditemukan di [folder contoh ampproject](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples), termasuk sintaksis atribut HTML alternatif).

[tip type="read-on"] Kunjungi sumber daya ini untuk mendapatkan informasi lebih lanjut tentang data terstruktur:

- Pelajari cara [Mengatur struktur konten agar muncul dalam hasil pencarian yang kaya di Google Search](https://developers.google.com/search/docs/guides/mark-up-content) (cth.: korsel cerita teratas, kartu resep, dll.).
- Uji data Anda yang terstruktur dengan [Alat Pengujian Data Terstruktur Google](https://developers.google.com/structured-data/testing-tool/). [/tip]

### Metadata lainnya untuk lebih banyak platform

Kunjungi [Panduan Temuan Sosial di Dasar-Dasar Web](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) untuk mempelajari semua cara lain dalam menyiapkan konten untuk penemuan dan distribusi.
