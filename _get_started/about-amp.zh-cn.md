---
layout: page
title: 什么是 AMP？
order: 0
locale: zh-cn
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

通过 AMP 可以构建快速渲染的静态内容网页。
AMP 实例由三个不同部分组成：

{% include toc.html %}

**AMP HTML** 是为确保可靠性能而具有某些限制的 HTML，
它进行了一些扩展，可以构建超出基本 HTML 的丰富内容。
**AMP JS** 库可确保快速渲染 AMP HTML 页面。
**Google AMP Cache**（可选）提供 AMP HTML 页面。

## AMP HTML

AMP HTML 本质上是使用自定义 AMP 属性扩展的 HTML。
最简单的 AMP HTML 文件如下所示：

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

尽管 AMP HTML 页面中的大多数标记都是常规 HTML 标记，但部分 HTML 标记替换为了 AMP 特定标记（另请参阅

[AMP 规范中的 HTML 标记](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)）。
利用这些自定义元素（称为 AMP HTML 组件）
可以轻松高效地实现常见的模式。

例如，[`amp-img`](/docs/reference/amp-img.html) 标记可提供完整的 `srcset` 支持，即使在尚不支持该标记的浏览器中也是如此。

了解如何[创建您的第一个 AMP HTML 页面](/docs/get_started/create_page.html)。

## AMP JS

[AMP JS 库](https://github.com/ampproject/amphtml/tree/master/src)可实现所有 [AMP 的最佳性能做法](/docs/get_started/technical_overview.html)，

管理资源加载，并为您提供上面提到的自定义标记，
所有这些都是为了确保快速渲染您的页面。

重大优化之一就是使来自外部资源的所有内容保持异步，让页面中的任何内容都能毫无阻碍地渲染。

其他性能技术还包括：将所有 iframe 沙盒化、加载资源之前对页面上每个元素的布局进行预先计算，以及禁用性能缓慢的 CSS 选择器。

如需详细了解[优化](/docs/get_started/technical_overview.html)和相关限制，[请阅读 AMP HTML 规范](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

## Google AMP Cache

Google AMP Cache 是一种基于代理的内容交付网络，用于交付所有有效的 AMP 文档。

它可提取 AMP HTML 页面，对页面进行缓存，并自动改进页面性能。
使用 Google AMP Cache 时，文档、所有 JS 文件及所有图像都从使用
[HTTP 2.0](https://http2.github.io/) 的同一来源加载，从而可实现最高效率。


此外，Google AMP Cache 还带有内置[验证系统](https://github.com/ampproject/amphtml/tree/master/validator)，可确认页面能够正常工作，并且不依赖于外部资源。



此验证系统运行一系列断言，确认页面的标记符合 AMP HTML 规范。


另一个版本的验证器与各个 AMP 页面捆绑提供。此版本可在页面渲染时将验证错误直接记录到浏览器的控制台中，让您可以看到代码中的复杂变化可能会对性能和用户体验产生怎样的影响。



详细了解[测试 AMP HTML 页面](/docs/guides/validate.html)。
