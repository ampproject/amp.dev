---
'$title': الحماية من هجمات الأطراف الخارجية
$order: 7
description: اتخاذ تدابير لحماية صفحات AMP والمستخدمين من الثغرات الأمنية على الويب
formats:
  - websites
author: CrystalOnScript
---

اتخذ تدابيرًا لحماية موقعك والمستخدمين من الثغرات الأمنية على الويب. يُعد [cross-site scripting](https://www.google.com/about/appsecurity/learning/xss/) (XSS) واحدًا من أكثر الثغرات خطورة. XSS هو خطأ أمني يمكن أن يسمح للمهاجم بإدخال تعليمات برمجية ضارة في صفحات HTML التي تُعرض للمستخدمين.

الحماية من هذه الأنواع من الهجمات من خلال تبنّي [سياسة حماية المحتوى (CSP)](https://csp.withgoogle.com/docs/index.html). تُضيف ذاكرات التخزين المؤقت الخاصة بـ AMP مثل ذاكرة التخزين المؤقت Google AMP بالفعل سياسة CSP إلى صفحاتك! ومع ذلك، تفتقر الصفحات إلى طبقة الحماية الإضافية هذه عندما يتحايل المستخدمون على النسخة المخزنة مؤقتًا، إذا لم تقم بإضافة سياسة CSP الخاصة بك.

# نشر سياسة CSP لصفحات AMP

قم بنشر سياسة CSP عن طريق إضافة العلامة الوصفية المناسبة إلى رأس صفحاتك. يوجد أدناه سياسة CSP الخاصة بـ AMP، مما يسمح بإدخال نصوص AMP البرمجية فقط في صفحتك:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://ampjs.org/v0.js https://ampjs.org/v0/ https://ampjs.org/viewer/ https://ampjs.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://ampjs.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[يمكنك عرض المثال الكامل هنا](https://github.com/ampproject/amphtml/blob/main/examples/csp.amp.html).

[tip type="read-on"] تعرّف على المزيد حول [الحماية من الثغرات الأمنية وسياسات CSP هنا](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). [/tip]
