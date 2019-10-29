---
$category@: layout
teaser:
  text: >-
    The amp-layout` component allows you to apply aspect-ratio based responsive
    layouts to any element. The `amp-layout` component works similarly to the
    layout.
$title: amp-layout
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
    <td width="40%"><strong>Deskripsi</strong></td>
    <td>Elemen container serbaguna generik yang menghadirkan <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">tata letak</a> AMP yang canggih ke semua elemen.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, intrinsic, responsive</td>
  </tr>
</table>

## Ringkasan <a name="overview"></a>

Komponen `amp-layout` memungkinkan Anda menerapkan tata letak responsive berbasis rasio tinggi lebar ke semua elemen. Komponen `amp-layout` berfungsi dengan cara yang mirip untuk atribut [layout](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) pada komponen AMP yang ada, tetapi mendukung semua markup HTML sebagai turunan. Tata letak lain yang didukung semuanya dapat digunakan dengan `amp-layout` (misalnya, fixed-height, fixed, dll.).

**Contoh**

Contoh ini menggunakan `amp-layout` untuk membuat container responsif di sekitar lingkaran yang digambar dengan SVG inline.

```html
<amp-layout layout="responsive" width="1" height="1">
  <svg viewBox="0 0 100 100">
    <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="3" />
      Sorry, your browser does not support inline SVG.
    </svg>
  </amp-layout>
```

## Atribut <a name="attributes"></a>

Elemen ini mencakup [atribut umum](../../../documentation/guides-and-tutorials/learn/common_attributes.md) yang diperluas ke komponen AMP.

## Validasi <a name="validation"></a>

Lihat [aturan amp-layout](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) dalam spesifikasi validator AMP.
