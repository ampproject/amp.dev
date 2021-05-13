---
'$title': نظام تخطيط AMPHTML
$order: 1
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: 'نظرة عامة '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-layout.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

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

## نظرة عامة

الهدف الرئيسي لنظام التخطيط هو ضمان أنه يمكن لعناصر AMP التعبير عن التخطيط الخاص بها لكي يتمكن وضع التشغيل من تخمين حجم العناصر قبل استكمال أي موارد بعيدة مثل JavaScript واستدعاءات البيانات. يعتبر هذا الأمر في غاية الأهمية نظرًا لأنه يقلل بدرجة كبيرة التعطل في العرض والتمرير.

مع مراعاة ذلك، صُمم نظام تخطيط AMP لدعم عدد قليل من التخطيطات المرنة التي توفر ضمانات أداء جيدة. يعتمد هذا النظام على مجموعة من السمات مثل `layout` و`width` و `height` و `sizes` و `heights` للتعبير عن احتياجات التخطيط والحجم للعناصر.

## السلوك <a name="behavior"></a>

يبدأ عنصر AMP بلا حاوية (أي، `layout != container`) في وضع بلا حل/بلا بناء حيث يتم إخفاء كافة فروعة باستثناء عنصر نائب (راجع سمة `placeholder`). ربما ما تزال بيانات JavaScript والبيانات الأساسية الضرورية لإنشاء العنصر بالكامل قيد التنزيل والتهيئة، ولكن وقت تشغيل AMP يعرف بالفعل كيف يضبط الحجم والمخطط للعنصر بالاعتماد فقط على فئات CSS وسمات `layout` و`width` و `height` و`media`. في معظم الحالات، يتم ضبط حجم `placeholder`، في حالة تحديده، وضبط موضعه ليشغل كافة مساحة العنصر.

ويتم إخفاء `placeholder` بمجرد بناء العنصر واكتمال أول تخطيط له. عند هذه النقطة، من المتوقع أن يتضمن العنصر جميع فروعه مبنية بشكل صحيح ومضبوط موضعها وجاهزة للعرض ولقبول الإدخال من المستخدم. هذا هو السلوك الافتراضي. ويمكن لكل عنصر التجاوز إلى إخفاء `placeholder` بشكل أسرع، على سبيل المثال، والاحتفاظ به لفترة أطول.

يتم ضبط حجم العنصر وعرضه استنادًا إلى سمات `layout` و `width` و`height` و`media` بواسطة وقت التشغيل. ويتم تطبيق كافة قواعد التخطيط عن طريق CSS داخليًا. ويقال إن العنصر "يحدد الحجم" إذا كان الحجم قابلا للاستنباط من خلال أنماط CSS ولا يتغير تبعًا لفروعه: سواء كان متوفرًا مباشرة أو يتم إدراجه ديناميكيًا. هذا لا يعني أنه لا يمكن تغيير الحجم. يمكن أن يكون التخطيط مستجيبًا بالكامل كما هو الحال مع تخطيطات `responsive` و`fixed-height` و `fill` و`flex-item`. هذا يعني ببساطة أن الحجم لا يتغير بدون إجراء صريح من المستخدم، على سبيل المثال، أثناء العرض أو التمرير أو بعد التنزيل.

إذا تم تكوين العنصر بشكل غير صحيح، في PROD فلن يتم عرضه على الإطلاق، أما في وضع DEV فسوف يعرض وقت التشغيل العنصر بحالة خطأ. وتشمل الأخطاء المحتملة وجود قيم غير صالحة أو غير مدعومة لسمات `layout` و `width` و`height`.

## سمات التخطيط <a name="layout-attributes"></a>

### `width` و `height` <a name="width-and-height"></a>

تبعًا لقيمة سمة `layout`، يجب أن تحتوي عناصر مكونات AMP على سمة `width` و`height` التي تحتوي على قيمة بكسل صحيح. ويتم تحديد سلوك التخطيط الفعلي حسب سمة `layout` كما هو موضح أدناه.

في حالات قليلة، إذا لم يتم تحديد `width` أو `height`، فإن وقت تشغيل AMP يمكن أن يستخدم القيم الافتراضية التالية:

- `amp-pixel`: تعيين القيمة الافتراضية لكل من `width` و `height` إلى 0.
- `amp-audio`: يتم استنتاج قيمة `width` و`height` الافتراضية من المستعرض.

### `layout` <a name="layout"></a>

توفر AMP مجموعة من التخطيطات التي تحدد سلوك مكون AMP في تخطيط المستند. ويمكنك تحديد تخطيط لأحد المكونات بإضافة سمة `layout` مع إحدى القيم المحددة في الجدول أدناه.

**مثال**: صورة باستجابة بسيطة، حيث يتم استخدام العرض والارتفاع لتحديد نسبة الأبعاد.

