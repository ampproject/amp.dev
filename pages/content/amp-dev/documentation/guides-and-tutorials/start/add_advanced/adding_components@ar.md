---
'$title': إضافة مكونات AMP الموسعة
$order: 2
description: '"يسمح نظام مكونات AMP لك ببناء ميزات فعالة ومستجيبة بسرعة ودمجها في مقالاتك بأقل مجهود. تحتوي مكتبة AMP HTML على ثلاث تصنيفات لمكونات AMP: ..."'
---

يسمح نظام مكونات AMP لك ببناء ميزات فعالة ومستجيبة بسرعة ودمجها في مقالاتك بأقل مجهود. تحتوي مكتبة AMP HTML على ثلاث تصنيفات لمكونات AMP:

- **مدمجة**: يتم تضمين هذه المكونات في مكتبة AMP JavaScript الأساسية (المحدد في علامة `<head>`)، مثل [`amp-img`](../../../../documentation/components/reference/amp-img.md) و[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). ويمكن استخدام هذه المكونات مباشرة في مستند AMP.

- **موسعة**: هذه هي الملحقات بالمكتبة الأساسية والتي يجب تضمينها صراحة في المستند كعناصر مخصصة. تتطلب العناصر المخصصة نصوص برمجية خاصة تجري إضافتها إلى قسم `<head>` (على سبيل المثال، `<script async custom-element="`[`amp-video`](../../../../documentation/components/reference/amp-video.md)`...`).

- **تجريبية**: هذه هي المكونات التي تم إصدارها ولكنها ليست جاهزة للاستخدام على نطاق واسع. يمكن للمطورين اختيار الاشتراك في استخدام هذه الميزات قبل أن يتم إصدارها بالكامل. تعلم المزيد في [الميزات التجريبية](../../../../documentation/guides-and-tutorials/learn/experimental.md).

