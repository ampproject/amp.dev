---
"$title": تحسين التفاعلية
"$order": '2'
description: 'يوفر رمز البداية تجربة مستخدم خاوية قليلًا. وهناك طريقتان لتحسينها\: - أضف مؤشرًا يعرض ...'
---

يوفر رمز البداية تجربة مستخدم خاوية قليلًا. وهناك طريقتان لتحسينها:

- أضف مؤشرًا يعرض الشريحة الحالية والعدد الإجمالي للشرائح.
- عند اختيار المستخدم لون قميص مختلفًا، قم بتغيير مكتبة الصور لعرض صور القمصان باللون المحدد.

قبل تقديم المكون [`amp-bind`](../../../../documentation/components/reference/amp-bind.md)، لم يكن إضافة ميزة مثل هذه أمرًا ممكنًا، لذا هيا نخوض تجربة عملية مع [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) وإضافة هذه الميزات الجديدة إلى نموذج الرموز لدينا.

## تثبيت المكون `amp-bind`

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) عبارة عن مكون AMP يوفر تفاعلية مخصصة عبر ربط البيانات والتعبيرات تشبه JS، لاستخدام [`amp-bind`](../../../../documentation/components/reference/amp-bind.md)، عليك تثبيته في الصفحة.

افتح الملف [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)، وأضف النص البرمجي التالي لقائمة مكونات AMP في قسم `<head>` من الصفحة:

```html
<script async custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
```

## إضافة مؤشر شريحة

يعمل [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) من خلال ربط سمات العناصر بتعبيرات مخصصة، حيث يمكن لهذه التعبيرات الإشارة إلى "الحالة" (بيانات JSON المتغيرة). ويمكننا تهيئة هذه الحالة من خلال المكون [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) المضمن مع [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

### تهيئة حالة الشريحة

لنبدأ تهيئة متغير حالة لتتبع فهرس الشريحة المعروضة حاليًا في مكتبة الصور. افتح [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) وأضف ما يلي للجزء العلوي من `<body>` الخاص بالصفحة (قبل `<header>`):

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

وتكون البيانات الموجودة ضمن العناصر [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) قابلة للوصول من خلال معرِّفاتها المقترنة. على سبيل المثال: يمكننا الإشارة إلى هذا المتغير من خلال جزء التعبير التالي:

```javascript
selected.slide // Evaluates to 0.
```

### تحديث حالة الشريحة

لنقم بعد ذلك بتحديث هذا المتغير عند تغيير المستخدم للشرائح في المكتبة من خلال إضافة إجراء `"on"` التالي للعنصر الموجود مسبقًا [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md):

```html
<amp-carousel type="slides" layout="fixed-height" height=250 id="carousel"
    on="slideChange:AMP.setState({selected: {slide: event.index}})">
```

والآن كلما تغيرت الشريحة المعروضة لتغييرات [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)، سيتم استدعاء الإجراء `AMP.setState` بالوسيطة التالية:

```javascript
{
  selected: {
    slide: event.index
  }
}
```

يتم تقييم التعبير `event.index` لفهرس الشريحة الجديدة، ويقوم إجراء `AMP.setState()` بدمج حرف الكائن هذا في الحالة الحالية، وهذا يستبدل القيمة الحالية لـ `selected.slide` بقيمة `event.index`.

[tip type="tip"] **تلميح–** يقوم `AMP.setState()` بإجراء دمج عميق لحروف الكائن المتداخلة. لمزيد من التفاصيل، راجع توثيق [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

### ربط عناصر المؤشر

بعد ذلك نستخدم متغير الحالة هذا الذي يتتبع الشريحة المعروضة حاليًا، وإنشاء مؤشر شريحة. اعثر على عنصر مؤشر الشريحة (ابحث عن `<!-- TODO: "Add a slide indicator" -->`) وأضف عمليات الربط التالية لتوابعها:

```html
<!-- TODO: "Add a slide indicator" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

`[class]` عبارة عن ربط من شأنه تغيير السمة `class` ويمكنك استخدامه لإضافة فئات CSS أو إزالتها من أي عنصر.

**جرِّبها**: حدِّث الصفحة وغيِّر الشريحة!

من خلال تغيير الشريحة في المكتبة، سيتم:

1. تشغيل `slideChange event` ...
2. الذي يستدعي الإجراء `AMP.setState` ...
3. الذي يحدِّث متغير الحالة `selected.slide` ...
4. الذي يحدِّث الربط `[class]` في عناصر المؤشر `<span>`!

رائع! والآن أصبح لدينا مؤشر شريحة يعمل.

[tip type="success"]

راجع ما إذ كان بإمكانك إضافة وظيفية ليتسنى تحديث مكتبة الصور بالعنصر المحدد عند نقر مستخدم فوق نقطة مؤشر شريحة. وكتلميح، استخدم الحدث `tap` والربط `[slide]` في [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[/tip]

## تغيير الصور في المكتبة

سيكون الأمر رائعًا إن تمكنَّا من رؤية صور لألوان قمصان مختلفة عند تغيير اللون المحدد. مع [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) يمكننا القيام بهذا الأمر من خلال ربط `[src]` الموجودة في العناصر [`amp-img`](../../../../documentation/components/reference/amp-img.md) ضمن [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

### تهيئة حالة وحدة حفظ المخزون

أولًا نحتاج لتهيئة بيانات الحالة بعناوين URL الخاصة بمصدر الصورة لكل قميص ملون. لنقم بالأمر مع عنصر [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) جديد:

```html
<!-- Available shirts. Maps unique string identifier to color and image URL string. -->
<amp-state id="shirts">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg"
      },
      "1002": {
        "color": "blue",
        "image": "./shirts/blue.jpg"
      },
      "1010": {
        "color": "brown",
        "image": "./shirts/brown.jpg"
      },
      "1014": {
        "color": "dark green",
        "image": "./shirts/dark-green.jpg"
      },
      "1015": {
        "color": "gray",
        "image": "./shirts/gray.jpg"
      },
      "1016": {
        "color": "light gray",
        "image": "./shirts/light-gray.jpg"
      },
      "1021": {
        "color": "navy",
        "image": "./shirts/navy.jpg"
      },
      "1030": {
        "color": "wine",
        "image": "./shirts/wine.jpg"
      }
    }
  </script>
