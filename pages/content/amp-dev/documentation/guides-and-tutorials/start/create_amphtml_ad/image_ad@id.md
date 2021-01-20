---
"$title": Membuat iklan gambar
"$order": '1'
description: 'Iklan kita adalah gambar sederhana dengan hyperlink (hipertaut) ke situs yang diiklankan. Kita akan menampilkan gambar dengan menggunakan tag amp-img. Kodenya berikut ini: ...'
---

Di dalam `<body>` dokumen iklan HTML AMP, Anda dapat menyertakan tag HTML dan AMP; namun, tidak semua tag diizinkan. Rujuklah [spek iklan HTML AMP](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins) untuk mengetahui daftar tag yang diizinkan.

Iklan kita adalah gambar sederhana dengan hyperlink (hipertaut) ke situs yang diiklankan. Kita akan menampilkan gambar dengan menggunakan tag [`amp-img`](../../../../documentation/components/reference/amp-img.md). Kodenya berikut ini: ...

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
</body>
```

Jika Anda membuka berkas HTML Anda di browser, Anda akan melihat gambar yang berikut ini:

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='learn about AMP ad') }}

Jika Anda mengeklik iklan gambar tersebut, itu akan membawa Anda ke situs yang diiklankan (yaitu situs Proyek AMP).
