---
"$title": حل أخطاء التحقق من الصحة
"$order": '2'
description: في هذا القسم، سنتناول أخطاء التحقق من صحة صفحات AMP ونحلها من صفحة AMP الخاصة بنا، ولاحظ أن الأخطاء قد تظهر بترتيب مختلف في وحدة التحكم الخاصة بك.
---

في هذا القسم، سنتناول أخطاء التحقق من صحة صفحات AMP ونحلها من صفحة AMP الخاصة بنا، ولاحظ أن الأخطاء قد تظهر بترتيب مختلف في وحدة التحكم الخاصة بك.

## تضمين مجموعة أحرف

سنبدأ بإصلاح الخطأ التالي:

<pre class="error-text">The mandatory tag 'meta charset=utf-8' is missing or incorrect.</pre>

لعرض النص عرضًا صحيحًا، تتطلب AMP تحديد مجموعة الأحرف للصفحة. ويجب أن تكون معلومات مجموعة أحرف التعريف أيضًا أول فرع في علامة `<head>`. ويتمثل سبب وجوب أن تكون هذه العلامة أولاً في تجنب إعادة تفسير المحتوى الذي تمت إضافته قبل علامة مجموعة أحرف التعريف.

**أضف** الرمز التالي كسطر أول من علامة `<head>`:

```html
<meta charset="utf-8" />
```

**احفظ** الملف وأعد تحميل الصفحة، وتحقق من أن خطأ مجموعة الأحرف لم يعد ظاهرًا.

## تضمين رابط معياري

الآن، دعنا نلقي نظرة على الخطأ التالي:

<pre class="error-text">The mandatory tag 'link rel=canonical' is missing or incorrect.</pre>

يحتاج كل مستند AMP إلى رابط يشير إلى الإصدار "المعياري" من ذلك المستند، وسنتعلم المزيد حول ماهية الصفحات المعيارية والأساليب المختلفة للربط المعياري في الخطوة [جعل صفحتك قابلة للاكتشاف](discoverable.md) من هذا البرنامج التعليمي.

في هذا البرنامج التعليمي، سنتدبر في مقال HTML الأصلي الذي نقوم بتحويله ليكون الصفحة المعيارية.

ابدأ و**أضف** الرمز التاليل أسفل العلامة `<meta charset="utf-8" />`:

```html
<link rel="canonical" href="/article.html">
```

[tip type="note"] يمكنك إنشاء صفحة AMP معيارية قائمة بذاتها، وما يزال الرابط المعياري مطلوبًا، ولكن يجب أن يشير إلى مقال AMP نفسه:

```html
<link rel="canonical" href="article.amp.html">
```

[/tip]

أما الآن، **أعد تحميل** الصفحة، على الرغم من وجود الكثير من الأخطاء التي يجب إصلاحها، إلا أن خطأ الرابط المعياري لم يعد موجودًا.

## تحديد سمة AMP

تتطلب AMP سمة على عنصر `<html>` للجذر لإعلان الصفحة كمستند AMP.

<pre class="error-text">The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'<br>The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.</pre>

ويمكن حل الأخطاء أعلاه ببساطة عن طريق إضافة السمة `⚡` إلى العلامة `<html>` على النحو التالي:

```html
<html ⚡ lang="en">
```

والآن، تابع وأعد تحميل الصفحة وتحقق من اختفاء كلا الخطأين.

[tip type="note"] على الرغم من أن تحديد `⚡` يُعد الأسلوب الموصى به، فمن الممكن أيضًا استخدام السمة `amp` بدلًا عن السمة `⚡` مثل:

```html
<html amp lang="en">
```

[/tip]

## تحديد منفذ عرض

بعد ذلك، دعنا نتعامل مع الخطأ التالي:

<pre class="error-text">The mandatory tag 'meta name=viewport' is missing or incorrect.</pre>

تتطلب AMP تعريف `width` و`minimum-scale` لمنفذ العرض، ويجب تحديد هذه القيم على أنها `device-width` و`1`، على التوالي، إذ يُعد إطار العرض علامة شائعة مضمنة في `<head>` لصفحة HTML.

لحل خطأ منفذ العرض، أضف مقتطف HTML التالي إلى علامة `<head>`:

