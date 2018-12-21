---
$title: Iklan AMPHTML
---

[TOC]

## Apa yang dimaksud dengan iklan AMPHTML?

Iklan AMPHTML adalah cara yang lebih cepat, ringan, dan aman untuk beriklan di internet. Meskipun halaman AMP mendukung iklan HTML tradisional, iklan ini dapat dimuat dengan lambat. Agar iklan dapat dimuat secepat elemen lain di halaman AMP, Anda dapat membuat iklan dalam AMPHTML. Iklan AMPHTML hanya ditayangkan setelah divalidasi, untuk memastikan iklan sudah aman dan memiliki performa baik. Yang terpenting, iklan ini dapat ditayangkan di mana pun di internet, _tidak hanya di halaman AMP_.

Iklan AMPHTML ditulis dalam HTML AMP sesuai dengan [spesifikasi iklan AMPHTML]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/a4a_spec.md', locale=doc.locale).url.path}}) (variasi HTML AMP + CSS). Ini berarti bahwa iklan tidak lagi dapat menjalankan JavaScript secara acak, yang secara tradisional menjadi penyebab utama performa iklan yang buruk. Oleh karena itu, seperti halnya AMP inti, kasus penggunaan JavaScript iklan inti dibuat langsung ke project Open Source AMP yang menjamin perilaku iklan yang baik.

### Manfaat

Mengapa iklan AMPHTML lebih baik daripada iklan tradisional? 

1.  **Lebih cepat**: Iklan AMPHTML lebih cepat karena iklan diminta sebelumnya dalam proses rendering halaman, dan segera ditampilkan tepat sebelum pengguna akan melihat iklan. Ukuran file iklan AMPHTML yang lebih kecil juga meningkatkan kecepatan.
2.  **Lebih ringan**: Iklan AMPHTML menggabungkan fungsi iklan yang biasa digunakan, yang dapat mengurangi ukuran file iklan. Setelah berada di halaman, iklan AMPHTML juga menggunakan lebih sedikit resource. Misalnya, 10 pelacak pada iklan biasa akan meminta informasi mereka sendiri, namun iklan AMPHTML mengumpulkan semua data sekali dan mendistribusikannya ke sejumlah pelacak yang tertarik.
3.  **Terkoordinasikan**: Di halaman AMP, [AMP runtime]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/spec/index.md', locale=doc.locale).url.path}}#amp-runtime) dapat mengkoordinasikan resource yang terbatas di ponsel ke komponen yang tepat di waktu yang tepat, sehingga dapat memberikan pengalaman yang terbaik bagi pengguna. Misalnya, iklan AMPHTML dengan animasi dijeda saat iklan tidak berada di viewport saat ini.
4.  **Lebih Menarik**: Pengguna tidak dapat berinteraksi dengan iklan yang tidak dapat dilihat. Iklan yang lebih cepat mendorong visibilitas yang lebih tinggi, yang kemudian membuat rasio klik-tayang jadi lebih tinggi, sehingga akan menghasilkan performa iklan yang lebih baik.
5.  **Aman dari Malware**: Penyebaran malware dengan iklan AMPHTML tidak akan dapat dilakukan karena iklan telah diverifikasi sebelum ditayangkan. Karena itulah, pengiklan dapat memastikan pengalaman pengguna yang aman dan memberikan persepsi merek yang positif. 
6.  **Lebih Fleksibel**: Iklan AMPHTML dirancang agar berfungsi pada halaman AMP dan non-AMP, serta di semua jenis perangkat.


### Format

