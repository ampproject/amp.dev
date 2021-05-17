---
$category@: media
formats:
  - websites
  - ads
  - email
teaser:
  text: '管理动画图像，通常是GIF。'
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

`amp-anim` 组件显示具有优化CPU管理的GIF动画。

`amp-anim` 组件使AMP框架可以减少在屏幕外时在动画上花费的资源。否则， `amp-anim` 的行为和 [`amp-img`](https://amp.dev/documentation/components/amp-img/)相同。你可以实现一个 [占位符](https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders/)来进一步优化 `amp-anim` 。

[sourcecode:html]
<amp-anim width="400" height="300" src="my-gif.gif">
  <amp-img placeholder width="400" height="300" src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
[/sourcecode]

## 属性

### `src`

指定GIF图像的URL。

[filter formats="email"]
在AMP电子邮件中，`src`必须指向绝对URL。 在中使用 `amp-anim` 电子邮件不允许以下属性：

- `srcset`
- `object-fit`
- `object-position`

[/filter]

[filter formats="websites, ads"]

### `srcset`

指定在不同情况下使用的图像URL。与`img`标签上的 [`srcset` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)相同。

[/filter]

### `alt`

提供用于辅助功能的替换文本字符串。与`img`标签上的 [`alt` 属性](https://www.w3schools.com/tags/att_img_alt.asp)。

### `attribution`

指示图像的归属。例如，`attribution="CC courtesy of Cats on Flicker"`.

### `width` and `height`

提供图像的显式大小。

### 常见属性

`amp-anim` 包含扩展到 AMP 组件的
[常见属性](https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes)。

## Styling

您可以直接使用CSS属性设置 `amp-img` 的样式。下面的示例设置一个灰色背景占位符：

[sourcecode:html]
<style amp-custom>
      .amp-anim {
          background-color: grey;
       }
</style>
[/sourcecode]

## 验证

请参阅 AMP 验证工具规范中的 [`amp-anim` 规则](https://github.com/ampproject/amphtml/blob/main/extensions/amp-anim/validator-amp-anim.protoascii)。