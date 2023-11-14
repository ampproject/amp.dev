---
$title: amp-animation
$category@: presentation
formats:
  - websites
  - ads
teaser:
  text: Defines and displays an animation.
---


<!--
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



يحدد المكّوِن الحركات ويشغّلها.

<table>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-animation" src="https://ampjs.org/v0/amp-animation-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">التنسيقات المعتمدة</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>أمثلة</strong></td>
    <td><a href="https://github.com/ampproject/amphtml/blob/main/examples/animations.amp.html">animations.amp.html</a></td>
  </tr>
</table>

[جدول المحتويات]

## نظرة عامة <a name="overview"></a>

تعتمد "حركات AMP" على [واجهة برمجة تطبيقات Web Animations](https://www.w3.org/TR/web-animations/) لتحديد الحركات وتشغيلها في مستندات AMP.

## التنسيق <a name="format"></a>

يحدد عنصر `amp-animation` الحركة كبنية JSON.

### مواصفات حركات المستوى الأعلى <a name="top-level-animation-specification"></a>

يحدد كائن المستوى الأعلى عملية الحركة الكلية التي تتكون من عدد عشوائي من مكونات الحركة التي يتم تحديدها كمصفوفة `animations`:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  // Timing properties
  ...
  "animations": [
    {
      // Animation 1
    },
    ...
    {
      // Animation N
    }
  ]
}
</script>
```

### الوضع في DOM <a name="placement-in-dom"></a>

يُسمح بوضع المكّوِن `<amp-animation>` فقط كعنصر ثانوي مباشر للعنصر `<body>` إذا كانت السمة `trigger="visibility"`. إذا لم يتم تحديد `trigger` وتم التحكم في تشغيل الحركة برمجيًا من خلال إجراءاتها، يمكن عندها وضع المكوِّن في أي مكان في DOM.

### مكوِّن الحركة <a name="animation-component"></a>

كل مكوِّن من مكونات الحركة عبارة عن تأثير إطارات رئيسية[](https://www.w3.org/TR/web-animations/#dom-keyframeeffect-keyframeeffect) يتألف من:

  - العناصر الهدف المُشَار إليها بواسطة محدد
  - الشروط: الاستعلام عن الوسائط والشرط supports
  - خصائص التوقيت
  - الإطارات الرئيسية

```text
{
  "selector": "#target-id",
  // Conditions
  // Variables
  // Timing properties
  // Subtargets
  ...
  "keyframes": []
}
```

### الشروط <a name="conditions"></a>

يمكن أن تحدد الشروط ما إذا سيتم تضمين مكون الحركة في الحركة النهائية أو لا.

#### الاستعلام عن الوسائط <a name="media-query"></a>

يمكن تحديد الاستعلام عن الوسائط باستخدام الخاصية `media`. يمكن أن تحتوي هذه الخاصية على أي تعبير مسموح به لواجهة برمجة تطبيقات
[Window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) ويتوافق مع قاعدة `@media` في CSS.

إذا تم تحديد قيمة لأحد مكونات الحركة، لن يتم تضمين المكوِّن إلا إذا تطابق الاستعلام عن الوسائط مع البيئة الحالية.

#### الشرط Supports <a name="supports-condition"></a>

يمكن تحديد الشرط Supports باستخدام الخاصية `supports`. يمكن أن تحتوي هذه الخاصية على أي تعبير مسموح به لواجهة برمجة تطبيقات
[CSS.supports](https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports) ويتوافق مع قاعدة `@supports` في CSS.

إذا تم تحديد قيمة لأحد مكونات الحركة، لن يتم تضمين المكوِّن إلا إذا تطابق الشرط supports مع البيئة الحالية.

### عبارة الحركة ` switch` <a name="animation-switch-statement"></a>

في بعض الحالات، يكون من المريح الجمع بين عدة [حركات شرطية](#conditions) في حركة واحدة، مع تعيين إحداها لتكون الحركة التلقائية الاختيارية. يمكن تحقيق ذلك باستخدام عبارة الحركة `switch` بالتنسيق التالي:

```
{
  {
    // Optional selector, vars, timing
    ...
    "switch": [
      {
        "media": "(min-width: 320px)",
        "keyframes": {...},
      },
      {
        "supports": "offset-distance: 0",
        "keyframes": {...},
      },
      {
        // Optional default: no conditionals
      }
    ]
  }
```

في الحركة `switch`، يتم تقييم الحركات المرشحة بالترتيب المحدد، ويتم تنفيذ أول حركة تتطابق مع [العبارات الشرطية](#conditions) وتجاهل البقية.

على سبيل المثال، تشغِّل هذه الحركة حركة motion-path إذا كانت متاحة، وترجع إلى التحويل:
```
{
  "selector": "#target1",
  "duration": "1s",
  "switch": [
    {
      "supports": "offset-distance: 0",
      "keyframes": {
        "offsetDistance": [0, '300px']
      }
    },
    {
      "keyframes": {
        "transform": [0, '300px']
      }
    }
  ]
}
```

### المتغيرات <a name="variables"></a>

يمكن لمكوِّن الحركة أن يعلن عن متغيرات CSS التي سيتم استخدامها لقيم التوقيت والإطارات الرئيسية من خلال التعبيرات `var()`. ويتم تقييم التعبيرات `var()` باستخدام السياق الهدف الحالي. يتم نشر متغيرات CSS المحددة في مكونات الحركة إلى حركات مدمجة، ويتم تطبيقها على أهداف الحركة وبالتالي تُلغي CSS المستخدَمة في الحركات النهائية.

على سبيل المثال:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "--delay": "0.5s",
  "--x": "100px",
  "animations": [
    {
      "selector": "#target1",
      "delay": "var(--delay)",
      "--x": "150px",
      "keyframes": {"transform": "translate(var(--x), var(--y, 0px)"}
    },
    ...
  ]
}
</script>
</amp-animation>
```

في هذا المثال:

- يتم نشر `--delay` في الحركات المدمجة وتستخدَم كوقت فاصل للحركة `#target1`.
- يتم نشر `--x` في الحركات المدمجة ولكن ألغتها الحركة `#target1` وتم استخدامها لاحقًا للخاصية `transform`.
- لم يتم تحديد `--y` في أي مكان في `<amp-animation>` وبالتالي سيتم الاستعلام عنه في العنصر `#target1`. ويتم تلقائيًا تعيين القيمة `0px` في حال عدم تحديده في CSS أيضًا.

راجع قسم [`var()` و`calc()`](#var-and-calc-expressions) للحصول على المزيد من المعلومات عن `var()`.

### خصائص التوقيت <a name="timing-properties"></a>

قد تحتوي مكونات حركة المستوى الأعلى ومكونات الحركة على خصائص التوقيت. يتم تعريف هذه الخصائص بالتفصيل في
[AnimationEffectTimingProperties](https://www.w3.org/TR/web-animations/#dictdef-animationeffecttimingproperties) من مواصفات Web Animation. وتتضمن مجموعة الخصائص المسموح بها هنا:

<table>
  <tr>
    <th class="col-twenty">الخاصية</th>
    <th class="col-twenty">النوع</th>
    <th class="col-twenty">القيمة التلقائية</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td>وقت</td>
    <td>0</td>
    <td>تمثل الخاصية مدة الحركة. وإما أن تكون قيمة رقمية بالملي ثانية أو قيمة وقت CSS، مثل `2s`.</td>
  </tr>
  <tr>
    <td><code>delay</code></td>
    <td>وقت</td>
    <td>0</td>
    <td>تمثل الوقت الفاصل قبل بدء تنفيذ الحركة. وإما أن تكون قيمة رقمية بالملي ثانية أو قيمة وقت CSS، مثل `2s`.</td>
  </tr>
  <tr>
    <td><code>endDelay</code></td>
    <td>وقت</td>
    <td>0</td>
    <td>تمثل الوقت الفاصل بعد اكتمال الحركة وقبل اعتبارها مكتملة فعليًا. وإما أن تكون قيمة رقمية بالملي ثانية أو قيمة وقت CSS، مثل `2s`.</td>
  </tr>
  <tr>
    <td><code>iterations</code></td>
    <td>رقم أو<br>"Infinity" أو<br>"infinite"</td>
    <td>1</td>
    <td>عدد مرات تكرار تأثير الحركة.</td>
  </tr>
  <tr>
    <td><code>iterationStart</code></td>
    <td>رقم/CSS</td>
    <td>0</td>
    <td>معادلة الوقت التي يبدأ فيها تأثير الحركة.</td>
  </tr>
  <tr>
    <td><code>easing</code></td>
    <td>سلسلة</td>
    <td>"linear"</td>
    <td><a href="https://www.w3.org/TR/web-animations/#timing-function">دالة التوقيت</a> التي تستخدَم لقياس الوقت لتغيير سرعة التأثيرات.</td>
  </tr>
  <tr>
    <td><code>direction</code></td>
    <td>سلسلة</td>
    <td>"normal" </td>
    <td>إحدى القيم "normal" أو "reverse" أو "alternate" أو "alternate-reverse".</td>
  </tr>
  <tr>
    <td><code>fill</code></td>
    <td>سلسلة</td>
    <td>"none"</td>
    <td>إحدى القيم "none" أو "forwards" أو "backwards" أو "both" أو "auto".</td>
  </tr>
</table>

تسمح كل خصائص التوقيت إما بقيم رقمية/سلسلة مباشرة أو قيم CSS. يمكن مثلاً تحديد "duration" بالقيمة `1000` أو `1s` أو `1000ms`. بالإضافة إلى ذلك، يُسمح أيضًا باستخدام `calc()` و`var()` وتعبيرات CSS الأخرى.

مثال لخصائص التوقيت بالترميز JSON:
```text
{
  ...
  "duration": "1s",
  "delay": 100,
  "endDelay": "var(--end-delay, 10ms)",
  "easing": "ease-in",
  "fill": "both"
  ...
}
```

تكتسب مكونات الحركة خصائص التوقيت المحددة لحركة المستوى الأعلى.

### الأهداف الفرعية <a name="subtargets"></a>

متى توفرت إمكانية تحديد `selector`، فمن الممكن أيضًا تحديد `subtargets: []`. يمكن أن تلغي الأهداف الفرعية خصائص التوقيت أو المتغيرات المحددة في الحركة لأهداف فرعية معينة وموضّحة إما من خلال فهرس أو محدد CSS.

على سبيل المثال:
```text
{
  "selector": ".target",
  "delay": 100,
  "--y": "100px",
  "subtargets": [
    {
      "index": 0,
      "delay": 200,
    },
    {
      "selector": ":nth-child(2n+1)",
      "--y": "200px"
    }
  ]
}
```

في هذا المثال، تم تلقائيًا تعيين الوقت الفاصل لجميع الأهداف المطابقة لـ ".target" بقيمة 100ms ولـ "- y" بقيمة 100px. ومع ذلك، يتم إلغاء الهدف الأول (`index: 0`) ليكون الوقت الفاصل 200ms بينما تم إلغاء الأهداف الفردية لتكون "--y" بقيمة 200px.

لاحظ إمكانية تطابق عدة أهداف فرعية مع عنصر هدف واحد.

### الإطارات الرئيسية <a name="keyframes"></a>

يمكن تحديد الإطارات الرئيسية بعدة طرق موضحة في [قسم الإطارات الرئيسية](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument) من مواصفات Web Animations أو كسلسلة تشير إلى اسم `@keyframes` في CSS.

في ما يلي بعض الأمثلة المعتادة لتعريفات الإطارات الرئيسية.

يحدد تنسيق "to" لشكل الكائن المختزَل الحالة النهائية على 100%:
```text
{
  "keyframes": {"opacity": 0, "transform": "scale(2)"}
}
```

يحدد التنسيق "from-to" لشكل الكائن المختزَل حالتي البداية والنهاية على 0 و100%:
```text
{
  "keyframes": {
    "opacity": [1, 0],
    "transform": ["scale(1)", "scale(2)"]
  }
}
```

يحدد التنسيق "value-array" لشكل الكائن المختزَل عدة قيم لحالتي البداية والنهاية وعدة معادلات (متساوية التباعد):
```text
{
  "keyframes": {
    "opacity": [1, 0.1, 0],
    "transform": ["scale(1)", "scale(1.1)", "scale(2)"]
  }
}
```

يحدد شكل المصفوفة الإطارات الرئيسية. ويتم تعيين المعادلات تلقائيًا على 0 و100% مع التوزيع بين القيمتين بتباعد متساوٍ:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
    {"opacity": 0, "transform": "scale(2)"}
  ]
}
```

يمكن أن يتضمن شكل المصفوفة أيضًا "المعادلة" بشكل صريح:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
    {"offset": 0.1, "opacity": 0.1, "transform": "scale(2)"},
    {"opacity": 0, "transform": "scale(3)"}
  ]
}
```

يمكن أيضًا أن يتضمن شكل المصفوفة "تغيير السرعة":
```text
{
  "keyframes": [
    {"easing": "ease-out", "opacity": 1, "transform": "scale(1)"},
    {"opacity": 0, "transform": "scale(2)"}
  ]
}
```

للحصول على مزيد من التنسيقات الإضافية للإطارات الرئيسية، راجع [مواصفات Web Animations](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument).

تسمح قيم الخاصية بأي قيم CSS صالحة، بما في ذلك `calc()` و`var()` وغيرها من تعبيرات CSS.

#### الإطارات الرئيسية من CSS <a name="keyframes-from-css"></a>

توجد طريقة أخرى لتحديد الإطارات الرئيسية كقاعدة في ورقة أنماط المستند (العلامة `<style>`) كقاعدة `@keyframes` في CSS. على سبيل المثال:
```html
<style amp-custom>
  @keyframes keyframes1 {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<amp-animation layout="nodisplay">
<script type="application/json">
{
  "duration": "1s",
  "keyframes": "keyframes1"
}
</script>
</amp-animation>
```

إطارات CSS `@keyframes` مساوية تقريبًا لتضمين تعريف الإطارات الرئيسية في JSON وفقًا [لمواصفات Web Animations](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument). ومع ذلك، هناك بعض الفروق

 - للحصول على الدعم على مستوى المنصة، قد يلزم توفير بادئات الموردين، مثل `@-ms-keyframes {}`، أو قد يلزم توفير `-moz-transform`. لا حاجة إلى بادئات الموردين ولا يُسمح بها في التنسيق JSON، ولكنها قد تكون ضرورية في CSS.
- لن تتمكن المنصات التي لا تتيح `calc()` و`var()` من الاستفادة من تعويضات `amp-animation` عند تحديد الإطارات الرئيسية في CSS. ننصح دائمًا بتضمين قيم احتياطية في CSS.
- يتعذر استخدام إضافات CSS، مثل [`width()` و`height()` و`num()` و`rand()` و`index()` و`length()`](#css-extensions) في CSS.

#### الخصائص المدرجة في القائمة البيضاء للإطارات الرئيسية <a name="allow-listed-properties-for-keyframes"></a>

لا يمكن استخدام جميع خصائص CSS في الإطارات الرئيسية. وحدها خصائص CSS التي يمكن للمتصفحات الحديثة تحسينها وتحريكها بسرعة مدرَجة في القائمة البيضاء. وستزيد هذه القائمة كلما أكدت خصائص إضافية أنها توفر أداء جيدًا. تحتوي القائمة الحالية على:
- [`opacity`](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)
- [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)
- [`offset-distance`](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance)

لاحظ أن استخدام خصائص CSS المبدوءة بالموردين ليست ضرورية أو مسموحًا بها.

### الأشكال المختصرة لتهيئة الحركات <a name="abbreviated-forms-of-animation-configuration"></a>

إذا تضمنت الحركة عنصرًا واحدًا وكان تأثير واحد للإطارات الرئيسية كافيًا، يمكن اختصار التهيئة على مكّوِن الحركة هذا فقط. على سبيل المثال:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "selector": "#target-id",
  "duration": "1s",
  "keyframes": {"opacity": 1}
}
</script>
</amp-animation>
```

إذا كانت الحركة تتألف من قائمة مكونات، ولكن لا تحتوي على حركة المستوى الأعلى، يمكن اختصار التهيئة إلى مصفوفة من المكونات. على سبيل المثال:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": 1000,
    "keyframes": {"opacity": 1}
  },
  {
    "selector": ".target-class",
    "duration": 600,
    "delay": 400,
    "keyframes": {"transform": "scale(2)"}
  }
]
</script>
</amp-animation>
```

### إنشاء الحركة <a name="animation-composition"></a>

يمكن أن تشير الحركات إلى حركات أخرى، وبالتالي فهي تجمع بين عدة إعلانات للمكّوِن `amp-animation` في حركة نهائية واحدة. إن الإشارة إلى حركة من حركة أخرى تساوي تقريبًا عملية الدمج. يكمن سبب تقسيم الحركة إلى عناصر مختلفة في إعادة استخدام الحركة نفسها من عدة أماكن أو تصغير إعلان كل حركة وزيادة إمكانية إدارتها.

على سبيل المثال:
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

تضم الحركة التي في المثال الحركة "anim2" كجزء من "anim1". ويتم تضمين "anim2" بدون هدف (`selector`). في هذه الحالة، من المتوقع أن تشير الحركة المضمنَّة إلى هدفها الخاص.

يتيح نموذج آخر تضمين الحركة لتوفير الهدف أو أهداف متعددة. في هذه الحالة، يتم تنفيذ الحركة المضمنَّة لكل هدف مطابق. على سبيل المثال:
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

هنا، عندما يتطابق ".target-class" مع عنصر واحد أو عدة عناصر أو لا يحدث تطابق، يتم تنفيذ "anim2" لكل هدف مطابق.

يتم تمرير المتغيرات وخصائص التوقيت المحددة في حركة الطلب إلى الحركة المضمنَّة أيضًا.

### تعبيرات `var()` و`calc()` <a name="var-and-calc-expressions"></a>

يتيح `amp-animation` استخدام تعبيرات `var()` و`calc()` لقيم التوقيت والإطارات الرئيسية.

على سبيل المثال:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": "4s",
    "delay": "var(--delay)",
    "--y": "var(--other-y, 100px)",
    "keyframes": {"transform": "translate(calc(100vh + 20px), var(--y))"}
  }
]
</script>
</amp-animation>
```

يتم تعويض كل من `var()` و`calc()` في المنصات التي لا تتيحهما بشكل مباشر. يتم استخراج الخصائص `var()` من العناصر الهدف المقابلة. ومع ذلك، يتعذر للأسف تعويض `var()` بشكل كامل. وبالتالي، عندما يكون التوافق مهمًا، ننصح بشدة بتضمين القيم التلقائية في تعبيرات `var()`. على سبيل المثال:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": "4s",
    "delay": "var(--delay, 100ms)",
  }
]
</script>
</amp-animation>
```

