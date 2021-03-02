---
'$title': Menyajikan AMP dengan menggunakan komunikasi bertanda tangan
$order: 4
formats:
  - websites
author: CrystalOnScript
---

AMP memberikan manfaat kecepatan di atas dan melampaui format melalui berbagai teknik, seperti penyimpanan di cache dan pemuatan sebelumnya. Manfaat-manfaat ini bisa mempunyai [sisi buruk](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/), seperti URL ekstra ditampilkan saat disematkan di dalam [Penampil AMP](https://developers.google.com/search/docs/guides/about-amp). Dengan menyajikan konten AMP menggunakan pertukaran atau komunikasi bertanda tangan, Anda dapat menggunakan fitur platform web baru untuk mengatasi semua ini.

Sebuah [komunikasi bertanda tangan](https://developers.google.com/web/updates/2018/11/signed-exchanges) terdiri atas dokumen AMP yang valid dan URL asli konten. Informasi ini dilindungi oleh tanda tangan digital yang dengan aman mengikatkan dokumen tersebut ke URL yang diklaimnya. Ini memungkinkan browser untuk dengan aman menampilkan URL asli di bilah URL, bukan hostname mesin yang mengirimkan byte ke browser tersebut.

Konten AMP bertanda tangan dikirimkan _sebagai tambahan_ (bukan pengganti), konten AMP yang biasa.

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='Image displaying URL from signed exchange', caption=' ', align='' ) }}

[tip type="note"] Fitur ini saat ini didukung di Chrome, namun penerapannya direncanakan untuk browser lain juga. [/tip]

# Apakah komunikasi bertanda tangan akan berhasil untuk saya?

Untuk menerapkan komunikasi bertanda tangan, Anda harus memenuhi persyaratan berikut ini:

