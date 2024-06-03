---
'$title': 免受第三方攻击
$order: 7
description: 采取保护措施，使您的 AMP 网页和用户免受网络安全漏洞的侵害
formats:
  - websites
author: CrystalOnScript
---

采取保护措施，使您的网站和用户免受网络安全漏洞的侵害。[跨站脚本攻击](https://www.google.com/about/appsecurity/learning/xss/) (XSS) 是风险最高的攻击手段之一。攻击者可以利用 XSS 安全漏洞将恶意代码注入到向用户显示的 HTML 网页中。

采用[内容安全策略 (CSP)](https://csp.withgoogle.com/docs/index.html) 可以有效防御此类攻击。诸如 Google AMP 缓存一类的 AMP 缓存已向您的网页添加 CSP！但是，如果您不添加自己的 CSP，那么当用户绕过缓存的版本时，网页将缺少这个额外的保护层。

# 实现 AMP 的 CSP

可以通过在网页的 head 中添加适当的元标记实现 CSP。以下是 AMP 的 CSP，仅允许将 AMP 脚本注入您的网页：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://cdn.ampproject.org/v0.js https://cdn.ampproject.org/v0/ https://cdn.ampproject.org/viewer/ https://cdn.ampproject.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://cdn.ampproject.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

您可以在[此处](https://github.com/ampproject/amphtml/blob/main/examples/csp.amp.html)查看完整示例。

[tip type="read-on"] 在[此处](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)详细了解如何防范安全漏洞和采用 CSP。[/tip]
