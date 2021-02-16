---
"$title": Menonaktifkan penundaan ketuk
"$order": '50'
tags:
- fid
---

Atur lebar viewport agar sesuai dengan lebar perangkat untuk menonaktifkan penundaan sentuh, yang dapat meningkatkan FID. Untuk menghapus penundaan ketuk 300-350 md ini, ubah pernyataan viewport di `<head>` halaman Anda menjadi:

```
<meta name="viewport" content="width=device-width">
```

Ini menetapkan lebar viewport menjadi sama dengan perangkat, dan umumnya merupakan praktik terbaik untuk situs yang dioptimalkan untuk seluler. Anda dapat [membaca lebih lanjut tentang menonaktifkan penundaan ketuk di web.dev](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away).