[sourcecode:html]
<amp-img
src="/img/amp.jpg"
width="1080"
height="610"
layout="responsive"
alt="an image"

> </amp-img>
> [/sourcecode]

القيم المدعومة لسمة `layout`:

<table>
  <thead>
    <tr>
      <th width="30%">القيمة</th>
      <th>السلوك والمتطلبات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>لا يوجد</td>
      <td>إذا لم يتم تحديد أي قيمة، يتم استنباط التخطيط للمكون كالتالي:         <ul>           <li>في حالة وجود  <code>height</code> مع غياب <code>width</code> أو تعيينه إلى <code>auto</code>، يتم افتراض تخطيط <code>fixed-height</code>.</li>           <li>في حالة وجود <code>width</code> مع وجود <code>height</code> إلى جانب سمة <code>sizes</code> أو <code>heights</code>، يتم افتراض تخطيط <code>responsive</code>.</li>           <li>في حالة وجود <code>width</code> مع وجود <code>height</code>، يتم افتراض تخطيط <code>fixed</code>.</li>           <li> في حالة غياب <code>width</code> و<code>height</code> ، يتم افتراض تخطيط <code>container</code>.</li>         </ul>
</td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>يتيح العنصر لفروعه تحديد حجمها، مثل سمة <code>div</code> العادية في HTML . ويتم افتراض أن المكون ليس لديه تخطيط معين ولكنه يعمل كحاوية؛ ويتم عرض فروعه مباشرة.</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>يأخذ العنصر المساحة المتوفرة له—لكل من الطول والعرض. بعبارة أخرى، يتطابق تخطيط وحجم عنصر <code>fill</code> مع الأصل الخاص به. ولكي يملأ العنصر الحاوية الأصل الخاصة به، حدد تخطيط "ملء"، وتأكد من أن الحاوية الأصل تحدد <code>position:relative</code> أو <code>position:absolute</code>.</td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>يحتوي العنصر على عرض وطول ثابت بدون دعم للاستجابة. ويجب وجود سمات <code>width</code> و <code>height</code>. وتكون الاستثناءات الوحيدة مع مكونات <code>amp-pixel</code> و<code>amp-audio</code>.</td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>يأخذ العنصر المساحة المتوفرة له ولكنه يحتفظ بالارتفاع بدون تغيير. يعمل هذا التخطيط بصورة جديدة مع عناصر مثل <code>amp-carousel</code> التي تتضمن محتويات بوضع أفقي. ويجب وجود سمة <code>height</code> . بينما لا يجب وجود سمة <code>width</code> أو يجب أن تكون مساوية لـ <code>auto</code>.</td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>يأخذ العنصر والعناصر الأخرى في الأصل الخاص به بنوع تخطيط <code>flex-item</code> المساحة المتبقية لحاوية الأصل عندما يكون الأصل حاوية مرنة (أي يكون، <code>display: flex</code>). ولا تكون سمتا <code>width</code> و<code>height</code> مطلوبتين.</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>يتخذ العنصر المساحة المتوفرة له ويغير حجم ارتفاعه تلقائيًا حسب نسبة الأبعاد المقدمة من سمتي <code>width</code> و<code>height</code> <em>حتى</em> يصل إلى حجم العنصر المحدد بواسطة سمتي `العرض` و`الارتفاع` التي يتم تمريرها إلى <code>amp-img</code>، أو يصل إلى أحد قيود CSS، مثل `أقصى عرض`. يجب وجود سمتي العرض والارتفاع. يعمل هذا التخطيط جيدًا مع معظم عناصر AMP، بما في ذلك <code>amp-img</code> و<code>amp-carousel</code> وغيره. وتعتمد المساحة المتاحة على العنصر الأصل ويمكن تخصيصها أيضًا باستخدام <code>max-width</code> من CSS. يختلف هذا التخطيط عن <code>responsive</code> في أنه يحتوي على ارتفاع وعرض متأصل به. يتضح ذلك بصورة كبيرة داخل عنصر حُر حيث يعرض تخطيط <code>responsive</code> القيمة 0x0 ويتم تضخيم تخطيط <code>intrinsic</code> إما إلى حجم أصغر من حجمه الطبيعي أو إلى أي قيد من CSS.</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>لا يتم عرض العنصر، ويأخذ مساحة صفر على الشاشة كما لو أن نمط عرضه كان <code>none</code>. يمكن تطبيق هذا التخطيط على كافة عناصر AMP. ويفترض أن العنصر يمكنه عرض نفسه وفقًا لإجراء المستخدم (على سبيل المثال، <code>amp-lightbox</code>). لا تكون سمتا <code>width</code> و<code>height</code> مطلوبتين.</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>يتخذ العنصر المساحة المتوفرة له ويغير حجم ارتفاعه تلقائيًا حسب نسبة الأبعاد المقدمة من  سمتي <code>width</code> و<code>height</code>. يعمل هذا التخطيط جيدًا مع معظم عناصر AMP، يشمل ذلك <code>amp-img</code> و <code>amp-video</code> وغيرها.  وتعتمد المساحة المتوفرة العنصر الأصل ويمكن أيضًا تخصيصها باستخدام  <code>max-width</code> في CSS. ويجب وجود سمتي <code>width</code> و<code>height</code>.<p><strong>ملاحظة</strong>: العناصر بتخطيط<code>"layout=responsive"</code> ليس لها حجم متأصل. يتم تحديد حجم العنصر من عنصر الحاوية الخاص بك. لضمان عرض عنصر AMP الخاص بك، يجب أن تحدد قيمة عرض وارتفاع لعنصر الحاوية . لا تحدد <code>"display:table"</code> في عنصر الحاوية لأنها تتجاوز عرض عنصر AMP، ما يؤدي إلى جعل عنصر AMP غير مرئي.</p>
</td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

