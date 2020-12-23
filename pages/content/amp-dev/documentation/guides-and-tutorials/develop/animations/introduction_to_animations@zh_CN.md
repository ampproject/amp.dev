---
"$title": 复杂动画简介
"$order": '2'
description: 对于无法通过添加和移除类来触发的动画，AMP 提供了几个动画特定的组件。这些组件将 AMP 的以下原则应用于动画…
formats:
- websites
- ads
author: CrystalOnScript
---

对于无法通过[添加和移除类](triggering_css_animations.md)来触发的动画，AMP 提供了几个动画特定的组件。这些组件将 AMP 的以下原则应用于动画：速度快、效率高、用户至上。AMP 虽然限制了可在关键帧中使用的 CSS 属性，但它提供了各种优势，例如，细粒度控制、无缝动画，以及不需要额外操作即可兼容各种浏览器。

如果您需要严格控制播放，以及精密计算以动画形式同时呈现多个元素的时间，可以使用 amp-animation。

## 制作 AMP 基本动画

借助 [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 组件，您可以在 AMP 中使用 [Web Animation API](https://www.w3.org/TR/web-animations/)。

基本 [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 是由以下关键部分构成的 JSON 对象：

- 组件要以动画形式呈现的元素，或者 `selector`。
- [时间属性](../../../../documentation/components/reference/amp-animation.md#timing-properties)
- [關鍵幀](../../../../documentation/components/reference/amp-animation.md#keyframes)
- [触发器](../../../../documentation/components/reference/amp-animation.md#triggering-animation)

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

### 选择器

[`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 组件与 CSS 很像，它在 `"selector"` 字段中声明元素的标记名称、类或 ID，从而将动画属性与元素相关联。该组件使用声明的标记类型或类名为每个元素添加动画效果。使用 ID 可以确保为单个元素添加动画效果。

### 时间属性

[时间属性](../../../../documentation/components/reference/amp-animation.md#timing-properties)用于控制动画占用的时长、动画播放的时间，以及关键帧的执行方向。

时间属性不是必需属性，但如果与时间和展示相关的属性（例如 `duration` 和 `fill`）缺失，动画可能无法播放。

### 关键帧

虽然 CSS 支持您使用过渡在两种状态之间切换，但您必须将动画属性声明为关键帧才能实现 [`amp-animation`](../../../../documentation/components/reference/amp-animation.md)（这与 [CSS 动画](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)类似）。为了确保播放流畅并且与各种浏览器兼容，[`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 将[关键帧属性](../../../../documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes)的适用范围限制为 GPU 加速属性，这些属性不会引起重新布局并且可在[合成器线程](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture)上添加动画效果。这样可以防止动画干扰 AMP 和浏览器的[呈现进程](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing)。

[tip type="note"] 关键帧可以直接在 [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 中定义，也可以从 [`<amp style-keyframe>`](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#keyframes-stylesheet) 引用，只要它们符合属性限制即可。点击[此处](../../../../documentation/components/reference/amp-animation.md#keyframes)，详细了解 `amp-animation` 中的关键帧。[/tip]

### 触发器

触发器用于启动动画序列。[`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 扩展组件在以下两种情况之一下启动：`<body>` 在网页上可见时；该扩展组件与 [AMP 操作或事件](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)关联时。

如果您的要求是只要加载网页就运行动画，则根据 `<body>` 的可见性触发很有用，因为动画在“首屏”显示或者显示在网页的第一个视口中。将 `trigger="visibility"` 作为属性添加到组件后，动画将根据可见性触发。

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

为 [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 组件分配 `id` 并将该 `id` 与所需的事件触发器（例如，点按按钮）相关联后，动画将与操作或事件建立关联。

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## 制作复杂动画

在 [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 中制作动画，可以实现细粒度控制，而不仅仅是开始和停止播放动画，还可以暂停、反向播放动画以及跳转到特定位置，甚至还可以将多个动画链合在一起，并为一系列元素添加动画效果。

### 子目标

相同标记或类的元素可以具有指定的时间属性，并且可以重写在顶层动画中定义的变量值。

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
        "keyframes": [{"transform": "translateX(0px)"}, {"transform": "translateX(50%)"}],
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
  <button on="tap:animateThis.start">
   start
  </button>
</body>
```
[/example]

### 链合的动画

可以将多个动画串联在一起，形成一个大序列。您可以在 [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 组件的 `animations` 数组中编写动画，从而形成各种时控效果，例如，视频上的重叠式广告。

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

上述设置将使每个动画按顺序播放 3 秒。

对于大型动画，`animations` 数组中的动画可以引用其他 [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 组件。

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

### 为数量未知的元素添加动画效果

通过将 [`var()` 和 `calc()` 表达式](../../../../documentation/components/reference/amp-animation.md)与 [CSS 扩展组件](../../../../documentation/components/reference/amp-animation.md#css-extensions)结合使用，您可以编写由任意数量的元素构成的复杂时控动画。这样便可轻松灵活地为动态数据和用户生成的数据添加动画效果。

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
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
  <div class="parent" on="tap:cardAdmin.start" tabindex=none role="animation">
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg" layout="fill"></amp-img>
  </div>
</body>
```
[/example]

- 声明变量 `--duration`，并为其指定两秒的值。
- 将 `duration` 设置为变量 `--duration` 的值。
- 计算满足选择器 `.card` 要求的每个元素要应用的延迟时间。
    1. [`length()` 扩展组件](../../../../documentation/components/reference/amp-animation.md#css-length()-extension)计算已选择的 `.card` 元素数量
    2. 该长度减去每个 `.card` 的 [index()](../../../../documentation/components/reference/amp-animation.md#css-index()-extension)
    3. 得到的值再乘以变量 `--duration`
    4. 最终的总数（以秒计）就是该元素的延迟时间
- 动画将单独应用到各个元素，这样，卡片就会一张接一张打乱，而不是同时打乱。

在 AMP Playground 中打开动画，并添加更多的 [`amp-img`](../../../../documentation/components/reference/amp-img) 元素，对上述行为进行测试。

### 无论在哪里，看起来都很棒

动画可以包括支持自定义效果的 [`conditions`](../../../../documentation/components/reference/amp-animation.md#conditions)。使用 [`media` 条件](../../../../documentation/components/reference/amp-animation.md#media-query)，可以根据屏幕尺寸量身定制动画；在 [`switch` 语句](../../../../documentation/components/reference/amp-animation.md#animation-switch-statement)中启用 [`supports` 条件](../../../../documentation/components/reference/amp-animation.md#supports-condition)后，可以实现浏览器向后兼容。

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
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
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
