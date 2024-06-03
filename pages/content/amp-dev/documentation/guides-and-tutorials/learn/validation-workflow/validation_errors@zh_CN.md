---
$title: AMP 验证错误
---

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

有效的 AMP 文档不得包含任何验证错误。
本文档旨在帮助您更好地了解
并更正在[验证 AMP 网页](validate_amp.md)时遇到的任何验证错误。
有关验证错误的完整概述，
请参阅 [AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)。

## AMP HTML 标记和属性错误

### 缺少必需的标记

<table>
   <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>MANDATORY_TAG_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The mandatory tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>添加（或更正）必需的 HTML 标记。</td>
  </tr>
</table>

所有 AMP 文档中都必须包含以下标记：

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> 或 <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`

在 <a href="https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii">AMP 验证工具规范</a>中，这些必需的标记包含 `mandatory: true` 字段；
[AMP 规范](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)中也提到了这些标记。

### 缺少其他标记所需的标记

<table>
  </tr>
   <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>TAG_REQUIRED_BY_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The '%1' tag is missing or incorrect, but required by '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>添加（或更正）所需的 HTML 标记。</td>
  </tr>
</table>

如果验证工具在 AMP 文档中发现扩展组件，
但未发现其对应的 `<script>`，则会显示
`TAG_REQUIRED_BY_MISSING` 错误。

[扩展组件](../../../../documentation/components/index.html)
必须作为自定义元素明确包含在 AMP 文档中。
要更正这类错误，请转到扩展组件的参考页面，
然后将其所需的脚本复制并粘贴到 AMP 文档 `<head>` 中。

### 不允许使用的标记

<table>
   <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>DISALLOWED_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The tag '%1' is disallowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>移除不允许使用的标记。</td>
  </tr>
</table>

可用的标记都已列入白名单，因此目前还没有列表将所有不允许使用的标记明确列出；
不过，[AMP 规范](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)
粗略地定义了一组不允许使用的标记。

### 不允许使用自定义 JavaScript

<table>
   <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>DISALLOWED_SCRIPT_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"Custom JavaScript is not allowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>移除 javascript 标记。</td>
  </tr>
</table>

AMP 格式不允许向网页添加自定义 JavaScript，但由 AMP 项目本身
提供的 JavaScript 文件除外。JavaScript 的许多常见用法都能在 AMP
HTML 库中找到等效实现。要查看
可用于增强 AMP HTML 网页的一套组件，
请参阅 [AMP 组件](../../../../documentation/components/index.html)。

如果其中未涵盖您的用例，您也可以考虑向 AMP 项目
中贡献新的组件。有关详情，
请参阅 AMP 项目的[贡献](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md)
文档。

### 缺少必需的属性

<table>
   <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>MANDATORY_ATTR_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The mandatory attribute '%1' is missing in tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>为标记添加必需属性。</td>
  </tr>
</table>

[AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)
中定义了 AMP 标记的必需属性。
只需搜索相应标记，
查看列出的属性，
然后查看是否存在 `mandatory: true` 即可。
每个 AMP 标记的规范中也列出了
相应标记的必需属性。

### 属性值无效

<table>
   <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>INVALID_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>将属性值更正为有效的值。</td>
  </tr>
</table>

如果存在此错误，则表示某个 HTML 标记具有名称
有效但值无效的属性。
例如，触发此错误的一个常见原因是网址的值无效。
所有网址值（在 `href` 和 `src` 属性中）都必须与
一个[可能的属性值](http://www.w3schools.com/tags/att_a_href.asp)匹配。

<strong>重要提示</strong>：AMP 中的许多网址值都需要包含 HTTPS。
如果您遇到此错误，但不确定是什么原因导致的，
请查阅相关 AMP 标记的规范，
看看相应属性是否需要包含 HTTPS。

### 不允许使用的属性

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>DISALLOWED_ATTR</td>
  </tr>
  <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The attribute '%1' may not appear in tag '%2'."</td>
  </tr>
  <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>将相应属性从 HTML 标记中移除。</td>
  </tr>
</table>

可用的属性都已列入白名单，因此目前还没有列表将所有不允许使用的属性明确列出。
要查看每个特定标记支持的属性，
请在 [AMP 验证工具规范]
(https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)中搜索 HTML 标记，然后搜索 `attrs`。

除了白名单中列出的每个标记专用的属性以外，
所有 AMP 标记还可以使用 `$GLOBAL_ATTRS` 下已列入白名单的任何属性；
前缀为 `"data-"` 的所有属性也都已列入白名单。

### 必需的文字缺失或不正确

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>MANDATORY_CDATA_MISSING_OR_INCORRECT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>添加或更正标记内必需的文字。</td>
  </tr>
</table>

CDATA 是开始和结束 HTML 标记之间的内容数据，
目前同时通过白名单和黑名单进行评估。
带有必需 CDATA 的标记包括：

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

以及：

[sourcecode:html]
<style amp-custom>
[/sourcecode]

此错误的详细消息可能是以下某项：

* "Mandatory style boilerplate (js enabled)"
* "Mandatory style boilerplate (noscript)"
* "Disallowed -amp- CSS class name prefix"
* "Disallowed !important attribute in CSS"
* "Disallowed &#64;charset in CSS"
* "Disallowed &#64;import in CSS"
* "Disallowed @namespace in CSS"
* "Disallowed @supports in CSS"
* "Disallowed @document in CSS"
* "Disallowed @page in CSS"
* "Disallowed @viewport in CSS"

### 标记中存在不允许使用的文字

<table>
   <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>CDATA_VIOLATES_DENYLIST</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>移除不允许使用的文字。</td>
  </tr>
</table>

特定 CSS 数据已列入黑名单，
以便验证基本的 CSS AMP 规则。

下面列出了已列入黑名单的 CSS 数据
（另请参阅 [AMP 验证工具规范中的 `disallowed_cdata_regex`](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)）：

* `"\\.i?-amp-"`（“CSS -amp- 类名称前缀”）
* `"!important"`
* `"charset"`
* `"&#64;import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### 标记内的属性中存在不允许使用的 property