- Kemampuan untuk mengonfigurasi dan mengontrol tajuk HTTP dihasilkan oleh server Anda. (Kebanyakan solusi penyediaan web murni, seperti Blogger _tidak_ kompatibel dengan komunikasi bertanda tangan.)
- Kemampuan untuk menghasilkan komunikasi bertanda tangan AMP, seperti dengan menjalankan [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md), sebagai sebuah [Go binary](https://golang.org/doc/install), atau di dalam sebuah [Docker VM](https://docs.docker.com/machine/get-started/).
  - Pengemas harus diperbarui setiap enam minggu.
- Kemampuan untuk [Berbeda](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) pada tajuk `Accept` dan `AMP-Cache-Transform` pada server HTTP edge, mengembalikan konten yang berbeda untuk URL yang sama.
- Sistem yang menjalankan `amppackager` harus dapat membuat permintaan jaringan keluar ke:
  - Otoritas sertifikat yang menerbitkan sertifikat Anda
  - Server penayang yang mengelola dokumen AMP yang akan ditandatangani
  - `cdn.ampproject.org` untuk memperoleh versi AMP saat ini
- Sistem berkas penyimpanan bersama yang persisten di antara semua contoh `amppackager` yang berjalan di pusat data yang sama.

# Menerapkan komunikasi bertanda tangan

Di bawah ini adalah order yang disarankan untuk penerapan yang mendukung komunikasi bertanda tangan pada dokumen AMP Anda.

## Memperoleh sertifikat TLS yang didukung

Untuk menghasilkan komunikasi bertanda tangan, Anda membutuhkan sertifikat TLS dengan ekstensi `CanSignHttpExchanges`. Sejak bulan April 2019, [DigiCert](https://www.digicert.com/) adalah satu-satunya penyedia ekstensi ([info selengkapnya](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/)) ini.

Agar dapat menghasilkan sertifikat ini, Otoritas Sertifikat (CA) akan membutuhkan Permintaan Penandatanganan Sertifikat (CSR), yang dapat dihasilkan oleh `openssl`. Sebuah contoh CSR untuk `ampbyexample.com`:

```sh
# generate private key (if necessary)

$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey
# generate CSR (the file ampbyexample-packager.csr)

$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```

## Menentukan URL mana yang akan ditandatangani

Anda perlu untuk membuat pola URL yang menentukan dokumen mana yang perlu ditandatangani. Sangat penting agar konten pribadi, seperti informasi yang dipersonalisasi, tidak ditandatangani, untuk menghindari pengiriman konten yang menyesatkan atau tidak benar.

Demi keperluan kinerja, pengemas hanya boleh melewatkan dokumen AMP yang valid sebagai input. Beberapa dokumen AMP yang tidak valid boleh jika diperlukan, namun Anda harus menghindari pengiriman semua lalu lintas melalui pengemas tersebut.

## Menggunakan pengemas untuk server tahap penguji (staging server)

Anda harus terlebih dahulu menyiapkan komunikasi bertanda tangan pada server tahap penguji untuk memverifikasi bahwa pengaturan Anda sudah benar sebelum bermigrasi ke produksi.

Kami menyarankan untuk menggunakan [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md) untuk menghasilkan komunikasi bertanda tangan. Namun, jika ini tidak cocok dengan lingkungan produksi Anda, Anda sebaliknya dapat menggunakan klien baris perintah [`transform`](https://github.com/ampproject/amppackager/blob/master/transformer/README.md) dan [`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange), dan menangani sendiri tugas manajemen sertifikat serta negosiasi konten.

Instruksi berikut ini berlaku pada penerapan yang menggunakan `amppackager`.

### Konfigurasi

Berkas konfig [`amppackager`](https://github.com/ampproject/amppackager) (`amppkg.toml`) memanggil **CertFile** dan sebuah **KeyFile**.

**KeyFile** adalah kunci pribadi (`ampbyexample-packager.key` di dalam contoh di atas), dan seharusnya mempunyai format berikut ini. (Catatan: jangan bagikan kunci pribadi Anda sendiri, dan hindari membaginya secara tidak sengaja!)

```txt
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINDgf1gprbdD6hM1ttmRC9+tOqJ+lNRtHwZahJIXfLADoAoGCCqGSM49
…
4j1NY29jVmAMQYrBYb+6heiv6ok+8c/zJQ==
-----END EC PRIVATE KEY-----
```

**CertFile** adalah sertifikat publik. Jika DigiCert yang telah menyediakan sertifikat tersebut, ini dapat dibuat dengan menggabungkan sertifikat yang spesifik untuk asal tertentu yang disediakan oleh DigiCert dan berkas `DigiCertCA.crt`.

```txt
-----BEGIN CERTIFICATE-----
MIIE0zCCBFmgAwIBAgIQCkEgeFknZluZtdcJnvdFCjAKBggqhkjOPQQDAjBMMQsw
CQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMSYwJAYDVQQDEx1EaWdp
Q2VydCBFQ0MgU2VjdXJlIFNlcnZlciBDQTAeFw0xODEwMzAwMDAwMDBaFw0xOTEx
MDYxMjAwMDBaMGIxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJjYTEWMBQGA1UEBxMN
TW91bnRhaW4gVmlldzETMBEGA1UEChMKR29vZ2xlIExMQzEZMBcGA1UEAxMQYW1w
YnlleGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAGu0CjzWa6i
…
PXLGRK8i0lr7Jv6ZKPY8tfaB/c5yK404QU4HNggmAiEAlnNjIerjJOLHb8CvVaUQ
nhhn0a35nHp1yvE651W14fMwCgYIKoZIzj0EAwIDaAAwZQIwI4/7dpqJQxkQwpP3
DAjVOFdjC6PDcUIRPll3bF0srrTUXSyZ8xkM4q/RhB51A0hVAjEAsUGNYBje9RIO
wf9qyV2iHB+9cBwgKfC0KvEcBugbgHShypM8hPhV9UMC3qTpdKPx
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIDrDCCApSgAwIBAgIQCssoukZe5TkIdnRw883GEjANBgkqhkiG9w0BAQwFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaMEwxCzAJBgNVBAYTAlVT
…
loB5hWp2Jp2VDCADjT7ueihlZGak2YPqmXTNbk19HOuNssWvFhtOyPNV6og4ETQd
Ea8/B6hPatJ0ES8q/HO3X8IVQwVs1n3aAr0im0/T+Xc=
-----END CERTIFICATE-----
```

### Penginstalan

Ikuti instruksi [di sini untuk mengatur `amppackager` untuk situs Anda](https://github.com/ampproject/amppackager/blob/master/README.md).

[tip type="read-on"] Lihat [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js) (yang digunakan oleh `amp.dev`) untuk mengetahui contoh perubahan sisi server yang perlu Anda buat untuk mengarahkan rute permintaan yang diperlukan ke `amppkg`. [/tip]

### Pengujian

Verifikasi bahwa situs pengaturan tahap Anda sesuai dengan konten jenis MIME `application/signed-exchange` jika ditentukan dengan permintaan HTTP. Contohnya: (ganti `staging.example.com` dengan server tahap penguji Anda):

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

Output harus menyertakan baris ini:

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"] `v="1..100"` dalam permintaan ini adalah bakal tempat. Jangan cocokkan dengan nilai tepatnya, tetapi [sebagaimana telah dijelaskan di dalam instruksi penginstalan amppackager](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing), periksa adanya tajuk `amp-cache-transform` saja, dan abaikan nilainya. [/tip]

[tip type="important"] Untai versi `v=b3` di dalam tanggapan adalah versi sejak bulan August 2019. Versi ini akan berubah. [/tip]

Kelompok tanggapan seharusnya halaman AMP Anda (dalam teks polos). Ada tajuk biner kecil, dan, jika halamannya > 16 kb, beberapa byte biner disebarkan.

[Alat`dump-signedexchange`](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation) dapat digunakan untuk memeriksa tanggapan:

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

(Perhatikan bahwa tombol `-verify` tidak akan berfungsi pada tahap ini karena sertifikat yang diperlukan tidak berada di server `https://example.com/`.)

Verifikasi bahwa tanggapan _selalu _ menyertakan tajuk `Vary` dengan nilai `Accept,AMP-Cache-Transform` (terlepas dari apakah jenis MIME-nya adalah `text/html`, `application/signed-exchange`, atau yang lain):

```sh
$ curl -si https://staging.example.com/ | less
```

Output harus menyertakan baris ini:

```txt
vary: Accept,AMP-Cache-Transform
```

## Menggunakan pengemas pada produksi

### Penginstalan

Sesuaikan langkah-langkah penggunaan pengaturan tahap di atas sebagaimana mestinya untuk lingkungan produksi Anda.

### Pengujian

#### Dengan alat baris perintah

Jalankan pengujian yang sama seperti di atas. `dump-signedexchange -verify` seharusnya kini berhasil juga.

#### Dengan Chrome

Anda juga dapat menguji Chrome dengan bantuan [ekstensi ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en). Instal dari Chrome Webstore dan konfigurasi `Request Headers` ke `amp-cache-transform` dengan sebuah `Value` dari `google`.

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='Testing Chrome with the help of the ModHeader extension', caption=' ', align='' ) }}

Setelah meminta `https://example.com/`, server Anda akan menyampaikan sebuah komunikasi bertanda tangan, namun akan terlihat dan bertindak sama seperti sebelumnya. Anda perlu memeriksa apakah komunikasi bertanda tangan telah dikembalikan atau dihasilkan dengan benar melalui [konsol DevTools](https://developers.google.com/web/tools/chrome-devtools/).

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='Signed exchange header displayed in the DevTools console', caption=' ', align='' ) }}

