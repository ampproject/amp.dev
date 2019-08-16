---
$title: Menyertakan Gambar
---

Sebagian besar tag HTML bisa digunakan secara langsung dalam AMP HTML, namun tag tertentu seperti tag `<img>`, diganti dengan yang setara atau tag AMP HTML khusus yang telah sedikit disempurnakan (dan beberapa tag bermasalah langsung dicekal, lihat [Tag HTML dalam spesifikasi](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).

Untuk mendemonstrasikan seperti apa tampilan markup tambahan ini, berikut kode yang diperlukan untuk menyematkan sebuah gambar ke dalam halaman:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

Baca lebih lanjut: Untuk mengetahui alasan kami mengganti tag seperti `<img>` dengan [`<amp-img>`](../../../../documentation/components/reference/amp-img.md), dan jumlah ketersediaannya, kunjungi [Menyertakan Gambar & Video](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md).
