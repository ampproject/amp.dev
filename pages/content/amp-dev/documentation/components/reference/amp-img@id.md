---
$category@: media
formats:
- websites
- email
- ads
- stories
teaser:
  text: Replaces the HTML5 img tag.
---


<!---
       Copyright 2015 The AMP HTML Authors. All Rights Reserved.

       Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS-IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
-->

# amp-img

<table>
  <tr>
    <td class="col-fourty"><strong>Deskripsi</strong></td>
    <td>Penggantian yang dikelola runtime untuk tag <code>img</code> HTML.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Tata Letak yang Didukung</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Contoh</strong></td>
    <td>Lihat <a href="https://ampbyexample.com/components/amp-img/">contoh amp-img</a> di AMP By Example.</td>
  </tr>
</table>


# Perilaku

Runtime dapat memilih untuk menunda atau memprioritaskan pemuatan resource berdasarkan posisi viewport, resource sistem, bandwidth koneksi, atau faktor lainnya. Komponen `amp-img` memungkinkan runtime untuk mengelola resource gambar secara efektif melalui cara ini.

Komponen `amp-img`, seperti semua resource AMP yang diambil secara eksternal, harus diberi ukuran eksplisit (seperti dalam `width` / `height`) terlebih dahulu, sehingga rasio tinggi lebar dapat diketahui tanpa mengambil gambar. Perilaku tata letak yang sebenarnya ditentukan oleh atribut `layout`.