يستخدم المثال الخاص بنا بالفعل مكونًا مدمجًا، [`amp-img`](../../../../documentation/components/reference/amp-img.md)، واكتشفنا كيف يرتبط ذلك المكون بنظام تخطيط AMP في البرنامج التعليمي ["تحويل HTML إلى AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md). الآن، هيا نضيف مكونات AMP **الموسعة** شائعة الاستخدام في المقالة الإخبارية الخاصة بنا.

## التربح مع الإعلانات

يجري بناء الإعلانات في AMP باستخدام المكون [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) . يسمح مكون [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) لك بتكوين الإعلانات بعدة طرق، مثل وضع العرض والارتفاع والتخطيط. مع ذلك، تتطلب العديد من منصات الإعلانات تكوينًا إضافيًا، مثل معرف الحساب لشبكة الإعلانات، التي يجب أن يخدمها الإعلان، أو خيارات للاستهداف المتعلقة بالإعلان. يسهل تحديد هذه الخيارات في مكون [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) باستخدام سمات HTML.

ألق نظرة على هذا المثال لإعلان **DoubleClick**:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static"
>
</amp-ad>
```

كما ترى، هذا تكوين بسيط للغاية. لاحظ السمة `type` ، التي تبين أي مكون [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) بمنصة الإعلانات نريد استخدامه. في هذه الحالة، نريد استخدام منصة [DoubleClick](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md)، لذا حددنا `doubleclick` كقيمة.

تعتبر سمة `data-slot` فريدة للغاية. وفي [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)، فإن أي سمة تبدأ بـ `data-` تعد سمات خاصة بالمورد. هذا يعني أنه ليس من الضروري أن يطلب جميع الموردين هذه السمة الخاصة، كما لا يتفاعلون معها إذا تم توفيرها. على سبيل المثال، قارن مثال **DoubleClick** من الجزء السابق بالإعلان الاختباري التالي من منصة [A9](https://github.com/ampproject/amphtml/blob/main/ads/a9.md):

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

جرب **إضافة** كلا المثالين السابقين في مقالتك بعد علامة `<header>`.

تذكر، لا يتم تضمين جميع المكونات في ملف JavaScript بمكتبة AMP الأساسية. نحتاج إلى تضمين طلب JavaScript إضافي لمكون الإعلانات.

**أضف** النص البرمجي التالي إلى علامة `<head>`:

```html
<script
  async
  custom-element="amp-ad"
  src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
></script>
```

قم **بتحديث** الصفحة وينبغي أن تشاهد إعلانين اختباريين:

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Test ads') }}

[tip type="important"] **مهم –** ربما يكون لديك بعض الأخطاء في وحدة تحكم المطورين، مثل `Mixed Content` أو `XMLHttpRequest cannot load`. ومن المحتمل أن يكون الخطأ الأخير متعلقًا بإعلانات A9 نظرًا لأن جميع المحتويات التي يحملها ليست آمنة. وهذا المتطلب جدير بالملاحظة لجميع الإعلانات التي يجري تقديمها على AMP. [/tip]

يوفر إعلاني [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) أدناه مثالا لمدى المرونة التي توفرها [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) لدعم ميزات منصة الإعلانات. في هذه الحالة قمنا بتكوين اثنين من إعلانات DoubleClick الاختبارية (باستخدام لوحة معلومات DoubleClick) لكي تظهر فقط في دول معينة--سوف يظهر الإعلان الأول في المملكة المتحدة والثاني سيظهر في الولايات المتحدة. جرب **إضافة** اثنين من تكوينات الإعلانات للاستهداف الجغرافي في مستند AMP أسفل الإعلان الذي أضفته في السابق:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk"
>
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us"
>
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

**حدّث** الصفحة وقم بإلقاء نظرة. تم التقاط لقطة الشاشة التالية من كندا، لذا لم يتم تحميل أي من الإعلانين:

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Test ads') }}

[tip type="note"] **ملاحظة –** قد تلاحظ أنه يوجد داخل علامات [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) هذه علامات `div` إضافية مع سمة تسمى `fallback` موجودة بها. هل يمكنك أن تخمن ما الذي تشير إليه سمة `fallback`؟ إنها تخبر نظام تحميل AMP بأن يعرض فقط مكونات ذلك العنصر عندما يفشل تحميل العنصر الأصل بنجاح. تعلم المزيد في [العناصر النائبة والعناصر الاحتياطية](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

[tip type="read-on"] **اقرأ –** لعرض أحدث شبكات الإعلانات المدعومة، اقرأ المستند المرجعي لمكون [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). [/tip]

[tip type="note"] **ملاحظة –** غير مسموح بتشغيل JavaScript مقدم من شبكة الإعلانات داخل مستند AMP. بدلا من ذلك، يقوم وقت تشغيل AMP بتحميل iframe من أصل مختلف (عن طريق بيئة اختبار معزولة لـ iframe) مثل مستند AMP وتنفيذ JS لشبكة الإعلانات داخل بيئة الاختبار المعزولة لـ iframe هذه. [/tip]

يشتمل مستند AMP الخاص بنا الآن على نص وصورة وإعلان مدمج في الصفحة، وهي جميعًا تمثل المحتويات الرئيسية لسرد قصة والتربح من المحتوى الخاص بك. مع ذلك، عادة ما تشتمل مواقع الويب الحديثة على مزيد من الوظائف وليس مجرد الصور والنصوص البسيطة.

هيا ننتقل بمستند AMP الخاص بنا إلى المستوى التالي ونضيف المزيد من وظائف الويب المتقدمة التي توجد عمومًا في المقالات الإخبارية مثل:

- فيديوهات يوتيوب
- التغريدات
- الاقتباسات من المقالة

## تضمين فيديو يوتيوب

هيا نجرب تضمين فيديو يوتيوب في المستند. **أضف** الرمز التالي مباشرة بعد `<header>` في مستند AMP (فوق إعلانات [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) التي أضفتها للتو):

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270"
>
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

**حدّث** الصفحة. بدلا من الفيديو ستشاهد هذا النص: _“تعذر تحميل الفيديو.”_

حتى لو كان بإمكان المتصفح الخاص بك إظهار فيديوهات يوتيوب بدون مشكلات، فسوف تتلقى هذا الخطأ. لماذا يحدث ذلك؟ لم يفشل تحميل الفيديو الخاص بك بالفعل، ولكن المكون نفسه فشل.

تذكر، لا يتم تضمين جميع المكونات في ملف JavaScript بمكتبة AMP الأساسية. نحتاج إلى تضمين طلب JavaScript إضافي لمكون يوتيوب.

[tip type="note"] **ملاحظة –** إذا كان ما يزال بإمكانك فتح وحدة تحكم المطورين و`#development=1` في عنوان URL الخاص بك، فسوف تشاهد خطأ أداة التحقق من صحة AMP في هذه النقطة لتذكيرك بإضافة JavaScript لـ [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) والربط بالمستندات التي تخبرك بعلامة `script` المطلوب إضافتها. [/tip]

**أضف** النص البرمجي التالي إلى علامة `<head>`:

```html
<script
  async
  custom-element="amp-youtube"
  src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
></script>
```

**حدّث** الصفحة وبعدها ينبغي أن تشاهد فيديو يوتيوب:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='فيديو يوتيوب مضمن') }}

