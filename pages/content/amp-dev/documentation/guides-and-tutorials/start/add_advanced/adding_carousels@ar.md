---
'$title': إضافة العروض الدوار
$order: 3
description: يعتبر العرض الدوار من الميزات الشائعة الأخرى في صفحات المحمول. يمكنك بسهولة إضافة عروض دوارة إلى صفحات AMP باستخدام المكون amp-carousel.
---

يعتبر العرض الدوار من الميزات الشائعة الأخرى في صفحات المحمول. يمكنك بسهولة إضافة عروض دوارة إلى صفحات AMP باستخدام المكون [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md). هيا نبدأ بمثال بسيط، مثل العرض الدوار للصور.

## عرض دوار بسيط للصور

تذكر تضمين مكتبة المكون [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) من خلال **إضافة** طلب JavaScript التالي إلى علامة `<head>` في المستند الخاص بك:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
```

بعد ذلك، هيا نقوم بتضمين عرض دوار بسيط للصور بتخطيط استجابة وعرض وارتفاع محدد مسبقًا. **أضف** ما يلي إلى الصفحة الخاصة بك:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel">
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**حدّث** الصفحة وينبغي أن ترى العرض الدوار:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='عرض دوار بسيط للصور') }}

يمكن تكوين مكون [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) بعدة طرق مختلفة. هيا بنا نغير واجهة المستخدم لإظهار صورة واحدة فقط في المرة واجعل تخطيط العرض الدوار مستجيب.

للقيام بذلك، قم أولا **بتغيير** `type` لـ [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) من `carousel` إلى `slides`، و**قم بتغيير** `layout` إلى `responsive` وقم **بتعيين** `width` إلى 300 (مع ضمان أنه يتضمن `height` و `width` محدد). **أضف** سمة `"layout=responsive"` إلى فروع [`amp-img`](../../../../documentation/components/reference/amp-img.md) لـ [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

**أعد تحميل** الصفحة. الآن، بدلا من التمرير عبر قائمة العناصر، سوف تشاهد عنصرًا واحدًا في المرة. جرب **التمرير** أفقيًا للتمرير عبر العناصر. إذا قمت بالتمرير إلى عنصر ثالث، فلن تتمكن من التمرير إلى غير ذلك.

بعد ذلك، **أضف** السمة `loop`. وقم **بتحديث** الصفحة وجرب التمرير إلى اليسار مباشرة. سوف يدور العرض الدوار في حلقة بلا نهاية.

أخيرًا، هيا نجعل هذا العرض الدوار يعمل تلقائيًا كل ثانيتين. **أضف** السمة `autoplay` والسمة `delay` بالقيمة `2000` (على سبيل المثال، `delay="2000"`) إلى [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

يجب أن تكون النتيجة النهائية لك كالتالي:

```html
<amp-carousel
  layout="responsive"
  width="300"
  height="168"
  type="slides"
  autoplay
  delay="2000"
  loop
>
  <amp-img
    src="mountains-1.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-2.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-3.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
</amp-carousel>
```

قم **بتحديث** الصفحة واجعلها تدور!

[tip type="note"] **ملاحظة –** قد تلاحظ أنه عندما كان [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) يتضمن النوع `carousel` استخدمنا نوع التخطيط `fixed-height`. تعتبر أنواع التخطيط المدعومة للنوع `carousel` محدودة؛ على سبيل المثال لا يدعم النوع `carousel` التخطيط `responsive`. تأخذ العناصر ثابتة الارتفاع، كما يُفهم من اسمها، المساحة المتاحة لها، ولكنها تحافظ على الارتفاع بلا تغيير. مع العناصر ثابتة الارتفاع، يجب أن تحدد سمة `height`، بينما يجب أن تكون سمة `width` إما `auto` أو عدم تعيينها. [/tip]

## محتوى العرض الدوار المختلط

يعتبر العرض الدوار للصور رائعًا ولكنا ماذا لو كنا نريد إظهار محتوى أكثر تعقيدًا في العرض الدوار؟ هيا نجرب خلط القليل من الأشياء من خلال وضع إعلان وبعض النصوص وصورة كل ذلك في عرض دوار واحد. هل يمكن لـ [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) فعلا معالجة مثل هذا الخليط مرة واحدة؟ نعم يمكنه بكل تأكيد!

أولا، هيا **نضيف** هذا النمط إلى `<style amp-custom>` لضمان أن مكونات [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) و [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) تعمل مع بعضها البعض بأمان:

```css
amp-fit-text {
  white-space: normal;
}
```

الآن، **استبدل** العرض الدوار البسيط الخاص بك بهذا العرض:

```html
<amp-carousel layout="fixed-height" height="250" type="carousel">
  <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

  <amp-ad
    width="300"
    height="250"
    type="doubleclick"
    data-slot="/35096353/amptesting/image/static"
  >
    <div placeholder>This ad is still loading.</div>
  </amp-ad>

  <amp-fit-text width="300" height="250" layout="fixed">
    Big, bold article quote goes here.
  </amp-fit-text>
</amp-carousel>
```

**حدّث** الصفحة وينبغي أن تشاهد شيئًا كالتالي:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='عرض دوار بمحتوى مختلط') }}

لتعلم المزيد، راجع المستندات المرجعية لمكون [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[tip type="note"] **ملاحظة –** في المثال السابق لنا ربما لاحظت أن المكون [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) اشتمل على عنصر `div` فرعي بالسمة `placeholder`. في بداية هذا البرنامج التدريبي، صادفنا سيناريو مماثل مع [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) باستخدام `fallback`. ما الفرق بين العنصر النائب وعنصر الاحتياط؟ تظهر عناصر `Fallback` عندما يخفق تحميل العنصر الرئيسي، أي لا يوجد هناك أي إعلان متاح. بينما يظهر عنصر `placeholder` بدلا من العنصر الرئيسي، أثناء تحميله. بمعنى أن هذه العناصر تدعم عملية تحميل العنصر الأصل. يمكنك تعلم المزيد في دليل [العناصر النائبة والعناصر الاحتياطية](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]
