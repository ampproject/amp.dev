---
"$title": Integrasikan teknologi iklan Anda ke dalam AMP
order: '3'
formats:
- ads
teaser:
  text: Jika Anda adalah penyedia teknologi iklan yang ingin berintegrasi dengan HTML AMP, silakan baca panduan di bawah ini.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

Jika Anda adalah penyedia teknologi iklan yang ingin berintegrasi dengan HTML AMP, silakan baca panduan di bawah ini. Untuk memastikan latensi yang minimum dan mutu, harap ikuti instruksi yang dicantumkan [di sini](https://github.com/ampproject/amphtml/blob/master/ads/../3p/README.md#ads) sebelum mengirimkan permintaan penarikan (pull request) ke proyek sumber terbuka AMP. Untuk mendapatkan panduan umum tentang cara memulai berkontribusi di AMP, silakan buka [CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/ads/../CONTRIBUTING.md).

## Server Iklan <a name="ad-server"></a>

*Contoh: DFP, A9*

Sebagai server iklan, penayang (publisher) yang Anda dukung menyertakan perpustakaan JavaScript yang Anda sediakan dan menempatkan berbagai "snippet iklan" yang mengandalkan perpustakaan JavaScript untuk menjemput iklan dan merendernya di situs web penayang.

Karena AMP tidak mengizinkan penayang untuk mengeksekusi JavaScript sesuka hati, Anda perlu berkontribusi ke kode sumber terbuka AMP untuk mengizinkan tag `amp-ad` meminta iklan dari server iklan Anda.

Contohnya : Server A9 Amazon dapat diminta dengan menggunakan sintaks berikut ini:

[sourcecode:html]
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
[/sourcecode]

Harap ketahui bahwa setiap atribut yang mengikuti `type` bergantung pada parameter yang diharapkan server A9 Amazon agar dapat menyampaikan sebuah iklan. Berkas [a9.js](https://github.com/ampproject/amphtml/blob/master/ads/./a9.js) memperlihatkan cara parameter dipetakan pada pembuatan panggilan JavaScript yang meminta server A9 melalui URL `https://c.amazon-adsystem.com/aax2/assoc.js`. Parameter terkait yang dilewati oleh tag iklan AMP dilampirkan pada URL untuk menghasilkan sebuah iklan.

Untuk penjelasan selengkapnya tentang cara mengintegrasikan jaringan iklan Anda dengan AMP, buka [Mengintegrasikan jaringan iklan ke dalam AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

## Platform Bagian Suplai (SSP) atau sebuah Bursa Iklan <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

*Contoh: Rubicon, Criteo OR Appnexus, Ad-Exchange*

Jika Anda adalah platform pihak penjual yang ingin dipanggil langsung dari halaman web penayang, Anda perlu mengikuti arahan yang sama seperti yang dicantumkan di atas untuk berintegrasi dengan sebuah Server Iklan. Menambahkan nilai `type` Anda sendiri pada tag amp-ad akan memungkinkan Anda untuk mendistribusikan tag Anda secara langsung kepada penayang, sehingga mereka dapat langsung memasukkan tag Anda ke halaman AMP mereka.

Hal yang lebih umum adalah SSP bekerja sama dengan penerbit untuk mengatur lalu lintas tag iklan SSP di server iklan mereka. Dalam hal ini, pastikan semua aset yang dimuat ke skrip Anda di kreatif (alat/bahan promosi) server iklan dibuat dengan HTTPS. Ada sejumlah pembatasan pada beberapa format iklan, seperti format Expandables, oleh karena itu, sebaiknya Anda menguji format kreatif yang paling sering disampaikan dengan penayang Anda.

## Agen Iklan <a name="ad-agency"></a>

*Contoh : Essence, Omnicom*

Lakukan kerja sama dengan penayang Anda untuk memastikan bahwa kreatif yang Anda buat memenuhi syarat AMP. Karena semua kreatif disajikan ke dalam iframe yang ukurannya ditetapkan ketika iklan dipanggil, pastikan bahwa kreatif Anda tidak mencoba memodifikasi ukuran iframe tersebut.

Pastikan bahwa semua aset yang menjadi bagian dari kreatif diminta dengan menggunakan HTTPS. Beberapa format iklan tidak sepenuhnya didukung saat ini dan kami sarankan untuk menguji kreatif di dalam sebuah lingkungan AMP. Beberapa contohnya adalah: Rich Media Expandable, Interstitial, Page Level Ad.

## Pemutar Video <a name="video-player"></a>

*Contoh: Brightcove, Ooyala*

Sebuah pemutar video yang bekerja pada halaman HTML biasa tidak akan bekerja di AMP, dan oleh karena itu sebuah tag yang spesifik harus dibuat agar AMP Runtime dapat memuat pemutar Anda. Brightcove telah membuat tag kustom [amp-brightcove](https://github.com/ampproject/amphtml/blob/master/extensions/amp-brightcove/amp-brightcove.md) yang memungkinkan media dan iklan diputar pada halaman AMP.

Sebuah pemutar Brightcove dapat dipanggil dengan yang berikut ini:

[sourcecode:html]
<amp-brightcove
  data-account="1290862519001"
  data-video-id="ref:amp-docs-sample"
  data-player="S1Tt8cgaM"
  layout="responsive"
  width="480"
  height="270"
>
</amp-brightcove>
[/sourcecode]

Untuk mengetahui instruksi tentang cara membuat tag amp, seperti Brightcove, buka [permintaan penarikan ini](https://github.com/ampproject/amphtml/pull/1052).

## Jaringan Iklan Video <a name="video-ad-network"></a>

*Contoh: Tremor, Brightroll*

Jika Anda adalah jaringan iklan video, silakan bekerja sama dengan penayang Anda untuk memastikan bahwa:

- Semua aset video disajikan lewat HTTPS
- Pemutar video penayang mempunyai dukungan AMP

## Platform Manajemen Data (DMP) <a name="data-management-platform-dmp"></a>

*Contoh: KRUX, Bluekai*

Buka [cara meningkatkan konfigurasi iklan kustom](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration).

Anda dapat menggunakan pendekatan yang serupa untuk memperkaya panggilan iklan dengan meneruskan segmen audiens yang Anda dapatkan dari cookie pengguna ke dalam panggilan iklan.

## Penyedia Keterlihatan <a name="viewability-provider"></a>

*Contoh: MOAT, Integral Ad Science*

Penyedia keterlihatan biasanya berintegrasi dengan penayang melalui pembungkus kreatif server iklan. Jika ini yang terjadi, pastikan bahwa pembungkus kreatif memuat semua aset melalui HTTPS.

Contohnya, untuk MOAT, pastikan `http://js.moatads.com` dialihkan ke `https://z.moatads.com`

Selain itu, lihat pendekatan untuk menggunakan [pola pengamat persimpangan](https://github.com/ampproject/amphtml/blob/master/ads/README.md#ad-viewability).

## Platform Rekomendasi Konten <a name="content-recommendation-platform"></a>

*Contoh: Taboola, Outbrain*

Berguna jika Anda mempunyai JavaScript yang disematkan pada situs web penayang sekarang ini, namun pendekatan ini tidak akan berhasil pada halaman AMP. Jika Anda ingin merekomendasikan konten di halaman AMP, sebaiknya Anda menggunakan ekstensi [`amp-embed`](https://amp.dev/documentation/components/amp-ad) untuk meminta detail konten. Silakan buka contoh [Taboola](https://github.com/ampproject/amphtml/blob/master/ads/taboola.md).
