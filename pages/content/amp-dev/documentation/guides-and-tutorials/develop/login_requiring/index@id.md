---
$title: Membuat halaman AMP yang memerlukan login
---
Beberapa interaksi pengguna dengan halaman, seperti memberikan komentar, dapat disyaratkan dengan alur login. Anda dapat menerapkan alur login dengan AMP menggunakan komponen [`amp-access`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-access.md', locale=doc.locale).url.path}}).

[tip type="tip"]
**TIP –** Untuk melihat contoh penerapan, buka [contoh bagian komentar](https://ampbyexample.com/samples_templates/comment_section/) di [ampbyexample.com](https://ampbyexample.com).
[/tip]

[Contoh bagian komentar](https://ampbyexample.com/samples_templates/comment_section/) menggabungkan [`amp-access`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-access.md', locale=doc.locale).url.path}}) dan [`amp-form`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}) untuk membuat bagian komentar yang hanya diaktifkan jika pengguna telah login. Untuk mendapatkan penjelasan tentang cara kerja contoh ini, ikuti kumpulan tindakan yang akan dilakukan setelah Anda membuka halaman.
