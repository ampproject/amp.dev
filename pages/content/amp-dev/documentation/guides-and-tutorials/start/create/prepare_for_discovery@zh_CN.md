---
$title: 准备页面以供发现和分发
---

在某些情况下，您可能希望同时拥有同一页面（例如，新闻文章）的非 AMP 版本和 AMP 版本。请考虑此情况：如果 Google 搜索找到该页面的非 AMP 版本，*它如何知道该页面有 AMP 版本*？

## 使用 &lt;link> 链接页面

为了解决此问题，我们以在 `<head>` 中包含 `<link>` 标记的形式向非 AMP 页面中添加了有关 AMP 页面的信息，反之亦然。

向非 AMP 页面中添加以下内容：

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

向 AMP 页面中添加以下内容

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## 如果我只有一个页面该怎么办？

如果您只有一个页面，并且该页面是 AMP 页面，则您仍必须向其中添加规范链接，该链接只是指向自身：

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/preview_and_validate.md', locale=doc.locale).url.path}}"><span class="arrow-prev">以前</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/publish.md', locale=doc.locale).url.path}}"><span class="arrow-next">下一个</span></a>
</div>
