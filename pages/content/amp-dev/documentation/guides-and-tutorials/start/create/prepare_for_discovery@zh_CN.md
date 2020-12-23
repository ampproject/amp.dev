---
"$title": 准备网页以供发现和分发
"$order": '4'
description: 在某些情况下，您可能希望同时拥有同一网页（例如，新闻文章）的非 AMP 版本和 AMP 版本。请考虑此情况：如果 Google 搜索…
author: pbakaus
contributors:
- bpaduch
---

在某些情况下，您可能希望同时拥有同一页面（例如，新闻文章）的非 AMP 版本和 AMP 版本。请考虑此情况：如果 Google 搜索找到该网页的非 AMP 版本，*它如何知道该网页有 AMP 版本*？

## 使用 <code><link></code> 链接网页

为了解决此问题，我们以在 `<head>` 中包含 `<link>` 标记的形式向非 AMP 网页中添加有关 AMP 网页的信息，反之亦然。

向非 AMP 网页中添加以下内容：

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

向 AMP 网页中添加以下内容：

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## 如果我只有一个网页该怎么办？

如果您只有一个网页，并且该网页是 AMP 网页，您仍必须向其中添加规范链接，该链接只是指向自身：

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **延伸阅读**：在[与 Google 搜索中的 AMP 网页相关的准则](https://support.google.com/webmasters/answer/6340290)中详细了解 Google 如何查找 AMP 网页。[/tip]
