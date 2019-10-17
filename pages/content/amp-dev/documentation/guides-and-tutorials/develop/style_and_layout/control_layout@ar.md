---
$title: التنسيقات المعتمدة
---

لجعل عناصرك سريعة الاستجابة،
عليك بتضمين `layout=responsive`.

## القيم المعتمدة لسمة التنسيق <a name="the-layout-attribute"></a>

بشكل افتراضي،
استخدم التنسيقات سريعة الاستجابة.

في ما يلي القائمة الكاملة بالقيم المعتمدة لسمة التنسيق:

<table>
  <thead>
    <tr>
      <th class="col-twenty" data-th="Layout type">نوع التنسيق</th>
      <th class="col-twenty" data-th="Width/height required">العرض / الارتفاع المطلوب</th>
      <th data-th="Behavior">السلوك</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>بلا عرض<</code></td>
      <td class="col-twenty" data-th="Description">لا</td>
      <td data-th="Behavior">لا يتم عرض العنصر. ويمكن تطبيق هذا التنسيق على كل عنصر من عناصر AMP. ولا يحتاج المكوّن إلى أي مساحة على الشاشة إذا كان نمط العرض لا شيء. ومن المفترض إمكانية عرض العنصر تلقائيًا عند اتخاذ المستخدم أي إجراء، على سبيل المثال، <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>تم الإصلاح</code></td>
      <td class="col-twenty" data-th="Description">نعم</td>
      <td data-th="Behavior">يحتوي العنصر على عرض وارتفاع تم إصلاحهما مع عدم اعتماد التفاعل. والاستثناءات الوحيدان هما العنصران <a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> و<a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>سريع الاستجابة</code></td>
      <td class="col-twenty" data-th="Description">نعم</td>
      <td data-th="Behavior">تم تغيير حجم العنصر ليلائم عرض عنصر الحاوية الخاص به كما يتم تغيير حجم ارتفاعه تلقائيًا ليلائم نسبة العرض إلى الارتفاع المحددة من خلال سمتي العرض والارتفاع. ويعمل هذا التنسيق بشكل جيد جدًا مع أغلب عناصر AMP، بما في ذلك <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>، و<a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>. تعتمد المساحة المتاحة على العنصر الأصلي ويمكن أيضًا تخصيصها باستخدام <code>max-width</code> CSS.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>الارتفاع مثبّت</code></td>
      <td class="col-twenty" data-th="Description">الارتفاع فقط</td>
      <td data-th="Behavior">يحتل العنصر المساحة المتاحة له ولكنه يحتفظ بالارتفاع دون تغيير. ويعمل هذا التنسيق بشكل جيد مع عناصر، مثل <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a> الذي يتضمن المحتوى الموضوع بشكل أفقي. ويجب ألا تكون السمة <code>width</code> موجودة أو يجب أن تكون مساوية لـ <code>auto</code>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>ملء</code></td>
      <td class="col-twenty" data-th="Description">لا</td>
      <td data-th="Behavior">يشغل العنصر المساحة المتاحة له، سواءً العرض أو الارتفاع. وبعبارة أخرى، يطابق تنسيق عنصر الملء الأصل الخاص به.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>الحاوية</code></td>
      <td class="col-twenty" data-th="Description">لا</td>
      <td data-th="Behavior">يتيح العنصر لعناصره الفرعية تحديد حجمه، تمامًا مثل <code>div</code> لـ HTML معتاد. ويُفترض ألا يحتوي المكوّن على تنسيق محدد له ولكن يعمل كحاوية فقط. ويتم عرض عناصره الفرعية مباشرة.</td>
    </tr>
  </tbody>
</table>

### ماذا يحدث في حالة عدم تحديد العرض والارتفاع؟ <a name="what-if-width-and-height-are-undefined"></a>

في بعض الحالات، إذا لم تحديد`width` أو `height`،
يمكن لوقت تشغيل AMP ضبط هذه القيم افتراضيًا كما يلي:

* [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md): يتم ضبط كل من العرض والارتفاع بشكل افتراضي على 0.
* [`amp-audio`](../../../../documentation/components/reference/amp-audio.md): يتم استنتاج القيمة الافتراضية للعرض والارتفاع من المتصفّح.

### ماذا يحدث في حالة عدم تحديد سمة التنسيق؟ <a name="what-if-the-layout-attribute-isnt-specified"></a>

يتم تحديد سلوك التنسيق على النحو التالي:

* في حالة وجود `height` وغياب `width` أو كان يساوي `auto`، يتم افتراض `fixed-height`.
* في حالة وجود سِمتي `width` أو `height` بالإضافة إلى السمة `sizes`، يتم افتراض التنسيق `responsive`.
* في حالة وجود سِمتي `width` أو `height`، يتم افتراض التنسيق `fixed`.
* في حالة عدم وجود `width` و`height`، يتم افتراض التنسيق `container`.

## استخدام @media وmedia

يمكنك استخدام [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)
للتحكم في مظهر وسلوك تنسيق الصفحة، وذلك مثلما تفعل على أي موقع ويب آخر.
عند تغيّر حجم نافذة المتصفّح أو اتجاهها،
تتم إعادة تقييم الاستعلامات عن الوسائط ويتم إخفاء العناصر وعرضها
بناءً على النتائج الجديدة.

