---
'$title': Menyertakan iframe
$order: 10
description: Pelajari cara menampilkan konten media yang disertakan di halaman Anda, dan cara menggunakan iframe untuk menampilkan konten lanjutan di luar batasan AMP.
formats:
  - websites
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations.

## Dasar-dasar

Anda dapat menampilkan iframe di halaman Anda dengan menggunakan elemen [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md).

Iframe sangat bermanfaat di AMP untuk menampilkan konten yang tidak didukung di konteks halaman utama, seperti konten yang memerlukan JavaScript yang ditulis oleh pengguna.

### Persyaratan untuk `amp-iframe`

- Harus minimal **600 piksel** atau **75%** viewport pertama yang jauh dari bagian atas (kecuali untuk iframe yang menggunakan <a><code>placeholder</code></a>).
- Hanya dapat meminta referensi melalui HTTPS, dan tidak boleh memiliki asal yang sama dengan wadah, kecuali permintaan tidak mengharuskan izinkan-asal-yang-sama (allow-same-origin).

[tip type="read-on"] **BACA –** Pelajari lebih lanjut dalam [spesifikasi lengkap untuk `amp-iframe`](../../../../documentation/components/reference/amp-iframe.md). [/tip]

### Menyertakan skrip

Untuk menyertakan [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) di halaman Anda, pertama-tama sertakan skrip berikut ini ke `<head>`, yang memuat kode tambahan untuk komponen yang diperluas:

[sourcecode:html]

<script async custom-element="amp-iframe"
  src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>

[/sourcecode]

### Menulis markah

Di dalam contoh berikut ini, kita membuat [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) responsif untuk menyematkan Google Map melalui [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/guide):

```html
<amp-iframe
  width="200"
  height="100"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe"
>
</amp-iframe>
```

## Menggunakan bakal tempat <a name="using-placeholders"></a>

Anda dapat menampilkan [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) di bagian atas dokumen, sepanjang [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) berisi elemen dengan atribut `placeholder`, (contoh: elemen [`amp-img`](../../../../documentation/components/reference/amp-img.md)) yang akan dirender sebagai bakal tempat sampai iframe siap ditampilkan.

[tip type="read-on"] **BACA –**: Pelajari lebih lanjut tentang bakal tempat di [Iframe dengan bakal tempat](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder). [/tip]

Contoh dengan bakal tempat:

```html
<amp-iframe
  width="400"
  height="225"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://giphy.com/embed/OWabwoEn7ezug"
>
  <amp-img
    placeholder
    layout="fill"
    src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"
  ></amp-img>
</amp-iframe>
```

Render sebagai:

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## Contoh-contoh

Anda dapat menemukan contoh [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) yang lebih lanjut di [AMP Berdasarkan Contoh](../../../../documentation/examples/documentation/amp-iframe.html).
