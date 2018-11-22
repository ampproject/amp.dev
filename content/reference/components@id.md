---
$title: Komponen
---

[TOC]

Library HTML AMP menyediakan komponen yang dikelompokkan sebagai:

- **terpasang**: Komponen yang disertakan dalam library pokok, seperti `amp-img` dan `amp-pixel`.
- **diperluas**: Ekstensi untuk library pokok yang harus disertakan secara eksplisit dalam dokumen sebagai elemen kustom (misalnya `<script async custom-element="amp-audio" ...`).
- **[eksperimental](experimental.html)**: Komponen yang dirilis namun belum siap untuk penggunaan luas.

Daftar komponen yang tersedia dicantumkan di bawah ini sesuai kategorinya.

### Iklan dan analisis

| Komponen | Deskripsi |
| --------- | ----------- |
| [`amp-ad`](components/amp-ad.html) | Penampung untuk menampilkan iklan. |
| [`amp-ad-exit`](components/amp-ad-exit.html) | Menyediakan perilaku yang dapat dikonfigurasi untuk keluarnya iklan bagi A4A (AMP untuk Iklan).|
| [`amp-analytics`](components/amp-analytics.html) | Menangkap data analisis dari dokumen AMP. |
| [`amp-auto-ads`](components/amp-auto-ads.html) | Memasukkan iklan secara dinamis ke halaman AMP dengan menggunakan file konfigurasi yang ditayangkan secara jarak jauh. |
| [`amp-call-tracking`](components/amp-call-tracking.html) |  Mengganti nomor ponsel secara dinamis di hyperlink untuk mengaktifkan pelacakan panggilan. |
| [`amp-experiment`](components/amp-experiment.html) | Dapat digunakan untuk melakukan eksperimen pengalaman pengguna pada dokumen AMP. |
| [`amp-pixel`](components/amp-pixel.html) | Piksel pelacakan untuk menghitung jumlah kunjungan halaman. |
| [`amp-sticky-ad`](components/amp-sticky-ad.html) | Menyediakan cara untuk menampilkan dan meletakkan konten iklan di bagian bawah halaman.|

### Konten dinamis

