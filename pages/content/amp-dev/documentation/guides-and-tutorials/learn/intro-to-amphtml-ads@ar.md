---
'$title': مقدمة لإعلانات AMPHTML
$order: 1
description: تُعد إعلانات AMPHTML طريقة أسرع وأبسط وأكثر أمانًا للإعلان على الويب. على الرغم من أن صفحات AMP تدعم إعلانات HTML التقليدية، فقد تكون هذه الإعلانات بطيئة في التحميل.
formats:
  - ads
---

## ما هو إعلان AMPHTML؟

تُعد إعلانات AMPHTML طريقة أسرع وأبسط وأكثر أمانًا للإعلان على الويب. على الرغم من أن صفحات AMP تدعم إعلانات HTML التقليدية، فقد تكون هذه الإعلانات بطيئة في التحميل. ولإنشاء الإعلانات بسرعة باقي صفحات AMP نفسها، يمكنك إنشاء إعلانات بتنسيق AMPHTML. ولا يتم عرض إعلانات AMPHTML إلا بعد التحقق من صحتها، مما يضمن أمان الإعلانات وفاعليتها. الأهم من ذلك كله، يمكن عرض هذه الإعلانات في أي مكان على الويب، _وليس على صفحات AMP فقط_.

فيما تتم كتابة إعلانات AMPHTML بلغة AMP HTML وفقًا [لمواصفات إعلانات AMPHTML](a4a_spec.md) (أحد أشكال AMP HTML + CSS). ,هذا يعني أن الإعلانات لم تعد قادرة على تشغيل JavaScript عشوائي، والذي يعد السبب الأول لضعف أداء الإعلان على نحو تقليدي. لذا، وعلى غرار AMP الأساسي تمامًا، تم دمج حالات استخدام JavaScript للإعلانات الأساسية في مشروع AMP مفتوح المصدر الذي يضمن السلوك الجيد من الإعلانات.

### المزايا

لماذا تُعد إعلانات AMPHTML أفضل من الإعلانات التقليدية؟

