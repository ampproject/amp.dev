---
"$title": 创建一个常规 HTML 网页
"$order": '1'
description: 在项目目录中，您会看到一个名为 article.html 的文件。这是一篇新闻报道，我们将为它创建一个等效的 AMP 网页…
---

在项目目录中，您会看到一个名为 [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html) 的文件。这是一篇新闻报道，我们将为它创建一个等效的 AMP 网页。

1. 从 `article.html` 文件中**复制**完整代码，并将其粘贴到一个新文件中。
2. 将这个新文件**保存**为 `article.amp.html`。

[tip type="note"] <strong>注</strong>：您无需将 AMP 文件命名为 `.amp.html`。事实上，AMP 文件可以使用您想要的任何扩展名。发布商往往会通过在网址中使用参数来区分 AMP 网页与其规范版本。例如：`http://publisher.com/article.html?amp`。 [/tip]

您的 `article.amp.html` 文件应该如下所示：

```html
<!doctype html>
<html lang="en">
  <head>

    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>
    </article>
    <img src="mountains.jpg">
  </body>
</html>
```

这个网页可能过于简单，这是我们有意为之，仅在其中添加了常见的静态新闻报道元素：CSS、JavaScript 和一个图片代码。

现在，这篇报道的 AMP 版本尚且只是原报道的副本。接下来，我们就逐步将其转换成 AMP 网页。

首先，我们需要添加 AMP 库文件。仅凭此步骤并不能将您的新文件转换成有效的 AMP 网页，不过下文会介绍 AMP 库如何帮助我们确定还需执行哪些操作。

要添加 AMP 库，请将下面这行内容**添加**到 `<head>` 标记底部：

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

在浏览器中访问 [http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html)，以**加载** `article.amp.html` 这一新网页，然后，在 Chrome（或您的首选浏览器）中**打开**[开发者控制台](https://developer.chrome.com/devtools/docs/console)。

在开发者控制台中检查 JavaScript 输出时（请确保您已选择 Console 标签），您应该会看到下面这个日志条目：

```text
Powered by AMP ⚡ HTML
```

AMP 库中含有 [AMP 验证工具](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)，它将显示是否存在任何会导致您的网页无法成为有效 AMP 文档的问题。要**启用** AMP 验证工具，请将以下片段标识符添加到您的文档网址中：

```text
#development=1
```

例如：

```text
http://localhost:8000/article.amp.html#development=1
```

在开发者控制台中，您应该会收到几条验证错误消息（您可能需要在浏览器中手动刷新网页才能看到这些错误）：

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='我们所用示例的 AMP 验证错误') }}

为了让该网页成为有效的 AMP 文档，我们必须修正所有这些错误，这也正是我们要在此 Codelab 中做的工作。

由于我们要处理一篇移动版新闻报道，因此在开始修正错误之前，我们最好先在浏览器的开发者工具中**模拟**移动设备体验。例如，在 Chrome DevTools 中，点击手机图标，然后从菜单中选择一种移动设备。

您应该会在浏览器中看到该 AMP 网页的移动版模拟效果，如下所示：

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='我们的 AMP 网页的移动版模拟效果') }}

现在，我们可以开始修正错误了！我们将逐个查看验证错误，并弄清楚它们与 AMP 的关系。
