---
'$title': تشغيل رسوم CSS المتحركة وانتقالاتها
$order: 1
description: تشغيل رسوم CSS المتحركة في الصفحات التي تعتمد على إضافة الفئات وإزالتها، والمكتملة عبر JavaScript. ويمكنك تحقيق السلوك نفسه في صفحات AMP من خلال استخدام إجراء toggleClass ...
formats:
  - websites
  - ads
---

تمكِّن رسوم CSS المتحركة عناصر الويب من الانتقال من تكوين نمط CSS إلى آخر. ويمكن للمتصفح البدء في تحديد الرسوم المتحركة عند التنزيل، لكن الحدث الذي قام بتشغيل رسوم CSS المتحركة [يعتمد على إضافة الفئات وإزالتها](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations). فيما يدعم AMP نوعي الرسوم المتحركة كليهما.

استخدم CSS عندما يكون لديك رسوم متحركة أصغر ومضمَّنة لا تحتاج توقيتًا محددًا بدقة.

## تحديد CSS والإطارات الرئيسية

يمكنك تحديد CSS في AMP عبر طرق التالية:

[filter formats="websites, stories"]

- ضمن العلامة `<style amp-custom>` داخل رأس المستند. حد يبلغ 75000 بايت.
- أنماط مضمنة، يحتوي كل مثيل من مثيلات النمط المضمن على حد يبلغ 1000 بايت. تحسب الأنماط المضمنة نحو حد يبلغ 75000 بايت `<style amp-custom>`.
- ضمن العلامة `<style amp-keyframes>` داخل رأس المستند. حد يبلغ 500000 بايت. مقتصر على خصائص الإطار الرئيسي.

[/filter]

[filter formats="ads"]

- ضمن العلامة `<style amp-custom>` داخل رأس المستند. حد يبلغ 20,000 بايت.
- أنماط مضمنة، يحتوي كل مثيل من مثيلات النمط المضمن على حد يبلغ 1000 بايت. تحسب الأنماط المضمنة نحو حد يبلغ 20000 بايت `<style amp-custom>`.
- ضمن العلامة `<style amp-keyframes>` داخل رأس المستند. حد يبلغ 500000 بايت. مقتصر على خصائص الإطار الرئيسي.

[/filter]

[tip type="read-on"] اقرأ المزيد في [النمط والتخطيط](../style_and_layout/index.md) حول استخدام CSS في AMP. [/tip]

[filter formats="websites, stories"] للحفاظ على صفحاتك سريعة وخفيفة، فرضت AMP حد CSS قدره 75000 بايت في العلامة `<amp style-custom>`. بينما يمكنك استخدام هذا لتحديد أنماط الرسوم المتحركة، حيث يسمح حد 500000 داخل العلامة `<amp style-keyframes>` بمزيد من الرسوم المتحركة التي لن تستهلك موارد نمط الموقع الثمينة. [/filter]

[filter formats="ads"] للحفاظ على إعلاناتك سريعة وخفيفة، فرضت AMP حد CSS قدره 20000 بايت في العلامة `<amp style-custom>`. بينما يمكنك استخدام هذا لتحديد أنماط الرسوم المتحركة، حيث يسمح حد 500000 داخل العلامة `<amp style-keyframes>` بمزيد من الرسوم المتحركة التي لن تستهلك موارد نمط الموقع الثمينة. [/filter]

```html
  <style amp-custom>
    div {
      width: 100px;
      height: 100px;
      background: red;
      position: relative;
      animation: mymove 5s infinite;
    }
  </style>
</head>
<body>

<div></div>
  <style amp-keyframes>
   @keyframes mymove {
      0%   {transform: translatey(0px);}
      25%  {transform: translatey(200px);}
      75%  {transform: translatey(50px);}
      100% {transform: translatey(100px);}
    }
  </style>
</body>
```

## إضافة الفئات وإزالتها والتبديل بينها

يمكِّن الإجراء `toggleClass` من AMP عمليات إضافة الفئات وإزالتها لتحديد العناصر.

```js
elementName.toggleClass(class="className")
```

يمكنك تبديل فئة في العنصر نفسه الذي ترغب في أن يتفاعل المستخدمون معه، مثل قائمة هامبرجر متحركة.

```html
<div
  id="hamburger"
  tabindex="1"
  role="button"
  on="tap:hamburger.toggleClass(class='close')"
></div>
```

يمكن تطبيق الإجراء `toggleClass` على عناصر أخرى أيضًا والتبديل بين فئتين من خلال إضافة السمة `force`.

```html
<button
  on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)"
>
  Disappear
</button>
<button
  on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)"
>
  Reappear
</button>
```

إذا كنت ترغب في إزالة فئة ورفض إعادة التطبيق، فقم بإضافة السمة `force` مع قيمة `false`. وإذا كنت ترغب في إضافة فئة ورفض الإزالة، فقم بإضافة `force` مع قيمة `true`.

## التحريك بـ CSS والحالة

يمكنك إضافة أي عدد من فئات CSS وإزالتها مع الحالات باستخدام [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
  ></script>
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      margin-left: 100px;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px);
    }
    .right {
      transform: translatex(50px);
    }
    button {
      margin-top: 1rem;
      margin-left: 1rem;
    }
  </style>
</head>
<body>
  <amp-state id="magicBox">
    <script type="application/json">
      {
        "visibleBox": {
          "className": "visible"
        },
        "invisibleBox": {
          "className": "invisible"
        },
        "moveLeft": {
          "className": "left"
        },
        "moveRight": {
          "className": "right"
        }
      }
    </script>
  </amp-state>
  <div [class]="magicBox[animateBox].className"></div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
</body>
```

[/example]

حدد رسومات متحركة لفئات متعددة من خلال إضافة قائمة بفئات CSS أولًا ضمن العلامة `<style amp-custom>` في `head` الخاص بالمستند:

```css
.visible {
  opacity: 1;
}
.invisible {
  opacity: 0;
}
.left {
  transform: translatex(-50px);
}
.right {
  transform: translatex(50px);
}
```

ثم أقرِن كل فئة بحالة:

```html
<amp-state id="magicBox">
  <script type="application/json">
    {
      "visibleBox": {
        "className": "visible"
      },
      "invisibleBox": {
        "className": "invisible"
      },
      "moveLeft": {
        "className": "left"
      },
      "moveRight": {
        "className": "right"
      }
    }
  </script>
</amp-state>
```

وقم بربط العنصر بالفئات:

```html
<div [class]="magicBox[animateBox].className"></div>
```

تتغير الحالات من إجراء أو حدث AMP مرتبط. ويغير المثال التالي الحالة من تفاعل المستخدم:

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
```

باستخدام [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) بهذه الطريقة، قم بتعيين الفئة على نحو صريح لتحديد الفئة، ولن تضطر إلى إخباره بإزالة الفئات الأخرى.
