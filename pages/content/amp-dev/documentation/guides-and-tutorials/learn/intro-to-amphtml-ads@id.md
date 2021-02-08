---
'$title': Pengantar untuk iklan HTML AMP
$order: 1
description: Iklan HTML AMP adalah cara yang lebih cepat, ringan, dan aman untuk beriklan di web. Meskipun halaman AMP mendukung iklan HTML tradisional, iklan ini bisa lambat dimuat.
formats:
  - ads
---

## Apa yang dimaksud dengan iklan HTML AMP?

Iklan HTML AMP adalah cara yang lebih cepat, ringan, dan aman untuk beriklan di web. Meskipun halaman AMP mendukung iklan HTML tradisional, iklan ini bisa dimuat dengan lambat. Agar iklan dapat dimuat secepat elemen lain di halaman AMP, Anda dapat membuat iklan dalam HTML AMP. Iklan HTML AMP hanya ditayangkan setelah divalidasi, untuk memastikan iklan sudah aman dan memiliki kinerja yang baik. Yang terpenting, iklan ini dapat ditayangkan di mana pun di internet, _bukan hanya di halaman AMP_.

Iklan HTML AMP ditulis dalam HTML AMP sesuai dengan [spesifikasi iklan HTML AMP](a4a_spec.md) (sebuah variasi HTML AMP + CSS). Ini berarti bahwa iklan tidak lagi dapat menjalankan JavaScript secara acak, yang secara tradisional menjadi penyebab utama kinerja iklan yang buruk. Oleh karena itu, seperti halnya AMP inti, contoh penggunaan JavaScript iklan inti dibuat langsung ke dalam project Sumber Terbuka AMP yang menjamin perilaku iklan yang baik.

### Keuntungan

Why are AMPHTML ads better than traditional ads?

