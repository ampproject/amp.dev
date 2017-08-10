---
$title: AMP 验证错误
---


有效的 AMP 文档不得存在任何验证错误。本文档旨在协助您更好地了解并更正在[验证 AMP 网页](/zh_cn/docs/guides/validate.html)时遇到的各种验证错误。有关验证错误的完整概览，请参阅 [AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)。

[TOC]

## AMP HTML 标记和属性错误

### 缺少必需的标记

<table>
   <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The mandatory tag '%1' is missing or incorrect."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>添加（或更正）必需的 HTML 标记。</td>
  </tr>
</table>

所有 AMP 文档中都必须包含以下标记：

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`

在 [AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)中，这些必需的标记包含 `mandatory: true` 字段；[AMP 规范](/docs/reference/spec.html)中也提到了这些标记。

### 缺少其他标记必需的标记

<table>
   <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">TAG_REQUIRED_BY_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The '%1' tag is missing or incorrect, but required by '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>添加（或更正）必需的 HTML 标记。</td>
  </tr>
</table>

如果验证工具在 AMP 文档中发现扩展组件，但未发现对应的 `<script>`，则会显示 `TAG_REQUIRED_BY_MISSING` 错误。

[扩展组件](/docs/reference/extended.html)必须作为自定义元素明确包含在 AMP 文档中。要更正此类错误，请转到扩展组件的参考页面，然后将必需的脚本复制并粘贴到 AMP 文档 `<head>` 中。

### 禁止使用的标记

<table>
   <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">DISALLOWED_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The tag '%1' is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>移除禁止使用的标记。</td>
  </tr>
</table>

标记已列入白名单，因此不存在包含所有禁止使用的标记的明确列表；不过，[AMP 规范](/docs/reference/spec.html)粗略地定义了一组禁止使用的标记。

### 缺少必需的属性

<table>
   <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">MANDATORY_ATTR_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The mandatory attribute '%1' is missing in tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>为标记添加必需的属性。</td>
  </tr>
</table>

[AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)中定义了 AMP 标记必需的属性。只需搜索相应标记，查看列出的属性，然后查看是否存在 `mandatory: true` 即可。每个 AMP 标记的规范中也列出了相应标记必需的属性。

### 属性值无效

<table>
   <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">INVALID_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>将属性值更正为有效的值。</td>
  </tr>
</table>

如果存在此错误，则表示某个 HTML 标记具有名称有效但值无效的属性。例如，触发此错误的一个常见原因是网址的值无效。所有网址值（`href` 和 `src` 属性中）都必须与一个[可能的属性值](http://www.w3schools.com/tags/att_a_href.asp)匹配。

<strong>重要提示</strong>：AMP 中的许多网址值都需要包含 HTTPS。如果您遇到此错误，但不确定是什么原因导致的，请查阅相关 AMP 标记的规范，看看相应属性是否需要包含 HTTPS。

### 禁止使用的属性

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">DISALLOWED_ATTR</span></td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The attribute '%1' may not appear in tag '%2'."</span></td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>将相应属性从 HTML 标记中移除。</td>
  </tr>
</table>

属性已列入白名单，因此不存在包含所有禁止使用的属性的明确列表。要查看每个特定标记支持的属性，请在 [AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)中搜索 HTML 标记，然后搜索 `attrs`。

除了白名单中列出的每个标记专用的属性以外，所有 AMP 标记还可以使用 `$GLOBAL_ATTRS` 下已列入白名单的任何属性；前缀为 `"data-"` 的所有属性也都已列入白名单。

### 必需的文字缺失或不正确

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">MANDATORY_CDATA_MISSING_OR_INCORRECT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>在标记中添加或更正必需的文字。</td>
  </tr>
</table>

CDATA 是开始和结束 HTML 标记之间的内容数据，目前同时通过白名单和黑名单进行评估。带有必需 CDATA 的标记包括：

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

以及：

[sourcecode:html]
<style amp-custom>
[/sourcecode]

此错误的详细消息可能是下列之一：

* “必需的样式样板（启用了 JS）”
* “必需的样式样板 (noscript)”
* “禁止使用的 -amp- CSS 类名称前缀”
* “CSS 中存在禁止使用的 !important 属性”
* “CSS 中存在禁止使用的 @charset”
* “CSS 中存在禁止使用的 @import”
* “CSS 中存在禁止使用的 @namespace”
* “CSS 中存在禁止使用的 @supports”
* “CSS 中存在禁止使用的 @document”
* “CSS 中存在禁止使用的 @page”
* “CSS 中存在禁止使用的 @viewport”

### 标记中存在禁止使用的文字

<table>
   <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">CDATA_VIOLATES_BLACKLIST</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>移除禁止使用的文字。</td>
  </tr>
</table>

特定 CSS 数据已列入黑名单，以便验证基本的 CSS AMP 规则。

下面列出了已列入黑名单的 CSS 数据（另请参阅 [AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)中的 `blacklisted_cdata_regex`）：

* `"\\.i?-amp-"`（“CSS -amp- 类名称前缀”）
* `"!important"`
* `"charset"`
* `"@import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### 标记内的属性中存在禁止使用的特性

