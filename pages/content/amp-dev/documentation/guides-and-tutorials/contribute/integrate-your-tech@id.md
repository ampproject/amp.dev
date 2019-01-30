---
$title: Mengintegrasikan teknologi Anda dengan AMP
---

Penayang telah membuat lebih dari 1,4 miliar dokumen AMP yang dihosting di lebih dari 750 ribu domain berbeda. Pertumbuhan ini tidak mungkin terjadi tanpa adanya dukungan yang kuat dari 100 lebih perusahaan teknologi pihak ketiga, yang telah berintegrasi dengan AMP.

Jika Anda adalah penyedia teknologi bagi penayang atau pengiklan di web, kami mengundang Anda untuk menambahkan dukungan ke AMP, sehingga pelanggan dapat terus memanfaatkan teknologi Anda dan mencapai visi bersama kami untuk membuat web yang lebih baik.

Ada 4 cara utama Anda dapat berintegrasi dengan AMP:


## 1. Menambahkan dukungan ke ekstensi amp-analytics
Analytics AMP memungkinkan Anda mengirimkan peristiwa kembali ke server berdasarkan pemicu yang dikonfigurasi. Kami telah membuat [panduan integrasi analytics]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md', locale=doc.locale).url.path}}) untuk membantu Anda memulai.

Jika Anda hanya perlu menambahkan piksel pelacakan dengan parameter dinamis ke URL pelacakan, buka [amp-pixel](/id/docs/reference/components/amp-pixel.html). Pastikan mendokumentasikan penggunaan di halaman dukungan Anda untuk developer yang mungkin ingin menggunakan teknologi Anda dengan AMP.

Ada lebih dari 20 penyedia analytics yang telah menambahkan dukungan ke amp-analytics. Berikut adalah [contoh pull request](https://github.com/ampproject/amphtml/pull/1595) dari penyedia analytics [Parse.ly](https://www.parsely.com/help/integration/google-amp/).


## 2. Menggunakan ekstensi amp-ad

Ekstensi amp-ad digunakan untuk menayangkan iklan Display di halaman AMP. Lebih dari 90 penyedia teknologi iklan telah menambahkan dukungan ke AMP.  Untuk memulai, baca [ringkasan pengembangan](https://github.com/ampproject/amphtml/tree/master/ads#overview) atau lihat bagian [petunjuk developer](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request) untuk menambahkan dukungan Anda ke ekstensi amp-ad. Bergantung pada teknologi iklan yang disediakan oleh perusahaan Anda, [petunjuk integrasi]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/integration-guide.md', locale=doc.locale).url.path}}) ini mungkin berguna.

Ada lebih dari 90 penyedia iklan yang telah menambahkan dukungan untuk fitur yang berkaitan dengan iklan seperti amp-ad. Berikut adalah contoh [pull request](https://github.com/ampproject/amphtml/pull/2299) dari jaringan iklan [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md).

## 3. Menggunakan ekstensi amp-call-tracking

Jika Anda menyediakan layanan tindakan pelacakan panggilan, kasus penggunaan Anda mungkin didukung oleh ekstensi [amp-call-tracking](/id/docs/reference/components/amp-call-tracking.html) yang baru. Ekstensi ini secara dinamis mengganti nomor telepon pada hyperlink untuk mengaktifkan pelacakan panggilan, dengan menjalankan permintaan CORS untuk mengganti nomor tersebut.

Untuk mempelajari lebih lanjut tentang apakah ekstensi ini sesuai untuk Anda, lihat [AMP By Example](https://ampbyexample.com/components/amp-call-tracking/) atau baca [dokumentasi](/id/docs/reference/components/amp-call-tracking.html).

## 4. Menambahkan sematan/ekstensi baru

Jika kasus penggunaan Anda tidak dapat diselesaikan menggunakan amp-analytics, amp-pixel, atau amp-ad, buka [masalah GitHub](https://github.com/ampproject/amphtml/issues/new) untuk mendiskusikan opsi alternatif. Kami menerima ekstensi baru yang dapat digunakan secara luas oleh berbagai perusahaan. Lihat bagian [memberi kontribusi komponen yang diperluas](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#contributing-extended-components) untuk detail selengkapnya.

## 5. Menggunakan amp-iframe

Tunggu sebentar – cara ke-5?! Memang ada, namun cara ini hanya dapat dilakukan sebagai opsi terakhir. Jika cara di atas tidak ada yang sesuai dengan kebutuhan Anda, Anda dapat menggunakan tag umum amp-iframe agar penayang dapat menyematkan konten Anda. Namun, pendekatan ini memiliki sejumlah kelemahan, karena adanya beberapa kesalahan yang berkaitan dengan performa dan pengalaman pengguna, yang dapat Anda baca [di sini](/docs/reference/components/amp-iframe.html#guideline:-prefer-specific-amp-components-to-amp-iframe).

## Ringkasan

Untuk memulai, Anda dapat membaca [panduan developer pihak ketiga](https://github.com/ampproject/amphtml/blob/master/3p/README.md). Project AMP telah mendukung berbagai kasus penggunaan pihak ketiga, tetapi masih ada sejumlah fitur web yang belum dibuat.

Misalnya, pelacakan panggilan dinamis merupakan kasus penggunaan yang belum kami dukung di AMP, namun kami [terus berupaya](https://github.com/ampproject/amphtml/issues/5276) menambahkan dukungan tersebut bersama komunitas terkait.

Jika Anda memiliki pertanyaan atau saran, jangan ragu untuk [mengajukannya](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#filing-issues) atau hubungi salah satu [saluran diskusi](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#discussion-channels) kami.

## Referensi tambahan

- [Situs AMP Project](https://www.ampproject.org/id/)
- [GitHub AMP Project](https://github.com/ampproject/amphtml)
- [Blog AMP](/id/latest/blog)
- [Panduan AMP Project](/roadmap/)
 
 
