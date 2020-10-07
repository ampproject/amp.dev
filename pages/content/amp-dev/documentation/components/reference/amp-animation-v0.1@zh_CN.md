---
$title: amp-animation
$category@: presentation
teaser:
  text: 定义和显示动画。
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



定义和运行动画。

<table>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td><code><code>&lt;script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>示例</strong></td>
    <td><a href="https://github.com/ampproject/amphtml/blob/master/examples/animations.amp.html">animations.amp.html</a></td>
  </tr>
</table>



## 概述 <a name="overview"></a>

AMP 动画依赖 [Web Animations API](https://www.w3.org/TR/web-animations/) 在 AMP 文档中定义和运行动画。

## 格式 <a name="format"></a>

`amp-animation` 元素会将此类动画定义为 JSON 结构。

### 顶层动画规范 <a name="top-level-animation-specification"></a>

顶层对象用于定义整个动画过程，其中包含任意数量的动画组件（定义为 `animations` 数组）：
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
</amp-animation>
```

### 在 DOM 中的位置 <a name="placement-in-dom"></a>

仅当 `trigger="visibility"` 时，才允许将 `<amp-animation>` 作为 `<body>` 元素的直接子级。如果未指定 `trigger` 且动画播放通过其操作以编程方式控制，则该元素可以放置在 DOM 中的任意位置。

### 动画组件 <a name="animation-component"></a>

每个动画组件都是一种[关键帧效果](https://www.w3.org/TR/web-animations/#dom-keyframeeffect-keyframeeffect)，并且包含以下各项：

- 选择器引用的目标元素
- 条件：媒体查询和支持条件
- 时间属性
- 关键帧

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

### 条件 <a name="conditions"></a>

条件可用于指定相应动画组件是否包含在最终动画中。

#### 媒体查询 <a name="media-query"></a>

可以使用 `media` 属性指定媒体查询。该属性可以包含 [Window.matchMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia) API 允许的任何表达式，并且对应于 `@media` CSS 规则。

如果已为某动画组件指定值，则仅当媒体查询与当前环境匹配时，该动画组件才会包含在最终动画中。

#### 支持条件 <a name="supports-condition"></a>

可以使用 `supports` 属性指定支持条件。该属性可以包含 [CSS.supports](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS/supports) API 允许的任何表达式，并且对应于 `@supports` CSS 规则。

如果已为某动画组件指定值，则仅当支持条件与当前环境匹配时，该动画组件才会包含在最终动画中。

### 动画 `switch` 语句 <a name="animation-switch-statement"></a>

在有些情况下，可以非常方便地将多个具有可选默认值的[条件动画](#conditions)合并成单个动画，只需按以下格式使用 `switch` 动画语句即可完成此操作：

```
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

在 `switch` 动画中，系统会按照指定的顺序评估候选项，然后执行第一个与[条件语句](#conditions)匹配的动画，并忽略其余动画。

例如，以下动画会运行运动路径动画（如果受支持），然后回退到转换操作：
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

### 变量 <a name="variables"></a>

动画组件可以通过 `var()` 表达式声明将用于时间值和关键帧值的 CSS 变量。系统会根据当前目标上下文对 `var()` 表达式进行求值。在动画组件中指定的 CSS 变量会传播到嵌套动画，应用于动画目标，然后替换最终动画中使用的 CSS 变量。

例如：
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

在此示例中：

- `--delay` 会传播到嵌套动画，并用作 `#target1` 动画的延迟时间。
- `--x` 会传播到嵌套动画，但会被 `#target1` 动画替换，并在稍后用于 `transform` 属性。
- `--y` 未在 `<amp-animation>` 中指定，因此系统将在 `#target1` 元素中查询该值。如果在 CSS 中未指定该值，则该值会默认为 `0px`。

如需详细了解 `var()`，请参阅[“`var()` 和 `calc()`”部分](#var-and-calc-expressions)。

### 时间属性 <a name="timing-properties"></a>

顶层动画和动画组件可以包含时间属性。网页动画规范的 [AnimationEffectTimingProperties](https://www.w3.org/TR/web-animations/#dictdef-animationeffecttimingproperties) 中对这些属性进行了详细定义。允许的一组属性包括：

<table>
  <tr>
    <th class="col-twenty">属性</th>
    <th class="col-twenty">类型</th>
    <th class="col-twenty">默认值</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td>时间</td>
    <td>0</td>
    <td>动画时长。可以是数值（以毫秒为单位），也可以是 CSS 时间值（例如 `2s`）。</td>
  </tr>
  <tr>
    <td><code>delay</code></td>
    <td>时间</td>
    <td>0</td>
    <td>动画开始执行前的延迟时间。可以是数值（以毫秒为单位），也可以是 CSS 时间值（例如 `2s`）。</td>
  </tr>
  <tr>
    <td><code>endDelay</code></td>
    <td>时间</td>
    <td>0</td>
    <td>动画播放完毕到实际被视为播放完毕之间的延迟时间。可以是数值（以毫秒为单位），也可以是 CSS 时间值（例如 `2s`）。</td>
  </tr>
  <tr>
    <td><code>iterations</code></td>
    <td>数字、<br>“Infinity”或<br>“infinite”</td>
    <td>1</td>
    <td>动画效果重复次数。</td>
  </tr>
  <tr>
    <td><code>iterationStart</code></td>
    <td>数字/CSS</td>
    <td>0</td>
    <td>时间偏移量，即经过多长时间后效果开始以动画形式呈现。</td>
  </tr>
  <tr>
    <td><code>easing</code></td>
    <td>字符串</td>
    <td>“linear”</td>
    <td><a href="https://www.w3.org/TR/web-animations/#timing-function">时间函数</a>，用于调整时间以产生加/减速效果。</td>
  </tr>
  <tr>
    <td><code>direction</code></td>
    <td>字符串</td>
    <td>“normal”</td>
    <td>“normal”、“reverse”、“alternate”或“alternate-reverse”中的一个。</td>
  </tr>
  <tr>
    <td><code>fill</code></td>
    <td>字符串</td>
    <td>“none”</td>
    <td>“none”、“forwards”、“backwards”、“both”或“auto”中的一个。</td>
  </tr>
</table>

所有时间属性都允许直接使用数值/字符串值或 CSS 值。例如，可以将“duration”指定为 `1000`、`1s` 或 `1000ms`。此外，这些属性还允许使用 `calc()`、`var()` 以及其他 CSS 表达式。

采用 JSON 格式的时间属性示例：
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

动画组件会继承为顶层动画指定的时间属性。

### 子目标 <a name="subtargets"></a>

在任何可以指定 `selector` 的位置，都可以指定 `subtargets: []`。子目标可以替换动画中为特定子目标（通过索引或 CSS 选择器指明）指定的时间属性或变量。

例如：
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

在此示例中，默认情况下，与“.target”匹配的所有目标都会有 100 毫秒的延迟，且“--y”为 100 像素。不过，第一个目标 (`index: 0`) 的延迟时间会被替换为 200 毫秒；奇数目标的“--y”会被替换为 200 像素。

请注意，可以有多个子目标与同一个目标元素匹配。

### 关键帧 <a name="keyframes"></a>

要指定关键帧，可以采用网页动画规范的[“关键帧”部分](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument)介绍的多种方式，也可以采用字符串形式（引用 CSS 中的 `@keyframes` 名称）。

下面列举了一些典型的关键帧定义。

采用简写对象形式“到”格式指定 100% 处的最终状态：
```text
{
  "keyframes": {"opacity": 0, "transform": "scale(2)"}
}
```

采用简写对象形式“从-到”格式指定 0% 处的起始状态以及 100% 处的最终状态：
```text
{
  "keyframes": {
    "opacity": [1, 0],
  "transform": ["scale(1)", "scale(2)"]
}
}
```

采用简写对象形式“值-数组”格式指定起始状态、最终状态以及多个（等间距）偏移处的多个值：
```text
{
  "keyframes": {
    "opacity": [1, 0.1, 0],
  "transform": ["scale(1)", "scale(1.1)", "scale(2)"]
}
}
```

采用数组形式指定关键帧。系统会自动在 0 和 100% 处以及这两者之间等间距分配偏移：
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

数组形式还可以显式包含“offset”：
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"offset": 0.1, "opacity": 0.1, "transform": "scale(2)"},
{"opacity": 0, "transform": "scale(3)"}
]
}
```

数组形式还可以包含“easing”：
```text
{
  "keyframes": [
    {"easing": "ease-out", "opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

如需了解其他关键帧格式，请参阅[网页动画规范](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument)。

这些属性值可以是任何有效的 CSS 值，包括 `calc()`、`var()` 以及其他 CSS 表达式。

#### 通过 CSS 指定关键帧 <a name="keyframes-from-css"></a>

另一种指定关键帧的方式是在文档的样式表（`<style>` 标记）中以 `@keyframes` CSS 规则的形式进行指定。例如：
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

按照[网页动画规范](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument)，CSS `@keyframes` 基本相当于 JSON 中的内嵌关键帧定义。不过，这两者之间存在一些细微差别：

- 为了获得广泛的平台支持，可能需要添加供应商前缀（如 `@-ms-keyframes {}` 或 `-moz-transform`）。如果采用 JSON 格式，则不需要也不允许添加供应商前缀，但如果采用 CSS 格式，则可能必须要添加。
- 以 CSS 格式指定关键帧时，不支持 `calc()` 和 `var()` 的平台将无法使用 `amp-animation` polyfill。因此，建议您始终在 CSS 中添加后备值。
- CSS 中无法使用 [`width()`、`height()`、`num()`、`rand()`、`index()` 和 `length()`](#css-extensions) 等 CSS 扩展。

#### 列入白名单的关键帧属性 <a name="allow-listed-properties-for-keyframes"></a>

并非所有 CSS 属性都可用于关键帧。只有新型浏览器可以优化和快速以动画形式呈现的 CSS 属性才可列入白名单。随着越来越多的属性被确认为可提供良好性能，此名单将不断扩充。目前，该名单包含以下属性：
- [`opacity`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity)
- [`transform`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)
- [`visibility`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/visibility)
- [`offset-distance`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/offset-distance)

请注意，不需要也不允许使用带供应商前缀的 CSS 属性。

### 动画配置的缩略形式 <a name="abbreviated-forms-of-animation-configuration"></a>

如果动画仅涉及一个元素且一个关键帧效果就已足够，则配置可以缩减为只有这一个动画组件。例如：
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

如果动画由一系列组件组成，但没有顶层动画，则配置可以缩减为一组组件。例如：
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

### 动画组成 <a name="animation-composition"></a>

动画可以引用其他动画，因此可以将多个 `amp-animation` 声明合并成一个最终动画。引用其他动画中的动画与嵌套基本相同。人们希望将动画拆分成不同元素的原因是，他们想要在多个位置重复使用同一个动画，或者只是想让每个动画声明更简短、更易于管理。

例如：
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

此动画示例将“anim2”动画合并到“anim1”中。“anim2”在添加时没有提供目标 (`selector`)。在这种情况下，被添加的动画应该引用自己的目标。

此外，还有一种形式允许添加到的动画提供一个或多个目标。在这种情况下，系统会为每个匹配的目标执行所添加的动画。例如：
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

在此示例中，无论“target-class”是与零个、一个还是多个元素匹配，系统都会为每个匹配的目标执行“anim2”。

在调用方动画中指定的变量和时间属性也会传递到所添加的动画中。

### `var()` 和 `calc()` 表达式 <a name="var-and-calc-expressions"></a>

`amp-animation` 允许将 `var()` 和 `calc()` 表达式用于时间值和关键帧值。

例如：
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

系统会在不直接支持 `var()` 和 `calc()` 的平台上对其执行 polyfill 操作，还会从相应目标元素提取 `var()` 属性。但遗憾的是，系统无法完全对 `var()` 执行 polyfill 操作。因此，如果兼容性很重要，强烈建议在 `var()` 表达式中添加默认值。例如：
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

动画组件可以将自己的变量指定为 `--var-name` 字段。这些变量会传播到嵌套动画中，并替换通过样式表（`<style>` 标记）指定的目标元素的变量。`var()` 表达式会先尝试解析在动画中指定的变量值，然后通过查询目标样式进行解析。

### CSS 扩展 <a name="css-extensions"></a>

`amp-animation` 提供了一些 CSS 扩展，以满足典型动画需求：`rand()`、`num()`、`width()` 和 `height()`。CSS 值（包括时间值和关键帧值）能在 `amp-animation` 中的哪些位置使用，这些函数就能在哪些位置使用。

#### CSS `index()` 扩展 <a name="css-index-extension"></a>

`index()` 函数可返回动画效果中当前目标元素的索引。当多个目标使用 `selector` 属性呈现相同的动画效果时，此函数的用处最大。第一个与选择器匹配的目标的索引为 `0`，第二个目标的索引为 `1`，依此类推。

此外，该属性还可与 `calc()` 表达式组合使用，并可用于打造交错效果。例如：
```
{
  "selector": ".class-x",
  "delay": "calc(200ms * index())"
  }
```

#### CSS `length()` 扩展 <a name="css-length-extension"></a>

`length()` 函数可返回动画效果中目标元素的数量。与 `index()` 组合使用时，此函数的用处最大：

```
{
  "selector": ".class-x",
  "delay": "calc(200ms * (length() - index()))"
  }
```

#### CSS `rand()` 扩展 <a name="css-rand-extension"></a>

`rand()` 函数可返回一个随机 CSS 值。有以下两种形式。

第一种形式不含参数，只是返回一个介于 0 到 1 之间的随机数。
```
{
  "delay": "calc(10s * rand())"
  }
```

第二种形式包含两个参数，返回介于这两个参数之间的随机值。
```
{
  "delay": "rand(5s, 10s)"
  }
```

#### CSS `width()` 和 `height()` 扩展 <a name="css-width-and-height-extensions"></a>

`width()` 和 `height()` 扩展可返回动画元素或通过选择器指定的元素的宽度/高度。返回的值以像素为单位，例如 `100px`。

支持的形式如下：

- `width()` 和 `height()` - 动画元素的宽度/高度。
- `width('.selector')` 和 `height('.selector')` - 通过选择器指定的元素的宽度/高度。您可以使用任何 CSS 选择器，例如 `width('#container &gt; li')`。
- `width(closest('.selector'))` 和 `height(closest('.selector'))` - 通过距离最近的选择器指定的元素的宽度/高度。

`width()` 和 `height()` 在实现转换方面尤为有用。`left`、`top` 及类似 CSS 属性可以使用 `%` 值来表示与容器大小成比例的动画。不过，`transform` 属性会以不同的方式解读 `%` 值 - 作为所选元素的百分比。因此，`width()` 和 `height()` 可用于表示转换动画（根据容器元素及类似元素）。

这些函数可与 `calc()`、`var()` 及其他 CSS 表达式组合使用。例如：
```
{
  "transform": "translateX(calc(width('#container') + 10px))"
  }
```

#### CSS `num()` 扩展 <a name="css-num-extension"></a>

`num()` 函数可返回 CSS 值的数字表示法。例如：

- `num(11px)` 可生成 `11`；
- `num(110ms)` 可生成 `110`；
- 等等

例如，以下表达式会计算与元素宽度成比例的延迟时间（以秒为单位）：
```
{
  "delay": "calc(1s * num(width()) / 100)"
  }
```

### SVG 动画 <a name="svg-animations"></a>

SVG 非常棒，我们建议将其用于动画！

SVG 动画受到[列入白名单的关键帧属性](#allow-listed-properties-for-keyframes)中所述的那些 CSS 属性的支持，但存在一些细微差别：

* IE/Edge SVG 元素[不支持 CSS `transform` 属性](https://developer.microsoft.com/zh-CN/microsoft-edge/platform/issues/1173754/)。`transform` 动画本身已执行过 polyfill 操作。不过，不会应用在样式表中指定的初始状态。如果初始转换状态在 IE/Edge 上很重要，建议您通过 [SVG `transform` 属性](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/transform)进行复制。
* 虽然已针对 IE/Edge 对 `transform` CSS 执行 polyfill 操作，但遗憾的是，无法对 `transform-origin` 执行 polyfill 操作。因此，如果需要与 IE/Edge 兼容，建议仅使用默认 `transform-origin`。
* 大多数浏览器目前都无法正确解读 `transform-origin` CSS。请参阅 [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=740300)、[Safari](https://bugs.webkit.org/show_bug.cgi?id=174285) 和 [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1379340) 的相关问题。实现 [CSS `transform-box`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-box) 后，大部分引起混淆的问题应该会得到解决。如果 `transform-origin` 至关重要，建议您同时添加必需的 `transform-box` CSS，以确保未来的兼容性。

## 触发动画 <a name="triggering-animation"></a>

您可以通过 `trigger` 属性或 `on` 操作触发动画。

### `trigger` 属性 <a name="trigger-attribute"></a>

对于 `trigger` 属性，目前 `visibility` 是唯一可用的值。`visibility` 会在基础文档或嵌入内容可见时（位于视口中时）触发。

例如：
```html
<amp-animation id="anim1" layout="nodisplay"
    trigger="visibility">
    ...
  </amp-animation>
```

### 通过 `on` 操作触发 <a name="triggering-via-on-action"></a>

例如：

```html
<amp-animation id="anim1" layout="nodisplay">
  ...
</amp-animation>
<button on="tap:anim1.start">Animate</button>
```

## `on` 操作 <a name="on-actions"></a>

`amp-animation` 元素会导出以下操作：

* `start` - 启动尚未运行的动画。时间属性和变量可指定为操作参数，如 `anim1.start(delay=-100, --scale=2)`。
* `restart` - 启动动画或重新启动当前正在运行的动画。时间属性和变量可指定为操作参数，如 `anim1.start(delay=-100, --scale=2)`。
* `pause` - 暂停当前正在运行的动画。
* `resume` - 继续当前正在运行的动画。
* `togglePause` - 在暂停/继续操作之间切换。
* `seekTo` - 暂停动画，并跳转到通过 `time` 参数（以毫秒为单位）或 `percent` 参数（作为时间轴中的百分比点）指定的时间点。
* `reverse` - 反向运行动画。
* `finish` - 结束动画。
* `cancel` - 取消动画。
