---
'$title': Menggunakan AMP sebagai sumber data untuk PWA Anda
$order: 1
description: Jika Anda telah berinvestasi di AMP, tetapi belum membuat Aplikasi Web Progresif, Halaman AMP Anda dapat secara dramatis menyederhanakan pengembangan Aplikasi Web Progresif Anda.
formats:
  - websites
author: pbakaus
---

Jika Anda telah berinvestasi di AMP, tetapi belum membuat Aplikasi Web Progresif (PWA), Halaman AMP Anda dapat secara dramatis menyederhanakan pengembangan Aplikasi Web Progresif Anda. Dalam panduan ini, Anda akan mempelajari cara membuat AMP dalam Aplikasi Web Progresif Anda dan mengunakan Halaman AMP Anda yang sudah ada sebagai sumber data.

## Dari JSON ke AMP

Dalam skenario yang paling umum, Aplikasi Web Progresif adalah aplikasi halaman tunggal yang terhubung ke API JSON melalui Ajax. Kemudian, API JSON ini akan menampilkan rangkaian data untuk mendorong navigasi, dan konten yang sebenarnya untuk merender artikel.

Setelah itu, Anda dapat memproses dan mengonversi konten mentah menjadi HTML yang dapat digunakan, lalu merendernya di klien. Proses ini memerlukan biaya yang mahal dan sering kali sulit dikelola. Sebagai gantinya, Anda dapat menggunakan kembali Halaman AMP Anda yang sudah ada sebagai sumber konten. Yang paling penting, AMP menyederhanakan proses ini hanya dengan beberapa baris kode.

## Menyertakan "AMP Bayangan" di Aplikasi Web Progresif Anda

Langkah pertama adalah menyertakan AMP versi khusus yang kami sebut “AMP Bayangan” di Aplikasi Web Progresif. Ya, tepat sekali – perpustakaan AMP akan dimuat di halaman tingkat atas, namun tidak akan benar-benar mengontrol konten tingkat atas. Perpustakaan AMP hanya akan “memperkuat” bagian halaman sesuai dengan yang Anda tetapkan.

Sertakan AMP Bayangan di bagian atas halaman, seperti contoh berikut ini:

[sourcecode:html]

<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://ampjs.org/shadow-v0.js"></script>

[/sourcecode]

### Bagaimana Anda tahu kapan API AMP Bayangan siap digunakan?

Sebaiknya muat perpustakaan AMP Bayangan dengan menempatkan atribut `async`. Namun, itu artinya Anda perlu menggunakan cara tertentu untuk memahami kapan perpustakaan sepenuhnya dimuat dan siap digunakan.

Sinyal yang tepat yang harus diamati adalah ketersediaan variabel `AMP` global, dan AMP Bayangan menggunakan “[pendekatan pemuatan fungsi asinkron](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)” untuk membantu Anda mengetahuinya. Pertimbangkan kode berikut ini:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
// AMP is now available.
});
[/sourcecode]

Kode ini akan berfungsi, dan berapa pun jumlah panggilan balik yang ditambahkan dengan cara ini akan diaktifkan saat AMP tersedia, namun mengapa hal ini bisa terjadi?

Kode ini berarti:

1. “jika window.AMP tidak ada, buat deretan kosong untuk mengambil alih posisinya”
2. "kemudian, terapkan fungsi panggilan balik ke deretan yang harus dijalankan saat AMP sudah siap"

Cara ini dapat berfungsi karena perpustakaan AMP Bayangan, dengan pemuatan yang sebenarnya, akan mengetahui bahwa telah ada deretan panggilan balik pada `window.AMP`, lalu memproses seluruh antrean. Jika kemudian Anda menjalankan kembali fungsi yang sama, fungsi tersebut akan tetap bekerja, karena AMP Bayangan menggantikan `window.AMP` dengan dirinya sendiri beserta metode `push` kustom, yang langsung mengaktifkan panggilan balik.

[tip type="tip"] **KIAT –** Agar contoh kode di atas lebih praktis, sebaiknya gabungkan ke dalam sebuah Promise, lalu selalu gunakan Promise tersebut sebelum bekerja dengan API AMP. Kunjungi [Kode demo React](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20) kami untuk mengetahui contohnya. [/tip]

