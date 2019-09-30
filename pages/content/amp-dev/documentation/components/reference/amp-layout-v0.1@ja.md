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
    <td width="40%"><strong>説明</strong></td>
    <td>任意の要素に AMP の高度な<a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">レイアウト</a>機能を適用できる汎用の多目的コンテナ要素。</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>container、fill、fixed、fixed-height、flex-item、intrinsic、responsive</td>
  </tr>
</table>

## 概要 <a name="overview"></a>

`amp-layout` コンポーネントを使用すると、任意の要素にアスペクト比ベースのレスポンシブ レイアウトを適用できます。`amp-layout` コンポーネントは、既存の AMP コンポーネントの [layout](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) 属性と同様の機能を果たしますが、任意の HTML マークアップを子としてサポートすることができます。他のサポート対象レイアウトはすべて、`amp-layout` と連携できます（fixed-height、fixed など）。

**例**

以下の例では、`amp-layout` を使用して、インライン SVG で描画した円の周囲にレスポンシブ コンテナを作成しています。

```html
<amp-layout layout="responsive" width="1" height="1">
  <svg viewBox="0 0 100 100">
    <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="3" />
      Sorry, your browser does not support inline SVG.
    </svg>
  </amp-layout>
```

## 属性 <a name="attributes"></a>

この要素には、AMP コンポーネントに拡張された[共通の属性](../../../documentation/guides-and-tutorials/learn/common_attributes.md)が含まれます。

## 検証 <a name="validation"></a>

AMP 検証ツール仕様の [amp-layout ルール](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)をご覧ください。
