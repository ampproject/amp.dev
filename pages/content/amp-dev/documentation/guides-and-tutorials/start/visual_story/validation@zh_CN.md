---
"$title": 验证您的 AMP HTML
"$order": '8'
description: 无论何时创建 AMP 网页，您都应始终验证您的 AMP HTML 正确。[您可以通过多种方式验证您的 AMP 网页…
author: bpaduch
---

由于网页故事使用 AMP 构建，您应始终验证您的 AMP HTML 正确。[您可以通过多种方式验证 AMP 网页](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)。在本教程中，我们将通过开启开发者模式启用 AMP 验证工具。要开启开发者模式，请将以下片段标识符添加到网址中并重新加载网页：

```text
#development=1
```

例如：

```text
http://localhost:8000/pets.html#development=1
```

在 Chrome（或您的首选浏览器）中打开[开发者控制台](https://developer.chrome.com/devtools/docs/console)，然后验证并确保您的网页中没有任何 AMP 错误。您可能需要刷新浏览器才能看到验证消息。如果您的网页没有任何错误，您应该会看到以下消息：

```text
AMP validation successful.
```