<table>
   <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>DISALLOWED_PROPERTY_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The property '%1' in attribute '%2' in tag '%3' is disallowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>将不允许使用的 property 从指定的属性中移除。</td>
  </tr>
</table>

当属性中的 property 名称是不允许使用的名称时，就会出现此错误。
在这种情况下，“property”一词指的是属性中的结构化键/值数据。
例如，在
`<meta name="viewport content="width=device-width;minimum-scale=1">` 中，
`width` 和 `minimum-scale` 是 property 名称。

以下情况会导致 DISALLOWED_PROPERTY_IN_ATTR_VALUE 错误：

`<meta name="viewport content="width=device-width;invalidfoo=1">`

再看一个例子，
以下情况也会导致错误：

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

应该是：`<meta http-equiv="X-UA-Compatible" content="ie=edge">`。

### property 值无效

<table>
   <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>更正无效的 property 值。</td>
  </tr>
</table>

当属性内的 property 值无效时，就会出现这种错误。
在这种情况下，“property”一词指的是属性中的结构化键/值数据。
例如，在
`<meta name="viewport content="width=device-width;minimum-scale=1">` 中，
`device-width` 和 `1` 是 property 值。

以下情况会导致 INVALID_PROPERTY_VALUE_IN_ATTR_VALUE 错误：

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

请注意，如果您尝试输出无值的属性（例如，[`amp-video`](../../../../documentation/components/reference/amp-video.md) 组件的 `autoplay`、`controls` 或 `loop` 等属性），但 HTML 构建流程却生成一个默认（但无效的）值，如 `true`（例如，React 将[默认](https://reactjs.org/docs/jsx-in-depth.html#props-default-to-true)生成 `<amp-video autoplay="true" ...>`），解决方法是将属性名称作为值来输出。例如，`<amp-video autoplay="autoplay" ...>`。

### 缺少网址

<table>
  <tr>
    <td class="col-thirty"><strong>代码</strong></td>
    <td>MISSING_URL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>格式</strong></td>
    <td>"Missing URL for attribute '%1' in tag '%2'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>更正</strong></td>
    <td>添加有效的网址。</td>
  </tr>
</table>

当需要网址的属性缺少网址时（例如，`href` 或 `src` 属性为空），
就会出现这种错误。

### 网址无效

<table>
  <tr>
    <td class="col-thirty"><strong>代码</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>格式</strong></td>
    <td>"Malformed URL '%3' for attribute '%1' in tag '%2'"</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>更正</strong></td>
    <td>更正已损坏的网址。</td>
  </tr>
</table>

当属性中包含网址，而该网址无效时，
就会出现这种错误。

### 网址协议无效

<table>
  <tr>
    <td class="col-thirty"><strong>代码</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>格式</strong></td>
    <td>Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>更正</strong></td>
    <td>改为有效协议，例如，`http` 可能需要改为 `https`。</td>
  </tr>
</table>

当标记中包含必须设为特定协议的 `href` 或 `src` 时，
就会出现这种错误。
例如，许多标记需要 `https`。

### 属性中缺少必需的 property

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The property '%1' is missing from attribute '%2' in tag '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>添加缺少的 property。</td>
  </tr>
</table>

目前，当缺少下列必需的 property 时，就会出现这种错误：

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

它们指的是预期标记：

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### 互斥属性

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>MUTUALLY_EXCLUSIVE_ATTRS</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>移除其中一项互斥属性。</td>
  </tr>
</table>

当标记中包含两个互斥属性时，就会出现这种错误。
例如，下列标记只能包含两个属性中的一个：

* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md)：`src` 或 `srcdoc`
* [`amp-jwplayer`](../../../../documentation/components/reference/amp-jwplayer.md)：`data-media-id` 或 `data-playlist-id`

