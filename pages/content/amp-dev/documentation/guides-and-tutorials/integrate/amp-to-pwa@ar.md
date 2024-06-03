---
'$title': التحميل المسبق لتطبيق الويب التقدمي (PWA) من صفحات AMP
$order: 1
description: من الاستراتيجيات الجيدة إنشاء نقطة دخول إلى موقعك باستخدام صفحة AMP، ثم تمهيد تطبيق الويب التقدمي (PWA) خلف المشهد والتبديل إلى ...
formats:
  - websites
author: pbakaus
---

من الاستراتيجيات الجيدة **إنشاء نقطة دخول إلى موقعك من خلال صفحة AMP**، ثم **تمهيد تطبيق الويب التقدمي (PWA) خلف المشهد** والتبديل إليه لخوض رحلة تقدمية:

- يتم نشر جميع صفحات "الأوراق" للمحتوى (تلك التي تتضمن محتوى خاصًا، وليس صفحات النظرة العامة) كصفحات AMP نظرًا لأنها تتميز بتجربة تحميل شبه فورية.
- تستخدم صفحات AMP هذه العنصر الخاص من AMP وهو [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) لتمهيد ذاكرة التخزين المؤقت وواجهة PWA بينما يستمتع المستخدم بالمحتوى.
- عندما ينقر المستخدم فوق ارتباطًا آخر على موقعك (على سبيل المثال استدعاء إجراء في الأسفل لتجربة شبية بالتطبيق)، فإن عامل الخدمة يعترض الطلب، ويستحوذ على الصفحة ويقوم بتحميل واجهة PWA بدلا من ذلك.

اقرأ لتتعلم لماذا وكيف تستخدم نمط التطوير هذا.

## تحسين رحلة المستخدم من خلال الاتصال بتطبيق ويب تقدمي (PWA)

### AMP لاكتساب المستخدم الأولي

يعتبر AMP حلا مثاليًا لما يسمى **صفحات الأوراق**، وهي صفحات المحتوى التي يكتشفها المستخدمون في الأصل عن طريق محرك بحث أو ارتباط مشترك من صديق أو عن طريق موقع آخر. نظرًا لـ [العرض الأولي المخصص](../../../about/how-amp-works.html) من AMP، يتم تحميل صفحات AMP بسرعة كبيرة، ما يعني في المقابل قلة انصراف المستخدم (أظهرت [دراسة DoubleClick](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) الأخيرة أن **أكثر من 53% من جميع المستخدمين ينصرفون من الصفحة بعد 3 ثواني**).

### تطبيق الويب التقدمي (PWA) للتفاعل والانخراط الكامل

من ناحية أخرى، تسمح تطبيقات الويب التقدمية بمزيد من التفاعل والانخراط، ولكنها لا تتضمن _خصائص التحميل الأول الفوري_ مثل صفحة AMP. إنها تعتمد في الأساس على تكنولوجيا تسمى عامل الخدمة، وهو وكيل داخل عميل يسمح بالتخزين المؤقت لجميع أنواع الأصول لصفحاتك، ولكن خادم الخدمة المذكور ينشط فقط _بعد_ أول تحميل.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='مزايا وعيوب AMP مقارنة بـ PWA.') }}

## تمهيد تطبيق الويب التقدمي (PWA) باستخدام `amp-install-serviceworker`

تتميز AMP بإمكانية تثبيت عامل الخدمة لتطبيق الويب التقدمي الخاص بك من داخل صفحة AMP – نعم، حتى في حالة تقديم صفحة AMP هذه من ذاكرة AMP للتخزين المؤقت! وإذا تم تنفيذه بشكل صحيح، فسوف يعمل الارتباط المؤدي إلى PWA (من إحدى صفحات AMP الخاصة بك) بشكل فوري، مثل الوثبة الأولى إلى صفحة AMP.

[tip type="tip"] **TIP –** إذا لم تكن على دراية بعامل الخدمة، نوصيك بشدة بمطالعة [دورة Udacity](https://www.udacity.com/course/offline-web-applications--ud899) من جاك أرشيبالد. [/tip]

قم أولا بتثبيت عامل الخدمة على كافة صفحات AMP الخاصة بك باستخدام [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)، من خلال تضمين المكون أولا عن طريق النص البرمجي الخاص به في `<head>` لصفحتك:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

ثم أضف ما يلي في مكان ما داخل `<body>` الخاص بك (قم بالتعديل للإشارة إلى عامل الخدمة الفعلي لك):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

في النهاية، في خطوة تثبيت عامل الخدمة، قم بعمل تخزين مؤقت لأي موارد سوف يحتاجها تطبيق الويب التقدمي:

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
'/',
'/styles/main.css',
'/script/main.js'
];

