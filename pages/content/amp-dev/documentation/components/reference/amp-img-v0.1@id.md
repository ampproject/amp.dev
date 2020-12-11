---
$title: amp-img
$category@: media
teaser:
  text: Replaces the HTML5 img tag.
---


<!--
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



<table>
  <tr>
    <td class="col-fourty"><strong>Deskripsi</strong></td>
    <td>Penggantian yang dikelola runtime untuk tag <code>img</code> HTML.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Contoh</strong></td>
    <td>Lihat <a href="https://ampbyexample.com/components/amp-img/">contoh amp-img</a> di AMP By Example.</td>
  </tr>
</table>


# Perilaku <a name="behavior"></a>

Runtime dapat memilih untuk menunda atau memprioritaskan pemuatan resource berdasarkan posisi viewport, resource sistem, bandwidth koneksi, atau faktor lainnya. Komponen `amp-img` memungkinkan runtime untuk mengelola resource gambar secara efektif melalui cara ini.

Komponen `amp-img`, seperti semua resource AMP yang diambil secara eksternal, harus diberi ukuran eksplisit (seperti dalam `width` / `height`) terlebih dahulu, sehingga rasio tinggi lebar dapat diketahui tanpa mengambil gambar. Perilaku tata letak yang sebenarnya ditentukan oleh atribut `layout`.

[tip type="read-on"]
Pelajari lebih lanjut tata letak dalam spesifikasi [Sistem Tata Letak HTML AMP](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md) dan [Tata Letak yang Didukung](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute).
[/tip]

# Contoh: Menampilkan gambar yang responsif <a name="example-displaying-a-responsive-image"></a>

Pada contoh berikut, kami menampilkan gambar yang merespons ukuran viewport dengan menetapkan `layout=responsive`.  Gambar membentang dan menyusut sesuai dengan rasio tinggi lebar yang ditentukan oleh `width` dan `height`.

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

[tip type="read-on"]
Pelajari tentang halaman AMP responsif dalam panduan [Membuat Halaman AMP yang Responsif](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md).
[/tip]

