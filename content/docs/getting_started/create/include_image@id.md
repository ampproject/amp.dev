---
$title: Menyertakan Gambar
---

Sebagian besar tag HTML bisa digunakan secara langsung dalam AMP HTML, namun tag tertentu seperti tag `<img>`, diganti dengan yang setara atau tag AMP HTML khusus yang telah sedikit disempurnakan (dan beberapa tag bermasalah langsung dicekal, lihat [Tag HTML dalam spesifikasi](/id/docs/reference/spec.html)).

Untuk mendemonstrasikan seperti apa tampilan markup tambahan ini, berikut kode yang diperlukan untuk menyematkan sebuah gambar ke dalam halaman:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

{% call callout('Baca Lebih Lanjut', type='read') %}
Untuk mengetahui alasan kami mengganti tag seperti `<img>` dengan `<amp-img>`, dan jumlah ketersediaannya, kunjungi [Menyertakan Gambar & Video](/id/docs/guides/amp_replacements.html).
{% endcall %}

<div class="prev-next-buttons">
  <a class="button prev-button" href="/id/docs/tutorials/create/basic_markup.html"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="/id/docs/tutorials/create/presentation_layout.html"><span class="arrow-next">Berikutnya</span></a>
</div>