```html
<meta name="viewport" content="width=device-width">
```

تُعد القيم المحددة لـ `width` و`minimum-scale` القيم المطلوبة في AMP، حيث إن تعريف `initial-scale` ليس إلزاميًا ولكنه مضمن بشكل شائع في تطوير الويب للهاتف المحمول وهو أمر موصى به. يمكنك قراءة المزيد حول منفذ العرض والتصميم سريع الاستجابة في [تهيئة منفذ العرض](https://developers.google.com/speed/docs/insights/ConfigureViewport).

وكما في السابق، **أعد تحميل** الصفحة وتحقق من اختفاء الخطأ.

## استبدال صفحات الأنماط الخارجية

الخطأ التالي متعلق باستخدامنا لصفحات الأنماط:

<pre class="error-text">The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.</pre>

يُعد هذا الخطأ على وجه التحديد الشكوى بشأن علامة رابط صفحة الأنماط التالية في علامة `<head>`:

```html
<link href="base.css" rel="stylesheet" />
```

فيما تتمثل المشكلة في أن هذا عبارة عن مرجع خارجي لصفحة الأنماط. في AMP، للحفاظ على أوقات تحميل المستندات في أسرع وقت ممكن؛ لا يمكنك تضمين صفحات أنماط خارجية، وبدلًا عن ذلك، يجب تضمين جميع قواعد ورقة الأنماط في مستند AMP باستخدام علامات `<style amp-custom></style>` أو كأنماط مضمنة.

```html
<style amp-custom>

/* The content from base.css */

</style>
```

لذا، هيا نبدأ في حل الخطأ:

1. **أزل** العلامة `<link>` التي تشير إلى صفحة الأنماط في `<head>` واستبدلها بالعلامة `<style amp-custom></style>` المضمنة. إذ تعد السمة `amp-custom` في علامة النمط إلزامية.
2. **انسخ** جميع الأنماط من ملف [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) إلى العلامات `<style amp-custom></style>`.

مرة أخرى، **أعد تحميل** الصفحة وتحقق من اختفاء خطأ صفحات الأنماط.

[tip type="note"] **ملحوظة –** ليس التصميم المضمن وحده مطلوبًا، ولكن يوجد حد لحجم الملف يبلغ 50 كيلو بايت لجميع معلومات التصميم، ويجب عليك استخدام معالجات CSS الأولية مثل [SASS](http://sass-lang.com/) لخفض حجم CSS قبل تضمين CSS في صفحات AMP الخاصة بك. [/tip]

[tip type="important"] **مهم –** يمكنك الحصول على علامة نمط واحدة فقط في مستند AMP بأكمله، وإذا كان لديك العديد من صفحات الأنماط الخارجية المشار إليها بواسطة صفحات AMP الخاصة بك، فستحتاج إلى تجميع صفحات الأنماط هذه في مجموعة واحدة من القواعد. لمعرفة قواعد CSS الصالحة في AMP، اقرأ [CSS المدعوم](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md). [/tip]

## استبعاد JavaScript الخاصة بالطرف الثالث

بينما يمكن إعادة صياغة صفحات الأنماط بسهولة نسبيًا باستخدام AMP من خلال تضمين CSS، إلا أن الشيء نفسه لا ينطبق على JavaScript.

<pre class="error-text">The tag 'script' is disallowed except in specific forms.</pre>

بشكل عام، لا يُسمح بالنصوص البرمجية في AMP إلا إذا كانت تتبع متطلبين رئيسيين:

1. يجب أن تكون جميع ملفات JavaScript غير متزامنة (على سبيل المثال، قم بتضمين السمة `async` في علامة النص البرمجي).
2. JavaScript مخصصة لمكتبة AMP ولأي من مكونات AMP على الصفحة.

ويستبعد هذا على نحو فعال استخدام جميع ملفات JavaScript التي ينشئها المستخدم/الأطراف الثالثة في AMP باستثناء ما هو مذكور أدناه.

[tip type="note"] الاستثناءات الوحيدة للقيود المفروضة على البرامج النصية التي ينشئها المستخدم/الطرف الثالث هي:

1. نص برمجي يضيف البيانات التعريفية إلى الصفحة أو يهيئ مكونات AMP. وسيكون لها سمة النوع `application/ld+json` أو `application/json`.
2. النص مدرج في iframe. ويجب اعتبار تضمين JavaScript في iframe بمثابة مقياس الملاذ الأخير. وحيثما أمكن، يجب استبدال وظائف JavaScript باستخدام [مكونات AMP](../../../../documentation/components/index.html). فيما سنستكشف مكون AMP الأول في القسم التالي. [/tip]

حاول فتح ملف [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js) الخارجي، ماذا ترى؟ يجب أن يكون الملف فارغًا من أي كود JavaScript وأن يتضمن فقط تعليقًا للمعلومات على النحو التالي:

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

وبالنظر إلى أن ملف JavaScript الخارجي هذا ليس مكونًا وظيفيًا لموقعنا على الويب، يمكننا إزالة المرجع بالكامل بأمان.

**أزل** مرجع الخارجي JavaScript التالي من مستندك:

```html
<script type="text/javascript" src="base.js"></script>
```

والآن، **أعد تحميل** الصفحة وتحقق من اختفاء خطأ النص البرمجي.

## تضمين فقرة AMP CSS

تشير الأخطاء التالية إلى رمز فقرة مفقود:

<pre class="error-text">The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.<br>The mandatory tag 'head > style : boilerplate' is missing or incorrect.<br>The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.</pre>

يتطلب كل مستند AMP رمز الكود لـ AMP التالي:

```html
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
```

**أضف** رمز الفقرة إلى الجزء السفلي من علامة `<head>` لمستندك.

تخفي العلامة `<style amp-boilerplate>` محتوى النص في البداية حتى يتم تحميل مكتبة AMP JavaScript، ثم يتم عرض المحتوى. إذ يقوم AMP بهذا الأمر لمنع عرض المحتوى غير المصمم، المعروف أيضًا باسم وميض المحتوى غير المضمن (FOUC). ويساعد ذلك في ضمان أن تبدو تجربة المستخدم فورية حقًا حيثما يظهر محتوى الصفحة مرة واحدة ويتم عرض كل شيء في الجزء المرئي من الصفحة معًا، وتقوم العلامة الثانية بإرجاع هذا المنطق إذا تم تعطيل JavaScript في المتصفح.

## استبدال `<amp-img>` بـ `<img>`

لا تدعم AMP نظائر HTML الافتراضية لعرض الوسائط، وهو ما يفسر الخطأ التالي:

<pre class="error-text">The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?</pre>

ويحتوي AMP على مكون ويب مصمم خصيصًا لاستبدال علامة `<img>`، إنها العلامة [`<amp-img>`](../../../../documentation/components/reference/amp-img.md):

```html
<amp-img src="mountains.jpg"></amp-img>
```

**استبدل** العلامة [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) أعلاه بالعلامة `<img>` وابدأ في تشغيل المدقق مرة أخرى، ومن المفترض أن تتلقى عدة أخطاء جديدة:

<pre class="error-text">Layout not supported: container<br>The implied layout 'CONTAINER' is not supported by tag 'amp-img'.</pre>

لماذا تسبب [`amp-img`](../../../../documentation/components/reference/amp-img.md) في تشغيل خطأ آخر؟ لأن [`amp-img`](../../../../documentation/components/reference/amp-img.md) ليس بديلًا مباشرًا لعلامة HTML التقليدية، هناك متطلبات إضافية عند استخدام [`amp-img`](../../../../documentation/components/reference/amp-img.md).

### نظام تخطيط AMP

يخبرنا خطأ التنسيق أن [`amp-img`](../../../../documentation/components/reference/amp-img.md) لا يدعم نوع التخطيط `container`، حيث يتمثل أحد أهم المفاهيم في تصميم AMP في تركيزها على تقليل مقدار إعادة تدفق نموذج كائن المستند المطلوب لعرض صفحات الويب الخاصة بها.

لتقليل إعادة تدفق نموذج كائن المستند، تتضمن AMP نظام تخطيط لضمان معرفة تنسيق الصفحة في أقرب وقت ممكن في دورة حياة تنزيل الصفحة وعرضها.

وتقارن الصورة أدناه طريقة تصميم صفحة HTML غالبًا مقارنة بالنهج الذي يفرضه AMP. لاحظ في النهج الموجود على اليمين طريقة تدفق النص في كل مرة يتم فيها تحميل إعلان أو صورة. ويعمل أسلوب AMP في التنسيق على منع النص من التنقل؛ حتى إذا كانت الصور والإعلانات تستغرق وقتًا طويلاً في التحميل.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="A comparison between how content is normally laid out and AMP's approach") }}

