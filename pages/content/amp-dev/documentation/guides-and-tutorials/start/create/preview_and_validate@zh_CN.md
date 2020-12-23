---
"$title": 预览和验证
"$order": '5'
description: 就像您预览任何其他静态 HTML 网站一样预览 AMP 网页。无需构建步骤或进行预处理。您可以执行以下任一操作：
author: pbakaus
contributors:
- bpaduch
---

## 预览

就像您预览任何其他静态 HTML 网站一样预览 AMP 网页。无需构建步骤或进行预处理。您可以执行以下任一操作：

- **通过文件系统在浏览器中直接打开网页**（某些元素可能会因为 XMLHttpRequests 失败而无法工作）。
- **使用本地网络服务器，例如 Apache 2 或 Nginx**。*（提示：对于快速网络服务器，请运行 `python -m SimpleHTTPServer`。）*

## 验证

接下来，确保您的 AMP 网页**是实际有效的 AMP**，或者它不会被第三方平台（如 Google 搜索）发现和分发。要进行验证，请执行以下操作：

1. 在浏览器中打开您的网页。
2. 向网址中添加“`#development=1`”，例如，`http://localhost:8000/released.amp.html#development=1`。
3. 打开 [Chrome DevTools 控制台](https://developers.google.com/web/tools/chrome-devtools/debug/console/)，并检查有无验证错误。

[tip type="read-on"] <strong>延伸阅读</strong>：[详细了解验证](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)，以及在出现错误时要执行的操作。[/tip]
