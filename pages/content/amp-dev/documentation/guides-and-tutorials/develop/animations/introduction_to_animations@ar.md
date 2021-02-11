---
'$title': مقدمة إلى الرسوم المتحركة المركَّبة
$order: 2
description: توفر AMP للرسوم المتحركة التي لا يمكن إدارتها من خلال إضافة فئات أو إزالتها، العديد من المكونات المحددة للرسوم المتحركة. إذ تطبق هذه المكونات مبادئ AMP على الرسوم المتحركة ...
formats:
  - websites
  - ads
author: CrystalOnScript
---

توفر AMP للرسوم المتحركة التي لا يمكن إدارتها من خلال [إضافة فئات أو إزالتها](triggering_css_animations.md)، العديد من المكونات المحددة للرسوم المتحركة. إذ تطبق هذه المكونات مبادئ AMP على الرسوم المتحركة: حيث إنها تتميز بالسرعة والكفاءة وتجعل المستخدم أولوية لها. فيما تقيد AMP خصائص CSS المسموح بها اخل الإطارات الرئيسية، لكنها تضمن فوائد من التحكم التفصيلي والرسوم المتحركة السلسة والتوافق عبر المتصفحات من دون عمل إضافي.

استخدم amp-animation إذا كنت تريد التحكم في التشغيل بدقة، فضلًا عن تحديد توقيت دقيق مع عناصر متعددة تتحرك في الوقت نفسه.

## إنشاء رسوم AMP متحركة أساسية

