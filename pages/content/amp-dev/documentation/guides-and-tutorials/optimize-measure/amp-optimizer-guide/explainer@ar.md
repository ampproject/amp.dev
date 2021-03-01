---
'$title': كيف يعمل AMP Optimizer
$order: 1
description: يتخذ AMP Optimizer مستند AMPHTML صالحًا كمدخلات ويحوله إلى نسخة محسّنة عن طريق تطبيق تحسينات إضافية من الصعب القيام بها "يدويًا". يوضح هذا الدليل بالتفصيل كيفية عمل مُحسِّن AMP.
formats:
  - websites
  - stories
author: sebastianbenz
---

يتخذ AMP Optimizer مستند AMPHTML صالحًا كمدخلات ويحوله إلى نسخة محسّنة عن طريق تطبيق تحسينات إضافية من الصعب القيام بها "يدويًا". يمكنك التعرّف على "**AMP المحوَل**" الناتج في عنصر `html` من خلال السمة `transformed`:

```
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self;v=1">
```

ملاحظة: تستخدم ذاكرات AMP للتخزين المؤقت علامة محوّلة مختلفة، على سبيل المثال، تضيف ذاكرات Google للتخزين المؤقت `transformed=google;v=1`.

تقوم AMP Optimizers بإجراء تحسينات متنوعة على مستند AMP بدءً من تخطيطات العرض من جانب الخادم إلى تحسين الصورة. في ما يلي مثال يوضح الاختلافات بين صفحة AMP ونسختها المحسّنة ([انقر للحصول على الإصدار الكامل](/static/img/docs/guides/optimized-amp-diff.png)).

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

في بقية هذا الدليل، سنعرض هذه التحسينات بمزيد من التفصيل.

### تخطيطات AMP الخاصة بالعرض من جانب الخادم

تتمتع تخطيطات AMP للعرض من جانب الخادم بأكبر إمكانات لتحسين أداء تحميل صفحة AMP الخاصة بك. لتجنب قفزات المحتوى، تتطلب AMP من مواقع الويب إضافة رمز [AMP-boilerplate](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) في رأس الصفحة. يخفي AMP-boilerplate محتوى الصفحة عن طريق تعيين تعتيم نص الصفحة على 0. وبمجرد تحميل AMP، يمكنه حساب تنسيق الصفحة. بعد ذلك، يعيّن AMP تعتيم الجسم على 1 مما يجعل محتوى الصفحة مرئيًا. للأسف، يجب أن يقوم هذا الأسلوب بتنزيل إطار عمل AMP قبل أن يتمكن من عرض الصفحة.

