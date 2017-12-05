---
$title: 使用入门
---
[TOC]

这是一份快速入门指南，旨在帮助您快速上手使用 AMP。

如需了解更详细的说明，请访问[创建您的首个 AMP 网页](/zh_cn/docs/tutorials/create.html)教程。

### 第 1 步：获取 AMP HTML 模板

以下是 AMP 网页所需的基本 HTML：

```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello AMP world</title>
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Hello AMP World!</h1>
  </body>
</html>
```

{% call callout('继续阅读', type='read') %}
详细了解 AMP 网页[必需的标记](/zh_cn/docs/reference/spec.html#required-markup)。
{% endcall %}

### 第 2 步：向网页添加组件

请通过添加组件来构建 AMP 网页，例如添加图片组件：

```html
<amp-img src="https://www.ampproject.org/examples/images/amp.jpg"
  width="900" height="508" layout="responsive"></amp-img>
```

或添加 YouTube 视频组件：

```html
<!-- this script is required for amp-youtube and must be in the <head> section  -->
<script async custom-element="amp-youtube"
      src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>

...

<amp-youtube data-videoid="9Cfxm7cikMY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
```

或添加其他所需组件。请参阅 [AMP 中的可用组件](/zh_cn/docs/reference/components.html)列表。

### 第 3 步：设计元素样式

要为 AMP 网页上的元素设计样式，请向文档的 `<head>` 中名为 `<style amp-custom>` 的内嵌样式表添加 CSS：

```html
<style amp-custom>
  amp-img {
    margin: 0.5em;
  }
  body {
    max-width: 900px;
  }
</style>
```

{% call callout('继续阅读', type='read') %}
详细了解 AMP 网页[支持的 CSS](/zh_cn/docs/guides/responsive/style_pages.html)。
{% endcall %}

### 第 4 步：验证 AMP HTML

请使用 [AMP 验证工具](https://validator.ampproject.org/)验证您的 AMP 网页，以确保您的网页是有效的 AMP HTML。

要想了解您可以使用的其他验证工具，请参阅[验证 AMP 网页](/zh_cn/docs/guides/validate.html)。

### 后续步骤

要想深入了解 AMP 网页的基本知识，请访问[创建您的首个 AMP 网页](/zh_cn/docs/tutorials/create.html)教程。

下面这些资源也有助于您打造出色的体验：

* [使您的网页可被轻松发现](/zh_cn/docs/guides/discovery.html)
* [向您的网页添加分析工具](/zh_cn/docs/guides/analytics_amp.html)
* [提高用户互动度](/zh_cn/docs/guides/engagement.html)
* [AMP BY Example](https://ampbyexample.com/) 上的在线演示
 
 
