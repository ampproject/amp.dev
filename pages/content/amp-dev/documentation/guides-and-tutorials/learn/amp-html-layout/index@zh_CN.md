---
'$title': AMPHTML 布局系统
$order: 1
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: '概述 '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

## 概述

布局系统的主要目标是确保 AMP 元素可以合理表达其布局，从而使运行时可以在完成任何远程资源（例如 JavaScript 和数据调用）之前推断元素的大小。这一点很重要，因为这样可以显著减少无意义的呈现和滚动操作。

基于这一点，AMP 布局系统仅支持少量灵活的布局，以确保良好的性能。此系统依赖于一组属性（例如，`layout`、 `width`、`height`、`sizes` 和 `heights`）来表达元素对布局和大小的需求。

## 行为 <a name="behavior"></a>

非容器 AMP 元素（即 `layout != container`）在未解析/未构建模式下启动，此时，除了占位符外，该元素的所有子级均处于隐藏状态（请参阅 `placeholder` 属性）。完全构造该元素所需的 JavaScript 和数据负载仍可下载和初始化，但 AMP 运行时已经知道如何仅根据 CSS 类和 `layout`、`width`、`height` 与 `media` 属性来确定元素大小和布局。大多数情况下，如果指定了 `placeholder`，将会调整该属性的大小和位置以占用元素的所有空间。

只要构建元素并完成元素的第一个布局，`placeholder` 就会处于隐藏状态。此时，元素应当正常构建并定位其所有子级，并且随时可以显示和接受用户输入。这是默认行为。每个元素均可进行重写，以便更快地隐藏 `placeholder` 或者延长该属性的显示时间。

运行时根据 `layout`、`width`、`height` 和 `media` 属性来确定元素大小和显示元素。所有布局规则均通过 CSS 在内部实现。如果元素的大小可以通过 CSS 样式进行推断并且不会随子元素而更改，我们说该元素可“定义大小”，也就是说，该元素立即可供使用或动态插入。但是，这并不意味着该元素的大小无法更改。布局可以完全自适应，就像 `responsive`、`fixed-height`、`fill` 和 `flex-item` 布局一样。简单来说，就是在呈现或滚动期间或者在下载后，如果用户没有给出明确的操作，元素大小不会更改。

如果元素配置错误，则在生产模式下不会对元素进行任何呈现，而在开发模式下，运行时将在错误状态下呈现元素。可能出现的错误包括：`layout`、`width` 和 `height` 属性的值无效或者不受支持。

## 布局属性 <a name="layout-attributes"></a>

### `width` 和 `height` <a name="width-and-height"></a>

根据 `layout` 属性的值，AMP 组件元素必须具有 `width` 和 `height` 属性，这两个属性包含整型像素值。布局的实际行为取决于 `layout` 属性，如下所述。

在少数情况下，如果未指定 `width` 或 `height`，AMP 运行时可按以下方式为这两个属性设置默认值：

- `amp-pixel`：`width` 和 `height` 的默认值均为 0。
- `amp-audio`：根据浏览器推断 `width` 和 `height` 的默认值。

### `layout` <a name="layout"></a>

AMP 提供了一组布局，用于指定 AMP 组件在文档布局中的行为。您可以添加 `layout`属性并为其指定下表中列出的其中一个值，从而为组件指定布局。

**示例**：简单的自适应图片，其中宽度和高度用于确定宽高比。

[sourcecode:html]
<amp-img
src="/img/amp.jpg"
width="1080"
height="610"
layout="responsive"
alt="an image"

> </amp-img>
> [/sourcecode]

`layout` 属性支持的值如下所示：

<table>
  <thead>
    <tr>
      <th width="30%">值</th>
      <th>行为和要求</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>不存在</td>
      <td>如果未指定值，则按以下方式推断组件的布局：         <ul>           <li>如果存在 <code>height</code>，但 <code>width</code> 不存在或者设为 <code>auto</code>，则假定为 <code>fixed-height</code> 布局。</li>           <li>如果 <code>width</code> 和 <code>height</code> 均存在，并且还有 <code>sizes</code> 或 <code>heights</code> 属性，则假定为 <code>responsive</code> 布局。</li>           <li>如果 <code>width</code> 和 <code>height</code> 均存在，则假定为 <code>fixed</code> 布局。</li>           <li> 如果 <code>width</code> 和 <code>height</code> 均不存在，则假定为 <code>container</code> 布局。</li>         </ul>