## Menangani navigasi di Aplikasi Web Progresif Anda

Anda tetap perlu menerapkan langkah ini secara manual. Lagi pula, terserah Anda bagaimana menampilkan tautan ke konten di konsep navigasi. Apakah berupa beberapa daftar? Atau sejumlah kartu?

Dalam skenario umum, Anda akan mengambil sejumlah JSON yang menampilkan URL yang diurutkan dengan beberapa metadata. Pada tahap akhir, Anda akan memiliki panggilan balik fungsi yang diaktifkan saat pengguna mengeklik salah satu tautan, dan panggilan balik tersebut harus menyertakan URL halaman AMP yang diminta. Jika Anda mendapati skenario tersebut, Anda sudah siap untuk melakukan langkah terakhir.

## Menggunakan API AMP Bayangan untuk merender inline halaman

Akhirnya, jika Anda ingin menampilkan konten setelah ada tindakan dari pengguna, saatnya mengambil dokumen AMP yang relevan dan biarkan AMP Bayangan menjalankan fungsinya. Pertama-tama, terapkan fungsi untuk mengambil halaman, serupa dengan fungsi berikut ini:

[sourcecode:javascript]
function fetchDocument(url) {

// unfortunately fetch() does not support retrieving documents,
// so we have to resort to good old XMLHttpRequest.
var xhr = new XMLHttpRequest();

return new Promise(function(resolve, reject) {
xhr.open('GET', url, true);
xhr.responseType = 'document';
xhr.setRequestHeader('Accept', 'text/html');
xhr.onload = function() {
// .responseXML contains a ready-to-use Document object
resolve(xhr.responseXML);
};
xhr.send();
});
}
[/sourcecode]

[tip type="important"] <strong>PENTING –</strong> Untuk menyederhanakan contoh kode di atas, kita mengabaikan penanganan eror. Anda harus selalu memastikan untuk menemukan dan menangani eror dengan baik. [/tip]

Setelah kita memiliki objek `Dokumen` yang siap digunakan, biarkan AMP menjalankan fungsinya dan merender objek tersebut. Dapatkan referensi ke elemen DOM yang berfungsi sebagai wadah untuk dokumen AMP, lalu panggil `AMP.attachShadowDoc()`, seperti contoh berikut ini:

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
// Let AMP take over and render the page
var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"] **KIAT –** Sebelum Anda benar-benar menyerahkan dokumen ke AMP, saatnya menghapus elemen halaman yang dapat dimengerti saat menampilkan halaman AMP secara mandiri, namun bukan dalam mode tersemat: Misalnya, bagian kaki dan tajuk. [/tip]

Dan selesai! Halaman AMP Anda akan dirender sebagai anak (turunan) dari seluruh Aplikasi Web Progresif Anda.

## Membersihkan dokumen yang tidak lagi digunakan

Pengguna Anda kemungkinan akan membuka satu AMP ke AMP lainnya di Aplikasi Web Progresif Anda. Saat menutup Halaman AMP yang dirender sebelumnya, selalu pastikan bahwa AMP mengetahui tindakan tersebut, seperti contoh berikut ini:

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

Cara ini akan memberi tahu AMP bahwa Anda tidak lagi menggunakan dokumen ini, dan akan mengosongkan memori serta overhead CPU.

## Lihat cara kerjanya

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

Anda dapat melihat cara kerja pola "AMP dalam PWA" di [Contoh React](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) yang telah kita buat. Contoh tersebut menunjukkan transisi yang lancar saat navigasi dan disertai dengan komponen React yang simpel, yang menggabungkan langkah-langkah di atas. Jadi, Anda akan mendapatkan dua manfaat sekaligus – JavaScript kustom yang fleksibel di Aplikasi Web Progresif, serta AMP untuk mendorong konten.

- Dapatkan kode sumber di sini: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
- Gunakan komponen React secara mandiri melalui npm: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
- Lihat cara kerjanya di sini: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (hasil terbaik di ponsel atau emulasi seluler)

Anda juga dapat melihat contoh PWA dan AMP dengan menggunakan kerangka kerja Polymer. Contoh tersebut menggunakan [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) untuk menyematkan halaman AMP.

- Dapatkan kodenya di sini: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
- Lihat cara kerjanya di sini: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)