[tip type="read-on"]
Pelajari lebih lanjut tata letak dalam spesifikasi [Sistem Tata Letak HTML AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md) dan [Tata Letak yang Didukung](https://www.ampproject.org/docs/guides/responsive/control_layout.html#the-layout-attribute).
[/tip]

# Contoh: Menampilkan gambar yang responsif

Pada contoh berikut, kami menampilkan gambar yang merespons ukuran viewport dengan menetapkan `layout=responsive`.  Gambar membentang dan menyusut sesuai dengan rasio tinggi lebar yang ditentukan oleh `width` dan `height`.

<div>
  <amp-iframe height="193" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Tampilkan selengkapnya" overflow="" tabindex="0" role="button">Tampilkan kode lengkap</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

[tip type="read-on"]
Pelajari tentang halaman AMP responsif dalam panduan [Membuat Halaman AMP yang Responsif](https://www.ampproject.org/docs/guides/responsive/responsive_design.html).
[/tip]

Jika resource yang diminta oleh komponen `amp-img` gagal dimuat, ruang akan kosong kecuali jika turunan [`fallback`](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md#fallback) disediakan. Fallback hanya dijalankan pada tata letak awal dan perubahan src berikutnya setelah fakta (misalnya, melalui pengubahan ukuran + srcset) tidak akan memiliki fallback untuk implikasi performa.

# Contoh: Menentukan gambar fallback

Pada contoh berikut, jika browser tidak mendukung WebP, gambar JPG fallback akan ditampilkan:

<div>
  <amp-iframe height="271" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.fallback.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Tampilkan selengkapnya" overflow="" tabindex="0" role="button">Tampilkan kode lengkap</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

Warna latar belakang placeholder atau visual lainnya dapat ditetapkan menggunakan pemilih CSS dan gaya pada elemen itu sendiri.

Fitur gambar tambahan seperti teks dapat diimplementasikan dengan HTML standar (misalnya `figure` dan `figcaption`).

[tip type="read-on"]
Pelajari lebih lanjut penggunaan `amp-img` dari resource berikut:

* [Placeholder &amp; fallback](https://www.ampproject.org/docs/design/responsive/placeholders)
* [Menyertakan Gambar &amp; Video](https://www.ampproject.org/docs/media/amp_replacements)
[/tip]

# Atribut

**src**

Atribut ini mirip dengan atribut `src` pada tag `img`. Nilainya harus berupa URL yang mengarah ke file gambar yang dapat disimpan di cache secara publik. Penyedia cache dapat menulis ulang URL ini saat menyerap file AMP agar mengarah ke versi gambar yang disimpan di cache.

**srcset**

Sama seperti atribut `srcset` pada tag `img`. Untuk browser yang tidak mendukung `srcset`, `<amp-img>` akan didefaultkan ke penggunaan `src`. Jika hanya `srcset` dan tidak ada `src` yang disediakan, URL pertama dalam `srcset` akan dipilih.

**sizes**

Sama seperti atribut `sizes` pada tag `img`.

[tip type="read-on"]
Lihat [Gambar responsif dengan srcset, size &amp; height](https://www.ampproject.org/docs/design/responsive/art_direction) untuk penggunaan `sizes` dan `srcset`.
[/tip]

**alt**

String teks alternatif, mirip dengan atribut `alt` pada `img`.

**attribution**

String yang menunjukkan atribusi gambar. Misalnya, `attribution="CC courtesy of Cats on Flicker"`

**height** dan **width**

Ukuran eksplisit gambar, yang digunakan oleh AMP runtime untuk menentukan rasio tinggi lebar tanpa mengambil gambar.

**atribut umum**

Elemen ini mencakup [atribut umum](https://www.ampproject.org/docs/reference/common_attributes) yang diperluas ke komponen AMP.

# Penataan gaya

`amp-img` dapat diberi gaya langsung melalui properti CSS. Sebagai contoh, penetapan placeholder latar belakang abu-abu dapat dicapai melalui:

```css
amp-img {
  background-color: grey;
  }
```

# Tips &amp; Trik

# Menskalakan gambar hingga lebar maksimum

Jika Anda ingin gambar diskalakan saat ukuran jendela berubah, tetapi hingga lebar maksimum (sehingga gambar tidak terentang melampaui lebarnya):

1. Tetapkan `layout=responsive` untuk `<amp-img>`.
1. Pada container gambar, tentukan atribut CSS `max-width:<max width to display image>`.  Mengapa di container?  Elemen `amp-img` dengan `layout=responsive` merupakan elemen *level blok*, sedangkan `<img>` merupakan *inline*. Cara lainnya, Anda dapat menetapkan `display: inline-block` dalam CSS untuk elemen amp-img.

# Perbedaan antara tata letak responsive dan intrinsic

Baik tata letak `responsive` maupun `intrinsic` menghasilkan gambar yang akan diskalakan secara otomatis.  Perbedaan utamanya adalah tata letak `intrinsic` menggunakan gambar SVG sebagai elemen penskalaannya.  Hal ini menjadikannya berperilaku sama seperti gambar HTML standar sembari mempertahankan manfaat browser yang mengetahui ukuran gambar pada tata letak awal. Tata letak `intrinsic` akan memiliki ukuran intrinsik dan akan memperbesar `div` mengambang sampai mencapai ukuran gambar yang natural atau mencapai batasan CSS seperti `max-width`. Tata letak `responsive` akan merender 0x0 dalam `div` mengambang karena ukurannya berasal dari induk, yang tidak memiliki ukuran natural saat mengambang.

# Menetapkan gambar berukuran tetap

Jika Anda ingin gambar ditampilkan dalam ukuran tetap:

1. Tetapkan `layout=fixed` untuk `<amp-img>`.
1. Tentukan `width` dan `height`.

[tip type="read-on"]
Pelajari tentang [inferred layout](https://www.ampproject.org/docs/design/responsive/control_layout#what-if-the-layout-attribute-isn%E2%80%99t-specified?) jika Anda tidak menentukan atribut `layout`.
[/tip]

# Menetapkan rasio tinggi lebar

Untuk gambar responsif, `width` dan `height` tidak harus sama persis dengan lebar dan tinggi `amp-img`; yang penting nilai tersebut menghasilkan rasio tinggi lebar yang sama.

Misalnya, bukannya menetapkan `width="900"` dan `height="675"`, Anda cukup menetapkan `width="1.33"` dan `height="1"`.

<div>
  <amp-iframe height="193" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.aspectratio.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Tampilkan selengkapnya" overflow="" tabindex="0" role="button">Tampilkan kode lengkap</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

# Menetapkan beberapa file sumber untuk resolusi layar yang berbeda

Atribut [`srcset`](#attributes) digunakan untuk memberikan resolusi berbeda dari gambar yang sama, yang semuanya memiliki rasio tinggi lebar yang sama. Browser akan otomatis memilih file yang paling sesuai dari `srcset` berdasarkan resolusi layar dan lebar perangkat pengguna.

Sebaliknya, atribut [`media`](https://www.ampproject.org/docs/reference/common_attributes#media) menampilkan atau menyembunyikan komponen AMP, dan digunakan saat mendesain tata letak responsif. Cara yang tepat untuk menampilkan gambar dengan rasio tinggi lebar yang berbeda-beda adalah dengan menggunakan beberapa komponen `<amp-img>`, yang masing-masing memiliki atribut `media` yang cocok dengan lebar layar tempat setiap instance akan ditampilkan.

Lihat panduan cara [membuat halaman AMP yang responsif](https://www.ampproject.org/docs/design/responsive/responsive_design#displaying-responsive-images) untuk penjelasan selengkapnya.

# Mempertahankan rasio tinggi lebar untuk gambar dengan dimensi yang tidak diketahui

Sistem tata letak AMP memerlukan rasio tinggi lebar gambar sebelum mengambil gambar; namun, dalam beberapa kasus, dimensi gambar mungkin tidak diketahui. Untuk menampilkan gambar dengan dimensi yang tidak diketahui dan mempertahankan rasio tinggi lebar, kombinasikan tata letak [`fill`](https://www.ampproject.org/docs/design/responsive/control_layout#the-layout-attribute) AMP dengan properti CSS [`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/). Untuk informasi selengkapnya, lihat [Cara mendukung gambar dengan dimensi yang tidak diketahui](https://ampbyexample.com/advanced/how_to_support_images_with_unknown_dimensions) di AMP By Example.

# Validasi

Lihat [aturan amp-img](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) dalam spesifikasi validator AMP.
