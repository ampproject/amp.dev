---
$title: 制作自适应 AMP 网页
---

## 简介

自适应设计就是制作可根据用户需求自行调整的灵活网页（即：能够适应用户设备的屏幕尺寸和方向的网页）。通过 AMP，您可以轻松实现这一目的。AMP 支持所有的屏幕类别和设备类别，并会提供内置的自适应组件。

在本指南中，我们会向您展示如何在 AMP 中轻松实现下列自适应基本功能：

- [控制视口](#controlling-the-viewport)
- [创建自适应布局](#creating-a-responsive-layout)
- [缩放媒体](#scaling-media-for-the-page)

## 控制视口 <a name="controlling-the-viewport"></a>

要想优化网页以便内容能够自动缩放并适应任何设备的浏览器窗口，您需要指定 `meta` 视口元素。视口元素会指示浏览器如何缩放网页的可见区域（视口）以及如何调整其大小。

不过，应该使用哪些值呢？对于这个问题，AMP 中已给出明确答案。您需要指定以下视口作为 AMP 网页[必需标记](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#required-markup)的一部分：

```html
<meta name="viewport" content="width=device-width" />
```

以上是您在制作自适应网站时需指定的一般视口设置。虽然 `initial-scale=1` 并不是有效的 AMP 网页所必需的设置，我们仍想建议您指定此项，因为它会在网页首次加载时将缩放级别设为 1。

## 创建自适应布局 <a name="creating-a-responsive-layout"></a>

在自适应设计中，您可以使用 CSS [`@media`](https://developer.mozilla.org/docs/Web/CSS/@media) 查询来针对各种屏幕尺寸定制网页样式，而无需更改网页内容。在 AMP 中，您可以继续使用相同的 CSS `@media` 查询。此外，若想更精细地控制某个 AMP 元素，您可为该元素指定 `media` 属性。如果您需要根据媒体查询显示或隐藏某个元素，这项设置会特别有用。请参阅[更改图片的艺术设计](#changing-the-art-direction-of-an-image)部分，查看使用 `media` 属性的示例。

使每个元素都能根据屏幕尺寸调整大小可能会有些棘手<sup><a href="#fn1" id="ref1">\*</a></sup>。不过，在 AMP 中，您只需指定 `"layout=responsive"` 属性以及元素的 `width` 和 `height` 属性，即可轻松打造自适应元素。如果您将 `responsive` 布局应用于某个元素，该元素的宽度便会自动根据容器元素的宽度进行调整，高度则会自动根据由该元素的 `width` 和 `height` 所确定的宽高比进行调整。几乎所有 AMP 元素都支持 `responsive` 布局；要了解哪些布局受支持，请参阅相应元素的参考文档。

虽然您可以利用 `"layout=responsive"` 轻松打造自适应元素，但您仍然必须考虑元素在屏幕尺寸各异的设备（包括桌面设备和平板电脑）上的显示效果。一个比较常见的错误是让图片占满屏幕的整个宽度，这会过度拉伸图片以致于超出其目标尺寸，因此会给宽屏用户带来糟糕的体验。默认情况下，采用 `layout=responsive` 的元素会占满元素容器的整个宽度，而容器的宽度通常没有限制（即 width=100%）。所以，您只需限制图片容器的宽度，即可改善图片的显示效果。例如，通过为“body”或“main”设置“max-width”规则，您便可为所有图片指定一个具体的宽度上限。

##### 示例：限制自适应图片的宽度

在下面的示例中，我们希望在屏幕尺寸各异的设备上显示一张花卉图片（640 x 427 像素），因此我们指定了 `width` 和 `height`，并将布局设为 `responsive`。

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

不过，我们不希望过度拉伸该图片以致于超出其目标尺寸，因此我们通过自定义 CSS 将容器的 `max-width` 设为 700 像素：

```html
<style amp-custom>
  .resp-img {
    max-width: 700px;
  }
</style>
```

继续阅读: 要详细了解 AMP 中的各种不同布局，请参阅[布局和媒体查询](control_layout.md#the-layout-attribute)指南。

<a id="fn1"></a>
[tip type="note"]
**_既然借助“width=100%”样式就能轻松地使元素根据屏幕尺寸进行调整，为什么还说这有些棘手呢？_** 我们所说的棘手之处是指：怎样才能让自适应元素在网页上按预期呈现，而不会对性能指标或用户体验产生不良影响。借助“width=100%”确实能轻松地使图片适应屏幕尺寸，但会导致出现性能问题。浏览器必须先下载图片以获取图片的尺寸信息，然后才能根据屏幕尺寸相应地调整图片大小，最后还需重排并重绘网页。在 AMP 中，呈现路径已经过优化，因此系统会先展开网页，根据 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 中提供的尺寸（使用这些数值确定宽高比）为图片预留占位符，然后下载资源并绘制（无需重排）网页。
[/tip]

## 为网页缩放媒体 <a name="scaling-media-for-the-page"></a>

对于自适应设计，最大的难点可能就是如何在网页上正确显示媒体以使其能够根据屏幕特征自行调整大小。在本部分中，我们将介绍如何在 AMP 网页上嵌入自适应视频和图片。

### 嵌入视频

在网页中添加视频时，您需要确保用户能够看到视频的内容和控件（即视频不会溢出容器边缘）。通常情况下，您可通过结合使用 CSS 媒体查询、容器和其他 CSS 来实现这一目的。在 AMP 中，您只需执行以下操作即可嵌入视频：将视频元素添加到网页中，并为元素指定 `layout=responsive` - 无需使用任何额外的 CSS。

##### 示例：嵌入 YouTube 视频

在下面的示例中，我们希望展示一个能够根据设备屏幕的尺寸和方向自行调整大小的 YouTube 视频。在为 [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) 元素添加 `"layout=responsive"` 之后，该视频就会自动调整大小以适应窗口尺寸，且其宽高比会保持不变（由所指定的 `width` 和 `height` 确定）。

[example preview="top-frame" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

您可向 AMP 网页中添加很多类型的视频。有关详情，请参阅可用的[媒体组件](../../../../documentation/components/index.html)列表。

### 显示自适应图片 <a name="displaying-responsive-images"></a>

图片会占据网页的很大一部分幅面（约占[网页字节数的 65%](http://httparchive.org/interesting.php#bytesperpage)）。最起码，您的图片在各种屏幕尺寸和方向上都应处于可见状态（即用户无需滚动屏幕或张合手指便可看到完整图片）。在 AMP 中，这可通过 `"layout=responsive"` 属性轻松实现（请参阅[在 AMP 中添加图片](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)）。除了基本的自适应图片之外，您可能会想添加多种图片资源以便：

- [提供分辨率合适的清晰图片](#serving-crisp-images-for-the-right-resolution)
- [更改图片的艺术设计](#changing-the-art-direction-of-an-image)
- [提供经过优化的图片格式](#providing-optimized-images)

#### 提供分辨率合适的清晰图片 <a name="serving-crisp-images-for-the-right-resolution"></a>

对于高分辨率屏幕（如 Retina 显示屏），您应提供非常清晰的图片；但您不会想在分辨率较低的设备上使用相同的图片，因为这会不必要地延长加载时间。在非 AMP 网页和 AMP 网页中，您都可通过结合使用 `srcset` 和宽度描述符 ( `w` ) 来提供适合屏幕像素密度的正确图片。

注意: 基于 DPR (`x`) 的 srcset 选择器也适用；不过，为了实现更高的灵活性，我们建议使用 `w` 选择器。以前（在较早的 srcset 方案中），`w` 描述符描述的是视口宽度；但现在，它描述的是图片源文件的宽度。这便使得用户代理能够先计算每张图片的有效像素密度，然后再选择合适的图片予以呈现。

##### 示例：显示适合屏幕的清晰图片

在下面的示例中，我们使用的是几个宽高比相同但分辨率不同的图片文件。通过提供多张具有不同分辨率的图片，我们可让浏览器从中选择最适合设备分辨率的图片进行显示。此外，我们还指定了应以何种尺寸来呈现图片：

- 在视口宽度不超过 400 像素的情况下，以 100% 的视口宽度呈现图片。
- 在视口宽度不超过 900 像素的情况，以 75% 的视口宽度呈现图片。
- 在视口宽度超过 900 像素的所有情况下，以 600 像素的宽度呈现图片。

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="apple"
  src="{{server_for_email}}/static/inline-examples/images/apple.jpg"
  height="596"
  width="900"
  srcset="{{server_for_email}}/static/inline-examples/images/apple-900.jpg 900w,
            {{server_for_email}}/static/inline-examples/images/apple-800.jpg 800w,
            {{server_for_email}}/static/inline-examples/images/apple-700.jpg 700w,
            {{server_for_email}}/static/inline-examples/images/apple-600.jpg 600w,
            {{server_for_email}}/static/inline-examples/images/apple-500.jpg 500w,
            {{server_for_email}}/static/inline-examples/images/apple-400.jpg 400w"
  sizes="(max-width: 400px) 100vw, 
            (max-width: 900px) 75vw, 600px"
>
</amp-img>
```

[/example]

例如，假设我们的某部设备的视口宽度为 412 像素，DPR 为 2.6。根据上面的代码，图片必须以 75% 的视口宽度显示，因此浏览器会选择一张接近 803 像素 (412 _ .75 _ 2.6) 的图片，而 `apple-800.jpg` 正好符合条件。

继续阅读: 要详细了解如何在 AMP 中使用 srcset 和 sizes，请参阅[借助 srcset、sizes 和 heights 进行艺术设计](art_direction.md)指南。

#### 更改图片的艺术设计 <a name="changing-the-art-direction-of-an-image"></a>

艺术设计是指针对特定的断点调整图片的视觉特征。例如，您可能想提供一张可突显图片重点区域的剪裁版图片，或者在不同的断点处提供完全不同的图片，而不是在屏幕缩小时仅缩小图片。在 HTML 中，您可以使用 `picture` 元素来实现这一目的。在 AMP 中，您则可以使用 `media` 属性来实现艺术设计。

##### 示例：在不同的断点处显示尺寸各异的图片

在下面的示例中，我们希望在不同的断点处显示同一只猫的 3 张不同的剪裁版图片。因此：

- 如果视口宽度为 670 像素或以上，则显示 `cat-large.jpg`（650 x 340 像素）
- 如果视口宽度为 470-669 像素，则显示 `cat-medium.jpg`（450 x 340 像素）
- 如果视口宽度为 469 像素或以下，则显示 `cat-small.jpg`（226 x 340 像素）

注意: 由于我们希望图片采用固定尺寸（即不倾斜），因此没有指定布局值；但由于我们设置了宽度和高度，因此布局值将默认设为 `layout=fixed`。有关详情，请参阅[“如果没有指定 layout 属性，会怎样？”](control_layout.md#what-if-width-and-height-are-undefined)。

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="grey cat"
  media="(min-width: 670px)"
  width="650"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-large.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(min-width: 470px) and (max-width: 669px)"
  width="450"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-medium.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(max-width: 469px)"
  width="226"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-small.jpg"
></amp-img>
```

[/example]

继续阅读: 要详细了解 AMP 中的艺术设计，请参阅[借助 srcset、sizes 和 heights 进行艺术设计](art_direction.md)指南。

#### 提供经过优化的图片 <a name="providing-optimized-images"></a>

要想使网页能够快速加载，您便需要优化图片的尺寸、画质和格式。请始终都将文件大小缩减至仅能呈现可接受的最低级别画质。您可以使用各种工具来“压缩”图片（如 [ImageAlph](http://pngmini.com/lossypng.html) 或 [TinyPNG](https://tinypng.com/)）。在图片格式方面，某些图片格式的压缩能力高于其他格式（如 WebP 和 JPEG XR 高于 JPEG）。您既需要尽力为用户提供最优质的图片，也需要确保用户的浏览器支持相应的图片（[并非所有浏览器都支持所有图片格式](https://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E6%B5%8F%E8%A7%88%E5%99%A8%E6%AF%94%E8%BE%83）。

在 HTML 中，您可以使用 `picture` 标记来提供不同格式的图片。在 AMP 中，虽然 `picture` 标记不受支持，但您可以使用 `fallback` 属性来提供不同的图片。

继续阅读: 要详细了解备用行为，请参阅[占位符和备用行为](placeholders.md)指南。

##### 示例：提供不同格式的图片

在下面的示例中，如果浏览器支持 WebP，便提供 mountains.webp；否则，就提供 mountains.jpg。

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp"
>
  <amp-img
    alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"
  ></amp-img>
</amp-img>
```

[/example]

特别棒的是，某些缓存（如 Google AMP 缓存）会自动将图片压缩成 WebP 格式并将其画质转换成合适的分辨率（如果您没有这样做的话）。不过，并非所有平台都使用缓存，因此您仍应自行手动优化图片。

继续阅读: 要详细了解 Google AMP 缓存可执行的图片优化操作，请参阅[“Google AMP 缓存、AMP Lite 以及速度需求”](https://developers.googleblog.com/2017/01/google-amp-cache-amp-lite-and-need-for.html)这篇博文。

## 启发性示例

我们在下面提供了一些示例，希望它们能给您带来启发以帮助您制作自适应 AMP 网页：

#### 出色的制作成果

- [Getty Images“2016 年度图片精选”](http://www.gettyimages.com/2016/)
- [BRIT + CO 的节日礼品指南](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [《卫报》](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### AMP 项目提供的制作资源

- [Examples：示例和模板](../../../../documentation/examples/index.html)
- [模板](../../../../documentation/templates/index.html)
- [AMP Conf Workshop Codelab：如何制作精美的 AMP 网页](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)
