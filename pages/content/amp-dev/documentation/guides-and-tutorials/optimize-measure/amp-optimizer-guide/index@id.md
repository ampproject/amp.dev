---
"$title": Menggunakan Pengoptimal AMP
"$order": '2'
"$hidden": 'true'
description: Pengoptimal AMP adalah alat yang memberikan pengoptimalan Cache AMP ke situs Anda sendiri. Menggunakan Pengoptimal AMP adalah kunci untuk menghasilkan pengalaman halaman yang memuaskan dan pemenuhan Core Web Vitals. Panduan ini menjelaskan cara terbaik menggunakan Pengoptimal AMP untuk mengoptimalkan halaman AMP Anda.
formats:
- websites
- stories
author: sebastianbenz
---

Pengoptimal AMP adalah alat yang memberikan pengoptimalan Cache AMP ke situs Anda sendiri. Menggunakan Pengoptimal AMP adalah kunci untuk menghasilkan [pengalaman halaman](https://developers.google.com/search/docs/guides/page-experience) yang memuaskan dan pemenuhan [Core Web Vitals](https://web.dev/vitals/). Jika Anda ingin mengetahui selengkapnya tentang cara kerja Pengoptimal AMP, kunjungi [Panduan Pengoptimalan AMP terperinci](explainer.md).

## Bukankah AMP memang sudah cepat?

Anda mungkin berpikir: sebentar – bukankah AMP seharusnya memang cepat dari yang biasa? Dan itu benar: runtime AMP dioptimalkan untuk kecepatan dan semua halaman AMP yang valid akan dimuat dengan cepat. Namun, ada pengoptimalan kinerja tambahan yang dapat Anda terapkan di server Anda untuk membantu browser memuat halaman AMP jauh lebih cepat lagi.

Pada awalnya, cache-cache AMP menyajikan sebagian besar halaman AMP. Cache-cache ini melakukan pengoptimalan tambahan pada halaman untuk menjamin pengalaman pengguna yang mantap. Namun, seiring waktu, lebih banyak permukaan yang mulai dikaitkan ke halaman AMP dan para pengembang mulai membuat seluruh situs web dengan AMP. Itu sebabnya tim AMP telah mulai mengerjakan Pengoptimal AMP agar semua dapat menyajikan halaman AMP dengan Cache AMP seperti kinerja pada asal mereka sendiri.

## Mengintegrasikan Pengoptimal AMP

Ada tiga cara menggunakan pengoptimal AMP:

1. Menggunakan penghasil situs atau CMS dengan integrasi pengoptimal bawaan.
2. Mengintegrasikan Pengoptimal AMP ke dalam sistem build (versi) atau server Anda.
3. Mengintegrasikan Pengoptimal AMP ke dalam lingkungan pengelola (hosting) Anda.

### Penghasil Situs & CMS

Cara terbaik menayangkan AMP yang telah dioptimalkan adalah dengan menggunakan penghasil situs atau CMS dengan dukungan Pengoptimal AMP bawaan. Dalam hal ini, halaman AMP Anda akan dioptimalkan secara otomatis. Saat ini, penghasil situs dan CMS berikut ini mengintegrasikan Pengoptimal AMP:

- [WordPress](https://wordpress.org/) melalui [Plugin AMP WordPress](https://wordpress.org/plugins/amp/)
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [Eleventy](https://www.11ty.dev/) melalui [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/)
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### Integrasi Server atau Versi Kustom

Anda sendiri juga dapat mengintegrasikan Pengoptimal AMP. Ada dua penerapan Pengoptimal AMP sumber terbuka yang tersedia:

- [Pengoptimal AMP (Node.js)](node-amp-optimizer.md): sebuah perpustakaan berbasis Node.js untuk menghasilkan AMP yang dioptimalkan. Kunjungi panduan kami untuk memulai terkait di amp.dev. Penerapannya dikelola oleh tim AMP.
- [AMP Toolbox for PHP](https://github.com/ampproject/amp-toolbox-php): a PHP based library for producing optimized AMP. The implementation is maintained by the AMP team.
- [amp-renderer (Python)](https://github.com/chasefinch/amp-renderer): sebuah port Python dari Pengoptimal Node AMP.

Ada berbagai integrasi untuk halaman yang dirender secara dinamis oleh server Anda dan situs statis:

1. **Waktu-build**: untuk situs statis, yang terbaik adalah mengoptimalkan halaman AMP sebagai bagian dari build (versi). Pendekatan ini ideal karena mengoptimalkan halaman AMP tidak memengaruhi kinerja penyajian. Kunjungi [sampel ini untuk mengetahui tentang integrasi Pengoptimal AMP + Gulp](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp).
2. **Waktu-render**: jika situs web mempunyai sifat yang lebih dinamis atau tidak dapat menerapkan transformasi secara statistik, pengoptimalan dapat dilakukan setelah dokumen AMP dirender di server. Jika begitu, untuk memastikan waktu penyajian yang cepat, paling baik untuk menyimpan halaman transformasi di cache untuk permintaan selanjutnya. Penyimpanan di cache dapat terjadi pada tingkat CDN, di infrastruktur internal situs (cth.: Memcached), atau bahkan di server itu sendiri jika serangkaian halaman cukup kecil untuk dimuat ke dalam memori. Untuk mengetahui selengkapnya tentang pendekatan ini, kunjungi [demo ini yang mengintegrasikan Pengoptimal AMP ke dalam Express.JS](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express).

### Integrasi Penyedia Pengelolaan (Hosting)

Beberapa penyedia pengelolaan mengizinkan menjalankan logika kustom saat menerapkan atau menyajikan sebuah halaman web. Ini bisa menjadi pilihan yang sangat baik untuk mengintegrasikan Pengoptimal AMP. Integrasi contoh adalah:

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Pekerja Cloudflare](https://workers.cloudflare.com/) ([segera tersedia](https://github.com/ampproject/amp-toolbox/issues/878))
- Gambar Docker Pengoptimal AMP ([segera tersedia](https://github.com/ampproject/amp-toolbox/issues/879))
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
