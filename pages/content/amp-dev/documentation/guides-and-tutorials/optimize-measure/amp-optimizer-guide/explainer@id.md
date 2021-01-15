---
"$title": Cara kerja Pengoptimal AMP
"$order": '1'
description: Sebuah Pengoptimal AMP mengambil dokumen AMPHTML yang valid sebagai input dan mengubahnya menjadi versi yang dioptimalkan dengan menerapkan pengoptimalan tambahan yang akan terlalu repot jika dilakukan “secara manual”. Panduan ini menjelaskan secara terperinci cara kerja Pengoptimal AMP.
formats:
- websites
- stories
author: sebastianbenz
---

Sebuah Pengoptimal AMP mengambil dokumen AMPHTML yang valid sebagai input dan mengubahnya menjadi versi yang dioptimalkan dengan menerapkan pengoptimalan tambahan yang akan terlalu repot jika dilakukan “secara manual”.  Anda dapat mengenali “**AMP transformasi**” yang dihasilkan di dalam elemen `html` melalui atribut `transformed`:

```
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self;v=1">
```

Catatan: Cache AMP menggunakan bendera transformasi yang berbeda, contohnya: cache AMP Google menambahkan `transformed=google;v=1`.

Pengoptimal AMP melakukan berbagai pengoptimalan pada sebuah dokumen AMP, mulai dari pengoptimalan tata letak perenderan sisi server hingga pengoptimalan gambar. Berikut ini adalah contoh yang memperlihatkan perbedaan di antara sebuah halaman AMP dan versi yang telah dioptimalkan ([klik untuk melihat versi besar](/static/img/docs/guides/optimized-amp-diff.png)).

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

Di dalam bagian selanjutnya di panduan ini, kami akan memperkenalkan pengoptimalan ini secara lebih terperinci.

### Tata tetak AMP perenderan sisi server

Tata tetak AMP perenderan sisi server mempunyai potensi terbesar untuk meningkatkan kinerja pemuatan halaman AMP Anda. Untuk menghindari loncatan konten, AMP mengharuskan situs web AMP untuk menambahkan [kode boilerplate AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) pada tajuk. Boilerplate AMP menyembunyikan konten halaman dengan mengatur opasitas (keburaman) badan halaman ke 0. Setelah AMP dimuat, ini akan dapat menghitung tata letak halaman. Setelah itu, AMP mengatur opasitas badan ke 1 yang menjadikan konten halaman terlihat. Sayangnya, pendekatan ini harus mengunduh kerangka kerja AMP sebelum dapat merender halaman.

Untuk meningkatkan hal ini, tata letak AMP, seperti tata letak `responsive` atau `fixed-height` dapat berupa sisi server yang telah dirender sebelum menyajikan halaman kepada agen pengguna. Dengan cara ini, menghapus boilerplate AMP dapat dilakukan sambil tetap menghindari [pergeseran konten](https://web.dev/cls/) selama pemuatan halaman.

Perenderan sisi server melakukan tiga hal:

⁣**1. Menghapus boilerplate AMP: ** untuk setiap elemen yang menggunakan tata letak AMP, markah yang spesifik untuk tata letak tersebut diinjeksi.

⁣**2. Inline AMP-internal CSS styles: ** the AMP-boilerplate code is replaced by the <a href="https://cdn.ampproject.org/v0.css">AMP-runtime CSS styles</a>: `<style amp-runtime>...</style>`. For non-server-side rendered documents, AMP adds these styles at runtime. However, server-side-rendered AMP pages require these for the AMP layouts to work before AMP has been loaded. To avoid potential version conflicts, at runtime, AMP will check if the version specified in i-amphtml-version="011905222334000" differs from the current AMP version and will update the CSS with the latest version if not.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

⁣**3. Tata tetak AMP perenderan sisi server: ** untuk setiap elemen yang menggunakan tata letak AMP, elemen pengatur ukuran yang spesifik untuk tata letak tersebut diinjeksi.

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

Peringatan: Boilerplate AMP tidak selalu dapat dihapus. Anda dapat mengetahui jika boilerplate telah dihapus dengan memeriksa apakah atribut `i-amphtml-no-boilerplate` ada pada elemen `html`. Contohnya: komponen `amp-experiment` mengubah konten halaman pada runtime. Untuk menghindari pergeseran konten, kode boilerplate AMP harus ada jika `amp-experiment` digunakan pada sebuah halaman.

### Pengoptimalan Gambar Hero

Sebuah Pengoptimal AMP dapat sangat meningkatkan waktu yang diperlukannya untuk merender gambar pada viewport pertama. Ini sangat penting saat mengoptimalkan [waktu LCP](https://web.dev/lcp/) untuk memenuhi [Core Web Vitals](https://web.dev/vitals).

Pada AMP, gambar hero dapat secara jelas dinyatakan dengan menganotasi `amp-img` menggunakan atribut `data-hero`:

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

Pengoptimal AMP mendukung maksimum dua gambar hero pada sebuah halaman untuk menghindari pemblokiran bandwidth untuk sumber daya penting lainnya. Jika batas ini tidak sesuai untuk Anda, [harap beri tahu kami](https://github.com/ampproject/amp-toolbox/issues).

Pengoptimal AMP juga akan secara otomatis mendeteksi gambar hero untuk elemen `amp-img`, `amp-iframe`, `amp-video`, atau `amp-video-iframe` dan menginjeksi `link rel=preload` untuk `src` gambar. Pendeteksian otomatis berfungsi dengan menganalisis tata letak gambar dan markah HTML untuk mendeteksi gambar besar pada viewport pertama.

Dalam hal `amp-img`, Pengoptimal AMP juga akan merender `img` di sisi server di dalam `amp-img`. Ini memungkinkan browser untuk langsung merender gambar tanpa memerlukan runtime AMP.

### Pengoptimalan Gambar

Pengoptimal AMP dapat membantu Anda menyajikan gambar responsif yang telah dioptimalkan dengan menghasilkan atribut `srcset` yang spesifik untuk Tata Letak AMP. Contohnya: pernyataan`amp-img` berikut ini:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive"></amp-img>
```

ditingkatkan dengan definisi `srcset` berikut ini:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive" srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"></amp-img>
```

Agar ini dapat bekerja, lingkungan pengelola/versi (build) Anda harus mendukung pengaturan ukuran/pengoptimalan gambar. Pelajari panduan pengoptimal individu tentang cara terbaik mengintegrasikan pengoptimalan gambar.

### Versi Modul AMP (Segera tersedia)

Tersedia versi Runtime AMP dan komponen yang lebih kecil berdasarkan [Modul JavaScript](https://v8.dev/features/modules#browser) yang mengharuskan pengguna untuk mengunduh lebih sedikit JavaScript saat melihat sebuah halaman AMP. Pengoptimal AMP mengaktifkan build atau versi Modul AMP sebagai default, dengan mengubah:

```
<script async src="https://www.ampproject.org/v0.js"></script>
```

menjadi:

```
<script type="module" async src="https://www.ampproject.org/v0.mjs"></script>
<script nomodule async src="https://www.ampproject.org/v0.js"></script>
```

Browser yang memahami `type="module"` mengabaikan skrip dengan atribut `nomodule`. Ini berarti, pengguna dengan browser modern akan mendapatkan manfaat dari bundel runtime yang lebih kecil, sedangkan pengguna browser lama akan kembali ke versi non-modul runtime AMP.

Catatan: Versi Modul AMP hanya tersedia untuk AMP transformasi karena memerlukan CSS Runtime AMP agar inline.
