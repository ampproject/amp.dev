---
"$title": Daftar periksa penayangan AMP
"$order": '0'
description: Desain web yang responsif adalah tentang membangun halaman web yang cair yang menanggapi kebutuhan pengguna Anda—Halaman yang pas dengan ukuran dan orientasi layar pengguna. Anda dapat mencapai ....
formats:
- websites
author: CrystalOnScript
contributors:
- sebastianbenz
---

Ikuti daftar periksa ini untuk memberi situs Anda pengalaman AMP maksimal!

# Memastikan Validasi Spesifikasi AMP

AMP dilengkapi dengan banyak sekali manfaat bawaan, seperti mengurangi waktu tunggu pengguna dengan memuat konten sebelumnya dari Cache AMP. Untuk mendapatkan manfaat ini, halaman harus merupakan dokumen AMP yang valid. Halaman yang ditayangkan dengan eror yang dilaporkan oleh validator AMP tidak dapat diindeks oleh Cache AMP, dan mungkin disajikan sebagai halaman eror.

Lupakan pengalaman menayangkan halaman AMP yang invalid dengan menggunakan alat-alat berikut ini:

- [Memvalidasi halaman AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [Validator AMP ](https://validator.ampproject.org/)
- [Penguji AMP Google](https://search.google.com/test/amp)
- [Linter AMP](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [Perangkat AMP](../../../documentation/tools.html?format=websites)

# Memberikan akses kepada server halaman AMP di cache

Kabar baik! Halaman AMP yang valid secara otomatis masuk ke dalam semua Cache AMP yang ada. Ini berarti konten pengalaman pengguna Anda dimuat secara efisien dan aman. Jenis pengoptimalan ini sangat bagus, namun ada sedikit masalah. Beberapa pengguna akan disajikan halaman AMP dari domain yang tidak sesuai dengan milik Anda. Ini dapat menyebabkan halaman kehilangan akses ke data situs saat menggunakan komponen AMP dinamis, seperti [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) atau [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites). Jenis eror ini adalah masalah Berbagi Sumber Daya Lintas Asal (CORS). Mari bekerja sama dengan keamanan, jangan melawannya, dengan mengaktifkan Permintaan CORS dari semua [Cache AMP](https://cdn.ampproject.org/caches.json) yang tersedia! Jika Anda menggunakan Node.js di backend, Anda dapat menggunakan [middleware amp-cors](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors).

Pelajari selengkapnya tentang memberikan akses kepada server:

- [Bagaimana Halaman AMP disimpan di cache ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [CORS dalam AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- [Middleware AMP CORS](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) untuk Node.js

# Konten yang aman dan dapat dibagikan dengan pertukaran atau komunikasi bertanda tangan (signed exchange)

Pertahankan URL domain Anda dan sederhanakan analitis saat berbagi konten melalui komunikasi bertanda tangan (SXG). Dengan menyajikan halaman AMP bersama SXG, tanda tangan digital melindungi informasi Anda dengan mengikatkan dokumen tersebut ke URL yang diklaimnya. Perilaku ini memperlakukan sesi dan cookie pengguna sebagai pihak pertama, sehingga menutup kemungkinan celah analitis. Penerapan SXG menghasilkan konten AMP bertanda tangan selain, dan bukan sebagai gantinya, konten AMP yang biasa.

Pelajari lebih lanjut tentang penerapan komunikasi bertanda tangan:

- [Menyajikan AMP dengan menggunakan komunikasi bertanda tangan](signed-exchange.md?format=websites)
- [Komunikasi HTTP Bertanda Tangan](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [URL Asli AMP Cloudflare](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [Komunikasi bertanda tangan untuk URL AMP yang lebih baik dan analitis yang lebih mudah (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# Menguji halaman yang disimpan di cache

Cache AMP menyimpan gambar, font, dan konten halaman untuk menyajikan konten Anda kepada pengguna begitu mereka menginginkannya. Ini menjadikan penting untuk menguji apakah halaman AMP Anda tampil dan berfungsi sesuai harapan saat disajikan dari Cache AMP.

Saat menambahkan halaman AMP ke Cache AMP, periksa dengan alat atau [perangkat pengembang browser](https://developers.google.com/web/tools/chrome-devtools/) Anda apakah semua sumber daya eksternal dapat dimuat. Berikut ini adalah daftar yang perlu diperhatikan:

- gambar
- video
- endpoint amp-analytics
- endpoint amp-pixel
- font kustom
- iframe

Pelajari lebih lanjut tentang cache AMP:

- [Menggunakan Cache AMP Google](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [AMP di Google, Cache AMP Google](https://developers.google.com/amp/cache/overview)
- [Debug masalah Cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [Penanganan Permintaan dan Format URL Cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# Memastikan berkas AMP Anda dapat ditemukan oleh mesin pencari

Halaman yang dibuat hanya dalam AMP (AMP pertama) dan halaman dengan AMP ganda (AMP berpasangan) perlu memastikan bahwa mereka dapat ditemukan! Semua halaman AMP memerlukan `<link rel="canonical" href="$SOME_URL">` di `<head>`. Halaman AMP pertama harus menautkan diri mereka sendiri dan halaman AMP yang disandingkan dengan halaman non-AMP perlu saling menautkan.

Pastikan metadata [Schema.org](https://schema.org/) Anda menambahkan informasi berguna! Situs dan mesin pencari lain mungkin memerlukan ini untuk berbagi konten Anda.

Web Robot, Web Wanderer, Crawler, atau Spider, semua ini adalah nama untuk program yang mencari konten. Program-program ini bergerak di web, membantu mesin pencari untuk mengindeks konten web sehingga permintaan pengguna dapat memberikan hasil yang benar! Pastikan pencari Anda dapat menemukan situs Anda dengan menyertakan instruksi yang tepat di berkas `robots.txt` dan menetapkan tajuk yang tepat.

JANGAN kecualikan crawler atau pengambil konten melalui berkas [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en) Anda.

```
User-agent: *
Disallow: /amp/                            <= don't!
```

JANGAN tambahkan tag meta `noindex` robot ke berkas HTML AMP Anda.

```
<meta name="robots" content="noindex" />   <= don't!
```

JANGAN sertakan `noindex` sebagai tajuk HTTP X-Robots-Tag untuk berkas AMP Anda.

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

Pelajari cara membuat halaman Anda dapat ditemukan:

- [Membuat halaman Anda dapat ditemukan](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [Spesifikasi tajuk HTTP X-Robots-Tag dan meta tag robot HTTP](https://developers.google.com/search/reference/robots_meta_tag)
- [T&J Pengindeksan AMP](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# Mengukur lalu lintas dan perjalanan pengguna

Mengumpulkan metrik yang benar sangat penting untuk analitis yang berguna. Saat menguji bagaimana memperkenalkan AMP ke situs Anda berdampak pada pengguna, pastikan Anda telah melakukan pengukuran dengan benar. Negatif palsu, positif palsu, atau hasil yang tidak relevan mungkin timbul jika analitis tidak diperhitungkan untuk perbedaan yang dapat dihasilkan AMP. Pastikan Anda memahami apa yang perlu dicari dan bagaimana mengukurnya!

Pelajari lebih lanjut tentang menyiapkan analitis yang tepat untuk AMP:

- [Jadi, uji AMP Anda tidak berhasil— bagaimana selanjutnya?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Analisis cache vs. non-cache](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [Mengukur perjalanan pengguna di Cache AMP dan situs web Anda](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Mengukur keberhasilan: Apa yang baru dalam eksperimen & analitis AMP (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [Komunikasi bertanda tangan untuk URL AMP yang lebih baik dan analitis yang lebih mudah (AMP Conf](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)