</td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>元素允许其子级定义大小，这与常规的 HTML <code>div</code> 非常像。假定组件自身没有特定的布局，而仅仅充当容器；子级会被立即呈现。</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>元素占用可供自身使用的空间，即宽度和高度。换句话说，<code>fill</code> 元素的布局和大小与其父项一致。对于要填充父容器的元素，可指定“fill”布局，并确保父容器指定 <code>position:relative</code> 或 <code>position:absolute</code>。</td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>元素具有固定宽度和高度，不支持自适应。<code>width</code> 和 <code>height</code> 属性必须存在。唯一的例外是 <code>amp-pixel</code> 和 <code>amp-audio</code> 组件。</td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>元素占用可供自身使用的空间，但保持高度不变。此布局特别适合 <code>amp-carousel</code> 等元素，这些元素包含水平放置的内容。<code>height</code> 属性必须存在。<code>width</code> 属性不必存在，或者必须设为 <code>auto</code>。</td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>如果父项为弹性容器（即 <code>display: flex</code>），则元素与其父项中布局类型为 <code>flex-item</code> 的其他元素占用父容器的剩余空间。<code>width</code> 和 <code>height</code> 属性不是必需属性。</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>元素占用可供自身使用的空间，并根据 <code>width</code> 和 <code>height</code> 属性给出的宽高比自动重新调整其高度，<em>直到</em>该元素达到传递给 <code>amp-img</code> 的 `width` 和 `height` 属性所定义的元素大小，或者达到 CSS 约束（例如 `max-width`）。width 和 height 属性必须存在。此布局特别适合大部分 AMP 元素，其中包括 <code>amp-img</code>、<code>amp-carousel</code> 等。可用空间取决于父元素，也可以使用 <code>max-width</code> CSS 进行自定义。此布局与 <code>responsive</code> 布局的不同之处在于，它的高度和宽度是固有的。这在浮动元素内部最为明显，此时，<code>responsive</code> 布局按 0x0 进行呈现，<code>intrinsic</code> 布局将扩展到其自然大小或任何 CSS 约束的较小者。</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>元素不显示，不占用屏幕上的空间，就像其显示样式设为 <code>none</code> 一样。此布局可应用于所有 AMP 元素。假定元素自身可以在用户操作时显示（例如 <code>amp-lightbox</code>）。<code>width</code> 和 <code>height</code> 属性不是必需属性。</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>元素占用可供自身使用的空间，并根据 <code>width</code> 和 <code>height</code> 属性给出的宽高比自动重新调整其高度。此布局非常适合大部分 AMP 元素，包括 <code>amp-img</code>、<code>amp-video</code> 等。可用空间取决于父元素，也可以使用 <code>max-width</code> CSS 进行自定义。<code>width</code> 和 <code>height</code> 属性必须存在。<p><strong>注</strong>：<code>"layout=responsive"</code> 的元素没有固有大小。元素的大小取决于其容器元素。为了确保 AMP 元素显示，必须为所含元素指定宽度和高度。不要在所含元素上指定 <code>"display:table"</code>，因为这会重写 AMP 元素的显示，将 AMP 元素呈现为不可见。</p>
</td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

所有支持 `responsive` 布局的 AMP 元素均支持 `sizes` 属性。此属性的值为 [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) 中所述的 sizes 表达式，但延伸到所有元素，而不仅仅是图片。简而言之，`sizes` 属性描述的是如何根据媒体条件计算元素的宽度。

如果在指定 `sizes` 属性的同时也指定了 `width` 和 `height`，则 `layout` 将默认为 `responsive`。

**示例**：使用 `sizes` 属性

在以下示例中，如果视口比 `320px` 宽，则图片宽度将为 320px，否则，图片宽度为 100vw（即整个视口宽度）。

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"

> </amp-img>
> [/sourcecode]

### `disable-inline-width` <a name="disable-inline-width"></a>

`sizes` 属性本身会在元素上设置内嵌 `width` 样式。将 `disable-inline-width` 与 `sizes` 配合使用时，AMP 元素会将 `sizes` 的值传播到元素的基本代码，正如嵌套在 `amp-img` 内部的 `img` 一样，它自己在 AMP 中通常**不会**将内嵌 `width` 设置为 `sizes`。

**示例**：使用 `disable-inline-width` 属性

在以下示例中，`<amp-img>` 元素的宽度不受影响，`sizes` 仅用于从 `srcset` 中选择一个源。

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"
disable-inline-width

> </amp-img>
> [/sourcecode]

### `heights` <a name="heights"></a>

所有支持 `responsive` 布局的 AMP 元素均支持 `heights` 属性。此属性的值是基于媒体表达式的 sizes 表达式，与 [img sizes 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)类似，但存在以下两个主要区别：

