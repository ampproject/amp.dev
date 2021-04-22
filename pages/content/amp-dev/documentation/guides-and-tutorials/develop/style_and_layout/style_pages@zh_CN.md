---
$title: 支持的 CSS
---

和所有网页一样，AMP 网页也通过 CSS 来设定样式，但是您无法引用外部样式表（[自定义字体](#the-custom-fonts-exception)除外）。 此外，由于性能会受到影响，某些样式不允许使用；内嵌样式属性也不允许使用。

所有样式都必须放置在文档的标头部分（请参阅[向网页中添加样式](index.md#add-styles-to-a-page)）。 但是您可以使用 CSS 预处理器和模板来构建静态网页，以便更好地管理您的内容。

注意: AMP 组件本身具有默认的样式，使自适应网页的创建过程变得容易。 这些样式在 [`amp.css`](https://github.com/ampproject/amphtml/blob/main/css/amp.css) 中进行了定义。

## 禁止使用的样式

AMP 网页中不允许出现以下样式：

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">禁止使用的样式</th>
      <th data-th="Description">说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">内嵌样式属性</td>
      <td data-th="Description"> 所有样式都必须在网页的 <code>&lt;head&gt;</code> 部分进行定义，并位于 <code>&lt;style amp-custom&gt;</code> 标记中。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!important</code>  限定符</td>
      <td data-th="Description">禁止使用该限定符。 这是 AMP 网页能够强制实施其元素尺寸设定规则的必要条件。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description"> 禁止使用，但 <a href="#the-custom-fonts-exception">自定义字体</a>除外。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>-amp-</code> 类和 <code>i-amp-</code> 标记名称</td>
      <td data-th="Description"> 在开发者定义的样式表中，类名称不能以字符串 <code>-amp-</code> 开头。 这些类专门预留给系统在 AMP 运行时使用。此外，面向用户的样式表不能针对 <code>-amp-</code> 类和 <code>i-amp</code> 标记引用 CSS 选择器。</td>
    </tr>
  </tbody>
</table>

## 限制使用的样式

以下样式可以使用，但是在支持的值方面存在限制：

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">限制使用的样式</th>
      <th data-th="Description">说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Restricted style"><code>transition</code> 属性</td>
      <td data-th="Description"> 只能使用由 GPU 加速的属性（目前为 <code>opacity</code>、 <code>transform</code> 和 <code>-vendorPrefix-transform</code>）。</td>
    </tr>
    <tr>
      <td data-th="Restricted style"><code>@keyframes {...}</code></td>
      <td data-th="Description"> 只能使用由 GPU 加速的属性（目前为 <code>opacity</code>、 <code>transform</code> 和 <code>-vendorPrefix-transform</code>）。</td>
    </tr>
  </tbody>
</table>

## 自定义字体属于例外情况 <a name="the-custom-fonts-exception"></a>

AMP 网页不能包含外部样式表，但是自定义字体除外。

其他资料: 详细了解 [AMP 中的自定义字体](custom_fonts.md)。

## 使用 CSS 预处理器 <a name="using-css-preprocessors"></a>

预处理器生成的输出内容在 AMP 网页中的效果和在其他网页中的效果一样。例如，[amp.dev](https://amp.dev/)
网站使用 [Sass](http://sass-lang.com/)。（我们使用 [Grow](http://grow.io/) 来构建构成 [amp.dev](https://amp.dev/) 网站的静态 AMP 网页。）

在使用预处理器时，请特别注意您所包含的内容；请仅加载您的网页会使用的内容。 例如，[head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html)
包含所有必要的 AMP 标记和内嵌的 CSS（来自 `*.scss` 源文件）。 它还包含 [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) 的自定义元素脚本，以及其他内容，以便网站上的很多网页都可以包含嵌入式 YouTube 视频。

[sourcecode:html]{% raw %}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>AMP Project</title>
  <link rel="icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet">
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
{% endraw %}[/sourcecode]

要查看上述代码如何转变成带有格式的 AMP HTML，请在 [amp.dev](https://amp.dev/) 中查看任何网页的源代码。 （在 Chrome 中，点击右键并选择 `View Page Source`。）
