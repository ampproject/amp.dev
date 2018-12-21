---
$title: 添加字体
---

在 AMP 网页中，为尽可能缩短文档的加载用时，您不能添加外部样式表。但是，这条规则有一个例外情况&mdash;**字体**。

您可通过以下两种方法将自定义字体嵌入到 AMP 网页中：

1. 使用 `<link>` 标记：仅适用于已列入白名单的字体提供商。
2. 使用 `@font-face` CSS 规则：无限制，所有字体均适用。

在本教程中，我们将使用 `<link>` 标记向网页中添加字体。首先，向 `<head>` 中**添加**一个样式表链接，以请求 Raleway 字体：

```html
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway">
```

现在，**更新**您的 CSS `body` 选择器，以添加对 Raleway 的引用：

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

**刷新**网页后，您即会看到焕然一新的网页外观。此外，请检查 AMP 验证工具的输出结果。这项外部样式表请求不应有任何错误。

[tip type="note"]
向文档中添加字体并不需要使用任何其他组件。话虽如此，您仍可使用一款名为 [`amp-font`](/zh_cn/docs/reference/components/amp-font.html) 的组件。`amp-font` 组件不是用于加载网页字体，而是用于检测网页字体是否已成功加载，并在必要时予以适当的响应。

在您的字体加载完毕之前，您可以使用 amp-font 将文字隐藏起来，这样用户就不会看到文字从临时字体转变为最终字体这一过程。如果字体未能成功加载，您可能需要改为仅显示临时字体。毕竟，用户看不到任何文字才是最糟糕的情形！要想了解详情，请参阅 [`amp-font`](/zh_cn/docs/reference/components/amp-font.html) 参考文档。
[/tip]

至此，您的 AMP 新闻报道便已完成了！它看起来应该会如下所示：

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='完成后的新闻报道') }}


<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/navigating.md', locale=doc.locale).url.path}}"><span class="arrow-prev">上一页</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/congratulations.md', locale=doc.locale).url.path}}"><span class="arrow-next">下一页</span></a>
</div>