| Komponen | Deskripsi |
| --------- | ----------- |
| [`amp-access-laterpay`](components/amp-access-laterpay.html) | Memungkinkan penayang mudah berintegrasi dengan platform pembayaran mikro [LaterPay](https://www.laterpay.net/).
| [`amp-access`](components/amp-access.html) | Menyediakan dukungan langganan dan paywall AMP.  |
| [`amp-bind`](components/amp-bind.html) | Memungkinkan elemen untuk bermutasi dalam respons terhadap tindakan pengguna atau perubahan data melalui pengikatan data dan ekspresi sederhana yang berbentuk seperti JS. |
| [`amp-byside-content`](components/amp-byside-content.html) | Menampilkan konten dinamis dari [layanan BySide](http://www.byside.com/). |
| [`amp-consent`](components/amp-consent.html) | Memberikan kemampuan untuk mengumpulkan dan menyimpan persetujuan pengguna melalui kontrol UI. |
| [`amp-date-picker`](components/amp-date-picker.html) | Menyediakan widget kalender untuk memilih tanggal. |
| [`amp-form`](components/amp-form.html) | Menyediakan dukungan formulir. |
| [`amp-geo`](components/amp-geo.html) | Menyediakan antarmuka geolokasi tingkat negara secara perkiraan. |
| [`amp-gist`](components/amp-gist.html) | Menampilkan [GitHub Gist](https://gist.github.com/). |
| [`amp-install-serviceworker`](components/amp-install-serviceworker.html) | Menginstal ServiceWorker. |
| [`amp-list`](components/amp-list.html) | Mendownload data dan membuat item daftar secara dinamis menggunakan template. |
| [`amp-live-list`](components/amp-live-list.html) | Menyediakan cara untuk menampilkan dan mengupdate konten secara langsung. |
| [`amp-mustache`](components/amp-mustache.html) | Memungkinkan rendering template [`Mustache.js`](https://github.com/janl/mustache.js/). |
| [`amp-next-page`](components/amp-next-page.html) | Secara dinamis memuat lebih banyak dokumen yang direkomendasikan untuk pengguna. |
| [`amp-selector`](components/amp-selector.html) |  Mewakili kontrol yang menampilkan menu opsi dan memungkinkan pengguna memilih dari menu tersebut. |
| [`amp-user-notification`](components/amp-user-notification.html) | Menampilkan notifikasi yang dapat ditutup kepada pengguna. |
| [`amp-web-push`](components/amp-web-push.html) | Memungkinkan pengguna untuk berlangganan ke [notifikasi push web](https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/). |

### Tata Letak

| Komponen | Deskripsi |
| --------- | ----------- |
| [`amp-accordion`](components/amp-accordion.html) | Menyediakan cara bagi pengunjung untuk melihat sekilas garis besar konten dan meloncat ke bagian yang mereka inginkan. |
| [`amp-app-banner`](components/amp-app-banner.html) | Pembungkus serta UI minimal untuk banner dengan posisi tetap dan lintas platform yang menampilkan pesan ajakan untuk menginstal aplikasi. |
| [`amp-carousel`](components/amp-carousel.html) | Menampilkan beberapa konten serupa secara bergantian sepanjang sumbu horizontal. |
| [`amp-fx-flying-carpet`](components/amp-fx-flying-carpet.html) | Membungkus turunan dalam penampung unik yang dapat di-scroll di layar penuh, yang memungkinkan Anda menampilkan iklan layar penuh tanpa memenuhi ruang di seluruh viewport. |
| [`amp-fx-collection`](components/amp-fx-collection.html) | Menyediakan kumpulan efek visual bawaan, seperti paralaks. |
| [`amp-iframe`](components/amp-iframe.html) | Menampilkan iframe. |
| [`amp-image-lightbox`](components/amp-image-lightbox.html) | Menyediakan efek lightbox untuk gambar yang ditentukan. |
| [`amp-layout`](components/amp-layout.html) | Menyediakan elemen penampung serbaguna generik yang menghadirkan [tata letak] (/docs/design/responsive/control_layout.html#the-layout-attribute) AMP yang canggih ke semua elemen. |
| [`amp-lightbox`](components/amp-lightbox.html) | Menampilkan elemen dalam modal "lightbox" viewport penuh. |
| [`amp-lightbox-gallery`](components/amp-lightbox-gallery.html) | Memberikan pengalaman "lightbox". Setelah ada interaksi dari pengguna, komponen UI diperluas untuk mengisi viewport sampai ditutup oleh pengguna. |
| [`amp-position-observer`](components/amp-position-observer.html) | Memantau posisi elemen dalam viewport sembari pengguna scroll dan mengirim acara yang dapat digunakan dengan komponen lainnya. |
| [`amp-sidebar`](components/amp-sidebar.html) | Menyediakan cara untuk menampilkan konten meta yang dimaksudkan untuk akses sementara seperti navigasi, link, tombol, dan menu. |


### Media

| Komponen | Deskripsi |
| --------- | ----------- |
| [`amp-3d-gltf`](components/amp-3d-gltf.html) | Menampilkan model 3D GL Transmission Format (gITF). |
| [`amp-3q-player`](components/amp-3q-player.html) | Menyematkan video dari [3Q SDN.](https://www.3qsdn.com) |
| [`amp-anim`](components/amp-anim.html) | Mengelola gambar animasi, biasanya berupa GIF. |
| [`amp-apester-media`](components/amp-apester-media.html) | Menampilkan unit canggih [Apester](https://apester.com/). |
| [`amp-audio`](components/amp-audio.html) | Mengganti tag `audio` HTML5. |
| [`amp-bodymovin-animation`](components/amp-bodymovin-animation.html) | Menampilkan [pemutar animasi AirBnB Bodymovin](http://airbnb.io/lottie/), yang merender animasi dari JSON yang dihasilkan oleh [Adobe After Effects](https://www.adobe.com/products/aftereffects.html). |
| [`amp-brid-player`](components/amp-brid-player.html) | Menampilkan pemutar [Brid.tv](https://www.brid.tv/). |
| [`amp-brightcove`](components/amp-brightcove.html) | Menampilkan pemutar [Video Cloud](https://www.brightcove.com/en/online-video-platform) atau [Perform](https://www.brightcove.com/en/perform) Brightcove. |
| [`amp-dailymotion`](components/amp-dailymotion.html) | Menampilkan video [Dailymotion](https://www.dailymotion.com). |
| [`amp-google-vrview-image`](components/amp-google-vrview-image.html) | Menampilkan gambar VR. |
| [`amp-hulu`](components/amp-hulu.html) | Menampilkan video [Hulu](http://www.hulu.com/) yang disematkan secara sederhana. |
| [`amp-ima-video`](components/amp-ima-video.html) | Menyematkan pemutar video untuk iklan video instream yang terintegrasi dengan [IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/). |
| [`amp-img`](components/amp-img.html) | Mengganti tag `img` HTML5. |
| [`amp-imgur`](components/amp-imgur.html)  | Menampilkan postingan [Imgur](http://imgur.com/). |
| [`amp-izlesene`](components/amp-izlesene.html)  | Menampilkan video [Izlesene](https://www.izlesene.com/). |
| [`amp-jwplayer`](components/amp-jwplayer.html) | Menampilkan [JW Player](https://www.jwplayer.com/) yang dihosting oleh cloud. |
| [`amp-kaltura-player`](components/amp-kaltura-player.html) | Menampilkan Kaltura Player sebagaimana yang digunakan di [Platform Video Kaltura](https://corp.kaltura.com/). |
| [`amp-nexxtv-player`](components/amp-nexxtv-player.html) | Menampilkan streaming media dari platform nexxOMNIA. |
| [`amp-o2-player`](components/amp-o2-player.html) | Menampilkan [AOL O2Player](http://on.aol.com/). |
| [`amp-ooyala-player`](components/amp-ooyala-player.html) |  Menampilkan video [Ooyala](https://www.ooyala.com/). |
| [`amp-playbuzz`](components/amp-playbuzz.html) |  Menampilkan konten [Playbuzz](http://www.playbuzz.com/) (misalnya, daftar, polling, dll.). |
| [`amp-reach-player`](components/amp-reach-player.html) | Menampilkan pemutar video [Beachfront Reach](https://beachfrontreach.com/). |
| [`amp-soundcloud`](components/amp-soundcloud.html) | Menampilkan klip [Soundcloud](https://soundcloud.com/). |
| [`amp-springboard-player`](components/amp-springboard-player.html) | Menampilkan pemutar video [Platform Springboard](http://publishers.springboardplatform.com/users/login). |
| [`amp-video`](components/amp-video.html) | Mengganti tag `video` HTML5. |
| [`amp-vimeo`](components/amp-vimeo.html) | Menampilkan video [Vimeo](https://vimeo.com/). |
| [`amp-wistia-player`](components/amp-wistia-player.html) | Menampilkan video [Wistia](https://wistia.com/). |
| [`amp-youtube`](components/amp-youtube.html) | Menampilkan video [YouTube](https://www.youtube.com/). |

### Presentasi

| Komponen | Deskripsi |
| --------- | ----------- |
| [`amp-animation`](components/amp-animation.html) | Menentukan dan menampilkan animasi. |
| [`amp-dynamic-css-classes`](components/amp-dynamic-css-classes.html) | Menambahkan beberapa nama kelas CSS dinamis ke elemen HTML. |
| [`amp-fit-text`](components/amp-fit-text.html) | Meluaskan atau menciutkan ukuran font agar sesuai dengan konten dalam ruang yang diberikan. |
| [`amp-font`](components/amp-font.html) | Memicu dan memantau pemuatan font kustom. |
| [`amp-mathml`](components/amp-mathml.html) | Menampilkan [rumus MathML](https://www.w3.org/Math/). |
| [`amp-story`](components/amp-story.html) | Format bercerita visual yang kaya. |
| [`amp-timeago`](components/amp-timeago.html) | Menyediakan stempel waktu samar dengan memformat tanggal sebagai "*waktu lalu*" (misalnya, 3 jam lalu). |
| [`amp-viz-vega`](components/amp-viz-vega.html) | Menampilkan visualisasi yang dibuat menggunakan tata bahasa visualisasi [Vega](https://vega.github.io/vega/).|


### Sosial

| Komponen | Deskripsi |
| --------- | ----------- |
| [`amp-beopinion`](components/amp-beopinion.html) | Menyematkan konten [BeOpinion](https://beopinion.com/). |
| [`amp-addthis`](components/amp-addthis.html) | Menampilkan fitur situs [AddThis](https://www.addthis.com/) yang disematkan. |
| [`amp-facebook-comments`](components/amp-facebook-comments.html) | Menyematkan plugin komentar Facebook. |
| [`amp-facebook-like`](components/amp-facebook-like.html) | Menyematkan plugin tombol suka Facebook. |
| [`amp-facebook-page`](components/amp-facebook-page.html) | Menyematkan [plugin halaman Facebook](https://developers.facebook.com/docs/plugins/page-plugin). |
| [`amp-facebook`](components/amp-facebook.html) | Menampilkan video atau postingan Facebook. |
| [`amp-gfycat`](components/amp-gfycat.html) | Menampilkan GIF video [Gfycat](https://gfycat.com). |
| [`amp-instagram`](components/amp-instagram.html) | Menampilkan sematan Instagram. |
| [`amp-pinterest`](components/amp-pinterest.html) | Menampilkan tombol Pasang Pin atau widget Pinterest. |
| [`amp-reddit`](components/amp-reddit.html) |  Menampilkan sematan postingan atau komentar Reddit. |
| [`amp-riddle-quiz`](components/amp-riddle-quiz.html) | Menampilkan konten [Riddle](https://www.riddle.com/) (misalnya, kuis, daftar, polling, dll.). |
| [`amp-social-share`](components/amp-social-share.html) | Menampilkan tombol bagikan sosial. |
| [`amp-twitter`](components/amp-twitter.html) | Menampilkan tweet Twitter. |
| [`amp-vine`](components/amp-vine.html) | Menampilkan sematan sederhana Vine. |
| [`amp-vk`](components/amp-vk.html) | Menyematkan widget postingan atau polling [VK](https://vk.com/). |
 
