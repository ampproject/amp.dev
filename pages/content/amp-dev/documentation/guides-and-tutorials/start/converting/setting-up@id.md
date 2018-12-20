---
$title: Menyiapkan
$order: 0
$parent: /content/amp-dev/documentation/guides-and-tutorials/start/converting/converting.md
---

## Prasyarat

**Sebelum memulai** tutorial ini, Anda memerlukan hal-hal berikut:

- Pengetahuan dasar tentang HTML, CSS, dan JavaScript
- Browser pilihan Anda yang dapat memeriksa konsol JavaScript
- Editor teks pilihan Anda

## Siapkan lingkungan pengembangan

### Langkah 1. Download kode sampel

Download kode sampel untuk tutorial dalam format [file ZIP](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip) atau melalui git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

Ekstrak file arsip (jika perlu) dan buka direktori project melalui baris perintah di komputer Anda:

```shell
cd accelerated-mobile-pages-foundations
```

Direktori project berisi beberapa contoh file resource dan halaman awal [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html).

### Langkah 2. Jalankan halaman sampel tersebut

Untuk menguji halaman sampel, kami perlu mengakses file dari server web. Ada beberapa cara untuk membuat server web lokal sementara untuk tujuan pengujian.  Berikut adalah beberapa opsinya, pilih salah satu opsi terbaik bagi Anda:

- [Aplikasi Google Chrome “Web Server for Chrome”](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Server Python HTTP lokal](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

Catatan: Sebaiknya Anda menggunakan HTTPS di lingkungan produksi. HTTPS memiliki beberapa keunggulan selain di sektor keamanan, termasuk SEO. Anda dapat membaca selengkapnya tentang topik ini di artikel [entri blog Google Webmaster](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html) ini.

Setelah menyiapkan server web lokal, buka artikel sampel pada browser Anda di [URL ini](http://localhost:8000/article.html):

```text
http://localhost:8000/article.html
```

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/building-page.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>
