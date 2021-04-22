---
$category@: presentation
formats:
  - websites
  - stories
  - ads
  - email
teaser:
  text: 扩大或缩小字体大小以适合给定空间内的内容。
---


<!---
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



## 用法

扩展或缩小其字体大小以适应所给空间内的内容。

`amp-fit-text` 组件使您可以管理指定区域内文本的大小和适合度。对于包含在 `amp-fit-text`元素中的内容， `amp-fit-text` 件会找到在可用空间内适合所有内容的最佳字体大小。`amp-fit-text` 的预期内容是文本或其他内联内容，但它也可以包含非内联内容。

在下面的例子中， the `<amp-fit-text>`元素被嵌套在一个300x300的蓝色 `div` 块中 (class `fixedblock`)。对于 `<amp-fit-text>` 元素，我们指定了一个 `responsive` 布局。因此，文本根据 `<amp-fit-text>` 元素的宽度和高度(200x200)提供的高宽比相应地缩放，但是文本不会超过其父元素的大小。

[example preview="inline" playground="true" imports="amp-fit-text"]

[sourcecode:html]
<div class="fixedblock">
  <amp-fit-text width="200" height="200" layout="responsive">
    Lorem ipsum dolor sit amet, has nisl nihil convenire et, vim at aeque
    inermis reprehendunt.
  </amp-fit-text>
</div>
[/sourcecode]

[/example]

下面的例子和上面的类似， 但是在这个例子中，我们指定了 `max-font-size` 为 `22`，所以文本更小，但仍然适合空间:

[example preview="inline" playground="true" imports="amp-fit-text"]

[sourcecode:html]
<div class="fixedblock">
  <amp-fit-text width="200" height="200" layout="responsive" max-font-size="22">
    Lorem ipsum dolor sit amet, has nisl nihil convenire et, vim at aeque
    inermis reprehendunt.
  </amp-fit-text>
</div>
[/sourcecode]

[/example]

### Overflowing content

如果 `amp-fit-text` 的内容溢出可用空间，即使使用指定 `min-font-size`，溢出的内容将被切断和隐藏。基于 WebKit 和基于 Blink-based 的浏览器显示省略号，表示内容溢出。

在下面的示例中，我们指定了 `min-font-size` 为 `40`，这将导致内容超过其固定块父块的大小，因此文本将被截断以适应容器。

[example preview="inline" playground="true" imports="amp-fit-text"]

[sourcecode:html]
<div class="fixedblock">
  <amp-fit-text width="200" height="200" layout="responsive" min-font-size="40">
    Lorem ipsum dolor sit amet, has nisl nihil convenire et, vim at aeque
    inermis reprehendunt.
  </amp-fit-text>
</div>
[/sourcecode]

[/example]

## 属性

### `min-font-size`

将 `amp-fit-text` 可以使用的最小字体大小指定为整数。

### `max-font-size`

将 `amp-fit-text` 可以使用的最大字体大小指定为整数。

### 常见属性

此元素包含扩展到 AMP 组件的 [常见属性](https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes)。

## Styling

您可以直接使用CSS属性设置 `amp-fit-text` 的样式。特别是，你可以使用 `text-align`、 `font-weight`、`color` 和许多其他的CSS属性， 除了
`font-size` 之外。

## 验证

请参阅 AMP 验证工具规范中的 [amp-fit-text rules](https://github.com/ampproject/amphtml/blob/main/extensions/amp-fit-text/validator-amp-fit-text.protoascii)。