جميع عناصر AMP التي تدعم تخطيط `responsive`، تدعم أيضًا سمة `sizes`. وقيمة هذه السمة هي عبارة الأحجام كما هي موضحة في [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)، ولكن يتم تمديدها إلى كافة العناصر، وليس الصور فقط. باختصار، تصف سمة `sizes` كيف يتم حساب عرض العنصر تبعًا لأحوال الوسائط.

عند تحديد سمة `sizes` جنبًا إلى جانب مع `width` و`height`، تكون القيمة الافتراضية لـ`layout` هي `responsive`.

**مثال**: استخدام سمة `sizes`

في المثال التالي، إذا كان منفذ العرض أعرض من `320px`، فسوف تكون الصورة بعرض 320 بكسل، خلاف ذلك، ستكون بعرض 100vw (100% من عرض منفذ العرض).

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"

> </amp-img>
> [/sourcecode]

### `disable-inline-width` <a name="disable-inline-width"></a>

تقوم سمة `sizes` من ذات نفسها بتعيين نمط `width` مضمن على العنصر. عند إقران `disable-inline-width` مع `sizes`، سيقوم عنصر AMP بملء قيمة `sizes` في العلامة الكامنة للعنصر، كما هو الحال مع إدراج `img` داخل `amp-img`، **بدون** تعيين `width` المدمج مثلما تفعل `sizes` في العادة من ذات نفسها في AMP.

**مثال**: استخدام سمة `disable-inline-width`

في المثال التالي، لا يتأثر عرض `<amp-img>`، ويتم استخدام `sizes` فقط لتحديد أحد المصادر من `srcset`.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"
disable-inline-width

> </amp-img>
> [/sourcecode]

### `heights` <a name="heights"></a>

جميع عناصر AMP التي تدعم تخطيط `responsive`، تدعم أيضًا سمة `heights`. وتمثل قيمة هذه السمة عبارة أحجام تستند إلى عبارات الوسائط بطريقة مماثلة لـ [سمة أحجام الصور](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)، ولكن مع وجود اختلافين رئيسيين:

1. تنطبق على ارتفاع العنصر وليس عرضه.
2. يُسمح بالقيم المئوية، مثل `86%`. في حالة استخدام قيمة نسبة مئوية، فهي تشير إلى نسبة عرض العنصر.

عندما يتم تحديد السمة `heights` جنبًا إلى جنب مع`width` و`height`، يتم تعيين `layout` بشكل افتراضي إلى `responsive`.

**مثال**: استخدام سمة `heights`

في المثال التالي، تكون القيمة الافتراضية لارتفاع الصورة 80% من العرض، ولكن إذا كان منفذ العرض أعرض من `500px`، فسيكون الحد الأقصى للارتفاع `200px`. نظرًا لأنه تم تحديد سمة `heights` مع `width` و`height`, فسيكون التخطيط الافتراضي `responsive`.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="320"
height="256"
heights="(min-width:500px) 200px, 80%"

> </amp-img>
> [/sourcecode]

### `media` <a name="media"></a>

تدعم معظم عناصر AMP السمة `media`. وتكون قيمة `media` استعلام وسائط. إذا كان الاستعلام غير متطابق، لا يتم عرض العنصر على الإطلاق ولا يتم عرض الموارد الخاصة بك ومن المحتمل ألا يتم جلب موارده الفرعية. إذا غير إطار المستعرض الحجم أو الاتجاه، فسيتم إعادة تقييم استعلامات الوسائط ويتم إخفاء العناصر أو إظهارها تبعًا للنتائج الجديدة.

**مثال**: استخدام سمة `media`

