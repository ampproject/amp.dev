---
'$title': قائمة مهام نشر AMP
$order: 0
description: يدور تصميم الويب سريع الاستجابة حول إنشاء صفحات ويب مرنة تستجيب لاحتياجات المستخدم—صفحات تناسب حجم شاشة الجهاز واتجاهه. يمكنك تحقيق ...
formats:
  - websites
author: CrystalOnScript
contributors:
  - sebastianbenz
---

اتبع قائمة المهام هذه لمنح موقعك تجربة AMP الكاملة!

# تأكد من التحقق من صحة مواصفات AMP

تأتي AMP مع الكثير من المزايا المضمّنة، مثل تقليل وقت انتظار المستخدم عن طريق تحميل المحتوى مسبقًا من ذاكرة AMP للتخزين المؤقت. للحصول على هذه المزايا، يجب أن تكون الصفحات عبارة عن مستندات AMP صالحة. لا تكون الصفحات المنشورة مع وجود أخطاء تم الإبلاغ عنها بواسطة أداة AMP للتحقق من الصحة قابلة للفهرسة من خلال ذاكرة AMP للتخزين المؤقت، وربما يتم عرضها كصفحات خطأ.

لا تنشر أبدًا صفحة AMP غير صالحة مرة أخرى باستخدام هذه الأدوات:

