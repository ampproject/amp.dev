---
$title: Komponen Eksperimental
---

[Komponen eksperimental AMP](https://github.com/ampproject/amphtml/tree/master/tools/experiments)
adalah fitur rilis yang masih belum siap untuk penggunaan luas, jadi komponen ini dilindungi dengan status eksperimental.

Pengembang dan pengguna dapat ikut serta menggunakan fitur ini sebelum dirilis sepenuhnya.
Namun perlu diperhatikan, karena mungkin terdapat bug di dalamnya atau memiliki efek samping yang tidak terduga.

## Ikut serta dalam Saluran Dev AMP

Saluran Konsol Dev AMP adalah cara untuk mengikutsertakan browser menggunakan versi pustaka JS AMP yang lebih baru.

Untuk mengikutsertakan browser dalam Saluran Dev AMP,
buka [laman eksperimental AMP](https://cdn.ampproject.org/experiments.html)
dan aktifkan eksperimen "Saluran Dev AMP".

## Mengaktifkan komponen eksperimental

Untuk konten yang disajikan dari [https://cdn.ampproject.org](https://cdn.ampproject.org),
buka [laman eksperimen AMP](https://cdn.ampproject.org/experiments.html)
dan aktifkan (atau nonaktifkan) komponen eksperimental dengan mengalihkan pengalih ke aktif (atau nonaktif). Ikut serta akan menetapkan cookie di browser yang akan mengaktifkan eksperimen pada semua laman AMP yang disajikan melalui Cache Google AMP.

Untuk konten yang disajikan dari domain lain, eksperimen dapat dialihkan di konsol devtools jika mode pengembangan aktif menggunakan:

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

File AMP yang menyertakan fitur eksperimental akan gagal saat
[validasi AMP](/id/docs/guides/debug/validate.html).
Hapus komponen eksperimental ini dari dokumen AMP yang siap produksi.