يمكن لمكونات الحركة تحديد متغيراتها الخاصة، مثل حقول `--var-name`. يتم نشر هذه المتغيرات في الحركات المدمجة وتلغي متغيرات العناصر الهدف المحددة من خلال ورقة الأنماط (العلامة `<style>`). تحاول تعبيرات `var()` أولاً حل قيم المتغيرات المحددة في الحركات ثم تستعلم عن أنماط الهدف.

### إضافات CSS <a name="css-extensions"></a>

يوفر `amp-animation` إضافات CSS متعددة لتلبية احتياجات الحركات المعتادة: `rand()` و`num()` و`width()` و`height()`. يمكن استخدام هذه الدوال متى أمكن استخدام قيم CSS ضمن `amp-animation`، بما في ذلك قيم التوقيت والإطارات الرئيسية.

#### الإضافة `index()` من CSS <a name="css-index-extension"></a>

تعرض الدالة `index()` فهرس العنصر الهدف الحالي في تأثير الحركة. تكون الإضافة أكثر ملاءمة عندما يتم تحريك أهداف متعددة بنفس التأثير باستخدام الخاصية `selector`. سيكون لأول هدف يتطابق مع المحدد الفهرس `0`، وسيكون فهرس الثاني `1` وهكذا.

بالإضافة إلى الميزات الأخرى، يمكن ضم هذه الخاصية مع تعبيرات `calc()` واستخدامها لإنشاء تأثير مرحلي. على سبيل المثال:
```
{
  "selector": ".class-x",
  "delay": "calc(200ms * index())"
}
```

