---
'$title': Bagaimana halaman AMP disimpan di cache
$order: 0
description: Di dalam dokumen ini, Anda akan mempelajari tentang peran Cache AMP dalam ekosistem AMP, dan cara halaman AMP Anda disimpan di dalam cache.
formats:
  - websites
  - stories
  - ads
---

Di dalam dokumen ini, Anda akan mempelajari tentang peran Cache AMP dalam ekosistem AMP, dan cara halaman AMP Anda disimpan di dalam cache.

## Apa yang dimaksud dengan Cache AMP?

Cache AMP adalah jaringan penayangan konten (CDN) berbasis proksi untuk menayangkan dokumen AMP yang valid. Cache AMP didesain untuk:

1. Hanya menayangkan halaman AMP yang valid.
2. Memungkinkan halaman AMP dimuat sebelumnya secara efisien dan aman.
3. Melakukan pengoptimalan kinerja tambahan pada konten yang berguna bagi pengguna.

[tip type="note"] Dokumen email AMP dikecualikan dari cache AMP. [/tip]

Pelajari lebih lanjut tentang Cache AMP dari video YouTube di bawah ini, atau pada pos blog [Alasan Keberadaan Cache AMP](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456).

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='Tonton video ini untuk mengetahui alasan keberadaan Cache AMP.']

## Cache AMP apa saja yang tersedia?

Saat ini, ada dua penyedia Cache AMP:

- [Cache AMP Google](https://developers.google.com/amp/cache/)
- [Cache AMP Bing](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP adalah ekosistem terbuka dan Proyek AMP secara aktif mendorong pengembangan lebih banyak Cache AMP. Untuk mempelajari tentang cara membuat Cache AMP, kunjungi [Panduan Cache AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-cache-guidelines.md).

## Bagaimana cara memilih Cache AMP?

Sebagai penayang, Anda tidak memilih Cache AMP, _sebenarnya, platform_ yang ditautkan ke konten Anda yang memilih Cache AMP (jika ada) untuk digunakan.

Ini adalah kebalikan dari model pada umumnya yang mana penayangan konten adalah tanggung jawab dari penayang. Namun, model ini memungkinkan platform memberikan kinerja pemuatan yang dapat diprediksi kepada penggunanya. Selain itu, model ini juga memungkinkan platform memastikan invarian privasi dan keamanan yang diperlukan selama fase sebelum perenderan AMP. Untuk mempelajari tentang panduan ketat dalam membuat Cache AMP, kunjungi [Panduan Cache AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-cache-guidelines.md).

## Apakah saya dapat memilih menolak menyimpan di dalam cache?

Penyimpanan dalam cache adalah bagian inti dari ekosistem AMP. Dengan memublikasikan dokumen AMP yang valid, Anda otomatis memilih untuk melakukan penyimpanan dalam cache.

Jika Anda ingin agar dokumen tidak disimpan di dalam cache, salah satu opsinya adalah menghapus atribut `amp` dari tag HTML. Tindakan ini membuat dokumen memiliki AMP yang tidak valid secara teknis, meskipun tidak memengaruhi fungsi dokumen tersebut.

## Siapa yang meminta halaman AMP yang disimpan di dalam cache?

Halaman AMP yang disimpan di dalam cache diakses oleh platform (seperti Google Search, Google News, dan Bing) serta aplikasi seluler. Aplikasi seluler dapat ditautkan ke konten AMP yang disimpan di dalam cache melalui URL (kunjungi [API URL AMP](https://developers.google.com/amp/cache/use-amp-url) Google) atau dengan XHR lintas asal di Aplikasi Web Progresif (pelajari lebih lanjut di [Menyematkan & menggunakan AMP sebagai sumber data](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)).

<amp-img src="/static/img/docs/platforms_accessing_cache.png" width="1054" height="356" layout="responsive" alt="platforms and mobile apps access cached AMP pages"></amp-img>

## Bagaimana agar halaman AMP saya disimpan di dalam cache?

Dengan menggunakan format AMP, Anda membuat konten Anda dapat disimpan di dalam cache oleh Cache AMP. Ada beberapa cara agar halaman AMP Anda dapat disimpan di dalam Cache AMP:

- **Penemuan oleh platform**: Platform menemukan konten AMP Anda melalui tag `<html ⚡>` atau `<html amp>` dan menyimpan konten tersebut di dalam cache. Misalnya, Google Search menggunakan crawl untuk mendapatkan konten; untuk semua halaman AMP yang valid dan dikenal, kontennya ditambahkan ke Cache AMP Google.

- **Cache URL request**: Platforms can specifically request an AMP page by using the AMP Cache URL format. The AMP Cache acts as a reverse proxy, therefore, when the platform accesses the page, it results in the page being cached automatically.

  - Google AMP Cache URL example: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

[tip type="note"] **CATATAN –** URL Cache AMP bukanlah URL yang meghadap pengguna, artinya, pengguna biasanya tidak akan meminta konten melalui URL tersebut. [/tip]

- **Penambahan oleh penayang**: Penayang dapat secara khusus menambahkan halaman AMP ke Cache AMP. Opsi ini hanya berlaku untuk Cache AMP Google (kunjungi [Cache AMP Google: Memperbarui Konten AMP](https://developers.google.com/amp/cache/update-cache)).

## Sumber daya tambahan

- [Panduan Cache AMP untuk Proyek AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-cache-guidelines.md)
- [Gambaran umum Cache AMP Google](https://developers.google.com/amp/cache/overview)
- [Dokumentasi Cache AMP Bing](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
