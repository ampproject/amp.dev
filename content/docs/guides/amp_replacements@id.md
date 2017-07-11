---
$title: Menyertakan Gambar & Video
$order: 1
$category: Develop

toc: true
---

[TOC]

 Seperti halnya pada halaman HTML normal, AMP memungkinkan Anda menyematkan konten **gambar**, **video** dan **audio**
Isi. Pelajari perbedaan mengenai fitur yang setara dengan AMP dan pelajari cara menyertakannya di halaman Anda.

##  Mengapa bukan `<img>`, `<video>` dan `<audio>`?

 AMP tidak mendukung pasangan HTML default untuk menampilkan media, seperti `<img>`. Kami memberikan komponen dengan nilai yang sama karena alasan berikut:

*  Kami perlu memahami tata letak halaman sebelum aset dimuat, karena ini penting untuk [mendukung prapemuatan viewport pertama](/id/learn/about-how/#size-all-resources-statically)
*  Kami perlu mengontrol permintaan jaringan agar [konten diprioritaskan dan dimuat secara perlahan dan efektif](/id/learn/about-how/#prioritize-resource-loading)

{% call callout('Perhatian', type='caution') %}
 Meski tidak didukung, pasangan HTML default*akan*  dirender, tetapi AMP tidak akan [memvalidasi halaman Anda](/id/docs/guides/debug/validate.html) 
dan Anda tidak akan mendapatkan semua manfaat dari yang diberikan AMP.{% endcall %}

## Gambar

 Sertakan gambar pada halaman Anda menggunakan elemen [`amp-img`,](/id/docs/reference/components/amp-img.html) seperti berikut:

[sourcecode:html]
<amp-img src="fixed.jpg" width="264" height="96"></amp-img>
[/sourcecode]

Pada sebagian besar contoh dasar ini, gambar akan ditampilkan dengan lebar dan tinggi tetap yang telah ditentukan. Setidaknya, lebar dan tinggi minimum secara eksplisit perlu ditetapkan.

#### Menampilkan gambar saat JavaScript dinonaktifkan

 Karena `<amp-img>`  bergantung pada JavaScript, jika pengguna memilih menonaktifkan skrip, gambar tidak akan ditampilkan. Dalam hal ini, Anda harus memberikan penggantian pada gambar menggunakan `<img>`  dan `<noscript>`, seperti berikut:

[sourcecode:html]
<amp-img src="fixed.jpg" width="264" height="96">
<noscript>
<img src="fixed.jpg" width="264" height="96" />
</noscript>
</amp-img>
[/sourcecode]

### Tata letak lanjutan

 Dibandingkan CSS/HTML standar, AMP memudahkan pembuatan gambar yang benar-benar responsif. Pada sebagian besar bentuk dasarnya, Anda hanya perlu menambahkan `layout="responsive"`:

[sourcecode:html]
<amp-img src="responsive.jpg" width="527" height="193" layout="responsive">
</amp-img>
[/sourcecode]

{% call callout('Baca juga', type='success') %}
 Pelajari lebih lanjut tentang [teknik tata letak lanjutan](/id/docs/guides/author-develop/responsive/control_layout.html).{% endcall %}

### Perilaku dan placeholder

Waktu proses HTML AMP dapat mengelola konten gambar secara efektif, dengan memilih antara pemuatan konten yang diprioritaskan atau yang mengalami penundaan berdasarkan pada posisi viewport, sumber daya sistem, bandwidth koneksi, atau faktor lainnya.

{% call callout('Baca juga', type='success') %}
 Pelajari cara [memberikan penggantian dan placeholder untuk gambar](/id/docs/guides/author-develop/responsive/placeholders.html)
.{% endcall %}

## Gambar animasi

 Elemen [`amp-anim`](/id/docs/reference/components/amp-anim.html) sangat mirip dengan elemen `amp-img`, kedua elemen ini memberikan fungsi tambahan untuk mengelola pemuatan dan pemutaran gambar animasi seperti GIF.

[sourcecode:html]
<amp-anim width="400" height="300" src="my-gif.gif">
<amp-img placeholder width="400" height="300" src="my-gif-screencap.jpg">
</amp-img>
</amp-anim>
[/sourcecode]

{% call callout('Catatan', type='note') %}
 Sertakan `<script async custom-element="amp-anim"
src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` 
pada bagian atas halaman untuk menggunakan komponen ini. {% endcall %}

## Video

 Sertakan video di halaman Anda menggunakan elemen [`amp-video`](/id/docs/reference/components/amp-video.html) .

 Hanya gunakan elemen ini untuk file video HTML5 langsung yang disematkan. Elemen akan memuat konten video yang ditetapkan oleh atribut `src` secara perlahan, pada waktu yang telah ditentukan oleh AMP.

Sertakan placeholder sebelum video dimulai, dan penggantian, jika browser tidak mendukung video HTML5, misalnya:

[sourcecode:html]
<amp-video width="400" height="300" src="https://yourhost.com/videos/myvideo.mp4"
poster="myvideo-poster.jpg">

<div fallback>
    <p>Browser Anda tidak mendukung video HTML5</p>
  </div>
</amp-video>
[/sourcecode]

## Audio

 Sertakan konten audio pada halaman Anda, menggunakan elemen [`amp-audio`](/id/docs/reference/components/amp-audio.html) .

 Hanya gunakan elemen ini untuk file audio HTML5 langsung yang disematkan. Seperti halnya semua konten eksternal yang disematkan pada halaman AMP, elemen tersebut akan memuat konten audio yang telah ditetapkan oleh atribut `src` secara perlahan, pada waktu yang telah ditentukan oleh AMP.

Sertakan placeholder sebelum audio dimulai, dan penggantian, jika browser tidak mendukung audio HTML5, misalnya:

[sourcecode:html]
<amp-audio width="400" height="300" src="https://yourhost.com/audios/myaudio.mp3">

<div fallback>
    <p>Browser Anda tidak mendukung audio HTML5</p>
  </div>
  <source type="audio/mpeg" src="foo.mp3">
  <source type="audio/ogg" src="foo.ogg">
</amp-audio>
[/sourcecode]

{% call callout('Catatan', type='note') %}
 Sertakan `<script async custom-element="amp-audio"
src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` 
pada bagian atas halaman untuk menggunakan komponen ini. {% endcall %}

