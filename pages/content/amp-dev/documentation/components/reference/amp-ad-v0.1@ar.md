---
$title: amp-ad
$category@: ads-analytics
formats:
  - websites
teaser:
  text: A container to display an ad.
---



هذا العنصر عبارة عن حاوية لعرض الإعلان. `amp-embed` هو اسم مستعار للعنصر `amp-ad`، ويستمد كل وظائفه ولكن باسم علامة مختلف. استخدِم `amp-embed` عندما تريد أن تكون أكثر دقة من حيث الدلالة. لا تتيح مستندات AMP سوى الإعلانات/التضمينات التي يتم عرضها عبر HTTPS.

# <a name="amp-ad"></a> amp-ad / amp-embed

[tip type="note"]
من المحتمل أن تتطور مواصفات `amp-ad`/`amp-embed` بشكل ملحوظ بمرور الوقت. وتم تصميم الأسلوب الحالي لتشغيل شكل الإعلان مبدئيًا لتتمكن من عرض الإعلان.
[/tip]


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<table>
  <tr>
    <td class="col-fourty"><strong>الوصف</strong></td>
    <td>هذا العنصر عبارة عن حاوية لعرض الإعلان. <code>amp-embed</code> هو اسم مستعار للعنصر <code>amp-ad</code>، ويستمد كل وظائفه ولكن باسم علامة مختلف. استخدِم <code>amp-embed</code> عندما تريد أن تكون أكثر دقة من حيث الدلالة. لا تتيح مستندات AMP سوى الإعلانات/التضمينات التي يتم عرضها عبر HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-ad" src="https://ampjs.org/v0/amp-ad-0.1.js"&gt;&lt;/script&gt;</code><br>ملاحظة: ربما لا يزال العنصر amp-ad يعمل بدون هذا النص البرمجي، لكننا ننصح باستخدام النص بشدة بغرض التوافق في المستقبل.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">التنسيقات المعتمدة</a></strong></td>
    <td>fill وfixed وfixed-height وflex-item وintrinsic وnodisplay وresponsive</td>
  </tr>
  <tr>
  <td class="col-fourty"><strong>أمثلة</strong></td>
  <td>اطِّلع على <a href="https://ampbyexample.com/components/amp-ad/">مثال amp-ad</a> في الموقع "AMP بالمثال".</td>
  </tr>
</table>

## السلوك <a name="behavior"></a>

يتم تحميل الإعلانات مثل جميع الموارد الأخرى في مستندات AMP، مع عنصر مخصص خاص يُسمى `<amp-ad>`. لا يُسمح بتشغيل جافا سكريبت مقدم من شبكة إعلانات في مستند AMP. وبدلاً من ذلك، يحمّل وقت تشغيل AMP إطار iframe من أصل مختلف (من خلال وضع حماية إطارات iframe) مثل مستند AMP، ويعمل على تنفيذ جافا سكريبت المقدمة من شبكة الإعلانات داخل وضع حماية إطارات iframe هذا.

