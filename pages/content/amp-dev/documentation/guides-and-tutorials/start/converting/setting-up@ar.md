---
'$title': الإعداد
$order: 0
description: قم بإعداد بيئة التطوير الخاصة بك. الخطوة الأولى، قم بتنزيل الرمز. قم بتنزيل نموذج التعليمات البرمجية للبرنامج التعليمي إما كملف ZIP أو عبر git ...
'$parent': '/documentation/guides-and-tutorials/start/converting/setting-up.md'
---

## المتطلبات الأساسية

قبل بدء هذا البرنامج التعليمي، ستحتاج إلى ما يلي:

- معرفة أساسية بـ HTML وCSS وJavaScript
- متصفح من اختيارك يمكنه فحص وحدة تحكم JavaScript
- محرر نصوص من اختيارك

## إعداد بيئة التطوير لديك

### الخطوة 1. تنزيل الرمز

قم بتنزيل مثال الرمز للبرنامج التعليمي سواء كـ [ملف ZIP](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip) أو عن طريق:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

قم بفك ضغط ملف الأرشيف (إذا لزم الأمر) وانتقل إلى دليل المشروع عن طريق سطر الأوامر على الكمبيوتر الخاص بك:

```shell
cd accelerated-mobile-pages-foundations
```

يحتوي دليل المشروع على العديد من ملفات الموارد وصفحة [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html) للبدء.

### الخطوة 2. قم بتشغيل صفحة المثال

لاختبار نموذج صفحة AMP، نحتاج إلى الوصول إلى الملفات من خادم ويب. ثمة عدة طرق لإنشاء خادم ويب محلي مؤقت لأغراض الاختبار. فيما يلي بعض الخيارات، اختر الأنسب بالنسبة لك:

- [“خادم الويب لـ Chrome” أحد تطبيقات Google Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [خادم HTTP Python محلي](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] **ملحوظة –** نوصي بشدة استخدام HTTPS في بيئات الإنتاج. إذ يتضمن HTTPS العديد من الفوائد التي تتجاوز الأمان بما في ذلك تحسين محركات البحث. يمكنك قراءة المزيد حول هذا الموضوع في [تدوينة Google Webmaster](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html). [/tip]

بعد إعداد خادم الويب المحلي الخاص بك، قم بالوصول إلى مثال مقال في المتصفح الخاص بك [عنوان URL هذا](http://localhost:8000/article.html):

```text
http://localhost:8000/article.html
```
