---
layout: page
title: Mengonfigurasi Analytics
order: 5
folder: analytics
locale: id
---

## Putuskan sebelum Anda memulai

Semua solusi analisis dibangun berdasarkan pengetahuan mengenai data yang Anda butuhkan,
dan bagaimana Anda ingin menganalisis data tersebut. Putuskan sebelum Anda memulai:

* Akankah Anda memakai alat analisis pihak ketiga untuk menganalisis keterlibatan pengguna,
atau solusi internal Anda sendiri?
* Perilaku pengguna apakah yang akan Anda ukur untuk memahami keterlibatan pengguna?

### Mengirim data ke vendor atau ke sendiri?

Jika Anda memiliki solusi internal sendiri untuk mengukur keterlibatan pengguna,
satu-satunya hal yang Anda akan butuhkan untuk mengintegrasikan analisis AMP dengan solusi tersebut adalah URL.
Di sinilah Anda akan mengirimkan data.
Anda juga bisa mengirim data ke berbagai URL.
Misalnya, Anda bisa mengirim data tampilan halaman ke satu URL,
dan data keterlibatan sosial ke URL yang lain.

Analisis AMP didesain khusus untuk mengukur sekali dan melaporkan ke banyak.
Jika Anda sudah bekerja dengan satu atau beberapa vendor analisis,
periksa
[spesifikasi amp-analytics](/docs/reference/extended/amp-analytics.html)
untuk mengetahui apakah mereka telah mengintegrasikan solusi mereka dengan AMP.
Jika mereka telah mengintegrasikannya, cukup tautkan ke dokumen mereka dari spesifikasi
dan mulailah mengikuti petunjuknya.

Jika vendor analisis belum mengintegrasikan dengan AMP,
hubungi vendor untuk meminta dukungan mereka.
Kami juga mendorong Anda untuk [melaporkan adanya masalah dalam proyek AMP](https://github.com/ampproject/amphtml/issues/new)
yang meminta ditambahkannya vendor tersebut.
Lihat juga
[Mengintegrasikan alat analisis Anda di AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### Data apakah yang Anda butuhkan?

Data tentang pengguna apakah yang akan Anda tangkap untuk mengukur keterlibatan?
Anda harus mengidentifikasi data ini sebelum Anda bisa mengonfigurasikannya.

Butir-butir data utama yang harus dipertimbangkan:

* Akankah Anda hanya melacak tampilan halaman saja, atau pola keterlibatan pengguna tambahan
(lihat juga [amp-pixel atau amp-analytics](/docs/guides/analytics/analytics_basics.html#use-amp-pixel-or-amp-analytics))?
* Jenis data apakah yang akan Anda tangkap dari pengguna, materi, 
perangkat atau browser (lihat juga [Penggantian variabel](/docs/guides/analytics/analytics_basics.html#variable-substition)?
* Bagaimana Anda akan mengidentifikasi pengguna Anda (lihat juga [Identifikasi pengguna](/docs/guides/analytics/analytics_basics.html#user-identification))?
