---
$title: 支持的布局
---


要让您的元素能够自适应，请添加 `layout=responsive`。

[TOC]

## 布局属性支持的值

默认情况下，请使用自适应布局。

以下是布局属性所支持的值的完整列表：

<table>
  <thead>
    <tr>
      <th class="col-twenty" data-th="Layout type">布局类型</th>
      <th class="col-twenty" data-th="Width/height required">是否要求提供宽度/高度</th>
      <th data-th="Behavior">行为</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>nodisplay</code></td>
      <td class="col-twenty" data-th="Description">否</td>
      <td data-th="Behavior">元素不显示。该布局可应用于每个 AMP 元素。组件不占用任何屏幕空间，如同没有显示样式。假定元素能够在用户操作时自行显示，例如 <a href="/docs/reference/extended/amp-lightbox.html">amp-lightbox</code></a>。</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed</code></td>
      <td class="col-twenty" data-th="Description">是</td>
      <td data-th="Behavior">元素有固定的宽度和高度，不支持任何自适应功能。其中，只有 <a href="/docs/reference/amp-pixel.html">amp-pixel</code></a> 和 <a href="/docs/reference/extended/amp-audio.html">amp-audio</code></a> 元素例外。</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>responsive</code></td>
      <td class="col-twenty" data-th="Description">是</td>
      <td data-th="Behavior">元素的宽度根据其容器元素的宽度来设定，高度则根据由宽度和高度属性确定的宽高比自动重新调整。这种布局非常适合大多数 AMP 元素，包括 <a href="/docs/reference/amp-img.html">amp-img</code></a>、<a href="/docs/reference/amp-video.html">amp-video</code></a>。可用空间取决于父级元素，还可使用 <code>max-width</code> CSS 进行自定义。</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed-height</code></td>
      <td class="col-twenty" data-th="Description">仅高度</td>
      <td data-th="Behavior">元素占用为其提供的空间，但高度保持不变。这种布局非常适合 <a href="/docs/reference/extended/amp-carousel.html">amp-carousel</code></a> 等涉及水平放置内容的元素。<code>width</code> 属性要么不存在，要么必须设为 <code>auto</code>。</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fill</code></td>
      <td class="col-twenty" data-th="Description">否</td>
      <td data-th="Behavior">元素占用为其提供的空间，宽度和高度均可填充进来。换言之，填充元素的布局与其父级匹配。</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>container</code></td>
      <td class="col-twenty" data-th="Description">否</td>
      <td data-th="Behavior">元素让其子级定义自己的尺寸，类似于普通 HTML <code>div</code>。假定组件自身没有特定布局，仅充当容器。其子级会立即呈现。</td>
    </tr>
  </tbody>
</table>

### 如果未定义宽度和高度，会怎样？

在少数情况下，如果未指定 `width` 或 `height`，AMP 运行时会将这些值默认如下：

* [`amp-pixel`](/docs/reference/amp-pixel.html)：宽度和高度均默认为 0。
* [`amp-audio`](/docs/reference/extended/amp-audio.html)：从浏览器推断出默认宽度和高度。

### 如果未定义布局属性，会怎样？

布局行为按以下方式决定：

* 如果 `height` 存在，而 `width` 不存在或设为 `auto`，则假定为 `fixed-height` 布局。
* 如果 `width` 或 `height` 属性存在，且有 `sizes` 属性，则假定为 `responsive` 布局。
* 如果 `width` 或 `height` 属性存在，则假定为 `fixed` 布局。
* 如果 `width` 和 `height` 均不存在，则假定为 `container` 布局。

## 使用 @media 和 media

您可以像在其他任何网站上一样，使用 [`@media`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media) 控制网页布局的外观和行为。当浏览器窗口改变尺寸或屏幕方向时，媒体查询会重新接受评估，而元素则会根据新的结果隐藏和显示。

要详细了解如何通过应用媒体查询来控制布局，请参阅[使用 CSS 媒体查询实现自适应功能](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=zh-CN)一文。

AMP 中另外一种用于自适应设计的功能是 `media` 属性。该属性可在所有 AMP 元素中使用；其工作方式类似于全局样式表中的媒体查询，不过它只影响单一网页中的特定元素。

举例来讲，以下是包含互斥媒体查询的 2 张图片。

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive" >
</amp-img>
[/sourcecode]

根据屏幕宽度，系统将抓取并呈现其中一张图片。

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive" >
</amp-img>
[/sourcecode]

## 使用 srcset 和 sizes

您可以使用 `srcset` 属性来控制元素根据不同的媒体表达式所用的资源。尤其是，您可以将其用于所有 [`amp-img`](/docs/reference/amp-img.html) 标记，以指定根据不同的屏幕尺寸所用的图片资源。

举一个简单的例子，您可以使用 `srcset` 指定根据屏幕宽度所用的图片。`w` 描述符可告知浏览器列表中每张图片的宽度：

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w >
</amp-img>
[/sourcecode]

**注意**：AMP 在所有浏览器上都支持 `w` 描述符。

要详细了解如何使用 `srcset` 制作自适应图片，请参阅[使用自适应图片（现在）](http://alistapart.com/article/using-responsive-images-now)一文。

您还可以将 `sizes` 属性与 `srcset` 结合使用。`sizes` 属性描述如何根据任何媒体表达式计算元素尺寸。用户代理根据相应元素计算而来的尺寸，选择由 `srcset` 属性提供的相关性最高的来源。

请查看下方示例：

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w
    sizes="(min-width: 650px) 50vw, 100vw" >
</amp-img>
[/sourcecode]

根据 `sizes` 属性的定义，当视口的宽度为 650px 或以上时，元素的宽度将为视口尺寸的 50%。例如，如果视口宽度为 800px，则元素的宽度设为 400px。然后，浏览器会假定设备的像素宽高比为 1，以此来选择接近 400px 的 `srcset` 资源（在本例中为 `narrow.jpg` (320px)）。

**重要提示**：如果指定了 sizes 属性及宽度和高度，则布局默认为 `responsive`。

要详细了解 `sizes` 和 `srcset` 属性与媒体查询之间的对比情况，请参阅这篇 [Srcset 和 sizes](https://ericportis.com/posts/2014/srcset-sizes/) 博文。

## 添加 placeholder 和 fallback

### placeholder

标记有 `placeholder` 属性的元素充当父级 AMP 元素的占位符。如果指定，则 `placeholder` 元素必须是 AMP 元素的直接子级。

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive" >
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

默认情况下，即使 AMP 元素的资源尚未下载或初始化，与该 AMP 元素对应的占位符也会立即显示。准备就绪后，AMP 元素通常会隐藏其占位符并显示相关内容。

**注意**：占位符不必是 AMP 元素；任何 HTML 元素都可充当占位符。

### fallback

您可以使用 `fallback` 属性指明浏览器不支持的任何元素的后备行为。例如，您可以使用 `fallback` 属性告知用户，浏览器不支持特定功能：

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg" >
  <div fallback>
        <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

`fallback` 属性可在任何 HTML 元素上设置，而不仅仅是 AMP 元素。如果指定，则 `fallback` 元素必须是 AMP 元素的直接子级。

### noloading

许多 AMP 元素已列入白名单，可以显示“加载指示器”，这是一个基本动画，用于表明元素尚未完全加载。只需添加 `noloading` 属性，元素即可停用此行为。
