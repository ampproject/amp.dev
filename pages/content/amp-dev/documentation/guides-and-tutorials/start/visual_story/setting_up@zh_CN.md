---
"$title": Setting up
"$order": '1'
description: 设置开发环境 第 1 步：下载代码。以 ZIP 文件格式或通过 git 下载本教程的示例代码…
author: bpaduch
---

## 前提条件

在开始学习本教程之前，您需要做好以下准备：

- 掌握基本的 HTML、CSS 和 JavaScript 知识
- 对 AMP 核心概念有一个基本了解（请参见[“将 HTML 转换成 AMP”](../../../../documentation/guides-and-tutorials/start/converting/index.md)教程）
- 选择一种浏览器
- 选择一种文本编辑器

## 设置开发环境

#### 第 1 步：下载代码

1. 从以下网址下载本教程所要使用的代码（已压缩成 ZIP 文件）：<a href="https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip">https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip</a>

2. 解压缩该 ZIP 文件的内容。**amp-pets-story** 目录中是供我们用来创作故事的图片、视频、音频和数据文件。**pets.html** 文件是供我们用来创作故事的着手点。故事的完成版位于 [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html) 文件中。

#### 第 2 步：运行示例网页

为了测试示例故事，我们需要从网络服务器访问相关文件。您可通过多种方法创建一个临时的本地网络服务器以进行测试。下面列出了一些方案，请从中选择最适合您的那项方案：

- [Google Chrome 应用“Web Server for Chrome”](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [本地 HTTP Python 服务器](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

设好本地网络服务器后，请访问以下<a href="http://localhost:8000/pets-completed.html">网址</a>，查看我们将在本教程结束时完成的故事示例的显示效果：

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"] **重要提示**：请确保该网址是从 <code>localhost</code> 提供的，否则 AMP 故事可能会无法正确加载，而且您可能会遇到诸如此类的错误：`"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.`[/tip]

点击浏览故事的完成版，了解我们将要创作什么样的内容。
