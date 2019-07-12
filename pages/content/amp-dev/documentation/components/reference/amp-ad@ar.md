---
$category@: ads-analytics
formats:
  - websites
teaser:
  text: A container to display an ad.
---

# amp-ad / amp-embed

هذا العنصر عبارة عن حاوية لعرض الإعلان. `amp-embed` هو اسم مستعار للعنصر `amp-ad`، ويستمد كل وظائفه ولكن باسم علامة مختلف. استخدِم `amp-embed` عندما تريد أن تكون أكثر دقة من حيث الدلالة. لا تتيح مستندات AMP سوى الإعلانات/التضمينات التي يتم عرضها عبر HTTPS.

# `amp-ad` / `amp-embed`

[tip type="note"]
من المحتمل أن تتطور مواصفات `amp-ad`/`amp-embed` بشكل ملحوظ بمرور الوقت. وتم تصميم الأسلوب الحالي لتشغيل شكل الإعلان مبدئيًا لتتمكن من عرض الإعلان.
[/tip]


<!---
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
    <td><code>&lt;script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"&gt;&lt;/script&gt;</code><br>ملاحظة: ربما لا يزال العنصر amp-ad يعمل بدون هذا النص البرمجي، لكننا ننصح باستخدام النص بشدة بغرض التوافق في المستقبل.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">التنسيقات المعتمدة</a></strong></td>
    <td>fill وfixed وfixed-height وflex-item وintrinsic وnodisplay وresponsive</td>
  </tr>
  <tr>
  <td class="col-fourty"><strong>أمثلة</strong></td>
  <td>اطِّلع على <a href="https://ampbyexample.com/components/amp-ad/">مثال amp-ad</a> في الموقع "AMP بالمثال".</td>
  </tr>
</table>

## السلوك

يتم تحميل الإعلانات مثل جميع الموارد الأخرى في مستندات AMP، مع عنصر مخصص خاص يُسمى `<amp-ad>`. لا يُسمح بتشغيل جافا سكريبت مقدم من شبكة إعلانات في مستند AMP. وبدلاً من ذلك، يحمّل وقت تشغيل AMP إطار iframe من أصل مختلف (من خلال وضع حماية إطارات iframe) مثل مستند AMP، ويعمل على تنفيذ جافا سكريبت المقدمة من شبكة الإعلانات داخل وضع حماية إطارات iframe هذا.

