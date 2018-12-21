---
$title: Menyiapkan
---

## Prasyarat

**Sebelum memulai** tutorial ini, Anda memerlukan hal-hal berikut:

- Pengetahuan dasar tentang HTML, CSS, dan JavaScript
- Pemahaman dasar tentang konsep inti AMP (lihat tutorial ["Mengonversi HTML menjadi AMP"]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/index.md', locale=doc.locale).url.path}}))
- Browser pilihan Anda yang dapat memeriksa konsol JavaScript
- Editor teks pilihan Anda

## Siapkan lingkungan pengembangan

### Langkah 1. Download kode sampel

Download kode sampel untuk tutorial dalam format [file ZIP](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/archive/master.zip) atau melalui git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-advanced.git
```

Ekstrak file arsip (jika perlu) dan buka direktori project melalui baris perintah di komputer Anda:

```shell
cd accelerated-mobile-pages-advanced
```

Direktori project berisi beberapa contoh file resource dan halaman awal [`article.amp.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html).

### Langkah 2. Jalankan halaman sampel tersebut

Untuk menguji halaman AMP sampel, kami perlu mengakses file dari server web. Ada beberapa cara untuk membuat server web lokal sementara untuk tujuan pengujian.  Berikut adalah beberapa opsinya, pilih salah satu opsi terbaik bagi Anda:

- [Aplikasi Google Chrome “Web Server for Chrome”](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Server Python HTTP lokal](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

Catatan: Sebaiknya Anda menggunakan HTTPS di lingkungan produksi. HTTPS memiliki beberapa keunggulan selain di sektor keamanan, termasuk SEO. Anda dapat membaca selengkapnya tentang topik ini di artikel [entri blog Google Webmaster] ini(https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html).

Setelah menyiapkan server web lokal, buka artikel sampel pada browser Anda di [URL ini](http://localhost:8000/article.amp.html):

```text
http://localhost:8000/article.amp.html
```

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="/id/docs/fundamentals/add_advanced/review_code.html"><span class="arrow-next">Berikutnya</span></a>
</div>