فيما يسمح نظام تخطيط AMP بوضع العناصر على الصفحة وقياسها بعدة طرق؛ الأبعاد الثابتة والتصميم سريع الاستجابة والارتفاع الثابت والمزيد.

أما في حالة مقالنا، استنتج نظام التخطيط نوع التخطيط [`amp-img`](../../../../documentation/components/reference/amp-img.md) باعتباره النوع `container`. على الرغم من ذلك، فإن النوع `container` ينطبق فقط على العناصر التي تحتوي على عناصر تابعة، أما النوع `container` غير متوافق مع العلامة [`amp-img`](../../../../documentation/components/reference/amp-img.md)، وهو سبب هذا الخطأ.

لماذا تم استنتاج النوع `container`؟ لأننا لم نحدد سمة `height` للعلامة [`amp-img`](../../../../documentation/components/reference/amp-img.md). أما في HTML، يمكن تقليل إعادة التدفق من خلال تحديد عرض وارتفاع ثابتين للعناصر على الصفحة. وفي AMP، تحتاج إلى تحديد العرض والارتفاع لعناصر [`amp-img`](../../../../documentation/components/reference/amp-img.md) حتى تتمكن AMP من تحديد نسبة العرض إلى الارتفاع للعنصر مسبقًا.

**أضف** `width` و`height` لعلامة [`amp-img`](../../../../documentation/components/reference/amp-img.md) على النحو التالي:

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

