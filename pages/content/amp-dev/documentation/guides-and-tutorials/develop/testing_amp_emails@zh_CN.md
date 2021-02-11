---
'$title': 测试 AMP 电子邮件
$order: 2
'$category': Develop
description: 在发送给大量受众之前测试您的 AMP 电子邮件，确保提供出色的用户体验。
formats:
  - email
author: fstanis
---

在发送给大量受众之前测试您的 AMP 电子邮件，确保提供出色的用户体验。

## 测试核对清单

1. 包含 HTML 和/或纯文本版本的 AMP 电子邮件。对于不支持 AMP 的电子邮件客户端，将显示此版本作为后备。
2. 遵循[验证 AMP 电子邮件](/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails.md)中列出的步骤，确保您的 AMP 有效。
3. 查阅 [AMP 电子邮件支持的 CSS](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md)，确保所有电子邮件客户端均支持您正在使用的 CSS。
4. 在 [AMP Playground](https://playground.amp.dev/?runtime=amp4email) 中尝试您的电子邮件，确保表单等所有动态功能可以正常使用。

## 针对具体的电子邮件客户端进行测试

支持 AMP 的电子邮件客户端也会提供开发者文档，其中可能包含额外的准则和要求。

### Gmail

[在 Gmail 中测试您的 AMP 电子邮件](https://developers.google.com/gmail/ampemail/testing-dynamic-email)中，Gmail 文档列出了测试准则。

Gmail 用户可以使用 [Gmail AMP for Email Playground](https://amp.gmail.dev/playground/) 向自己发送电子邮件进行测试。

### Mail.ru

[Mail.ru AMP 电子邮件](https://postmaster.mail.ru/amp)提供了关于如何在 Mail.ru 帐号中进行测试的信息。

Mail.ru 用户可以使用 [Mail.ru AMP Playground](https://postmaster.mail.ru/amp/playground.html) 向自己发送电子邮件进行测试。