1. **أسرع**: تكون إعلانات AMPHTML أسرع لأنه يتم طلب الإعلانات في وقت مبكر من عملية عرض الصفحة، ويتم عرضها على الفور قبل أن يوشك المستخدم على عرض الإعلان. ويؤدي تقليل حجم ملف إعلانات AMPHTML أيضًا إلى زيادة السرعة.
2. **أبسط**: تجمع إعلانات AMPHTML بين وظيفية الإعلان شائعة الاستخدام، الأمر الذي يقلل حجم ملف الإعلان. وبمجرد وصولها إلى الصفحة، تستهلك إعلانات AMPHTML أيضًا موارد أقل. على سبيل المثال، بدلًا عن طلب 10 متتبعين معلوماتهم الخاصة في الإعلانات العادية، تجمع إعلانات AMPHTML جميع البيانات مرة واحدة وتوزعها على أي عدد من المتتبعين المهتمين.
3. **منسَّقة**: في صفحات AMP، يمكن [لوقت تشغيل AMP](spec/amphtml.md#amp-runtime) تنسيق الموارد المحدودة للهاتف المحمول مع المكون الصحيح في الوقت المناسب لمنح أفضل تجربة للمستخدم. على سبيل المثال، يتم إيقاف إعلانات AMPHTML ذات الرسوم المتحركة مؤقتًا عندما لا تكون الإعلانات موجودة في منفذ العرض الحالي.
4. **أكثر انخراطًا**: لا يمكن للمستخدمين التعامل مع الإعلانات التي لا يمكنهم رؤيتها. إذ تؤدي الإعلانات الأسرع إلى إمكانية عرض أعلى وبالتالي زيادة معدلات نقرات العبور، مما يؤدي في النهاية إلى أداء إعلان أفضل.
5. **آمنة من البرامج الضارة**: من المستحيل نشر برامج ضارة باستخدام إعلانات AMPHTML لأنه يتم التحقق من الإعلانات قبل عرضها. لهذا السبب، يمكن للمعلنين ضمان تجربة مستخدم آمنة وتصور إيجابي للعلامة التجارية.
6. **أكثر مرونة**: تم تصميم إعلانات AMPHTML للعمل على كل من صفحات ويب AMP وصفحات الويب بغير تنسيق AMP، وكذلك عبر أي جهاز.

### التنسيقات

تتميز إعلانات AMPHTML بالمرونة والديناميكية، مما يسمح بالعديد من التنسيقات الإبداعية مثل carousel وparallax وlightbox، على سبيل المثال لا الحصر. استفد من نماذج إعلانات AMPHTML <a class="" href="https://gitlocalize.com/repo/4863/ar/pages/content/amp-dev/documentation/examples/index.html">مفتوحة المصدر في أمثلة </a>.

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>Carousel</td>
    <td>Video Parallax</td>
    <td>Lightbox</td>
  </tr>
</table>

## طريقة عمل إعلانات AMPHTML

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Serving AMPHTML ads to AMP pages', caption='Serving AMPHTML ads to AMP pages', align='' ) }}

1. يُدرج الناشرون شريحة إعلانية في صفحة AMP الخاصة بهم عبر العلامة [`amp-ad`](../../../documentation/components/reference/amp-ad.md)، مع تحديد شبكة الإعلانات التي يرغبون في استخدامها.
2. يرسل وقت تشغيل AMP طلب إعلان إلى شبكة الإعلانات المحددة لاسترداد الإعلان. وتوفر شبكات الإعلانات القادرة على عرض إعلانات AMPHTML [تنفيذ الإحضار السريع](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/Network-Impl-Guide.md) الذي يتحقق من صحة التصميم ويوقع عليه.
3. تستجيب شبكة الإعلانات بإعلان AMPHTML ويعرض وقت تشغيل AMP الإعلان على صفحة AMP.

[tip type="note"] لا حاجة إلى تكامل خاص لعرض إعلانات AMPHTML على الصفحات بغير بتنسيق AMP. تحقق من شبكة الإعلانات لديك لمعرفة ما إذا كانت تدعم إعلانات AMPHTML أم لا. [/tip]

## عرض إعلانات AMPHTML

### الناشرون

لعرض أشكال الإعلانات التي تُباع مباشرةً في AMPHTML، يجب عليك إنشاء الإعلانات وفقًا لـ [مواصفات إعلانات AMPHTML](a4a_spec.md) وتقديمها باستخدام خادم إعلانات يدعم عرض إعلانات AMPHTML. أما حاليًا، تدعم خوادم الإعلانات التالية إعلانات AMPHTML:

- DoubleClick للناشرين
- TripleLift
- Dianomi
- Adzerk
- Google AdSense

لعرض إعلانات AMPHTML عبر قنواتك غير المباشرة (مثل exchange وSSP وما إلى ذلك)، استخدم شبكة إعلانات/خادم إعلانات داعمًا في [القائمة التالية](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md).

### وكالات إبداعية

إذا كنت تمثل وكالة إبداعية، فيجب عليك إنشاء الإعلانات وفقًا [لمواصفات إعلان AMPHTML ](a4a_spec.md). لاستلهام أفكار والحصول على أمثلة، راجع نماذج إعلانات AMPHTML مفتوحة المصدر على [أمثلة](../../../documentation/examples/index.html). بدلًا من ذلك، استخدم إحدى الأدوات التالية لإنشاء إعلانات AMPHTML:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (_قريبًا_)

### خوادم/شبكات الإعلانات

لتقديم إعلانات AMPHTML إلى صفحات AMP، يلزمك إنشاء ملحق [`amp-ad`](../../../documentation/components/reference/amp-ad.md) لشبكتك (ما لم يكن لديك واحد بالفعل) والذي يستخدم [تنفيذ طلب إعلان للإحضار السريع](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/Network-Impl-Guide.md). راجع [التكامل مع AMP لعرض الإعلانات](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md) للحصول على مزيد التفاصيل. وضع في اعتبارك أنه ليست هناك حاجة إلى تكامل خاص لعرض AMPHTML على الصفحات بغير AMP.

## إنشاء إعلانات AMPHTML

**من نقطة الصفر**: يجب أن تتبع إعلانات AMPHTML [مواصفات إعلان AMPHTML](a4a_spec.md). للحصول على عروض توضيحية وأمثلة، راجع نماذج إعلانات AMPHTML مفتوحة المصدر في [أمثلة](../../../documentation/examples/documentation/amp-ad.html).

**استخدام الأدوات**: يمكنك استخدام أي من الأدوات التالية لإنشاء تصميمات AMPHTML الإبداعية:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (_قريبًا_)

### التحقق من صحة بناء جملة إعلانات AMPHTML

بعد إنشاء إعلان AMPHTML، يجب التأكد من أن الإعلان يستخدم بناء الجملة AMPHTML الصحيح. اعتمادًا على بيئة التطوير لديك، هناك بعض الخيارات المتاحة لك للتحقق من صحة إعلانات AMPHTML الخاصة بك:

- استخدام وحدة [NPM لأداة التحقق من صحة AMP](https://www.npmjs.com/package/amphtml-validator) لدمج التحقق في البنية CI لديك.
- استخدام [أداة التحقق من صحة AMP](https://validator.ampproject.org/) للاختبار غير المتكرر.
- الشراكة مع [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) واستخدام نقطة نهاية أداة التحقق العامة.

[tip type="note"] **ملحوظة–** لعرض إعلانات AMPHTML بسرعة على صفحات AMP (أي باستخدام العرض التفضيلي في الإحضار السريع)، يجب أن يكون بناء الجملة صحيحًا. وإذا كان بناء الجملة غير صحيح، فسيستمر عرض الإعلان، ولكن ليس بالسرعة نفسها. [/tip]

## دعم إعلانات AMPHTML في RTB

بالنسبة إلى SSPs وعمليات تبادل الإعلانات التي ترغب في دعم إعلانات AMPHTML في بيئة عروض الأسعار في الوقت الفعلي (RTB)، يُرجى الرجوع إلى [دليل التنفيذ لتبادل الإعلانات في RTB](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/RTBExchangeGuide.md) للحصول على مزيد التفاصيل.

## الأسئلة الشائعة

#### هل توجد أي نماذج من إعلانات AMPHTML؟

نعم. يمكن العثور على عدد من نماذج إعلانات AMPHTML ذات التصميم الرائع في [أمثلة](../../../documentation/examples/documentation/amp-ad.html). إذ تستخدم هذه النماذج مكونات متقدمة في AMP.

#### هل تدعم إعلانات AMPHTML التحقق من الأطراف الثالثة واكتشاف إمكانية العرض؟

نعم، هناك دعم أصلي للتحقق واكتشاف إمكانية العرض باستخدام [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) (على سبيل المثال، يتكامل ActiveView من Google بهذه الطريقة). وهناك أيضًا بائعون آخرون مثل MOAT يقومون بتنفيذ الدعم بنشاط لها.

#### هل تدعم إعلانات AMPHTML الرسوم المتحركة المستندة إلى الجدول الزمني؟

نعم، راجع [`amp-animation`](../../../documentation/components/reference/amp-animation.md).

#### تحتوي معظم الإعلانات على أهداف قابلة للنقر ومخارج قابلة للتكوين، هل لإعلانات AMPHTML آلية مماثلة؟

نعم، راجع [`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md).

#### لا أجد ما أحتاجه، أين يمكنني طرح الأسئلة؟

- [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) هي الطريقة الموصى بها للعثور على إجابات للأسئلة حول AMP؛ نظرًا لأن أعضاء مجتمع AMP Project يراقبون Stack Overflow بانتظام، فمن المحتمل أن تتلقى الإجابة الأسرع عن أسئلتك هناك.
- انضم إلى قناة [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) للحصول على حلول وأجوبة.
- إذا واجهت خطأً في AMP أو كان لديك طلب ميزة لـ AMP، فراجع [الإبلاغ عن المشكلات مع AMP ](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#reporting-issues-with-amp) للحصول على معلومات حول إرسال مشكلة.
