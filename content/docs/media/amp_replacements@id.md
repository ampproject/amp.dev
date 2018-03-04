---
$title: Menyertakan Gambar & Video
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

 Sertakan gambar pada halaman Anda menggunakan elemen [`amp-img`](/id/docs/reference/components/amp-img.html) seperti berikut:

<!--embedded example - fixed size image -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.fixed.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

Pada sebagian besar contoh dasar ini, gambar akan ditampilkan dengan lebar dan tinggi tetap yang telah ditentukan. Setidaknya, lebar dan tinggi minimum secara eksplisit perlu ditetapkan.

#### Menampilkan gambar saat JavaScript dinonaktifkan

 Karena `<amp-img>`  bergantung pada JavaScript, jika pengguna memilih menonaktifkan skrip, gambar tidak akan ditampilkan. Dalam hal ini, Anda harus memberikan penggantian pada gambar menggunakan `<img>`  dan `<noscript>`, seperti berikut:

<!--embedded example - img with noscript -->
<div>
<amp-iframe height="215"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.noscript.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

### Tata letak lanjutan

 Dibandingkan CSS/HTML standar, AMP memudahkan pembuatan gambar yang benar-benar responsif. Pada sebagian besar bentuk dasarnya, Anda hanya perlu menambahkan `layout="responsive"`:

<!--embedded example - basic responsive image -->
<div>
<amp-iframe height="193"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Baca juga', type='success') %}
 Pelajari lebih lanjut tentang [teknik tata letak lanjutan](/id/docs/guides/responsive/control_layout.html).{% endcall %}

### Perilaku dan placeholder

Waktu proses HTML AMP dapat mengelola konten gambar secara efektif, dengan memilih antara pemuatan konten yang diprioritaskan atau yang mengalami penundaan berdasarkan pada posisi viewport, sumber daya sistem, bandwidth koneksi, atau faktor lainnya.

{% call callout('Baca juga', type='success') %}
 Pelajari cara [memberikan penggantian dan placeholder untuk gambar](/id/docs/guides/responsive/placeholders.html)
.{% endcall %}

## Gambar animasi

 Elemen [`amp-anim`](/id/docs/reference/components/amp-anim.html) sangat mirip dengan elemen `amp-img`, kedua elemen ini memberikan fungsi tambahan untuk mengelola pemuatan dan pemutaran gambar animasi seperti GIF.

<!--embedded amp-anim basic example -->
<div>
<amp-iframe height="253"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Catatan', type='note') %}
 Sertakan `<script async custom-element="amp-anim"
src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` 
pada bagian atas halaman untuk menggunakan komponen ini. {% endcall %}

## Video

 Sertakan video di halaman Anda menggunakan elemen [`amp-video`](/id/docs/reference/components/amp-video.html) .

 Hanya gunakan elemen ini untuk file video HTML5 langsung yang disematkan. Elemen akan memuat konten video yang ditetapkan oleh atribut `src` secara perlahan, pada waktu yang telah ditentukan oleh AMP.

Sertakan placeholder sebelum video dimulai, dan penggantian, jika browser tidak mendukung video HTML5, misalnya:

<!--embedded video example  -->
<div>
<amp-iframe height="234"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Audio

 Sertakan konten audio pada halaman Anda, menggunakan elemen [`amp-audio`](/id/docs/reference/components/amp-audio.html) .

 Hanya gunakan elemen ini untuk file audio HTML5 langsung yang disematkan. Seperti halnya semua konten eksternal yang disematkan pada halaman AMP, elemen tersebut akan memuat konten audio yang telah ditetapkan oleh atribut `src` secara perlahan, pada waktu yang telah ditentukan oleh AMP.

Sertakan placeholder sebelum audio dimulai, dan penggantian, jika browser tidak mendukung audio HTML5, misalnya:

<!--embedded audio example  -->
<div>
<amp-iframe height="314"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampaudio.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Catatan', type='note') %}
 Sertakan `<script async custom-element="amp-audio"
src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` 
pada bagian atas halaman untuk menggunakan komponen ini. {% endcall %}

