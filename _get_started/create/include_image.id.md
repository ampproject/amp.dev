---
layout: page
title: Menyertakan Gambar
order: 1
locale: id
---

Sebagian besar tag HTML bisa digunakan secara langsung dalam AMP HTML, namun tag tertentu seperti tag `<img>`, diganti dengan yang setara atau tag AMP HTML khusus yang telah sedikit disempurnakan (dan beberapa tag bermasalah langsung dicekal, lihat [Tag HTML dalam spesifikasi](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).

Untuk mendemonstrasikan seperti apa tampilan markup tambahan ini, berikut kode yang diperlukan untuk menyematkan sebuah gambar ke dalam halaman:

{% highlight html %}
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
{% endhighlight %}

Untuk mengetahui alasan kami mengganti tag seperti `<img>` dengan `<amp-img>`, dan jumlah ketersediaannya, kunjungi [Menyertakan Iframe dan Media](/docs/guides/amp_replacements.html).

{% include button.html title="Lanjutkan ke Langkah 3" link="/docs/get_started/create/presentation_layout.id.html" %}
