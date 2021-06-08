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
    <td width="40%"><strong>说明</strong></td>
    <td>一个常规的多用途容器元素，可将 AMP 强大的<a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">布局</a>功能运用到任何元素上。</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>container、fill、fixed、fixed-height、flex-item、intrinsic、responsive</td>
  </tr>
</table>

## 概述 <a name="overview"></a>

借助 `amp-layout` 组件，您可以将基于宽高比的自适应布局应用于任何元素。`amp-layout` 组件与现有 AMP 组件的 [layout](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) 属性的工作原理相似，但前者支持用作子级的所有 HTML 标记。其他支持的布局均使用 `amp-layout`（例如 fixed-height、fixed 等）。

**示例**

此示例使用 `amp-layout` 在用内嵌 SVG 绘制的圆周围创建了一个自适应容器。

```html
<amp-layout layout="responsive" width="1" height="1">
  <svg viewBox="0 0 100 100">
    <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="3" />
      抱歉，您的浏览器不支持内嵌 SVG。
    </svg>
  </amp-layout>
```

## 属性 <a name="attributes"></a>

此元素包含扩展到 AMP 组件的[常见属性](../../../documentation/guides-and-tutorials/learn/common_attributes.md)。

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-layout 规则](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)。
