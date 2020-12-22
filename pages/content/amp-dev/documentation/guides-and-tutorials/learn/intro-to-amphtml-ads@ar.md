---
"$title": Intro to AMPHTML ads
"$order": '1'
description: AMPHTML ads are a faster, lighter and more secure way to advertise on the web. Although AMP pages support traditional HTML ads, these ads can be slow to load.
formats:
- ads
---

## ما هو إعلان AMPHTML؟

تُعد إعلانات AMPHTML طريقة أسرع وأبسط وأكثر أمانًا للإعلان على الويب. على الرغم من أن صفحات AMP تدعم إعلانات HTML التقليدية، فقد تكون هذه الإعلانات بطيئة في التحميل. ولإنشاء الإعلانات بسرعة باقي صفحات AMP نفسها، يمكنك إنشاء إعلانات بتنسيق AMPHTML. ولا يتم عرض إعلانات AMPHTML إلا بعد التحقق من صحتها، مما يضمن أمان الإعلانات وفاعليتها. الأهم من ذلك كله، يمكن عرض هذه الإعلانات في أي مكان على الويب، *وليس على صفحات AMP فقط*.

فيما تتم كتابة إعلانات AMPHTML بلغة AMP HTML وفقًا [لمواصفات إعلانات AMPHTML](a4a_spec.md) (أحد أشكال AMP HTML + CSS). ,هذا يعني أن الإعلانات لم تعد قادرة على تشغيل JavaScript عشوائي، والذي يعد السبب الأول لضعف أداء الإعلان على نحو تقليدي. لذا، وعلى غرار AMP الأساسي تمامًا، تم دمج حالات استخدام JavaScript للإعلانات الأساسية في مشروع AMP مفتوح المصدر الذي يضمن السلوك الجيد من الإعلانات.

### Benefits

لماذا تُعد إعلانات AMPHTML أفضل من الإعلانات التقليدية؟