<table>
   <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">DISALLOWED_PROPERTY_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The property '%1' in attribute '%2' in tag '%3' is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>将禁止使用的特性从指定属性中移除。</td>
  </tr>
</table>

当属性中的特性名称是禁止使用的名称时，就会显示此错误。在这种情况下，特性一词指的是属性中的结构化键/值数据。例如，在 `<meta name="viewport content="width=device-width;minimum-scale=1">` 中，`width` 和 `minimum-scale` 是特性名称。

以下情况会导致 DISALLOWED_PROPERTY_IN_ATTR_VALUE 错误：

`<meta name="viewport content="width=device-width;invalidfoo=1">`

再比如说，以下情况也会导致错误：

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

应该是：`<meta http-equiv="X-UA-Compatible" content="ie=edge">`。

### 特性值无效

<table>
   <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>更正无效的特性值。</td>
  </tr>
</table>

当属性内的特性值无效时，就会显示此错误。在这种情况下，特性一词指的是属性中的结构化键/值数据。例如，在 `<meta name="viewport content="width=device-width;minimum-scale=1">` 中，`device-width` 和 `1` 是特性值。

以下情况会导致 INVALID_PROPERTY_VALUE_IN_ATTR_VALUE 错误：

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

再比如说，以下情况也会导致错误：

`<meta http-equiv="X-UA-Compatible" content="ie=invalidfoo">`

应该是：`<meta http-equiv="X-UA-Compatible" content="ie=edge">`

### 缺少网址

<table>
  <tr>
    <td class="col-thirty"><strong>代码</strong></td>
    <td><span class="notranslate">MISSING_URL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>格式</strong></td>
    <td><span class="notranslate">"Missing URL for attribute '%1' in tag '%2'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>更正方法</strong></td>
    <td>添加有效网址。</td>
  </tr>
</table>

当需要网址的属性缺少网址时，就会显示此错误。例如，`href` 或 `src` 属性为空。

### 网址无效

<table>
  <tr>
    <td class="col-thirty"><strong>代码</strong></td>
    <td><span class="notranslate">INVALID_URL_PROTOCOL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>格式</strong></td>
    <td><span class="notranslate">"Malformed URL '%3' for attribute '%1' in tag '%2'"</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>更正方法</strong></td>
    <td>更正已损坏的网址。</td>
  </tr>
</table>

当属性中包含网址，而该网址无效时，就会显示此错误。

### 网址协议无效

<table>
  <tr>
    <td class="col-thirty"><strong>代码</strong></td>
    <td><span class="notranslate">INVALID_URL_PROTOCOL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>格式</strong></td>
    <td><span class="notranslate">Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>更正方法</strong></td>
    <td>改为有效协议，例如，`http` 可能需要改为 `https`。</td>
  </tr>
</table>

当标记中包含必须设为特定协议的 `href` 或 `src` 时，就会显示此错误。例如，许多标记需要 `https`。

### 属性中缺少必需的特性

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The property '%1' is missing from attribute '%2' in tag '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>添加缺少的特性。</td>
  </tr>