تعرّف على المزيد من المعلومات حول التحكم في التنسيق من خلال تطبيق الاستعلامات عن الوساط في
[استخدام الاستعلامات عن وسائط CSS للتفاعل](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en).

<a name="element-media-queries"></a>

تعد السمة `media` من الميزات الإضافية للتصميم سريع الاستجابة المتاح في AMP.
ويمكن استخدام هذه السمة بكل عنصر من عناصر AMP؛
فهي تعمل بشكل مماثل للاستعلامات عن الوسائط في ورقة الأنماط العامة،
ولكنها تؤثر فقط في العنصر المحدد بكل صفحة على حدة.

على سبيل المثال، في ما يلي صورتان مع استعلامين عن الوسائط يمكن استخدامهما بشكل تبادلي.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive" >
</amp-img>
[/sourcecode]

وفقًا لعرض الشاشة، سيتم جلب إحداهما وعرضها.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive" >
</amp-img>
[/sourcecode]

## استخدام srcset والأحجام

استخدم السمة `srcset` للتحكم في مواد عرض العنصر
بناءً على تعبيرات الوسائط المتنوعة.
وبشكل خاص، يمكنك استخدامها لجميع علامات <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>
لتحديد مواد عرض الصور المُراد استخدامها بناءً على أحجام الشاشات المتنوعة.

في هذا المثال البسيط،
تحدد `srcset` الصورة المُراد استخدامها بناءً على عرض الشاشة.
يعرّف الواصف `w` المتصفّح بعرض كل صورة ضمن القائمة:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w >
</amp-img>
[/sourcecode]

**ملاحظة:** يتوافق AMP مع الواصف `w` في جميع المتصفّحات.

تعرّف على المزيد من المعلومات حول إنشاء صور سريعة الاستجابة باستخدام `srcset`
في [استخدام صور سريعة الاستجابة (الآن)](http://alistapart.com/article/using-responsive-images-now).

يمكنك أيضًا استخدام السمة `sizes` attribute مع `srcset`.
تصف السمة `sizes` كيفية حساب حجم العنصر
بناءً على أي تعبير وسائط.
ووفقًا لحجم العنصر الذي تم حسابه،
يحدد وكيل المستخدم المصدر الأكثر ملاءمة والذي تقدمه السمة `srcset`.

راجع المثال التالي:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w
    sizes="(min-width: 650px) 50vw, 100vw" >
</amp-img>
[/sourcecode]

تحدد السمة `sizes` عرض العنصر بحيث يبلغ حجمه 50% من حجم إطار العرض
عندما يكون حجم إطار العرض 650 بكسل أو أكثر.
فمثلاً، إذا كان حجم إطار العرض 800 بكسل،
يتم تعيين عرض العنصر على 400 بكسل.
بعد ذلك، يحدد المتصفّح مورد `srcset` بشكل يتناسب مع 400 بكسل،
بافتراض أن نسبة بكسل الجهاز هي 1،
والتي تكون `narrow.jpg` في هذا المثال (320 بكسل).

**مهم:** عند تحديد سمة الأحجام مع العرض والارتفاع،
يتم تعيين التنسيق بشكل افتراضي على `responsive`.

تعرّف على المزيد حول أوجه المقارنة بين سِمتي `sizes` و`srcset`
والاستعلامات عن الوسائط في مشاركة المدوّنة
[Srcset and sizes](https://ericportis.com/posts/2014/srcset-sizes/) هذه.

## تضمين العناصر النائبة والبدائل

### العنصر النائب

يعمل العنصر الذي يحمل علامة السمة `placeholder` كعنصر
نائب عن عنصر AMP الأصلي.
وفي حالة تحديد العنصر `placeholder`، يجب أن يكون تابعًا مباشرًا لعنصر AMP.

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive" >
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

بشكل افتراضي، يتم عرض العنصر النائب مباشرة لعنصر AMP،
حتى إذا لم يتم تنزيل موارد عنصر AMP أو تهيئتها.
وبعد أن يصبح عنصر AMP جاهزًا، فإنه عادة ما يُخفي العنصر النائب عنه ويعرض المحتوى.

**ملاحظة:** لا ينبغي أن يكون العنصر النائب بالضرورة عنصر AMP؛
فيمكن لأي عنصر HTML أن يقوم مقام العنصر النائب.

### البديل

استخدم السمة `fallback` للدلالة على سلوك البديل
لأي عنصر لا يتوافق معه المتصفّح.
فمثلاً، يمكنك استخدام السمة `fallback` لإعلام المستخدم
بأن المتصفّح غير متوافق مع ميزة معيّنة:

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg" >
  <div fallback>
        <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

يمكن تعيين السمة `fallback` على أي عنصر HTML، وليس عناصر AMP فقط.
وفي حالة تحديد العنصر `fallback`، يجب أن يكون تابعًا مباشرًا لعنصر AMP.

### noloading

العديد من عناصر AMP مدرجة في القائمة البيضاء لبيان "مؤشر تحميل"،
وهو صورة متحركة أساسية توضّح أن العنصر لم يتم تحميله بالكامل بعد.
ويمكن تعطيل هذا السلوك لدى العناصر بإضافة السمة `noloading`.