### 列表中缺少必需的属性

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>MANDATORY_ONEOF_ATTR_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The tag '%1' is missing a mandatory attribute - pick one of %2." </td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>添加缺少的必需属性（从提供的属性选项中进行选择）。</td>
  </tr>
</table>

当有多个属性选项的标记缺少一个必需属性时，
就会出现这种错误。
例如，下列标记必须包含两个可选属性中的一个：

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md)：`data-tweetid` 或 `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md)：`data-shortcode` 或 `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md)：`src` 或 `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md)：`src` 或 `data-videoid`

### 父级标记不正确

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>WRONG_PARENT_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The parent tag of tag '%1' is '%2', but it can only be '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>使相应标记成为所需父级的直接子级。</td>
  </tr>
</table>

特定标记需要只高一级的父级（而非高数级的祖级）。
下面列出了特定标记所需的父级
（标记，父级）：

* `!doctype` 需要父级标记 `root`。
* `html` 需要父级标记 `!doctype`。
* `head` 需要父级标记 `html`。
* `body` 需要父级标记 `html`。
* `link` 需要父级标记 `head`。
* `meta` 需要父级标记 `head`。
* `style amp-custom` 需要父级标记 `head`。
* `style` 需要父级标记 `boilerplate (noscript)`。
* `noscript` 需要父级标记 `head`。
* `script` 需要父级标记 `head`。
* `source` 需要媒体标记（[`amp-audio`](../../../../documentation/components/reference/amp-audio.md)、[`amp-video`](../../../../documentation/components/reference/amp-video.md) 等）。

### 不允许使用的祖级标记

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>DISALLOWED_TAG_ANCESTOR</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The tag '%1' may not appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>移除（或移动）不允许使用的嵌套标记。</td>
  </tr>
</table>

当某个标记是另一个未验证的标记的子孙级时，
就会出现这种错误。
目前，唯一的示例是 <code>template</code> 标记，
此标记不能嵌套在另一个 <code>template</code> 标记下。

### 必需的祖级标记

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>MANDATORY_TAG_ANCESTOR</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The tag '%1' may only appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>移除相应标记或使其成为特定标记的子孙级。</td>
  </tr>
</table>

必需的子孙级会在 [AMP 验证工具规范]
(https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)中
定义为 `mandatory_ancestor`。

当下列标记缺少各自的 `mandatory_ancestor`
（标记，祖级）时，就会出现这种错误：

* `img` 必须是 `noscript` 的子孙级。
* `video` 必须是 `noscript` 的子孙级。
* `audio` 必须是 `noscript` 的子孙级。
* `noscript` 必须是 `body` 的子孙级。

### 带提示的必需祖级标记

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>MANDATORY_TAG_ANCESTOR_WITH_HINT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>移除相应标记、使其成为特定标记的子孙级，或将其替换为提示的标记。</td>
  </tr>
</table>

如果在 AMP 文档中发现下列某种标记，而且该标记未正确嵌套在其必需的父级中，
就会出现这种错误：

* `img` 未嵌套在 `noscript` 父级中。
* `video` 未嵌套在 `noscript` 父级中。
* `audio` 未嵌套在 `noscript` 父级中。
* `noscript` 未嵌套在 `body` 父级中。

### 唯一标记重复

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>DUPLICATE_UNIQUE_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The tag '%1' appears more than once in the document."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>将其中一个重复的标记从 AMP 文档中移除。</td>
  </tr>
</table>

当只允许相应标记有一个实例，却发现重复的实例时，
就会出现这种错误。

下面列出了已知的所有唯一标记：

* `<doctype html>`
* `<html amp>`
* `<head>`
* `<link rel=canonical href=...>`
* `<link rel=amphtml href=...>`
* `<meta charset="utf-8">`
* `<meta viewport>`
* `<style amp-custom>`
* `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* `<body>`
* `<script src="https://cdn.ampproject.org/v0.js">`

