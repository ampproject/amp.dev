---
$title: Cara halaman AMP disimpan dalam cache
---

[TOC]

Dalam dokumen ini, Anda akan mempelajari tentang peran Cache AMP dalam ekosistem AMP, dan cara halaman AMP disimpan dalam cache.

## Apa yang dimaksud dengan Cache AMP?
Cache AMP adalah jaringan penayangan konten (CDN/content delivery network) berbasis proxy untuk menayangkan dokumen AMP yang valid. Cache AMP didesain untuk:

1.  Hanya menayangkan halaman AMP yang valid.
2.  Mengizinkan halaman AMP agar dimuat sebelumnya secara efisien dan aman.
3.  Melakukan pengoptimalan performa tambahan pada konten yang berguna bagi pengguna.

Pelajari lebih lanjut tentang Cache AMP di video YouTube di bawah, atau pada entri blog [Why AMP Caches Exist](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456).

[video src="https://www.youtube.com/watch?v=n8n7fj60lds" width="480" height="270" caption="Tonton video ini untuk mempelajari alasan dibuatnya Cache AMP."]

## Cache AMP apa saja yang tersedia?
Saat ini, ada 2 penyedia Cache AMP:

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Cloudflare AMP Cache](https://amp.cloudflare.com/)

AMP adalah ekosistem terbuka dan Project AMP secara aktif mendorong pengembangan lebih banyak Cache AMP.  Untuk mempelajari tentang cara membuat Cache AMP, lihat [AMP Cache Guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## Bagaimana cara memilih Cache AMP?

Sebagai penayang, Anda tidak memilih Cache AMP, *sebenarnya platform* yang ditautkan ke konten Anda yang memilih Cache AMP (jika ada) untuk digunakan.

Ini adalah kebalikan dari model pada umumnya yang mana penayangan konten adalah tanggung jawab dari penayang.  Namun, model ini memungkinkan platform memberikan performa pemuatan yang dapat diprediksi kepada penggunanya. Selain itu, model ini juga memungkinkan platform memastikan invarian privasi dan keamanan yang diperlukan selama fase prarender AMP. Untuk mempelajari tentang panduan ketat dalam membuat Cache AMP, lihat [AMP Cache Guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## Apakah saya dapat memilih untuk tidak melakukan penyimpanan dalam cache?

Penyimpanan dalam cache adalah bagian inti dari ekosistem AMP. Dengan memublikasikan dokumen AMP yang valid, Anda otomatis memilih untuk melakukan penyimpanan dalam cache.

Jika Anda ingin agar dokumen tidak disimpan dalam cache, salah satu opsinya adalah menghapus atribut `amp` dari tag HTML. Tindakan ini membuat dokumen memiliki AMP yang tidak valid secara teknis, meskipun tidak memengaruhi fungsi dokumen tersebut.

## Siapa yang meminta halaman AMP yang disimpan dalam cache?

Halaman AMP yang disimpan dalam cache diakses oleh platform (seperti Google Penelusuran, Google Berita, dan Cloudflare) dan aplikasi seluler. Aplikasi seluler dapat ditautkan ke konten AMP yang disimpan dalam cache melalui URL (lihat [AMP URL API](https://developers.google.com/amp/cache/use-amp-url) Google) atau dengan XHR lintas-asal di  Progressive Web App (pelajari lebih lanjut di [Menyematkan.html))).

<amp-img src="/static/img/docs/platforms_accessing_cache.png"
         width="1054" height="356" layout="responsive"
         alt="platform dan aplikasi seluler mengakses halaman AMP yang disimpan dalam cache">
</amp-img>

## Bagaimana cara halaman AMP saya disimpan dalam cache?
Dengan menggunakan format AMP, Anda membuat konten dapat disimpan dalam cache oleh Cache AMP. Ada beberapa cara agar halaman AMP Anda dapat disimpan di Cache AMP:

* **Penemuan oleh platform**:  Platform menemukan konten AMP Anda melalui tag `<html ⚡>` atau `<html amp>` dan menyimpan konten tersebut dalam cache. Misalnya, Google Penelusuran meng-crawl konten; untuk semua halaman AMP yang valid dan diidentifikasi, kontennya ditambahkan ke Cache AMP Google.

* **Permintaan URL Cache**: Platform dapat secara khusus meminta halaman AMP menggunakan format URL Cache AMP.  Cache AMP bertindak sebagai proxy balik, jadi saat platform mengakses halaman, halaman akan disimpan dalam cache secara otomatis.
    - Contoh URL Cache AMP Cloudflare: `https://amp.cloudflare.com/c/foo.com/amp_document.html`
    - Contoh URL Cache AMP Google: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

Catatan: URL Cache AMP bukanlah URL yang diakses langsung oleh pengguna, artinya pengguna biasanya tidak akan meminta konten melalui URL tersebut.

* **Penambahan oleh penayang**: Penayang dapat secara khusus menambahkan halaman AMP ke Cache AMP.  Opsi ini hanya berlaku untuk Cache AMP Google (lihat [Cache AMP Google: Memperbarui Konten AMP](https://developers.google.com/amp/cache/update-cache)).

## Referensi tambahan

* [AMP Project's AMP Cache guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md)
* [Google AMP Cache overview](https://developers.google.com/amp/cache/overview)
* [Cloudflare AMP Cache documentation](https://amp.cloudflare.com/)
