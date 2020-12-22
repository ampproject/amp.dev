---
"$title": الإعداد
"$order": '0'
description: '"قبل بدء هذا البرنامج التعليمي، ستحتاج إلى ما يلي: - معرفة أساسية بـ HTML وCSS وJavaScript - فهم أساسي للمفاهيم الأساسية في AMP راجع ..."'
"$parent": "/content/docs/fundamentals/add_advanced.md"
---

## المتطلبات الأساسية

**قبل بدء** هذا البرنامج التعليمي، ستحتاج إلى ما يلي:

- معرفة أساسية بـ HTML وCSS وJavaScript
- فهم أساسي لمفاهيم AMP الأساسية (راجع البرنامج التعليمي ["تحويل HTML إلى AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md))
- متصفح من اختيارك يمكنه فحص وحدة تحكم JavaScript
- محرر نصوص من اختيارك

## إعداد بيئة التطوير لديك

### الخطوة 1. تنزيل الرمز

قم بتنزيل مثال الرمز للبرنامج التعليمي سواء كـ [ملف ZIP](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/archive/master.zip) أو عن طريق:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-advanced.git
```

قم بفك ضغط ملف الأرشيف (إذا لزم الأمر) وانتقل إلى دليل المشروع عن طريق سطر الأوامر على الكمبيوتر الخاص بك:

```shell
cd accelerated-mobile-pages-advanced
```

يحتوي دليل المشروع على العديد من ملفات الموارد وصفحة [`article.amp.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) للبدء.

### الخطوة 2. قم بتشغيل صفحة المثال

لاختبار صفحة AMP المثال، نحتاج إلى الوصول إلى الملفات من خادم ويب. ثمة عدة طرق لإنشاء خادم ويب محلي مؤقت لأغراض الاختبار.  فيما يلي بعض الخيارات، اختر الأنسب بالنسبة لك:

- [“خادم الويب لـ Chrome” أحد تطبيقات Google Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [خادم HTTP Python محلي](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] **ملاحظة –** نوصي بشدة استخدام HTTPS في بيئات الإنتاج. يتضمن HTTPS العديد من الفوائد التي تتجاوز الأمان يشمل ذلك SEO. يمكنك قراءة المزيد حول هذا الموضوع في [منشورة مدونة Google Webmaster](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html) الحالي. [/tip]

بعد إعداد خادم الويب المحلي الخاص بك، قم بالوصول إلى مثال مقال في المتصفح الخاص بك في [عنوان URL هذا](http://localhost:8000/article.amp.html):

```text
http://localhost:8000/article.amp.html
```
