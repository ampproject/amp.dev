---
layout: page
title: 创建 AMP HTML 页面
order: 0
locale: zh-cn
---

以下标记是一个不错的起点或样板文件。
复制此标记，并将其保存为扩展名为 .html 的文件。

{% highlight html %}
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
{% endhighlight %}

到目前为止，正文中的内容相当简单。但页面最前面有一些可能并非立即显而易见的额外代码。让我们解构一下所需的标记。

## 所需的标记

AMP HTML 文档必须：

  - 以文档类型 `<!doctype html>` 开头
  - 包含顶级 `<html ⚡>` 标记（也接受 `<html amp>`）
  - 包含 `<head>` 和 `<body>` 标记（这些标记在 HTML 中是可选的）
  - 在其标头内包含一个 `<link rel="canonical" href="$SOME_URL" />` 标记，该标记指向 AMP HTML 文档的常规 HTML 版本，或在此类 HTML 版本不存在的情况下指向文档本身
  - 包含 `<meta charset="utf-8">` 标记作为其标头标记的第一个子项
  - 在其标头标记内包含 `<meta name="viewport" content="width=device-width,minimum-scale=1">` 标记。还建议包括 initial-scale=1
  - 包含 `<script async src="https://cdn.ampproject.org/v0.js"></script>` 标记作为其标头中的最后一个元素（这样做将会包括并加载 AMP JS 库）
  - 在其 `<head>` 标记内包含以下内容：
    `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

## 可选的元数据

除了纯粹的要求外，我们的示例还在其标头中包括了 Schema.org 定义，该定义不是对 AMP 的严格要求，但必须满足才能在某些地方（例如在 [Google 搜索新闻轮播演示（请在您的手机上尝试）](https://g.co/ampdemo)）分发内容。

如需详细了解在各类其他地方（例如 Twitter）需要的所有元数据，请[浏览我们的示例](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples)。如需具体了解 Google 搜索中的 AMP，请参阅 [AMP 头条新闻](https://developers.google.com/structured-data/carousels/top-stories)。

<hr>

好消息！这就是创建第一个 AMP 页面所需的全部内容，当然在正文中还有很多工作要做。在下一部分中，我们将介绍如何添加像图像、自定义 AMP 元素这样的基本内容，如何设置页面样式，以及如何实现响应式布局。

{% include button.html title="继续执行步骤 2" link="/docs/get_started/create/include_image.zh-cn.html" %}