#### الإضافة `length()` من CSS <a name="css-length-extension"></a>

تعرض الدالة `length()` عدد العناصر الهدف في تأثير الحركة. وتكون هذه الإضافة أكثر صلة عند اقترانها بالإضافة `index()`:

```
{
  "selector": ".class-x",
  "delay": "calc(200ms * (length() - index()))"
}
```

#### الإضافة `rand()` من CSS <a name="css-rand-extension"></a>

تعرض الدالة `rand()` قيمة CSS عشوائية ولها شكلان.

شكل بدون وسيطات يعرض الرقم العشوائي من 0 و1.
```
{
delay: "calc(10s * rand())"
}
```

الشكل الثاني يحتوي على وسيطتين ويعرض القيمة العشوائية بين هاتين الوسيطتين.
```
{
  "delay": "rand(5s, 10s)"
}
```

#### الإضافات `width()` و`height()` من CSS <a name="css-width-and-height-extensions"></a>

تعرض إضافتَا `width()` و`height()` عرض/ارتفاع العنصر المتحرك أو العنصر المعيَّن بالمحدد. تكون القيمة المعروضة بالبكسل، مثل `100px`.

الأشكال التالية متاحة:
- `width()` و`height()` - عرض/ارتفاع العنصر المتحرك.
- `width('.selector')` و`height('.selector')` - عرض/ارتفاع العنصر المعيَّن بالمحدد. يمكن استخدام أي محدد CSS مثل `width('#container &gt; li')`.
- `width(closest('.selector'))` و`height(closest('.selector'))` - عرض/ارتفاع العنصر المعيَّن بأقرب محدد.

