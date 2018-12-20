---
$title: Menyiapkan
---

## Prasyarat

Sebelum memulai tutorial ini, Anda akan memerlukan hal berikut:

- Pengetahuan dasar tentang HTML, CSS, dan JavaScript
- Pemahaman dasar tentang konsep inti AMP (lihat tutorial ["Mengonversi HTML menjadi AMP"](/id/docs/fundamentals/converting.html))
- Browser pilihan Anda
- Editor teks pilihan Anda

## Menyiapkan lingkungan pengembangan

#### Langkah 1. Download kodenya

1.  Download kode untuk tutorial, yang dikompresi sebagai file zip dari URL berikut: <a href="https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip">https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip</a>

2. Ekstrak konten file zip tersebut.  Di direktori **amp-pets-story** terdapat file gambar, video, audio, dan data yang akan kita gunakan untuk membuat artikel.  File **pets.html** adalah titik awal kita untuk artikel. Artikel dalam versi jadi dapat dilihat pada file [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html).

#### Langkah 2. Jalankan halaman sampel tersebut

Untuk menguji contoh artikel, kita harus mengakses filenya dari server web. Ada beberapa cara untuk membuat server web lokal sementara untuk tujuan pengujian.  Berikut adalah beberapa opsinya, pilih salah satu opsi terbaik bagi Anda:

- [Aplikasi Google Chrome “Web Server for Chrome”](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Server Python HTTP lokal](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

Setelah menyiapkan server web lokal, lihat tampilan artikel yang sudah jadi pada akhir tutorial ini dengan mengakses <a href="http://localhost:8000/pets-completed.html">URL</a> berikut:

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"]

Pastikan URL ditayangkan dari `localhost`; jika tidak, artikel AMP mungkin tidak akan dimuat dengan benar, dan Anda mungkin akan menemukan error seperti `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost`.

[/tip]


Klik pada artikel yang sudah jadi dan pahami apa yang akan kita buat.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/id/docs/getting_started/visual_story.html"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="/id/docs/getting_started/visual_story/parts_of_story.html"><span class="arrow-next">Berikutnya</span></a>
</div>
 