Iklan AMPHTML bersifat fleksibel dan dinamis, sehingga memungkinkan banyak format kreatif, beberapa di antaranya seperti carousel, paralaks, dan lightbox. Mulai dengan memanfaatkan template iklan AMPHTML open source di [AMP by Example](https://ampbyexample.com/amp-ads/#amp-ads/advanced_ads).

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive"
    src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive"
    src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive"
    src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>Carousel</td>
    <td>Paralaks Video</td>
    <td>Lightbox</td>
  </tr>
</table>


## Cara kerja iklan AMPHTML

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Menayangkan iklan AMPHTML ke halaman AMP', caption='Menayangkan iklan AMPHTML ke halaman AMP', align='' ) }}

1.  Penayang memasukkan slot iklan di halaman AMP-nya melalui tag [`<amp-ad>`](/id/docs/reference/components/amp-ad.html), yang menetapkan jaringan iklan yang ingin digunakan.
2.  AMP Runtime mengirim permintaan iklan ke jaringan iklan tertentu untuk mengambil iklan. Jaringan iklan yang dapat menayangkan iklan AMPHTML menyediakan [implementasi Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) yang memvalidasi dan menandatangani materi iklan. 
3.  Jaringan iklan merespons iklan AMPHTML dan AMP Runtime merender iklan di halaman AMP.

## Menayangkan iklan AMPHTML

### Penayang

Untuk menayangkan format iklan yang dijual langsung di AMPHTML, Anda harus membuat iklan sesuai dengan [spesifikasi iklan AMPHTML]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/a4a_spec.md', locale=doc.locale).url.path}}) dan menayangkannya menggunakan server iklan yang mendukung penayangan iklan AMPHTML.  Untuk saat ini, berikut ini server iklan yang mendukung iklan AMPHTML:

*   DoubleClick for Publishers
*   TripleLift
*   Dianomi
*   Adzerk
*   Google AdSense

Untuk menayangkan iklan AMPHTML melalui saluran tidak langsung (mis., exchange, SSP, dll.), gunakan server iklan/jaringan iklan pendukung pada [daftar berikut]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md', locale=doc.locale).url.path}}).

### Agensi kreatif

Jika Anda adalah agensi kreatif, Anda harus membuat iklan sesuai dengan [spesifikasi iklan AMPHTML]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/a4a_spec.md', locale=doc.locale).url.path}}). Untuk mengetahui contoh dan inspirasi, lihat template iklan AMPHTML open source di [AMP by Example](https://ampbyexample.com/amp-ads/#amp-ads/advanced_ads). Selain itu, gunakan salah satu fitur berikut untuk membuat iklan AMPHTML:

*  [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
*  [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
*  Adobe Animate (*segera hadir*)

### Jaringan/server iklan

Untuk menayangkan iklan AMPHTML ke halaman AMP, Anda perlu membuat ekstensi `amp-ad` untuk jaringan Anda (kecuali Anda telah memilikinya) yang menggunakan [implementasi permintaan iklan Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md).  Untuk mengetahui detailnya, lihat [Berintegrasi dengan AMP untuk menayangkan iklan display]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/adnetwork_integration.md', locale=doc.locale).url.path}}).  Perlu diingat bahwa tidak diperlukan integrasi khusus untuk menayangkan AMPHTML ke halaman non-AMP.

## Membuat iklan AMPHTML

**Dari awal**: Iklan AMPHTML harus mengikuti [spesifikasi iklan AMPHTML]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/a4a_spec.md', locale=doc.locale).url.path}}).  Untuk mengetahui demo dan contoh, lihat template iklan AMPHTML open source di [AMP by Example](https://ampbyexample.com/amp-ads/#amp-ads).

**Menggunakan fitur**: Anda dapat menggunakan salah satu fitur berikut untuk membuat materi iklan AMPHTML:

*  [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
*  [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
*  Adobe Animate (*segera hadir*)


### Memvalidasi sintaks iklan AMPHTML

Setelah membuat iklan AMPHTML, Anda harus memastikan bahwa iklan telah menggunakan sintaks AMPHTML yang benar. Bergantung pada lingkungan pengembangan Anda, ada beberapa opsi untuk memvalidasi iklan AMPHTML:

*   Gunakan modul [NPM validator AMP](https://www.npmjs.com/package/amphtml-validator) untuk validasi integrasi ke CI build.
*   Gunakan [validator AMP](https://validator.ampproject.org/) untuk pengujian satu kali.
*   Berpartnerlah dengan [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) dan gunakan titik akhir validator publiknya.

[tip type="note"]

Untuk merender iklan AMPHTML dengan cepat di halaman AMP (yaitu, menggunakan rendering istimewa di Fast Fetch), sintaksnya harus tepat.  Jika sintaksnya tidak valid, iklan akan tetap ditampilkan, hanya saja tidak secepat itu.

[/tip]

## Mendukung iklan AMPHTML di RTB

Untuk SSP dan Ad Exchange yang ingin mendukung iklan AMPHTML di lingkungan Bidding Real-Time (RTB), lihat [Panduan Implementasi untuk Ad Exchange RTB](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md) untuk mengetahui detailnya.

## FAQ

#### Apakah ada contoh iklan AMPHTML?

Ya. Sejumlah template iklan AMPHTML yang memiliki tampilan menarik dapat dilihat di [AMP By Example](https://ampbyexample.com/amp-ads/#amp-ads/experimental_ads). Contoh ini menggunakan komponen lanjutan di AMP.

#### Apakah iklan AMPHTML mendukung deteksi visibilitas dan verifikasi pihak ketiga?

Ya. Terdapat dukungan bawaan untuk verifikasi dan deteksi visibilitas menggunakan [`amp-analytics`](/id/docs/reference/components/amp-analytics.html) (mis., Tampilan Aktif Google mengintegrasikan cara ini). Ada juga vendor lain seperti MOAT yang secara aktif menerapkan dukungan untuk hal tersebut.

#### Apakah iklan AMPHTML mendukung animasi berbasis timeline?

Ya. Lihat [`amp-animation`](/id/docs/reference/components/amp-animation.html).

#### Sebagian besar iklan memiliki titik keluar iklan yang dapat dikonfigurasi dan target yang dapat di-tap. Apakah iklan AMPHTML juga memiliki mekanisme yang sama?

Ya. Lihat [`amp-ad-exit`](/id/docs/reference/components/amp-ad-exit.html).

#### Saya tidak dapat menemukan apa yang saya butuhkan. Ke mana saya harus bertanya?

*   [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) adalah cara yang kami rekomendasikan untuk menemukan jawaban atas pertanyaan tentang AMP. Karena anggota komunitas Project AMP secara rutin memantau Stack Overflow, Anda mungkin akan menerima respons tercepat terhadap pertanyaan Anda di dalamnya.
*   Bergabunglah ke saluran [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) untuk melihat solusi dan jawaban.
*   Jika Anda mendapati bug di AMP atau memiliki permintaan fitur untuk AMP, lihat [Melaporkan masalah dengan AMP](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp) untuk mengetahui informasi tentang cara mengajukan masalah.
 
