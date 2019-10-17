---
$title: "Analytics: الأساسيات"
---

ابدأ من هنا للتعرّف على أساسيات تحليلات AMP.

## هل تستخدم <span dir="ltr" class="nowrap">amp-pixel</span> أو <span dir="ltr" class="nowrap">amp-analytics</span>؟ <a name="use-amp-pixel-or-amp-analytics"></a>

توفر AMP مكونين للوفاء باحتياجاتك بخصوص التحليلات والقياس:
[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) وأيضًا
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
يرسل كلّ من الخيارين بيانات التحليلات إلى نقطة نهائية محددة.

إذا كنت بصدد البحث عن أداء، مثل
[بكسل التتبع](https://en.wikipedia.org/wiki/Web_beacon#Implementation) البسيط،
فإن المكون <span dir="ltr" class="nowrap">[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)</span> يوفر تتبع عرض صفحة أساسية،
ويتم إرسال بيانات مشاهدة الصفحة إلى عنوان URL محدّد.
بعض عمليات الدمج مع المورّد قد تتطلب هذا المكون،
وفي هذه الحالة سوف تحدد هي النقطة النهائية الدقيقة لعنوان URL.

بالنسبة لغالبية حلول التحليلات، استخدم <span dir="ltr" class="nowrap">[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)</span>.
يعمل تتبع مشاهدة الصفحة في <span dir="ltr" class="nowrap">[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)</span> أيضًا.
لكن يمكنك كذلك تتبع تفاعل المستخدم مع أي نوع من أنواع محتوى الصفحة،
بما في ذلك النقرات على الروابط والأزرار.
ويمكنك قياس لأي مدى قام المستخدم بالتمرير عبر الصفحة،
وما إذا كان المستخدم متفاعلاً مع الشبكات الاجتماعية أم لا، والمزيد
(انظر
[نظرة عميقة على AMP Analytics](deep_dive_analytics.md)).

كجزء من الدمج مع النظام الأساسي لـ AMP،
قدم المزودون تهيئات <span dir="ltr" class="nowrap">[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)</span> مسبقة التحديد
لكي يسهُل التقاط البيانات ودفعها إلى أدوات التتبع لديهم.
يمكنك الوصول إلى مستندات المورّد من
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

يمكنك استخدام كلّ من <span dir="ltr" class="nowrap">[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)</span> و<span dir="ltr" class="nowrap">[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)</span> في صفحاتك:
<span dir="ltr" class="nowrap">[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)</span> لتتبع عرض صفحات يتسم بالبساطة،
و<span dir="ltr" class="nowrap">[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)</span> لكل الميزات الأخرى.
يمكنك أيضًا إضافة مضاعفات كل علامة.
إذا كنت بصدد العمل مع مزوّدي تحليلات عديدين،
فسوف تحتاج إلى علامة واحدة لكل حل.
ضع في اعتبارك أنه كلما كانت صفحات AMP أكثر بساطة، كان ذلك أفضل للمستخدمين،
ولهذا إذا كنت لا تحتاج علامات إضافية، فلا تستخدمها.

## إنشاء تهيئة تحليلات بسيطة

تعرّف على كيفية إنشاء تهيئة تحليلات
[<span dir="ltr" class="nowrap">amp-pixel</span>](../../../../documentation/components/reference/amp-pixel.md) و
[<span dir="ltr" class="nowrap">amp-analytics</span>](../../../../documentation/components/reference/amp-analytics.md)بسيطة.

### تهيئة amp-pixel بسيطة

لإنشاء تهيئة <span dir="ltr" class="nowrap">[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)</span> بسيطة،
أدرج شيئًا ما، مثل ما يلي، في نص صفحتك في AMP:

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

في هذا النموذج،
يتم إرسال بيانات مشاهدة الصفحة إلى عنوان URL محدد مع رقم عشوائي.
المتغير `RANDOM` هو واحد من كثير من
[متغيرات الاستبدال في النظام الأساسي لـ AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).
تعرّف على المزيد بشأن
[استبدال المتغير](analytics_basics.md) هنا.

يتسم المكون [<span dir="ltr" class="nowrap">amp-pixel</span>](../../../../documentation/components/reference/amp-pixel.md)
بأنه مدمج،
وبذلك لن تحتاج إلى تصريح تضمين، مثل ما تفعله
لمكونات AMP الموسّعة، بما في ذلك <span dir="ltr" class="nowrap">[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)</span>.
لكن عليك وضع العلامة <span dir="ltr" class="nowrap">[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)</span> في أقرب موضع ممكن
من بداية `<body>`.
لن يتم تنشيط بكسل التتبع إلا عند إظهار العلامة لنفسها.
إذا كان موضع <span dir="ltr" class="nowrap">[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)</span> قريبًا من أسفل الصفحة،
فقد لا يتم تنشيطه.

### تهيئة amp-analytics بسيطة

لإنشاء تهيئة
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) بسيطة،
يجب عليك تضمين هذا التصريح بشأن <span dir="ltr" class="nowrap">`custom-element`</span>
في `<head>` لمستند AMP (انظر أيضًا
[تصريح بشأن تضمين مكون](../../../../documentation/components/index.html)):

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

