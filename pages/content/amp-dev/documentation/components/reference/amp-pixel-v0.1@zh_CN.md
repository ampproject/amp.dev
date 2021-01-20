---
$title: amp-pixel
$category@: ads-analytics
teaser:
  text: 一种跟踪像素，用于统计网页浏览量。
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
    <td class="col-fourty"><strong>说明</strong></td>
    <td>可用作典型的跟踪像素来统计网页浏览量。</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>fixed、nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>示例</strong></td>
    <td>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/components/amp-pixel/">amp-pixel 示例</a>。</td>
  </tr>
</table>

## 行为 <a name="behavior"></a>

`amp-pixel` 组件的行为与简单的跟踪像素 `img` 类似。该组件只需要一个网址，但提供的变量可以在发出请求时被网址字符串中的组件替换。如需了解详情，请参阅[替换](#substitutions)部分。

在下面的基本示例中，`amp-pixel` 向给定网址发出一个简单的 GET 请求，之后忽略了结果。

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"></amp-pixel>
```

[tip type="note"]
在处理分析请求的引荐来源网址标头中包含的 AMP 网址时，请剔除或忽略 `usqp` 参数。该参数供 Google 用于触发针对 Google AMP 缓存的实验。
[/tip]

## 属性 <a name="attributes"></a>

##### src（必需） <a name="src-required"></a>

一个指向远程端点的简单网址，必须是 `https` 协议。

##### referrerpolicy（可选） <a name="referrerpolicy-optional"></a>

此属性类似于 `<img>` 上的 `referrerpolicy` 属性，但 `no-referrer` 是唯一可接受的值。如果指定了 `referrerpolicy=no-referrer`，则系统会从 HTTP 请求中移除 `referrer` 标头。

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"
    referrerpolicy="no-referrer"></amp-pixel>
```

##### allow-ssr-img（可选） <a name="allow-ssr-img-optional"></a>

AMP4ADS 广告素材中使用的此属性表示：作为验证后转换的一部分，img 元素可以直接放置在 amp-pixel 元素内，从而允许 ping 与 AMP runtime 获取/执行并行发送。请注意，这意味着网址中的所有宏都不会展开，因此请仅在它们不在 src 中出现时才使用此属性。

##### 常见属性 <a name="common-attributes"></a>

此元素包含扩展到 AMP 组件的[常见属性](../../../documentation/guides-and-tutorials/learn/common_attributes.md)。

## 替换 <a name="substitutions"></a>

`amp-pixel` 支持所有标准网址变量替换。如需了解详情，请参阅[替换指南](https://github.com/ampproject/amphtml/blob/master/extensions/spec/amp-var-substitutions.md)。

在下面的示例中，系统可能会向 `https://foo.com/pixel?0.8390278471201` 等对象发出请求，其中 RANDOM 值是在每次展示时随机生成的。

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"
    layout="nodisplay"></amp-pixel>
```

## 样式设置 <a name="styling"></a>

不应设置 `amp-pixel` 的样式。

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-pixel 规则](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)。
