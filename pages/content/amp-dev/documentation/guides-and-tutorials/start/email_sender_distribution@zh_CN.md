---
"$title": 注册发件人分发
"$order": '1'
description: 注册 AMP 电子邮件的发件人分发
"$category": Start
formats:
- email
author: CrystalOnScript
---

电子邮件客户端要求发件人注册后才能向用户显示 AMP 电子邮件。请遵循本指南，将您的发件人地址添加到支持的客户端的许可名单中！

# 创建并发送准备就绪的 AMP 电子邮件

您必须理解和遵守 AMP 电子邮件格式。电子邮件必须满足以下要求：

- 顶级域名 (TLD) 与 "From:" 地址匹配以通过 [SPF/DKIM/DMARC](https://support.google.com/a/answer/33786?hl=en)
- 具有后备 "text/html" MIME 部分
- 符合所有客户端发件人要求

将准备就绪的 AMP 电子邮件发送到以下地址：

- ampverification@yahoo.com
- postmaster_amp@corp.mail.ru
- ampforemail.whitelisting@gmail.com

# 填写全局表单

您必须填写 [AMP 电子邮件：发件人注册表单](https://docs.google.com/forms/d/e/1FAIpQLSdso95e7UDLk_R-bnpzsAmuUMDQEMUgTErcfGGItBDkghHU2A/viewform?gxids=7628)。这是您确保自己被加入许可名单，以便向所有支持的电子邮件客户端发送 AMP 电子邮件而需要填写的唯一表单。

# 遵守隐私权政策

您必须遵守每个客户端的隐私权政策。

**Gmail**

[GooglePrivacy & Terms](https://policies.google.com/privacy)

**Mail.ru**

- [Non-Russian based users](https://help.mail.ru/engmail-help/privacy)
- [Russian based users](https://agent.mail.ru/legal/privacypolicy/en)

**Verizon Media (Yahoo Mail)**

- [Verizon Media Privacy Policy - US](https://www.verizonmedia.com/policies/us/en/verizonmedia/privacy/index.html)
- 对于其他国家/地区，请访问[此处](https://www.verizonmedia.com/policies/)。

# 确认

每个电子邮件客户端都会通过电子邮件向您通知您的许可名单状态。如果您有任何疑问，请通过 [GitHub](https://github.com/ampproject/wg-amp4email) 与 AMP 电子邮件工作小组联系。

# 添加客户端支持

如果您有兴趣为自己的电子邮件客户端添加 AMP 电子邮件支持，请[通过 GitHub 联系 AMP 电子邮件团队](https://github.com/ampproject/wg-amp4email/)！