الإضافتان `width()` و`height()` مفيدتان بشكل خاص للتحويلات. خصائص `left` و`top` وخصائص CSS المشابهة يمكنها استخدام قيم `%` للتعبير عن الحركات نسبة حجم الحاوية. ومع ذلك، تفهم الخاصية `transform` قيم `%` بشكل مختلف، فهي تفهمها كنسبة مئوية من العنصر المحدد. وبالتالي، يمكن استخدام `width()` و`height()` للتعبير عن حركات التحويل من حيث عناصر الحاوية وما شابهها.

يمكن دمج هذه الدالات مع تعبيرات `calc()` و`var()` وغيرها من تعبيرات CSS. على سبيل المثال:
```
{
  "transform": "translateX(calc(width('#container') + 10px))"
}
```

#### الإضافة `num()` من CSS <a name="css-num-extension"></a>

تعرض الدالة `num()` تمثيلاً رقميًا لقيمة CSS. على سبيل المثال:
- `num(11px)` yields `11`;
- `num(110ms)` yields `110`;
- etc.

على سبيل المثال، يحسب التعبير التالي الوقت الفاصل بالثواني نسبة إلى عرض العنصر:
```
{
  "delay": "calc(1s * num(width()) / 100)"
}
```

### صور SVG المتحركة <a name="svg-animations"></a>

