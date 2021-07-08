---
formats:
  - websites
'$title': 使您的页面可被轻松发现
'$titles':
  teaser: 使您的页面可被轻松发现
$order: 5
description: 在某些情况下，您可能希望同时拥有同一页面（例如，新闻文章）的非 AMP 版本和 AMP 版本。请考虑此情况：如果 Google 搜索…
teaser:
  icon: discover
  text: 了解搜索引擎如何发现您的网站有 AMP 版本。
  label: 了解详情
---

在某些情况下，您可能需要让同一个网页（例如新闻报道网页）同时具有非 AMP 版本和 AMP 版本。试想一下，如果 Google 搜索找到该网页的非 AMP 版本，那么它如何知晓该网页还存在 AMP 版本呢？

### 使用 &lt;link&gt; 关联网页

为了解决此问题，我们通过在 `<head>` 中添加 `<link>` 标记的形式，向非 AMP 网页添加 AMP 网页的相关信息，反之亦然。

向非 AMP 网页添加以下标记：

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

向 AMP 网页添加以下标记：

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### 如果我只有一个版本的网页呢？

如果您只有一个版本的网页，并且该版本是 AMP 网页，则您仍要为其添加规范链接，该链接会指向其自身：

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] 要详细了解 Google 如何发现 AMP 网页，请参阅[针对 AMP 网页的 Google 搜索指南](https://support.google.com/webmasters/answer/6340290)。 [/tip]

## 通过额外的元数据与第三方平台集成 <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

有时候，第三方网站（嵌入您的 AMP 网页或内含转到该网页的链接）除了需要知道您的网页是 AMP 网页之外，还需要了解更多信息。平台可能会针对您的网页询问以下问题：“网页是新闻报道吗？”、“是视频吗？”，或者“有屏幕截图和简短说明吗？”。

这不仅仅针对 AMP 网页，对所有网页都会提出此类问题。这些元数据对于一些平台而言是额外信息，而对于另外一些平台则是必需信息。这意味着，**如果您没有添加正确的元数据，它们将不会显示指向您内容的链接**。对于要在其中显示您内容的平台，请务必添加正确的元数据。

### 针对大多数搜索引擎使用 Schema.org

[Schema.org](http://schema.org/) 提供开放式词汇，可为各类内容添加元数据。对于 AMP，在上下文中有意义的属性包括特定类型的内容（例如“新闻报道”）、标题、发布日期和相关的预览图片。

示例：

[sourcecode:html]

<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>

[/sourcecode]

要查看更多示例（包括备用 HTML 属性语法），请访问 [ampproject 示例文件夹](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples)。

[tip type="read-on"] 要详细了解结构化数据，请访问以下资源。

- Learn how to [Structure your content to appear in Google Search rich results](https://developers.google.com/search/docs/guides/mark-up-content) (e.g., top stories carousel, recipe cards, etc.).
- 使用 [Google 结构化数据测试工具](https://developers.google.com/structured-data/testing-tool/)测试您的结构化数据。[/tip]

### 适用于更多平台的其他元数据

请访问[网站开发基础中的社交发现指南](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/)，了解让内容做好被发现和分发准备的其他各种不同方法。