1. **Faster**: AMPHTML ads are faster because the ads are requested earlier in the page rendering process, and immediately displayed just before the user is about to view the ad. The reduced file size of AMPHTML ads also increases speed.
2. **Lighter**: AMPHTML ads combine commonly used ad functionality, which reduces the ad's file size. Once on the page, AMPHTML ads also consume less resources. For example, instead of 10 trackers requesting their own information in regular ads, AMPHTML ads collect all the data once and distribute it to any number of interested trackers.
3. **Coordinated**: On AMP pages, the [AMP runtime](spec/amphtml.md#amp-runtime) can coordinate a mobile phone's limited resources to the right component at the right time to give the best user experience. For example, AMPHTML ads with animations are paused when the ads are not in the current viewport.
4. **More Engaging**: Users can't engage with ads they can't see. Faster ads lead to higher viewability and therefore higher click-through rates, which ultimately leads to better ad performance.
5. **Safe from Malware**: It's impossible to spread malware with AMPHTML ads because the ads are verified before being served. Because of this, advertisers can ensure a safe user experience and positive brand perception.
6. **More Flexible**: AMPHTML ads are designed to work on both AMP and non-AMP web pages, as well as across any device.

### Formats

تتميز إعلانات AMPHTML بالمرونة والديناميكية، مما يسمح بالعديد من التنسيقات الإبداعية مثل carousel وparallax وlightbox، على سبيل المثال لا الحصر. استفد من نماذج إعلانات AMPHTML  <a class="" href="https://gitlocalize.com/repo/4863/ar/pages/content/amp-dev/documentation/examples/index.html">مفتوحة المصدر في أمثلة </a>.

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

## How AMPHTML ads work

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Serving AMPHTML ads to AMP pages', caption='Serving AMPHTML ads to AMP pages', align='' ) }}

1. Publishers insert an ad slot on their AMP page via the [`amp-ad`](../../../documentation/components/reference/amp-ad.md) tag, specifying the ad network they wish to use.
2. The AMP Runtime sends an ad request to the specified ad network to retrieve the ad. Ad networks capable of serving AMPHTML ads provide a [Fast Fetch implementation](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) that validates and signs the creative.
3. The ad network responds with the AMPHTML ad and the AMP Runtime renders the ad on the AMP page.

[tip type="note"] No special integration is needed to serve AMPHTML ads to non-AMP pages. Check with your ad network to see if they support AMPHTML ads. [/tip]

## Serving AMPHTML ads

### Publishers

To serve your direct-sold ad formats in AMPHTML, you must create the ads according to the [AMPHTML ad spec](a4a_spec.md) and deliver them using an ad server that supports AMPHTML ad serving.  Currently, the following ad servers support AMPHTML ads:

- DoubleClick للناشرين
- TripleLift
- Dianomi
- Adzerk
- Google AdSense

لعرض إعلانات AMPHTML عبر قنواتك غير المباشرة (مثل exchange وSSP وما إلى ذلك)، استخدم شبكة إعلانات/خادم إعلانات داعمًا في [القائمة التالية](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md).

### Creative agencies

إذا كنت تمثل وكالة إبداعية، فيجب عليك إنشاء الإعلانات وفقًا [لمواصفات إعلان AMPHTML ](a4a_spec.md). لاستلهام أفكار والحصول على أمثلة، راجع نماذج إعلانات AMPHTML مفتوحة المصدر على [أمثلة](../../../documentation/examples/index.html). بدلًا من ذلك، استخدم إحدى الأدوات التالية لإنشاء إعلانات AMPHTML:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (*قريبًا*)

### Ad networks/servers

لتقديم إعلانات AMPHTML إلى صفحات AMP، يلزمك إنشاء ملحق [`amp-ad`](../../../documentation/components/reference/amp-ad.md) لشبكتك (ما لم يكن لديك واحد بالفعل) والذي يستخدم [تنفيذ طلب إعلان للإحضار السريع](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md). راجع [التكامل مع AMP لعرض الإعلانات](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md) للحصول على مزيد التفاصيل. وضع في اعتبارك أنه ليست هناك حاجة إلى تكامل خاص لعرض AMPHTML على الصفحات بغير AMP.

## Creating AMPHTML ads

**من نقطة الصفر**: يجب أن تتبع إعلانات AMPHTML [مواصفات إعلان AMPHTML](a4a_spec.md). للحصول على عروض توضيحية وأمثلة، راجع نماذج إعلانات AMPHTML مفتوحة المصدر في [أمثلة](../../../documentation/examples/documentation/amp-ad.html).

**استخدام الأدوات**: يمكنك استخدام أي من الأدوات التالية لإنشاء تصميمات AMPHTML الإبداعية:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (*قريبًا*)

### Validate AMPHTML ad syntax

بعد إنشاء إعلان AMPHTML، يجب التأكد من أن الإعلان يستخدم بناء الجملة AMPHTML الصحيح. اعتمادًا على بيئة التطوير لديك، هناك بعض الخيارات المتاحة لك للتحقق من صحة إعلانات AMPHTML الخاصة بك:

- استخدام وحدة [NPM لأداة التحقق من صحة AMP](https://www.npmjs.com/package/amphtml-validator) لدمج التحقق في البنية CI لديك.
- استخدام [أداة التحقق من صحة AMP](https://validator.ampproject.org/) للاختبار غير المتكرر.
- الشراكة مع [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) واستخدام نقطة نهاية أداة التحقق العامة.

[tip type="note"] **ملحوظة–**  لعرض إعلانات AMPHTML بسرعة على صفحات AMP (أي باستخدام العرض التفضيلي في الإحضار السريع)، يجب أن يكون بناء الجملة صحيحًا. وإذا كان بناء الجملة غير صحيح، فسيستمر عرض الإعلان، ولكن ليس بالسرعة نفسها. [/tip]

## Supporting AMPHTML ads in RTB

بالنسبة إلى SSPs وعمليات تبادل الإعلانات التي ترغب في دعم إعلانات AMPHTML في بيئة عروض الأسعار في الوقت الفعلي (RTB)، يُرجى الرجوع إلى [دليل التنفيذ لتبادل الإعلانات في RTB](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md) للحصول على مزيد التفاصيل.

## FAQs

#### Are there any AMPHTML ad samples?

نعم. يمكن العثور على عدد من نماذج إعلانات AMPHTML ذات التصميم الرائع في [أمثلة](../../../documentation/examples/documentation/amp-ad.html). إذ تستخدم هذه النماذج مكونات متقدمة في AMP.

#### Do AMPHTML ads support 3rd party verification and viewability detection?

نعم، هناك دعم أصلي للتحقق واكتشاف إمكانية العرض باستخدام [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) (على سبيل المثال، يتكامل ActiveView من Google بهذه الطريقة). وهناك أيضًا بائعون آخرون مثل MOAT يقومون بتنفيذ الدعم بنشاط لها.

#### Do AMPHTML ads support timeline-based animation?

نعم، راجع [`amp-animation`](../../../documentation/components/reference/amp-animation.md).

#### Most ads have tappable targets and configurable ad exits. Do AMPHTML ads have a similar mechanism?

نعم، راجع [`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md).

#### I can't find what I need, where can I ask questions?

- [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) هي الطريقة الموصى بها للعثور على إجابات للأسئلة حول AMP؛ نظرًا لأن أعضاء مجتمع AMP Project يراقبون Stack Overflow بانتظام، فمن المحتمل أن تتلقى الإجابة الأسرع عن أسئلتك هناك.
- انضم إلى قناة [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) للحصول على حلول وأجوبة.
- إذا واجهت خطأً في AMP أو كان لديك طلب ميزة لـ AMP، فراجع [الإبلاغ عن المشكلات مع AMP ](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp) للحصول على معلومات حول إرسال مشكلة.