في المثال التالي، لدينا صورتان باستعلامات وسائط أحادية التقييم. وتبعًا لعرض الشاشة، سيتم جلب إحدى الصورتين وعرضها. تتوفر السمة `media` على جميع عناصر AMP، لذا يمكن استخدامها مع العناصر بدون صور، مثل الإعلانات.

[sourcecode:html]
<amp-img
media="(min-width: 650px)"
src="wide.jpg"
width="466"
height="355"
layout="responsive"

> </amp-img>
> <amp-img
>   media="(max-width: 649px)"
>   src="narrow.jpg"
>   width="527"
>   height="193"
>   layout="responsive"
> </amp-img>
> [/sourcecode]

### `placeholder` <a name="placeholder"></a>

يمكن تعيين سمة `placeholder` على أي عنصر HTML، وليس فقط على عناصر AMP. تشير سمة `placeholder` إلى أن العنصر المعلم بهذه السمة يتصرف مثل عنصر نائب لعنصر AMP الأصل. وفي حالة تحديده، يجب أن يكون العنصر النائب فرعًا مباشرة لعنصر AMP. افتراضيًا، يتم عرض العنصر النائب مباشرة لعنصر AMP، حتى لو لم يتم تنزيل موارد عنصر AMP أو تهيئتها. وبمجرد أن يصبح عنصر AMP جاهزًا، فإنه يخفي العنصر النائب له ويُظهر المحتوى. وعلى حسب تنفيذ العنصر يتم تحديد السلوك الفعلي للعنصر النائب.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
<amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

يمكن تعيين سمة `fallback` على أي عنصر HTML، وليس عنصر AMP فقط. يشير مصطلح الاحتياط إلى السماح للعنصر بالتواصل مع القارئ لتعريفه بأن المستعرض لا يدعم العنصر. وفي حالة تحديده، يجب أن يكون العنصر الاحتياطي فرعًا مباشرة لعنصر AMP. وعلى حسب تنفيذ العنصر، يتم تحديد السلوك الفعلي للاحتياط.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">

  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

تشير سمة `noloading` إلى ما إذا تم إيقاف تشغيل "مؤشر التحميل" لهذا العنصر أم لا. معظم عناصر AMP مدرجة على أنها تسمح بإظهار "مؤشر تحميل"، وهو الرسم المتحرك الأساسي الذي يعرض العنصر الذي لم يتم تحميله بالكامل. يمكن للعناصر التخلي عن هذا السلوك بإضافة هذه السمة.

## (tl;dr) ملخص متطلبات التخطيطات والسلوكيات<a name="tldr-summary-of-layout-requirements--behaviors"></a>

يوضع الجدول التالي المعلمات المقبولة وفئات CSS والأنماط المستخدم مع سمة `layout`. لاحظ أن:

1. أي فئة CSS معلمة بالبادئة `-amp-` والعناصر المعلمة بالبادئة `i-amp-` تعتبر داخلية في AMP وغير مسموح باستخدامها في جداول أنماط المستخدمين. ويتم عرضها هنا فقط لأغراض معلوماتية.
2. بالرغم من تحديد `width` و`height` في الجدول على أنها مطلوبة، قد يتم تطبيق القواعد الافتراضية كما هو الحال مع `amp-pixel` و`amp-audio`.

<table>
  <thead>
    <tr>
      <th width="21%">التخطيط</th>
      <th width="20%">العرض/<br>الارتفاع مطلوب؟</th>
      <th width="20%">يحدد الحجم؟</th>
      <th width="20%">عناصر إضافية</th>
      <th width="19%">"شاشة" CSS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>لا</td>
      <td>لا</td>
      <td>لا</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>لا</td>
      <td>نعم، حجم الأصل</td>
      <td>لا</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>نعم</td>
      <td>نعم، محدد بواسطة <code>width</code> و<code>height</code>.</td>
      <td>لا</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td> <code>height</code> فقط؛ <code>width</code> يمكن أن يكون <code>auto</code>
</td>
      <td>نعم، محدد بواسطة الحاوية الأصل و <code>height</code>.</td>
      <td>لا</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>لا</td>
      <td>لا</td>
      <td>نعم، تبعًا للحاوية الأصل.</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>نعم</td>
      <td>نعم، تبعًا للحاوية الأصل ونسبة أبعاد <code>width:height</code>.</td>
      <td>نعم، <code>i-amphtml-sizer</code>.</td>
      <td> <code>block</code> (يتصرف مثل <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element" rel="nofollow">عنصر مستبدل</a>)</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>لا</td>
      <td>لا</td>
      <td>لا</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>نعم</td>
      <td>نعم، تبعًا للحاوية الأصل ونسبة أبعاد<code>width:height</code>.</td>
      <td>نعم، <code>i-amphtml-sizer</code>.</td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>
