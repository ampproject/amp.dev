---
"$title": 向现有电子邮件添加 AMP
"$order": '1'
author: CrystalOnScript
formats:
- email
---

AMP 电子邮件格式作为新的 MIME 部分嵌入。如果您的电子邮件发送到支持 AMP 电子邮件的提供商，该电子邮件会显示，否则，电子邮件服务提供商将显示 HTML 或纯文本后备。请不要担心！本指南将介绍如何在电子邮件中添加 AMP。

# 添加 AMP MIME 部分

电子邮件的结构为 [MIME 树](https://en.wikipedia.org/wiki/MIME)，其中包含电子邮件消息正文以及所有附件。要在电子邮件中添加 AMP，需要添加内容类型为 `text/x-amp-html` 的新 MIME 部分。

AMP MIME 部分必须嵌套在 `multipart/alternative` 节点下并位于现有的 `text/html` 或 `text/plain` 部分旁边。这样可确保电子邮件消息在所有客户端上呈现。

```html
From:  Person A <persona@example.com>
To: Person B <personb@example.com>
Subject: An AMP email!
Content-Type: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae
Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World in plain text!

--001a114634ac3555ae05525685ae
Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
Hello World in AMP!
</body>
</html>
--001a114634ac3555ae05525685ae--
Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span>
--001a114634ac3555ae05525685ae
```

[tip type="important"] 某些电子邮件客户端仅呈现最后的 MIME 部分。为了确保电子邮件得到呈现，请将 `text/x-amp-html` MIME 部分置于 `text/html` MIME 部分之前。[/tip]

# 收件人转发或回复 AMP 电子邮件时将会出现什么情况？

在用户转发或回复 AMP 电子邮件时，MIME 树的 `text/x-amp-html` 部分将被移除。因此，在 HTML 部分中提供替换内容十分重要，即使将 AMP 电子邮件发送给支持 MIME 类型的客户端也是如此。
