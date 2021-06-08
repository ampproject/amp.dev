---
'$title': Mengamankan dari serangan pihak ketiga
$order: 7
description: Ambil langkah-langkah untuk melindungi halaman AMP dan pengguna Anda dari kerentanan keamanan di web
formats:
  - websites
author: CrystalOnScript
---

Ambil langkah-langkah untuk melindungi situs dan pengguna Anda dari kerentanan keamanan di web. Salah satu yang paling jahat adalah [penulisan skrip lintas situs](https://www.google.com/about/appsecurity/learning/xss/) (XSS). XSS adalah sebuah bug keamanan yang memungkinkan penyerang memasukkan kode jahat ke halaman HTML yang ditampilkan kepada pengguna.

Dapatkan perlindungan dari jenis serangan ini dengan menerapkan [Kebijakan Keamanan Konten(CSP)](https://csp.withgoogle.com/docs/index.html). Cache AMP, seperti Cache AMP Google, sudah menambahkan CSP pada halaman Anda! Namun, halaman tidak mempunyai lapisan perlindungan tambahan ini ketika pengguna mengakali versi yang disimpan di cache, jika Anda tidak menambahkan CSP Anda sendiri.

# Menerapkan CSP AMP

Terapkan CSP dengan menambahkan tag meta yang tepat ke tajuk halaman Anda. Di bawah ini adalah CSP AMP yang memungkinkan skrip AMP dimasukkan ke dalam halaman Anda:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://cdn.ampproject.org/v0.js https://cdn.ampproject.org/v0/ https://cdn.ampproject.org/viewer/ https://cdn.ampproject.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://cdn.ampproject.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[Anda dapat melihat seluruh contoh di sini](https://github.com/ampproject/amphtml/blob/main/examples/csp.amp.html).

[tip type="read-on"] Pelajari selengkapnya tentang [pelindungan menyangkut kerentanan keamanan dan CSP di sini](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). [/tip]
