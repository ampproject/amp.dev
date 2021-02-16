---
"$title": 停用点按延迟
"$order": '50'
tags:
- fid
---

根据设备宽度设置视口宽度，以停用触摸延迟，这样可以增加 FID。要移除这段 300-350ms 的点按延迟，请在网页的 `<head>` 中将视口声明更改为以下内容：

```
<meta name="viewport" content="width=device-width">
```

这样就会将视口宽度设置为与设备宽度一样，在针对移动设备优化的网站上，这通常是最佳做法。您可以[在 web.dev 上详细了解如何停用点按延迟](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away)。
