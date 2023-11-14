---
'$title': Include iframes
$order: 10
description: 了解如何在您的网页中显示媒体内容，以及如何使用 iframe 在 AMP 的限制之外显示高级内容。
formats:
  - websites
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations.

## 基础知识

您可以使用 [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) 元素在您的网页中显示 iframe。

iframe 在 AMP 中特别有用，可显示主网页中不支持的内容，例如，需要使用用户编写的 JavaScript 代码的内容。

### `amp-iframe` 要求：

- 必须距离顶部至少 **600px** 或位于第一个视口 **75%** 下方的位置（使用 [`placeholder`](#using-placeholders) 的 iframe 除外）。
- 只能通过 HTTPS 请求资源，且不得与容器的来源相同，除非未指定 allow-same-origin。

[tip type="read-on"] **延伸阅读**：要了解详情，请参阅 [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) 的完整规范。[/tip]

### 添加脚本

要向您的网页中添加 [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md)，请先将以下脚本添加至 `<head>`，它可为扩展组件加载其他代码：

[sourcecode:html]

<script async custom-element="amp-iframe"
  src="https://ampjs.org/v0/amp-iframe-0.1.js"></script>

[/sourcecode]

### 编写标记

在以下示例中，我们创建了一个自适应 [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) 来通过 [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/guide) 嵌入 Google 地图：

```html
<amp-iframe
  width="200"
  height="100"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe"
>
</amp-iframe>
```

## 使用占位符 <a name="using-placeholders"></a>

您可以在文档顶部展示 [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md)，前提是 [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) 包含具有 `placeholder` 属性的元素（例如 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 元素）。在 iframe 准备就绪，可以进行展示之前，该元素会以占位符的形式呈现。

[tip type="read-on"] **延伸阅读**：要详细了解占位符，请参阅[包含占位符的 iframe](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder)。[/tip]

包含占位符的示例：

```html
<amp-iframe
  width="400"
  height="225"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://giphy.com/embed/OWabwoEn7ezug"
>
  <amp-img
    placeholder
    layout="fill"
    src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"
  ></amp-img>
</amp-iframe>
```

呈现为：

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## 示例

您可以在 [AMP 示例](../../../../documentation/examples/documentation/amp-iframe.html)中找到更高级的 [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) 示例。
