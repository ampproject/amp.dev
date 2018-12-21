---
$title: Mengonfigurasi analisis
---

## Putuskan sebelum Anda mulai

Semua solusi analisis dibuat berdasarkan data yang Anda butuhkan,
dan cara Anda ingin menganalisis data tersebut. Putuskan sebelum Anda mulai:

* Apakah Anda akan menggunakan fitur analisis pihak ketiga untuk menganalisis interaksi pengguna,
atau menggunakan solusi internal sendiri?
* Apa perilaku pengguna yang akan Anda ukur untuk memahami interaksinya?

### Kirim data ke vendor atau diri sendiri?

Jika Anda memiliki solusi internal sendiri untuk mengukur interaksi pengguna,
Anda hanya memerlukan URL untuk mengintegrasikan analisis AMP dengan solusi tersebut.
Di sinilah Anda akan mengirim data.
Anda juga dapat mengirim data ke berbagai URL.
Misalnya, Anda dapat mengirim data tampilan halaman ke satu URL,
dan data interaksi sosial ke URL lain.

Analisis AMP dirancang khusus untuk mengukur sekali dan melaporkan hasilnya ke banyak pihak.
Jika Anda sudah bekerja dengan satu vendor analisis atau lebih,
periksa daftar [Vendor Analisis]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md', locale=doc.locale).url.path}}) untuk melihat apakah mereka telah mengintegrasikan solusinya dengan AMP.
Jika mereka sudah melakukannya, tinjau detail konfigurasinya lalu ikuti petunjuknya.

Jika vendor analisis belum terintegrasi dengan AMP,
hubungi vendor tersebut untuk meminta dukungan.
Sebaiknya Anda juga [mengajukan masalah di project AMP](https://github.com/ampproject/amphtml/issues/new)
dan meminta agar vendor tersebut ditambahkan.
Lihat juga
[Mengintegrasikan fitur analisis di HTML AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### Data apa yang Anda butuhkan?

Apa data tentang pengguna yang akan Anda ambil untuk mengukur interaksi?
Anda harus mengidentifikasi data ini sebelum dapat mengkonfigurasinya.

Titik data utama yang perlu dipertimbangkan:

* Apakah Anda hanya akan melacak tampilan halaman, atau pola interaksi pengguna tambahan
(lihat juga [amp-pixel atau amp-analytics](/id/docs/analytics/analytics_basics.html#menggunakan-amp-pixel-atau-amp-analytics?))?
* Jenis data apa yang akan Anda ambil tentang pengguna, konten,
perangkat, atau browser (lihat juga [Penggantian variabel](/id/docs/analytics/analytics_basics.html#penggantian-variabel))?
* Bagaimana cara Anda mengidentifikasi pengguna (lihat juga [Identifikasi pengguna](/id/docs/analytics/analytics_basics.html#user-identification))?


[tip type="read-on"]

Lanjutkan untuk mempelajari analisis dengan [Analisis: Dasar-Dasar]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md', locale=doc.locale).url.path}}).

[/tip]

