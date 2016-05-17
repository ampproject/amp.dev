---
layout: page
title: Menyiapkan Halaman Anda untuk Pencarian dan Distribusi
order: 4
locale: id
---

Dalam beberapa kasus, Anda mungkin menginginkan versi non-AMP dan AMP dari halaman yang sama, misalnya, artikel berita. Pertimbangkan ini: Jika Google Penelusuran menemukan versi non-AMP dari halaman itu, *bagaimana Google Penelusuran mengetahui bahwa ada versi AMP dari halaman itu*?

## Menautkan halaman dengan &lt;link>

Untuk menyelesaikan masalah ini, kami menambahkan informasi tentang halaman AMP ke halaman non-AMP dan sebaliknya, dalam bentuk tag `<link>` dalam `<head>`.

Tambahkan yang berikut ini ke halaman non-AMP:

{% highlight html %}
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

Tambahkan ini ke halaman AMP

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
{% endhighlight %}

## Bagaimana jika saya memiliki satu halaman saja?

Jika Anda hanya menautkan satu halaman, dan halaman itu adalah halaman AMP, Anda masih harus menambahkan tautan kanonis ke halaman itu, yang kemudian hanya akan menunjuk pada halaman itu sendiri:

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

{% include button.html title="Lanjutkan ke Langkah 6" link="/docs/get_started/create/publish.id.html" %}
