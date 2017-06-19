---
$title: 支持的 CSS
---


与所有网页一样，AMP 网页使用 CSS 设置样式，但是您不能引用外部样式表（[自定义字体](#自定义字体例外情况)除外）。另外，出于性能方面的考虑，不得使用某些样式，也不得使用内嵌样式属性。

所有样式都必须位于文档的标头中（请参阅[向网页添加样式](/zh_cn/docs/guides/debug/validate.html)一文）。不过，您可以使用 CSS 预处理器和模板构建静态网页，从而更好地管理内容。

**注意**：AMP 组件随附默认样式，使您能够以相当轻松的方式制作自适应网页。此类样式在 [`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css) 中定义。

[TOC]

## 使用 CSS 预处理器

就像在其他任何网页中一样，预处理器生成的输出内容能够在 AMP 中正常呈现。例如，[ampproject.org](https://www.ampproject.org/) 网站使用 [Sass](http://sass-lang.com/)。（我们使用 <a href="http://grow.io/"><span class="notranslate">Grow</span></a> 构建静态 AMP 网页，这些网页构成了 [ampproject.org](https://www.ampproject.org/) 网站。）

在使用预处理器时，请特别注意您添加的内容；只加载网页使用的内容。例如，[head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) 包含所有必需的 AMP 标记和来自 `*.scss` 源文件的内嵌 CSS。它还包含用于 [`amp-youtube`](/docs/reference/extended/amp-youtube.html) 的自定义元素脚本以及其他内容，以便网站中的许多网页可以加入嵌入的 YouTube 视频。

[sourcecode:html] {% raw %} 
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">

  <title>Accelerated Mobile Pages Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="https://www.ampproject.org{{doc.url.path}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %} [/sourcecode]

要了解上述内容是如何转变为特定格式的 AMP HTML，请访问 [ampproject.org](https://www.ampproject.org/)，查看任何网页的源代码。（在 Chrome 中，点击右键并选择`查看网页源代码`。）

## 禁用的样式

AMP 网页禁止使用以下样式：

<table>
 <thead>
    <tr>
      <th data-th="Banned style">禁止使用的样式</th>
      <th data-th="Description">说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">内嵌样式属性</td>
      <td data-th="Description">所有样式都必须在网页 <code>&lt;head&gt;</code> 内的 <code>&lt;style amp-custom&gt;</code> 标记中定义。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!</code>important 限定符</td>
      <td data-th="Description">禁止使用。这是启用 AMP 以强制实施其元素尺寸设定规则的必要条件。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description">禁止使用，但<a href="#自定义字体例外情况">自定义字体</a>除外。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code>（通用选择器）</td>
      <td data-th="Description">会对性能产生不利影响，可用于规避其他选择器限制。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">可用于模拟通用选择器。</td>
    </tr>
    <tr>
      <td data-th="Banned style">伪选择器、伪类和伪元素</td>
      <td data-th="Description">伪选择器、伪类和伪元素只能在包含标记名称（标记名称不得以 <code>amp-</code> 开头）的选择器中使用。
可行示例：<code>a:hover, div:last-of-type</code>
不可行示例：<code>amp-img:hover, amp-img:last-of-type</code></td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>-amp-</code> 类和 <code>i-amp-</code> 标记名称</td>
      <td data-th="Description">作者样式表中的类名称不得以字符串 <code>-amp-</code> 开头。这些类将保留为供 AMP 运行时在内部使用。由此可见，用户的样式表不得对于 <code>-amp-</code> 类和 <code>i-amp</code> 标记引用 CSS 选择器。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>behavior</code>、<code>-moz-binding</code></td>
      <td data-th="Description">出于安全方面的考虑，禁止使用这些属性。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>filter</code></td>
      <td data-th="Description">出于性能方面的考虑而被列入黑名单。</td>
    </tr>
  </tbody>
</table>

## 列入白名单的过渡和动画属性

AMP 仅允许使用能够在常见浏览器中实现 GPU 加速的过渡和动画属性。目前，AMP 项目已将 `opacity`、`transform` 和 `-vendorPrefix-transform` 列入白名单。

在以下示例中，`<property>` 必须列入白名单：

* `transition <property> (Also -vendorPrefix-transition)`
* @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

`overflow` 属性（以及 `overflow-y`、`overflow-x`）不能设为<span class="notranslate">“auto”</span>或<span class="notranslate">“scroll”</span>样式。AMP 文档中用户定义的元素均不得使用滚动条。

## 自定义字体例外情况

AMP 网页不得包含任何外部样式表（自定义字体除外）。引用自定义字体的 2 种支持的方法是：指向已列入白名单的字体提供商的链接标记；使用 `@font-face`。

只有支持仅 CSS 集成并通过 HTTPS 提供服务的字体提供商才能被列入白名单。目前，只有以下来源已列入白名单并能够通过链接标记提供字体服务：

* [https://fast.fonts.net](https://fast.fonts.net)
* [https://fonts.googleapis.com](https://fonts.googleapis.com)

指向已列入白名单的字体提供商“Google Fonts”的链接标记示例：

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

另外，您也可以使用 [`@font-face`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face)。使用 `@font-face` 添加的字体必须通过 HTTP 或 HTTPS 架构抓取。