1. 它适用于元素的高度，而不是宽度。
2. 允许使用百分比值，例如 `86%`。如果使用百分比值，则表示的是元素宽度的百分比。

如果在指定 `heights` 属性的同时也指定了 `width` 和 `height`，则 `layout` 将默认为 `responsive`。

**示例**：使用 `heights` 属性

在以下示例中，图片的高度默认为宽度的 80%，但是，如果视口的宽度超过 `500px`，则高度最大为 `200px`。因为同时指定了 `heights` 属性以及 `width` 和 `height`，布局默认为 `responsive`。

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="320"
height="256"
heights="(min-width:500px) 200px, 80%"

> </amp-img>
> [/sourcecode]

### `media` <a name="media"></a>

大部分 AMP 元素都支持 `media` 属性。`media` 的值为媒体查询。如果查询不一致，则不对元素进行任何呈现，并且不提取元素的资源，可能也不提取其子资源。如果浏览器窗口更改大小或方向，则重新评估媒体查询，是否显示该元素取决于新的评估结果。

**示例**：使用 `media` 属性

以下示例有 2 张图片，其中包含相互排斥的媒体查询。根据屏幕宽度，将对其中一张图片进行提取和呈现。`media` 属性适用于所有 AMP 元素，因此，可用于非图片元素，例如广告。

[sourcecode:html]
<amp-img
media="(min-width: 650px)"
src="wide.jpg"
width="466"
height="355"
layout="responsive"

> </amp-img>
> <amp-img
>   media="(max-width: 649px)"
>   src="narrow.jpg"
>   width="527"
>   height="193"
>   layout="responsive"
> </amp-img>
> [/sourcecode]

### `placeholder` <a name="placeholder"></a>

`placeholder` 属性不仅可以在 AMP 元素上设置，还可以在任何元素上设置。`placeholder` 属性表示，标有此属性的元素充当 AMP 父元素的占位符。如果指定了占位符元素，则占位符元素必须是 AMP 元素的直接子级。默认情况下，AMP 元素的占位符会直接显示，即使尚未下载或初始化 AMP 元素的资源也是如此。准备就绪后，AMP 元素通常会隐藏其占位符，而显示具体内容。占位符的确切行为取决于元素的实现。

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
<amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

`fallback` 属性不仅可以在 AMP 元素上设置，还可以在任何 HTML 元素上设置。后备是一种惯例，通过该惯例，元素可以告知用户，浏览器不支持该元素。如果指定后备元素，该元素必须是 AMP 元素的直接子级。反馈的确切行为取决于元素的实现。

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">

  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

`noloading` 属性指示是否应为此元素关闭“加载指示器”。许多 AMP 元素在列出时会显示“加载指示器”，这是表示元素尚未完全加载的基本动画。添加此属性后，元素可以选择不采用此行为。

## (tl;dr) 布局要求和行为总结 <a name="tldr-summary-of-layout-requirements--behaviors"></a>

下表列出了 `layout` 属性可接受的参数、CSS 类和样式。请注意：

1. 前缀为 `-amp-` 的所有 CSS 类以及前缀为 `i-amp-` 的元素分别被视为 AMP 的内部类和内部元素，不允许在用户样式表中使用。在此介绍它们仅供参考。
2. 即使按照要求在表中指定了 `width` 和 `height`，默认规则仍适用，这与 `amp-pixel` 和 `amp-audio` 相同。

<table>
  <thead>
    <tr>
      <th width="21%">布局</th>
      <th width="20%">宽度/<br>高度是否为必需项？</th>
      <th width="20%">是否定义大小？</th>
      <th width="20%">是否有其他元素？</th>
      <th width="19%">CSS“显示”</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>否</td>
      <td>否</td>
      <td>否</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>否</td>
      <td>是，父项大小。</td>
      <td>否</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>是</td>
      <td>是，由 <code>width</code> 和 <code>height</code> 指定。</td>
      <td>否</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td> 只有 <code>height</code> 为必需项；<code>width</code> 可以设为 <code>auto</code>
</td>
      <td>是，由父容器和 <code>height</code> 指定。</td>
      <td>否</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>否</td>
      <td>否</td>
      <td>是，取决于父容器。</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>是</td>
      <td>是，取决于父容器和 <code>width:height</code> 的宽高比。</td>
      <td>是，元素为 <code>i-amphtml-sizer</code>。</td>
      <td> <code>block</code>（行为类似于<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element" rel="nofollow">替换的元素</a>）。</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>否</td>
      <td>否</td>
      <td>否</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>是</td>
      <td>是，取决于父容器和 <code>width:height</code> 的宽高比。</td>
      <td>是，元素为 <code>i-amphtml-sizer</code>。</td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>