1. **Lebih cepat**: Iklan HTML AMP lebih cepat karena iklan diminta sebelumnya dalam proses perenderan halaman, dan segera ditampilkan tepat sebelum pengguna akan melihat iklan. Ukuran berkas iklan HTML AMP yang lebih kecil juga meningkatkan kecepatan.
2. **Lebih ringan**: Iklan HTML AMP menggabungkan fungsi iklan yang biasa digunakan, yang dapat mengurangi ukuran berkas iklan. Setelah berada di halaman, iklan HTML AMP juga menggunakan lebih sedikit sumber daya. Misalnya, 10 pelacak pada iklan biasa akan meminta informasi mereka sendiri, namun iklan HTML AMP mengumpulkan semua data sekali dan mendistribusikannya ke sejumlah pelacak yang berminat.
3. **Terkoordinasi**: Di halaman AMP, [runtime AMP](spec/amphtml.md#amp-runtime) dapat mengoordinasi sumber daya yang terbatas di ponsel ke komponen yang tepat di waktu yang tepat, sehingga dapat memberikan pengalaman yang terbaik bagi pengguna. Misalnya, iklan HTML AMP dengan animasi dijeda saat iklan tidak berada di viewport saat ini.
4. **Lebih Menarik**: Pengguna tidak dapat berinteraksi dengan iklan yang tidak dapat dilihat. Iklan yang lebih cepat mendorong keterlihatan yang lebih tinggi, yang kemudian membuat rasio klik-tayang jadi lebih tinggi, sehingga akan menghasilkan kinerja iklan yang lebih baik.
5. **Aman dari Malware**: Penyebaran malware dengan iklan HTML AMP tidak akan dapat dilakukan karena iklan telah diverifikasi sebelum ditayangkan. Karena itulah, pengiklan dapat memastikan pengalaman pengguna yang aman dan memberikan persepsi merek yang positif.
6. **Lebih Fleksibel**: Iklan HTML AMP dirancang agar berfungsi pada halaman AMP dan non-AMP, serta pada jenis perangkat apa pun.

### Format

Iklan HTML AMP bersifat fleksibel dan dinamis, sehingga memungkinkan banyak format kreatif, beberapa di antaranya seperti korsel, parallax, dan lightbox. Mulailah dengan memanfaatkan templat iklan HTML AMP sumber terbuka di [Contoh-contoh](../../../documentation/examples/index.html).

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>Korsel</td>
    <td>Parallax Video</td>
    <td>Lightbox</td>
  </tr>
</table>

## Cara kerja iklan HTML AMP

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Serving AMPHTML ads to AMP pages', caption='Serving AMPHTML ads to AMP pages', align='' ) }}

1. Penayang memasukkan slot iklan di halaman AMP-nya melalui tag [`amp-ad`](../../../documentation/components/reference/amp-ad.md), yang menetapkan jaringan iklan yang ingin digunakan.
2. Runtime AMP mengirimkan permintaan iklan ke jaringan iklan tertentu untuk mengambil iklan. Jaringan iklan yang dapat menayangkan iklan HTML AMP menyediakan [implementasi Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) yang memvalidasi dan menandatangani atau mengesahkan materi iklan.
3. Jaringan iklan merespons iklan HTML AMP dan Runtime AMP merender iklan di halaman AMP.

[tip type="note"] Tidak diperlukan integrasi khusus untuk menayangkan iklan HTML AMP ke halaman non-AMP. Hubungi jaringan iklan Anda untuk mengetahui apakah mereka mendukung iklan HTML AMP. [/tip]

## Menayangkan iklan HTML AMP

### Penayang

Untuk menayangkan format iklan yang dijual langsung dalam HTML AMP, Anda harus membuat iklan sesuai dengan [spesifikasi iklan HTML AMP](a4a_spec.md) dan menayangkannya menggunakan server iklan yang mendukung penayangan iklan HTML AMP. Untuk saat ini, yang berikut ini adalah server iklan yang mendukung iklan HTML AMP:

- DoubleClick for Publishers
- TripleLift
- Dianomi
- Adzerk
- Google AdSense

Untuk menayangkan iklan HTML AMP melalui saluran tidak langsung (cth.: exchange, SSP, dll.), gunakan server iklan/jaringan iklan pendukung pada [daftar berikut ini](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md).

### Agensi kreatif

Jika Anda adalah agensi kreatif, Anda harus membuat iklan sesuai dengan [spesifikasi iklan HTML AMP](a4a_spec.md). Untuk mengetahui contoh dan inspirasi, lihat templat iklan HTML AMP sumber terbuka di [Contoh-contoh](../../../documentation/examples/index.html). Selain itu, gunakan salah satu fitur berikut ini untuk membuat iklan HTML AMP:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (_coming soon_)

### Jaringan/server iklan

Untuk menayangkan iklan AMPHTML ke halaman AMP, Anda perlu membuat ekstensi [`amp-ad`](../../../documentation/components/reference/amp-ad.md) untuk jaringan Anda (kecuali Anda telah memilikinya) yang menggunakan [implementasi permintaan iklan Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md). Untuk mengetahui detailnya, lihat [Berintegrasi dengan AMP untuk menayangkan iklan display](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md). Perlu diingat bahwa tidak diperlukan integrasi khusus untuk menayangkan AMPHTML ke halaman non-AMP.

## Membuat iklan HTML AMP

**Dari nol**: Iklan HTML AMP harus mengikuti [spesifikasi iklan HTML AMP](a4a_spec.md). Untuk melihat demo dan contoh, kunjungi templat iklan HTML AMP sumber terbuka di [AMP berdasarkan Contoh](../../../documentation/examples/documentation/amp-ad.html).

**Menggunakan alat**: Anda dapat menggunakan salah satu fitur berikut ini untuk membuat materi iklan HTML AMP:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (_coming soon_)

### Memvalidasi sintaksis iklan HTML AMP

Setelah membuat iklan HTML AMP, Anda harus memastikan bahwa iklan tersebut telah menggunakan sintaksis HTML AMP yang benar. Bergantung pada lingkungan pengembangan Anda, ada beberapa opsi untuk memvalidasi iklan HTML AMP Anda:

- Gunakan modul [NPM validator AMP](https://www.npmjs.com/package/amphtml-validator) untuk validasi integrasi ke CI build/versi Anda.
- Use the [AMP validator](https://validator.ampproject.org/) for one-off testing.
- Partner with [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) and use their public validator end point.

Untuk merender iklan HTML AMP dengan cepat di halaman AMP (yaitu dengan menggunakan perenderan istimewa di Fast Fetch), sintaksisnya harus tepat. Jika sintaksisnya tidak valid, iklan akan tetap ditampilkan, hanya saja tidak secepat itu.

## Mendukung iklan HTML AMP di RTB

Untuk SSP dan Ad Exchange yang ingin mendukung iklan HTML AMP di lingkungan Bidding Real-Time (RTB), kunjungi [Panduan Implementasi untuk Ad Exchange RTB](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md) untuk mengetahui selengkapnya.

## T&J

#### Apakah ada sampel iklan HTML AMP?

Ya. Sejumlah templat iklan HTML AMP yang memiliki tampilan menarik dapat dilihat di [Contoh-contoh](../../../documentation/examples/documentation/amp-ad.html). Sampel-sampel ini menggunakan komponen lanjutan di AMP.

#### Apakah iklan HTML AMP mendukung deteksi keterlihatan dan verifikasi pihak ketiga?

Ya, ada dukungan bawaan untuk verifikasi dan deteksi keterlihatan dengan menggunakan [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) (cth.: ActiveView Google berintegrasi dengan cara ini). Ada juga vendor lain, seperti MOAT, yang secara aktif menerapkan dukungan untuk hal tersebut.

#### Apakah iklan HTML AMP mendukung animasi berbasis lini masa?

Ya. Lihat [`amp-animation`](../../../documentation/components/reference/amp-animation.md).

#### Sebagian besar iklan memiliki jalan keluar iklan yang dapat dikonfigurasi dan target yang dapat diketuk. Apakah iklan HTML AMP juga memiliki mekanisme yang sama?

Yes. See [`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md).

#### Saya tidak dapat menemukan apa yang saya butuhkan. Ke mana saya harus bertanya?

- [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) is our recommended way to find answers to questions about AMP; since members of the AMP Project community regularly monitor Stack Overflow you will probably receive the fastest response to your questions there.
- Join the [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) channel for solutions and answers.
- If you encounter a bug in AMP or have a feature request for AMP, see [Reporting issues with AMP](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp) for information on filing an issue.