لتحسين ذلك، يمكن عرض تخطيطات AMP، مثل `responsive` أو `fixed-height` من جانب الخادم قبل عرض الصفحة إلى وكيل المستخدم. بهذه الطريقة، يصبح من الممكن إزالة AMP-boilerplate مع الاستمرار في تجنب [تحولات المحتوى](https://web.dev/cls/) أثناء تحميل الصفحة.

يقوم العرض من جانب الخادم بثلاثة أشياء:

⁣ **1. إزالة AMP boilerplate: ** لكل عنصر يستخدم تخطيط AMP، يتم إدخال الترميز الخاص بالتخطيط.

⁣**2. Inline AMP-internal CSS styles: ** the AMP-boilerplate code is replaced by the <a href="https://cdn.ampproject.org/v0.cs">AMP-runtime CSS styles</a>: `<style amp-runtime>...</style>`. For non-server-side rendered documents, AMP adds these styles at runtime. However, server-side-rendered AMP pages require these for the AMP layouts to work before AMP has been loaded. To avoid potential version conflicts, at runtime, AMP will check if the version specified in i-amphtml-version="011905222334000" differs from the current AMP version and will update the CSS with the latest version if not.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

⁣ **3. تخطيطات AMP المعروضة من جانب الخادم: ** لكل عنصر يستخدم تخطيط AMP، يتم إدخال عناصر الحجم الخاصة بالتخطيط.

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

تحذير: لا يمكن إزالة AMP boilerplate دائمًا. يمكنك معرفة ما إذا تمت إزالة AMP boilerplate أم لا، عن طريق التحقق مما إذا كانت السمة `i-amphtml-no-boilerplate` موجودة في العنصر `html`. على سبيل المثال، يعمل المكوِّن `amp-experiment` على تغيير محتوى الصفحة في وقت التشغيل. لتجنب تحولات المحتوى، يجب أن يكون رمز AMP-boilerplate موجودًا في حالة استخدام `amp-experiment` على الصفحة.

### تحسين الصورة الرئيسية

يمكن لـ AMP Optimizer تحسين الوقت الذي يستغرقه عرض الصور في إطار العرض الأول بشكل ملحوظ. يعد هذا أمرًا بالغ الأهمية عند تحسين [LCP times](https://web.dev/lcp/) لتتوافق مع [أساسيات الويب الأساسية](https://web.dev/vitals).

في AMP، يمكن الإعلان عن الصور الرئيسية صراحةً من خلال إضافة تعليق توضيحي إلى `amp-img` باستخدام السمة `data-hero`:

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

تدعم AMP Optimizers صورتين رئيستين كحد أقصى على الصفحة لتجنب تعطيل النطاق الترددي للموارد الهامة الأخرى. إذا كان هذا الحد لا يناسبك، [فيرجى إخبارنا بذلك](https://github.com/ampproject/amp-toolbox/issues).

ستكتشف AMP Optimizers أيضًا تلقائيًا الصور الرئيسية لعناصر `amp-img` أو `amp-iframe` أو `amp-video` أو `amp-video-iframe` وتقوم بحقن `link rel=preload` للصورة `src` . يعمل الاكتشاف التلقائي من خلال تحليل ترميز HTML وتخطيطات الصور لاكتشاف الصور الكبيرة في منفذ العرض الأول.

في حالة `amp-img`، ستعرض AMP Optimizers من جانب الخادم علامة `img` داخل `amp-img` . يتيح ذلك للمتصفح عرض الصورة على الفور دون الحاجة إلى وقت تشغيل AMP.

### تحسين الصورة

يمكن أن تساعدك AMP Optimizers على تقديم صور متجاوبة محسّنة من خلال إنشاء سمات `srcset` الخاصة بتخطيط AMP. على سبيل المثال، إعلان `amp-img` التالي:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive"></amp-img>
```

تم تحسينه بتعريف `srcset` التالي:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive" srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"></amp-img>
```

لكي يعمل هذا الأمر، تحتاج بيئة البناء/الاستضافة إلى دعم تغيير/تحسين الصور. راجع أدلة المحسن الفردية حول كيفية دمج تحسين الصورة بشكل أفضل.

### AMP Module Build (قريبًا)

يتوفر إصدار أصغر من AMP Runtime والمكونات استنادًا إلى [JavaScript Modules](https://v8.dev/features/modules#browser) التي تتطلب من المستخدمين تنزيل كمية أقل من JavaScript عند عرض صفحة AMP. تعمل مُحسِنات AMP على تمكين إنشاء وحدة AMP افتراضيًا عن طريق تحويل:

```
<script async src="https://www.ampproject.org/v0.js"></script>
```

إلى:

```
<script type="module" async src="https://www.ampproject.org/v0.mjs"></script>
<script nomodule async src="https://www.ampproject.org/v0.js"></script>
```

المتصفحات التي تقرأ `type="module"` تتجاهل النصوص البرمجية التي تأتي بسمة `nomodule`. وهذا يعني أن المستخدمين الذين لديهم متصفحات حديثة سيستفيدون من حِزم وقت التشغيل الأصغر، في حين أن المستخدمين على المتصفحات القديمة سيعودون إلى الإصدار غير المخطط من وقت تشغيل AMP.

ملاحظة: لا يتوفر AMP Module Build إلا لصفحات AMP المحولة لأنه يتطلب تضمين AMP Runtime CSS.
