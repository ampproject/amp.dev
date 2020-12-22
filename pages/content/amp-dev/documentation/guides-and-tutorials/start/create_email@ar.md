---
"$title": إنشاء بريدك الإلكتروني الأول في AMP
"$order": '0'
description: تعرّف على ما يميز بريد AMP الإلكتروني من خلال إنشاء بريدك الإلكتروني الأول.
tutorial: 'true'
formats:
- email
author: CrystalOnScript
---

يتيح AMP للبريد الإلكتروني لمرسلي البريد الإلكتروني استخدام AMP في رسائل البريد الإلكتروني لديهم لدعم مجموعة كاملة من الميزات الجديدة. إذ يمكن أن تحتوي رسائل البريد الإلكتروني المكتوبة باستخدام AMP على عناصر تفاعلية، مثل دوَّارات الصور أو أكورديونات الصور، ويظل المحتوى محدثًا في الرسالة، إلى جانب قدرة المستلمين على اتخاذ إجراء مثل الرد على نموذج، كل ذلك دون مغادرة صندوق البريد الوارد خاصتهم.

إن AMP للبريد الإلكتروني متوافق مع رسائل البريد الإلكتروني الحالية. ويتم تضمين إصدار AMP للرسالة في البريد الإلكتروني كجزء جديد من ملحقات بريد الإنترنت متعددة الأغراض (MIME)، بالإضافة إلى HTML والنص العادي، مما يضمن التوافق عبر جميع عملاء البريد.

تلميح: للتعرف على منصات البريد الإلكتروني (ESPs) والعملاء والموفرين الذين يدعمون AMP للبريد الإلكتروني، راجع [منصات البريد الإلكتروني المدعومة](../../../support/faq/email-support.md) في الأسئلة الشائعة.

اتبع هذا البرنامج التعليمي لإنشاء وإرسال بريدك الإلكتروني الديناميكي الأول المدعوم من AMP. ويمكنك عرض الرمز المكتمل [هنا](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73) .

# البدء بالنص الأساسي لبريد AMP الإلكتروني