كما هو الحال مع العناصر الأخرى في الصفحة، قمنا بتحديد `width` و`height` للفيديو لكي يمكن لنظام تخطيط AMP حساب نسبة الأبعاد. قمنا أيضًا بتعيين `layout` إلى `responsive`، لكي يملأ الفيديو العرض للعنصر الأصل الخاص به.

لتعلم المزيد حول تضمين فيديوهات، اقرأ مستندات مكون [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md). لمعرفة المزيد من مكونات الفيديو والوسائط، راجع [قائمة مكونات AMP للوسائط](../../../../documentation/components/index.html#media).

[tip type="tip"] **تلميح –** استخدم سمة [`fallback`](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md#fallbacks) لإخبار المستخدمين في حال فشل تحميل أحد المكونات أو إذا كان المكون غير مدعوم في المتصفح. [/tip]

## عرض تغريدة

يعتبر تضمين تغريدات منسقة مسبقًا من Twitter ميزة شائعة في المقالات الإخبارية. يمكن أن يوفر المكون [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) هذه الوظيفة بسهولة.

ابدأ بإضافة طلب JavaScript التالي إلى علامة `<head>` للمستند الخاص بك:

```html
<script
  async
  custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
></script>
```

الآن، في المقالة الخاصة بك **أضف** هذه الرمز لتضمين التغريدة:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985"
>
</amp-twitter>
```

تمثل سمة `data-tweetid` مثالا آخر لسمة مخصصة مطلوبة بواسطة منصة معينة. في هذه الحالة، يربط Twitter قيمة سمة `data-tweetid` بتغريدة معينة.

**حدّث** المتصفح وألق نظرة على الصفحة. يجب أن تشاهد ظهور التغريدة:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='تغريدة مضمنة') }}

لتعلم المزيد حول تضمين تغريدات Twitter، اقرأ مستندات المكون [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

[tip type="tip"] **تلميح –** توفر AMP المزيد من المكونات لتضمين المحتوى من شبكات التواصل الاجتماعي. راجع أحدث [مكونات AMP للتواصل الاجتماعي](../../../../documentation/components/index.html#social). [/tip]

## تظليل اقتباس من مقالة

من الميزات الشائعة في المقالات الإخبارية تظليل مقتطفات نص تفاعلية معينة من المقالة. على سبيل المثال، الاقتباس من مصدر معين أو حقيقة مهمة قد يتم تكرارها بخط كبير لجذب انتباه القارئ.

مع ذلك، لا تكون جميع مقتطفات النص بنفس طول الحروف بالضرورة، ما يجعل من الصعب الموازنة بين حجم الخط الكبير ومقدار المساحة التي يشغلها النص على الصفحة.

يوفر AMP مكونًا آخر مصممًا خصيصًا لهذا الموقف، ويسمى المكون [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md). يسمح المكون [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) لك بتحديد عرض وارتفاع ثابت للعنصر وأقصى حجم للخط. ويضبط المكون بطريقة ذكية حجم الخط **ليلائم** النص داخل العرض والارتفاع المتوفر.

هيا نجرب ذلك. قم أولا **بإضافة** مكتبة المكونات إلى علامة `<head>`:

```html
<script
  async
  custom-element="amp-fit-text"
  src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"
></script>
```

أضف ما يلي إلى الصفحة الخاصة بك:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**حدّث** الصفحة وانظر إلى النتيجة!

الآن، تجربة أخرى. ماذا يحدث إذا كان الاقتباس قصيرًا للغاية؟

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

أو، ماذا لو كان الاقتباس طويلا؟

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  And the Raven, never flitting, still is sitting, still is sitting. On the
  pallid bust of Pallas just above my chamber door; And his eyes have all the
  seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming
  throws his shadow on the floor; And my soul from out that shadow that lies
  floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

كتجربة أخيرة مع [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md)، جرب إنشاء جزء نصي قصير، مثل "مرحبًا" بارتفاع كبير للغاية (على سبيل المثال، بقيمة 400)، والمحافظة على قسمة سمة أقصى حجم للخط عند 42. ما الصور التي ستبدو عليها الصفحة الناشئة؟ هل سيظهر النص عموديًا في المنتصف؟ أم هل سيتم تقليص ارتفاع علامة [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) لتلائم أقصى حجم للنص؟ باستخدام ما تعرفه بالفعل عن نظام تخطيط AMP، جرب الإجابة عن السؤال قبل التلاعب بالرمز!

يمكنك تعلم المزيد حول [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) من [العرض التوضيحي المباشر AMP بالأمثلة](../../../../documentation/examples/documentation/amp-fit-text.html).
