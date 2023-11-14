---
'$title': Mengubah situs AMP Anda menjadi PWA
$order: 10
description: Dengan menyimpan sumber daya di cache di dalam browser, sebuah PWA mampu menyediakan data, aset, dan halaman offline kepada pengguna agar mereka tetap terlibat dan mendapatkan informasi.
tutorial: 'true'
formats:
  - websites
author: crystalonscript
---

Aplikasi Web Progresif (PWA) memanfaatkan kekuatan [pekerja layanan](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) untuk mengaktifkan kemampuan offline dan pengalaman pengguna yang konsisten di berbagai keunggulan jaringan. Dengan menyimpan sumber daya di cache di dalam browser, sebuah PWA mampu menyediakan data, aset, dan halaman offline kepada pengguna agar mereka tetap terlibat dan mendapatkan informasi.

Tutorial ini akan mengajari Anda cara mengubah situs AMP menjadi PWA yang dapat diinstal dengan kemampuan offline dengan menambahkan Manifes Web dan Pekerja Layanan yang didukung oleh Pekerja Layanan AMP.

# Mengunduh dan menjalankan kode starter

Unduh [kode starter di sini](/static/files/tutorials/amptopwa.zip).

Gunakan server web lokal untuk melihat pratinjau situs web tersebut.

[tip type="default"] **KIAT –** Agar server web cepat, jalankan `python -m SimpleHTTPServer`. [/tip]

Anda akan dapat melihat halaman landing untuk Lyrical Lightning, festival Mobile Music Magic. Ada satu tautan di halaman awal untuk melihat jadwal dan di panggung mana band berada.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

Pengguna situs kita mungkin mempunyai koneksi yang tidak konsisten saat acara saat kemungkinan besar mereka ingin mengakses jadwal. Ini menjadi kandidat yang sangat bagus untuk diubah menjadi PWA yang dapat diinstal di layar utama pengguna kita, dan menyediakan semua fungsionalitas penting, bahkan saat offline.

# Membuat Manifes Aplikasi Web