يتطلب العنصر `<amp-ad>` تحديد قيم العرض والارتفاع وفق [قاعدة](https://www.ampproject.org/docs/design/amp-html-layout#%28tl;dr%29-summary-of-layout-requirements-&amp;-behaviors) نوع التنسيق التابع له. ويتطلب أيضًا الوسيطة `type` التي تحدد شبكة الإعلانات التي يتم عرضها. يتم تلقائيًا تمرير جميع سمات `data-*` الموجودة على العلامة كوسيطات إلى الترميز الذي يعرض الإعلان في النهاية. وتختلف سمات `data-` المطلوبة حسب نوع الشبكة المعين كما يجب توثيقها باستخدام الشبكة.

#### مثال: عرض بعض الإعلانات

<!--embedded example - displays in ampproject.org -->

<div>
<amp-iframe height="522"
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampad.basic.embed.html" layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable>
  <div aria-label="عرض المزيد" overflow="" tabindex="0" role="button">عرض الترميز الكامل</div>
  <div placeholder=""></div>
</amp-iframe>
</div>

## السمات

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
    <td>يتم حجر السمات المبدوءة بـ <code>data-vars-</code> <a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute">لمتغيرات <code>amp-analytics</code></a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>json (اختياريّة)</strong></td>
    <td>استخدِم هذه السمة لتمرير تهيئة إلى الإعلان ككائن JSON معقد بشكل عشوائي. يتم تمرير الكائن إلى الإعلان كما هو دون أي تغيير في الأسماء.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id (اختياريّة)</strong></td>
    <td>في حال توفير هذه السمة، فإنها تتطلب تأكيد <a href="https://www.ampproject.org/docs/reference/components/amp-user-notification.html">amp-user-notification</a> بمعرّف HTML-id المعين إلى أن يتم تمرير "معرِّف عميل AMP" (يشبه ملف تعريف ارتباط) للمستخدِم إلى الإعلان. يعني هذا تأخر عرض الإعلان إلى أن يؤكد المستخدِم الإشعار.</td>
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
    <td>يتضمن هذا العنصر <a href="https://www.ampproject.org/docs/reference/common_attributes">السمات المشتركة</a> التي تشمل مكونات AMP.</td>
  </tr>
</table>

## العنصر النائب

يتيح `amp-ad` اختياريًا عنصرًا ثانويًا من خلال السمة `placeholder`. إذا كانت شبكة الإعلانات متوافقة، سيتم عرض هذا العنصر إلى أن يتوفر الإعلان للعرض. يمكنك معرفة المزيد من المعلومات في [العناصر النائبة والعناصر الاحتياطية](https://www.ampproject.org/docs/guides/responsive/placeholders).

```html
<amp-ad width=300 height=250
    type="foo">
  <div placeholder>Loading ...</div>
</amp-ad>
```

## عدم توفر أي إعلان

في حال عدم توفر أي إعلان للخانة، تحاول AMP تصغير العنصر `amp-ad` (أي تعيينه على `display: none`). تحدد AMP إمكانية إجراء هذه العملية بدون التأثير على موضع تمرير المستخدِم. إذا كان الإعلان في إطار العرض الحالي، لن يتم تصغير الإعلان لأنه يؤثر على موضع تمرير المستخدِم ولكن إذا كان الإعلان خارج إطار العرض الحالي، سيتم تصغيره.

في حال تعذُّر محاولة التصغير: يتيح المكوِّن `amp-ad` عنصرًا ثانويًا من خلال السمة `fallback`. إذا كان هناك عنصر احتياطي، سيتم عرض العنصر الاحتياطي المخصص. وإلا تطبق AMP العنصر الاحتياطي التلقائي.

مثال مع عنصر احتياطي:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## عرض إعلانات الفيديو

هناك 3 طرق لتحقيق الربح من الفيديوهات في AMP من خلال إعلانات الفيديو:

1. تتيح AMP أصلاً عمل عدد من مشغلات الفيديو، مثل BrightCove وDailyMotion وغيرهما والتي يمكنها تحقيق الربح من الإعلانات. للحصول على القائمة الكاملة، راجع مكونات [الوسائط](https://www.ampproject.org/docs/reference/components#media).

2. استخدِم المكوِّن [amp-ima-video](https://www.ampproject.org/docs/reference/components/amp-ima-video.html) الذي يأتي مع أداة تطوير البرامج لإعلانات الوسائط التفاعلية المضمّنة ومشغل فيديو HTML5.
3. إذا كنت تستخدم مشغل فيديو غير متوافق في AMP، يمكنك عرض مشغلك المخصص باستخدام [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
عند استخدام الأسلوب `amp-iframe`:

    * تأكد من وجود ملصق إذا تم تحميل المشغل في إطار العرض الأول. [يمكنك معرفة التفاصيل](https://www.ampproject.org/docs/reference/components/amp-iframe#iframe-with-placeholder).
    * يجب عرض الفيديو والملصق عبر HTTPS.</li>

## تشغيل الإعلانات من نطاق خاص

تتيح AMP تحميل إطار iframe للتشغيل المبدئي الذي يستخدَم لتحميل الإعلانات من نطاق خاص مثل نطاقك.

لتفعيل هذا، انسخ الملف [remote.html](../../3p/remote.html) إلى خادم الويب لديك. وبعد ذلك أضِف العلامة الوصفية التالية إلى ملفات AMP:

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

السمة `content` للعلامة الوصفية هي عنوان URL الكامل لنسختك من ملف remote.html على خادم الويب لديك. ويجب أن يستخدم عنوان URL هذا مخطط "https". لا يمكن استضافة العنوان على الأصل نفسه الذي عليه ملفات AMP. إذا استضفت مثلاً ملفات AMP على `www.example.com`، يجب ألا يكون عنوان URL هذا على النطاق `www.example.com` ولكن النطاق `something-else.example.com` مقبول. يمكنك مراجعة ["سياسة أصل إطارات Iframe"](../../spec/amp-iframe-origin-policy.md) للحصول على مزيد من التفاصيل عن الأصول المسموح بها لإطارات iframe.

### الأمان

**تحقق من صحة البيانات الواردة** قبل تمريرها إلى الوظيفة `draw3p` للتأكد من تنفيذ إطار iframe المهام المتوقعة منه فقط. ويكون هذا صحيحًا لا سيما مع شبكات الإعلانات التي تسمح بإدخال جافا سكريبت مخصص.

يجب تنفيذ إطارات Iframe بشكل يجعل تضمينها مقتصرًا على الأصول التي يُتوقع تضمينهم فيها فقط. قد تكون الأصول:

* أصولك الخاصة
* `https://cdn.ampproject.org` لذاكرة التخزين المؤقت لصفحات AMP

في حال ذاكرة التخزين المؤقت لصفحات AMP، تحتاج أيضًا إلى التحقق من أن "أصل المصدر" (أصل المستند الذي يعرضه cdn.ampproject.org) هو أحد أصولك.

يمكن تنفيذ الأصول باستخدام الوسيطة الثالثة لوظيفة `draw3p` ويجب أيضًا أن يتم ذلك باستخدام التوجيه [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) للحصول على إتاحة كاملة لعمل المتصفح.

### تحسين تهيئة الإعلانات الواردة

هذا العمل اختياري تمامًا: نسعى أحيانًا إلى تحسين طلب الإعلان قبل إرساله إلى خادم الإعلانات.

إذا كانت شبكة الإعلانات تتيح [الجلب السريع](https://www.ampproject.org/docs/ads/adnetwork_integration#creating-an-amp-ad-implementation)، يُرجى استخدام [تهيئة الوقت الفعلي](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md) (RTC). (تتيح عمليات تكامل DoubleClick وAdSense الجلب السريع وتهيئة الوقت الفعلي).

إذا كانت شبكة إعلاناتك تستخدم الجلب المؤجل، يمكنك إرسال رد اتصال على اتصال الوظيفة `draw3p` في الملف [remote.html](../../3p/remote.html). يتلقى رد الاتصال التهيئة الواردة كوسيطة أولى ثم يتلقى رد اتصال آخر كوسيطة ثانية (تحمل اسم `done` في المثال أدناه). يجب إجراء رد الاتصال هذا بالتهيئة المحدّثة حتى يتسنى استكمال عرض الإعلانات.

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

## التصميم

لا يجوز أن تحتوي عناصر `<amp-ad>` نفسها على حاويات بها المجموعة CSS `position: fixed` ولا يجوز وضعها في هذه الحاويات (باستثناء `amp-lightbox`).
ويرجع هذا إلى التأثيرات التي تلحق بتجربة المستخدِم نتيجة الإعلانات المركبة على الصفحة بأكملها. قد يتم النظر مستقبلاً في السماح بأشكال إعلانات مشابهة داخل حاويات AMP التي يتم التحكم فيها والتي تحافظ على بعض ثوابت تجربة المستخدِم.

## التحقق

اطِّلع على [قواعد amp-ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) في مواصفات مدقق AMP.

## شبكات الإعلانات المتوافقة

* [A8](../../ads/a8.md)
* [A9](../../ads/a9.md)
* [AccessTrade](../../ads/accesstrade.md)
* [Adblade](../../ads/adblade.md)
* [AdButler](../../ads/adbutler.md)
* [Adform](../../ads/adform.md)
* [Adfox](../../ads/adfox.md)
* [Ad Generation](../../ads/adgeneration.md)
* [Adhese](../../ads/adhese.md)
* [Adincube](../../ads/adincube.md)
* [ADITION](../../ads/adition.md)
* [Adman](../../ads/adman.md)
* [AdmanMedia](../../ads/admanmedia.md)
* [Admixer](../../ads/admixer.md)
* [AdOcean](../../ads/adocean.md)
* [AdPicker](../../ads/adpicker.md)
* [AdPlugg](../../ads/adplugg.md)
* [Adpon](../../ads/adpon.md)
* [AdReactor](../../ads/adreactor.md)
* [AdSense](../../ads/google/adsense.md)
* [AdSensor](../../ads/adsensor.md)
* [AdsNative](../../ads/adsnative.md)
* [AdSpeed](../../ads/adspeed.md)
* [AdSpirit](../../ads/adspirit.md)
* [AdStir](../../ads/adstir.md)
* [AdTech](../../ads/adtech.md)
* [AdThrive](../../ads/adthrive.md)
* [AdUnity](../../ads/adunity.md)
* [Ad Up Technology](../../ads/aduptech.md)
* [Adventive](../../ads/adventive.md)
* [Adverline](../../ads/adverline.md)
* [Adverticum](../../ads/adverticum.md)
* [AdvertServe](../../ads/advertserve.md)
* [Adyoulike](../../ads/adyoulike.md)
* [Affiliate-B](../../ads/affiliateb.md)
* [AMoAd](../../ads/amoad.md)
* [AppNexus](../../ads/appnexus.md)
* [AppVador](../../ads/appvador.md)
* [Atomx](../../ads/atomx.md)
* [Baidu](../../ads/baidu.md)
* [BeOpinion](../amp-beopinion/amp-beopinion.md)
* [Bidtellect](../../ads/bidtellect.md)
* [brainy](../../ads/brainy.md)
* [Broadstreet Ads](../../ads/broadstreetads.md)
* [CA A.J.A. Infeed](../../ads/caajainfeed.md)
* [CA-ProFit-X](../../ads/caprofitx.md)
* [Cedato](../../ads/cedato.md)
* [Chargeads](../../ads/chargeads.md)
* [Colombia](../../ads/colombia.md)
* [Connatix](../../ads/connatix.md)
* [Content.ad](../../ads/contentad.md)
* [Criteo](../../ads/criteo.md)
* [CSA](../../ads/google/csa.md)
* [CxenseDisplay](../../ads/eas.md)
* [Dianomi](../../ads/dianomi.md)
* [Directadvert](../../ads/directadvert.md)
* [DistroScale](../../ads/distroscale.md)
* [Dot and Media](../../ads/dotandads.md)
* [Doubleclick](../../ads/google/doubleclick.md)
* [eADV](../../ads/eadv.md)
* [E-Planning](../../ads/eplanning.md)
* [Ezoic](../../ads/ezoic.md)
* [Felmat](../../ads/felmat.md)
* [FlexOneELEPHANT](../../ads/f1e.md)
* [FlexOneHARRIER](../../ads/f1h.md)
* [Flite](../../ads/flite.md)
* [fluct](../../ads/fluct.md)
* [FreeWheel](../../ads/freewheel.md)
* [Fusion](../../ads/fusion.md)
* [GenieeSSP](../../ads/genieessp.md)
* [Giraff](../../ads/giraff.md)
* [GMOSSP](../../ads/gmossp.md)
* [GumGum](../../ads/gumgum.md)
* [Holder](../../ads/holder.md)
* [I-Mobile](../../ads/imobile.md)
* [Imonomy](../../ads/imonomy.md)
* [iBillboard](../../ads/ibillboard.md)
* [Imedia](../../ads/imedia.md)
* [Improve Digital](../../ads/improvedigital.md)
* [Index Exchange](../../ads/ix.md)
* [Industrybrains](../../ads/industrybrains.md)
* [InMobi](../../ads/inmobi.md)
* [Innity](../../ads/innity.md)
* [Kargo](../../ads/kargo.md)
* [Kiosked](../../ads/kiosked.md)
* [Kixer](../../ads/kixer.md)
* [Kuadio](../../ads/kuadio.md)
* [Ligatus](../../ads/ligatus.md)
* [LockerDome](../../ads/lockerdome.md)
* [LOKA](../../ads/loka.md)
* [MADS](../../ads/mads.md)
* [MANTIS](../../ads/mantis.md)
* [Media.net](../../ads/medianet.md)
* [MediaImpact](../../ads/mediaimpact.md)
* [Mediavine](../../ads/mediavine.md)
* [Medyanet](../../ads/medyanet.md)
* [Meg](../../ads/meg.md)
* [MicroAd](../../ads/microad.md)
* [MixiMedia](../../ads/miximedia.md)
* [Mixpo](../../ads/mixpo.md)
* [Monetizer101](../../ads/monetizer101.md)
* [mox](../../ads/mox.md)
* [myTarget](../../ads/mytarget.md)
* [myWidget](../../ads/mywidget.md)
* [Nativo](../../ads/nativo.md)
* [Navegg](../../ads/navegg.md)
* [Nend](../../ads/nend.md)
* [NETLETIX](../../ads/netletix.md)
* [Noddus](../../ads/noddus.md)
* [Nokta](../../ads/nokta.md)
* [OneAD](../../ads/onead.md)
* [OnNetwork](../../ads/onnetwork.md)
* [Open AdStream (OAS)](../../ads/openadstream.md)
* [OpenX](../../ads/openx.md)
* [Pixels](../../ads/pixels.md)
* [plista](../../ads/plista.md)
* [polymorphicAds](../../ads/polymorphicads.md)
* [popin](../../ads/popin.md)
* [Pressboard](../../ads/pressboard.md)
* [PromoteIQ](../../ads/promoteiq.md)
* [PubGuru](../../ads/pubguru.md)
* [PubMatic](../../ads/pubmatic.md)
* [Pubmine](../../ads/pubmine.md)
* [PulsePoint](../../ads/pulsepoint.md)
* [Purch](../../ads/purch.md)
* [Rambler&amp;Co](../../ads/capirs.md)
* [RbInfoxSg](../../ads/rbinfox.md)
* [Realclick](../../ads/realclick.md)
* [recomAD](../../ads/recomad.md)
* [Red for Publishers](../../ads/rfp.md)
* [Relap](../../ads/relap.md)
* [Revcontent](../../ads/revcontent.md)
* [RevJet](../../ads/revjet.md)
* [Rubicon Project](../../ads/rubicon.md)
* [RUNative](../../ads/runative.md)
* [SAS CI 360 Match](../../ads/sas.md)
* [Sekindo](../../ads/sekindo.md)
* [Sharethrough](../../ads/sharethrough.md)
* [Sklik](../../ads/sklik.md)
* [SlimCut Media](../../ads/slimcutmedia.md)
* [Smart AdServer](../../ads/smartadserver.md)
* [smartclip](../../ads/smartclip.md)
* [sogou Ad](../../ads/sogouad.md)
* [Sortable](../../ads/sortable.md)
* [SOVRN](../../ads/sovrn.md)
* [Speakol](../../ads/speakol.md)
* [SpotX](../../ads/spotx.md)
* [SunMedia](../../ads/sunmedia.md)
* [Swoop](../../ads/swoop.md)
* [TcsEmotion](../../ads/tcsemotion.md)
* [Teads](../../ads/teads.md)
* [torimochi](../../ads/torimochi.md)
* [TripleLift](../../ads/triplelift.md)
* [Trugaze](../../ads/trugaze.md)
* [UZOU](../../ads/uzou.md)
* [ValueCommerce](../../ads/valuecommerce.md)
* [video intelligence](../../ads/videointelligence.md)
* [Videonow](../../ads/videonow.md)
* [Viralize](../../ads/viralize.md)
* [UAS](../../ads/uas.md)
* [ucfunnel](../../ads/ucfunnel.md)
* [Unruly](../../ads/unruly.md)
* [VMFive](../../ads/vmfive.md)
* [Webediads](../../ads/webediads.md)
* [Weborama](../../ads/weborama.md)
* [Widespace](../../ads/widespace.md)
* [Wisteria](../../ads/wisteria.md)
* [WPMedia](../../ads/wpmedia.md)
* [Xlift](../../ads/xlift.md)
* [Yahoo](../../ads/yahoo.md)
* [YahooJP](../../ads/yahoojp.md)
* [Yandex](../../ads/yandex.md)
* [Yengo](../../ads/yengo.md)
* [Yieldbot](../../ads/yieldbot.md)
* [Yieldmo](../../ads/yieldmo.md)
* [Yieldone](../../ads/yieldone.md)
* [Yieldpro](../../ads/yieldpro.md)
* [Zedo](../../ads/zedo.md)
* [Zucks](../../ads/zucks.md)

## أنواع التضمينات المتوافقة

* [24smi](../../ads/24smi.md)
* [AJA](../../ads/aja.md)
* [Bringhub](../../ads/bringhub.md)
* [Dable](../../ads/dable.md)
* [Engageya](../../ads/engageya.md)
* [Epeex](../../ads/epeex.md)
* [Jubna](../../ads/jubna.md)
* [Outbrain](../../ads/outbrain.md)
* [Postquare](../../ads/postquare.md)
* [PubExchange](../../ads/pubexchange.md)
* [Smi2](../../ads/smi2.md)
* [Taboola](../../ads/taboola.md)
* [Zen](../../ads/zen.md)
* [ZergNet](../../ads/zergnet.md)