Di bawah bilah `Network`, klik nama domain Anda dan periksa apakah `Signed HTTP exchange` muncul di bawah `Preview`.

#### Dengan Cache AMP Google

Konfirmasi bahwa komunikasi bertanda tangan kompatibel dengan cache AMP Google. Ini terkait dengan kemampuan mereka untuk ditemukan di mesin pencari, seperti Google Search.

Untuk menguji komunikasi bertanda tangan di cache AMP Google, buka bilah jaringan di DevTools, aktifkan `Preserve log`, lalu buka URL, seperti `https://example-com.cdn.ampproject.org/wp/s/example.com/`.

DevTools akan memperlihatkan `200` dengan baris `signed-exchange`, dan baris `from signed-exchange`, jika permintaan tersebut berhasil.

Jika tidak berhasil, baris komunikasi bertanda tangan tidak akan ada, atau akan disorot merah. Sebuah tajuk `warning` juga mungkin memberikan informasi tambahan.

## Komunikasi bertanda tangan di Google Search

Jika halaman AMP Anda berhasil didistribusikan sebagai komunikasi bertanda tangan, hasil pencarian mereka akan menampilkan AMP secepat kilat, sama seperti sebelumnya, namun mengetuk hasilnya akan memperlihatkan `https://example.com` pada bilah URL, bukan URL yang diawali dengan `https://www.google.com/amp/….`. Selain itu, bilah `viewer` tidak akan muncul.

Di dalam konsol DevTools, di bawah bilah `network`, Anda akan dapat melihat `signed-exchange` di bawah kolom `type`.

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='Within the DevTools console, under the network tab, you will be able to see signed-exchange under the type column.', caption=' ', align='' ) }}

# Penyedia layanan komunikasi bertanda tangan

Berikut ini adalah daftar CDN dan penyedia pengelolaan (hosting) yang menawarkan dukungan unik untuk komunikasi bertanda tangan. Menggunakan salah satu dari ini adalah cara termudah untuk memulai dengan komunikasi bertanda tangan:

- [AMP Packager Google Cloud Click-to-Deploy Installer](https://console.cloud.google.com/marketplace/details/google/amp-packager?filter=solution-type:k8s) [AMP Packager](https://github.com/ampproject/amppackager#amp-packager) adalah alat untuk meningkatkan URL AMP dengan menyajikan AMP menggunakan Komunikasi Bertanda Tangan. Bacalah selengkapnya di [Blog AMP](https://blog.amp.dev/2020/11/23/amp-packager-is-now-available-on-google-cloud-marketplace/).
- [URL Asli AMP Cloudflare](https://www.cloudflare.com/website-optimization/amp-real-url/). [Cloudflare](https://www.cloudflare.com/) adalah satu dari jaringan terbesar dunia. Saat ini, bisnis, nirlaba, blogger, dan siapa pun yang ada di internet mempunyai situs web dan aplikasi yang lebih cepat dan lebih aman berkat Cloudflare.
