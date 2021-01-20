---
"$title": Mengintegrasikan AMP dengan aplikasi Anda
"$order": '2'
description: 'Panduan ini ditujukan untuk pengembang aplikasi web dan seluler yang ingin mengintegrasikan dan menautkan ke halaman AMP. Contoh: pertimbangkan aplikasi obrolan seluler ....'
formats:
- websites
---

Panduan ini ditujukan untuk pengembang aplikasi web dan seluler yang ingin mengintegrasikan dan menautkan ke halaman AMP. Contoh: pertimbangkan aplikasi obrolan seluler yang memuat versi AMP dari sebuah URL bersama untuk memberikan pengalaman yang lebih cepat kepada pengguna.

## Mentransformasi tautan ke AMP

Dengan AMP, Anda dapat merender situs eksternal di dalam aplikasi native atau web seluler nyaris seketika. Anda dapat mencapainya dengan mencocokkan URL di konten Anda dengan URL AMP-nya yang terkait (jika ada) dan dengan membuka versi AMP, bukan versi aslinya. Anda dapat menggunakan fitur seperti, [AMP URL API Google](https://developers.google.com/amp/cache/use-amp-url) untuk membantu Anda dalam hal ini.

Contoh: pesan berikut ini dapat ditransformasi agar menayangkan versi AMP dengan mengganti semua URL dengan versi AMP-nya yang cocok (jika ada). Untuk mengurangi waktu muat dan menjamin validitas AMP yang ditayangkan, Anda harus menautkan ke halaman AMP yang tersimpan di Cache AMP.

Pesan asli:

```text
This is a message with links to an <a href="http://www.example.org/a">
article with AMP version</a> and an <a href="http://www.example.org/b"> article without AMP version</a>.
```

Pesan hasil transformasi:

```text
This is a message with links to an <a href="https://www-example-org.cdn.ampproject.org/c/www.example.org/a">
article with AMP version</a> and an <a href="www.example.org/b"> article without AMP version</a>.
```

[tip type="tip"] **KIAT –** Pertimbangkan untuk memberi pengguna opsi untuk melihat versi non-AMP, bukan versi AMP, melalui pengaturan preferensi di aplikasi Anda. [/tip]

### Cara mentransformasi tautan

Ada tiga cara untuk mentransformasi tautan secara terprogram:

1. **Waktu-tulis sisi-server (lebih disukai)**: Ambil URL AMP melalui API URL AMP Google pada waktu penulisan URL dan simpan URL AMP sisi-server. Teruskan kedua URL ke klien karena URL asli mungkin diperlukan untuk berbagi. Pendekatan ini direkomendasikan karena permintaan jaringan sisi-klien lebih sedikit. Saat menggunakan pendekatan ini, penting untuk secara teratur (contoh: setiap hari) memindai tautan guna mendeteksi versi AMP karena semakin banyak situs yang menggunakan format AMP.
2. **Waktu-baca sisi-server (digunakan sebagian orang)**: Ambil URL AMP melalui API URL AMP Google sebelum meneruskan konten ke klien. Seperti disebutkan di atas, teruskan kedua URL (AMP dan non-AMP) ke klien karena URL asli mungkin diperlukan untuk berbagi. Metode ini dapat berguna untuk layanan dengan penyebaran terbatas.
3. **Sisi-klien (jika sisi-server tidak memungkinkan)**: Ambil URL AMP melalui API URL AMP Google dari klien. Gunakan pendekatan ini jika transformasi URL sisi-server tidak memungkinkan (contoh: untuk aplikasi pertukaran pesan yang menggunakan enkripsi menyeluruh). Pastikan untuk memicu transformasi URL segera setelah konten tersedia, sebelum terjadi interaksi pengguna.

[tip type="important"] **PENTING –** Jangan pernah minta URL AMP melalui API AMP Google sebagai hasil dari interaksi pengguna karena hal itu menurunkan kinerja aplikasi Anda saat memasukkan permintaan jaringan tambahan. Sebaliknya, gunakan salah satu dari tiga pendekatan yang dijelaskan di atas. [/tip]

#### API URL AMP Google

Google menyediakan API URL AMP untuk mengambil URL HTML AMP yang cocok untuk daftar URL tertentu ([dokumentasi resmi](https://developers.google.com/amp/cache/use-amp-url) / [demo](../../../documentation/examples/documentation/Using_the_AMP_URL_API.html). URL ini tidak harus merupakan versi kanonis. Jika ada versi AMP, maka responsnya akan mencakup URL AMP asli dan URL untuk halaman AMP yang tersimpan di Cache AMP Google.

Contoh: untuk daftar URL tertentu:

```json
{"urls": [
  "https://www.example.org/article-with-amp-version",
  "http://www.example.com/no-amp-version.html"
]}
```

Bagian badan respons berisi pemetaan URL AMP dalam format JSON:

```json
{
  "ampUrls": [
    {
      "originalUrl": "https://www.example.org/article-with-amp-version",
      "ampUrl": "https://www.example.org/article-with-amp-version/amp",
      "cdnAmpUrl": "https://www-example-org.cdn.ampproject.org/c/s/www.example.org/article-with-amp-version"
    }
  ],
  "urlErrors": [
    {
      "errorCode": "NO_AMP_URL",
      "errorMessage": "AMP URL not found.",
      "originalUrl": "http://www.example.com/no-amp-version.html"
    }
  ]
}
```

[tip type="note"] URL untuk halaman AMP yang tersimpan di Cache AMP non-Google tidak dapat diambil melalui API URL AMP. Namun, Anda dapat mengambil URL di cache dari URL AMP (ampURL) yang ditampilkan dengan mudah. [/tip]

## Menggunakan Cache AMP

[Cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) adalah jaringan penayangan konten (CDN) berbasis proksi untuk menayangkan dokumen AMP yang valid. Cache AMP didesain untuk:

- Hanya menayangkan halaman AMP yang valid.
- Memungkinkan halaman AMP dimuat sebelumnya secara efisien dan aman.
- Melakukan pengoptimalan kinerja tambahan pada konten yang berguna bagi pengguna.

Saat ini, ada dua penyedia Cache AMP:

- [Cache AMP Google](https://developers.google.com/amp/cache/)
- [Cache AMP Bing](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

Hal ini memberikan dua pilihan untuk menampilkan berkas AMP dalam aplikasi dengan menggunakan salah satu dari:

1. versi yang dikelola oleh penayang, atau
2. versi yang dikelola di Cache AMP

Kami merekomendasikan penggunaan Cache AMP karena alasan berikut ini:

- Pengalaman pengguna yang lebih baik karena waktu muat lebih cepat dan latensi rendah (waktu muat >1 detik lebih cepat).
- Keuntungan kinerja dan bandwidth karena ada penyimpanan cache tambahan untuk artefak yang bergantung pada klien, contoh: penyimpanan cache versi berbeda dari gambar yang sama tergantung ukuran viewport klien.
- Berkas AMP asli mungkin bukan lagi AMP yang valid, yang dapat mengakibatkan pengalaman pengguna yang buruk. Dalam hal ini, Cache AMP menayangkan versi valid terakhir dari berkas AMP.
- Penayang yang tidak jujur dapat menayangkan dua dokumen berbeda ke crawler Cache AMP dan kepada pengguna Anda. Penggunaan Cache AMP menjamin bahwa pengguna akan selalu melihat berkas AMP yang sama dengan yang di Cache.

[tip type="important"] **PENTING –** Saat menayangkan halaman AMP melalui Cache AMP, berikan pengalaman penampil yang dengan jelas menunjukkan asal AMP dan menawarkan kemungkinan bagi pengguna untuk membagikan URL kanonis (kunjungi juga dua bagian berikut ini untuk mengetahui informasi selengkapnya tentang hal ini). [/tip]

## Menerapkan Penampil AMP

Runtime AMP dilengkapi API Penampil, yang menyediakan protokol untuk mengirimkan dan menerima pesan antara Penampil dan Runtime AMP. Hal ini memungkinkan pengguna untuk mengontrol pra-perenderan dokumen AMP, mengusap antar-artikel, dan instrumentasi Runtime AMP. Anda dapat mempelajari API Penampil AMP lebih lanjut dalam panduan [Menghubungkan Penampil AMP dengan halaman AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) . Penerapan Penampil untuk [web](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md) dan [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) tersedia di [GitHub](https://github.com/ampproject/amp-viewer). Penampil Android belum tersedia, lihat [jawaban ini](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038) di Stack Overflow untuk mengetahui cara terbaik dalam mengonfigurasi WebView untuk menampilkan halaman AMP.

Berikut ini adalah beberapa praktik terbaik umum untuk menerapkan Penampil AMP:

- Tayangkan halaman AMP dari Cache AMP (waktu muat >1 detik lebih cepat).
- Tampilkan asal penayang artikel (cth.: dalam tajuk yang dapat diciutkan).
- Sediakan tindakan berbagi (kunjungi juga bagian "[Membagikan Konten AMP](integrate-with-apps.md#sharing-amp-content)" di bawah ini).
- Pada penampil berbasis WebView, aktifkan cookie pihak ketiga.
- Tetapkan sebuah perujuk untuk platform/aplikasi Anda.

### Membagikan Konten AMP <a name="sharing-amp-content"></a>

Jika dokumen AMP dibagikan dari dalam Penampil AMP platform, maka platform tersebut harus membagikan URL kanonis jika hal itu memungkinkan secara teknis. Contoh: jika platform menyediakan tombol bagikan, tombol ini harus membagikan URL kanonis.

Filosofi dari Proyek AMP adalah platform harus bisa memilih versi dokumen mana yang ditampilkan ke pengguna. Karena alasan ini, membagikan versi kanonis (bukan versi AMP) merupakan pendekatan yang paling masuk akal saat membagikan ke platform yang berbeda, lalu platform target diharapkan membuat pilihan yang tepat.