</table>

目前，当缺少下列必需的特性时，就会显示此错误：

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
  	<td><span class="notranslate">MUTUALLY_EXCLUSIVE_ATTRS</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>移除一个互斥的属性。</td>
  </tr>
</table>

当标记中包含互斥属性时，就会显示此错误。例如，下列标记只能包含两个属性中的一个：

* [amp-twitter](/docs/reference/components/amp-twitter.html)：`data-tweetid` 或 `src`
* [amp-instagram](/docs/reference/components/amp-instagram.html)：`data-shortcode` 或 `src`
* [amp-iframe](/docs/reference/components/amp-iframe.html)：`src` 或 `srcdoc`
* [amp-youtube](/docs/reference/components/amp-youtube.html)：`src` 或 `data-videoid`

### 列表中缺少必需的属性

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">MANDATORY_ONEOF_ATTR_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The tag '%1' is missing a mandatory attribute - pick one of %2." </span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>从提供的属性选项中进行选择，添加缺少的必需属性。</td>
  </tr>
</table>

当有多个属性选项的标记缺少一个必需属性时，就会显示此错误。例如，下列标记必须包含两个可选属性中的一个：

* [amp-twitter](/docs/reference/components/amp-twitter.html)：`data-tweetid` 或 `src`
* [amp-instagram](/docs/reference/components/amp-instagram.html)：`data-shortcode` 或 `src`
* [amp-iframe](/docs/reference/components/amp-iframe.html)：`src` 或 `srcdoc`
* [amp-youtube](/docs/reference/components/amp-youtube.html)：`src` 或 `data-videoid`

### 父级标记不正确

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">WRONG_PARENT_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The parent tag of tag '%1' is '%2', but it can only be '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>使相应标记成为所需父级的直接子级。</td>
  </tr>
</table>

特定标记需要直接父级（而非距离较远的上级）。下面列出了特定标记所需的父级（标记，父级）：

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
* `source` 需要媒体标记（`amp-audio`、`amp-video` 等）。

### 禁止使用的标记上级

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">DISALLOWED_TAG_ANCESTOR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The tag '%1' may not appear as a descendant of tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>移除（或移动）禁止使用的嵌套标记。</td>
  </tr>
</table>

当某个标记是其他未验证标记的子级时，就会显示此错误。目前，唯一的示例是 `template` 标记，此标记不可嵌套在其他 `template` 标记下。

### 必需的标记上级

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_ANCESTOR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The tag '%1' may only appear as a descendant of tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>移除相应标记或使其成为特定标记的子级。</td>
  </tr>
</table>

[AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)中将必需的子级定义为 `mandatory_ancestor`。

当下列标记缺少各自的 `mandatory_ancestor`（标记，上级）时，就会显示此错误：

* `img` 必须是 `noscript` 的子级。
* `video` 必须是 `noscript` 的子级。
* `audio` 必须是 `noscript` 的子级。
* `noscript` 必须是 `body` 的子级。

### 带提示的必需标记上级

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_ANCESTOR_WITH_HINT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>移除相应标记、使其成为特定标记的子级，或将其替换为提示的标记。</td>
  </tr>
</table>

如果在 AMP 文档中发现下列任一标记，而且该标记未正确嵌套在必需的父级中，就会显示此错误：

* `img` 未嵌套在 `noscript` 父级中。
* `video` 未嵌套在 `noscript` 父级中。
* `audio` 未嵌套在 `noscript` 父级中。
* `noscript` 未嵌套在 `body` 父级中。

### 唯一标记重复

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">DUPLICATE_UNIQUE_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The tag '%1' appears more than once in the document."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>将其中一个重复的标记从 AMP 文档中移除。</td>
  </tr>
</table>

当只允许相应标记有一个实例，却发现重复的实例时，就会显示此错误。

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

## 样式和布局错误

在深入了解样式和布局错误之前，有必要先了解一下 AMP 中[样式](/zh_cn/docs/guides/responsive/style_pages.html)和[布局](/zh_cn/docs/guides/responsive/control_layout.html)的运作方式。由于 AMP 网页是 HTML 网页，因此样式与任何 HTML 网页都非常相似。不过，有些限制有助于确保网页能够快速加载，而 AMP 验证工具强制实施这些限制。

