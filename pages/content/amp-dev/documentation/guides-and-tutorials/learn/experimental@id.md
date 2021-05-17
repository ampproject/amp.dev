---
$title: Fitur eksperimental
---

[Komponen eksperimental AMP](https://github.com/ampproject/amphtml/tree/main/tools/experiments)
adalah fitur rilis yang masih belum siap untuk digunakan secara luas, sehingga komponen ini dilindungi dengan status **eksperimental**.

Developer dan pengguna dapat ikut serta menggunakan fitur ini sebelum dirilis sepenuhnya.
Namun, fitur ini harus digunakan secara hati-hati, karena mungkin terdapat bug di dalamnya atau memiliki efek samping yang tidak terduga.

## Ikut serta dalam Saluran Dev AMP

Saluran Dev AMP adalah cara untuk mengikutsertakan browser agar menggunakan versi library JS AMP yang lebih baru.

Rilis Saluran Dev AMP **mungkin kurang stabil** dan berisi fitur tertentu yang tidak dapat diakses oleh semua pengguna. Pilih opsi ini jika Anda ingin membantu menguji AMP versi baru, melaporkan bug, atau membuat dokumen yang memerlukan fitur baru yang belum tersedia untuk semua orang.

Dengan ikut serta dalam Saluran Dev, Anda dapat:

- menguji dan mencoba fitur baru yang belum dirilis untuk semua pengguna.
- menggunakannya dalam jaminan mutu (QA) untuk memastikan situs Anda kompatibel dengan versi AMP berikutnya.

Jika Anda menemukan masalah hanya pada AMP versi Saluran Dev, [ajukan masalah](https://github.com/ampproject/amphtml/issues/new) dengan menyertakan penjelasannya. Selalu sertakan URL ke halaman yang memiliki masalah.

Untuk mengikutsertakan browser ke Saluran Dev AMP, buka [halaman eksperimen AMP](https://cdn.ampproject.org/experiments.html) lalu aktifkan eksperimen "Saluran Dev AMP". Untuk mendapatkan notifikasi tentang perubahan penting/breaking change mengenai AMP, silakan berlangganan milis [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce).

## Aktifkan komponen eksperimental

#### Ditampilkan dari cdn.ampproject.org

Untuk konten yang ditampilkan dari [https://cdn.ampproject.org](https://cdn.ampproject.org), 
buka [halaman eksperimental AMP](https://cdn.ampproject.org/experiments.html)
dan aktifkan (atau nonaktifkan) komponen eksperimental dengan mengalihkan pengalih ke aktif (atau nonaktif). Ikut serta akan menetapkan cookie di browser yang akan mengaktifkan eksperimen pada semua halaman AMP yang ditampilkan melalui Cache Google AMP.

#### Ditampilkan dari domain lain

Untuk konten yang ditampilkan dari domain lain, eksperimen dapat dialihkan di konsol devtools jika mode pengembangan aktif menggunakan:

```js
AMP.toggleExperiment('experiment')
```

File AMP apa pun yang menyertakan fitur eksperimental akan gagal
saat [validasi AMP](validation-workflow/validate_amp.md).
Hapus komponen eksperimental ini dari dokumen AMP yang siap produksi.

## Aktifkan eksperimen untuk dokumen tertentu

Dokumen dapat memilih untuk ikut serta dalam eksperimen tertentu. Untuk melakukannya, cukup cantumkan tag meta nama `amp-experiments-opt-in` di bagian kepala dokumen HTML sebelum skrip AMP (`https://cdn.ampproject.org/v0.js`). Nilai kontennya adalah string ID eksperimen untuk dipilih yang dipisahkan koma.

```html
<head>
  ...
  <meta name="amp-experiments-opt-in" content="experiment-a,experiment-b">
  <!-- The meta tag needs to be placed before the AMP runtime script.-->
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  ...
</head>
```

Dengan demikian, eksperimen yang ditentukan akan diaktifkan untuk semua pengunjung dokumen. Namun, tidak semua eksperimen mengizinkan penyertaan dokumen. Untuk mengetahui daftar lengkap eksperimen yang diizinkan, lihat atribut `allow-doc-opt-in` dalam file` prod-config.json` di project. Perhatikan bahwa penyertaan dokumen dapat diganti dengan ketidakikutsertaan pengguna.
 
