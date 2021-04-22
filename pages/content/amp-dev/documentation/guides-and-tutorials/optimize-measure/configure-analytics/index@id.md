---
'$title': Mengonfigurasi analitik
$order: 5
'$hidden': 'true'
description: Jika Anda menggunakan Google Analytics sebagai penyedia analitik, pelajari cara menyiapkan Google Analytics untuk AMP tingkat dasar dan cara menautkan konten AMP dan non-AMP dengan menggunakan ID Klien
formats:
  - websites
  - stories
---

[tip] **KIAT –** Jika Anda menggunakan Google Analytics sebagai penyedia analitik, pelajari [cara menyiapkan Google Analytics untuk AMP tingkat dasar](https://developers.google.com/analytics/devguides/collection/amp-analytics/#basic_setup_to_measure_page_views) dan [cara menautkan konten AMP dan non-AMP dengan menggunakan ID Klien](https://support.google.com/analytics/answer/7486764). [/tip]

## Memutuskan sebelum Anda memulai

Semua solusi analitik dibuat berdasarkan data yang Anda butuhkan, dan cara Anda ingin menganalisis data tersebut. Putuskan sebelum Anda mulai:

- Apakah Anda akan menggunakan fitur analitik pihak ketiga untuk menganalisis keterlibatan pengguna, atau menggunakan solusi internal sendiri?
- Apa perilaku pengguna yang akan Anda ukur untuk memahami keterlibatannya?

### Mengirimkan data ke vendor atau diri sendiri?

Jika Anda memiliki solusi internal sendiri untuk mengukur keterlibatan pengguna, Anda hanya memerlukan URL untuk mengintegrasikan analitik AMP dengan solusi tersebut. Di sinilah Anda akan mengirimkan data. Anda juga dapat mengirimkan data ke berbagai URL. Contohnya, Anda dapat mengirimkan data penayangan halaman ke satu URL, dan data keterlibatan sosial ke URL lain.

Analisis AMP dirancang khusus untuk mengukur satu kali dan melaporkan hasilnya ke banyak pihak. Jika Anda sudah bekerja dengan satu atau beberapa vendor analitik, periksa daftar [Vendor Analitik](https://github.com/ampproject/amphtml/issues/new) untuk mengetahui apakah mereka telah mengintegrasikan solusinya dengan AMP. Jika mereka sudah melakukannya, tinjau detail konfigurasinya, lalu ikuti petunjuknya.

Jika vendor analitik belum terintegrasi dengan AMP, hubungi vendor tersebut untuk meminta dukungannya. Sebaiknya Anda juga [mengajukan masalah di project AMP](https://github.com/ampproject/amphtml/issues/new) dan meminta agar vendor tersebut ditambahkan. Kunjungi juga [Mengintegrasikan alat analitik di HTML AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/integrating-analytics.md).

### Data apa yang Anda butuhkan?

Apa data tentang pengguna yang akan Anda ambil untuk mengukur keterlibatan? Anda harus mengidentifikasi data ini sebelum dapat mengonfigurasinya.

Butir-butir data utama untuk dipertimbangkan:

- Apakah Anda hanya akan melacak penayangan halaman, atau pola keterlibatan pengguna tambahan (kunjungi juga [amp-pixel atau amp-analytics](analytics_basics.md#use-amp-pixel-or-amp-analytics))?
- Jenis data apa yang akan Anda ambil tentang pengguna, konten, perangkat, atau browser (kunjungi juga [Penggantian variabel](analytics_basics.md#variable-substitution))?
- Bagaimana cara Anda mengidentifikasi pengguna (kunjungi juga [Identifikasi pengguna](analytics_basics.md#user-identification))?

Pelajari lebih lanjut: Lanjutkan mempelajari tentang analitik dengan [Analitik: Dasar-Dasar](analytics_basics.md).
