---
$title: Membuat halaman AMP yang memerlukan login
$order: 4
numbered: 1
---
Beberapa interaksi pengguna dengan halaman, seperti memberikan komentar, dapat disyaratkan dengan alur login. Anda dapat menerapkan alur login dengan AMP menggunakan komponen [amp-access](https://www.ampproject.org/id/docs/reference/components/amp-access) yang digabungkan dengan komponen [amp-form](https://www.ampproject.org/id/docs/reference/components/amp-form).
{% call callout('Tips', type='success') %}
Untuk melihat contoh penerapan, buka [contoh bagian komentar](https://ampbyexample.com/samples_templates/comment_section/) di [ampbyexample.com](https://ampbyexample.com).
{% endcall %}

[Contoh bagian komentar](https://ampbyexample.com/samples_templates/comment_section/) menggabungkan `amp-access` dan `amp-form` untuk membuat bagian komentar yang hanya diaktifkan jika pengguna telah login. Untuk mendapatkan penjelasan tentang cara kerja contoh ini, ikuti kumpulan tindakan yang akan dilakukan setelah Anda membuka halaman.

{% include "/views/partials/sub_nav.html" %}

<div class="prev-next-buttons">
<a class="button" href="/id/docs/tutorials/login_requiring/login.html"><span class="arrow-next">Mulai</span></a>
</div>