---
'$title': تضمين صور ومقاطع فيديو
$order: 8
description: كما هو الحال في صفحة HTML عادية، يسمح لك AMP بتضمين محتوى الصور ومقاطع الفيديو والصوت. تعرَّف على الأشياء المختلفة حول مكافئات AMP وتعرَّف على طريقة...
formats:
  - websites
  - stories
  - email
  - ads
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

كما هو الحال في صفحة HTML عادية، يسمح لك AMP بتضمين محتوى **الصور**، و**مقاطع الفيديو** و**الصوت** . تعرَّف على الأشياء المختلفة حول مكافئات AMP وتعرَّف على طريقة تضمينها في صفحاتك.

## لمَ لا <code><img></code>، <code><video></code> و<code><audio></code><audio>؟

لا تدعم AMP مثيلات HTML لعرض الوسائط مثل `<img>`. فيما نقدم نحن مكونات مكافئة للأسباب التالية:

- إننا بحاجة إلى فهم تخطيط الصفحة قبل تحميل الأصول، وهو أمر بالغ الأهمية [لدعم التحميل المسبق لإطار العرض الأول](../../../../about/how-amp-works.html#size-all-resources-statically)
- نحتاج إلى التحكم في طلبات الشبكة [لإجراء تحميل بطئ وإعطاء الأولوية للموارد على نحو فعال](../../../../about/how-amp-works.html#prioritize-resource-loading)

تحذير: بينما تُعد هذه المكونات غير مدعومة، إلا أنه _سيتم_ عرضها، لكنAMP لن تقوم بـ [التتحقق من صحة صفحاتك](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) ولن تستفيد من الميزات التي توفرها AMP.

## الصور

قم بتضمين صورة في صفحتك باستخدام العنصر [`amp-img`](../../../../documentation/components/reference/amp-img.md) على النحو التالي:

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
</amp-img>
```

[/example]

في هذا المثال الأساسي؛ سيتم عرض الصورة بالارتفاع والعرض المحددين. وكحد أدنى، يجب تعيين عرض وارتفاع واضحين.

#### عرض الصور عند تعطيل JavaScript

نظرًا لاعتماد [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) على JavaScript، إذا قام المستخدم باختيار تعطيل البرامج النصية، فلن يتم عرض الصور. في هذه الحالة، يجب عليك توفير احتياطي للصورة باستخدام `<img>` و`<noscript>`، على النحو التالي:

[example preview="inline" playground="true"]

```html
<amp-img
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
  <noscript>
    <img
      src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
      width="264"
      height="195"
    />
  </noscript>
</amp-img>
```

[/example]

### التخطيطات المتقدمة

يجعل AMP الأمر أسهل بكثير من استخدام CSS/HTML القياسيين لإنشاء صور سريعة الاستجابة بشكل كامل. في أبسط أشكاله، كل ما عليك فعله هو إضافة `layout="responsive"`:

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive"
>
</amp-img>
```

[/example]

[tip type="read-on"] **تابع القراءة –** تعرَّف على المزيد حول [تقنيات التخطيط المتقدم](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

### السلوك والعناصر النائبة

يمكن لوقت تشغيل AMP HTML إدارة موارد الصور بفاعلية، واختيار تأخير تحميل الموارد أو تحديد أولوياتها بناءً على موضع منفذ العرض أو موارد النظام أو النطاق الترددي للاتصال أو عوامل أخرى.

[tip type="read-on"] **تابع القراءة –** تعرَّف على طريقة [توفير احتياطات وعناصر نائبة للصور](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

## الصور المتحركة

إن العنصر [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) مشابه تمامًا للعنصر [`amp-img`](../../../../documentation/components/reference/amp-img.md)، ويوفر وظائف إضافية لإدارة تحميل الصور المتحركة وتشغيلها مثل صور GIF المتحركة.

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
>
  <amp-img
    placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
  >
  </amp-img>
</amp-anim>
```

[/example]

[tip type="note"] <strong>ملحوظة–</strong> قم بتضمين <code><script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script></code> في رأس صفحتك لاستخدام هذا المكون. [/tip]

## فيديو

قم بتضمين مقطع فيديو في صفحتك باستخدام العنصر [`amp-video`](../../../../documentation/components/reference/amp-video.md).

استخدم هذا العنصر فقط لتضمينات ملفات مقاطع فيديو HTML5 مباشرة. يقوم العنصر بتحميل مورد الفيديو المحدد عن طريق السمة `src` على نحو بطيء، وفي وقت تحدده AMP.

قم بتضمين عنصر نائب قبل بدء مقطع الفيديو، وكذا عامل احتياطي، إذا كان المتصفح لا يدعم مقاطع فيديو HTML5، على سبيل المثال:

[example preview="inline" playground="true" imports="amp-video:0.1"]

```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

[/example]

## الصوت

قم بتضمين مورد صوت في صفحتك، باستخدام العنصر [`amp-audio`](../../../../documentation/components/reference/amp-audio.md).

استخدم هذا العنصر فقط لتضمينات ملفات الصوت HTML5 مباشرة. يقوم العنصر بتحميل مورد الصوت المحدد عن طريق السمة `src` على نحو بطيء، وفي وقت تحدده AMP.

قم بتضمين احتياطي ، إذا كان المتصفح لا يدعم صوت HTML5 ، على سبيل المثال:

[example preview="inline" playground="true" imports="amp-audio:0.1"]

```html
<amp-audio width="400"
  height="200"
  {% if format == 'stories' %}  layout="nodisplay" autoplay
  {% endif %}
  src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio.</p>
  </div>
  <source type="audio/mpeg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <source type="audio/ogg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.ogg">
</amp-audio>
```

[/example]

[tip type="note"] <strong>ملحوظة–</strong> قم بتضمين <code><script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script></code> في رأس صفحتك لاستخدام هذا المكون. [/tip]
