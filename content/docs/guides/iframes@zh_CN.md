---
$title: 添加 iframe
$order: 2
$category: Develop 
components:
  - iframe
toc: true
---
[TOC]

了解如何在您的网页中显示媒体内容，以及如何使用 iframe 在 AMP 的限制之外显示高级内容。

## 基础知识

使用 [`amp-iframe`](/zh_cn/docs/reference/components/amp-iframe.html) 元素在您的网页中显示 iframe。

iframe 在 AMP 中特别有用，可显示主网页中不支持的内容，例如，需要使用用户编写的 JavaScript 代码的内容。

### `amp-iframe` 要求：

* 必须距离顶部至少 **600px** 或位于第一个视口 **75%** 下方的位置。
* 只能通过 HTTPS 请求资源，且不得与容器的来源相同，除非未指定。

{% call callout('提示', type='read') %}
有关详情，[请参阅 <code>amp-iframe</code>](/zh_cn/docs/reference/components/amp-iframe.html)
的完整规范。
{% endcall %}

### 添加脚本

要向您的网页中添加 `amp-iframe`，请先将以下脚本添加至 `<head>`，它可为扩展组件加载其他代码：

[sourcecode:html]
<script async custom-element="amp-iframe"
    src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

### 编写标记

示例 `amp-iframe`[（来自 released.amp 示例）](https://github.com/ampproject/amphtml/blob/master/examples/released.amp.html)：

[sourcecode:html]
<amp-iframe width=300 height=300
    sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=Alameda,%20CA">
</amp-iframe>
[/sourcecode]

## 示例

您可以在我们的高级演示页面[找到更多高级示例，](https://ampbyexample.com/components/amp-iframe/)嵌入为 `<amp-iframe>`，如下所示：

<amp-iframe width=300 height=300
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://ampbyexample.com/components/amp-iframe/embed">
</amp-iframe>