[Manifes aplikasi web](https://developers.google.com/web/fundamentals/web-app-manifest/) adalah sebuah berkas JSON sederhana yang memberi tahu browser tentang aplikasi web Anda dan bagaimana perilaku yang seharusnya saat “diinstal” pada perangkat seluler atau desktop pengguna. Memiliki sebuah manifes diperlukan oleh banyak browser untuk memperlihatkan perintah [Menambahkan ke Layar Utama](https://developers.google.com/web/fundamentals/app-install-banners/).

Tambahkan sebuah berkas berjudul `manifest.json` ke repositori Anda dengan mengikuti kode berikut ini:

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# Menambahkan Pekerja Layanan AMP

Sebuah pekerja layanan adalah skrip yang dijalankan browser Anda di latar belakang, terpisah dari halaman web, yang memperluas fitur-fitur browser dengan menyimpan permintaan di cache untuk meningkatkan kinerja dan menyediakan fungsionalitas offline. Membangun pekerja layanan dari nol dapat dilakukan, namun memakan waktu. Perpustakaan, seperti Workbox, bisa membantu, tetapi AMP selangkah lebih maju dengan menawarkan [Pekerja Layanan AMP](https://github.com/ampproject/amp-sw), dalam hal ini AMP mengotomatiskan banyak langkah secara langsung, termasuk penyimpanan Skrip AMP, aset, dan dokumen di cache serta menerapkan praktik terbaik yang sudah umum, seperti [pramuat navigasi](https://developers.google.com/web/updates/2017/02/navigation-preload).

Pekerja Layanan AMP secara otomatis [menyimpan skrip AMP di cache](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching) dan [dokumen](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) saat pengguna memintanya, setelah menginstalnya. Kita akan memulai dengan menambahkan Pekerja Layanan AMP dasar.

## Membuat berkas pekerja layanan

Buat sebuah berkas bernama `sw.js`, lalu tambahkan kode berikut ini:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

Dengan hanya dua baris kode, ini mengimpor Pekerja Layanan AMP ke dalam Pekerja Layanan Anda dan memicunya.

## Menginstal pekerja layanan Anda secara otomatis di halaman AMP Anda

Situs web AMP menggunakan komponen [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) untuk menginstal pekerja layanan di latar belakang browser, sementara pengguna menikmati konten Anda.

Tempatkan tag skrip yang diperlukan di tajuk `index.html` dan elemen `<amp-install-serviceworker>` di dalam `<body>`:

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **Penting –** Pekerja layanan harus disajikan dari direktori root (`/sw.js`) agar dapat menyimpan semua konten situs Anda di cache. [/tip]

`<amp-install-serviceworker>` menginstal pekerja layanan dengan membuat iframe dan menjalankan berkas `data-iframe-src`. Buat berkas `install-sw.html` dan tambahkan kode berikut ini:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

Iframe mendaftarkan berkas Pekerja Layanan AMP ke dalam browser.

# Menyesuaikan apa yang telah disimpan di cache

Pekerja Layanan AMP dilengkapi dengan keuntungan bawaan dan menyediakan bidang-bidang opsional yang dapat Anda konfigurasi untuk dioptimalkan sesuai dengan kebutuhan aplikasi Anda.

Aplikasi festival musik kami akan menyimpan aset gambar kami di cache, mengambil tautan barisan, dan menentukan sebuah halaman offline.

## Menyimpan Aset di Cache

Anda dapat mengonfigurasi Pekerja Layanan AMP untuk [menyimpan aset di cache](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching), seperti gambar, video, dan font. Kita akan menggunakannya untuk menyimpan gambar dan logo AMP di cache. Buka berkas `sw.js` dan perbarui sesuai kode di bawah ini:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

Kita sudah menentukan bahwa strategi penyimpan di cache adalah [cache sebagai prioritas (cache first)](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network). Ini berarti, aplikasi akan mencoba menyajikan gambar dari cache terlebih dahulu sebelum meminta apa pun dari jaringan. Hal ini khususnya berguna bagi aplikasi ini karena kita tidak akan memperbarui gambar latar belakang atau logo AMP kita.

## Mengambil Tautan Sebelumnya

Pekerja Layanan AMP sebelumnya telah mengambil tautan yang mempunyai atribut `data-rel=prefetch`. Ini memungkinkan pengguna untuk melihat halaman saat offline, bahkan jika mereka belum pernah berkunjung sebelumnya. Kita akan menambahkan atribut ke tag tautan kita untuk `lineup.html`.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# Memperlihatkan halaman yang offline

Untuk mengatasi kasus yang tidak terduga atau klik pada tautan ke halaman yang tidak kita ambil sebelumnya atau belum disiapkan, kita akan menambahkan sebuah halaman offline untuk menawarkan pengalaman pengguna yang “berpusat pada merek”, yang berbeda dengan memperlihatkan halaman offline browser umum. Unduh <a><code>offline.html</code> di sini</a> dan perbarui <code>sw.js</code> sesuai dengan kode berikut ini:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# Menguji PWA Anda

Anda dapat menguji apakah Pekerja Layanan AMP menyimpan aset yang diperlukan di cache dan menyediakan solusi offline yang ideal melalui [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps).

Kita akan menguji Lyrical Lightning dengan membuka panel DevTools dengan menekan `Ctrl + Shift + I` pada Windows atau `Cmd + Opt + I` pada Mac. Anda juga dapat mengeklik kanan pada halaman dan memilih `inspect` dari menu. Lalu, pilih `Application` untuk melihat pendaftaran pekerja layanan Anda.

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

Klik kotak `offline` untuk beralih ke mode offline. Klik tautan `see full lineup` dan bernavigasi ke `offline.html` untuk memeriksa apakah mereka telah disimpan di cache dengan baik dan telah diambil sebelumnya.

[tip type="default"] **Kiat –** Untuk memperoleh analisis mendalam tentang fitur-fitur Aplikasi Web Progresif, jalankan [alat Google Lighhouse tool](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool) untuk membuat laporan. [/tip]

# Selamat!

Anda telah berhasil membuat PWA dengan AMP! Di dalam tutorial ini Anda telah belajar untuk:

- Membuat [Manifes Aplikasi Web](https://developers.google.com/web/fundamentals/web-app-manifest/)
- Menginstal Pekerja Layanan di AMP dengan menggunakan [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)
- Menyesuaikan [Pekerja Layanan AMP ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)
- [Mengambil Tautan Sebelumnya](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- Membuat sebuah halaman offline

Bacalah lebih lanjut tentang [Pekerja Layanan](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) dan [pertimbangan UX offline](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux). Pelajari cara [melacak keterlibatan dengan analitis ](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html)dan ikuti tutorial tentang [cara mengonfigurasi analitis dasar untuk halaman AMP Anda](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html).
