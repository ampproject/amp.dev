---
$title: Menyertakan iframe
---

Pelajari cara menampilkan penyertaan konten media di halaman, dan cara menggunakan iframe untuk menampilkan konten tingkat lanjut di luar batasan AMP.

## Dasar-Dasar

Menampilkan iframe di halaman menggunakan elemen [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}).

Iframe sangat bermanfaat di AMP untuk menampilkan konten yang tidak didukung di konteks halaman menu,
seperti konten yang memerlukan JavaScript yang ditulis oleh pengguna.

### `amp-iframe` persyaratan

* Harus setidaknya **600 piksel** atau **75%** viewport pertama yang jauh dari bagian atas.
* Hanya dapat meminta referensi melalui HTTPS, dan tidak boleh memiliki asal yang sama dengan penampung, kecuali permintaan tidak menentukan izinkan-asal-yang-sama.

Baca Lebih Lanjut: Pelajari lebih lanjut di [spesifikasi penuh untuk `amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}).

### Menyertakan Skrip

Untuk menyertakan [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) di halaman, pertama-tama sertakan skrip berikut ke `<head>`, yang memuat kode
tambahan untuk komponen yang diperluas:

[sourcecode:html]
<script async custom-element="amp-iframe"
    src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

### Menulis markup

Contoh [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}):

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe">
</amp-iframe>
```

## Menggunakan placeholder

Anda dapat menampilkan [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) di bagian atas dokumen, [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) yang diberikan berisi elemen dengan atribut `placeholder`, (misalnya, elemen [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})) yang akan dirender sebagai placeholder sampai iframe siap ditampilkan.

Baca Lebih Lanjut: Pelajari lebih lanjut tentang placeholder di [Iframe dengan placeholder]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}#iframe-with-placeholder).

Contoh dengan placeholder:

```html
<amp-iframe width="400" height="225"
sandbox="allow-scripts allow-same-origin"
layout="responsive"
src="https://giphy.com/embed/OWabwoEn7ezug">
<amp-img placeholder layout="fill"
src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img>
</amp-iframe>
```
Render sebagai:

<amp-iframe width="400" height="225"
sandbox="allow-scripts allow-same-origin"
layout="responsive"
src="https://giphy.com/embed/OWabwoEn7ezug">
<amp-img placeholder layout="fill"
src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img>
</amp-iframe>

## Contoh

Contoh tingkat lanjut lainnya dapat ditemukan di [halaman demo tingkat lanjut]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-iframe.html', locale=doc.locale).url.path}}).
