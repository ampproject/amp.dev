---
'$title': تحسين صفحات AMP المستضافة الخاصة بك
$order: 7
description: وقت تشغيل AMP تم تحسينه للحصول على السرعة وإذا عُرضت صفحات AMP الخاصة بك بواسطة ذاكرة AMP للتخزين المؤقت، فهي محسّنة بالكامل وتوفر أعلى أداء تحميل ...
formats:
  - websites
  - stories
author: sebastianbenz
---

يقدم هذا الدليل نصائح وإرشادات لمشرفي المواقع حول كيفية تحسين مواقع AMP المستضافة.

### أليست AMP سريعة بشكل افتراضي؟

يتميز وقت تشغيل AMP بأنه [محسّن للحصول على السرعة](../../../about/how-amp-works.html) وإذا عُرضت صفحات AMP الخاصة بك بواسطة ذاكرة AMP للتخزين المؤقت، فهي محسّنة بالكامل وتوفر أعلى أداء تحميل. على سبيل المثال، إذا كان المستخدمون يأتون إلى صفحات AMP الخاصة بك من "بحث Google" على الهاتف المحمول، فسيتم عرض الصفحات بواسطة ذاكرة AMP للتخزين المؤقت بشكل افتراضي.

ومع ذلك، لا يتم دائمًا عرض صفحات AMP من ذاكرة AMP للتخزين المؤقت. إذ قد يقرر الموقع الإلكتروني عرض صفحات AMP من خوادمه الخاصة لمصادر نقل بيانات أخرى. وأكثر حالات الاستخدام شيوعًا هي المواقع التي تم إنشاؤها بالكامل في إطار AMP، مثل [tasty.co](https://tasty.co)، حيث ينتقل المستخدمون مباشرة إلى الموقع. ومن بين مصادر نقل البيانات الأخرى موقع Twitter، والذي [بدأ في الارتباط بصفحات AMP](https://searchengineland.com/twitter-ramps-amp-278300) بدلاً من تقديم إصدار الجوال القياسي. هذا يعني أنه إذا نقر المستخدم على رابط في أحد تطبيقات Twitter للهاتف المحمول، فإن الرابط ينتقل إلى إصدار AMP لصفحتك على الأصل الخاص بك (إذا كان متاحًا).

ونتيجة لذلك، لا يمكنك التأكد دائمًا من أن صفحات AMP يتم عرضها فقط من ذاكرة AMP للتخزين المؤقت. في هذه الحالات، التي يتم فيها تقديم صفحات AMP من خوادمك الخاصة، من المهم التأكد من أن صفحات AMP الخاصة بك تقدم أداء التحميل الأمثل.

يجري تحميل صفحات AMP بسرعة بشكل افتراضي، ولكن هناك بعض تحسينات الأداء الإضافية التي يمكنك نشرها لمساعدة المتصفح في تحميل صفحات AMP بشكل أسرع. يصف هذا الدليل بعض التحسينات التي يجب مراعاتها عند نشر صفحات AMP. ومع ذلك، قبل أن تبدأ في قراءة هذا الدليل، تأكد من أنك قد أحطت علمًا بالفعل بجميع [الممارسات الأساسية الأفضل لأداء الويب](#basic-optimizations). على وجه الخصوص، تحسين الصور له تأثير كبير على أداء التحميل.

على سبيل المثال، من خلال تطبيق طرق التحسين التالية:

- [تحسين تحميل وقت تشغيل AMP](#optimize-the-amp-runtime-loading)
- [صورة الصفحة الرئيسية المحملة مسبقًا](#preload-hero-images) (لم يتم تغيير حجم الصورة/ الترميز نفسه)
- [تحسين الخطوط المخصصة](#optimize-custom-fonts) (في هذه الحالة، Google fonts)

يقوم [قالب "The Scenic"](../../../documentation/templates/index.html) بالتحميل [أسرع بمعدل ثانيتين على اتصال الجيل الثالث (3G)](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0).

إذا كنت تريد تخطي التفاصيل، فتحقق من [مُوّلد AMP Boilerplate](/boilerplate)، الذي يمكنك استخدامه لتوليد صفحات AMP محسنة ومخصصة.

### تحسين تحميل وقت تشغيل AMP <a name="optimize-the-amp-runtime-loading"></a>

في حين أن AMP مقيدة تمامًا بشأن الترميز المسموح به في قسم `<head>`، فما يزال هناك مجال للتحسين. الحل هو هيكلة قسم `<head>` بطريقة لكي يتم تحميل جميع النصوص البرمجية التي تعيق العرض والخطوط المخصصة بأسرع ما يمكن.

في ما يلي الترتيب الموصى به `<head>` في صفحة AMP:

[sourcecode:html]

<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="This is the AMP Boilerplate.">
    <link rel="preload" as="script" href="https://ampjs.org/v0.js">
    <link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">
    <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
    <script async src="https://ampjs.org/v0.js"></script>
    <script async custom-element="amp-experiment" src="https://ampjs.org/v0/amp-experiment-0.1.js"></script>
    <!-- Import other AMP Extensions here -->
    <style amp-custom>
      /* Add your styles here */
    </style>
    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <link rel="canonical" href=".">
    <title>My AMP Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
[/sourcecode]

لنستعرضه خطوة بخطوة:

1. يجب أن تكون العلامة الأولى هي علامة `meta charset`، متبوعة بأي علامات `meta` متبقية.

2. بعد ذلك، قم بالتحميل المسبق لعلامة وقت تشغيل AMP `v0.js` `<script>` باستخدام `<link as=script href=https://ampjs.org/v0.js rel=preload>`. يجب أن يبدأ وقت تشغيل AMP بالتحميل بأسرع وقت لأن [AMP boilerplate](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) يقوم بإخفاء المستند من خلال `body { visibility:hidden }` حتى يكتمل تحميل وقت تشغيل AMP. التحميل المسبق لوقت تشغيل AMP يُعلم المتصفح بتحميل النص البرمجي بأولوية قصوى. القِ نظرة على [العرض بجانب الخادم](#server-side-rendering) للتعرّف على كيفية تجنب هذا الأمر.

3. إذا كانت صفحتك تحتوي على إضافات تأخير العرض (على سبيل المثال، amp-experience وamp-dynamic-css-class وamp-story)، فحمِّل هذه الإضافات مسبقًا كما هو مطلوب في وقت تشغيل AMP لعرض الصفحة.

[sourcecode:html]

<link as="script" rel="preload" href="https://ampjs.org/v0/amp-custom-css-0.1.js">
<link as="script" rel="preload" href="https://ampjs.org/v0/amp-experiment-0.1.js">
<link as="script" rel="preload" href="https://ampjs.org/v0/story-1.0.js">[/sourcecode]

1. استخدم [preonnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/) لتسريع الاتصال بأصل آخر حيث لا يكون عنوان URL الكامل للمورد معروفًا مسبقًا، على سبيل المثال: عند استخدام Google Fonts:

[sourcecode:html]<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>[/sourcecode]

1. تحميل وقت تشغيل AMP:

[sourcecode:html]<script async src="https://ampjs.org/v0.js"></script>[/sourcecode]

1. حدد العلامات `<script>` لـ [امتدادات عرض التأخير](https://github.com/ampproject/amphtml/blob/main/src/render-delaying-services.js) (على سبيل المثال، [`amp-perience`](../../../documentation/components/reference/amp-experiment.md) [`amp-dynamic-css-classes` ](../../../documentation/components/reference/amp-dynamic-css-classes.md) و[`amp-story`](../../../documentation/components/reference/amp-story.md)
2. حدد علامات `<script>` للإضافات المتبقية (على سبيل المثال، [`amp-bind`](../../../documentation/components/reference/amp-bind.md) ...). لا تؤدي هذه الإضافات إلى تأخير العرض، وبالتالي لا يجب تحميلها مسبقًا لأنها قد تزيل النطاق الترددي المهم لعملية العرض الأولية.
3. حدد أي أنماط مخصصة باستخدام العلامة `<style amp-custom>`.
4. أضف أي علامات أخرى مسموح بها في قسم `<head>`. على وجه الخصوص، يجب أن تكون أي خطوط خارجية في الخطوة الأخيرة لأنها تمنع العرض.
5. أخيرًا، حدد [الشفرة المعيارية لصفحاتAMP](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md). بوضع الكود المعياري في الأخير، فإنه يمنع الأنماط المخصصة من تجاوز قواعد css المعيارية عن طريق الخطأ.

[tip] تُنفذ ذاكرة AMP للتخزين المؤقت كل هذه التحسينات تلقائيًا (وبعض التحسينات الأخرى). يمكنك استخدام أداة AMP Optimizer لإجراء هذه التحسينات تلقائيًا على مصدرك. [/tip]

### التحميل المسبق لصورة الصفحة الرئيسية <a name="preload-hero-images"></a>

[يستخدم AMP HTML عنصر الصور الخاص به: `amp-img`](../../../documentation/components/reference/amp-img.md). بينما يوجد لدى [`amp-img`](../../../documentation/components/reference/amp-img.md) مميزات أكثر من علامة HTML التقليدية، `img` وأحد العيوب يتمثل في أنه يجب تحميل وقت تشغيل AMP قبل أن يبدأ تنزيل الصورة. بالنسبة لبعض الصور، مثل الصورة الرئيسية لصفحة منتج ما، من المهم أن يتم تحميل الصور بأسرع ما يمكن. وفي هذه الحالات، من الأفضل تحميل الصورة مسبقًا للتأكد من أن المتصفح يبدأ تنزيل الصورة في أسرع وقت ممكن ولا يحتاج إلى الانتظار حتى يتم تحميل وقت تشغيل AMP.

[sourcecode:html]

<head>
  <link rel="preload" href="/images/elephants.png" as="image">
</head>
<body>
  ...
  <amp-img width="404" height="720" layout="responsive"
           src="/images/elephants.png" alt="..." >
  </amp-img>
</body>
[/sourcecode]

ولكن ماذا لو كان تخطيطك سريع الاستجابة يتطلب صور صفحة رئيسية مختلفة اعتمادًا على عرض الشاشة؟ على سبيل المثال، صورة عريضة لأجهزة الكمبيوتر وصورة ضيقة للجوال مثل هذه:

[sourcecode:html]
<amp-img width="404" height="720"
    alt="..." layout="responsive"
    src="/images/elephants_narrow.png"
    media="(max-width: 415px)">
</amp-img>
<amp-img height="720"
    alt="..." layout="fixed-height"
    src="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
</amp-img>
[/sourcecode]

الشيء الجيد هو أن `link rel=preload` يدعم أيضًا استعلامات الوسائط. لذلك يمكننا استخدام نفس عِبارات الوسائط في بيانات التحميل المسبق، مثل هذا:

[sourcecode:html]

<link rel="preload" as="image"
    href="/images/elephants_narrow.png"
    media="(max-width: 415px)">
<link rel="preload" as="image"
    href="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
[/sourcecode]

بالمناسبة، تعمل نفس الطريقة مع صور ملصق [`amp-video`](../../../documentation/components/reference/amp-video.md):

[sourcecode:html]

<link rel="preload" href="/images/poster.jpg" as="image">
...
 <amp-video width="480" height="270" src="elephant.mp4"
             poster="/images/poster.jpg"
             layout="responsive">
     ...
</amp-video>
[/sourcecode]

فقط تأكد من وضع عِبارات التحميل المسبق _بعد_ تصريح منفذ العرض لأن المتصفح يحتاج إلى أبعاد منفذ العرض لتحديد عرض الشاشة:

[sourcecode:html]

<meta name="viewport" content="width=device-width">
...
<link rel="preload" media="(max-width: 415px)" ...>
[/sourcecode]

[tip type="important"] حمِّل الصور المهمة فقط مسبقًا، وإلا فقد يستهلك تنزيل الصور النطاق الترددي المطلوب لتنزيلات مهمة أخرى. [/tip]

### ضع في اعتبارك استخدام عامل خدمة

الآن بعدما أصبحت جميع [المتصفحات الرئيسية تدعم عمال الخدمة](https://caniuse.com/#feat=serviceworkers)، من الجيد تقييم ما إذا كان من المنطقي إضافة عامل خدمة إلى موقعك.

هناك نوعان من الأنماط الهيكلية المختلفة التي نعلم أنها ستعمل من أجل تنقلات سريعة موثوقة:

- بالنسبة للتطبيقات أحادية الصفحة: نموذج App Shell (في سياق AMP المُشار إليه باسم [AMP-in-PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)). يتطلب هذا النمط من عامل الخدمة ترقية مستند AMP إلى تجربة PWA المستندة إلى app-shell.
- للتطبيقات متعددة الصفحات: [تدفق الموارد المُركّبة](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses). يقوم عامل الخدمة بتخزين الرأس والتذييل الثابت مؤقتًا ويستخدم التدفق لإرجاع استجابة جزئية مخزنة مؤقتًا أثناء تحميل المحتوى.

إذا لم يتم استخدام أي من هذه الأنماط ولم يكن من الممكن تخزين الموقع الإلكتروني بالكامل مؤقتًا (وهو أمر معقول فقط للمواقع الصغيرة جدًا)، فقد يكون لعامل الخدمة [تأثير سلبي على الأداء](https://developers.google.com/web/updates/2017/02/navigation-preload). أفضل شيء في هذه الحالة هو **عدم** الاستعانة بعامل خدمة.

ومع ذلك، إذا كنت تريد أن يكون موقعك الإلكتروني [قابلاً للتثبيت من الشاشة الرئيسية](https://developers.google.com/web/fundamentals/app-install-banners/)، أو تريد تقديم تجربة غير متصلة بالإنترنت، فسيتعين عليك استخدام عامل خدمة. في هذه الحالة، من المهم استخدام [التحميل المسبق للتنقل](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw) للتخفيف من التباطؤ المحتمل (ملاحظة: حاليًا، التحميل المسبق للتنقل مدعوم فقط في متصفح Chrome).

إذا كان موقع AMP الإلكتروني الخاص بك يستخدم عامل خدمة، فيما يلي بعض أفضل الممارسات:

- تخزين [وقت تشغيل AMP](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime) والإضافات مؤقتًا (مثل [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md)).
- التخزين المؤقت للشعارات والخطوط والمحتويات الثابتة الأخرى المستخدمة في معظم صفحاتك.
- عرض الشعارات والخطوط والصور باستخدام [إستراتيجية التخزين المؤقت أولاً (cache-first)](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network).
- عرض وقت تشغيل AMP والإضافات باستخدام إستراتيجية [stale-while-revalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate).
- عند استخدام إستراتيجية الشبكة أولاً (network-first) لطلبات التنقل، تأكد من تمكين [التحميل المسبق للتنقل](https://developers.google.com/web/updates/2017/02/navigation-preload).

إذا كنت تبحث عن طريقة للبدء مع عامل خدمة في موقع AMP الإلكتروني الخاص بك، فتحقق من هذا [النموذج](https://www.google.com/url?q=https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449&sa=D&ust=1529413323498000&usg=AFQjCNE4fepX-hqVeRBW8df43uV5Bi4Llg) الذي يوفر عامل خدمة يقوم بتنفيذ كل هذه الممارسات المثالية.

[tip type="note"] يتم تقديم وقت تشغيل AMP بحد أقصى 50 دقيقة فقط لضمان توفر التحديثات بسرعة. لتجنب احتمال فقدان ذاكرة التخزين المؤقت للمتصفح، لذلك من الجيد تقديم وقت تشغيل AMP من عامل الخدمة. [/tip]

لا تقتصر أهمية التخزين المؤقت المسبق على الانتقال من صفحات AMP المخزنة مؤقتًا إلى صفحات لا تدعم AMP في المصدر الخاص بك، ولكن أيضًا للانتقال من صفحات AMP المخزنة مؤقتًا إلى صفحات AMP الموجودة في المصدر الخاص بك. والسبب هو أن ذاكرة AMP للتخزين المؤقت تُعيد كتابة عناوين URL لوقت تشغيل AMP من عنوان URL ثابت إلى أحدث إصدار تم إصداره، على سبيل المثال:

`https://ampjs.org/v0.js` -> `https://ampjs.org/rtv/001515617716922/v0.js`.

والنتيجة هي أن صفحة AMP التي يتم عرضها من مصدرك لا تستفيد من التخزين المؤقت للمتصفح وفي هذه الحالة يجب تنزيل وقت تشغيل AMP (بدون إصدار) مرة أخرى. باستخدام عامل الخدمة، يمكنك تخزين وقت تشغيل AMP الذي يأتي بدون إصدار بشكل مؤقت وتسريع عملية النقل. لمعرفة المزيد حول سبب إنشاء ذاكرة AMP للتخزين المؤقت نسخة جديدة من عناوين URL لوقت تشغيل AMP، اقرأ [هذا المستند](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer##versioned-amp-runtime).

[tip type="note"] في متصفح Safari، هناك اختلاف رئيسي في كيفية نشر عمال الخدمة -- لا يمكن في Safari تثبيت عامل خدمة للمصدر الخاص بك، إذا تم عرض الصفحة من ذاكرة AMP للتخزين المؤقت. [/tip]

### تحسين الخطوط المخصصة <a name="optimize-custom-fonts"></a>

مع AMP، هناك بعض الأشياء التي يمكنك القيام بها لتحسين تحميل الخط ([معظمها في الواقع لا يقتصر على AMP](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)):

- إذا كان ذلك ممكنًا، استخدم [font-display: optional](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display): سيستخدم هذا الخيار الخط فقط إذا كان موجودًا بالفعل في ذاكرة التخزين المؤقت، ويرجع إلى استخدام خط النظام إذا لم يتم تحميل خطك المخصص بعد.
- تحسين خطوط الويب الخاصة بك (على سبيل المثال، عرض الخطوط المخصصة باستخدام WOFF2).
- التحميل المسبق لخطوط مخصصة:

[sourcecode:html]

<link rel="preload" as="font" href="/bundles/app/fonts/helveticaneue-roman-webfont.woff2" >[/sourcecode]

- If you are using Google fonts, or any other font provider with unknown font URLs, preconnect the respective font server:

[sourcecode:html]

 <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
[/sourcecode]

أخيرًا وليس آخرًا، حاول تقليل عدد الخطوط المخصصة التي تستخدمها على صفحتك. إذا استطعت، استخدم خطوط النظام بدلاً من الخطوط المخصصة لأن خطوط النظام تجعل موقع الويب الخاص بك يتطابق مع نظام تشغيل المستخدم، ويساعد على تجنب تحميل المزيد من الموارد.

### تخطيطات AMP الخاصة بالعرض من جانب الخادم <a name="server-side-rendering"></a>

تخطيطات AMP الخاصة بالعرض من جانب الخادم هي تقنية تستخدمها ذاكرة AMP للتخزين المؤقت لزيادة سرعة وقت التحميل. باستخدام العرض من جانب الخادم، من الممكن إزالة AMP boilerplate بحيث يمكن رسم مستند AMP بدون تشغيل JavaScript وقت تشغيل AMP. على سبيل المثال، النسخة المعروضة على جانب الخادم من مولد نصوص AMP الأساسية [تُعرض مرتين أسرع](https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&thumbSize=200&ival=500&end=visual) من إصدار AMP العادي!

إذا كنت تنشر صفحة AMP، فعليك التفكير في استخدام [محسن AMP](amp-optimizer-guide/index.md). حيث تتيح لك محسنات AMP عرض صفحات AMP المحسّنة من طرفك التي تتضمن تخطيطات AMP الخاصة بالعرض على جانب الخادم. ويقوم محسن AMP تلقائيًا بإجراء العديد من التحسينات الأخرى الموضحة في هذا المستند أيضًا.

### التحسينات الأساسية <a name="basic-optimizations"></a>

بالطبع، تنطبق جميع أساسيات تحسينات أداء الويب أيضًا على صفحات AMP:

- [تحسين الصور](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) ومقاطع الفيديو. يمكن أن يكون لتحسين الصور تأثير كبير على أداء التحميل.
- [ضغط رموز CSS وHTML وتصغيرها](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer). نظرًا لأن جميع رموز CSS في صفحات AMP مضمنة، فمن المفيد استخدام شيء مثل [purifycss](https://github.com/purifycss/purifycss) لإزالة رموز CSS غير المستخدمة.
- استخدام [تخزين HTTP المؤقت](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- ... و<a>المزيد</a>
