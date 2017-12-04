---
$title: 布局和媒体查询
---

[TOC]

 AMP 不仅同时支持**媒体查询**和**元素查询** ，还内置强大的功能来控制各个元素的**布局** 。相较于单独使用 CSS，借助 `layout` 属性可以更轻松地使用和创建完全自适应的设计。

## 轻松创建自适应图片

 您可以通过以下方法创建自适应图片 - 指定 `width` 和 `height`，将布局设置为 `responsive`，然后使用 [`srcset`](/zh_cn/docs/guides/responsive/art_direction.html) 指定不同的屏幕尺寸下使用哪个图片素材资源：

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

`amp-img` 元素会自动适应其容器元素的宽度，其高度会根据由指定宽度和高度确定的宽高比自动设定。您可以调整此浏览器窗口的大小，试一试这个功能：

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

{% call callout('提示', type='success') %}
 请参阅我们关于 `amp-img` 基本示例和高级示例的实际演示：[实际演示](https://ampbyexample.com/components/amp-img/)
 {% endcall %}

## layout 属性

使用 `layout` 属性，您能够按元素轻松控制元素在屏幕上的呈现方式。单独使用 CSS 也可实现这些目的，但难度更大，而且需要大量技巧。因此，请改用 `layout` 属性。

### `layout` 属性支持的值

`layout` 属性中可使用以下值：

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-twenty">布局类型</th>
      <th data-th="Width/height required" class="col-twenty">是否要求指定宽度/高度</th>
      <th data-th="Behavior">行为</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>nodisplay</code></td>
      <td data-th="Description" class="col-twenty">否</td>
      <td data-th="Behavior"> 元素不显示。该布局可应用于每个 AMP 元素。组件不占用任何屏幕空间，如同没有显示样式一般。假定元素能够在用户执行操作时自行显示，例如，<a href="/zh_cn/docs/reference/extended/amp-lightbox.html"> <code>amp-lightbox</code></a>。</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fixed</code></td>
      <td data-th="Description" class="col-twenty">是</td>
      <td data-th="Behavior"> 元素有固定的宽度和高度，不支持任何自适应功能。其中，<a href="/zh_cn/docs/reference/amp-pixel.html"><code>amp-pixel</code></a>  和<a href="/zh_cn/docs/reference/extended/amp-audio.html"> <code>amp-audio</code></a> 元素例外。</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>responsive</code></td>
      <td data-th="Description" class="col-twenty">是</td>
      <td data-th="Behavior"> 元素的宽度根据其容器元素的宽度进行调整，高度则根据由宽度和高度属性确定的宽高比自动重新调整。这种布局非常适合大多数 AMP 元素，包括<a href="/zh_cn/docs/reference/amp-img.html"> <code>amp-img</code></a>,<a href="/zh_cn/docs/reference/amp-video.html"> <code>amp-video</code></a>。可用空间取决于父级元素，且可使用 <code>max-width</code> CSS 进行自定义。</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fixed-height</code></td>
      <td data-th="Description" class="col-twenty">仅高度</td>
      <td data-th="Behavior"> 元素会占用为其提供的空间，但高度保持不变。这种布局非常适合<a href="/zh_cn/docs/reference/extended/amp-carousel.html"> <code>amp-carousel</code></a>  等涉及水平放置内容的元素。 <code>width</code>  属性要么不指定，要么必须设为 <code>auto</code>。</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fill</code></td>
      <td data-th="Description" class="col-twenty">否</td>
      <td data-th="Behavior">元素会占用为其提供的空间（包括宽度和高度。换言之，填充元素的布局与其父级匹配。</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>container</code></td>
      <td data-th="Description" class="col-twenty">否</td>
      <td data-th="Behavior"> 元素会让其子级定义自己的尺寸，非常类似于普通 HTML <code>div</code>。假定组件自身没有特定布局，仅充当容器。其子级会立即呈现。</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>flex-item</code></td>
      <td data-th="Description" class="col-twenty">否</td>
      <td data-th="Behavior"> 如果父级是灵活容器（也就是说 <code>display:flex</code>，则元素和其父级内的其他元素会占用此父级容器的剩余空间。该元素尺寸由父级元素和父级元素内其他元素的数量确定（按照 <code>display:flex</code> CSS 布局。</td>
    </tr>
  </tbody>
</table>

### 如果未定义宽度和高度，会怎样？

在少数情况下，如果未指定 `width` 或 `height`，AMP 运行时系统会将这些值默认如下：

* [`amp-pixel`](/zh_cn/docs/reference/amp-pixel.html)：宽度和高度均默认为 0。
* [amp-audio](/zh_cn/docs/reference/extended/amp-audio.html)：从浏览器推断出默认宽度和高度。

###  如果未指定 <code>layout</code> 属性，会怎样？

 如果未指定 <code>layout</code> 属性，则 AMP 会尝试推断或猜测相应的值：

<table>
  <thead>
    <tr>
      <th data-th="Rule">规则</th>
      <th data-th="Inferred layout" class="col-thirty">推断的布局</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule"><code>height</code>  已指定，而 <code>width</code>  未指定或设为 <code>auto</code></td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code>  或 <code>height</code>  属性已指定，且 <code>sizes</code> 属性也已指定</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code>  或<code>height</code> 属性已指定</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code>  和 <code>height</code> 均未指定</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## 使用媒体查询

### CSS 媒体查询

 使用 [`@media`](https://developer.mozilla.org/es_us/docs/Web/CSS/@media) 来控制网页布局的外观和行为，就像在其他任何网站上一样。当浏览器窗口改变尺寸或屏幕方向时，媒体查询会重新接受评估，而元素则会根据新的结果隐藏和显示。

{% call callout('提示', type='success') %}
 要详细了解如何通过应用媒体查询来控制布局，请参阅[使用 CSS 媒体查询实现自适应功能](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en)一文。{% endcall %}

### 元素媒体查询

AMP 中另外一种用于自适应设计的功能是 `media` 属性。该属性可在所有 AMP 元素中使用；其工作方式类似于全局样式表中的媒体查询，但只影响单个网页中的特定元素。

举例来讲，我们有 2 张图片，这 2 张图片的媒体查询互斥。

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive">
</amp-img>
[/sourcecode]

根据屏幕宽度，系统会抓取并呈现其中一张图片。

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive">
</amp-img>
[/sourcecode]