## 样式和布局错误 <a name="style-and-layout-errors"></a>

在深入了解样式和布局错误之前，
有必要先了解一下 AMP 中
[样式](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md)和
[布局](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)的运作方式。
由于 AMP 网页是 HTML 网页，因此样式与任何 HTML 网页都非常相似。
不过，有些限制有助于确保网页能够快速加载，
而 AMP 验证工具则会强制实施这些限制。

在 AMP 网页中，布局受到的控制更多一些。
网页中显示的所有标记
都需要预定义高度和宽度，
以大幅减少呈现和滚动过程中的卡顿现象。
这并不意味着您必须手动添加这些属性。
对于特定的布局类型，
由于假设采用默认值，
因此 AMP 验证工具不会显示错误。

每个 AMP 标记都有一份 `supported_layouts` 列表，
如 [AMP 验证工具规范]
(https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)中所定义的那样。
对于不受支持的布局，验证工具会显示错误，
并会检查预定义布局的验证规则。

### 样式表过长

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>STYLESHEET_TOO_LONG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>将样式表的大小缩减到 75000 字节以下。</td>
  </tr>
</table>

当 AMP 验证工具经过衡量发现
`<style amp-custom>` 中的样式内容大小超出
上限（75000 字节）时，就会出现这种错误。

### CSS 语法错误

<table>
   <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>CSS_SYNTAX</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"CSS syntax error in tag '%1' - %2."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>更正 CSS 语法错误。</td>
  </tr>
</table>

