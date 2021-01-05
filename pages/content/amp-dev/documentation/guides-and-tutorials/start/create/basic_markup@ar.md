---
"$title": إنشاء صفحة AMP HTML
"$order": '1'
description: 'استخدام HTTPS: عند إنشاء صفحات AMP والمحتوى، فيجب أن تراعي بشدة استخدام بروتوكول HTTPS (وليسHTTP). بالرغم من أن, HTTPS ليس مطلوبًا لمستند AMP نفسه أو ...'
author: pbakaus
contributors:
- bpaduch
---

يمثل الترميز التالي نقطة بداية مناسبة أو نصًا معياريًا. انسخه واحفظه في ملف بإضافة ‎.html.

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

المحتوى في النص الأساسي واضح حتى الآن. لكن هناك الكثير من الشفرات الإضافية في عنوان الصفحة، والتي قد لا تبدو واضحةً مباشرةً. هيا نحلل الترميز المطلوب.

استخدام HTTPS: عند إنشاء صفحات AMP والمحتوى، يجب أن تراعي بشدة استخدام بروتوكول HTTPS (وليس HTTP). على الرغم من أن HTTPS ليس مطلوبًا لمستند AMP نفسه أو للصور والخطوط، لكن هنا العديد من ميزات AMP التي تتطلب HTTPS (مثل الفيديو، وiframes وغيرها). لضمان أن صفحات AMP الخاصة بك تحقق الاستفادة الكاملة من جميع ميزات AMP، استخدم بروتوكول HTTPS.  يمكنك تعلم المزيد حول HTTPS في ["لماذا يعتبر HTTPS مهمًا"](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).

[tip type="tip"] استخدم مولد [مولد النصوص الأساسية في AMP](/boilerplate) لبدء العمل سريعًا في إنشاء صفحات AMP. [/tip]

## الترميز المطلوب

يجب أن تتسم مستندات AMP HTML بما يلي:

القاعدة | الوصف
--- | ---
أن تبدأ بـ doctype <span dir="ltr" class="nowrap"><code><!doctype html></code></span>. | قياسي في HTML.
أن تحتوي على علامة المستوى الأعلى <span dir="ltr" class="nowrap"><code><html ⚡></code></span> (تكون <span dir="ltr" class="nowrap"><code><html amp></code></span> مقبولة كذلك). | يعرف الصفحات على أنها محتوى AMP.
أن تحتوي على العلامتين `<head>` و`<body>` (هما علامتان اختياريتان في HTML). | اختياري في HTML ولكن ليس في AMP.
أن تحتوي على العلامة <span dir="ltr" class="nowrap"><code><meta charset="utf-8"></code></span> بوصفها التابع الأول للعلامة head. | يحدد الترميز للصفحة.
أن تحتوي على العلامة <span dir="ltr" class="nowrap"><code><script async src="https://cdn.ampproject.org/v0.js"></script></code></span> بوصفها العنصر الأخير في head (يشمل هذا مكتبة <span dir="ltr" class="nowrap">AMP JS</span> ويقوم بتحميلها). | يشمل ويحمل مكتبة AMP JS.
أن تحتوي على العلامة <span dir="ltr" class="nowrap"><code><link rel="canonical" href="$SOME_URL"></code></span> داخل عنوانها، والتي تشير إلى إصدار HTML العادي لمستند <span dir="ltr" class="nowrap">AMP HTML</span> أو إلى نفسها إذا لم يكن إصدار HTML من هذا القبيل موجودًا. | يشير إلى إصدار HTML العادي لمستند AMP HTML أو إلى نفسه  في حالة عدم وجود إصدار HTML هذا. تعلم المزيد في [جعل صفحتك قابلة للاكتشاف](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md).
تضمين العلامة `<meta name="viewport" content="width=device-width">`. يوصى أيضًا بتضمين المقياس الأولي=1. | يحدد منفذ عرض الاستجابة. تعلم المزيد في [إنشاء صفحات AMP للاستجابة](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md).
يحتوي على [رمز النص الأساسي لـ AMP ](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) في علامة `<head>` الخاصة به. | النص الأساسي لـ CSS لإخفاء المحتوى أوليًا حتى تحميل AMP JS.

## البيانات الوصفية الاختيارية

بالإضافة إلى المتطلبات الجلية، يتضمن المثال الخاص بنا أيضًا تعريف Schema.org في العنوان، وهو ليس متطلبًا صارمًا لـ AMP، ولكنه متطلب لأجل توزيع المحتوى الخاص بك في أماكن معينة (على سبيل المثال في العرض الدوار لأهم قصص بحث Google).

[tip type="read-on"]زر هذه الموارد لتعلم المزيد:

- [الشروع في العمل مع AMP على بحث Google](https://developers.google.com/amp/docs) - تعلم كيفية تحضير صفحات AMP لبحث Google.
- [أمثلة بيانات التعريف](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples) - تعلم المزيد حول كافة بيانات التعريف التي ستحتاج إليها في العديد من الأماكن الأخرى  (مثل Twitter). [/tip]

<hr>

أخبار سارّة! هذا كل ما نحتاجه لإنشاء صفحتنا الأولى في AMP، لكن ليس هناك الكثير مما يجري، بطبيعة الحال، في النص الأساسي حتى اللحظة. في القسم التالي، سوف نتناول كيفية إضافة أساسيات، مثل الصور وعناصر AMP المخصصة، وكيفية إضفاء نمط على صفحتك، وتطوير تنسيق سريع الاستجابة.
