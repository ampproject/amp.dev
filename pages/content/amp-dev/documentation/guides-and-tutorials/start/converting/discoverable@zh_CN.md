---
"$title": 使您的网页可被轻松发现
"$order": '3'
description: 需要设置这种双向关联，以使搜索引擎了解我们的常规 HTML 规范文档与 AMP 文档之间的关系。
---

现在，您已经完成了 AMP 新闻报道，下面我们来确保用户可以找到并发现您的内容。

## 关联 AMP 内容

您的网站可能所有网页都是 AMP 网页、部分网页是 AMP 网页，也可能没有任何 AMP 网页。这部分教程介绍如何将 AMP 整合到您网站的结构中。

当多个网页包括相同的内容时，常规 HTML 网页中的规范关联是声明应将哪个网页视为首选网页的常用手段。

为网站添加 AMP 网页时，经常使用的一种方式是生成传统非 AMP HTML 网页的 AMP 版本。这两个版本的内容大致相同（例如报道文字），但它们可能有不同的展示方式。在这种情况下，您应该将传统 HTML 网页视为“规范”网页，并将 AMP 网页与对应的 HTML 网页配对。

在可能的情况下，尽量像使用任何其他 JavaScript 库一样使用 AMP 构建网站，不要考虑规范关联。使用 AMP 构建整个网站可大大减少您的维护工作。

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='关联 AMP 内容') }}

在本教程中，我们将重点介绍网页存在 AMP 版本和非 AMP 版本的情况。在本教程中，我们的网站包括一篇同时具有非 AMP HTML 网页 (`article.html`) 和对应的 AMP 版网页 (`article.amp.html`) 的新闻报道。我们通过 `link` 将这些网页配对。

为了实现此目的，我们已经在 AMP 文档中执行完第一步，即在 `<head>` 中添加链接标记以关联到原来的规范网页：

```html
<link rel="canonical" href="/article.html">
```

下一步是将规范报道关联到 AMP 网页。为此，请将 `<link rel="amphtml">` 标记添加到规范报道的 `<head>` 部分中。

在 `article.html` 文件中，将以下代码**添加**到 `<head>` 部分中：

```html
<link rel="amphtml" href="/article.amp.html">
```

以下图表展示了链接标记的配对方向：

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='关联 AMP 内容') }}

需要设置这种双向关联，以使搜索引擎了解我们的常规 HTML 规范文档与 AMP 文档之间的关系。如果不提供任何链接，则抓取工具不一定清楚哪些报道是常规 HTML 文档的“AMP 版本”。通过明确提供此类链接，我们可以确保消除不确定性！

## 添加结构化数据

有效的 AMP 网页不需要 [schema.org](http://schema.org/) 结构化数据，但是某些平台（如 Google 搜索）需要该数据才能实现特定的体验（例如“焦点新闻”轮播界面）。通常，建议您添加结构化数据。结构化数据有助于搜索引擎更好地了解您的网页，以及更好地在搜索引擎结果页（例如，在丰富网页摘要中）中显示您的内容。您可以通过 `application/ld+json` 类型脚本代码在 AMP 网页的 `<head>` 标记中添加结构化数据。

对于我们的新闻报道，请将以下结构化数据**添加**到 AMP 文档的 `<head>` 部分底部：

```html
<script type="application/ld+json">
{
"@context": "http://schema.org",
"@type": "NewsArticle",
"mainEntityOfPage":{
   "@type":"WebPage",
   "@id":"https://example.com/my-article.html"
},
"headline": "My First AMP Article",
"image": {
   "@type": "ImageObject",
   "url": "https://example.com/article_thumbnail1.jpg",
   "height": 800,
   "width": 800
},
"datePublished": "2015-02-05T08:00:00+08:00",
"dateModified": "2015-02-05T09:20:00+08:00",
"author": {
   "@type": "Person",
   "name": "John Doe"
},
"publisher": {
   "@type": "Organization",
   "name": "⚡ AMP Times",
   "logo": {
     "@type": "ImageObject",
     "url": "https://example.com/amptimes_logo.jpg",
     "width": 600,
     "height": 60
   }
},
"description": "My first experience in an AMPlified world"
}
</script>
```

[tip type="note"] <strong>注</strong>：内容应始终相同。对于新闻报道，请指定“NewsArticle”类型。标题应与您的报道的标题一致。图片对象是指报道的主打图片。[/tip]

在浏览器中**重新加载**网页，验证并确保未引入任何 AMP 验证错误。

[tip type="note"] 除了 schema.org 结构化数据格式外，搜索引擎和社交媒体网络还支持其他格式。请参阅支持的文档：

- [Twitter 卡片元标记](https://dev.twitter.com/cards/overview)
- [Facebook 开放图谱元标记](https://developers.facebook.com/docs/sharing/webmasters) [/tip]

### 验证结构化数据

为了验证您的结构化数据是否正确，许多平台都提供验证工具。在本教程中，我们将使用 [Google 结构化数据测试工具](https://developers.google.com/structured-data/testing-tool/)验证我们的结构化数据。

1. 在新的浏览器窗口中，打开 [Google 结构化数据测试工具](https://developers.google.com/structured-data/testing-tool/)。
2. 选择**代码段**标签。
3. 将 AMP 网页中的完整源代码复制并粘贴到验证工具的文本编辑器面板中。
4. 点击**运行测试**。

如果您的结构化数据是有效的，您应该会看到 **0 个错误**和 **0 条警告**。

[tip type="read-on"] <strong>延伸阅读</strong>：要详细了解网页能否被发现，请参阅[使您的网页可被轻松发现](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md)指南。[/tip]

真棒！至此，您的 AMP 新闻报道已经完成。
