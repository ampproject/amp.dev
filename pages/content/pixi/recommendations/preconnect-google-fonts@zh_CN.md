---
$title: 预连接到 Google 字体
$order: 150
tags:
- lcp
---

新型浏览器支持 `preconnect` 等资源提示功能，它们可用于提高网站性能，缩短加载时间。<br><br>将以下内容添加到网页后，可以手动使用资源提示：

```
<link href="https://fonts.gstatic.com" rel="dns-prefetch preconnect" crossorigin>
```