قم بتحديث الصفحة وتحقق من أداة التحقق من الصحة؛ يجب ألا ترى أي أخطاء بعد الآن!

والآن لديك مستند AMP صالح، لكن الصورة لا تبدو رائعة جدًا لأنها موضوعة على نحو غير ملائم على الصفحة. وبشكل افتراضي، عندما تحدد ارتفاع وعرض [`amp-img`](../../../../documentation/components/reference/amp-img.md)، فإن AMP ستصلح الأبعاد وفقًا لما تحدده؛ لكن ألن يكون الأمر رائعًا إذا كان حجم AMP الصورة يمتد *على نحو متجاوب* ويناسب الصفحة بغض النظر عن حجم الشاشة؟

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="Our image isn't responsive.") }}

لحسن الحظ، يمكن لـ AMP معرفة نسبة العرض إلى الارتفاع للعناصر من العرض والارتفاع الذي تحدده، إذ يسمح هذا الأمر لنظام تخطيط AMP بتحديد موضع العنصر وقياسه بعدة طرق، حيث تقوم السمة `layout` بإعلام AMP بالطريقة التي تريد أن يتم بها وضع العنصر وقياسه.

دعنا **نعيِّن** سمة التنسيق إلى `response` بحيث يتم تغيير حجم الصورة ومقاييسها:

```html
<amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
```

ها هي! صورتنا في نسبة العرض إلى الارتفاع الصحيحة وتملأ عرض الشاشة على نحو متجاوب.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="Our image is now responsive!") }}

[tip type="read-on"] **تابع القراءة –** تعرَّف على مزيد من المعلومات حول نظام تخطيط AMP في [مواصفات تنسيق AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md). [/tip]

## نجاح!

الآن يجب أن يبدو مستند AMP على النحو التالي:

```html
<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width">

    <link rel="canonical" href="/article.html">
    <link rel="shortcut icon" href="amp_favicon.png">

    <title>News Article</title>

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>

      <amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
    </article>
  </body>
</html>
```

قم بتحديث الصفحة وانظر إلى خرج وحدة التحكم، يجب أن يتم الترحيب بك بالرسالة التالية:

<pre class="success-text">تم التحقق من صحة AMP بنجاح.</pre>

### أسئلة مكررة

- [ما هو تدفق DOM؟](http://stackoverflow.com/a/27637245)
- [ماذا لو لم يتم تعريف سمة التنسيق؟](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [ماذا لو كان العرض والارتفاع غير حدد؟ ](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
