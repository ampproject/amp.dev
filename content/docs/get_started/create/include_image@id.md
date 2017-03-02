---
$title: Menyertakan Gambar
---

Sebagian besar tag HTML bisa digunakan secara langsung dalam AMP HTML, namun tag tertentu seperti tag `<img>`, diganti dengan yang setara atau tag AMP HTML khusus yang telah sedikit disempurnakan (dan beberapa tag bermasalah langsung dicekal, lihat [Tag HTML dalam spesifikasi](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).

Untuk mendemonstrasikan seperti apa tampilan markup tambahan ini, berikut kode yang diperlukan untuk menyematkan sebuah gambar ke dalam halaman:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

Untuk mengetahui alasan kami mengganti tag seperti `<img>` dengan `<amp-img>`, dan jumlah ketersediaannya, kunjungi [Menyertakan Iframe dan Media](/docs/guides/amp_replacements.html).

<a class="go-button button" href="/id/docs/get_started/create/presentation_layout.html">Lanjutkan ke Langkah 3</a>
