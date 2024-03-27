---
'$title': Mengoptimalkan halaman AMP Anda yang dikelola pihak lain (hosted)
$order: 7
description: Runtime AMP dioptimalkan untuk kecepatan dan jika halaman AMP Anda disajikan oleh sebuah cache AMP, halaman tersebut dioptimalkan sepenuhnya dan menawarkan kinerja pemuatan tertinggi ....
formats:
  - websites
  - stories
author: sebastianbenz
---

Panduan ini menyediakan kiat dan panduan untuk para webmaster (master web) tentang cara mengoptimalkan situs web AMP mereka yang dikelola pihak lain.

### Bukankah AMP distandarkan cepat?

Runtime AMP [dioptimalkan untuk kecepatan](../../../about/how-amp-works.html) dan jika halaman AMP Anda disajikan oleh sebuah [cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md), halaman tersebut dioptimalkan sepenuhnya dan menawarkan kinerja pemuatan tertinggi. Contohnya: jika pengguna Anda datang ke halaman AMP Anda dari Google Search di perangkat seluler, sebagai standar, halaman akan disajikan oleh cache AMP.

Namun, halaman AMP tidak selalu disajikan dari cache AMP. Sebuah situs web mungkin memutuskan untuk memperlihatkan halaman AMP dari servernya sendiri untuk sumber lalu lintas lain. Contoh penggunaan yang paling sering adalah situ yang dibuat sepenuhnya dalam AMP, seperti [tasty.co](https://tasty.co), di mana pengguna langsung ke situsnya. Sumber lalu lintas lain adalah Twitter, yang [memulai penautan ke halaman AMP](https://searchengineland.com/twitter-ramps-amp-278300), bukannya menyampaikan versi seluler standar. Ini berarti bahwa jika seorang pengguna mengeklik suatu tautan di salah satu dari aplikasi seluler Twitter, tautan tersebut membuka versi AMP halaman Anda di asal Anda sendiri (jika tersedia).

Sebagai konsekuensinya, Anda tidak selalu dapat memastikan bahwa halaman AMP Anda hanya disajikan dari cache AMP. Untuk kasus ini, di mana Anda menyajikan halaman AMP dari server Anda sendiri, penting untuk memastikan bahwa halaman AMP Anda menawarkan kinerja pemuatan yang optimal.

Halaman AMP distandarkan untuk memuat dengan cepat, tetapi ada beberapa pengoptimalan kinerja tambahan yang dapat Anda terapkan untuk membantu browser memuat halaman AMP jauh lebih cepat. Panduan ini menjelaskan beberapa pengoptimalan yang sebaiknya Anda pertimbangkan jika menayangkan halaman AMP. Namun, sebelum Anda mulai membaca panduan ini, pastikan bahwa Anda telah mencakup semua [praktik terbaik kinerja web dasar](#basic-optimizations). Secara khusus, pengoptimalan gambar mempunyai dampak besar pada kinerja pemuatan.

Contohnya, dengan menerapkan teknik-teknik pengoptimalan berikut ini:

- [Mengoptimalkan pemuatan Runtime AMP](#optimize-the-amp-runtime-loading)
- [Gambar hero yang dimuat sebelumnya](#preload-hero-images) (ukuran/pengodean gambar itu sendiri belum berubah)
- [Mengoptimalkan font kustom](#optimize-custom-fonts) (dalam hal ini, Google Font)

[Templat "The Scenic"](../../../documentation/templates/index.html) memuat [dua detik lebih cepat pada koneksi 3G](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0).

Jika Anda ingin melewati detailnya, kunjungi [penghasil Boilerplate AMP](/boilerplate), yang dapat Anda gunakan untuk menghasilkan halaman AMP yang dioptimalkan secara kustom.

### Mengoptimalkan pemuatan Runtime AMP <a name="optimize-the-amp-runtime-loading"></a>

Walaupun AMP sudah cukup ketat tentang markah mana yang diizinkan di bagian `<head>`, masih ada ruang untuk pengoptimalan. Kuncinya adalah untuk membuat struktur bagian `<head>` sedemikian rupa sehingga semua skrip pemblokir render/pemuatan dan font kustom dimuat secepat mungkin.

Berikut ini adalah urutan yang disarankan untuk bagian `<head>` di halaman AMP:

[sourcecode:html]

<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="This is the AMP Boilerplate.">
    <link rel="preload" as="script" href="https://ampjs.org/v0.js">
    <link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">
    <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
    <script async src="https://ampjs.org/v0.js"></script>
    <script async custom-element="amp-experiment" src="https://ampjs.org/v0/amp-experiment-0.1.js"></script>
    <!-- Import other AMP Extensions here -->
    <style amp-custom>
      /* Add your styles here */
    </style>
    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <link rel="canonical" href=".">
    <title>My AMP Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
[/sourcecode]

Mari kita bahas langkah demi langkah:

1. Tag pertama harus tag `meta charset`, diikuti oleh tag `meta` yang tersisa.

2. Selanjutnya, muat terlebih dahulu tag `v0.js` `<script>` runtime AMP dengan `<link as=script href=https://ampjs.org/v0.js rel=preload>`. Runtime AMP harus mulai mengunduh sesegera mungkin karena [boilerplate AMP](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) menyembunyikan dokumen melalui `body { visibility:hidden }` hingga runtime AMP telah dimuat. Memuat runtime AMP terlebih dahulu menjadi isyarat bagi browser untuk mengunduh skrip tersebut dengan prioritas yang lebih tinggi. Kunjungi [perenderan sisi server](#server-side-rendering) untuk belajar cara menghindari hal ini.

3. Jika halaman Anda menyertakan ekstensi penunda perenderan (cth., amp-experiment, amp-dynamic-css-classes, amp-story), muat terlebih dahulu ekstensi tersebut karena mereka dibutuhkan oleh runtime AMP untuk merender halaman.

[sourcecode:html]

<link as="script" rel="preload" href="https://ampjs.org/v0/amp-custom-css-0.1.js">
<link as="script" rel="preload" href="https://ampjs.org/v0/amp-experiment-0.1.js">
<link as="script" rel="preload" href="https://ampjs.org/v0/story-1.0.js">[/sourcecode]

1. Gunakan [preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/) untuk mempercepat koneksi ke asal lain di mana URL sumber daya lengkapnya tidak diketahui sebelumnya, contoh: saat menggunakan Google Fonts:

[sourcecode:html]<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>[/sourcecode]

1. Muat runtime AMP:

[sourcecode:html]<script async src="https://ampjs.org/v0.js"></script>[/sourcecode]

1. Tentukan tag `<script>` untuk [ekstensi penunda perenderan ](https://github.com/ampproject/amphtml/blob/main/src/render-delaying-services.js) (cth.: [`amp-experiment`](../../../documentation/components/reference/amp-experiment.md) [`amp-dynamic-css-classes`](../../../documentation/components/reference/amp-dynamic-css-classes.md), dan [`amp-story`](../../../documentation/components/reference/amp-story.md)).
2. Tentukan tag `<script>` untuk ekstensi yang tersisa (cth.: [`amp-bind`](../../../documentation/components/reference/amp-bind.md) ...). Ekstensi ini tidak menunda perenderan, dan oleh karena itu, tidak boleh dimuat sebelumnya karena dapat menghabiskan bandwidth penting untuk perenderan awal.
3. Tentukan gaya kustom apa pun dengan menggunakan tag `<style amp-custom>`.
4. Tambahkan tag lain yang diizinkan di bagian `<head>`. Secara khusus, font eksternal apa pun harus yang paling lama bertahan karena mereka menghalangi perenderan.
5. Terakhir, tentukan [kode boilerplate AMP](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md). Dengan memasukkan kode boilerplate terakhir, ini mencegah gaya kustom secara tidak sengaja menimpa aturan CSS boilerplate.

[tip] Cache AMP melakukan semua pengoptimalan ini secara otomatis (dan beberapa lagi). Anda dapat menggunakan alat Pengoptimal AMP untuk secara otomatis melakukan pengoptimalan ini di asal Anda sendiri. [/tip]

### Pramuat gambar hero <a name="preload-hero-images"></a>

[HTML AMP menggunakan elemen gambarnya sendiri: `amp-img`](../../../documentation/components/reference/amp-img.md). Sementara [`amp-img`](../../../documentation/components/reference/amp-img.md) mempunyai banyak keuntungan dibanding tag <code>img</code> HTML biasa, salah satu kerugiannya adalah runtime AMP harus dimuat sebelum pengunduhan gambar dapat dimulai. Bagi beberapa gambar, seperti gambar hero untuk halaman produk, sangat penting agar gambar dimuat secepat mungkin. Di dalam kasus ini, yang terbaik adalah memuat gambar sebelumnya untuk memastikan bahwa browser mulai mengunduh gambar sesegera mungkin dan tidak perlu menunggu hingga runtime AMP telah dimuat.

[sourcecode:html]

<head>
  <link rel="preload" href="/images/elephants.png" as="image">
</head>
<body>
  ...
  <amp-img width="404" height="720" layout="responsive"
           src="/images/elephants.png" alt="..." >
  </amp-img>
</body>
[/sourcecode]

Namun, bagaimana jika tata letak responsif Anda membutuhkan gambar hero yang berbeda sesuai dengan lebar layar? Contohnya: gambar lebar untuk desktop dan gambar sempit untuk seluler, seperti ini:

[sourcecode:html]
<amp-img width="404" height="720"
    alt="..." layout="responsive"
    src="/images/elephants_narrow.png"
    media="(max-width: 415px)">
</amp-img>
<amp-img height="720"
    alt="..." layout="fixed-height"
    src="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
</amp-img>
[/sourcecode]

Untungnya, `link rel=preload` juga mendukung kueri media. Jadi, kita dapat menggunakan kueri media yang sama di dalam pernyataan kita yang telah dimuat sebelumnya, seperti ini:

[sourcecode:html]

<link rel="preload" as="image"
    href="/images/elephants_narrow.png"
    media="(max-width: 415px)">
<link rel="preload" as="image"
    href="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
[/sourcecode]

Omong-omong, pendekatan yang sama berhasil untuk gambar poster [`amp-video`](../../../documentation/components/reference/amp-video.md):

[sourcecode:html]

<link rel="preload" href="/images/poster.jpg" as="image">
...
 <amp-video width="480" height="270" src="elephant.mp4"
             poster="/images/poster.jpg"
             layout="responsive">
     ...
</amp-video>
[/sourcecode]

Cukup pastikan untuk menempatkan pernyataan yang telah dimuat sebelumnya _setelah_ pernyataan viewport karena browser memerlukan dimensi viewport untuk menentukan lebar layar:

[sourcecode:html]

<meta name="viewport" content="width=device-width">
...
<link rel="preload" media="(max-width: 415px)" ...>
[/sourcecode]

[tip type="important"] Lakukan pemuatan sebelumnya untuk gambar penting saja, jika tidak, pengunduhan gambar dapat menguasai bandwidth yang diperlukan untuk pengunduhan penting lainnya. [/tip]

### Mempertimbangkan penggunaan pekerja layanan (service worker)

Karena semua [browser besar mendukung pekerja layanan](https://caniuse.com/#feat=serviceworkers), mengevaluasi apakah masuk akal untuk menambahkan pekerja layanan ke situs Anda merupakan ide yang bagus.

Ada dua pola arsitektural yang berbeda yang kita ketahui akan bekerja untuk navigasi yang cukup cepat:

- Untuk aplikasi halaman tunggal: model App Shell (di dalam konteks AMP disebut sebagai [AMP-dalam-PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)). Pola ini mengharuskan pekerja layanan untuk meningkatkan dokumen AMP ke pengalaman PWA berbasis shell aplikasi.
- Untuk aplikasi multi-halaman: [streaming sumber daya komposit](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses). Pekerja layanan menyimpan tajuk serta bagian kaki statis di cache dan menggunakan streaming untuk seketika menghasilkan tanggapan sebagian yang disimpan di cache sambil memuat konten.

Jika tidak ada dari pola ini yang digunakan dan mustahil untuk menyimpan seluruh situs di cache (hanya masuk akal untuk situs yang sangat kecil), sebuah pekerja layanan mungkin mempunyai [dampak kinerja negatif](https://developers.google.com/web/updates/2017/02/navigation-preload). Hal terbaik di dalam hal ini adalah untuk **tidak** menggunakan pekerja layanan.

Namun, jika Anda ingin situs web Anda [dapat diinstal dari layar utama](https://developers.google.com/web/fundamentals/app-install-banners/), atau ingin menawarkan pengalaman offline, Anda harus menggunakan pekerja layanan. Di dalam hal ini, penting untuk menggunakan [pramuat navigasi](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw) untuk mengurangi potensi pelambatan (Catatan: Saat ini, pramuat (preload) navigasi hanya didukung di Chrome).

Jika situs web AMP Anda menggunakan pekerja layanan, berikut ini adalah beberapa praktik terbaik:

- Simpan [runtime AMP](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime) dan ekstensi sebelumnya di cache (cth.: [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md)).
- Simpan sebelumnya di cache logo, font, dan konten statis lainnya yang paling digunakan di sebagian besar halaman Anda.
- Sajikan logo, font, dan gambar dengan menggunakan [strategi cache-first (cache terlebih dahulu)](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network).
- Sajikan ekstensi dan runtime AMP dengan menggunakan strategi [stale-while-revalidate (basi selagi validasi ulang)](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)[.](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)
- Saat menggunakan strategi jaringan terlebih dahulu untuk permintaan navigasi, pastikan untuk mengaktifkan [pramuat navigasi](https://developers.google.com/web/updates/2017/02/navigation-preload).

Jika Anda mencari cara untuk memulai dengan pekerja layanan di situs AMP Anda, lihat [sampel](https://www.google.com/url?q=https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449&sa=D&ust=1529413323498000&usg=AFQjCNE4fepX-hqVeRBW8df43uV5Bi4Llg) ini yang menyediakan pekerja layanan yang menerapkan semua praktik terbaik ini.

[tip type="note"] Runtime AMP disajikan dengan umur maksimal selama 50 menit untuk memastikan pembaruan tersedia dengan cepat. Untuk menghindari kemungkinan kegagalan cache browser, bagus jika menyajikan runtime AMP dari pekerja layanan. [/tip]

Menyimpan di cache sebelumnya tidak hanya relevan untuk beralih dari halaman AMP di cache ke halaman non-AMP di asal Anda sendiri, namun juga untuk beralih dari halaman AMP yang di cache ke halaman AMP di asal Anda sendiri. Alasannya adalah bahwa cache AMP menulis ulang URL runtime AMP dari URL abadi ke versi rilis terbaru, contohnya:

`https://ampjs.org/v0.js` -> `https://ampjs.org/rtv/001515617716922/v0.js`.

Konsekuensinya adalah bahwa halaman AMP yang disajikan dari asal Anda tidak mendapatkan keuntungan dari penyimpanan browser di cache, dan dalam hal ini harus mengunduh (tanpa versi) runtime AMP kembali. Dengan pekerja layanan, Anda dapat menyimpan runtime AMP tanpa versi sebelumnya di cache dan mempercepat transisi. Untuk mengetahui selengkapnya tentang mengapa cache AMP mempunyai versi URL runtime AMP, bacalah [dokumen ini](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer##versioned-amp-runtime).

[tip type="note"] Di Safari, ada perbedaan penting tentang cara pekerja layanan diterapkan -- di Safari mustahil menginstal pekerja layanan untuk asal Anda jika halaman tersebut disajikan dari sebuah cache AMP. [/tip]

### Mengoptimalkan font kustom <a name="optimize-custom-fonts"></a>

Dengan AMP, ada beberapa hal yang dapat Anda lakukan untuk mengoptimalkan pemuatan font Anda ([sebagian besar dari mereka sebenarnya tidak spesifik untuk AMP](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)):

- Jika mungkin, gunakan [font-display: opsional](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display): Ini hanya akan menggunakan font tersebut jika sudah ada di cache, dan kembali ke font sistem jika font kustom Anda belum dimuat.
- Optimalkan font web Anda (contohnya, sajikan font kustom dengan menggunakan WOFF2).
- Muat font kustom terlebih dahulu:

[sourcecode:html]

<link rel="preload" as="font" href="/bundles/app/fonts/helveticaneue-roman-webfont.woff2" >[/sourcecode]

- Jika Anda menggunakan Google Fonts, atau penyedia font lainnya dengan URL font yang tidak diketahui, sambungkan server font yang bersangkutan terlebih dahulu:

[sourcecode:html]

 <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
[/sourcecode]

Terakhir, namun tidak kalah penting, cobalah untuk meminimalkan jumlah font kustom yang Anda gunakan di halaman Anda. Jika bisa, gunakan font sistem sebagai ganti font kustom karena font sistem membuat situs web Anda cocok dengan sistem operasi pengguna, dan ini membantu menghindari memuat lebih banyak sumber daya.

### Tata Letak AMP Perenderan Sisi Server <a name="server-side-rendering"></a>

Tata Letak AMP perenderan sisi server merupakan suatu teknik yang digunakan cache AMP untuk semakin mempercepat waktu pemuatan. Dengan perenderan sisi server, boilerplate AMP dapat dihapus sehingga dokumen AMP dapat diwarnai tanpa menjalankan JavaScript runtime AMP. Contohnya: versi Penghasil Boilerplate AMP yang dirender sisi server <a>merender dua kali lebih cepat</a> dibanding versi AMP biasa!

Jika Anda menayangkan sebuah halaman AMP, Anda sebaiknya mempertimbangkan untuk menggunakan [Pengoptimal AMP](amp-optimizer-guide/index.md). Pengoptimal AMP membuat Anda bisa menyajikan halaman AMP yang telah dioptimalkan dari backend Anda sendiri yang menyertakan tata letak AMP perenderan sisi server. Pengoptimal AMP juga secara otomatis melakukan banyak pengoptimalan lain yang dijelaskan di dalam dokumen ini.

### Pengoptimalan dasar <a name="basic-optimizations"></a>

Tentu saja, semua dasar pengoptimalan kinerja web juga berlaku pada halaman AMP:

- [Mengoptimalkan gambar](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) dan video. Pengoptimalan gambar bisa berdampak besar pada kinerja pemuatan.
- [Kompres dan kecilkan CSS & HTML](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer). Karena semua CSS di halaman AMP sebaris, menguntungkan jika menggunakan sesuatu seperti [purifycss](https://github.com/purifycss/purifycss) untuk menyingkirkan CSS yang tidak digunakan.
- Menggunakan [Penyimpanan HTTP di Cache](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- ... dan masih banyak lagi
