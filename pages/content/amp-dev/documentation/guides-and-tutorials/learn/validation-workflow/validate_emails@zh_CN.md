---
"$title": 验证 AMP 电子邮件
"$order": '1'
author: CrystalOnScript
formats:
- email
---

AMP 电子邮件依赖 AMP JS 库为读者提供丰富的互动式和动态体验。因此，电子邮件服务提供商会要求验证您的邮件。有效的 AMP 标记可确保电子邮件安全并超越用户体验标准。

# 如何检查我的电子邮件是否为有效的 AMP？

您可以通过多种方式验证电子邮件是否为有效的 AMP 电子邮件。这些方式可得出完全相同的结果，因此请任选一种最适合您的开发风格的方式！

## 基于网络的验证工具

AMP [基于网络的验证工具](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL)支持 AMP 电子邮件平台。将 AMP 电子邮件粘贴到工具中即可使用基于网络的验证工具。该工具将直接内嵌标记任何验证工具错误。

{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='基于网络的电子邮件验证工具图片' ) }}

## 命令行验证工具

您可以使用 [AMP HTML 命令行验证工具](https://www.npmjs.com/package/amphtml-validator)验证 AMP 电子邮件文件。

### 安装

1. 请确保您的系统中具有 [Node.js 和软件包管理器 'npm'](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)。
2. 通过运行以下命令来安装 AMP HTML 命令行验证工具：`npm install -g amphtml-validator`。

### 用法

安装命令行工具后，将以下命令中的 `<amphtml file>` 替换为包含 AMP 电子邮件内容的文件，然后运行该命令。

```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```

如果电子邮件有效，命令行工具将生成 `PASS`。如果无效，将返回发现的错误。

## AMP Playground

您还可以使用 [AMP Playground](https://playground.amp.dev/?runtime=amp4email) 验证 AMP 电子邮件。与基于网络的验证工具类似，将您的 AMP 电子邮件粘贴到工具中，Playground 会直接内嵌标记任何验证工具错误。

### 验证已递送的电子邮件

有时，即使您已经通过本页所介绍的工具对您编写的电子邮件标记进行验证，但已递送的 AMP 电子邮件仍可能无效。发生这种情况的最常见原因是，在您将电子邮件发送到电子邮件服务提供商以供递送后，[电子邮件服务提供商](https://amp.dev/support/faq/email-support/)修改了电子邮件标记并导致其无效。例如，如果您的电子邮件服务提供商为 SparkPost，并且您尚未使用 SparkPost 配置 HTTPS 跟踪像素，则 SparkPost 会向您的电子邮件添加不安全的 HTTP 跟踪像素。由于 AMP 电子邮件仅支持 HTTPS 图片，因此这将使您的 AMP 电子邮件无效。

要检查已递送到您的收件箱的电子邮件是否为有效的 AMP，请执行以下操作：

1. 从您的电子邮件客户端[下载 `.eml` 文件格式的 AMP 电子邮件](https://www.codetwo.com/kb/export-email-to-file)。
2. 打开 [AMP Playground](https://playground.amp.dev/?runtime=amp4email)。
3. 点击“IMPORT EMAIL”，然后选择您刚刚下载的 `.eml` 文件。

Playground 会将您下载的 AMP 电子邮件导入到内嵌编辑器中，并标记所有验证错误。

# 如果我的电子邮件无效会怎样？

AMP 验证工具不仅为您在开发过程中提供了便利，支持 AMP 电子邮件的电子邮件服务提供商还会自动回退到提供的 HTML 或纯文本 MIME 类型。请确保通过验证工具验证 AMP 电子邮件后再进行发送。
