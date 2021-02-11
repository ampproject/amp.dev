---
'$title': Menyertakan gambar & video
$order: 8
description: Seperti pada halaman HTML biasa, AMP memungkinkan Anda untuk menyematkan konten gambar, video, dan audio. Pelajari apa yang berbeda tentang padanan AMP dan pelajari cara ....
formats:
  - websites
  - stories
  - email
  - ads
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Seperti pada halaman HTML biasa, AMP memungkinkan Anda menyematkan konten **gambar**, **video**, dan **audio**. Pelajari apa yang berbeda tentang padanan AMP dan pelajari cara menyertakannya di halaman Anda.

## Mengapa bukan <code><img></code>, <code><video></code>, dan <code><audio></code>?

AMP tidak mendukung pasangan HTML standar untuk menampilkan media, seperti `<img>`. Kita memberikan komponen dengan nilai yang setara karena alasan berikut ini:

- Kita perlu memahami tata letak halaman sebelum aset dimuat, karena ini penting untuk [mendukung prapemuatan viewport pertama](../../../../about/how-amp-works.html#size-all-resources-statically)
- Kita perlu mengontrol permintaan jaringan agar [konten diprioritaskan dan dimuat secara perlahan dan efektif](../../../../about/how-amp-works.html#prioritize-resource-loading)

Perhatian: Meski tidak didukung, pasangan HTML standar _akan_ dirender, tetapi AMP tidak akan [memvalidasi halaman Anda](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) dan Anda tidak akan mendapatkan semua manfaat dari yang dapat disediakan AMP.

## Gambar

Sertakan gambar pada halaman Anda dengan menggunakan elemen [`amp-img`](../../../../documentation/components/reference/amp-img.md) seperti berikut ini:

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
</amp-img>
```

[/example]

Pada sebagian besar contoh dasar ini, gambar akan ditampilkan dengan lebar dan tinggi tetap yang telah ditentukan. Setidaknya, lebar dan tinggi minimum yang tegas perlu ditetapkan.

#### Menampilkan gambar saat JavaScript dinonaktifkan

Karena `<amp-img>` bergantung pada JavaScript, jika pengguna memilih menonaktifkan skrip, gambar tidak akan ditampilkan. Dalam hal ini, Anda harus menyediakan fallback pada gambar dengan menggunakan `<img>` dan `<noscript>`, seperti berikut ini:

[example preview="inline" playground="true"]

```html
<amp-img
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
  <noscript>
    <img
      src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
      width="264"
      height="195"
    />
  </noscript>
</amp-img>
```

[/example]

### Tata letak tingkat lanjut

Dibandingkan dengan CSS/HTML standar, AMP sangat memudahkan pembuatan gambar yang sepenuhnya responsif. Pada sebagian besar bentuk dasarnya, Anda hanya perlu menambahkan `layout="responsive"`:

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive"
>
</amp-img>
```

[/example]

[tip type="read-on"] **BACA –** Pelajari lebih lanjut tentang [teknik tata letak tingkat lanjut](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

### Perilaku dan bakal tempat (placeholder)

Runtime HTML AMP dapat mengelola konten gambar secara efektif, yang memilih untuk menunda atau memprioritaskan pemuatan sumber daya berdasarkan pada posisi viewport, sumber daya sistem, bandwidth koneksi, atau berbagai faktor lainnya.

[tip type="read-on"] **BACA –** Pelajari cara [menyediakan fallback dan bakal tempat untuk gambar](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

## Gambar animasi

Elemen [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) sangat mirip dengan elemen [`amp-img`](../../../../documentation/components/reference/amp-img.md), kedua elemen ini memberikan fungsi tambahan untuk mengelola pemuatan dan pemutaran gambar animasi seperti GIF.

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
>
  <amp-img
    placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
  >
  </amp-img>
</amp-anim>
```

[/example]

[tip type="note"] **CATATAN –** Sertakan `<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` di tajuk halaman Anda untuk menggunakan komponen ini. [/tip]

## Video

Sertakan video di halaman Anda dengan menggunakan elemen [`amp-video`](../../../../documentation/components/reference/amp-video.md) .

Gunakan elemen ini hanya untuk sematan berkas video HTML5 langsung. Elemen akan memuat sumber daya video yang ditetapkan dengan atribut `src` secara perlahan, pada waktu yang telah ditentukan oleh AMP.

Sertakan bakal tempat sebelum video dimulai, dan fallback, jika browser tidak mendukung video HTML5, contoh:

[example preview="inline" playground="true" imports="amp-video:0.1"]

```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

[/example]

## Audio

Sertakan sumber daya (konten) audio pada halaman Anda dengan menggunakan elemen [`amp-audio`](../../../../documentation/components/reference/amp-audio.md).

Gunakan elemen ini hanya untuk sematan berkas audio HTML5 langsung. Seperti halnya semua sumber daya eksternal yang disematkan pada halaman AMP, elemen ini akan memuat sumber daya audio yang telah ditetapkan dengan atribut `src` secara perlahan, pada waktu yang telah ditentukan oleh AMP.

Sertakan fallback, jika browser tidak mendukung audio HTML5, misalnya:

[example preview="inline" playground="true" imports="amp-audio:0.1"]

```html
<amp-audio width="400"
  height="200"
  {% if format == 'stories' %}  layout="nodisplay" autoplay
  {% endif %}
  src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio.</p>
  </div>
  <source type="audio/mpeg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <source type="audio/ogg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.ogg">
</amp-audio>
```

[/example]

[tip type="note"] <strong>CATATAN –</strong> Sertakan <code><script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script></code> di tajuk halaman Anda untuk menggunakan komponen ini. [/tip]
