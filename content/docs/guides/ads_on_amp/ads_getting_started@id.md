---
$title : "Memulai"
$order : 0
---

## 3 Langkah Mudah untuk Menayangkan Iklan di Halaman AMP Anda

Tidak tahu cara memulainya? Dalam panduan singkat ini, Anda akan mempelajari cara menayangkan iklan dengan cepat dan mudah di halaman AMP.

###  1. Tambahkan `<amp-ads>` komponen ke halaman AMP:

[sourcecode:html]
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
[/sourcecode]

 Dengan menambahkan `komponen amp-ads,` Anda telah menambahkan framework iklan ke halaman AMP.

###  2. Tetapkan server iklan atau jaringan iklan pada `atribut` type:

[sourcecode:html]
<amp-ad
    type="a9">
  </amp-ad>
[/sourcecode]

[Berikut ini](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks) daftar jaringan iklan yang didukung.

### 3. Tetapkan lebar dan tinggi unit iklan:

[sourcecode:html]
<amp-ad width="300"
    height="250"
    type="a9"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  </amp-ad>
[/sourcecode]

Dengan menentukan lebar dan tinggi unit iklan, Anda telah menetapkan ukuran iklan di halaman AMP.

{% call callout('Catatan', type='note') %}
 Atribut data tambahan akan memberikan informasi kepada jaringan iklan untuk mendapatkan pub dan ukuran yang tepat dari servernya. Setiap jaringan iklan mengirimkan atribut yang berbeda.[Pelajari lebih lanjut](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks).
 {% endcall %}

###  4. [OPSIONAL] Tetapkan placeholder:

[sourcecode:html]
<amp-ad width="300"
    height="200"
    type="doubleclick"
    data-slot="/4119129/doesnt-exist">
  <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
[/sourcecode]

AMP mendukung atribut placeholder opsional. Bergantung pada jaringan iklan, Anda dapat memilih untuk menampilkan placeholder sampai ada iklan yang tersedia untuk ditayangkan. Itu agar halaman tidak menampilkan ruang kosong, sehingga bisa memberikan pengalaman pengguna yang lebih baik:

###  5. [OPSIONAL] Tetapkan atribut penggantian:

[sourcecode:html]
<amp-ad width="300"
    height="200"
    type="doubleclick"
    data-slot="/4119129/doesnt-exist">
  <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
[/sourcecode]

AMP mendukung atribut penggantian opsional. Bergantung pada jaringan iklan, Anda dapat memilih untuk menampilkan elemen penggantian ini jika tidak ada iklan yang tersedia untuk ditayangkan.

### 6. Selamat. Anda berhasil menayangkan iklan di halaman AMP.

