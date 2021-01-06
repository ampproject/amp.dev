---
"$title": صور متجاوبة مع srcset والأحجام والارتفاعات
"$order": '4'
description: استخدم السمة srcset للتحكم في أصول العنصر بناءً على تعبيرات الوسائط المختلفة. على وجه الخصوص، استخدمها مع كل علامات amp-img لتحديد ...
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

## srcset

استخدم السمة `srcset` للتحكم في أصول العنصر بناءً على تعبيرات الوسائط المختلفة. على وجه الخصوص، استخدمها مع كل علامات [`amp-img`](../../../../documentation/components/reference/amp-img.md) لتحديد أي أصول صورة ستستخدمها في أحجام الشاشة المختلفة. وسيقوم AMP بإنشاء تلقائي للسمة `sizes`، <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img" data-md-type="link">التي تقابل تعريف HTML5 لـ `sizes`</a>، لكل علامات `<img>` المصدر لـ `<amp-img>` إذا كانت `<amp-img>` تحتوي على السمة `srcset` لكن لا تحتوي على `sizes`.

في هذا المثال البسيط، تحدد `srcset` الصورة التي سيتم استخدامها بناءً على عرض الشاشة. ويخبر واصف `w` المتصفح بعرض كل صورة في القائمة:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w">
</amp-img>
```
[/example]

[tip type="note"] **ملحوظة–**  يدعم AMP السمة srcset بالواصف `w` عبر كل المتصفحات. [/tip]

تعرف على المزيد حول إنشاء صور سريعة الاستجابة باستخدام `srcset` في [استخدام الصور سريعة الاستجابة (الآن)](http://alistapart.com/article/using-responsive-images-now).

## الأحجام

يمكنك أيضًا استخدام السمة الاختيارية `sizes` لصفحات AMP مع `srcset`. إذ تصف السمة `sizes` الخاصة بـ AMP كيفية حساب حجم العنصر بناءً على أي تعبير وسائط. حيث سيتسبب <strong>تحديد <code>أحجام</code> على أي عنصر من عناصر AMP في تعيين AMP لنمط مضمن للعرض على هذا العنصر وفقًا لاستعلام الوسائط المتطابق.</strong> وبناءً على الحجم المحسوب للعنصر، يحدد وكيل المستخدم المصدر الأكثر صلة الذي توفره السمة `srcset`.

تدبر في المثال التالي:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw">
</amp-img>
```
[/example]

تحدد السمة `sizes` عرض العنصر ليكون بنسبة 50٪ من حجم إطار العرض عندما يكون حجم إطار العرض 650 بكسل أو أكثر. على سبيل المثال، إذا كان حجم منفذ العرض 800 بكسل، فسيتم ضبط عرض العنصر على 400 بكسل. ثم يحدد المتصفح مورد `srcset` بالنسبة إلى 400 بكسل، بافتراض أن نسبة وحدات البكسل للجهاز هي 1، والتي في هذه الحالة تكون عبارة عن `hummingbird-narrow.jpg` (320 بكسل).

[tip type="important"] **مهم –** عند تحديد سمة الأحجام جنبًا إلى جنب مع العرض والارتفاع، يكون التخطيط الافتراضي عبارة عن `responsive`. [/tip]

اقرأ المزيد حول سمة [`sizes` الخاصة بـ AMP هنا](../../../../documentation/guides-and-tutorials/learn/common_attributes.md).

## الارتفاعات

تدعم أيضًا جميع عناصر AMP المخصصة التي تسمح بتخطيط `responsive` سمة `heights` . قيمة هذه السمة عبارة عن تعبير أحجام يستند إلى تعبيرات وسائط مشابهة [لسمة أحجام الصور](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) ، ولكن مع اختلافين رئيسيين:

1. تنطبق على ارتفاع العنصر وليس عرضه.
2. القيم المئوية مسموح بها، على سبيل المثال `86٪`. وإذا تم استخدام قيمة النسبة المئوية، فإنها تشير إلى النسبة المئوية لعرض العنصر.

عندما يتم تحديد السمة `heights` جنبًا إلى جنب مع`width` و`height`، يتم تعيين `layout` بشكل افتراضي إلى `responsive`.

مثال:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%">
</amp-img>
```
[/example]

في هذا المثال، سيكون ارتفاع العنصر افتراضيًا بنسبة 80٪ من العرض، ولكن بالنسبة لإطار العرض الأوسع من `500px`، فسيتم تحديده عند `200px`.
