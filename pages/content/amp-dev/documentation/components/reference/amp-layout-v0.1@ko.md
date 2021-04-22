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
    <td width="40%"><strong>설명</strong></td>
    <td>AMP의 강력한 <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">레이아웃</a>을 모든 요소에 적용하는 일반적인 다목적 컨테이너 요소입니다.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, intrinsic, responsive</td>
  </tr>
</table>

## 개요 <a name="overview"></a>

`amp-layout` 구성요소를 사용하면 가로세로 비율 기반 반응형 레이아웃을 모든 요소에 적용할 수 있습니다. `amp-layout` 구성요소는 기존 AMP 구성요소의 [layout](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) 속성과 비슷하게 작동하지만 HTML 마크업을 하위 요소로 지원합니다. 기타 지원되는 모든 레이아웃은 모두 `amp-layout`과 함께 작동합니다(예: fixed-height, fixed 등).

**예**

이 예에서는 `amp-layout`을 사용하여 인라인 SVG로 그린 원 주변에 반응형 컨테이너를 만듭니다.

```html
<amp-layout layout="responsive" width="1" height="1">
  <svg viewBox="0 0 100 100">
    <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="3" />
      Sorry, your browser does not support inline SVG.
    </svg>
  </amp-layout>
```

## 속성 <a name="attributes"></a>

이 요소에는 AMP 구성요소로 확장된 [공통 속성](../../../documentation/guides-and-tutorials/learn/common_attributes.md)이 포함됩니다.

## 유효성 검사 <a name="validation"></a>

AMP 유효성 검사기 사양의 [amp-layout 규칙](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)을 참조하세요.
