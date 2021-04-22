---
'$title': الإعداد
$order: 1
description: قم بإعداد بيئة التطوير الخاصة بك. الخطوة الأولى، قم بتنزيل الرمز. قم بتنزيل نموذج التعليمات البرمجية للبرنامج التعليمي إما كملف ZIP أو عبر git ...
author: bpaduch
---

## المتطلبات الأساسية

قبل بدء هذا البرنامج التعليمي، ستحتاج إلى ما يلي:

- معرفة أساسية بـ HTML وCSS وJavaScript
- فهم أساسي لمفاهيم AMP الأساسية (راجع البرنامج التعليمي ["تحويل HTML إلى AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md?format=websites))
- متصفح من اختيارك
- محرر نصوص من اختيارك

## إعداد بيئة التطوير لديك

#### الخطوة 1. تنزيل الرمز

1. قم بتنزيل الكود الخاص بالبرنامج التعليمي، والذي يتم ضغطه كملف مضغوط بتنسيق zip من عنوان URL التالي: <a href="/static/files/tutorials/amp-pets-story.zip">/static/files/tutorials/amp-pets-story.zip</a>

2. استخرج محتويات الملف المضغوط، وفي الدليل **amp-pets-story** توجد ملفات الصور والفيديو والصوت والبيانات التي سنستخدمها لإنشاء قصتنا. ويُعد ملف **pets.html** نقطة البداية للقصة، فيما يمكن العثور على النسخة المكتملة من القصة في ملف [pets-complete.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html).

#### الخطوة 2. قم بتشغيل صفحة المثال

لاختبار نموذج قصة الويب، نحتاج إلى الوصول إلى الملفات من خادم ويب. ثمة عدة طرق لإنشاء خادم ويب محلي مؤقت لأغراض الاختبار. فيما يلي بعض الخيارات، اختر الأنسب بالنسبة لك:

- [“خادم الويب لـ Chrome” أحد تطبيقات Google Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [خادم HTTP Python محلي](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

بعد إعداد خادم الويب المحلي، ألق نظرة على الشكل الذي ستظهر عليه قصة الويب المكتملة بنهاية هذا البرنامج التعليمي من خلال الوصول إلى <a href="http://localhost:8000/pets-completed.html">URL</a> التالي:

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"] **مهم –** تأكد من أن عنوان URL يتم تقديمه من `localhost` وإلا فقد لا يتم تحميل قصة الويب تحميلًا صحيحًا، وقد تواجه أخطاء مثل `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.` [/tip]

انقر على القصة المكتملة وتعرَّف على ما سننشئه.
