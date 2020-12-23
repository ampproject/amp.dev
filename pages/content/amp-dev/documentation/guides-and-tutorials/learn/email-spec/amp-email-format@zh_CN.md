---
"$title": AMP 电子邮件格式
order: '1'
formats:
- email
teaser:
  text: '所需标记 '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-format.md.
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

AMP 是一项用于开发可在移动客户端上快速加载的网页的知名技术。AMP 是一组由 JavaScript 支持的 HTML 标记，可轻松实现更加注重性能和安全性的功能。[AMP 组件](https://amp.dev/documentation/components/)种类繁多，覆盖了包括轮播、响应式表单元素以及从远程端点检索新内容在内的各种功能。

AMP 电子邮件格式提供了可在电子邮件中使用的[一部分 AMP 组件](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md)。AMP 电子邮件的收件人可以直接在电子邮件中查看 AMP 组件并与之交互。

## 所需标记

以下代码表示组成有效 AMP 电子邮件的最小标记量：

[sourcecode:html]
<!DOCTYPE html>
<html ⚡4email>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

AMP 电子邮件必须

- <a name="dctp"></a>以 `<!doctype html>` 文档类型开头。[🔗](#dctp)
- <a name="ampd"></a>包含顶级 `<html ⚡4email>` 标记（也接受 `<html amp4email>`）。[🔗](#ampd)
- <a name="crps"></a>包含 `<head>` 和 `<body>` 标记（它们在 HTML 中为可选标记）。[🔗](#crps)
- <a name="chrs"></a>包含 `<meta charset="utf-8">` 标记，作为其 head 标记的第一个子项。[🔗](#chrs)
- <a name="scrpt"></a>在其 head 标记内包含 `<script async src="https://cdn.ampproject.org/v0.js"></script>`。[🔗](#scrpt)
- <a name="boilerplate"></a>在其 head 标记内包含 amp4email 样板 (`<style amp4email-boilerplate>body{visibility:hidden}</style>`) 以在 AMP JS 加载完成前隐藏内容。[🔗](#boilerplate)

整个 AMPHTML 标记不得超过 200,000 个字节。

## 结构和渲染 <a name="structure-and-rendering"></a>

AMP 电子邮件依赖于标准 `multipart/alternative` [MIME](https://en.wikipedia.org/wiki/MIME) 子类型，如 [RFC 1521 第 7.2.3 节](https://tools.ietf.org/html/rfc1521#section-7.2.3)所定义。

*如需了解详细信息，请参阅 [AMP 电子邮件结构和渲染](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-structure.md)。*

## 支持的 AMP 组件 <a name="supported-amp-components"></a>

*请参阅 [AMP 电子邮件支持的组件](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md)。*

## HTML 要求 <a name="html-requirements"></a>

*请参阅 [AMP 电子邮件支持的 HTML](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-html.md)。*

## CSS 要求 <a name="css-requirements"></a>

### 支持的选择器和属性 <a name="supported-selectors-and-properties"></a>

*请参阅 [AMP 电子邮件支持的 CSS](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-css.md)。*

### 在 AMP 文档中指定 CSS <a name="specifying-css-in-an-amp-document"></a>

任何 AMP 文档中的所有 CSS 都必须包含在标题内的 `<style amp-custom>` 标记中或作为内嵌 `style` 特性。

[sourcecode:html]
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
  amp-img.grey-placeholder {
    background-color: grey;
  }
</style>
...
</head>
[/sourcecode]

注：整个 `<style>` 标记不能超过 50,000 个字节。验证器将对此进行检查。

## 文档尺寸 <a name="document-dimensions"></a>

- **最佳宽度**：800 像素或更低（在某些客户端上，任何更宽部分和内容均可能会被意外截断）。

- **高度**：变量，客户端支持用户滚动浏览内容。

## 验证 <a name="validation"></a>

为确保您的电子邮件符合 AMP 电子邮件格式的严格标准，您可以使用 AMP 现有的验证工具。

请参阅[验证 AMP 电子邮件](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/)了解详细信息。

## 隐私与安全性 <a name="privacy-and-security"></a>

### 跟踪电子邮件打开状态和交互 <a name="tracking-email-opens-and-interaction"></a>

AMPHTML 支持使用像素跟踪技术跟踪电子邮件打开状态，与常规 HTML 电子邮件相同。用户发起外部服务数据请求也将指示用户正在与邮件交互。电子邮件客户端可能会为用户提供停用加载远程图片和其他外部请求的功能。

### AMP 特定的分析 <a name="amp-specific-analytics"></a>

不支持以下 AMP 特定的分析技术：

- [AMP `CLIENT_ID`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [变量替换 ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### 组件特定的考虑事项 <a name="component-specific-considerations"></a>

[`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) 或 [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) 内的图片请求可使发件人获知用户正在与邮件交互。

运行时不允许 [`<amp-form>`](https://amp.dev/documentation/components/amp-form) 中的重定向。

## 反馈与支持 <a name="feedback--support"></a>

如需获得 AMP 电子邮件方面的支持以及提供相关反馈，请使用以下渠道：[持续参与](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#ongoing-participation)
