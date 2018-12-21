---
$title: Mengombinasikan AMP dengan Progressive Web App
---
[TOC]

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='Tonton pengantar tentang menggabungkan AMP dan PWA.']

Progressive Web App dan halaman AMP bekerja sama dengan baik. Bahkan, dalam banyak kasus, keduanya saling melengkapi. Pelajari cara:

1. [Mengaktifkan fitur PWA]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-as-pwa.md', locale=doc.locale).url.path}}) untuk halaman AMP Anda
2. Membuat [perjalanan pengguna yang super cepat dan menarik]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-to-pwa.md', locale=doc.locale).url.path}}) dari AMP ke PWA
3. [Menyederhanakan PWA]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-in-pwa.md', locale=doc.locale).url.path}}) dengan menggunakan kecanggihan AMP

[tip type="note"]

Pelajari lebih lanjut tentang [Progressive Web App](https://developers.google.com/web/progressive-web-apps/) di Dasar-Dasar Web.

[/tip]

## Halaman AMP dengan fitur PWA

Halaman AMP dapat menggunakan banyak fitur PWA dengan sendirinya, selama halaman ditayangkan dari halaman asli (domain situs), bukan Cache AMP. Artinya, fitur PWA tidak akan berfungsi saat menggunakan Halaman AMP dalam platform seperti Google atau Bing, namun fitur tersebut akan berfungsi pada proses selanjutnya, atau jika pengguna membuka halaman AMP secara langsung.

Baca lebih lanjut: Pelajari cara [mengaktifkan fitur PWA]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-as-pwa.md', locale=doc.locale).url.path}}) untuk Halaman AMP.

## AMP sebagai pintu masuk ke PWA

Nilai jual AMP yang unik adalah **penayangan hampir instan**, keunggulan yang membuat AMP sangat sesuai untuk interaksi pengguna pertama dengan situs Anda. *Progressive web app* memungkinkan jauh lebih banyak **fitur yang mendukung interaktivitas dan engagement**, namun pemuatan pertamanya terhambat karena Service Worker situs hanya mempercepat penayangan pada pemuatan berikutnya, begitu pula aset dan app shellnya.

Strategi yang bagus adalah membuat pintu masuk ke situs sebagai halaman AMP, lalu menyiapkan PWA di belakang layar dan beralih untuk perjalanan selanjutnya.

Baca lebih lanjut: Pelajari cara [menghubungkan AMP ke PWA]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-to-pwa.md', locale=doc.locale).url.path}}) melalui `amp-install-serviceworker`.

## AMP sebagai sumber data untuk PWA

Salah satu fitur utama Halaman AMP adalah kemudahan dan keamanan penyematannya, sehingga semakin banyak platform yang senang mendistribusikan dan menayangkan halaman ini.

Jika membuat Progressive Web App, Anda dapat menerima keuntungan yang sama dan mengurangi kerumitan klien serta backend secara drastis dengan **menggunakan kembali Halaman AMP sebagai sumber data untuk PWA**.

Baca lebih lanjut: Pelajari cara [melihat halaman AMP dalam PWA]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-in-pwa.md', locale=doc.locale).url.path}}).
