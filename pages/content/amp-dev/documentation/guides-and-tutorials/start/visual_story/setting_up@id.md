---
'$title': Setting up
$order: 1
description: 'Menyiapkan lingkungan pengembangan Anda: Langkah ke-1. Unduh kodenya. Unduh kode sampel untuk tutorial, baik sebagai berkas ZIP atau melalui git ....'
author: bpaduch
---

## Prasyarat

Sebelum memulai tutorial ini, Anda akan memerlukan hal berikut ini:

- Pengetahuan dasar tentang HTML, CSS, dan JavaScript
- Pemahaman dasar tentang konsep inti AMP (lihat tutorial ["Mengonversi HTML Anda menjadi AMP"](../../../../documentation/guides-and-tutorials/start/converting/setting-up.md))
- Browser pilihan Anda
- Editor teks pilihan Anda

## Menyiapkan lingkungan pengembangan

#### Langkah ke-1. Mengunduh kode

1. Unduh kode untuk tutorial, yang dikompresi sebagai berkas zip dari URL berikut ini: <a href="/static/files/tutorials/amp-pets-story.zip">/static/files/tutorials/amp-pets-story.zip</a>

2. Ekstrak konten berkas zip tersebut. Di direktori **amp-pets-story** ada berkas gambar, video, audio, dan data yang akan kita gunakan untuk membuat cerita. Berkas **pets.html** adalah titik awal kita untuk cerita ini. Cerita yang sudah jadi atau selesai dapat dilihat pada berkas [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html).

#### Langkah ke-2. Menjalankan halaman sampel

Untuk menguji Cerita Web sampel, kita harus mengakses berkasnya dari server web. Ada beberapa cara untuk membuat server web lokal sementara untuk tujuan pengujian. Berikut ini adalah beberapa opsinya, pilih salah satu opsi terbaik bagi Anda:

- [Aplikasi Google Chrome “Web Server for Chrome”](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Server Python HTTP lokal](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

After setting up your local web server, have a look at what our completed Web Story will look like by the end of this tutorial by accessing the following <a href="http://localhost:8000/pets-completed.html">URL</a>:

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"] <strong>PENTING –</strong> Pastikan URL ditayangkan dari <code>localhost</code>; jika tidak, Cerita Web ini mungkin tidak akan dimuat dengan benar, dan Anda mungkin akan menemukan eror, seperti `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.` [/tip]

Klik pada cerita yang sudah jadi dan pahami apa yang akan kita buat.
