---
"$title": Memuat PWA Anda sebelumnya dari halaman AMP Anda
"$order": '1'
description: Strategi yang bagus adalah membuat pintu masuk ke situs sebagai halaman AMP, lalu menyiapkan PWA di belakang layar dan beralih ....
formats:
- websites
author: pbakaus
---

Strategi yang bagus adalah membuat **pintu masuk ke situs sebagai halaman AMP**, lalu **menyiapkan PWA di belakang layar** dan beralih menggunakannya dalam perjalanan selanjutnya:

- Semua konten halaman “perincian” (leaf) (yang memiliki konten spesifik, bukan halaman ringkasan) dipublikasikan sebagai AMP untuk mendapatkan pengalaman pemuatan yang hampir seketika.
- AMP ini menggunakan elemen khusus AMP [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) untuk menyiapkan cache dan cangkang (shell) PWA saat pengguna sedang menikmati konten Anda.
- Saat pengguna mengeklik tautan lain di situs web Anda (contoh: pesan ajakan (CTA) di bagian bawah untuk pengalaman yang lebih mirip aplikasi), Pekerja Layanan (Service Worker) akan mencegat permintaan tersebut, mengambil alih halaman, dan memuat cangkang PWA.

Baca terus untuk mengetahui alasan dan cara menggunakan pola pengembangan ini.

## Meningkatkan perjalanan pengguna dengan menghubungkan ke PWA

### AMP untuk akuisisi pengguna awal

AMP adalah solusi yang ideal untuk sesuatu yang disebut **halaman perincian**, halaman konten yang ditemukan pengguna Anda secara organik melalui mesin pencari, tautan yang dibagikan oleh teman, atau melalui tautan di situs lain. Karena [praperenderan khusus](../../../about/how-amp-works.html) AMP, halaman AMP dapat dimuat dengan sangat cepat, sehingga jumlah pengguna yang berpaling menjadi lebih sedikit ([studi DoubleClick](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) terbaru menunjukkan bahwa **lebih dari 53% dari semua pengguna akan berpaling setelah 3 detik**).

### PWA untuk keterlibatan dan interaktivitas yang kaya

Di sisi lain, Aplikasi Web Progresif memungkinkan interaktivitas dan keterlibatan yang lebih besar, tetapi tidak memiliki *karakteristik pemuatan pertama yang seketika* untuk halaman AMP. Esensinya adalah teknologi yang disebut Pekerja Layanan (Service Worker), proksi sisi klien yang memungkinkan Anda menyimpan segala jenis aset halaman Anda dalam cache, tetapi Pekerja Layanan hanya aktif *setelah* pemuatan pertama.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='Pro dan kontra AMP vs. PWA.') }}

## Menyiapkan PWA dengan `amp-install-serviceworker`

AMP memiliki kemampuan untuk menginstal Pekerja Layanan Aplikasi Web Progresif Anda dari dalam sebuah halaman AMP – ya, meskipun halaman AMP tersebut ditayangkan dari Cache AMP. Jika dilakukan dengan benar, tautan yang mengarah ke PWA (dari salah satu halaman AMP Anda) akan terasa hampir seketika, mirip dengan saat pertama kali membuka halaman AMP.

[tip type="tip"] **KIAT –** Jika Anda belum terbiasa dengan Layanan Pekerja, sebaiknya buka [kursus Udacity](https://www.udacity.com/course/offline-web-applications--ud899) yang disampaikan oleh Jake Archibald. [/tip]

Pertama-tama, instal Pekerja Layanan di semua Halaman AMP Anda dengan menggunakan [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), dengan terlebih dahulu menyertakan komponen melalui skripnya di `<head>` halaman Anda:

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

Kemudian, tambahkan komponen berikut ini di tempat lain dalam `<body>` Anda (ubah agar mengarah ke Pekerja Layanan Anda yang sebenarnya):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Terakhir, pada langkah penginstalan Pekerja Layanan, simpan sumber daya yang akan dibutuhkan oleh PWA di dalam cache:

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

[tip type="tip"] **KIAT –** Ada cara yang lebih mudah untuk menangani Layanan Pekerja (Service Worker). Kunjungi [perpustakaan bantuan Layanan Pekerja](https://github.com/GoogleChrome/sw-helpers). [/tip]

## Membuat semua tautan di Halaman AMP menuju ke PWA

Sebagian besar tautan di halaman AMP Anda kemungkinan mengarah ke lebih banyak halaman konten. Ada dua strategi untuk memastikan bahwa klik tautan berikutnya akan menghasilkan "peningkatan" pada Aplikasi Web Progresif, [bergantung pada cara Anda menggunakan AMP](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md):

### 1. Jika Anda menyandingkan halaman kanonis Anda dengan halaman AMP

Pada kasus ini, Anda memiliki situs web kanonis (non-AMP) dan membuat halaman AMP yang ditautkan ke halaman kanonis tersebut. Ini adalah cara penggunaan AMP yang paling umum saat ini, yang berarti tautan di halaman AMP kemungkinan akan ditautkan ke versi kanonis situs Anda. **Kabar baik: jika situs kanonis Anda adalah PWA, berarti Anda sudah siap**.

### 2. Jika situs kanonis Anda adalah AMP

Dalam hal ini, halaman kanonis Anda *memang* halaman AMP: Anda membuat seluruh situs web dengan AMP, dan hanya menggunakan AMP sebagai perpustakaan (fakta yang menarik: situs yang sedang Anda buka ini dibuat dengan cara ini). **Dalam skenario ini, sebagian besar tautan di halaman AMP Anda akan mengarah ke halaman AMP lain.**

Kini Anda dapat menerapkan PWA di jalur terpisah, seperti `your-domain.com/pwa` dan menggunakan Pekerja Layanan yang telah berjalan untuk **mencegat navigasi browser saat seseorang mengeklik tautan di Halaman AMP**:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
      event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

Yang menarik dari teknik ini adalah Anda kini menggunakan peningkatan progresif untuk beralih dari AMP ke PWA. Namun, ini juga berarti bahwa browser yang belum mendukung Pekerja Layanan tetap akan beralih dari AMP ke AMP dan tidak akan pernah mengarah ke PWA.

AMP memecahkan masalah ini dengan sesuatu yang disebut [penulisan ulang URL cangkang](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite) (shell). Dengan menambahkan pola URL fallback ke tag [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), Anda memerintahkan AMP untuk menulis ulang semua tautan yang cocok pada halaman tertentu untuk membuka URL cangkang lain yang lama, jika tidak ada dukungan pekerja layanan yang terdeteksi:

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

Ketika semua atribut ini diterapkan, semua klik berikutnya di AMP akan mengarah ke PWA Anda, terlepas dari pekerja layanan apa pun.

[tip type = "read-on"] **BACA –** Anda sudah sejauh ini – mengapa tidak menggunakan kembali halaman AMP Anda yang sudah ada untuk membuat PWA? [Begini caranya](amp-in-pwa.md). [/tip]