النموذج التالي مشابه [للنموذج <span dir="ltr" class="nowrap">`amp-pixel`</span>](../../../../documentation/components/reference/amp-pixel.md).
كلما تكون صفحة ما مرئية،
يتم تنشيط حدث المشغل ويتم إرسال
بيانات مشاهدة الصفحة إلى عنوان URL محدد مع رقم تعريف عشوائي:

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

في النموذج أعلاه، حددنا طلبًا يُسمى مشاهدة الصفحة لكي يكون `https://foo.com/pixel?RANDOM`. كما قلنا في نقاش سابق، يحل رقم عشوائي محل القيمة RANDOM وبذلك سينتهي الحال بالطلب إلى أن يبدو مثل هذا `https://foo.com/pixel?0.23479283687235653498734`.

عندما تصبح الصفحة مرئية
(على النحو المحدد عبر استخدام الكلمة الرئيسية للمشغل `visible`)،
يتم تشغيل حدث ويتم إرسال الطلب `pageview`.
تحدد السمة triggers متى يتم تنشيط طلب مشاهدة الصفحة.
تعرّف على المزيد بشأن السمتين [requests وtriggers](deep_dive_analytics.md).

## استبدال المتغير <a name="variable-substitution"></a>

يسمح كلّ من المكون [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) وكذلك
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) بكل
عمليات استبدال متغير عنوان URL القياسية (انظر
[عمليات استبدال متغير <span dir="ltr" class="nowrap">AMP HTML</span>](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)).
في النموذج التالي،
يتم إرسال طلب مشاهدة الصفحة إلى عنوان URL،
مع عنوان URL المتعارف عليه لمستند AMP الحالي، وعنوانه، فضلاً عن
[رقم تعريف العميل](analytics_basics.md#user-identification):

```html
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
```

نظرًا لبساطتها،
يمكن للعلامة <span dir="ltr" class="nowrap">[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)</span> أن تتضمن فقط المتغيرات المحددة بواسطة النظام الأساسي
أو تلك التي يمكن لوقت تشغيل AMP تحليلها من صفحة AMP.
في النموذج أعلاه،
يملأ النظام الأساسي القيم لكل من
`canonicalURL` و<span dir="ltr" class="nowrap">`clientId(site-user-id)`</span>.
ويمكن أن تتضمن العلامة <span dir="ltr" class="nowrap">[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)</span> المتغيرات نفسها، مثل <span dir="ltr" class="nowrap">[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)</span>،
فضلاً عن المتغيرات ذات التحديد الفريد داخل تهيئة العلامة.

استخدم التنسيق `{varName}$` في سلسلة طلب لمتغير محدد بواسطة صفحة
أو نظام أساسي.
سوف تستبدل العلامة <span dir="ltr" class="nowrap">[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)</span> القالب بقيمته الفعلية
في وقت إنشاء طلب التحليلات (انظر أيضًا
[المتغيرات المدعومة في <span dir="ltr" class="nowrap">amp-analytics</span>](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

في نموذج <span dir="ltr" class="nowrap">[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)</span> التالي،
يتم إرسال طلب مشاهدة الصفحة إلى عنوان URL،
مع البيانات الإضافية المستخلصة من عمليات استبدال المتغير،
البعض يوفره النظام الأساسي
والبعض الآخر يتم تحديده بشكل مضمّن،
ضمن التهيئة <span dir="ltr" class="nowrap">[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)</span>:

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
    "someEvent": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
      }
    }
  }
}
</script>
</amp-analytics>
```

في النموذج أعلاه،
يتم تحديد المتغيرين `account` و`title` في
التهيئة <span dir="ltr" class="nowrap">[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)</span>.
لا يتم تحديد المتغيرين `canonicalUrl` و`clientId` في التهيئة،
وبذلك يتم استبدال قيمهما عن طريق النظام الأساسي.

**مهم:** يتسم استبدال المتغيرات بالمرونة؛
فمن المكن تحديد المتغيرات نفسها في مواقع مختلفة،
وسوف يحلل وقت تشغيل AMP القيم بهذا الترتيب المستند إلى الأسبقية
(انظر [ترتيب استبدال المتغير](deep_dive_analytics.md).

## هوية المستخدم <a name="user-identification"></a>

تستخدم مواقع الويب ملفات تعريف الارتباط لتخزين المعلومات الخاصة بمستخدم ما في المتصفح.
يمكن استخدام ملفات تعريف الارتباط للإخبار بأن مستخدمًا ما زار موقع ويب من قبل.
في AMP،
يمكن عرض الصفحات إما من موقع ويب ناشر، أو من ذاكرة التخزين المؤقت
(مثل <span dir="ltr" class="nowrap">Google AMP Cache</span>).
من المرجّح أن يكون لموقع ويب الناشر وذاكرة التخزين المؤقت نطاقات مختلفة.
لأسباب تتعلق بالأمان،
يمكن للمتصفحات (وستفعل غالبًا) تحديد إمكانية الوصول إلى ملفات تعريف الارتباط التابعة للنطاق الآخر
(انظر أيضًا
[تتبع المستخدمين عبر الأصول](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/cross-origin-tracking.md)).

افتراضيًا،
سوف تدير AMP توفير معرّف العميل سواء أكان الوصول إلى الصفحة يتم من موقع الويب الأصلي للناشر أم عبر ذاكرة تخزين مؤقت.
يمتلك رقم تعريف العميل الذي يتم إنشاؤه عبر AMP القيمة `"amp-"`
متبوعةً بسلسلة عشوائية مشفرة بواسطة `base64` ويظل الأمر كذلك
للمستخدم إذا كان المستخدم نفسه يزور الموقع مرة أخرى.

تدير AMP عمليتي القراءة والكتابة لمعرّف العميل في كل الأحوال.
ويكون هذا ملحوظًا بصفة خاصة في حالة عرض الصفحة
عبر ذاكرة تخزين مؤقت أو إظهارها بطريقة أخرى خارج سياق العرض
لموقع الويب الأصلي للناشر.
في هذه الحالة، لا يكون الوصول إلى ملفات تعريف الارتباط التابعة لموقع ويب الناشر متاحًا.

عند عرض صفحة AMP من موقع ويب ناشر،
يمكن الإخبار عن إطار عمل معرّف العميل الذي تستخدمه AMP لملف تعريف ارتباط احتياطي
للبحث عنه واستخدامه.
في هذه الحالة،
يتم تفسير وسيطة `cid-scope-cookie-fallback-name` للمتغير `clientId` بوصفها تمثل
اسم ملف تعريف ارتباط.
قد يظهر التنسيق إما مثل
<span dir="ltr" class="nowrap">`CLIENT_ID(cid-scope-cookie-fallback-name)`</span> أو
<span dir="ltr" class="nowrap">`${clientId(cid-scope-cookie-fallback-name)}`</span>.

على سبيل المثال:

```html
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
```

إذا وجدت AMP أن ملف تعريف الارتباط هذا تم تعيينه،
فسوف يعرض استبدال معرّف العميل قيمة ملف تعريف الارتباط.
إذا وجدت AMP أن ملف تعريف الارتباط هذا غير معيّن،
فسوف تنشئ AMP قيمة للنموذج `amp-` متبوعةً
بسلسلة عشوائية مشفرة بواسطة base64.

تعرّف على المزيد بشأن استبدال رقم تعريف العميل،
بما في ذلك كيفية إضافة معرّف إشعار مستخدم اختياري، في
[المتغيرات المدعومة في تحليلات AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).