يمكِّن المكون [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) استخدام [واجهة برمجة تطبيقات الرسوم المتحركة للويب](https://www.w3.org/TR/web-animations/) في AMP.

ويكون [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) الأساسي عبارة عن كائن JSON مكوَّن من الأجزاء الأساسية التالية:

- العنصر الذي يحركه المكون، أو `selector`.
- [خصائص التوقيت](/content/amp-dev/documentation/components/reference/amp-animation.md#timing-properties)
- [إطارات أساسية](/content/amp-dev/documentation/components/reference/amp-animation.md#keyframes)
- <a>المشغِّل</a>

```
<amp-animation layout="nodisplay" id="exampleAnimation">
<script type="application/json">
{
 "selector": "#elementID", //select the element to animate
 "duration": "1s", //timing property
 "iterations": 2, //timing property
 "fill": "both", //timing property
 "keyframes": {"opacity": 0, "transform": "scale(2)"} //keyframes
}
</script>
</amp-animation>
<!-- trigger -->
<button on="tap:exampleAnimation.start">
```

### المحدد

مثل CSS، يربط المكون [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) خصائص الرسوم المتحركة بالعنصر من خلال الإعلان عن اسم علامة العنصر ومعرِّفه في حقل `"selector"`. ويقوم المكون بتحريك كل عنصر بنوع العلامة أو اسم الفئة المعلن. لذا استخدم معرَِفًا لضمان تحريك عنصر مفرد.

### {a0}Timing Properties{/a0}

تتحكم [خصائص التوقيت](/content/amp-dev/documentation/components/reference/amp-animation.md#timing-properties) في المدة التي تستغرقها الرسوم المتحركة، ومقدار وقت التشغيل، واتجاه تنفيذ الإطارات الأساسية.

ولا يتطلب وجود خصائص توقيت، لكن قد لا تعمل الرسوم المتحركة إذا كانت الخصائص المتعلقة بالوقت والعرض مفقودة، مثل `duration` و`fill`.

### {a0}Keyframes{/a0}

بينما تتيح لك CSS بالتحويل من حالة لأخرى عبر الانتقالات، عليك الإعلان عن خصائص الرسوم المتحركة على أنها إطارات رئيسية لتنفيذ [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes) قابلة للاستخدام لخصائص وحدة معالجة الرسوميات المسرَّعة والتي لا تتسبب في إعادة التخطيط ويمكنها التحرك في [مؤشر ترابط مصفف](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture). وهذا يمنع الرسوم المتحركة من التداخل مع AMP [وعملية عرض](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing) المتصفح.

[tip type="note"] يتم تحديد الإطارات الرئيسية إما مباشرة في [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md#keyframes). [/tip]

### {a0}Trigger{/a0}

يبدأ المشغِّل تسلسل الرسوم المتحركة، فيما يبدأ امتداد [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) عندما يصبح `<body>` مرئيًا على الصفحة أو من خلال توصيله [بإجراء أو حدث AMP](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)

ويُعد التشغيل عند عرض `<body>` أمرًا مفيدًا عند وجوب تشغيل الرسوم المتحركة بمجرد تحميل لأنها تظهر "أعلى الطية" أو "داخل نقطة الرؤية الأولى من الصفحة. فيما يتم تشغيل الرسوم المتحركة خلال العرض عن طريق إضافة `trigger="visibility"` على أنها سمة للمكون.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

وتتصل الرسوم المتحركة بإجراء أو حدث من خلال تعيين المكون [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) لـ `id` وربط هذا `id` بمشغِّل الحدث المرغوب مثل النقر فوق زر.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## بناء رسوم متحركة مركَّبة

يتيح بناء رسوم متحركة في [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) بالتحكم الدقيق الذي يتخطى مجرد بدء الرسوم المتحركة وإيقافه؛ كما يمكن أيضًا إيقافه مؤقتًا وعكسه وتوجيهه إلى نقطة معينة. ويمكنك حتى تجميع العديد من الرسوم المتحركة معًا وتحريك العناصر في تسلسل.

### الأهداف الفرعية

يمكن أن تتضمن عناصر العلامة أو الفئة نفسها خصائص توقيت محددة وتتجاوز قيم المتغيرات المحددة في الرسوم المتحركة ذات المستوى الأعلى.

[example preview="top-frame" playground="true" imports="amp-animation"]

```html
<body>
  <h1>Hello World!</h1>
  <h1>Hello World!</h1>
  <h1 id="helloMe">Hello World!</h1>
  <h1>Hello World!</h1>
  <amp-animation layout="nodisplay" id="animateThis">
    <script type="application/json">
      {
        "selector": "h1",
        "duration": "3s",
        "fill": "both",
        "keyframes": [
          {"transform": "translateX(0px)"},
          {"transform": "translateX(50%)"}
        ],
        "subtargets": [
          {
            "index": 1,
            "duration": "1s"
          },
          {
            "selector": "#helloMe",
            "direction": "reverse",
            "duration": "5s"
          }
        ]
      }
    </script>
  </amp-animation>
  <button on="tap:animateThis.start">start</button>
</body>
```

[/example]

### الرسوم المتحركة المتسلسلة

يمكن أن تتصل رسوم متحركة متعددة معًا لتشكيل تسلسل كبير. إذ يمكنك إنشاء تأثيرات موقوتة مثل التراكبات في مقاطع الفيديو من خلال كتابة الرسوم المتحركة في صفيفة `animations` داخل المكون [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md).

```
<amp-animation id="overlaysAnim" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "3s",
      "fill": "both",
      "animations": [{
          "selector": ".one",
          "keyframes": [{
              "opacity": "1",
              "offset": 0
            },
            {
              "opacity": "1",
              "offset": 0.04
            },
            {
              "opacity": "0",
              "offset": 0.0401
            },
            {
              "opacity": "0",
              "offset": 1
            }
          ]
        },
      ]
    }
  </script>
</amp-animation>
```

حيث يقوم هذا الإعداد بتشغيل كل رسم متحرك لمدة 3 ثوانٍ بالتسلسل.

وبالنسبة للرسوم المتحركة الأكبر، تكون الرسوم المتحركة الموجودة داخل صفيفة `animations` قادرة على الإشارة إلى مكونات [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) أخرى.

```
<amp-animation id="addEnergy" layout="nodisplay">
  <script type="application/json">
  {
    "duration": "0.3s",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": "#energy",
        "keyframes": [
          {"transform": "scaleX(calc(num(width('#energy'))/10))"},
          {"transform": "scaleX(calc(num(width('#energy'))/10 + 3))"}
        ]
      },
      {
        "animation": "atomExcite"
      }
    ]
  }
  </script>
</amp-animation>


<amp-animation id="atomExcite" layout="nodisplay" trigger="visibility">
<script type="application/json">
  {
    "duration": "0.3s",
    "iterations": "2",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": ".atom",
        "keyframes": {
          "transform": "translate(20vw)"
        }
      }
    ]
  }
  </script>
</amp-animation>
```

### تحريك مقدار غير معروف من العناصر

يمكنك من خلال استخدام [تعبيرات`var(/content/amp-dev/documentation/components/reference/amp-animation.md#css-extensions) كتابة

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-animation"
    src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"
  ></script>
  <style amp-custom>
    .parent {
      perspective: 1000px;
      transform-style: preserve-3d;
      position: relative;
      margin: 10px;
      width: 239px;
      height: 335px;
    }
    .card {
      transform-origin: left;
      height: 50%;
      width: 50%;
    }
  </style>
</head>
<body>
  <amp-animation layout="nodisplay" id="cardAdmin">
    <script type="application/json">
      {
        "selector": ".card",
        "--duration": "2s",
        "duration": "var(--duration)",
        "delay": "calc((length() - index() - 1) * var(--duration))",
        "easing": "ease-in",
        "iterations": "1",
        "fill": "both",
        "keyframes": [
          {"transform": "translate3d(0px, 0px, 0px)"},
          {"transform": "translate3d(50%, 0px, 100px)"},
          {"transform": "translate3d(110%, 0px, 0px) rotateY(-20deg)"},
          {"transform": "translate3d(50%, 0px, -100px)"},
          {"transform": "translate3d(0px, 0px, -1px)"}
        ]
      }
    </script>
  </amp-animation>
  <div class="parent" on="tap:cardAdmin.start" tabindex="none" role="animation">
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg"
      layout="fill"
    ></amp-img>
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg"
      layout="fill"
    ></amp-img>
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg"
      layout="fill"
    ></amp-img>
  </div>
</body>
```

[/example]

- الإعلان عن متغير، `--duration`، حيث يوفر له قيمة ثانيتين.
- تعيين `duration` لقيمة المتغير `--duration`.
- حساب التأخير المطبق على كل عنصر مع ذلك الذي يستوفي `.card` المحدد.
  1. يقوم [إمتداد `length(/content/amp-dev/documentation/components/reference/amp-animation.md#css-length()-extension>) بحساب عدد عناصر `.card` تم تحديدها
  2. ثم يقوم الطول عندها بطرح كل `.card`'s [فهرس(/content/amp-dev/documentation/components/reference/amp-animation.md#css-index()-extension>)
  3. يتم ضرب قيمة الناتج في المتغير `--duration`
  4. يتم تطبيق الإجمالي النهائي في ثوانٍ على تأخير هذا العنصر
- يتم تطبيق الرسوم المتحركة على كل عنصر على حدة ليتسنى خلط البطاقات واحدة تلو الأخرى بدلًا عن الكل في الوقت نفسه.

افتح الرسوم المتحركة في ساحة AMP وأضف المزيد من عناصر [`amp-img`](../../../../documentation/components/reference/amp-img) لاختبار سلوكها.

### اظهر بمظهر رائع، في كل مكان

يمكن أن تتضمن الرسوم المتحركة [`conditions`](/content/amp-dev/documentation/components/reference/amp-animation.md#animation-switch-statement).

[example preview="top-frame" playground="true"]

```html
<head>
  <style amp-custom>
    .drop {
      width: 20px;
      height: 20px;
      background: blue;
      margin-top: 1em;
      border-radius: 50%;
    }
    .right {
      position: absolute;
      right: 0;
      background: red;
    }
  </style>
  <script
    async
    custom-element="amp-animation"
    src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"
  ></script>
</head>
<body>
  <amp-animation id="mediaAnimation" layout="nodisplay">
    <script type="application/json">
      {
        "duration": "1s",
        "iterations": "4",
        "fill": "both",
        "direction": "alternate",
        "animations": [
          {
            "media": "(min-width: 300px)",
            "selector": ".drop",
            "keyframes": {
              "transform": "translate(100vw)"
            }
          },
          {
            "media": "(max-width: 300px)",
            "selector": ".drop",
            "keyframes": {
              "transform": "translate(50vw)"
            }
          },
          {
            "media": "(min-width: 300px)",
            "selector": ".right",
            "keyframes": {
              "transform": "translate(-100vw)"
            }
          },
          {
            "media": "(max-width: 300px)",
            "selector": ".right",
            "keyframes": {
              "transform": "translate(-50vw)"
            }
          }
        ]
      }
    </script>
  </amp-animation>

  <div class="rain">
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
  </div>
  <button on="tap:mediaAnimation.start">Start</button>
</body>
```

[/example]
