---
'$title': Penanganan Permintaan dan Format URL Cache AMP
$order: 9
toc: 'false'
formats:
  - websites
  - stories
  - ads
author: Gregable
contributors:
  - sebastianbenz
---

Di dalam dokumen ini, Anda akan mempelajari tentang format URL Cache AMP dan caranya menangani permintaan.

## Format URL

Saat mungkin, Cache AMP Google akan membuat subdomain untuk setiap domain dokumen AMP dengan terlebih dahulu mengonversinya dari [IDN (punycode)](https://en.wikipedia.org/wiki/Punycode) ke UTF-8. Cache mengganti setiap `-` (tanda hubung) dengan `--` (2 tanda hubung) dan mengganti setiap `.` (titik) dengan `-`(tanda hubung). Contohnya, `pub.com` akan memetakan ke `pub-com.cdn.ampproject.org`.

Anda dapat menggunakan kalkulator URL ini untuk mengonversikan sebuah URL menjadi versi cache AMP:

<div><amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div></amp-iframe></div>

[tip type="tip"] Gunakan modul [URL Cache Kotak Alat AMP](https://github.com/ampproject/amp-toolbox/tree/master/packages/cache-url) [Node.js](https://nodejs.org) untuk menerjemahkan URL dari asal ke format URL Cache AMP. [/tip]

Dokumen ini menjelaskan:

- Struktur URL pada Cache AMP.
- Cara memprediksi bagaimana URL Anda akan muncul pada sebuah cache AMP
- Cara membalik tajuk Asal Cache AMP untuk menentukan apa domain penayangnya.

## Protokol Nama Domain

Semua dokumen menggunakan protokol https pada cache AMP.

## Akhiran Nama Domain

Semua Cache AMP didaftarkan dalam berkas JSON, tersedia online di [Repositori HTML AMP](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/caches.json). Sebuah catatan cache contoh di dalam berkas ini akan terlihat seperti:

```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

Sebuah Cache AMP menyajikan catatan pada domain yang ditentukan oleh `cacheDomain`. Di dalam kasus ini, domain adalah `cdn.ampproject.org`.

Dokumen ini menggunakan URL dengan `cdn.ampproject.org` sebagai contoh, namun cache lain biasanya menggunakan struktur URL yang serupa.

## Awalan Nama Domain

Cache AMP menyajikan dokumen pada URL yang telah diubah, seperti `example-com.cdn.ampproject.org`. Komponen bertitik pertama dari nama domain asli di dalam contoh, `example.com`, menjadi `example-com`. Dokumen ini merujuk untai non-titik ini, `example-com`, sebagai “awalan domain”. Lihat di bawah ini untuk mengetahui algoritme yang melakukan transformasi ini.

Komponen bertitik banyak tidak digunakan di dalam awalan atau prefiks ini, seperti `example.com.cdn.ampproject.org`, karena keterbatasan sertifikat https (TLS), [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1):

```
Names may contain the wildcard character * which is considered to match any single domain name component or component fragment. E.g., *.a.com matches foo.a.com but not bar.foo.a.com.
```

Domain penayang dapat sepanjang hingga 255 karakter, sementara setiap awalan domain terbatas hingga 63 karakter, sesuai dengan [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11) yang berbunyi:

```
The length of any one label is limited to between 1 and 63 octets.  A full domain name is limited to 255 octets (including the separators).
```

Semua domain penayang memetakan ke awalan domain yang unik. Algoritme untuk melakukannya sehingga berupaya untuk membuat pemetaan dapat dibaca manusia. Namun, pemetaan kembali menggunakan hashing aman untuk domain penayang jika terlalu panjang, dan di dalam kasus yang dijelaskan di bawah ini:

### Algoritme Dasar

Algoritme dasar untuk mengonversi domain penayang ke awalan domain adalah sebagai berikut:

1. Dekode domain penayang dengan Punycode. Kunjungi [RFC 3492](https://tools.ietf.org/html/rfc3492)
2. Ganti setiap karakter "`-`" (tanda hubung) di output langkah ke-1 dengan "`--`" (dua tanda hubung).
3. Ganti setiap karakter "`.`" (titik) di output langkah ke-2 dengan "`-`" (tanda hubung).
4. Jika output langkah ke-3 mempunyai "`-`" (tanda hubung) pada posisi 3 dan 4, maka untuk output langkah ke-3, tambahkan awalan "`0-`" dan tambahkan akhiran "`-0`". Kunjungi [#26205](https://github.com/ampproject/amphtml/issues/26205) untuk mengetahui latar belakangnya.
5. Enkode output langkah ke-3 dengan Punycode. Kunjungi [RFC 3492](https://tools.ietf.org/html/rfc3492)

Beberapa contoh algoritme dasar:

<table>
  <tr>
   <td>
<strong>Domain Penayang</strong>
   </td>
   <td>
<strong>Awalan Domain</strong>
   </td>
  </tr>
  <tr>
   <td>
<code>example.com</code>
   </td>
   <td>
<code>example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo.example.com</code>
   </td>
   <td>
<code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo-example.com</code>
   </td>
   <td>
<code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)</td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)</td>
  </tr>
  <tr>
   <td>
<code>en-us.example.com</code>
   </td>
   <td>
<code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>

Setelah menjalankan algoritme dasar, jika dan hanya jika awalan domain bukan label DNS yang valid, kita menjalankan Algoritme Fallback yang dijelaskan di bawah ini.

Sebuah awalan domain bukan label DNS yang valid jika lebih panjang dari 63 karakter

### Algoritme Fallback

Algoritme fallback untuk mengonversi domain penayang ke awalan domain adalah sebagai berikut:

1. Hash domain penayang dengan menggunakan SHA256.
2. Keluar dari output langkah ke-1 dengan Base32.
3. Hapus 4 karakter terakhir dari output langkah ke-2, yang selalu berupa karakter `=` (sama dengan).

Algoritme fallback akan menghasilkan untai 52 karakter, seperti yang berikut ini tanpa `-` (tanda hubung): `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`.

### Dasar Gabungan

Algoritme gabungan adalah:

1. Jalankan Algoritme Dasar. Jika output adalah label DNS yang valid, lampirkan akhiran domain Cache dan hasilkan, contohnya: `example-com.cdn.ampproject.org`. Jika tidak, lanjutkan ke langkah ke-2.
2. Jalankan Algoritme Fallback. Lampirkan akhiran domain Cache dan hasilkan, contohnya: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

## Jalur URL

“Jalur” sebuah URL di Cache AMP selalu terdiri atas satu atau beberapa direktori awalan, seperti `/c`, yang diikuti oleh sisipan atau infiks `/s` hanya jika URL penayang adalah http `s`, diikuti oleh URL dokumen penayang tanpa protokol.

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='Image displaying cached URL formats') }}

Direktori awalan, seperti `/c` sesuai dengan berbagai jenis penyajian yang mungkin dilakukan oleh Cache AMP. Cache AMP yang lain mungkin mendukung jenis-jenis penyajian yang berbeda, dan ini bukan daftar selengkapnya:

- `/c` - <strong>C</strong>ontent (Konten): Ini adalah dokumen AMP yang disajikan sebagai halaman mandiri yang mungkin tertaut secara langsung pada sejumlah antarmuka.
- `/v` - <strong>V</strong>iewer(Penampil): Ini juga adalah dokumen AMP, namun disajikan di [Penampil AMP](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer) (AMP Viewer), yaitu lingkungan bingkai yang menampilkan dokumen AMP dalam konteks Halaman Hasil Pencarian atau antarmuka lain.
- `/wp` - <strong>W</strong>eb <strong>P</strong>ackage: (Paket Web): Ini adalah dokumen AMP yang disajikan sebagai [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/) (Komunikasi Bertanda Tangan), sebuah teknologi Paket Web. URL-URL ini bertindak sebagai pengalihan ulang ke asal penayang sendiri.
- `/cert` - <strong>Cert</strong>ificate (Sertifikat): Ini adalah sertifikat publik untuk penggunaan dengan [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/).
- `/i` - <strong>I</strong>mage (Gambar): Ini adalah gambar yang disajikan oleh cache AMP, biasanya sebagai sub-sumber daya dokumen.
- `/ii` - <strong>I</strong>mage (Gambar): Ini juga gambar yang disajikan oleh Cache AMP, namun biasanya dapat dikombinasikan dengan parameter pengonfigurasi cache, seperti `/ii/w800` yang mengindikasikan lebar maksimum yang diminta dokumen. Cache dapat menghasilkan gambar dengan skala berbeda di sini agar dapat menghemat bandwidth untuk browser.

Selain itu, Cache AMP dapat memilih lampiran parameter kueri spesial pada URL dokumen yang bukan bagian dari kueri dokumen penayang. Contohnya, [`<amp-live-list>`](../../../components/reference/amp-live-list.md) membuat permintaan penyegaran dengan mengambil dokumen yang mempunyai parameter `amp_latest_update_time<`. Parameter-parameter ini tidak diteruskan ke asal ketika dokumen diambil, namun hadir hanya untuk mengonfigurasi permintaan ke Cache AMP.

## Asal CORS

Banyak penayang menggunakan permintaan CORS dari dokumen AMP mereka untuk mengambil data ekstra. Permintaan CORS berfungsi dengan mengirimkan sebuah tajuk HTTP `Origin:` di dalam permintaan yang menjelaskan asal dokumen yang melakukan permintaan. Sebagaimana dilihat di atas, asal dokumen berbeda pada Cache AMP dibanding pada dokumen asli. Di dalam bagian nama domain di atas, Anda dapat menemukan algoritme yang menentukan Asal URL Cache AMP sesuai dengan URL penayang. Di bawah ini, kita menentukan algoritme balik untuk menguraikan tajuk permintaan `Origin:` CORS balik ke domain penayang asli.

### Asal Cache AMP untuk Domain Penayang

Sebuah nilai tajuk Asli Cache AMP akan terlihat seperti salah satu dari contoh berikut ini:

- `https://www-example-com.cdn.ampproject.org`
- `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

Pertama-tama, hapus awalan protokol (`https://`) dan akhiran domain Cache AMP, seperti `.cdn.ampproject.org`. Akhiran mungkin dari salah satu cache yang tercantum pada [caches.json](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/caches.json). Untai yang tersisa akan menjadi “awalan domain”. Di dalam kasus kedua contoh di atas, “awalan domain” adalah:

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

Selanjutnya, periksa apakah “awalan domain” mengandung minimal satu ‘`-`’ (tanda hubung). Mengandung satu atau lebih tanda hubung adalah kasus yang umum sejauh ini. Jika “awalan domain” tidak mengandung minimal satu ‘`-`’ (tanda hubung), Asal Cache AMP tidak dapat dibalikkan secara langsung. Sebaliknya, jika Anda mengetahui rangkaian domain penayang yang mungkin, Anda dapat membuat rangkaian Asal Cache AMP dengan menggunakan algoritme Nama Domain seperti sebelumnya di dalam dokumen ini. Lalu, Anda dapat mengesahkan sesuai rangkaian yang sudah tetap.

Sisa algoritme mengasumsikan bahwa “awalan domain” mengandung minimal satu ‘`-`’ (tanda hubung).

1. Jika awalan domain dimulai dengan `xn--`, dekode “awalan domain” dengan punycode. Contohnya: `xn---com-p33b41770a` menjadi `⚡😊-com`. Kunjungi [RFC 3492](https://tools.ietf.org/html/rfc3492) untuk mengetahui punycode.
2. Jika awalan domain dimulai dengan "`0-`" dan berakhir dengan "`-0`", hapus awalan "`0-`" dan akhiran "-0".
3. Iterasi atau ulangi urutan output karakter dengan Langkah ke-2 sesuai urutan, masukkan jika ditemui. Saat Anda menemukan "`-`" (tanda hubung), lihat karakter berikutnya. Jika karakter berikutnya juga "`-`" (tanda hubung), lewati kedua karakter dari input dan masukkan satu "`-`" (tanda hubung). Jika karakter berikutnya adalah karakter lain apa pun, lewati "`-`" (tanda hubung) tunggal yang ada saat ini saja dan masukkan sebuah "`.`" (titik). Contohnya, `a--b-example-com` menjadi `a-b.example.com`.
4. Enkode hasil Langkah ke-3 dengan punycode. Kunjungi [RFC 3492](https://tools.ietf.org/html/rfc3492) untuk mengetahui punycode.

Hasil Langkah ke-4 akan menjadi Domain Penayang. Protokol tidak tersedia dari domain itu sendiri, namun `http` atau `https`. Port selalu menjadi default untuk protokol.

## Penanganan Eror & Pengalihan

Berikut ini adalah beberapa contoh tentang cara Cache AMP menangani pengalihan dan eror:

**Pengalihan**

Cache AMP mengikuti pengalihan saat menyelesaikan URL AMP. Sebagai contoh, jika URL mengalihkan ke URL AMP lain:

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

Maka Cache AMP akan menghasilkan konten pengalihan yang diselesaikan untuk URL asli.

Contoh: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html).

Penting: Jika Anda memindahkan lokasi berkas AMP di server Anda, pastikan bahwa Anda mengatur pengalihan dari lokasi lama ke yang baru.

**Tidak Ditemukan**

Saat sebuah halaman tidak ditemukan di Cache AMP, halaman eror akan tampil dan menghasilkan status 404.

Contoh: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**AMP yang Tidak Valid**

Jika sebuah halaman adalah AMP yang tidak valid, Cache AMP akan beralih ke halaman standar (kanonis).

Contoh: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**Eror di Server**

Jika sebuah URL menghasilkan eror server 5XX, Cache AMP akan menghasilkan status 404.

Contoh: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)