当指定的标记中包含 CSS 语法错误时，
就会出现这种错误。
如果您不确定导致此错误的原因，
请尝试通过在线 CSS 验证工具
（例如 [csslint](http://csslint.net/)）
来运行 CSS。

### 特定规则存在 CSS 语法错误

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>CSS_SYNTAX_INVALID_AT_RULE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>更正指定的 CSS 语法错误。</td>
  </tr>
</table>

此错误指的是 CSS 中的 @-rules。
对于 CSS 中的 @-rules，AMP 仅允许少量规则
（另请参阅 [AMP 规范](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)）。
例如，不允许使用 <code>@import</code>。
验证错误消息会明确
告诉您哪个规则无效，
以便您更轻松地更正该规则。

### AMP 标记不支持隐式布局

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>IMPLIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The implied layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>为标记提供有效的布局属性。</td>
  </tr>
</table>

如果您没有为 AMP 标记指定布局，
且隐式布局（基于宽度、高度和尺寸）不受支持，就会出现这种错误。
请参阅 [AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)，
查看相应标记的 `supported_layout` 值。

实际布局行为由 `layout` 属性决定。
要详细了解布局的运作方式，
请参阅[如何控制布局](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)和
[AMP HTML 布局系统规范](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)。

**注意**：如果您没有指定布局，
并且没有添加 `width` 和 `height` 值，
则布局会默认采用 CONTAINER。
由于所有 AMP 标记都不支持 CONTAINER，
因此验证工具会显示错误。
请指定除 CONTAINER 以外的布局，
或添加 `width` 和/或 `height` 值，然后相应错误就会消失。

### 隐式布局不允许的属性

<table>
  <tr>
    <td class="col-thirty"><strong>代码</strong></td>
    <td>ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>格式</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>更正</strong></td>
    <td>将不允许使用的属性从标记中移除，
      或指定允许使用该属性的布局。</td>
  </tr>
</table>

如果您没有为 AMP 标记指定布局，
并且隐式布局包含不允许使用的属性，就会出现这种错误。
[AMP HTML 布局系统规范](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)中
说明了各种布局类型不允许使用的属性。

### AMP 标记不支持指定的布局

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>SPECIFIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The specified layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>指定标记支持的布局。</td>
  </tr>
</table>

当为标记指定的布局不受支持时，
就会出现这种错误。
请参阅 [AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)，
查看相应标记的 `supported_layout` 值。

实际布局行为由 `layout` 属性决定。
要详细了解布局的运作方式，
请参阅[如何控制布局](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)和
[AMP HTML 布局系统规范](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)。

### 指定的布局不允许的属性

<table>
  <tr>
    <td class="col-thirty"><strong>代码</strong></td>
    <td>ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>格式</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>更正</strong></td>
    <td>将不允许使用的属性从标记中移除，
      或指定允许使用该属性的布局。</td>
  </tr>
</table>

当您为 AMP 标记指定的布局中包含不允许使用的属性时，
就会出现这种错误。
[AMP HTML 布局系统规范](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)中
说明了各种布局类型不允许使用的属性。

### 布局所需属性的值无效

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>ATTR_VALUE_REQUIRED_BY_LAYOUT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>将属性设为指定的值。</td>
  </tr>
</table>

当指定布局的属性值无效时，就会出现这种错误。
要了解触发此错误的原因，
您需要熟悉
[不同的布局行为](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute)。

假设您将布局设为 `fixed-height`，
并同时为 `height` 和 `width` 添加了数字值。
`fixed-height` 布局将使用 `height` 值。
`width` 属性要么不存在，要么必须设为 `auto`。
验证工具会显示 ATTR_VALUE_REQUIRED_BY_LAYOUT。

### 宽度和高度的单位不一致

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>提供单位一致的宽度和高度。</td>
  </tr>
</table>

除 `layout=fixed` 之外，
宽度和高度属性必须使用相同的单位表示。
如果单位不一致，就会触发此错误。

例如，`<amp-img src="" layout="responsive" width="42px" height="42rem">`
会触发以下错误消息：

“标记‘[`amp-img`](../../../../documentation/components/reference/amp-img.md) 中的宽度和高度单位不一致 - 宽度单位指定‘px’，而高度单位却指定为‘rem’。”

## 模板错误

AMP 网页不能包含模板语法，
除非该语法位于专为包含模板
而设计的 AMP 标记中，例如
[`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md)。

您的源文件中可以包含模板，
但前提是此类文件生成的输出内容中不包含模板
（另请参阅
[使用 CSS 预处理器](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md#using-css-preprocessors))）。

### 属性包含模板语法

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>TEMPLATE_IN_ATTR_NAME</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"Mustache template syntax in attribute name '%1' in tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>将 Mustache 模板语法从属性中移除。</td>
  </tr>
</table>

一旦验证工具在属性值中发现
[Mustache 模板语法](https://mustache.github.io/mustache.5.html)，
就会出现这种错误。

### 属性包含未转义的模板语法

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>UNESCAPED_TEMPLATE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>转义 Mustache 模板。</td>
  </tr>
</table>

一旦验证工具在属性值中发现
[未转义的 Mustache 模板语法] (https://mustache.github.io/mustache.5.html)，
就会出现这种错误。

### 属性包含模板 partial

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>TEMPLATE_PARTIAL_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>移除 Mustache partial。</td>
  </tr>
</table>

一旦验证工具在属性值中发现
[Mustache partial](https://mustache.github.io/mustache.5.html)，
就会出现这种错误。

## 弃用错误

### 已弃用的标记

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>DEPRECATED_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>No error message defined as yet (no deprecated tags).</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>移除已弃用的标记。</td>
  </tr>
</table>

如果在 AMP 文档中发现之前有效的 AMP 标记，就会显示此警告。
这只是一个警告；带有警告的 AMP 文档仍然有效。
目前不存在已弃用的标记；保留该警告是为了在日后遇到弃用情况时使用这种警告。

### 已弃用的属性

<table>
  <tr>
                <td class="col-thirty"><strong>代码</strong></td>
                <td>DEPRECATED_ATTR</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>格式</strong></td>
                <td>"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>更正</strong></td>
                <td>最佳做法是移除已弃用的属性。</td>
  </tr>
</table>

如果在 AMP 文档中发现之前有效的 AMP 属性，就会显示此警告。
这只是一个警告；带有警告的 AMP 文档仍然有效。

请在 [AMP 验证工具规范]
(https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)中搜索 `deprecation`
，以查看每个 AMP 标记的已弃用属性。
