---
'$title': بدء القصة الخاصة بنا
$order: 3
description: يتم تمثيل قصة الويب بالكامل بواسطة مكون amp-story، والذي يعمل كحاوية لجميع الصفحات في القصة. ويكون عنصر amp-story مسؤولًا أيضًا عن ...
author: bpaduch
---

يتم تمثيل قصة الويب بالكامل بواسطة المكون [`amp-story`](../../../../documentation/components/reference/amp-story.md)، والذي يعمل كحاوية لجميع الصفحات في القصة. ويكون المكوِّن [`amp-story`](../../../../documentation/components/reference/amp-story.md) مسؤولًا أيضًا عن إنشاء واجهة المستخدم، بما في ذلك التعامل مع الإيماءات والتنقل.

ويُعد المكوِّن [`amp-story`](../../../../documentation/components/reference/amp-story.md) مكوِّن AMP مخصصًا، ومثل جميع المكونات المخصصة؛ يجب إضافة النص البرمجي المقترن للمكوِّن إلى مستند AMP.

**افتح** الملف `pets.html` في محرر النصوص لديك، وفي قسم `<head>`، **أضف** النص البرمجي التالي:

```html
<head>
  <script
    async
    custom-element="amp-story"
    src="https://ampjs.org/v0/amp-story-1.0.js"
  ></script>
</head>
```

**أضف** العنصر `<amp-story>` إلى `<body>` الخاص بمستندك، وحدد السمة `standalone` الإلزامية، على النحو التالي:

```html
<body>
  <amp-story standalone> </amp-story>
</body>
```

من المهم ملاحظة أنه من أجل الحصول على قصة AMP صالحة، يجب أن يحتوي العنصر `<body>` على عنصر تابع واحد فقط؛ المكون [`amp-story`](../../../../documentation/components/reference/amp-story.md)، حيث يتم تضمين جميع العناصر الأخرى في [`amp-story`](../../../../documentation/components/reference/amp-story.md).

## توفير معلومات التعريف

لكي يتم اكتشاف القصص على الويب، يلزم وجود بيانات تعريف معينة لتوفير تفاصيل قليلة عن القصة، مثل:

- عنوان القصة، ممثل عن طريق السمة `title` (مثل، "Joy of Pets").
- اسم الناشر، ممثل عن طريق السمة `publisher` (مثل، "AMP tutorials").
- شعار الناشر، ممثل عن طريق السمة `publisher-logo-src`. وذلك عبارة عن عنوان URL لصورة شعار بتنسيق مربع بنسبة عرض إلى ارتفاع تبلغ 1 × 1.
- صورة ملصق للقصة، ممثلة بالسمة `poster-portrait-src`. وتلك عبارة عن عنوان URL للملصق، ويجب أن تكون الصورة بتنسيق عمودي مع نسبة عرض إلى ارتفاع 3 × 4.

لنبدأ بإضافة هذه السمات إلى علامة [`amp-story`](../../../../documentation/components/reference/amp-story.md) الخاصة بنا:

```html
<amp-story
  standalone
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
  poster-portrait-src="assets/cover.jpg"
></amp-story>
```

بالإضافة إلى هذه السمات المطلوبة، هناك سمات أخرى يمكنك تطبيقها. لمعرفة المزيد، راجع قسم [السمات](../../../../documentation/components/reference/amp-story.md#attributes) في المستندات المرجعية لـ [`amp-story`](../../../../documentation/components/reference/amp-story.md).

[tip type="note"] **ملحوظة –** تكون سمات البيانات التعريفية هذه بمثابة ملحق ولا تحل محل أي بيانات مهيكلة (مثل JSON-LD) على الصفحة. ولضمان اكتشاف قصص الويب الخاصة بك عبر جميع الأنظمة الأساسية، يجب إضافة [البيانات المهيكلة](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata) إلى كل صفحات AMP، بما في ذلك قصص AMP. [/tip]

في هذه المرحلة، لدينا غلاف قصة من دون أي محتوى. لنقم بإنشاء تلك الصفحة.
