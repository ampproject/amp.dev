---
"$title": AMP dan PWA saling berhubungan
"$order": '7'
description: Aplikasi Web Progresif (PWA) dan halaman AMP bekerja sama dengan sangat baik. Faktanya, dalam banyak kasus, mereka saling melengkapi dalam berbagai cara. Pelajari cara ....
formats:
- websites
components:
- youtube
author: pbakaus
---

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='Tonton pengantar tentang menggabungkan AMP dan PWA.']

Aplikasi Web Progresif (PWA) dan halaman AMP bekerja sama dengan sangat baik. Faktanya, dalam banyak kasus, mereka saling melengkapi dalam berbagai cara. Pelajari cara:

1. [Mengaktifkan fitur PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) untuk halaman AMP Anda
2. Membuat [perjalanan pengguna yang super cepat dan menarik](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) dari AMP ke PWA
3. [Menyederhanakan PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md) dengan menggunakan kecanggihan AMP

[tip type="note"]

Pelajari lebih lanjut tentang [Aplikasi Web Progresif (PWA)](https://developers.google.com/web/progressive-web-apps/) di Dasar-Dasar Web.

[/tip]

## Halaman AMP dengan fitur-fitur PWA

Halaman AMP dapat menggunakan banyak fitur PWA dengan kemampuan sendiri, dengan syarat disajikan dari asal Anda (domain situs Anda), berlawanan dengan Cache AMP. Ini berarti bahwa fitur-fitur PWA tidak akan aktif saat mengonsumsi Halaman AMP di dalam suatu platform, seperti Google atau Bing, namun mereka akan ikut dalam proses selanjutnya, atau jika pengguna bernavigasi ke halaman AMP Anda secara langsung.

[tip type = "read-on"] **BACA –** Pelajari cara [mengaktifkan fitur-fitur PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) untuk Halaman AMP Anda. [/tip]

## AMP sebagai pintu masuk ke PWA Anda

Nilai jual AMP yang unik adalah **penayangan hampir instan**, keunggulan yang membuat AMP sangat sesuai untuk interaksi pengguna pertama dengan situs Anda. *Aplikasi web progresif* memungkinkan jauh lebih banyak **fitur yang mendukung interaktivitas dan keterlibatan**, namun pemuatan pertamanya terhambat karena Pekerja Layanan (Service Worker) situs hanya mempercepat penayangan pada pemuatan berikutnya, begitu pula aset dan shell (cangkang) aplikasi.

Strategi yang bagus adalah membuat pintu masuk ke situs sebagai halaman AMP, lalu menyiapkan PWA di belakang layar dan beralih menggunakannya dalam perjalanan selanjutnya.

[tip type = "read-on"] **BACA –** Pelajari cara [menghubungkan AMP ke PWA](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) melalui [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md). [/tip]

## AMP sebagai sumber data untuk PWA Anda

Salah satu fitur utama Halaman AMP adalah kemudahan dan keamanan penyematannya, sehingga semakin banyak platform yang senang mendistribusikan dan menayangkan halaman ini.

Jika membuat Aplikasi Web Progresif, Anda dapat menerima manfaat yang sama dan mengurangi kerumitan klien serta backend secara drastis dengan **menggunakan kembali Halaman AMP Anda sebagai sumber data untuk PWA Anda**.

[tip type = "read-on"] **BACA –** Pelajari cara [menggunakan halaman AMP dalam PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md). [/tip]
