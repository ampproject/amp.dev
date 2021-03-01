---
'$title': 设置
$order: 0
description: 设置开发环境 第 1 步：下载代码。以 ZIP 文件格式或通过 git 下载本教程的示例代码…
'$parent': '/documentation/guides-and-tutorials/start/converting/setting-up.md'
---

## 前提条件

**在开始学习本教程之前**，您需要做好以下准备：

- 掌握基本的 HTML、CSS 和 JavaScript 知识
- 安装一款可以查看 JavaScript 控制台的浏览器
- 安装一款文本编辑器

## 设置开发环境

### 第 1 步：下载代码

以 [ZIP 文件](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip)格式或通过 git 下载本教程的示例代码：

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

解压缩相应的归档文件（如有必要），并在计算机上通过命令行转到项目目录：

```shell
cd accelerated-mobile-pages-foundations
```

项目目录包含若干示例资源文件和初始的 [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html) 网页。

### 第 2 步：运行示例网页

为了测试示例网页，我们需要从网络服务器访问相关文件。您可以通过多种方式创建一个临时的本地网络服务器来进行测试。下面列出了一些方案，请从中选择最适合您的方案：

- [Google Chrome 应用“Web Server for Chrome”](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [本地 HTTP Python 服务器](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] <strong>注</strong>：我们强烈建议您在生产环境中使用 HTTPS。除了能够提供可靠的安全性，HTTPS 还具有包括 SEO 在内的诸多优势。要想详细了解此主题，请阅读这篇 [Google 网站站长博文](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html)。[/tip]

设置完本地网络服务器之后，请在浏览器中通过[此网址](http://localhost:8000/article.html)访问示例报道：

```text
http://localhost:8000/article.html
```
