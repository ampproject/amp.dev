---
layout: page
title: Cara AMP Mempercepat Kinerja
order: 2
locale: id
---

Kombinasi semua pengoptimalan berikut adalah alasan mengapa halaman AMP sangat cepat sehingga tampak dimuat seketika:

{% include toc.html %}

Jika Anda lebih memilih mendengarkan dibanding membaca, video berikut yang disajikan oleh pimpinan teknisi AMP Malte Ubl akan memberikan ikhtisar yang mirip dengan teks yang ada di bawahnya.

<amp-youtube
    data-videoid="hVRkG1CQScA"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

## Hanya memperbolehkan skrip asinkron

JavaScript sangat hebat,
karena mampu memodifikasi hampir semua aspek halaman,
tetapi di sisi lain, juga bisa memblokir konstruksi DOM dan menunda perenderan halaman
(lihat juga [Menambahkan interaktivitas dengan JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)).
Agar JavaScript tidak terus-menerus menunda perenderan halaman,
AMP hanya memperbolehkan JavaScript asinkron. 

Halaman AMP tidak boleh berisi JavaScript apa pun yang disusun oleh penulis program.
Sebagai ganti menggunakan JavaScript,
fitur halaman interaktif ditangani di elemen AMP khusus.
Elemen AMP khusus bisa berisi JavaScript di dalamnya,
tetapi didesain dengan cermat agar tidak menyebabkan penurunan kinerja.

