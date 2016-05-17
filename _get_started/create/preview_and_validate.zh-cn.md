---
layout: page
title: 预览和验证
order: 3
locale: zh-cn
---

就像您预览任何其他静态 HTML 网站一样预览 AMP 页面。无需编译步骤或进行预处理。请执行以下任一操作：

  - **通过文件系统在浏览器中直接打开该页面**（某些元素可能会因为 XMLHttpRequests 失败而无法工作）。
  - **使用本地 Web 服务器，比如 Apache 2 或 Nginx**。
    *(结构化数据 对于快速 Web 服务器，请运行 `python -m SimpleHTTPServer`。）*

接下来，确保您的 AMP 页面**是实际有效的 AMP**，或者它不会被第三方平台（如 Google 搜索）发现和分发。要进行验证：

  1. 在浏览器中打开您的页面。
  1. 向 URL 中添加“`#development=1`”，例如，`http://localhost:8000/released.amp.html#development=1`。
  1. 打开 [Chrome DevTools 控制台](https://developers.google.com/web/tools/chrome-devtools/debug/console/)，并检查是否有验证错误。

[详细了解验证](/docs/guides/validate.html)，以及在出现错误时要执行的操作。

{% include button.html title="继续执行步骤 5" link="/docs/get_started/create/prepare_for_discovery.zh-cn.html" %}
