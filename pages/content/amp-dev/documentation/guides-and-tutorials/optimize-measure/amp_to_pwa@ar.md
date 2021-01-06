---
"$title": تحويل موقع AMP الخاص بك إلى تطبيق ويب تقدمي (PWA)
"$order": '10'
description: من خلال تخزين الموارد مؤقتًا داخل المتصفح، يصبح تطبيق الويب التقدمي (PWA) قادرًا على توفير البيانات والأصول والصفحات غير المتصلة بالإنترنت للمستخدم لإبقائهم مشاركين وعلى اطّلاع.
tutorial: 'true'
formats:
- websites
author: crystalonscript
---

تستفيد تطبيقات الويب التقدمية من قوة [عمال الخدمة](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) لتمكين قدرات ثرية في وضع عدم الاتصال وتجارب مستخدم متسقة عبر نقاط قوة مختلفة للشبكة. من خلال تخزين الموارد مؤقتًا داخل المتصفح، يصبح تطبيق الويب التقدمي (PWA) قادرًا على توفير البيانات والأصول والصفحات غير المتصلة بالإنترنت للمستخدم لإبقائهم مشاركين وعلى اطّلاع.

سيعلّمك هذا البرنامج التعليمي كيفية تحويل موقع AMP إلى تطبيق ويب تقدمي (PWA) قابل للتثبيت مع إمكانات غير متصلة بالإنترنت من خلال إضافة بيان ويب وعامل خدمة مدعوم من عامل خدمة AMP.

# تنزيل رمز البدء وتشغيله

قم بتنزيل [رمز البدء هنا](/static/files/tutorials/amptopwa.zip).

استخدم خادم ويب محلي لمعاينة موقع الويب.

[tip type="default"] **TIP –** للحصول على خادم ويب سريع، قم بتشغيل `python -m SimpleHTTPServer`. [/tip]

You should be able to view the landing page for Lyrical Lyghtning, the Mobile Music Magic festival. It has one link on the homepage to view the schedule and which stage the bands are on.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

قد يكون لدى مستخدمو موقعنا اتصال شبكة متقطع في الحدث عندما يرغبون على الأرجح في الوصول إلى الجدول. هذا يجعله مرشحًا رائعًا لتحويله إلى تطبيق ويب تقدمي (PWA) يمكن تثبيته على الشاشة الرئيسية للمستخدم، ويوفر جميع الوظائف الهامة حتى في حالة عدم الاتصال بالإنترنت.

# إنشاء "بيان تطبيق ويب"