- [التحقق من صفحات AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [أداة AMP للتحقق من الصحة](https://validator.ampproject.org/)
- [أداة اختبار Google AMP](https://search.google.com/test/amp)
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [أدوات AMP](../../../documentation/tools.html?format=websites)

# منح صفحات AMP المخزنة مؤقتًا الوصول إلى الخادم

أخبار رائعة، يتم تضمين جميع صفحات AMP الصالحة تلقائيًا داخل جميع ذاكرات AMP للتخزين المؤقت! هذا يعني أن المستخدمين لديك سيتمتعون بتجربة محتوى يتم تحميله بكفاءة وأمان. تُعتبر هذه الأنواع من التحسينات رائعة، ولكنها تأتي مع عيب صغير. إذ يتم عرض صفحات AMP لبعض المستخدمين من نطاقات لا تتطابق مع نطاقك. ويمكن أن يتسبب هذا في فقد الصفحات للوصول إلى بيانات الموقع عند استخدام مكونات AMP الديناميكية مثل [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) أو [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites). وهذه الأنواع من الأخطاء ما هي إلا مشكلات متعلقة بمشاركة الموارد عبر المنشأ أو CORS. يجب توخَ الحذر أثناء العمل، ولا تُقصّر فيه، بتمكين طلبات CORS من جميع [ذاكرات AMP للتخزين المؤقت](https://cdn.ampproject.org/caches.json) المتاحة! إذا كنت تستخدم Node.js في الواجهة الخلفية، فيمكنك استخدام [برنامج amp-cors الوسيط](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors).

تعرّف على المزيد حول منح الوصول إلى الخادم:

- [كيف يتم تخزين صفحات AMP مؤقتًا ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [CORS في AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- [برنامج AMP CORS الوسيط](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) لـ Node.js

# محتوى آمن وقابل للمشاركة مع تبادلات معتمدة

احتفظ بعنوان URL الخاص بنطاقك وقم بتبسيط التحليلات عند مشاركة المحتوى من خلال التبادلات المعتمدة (SXG). من خلال تقديم صفحات AMP باستخدام SXG، فإن التوقيعات الرقمية تحمي معلوماتك عن طريق ربط المستند بعنوان URL المرتبط به. ويتعامل هذا السلوك مع جلسات المستخدم وملفات تعريف الارتباط على أنها الطرف الأول، مما يؤدي إلى سد فجوات التحليلات المحتملة. ويوفر تطبيق SXG محتوى AMP معتمد بالإضافة إلى، أو بالأحرى بدلاً من، محتوى AMP العادي.

تعرف على المزيد حول تنفيذ التبادلات المعتمدة:

- [تقديم AMP باستخدام التبادلات المعتمدة](signed-exchange.md?format=websites)
- [تبادلات HTTP المعتمدة](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [Cloudflare AMP Real URL](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [عمليات التبادل المعتمدة للحصول على عناوين URL أفضل لصفحات AMP وتحليلات أسهل (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# اختبار الصفحات المخزنة مؤقتًا

تُخزن ذاكرات AMP للتخزين المؤقت الصور والخطوط ومحتوى الصفحة لتقديم المحتوى الخاص بك للمستخدمين بأسرع وقت يرغبون فيه. وهذا يجعل من المهم اختبار مظهر صفحات AMP وعملها بالشكل المتوقع عند عرضها من ذاكرة AMP للتخزين المؤقت.

عند إضافة صفحات AMP إلى ذاكرة AMP للتخزين المؤقت، تحقق باستخدام [أدوات المطور الخاصة بالمتصفح](https://developers.google.com/web/tools/chrome-devtools/) أن جميع الموارد الخارجية قابلة للتحميل. فيما يلي قائمة لوضعها في الاعتبار:

- الصور
- مقاطع الفيديو
- نقاط amp-analytics الطرفية
- نقاط amp-pixel الطرفية
- الخطوط المخصصة
- iframes

تعرّف على المزيد حول ذاكرات AMP للتخزين المؤقت:

- [استخدام ذاكرات Google AMP للتخزين المؤقت](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [AMP على Google، ذاكرة Google AMP للتخزين المؤقت](https://developers.google.com/amp/cache/overview)
- [حل مشكلات ذاكرة AMP للتخزين المؤقت](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [معالجة طلب ذاكرة AMP للتخزين المؤقت وتنسيق عنوان URL](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# التأكد من أن ملفات AMP قابلة للاكتشاف من خلال محركات البحث

تحتاج جميع الصفحات التي يتم تصميمها باستخدام AMP (AMP أولا) والصفحات التي تحتوي على AMP مزدوج (AMP مقترن) إلى ضمان إمكانية اكتشافها! تتطلب جميع صفحات AMP الرمز `<link rel="canonical" href="$SOME_URL">` في `<head>` الخاص بها. يجب أن ترتبط الصفحات المصممة على أساس (AMP أولا) بنفسها وستحتاج صفحات AMP المقترنة بصفحات لا تدعم AMP إلى الارتباط ببعضها البعض.

تأكد من أن بيانات [Schema.org](https://schema.org/) الوصفية الخاصة بك تضيف معلومات مفيدة! قد تتطلب المواقع ومحركات البحث الأخرى ذلك لمشاركة المحتوى الخاص بك.

تمثل روبوتات الويب، هائموا الويب، برامج الزحف أو العناكب، جميعًا أسماء للبرامج التي تبحث عن المحتوى. وهي تنتقل عبر الويب، حيث تساعد محركات البحث في فهرسة محتوى الويب بحيث يمكن لاستعلامات المستخدم إظهار النتائج الصحيحة! تأكد من أنه يمكن للباحثين العثور على موقعك من خلال تضمين الإرشادات المناسبة في ملف `robots.txt` وإعداد الترويسات المناسبة.

لا تستثني برامج الزحف من خلال ملف [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en) الخاص بك.

```
User-agent: *
Disallow: /amp/                            <= don't!
```

لا تُضف العلامة الوصفية `noindex` الخاصة بالروبوتات إلى ملفات AMP HTML الخاصة بك.

```
<meta name="robots" content="noindex" />   <= don't!
```

لا تقم بتضمين `noindex` كرأس X-Robots-Tag HTTP لملفات AMP الخاصة بك.

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

تعرّف على كيفية جعل صفحاتك قابلة للاكتشاف:

- [جعل صفحتك قابلة للاكتشاف](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [مواصفات العلامة الوصفية لبرامج الروبوت ورأس X-Robots-Tag HTTP](https://developers.google.com/search/reference/robots_meta_tag)
- [الأسئلة الشائعة حول فهرسة AMP](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# قياس معدل نقل بيانات المستخدم ورحلاته

يُعد جمع المقاييس الصحيحة أمرًا ضروريًا للقيام بتحليلات مفيدة. وعند اختبار مدى تأثير إدخال AMP في موقعك على المستخدمين، تأكد من قياس الأشياء الصحيحة. قد تظهر السلبيات غير الصحيحة أو الإيجابيات غير الصحيحة أو النتائج غير ذات الصلة إذا لم تضع التحليلات في الحسبان الاختلافات التي يمكن أن تصنعها AMP. تأكد من أنك تفهم ما الذي تبحث عنه، وكيفية قياسه!

تعرف على المزيد حول إعداد التحليلات المناسبة لـ AMP:

- [لم يحقق اختبار AMP نتائج جيدة — ماذا بعد؟](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [التحليل القائم على التخزين المؤقت مقابل التحليل غير القائم على التخزين المؤقت](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [قياس رحلات المستخدم عبر ذاكرة AMP للتخزين المؤقت وموقعك الإلكتروني](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [قياس النجاح: ما الجديد في تجارب وتحليلات AMP (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [عمليات التبادل المعتمدة للحصول على عناوين URL أفضل لصفحات AMP وتحليلات أسهل (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)
