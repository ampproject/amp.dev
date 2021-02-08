---
'$title': Memvalidasi Email AMP
$order: 1
author: CrystalOnScript
formats:
  - email
---

Email AMP bergantung pada perpustakaan AMP JS untuk mengaktifkan pengalaman kaya yang dinamis dan interaktif bagi pembaca. Karena alasan ini, penyedia email mengharuskan pesan Anda divalidasi. Markah AMP yang valid menjamin email aman dan melampaui standar pengalaman pengguna.

# Bagaimana cara memeriksa apakah email saya merupakan AMP yang valid?

Ada beberapa cara yang tersedia untuk memvalidasi Email AMP yang valid. Semua cara ini memberikan hasil yang sama, jadi pilihlah yang paling sesuai dengan gaya pengembangan Anda!

## Validator berbasis web

[Validator berbasis web](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL) mendukung platform AMP untuk Email. Gunakan validator berbasis web dengan merekatkan Email AMP Anda ke dalam alat. Ini akan menandai eror validator apa pun secara langsung inline.

{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Image of web-based email validator' ) }}

## Validator baris perintah

Anda dapat memvalidasi berkas Email AMP dengan menggunakan [alat baris perintah validator HTML AMP](https://www.npmjs.com/package/amphtml-validator).

### Penginstalan

1. Pastikan Anda mempunyai [Node.js dengan manajer paketnya 'npm' ](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)di sistem Anda.
2. Instal alat baris perintah validator HTML AMP dengan menjalankan perintah berikut ini: `npm install -g amphtml-validator`.

### Penggunaan

Setelah menginstal alat baris perintah, jalankan perintah berikut ini setelah mengganti `<amphtml file>` dengan berkas Anda yang berisi konten Email AMP.

```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```

Jika email tersebut valid, alat baris perintah akan menghasilkan `PASS`. Jika tidak valid, maka akan menghasilkan eror yang ditemukannya.

## AMP playground

Anda juga dapat mengesahkan atau memvalidasi Email AMP dengan menggunakan [AMP playground](https://playground.amp.dev/?runtime=amp4email). Serupa dengan validator berbasis web, rekatkan Email AMP Anda ke dalam alat, lalu playground akan menandai eror validator apa pun secara langsung inline.

### Memvalidasi email yang terkirim

Terkadang, Email AMP Anda yang terkirim tidak valid, walaupun markah email yang Anda tulis telah divalidasi oleh alat atau perangkat yang didokumentasikan di halaman ini. Alasan paling umum untuk kejadian ini adalah bahwa [ESP](https://amp.dev/support/faq/email-support/) Anda telah memodifikasi markah email Anda dan menjadikannya tidak valid setelah Anda mengirimkan email tersebut ke ESP Anda untuk dikirimkan. Contoh: jika ESP Anda adalah SparkPost, namun Anda belum mengonfigurasi piksel pelacak HTTPS dengan SparkPost, maka SparkPost akan menambahkan piksel pelacak HTTP ke email Anda. Karena Email AMP hanya mengizinkan gambar HTTPS, ini akan membuat Email AMP Anda tidak valid.

Untuk memeriksa apakah sebuah email yang terkirim ke kotak masuk Anda adalah AMP yang valid:

1. [unduh Email AMP sebagai berkas `.eml` ](https://www.codetwo.com/kb/export-email-to-file) dari klien email Anda.
2. Buka [AMP playground](https://playground.amp.dev/?runtime=amp4email).
3. Klik "IMPORT EMAIL" (IMPOR EMAIL), lalu pilih berkas `.eml` yang baru saja Anda unduh.

Playground akan mengimpor email AMP yang telah Anda unduh ke dalam editor inline dan menandari eror validasi apa pun.

# Apa yang terjadi jika email saya tidak valid?

Validator AMP bukan sekadar mudah bagi Anda selama pengembangan, penyedia email yang mendukung Email AMP akan secara otomatis kembali ke jenis HTML atau MIME Teks Polos yang disediakan. Sebuah Email AMP hanya boleh dikirimkan setelah berhasil melalui validator.
