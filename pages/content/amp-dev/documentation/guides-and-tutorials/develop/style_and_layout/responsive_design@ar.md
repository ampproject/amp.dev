---
'$title': إنشاء صفحات AMP سريعة الاستجابة
$order: 5
description: يتعلق تصميم الويب سريع الاستجابة بإنشاء صفحات ويب مرنة تستجيب لاحتياجات المستخدم؛ الصفحات التي تناسب حجم شاشة الجهاز واتجاهه. ويمكنك تحقيق ...
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
  - youtube
author: bpaduch
contributors:
  - pbakaus
---

## مقدمة

يتعلق تصميم الويب سريع الاستجابة بإنشاء صفحات ويب مرنة تستجيب لاحتياجات المستخدم؛ الصفحات التي تناسب حجم شاشة الجهاز واتجاهه. ويمكنك تحقيق ذلك بسهولة في AMP؛ حيث يدعم AMP جميع فئات الشاشات والأجهزة ويوفر مكونات مدمجة سريعة الاستجابة.

وسنوضح لك في هذا الدليل طريقة تنفيذ هذه الأسس سريعة الاستجابة في AMP بسهولة:

- [التحكم في منفذ العرض](#controlling-the-viewport)
- [إنشاء مخطط سريع الاستجابة](#creating-a-responsive-layout)
- [تغيير حجم الوسائط](#scaling-media-for-the-page)

[video src='https://www.youtube.com/watch?v=XDvbJ2apaiA' caption='تعرف على التصميم سريع الاستجابة في AMP في هذا الفيديو.']

## التحكم في منفذ العرض <a name="controlling-the-viewport"></a>

[تصفية التنسيقات="مواقع الويب، الإعلانات، القصص"] لتحسين صفحة الويب الخاصة بك بحيث يتسع المحتوى ويتناسب مع نافذة المتصفح لأي جهاز، يلزمك تحديد عنصر منفذ العرض `meta`. إذ يوجه عنصر منفذ العرض المتصفح نحو طريقة تغيير حجم المنطقة المرئية (منفذ العرض) لصفحة الويب وحجمها.

لكن ما هي القيم التي يجب أن تستخدمها؟ حسنًا، تم توضيح ذلك بالفعل في AMP من أجلك. كجزء من [لغة الترميز المطلوبة](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) لصفحات AMP، عليك تحديد منفذ العرض التالي:

```html
<meta name="viewport" content="width=device-width" />
```

هذه هي إعدادات منفذ العرض النموذجية التي تستخدمها لموقع سريع الاستجابة. على الرغم من أن `initial-scale=1` ليس مطلوبًا لصفحة AMP صالحة، إلا أنه يوصى به لأنه يضبط مستوى التكبير/التصغير على 1 عند تحميل الصفحة لأول مرة. [/filter]

[تصفية التنسيقات="البريد الإلكتروني"] هذا القسم صالح فقط لمواقع AMP وإعلاناته وقصصه. [/filter]

## إنشاء مخطط سريع الاستجابة <a name="creating-a-responsive-layout"></a>

في المخطط سريع الاستجابة، يمكنك استخدام استعلامات [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) الخاصة بـ CSS لتخصيص نمط صفحة الويب لديك لأبعاد مختلفة للشاشة دون الحاجة إلى تغيير محتوى الصفحة. في AMP، يمكنك الاستمرار في استخدام استعلامات `@media` نفسها الخاصة بـ CSS. بالإضافة إلى ذلك، ومن أجل التحكم بشكل أفضل في عنصر AMP، يمكنك تحديد السمة `media` على العنصر. ويكون هذا مفيدًا بشكل خاص عند الحاجة إلى إظهار عنصر أو إخفائه بناءً على استعلام وسائط. راجع قسم [تغيير الاتجاه الفني لصورة](#changing-the-art-direction-of-an-image) للحصول على مثال يستخدم السمة `media`.

قد يكون تغيير حجم كل عنصر ليلائم الشاشة أمرًا صعبًا<sup><a href="#fn1" id="ref1">\*</a></sup>. ومع ذلك، يمكنك في AMP جعل العنصر مستجيبًا بسهولة من خلال تحديد السمة `"layout=responsive"` مع سمتي `width` و`height` للعنصر. وعندما تقوم بتطبيق التخطيط `responsive` على عنصر ما، فسيتم تغيير حجم هذا العنصر تلقائيًا حسب عرض عنصر الحاوية الخاص به، وسيتغير الارتفاع بناءً على نسبة العرض إلى الارتفاع المحددة بواسطة عرض العنصر وارتفاعه. وتدعم جميع عناصر AMP تقريبًا تخطيط `responsive`؛ ارجع إلى الوثائق المرجعية للعنصر لمعرفة التخطيطات المدعومة.

على الرغم من أنه يمكنك بسهولة جعل العناصر تستجيب باستخدام `"layout=responsive"`، فلا يزال عليك التفكير في طريقة ظهور عناصرك على جميع أحجام الشاشات؛ بما في ذلك سطح المكتب والجهاز اللوحي. ويتمثل الخطأ الشائع في السماح للصورة بأخذ العرض الكامل للشاشة، مما يؤدي إلى توسيع الصورة إلى أكثر من الحجم المقصود، مما يتسبب في تجربة سيئة لمستخدمي الشاشة العريضة. وعلى نحو افتراضي، ستأخذ العناصر ذات `layout=responsive` العرض الكامل لحاوية العنصر، والذي غالبًا ما يكون عرضه غير مقيد (على سبيل المثال، العرض = 100٪). ويمكنك تحسين طريقة ظهور الصور بمجرد تقييد عرض حاوية الصورة. على سبيل المثال، من خلال تعيين قاعدة "max-width" إلى "body" أو "main"، حيث يمكنك تقييد جميع الصور بحد أقصى محدد للعرض.

##### مثال: تقييد عرض الصور المتجاوبة

في المثال التالي، لدينا صورة زهور (640 × 427 بكسل) نرغب في عرضها على جميع أحجام الشاشات، لذلك حددنا`width` و`height`، ثم قمنا بتعيين التخطيط إلى `responsive`.

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

ومع ذلك، لا نرغب في أن تتعدى الصورة حجمها المقصود، لذا قمنا بتعيين`max-width` إلى الحاوية على 700 بكسل عبر CSS المخصص:

```html
<style amp-custom>
  .resp-img {
    max-width: 700px;
  }
</style>
```

[tip type="read-on"] **تابع القراءة –** لمعرفة المزيد حول التنسيقات المختلفة في AMP، راجع دليل [استعلامات التخطيط والوسائط](control_layout.md#the-layout-attribute). [/tip]

<a id="fn1"></a> [tip type="note"] **ما السبب وراء صعوبة تغيير حجم العناصر لتلائم الشاشة بينما يمكنني القيام بذلك بسهولة باستخدام النمط `width=100%`؟**

يتمثل الجزء الصعب في عرض العناصر سريعة الاستجابة على الصفحة دون التأثير سلبًا على مقاييس الأداء أو تجربة المستخدم. نعم، يمكنك بسهولة الحصول على صور تناسب الشاشة مع "العرض = 100٪" ولكن هناك تدني في مستوى الأداء. ويجب أن يقوم المتصفح بتنزيل الصورة أولًا للحصول على أبعادها، ثم تغيير حجمها بشكل مناسب لحجم الشاشة، وأخيرًا إعادة تدفق الصفحة وإعادة رسمها. أما في AMP، يتم تحسين مسار العرض بحيث يتم تخطيط الصفحة أولًا، مع وضع العناصر النائبة للصور جانبًا بناءً على الأبعاد المتوفرة في [`amp-img`](../../../../documentation/components/reference/amp-img.md) (باستخدام هذه الأرقام لتحديد نسبة العرض إلى الارتفاع)، ثم يتم تنزيل الموارد، ويتم رسم الصفحة. ولا يلزم إعادة التدفق. [/tip]

## Scaling media for the page <a name="scaling-media-for-the-page"></a>

ربما يتثمل الجانب الأكثر تحديًا في التصميم سريع الاستجابة في عرض الوسائط عرضًا صحيحًا على الصفحة بحيث تستجيب لخصائص الشاشة. في هذا القسم، سنلقي نظرة على طريقة تضمين مقاطع فيديو وصور سريعة الاستجابة على صفحات AMP.

### تضمين مقاطع الفيديو

عند القيام بتضمين مقطع فيديو في صفحة الويب الخاصة لديك، فأنت ترغب في التأكد من أن المستخدم بإمكانه رؤية محتويات الفيديو وعناصر التحكم به (على سبيل المثال، عدم وجود تدفق زائد). وستحقق ذلك عادةً من خلال مجموعة من استعلامات وسائط CSS والحاوية وCSS الأخرى. أما في AMP، تحتاج فقط إلى إضافة عنصر الفيديو إلى صفحتك، وتحديد `layout=responsive` على العنصر — لا توجد CSS إضافية.

##### مثال: تضمين فيديو YouTube

في المثال التالي، نرغب في عرض فيديو YouTube مضمن يستجيب لحجم واتجاه شاشة الجهاز. بإضافة `"layout=responsive"` إلى العنصر <a><code data-md-type="codespan">amp-youtube</code></a>، يتم تغيير حجم الفيديو ليناسب النافذة، ويتم الحفاظ على نسبة العرض إلى الارتفاع وفقًا لـ `width` و`height`. المحددين.

[example preview="top-frame" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

هناك العديد من أنواع مقاطع الفيديو التي يمكنك إضافتها إلى صفحات AMP لديك. للحصول على مزيد من التفاصيل، راجع قائمة [مكونات الوسائط](../../../../documentation/components/index.html#media) المتوفرة.

### عرض صور متجاوبة <a name="displaying-responsive-images"></a>

تشكل الصور جزءًا كبيرًا من صفحة الويب (حوالي [65% من مقدار بايت الصفحة](http://httparchive.org/interesting.php#bytesperpage)). على الأقل، يجب أن تكون صورك مرئية على أحجام واتجاهات مختلفة للشاشة (على سبيل المثال، لا يتعين على المستخدم التمرير التصغير/التكبير لرؤية الصورة بأكملها). ويتم إجراء ذلك بسهولة في AMP عبر السمة `"layout=responsive"` (راجع [تضمين الصور في AMP ](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)). بالإضافة إلى الصورة المتجاوبة الأساسية، إذ قد ترغب في خدمة موارد صور متعددة من أجل:

- [عرض صور نقية للحصول على الدقة المناسبة](#serving-crisp-images-for-the-right-resolution)
- [تغيير الاتجاه الفني للصورة](#changing-the-art-direction-of-an-image)
- [توفير تنسيقات صور محسنة](#providing-optimized-images)

#### عرض صور نقية للحصول على الدقة المناسبة <a name="serving-crisp-images-for-the-right-resolution"></a>

بالنسبة للشاشات عالية الدقة (على سبيل المثال، شاشة Retina)، يجب توفير صور تبدو نقية وحادة؛ ومع ذلك، لا ترغب في استخدام الصورة نفسها على الأجهزة منخفضة الدقة لأن ذلك سيؤدي إلى وقت تحميل إضافي غير ضروري. أما في صفحات AMP والتي ليست بتنسيق AMP، يمكنك عرض الصورة الصحيحة لكثافة بكسل الشاشة باستخدام `srcset` مع واصف العرض `w` ).

[tip type="note"] **ملحوظة –** يعمل محدد srcset المستند إلى DPR (`x`) أيضًا؛ ومع ذلك، ومن أجل مزيد من المرونة؛ نوصي باستخدام محدد `w`. وقام الواصف `w` مسبقًا (في اقتراح srcset القديم) بوصف عرض منفذ العرض، لكنه يصف الآن عرض ملف مصدر الصورة، مما يسمح لوكيل المستخدم بحساب كثافة البكسل الفعالة لكل صورة واختيار الصورة المناسبة لعرضها. [/tip]

##### مثال: عرض صورة نقية تلائم الشاشة

في المثال التالي، لدينا العديد من ملفات الصور التي لها نسبة العرض إلى الارتفاع نفسها ولكن بدقة مختلفة. ومن خلال توفير درجات دقة مختلفة للصور، يمكن للمتصفح اختيار الصورة التي تناسب دقة الجهاز. بالإضافة إلى ذلك، قمنا بتحديد الحجم لعرض الصورة عند:

- لعرض منفذ عرض يصل إلى 400 بكسل، قم بعرض الصورة بنسبة 100٪ من عرض منفذ العرض.
- لعرض منفذ عرض يصل إلى 900 بكسل، قم بعرض الصورة بنسبة 75% من عرض منفذ العرض.
- لأي شيء أكبر من 900 بكسل، قم بعرض الصورة عند 600 بكسل على نطاق واسع.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="apple"
  src="{{server_for_email}}/static/inline-examples/images/apple.jpg"
  height="596"
  width="900"
  srcset="{{server_for_email}}/static/inline-examples/images/apple-900.jpg 900w,
            {{server_for_email}}/static/inline-examples/images/apple-800.jpg 800w,
            {{server_for_email}}/static/inline-examples/images/apple-700.jpg 700w,
            {{server_for_email}}/static/inline-examples/images/apple-600.jpg 600w,
            {{server_for_email}}/static/inline-examples/images/apple-500.jpg 500w,
            {{server_for_email}}/static/inline-examples/images/apple-400.jpg 400w"
  sizes="(max-width: 400px) 100vw,
            (max-width: 900px) 75vw, 600px"
>
</amp-img>
```

[/example]

على سبيل المثال، لنفترض أن لدينا جهازًا يبلغ عرض منفذ العرض الخاص به 412 بكسل وDPR 2.6. وبناءً على الرمز أعلاه، يجب عرض الصورة بنسبة 75٪ من عرض منفذ العرض، لذلك يختار المتصفح صورة قريبة من 803 بكسل (412 _ 0.75 _ 2.6)، والتي تصادف أن تكون `apple-800.jpg`.

[tip type="read-on"] **تابع القراءة –** لمزيد من المعلومات حول استخدام srcset والأحجام في AMP، راجع الدليل [الاتجاه الفني مع srcset، والأحجام والارتفاعات](art_direction.md). [/tip]

#### تغيير الاتجاه الفني للصورة <a name="changing-the-art-direction-of-an-image"></a>

يشير الاتجاه الفني إلى تكييف الخصائص المرئية للصورة مع نقاط توقف معينة. على سبيل المثال، بدلًا عن مجرد تغيير حجم الصورة أثناء تضييق الشاشة، قد ترغب في عرض نسخة مقصوصة من الصورة التي تضيق تركيز الصورة أو قد ترغب في عرض صور مختلفة تمامًا عند نقاط التوقف المختلفة. أما في HTML، يمكنك تحقيق ذلك باستخدام عنصر `picture`. أما في AMP، يمكن تحقيق الاتجاه الفني باستخدام السمة `media`.

##### مثال: صور مختلفة الحجم لنقاط توقف مختلفة

في المثال التالي، لدينا 3 صور مقصوصة مختلفة لقطط نريد عرضها في نقاط توقف مختلفة. لذا، في حالة ما إذا كان عرض منفذ العرض عبارة عن:

- 670 بكسل أو أكبر، اعرض `cat-large.jpg` (650 × 340 بكسل)
- 470 - 669 بكسل، اعرض `cat-medium.jpg` (450 x 340 بكسل)
- 469 بكسل أو أقل، اعرض `cat-small.jpg` (226 x 340 بكسل)

[tip type="note"] **ملحوظة –** نظرًا لأننا أردنا أن تكون الصور ذات أحجام ثابتة (على سبيل المثال، عدم وجود انحرافات)، لم نحدد قيمة مخطط، والتي سيتم تعيينها افتراضيًا إلى `layout=fixed` لأننا قمنا بتعيين العرض والارتفاع. ولمزيد من المعلومات، راجع ["ماذا لو لم يتم تحديد سمة التخطيط؟"](control_layout.md#what-if-the-layout-attribute-isnt-specified). [/tip]

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="grey cat"
  media="(min-width: 670px)"
  width="650"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-large.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(min-width: 470px) and (max-width: 669px)"
  width="450"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-medium.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(max-width: 469px)"
  width="226"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-small.jpg"
></amp-img>
```

[/example]

[tip type="read-on"] **تابع القراءة –** لمعرفة المزيد حول الاتجاه الفني في AMP، راجع دليل [الاتجاه الفني باستخدام srcset والأحجام والارتفاعات](art_direction.md). [/tip]

#### توفير تنسيقات محسَّنة <a name="providing-optimized-images"></a>

يتطلب تقديم صفحات تحميل سريعة صورًا محسَّنة؛ وذلك من حيث الحجم والجودة والتنسيق. قم دائمًا بتقليل أحجام الملفات إلى أدنى مستوى جودة مقبول. وهناك العديد من الأدوات التي يمكنك استخدامها "لضغط" الصور (على سبيل المثال، [ImageAlph](http://pngmini.com/lossypng.html) أو [TinyPNG](https://tinypng.com/)). أما فيما يتعلق بتنسيقات الصور، توفر بعض تنسيقات الصور قدرات ضغط أفضل من غيرها (على سبيل المثال، WebP وJPEG XR مقابل JPEG). وستحتاج إلى توفير الصورة الأكثر تحسينًا للمستخدم، بالإضافة إلى ضمان دعم الصورة بواسطة متصفح المستخدم (على سبيل المثال، [لا تدعم جميع المتصفحات كل تنسيقات الصور](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)).

في HTML، يمكنك تقديم تنسيقات صور مختلفة باستخدام علامة `picture`. أما في AMP، على الرغم من أن علامة `picture` غير مدعومة، يمكنك عرض صور مختلفة باستخدام السمة `fallback`.

[tip type="read-on"] **تابع القراءة –** لمعرفة المزيد حول الاحتياطيات، راجع الدليل [العناصر النائبة والاحتياطية](placeholders.md). [/tip]

في AMP، هناك طريقتان للنجاح في عرض الصور المحسَّنة:

- يمكن للمطورين الذين يستخدمون تنسيقات صور غير مدعومة على نطاق واسع، مثل WebP، تهيئة خادمهم لمعالجة ترويسات `Accept` للمتصفح والاستجابة بوحدات بايت الصورة وترويسة [`Content-Type` المناسبة](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/client-hints/). وهذا يجعل المتصفح يتجنب تنزيل أنواع الصور التي لا يدعمها. اقرأ المزيد حول [تفاوض المحتوى](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation).[sourcecode:html] Accept: image/webp,image/apng,image/_,_/\*;q=0.8 [/sourcecode]
- توفير صور احتياطية متداخلة، مثل المثال أدناه.

##### مثال: عرض تنسيقات صور مختلفة

في المثال التالي، إذا كان المستعرض يدعم WebP، فقم بعرض Mountains.webp، وبخلاف ذلك قم بعرض Mountains.jpg.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp"
>
  <amp-img
    alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"
  ></amp-img>
</amp-img>
```

[/example]

كمكافأة لطيفة، تقوم بعض ذاكرات التخزين المؤقت، مثل Google AMP Cache، بضغط الصور وتحويلها تلقائيًا إلى WebP واختيار الدقة المناسبة إذا لم تقم بذلك. ومع ذلك، لا تستخدم كل المنصات ذاكرات التخزين المؤقت، لذلك لا يزال يتعين عليك تحسين الصور يدويًا من جانبك.

[tip type="read-on"] **تابع القراءة –** لمعرفة المزيد حول تحسينات الصور التي تطبقها ذاكرة Google AMP للتخزين المؤقت، راجع منشور التدوينة [ "ذاكرة Google AMP للتخزين المؤقت وAMP Lite والحاجة إلى السرعة"](https://developers.googleblog.com/2017/01/google-amp-cache-amp-lite-and-need-for.html). [/tip]

## أمثلة لإلهامك

إليك بعض الأمثلة التي نأمل أن تكون مصدر إلهام لك لإنشاء صفحات AMP سريعة الاستجابة:

#### الإنتاج

- [Getty Images "2016 in Focus" ](http://www.gettyimages.com/2016/)
- [BRIT + CO's holiday gift guide](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [The Guardian](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### منشأة بواسطة AMP

- [أمثلة](../../../../documentation/examples/index.html)
- [القوالب ](../../../../documentation/templates/index.html)
- [AMP Conf Workshop Codelab: Making beautiful AMPs](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)
