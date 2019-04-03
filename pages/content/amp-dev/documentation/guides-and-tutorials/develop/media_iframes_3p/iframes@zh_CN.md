---
$title: 添加 iframe
---

了解如何在您的网页中显示媒体内容，以及如何使用 iframe 在 AMP 的限制之外显示高级内容。

## 基础知识

使用 [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) 元素在您的网页中显示 iframe。

iframe 在 AMP 中特别有用，可显示主网页中不支持的内容，例如，需要使用用户编写的 JavaScript 代码的内容。

### [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) 要求：

* 必须距离顶部至少 **600px** 或位于第一个视口 **75%** 下方的位置。
* 只能通过 HTTPS 请求资源，且不得与容器的来源相同，除非未指定。

阅读: 有关详情，[请参阅 `amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) 的完整规范。

### 添加脚本

要向您的网页中添加 [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}})，请先将以下脚本添加至 `<head>`，它可为扩展组件加载其他代码：

[sourcecode:html]
<script async custom-element="amp-iframe"
    src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

### 编写标记

示例 `amp-iframe`：

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe">
</amp-iframe>
```

## 使用占位符

您可以在文档顶部展示 [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) ，前提是 [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) 包含具有 `placeholder` 属性的元素（例如 [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) 元素）。在 iframe 准备就绪，可以进行展示之前，该元素会以占位符的形式呈现。

阅读: 要详细了解占位符，请参阅[包含占位符的 Iframe]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}#iframe-with-placeholder)。

包含占位符的示例：

```html
<amp-iframe width="400" height="225"
sandbox="allow-scripts allow-same-origin"
layout="responsive"
src="https://giphy.com/embed/OWabwoEn7ezug">
<amp-img placeholder layout="fill"
src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img>
</amp-iframe>
```
呈现为：

<amp-iframe width="400" height="225"
sandbox="allow-scripts allow-same-origin"
layout="responsive"
src="https://giphy.com/embed/OWabwoEn7ezug">
<amp-img placeholder layout="fill"
src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img>
</amp-iframe>

## 示例

您可以在我们的高级演示页面[找到更多高级示例，]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-iframe.html', locale=doc.locale).url.path}}).
