---
'$title': Menyiapkan
$order: 0
description: 'Menyiapkan lingkungan pengembangan Anda: Langkah ke-1. Mengunduh kode. Unduh kode sampel untuk tutorial, baik sebagai berkas ZIP maupun melalui git ....'
'$parent': '/documentation/guides-and-tutorials/start/converting/setting-up.md'
---

## Prasyarat

**Sebelum memulai** tutorial ini, Anda akan memerlukan hal-hal berikut ini:

- Pengetahuan dasar tentang HTML, CSS, dan JavaScript
- Browser pilihan Anda yang dapat memeriksa konsol JavaScript
- Editor teks pilihan Anda

## Menyiapkan lingkungan pengembangan

### Langkah ke-1. Mengunduh kode

Unduh kode sampel untuk tutorial, baik dalam [berkas ZIP](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip) maupun melalui git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

Ekstrak berkas arsip (jika diperlukan) dan buka direktori proyek melalui baris perintah di komputer Anda:

```shell
cd accelerated-mobile-pages-foundations
```

Direktori proyek berisi beberapa berkas sumber daya yang menjadi contoh dan halaman awal [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html).

### Langkah ke-2. Menjalankan halaman sampel

Untuk menguji halaman sampel, kita harus mengakses berkas dari server web. Ada beberapa cara untuk membuat server web lokal sementara untuk tujuan pengujian. Berikut ini adalah beberapa opsinya, pilih salah satu opsi yang terbaik bagi Anda:

- [Aplikasi Google Chrome “Web Server for Chrome”](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Server Python HTTP lokal](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] **CATATAN –** Anda sangat disarankan untuk menggunakan HTTPS di lingkungan produksi. HTTPS memiliki beberapa manfaat di luar keamanan, termasuk SEO. Anda dapat membaca lebih lanjut tentang topik ini di [muatan berita blog Google Webmaster](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html). [/tip]

Setelah menyiapkan server web lokal Anda, buka artikel sampel pada browser Anda di [URL ini](http://localhost:8000/article.html):

```text
http://localhost:8000/article.html
```