تدعم ساحة AMP تنسيق AMP للبريد الإلكتروني، الذي يسمح لك بتطوير رسائل AMP الإلكترونية الخاصة بك واختبارها والتحقق من صحتها. افتح [ساحة AMP](https://playground.amp.dev/?runtime=amp4email) وتأكد من أنه تم تعيين التنسيق على `AMP for Email` في الزاوية العلوية اليسرى. يجب أن تشاهد الرمز التالي:

```html
<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <style amp-custom>
    h1 {
      margin: 1rem;
    }
  </style>
</head>
<body>
  <h1>Hello, I am an AMP EMAIL!</h1>
</body>
</html>
```

إنه يحتوي على جميع لغات الترميز المطلوبة وأدنى قدر من الرموز ليصبح بريد AMP إلكتروني صالحًا. لاحظ أيضًا العديد من الأمثلة الأخرى لقوالب البريد الإلكتروني الصالحة في القائمة المنسدلة بالجهة اليمنى.

لنقضي دقيقة في تذكر الاختلافات الملحوظة عن رسائل HTML الإلكترونية الكلاسيكية:

- يجب أن تعرّف رسائل AMP الإلكترونية نفسها من خلال تضمين `⚡4email`، أو `amp4email`,، في علامة html.
- يجب أن تحتوي علامة `<head>` أيضًا على علامة `<script>` التي تحمِّل وقت تشغيل AMP. `<script async src="https://cdn.ampproject.org/v0.js"></script>`
- نص CSS أساسي لإخفاء المحتوى مبدئيًا حتى تحميل AMP. ` <style amp4email-boilerplate>body{visibility:hidden}</style>`

إذا سبق لك التعامل مع رسائل البريد الإلكتروني، فإن فكرة إضافة نص برمجي إلى رسالة إلكترونية قد يشكل أجراس إنذار في رأسك! لكن اطمئن، فموفري البريد الإلكتروني الذي يدعمون رسائل AMP الإلكترونية يطبقون فحوصات أمان صارمة تسمح فقط بتشغيل نصوص AMP البرمجية المتحقق منها في العملاء الخاصين بهم. وهذا يتيح تشغيل الميزات الديناميكية والتفاعلية مباشرة في صناديق بريد المستلمين الذين ليس لديهم ثغرات أمنية! اقرأ المزيد حول لغة الترميز المطلوبة لرسائل AMP الإلكترونية هنا.

[tip type="important"] يمكن تضمين نصوص AMP البرمجية لـ [المكونات المدعومة](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) فقط في رسائل AMP الإلكترونية. [/tip]

# تضمين صورة

يمكن استخدام معظم علامات HTML المستعملة في البريد الإلكتروني في رسائل AMP الإلكترونية. مع ذلك، يتم استبدال بعض العلامات، مثل `<img>` بما يكافئها من علامات AMP، [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md).

تتطلب علامة `<amp-img>` تحديد العرض والارتفاع للصورة بخلاف علامة `<img>` و`<amp-img>` التي يجب إغلاقها صراحة عن طريق `</amp-img>`.

```html
<amp-img src="https://link/to/img.jpg"
         alt="photo description"
         width="100"
         height="100">
</amp-img>
```

بالإضافة إلى ذلك، يتم دعم ملفات GIF عن طريق [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md).

نظرًا لأنه لا يتم استضافة الرسائل الإلكترونية على الخادم الخاص بك، يجب أن تستخدم عناوين URL مسارات مطلقة في رسائل AMP الإلكترونية ويجب أن تكون HTTPS.

[Placekitten](https://placekitten.com/) هو موقع ويب يستخدم صور القطط الصغيرة كعناصر نائبة. وهي تسمح لك باختيار حجم الصورة مباشرة في URL!

يمكننا تضمين صورة في البريد الإلكتروني الأول لنا بإضافة الرمز أدناه.

```html
<body>
  <amp-img src="https://placekitten.com/800/400"
           alt="Welcome"
           width="800"
           height="400">
  </amp-img>
</body>
```

## جعل الرسالة مستجيبة

يجري عرض رسائل البريد الإلكتروني على مجموعة متنوعة من الأجهزة وأحجام الشاشات، ومن ثم يتم تزويد AMP بنظام تخطيط مدمج! أصبح تنفيذ الرسائل الإلكترونية المستجيبة سهلا باستخدام نظام [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) واستعلامات الوسائط. لضبط حجم صورة القطة الصغيرة الموضوعة على الشاشات المناسبة، أضف سمة `layout="responsive"` إلى `<amp-image>` الخاص بك.

[tip type="read-on"] [اقرأ المزيد حول كيف يعمل AMP مع التخطيط واستعلامات الوسائط](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

قم بتكبير وتقليص إطار المتصفح لمشاهدة تغيير حجم الصورة! استعرض [قائمة المكونات الخاصة بالتخطيط المدعومة هنا](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout).

# تعديل المظهر والتخطيط

سارت الأمور على ما يرام مع صورة واحدة، ولكن ماذا لو كنا نريد عرض المزيد؟ يدعم AMP للبريد الإلكتروني عناصر التخطيط مثل خاصية الأكورديون والأشرطة الجانبية.

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

في هذا البرنامج التعليمي، سوف نستخدم [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md) لعرض صور القطط الجاهزة للاستعمال.

أضف النص البرمجي `amp-carousel` إلى رأس البريد الإلكتروني الخاص بك.

```html
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
```

ثم قم بطي الصور الأولى في علامة `<amp-carousel>`.

```html
<amp-carousel layout="responsive"
              width="800"
              height="400"
              type="slides">
        <amp-img layout="fill" src="https://placekitten.com/800/400"  alt="Welcome" height="400" width="800"></amp-img>
</amp-carousel>
```

قد تلاحظ عدم حدوث أي تغيير، وهذا شيء جيد! تم منح العرض الدور الخاص بنا سمة `type=slides`، والتي تعني أنه سيتم عرض صورة واحدة في المرة. ونظرًا لأننا وضعنا صورة واحدة داخل العلامات فهذا لا يعطي المستخدم أسهم التمرير.

الآن، استبدل صورة القطة الصغيرة الموضوعة بصور قطط AMP الخاصة بنا الجاهزة للاستخدام داخل `<amp-carousel>`.

```html
<amp-carousel id="carousel-with-preview"
    width="800"
    height="400"
    layout="responsive"
    type="slides"
    on="slideChange:AMP.setState({currentCat: event.index})">
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"  alt="photo courtesy of Unsplash"></amp-img>
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"  alt="photo courtesy of Unsplash"></amp-img>
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"  alt="photo courtesy of Unsplash"></amp-img>
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"  alt="photo courtesy of Unsplash"></amp-img>
 </amp-carousel>
```

يجب أن يكون بإمكانك الآن تغيير الصور بالنقر فوق أسهم التنقل في الجانب الأيمن أو الأيسر للعرض الدور!

## استعمال الأنماط في الإرسال

يسمح AMP بالأنماط في رأس المستند داخل علامة `<style amp-custom>`. بالإضافة إلى ذلك، أصبح من الممكن الآن استخدام فئات CSS المحظورة سابقًا والفئات الصورية. [اقرأ القائمة الكاملة هنا](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

هيا نقوم بتحديث `Hello, AMP4EMAIL world` إلى عنوان حقيقي.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

ثم أضف بعض الأنماط إلى الرأس.

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# إضافة إمكانات ديناميكية

تسمح الرسائل الإلكترونية بالمحتوى الثابت تقليديًا. لكن من خلال AMP، أصبحت الرسائل الإلكترونية مفتوحة على عالم جديد كلية من الإمكانات! يمكن للمستخدمين الآن الرد على [النماذج](/content/amp-dev/documentation/components/reference/amp-form.md)، والحصول على [قائمة ديناميكية بمحتوى محدث](/content/amp-dev/documentation/components/reference/amp-list.md)، والتفاعل مع المحتوى.

في هذا البرنامج التدريبي، سوف نستخدم [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md) لعرض اسم القطة المستعمل لدينا عندما يكون المستخدم في شريحة القطة هذه. ابدأ بتضمين النص البرمجي `amp-bind` في رأس البريد الإلكتروني الخاص بك.

```html
 <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
```

بعد ذلك، سوف نعلن متغير ربط AMP بالقيمة "myState" كسلسلة JSON داخل علامة [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state). ونظرًا لأن لدينا أربعة صور قطط، سوف نقوم بتضمين حالة للأربعة جميعًا.

```html
<body>
<amp-state id="myState">
  <script type="application/json">
    {
      "cats": [
         {
          "name": "Aakash",
          "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
        },
        {
          "name": "Filip",
          "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
        },
        {
          "name": "Julian",
          "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
        },
        {
          "name": "John",
          "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
        }
      ]
    }
  </script>
</amp-state>
```

تقوم [إجراءات وأحداث AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md) بتشغيل حالات مختلفة. في حالتنا، نريد تحديث الحالة عندما ينقر المستخدم فوق أسهم التنقل الخاصة بالعرض الدوار. يشغلamp-carousel حدث [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides)، والذي سنقوم خلاله بتحديث متغير `currentCat` باستخدام `AMP.setState`.

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel width="800"
              height="400"
              layout="responsive"
              type="slides"
              on="slideChange:AMP.setState({ currentCat: event.index} )">
  ...
</amp-carousel>
```

يعين هذا الرمز حالة `currentCat` لتطابق صورة القطة في فهرس العرض الدوار. لذا إذا كنا في الشريحة `event.index=2`، فسوف ترتبط الحالة بالعنصر في الفهرس 2 بالصفيف.

الشيء الوحيد المتبقي الآن هو عرض اسم القطة والأوصاف الخاصة بنا. أضف الرمز التالي تحت علامة `amp-carousel` الختامية.

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

يستخدم امتداد `amp-bind` [عبارات](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) و [ارتباطات](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings) لتغيير المحتوى ديناميكيًا. ويستخدم مثال الرمز أعلاه ربط the `[text]` لتحديث النص داخل علامة `<span>` في كل مرة تتغير فيها الحالة من خلال تقييم عبارة `"myState.cats[currentCat].name"`.

[tip type="note"] لتحسين الأداء وتجنب مخاطر ظهور محتوى غير متوقع، فإن amp-bind لا يقوم بتقييم العبارات أثناء تحميل الصفحة. هذا يعني أنه يجب إعطاء العناصر المرئية حالة افتراضية وألا تعتمد على amp-bind للعرض الأولي. [/tip]

لا تنسى إضافة أوصاف القطة الخاصة بنا بعد علامة `</div>`!

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

الآن، عندما تقوم بتغيير صورة القطة في العرض الدوار، يجب أن يتم تحديث الاسم والأوصاف الخاصة بها أيضًا.

# إرسال رسالة AMP الإلكترونية الخاصة بك

لتعلم كيفية إرسال رسالة إلكترونية إلى صندوق الوارد الخاص بك، [اقرأ المزيد حول اختبار رسائل AMP الإلكترونية](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

تهانينا! لقد أرسلت أول رسالة AMP إلكترونية خاصة بك!

لمعرفة الخطوات التالية، [اقرأ المزيد حول أسس AMP للبريد الإلكتروني](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md).
