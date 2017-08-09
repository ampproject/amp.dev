---
$title: Fitur eksperimental
$order: 5
---

[Komponen eksperimental AMP](https://github.com/ampproject/amphtml/tree/master/tools/experiments) 
merupakan fitur yang dirilis namun belum siap untuk digunakan secara umum, jadi fitur ini dilindungi oleh
status eksperimental.

Developer dan pengguna dapat memilih untuk ikut serta menggunakan fitur ini sebelum dirilis sepenuhnya.
Namun, fitur harus digunakan dengan hati-hati, karena mungkin mengandung bug atau efek samping yang tidak
diduga.

## Ikut serta dalam Saluran Dev AMP

Saluran Dev AMP merupakan cara untuk mengikutsertakan browser agar menggunakan versi pustaka JS AMP terbaru.

Rilis Saluran Dev AMP **mungkin kurang stabil** dan mungkin berisi fitur yang tidak tersedia untuk semua pengguna. Ikut serta dalam opsi ini jika ingin membantu menguji versi AMP baru, melaporkan bug, atau membuat dokumen yang memerlukan fitur baru yang belum tersedia untuk semua orang.

Ikut serta dalam Saluran Dev sangat bermanfaat untuk:

- menguji dan mencoba fitur baru yang belum tersedia untuk semua pengguna.
- menggunakan kualitas asuransi (QA), untuk memastikan bahwa situs Anda kompatibel dengan versi AMP selanjutnya.

Jika menemukan masalah yang tampaknya hanya muncul di Saluran Dev versi AMP, [harap ajukan masalah](https://github.com/ampproject/amphtml/issues/new) beserta deskripsi mengenai masalah tersebut. Selalu sertakan URL ke halaman bermasalah tersebut, untuk mereka ulang masalahnya.

Untuk mengikutsertakan browser ke Saluran Dev AMP, buka [halaman eksperimen AMP](https://cdn.ampproject.org/experiments.html)  dan aktifkan eksperimen "Saluran Dev AMP". Untuk mendapatkan notifikasi mengenai perubahan penting/yang merusak tentang AMP, berlanggananlah ke [milis](https://groups.google.com/forum/#!forum/amphtml-announce) amphtml-announce.

## Mengaktifkan komponen eksperimental

Untuk konten yang ditayangkan dari [https://cdn.ampproject.org](https://cdn.ampproject.org), buka [halaman eksperimen AMP](https://cdn.ampproject.org/experiments.html) dan aktifkan (atau nonaktifkan) komponen eksperimental dengan mengalihkan tombol ke aktif (atau nonaktif). Jika Anda memilih untuk ikut serta, tindakan itu akan menyetel cookie di browser yang akan mengaktifkan eksperimen di semua halaman AMP yang ditayangkan melalui Google AMP Cache.

Untuk konten yang ditayangkan dari domain lainnya, fitur eksperimen dapat diaktifkan melalui konsol devtools saat mode pengembangan diaktifkan menggunakan:

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

File AMP apa pun yang menyertakan fitur eksperimental akan gagal saat 
[validasi AMP](/id/docs/guides/validate.html). 
Hapus komponen eksperimental ini pada dokumen AMP yang siap diproduksi.

