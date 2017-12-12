---
$title: Mengombinasikan AMP dengan Progressive Web App
---
[TOC]

{{ youtube('Yllbfu3JE2Y', 480, 270, caption='Tonton pengantar tentang menggabungkan AMP dan PWA.') }}

Progressive Web App dan halaman AMP bekerja sama dengan baik. Bahkan, dalam banyak kasus, keduanya saling melengkapi. Pelajari cara:

1. [Mengaktifkan fitur PWA](/id/docs/guides/pwa-amp/amp-as-pwa.html) untuk halaman AMP Anda
2. Membuat [perjalanan pengguna yang super cepat dan menarik](/id/docs/guides/pwa-amp/amp-to-pwa.html) dari AMP ke PWA
3. [Menyederhanakan PWA](/id/docs/guides/pwa-amp/amp-in-pwa.html) dengan menggunakan kecanggihan AMP

{% call callout('Progressive Web App?', type='note') %}
Pelajari lebih lanjut tentang [Progressive Web App](https://developers.google.com/web/progressive-web-apps/) di Dasar-Dasar Web.
{% endcall %}

## Halaman AMP dengan fitur PWA

Halaman AMP dapat menggunakan banyak fitur PWA dengan sendirinya, selama halaman ditayangkan dari halaman asli (domain situs), bukan Cache AMP. Artinya, fitur PWA tidak akan berfungsi saat menggunakan Halaman AMP dalam platform seperti Google atau Bing, namun fitur tersebut akan berfungsi pada proses selanjutnya, atau jika pengguna membuka halaman AMP secara langsung.

{% call callout('Baca lebih lanjut', type='read') %}
Pelajari cara [mengaktifkan fitur PWA](/id/docs/guides/pwa-amp/amp-as-pwa.html) untuk Halaman AMP.
{% endcall %}

## AMP sebagai pintu masuk ke PWA

Nilai jual AMP yang unik adalah **penayangan hampir instan**, keunggulan yang membuat AMP sangat sesuai untuk interaksi pengguna pertama dengan situs Anda. *Progressive web app* memungkinkan jauh lebih banyak **fitur yang mendukung interaktivitas dan engagement**, namun pemuatan pertamanya terhambat karena Service Worker situs hanya mempercepat penayangan pada pemuatan berikutnya, begitu pula aset dan app shellnya.

Strategi yang bagus adalah membuat pintu masuk ke situs sebagai halaman AMP, lalu menyiapkan PWA di belakang layar dan beralih untuk perjalanan selanjutnya.

{% call callout('Baca lebih lanjut', type='read') %}
Pelajari cara [menghubungkan AMP ke PWA](/id/docs/guides/pwa-amp/amp-to-pwa.html) melalui `amp-install-serviceworker`.
{% endcall %}

## AMP sebagai sumber data untuk PWA

Salah satu fitur utama Halaman AMP adalah kemudahan dan keamanan penyematannya, sehingga semakin banyak platform yang senang mendistribusikan dan menayangkan halaman ini.

Jika membuat Progressive Web App, Anda dapat menerima keuntungan yang sama dan mengurangi kerumitan klien serta backend secara drastis dengan **menggunakan kembali Halaman AMP sebagai sumber data untuk PWA**.

{% call callout('Baca lebih lanjut', type='read') %}
Pelajari cara [melihat halaman AMP dalam PWA](/id/docs/guides/pwa-amp/amp-in-pwa.html).
{% endcall %}
 
 
