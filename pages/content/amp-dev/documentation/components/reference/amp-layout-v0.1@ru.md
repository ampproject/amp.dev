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
    <td width="40%"><strong>Описание</strong></td>
    <td>Элемент универсального общего контейнера, который позволяет использовать эффективные <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">макеты</a> AMP в любом элементе.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые макеты</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, intrinsic, responsive</td>
  </tr>
</table>

## Обзор <a name="overview"></a>

Компонент `amp-layout` позволяет применять адаптивные макеты на основе соотношения сторон к любому элементу. Этот компонент похож по принципу действия на атрибут [layout](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) в имеющихся компонентах AMP, но в качестве дочерних элементов поддерживает любую разметку HTML. С компонентом `amp-layout` совместимы все поддерживаемые макеты, например fixed-height, fixed и т. д.

**Пример**

В приведенном ниже примере компонент `amp-layout` используется для создания адаптивного контейнера вокруг круга, нарисованного с помощью встроенного кода SVG.

```html
<amp-layout layout="responsive" width="1" height="1">
  <svg viewBox="0 0 100 100">
    <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="3" />
      Ваш браузер не поддерживает встроенного кода SVG.
    </svg>
  </amp-layout>
```

## Атрибуты <a name="attributes"></a>

Этот элемент содержит [распространенные атрибуты](../../../documentation/guides-and-tutorials/learn/common_attributes.md), расширенные до компонентов AMP.

## Проверка <a name="validation"></a>

О правилах для amp-layout читайте в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
