---
"$title": التخطيط واستعلامات الوسائط
"$order": '1'
description: يدعم AMP كلا من استعلامات الوسائط واستعلامات العناصر، كما يتم تزويده بأداة قوية مدمجة للتحكم في تخطيط العناصر الفردية. وتعمل سمة التخطيط بصورة جيدة مع...
formats:
- websites
- email
- ads
- stories
author: Meggin
contributors:
- pbakaus
---

يدعم AMP كلا من **استعلامات الوسائط** و**استعلامات العناصر**، كما يتم تزويده بأداة قوية مدمجة للتحكم في **تخطيط** العناصر الفردية. فيما تعمل سمة `layout` على تسهيل التعامل وإنشاء تصميم باستجابة كاملة كما لو أنك تستخدم CSS وحدها.

## تسهيل إنشاء صور الاستجابة

يمكن إنشاء صور الاستجابة من خلال تحديد `width` و`height`، وتعيين التخطيط إلى `responsive`، والإشارة باستخدام [`srcset`](art_direction.md) إلى أي صورة يلزم استخدامها استنادًا إلى الأحجام المتباينة للشاشة:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

يتلاءم العنصر [`amp-img`](../../../../documentation/components/reference/amp-img.md) هذا تلقائيًا مع عرض عنصر الحاوية الخاص به، ويتم تعيين ارتفاعه تلقائيًا على نسبة الأبعادة التي يتم تحديدها من خلال العرض والارتفاع المُعطى. جرب ذلك بتغيير حجم نافذة المتصفح هذه:

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

[tip type="tip"] **تلميح – ** راجع الشروحات الحية جنبًا إلى جنب لـ [`amp-img`](../../../../documentation/components/reference/amp-img.md): [الشروحات الحية حول توضيح AMP بالأمثلة](../../../../documentation/examples/documentation/amp-img.html?format=websites). [/tip]

## سمة التخطيط <a name="the-layout-attribute"></a>

تمنحك سمة `layout` ميزة تحكم سهلة لكل عنصر بشأن كيفية عرض العنصر الخاص بك على الشاشة. يعتبر الكثير من هذه الأشياء ممكنًا مع CSS وحدها– لكنها عملية صعبة، وتطلب كمًا هائلا من الحيل. استخدم سمة `layout` بدلا من ذلك.

### القيد المدعومة لسمة `layout`

The following values can be used in the `layout` attribute:

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-thirty">نوع التخطيط</th>
      <th data-th="Width/height required" class="col-twenty">العرض / الارتفاع المطلوب</th>
      <th data-th="Behavior">السلوك</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type"><code>nodisplay</code></td>
      <td data-th="Description">لا</td>
      <td data-th="Behavior">لا يتم عرض العنصر. ويمكن تطبيق هذا التخطيط على كل عنصر من عناصر AMP. ولا يحتاج المكوّن إلى أي مساحة على الشاشة كما لو أن نمط العرض لا شيء. ومن المفترض إمكانية عرض العنصر تلقائيًا عند اتخاذ المستخدم أي إجراء، على سبيل المثال، <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed</code></td>
      <td data-th="Description">نعم</td>
      <td data-th="Behavior">يحتوي العنصر على عرض وارتفاع ثابت مع عدم دعم التفاعل. تتمثل الاستثناءات الوحيدة في العنصرين <a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> و<a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>responsive</code></td>
      <td data-th="Description">نعم</td>
      <td data-th="Behavior">تتم ملاءمة حجم العنصر مع عرض عنصر الحاوية الخاص به كما يتم تغيير حجم ارتفاعه تلقائيًا ليلائم نسبة الأبعاد المحددة من خلال سمتي العرض والارتفاع. ويعمل هذا التخطيط بشكل جيد جدًا مع أغلب عناصر AMP، بما في ذلك <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>، و<a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>. تعتمد المساحة المتاحة على العنصر الأصل ويمكن أيضًا تخصيصها باستخدام <code>max-width</code> CSS.<p><strong>ملاحظة</strong>: العناصر بالتخطيط <code>"layout=responsive"</code> ليس لها حجم فطري. يتم تحديد حجم العنصر من عنصر الحاوية الخاص به. لضمان عرض عنصر AMP الخاص بك، يجب أن تحدد قيمة عرض وارتفاع لعنصر الحاوية. لا تحدد <code>"display:table"</code> على عنصر الحاوية لأن هذا يتجاوز عرض عنصر AMP، ما يؤدي إلى تحويل عنصر AMP إلى غير مرئي.</p>
