---
$title: 布局和媒体查询
---

AMP 不仅同时支持**媒体查询**和**元素查询**，还内置了强大的功能来控制各个元素的**布局**。与仅使用 CSS 相比，使用 `layout` 属性可以更轻松地处理和创建完全自适应的设计。

## 轻松创建自适应图片

您可通过以下方法创建自适应图片：指定 `width` 和 `height`，将布局设为 `responsive`，
然后利用 [`srcset`](art_direction.md)
指明在不同尺寸的屏幕上应使用的图片资源：

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

[`amp-img`](../../../../documentation/components/reference/amp-img.md) 元素
会自动适应其容器元素的宽度，
并会根据由指定宽度和高度确定的宽高比
自动调整自身的高度。您可通过调整此浏览器窗口的大小来试用一下该功能：

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

[tip type="success"]

查看并排显示的 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 在线演示：[AMP By Example 上的在线演示](../../../../documentation/examples/documentation/amp-img.html)。

[/tip]

## layout 属性 <a name="the-layout-attribute"></a>

通过 `layout` 属性，您能够按元素轻松控制
元素在屏幕上的呈现方式。虽然其中的很多操作也可完全靠 CSS 来完成，但
难度更大，而且需要大量技巧。因此，请改用 `layout` 属性。

### `layout` 属性支持的值

您可在 `layout` 属性中使用以下值：

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-thirty">布局类型</th>
      <th data-th="Width/height required" class="col-twenty">是否要指定<br>宽度/高度</th>
      <th data-th="Behavior">行为</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type"><code>nodisplay</code></td>
      <td data-th="Description">否</td>
      <td data-th="Behavior">元素不会显示。该布局可应用于每个 AMP 元素。相应组件不会占用任何屏幕空间，就如同未设置任何显示样式一般。该布局假设元素能够在用户操作时自行显示。例如 <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>。</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed</code></td>
      <td data-th="Description">是</td>
      <td data-th="Behavior">元素有固定的宽度和高度，不支持任何自适应功能。其中，<a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> 和 <a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a> 元素是例外。</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>responsive</code></td>
      <td data-th="Description">是</td>
      <td data-th="Behavior">元素会自动适应其容器元素的宽度，并会根据由宽度和高度属性确定的宽高比自动调整自身的高度。该布局对大多数 AMP 元素都很适合，包括 <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> 和 <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>。可用空间取决于父级元素，且可使用 <code>max-width</code> CSS 进行自定义。<p><strong>注意</strong>：采用 <code>"layout=responsive"</code> 的元素没有固有尺寸。元素的尺寸由其容器元素确定。要想确保 AMP 元素能正常显示，您必须为容器元素指定宽度和高度。请勿为容器元素指定 <code>"display:table"</code>，因为这会覆盖 AMP 元素的显示，导致 AMP 元素不可见。</p></td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed-height</code></td>
      <td data-th="Description">仅高度</td>
      <td data-th="Behavior">元素会占用为其提供的空间，但高度保持不变。这种布局非常适合 <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a> 等涉及水平放置内容的元素。<code>width</code> 属性要么不指定，要么必须设为 <code>auto</code>。</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fill</code></td>
      <td data-th="Description">否</td>
      <td data-th="Behavior">元素会占用为其提供的空间，宽度和高度均会填满。换言之，相应填充元素的布局会与其父级一致。若想让某个填充元素填满其父级容器，请确保父级容器指定了 `position:relative` 或 `position:absolute`。</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>container</code></td>
      <td data-th="Description">否</td>
      <td data-th="Behavior">元素会让其子级定义其尺寸，非常类似于普通 HTML <code>div</code>。此组件被假定为自身没有明确的布局，仅充当容器。其子级会立即呈现。</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>flex-item</code></td>
      <td data-th="Description">否</td>
      <td data-th="Behavior">如果父级为灵活容器（即 <code>display:flex</code>），则元素及其父级中的其他元素会占用此父级容器的剩余空间。元素尺寸由父级元素和父级内其他元素的数量确定（根据 <code>display:flex</code> CSS 布局）。</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>intrinsic</code></td>
      <td data-th="Description">是</td>
      <td data-th="Behavior">元素会占用为其提供的空间，并会根据由 <code>width</code> 和 <code>height</code> 属性确定的宽高比自动调整自身的高度，<em></em>直到达到该元素的自然尺寸或 CSS 上限（例如 max-width）。必须指定宽度和高度属性。这种布局非常适合大多数 AMP 元素，包括 <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>、<a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a> 等等。可用空间取决于父级元素，也可使用 <code>max-width</code> CSS 进行自定义。这种布局与 <code>responsive</code> 布局的不同之处在于：具有固有高度和宽度。这一差异在浮动元素中表现得最为明显：<code>responsive</code> 布局会呈现 0x0，而 <code>intrinsic</code> 布局会不断扩大直至达到其自然尺寸或任何 CSS 上限（取较小者）。</td>
    </tr>
  </tbody>
</table>

### 如果未定义宽度和高度，会怎样？ <a name="what-if-width-and-height-are-undefined"></a>

在少数情况下，如果未指定 `width` 或 `height`，
AMP runtime 会将这些值默认如下：

* [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)：宽度和高度均默认为 0。
* [`amp-audio`](../../../../documentation/components/reference/amp-audio.md)：根据浏览器推断出默认宽度和高度。

### 如果未指定 <code>layout</code> 属性，会怎样？<a name="what-if-the-layout-attribute-isnt-specified"></a>

如果未指定 <code>layout</code> 属性，AMP 会尝试推断或猜测
相应值：

<table>
  <thead>
    <tr>
      <th data-th="Rule">规则</th>
      <th data-th="Inferred layout" class="col-thirty">推断的布局</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule"><code>height</code> 已指定，且 <code>width</code> 未指定或已设为 <code>auto</code></td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code> 或 <code>height</code> 属性已指定，且 <code>sizes</code> 属性也已指定</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code> 或 <code>height</code> 属性已指定</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code> 和 <code>height</code> 均未指定</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## 使用媒体查询

### CSS 媒体查询

您可像在其他任何网站上一样，使用 [`@media`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media)
控制网页布局的外观和行为。
如果浏览器窗口改变了尺寸或方向，
系统就会重新评估媒体查询，
并会根据所得出的新结果来隐藏和显示各元素。

[tip type="read-on"]

要详细了解如何通过应用媒体查询来控制布局，请参阅[将 CSS 媒体查询用于自适应设计](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=zh-CN)。

[/tip]

### 元素媒体查询 <a name="element-media-queries"></a>

AMP 中另外一种可用于自适应设计的功能是 `media` 属性。
该属性可在任何 AMP 元素中使用；
它的工作方式类似于全局样式表中的媒体查询，
不过它只影响单一网页中的具体元素。

例如，我们有 2 张图片，它们的媒体查询互斥。

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="527"
    height="355"
    layout="responsive">
</amp-img>
[/sourcecode]

系统会根据屏幕宽度抓取并呈现其中一张图片。

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="466"
    height="193"
    layout="responsive">
</amp-img>
[/sourcecode]
