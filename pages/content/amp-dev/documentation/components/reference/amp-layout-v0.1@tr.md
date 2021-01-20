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
    <td width="40%"><strong>Açıklama</strong></td>
    <td>AMP'nin güçlü <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">düzenlerini</a> herhangi bir öğeye getiren genel, çok amaçlı bir kapsayıcı öğesi.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Desteklenen Düzenler</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, intrinsic, responsive</td>
  </tr>
</table>

## Genel Bakış <a name="overview"></a>

`amp-layout` bileşeni, herhangi bir öğeye en boy oranına dayanan duyarlı düzenler uygulamanıza olanak tanır. `amp-layout` bileşeni, mevcut AMP bileşenlerinde [düzen](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) özelliğine benzer şekilde çalışır ancak HTML işaretlemelerini alt öğe olarak destekler. Desteklenen diğer düzenlerin tümü `amp-layout` ile çalışır (ör. fixed-height, fixed vb.).

**Örnek**

Bu örnekte, satır içi SVG ile çizilmiş bir dairenin çevresinde duyarlı bir kapsayıcı oluşturmak için `amp-layout` kullanılmaktadır.

```html
<amp-layout layout="responsive" width="1" height="1">
  <svg viewBox="0 0 100 100">
    <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="3" />
      Sorry, your browser does not support inline SVG.
    </svg>
  </amp-layout>
```

## Özellikler <a name="attributes"></a>

Bu öğe, AMP bileşenlerine genişletilmiş [ortak özellikleri](../../../documentation/guides-and-tutorials/learn/common_attributes.md) içerir.

## Doğrulama <a name="validation"></a>

AMP doğrulayıcı spesifikasyonunda [amp-layout kurallarına](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) bakın.
,false,false
