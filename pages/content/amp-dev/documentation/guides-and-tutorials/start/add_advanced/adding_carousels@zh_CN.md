---
'$title': 添加轮换展示内容
$order: 3
description: 移动版网页中的另一项常见功能是轮换展示。使用 amp-carousel 组件，您可以轻松地向 AMP 网页添加轮换展示内容。
---

移动版网页中的另一项常见功能是轮换展示。使用 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 组件，您可以轻松地向 AMP 网页添加轮换展示内容。我们先来看一个简单的示例，例如图片轮播界面。

## 简单的图片轮播界面

请务必添加 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 组件库。为此，您需要将以下 JavaScript 请求**添加**到您文档的 `<head>` 标记中：

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
```

接着，使用自适应布局和预定义的宽度与高度嵌入一组图片以进行简单的轮换展示。请将以下代码段**添加**到您的网页中：

```html
<amp-carousel layout="fixed-height" height="168" type="carousel">
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**刷新**网页后，您应该看到如下所示的轮换展示：

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='简单的图片轮播界面') }}

您可以通过各种方式配置 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 组件。在此示例中，我们将界面改为一次仅显示 1 张图片，并将轮换展示内容的布局设为自适应。

为此，我们需要先将 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 的 `type` 从 `carousel` **更改**为 `slides`，将 `layout` **更改**为 `responsive`，并将 `width` **设置**为 300（请确保已定义 `height` 和 `width`）。然后，将 `"layout=responsive"` 属性**添加**到 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 的各个 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 子级中。

**重新加载**您的网页。现在，您看到的便不再是一系列滚动展示的元素，而是一次只能看到 1 个元素。沿水平方向**滑动**手指即可浏览下一个元素。滑动到第三个元素后，您将无法再滑动。

接下来，**添加** `loop` 属性。**刷新**网页后立即尝试向左滑动手指。轮换展示内容即会无休止地循环展示。

最后，让此轮换展示以每 2 秒轮换 1 次的速度自动播放。为此，我们需要向 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 中**添加** `autoplay` 属性以及值为 `2000` 的 `delay` 属性（即 `delay="2000"`）。

最终的结果应该大致如下所示：

```html
<amp-carousel
  layout="responsive"
  width="300"
  height="168"
  type="slides"
  autoplay
  delay="2000"
  loop
>
  <amp-img
    src="mountains-1.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-2.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-3.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
</amp-carousel>
```

**刷新**网页即可开始轮换展示！

[tip type="note"] <strong>注</strong>：您可能已经注意到，当 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 的类型为 `carousel` 时，我们使用了 `fixed-height` 这种布局类型。`carousel` 类型支持的布局类型非常有限；例如，`carousel` 类型不支持 `responsive` 布局。顾名思义，固定高度的元素会占用可用的空间，但高度保持不变。对于这类元素，您必须定义 `height` 属性，同时还应将 `width` 属性设为 `auto` 或不予设置。[/tip]

## 混合轮换展示内容

图片轮播界面看起来非常不错，但如果我们想让轮换展示中出现更复杂的内容，该怎么办呢？现在，我们就尝试通过将一则广告、一些文字和一张图片都放置在同一个轮换展示中，把不同的内容组合到一起。[`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 真的能同时处理好这种组合中的所有内容吗？当然能！

首先，将下述样式**添加**到您的 `<style amp-custom>` 中，以确保 [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) 和 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 组件可以同时正常运行：

```css
amp-fit-text {
  white-space: normal;
}
```

现在，将您的简单轮换展示内容**替换**为以下内容：

```html
<amp-carousel layout="fixed-height" height="250" type="carousel">
  <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

  <amp-ad
    width="300"
    height="250"
    type="doubleclick"
    data-slot="/35096353/amptesting/image/static"
  >
    <div placeholder>This ad is still loading.</div>
  </amp-ad>

  <amp-fit-text width="300" height="250" layout="fixed">
    Big, bold article quote goes here.
  </amp-fit-text>
</amp-carousel>
```

**刷新**网页后，您应该会看到大致如下所示的内容：

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='混合内容轮换展示') }}

要想了解详情，请参阅 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 组件参考文档。

[tip type="note"] <strong>注</strong>：在最后一个示例中，您可能已经注意到，[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) 组件包括一个属性为 `placeholder` 的子级 `div` 元素。在本教程中，我们曾遇到过一个类似情形（[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) 使用 `fallback`）。placeholder 与 fallback 有什么区别呢？`fallback` 元素会在父元素加载失败（即没有可用广告）时代替显示，`placeholder` 元素则会在父元素正在加载时将其代替。从某种意义上说，这些元素标志着父元素加载过程的开始和结束。要想了解详情，请参阅[占位符和后备](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)指南。[/tip]
