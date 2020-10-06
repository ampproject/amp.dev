---
$title: التحميل المسبق لوقت تشغيل AMP
$order: 30
tags:
- lcp
- fid
---

يؤدي التحميل المسبق للأصول الضرورية إلى تحسين الأداء من خلال ضمان توفرها أولاً. وتتطلب صفحة AMP JavaScript لإطار العمل، لذا تأكد من تحميلها مسبقًا! استخدم [أداة تحسين AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) لإضافة ما يلي تلقائيًا إلى صفحتك، أو قم بذلك يدويًا:

```
<link as=script href=https://cdn.ampproject.org/v0.js rel=preload>
```