صور SVG المتحركة رائعة ونحن بالتأكيد ننصح باستخدامها في الحركات.

تتم إتاحة صور SVG المتحركة عبر نفس خصائص CSS الموضحة في [الخصائص المدرجة في القائمة البيضاء للإطارات الرئيسية](#allow-listed-properties-for-keyframes) مع بعض الفروق الدقيقة:

* عناصر IE/Edge SVG [لا تتيح خصائص `transform` من CSS](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/1173754/). يتم تعويض الحركة `transform` نفسها. ومع ذلك، لا يتم تطبيق الحالة الأولية المحددة في ورقة الأنماط. إذا كانت الحالة الأولية المحوّلة مهمة على IE/Edge، يُنصح بتكرارها عبر [ السمة SVG`transform`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform).
* في حين يتم تعويض CSS `transform` لـ IE/Edge، فمن المستحيل لسوء الحظ تعويض الخاصية `transform-origin`. وبالتالي، عندما يكون التوافق مع IE/Edge مطلوبًا، يُنصح باستخدام `transform-origin` التلقائية فقط.
* تواجه معظم المتصفحات حاليًا مشاكل في فهم CSS `transform-origin` بشكل صحيح. اطّلِع على مشاكل [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=740300) و[Safari](https://bugs.webkit.org/show_bug.cgi?id=174285) و[Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1379340). ويُفترَض حل غالبية هذا الالتباس بمجرد تنفيذ [CSS `transform-box`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box). عندما تكون `transform-origin` مهمة، يُنصَح أيضًا بتضمين `transform-box` CSS المطلوبة حفاظًا على التوافق في المستقبل.

## تشغيل الحركة <a name="triggering-animation"></a>

يمكن تشغيل الحركة عبر السمة `trigger` أو الإجراء `on`.

### السمة `trigger` <a name="trigger-attribute"></a>

القيمة `visibility` هي القيمة الوحيدة المتاحة حاليًا للسمة `trigger`. يتم تشغيل `visibility` عندما يكون المستند أو التضمين الأساسي مرئيًا (في إطار العرض).

على سبيل المثال:
```html
<amp-animation id="anim1" layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

### التشغيل عبر الإجراء `on` <a name="triggering-via-on-action"></a>

على سبيل المثال:

```html
<amp-animation id="anim1" layout="nodisplay">
  ...
</amp-animation>
<button on="tap:anim1.start">Animate</button>
```

## الإجراء `on` <a name="on-actions"></a>

يصدِّر العنصر `amp-animation` الإجراءات التالية:

* `start` - لبدء الحركة التي لم تبدأ ويمكن تحديد خصائص التوقيت والمتغيرات كوسيطات للإجراء. مثال: `anim1.start(delay=-100, --scale=2)`
* `restart` - لبدء الحركة أو إعادة تشغيل حركة العاملة حاليًا ويمكن تحديد خصائص التوقيت والمتغيرات كوسيطات للإجراء. مثال: `anim1.start(delay=-100, --scale=2)`
* `pause` - لإيقاف الحركة العاملة حاليًا
* `resume` - لاستئناف الحركة العاملة حاليًا
* `togglePause` - للتبديل بين إجراء الإيقاف المؤقت وإجراء الاستئناف
* `seekTo` - لإيقاف الحركة مؤقتًا والانتقال إلى النقطة الزمنية المحددة في الوسيطة `time` بالملي ثانية أو الوسيطة `percent` كنقطة مئوية في المخطط الزمني
* `reverse` - لعكس الحركة
* `finish` - لإنهاء الحركة
* `cancel` - لإلغاء الحركة
