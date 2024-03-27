---
$title: إنشاء صفحات AMP تفاعلية
---

يعد إنشاء عناصر تفاعلية في AMP أمرًا في غاية السهولة.
ضع `layout=responsive` عليها فحسب.

## إنشاء صور تفاعلية

يجب أن يكون لجميع الموراد المُحمّلة خارجيًا، بما فيها الصور،
حجم وموضع محددان
وهكذا عند تحميل الموارد، لن تهتز الصفحة ويُعاد عرضها.

يمكنك إنشاء صور تفاعلية
عن طريق تحديد العرض والارتفاع،
وتعيين التنسيق ليكون تفاعليًا،
واستخدام [`srcset`](style_pages.md) لتوضيح
مادة عرض الصور المُراد استخدامها بناءً على أحجام الشاشة المتنوعة:

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

يتلاءم هذا العنصر [`amp-img`](../../../../documentation/components/reference/amp-img.md) بشكل تلقائي مع عرض
عنصر الحاوية المتعلق به،
ويتم ضبط ارتفاعه تلقائيًا على نسبة العرض إلى الارتفاع
المُحددة من خلال العرض والارتفاع المحددين:

<amp-img src="/static/img/docs/responsive_amp_img.png" width="500" height="857"></amp-img>

راجع أيضًا [AMP بحسب علامة `amp-img` للنموذج](../../../../documentation/components/reference/amp-img.md).

## إضافة أنماط إلى إحدى الصفحات

أضف جميع الأنماط داخل العلامة `<style amp-custom>`
في رأس المستند.
على سبيل المثال:

[sourcecode:html]

<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    <script async src="https://ampjs.org/v0.js"></script>

  </head>
[/sourcecode]

**مهم:**
تأكد من وجود علامة `<style amp-custom>` واحد فقط في صفحتك،
حيث لا يُسمح بأكثر من علامة في AMP.

حدد أنماط المكوّنات من خلال محددات الفئات أو العناصر
باستخدام خصائص CSS الشائعة. على سبيل المثال:

[sourcecode:html]

<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

**مهم:**
تحقق من توافق أنماطك في AMP؛
فبعض الأنماط غير متوافقة لأسباب تتعلق بالأداء
(راجع أيضًا [CSS المتوافقة](style_pages.md)).

## عناصر الحجم والموضع

يفصل تطبيق AMP تنسيق المستند عن تحميل المورد
بحيث يتمكّن AMP من تحميل تنسيق الصفحة بدون انتظار عمليات تنزيل المورد.

حدد الحجم والموضع لجميع عناصر AMP المرئية
عن طريق تقديم سمة `width` و`height`.
وتتضمّن هاتان السمتان نسبة العرض إلى الارتفاع الخاصة بالعنصر،
والتي يمكن بعد ذلك أن تتغيّر مع الحاوية.

عيّن التنسيق ليكون تفاعليًا.
ويؤدي هذا إلى تغيير حجم العنصر ليلائم عرض عنصر الحاوية الخاص به
كما يغيّر حجم ارتفاعه تلقائيًا ليلائم نسبة العرض إلى الارتفاع المحددة من خلال سمتي العرض والارتفاع.

تعرّف على المزيد حول [التنسيقات المتوافقة في AMP](control_layout.md).

## التحقق من صحة الأنماط والتنسيق

استخدم أداة التحقق من صحة صفحات AMP لاختبار
لغة CSS وقيم التنسيق بالصفحة.

تعمل أداة التحقق من الصحة على التأكد من عدم تجاوز لغة CSS للصفحة حد 75000 بايت،
وتتحقق من الأنماط الغير مسموح بها، كما تتأكد من توافق
تنسيق الصفحة وصحته.
راجع أيضًا هذه القائمة الكاملة من [أخطاء الأنماط والتنسيقات](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md).

نموذج لخطأ في وحدة التحكم لصفحة بها لغة CSS تتجاوز حد 75000 بايت:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

تعرّف على المزيد من المعلومات حول كيفية [التحقق من صحة صفحات AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)،
بما في ذلك كيفية تتبع أخطاء الأنماط وإصلاحها.
