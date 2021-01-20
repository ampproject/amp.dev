---
"$title": Menyertakan gambar
"$order": '2'
description: Sebagian besar tag HTML dapat digunakan secara langsung di HTML AMP, tetapi tag tertentu, seperti tag <img>, diganti dengan tag HTML AMP kustom yang setara atau telah sedikit disempurnakan
author: pbakaus
contributors:
- bpaduch
---

Sebagian besar tag HTML dapat digunakan secara langsung di HTML AMP, tetapi tag tertentu, seperti tag `<img>`, diganti dengan tag HTML AMP kustom yang setara atau telah sedikit disempurnakan (dan beberapa tag bermasalah langsung dicekal, kunjungi [Tag HTML dalam spesifikasi](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).

Untuk mendemonstrasikan seperti apa tampilan markah tambahan ini, berikut ini adalah kode yang diperlukan untuk menyematkan sebuah gambar ke dalam halaman:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

[tip type="read-on"] **BACA –** Untuk mempelajari mengapa kita mengganti tag seperti `<img>` dengan [`<amp-img>`](../../../../documentation/components/reference/amp-img.md), dan berapa banyak yang tersedia, kunjungi [Menyertakan Gambar & Video](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md). [/tip]