</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed-height</code></td>
      <td data-th="Description">الارتفاع فقط</td>
      <td data-th="Behavior">يحتل العنصر المساحة المتاحة له ولكنه يحتفظ بالارتفاع دون تغيير. ويعمل هذا التخطيط بشكل جيد مع عناصر مثل <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a> الذي يتضمن المحتوى الموضوع بشكل أفقي. ويجب ألا تكون السمة <code>width</code> موجودة أو يجب أن تكون مساوية لـ <code>auto</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fill</code></td>
      <td data-th="Description">لا</td>
      <td data-th="Behavior">يشغل العنصر المساحة المتاحة له، سواءً العرض أو الارتفاع. وبعبارة أخرى، يطابق تخطيط عنصر الملء الأصل الخاص به. ولكي يملأ أحد العناصر الحاوية الأصل له، تأكد من أن الحاوية الأصل تحدد `position:relative` أو `position:absolute`.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>container</code></td>
      <td data-th="Description">لا</td>
      <td data-th="Behavior">يتيح العنصر لعناصره الفرعية تحديد حجمه، تمامًا مثل <code>div</code> لـ HTML المعتاد. ويُفترض ألا يحتوي المكوّن على تخطيط محدد له ولكن يعمل كحاوية فقط. ويتم عرض عناصره الفرعية مباشرة.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>flex-item</code></td>
      <td data-th="Description">لا</td>
      <td data-th="Behavior">يشغل العنصر والعناصر الأخرى في الأصل الخاص به المساحة المتبقية في الحاوية الأصل عند يكون الأصل حاوية مرنة (أي الحاوية <code>display:flex</code>). يتم تحديد حجم العنصر بواسطة العنصر الأصل وعدد العناصر الأخرى داخل الأصل وفقًا لتخطيط <code>display:flex</code> من CSS.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>intrinsic</code></td>
      <td data-th="Description">نعم</td>
      <td data-th="Behavior">يشغل العنصر المساحة المتوفرة له ويغير حجم ارتفاعه تلقائيًا حسب نسبة الأبعاد المقدمة من سمتي <code>width</code> و<code>height</code><em>حتى</em> يصل إلى الحجم الطبيعي للعنصر أو القيد الخاص بـ CSS (على سبيل المثال أقصى عرض). يجب أن تكون سمتي العرض والارتفاع موجودتين. يعمل هذا التخطيط جيدًا مع معظم عناصر AMP، يشمل ذلك <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> و<a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a>، وغيره. وتعتمد المساحة المتوفرة على العنصر الأصل ويمكن أيضًا تخصيصه باستخدام <code>max-width</code> من CSS. يختلف هذا التخطيط عن <code>responsive</code> باحتوائه على قيمة ارتفاع وعرض مضمنة. وهذا يظهر في <br>الغالب مع العنصر العائم حيث يعرض التخطيط <code>responsive</code> قيمة 0x0 ويتضخم التخطيط <code>intrinsic</code> إلى قيمة أصغر من حجمه الأصلي أو إلى أي قيد من CSS.</td>
    </tr>
  </tbody>
</table>

[tip type="tip"] **تلميح–** زر صفحة [توضيح تخطيطات AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html) لمعرفة كيف تستجيب التخطيطات المتنوعة لتغير حجم الشاشة. [/tip]

### ماذا لو كان العرض والارتفاع غير حدد؟ <a name="what-if-width-and-height-are-undefined"></a>

في حالات قليلة إذا كان `width` أو `height` غير محدد، فأن وقت تشغيل AMP يمكن استعمال القيم الافتراضية كالتالي:

- <code>amp-pixel</code>: تعيين القيمة الافتراضية لكل من `width` و <code>height</code> إلى 0.
- <code>amp-audio</code>: يتم استنتاج قيمة `width` و<code>height</code> الافتراضية من المستعرض.

### ماذا لو كان السمة <code>layout</code> غير محددة؟ <a name="what-if-the-layout-attribute-isnt-specified"></a>

إذا كانت سمة <code>layout</code> غير محددة، فإن AMP يحاول استنتاج أو تخزين القيمة المناسبة:

<table>
  <thead>
    <tr>
      <th data-th="Rule">القاعدة</th>
      <th data-th="Inferred layout" class="col-thirty">التخطيط المستنتج</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule">قيمة <code>height</code> موجودة وقيمة <code>width</code> غير موجودة أو تساوي <code>auto</code>
</td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule">السمتان <code>width</code> أو <code>height</code> موجودتان إلى جانب السمة <code>sizes</code>
</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule">كلا السمتان <code>width</code> و<code>height</code> موجودتان</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule">قيمة <code>width</code> و<code>height</code> غير موجودة</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## استخدام استعلامات الوسائط

### استعلامات وسائط CSS

يمكنك استخدام [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) للتحكم في مظهر وسلوك تخطيط الصفحة، وذلك مثلما تفعل على أي موقع ويب آخر. عند تغيّر حجم نافذة المتصفّح أو اتجاهها، تتم إعادة تقييم استعلامات الوسائط ويتم إخفاء العناصر وعرضها بناءً على النتائج الجديدة.

[tip type="read-on"] تعرّف على المزيد من المعلومات حول التحكم في التخطيط من خلال تطبيق استعلامات الوساط في <a class="" href="https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en">استخدام استعلامات وسائط CSS للاستجابة</a>. [/tip]

### استعلامات وسائط العناصر <a name="element-media-queries"></a>

من الميزات الإضافية في تصميم الاستجابة المتوفر في AMP سمة `media`. يمكن استخدام هذه السمة على كل عنصر AMP؛ إنها تعمل بطريقة مماثلة لاستعلامات الوسائط في صفحة الأنماط العمومية الخاصة بك، ولكنها تؤثر فقط على عنصر محدد في صفحة فردية.

على سبيل المثال، هنا لدينا صورتان باستعلامات وسائط تستبعد إحداهم الأخرى.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="527"
    height="355"
    layout="responsive">
</amp-img>
[/sourcecode]

تبعًا لعرض الشاشة، سيتم جلب وعرض واحدة أو الأخرى.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="466"
    height="193"
    layout="responsive">
</amp-img>
[/sourcecode]
