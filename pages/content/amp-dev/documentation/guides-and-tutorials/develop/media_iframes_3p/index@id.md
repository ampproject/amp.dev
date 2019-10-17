---
$title: Menyertakan Gambar & Video
---

 Seperti halnya pada halaman HTML normal, AMP memungkinkan Anda menyematkan konten **gambar**, **video** dan **audio**
Isi. Pelajari perbedaan mengenai fitur yang setara dengan AMP dan pelajari cara menyertakannya di halaman Anda.

##  Mengapa bukan `<img>`, `<video>` dan `<audio>`?

 AMP tidak mendukung pasangan HTML default untuk menampilkan media, seperti `<img>`. Kami memberikan komponen dengan nilai yang sama karena alasan berikut:

*  Kami perlu memahami tata letak halaman sebelum aset dimuat, karena ini penting untuk [mendukung prapemuatan viewport pertama](../../../../about/how-amp-works.html#size-all-resources-statically)
*  Kami perlu mengontrol permintaan jaringan agar [konten diprioritaskan dan dimuat secara perlahan dan efektif](../../../../about/how-amp-works.html#prioritize-resource-loading)

Perhatian: Meski tidak didukung, pasangan HTML default*akan*  dirender, tetapi AMP tidak akan [memvalidasi halaman Anda](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) dan Anda tidak akan mendapatkan semua manfaat dari yang diberikan AMP.

## Gambar

 Sertakan gambar pada halaman Anda menggunakan elemen [`amp-img`](../../../../documentation/components/reference/amp-img.md) seperti berikut:

[example preview="inline" playground="true"]
```html
<amp-img alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195">
</amp-img>
```
[/example]

Pada sebagian besar contoh dasar ini, gambar akan ditampilkan dengan lebar dan tinggi tetap yang telah ditentukan. Setidaknya, lebar dan tinggi minimum secara eksplisit perlu ditetapkan.

#### Menampilkan gambar saat JavaScript dinonaktifkan

 Karena `<amp-img>`  bergantung pada JavaScript, jika pengguna memilih menonaktifkan skrip, gambar tidak akan ditampilkan. Dalam hal ini, Anda harus memberikan penggantian pada gambar menggunakan `<img>`  dan `<noscript>`, seperti berikut:

[example preview="inline" playground="true"]
```html
<amp-img src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195">
  <noscript>
    <img src="{{server_for_email}}/static/inline-examples/images/sunset.jpg" width="264" height="195" />
  </noscript>
</amp-img>
```
[/example]

### Tata letak lanjutan

 Dibandingkan CSS/HTML standar, AMP memudahkan pembuatan gambar yang benar-benar responsif. Pada sebagian besar bentuk dasarnya, Anda hanya perlu menambahkan `layout="responsive"`:

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive">
</amp-img>
```
[/example]

Baca juga: Pelajari lebih lanjut tentang [teknik tata letak lanjutan](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md).

### Perilaku dan placeholder

Waktu proses HTML AMP dapat mengelola konten gambar secara efektif, dengan memilih antara pemuatan konten yang diprioritaskan atau yang mengalami penundaan berdasarkan pada posisi viewport, sumber daya sistem, bandwidth koneksi, atau faktor lainnya.

Baca juga: Pelajari cara [memberikan penggantian dan placeholder untuk gambar](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## Gambar animasi

 Elemen [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) sangat mirip dengan elemen [`amp-img`](../../../../documentation/components/reference/amp-img.md), kedua elemen ini memberikan fungsi tambahan untuk mengelola pemuatan dan pemutaran gambar animasi seperti GIF.

[example preview="inline" playground="true" imports="amp-anim:0.1"]
```html
<amp-anim width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif">
  <amp-img placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png">
  </amp-img>
</amp-anim>
```
[/example]

Catatan: Sertakan `<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` pada bagian atas halaman untuk menggunakan komponen ini.

## Video

 Sertakan video di halaman Anda menggunakan elemen [`amp-video`](../../../../documentation/components/reference/amp-video.md) .

 Hanya gunakan elemen ini untuk file video HTML5 langsung yang disematkan. Elemen akan memuat konten video yang ditetapkan oleh atribut `src` secara perlahan, pada waktu yang telah ditentukan oleh AMP.

Sertakan placeholder sebelum video dimulai, dan penggantian, jika browser tidak mendukung video HTML5, misalnya:

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

 Sertakan konten audio pada halaman Anda, menggunakan elemen [`amp-audio`](../../../../documentation/components/reference/amp-audio.md) .

 Hanya gunakan elemen ini untuk file audio HTML5 langsung yang disematkan. Seperti halnya semua konten eksternal yang disematkan pada halaman AMP, elemen tersebut akan memuat konten audio yang telah ditetapkan oleh atribut `src` secara perlahan, pada waktu yang telah ditentukan oleh AMP.

Sertakan placeholder sebelum audio dimulai, dan penggantian, jika browser tidak mendukung audio HTML5, misalnya:

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

Catatan: Sertakan `<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` pada bagian atas halaman untuk menggunakan komponen ini.
