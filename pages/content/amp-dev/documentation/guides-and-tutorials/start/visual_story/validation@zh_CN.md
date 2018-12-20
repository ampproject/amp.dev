---
$title: 验证您的 AMP HTML
---

每次创建 AMP 网页时，您都应验证您的 AMP HTML 是否正确。[您可以使用多种方法来验证 AMP 网页]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/index.md', locale=doc.locale).url.path}})。在本教程中，我们将通过开启开发者模式来启用 AMP 验证工具。为了开启开发者模式，请将以下分段标识符添加到您的网址中，然后重新加载相应网页：

```text
#development=1
```

例如：

```text
http://localhost:8000/pets.html#development=1
```

在 Chrome（或您喜爱的浏览器）中打开 [Developer Console](https://developer.chrome.com/devtools/docs/console)，然后验证并确保您的网页中没有任何 AMP 错误。您可能需要刷新浏览器才能看到验证消息。如果您的网页没有任何错误，您应该会看到以下消息：

```text
AMP validation successful.
```

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_bookend.md', locale=doc.locale).url.path}}"><span class="arrow-prev">上一页</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/congratulations.md', locale=doc.locale).url.path}}"><span class="arrow-next">下一页</span></a>
</div>