self.addEventListener('install', function(event) {
// Perform install steps
event.waitUntil(
caches.open(CACHE_NAME)
.then(function(cache) {
console.log('Opened cache');
return cache.addAll(urlsToCache);
})
);
});
[/sourcecode]

[tip type="tip"] **تلميح –** يوجد طرق سهلة للتعامل مع عامل الخدمة. قم بإلقاء نظرة على [مكتبات مساعد عامل الخدمة](https://github.com/GoogleChrome/sw-helpers). [/tip]

## اجعل جميع الارتباطات على صفحة AMP تنتقل إلى تطبيق الويب التقدمي (PWA)

تتمثل الفرص في أن معظم الارتباطات على صفحات AMP تؤدي إلى مزيد من صفحات المحتوى. يمكن استخدام استراتيجيتين للتأكد من أن النقر على الارتباط التالي يؤدي إلى "ترقية" لتطبيق الويب التقدمي، [تبعًا للطريقة التي تستخدم بها AMP](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md):

### 1. إذا قمت بإقران صفحاتك المتعارف عليها مع صفحات AMP

في هذه الحالة لديك موقع ويب متعارف عليها (غير مدعوم منAMP) وقمت بإنشاء صفحات AMP مرتبطة بهذه الصفحات المتعارف عليها. هذه حاليًا الطريقة الأكثر شيوعًا لاستخدام AMP، ويعني أن الارتباطات على صفحات AMP سوف ترتبط على الأرجح بالإصدار المتعارف عليه لموقعك. **الخبر السار: إذا كان موقعك المتعارف عليه يمثل تطبيق ويب تقدمي (PWA)، فإنك تكون على أهبة الاستعداد**.

### 2. إذا كان موقعك المتعارف عليه هو موقع AMP

في هذه الحالة الصفحات المتعارف عليها _هي_ صفحات AMP الخاص بك: أنت تبني موقعك بالكامل باستخدام AMP، وتستخدم ببساطة AMP كمكتبة (حقيقة مبهجة: الموقع الذي تقرأه مبني بهذه الطريقة). **في هذا السيناريو، معظم الارتباطات على صفحات AMP الخاصة بك سوف تؤدي إلى صفحات AMP الأخرى.**

يمكنك الآن نشر تطبيق الويب التقدمي ( PWA) الخاص بك على مسار منفصل مثل `your-domain.com/pwa` واستخدام عامل الخدمة الذي يعمل الفعل لـ **مقاطعة تنقل المتصفح عندما ينقر شخص ما على ارتباط على صفحة AMP**:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
if (event.request.mode === 'navigate') {
event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

الشيء المثير على وجه الخصوص في هذه التقنية هو أنك تستخدم الآن التحسين التقدمي للانتقال من AMP إلى PWA. مع ذلك، هذا يعني أيضًا، أن المتصفحات التي لا تدعم عمال الخدمة سوف تنتقل من AMP إلى AMP، كما هي، ولن تنتقل أبدًا إلى PWA فعليًا.

تعمل AMP على حل هذا بشيء يسمى [إعادة كتابة shell URL](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite). وبإضافة نموذج URL احتياطي إلى علامة [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)، فإنك تعطي تعليمات إلى AMP بإعادة كتابة جميع الارتباطات المطابقة على صفحة معينة للانتقال إلى عنوان shell URL قديم، إذا لم يتم اكتشاف دعم من عامل الخدمة:

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

ونظرًا لاستعمال هذه السمات، فإن جميع عمليات النقر التالية على AMP سوف تنتقل إلى تطبيق الويب التقدمي (PWA) الخاص بك، بصرف النظر عن وجود أي عامل الخدمة.

[tip type="read-on"] **اقرأ –** لقد أحرزت بالفعل تقدمًا حتى الآن – لماذا لا تعيد استخدام صفحات AMP الموجودة لديك لبناء تطبيق ويب تقدمي (PWA) خاص بك؟ [إليك الطريقة](amp-in-pwa.md). [/tip]