يتطلب العنصر `<amp-ad>` تحديد قيم العرض والارتفاع وفق [قاعدة](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#tldr-summary-of-layout-requirements--behaviors) نوع التنسيق التابع له. ويتطلب أيضًا الوسيطة `type` التي تحدد شبكة الإعلانات التي يتم عرضها. يتم تلقائيًا تمرير جميع سمات `data-*` الموجودة على العلامة كوسيطات إلى الترميز الذي يعرض الإعلان في النهاية. وتختلف سمات `data-` المطلوبة حسب نوع الشبكة المعين كما يجب توثيقها باستخدام الشبكة.

#### مثال: عرض بعض الإعلانات <a name="example-displaying-a-few-ads"></a>

[example preview="inline" playground="true" imports="amp-ad"]
```html
<amp-ad type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
    width="300"
    height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  </amp-ad>
  <amp-ad width="300"
    height="250"
    type="industrybrains"
    data-width="300"
    data-height="250"
    data-cid="19626-3798936394">
  </amp-ad>
  <amp-embed type="taboola"
    width="400"
    height="300"
    layout="responsive"
    data-publisher="amp-demo"
    data-mode="thumbnails-a"
    data-placement="Ads Example"
    data-article="auto">
  </amp-embed>
```
[/example]

## السمات <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (مطلوبة)</strong></td>
    <td>تحدد هذه السمة معرّف <a href="#supported-ad-networks">شبكة الإعلانات</a>. تختار السمة <code>type</code> النموذج الواجب استخدامه لعلامة الإعلان.</td>
  </tr>
  <tr>
    <td width="40%"><strong>src (اختياريّة)</strong></td>
    <td>استخدِم هذه السمة لتحميل علامة نص برمجي لشبكة الإعلانات المحددة. يمكن استخدامها لشبكات الإعلانات التي تتطلب إدراج علامة نص برمجية واحدة في الصفحة. يجب أن تحتوي قيمة <code>src</code> على بادئة مدرجة في القائمة البيضاء لشبكة الإعلانات المحددة ، ويجب أن تستخدم القيمة البروتوكول <code>https</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>تتطلب معظم شبكات الإعلانات تهيئة إضافية، والتي يمكن تمريرها إلى الشبكة باستخدام سمات <code>data-</code> باللغة HTML. تخضع أسماء المعلَمات إلى تحويل الشرطات إلى الحالة camelCase الخاصة بسمات البيانات القياسية. يتم مثلاً إرسال "data-foo-bar" إلى الإعلان لتهيئته ليكون "fooBar". يمكنك مراجعة وثائق <a href="#supported-ad-networks">شبكة الإعلانات</a> لمعرفة السمات التي يمكن استخدامها.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-vars-foo-bar</strong></td>
    <td>يتم حجر السمات المبدوءة بـ <code>data-vars-</code> <a href="https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute">لمتغيرات <code>amp-analytics</code></a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>json (اختياريّة)</strong></td>
    <td>استخدِم هذه السمة لتمرير تهيئة إلى الإعلان ككائن JSON معقد بشكل عشوائي. يتم تمرير الكائن إلى الإعلان كما هو دون أي تغيير في الأسماء.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id (اختياريّة)</strong></td>
    <td>في حال توفير هذه السمة، فإنها تتطلب تأكيد <a href="amp-user-notification.md">amp-user-notification</a> بمعرّف HTML-id المعين إلى أن يتم تمرير "معرِّف عميل AMP" (يشبه ملف تعريف ارتباط) للمستخدِم إلى الإعلان. يعني هذا تأخر عرض الإعلان إلى أن يؤكد المستخدِم الإشعار.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-loading-strategy (اختياريّة)</strong></td>
    <td>توجّه هذه السمة الإعلان لبدء التحميل عندما يقع الإعلان ضمن عدد معين من إطارات العرض وبعيدًا عن إطار العرض الحالي. في حال غياب السمة <code>data-loading-strategy</code>، يتم استخدام الرقم 3 تلقائيًا. يمكنك تحديد قيمة تعويم ضمن النطاق [0 و3] (في حال عدم تحديد القيمة، سيتم تعيينها على 1.25). استخدِم قيمة أصغر للحصول على زيادة إمكانية العرض (أي زيادة فرصة مشاهدة الإعلان بعد تحميله) ولكن مع خطر إنشاء عدد أقل من مرات الظهور (أي عدد أقل من الإعلانات التي يتم تحميلها). إذا تم تحديد السمة مع ترك القيمة فارغة، سيقوم النظام بتعيين قيمة تعويم، ما يؤدي إلى تحسين إمكانية العرض بدون التأثير بشكل كبير على مرات الظهور. تجدر الإشارة إلى أن تحديد <code>prefer-viewability-over-views</code> لتكون القيمة يعمل تلقائيًا على تحسين إمكانية العرض.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-ad-container-id (اختياريّة)</strong></td>
    <td>تُبلِغ هذه السمة الإعلان بمعرّف مكّوِن الحاوية في حال محاولة التصغير. يجب أن يكون مكّوِن الحاوية مكّوِن <code>&lt;amp-layout&gt;</code> ويكون عنصرًا رئيسيًا للإعلان. عند تحديد <code>data-ad-container-id</code>، والعثور على مكّوِن الحاوية <code>&lt;amp-layout&gt;</code>، سيحاول وقت تشغيل AMP تصغير مكّوِن الحاوية بدلاً من مكّوِن الإعلان أثناء عدم تعيين fill. يمكن أن تكون هذه الميزة مفيدة عند توّفر مؤشر الإعلان.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>السمات المشتركة</strong></td>
    <td>يتضمن هذا العنصر <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">السمات المشتركة</a> التي تشمل مكونات AMP.</td>
  </tr>
</table>

## العنصر النائب <a name="placeholder"></a>

يتيح `amp-ad` اختياريًا عنصرًا ثانويًا من خلال السمة `placeholder`. إذا كانت شبكة الإعلانات متوافقة، سيتم عرض هذا العنصر إلى أن يتوفر الإعلان للعرض. يمكنك معرفة المزيد من المعلومات في [العناصر النائبة والعناصر الاحتياطية](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad width=300 height=250
    type="foo">
  <div placeholder>Loading ...</div>
</amp-ad>
```

## عدم توفر أي إعلان <a name="no-ad-available"></a>

في حال عدم توفر أي إعلان للخانة، تحاول AMP تصغير العنصر `amp-ad` (أي تعيينه على `display: none`). تحدد AMP إمكانية إجراء هذه العملية بدون التأثير على موضع تمرير المستخدِم. إذا كان الإعلان في إطار العرض الحالي، لن يتم تصغير الإعلان لأنه يؤثر على موضع تمرير المستخدِم ولكن إذا كان الإعلان خارج إطار العرض الحالي، سيتم تصغيره.

في حال تعذُّر محاولة التصغير: يتيح المكوِّن `amp-ad` عنصرًا ثانويًا من خلال السمة `fallback`. إذا كان هناك عنصر احتياطي، سيتم عرض العنصر الاحتياطي المخصص. وإلا تطبق AMP العنصر الاحتياطي التلقائي.

مثال مع عنصر احتياطي:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## عرض إعلانات الفيديو <a name="serving-video-ads"></a>

هناك 3 طرق لتحقيق الربح من الفيديوهات في AMP من خلال إعلانات الفيديو:

1. تتيح AMP أصلاً عمل عدد من مشغلات الفيديو، مثل BrightCove وDailyMotion وغيرهما والتي يمكنها تحقيق الربح من الإعلانات. للحصول على القائمة الكاملة، راجع مكونات [الوسائط](../../../documentation/components/index.html#media).

2. استخدِم المكوِّن [amp-ima-video](amp-ima-video.md) الذي يأتي مع أداة تطوير البرامج لإعلانات الوسائط التفاعلية المضمّنة ومشغل فيديو HTML5.
3. إذا كنت تستخدم مشغل فيديو غير متوافق في AMP، يمكنك عرض مشغلك المخصص باستخدام [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
عند استخدام الأسلوب `amp-iframe`:

    * تأكد من وجود ملصق إذا تم تحميل المشغل في إطار العرض الأول. [يمكنك معرفة التفاصيل](amp-iframe.md#iframe-with-placeholder).
    * يجب عرض الفيديو والملصق عبر HTTPS.</li>

## تشغيل الإعلانات من نطاق خاص <a name="running-ads-from-a-custom-domain"></a>

تتيح AMP تحميل إطار iframe للتشغيل المبدئي الذي يستخدَم لتحميل الإعلانات من نطاق خاص مثل نطاقك.

لتفعيل هذا، انسخ الملف [remote.html](https://github.com/ampproject/amphtml/blob/main/3p/remote.html) إلى خادم الويب لديك. وبعد ذلك أضِف العلامة الوصفية التالية إلى ملفات AMP:

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

السمة `content` للعلامة الوصفية هي عنوان URL الكامل لنسختك من ملف remote.html على خادم الويب لديك. ويجب أن يستخدم عنوان URL هذا مخطط "https". لا يمكن استضافة العنوان على الأصل نفسه الذي عليه ملفات AMP. إذا استضفت مثلاً ملفات AMP على `www.example.com`، يجب ألا يكون عنوان URL هذا على النطاق `www.example.com` ولكن النطاق `something-else.example.com` مقبول. يمكنك مراجعة ["سياسة أصل إطارات Iframe"](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md) للحصول على مزيد من التفاصيل عن الأصول المسموح بها لإطارات iframe.

### الأمان <a name="security"></a>

**تحقق من صحة البيانات الواردة** قبل تمريرها إلى الوظيفة `draw3p` للتأكد من تنفيذ إطار iframe المهام المتوقعة منه فقط. ويكون هذا صحيحًا لا سيما مع شبكات الإعلانات التي تسمح بإدخال جافا سكريبت مخصص.

يجب تنفيذ إطارات Iframe بشكل يجعل تضمينها مقتصرًا على الأصول التي يُتوقع تضمينهم فيها فقط. قد تكون الأصول:

* أصولك الخاصة
* `https://cdn.ampproject.org` لذاكرة التخزين المؤقت لصفحات AMP

في حال ذاكرة التخزين المؤقت لصفحات AMP، تحتاج أيضًا إلى التحقق من أن "أصل المصدر" (أصل المستند الذي يعرضه cdn.ampproject.org) هو أحد أصولك.

يمكن تنفيذ الأصول باستخدام الوسيطة الثالثة لوظيفة `draw3p` ويجب أيضًا أن يتم ذلك باستخدام التوجيه [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) للحصول على إتاحة كاملة لعمل المتصفح.

### تحسين تهيئة الإعلانات الواردة <a name="enhance-incoming-ad-configuration"></a>

هذا العمل اختياري تمامًا: نسعى أحيانًا إلى تحسين طلب الإعلان قبل إرساله إلى خادم الإعلانات.

إذا كانت شبكة الإعلانات تتيح [الجلب السريع](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md#creating-an-amp-ad)، يُرجى استخدام [تهيئة الوقت الفعلي](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-documentation.md) (RTC). (تتيح عمليات تكامل DoubleClick وAdSense الجلب السريع وتهيئة الوقت الفعلي).

إذا كانت شبكة إعلاناتك تستخدم الجلب المؤجل، يمكنك إرسال رد اتصال على اتصال الوظيفة `draw3p` في الملف [remote.html](https://github.com/ampproject/amphtml/blob/main/3p/remote.html). يتلقى رد الاتصال التهيئة الواردة كوسيطة أولى ثم يتلقى رد اتصال آخر كوسيطة ثانية (تحمل اسم `done` في المثال أدناه). يجب إجراء رد الاتصال هذا بالتهيئة المحدّثة حتى يتسنى استكمال عرض الإعلانات.

مثال:

```JS
draw3p(function(config, done) {
  config.targeting = Math.random() > 0.5 ? 'sport' : 'fashion';
  // Don't actually call setTimeout here. This should only serve as an
  // example that is OK to call the done callback asynchronously.
  setTimeout(function() {
    done(config);
  }, 100)
}, ['allowed-ad-type'], ['your-domain.com']);
```

## التصميم <a name="styling"></a>

لا يجوز أن تحتوي عناصر `<amp-ad>` نفسها على حاويات بها المجموعة CSS `position: fixed` ولا يجوز وضعها في هذه الحاويات (باستثناء `amp-lightbox`).
ويرجع هذا إلى التأثيرات التي تلحق بتجربة المستخدِم نتيجة الإعلانات المركبة على الصفحة بأكملها. قد يتم النظر مستقبلاً في السماح بأشكال إعلانات مشابهة داخل حاويات AMP التي يتم التحكم فيها والتي تحافظ على بعض ثوابت تجربة المستخدِم.

## التحقق <a name="validation"></a>

اطِّلع على [قواعد amp-ad](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad/validator-amp-ad.protoascii) في مواصفات مدقق AMP.

## شبكات الإعلانات المتوافقة <a name="supported-ad-networks"></a>

* [A8](https://github.com/ampproject/amphtml/blob/main/ads/a8.md)
* [A9](https://github.com/ampproject/amphtml/blob/main/ads/a9.md)
* [AccessTrade](https://github.com/ampproject/amphtml/blob/main/ads/accesstrade.md)
* [Adblade](https://github.com/ampproject/amphtml/blob/main/ads/adblade.md)
* [AdButler](https://github.com/ampproject/amphtml/blob/main/ads/adbutler.md)
* [Adform](https://github.com/ampproject/amphtml/blob/main/ads/adform.md)
* [Adfox](https://github.com/ampproject/amphtml/blob/main/ads/adfox.md)
* [Ad Generation](https://github.com/ampproject/amphtml/blob/main/ads/adgeneration.md)
* [Adhese](https://github.com/ampproject/amphtml/blob/main/ads/adhese.md)
* [Adincube](https://github.com/ampproject/amphtml/blob/main/ads/adincube.md)
* [ADITION](https://github.com/ampproject/amphtml/blob/main/ads/adition.md)
* [Adman](https://github.com/ampproject/amphtml/blob/main/ads/adman.md)
* [AdmanMedia](https://github.com/ampproject/amphtml/blob/main/ads/admanmedia.md)
* [Admixer](https://github.com/ampproject/amphtml/blob/main/ads/admixer.md)
* [AdOcean](https://github.com/ampproject/amphtml/blob/main/ads/adocean.md)
* [AdPicker](https://github.com/ampproject/amphtml/blob/main/ads/adpicker.md)
* [AdPlugg](https://github.com/ampproject/amphtml/blob/main/ads/adplugg.md)
* [Adpon](https://github.com/ampproject/amphtml/blob/main/ads/adpon.md)
* [AdReactor](https://github.com/ampproject/amphtml/blob/main/ads/adreactor.md)
* [AdSense](https://github.com/ampproject/amphtml/blob/main/ads/google/adsense.md)
* [AdSensor](https://github.com/ampproject/amphtml/blob/main/ads/adsensor.md)
* [AdsNative](https://github.com/ampproject/amphtml/blob/main/ads/adsnative.md)
* [AdSpeed](https://github.com/ampproject/amphtml/blob/main/ads/adspeed.md)
* [AdSpirit](https://github.com/ampproject/amphtml/blob/main/ads/adspirit.md)
* [AdStir](https://github.com/ampproject/amphtml/blob/main/ads/adstir.md)
* [AdTech](https://github.com/ampproject/amphtml/blob/main/ads/adtech.md)
* [AdThrive](https://github.com/ampproject/amphtml/blob/main/ads/adthrive.md)
* [AdUnity](https://github.com/ampproject/amphtml/blob/main/ads/adunity.md)
* [Ad Up Technology](https://github.com/ampproject/amphtml/blob/main/ads/aduptech.md)
* [Adventive](https://github.com/ampproject/amphtml/blob/main/ads/adventive.md)
* [Adverline](https://github.com/ampproject/amphtml/blob/main/ads/adverline.md)
* [Adverticum](https://github.com/ampproject/amphtml/blob/main/ads/adverticum.md)
* [AdvertServe](https://github.com/ampproject/amphtml/blob/main/ads/advertserve.md)
* [Adyoulike](https://github.com/ampproject/amphtml/blob/main/ads/adyoulike.md)
* [Affiliate-B](https://github.com/ampproject/amphtml/blob/main/ads/affiliateb.md)
* [AJA](https://github.com/ampproject/amphtml/blob/main/ads/aja.md)
* [AMoAd](https://github.com/ampproject/amphtml/blob/main/ads/amoad.md)
* [AppNexus](https://github.com/ampproject/amphtml/blob/main/ads/appnexus.md)
* [AppVador](https://github.com/ampproject/amphtml/blob/main/ads/appvador.md)
* [Atomx](https://github.com/ampproject/amphtml/blob/main/ads/atomx.md)
* [Baidu](https://github.com/ampproject/amphtml/blob/main/ads/baidu.md)
* [BeOpinion](amp-beopinion.md)
* [Bidtellect](https://github.com/ampproject/amphtml/blob/main/ads/bidtellect.md)
* [brainy](https://github.com/ampproject/amphtml/blob/main/ads/brainy.md)
* [Broadstreet Ads](https://github.com/ampproject/amphtml/blob/main/ads/broadstreetads.md)
* [CA A.J.A. Infeed](https://github.com/ampproject/amphtml/blob/main/ads/caajainfeed.md)
* [CA-ProFit-X](https://github.com/ampproject/amphtml/blob/main/ads/caprofitx.md)
* [Cedato](https://github.com/ampproject/amphtml/blob/main/ads/cedato.md)
* [Chargeads](https://github.com/ampproject/amphtml/blob/main/ads/chargeads.md)
* [Colombia](https://github.com/ampproject/amphtml/blob/main/ads/colombia.md)
* [Connatix](https://github.com/ampproject/amphtml/blob/main/ads/connatix.md)
* [Content.ad](https://github.com/ampproject/amphtml/blob/main/ads/contentad.md)
* [Criteo](https://github.com/ampproject/amphtml/blob/main/ads/criteo.md)
* [CSA](https://github.com/ampproject/amphtml/blob/main/ads/google/csa.md)
* [CxenseDisplay](https://github.com/ampproject/amphtml/blob/main/ads/eas.md)
* [Dianomi](https://github.com/ampproject/amphtml/blob/main/ads/dianomi.md)
* [Directadvert](https://github.com/ampproject/amphtml/blob/main/ads/directadvert.md)
* [DistroScale](https://github.com/ampproject/amphtml/blob/main/ads/distroscale.md)
* [Dot and Media](https://github.com/ampproject/amphtml/blob/main/ads/dotandads.md)
* [Doubleclick](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md)
* [eADV](https://github.com/ampproject/amphtml/blob/main/ads/eadv.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/main/ads/epeex.md)
* [E-Planning](https://github.com/ampproject/amphtml/blob/main/ads/eplanning.md)
* [Ezoic](https://github.com/ampproject/amphtml/blob/main/ads/ezoic.md)
* [Felmat](https://github.com/ampproject/amphtml/blob/main/ads/felmat.md)
* [FlexOneELEPHANT](https://github.com/ampproject/amphtml/blob/main/ads/f1e.md)
* [FlexOneHARRIER](https://github.com/ampproject/amphtml/blob/main/ads/f1h.md)
* [Flite](https://github.com/ampproject/amphtml/blob/main/ads/flite.md)
* [fluct](https://github.com/ampproject/amphtml/blob/main/ads/fluct.md)
* [FreeWheel](https://github.com/ampproject/amphtml/blob/main/ads/freewheel.md)
* [Fusion](https://github.com/ampproject/amphtml/blob/main/ads/fusion.md)
* [GenieeSSP](https://github.com/ampproject/amphtml/blob/main/ads/genieessp.md)
* [Giraff](https://github.com/ampproject/amphtml/blob/main/ads/giraff.md)
* [GMOSSP](https://github.com/ampproject/amphtml/blob/main/ads/gmossp.md)
* [GumGum](https://github.com/ampproject/amphtml/blob/main/ads/gumgum.md)
* [Holder](https://github.com/ampproject/amphtml/blob/main/ads/holder.md)
* [I-Mobile](https://github.com/ampproject/amphtml/blob/main/ads/imobile.md)
* [Imonomy](https://github.com/ampproject/amphtml/blob/main/ads/imonomy.md)
* [iBillboard](https://github.com/ampproject/amphtml/blob/main/ads/ibillboard.md)
* [Imedia](https://github.com/ampproject/amphtml/blob/main/ads/imedia.md)
* [Improve Digital](https://github.com/ampproject/amphtml/blob/main/ads/improvedigital.md)
* [Index Exchange](https://github.com/ampproject/amphtml/blob/main/ads/ix.md)
* [Industrybrains](https://github.com/ampproject/amphtml/blob/main/ads/industrybrains.md)
* [InMobi](https://github.com/ampproject/amphtml/blob/main/ads/inmobi.md)
* [Innity](https://github.com/ampproject/amphtml/blob/main/ads/innity.md)
* [Kargo](https://github.com/ampproject/amphtml/blob/main/ads/kargo.md)
* [Kiosked](https://github.com/ampproject/amphtml/blob/main/ads/kiosked.md)
* [Kixer](https://github.com/ampproject/amphtml/blob/main/ads/kixer.md)
* [Kuadio](https://github.com/ampproject/amphtml/blob/main/ads/kuadio.md)
* [Ligatus](https://github.com/ampproject/amphtml/blob/main/ads/ligatus.md)
* [LockerDome](https://github.com/ampproject/amphtml/blob/main/ads/lockerdome.md)
* [LOKA](https://github.com/ampproject/amphtml/blob/main/ads/loka.md)
* [MADS](https://github.com/ampproject/amphtml/blob/main/ads/mads.md)
* [MANTIS](https://github.com/ampproject/amphtml/blob/main/ads/mantis.md)
* [Media.net](https://github.com/ampproject/amphtml/blob/main/ads/medianet.md)
* [MediaImpact](https://github.com/ampproject/amphtml/blob/main/ads/mediaimpact.md)
* [Mediavine](https://github.com/ampproject/amphtml/blob/main/ads/mediavine.md)
* [Medyanet](https://github.com/ampproject/amphtml/blob/main/ads/medyanet.md)
* [Meg](https://github.com/ampproject/amphtml/blob/main/ads/meg.md)
* [MicroAd](https://github.com/ampproject/amphtml/blob/main/ads/microad.md)
* [MixiMedia](https://github.com/ampproject/amphtml/blob/main/ads/miximedia.md)
* [Mixpo](https://github.com/ampproject/amphtml/blob/main/ads/mixpo.md)
* [Monetizer101](https://github.com/ampproject/amphtml/blob/main/ads/monetizer101.md)
* [mox](https://github.com/ampproject/amphtml/blob/main/ads/mox.md)
* [myTarget](https://github.com/ampproject/amphtml/blob/main/ads/mytarget.md)
* [myWidget](https://github.com/ampproject/amphtml/blob/main/ads/mywidget.md)
* [Nativo](https://github.com/ampproject/amphtml/blob/main/ads/nativo.md)
* [Navegg](https://github.com/ampproject/amphtml/blob/main/ads/navegg.md)
* [Nend](https://github.com/ampproject/amphtml/blob/main/ads/nend.md)
* [NETLETIX](https://github.com/ampproject/amphtml/blob/main/ads/netletix.md)
* [Noddus](https://github.com/ampproject/amphtml/blob/main/ads/noddus.md)
* [Nokta](https://github.com/ampproject/amphtml/blob/main/ads/nokta.md)
* [OneAD](https://github.com/ampproject/amphtml/blob/main/ads/onead.md)
* [OnNetwork](https://github.com/ampproject/amphtml/blob/main/ads/onnetwork.md)
* [Open AdStream (OAS)](https://github.com/ampproject/amphtml/blob/main/ads/openadstream.md)
* [OpenX](https://github.com/ampproject/amphtml/blob/main/ads/openx.md)
* [Pixels](https://github.com/ampproject/amphtml/blob/main/ads/pixels.md)
* [plista](https://github.com/ampproject/amphtml/blob/main/ads/plista.md)
* [polymorphicAds](https://github.com/ampproject/amphtml/blob/main/ads/polymorphicads.md)
* [popin](https://github.com/ampproject/amphtml/blob/main/ads/popin.md)
* [Pressboard](https://github.com/ampproject/amphtml/blob/main/ads/pressboard.md)
* [PromoteIQ](https://github.com/ampproject/amphtml/blob/main/ads/promoteiq.md)
* [PubGuru](https://github.com/ampproject/amphtml/blob/main/ads/pubguru.md)
* [PubMatic](https://github.com/ampproject/amphtml/blob/main/ads/pubmatic.md)
* [Pubmine](https://github.com/ampproject/amphtml/blob/main/ads/pubmine.md)
* [PulsePoint](https://github.com/ampproject/amphtml/blob/main/ads/pulsepoint.md)
* [Purch](https://github.com/ampproject/amphtml/blob/main/ads/purch.md)
* [Rambler&amp;Co](https://github.com/ampproject/amphtml/blob/main/ads/capirs.md)
* [RbInfoxSg](https://github.com/ampproject/amphtml/blob/main/ads/rbinfox.md)
* [Realclick](https://github.com/ampproject/amphtml/blob/main/ads/realclick.md)
* [recomAD](https://github.com/ampproject/amphtml/blob/main/ads/recomad.md)
* [Red for Publishers](https://github.com/ampproject/amphtml/blob/main/ads/rfp.md)
* [Relap](https://github.com/ampproject/amphtml/blob/main/ads/relap.md)
* [Revcontent](https://github.com/ampproject/amphtml/blob/main/ads/revcontent.md)
* [RevJet](https://github.com/ampproject/amphtml/blob/main/ads/revjet.md)
* [Rubicon Project](https://github.com/ampproject/amphtml/blob/main/ads/rubicon.md)
* [RUNative](https://github.com/ampproject/amphtml/blob/main/ads/runative.md)
* [SAS CI 360 Match](https://github.com/ampproject/amphtml/blob/main/ads/sas.md)
* [Sekindo](https://github.com/ampproject/amphtml/blob/main/ads/sekindo.md)
* [Sharethrough](https://github.com/ampproject/amphtml/blob/main/ads/sharethrough.md)
* [Sklik](https://github.com/ampproject/amphtml/blob/main/ads/sklik.md)
* [SlimCut Media](https://github.com/ampproject/amphtml/blob/main/ads/slimcutmedia.md)
* [Smart AdServer](https://github.com/ampproject/amphtml/blob/main/ads/smartadserver.md)
* [smartclip](https://github.com/ampproject/amphtml/blob/main/ads/smartclip.md)
* [sogou Ad](https://github.com/ampproject/amphtml/blob/main/ads/sogouad.md)
* [Sortable](https://github.com/ampproject/amphtml/blob/main/ads/sortable.md)
* [SOVRN](https://github.com/ampproject/amphtml/blob/main/ads/sovrn.md)
* [Speakol](https://github.com/ampproject/amphtml/blob/main/ads/speakol.md)
* [SpotX](https://github.com/ampproject/amphtml/blob/main/ads/spotx.md)
* [SunMedia](https://github.com/ampproject/amphtml/blob/main/ads/sunmedia.md)
* [Swoop](https://github.com/ampproject/amphtml/blob/main/ads/swoop.md)
* [TcsEmotion](https://github.com/ampproject/amphtml/blob/main/ads/tcsemotion.md)
* [Teads](https://github.com/ampproject/amphtml/blob/main/ads/teads.md)
* [torimochi](https://github.com/ampproject/amphtml/blob/main/ads/torimochi.md)
* [TripleLift](https://github.com/ampproject/amphtml/blob/main/ads/triplelift.md)
* [Trugaze](https://github.com/ampproject/amphtml/blob/main/ads/trugaze.md)
* [UZOU](https://github.com/ampproject/amphtml/blob/main/ads/uzou.md)
* [ValueCommerce](https://github.com/ampproject/amphtml/blob/main/ads/valuecommerce.md)
* [video intelligence](https://github.com/ampproject/amphtml/blob/main/ads/videointelligence.md)
* [Videonow](https://github.com/ampproject/amphtml/blob/main/ads/videonow.md)
* [Viralize](https://github.com/ampproject/amphtml/blob/main/ads/viralize.md)
* [UAS](https://github.com/ampproject/amphtml/blob/main/ads/uas.md)
* [ucfunnel](https://github.com/ampproject/amphtml/blob/main/ads/ucfunnel.md)
* [Unruly](https://github.com/ampproject/amphtml/blob/main/ads/unruly.md)
* [VMFive](https://github.com/ampproject/amphtml/blob/main/ads/vmfive.md)
* [Webediads](https://github.com/ampproject/amphtml/blob/main/ads/webediads.md)
* [Weborama](https://github.com/ampproject/amphtml/blob/main/ads/weborama.md)
* [Widespace](https://github.com/ampproject/amphtml/blob/main/ads/widespace.md)
* [Wisteria](https://github.com/ampproject/amphtml/blob/main/ads/wisteria.md)
* [WPMedia](https://github.com/ampproject/amphtml/blob/main/ads/wpmedia.md)
* [Xlift](https://github.com/ampproject/amphtml/blob/main/ads/xlift.md)
* [Yahoo](https://github.com/ampproject/amphtml/blob/main/ads/yahoo.md)
* [YahooJP](https://github.com/ampproject/amphtml/blob/main/ads/yahoojp.md)
* [Yandex](https://github.com/ampproject/amphtml/blob/main/ads/yandex.md)
* [Yengo](https://github.com/ampproject/amphtml/blob/main/ads/yengo.md)
* [Yieldbot](https://github.com/ampproject/amphtml/blob/main/ads/yieldbot.md)
* [Yieldmo](https://github.com/ampproject/amphtml/blob/main/ads/yieldmo.md)
* [Yieldone](https://github.com/ampproject/amphtml/blob/main/ads/yieldone.md)
* [Yieldpro](https://github.com/ampproject/amphtml/blob/main/ads/yieldpro.md)
* [Zedo](https://github.com/ampproject/amphtml/blob/main/ads/zedo.md)
* [Zucks](https://github.com/ampproject/amphtml/blob/main/ads/zucks.md)

## أنواع التضمينات المتوافقة <a name="supported-embed-types"></a>

* [24smi](https://github.com/ampproject/amphtml/blob/main/ads/24smi.md)
* [Bringhub](https://github.com/ampproject/amphtml/blob/main/ads/bringhub.md)
* [Dable](https://github.com/ampproject/amphtml/blob/main/ads/dable.md)
* [Engageya](https://github.com/ampproject/amphtml/blob/main/ads/engageya.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/main/ads/epeex.md)
* [Insticator](https://github.com/ampproject/amphtml/blob/main/ads/insticator.md)
* [Jubna](https://github.com/ampproject/amphtml/blob/main/ads/jubna.md)
* [Outbrain](https://github.com/ampproject/amphtml/blob/main/ads/outbrain.md)
* [Postquare](https://github.com/ampproject/amphtml/blob/main/ads/postquare.md)
* [PubExchange](https://github.com/ampproject/amphtml/blob/main/ads/pubexchange.md)
* [Smi2](https://github.com/ampproject/amphtml/blob/main/ads/smi2.md)
* [Taboola](https://github.com/ampproject/amphtml/blob/main/ads/taboola.md)
* [Zen](https://github.com/ampproject/amphtml/blob/main/ads/zen.md)
* [ZergNet](https://github.com/ampproject/amphtml/blob/main/ads/zergnet.md)