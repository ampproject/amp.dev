---
"$title": AMP 电子邮件支持的组件
order: '3'
formats:
- email
teaser:
  text: 以下是 AMP 电子邮件中当前支持的 AMP 组件列表。这些组件分为以下几类：
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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

以下是 AMP 电子邮件中当前支持的 [AMP 组件](https://amp.dev/documentation/components/?format=email)列表。这些组件分为以下几类：

- [动态内容 ](#dynamic-content)
- [布局](#layout)
- [媒体](#media)

## 动态内容 <a name="dynamic-content"></a>

元素 | 说明
--- | ---
[`<amp-form>`](https://amp.dev/documentation/components/amp-form) | 表单元素。必须使用 action-xhr 特性代替常规的操作特性。可与 `<template type="amp-mustache">` 结合使用来呈现响应。<br><br>**注**：不允许[在提交后重定向](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission)。
[`<amp-selector>`](https://amp.dev/documentation/components/amp-selector) | 在表单中使用的多选微件。
[`amp-bind`](https://amp.dev/documentation/components/amp-bind) 和 [`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | AMP 中的简单脚本语言，可用于操控状态机以进行元素之间的交互。也可以用于添加某些事件的行为。<br><br>**注**：禁止绑定到 `[href]` 或 `[src]`。也禁止使用 `AMP.print`、`AMP.navigateTo` 和 `AMP.goBack` 操作。
[`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification) | `<amp-state>`用于定义 `amp-bind` 所使用的初始状态。<br><br>**注**：目前尚不支持 `src` 特性。
[`<amp-list>`](https://amp.dev/documentation/components/amp-list) | 远程获取将由 [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache) 呈现的 JSON 数据。<br><br>**注**：不允许绑定到 `[src]` 特性。也禁止使用 `credentials="include"` 来包含用户凭证。
[`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache) | Mustache 模板标记，用于呈现 `amp-list` 调用的结果。

## 布局 <a name="layout"></a>

元素 | 说明
--- | ---
[布局属性 ](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | 布局行为由布局特性确定。
[`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) | 一个有助于显示/隐藏不同部分的界面元素。
[`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) | 轮播界面组件。
[`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text) | 用于在特定区域内适配文本的辅助组件。
[`<amp-layout>`](https://amp.dev/documentation/components/amp-layout) | 可以具有基于宽高比的响应式布局的容器。
[`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar) | 用于导航目的的边栏。
[`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago) | 提供了一种方便的时间戳呈现方法。

## 媒体 <a name="media"></a>

元素 | 说明
--- | ---
[`<amp-img>`](https://amp.dev/documentation/components/amp-img) | 代替 `<img>` 的 AMP 组件。<br><br>**注**：不允许绑定到 `[src]`。
[`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | 嵌入 GIF 文件。<br><br>**注**：不允许绑定到 `[src]`。
