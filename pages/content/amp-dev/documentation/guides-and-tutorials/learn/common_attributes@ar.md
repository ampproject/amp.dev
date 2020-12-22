---
"$title": سمات العنصر العامة
"$order": '1'
description: توفر AMP مجموعة من السمات المشتركة التي يتم توسيعها لتشمل العديد من مكونات AMP (وعناصر HTML). إذ يصف هذا المستند كل السمات المشتركة.
toc: 'true'
---

AMP provides a set of common attributes that are extended to many AMP components (and HTML elements).  This document describes each of the common attributes.

## الاحتياطي

الاحتياطي عبارة عن اصطلاح يسمح للعنصر بإبلاغ القارئ أن المستعرض لا يدعم العنصر أو أن تحميل المورد الضمني قد فشل. ويمكن وضع السمة `fallback` في أي عنصر HTML والذي يكون تابعًا مباشرًا لعنصر AMP يدعم العناصر الاحتياطية. ويعود السلوك الدقيق فيما يتعلق بالاحتياطي إلى التنفيذ الخاص بالعنصر، لكن عادةً ما يتم عرض العنصر الاحتياطي بدلًا عن العنصر العادي.

Often used with: images, animations, audio, and videos

Example:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive" >
  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
```

لمزيد من المعلومات، راجع [العناصر النائبة والاحتياطية](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## الارتفاعات

إن كل العناصر التي تدعم المخطط `responsive`، تدعم أيضًا السمة `heights`. إذ إن قيمة هذه السمة تمثل تعبير أحجام على حسب تعبيرات الوسائط، وهو أمر مماثل لـ [سمة الأحجام في علامات `img`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) لكن مع اختلافين جوهريين:

1. تنطبق القيمة على ارتفاع العنصر وليس عرضه.
2. القيم المئوية مسموح بها. إذ تشير قيمة النسبة المئوية إلى النسبة المئوية الخاصة بعرض العنصر. على سبيل المثال، تشير القيمة `80%` إلى أن ارتفاع العنصر سيكون 80٪ من عرض العنصر.

Note: When the `heights` attribute is specified along with `width` and `height`, the `layout` is defaulted to `responsive`.

Example:

```html
<amp-img src="amp.png"
    width="320" height="256"
    heights="(min-width:500px) 200px, 80%">
</amp-img>
```

لمزيد من المعلومات، راجع [التوجهات الفنية مع مجموعات المصدر والأحجام والارتفاعات](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## التخطيط

يوفر AMP مجموعة من [layouts](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) طريقة سلوك مكون AMP في مخطط المستند. يمكنك تحديد مخطط لمكون عن طريق إضافة السمة `layout` مع إحدى قيم التنسيق المدعومة للعنصر (راجع وثائق العنصر لمعرفة القيم المدعومة).

Example:

```html
<amp-img src="/img/amp.jpg"
    width="1080"
    height="610"
    layout="responsive"
    alt="an image">
</amp-img>
```

لمزيد من المعلومات، راجع [استعلامات المخطط والوسائط](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) و<a>مواصفات المخطط</a>.

## الوسائط <a name="media"></a>

Most AMP elements support the `media` attribute. The value of `media` is a media query. If the query does not match, the element is not rendered and its resources and potentially its child resources will not be fetched. If the browser window changes size or orientation, the media queries are re-evaluated and elements are hidden and shown based on the new results.

Example:

```html
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="466"
    height="355" layout="responsive"></amp-img>
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="527"
    height="193" layout="responsive"></amp-img>
```

لمزيد من المعلومات راجع [استعلامات المخطط والوسائط](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries).

## لا تحميل

تشير السمة `noloading` إلى ما إذا كان يجب **إيقاف** "مؤشر التحميل" لهذا العنصر أم لا. إذ تعرض العديد من عناصر AMP "مؤشر التحميل"، وهو عبارة عن رسم متحرك أساسي يوضح أن العنصر لم يتم تحميله بالكامل بعد.

Often used with: images, animations, videos, and ads

Example:

```html
<amp-img src="card.jpg"
    noloading
    height="190"
    width="297"
    layout="responsive">
</amp-img>
```

## تشغيل

يتم استخدام السمة `on` لتثبيت معالجات الحدث على العناصر. حيث تعتمد الأحداث التي يتم دعمها على العنصر.

Often used with: lightboxes, sidebars, live lists, and forms

Syntax:

```text
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
```

Example:

```html
<button on="tap:my-lightbox">Open lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay">
  ...
</amp-lightbox>
```

For more information, see  [Actions and Events in AMP](amp-actions-and-events.md).

## العنصر النائب

تشير السمة `placeholder` إلى أن العنصر الموسوم بهذه السمة يعمل كعنصر نائب لعنصر AMP الأصلي. ويمكن وضع السمة في أي عنصر HTML تابع مباشرة لعنصر AMP الذي يدعم العناصر النائبة. وبشكل افتراضي، يتم عرض العنصر النائب فورًا لعنصر AMP، حتى إذا لم يتم تنزيل موارد عنصر AMP أو تهيئتها. وبمجرد أن يصبح عنصر AMP جاهزًا، يخفي عنصره النائب ويعرض المحتوى. ويعود السلوك الدقيق فيما يتعلق بالعنصر النائب إلى التنفيذ الخاص بالعنصر.

Often used with: images, animations, videos, and ads

Example:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
```

For more information, see [Placeholders & fallbacks](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## sizes

All AMP elements that support the `responsive` layout, also support the `sizes` attribute. The value of the AMP `sizes` attribute is a sizes expression that selects the defined size corresponding to the media query based on the current window size. <strong>Additionally, AMP sets an inline style for <code>width</code> on the element</strong>.

Example:

```html
<amp-img src="amp.png"
    width="400" height="300"
    layout="responsive"
    sizes="(min-width: 320px) 320px, 100vw">
</amp-img>
```

سينتج علامة `img ` المتداخلة التالية:

```html
<img decoding="async"
    src="amp.png"
    sizes="(min-width: 320px) 320px, 100vw"
    class="i-amphtml-fill-content i-amphtml-replaced-content">
```

For more information, see [Art direction with srcset, sizes & heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## العرض والارتفاع

For some [layouts](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute), AMP components must have a `width` and `height` attribute that contains an integer pixel value.

Example:

```html
<amp-anim width="245"
    height="300"
    src="/img/cat.gif"
    alt="cat animation">
</amp-anim>
```

For more information, see [Layout & Media queries](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) and the [Layout Spec](amp-html-layout/index.md).
