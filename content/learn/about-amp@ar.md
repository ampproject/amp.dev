---
$title: ما المقصود بـ AMP؟
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

AMP هي وسيلة لإنشاء صفحات ويب للمحتوى الثابت تتميز بسرعة العرض.
تتألف AMP عند التطبيق من ثلاثة أجزاء مختلفة:

[TOC]

**<span dir="ltr" class="nowrap">AMP HTML</span>** هو HTML مع بعض القيود لإتاحة أداء موثوق به
وبعض الإضافات لإنشاء محتوى منسّق خارج نطاق HTML الأساسي.
تضمن مكتبة **<span dir="ltr" class="nowrap">AMP JS</span>** العرض السريع لصفحات <span dir="ltr" class="nowrap">AMP HTML</span>.
تعرض **<span dir="ltr" class="nowrap">Google AMP Cache</span>** (اختياريًا) صفحات <span dir="ltr" class="nowrap">AMP HTML</span>.

## <span dir="ltr" class="nowrap">AMP HTML</span>

<span dir="ltr" class="nowrap">AMP HTML</span> هو HTML الأساسي مع توسيعه بخصائص AMP المخصصة.
يشبه أبسط ملف <span dir="ltr" class="nowrap">AMP HTML</span> هذا:

[sourcecode:html]
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
[/sourcecode]

بالرغم من أن غالبية العلامات في صفحة <span dir="ltr" class="nowrap">AMP HTML</span> تمثل علامات HTML العادية،
لكنّ بعض علامات HTML يتم استبدالها بعلامات مخصصة لـ AMP (انظر أيضًا
[علامات HTML في مواصفات AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).
هذه العناصر المخصصة، التي يُطلق عليها اسم مكونات <span dir="ltr" class="nowrap">AMP HTML</span>،
تسهّل تنفيذ الأنماط الشائعة بطريقة فائقة الأداء.

على سبيل المثال، توفر العلامة [`amp-img`](/docs/reference/amp-img.html)
الدعم الكامل لـ `srcset` حتى في المتصفحات التي لا تدعمها حتى الآن.
تعرّف على كيفية [إنشاء صفحة <span dir="ltr" class="nowrap">AMP HTML</span> الأولى لك](/docs/get_started/create.html).

## <span dir="ltr" class="nowrap">AMP JS</span>

تنفّذ [مكتبة <span dir="ltr" class="nowrap">AMP JS</span>](https://github.com/ampproject/amphtml/tree/master/src)
[أفضل ممارسات الأداء لـ AMP](/docs/get_started/technical_overview.html) جميعها،
وتدير تحميل الموارد، وتمنحك العلامات المخصصة المذكورة أعلاه،
وهذا كله بغرض ضمان العرض السريع لصفحتك.

ومن بين أكبر التحسينات أنها تجعل كلّ ما يكون مصدره الموارد الخارجية غير متزامن؛ وبذلك لا يعيق أيُّ مكون في الصفحة عرض أيٍ من عناصرها.

كذلك، فمن بين تقنيات الأداء الأخرى توفير وضع الحماية لإطارات iframe كلها، والحساب المسبق لتنسيق كل عنصر في الصفحة قبل تحميل الموارد، وتعطيل محدّدات CSS البطيئة.

للتعرّف على المزيد بشأن [التحسينات](/docs/get_started/technical_overview.html) والقيود كذلك، [اقرأ مواصفات <span dir="ltr" class="nowrap">AMP HTML</span>](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

## <span dir="ltr" class="nowrap">Google AMP Cache</span>

<span dir="ltr" class="nowrap">Google AMP Cache</span> هي شبكة عرض محتوى تستند إلى الخادم الوكيل
لعرض كل مستندات AMP الصالحة.
فهي تجلب صفحات <span dir="ltr" class="nowrap">AMP HTML</span> وتخزّنها في ذاكرة التخزين المؤقت، وتحسّن أداء الصفحة تلقائيًا.
عند استخدام <span dir="ltr" class="nowrap">Google AMP Cache</span>، يتم تحميل المستند وكل ملفات JS وكل الصور
من الأصل نفسه الذي يستخدم
[HTTP 2.0](https://http2.github.io/) لتوفير أقصى حد من الفاعلية.

كذلك تأتي ذاكرة التخزين المؤقت مزوّدة
[بنظام تحقق من الصحة](https://github.com/ampproject/amphtml/tree/master/validator)
مدمج لتأكيد ضمان تشغيل الصفحة،
وعدم استنادها إلى موارد خارجية.
ينفّذ نظام التحقق من الصحة سلسلة من التأكيدات
التي تؤكد توافق ترميز الصفحة مع مواصفات <span dir="ltr" class="nowrap">AMP HTML</span>.

وهناك إصدار آخر من أداة التحقق من الصحة يأتي مرفقًا بكل صفحة AMP. هذا الإصدار يمكنه تسجيل أخطاء التحقق من الصحة مباشرةً في وحدة التحكم بالمتصفح عند عرض الصفحة،
مما يتيح لك مشاهدة كيف قد تؤثر التغييرات المعقّدة في الشفرة
على الأداء وانطباع المستخدم.

تعرّف على المزيد بشأن [اختبار صفحات <span dir="ltr" class="nowrap">AMP HTML</span>](/docs/guides/validate.html).