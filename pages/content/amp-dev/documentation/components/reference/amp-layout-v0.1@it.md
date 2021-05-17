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
    <td width="40%"><strong>Descrizione</strong></td>
    <td>Un elemento contenitore generico e multiuso che rende disponibili i potenti <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">layout</a> di AMP per qualsiasi elemento.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, intrinsic, responsive</td>
  </tr>
</table>

## Panoramica <a name="overview"></a>

Il componente `amp-layout` permette di applicare layout adattabili basati sulle proporzioni a qualsiasi elemento. Il componente `amp-layout` funziona in modo simile all'attributo [layout](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) sui componenti AMP esistenti, ma supporta qualsiasi markup HTML come elemento secondario. Tutti gli altri layout supportati funzionano con `amp-layout`, ad esempio fixed-height, fixed ecc.

**Esempio**

In questo esempio viene utilizzato `amp-layout` per creare un contenitore adattabile attorno a un cerchio disegnato con il tag svg incorporato.

```html
<amp-layout layout="responsive" width="1" height="1">
  <svg viewBox="0 0 100 100">
    <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="3" />
      Sorry, your browser does not support inline SVG.
    </svg>
  </amp-layout>
```

## Attributi <a name="attributes"></a>

Questo elemento include [attributi comuni](../../../documentation/guides-and-tutorials/learn/common_attributes.md) estesi ai componenti AMP.

## Convalida <a name="validation"></a>

Consulta le [regole amp-layout](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) nella specifica dello Strumento di convalida AMP.
