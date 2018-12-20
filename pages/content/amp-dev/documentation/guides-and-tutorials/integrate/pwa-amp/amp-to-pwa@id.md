---
$title: Memuat Progressive Web App di awal dari halaman AMP
---
[TOC]

Strategi yang baik adalah membuat **pintu masuk ke situs sebagai halaman AMP**, kemudian **menyiapkan PWA di belakang layar** dan beralih ke PWA untuk perjalanan selanjutnya:

* Semua konten halaman “rincian” (yang memiliki konten spesifik, bukan halaman ringkasan) dipublikasikan sebagai AMP untuk mendapatkan pengalaman pemuatan yang hampir instan.
* AMP ini menggunakan elemen khusus AMP [`<amp-install-serviceworker>`](/id/docs/reference/components/amp-install-serviceworker.html) untuk menyiapkan cache dan shell PWA saat pengguna sedang membuka konten.
* Saat pengguna mengklik link lain di situs Anda (misalnya, pesan ajakan (CTA) di bagian bawah untuk pengalaman yang lebih mirip aplikasi), Service Worker akan mencegat permintaan, mengambil alih halaman, dan memuat shell PWA.

Baca terus untuk mengetahui alasan dan cara menggunakan pola pengembangan ini.


## Meningkatkan perjalanan pengguna dengan menghubungkan ke PWA

### AMP untuk akuisisi pengguna awal

AMP adalah solusi yang ideal untuk sesuatu yang disebut **halaman rincian**, halaman konten yang ditemukan pengguna Anda secara organik melalui mesin telusur, link yang dibagikan oleh teman, atau melalui link di situs lain. Karena [prarender khusus](/id/learn/about-how/) AMP, halaman dapat dimuat sangat cepat, sehingga jumlah pengguna yang berpaling menjadi lebih sedikit ([studi DoubleClick](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) terbaru menunjukkan bahwa **lebih dari 53% dari semua pengguna akan berpaling setelah 3 detik**).

### PWA untuk engagement dan interaktivitas yang kaya

Di sisi lain, Progressive Web App memungkinkan interaktivitas dan engagement yang lebih besar, tetapi tidak memiliki *karakteristik pemuatan pertama yang instan* untuk halaman AMP. Esensinya adalah teknologi yang disebut Service Worker, proxy sisi klien yang memungkinkan Anda menyimpan segala jenis aset halaman Anda dalam cache, tetapi Service Worker hanya aktif *setelah* pemuatan pertama.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='Pro dan kontra AMP vs. PWA.') }}

## Menyiapkan PWA dengan `amp-install-serviceworker`

AMP memiliki kemampuan untuk menginstal Service Worker Progressive Web App Anda dari dalam halaman AMP – ya, meskipun halaman AMP tersebut ditayangkan dari Cache AMP. Jika dilakukan dengan benar, link yang mengarah ke PWA (dari salah satu halaman AMP Anda) akan terasa hampir instan, mirip dengan saat pertama kali membuka halaman AMP.

Tip: Jika Anda belum terbiasa dengan Service Worker, sebaiknya buka [kursus Udacity](https://www.udacity.com/course/offline-web-applications--ud899) yang disampaikan oleh Jake Archibald.

Pertama-tama, instal Service Worker di semua Halaman AMP Anda menggunakan [`<amp-install-serviceworker>`](/id/docs/reference/components/amp-install-serviceworker.html), dengan terlebih dahulu menyertakan komponen melalui skripnya di `<head>` halaman Anda:

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

Kemudian, tambahkan komponen berikut di tempat lain dalam `<body>` (ubah agar mengarah ke Service Worker sebenarnya):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Terakhir, di langkah penginstalan Service Worker, simpan resource yang akan dibutuhkan oleh PWA dalam cache:

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
[/sourcecode]

Tip: Terdapat cara yang lebih mudah untuk menangani Service Worker. Lihat [library bantuan Service Worker](https://github.com/GoogleChrome/sw-helpers).

## Membuat semua link di Halaman AMP menuju ke PWA

<<<<<<< HEAD
Sebagian besar link di halaman AMP Anda kemungkinan mengarah ke lebih banyak halaman konten. Ada 2 strategi untuk memastikan bahwa klik link berikutnya akan menghasilkan "upgrade" ke Progressive Web App, [bergantung pada cara Anda menggunakan AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}}):
=======
Sebagian besar link di halaman AMP Anda kemungkinan mengarah ke lebih banyak halaman konten. Ada 2 strategi untuk memastikan bahwa klik link berikutnya akan menghasilkan "upgrade" ke Progressive Web App, [bergantung pada cara Anda menggunakan AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}}):
>>>>>>> 3aeec0a67c667957f9f54faf118da91faf46313f

### 1. Jika Anda menyambungkan halaman kanonis dengan halaman AMP

Pada kasus ini, Anda memiliki situs kanonis (bukan AMP) dan membuat halaman AMP yang ditautkan ke halaman kanonis tersebut. Ini adalah cara penggunaan AMP yang paling umum saat ini, yang berarti link di halaman AMP kemungkinan akan ditautkan ke versi kanonis situs Anda. **Berita baiknya: jika situs kanonis Anda adalah PWA, berarti Anda sudah siap**.

### 2. Jika situs kanonis adalah AMP

Dalam hal ini, halaman kanonis Anda *memang* halaman AMP: Anda membuat seluruh situs dengan AMP, dan hanya menggunakan AMP sebagai library (fakta yang menarik: situs yang sedang Anda buka ini dibuat dengan cara ini). **Pada skenario ini, sebagian besar link di halaman AMP Anda akan mengarah ke halaman AMP lain.**

Kini Anda dapat menerapkan PWA di jalur terpisah, seperti `your-domain.com/pwa` dan menggunakan Service Worker yang telah berjalan untuk **mencegat navigasi browser saat seseorang mengklik link di Halaman AMP**:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
      event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

Yang menarik dari teknik ini adalah Anda kini menggunakan progressive enhancement untuk beralih dari AMP ke PWA. Namun, ini juga berarti bahwa browser yang belum mendukung Service Worker tetap akan beralih dari AMP ke AMP dan tidak akan pernah mengarah ke PWA.

AMP memecahkan masalah ini dengan sesuatu yang disebut [penulisan ulang URL shell](/id/docs/reference/components/amp-install-serviceworker.html#shell-url-rewrite). Dengan menambahkan pola URL fallback ke tag [`<amp-install-serviceworker>`](/id/docs/reference/components/amp-install-serviceworker.html), Anda memerintahkan AMP untuk menulis ulang semua link yang cocok pada halaman tertentu untuk membuka URL shell lain yang lama, jika tidak ada dukungan Service Worker yang terdeteksi:

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

Ketika semua atribut ini diterapkan, semua klik berikutnya di AMP akan mengarah ke PWA Anda, terlepas dari Service Worker apa pun.

Baca lebih lanjut: Anda sudah sampai sejauh ini – mengapa tidak menggunakan kembali halaman AMP Anda yang sudah ada untuk membuat PWA? [Berikut caranya](/id/docs/integration/pwa-amp/amp-in-pwa.html).
