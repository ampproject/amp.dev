---
$title: amp-pixel
$category@: ads-analytics
teaser:
  text: A tracking pixel to count page views.
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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
    <td>Dapat digunakan sebagai piksel pelacakan standar untuk menghitung kunjungan halaman.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>fixed, nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Contoh</strong></td>
    <td>Lihat <a href="https://ampbyexample.com/components/amp-pixel/">contoh amp-pixel</a> AMP By Example.</td>
  </tr>
</table>

## Perilaku <a name="behavior"></a>

Komponen `amp-pixel` berperilaku seperti piksel pelacakan sederhana, `img`. Komponen ini memerlukan URL tunggal, tetapi menyediakan variabel yang dapat diganti dengan komponen dalam string URL saat membuat permintaan. Lihat bagian [substitusi](#substitutions) untuk detail lebih lanjut.

Dalam contoh dasar ini, `amp-pixel` mengeluarkan permintaan GET sederhana ke URL yang diberikan dan mengabaikan hasilnya.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"></amp-pixel>
```

  [tip type="note"]Saat memproses URL AMP di header perujuk permintaan analisis, hapus atau abaikan parameter `usqp`. Parameter ini digunakan oleh Google untuk memicu eksperimen Cache AMP Google.
  [/tip]

## Atribut <a name="attributes"></a>

##### src (wajib) <a name="src-required"></a>

URL sederhana ke endpoint jarak jauh yang harus berupa protokol `https`.

##### referrerpolicy (opsional) <a name="referrerpolicy-optional"></a>

Atribut ini mirip dengan atribut `referrerpolicy` pada `<img>`, tetapi hanya menerima nilai `no-referrer`. Jika `referrerpolicy=no-referrer` ditentukan, header `referrer` akan dihapus dari permintaan HTTP.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"
    referrerpolicy="no-referrer"></amp-pixel>
```

##### allow-ssr-img (opsional) <a name="allow-ssr-img-optional"></a>

Atribut ini, yang digunakan dalam materi iklan AMP4ADS, menunjukkan bahwa sebagai bagian dari transformasi pasca-validasi, elemen img dapat ditempatkan langsung dalam elemen amp-pixel yang memungkinkan ping dikirim bersamaan dengan pengambilan/eksekusi AMP runtime.
Perhatikan bahwa ini berarti semua makro dalam URL TIDAK akan diperluas, sehingga gunakan hanya jika makro tersebut tidak ada di src.

##### atribut umum <a name="common-attributes"></a>

Elemen ini mencakup [atribut umum](../../../documentation/guides-and-tutorials/learn/common_attributes.md) yang diperluas ke komponen AMP.

## Substitusi <a name="substitutions"></a>

Komponen `amp-pixel` memungkinkan semua substitusi variabel URL standar.
Lihat [Panduan Substitusi](https://github.com/ampproject/amphtml/blob/master/extensions/spec/amp-var-substitutions.md) untuk informasi selengkapnya.

Pada contoh berikut, permintaan dapat dibuat untuk sesuatu seperti `https://foo.com/pixel?0.8390278471201` di mana nilai RANDOM dibuat secara acak pada setiap tayangan.

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"
    layout="nodisplay"></amp-pixel>
```

## Penataan gaya <a name="styling"></a>

`amp-pixel` tidak boleh diberi gaya.

## Validasi <a name="validation"></a>

Lihat [aturan amp-pixel](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) dalam spesifikasi validator AMP.
