---
'$title': التعرف على رمز البداية
$order: 1
description: إن صفحة AMP عبارة عن صفحة HTML مع بعض القيود للحصول على أداء موثوق. تحتوي صفحات AMP على القليل من لغة الترميز الخاصة التي يعرِّفها على أنها صفحة AMP.
---

## فقرة AMP

إن صفحة AMP عبارة عن صفحة HTML مع بعض القيود للحصول على أداء موثوق. تحتوي صفحات AMP على القليل من لغة الترميز الخاصة التي يعرِّفها على أنها صفحة AMP.

تبدو صفحة AMP الأساسية مثل:

```html
<!DOCTYPE html>
<html amp>
  <head>
    <meta charset="utf-8" />
    <link rel="canonical" href="hello-world.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello World!
  </body>
</html>
```

[tip] يمكنك استخدام [مولد الفقرات](https://amp.dev/boilerplate) لإعداد هيكل أساسي سريع لصفحة AMP لديك. وهو يوفر أيضًا مقتطفات للبيانات المهيكلة، لأجل إنشاء تطبيقات ويب تقدمية وغير ذلك الكثير! [/tip]

## مكونات AMP

يقوم رمز البداية الخاص بالبرنامج التعليمي ([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)) ببناء صفحة AMP الأساسية بمحتوى الصفحة الخاص بها (صور، نصوص، وغيرها) إلى جانب تضمين بعض مكونات AMP:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
<script
  async
  custom-template="amp-mustache"
  src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"
></script>
<script
  async
  custom-element="amp-form"
  src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
></script>
<script
  async
  custom-element="amp-selector"
  src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"
></script>
```

وتوفر مكونات AMP وظائف إضافية ومكونات واجهة المستخدم التي تضيف إثراءً للتفاعلية إلى صفحات AMP. ويستخدم رمز البداية مكونات AMP التالية:

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): مكتبة صور تعرض طرق عرض متعددة للمنتجات.
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): نظام وضع قوالب لعرض استجابات الخادم من amp-form.
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): يضيف وظائفية خاصة لعناصر `<form>` الضرورية لصفحات AMP.
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): يقدم طريقة دلالية لتحديد عنصر واحد أو أكثر لمجموعة من العناصر. ويمكن استخدامه كمصدر إدخال إلى amp-form.

## التفاعلية الأساسية

يقدم رمز البداية بعض التفاعلية الأساسية:

- تعرض مكتبة الصور (an [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)) طرق عرض متعددة للمنتجات.
- يمكن إضافة المنتج إلى عربة تسوق المستخدم (عبر [`amp-form`](../../../../documentation/components/reference/amp-form.md)) من خلال النقر فوق زر "إضافة إلى عربة التسوق" الموجود في الجزء السفلي من الصفحة.

**جرِّبه**: اسحب مكتبة الصور وانقر فوق زر "إضافة إلى عربة التسوق".
