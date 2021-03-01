---
'$title': 添加字体
$order: 6
description: 您可以通过以下两种方式将自定义字体嵌入到 AMP 网页中：1. 使用 <link> 标记：仅适用于已被列入许可名单的字体提供商。2. 使用…
---

在 AMP 网页中，为尽可能缩短文档的加载用时，您不能添加外部样式表。但是，这条规则有一个例外，即**字体**。

您可以通过以下两种方式将自定义字体嵌入到 AMP 网页中：

1. 使用 `<link>` 标记：仅适用于已被列入许可名单的字体提供商。
2. 使用 `@font-face` CSS 规则：无限制，所有字体均适用。

在本教程中，我们将使用 `<link>` 标记向网页中添加字体。首先，向 `<head>` 中**添加**一个样式表链接，以请求 Raleway 字体：

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://fonts.googleapis.com/css?family=Raleway"
/>
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

**刷新**网页后，您即会看到焕然一新的网页外观。此外，请检查 AMP 验证工具的输出结果。此外部样式表请求不应有任何错误。

[tip type="note"] 网络字体可能影响网站的性能，即使在非常快的 AMP 网站上也可能如此。请使用 [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) CSS 属性优化字体的加载行为。[/tip]

至此，您的 AMP 新闻报道已经完成！它看起来应该如下所示：

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='完成后的新闻报道') }}
