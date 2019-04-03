---
$title: Mengintegrasikan AMP dengan aplikasi Anda
---

Panduan ini ditujukan untuk developer aplikasi seluler dan web yang ingin mengintegrasikan dan menautkan aplikasi ke halaman AMP. Sebagai contoh, pertimbangkan aplikasi chat seluler yang memuat versi AMP dari sebuah URL bersama untuk memberikan pengalaman yang lebih cepat kepada pengguna.

## Mentransformasi link ke AMP

Dengan AMP, Anda dapat merender situs eksternal di dalam aplikasi
native atau web seluler nyaris seketika. Anda dapat mencapainya dengan mencocokkan URL di konten Anda
dengan URL AMP-nya yang terkait (jika ada) dan dengan membuka versi AMP,
bukan versi aslinya. Anda dapat menggunakan fitur seperti,
[AMP URL API Google](https://developers.google.com/amp/cache/use-amp-url) untuk
membantu Anda dalam hal ini.

Misalnya, pesan berikut dapat ditransformasi agar menayangkan versi AMP
dengan mengganti semua URL dengan versi AMP-nya yang cocok (jika ada). Untuk
mengurangi waktu muat dan menjamin validitas AMP yang ditayangkan, Anda harus
menaut ke halaman AMP yang tersimpan di Cache AMP.

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

[tip type="success"]
Pertimbangkan untuk memberi pengguna opsi untuk melihat versi non-AMP, bukan
versi AMP, melalui setelan preferensi di aplikasi Anda.
[/tip]

### Cara mentransformasi link

Ada tiga cara untuk mentransformasi link secara terprogram:

1.  **Waktu-tulis sisi-server (lebih disukai)**: Ambil URL AMP melalui AMP URL API
    Google pada waktu penulisan URL dan simpan URL AMP sisi-server. Teruskan kedua
    URL ke klien karena URL asli mungkin diperlukan untuk berbagi.
    Pendekatan ini direkomendasikan karena permintaan jaringan sisi-klien lebih
    sedikit. Saat menggunakan pendekatan ini, penting untuk secara teratur
    (misalnya setiap hari) memindai link guna mendeteksi versi AMP karena semakin banyak situs
    yang menggunakan format AMP.
2.  **Waktu-baca sisi-server (digunakan sebagian orang)**: Ambil URL AMP melalui AMP URL
    API Google sebelum meneruskan konten ke klien. Seperti disebutkan di atas, teruskan
    kedua URL (AMP dan non-AMP) ke klien karena URL asli mungkin
    diperlukan untuk berbagi. Metode ini dapat berguna untuk layanan dengan penyebaran terbatas.
3.  **Sisi-klien (jika sisi-server tidak memungkinkan)**: Ambil URL AMP melalui
    AMP URL API Google dari klien. Gunakan pendekatan ini jika transformasi URL sisi-server
    tidak memungkinkan (misalnya, untuk aplikasi messaging yang menggunakan
    enkripsi menyeluruh). Pastikan untuk memicu transformasi URL segera setelah
    konten tersedia, sebelum terjadi interaksi pengguna.

[tip type="important"]
Jangan minta URL AMP melalui AMP API Google sebagai hasil dari interaksi
pengguna karena hal itu akan menurunkan performa aplikasi Anda saat
memasukkan permintaan jaringan tambahan. Sebaliknya, gunakan salah satu dari tiga pendekatan yang
dijelaskan di atas.
[/tip]

#### AMP URL API Google

Google menyediakan AMP URL API untuk mengambil URL HTML AMP yang cocok untuk
daftar URL tertentu ([dokumentasi resmi](https://developers.google.com/amp/cache/use-amp-url) /
[demo]({{g.doc('/content/amp-dev/documentation/examples/documentation/Using_the_AMP_URL_API.html', locale=doc.locale).url.path}}). URL ini
tidak harus merupakan versi kanonis. Jika ada versi AMP, maka responsnya
akan mencakup URL AMP asli dan URL untuk halaman AMP yang tersimpan di
Cache AMP Google.

Misalnya, untuk daftar URL tertentu:

```json
{"urls": [
  "https://www.example.org/article-with-amp-version",
  "http://www.example.com/no-amp-version.html"
]}
```

Bagian isi respons berisi pemetaan URL AMP dalam format JSON:

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

[tip type="note"]
URL untuk halaman AMP yang tersimpan di Cache AMP non-Google tidak dapat diambil melalui
AMP URL API. Namun, Anda dapat mengambil URL tersimpan dari URL AMP
(ampURL) yang ditampilkan dengan mudah.
[/tip]

## Menggunakan Cache AMP

[Cache AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/index.md', locale=doc.locale).url.path}}) adalah
jaringan penayangan konten (CDN) berbasis proxy untuk menayangkan dokumen AMP yang valid.
Cache AMP didesain untuk:

*   Hanya menayangkan halaman AMP yang valid.
*   Memungkinkan halaman AMP dimuat sebelumnya secara efisien dan aman.
*   Melakukan pengoptimalan performa tambahan pada konten yang berguna bagi pengguna.

Saat ini, ada 2 penyedia Cache AMP:

*   [AMP Cache Google](https://developers.google.com/amp/cache/)
*   [AMP Cache Cloudflare](https://amp.cloudflare.com/)

Hal ini memberikan dua pilihan untuk menampilkan file AMP dalam aplikasi dengan menggunakan:

1.  versi yang dihosting oleh penayang, atau
2.  versi yang dihosting di Cache AMP

Kami merekomendasikan penggunaan Cache AMP dengan alasan berikut:

*  Pengalaman pengguna yang lebih baik karena waktu muat lebih cepat dan latensi rendah
    (waktu muat >1 detik lebih cepat).
*  Keuntungan performa dan bandwidth karena ada penyimpanan cache tambahan untuk artefak yang
    bergantung pada klien, misalnya penyimpanan cache versi berbeda dari gambar yang sama
    tergantung ukuran viewport klien.
*  File AMP asli mungkin bukan lagi AMP yang valid, yang dapat mengakibatkan
    pengalaman pengguna yang buruk. Dalam hal ini, Cache AMP menayangkan versi
    valid terakhir dari file AMP.
*  Penayang yang tidak jujur dapat menayangkan dua dokumen berbeda ke
    crawler Cache AMP dan ke pengguna. Penggunaan Cache AMP menjamin bahwa
    pengguna akan selalu melihat file AMP yang sama dengan Cache.

[tip type="important"]
Saat menayangkan halaman AMP melalui Cache AMP, berikan pengalaman yang
menunjukkan dengan jelas asal AMP dan menawarkan kemungkinan bagi pengguna untuk
membagikan URL kanonis (untuk mengetahui lebih lanjut tentang ini, lihat juga dua bagian berikut).
[/tip]

## Mengimplementasikan AMP Viewer

AMP Runtime dilengkapi Viewer API, yang menyediakan protokol untuk mengirim dan
menerima pesan antara AMP Runtime dan Viewer. Hal ini memungkinkan pengguna untuk
mengontrol pra-render dokumen AMP, gerakan menggeser antar-artikel, dan
instrumentasi AMP Runtime. Anda dapat mempelajari AMP Viewer API lebih lanjut dalam panduan
[Menghubungkan AMP Viewer dengan halaman AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md)
. Implementasi Viewer untuk [web](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md)
dan [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios)
tersedia di [GitHub](https://github.com/ampproject/amp-viewer). Viewer Android
belum tersedia, lihat [jawaban ini](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038)
di Stack Overflow untuk mengetahui cara terbaik dalam mengonfigurasi WebView untuk menampilkan halaman AMP.

Berikut ini beberapa praktik terbaik umum untuk mengimplementasikan AMP Viewer:

*   Tayangkan halaman AMP dari Cache AMP (waktu muat >1 detik lebih cepat).
*   Tampilkan asal penayang artikel (misalnya dalam header yang dapat diciutkan).
*   Sediakan tindakan berbagi (lihat juga bagian "[Membagikan Konten AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/integrate-with-apps.md', locale=doc.locale).url.path}}#sharing-amp-content)"
    di bawah).
*   Pada penampil berbasis WebView, aktifkan cookie pihak ketiga.
*   Setel perujuk untuk platform/aplikasi Anda.

### Membagikan Konten AMP

Jika dokumen AMP dibagikan dari dalam AMP Viewer platform, maka platform tersebut
harus membagikan URL kanonis jika hal itu memungkinkan secara teknis. Misalnya, jika
platform menyediakan tombol bagikan, tombol ini harus membagikan URL kanonis.

Filosofi dari Proyek AMP adalah platform harus bisa memilih versi dokumen mana yang
ditampilkan ke pengguna. Karena alasan ini, membagikan versi kanonis
(bukan versi AMP) merupakan pendekatan yang paling masuk akal saat
membagikan ke platform yang berbeda, lalu platform target diharapkan membuat
pilihan yang tepat.
