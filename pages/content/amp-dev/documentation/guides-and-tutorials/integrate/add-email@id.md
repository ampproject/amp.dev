---
"$title": Menambahkan AMP ke email yang sudah ada
"$order": '1'
author: CrystalOnScript
formats:
- email
---

Format AMP untuk Email disematkan sebagai bagian MIME yang baru. Jika email Anda dikirimkan ke penyedia yang mendukung AMP untuk Email, email tersebut akan ditampilkan - jika tidak, tak perlu cemas! Penyedia akan menampilkan HTML Anda atau standar (fallback) teks polos. Gunakan panduan ini untuk menyertakan AMP di dalam email Anda.

# Menyertakan bagian MIME AMP

Email dibangun dalam struktur [pohon MIME](https://en.wikipedia.org/wiki/MIME), yang berisi badan pesan email dan lampiran apa pun. Untuk menyertakan AMP di dalam email, Anda perlu menambahkan sebuah bagian MIME baru dengan jenis konten `text/x-amp-html`.

Bagian MIME AMP tersebut harus ditempatkan di bawah nodus `multipart/alternative` dan tinggal bersama bagian `text/html` atau `text/plain` yang sudah lebih dahulu ada. Ini memastikan bahwa pesan email tersebut akan merender di semua klien.

```html
From:  Person A <persona@example.com>
To: Person B <personb@example.com>
Subject: An AMP email!
Content-Type: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae
Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World in plain text!

--001a114634ac3555ae05525685ae
Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
Hello World in AMP!
</body>
</html>
--001a114634ac3555ae05525685ae--
Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span>
--001a114634ac3555ae05525685ae
```

[tip type="important"] Beberapa klien email hanya akan merender bagian MIME terakhir. Untuk memastikan bahwa sebuah email dirender, tempatkan bagian MIME `text/x-amp-html` _sebelum _bagian MIME `text/html` tersebut. [/tip]

# Apa yang terjadi saat penerima meneruskan atau membalas Email AMP?

Ketika seorang pengguna meneruskan atau membalas Email AMP, bagian `text/x-amp-html` dari pohon MIME akan dihapus. Ini sebabnya menyediakan konten alternatif di dalam bagian HTML merupakan hal penting, bahkan saat mengirimkan email AMP kepada klien yang mendukung jenis MIME tersebut.