Meskipun diperbolehkan di iframe,
JS pihak ketiga tidak diperbolehkan memblokir perenderan.
Misalnya, jika JS pihak ketiga menggunakan
[API `document.write` yang buruk untuk kinerja](http://www.stevesouders.com/blog/2012/04/10/dont-docwrite-scripts/),
JS ini tidak memblokir perenderan halaman utama.

## Menyatakan ukuran semua sumber daya secara statis

Sumber daya eksternal seperti gambar, iklan, atau iframe harus dinyatakan ukurannya di HTML
sehingga AMP bisa menentukan ukuran dan posisi setiap elemen sebelum sumber daya diunduh.
AMP memuat layout halaman tanpa menunggu sumber daya apa pun untuk diunduh.

AMP melepaskan layout dokumen dari layout sumber daya.
Hanya satu permintaan HTTP yang diperlukan untuk melayout keseluruhan dokumen
([+font](#font-triggering-must-be-efficient)).
Karena AMP dioptimalkan untuk menghindari rekalkulasi gaya dan layout yang bebannya besar di browser,
tidak akan ada layout ulang saat sumber daya dimuat.

## Tidak memperbolehkan mekanisme ekstensi memblokir perenderan

AMP tidak memperbolehkan mekanisme ekstensi memblokir perenderan halaman.
AMP mendukung ekstensi untuk elemen-elemen seperti
[lightbox](/docs/reference/extended/amp-lightbox.html),
[sematan instagram](/docs/reference/extended/amp-instagram.html),
[tweet](/docs/reference/extended/amp-twitter.html), dsb.
Meskipun elemen ini memerlukan permintaan HTTP tambahan,
permintaan tersebut tidak memblokir layout dan perenderan halaman. 

Halaman apa pun yang menggunakan skrip khusus harus memberi tahu sistem AMP
bahwa nantinya akan memiliki tag khusus.
Misalnya, skrip [`amp-iframe`](/docs/reference/extended/amp-iframe.html)
memberi tahu sistem bahwa akan ada tag `amp-iframe`.
AMP membuat kotak iframe sebelum mengetahui apa yang akan disertakan: 

{% highlight html %}
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{% endhighlight %}

## Mempertahankan semua JavaScript pihak ketiga di luar jalur penting

JS pihak ketiga cenderung menggunakan pemuatan JS sinkron.
Skrip ini juga cenderung menerapkan `document.write` pada skrip sinkronisasi lainnya.
Misalnya, jika Anda memiliki lima iklan dan setiap iklan ini melakukan tiga pemuatan sinkronisasi
dengan koneksi latensi 1 detik,
Anda membutuhkan waktu pemuatan 18 detik hanya untuk memuat JS. 

Halaman AMP memperbolehkan JavaScript pihak ketiga tetapi hanya dalam iframe yang di-sandbox.
Dengan mencegahnya masuk ke dalam iframe, JavaScript pihak ketiga tidak bisa memblokir eksekusi halaman utama.
Bahkan apabila memicu rekalkukasi gaya berkali-kali,
iframe-nya yang sangat kecil hanya memiliki sedikit DOM. 

Rekalkulasi gaya dan layout umumnya sebanding dengan ukuran DOM,
sehingga rekalkulasi iframe sangat cepat dibandingkan dengan
rekalkulasi gaya dan layout untuk halaman.

## Semua CSS harus sebaris dan dibatasi ukurannya

CSS memblokir semua perenderan, memblokir pemuatan halaman, dan cenderung besar ukurannya.
Di halaman AMP HTML, hanya gaya sebaris yang diperbolehkan.
Ini menghilangkan 1 permintaan HTTP atau sering kali lebih dari jalur perenderan yang penting
dibanding dengan sebagian besar laman web.

Selain itu, ukuran maksimum style sheet sebaris adalah 50 kilobyte.
Meskipun ukurannya cukup besar untuk halaman yang sangat kompleks,
style sheet sebaris mengharuskan penulis halaman untuk menerapkan gaya penulisan CSS yang bersih.

## Pemicuan font harus efisien

Font web ukurannya sangat besar, sehingga
[pengoptimalan font web](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)
sangat penting bagi kinerja.
Pada halaman umumnya yang memiliki beberapa skrip sinkronisasi dan beberapa style sheet eksternal,
browser menunggu dan terus menunggu untuk mulai mengunduh font yang ukurannya besar hingga semuanya berakhir.

Sistem AMP menyatakan nol permintaan HTTP hingga font mulai diunduh.
Ini hanya bisa dilakukan karena semua JS di AMP memiliki atribut asinkron
dan hanya style sheet sebaris yang diperbolehkan;
tidak ada permintaan HTTP yang memblokir browser mengunduh font.

## Meminimalkan rekalkulasi gaya

Setiap kali Anda mengukur sesuatu, tindakan ini memicu rekalkulasi gaya yang bebannya berat
karena browser harus melayout keseluruhan halaman.
Di halaman AMP, semua pembacaan DOM terjadi di awal sebelum terjadi semua penulisan.
Ini memastikan terjadi maksimal satu rekalkulasi gaya per bingkai.

Ketahui selengkapnya tentang dampak gaya dan rekalkulasi layout terhadap
[kinerja perenderan](https://developers.google.com/web/fundamentals/performance/rendering/).

## Hanya menjalankan animasi yang diakselerasi GPU

Satu-satunya cara untuk mendapatkan pengoptimalan maksimal adalah dengan menjalankan animasi di GPU.
GPU memahami layer serta cara menjalankan beberapa hal di layer ini,
GPU bisa menggerakkannya, memudarkannya, tetapi tidak bisa memperbarui layout halaman;
GPU akan menyerahkan tugas ini kepada browser, yang dampaknya tidak bagus.

Aturan untuk CSS yang berkaitan dengan animasi memastikan animasi bisa diakselerasi oleh GPU.
Khususnya, AMP hanya memperbolehkan animasi dan transisi pada transform dan opacity
sehingga layout halaman tidak diperlukan.
Ketahui selengkapnya tentang
[menggunakan transform dan opacity untuk perubahan animasi](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)

## Memprioritaskan pemuatan sumber daya

AMP mengontrol semua unduhan sumber daya: dengan memprioritaskan pemuatan sumber daya,
memuat hanya apa yang diperlukan, dan mengambil di awal sumber daya yang lambat dimuat. 

Saat mengunduh sumber daya, AMP mengoptimalkan unduhan
sehingga sumber daya yang paling penting saat ini diunduh terlebih dulu.
Gambar dan iklan hanya diunduh jika berpotensi besar dilihat oleh pengguna,
di paro atas, atau jika pengguna berpotensi menggulir ke arahnya dengan cepat.  

AMP juga mengambil sumber daya yang lambat dimuat di awal.
Sumber daya dimuat selambat mungkin, tetapi diambil terlebih dahulu sedini mungkin.
Dengan demikian, semuanya dimuat sangat cepat tetapi CPU hanya dipakai
saat sumber daya benar-benar diperlihatkan ke pengguna.

## Memuat halaman seketika

[API preconnect](http://www.w3.org/TR/resource-hints/#dfn-preconnect) yang baru
sangat sering dipakai untuk memastikan permintaan HTTP secepat mungkin saat dibuat.
Dengan demikian,
halaman bisa dirender sebelum pengguna secara eksplisit menyatakan ingin menuju ke sana;
halaman mungkin sudah tersedia saat pengguna benar-benar memilihnya,
sehingga terjadi pemuatan seketika.

Meskipun pra-perenderan bisa diterapkan pada semua materi web,
tindakan ini juga bisa menggunakan banyak sekali bandwidth dan CPU. AMP dioptimalkan untuk mengurangi kedua faktor ini. Pra-perenderan hanya mengunduh sumber daya di paro atas
dan pra-perenderan tidak merender hal-hal yang memberatkan CPU.

Saat dokumen AMP dipra-render untuk pemuatan seketika,
hanya sumber daya di paro atas yang benar-benar diunduh.
Saat dokumen AMP dipra-render untuk pemuatan seketika,
sumber daya yang berpotensi memakai banyak CPU (seperti iframe pihak ketiga) tidak diunduh. 

Ketahui selengkapnya tentang
[mengapa AMP HTML tidak penuh memanfaatkan pemindai pramuat](https://medium.com/@cramforce/why-amp-html-does-not-take-full-advantage-of-the-preload-scanner-7e7f788aa94e)

## Bantu mempercepat AMP
AMP adalah upaya sumber terbuka.
Kami membutuhkan bantuan Anda untuk semakin mempercepat AMP.
Pelajari [cara berkontribusi](/docs/support/contribute.html).
