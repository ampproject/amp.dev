---
"$title": قائمة مهام نشر AMP
"$order": '0'
description: يدور تصميم الويب سريع الاستجابة حول إنشاء صفحات ويب مرنة تستجيب لاحتياجات المستخدم—صفحات تناسب حجم شاشة الجهاز واتجاهه. يمكنك تحقيق ...
formats:
- websites
author: CrystalOnScript
contributors:
- sebastianbenz
---

اتبع قائمة المهام هذه لمنح موقعك تجربة AMP الكاملة!

# تأكد من التحقق من صحة مواصفات AMP

AMP comes with a ton of built in benefits, such as decreasing user wait time by preloading content from AMP Caches. To get these benefits, pages must be valid AMP documents. Pages published with errors reported by the AMP validator are not indexable by AMP Caches, and possibly served as error pages.

لا تنشر أبدًا صفحة AMP غير صالحة مرة أخرى باستخدام هذه الأدوات:

- [Validate AMP pages](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [The AMP Validator ](https://validator.ampproject.org/)
- [Google AMP Tester](https://search.google.com/test/amp)
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [AMP Tools](../../../documentation/tools.html?format=websites)

# منح صفحات AMP المخزنة مؤقتًا الوصول إلى الخادم

Great news, valid AMP pages automatically opt into all existing AMP Caches! This means your users experience content that loads efficiently and safely. These types of optimizations are great, but come with a small catch. Some users will be served AMP pages from domains that do not match your own. This can cause pages to lose access to site data when using dynamic AMP components such as [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) or [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites). These types of errors are Cross-Origin Resource Sharing, or CORS, issues. Work with safety, not against it, by enabling CORS Requests from all available [AMP Caches](https://cdn.ampproject.org/caches.json)! If you're using Node.js in your backend, you can use the [amp-cors middleware](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors).

تعرّف على المزيد حول منح الوصول إلى الخادم:

- [كيف يتم تخزين صفحات AMP مؤقتًا ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [CORS في AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- [برنامج AMP CORS الوسيط](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) لـ Node.js

# محتوى آمن وقابل للمشاركة مع تبادلات معتمدة

Keep your domain's URL and simplify analytics when sharing content through signed exchanges (SXG). By serving AMP pages with SXG, digital signatures protect your information by tying the document to its claimed URL. This behavior treats user sessions and cookies as first party, closing possible analytics gaps. Implementing SXG delivers signed AMP content in addition to, rather than instead of, regular AMP content.

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

Pages only build in AMP(AMP first) and pages with a AMP double(paired AMP) all need to ensure they are discoverable! All AMP pages required the `<link rel="canonical" href="$SOME_URL">` in their `<head>`. AMP first pages need to link to themselves and AMP pages paired to a non-AMP page will need to link link to each other.

تأكد من أن بيانات [Schema.org](https://schema.org/) الوصفية الخاصة بك تضيف معلومات مفيدة! قد تتطلب المواقع ومحركات البحث الأخرى ذلك لمشاركة المحتوى الخاص بك.

Web Robots, Web Wanderers, Crawlers or Spiders, are all names for programs that search for content. They traverse the web, helping search engines index web content so that user's queries can surface the correct results! Make sure your seekers can find your site by including the proper instructions in the `robots.txt` file and set up the appropriate headers.

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

Gathering correct metrics is essential to useful analytics. When testing how introducing AMP to your site impacts users, ensure you're measuring the correct things. False negatives, false positives, or irrelevant results may arise if analytics don't account for the differences AMP can create. Make sure you understand what to look for, and how to measure it!

تعرف على المزيد حول إعداد التحليلات المناسبة لـ AMP:

- [لم يحقق اختبار AMP نتائج جيدة — ماذا بعد؟](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [التحليل القائم على التخزين المؤقت مقابل التحليل غير القائم على التخزين المؤقت](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [قياس رحلات المستخدم عبر ذاكرة AMP للتخزين المؤقت وموقعك الإلكتروني](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [قياس النجاح: ما الجديد في تجارب وتحليلات AMP (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [عمليات التبادل المعتمدة للحصول على عناوين URL أفضل لصفحات AMP وتحليلات أسهل (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)
