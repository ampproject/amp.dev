---
'$title': العناصر النائبة والاحتياطية
$order: 3
descriptions: "In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible."
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
author: pbakaus
contributors:
  - bpaduch
---

In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible.

حتى أن بعض العناصر ستكافئك على القيام بهذا الأامر عن طريق تخفيف القيود؛ على سبيل المثال، إذا قدمت عنصرًا نائبًا لـ [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder)، فيمكن استخدامه بالقرب من الجزء الأعلى من الصفحة (التي لن تعمل بدونها).

## العناصر النائبة

يعمل العنصر الموسوم بالسمة `placeholder` كعنصر نائب لعنصر AMP الأصلي. وإذا تم تحديده، فيجب أن يكون عنصر `placeholder` عنصرًا تابعًا مباشرًا لعنصر AMP. وسيقوم العنصر الذي تم وسمه على أنه `placeholder` بـ `fill` عنصر AMP الأصلي دائمًا.

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
  layout="responsive"
  width="400"
  height="300"
>
  <amp-img
    placeholder
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
    layout="fill"
  >
  </amp-img>
</amp-anim>
```

[/example]

بشكل افتراضي، يتم عرض العنصر النائب على الفور لعنصر AMP، حتى إذا لم يتم تنزيل موارد عنصر AMP أو تهيئتها. وبمجرد أن يصبح عنصر AMP جاهزًا، عادةً ما يقوم بإخفاء العنصر النائب وعرض المحتوى.

[tip type="note"] **ملحوظة –** ليس من الضروري أن يكون العنصر النائب عنصر AMP؛ حيث يمكن لأي عنصر HTML أن يعمل كعنصر نائب. [/tip]

## الاحتياطيات <a name="fallbacks"></a>

يمكنك تحديد السمة `fallback` في عنصر ما للإشارة إلى سلوك الاحتياطي:

- لأي عنصر لا يدعمه المتصفح
- إذا فشل تحميل المحتوى (على سبيل المثال، حذف التغريدة)
- إذا كان نوع الصورة غير مدعوم (على سبيل المثال، WebP غير مدعوم في كل المتصفحات)

يمكنك تعيين السمة `fallback` إلى _أي_ عنصر HTML، وليس فقط عناصر AMP. وإذا تم تحديده، فيجب أن يكون العنصر `fallback` تابعًا مباشرًا لعنصر AMP.

##### مثال: ميزة غير مدعومة

في المثال التالي، نستخدم السمة `fallback` لإبلاغ المستخدم بأن المتصفح لا يدعم ميزة معينة:

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

##### مثال: عرض تنسيقات صور مختلفة

في المثال التالي، نستخدم السمة `fallback` لإبلاغ المتصفح باستخدام ملف JPEG إذا كان تنسيق WebP غير مدعوم.

[example preview="inline" playground="true"]

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

## تفاعل العناصر النائبة والاحتياطية

بالنسبة إلى مكونات AMP التي تعتمد على المحتوى الديناميكي (على سبيل المثال، [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md)، [`amp-list`](../../../../documentation/components/reference/amp-list.md))، يعمل تفاعل العناصر النائبة والاحتياطية على النحو التالي:

<ol>
  <li>عرض العنصر النائب أثناء تحميل المحتوى.</li>
  <li>إذا تم تحميل المحتوى بنجاح، فيتم إخفاء العنصر النائب وعرض المحتوى.</li>
  <li>في حالة فشل تحميل المحتوى:     <ol>       <li>إذا كان هناك عنصر احتياطي، فيتم عرض العنصر الاحتياطي.</li>       <li>بخلاف ذلك، يتم الاستمرار في عرض العنصر النائب<br>.</li>     </ol>
</li>
</ol>

## إخفاء مؤشرات التحميل

يسمح للعديد من عناصر AMP بإظهار "مؤشر التحميل"، وهو رسم متحرك أساسي يوضح أن العنصر لم يتم تحميله بالكامل بعد. ويمكن للعناصر تعطيل هذا السلوك عن طريق إضافة السمة `noloading`