在 AMP 网页中，布局受到的控制更多一些。网页中显示的所有标记都需要预定义高度和宽度，以大幅减少呈现和滚动过程中的卡顿现象。这并不意味着您必须手动添加这些属性。对于特定的布局类型，由于假设采用默认值，因此 AMP 验证工具不会显示错误。

每个 AMP 标记都有一份 `supported_layouts` 列表，如 [AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)中所定义的那样。对于不受支持的布局，验证工具会显示错误，并会检查预定义布局的验证规则。

### 样式表过长

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">STYLESHEET_TOO_LONG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>将样式表的大小缩减到 50000 字节以下。</td>
  </tr>
</table>

当 AMP 验证工具经过衡量发现 `<style amp-custom>` 中的样式内容超出上限（50000 字节）时，就会显示此错误。

### CSS 语法错误

<table>
   <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">CSS_SYNTAX</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"CSS syntax error in tag '%1' - %2."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>更正 CSS 语法错误。</td>
  </tr>
</table>

当指定的标记中包含 CSS 语法错误时，就会显示此错误。如果您不确定导致此错误的原因，请尝试通过在线 CSS 验证工具（如 [csslint](http://csslint.net/)）运行 CSS。

### 特定规则存在 CSS 语法错误

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">CSS_SYNTAX_INVALID_AT_RULE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>更正指定的 CSS 语法错误。</td>
  </tr>
</table>

此错误指的是 CSS 中的 @-rules。对于 CSS 中的 @-rules，AMP 仅允许少量规则（另请参阅 [AMP 规范](/docs/reference/spec.html)）。例如，`@import` 是不被允许的。验证错误消息会明确告诉您该规则是无效的，以便您更轻松地更正该规则。

### AMP 标记不支持隐式布局

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">IMPLIED_LAYOUT_INVALID</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The implied layout '%1' is not supported by tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>为标记提供有效的布局属性。</td>
  </tr>
</table>

如果您没有为 AMP 标记指定布局，并且隐式布局（基于宽度、高度和尺寸）不受支持，就会显示此错误。请参阅 [AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)，查看相应标记的 `supported_layout` 值。

实际布局行为由 `layout` 属性决定。如需详细了解布局的运作方式，请参阅[如何控制布局](/zh_cn/docs/guides/responsive/control_layout.html)以及 [AMP HTML 布局系统规范](/docs/reference/spec/amp-html-layout.html)。

**注意**：如果您没有指定布局，并且没有添加 `width` 和 `height` 值，则布局会默认采用 CONTAINER。由于所有 AMP 标记都不支持 CONTAINER，因此验证工具会显示错误。请指定除 CONTAINER 以外的布局，或添加 `width` 和/或 `height` 值，然后相应错误就会消失。

### 隐式布局不能使用的属性

<table>
  <tr>
    <td class="col-thirty"><strong>代码</strong></td>
    <td><span class="notranslate">ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>格式</strong></td>
    <td><span class="notranslate">"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>更正方法</strong></td>
    <td>将禁止使用的属性从标记中移除，或指定允许使用该属性的布局。</td>
  </tr>
</table>

如果您没有为 AMP 标记指定布局，并且隐式布局包含禁止使用的属性，就会显示此错误。[AMP HTML 布局系统规范](/docs/reference/spec/amp-html-layout.html)中说明了各种布局类型不能使用的属性。

### AMP 标记不支持指定的布局

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">SPECIFIED_LAYOUT_INVALID</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The specified layout '%1' is not supported by tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>指定标记支持的布局。</td>
  </tr>
</table>

为标记指定的布局不受支持时，就会显示此错误。请参阅 [AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)，查看相应标记的 `supported_layout` 值。

实际布局行为由 `layout` 属性决定。如需详细了解布局的运作方式，请参阅[如何控制布局](/zh_cn/docs/guides/responsive/control_layout.html)以及 [AMP HTML 布局系统规范](/docs/reference/spec/amp-html-layout.html)。

### 指定的布局不能使用的属性

<table>
  <tr>
    <td class="col-thirty"><strong>代码</strong></td>
    <td><span class="notranslate">ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>格式</strong></td>
    <td><span class="notranslate">"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>更正方法</strong></td>
    <td>将禁止使用的属性从标记中移除，或指定允许使用该属性的布局。</td>
  </tr>
</table>

当您为 AMP 标记指定的布局中包含禁止使用的属性时，就会显示此错误。[AMP HTML 布局系统规范](/docs/reference/spec/amp-html-layout.html)中说明了各种布局类型不能使用的属性。

### 布局需要的属性具有无效的值

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">ATTR_VALUE_REQUIRED_BY_LAYOUT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>将属性设为指定的值。</td>
  </tr>
</table>

当指定布局的属性值无效时，就会显示此错误。要了解触发此错误的原因，您需要熟悉[不同的布局行为](/zh_cn/docs/guides/responsive/control_layout.html)。

假设您将布局设为 `fixed-height`，并同时为 `height` 和 `width` 添加了数字值。`fixed-height` 布局使用 `height` 值。`width` 属性要么不存在，要么必须设为 `auto`。验证工具会显示 ATTR_VALUE_REQUIRED_BY_LAYOUT。

### 宽度和高度单位不一致

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>提供单位一致的宽度和高度。</td>
  </tr>
</table>

除 `layout=fixed` 之外，宽度和高度属性必须使用相同的单位表示。如果单位不一致，就会触发此错误。

例如，`<amp-img src="" layout="responsive" width="42px" height="42rem">` 会触发以下错误消息：

“‘amp-img’标记中的宽度和高度单位不一致 - 宽度单位是‘px’，高度单位则是‘rem’。”

## 模板错误

AMP 网页不能包含模板语法，除非该语法位于专为包含模板而设计的 AMP 标记中，例如 [amp-mustache](/docs/reference/components/amp-mustache.html)。

您的源文件中可以包含模板，但前提是此类文件生成的输出内容中不包含模板（另请参阅[使用 CSS 预处理器](/zh_cn/docs/guides/responsive/style_pages.html)）。

### 属性包含模板语法

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">TEMPLATE_IN_ATTR_NAME</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"Mustache template syntax in attribute name '%1' in tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>将 Mustache 模板语法从属性中移除。</td>
  </tr>
</table>

一旦验证工具在属性值中发现 [Mustache 模板语法](https://mustache.github.io/mustache.5.html)，就会显示此错误。

### 属性包含未转义的模板语法

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">UNESCAPED_TEMPLATE_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>转义 Mustache 模板。</td>
  </tr>
</table>

一旦验证工具在属性值中发现[未转义的 Mustache 模板语法](https://mustache.github.io/mustache.5.html)，就会显示此错误。

### 属性包含模板 partial

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">TEMPLATE_PARTIAL_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>移除 Mustache partial。</td>
  </tr>
</table>

一旦验证工具在属性值中发现 [Mustache partial](https://mustache.github.io/mustache.5.html)，就会显示此错误。

## 弃用错误

### 已弃用的标记

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">DEPRECATED_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">No error message defined as yet (no deprecated tags).</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>移除已弃用的标记。</td>
  </tr>
</table>

如果在 AMP 文档中发现之前有效的 AMP 标记，就会显示此警告。这只是一个警告；带有警告的 AMP 文档仍然有效。目前不存在已弃用的标记；保留该警告是为了用于未来的弃用情况。

### 已弃用的属性

<table>
  <tr>
  	<td class="col-thirty"><strong>代码</strong></td>
  	<td><span class="notranslate">DEPRECATED_ATTR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>格式</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>更正方法</strong></td>
  	<td>最佳做法是移除已弃用的属性。</td>
  </tr>
</table>

如果在 AMP 文档中发现之前有效的 AMP 属性，就会显示此警告。这只是一个警告；带有警告的 AMP 文档仍然有效。

请在 [AMP 验证工具规范](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)中搜索 `deprecation`，以查看每个 AMP 标记的已弃用属性。
</body>
</html>