[بيان تطبيق الويب ](https://developers.google.com/web/fundamentals/web-app-manifest/)هو ملف JSON بسيط يخبر المتصفح عن تطبيق الويب الخاص بك وكيف يجب أن يتصرف عند "التثبيت" على جهاز الجوّال أو سطح المكتب للمستخدم. تتطلب العديد من المتصفحات وجود بيان لعرض [موجّه الإضافة إلى الشاشة الرئيسية](https://developers.google.com/web/fundamentals/app-install-banners/).

أضف ملفًا بعنوان `manifest.json` إلى المستودع الخاص بك بالرمز التالي:

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# إضافة عامل خدمة AMP

عامل الخدمة هو برنامج نصي يشغّله متصفحك في الخلفية، بشكل منفصل عن صفحة الويب، والذي يوسّع ميزات المتصفحات من خلال تخزين الطلبات مؤقتًا لتحسين الأداء وتوفير وظائف دون اتصال. يُعد إنشاء عامل خدمة من الصفر أمرًا ممكنًا ولكنه يستغرق وقتًا طويلاً. تساعد المكتبات مثل Workbox، ولكن AMP يخطو خطوة إلى الأمام من خلال تقديم [عامل خدمة AMP](https://github.com/ampproject/amp-sw)، حيث يقوم AMP بأتمتة الكثير من الخطوات مباشرةً، بما في ذلك التخزين المؤقت لنصوص AMP النصية وأصولها ومستنداتها بالإضافة إلى تنفيذ أفضل الممارسات الشائعة مثل [التحميل المُسبق للتنقل](https://developers.google.com/web/updates/2017/02/navigation-preload).

يقوم عامل خدمة AMP تلقائيًا [بتخزين نصوص AMP النصية مؤقتًا](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching) و[المستندات](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) كما يطلبها المستخدم، بعد تثبيتها. سنبدأ بإضافة عامل خدمة AMP الأساسي.

## إنشاء ملف عامل الخدمة

أنشئ ملفًا يُسمى `sw.js` وأضِف الرمز التالي:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

باستخدام سطرين فقط من الرمز، فإن ذلك يقوم باستيراد عامل خدمة AMP إلى عامل الخدمة الخاص بك وتهيئته.

## تثبيت عامل الخدمة تلقائيًا على صفحات AMP

تستخدم مواقع AMP على الويب المكوِّن [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) لتثبيت عامل الخدمة في خلفية المتصفح، بينما يستمتع المستخدم بمحتواك.

ضع علامة النص البرمجي المطلوبة في رأس `index.html` والعنصر `<amp-install-serviceworker>` داخل `<body>`:

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **هام –** يجب عرض عامل الخدمة من الدليل الجذري (`/sw.js`) لتتمكّن من تخزين كل محتوى موقعك في ذاكرة التخزين المؤقت. [/tip]

يقوم `<amp-install-serviceworker>` بتثبيت عامل الخدمة من خلال إنشاء إطار iframe وتشغيل ملف `data-iframe-src`. أنشئ ملف `install-sw.html` وأضِف الرمز التالي:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

يسجّل iframe ملف "عامل خدمة AMP" في المتصفح.

# تخصيص ما تم تخزينه مؤقتًا

يأتي عامل خدمة AMP بمزايا مدمجة مع السماح بالحقول الاختيارية التي يمكنك تكوينها لتحسينها وفقًا لاحتياجات تطبيقك.

سيقوم تطبيق مهرجان الموسيقى الخاص بنا بتخزين أصول الصور الخاصة بنا مؤقتًا وجلب رابط الاصطفاف مُسبقًا وتحديد صفحة غير متصلة بالإنترنت.

## أصول ذاكرة التخزين المؤقت

يمكنك تكوين عامل خدمة AMP على [ذاكرة التخزين المؤقت للأصول](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching)، مثل الصور ومقاطع الفيديو والخطوط. سنستخدمها لتخزين صورة الخلفية وشعار AMP مؤقتًا. قم بفتح ملف `sw.js` وتحديثه إلى الرمز أدناه:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

لقد حدّدنا استراتيجية التخزين المؤقت لتكون [ذاكرة التخزين المؤقت أولاً](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network). يعني أن التطبيق سيحاول عرض الصور من ذاكرة التخزين المؤقت أولاً قبل طلب أي شيء من الشبكة. هذا مفيد بشكل خاص لهذا التطبيق لأننا لن نقوم بتحديث صورة الخلفية أو شعار AMP.

## روابط الجلب المُسبق

يقوم عامل خدمة AMP بجلب الروابط التي تحتوي على السمة `data-rel=prefetch` مُسبقًا. يتيح ذلك للمستخدمين عرض الصفحات غير المتصلة بالإنترنت حتى إذا لم يسبق لهم زيارتها بعد. سنضيف السمة إلى علامة الرابط الخاصة بنا لـ `lineup.html`.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# عرض صفحة غير متصلة بالإنترنت

للتعامل مع الحالات غير المتوقعة أو النقرات على روابط لصفحات لم نقم بجلبها مُسبقًا، سنضيف صفحة غير متصلة بالإنترنت لتقديم تجربة مستخدم متسقة تكون "على العلامة التجارية"، بدلاً من عرض الصفحة العامة غير المتصلة بالإنترنت للمتصفح. قم بتنزيل [`offline.html` هنا](/static/files/tutorials/offline.zip) وتحديث `sw.js` إلى الرمز التالي:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# اختبار تطبيق الويب التقدمي (PWA) الخاص بك

يمكنك اختبار أن عامل خدمة AMP الخاص بك يخزن الأصول الضرورية مؤقتًا ويقدّم حلاً مثاليًا دون اتصال بالإنترنت من خلال [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps).

سنختبر Lyrical Lyghtning من خلال فتح لوحة DevTools بالضغط على `Ctrl + Shift + I` على نظام التشغيل Windows أو `Cmd + Opt + I` على نظام التشغيل Mac.  يمكنك أيضًا النقر بزر الماوس الأيمن على الصفحة وتحديد `فحص` من القائمة. ثم حدّد `التطبيق` لعرض تسجيل عامل الخدمة الخاص بك.

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

انقر على المربع `دون اتصال` للتبديل إلى وضع دون اتصال بالإنترنت. انقر على الرابط `انظر القائمة الكاملة` وانتقل إلى `offline.html` للتحقق مما إذا تم تخزينها مؤقتًا وجلبها مُسبقًا بشكل صحيح.

[tip type="default"] **Tip –** للحصول على تحليل شامل لميزات تطبيقات ويب تقدمية، قم بتشغيل [أداة Lighhouse من Google](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool) لإنشاء تقرير. [/tip]

# تهانينا!

لقد نجحت في إنشاء تطبيق الويب التقدمي (PWA) باستخدام AMP! إنك تعلّمت في هذا البرنامج التعليمي:

- إنشاء [بيان تطبيق ويب](https://developers.google.com/web/fundamentals/web-app-manifest/)
- تثبيت عامل خدمة في AMP باستخدام [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)
- تخصيص [عامل خدمة AMP ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)
- [روابط الجلب المُسبق](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- إنشاء صفحة غير متصلة بالإنترنت

اقرأ المزيد عن [عمال الخدمة](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)و[اعتبارات تجربة المستخدم في وضع عدم الاتصال](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux). تعرّف على كيفية[تتبُّع التفاعل باستخدام التحليلات ](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html)واتّبع البرنامج التعليمي حول [كيفية تكوين التحليلات الأساسية لصفحات AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html).
