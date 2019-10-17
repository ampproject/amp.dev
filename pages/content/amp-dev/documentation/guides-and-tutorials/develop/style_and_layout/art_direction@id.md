---
$title: Gambar responsif dengan atribut srcset, sizes & heights
---

## srcset

 Gunakan atribut `srcset` untuk mengontrol aset elemen berdasarkan berbagai ekspresi media. Secara khusus, gunakan atribut ini untuk semua tag [`amp-img`](../../../../documentation/components/reference/amp-img.md) guna menentukan aset gambar yang akan dipakai berdasarkan berbagai ukuran layar.

Dalam contoh sederhana ini, `srcset` menentukan gambar yang akan digunakan berdasarkan lebar layar. Deskriptor `w` memberi tahu browser tentang lebar setiap gambar dalam daftar:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w">
</amp-img>
```
[/example]

Catatan: AMP mendukung srcset dengan deskriptor `w` di semua browser.

Pelajari lebih lanjut cara membuat gambar responsif menggunakan `srcset` di [Menggunakan Gambar Responsif (Sekarang)](http://alistapart.com/article/using-responsive-images-now).

## sizes

Anda juga dapat menggunakan atribut `sizes` bersamaan dengan `srcset`. Atribut `sizes` mendeskripsikan cara menghitung ukuran elemen berdasarkan ekspresi media apa pun. Berdasarkan ukuran yang dihitung elemen, agen pengguna memilih sumber paling relatif yang disuplai oleh atribut `srcset`.

Pertimbangkan contoh berikut:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw">
</amp-img>
```
[/example]

Atribut `sizes` menentukan lebar elemen menjadi 50% dari ukuran viewport jika viewport berukuran 650px atau lebih. Contoh, jika viewport berukuran 800px, lebar elemen disetel menjadi 400px. Kemudian, browser akan memilih sumber daya `srcset` yang relatif dengan 400px, dengan asumsi rasio piksel perangkat adalah 1, yang dalam kasus ini adalah `narrow.jpg` (320px).

Penting: Jika atribut sizes ditetapkan beserta lebar dan tinggi, setelan default tata letak diatur menjadi `responsive`.

Pelajari lebih lanjut cara atribut `sizes` dan `srcset` dibandingkan dengan kueri media dalam entri blog [Srcset dan sizes](https://ericportis.com/posts/2014/srcset-sizes/) ini.

## heights

 Semua elemen khusus AMP yang memungkinkan tata letak `responsive`, juga mendukung atribut `heights`. Nilai atribut ini adalah ekspresi sizes berdasarkan ekspresi media yang mirip dengan [atribut sizes img](https://developer.mozilla.org/id/docs/Web/HTML/Element/img), namun dengan 2 perbedaan utama:

1. Berlaku untuk tinggi dan bukan lebar elemen.
2. Nilai dalam bentuk persen diizinkan, misalnya `86%`. Jika nilai dalam bentuk persen digunakan, nilai akan menunjukkan persentase lebar elemen.

Jika atribut `heights` ditentukan beserta `width` dan `height`, setelan default `layout` diatur menjadi `responsive`.

Contoh:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%">
</amp-img>
```
[/example]

Dalam contoh ini, setelan default tinggi elemen adalah 80% dari lebar, namun untuk viewport yang lebih lebar dari `500px` akan dibatasi menjadi `200px`.

