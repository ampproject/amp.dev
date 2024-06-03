---
'$title': 制作 AMP HTML 网页
$order: 1
description: 使用 HTTPS：在制作 AMP 网页和内容时，强烈建议您使用 HTTPS 协议（而非 HTTP）。虽然 AMP 文档本身或者图片和字体并不需要…
author: pbakaus
contributors:
  - bpaduch
---

以下标记可充当不错的着手点或样板。请复制此标记并将其保存到扩展名为 .html 的文件中。

[sourcecode:html]

<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
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
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

到目前为止，正文中的内容非常简单易懂。但是，网页 head 中有很多额外代码可能并不容易理解。我们来详细分析下该必需标记。

[tip type="tip"] 使用 HTTPS：在制作 AMP 网页和内容时，强烈建议您使用 HTTPS 协议（而非 HTTP）。虽然 AMP 文档本身或者图片和字体并不需要使用 HTTPS，但是很多 AMP 功能（例如视频、iframe 等）都需要使用 HTTPS。为确保您的 AMP 网页能够充分利用所有 AMP 功能，请使用 HTTPS 协议。要详细了解 HTTPS，请参阅“[为什么说 HTTPS 很重要](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https)”。[/tip]

[tip type="tip"] 使用 [AMP 样板生成器](/boilerplate)可以快速开始制作新的 AMP 网页。[/tip]

## 必需标记

AMP HTML 文档必须满足以下条件：

| 规则                                                                                                                                                | 说明                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 以 `<!doctype html>` doctype 开头。                                                                                                                 | 适用于 HTML 的标准。                                                                                                                                                                             |
| 包含顶级 `<html ⚡>` 标记<br>（也可以使用 `<html amp>`）。                                                                                          | 将网页标识为 AMP 内容。                                                                                                                                                                          |
| 包含 `<head>` 和 `<body>` 标记。                                                                                                                    | 在 HTML 中是可选标记，但在 AMP 中则必须包含。                                                                                                                                                    |
| 包含 `<meta charset="utf-8">` 标记，作为其 `<head>` 标记的第一个子级。                                                                              | 标识网页的编码。                                                                                                                                                                                 |
| 在其 `<head>` 标记内包含 `<script async src="https://cdn.ampproject.org/v0.js"></script>` 标记。最佳做法是在 `<head>` 中尽早包含该脚本。 | 包含并加载 AMP JS 库。                                                                                                                                                                           |
| 在其 `<head>` 内包含 `<link rel="canonical" href="$SOME_URL">` 标记。                                                                               | 指向常规 HTML 版 AMP HTML 文档，如果不存在此类 HTML 版本，则指向其自身。有关详情，请参阅[使您的网页可被轻松发现](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md)。 |
| 包含 `<meta name="viewport" content="width=device-width">`。另外，还建议包含 initial-scale=1`。                                                     | 指定自适应视口。有关详情，请参阅[制作自适应 AMP 网页](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md)。                                            |
| 在其 `<head>` 标记内包含 [AMP 样板代码](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md)。                             | CSS 样板最初会隐藏内容，直到 AMP JS 加载完毕为止。                                                                                                                                               |

## 可选元数据

除了最基本的要求之外，我们的示例还在 head 中添加了 Schema.org 定义，这对于 AMP 来说并不是一项严格的要求，但要在特定位置（例如，在 Google 搜索“焦点新闻”轮换展示部分中）分发内容，则是必须满足的要求。

[tip type="read-on"]请访问以下资源了解详情：

- [针对 Google 搜索完善 AMP 内容](https://developers.google.com/amp/docs) - 了解如何使 AMP 网页符合在 Google 搜索结果中显示的条件。
- [元数据示例](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples) - 详细了解您会在其他各个位置（例如 Twitter）中用到的所有元数据。
  [/tip]

<hr>

好消息！这就是我们制作首个 AMP 网页所需的全部内容，当然，正文中还没有添加太多内容。在下一节中，我们将介绍如何添加图片等基本元素、自定义 AMP 元素，并介绍如何设置网页样式以及如何创建自适应布局。
