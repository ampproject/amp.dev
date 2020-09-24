---
$category@: presentation
formats:
  - websites
teaser:
  text: '用省略号截断文本，可以选择显示一个溢出元素。'
---


<!--
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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



使用省略号截断容器内的文本。

## 行为

用省略号截断文本，有溢出时可以选择显示一个溢出元素。溢出元素始终位于内容的末尾，并且必须是的直接子元素    `<amp-truncate-text>`。

## Children

<table>
  <tr>
    <td width="40%"><strong>slot="collapsed"</strong></td>
    <td>可选元素显示元素何时被截断的文本。单击此将展开元素。这必须是的直接子级<code>amp-truncate-text</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>slot="expanded"</strong></td>
    <td>可选元素，显示元素何时展开。单击此选项将在展开前将元素折叠为相同大小。这必须是的直接子级 <code>amp-truncate-text</code>。</td>
  </tr>
  <tr>
    <td width="40%"><strong>slot="persistent"</strong></td>
    <td>无论文本是否被截断，始终都会显示一个可选元素。这必须是的直接子级 <code>amp-truncate-text</code>.</td>
  </tr>
</table>

## 用法

[sourcecode:html]
<amp-truncate-text layout="fixed" height="3em" width="20em">
  Some text that may get truncated.
  <button slot="collapsed">See more</button>
  <button slot="expanded">See less</button>
</amp-truncate-text>
[/sourcecode]

## 自定义行为

如果不想在适当的位置展开，可以使用 `slot="persistent"` 执行自定义操作，比如导航到另一个带有附加信息的页面。当内容太多而无法进行内联扩展时，这将非常有用。

[sourcecode:html]
<amp-truncate-text layout="fixed-height" height="3em">
  Some text that may get truncated.
  <a href="some/url" slot="persistent">See more</a>
</amp-truncate-text>
[/sourcecode]

您还可以通过使用锚标记或点击操作来使用 `slot="collapsed"` 来定制元素的操作。注意，如果文本匹配，这将不会显示。例如:

[sourcecode:html]
<amp-truncate-text layout="fixed-height" height="3em">
  Some text that may get truncated.
  <a href="some/url" slot="collapsed">See more</a>
</amp-truncate-text>
[/sourcecode]

默认情况下，在具有 `slot="expanded"` 的元素中单击将折叠内容。就像 `slot="collapsed"` 一样，使用锚点标签或点击动作将允许您重写行为来做其他事情，比如链接到另一个页面。

[sourcecode:html]
<amp-truncate-text layout="fixed-height" height="3em">
  Some text that may get truncated.
  <button slot="collapsed">See more</button>
  <a href="some/url" slot="expanded">See even more</a>
</amp-truncate-text>
[/sourcecode]

## Validation

请参阅 AMP 验证工具规范中的 [amp-truncate-text 规则](https://github.com/ampproject/amphtml/blob/master/extensions/amp-truncate-text/validator-amp-truncate-text.protoascii) 。