</amp-state>
```

يحتوي عنصر [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) هذا على كائن JSON من شأنه إقران سلسلة معرِّف قميص (مثل وحدة حفظ المخزون) بعنوان URL للون والصورة الخاصين بالقميص المقابل. فيما ستعمل صفيفة JSON أيضًا هنا لكن باستخدام كائن يسمح لنا بالقيام بالمزيد من الأمور الرائعة الأخرى التي ستراها قريبًا.

والآن يمكننا الوصول إلى عنوان URL الخاص بالصورة عبر معرِّف قميص. على سبيل المثال، يتم تقييم `shirts['10014'].color` لـ `"dark green"` و`shirts['10030'].image `يقوم بإعادة عنوان URL الخاص بالصورة للون القميص `"wine"`.

### تتبع وحدة حفظ المخزون المحددة

إذا قمنا بإضافة متغير حالة آخر يتتبع وحدة حفظ المخزون المحددة، فيمكننا ربط تعبير بعناصر [`amp-img`](../../../../documentation/components/reference/amp-img.md) لتحديث سماتها `src` عند تغيير وحدة حفظ المخزون المحددة. أضف مفتاح `sku` جديد لـ JSON الخاص بالعنصر الموجود مسبقًا `amp-state#selected`:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0,
      "sku": "1001"
    }
  </script>
</amp-state>
```

### تحديث حالة وحدة حفظ المخزون

أضف إجراء "تشغيل" لـ [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) الذي يقوم بتحديث المتغير `selected.sku` كلما تم تحديد لون جديد:

```html
<amp-selector name="color"
    on="select:AMP.setState({selected: {sku: event.targetOption}})">
```

[tip type="tip"] **تلميح –** يمكن إتمام هذا الأمر أيضًا من خلال إضافة الإجراءات `on="tap:AMP.setState(...)` لكل [`amp-img`](../../../../documentation/components/reference/amp-img.md) تابع داخل [`amp-selector`](../../../../documentation/components/reference/amp-selector.md). وتُعد إحدى الأمور الرائعة حيال [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) أنه يبسِّط لغة الترميز بطرق مثل هذه. [/tip]

### ربط عناصر الصورة

فيما بعد، قم بإضافة عمليات الربط لـ [`amp-img`](../../../../documentation/components/reference/amp-img.md):

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img width=200 height=250 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=300 height=375 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=400 height=500 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
```

[tip type="note"] **ملحوظة –**  من الناحية العملية، من المحتمل أن يكون لكل صورة في المكتبة `src` مختلف. ويمكن إتمام هذا الأمر من خلال استبدال الصورة الواحدة بصفيفة من الصور؛ ومن أجل التبسيط، يستخدم هذا البرنامج التعليمي صورة واحدة بتكبيرات مختلفة. [/tip]

**جرِّبه**: حدِّث الصفحة وحدد لونًا مختلفًا لقميص ما، وعند القيام بهذا؛ يتم تحديث صور المكتبة لعرض القمصان باللون المحدد.