Jika resource yang diminta oleh komponen `amp-img` gagal dimuat, ruang akan kosong kecuali jika turunan [`fallback`](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#fallback) disediakan. Fallback hanya dijalankan pada tata letak awal dan perubahan src berikutnya setelah fakta (misalnya, melalui pengubahan ukuran + srcset) tidak akan memiliki fallback untuk implikasi performa.

# Contoh: Menentukan gambar fallback <a name="example-specifying-a-fallback-image"></a>

Pada contoh berikut, jika browser tidak mendukung WebP, gambar JPG fallback akan ditampilkan:

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

Warna latar belakang placeholder atau visual lainnya dapat ditetapkan menggunakan pemilih CSS dan gaya pada elemen itu sendiri.

Fitur gambar tambahan seperti teks dapat diimplementasikan dengan HTML standar (misalnya `figure` dan `figcaption`).

[tip type="read-on"]
Pelajari lebih lanjut penggunaan `amp-img` dari resource berikut:

* [Placeholder & fallback](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)
* [Menyertakan Gambar & Video](../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)
[/tip]

# Atribut <a name="attributes"></a>

**src**

Atribut ini mirip dengan atribut `src` pada tag `img`. Nilainya harus berupa URL yang mengarah ke file gambar yang dapat disimpan di cache secara publik. Penyedia cache dapat menulis ulang URL ini saat menyerap file AMP agar mengarah ke versi gambar yang disimpan di cache.

**srcset**

Sama seperti atribut `srcset` pada tag `img`. Untuk browser yang tidak mendukung `srcset`, `<amp-img>` akan didefaultkan ke penggunaan `src`. Jika hanya `srcset` dan tidak ada `src` yang disediakan, URL pertama dalam `srcset` akan dipilih.

**sizes**

Sama seperti atribut `sizes` pada tag `img`.

[tip type="read-on"]
Lihat [Gambar responsif dengan srcset, size & height](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md) untuk penggunaan `sizes` dan `srcset`.
[/tip]

**alt**

String teks alternatif, mirip dengan atribut `alt` pada `img`.

**attribution**

String yang menunjukkan atribusi gambar. Misalnya, `attribution="CC courtesy of Cats on Flicker"`

**height** dan **width**

Ukuran eksplisit gambar, yang digunakan oleh AMP runtime untuk menentukan rasio tinggi lebar tanpa mengambil gambar.

**atribut umum**

Elemen ini mencakup [atribut umum](../../../documentation/guides-and-tutorials/learn/common_attributes.md) yang diperluas ke komponen AMP.

# Penataan gaya <a name="styling"></a>

`amp-img` dapat diberi gaya langsung melalui properti CSS. Sebagai contoh, penetapan placeholder latar belakang abu-abu dapat dicapai melalui:

```css
amp-img {
  background-color: grey;
  }
```

# Tips & Trik <a name="tips--tricks"></a>

# Menskalakan gambar hingga lebar maksimum <a name="scaling-an-image-up-to-a-maximum-width"></a>

Jika Anda ingin gambar diskalakan saat ukuran jendela berubah, tetapi hingga lebar maksimum (sehingga gambar tidak terentang melampaui lebarnya):

1. Tetapkan `layout=responsive` untuk `<amp-img>`.
1. Pada container gambar, tentukan atribut CSS `max-width:<max width to display image>`.  Mengapa di container?  Elemen `amp-img` dengan `layout=responsive` merupakan elemen *level blok*, sedangkan `<img>` merupakan *inline*. Cara lainnya, Anda dapat menetapkan `display: inline-block` dalam CSS untuk elemen amp-img.

# Perbedaan antara tata letak responsive dan intrinsic <a name="the-difference-between-responsive-and-intrinsic-layout"></a>

Baik tata letak `responsive` maupun `intrinsic` menghasilkan gambar yang akan diskalakan secara otomatis.  Perbedaan utamanya adalah tata letak `intrinsic` menggunakan gambar SVG sebagai elemen penskalaannya.  Hal ini menjadikannya berperilaku sama seperti gambar HTML standar sembari mempertahankan manfaat browser yang mengetahui ukuran gambar pada tata letak awal. Tata letak `intrinsic` akan memiliki ukuran intrinsik dan akan memperbesar `div` mengambang sampai mencapai ukuran gambar yang natural atau mencapai batasan CSS seperti `max-width`. Tata letak `responsive` akan merender 0x0 dalam `div` mengambang karena ukurannya berasal dari induk, yang tidak memiliki ukuran natural saat mengambang.

# Menetapkan gambar berukuran tetap <a name="setting-a-fixed-sized-image"></a>

Jika Anda ingin gambar ditampilkan dalam ukuran tetap:

1. Tetapkan `layout=fixed` untuk `<amp-img>`.
1. Tentukan `width` dan `height`.

[tip type="read-on"]
Pelajari tentang [inferred layout](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified) jika Anda tidak menentukan atribut `layout`.
[/tip]

# Menetapkan rasio tinggi lebar <a name="setting-the-aspect-ratio"></a>

Untuk gambar responsif, `width` dan `height` tidak harus sama persis dengan lebar dan tinggi `amp-img`; yang penting nilai tersebut menghasilkan rasio tinggi lebar yang sama.

Misalnya, bukannya menetapkan `width="900"` dan `height="675"`, Anda cukup menetapkan `width="1.33"` dan `height="1"`.

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="1.33"
  height="1"
  layout="responsive">
</amp-img>
```
[/example]

# Menetapkan beberapa file sumber untuk resolusi layar yang berbeda <a name="setting-multiple-source-files-for-different-screen-resolutions"></a>

Atribut [`srcset`](#attributes) digunakan untuk memberikan resolusi berbeda dari gambar yang sama, yang semuanya memiliki rasio tinggi lebar yang sama. Browser akan otomatis memilih file yang paling sesuai dari `srcset` berdasarkan resolusi layar dan lebar perangkat pengguna.

Sebaliknya, atribut [`media`](../../../documentation/guides-and-tutorials/learn/common_attributes.md#media) menampilkan atau menyembunyikan komponen AMP, dan digunakan saat mendesain tata letak responsif. Cara yang tepat untuk menampilkan gambar dengan rasio tinggi lebar yang berbeda-beda adalah dengan menggunakan beberapa komponen `<amp-img>`, yang masing-masing memiliki atribut `media` yang cocok dengan lebar layar tempat setiap instance akan ditampilkan.

Lihat panduan cara [membuat halaman AMP yang responsif](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#displaying-responsive-images) untuk penjelasan selengkapnya.

# Mempertahankan rasio tinggi lebar untuk gambar dengan dimensi yang tidak diketahui <a name="maintaining-the-aspect-ratio-for-images-with-unknown-dimensions"></a>

Sistem tata letak AMP memerlukan rasio tinggi lebar gambar sebelum mengambil gambar; namun, dalam beberapa kasus, dimensi gambar mungkin tidak diketahui. Untuk menampilkan gambar dengan dimensi yang tidak diketahui dan mempertahankan rasio tinggi lebar, kombinasikan tata letak [`fill`](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) AMP dengan properti CSS [`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/). Untuk informasi selengkapnya, lihat [Cara mendukung gambar dengan dimensi yang tidak diketahui](https://ampbyexample.com/advanced/how_to_support_images_with_unknown_dimensions) di AMP By Example.

# Validasi <a name="validation"></a>

Lihat [aturan amp-img](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) dalam spesifikasi validator AMP.
