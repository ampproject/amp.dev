---
$title: 添加 AMP 扩展组件
---

借助 AMP 的组件系统，您可以既轻松又快速地在报道中构建高效的自适应功能。AMP HTML 库提供的 AMP 组件分为以下 3 类：

- **内置**：此类组件是指 AMP JavaScript 基础库中包含的组件（在 `<head>` 标记中指定），例如 [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) 和 [`amp-pixel`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-pixel.md', locale=doc.locale).url.path}})。这些组件可直接用于 AMP 文档中。

- **扩展**：此类组件是指相对于基础库而言的扩展功能，必须作为自定义元素明确包含在文档中。自定义元素需被包含在向 `<head>` 部分添加的具体脚本中（例如 `<script async custom-element="amp-video" ...`）。

- **实验**：此类组件是指已发布但尚不可广泛使用的组件。开发者可以选择使用这些尚未全面发布的功能。有关详情，请参阅[实验性功能]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/experimental.md', locale=doc.locale).url.path}})。

我们已在示例中使用了内置组件 [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})教程中探讨了该组件与 AMP 布局系统之间的关系。现在，我们将向新闻报道中添加一些常用的 AMP **扩展**组件。

## 通过广告获利

AMP 网页中的广告是使用 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 组件制作而成的。[`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 组件支持您从宽度、高度和布局模式等多个方面配置广告。但是，许多广告平台都要求进行额外配置，例如广告网络的帐号 ID、应投放的广告或用于定位广告的选项。您只需使用 HTML 属性，即可在 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 组件中轻松指定这些选项。

我们来看看这个 **DoubleClick** 广告示例：

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static">
</amp-ad>
```

您可以看到，该广告的配置非常简单。请注意 `type` 属性，它可告知 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 组件我们要使用哪个广告平台。在本例中，我们想使用 [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md) 平台，因此我们将 `doubleclick` 指定为该属性的值。

`data-slot` 属性比较独特。在 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 中，任何以 `data-` 开头的属性都是与特定供应商相关的属性。这意味着并非所有供应商都需要这一属性；如果提供了此属性，他们也未必全都会做出回应。我们不妨将上述 **DoubleClick** 广告示例与 [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md) 平台上的以下测试广告进行对比：

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302">
</amp-ad>
```

请尝试将上述这两个示例都**添加**到您的报道中（使它们紧跟在 `<header>` 标记后面）。**刷新**页面后，您应该会看到两个测试广告：

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='测试广告') }}

[tip type="important"]
您的开发者控制台中可能会存在一些错误，例如`Mixed Content`或 `XMLHttpRequest cannot load`。前面那个错误可能与 A9 广告相关，因为它加载的所有内容并非都是安全的。对于在 AMP 网页上投放的所有广告而言，这是一项值得注意的要求。
[/tip]

下文中的这两个 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 很好地例证了 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 组件为支持广告平台功能而提供的灵活性。在本例中，我们（使用 DoubleClick 信息中心）将两个 DoubleClick 测试广告配置为仅在某些国家/地区展示 - 第一个广告仅在英国展示，第二个广告仅在美国展示。请尝试在 AMP 文档中**添加**这两项地理位置定位广告配置（将其放在您先前添加的广告下方）：

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk">
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us">
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

**刷新**一下页面，看看效果吧。以下屏幕截图是在加拿大截取的，因此没有加载上述任一广告：

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='测试广告') }}

[tip type="note"]
您可能会注意到，这些 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 标记中有包含 `fallback` 属性的额外 `div` 标记。您能猜出 `fallback` 属性是何用意吗？它会指示 AMP 的加载系统仅在父级元素未能成功加载时显示该元素的内容。有关详情，请参阅[占位符和备用行为]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}})。
[/tip]

[tip type="read-on"]
要想查看最新的受支持广告网络，请参阅 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 组件的参考文档。
[/tip]

[tip type="note"]
AMP 文档中不得运行任何由广告网络提供的 JavaScript。不过，AMP runtime 会（通过 iframe 沙盒）将来自另一来源的 iframe 加载为 AMP 文档，并会在该 iframe 沙盒内执行相应广告网络的 JS。
[/tip]

现在，我们的 AMP 文档已包含一些文字、一张图片和一则内嵌于网页中的广告，这些都是讲述故事以及通过内容获利的关键要素。不过，新型网站往往包含更多功能，而不仅仅是图片和文字。

为了进一步优化此文档，我们将向它添加一些常见于新闻报道中的更高级网络功能，例如：

- YouTube 视频
- Twitter 微博
- 报道中的精彩语段

##  嵌入 YouTube 视频
我们来试着在此文档中嵌入一个 YouTube 视频。请在您的 AMP 文档中**添加**以下代码（使其紧跟在 `<header>` 后面，即您刚才添加的 [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) 上方）：

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270">
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

**刷新**页面。您所看到的不会是视频，而会是以下文字：“The video could not be loaded.”**

即使您的浏览器可以完全正常地显示 YouTube 视频，您仍会遇到此错误。这是为什么呢？事实上，并非是视频加载失败了，而是组件本身加载失败了。

请注意，并非所有组件都是位于 AMP 库的核心 JavaScript 文件中。我们需要为“YouTube”组件添加一项额外的 JavaScript 请求。

[tip type="note"]
如果您的开发者控制台仍处于打开状态且您的网址中仍包含 `#development=1`，此时您会看到一条 AMP 验证工具错误消息（该消息会提醒您添加 [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}) JavaScript）以及一个指向相关文档（该文档会告知您应添加哪个 `script` 标记）的链接。
[/tip]

将以下脚本**添加**到 `<head>` 标记中：

```html
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

**刷新**页面后，您应该会看到以下 YouTube 视频：

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='嵌入式 YouTube 视频') }}

与网页上的其他元素一样，我们也为该视频指定了 `width` 和 `height`，以便 AMP 布局系统计算宽高比。此外，我们还将 `layout` 设为 `responsive`，以便该视频填满其父级元素的宽度。

要想详细了解如何嵌入 YouTube 视频，请参阅 [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}})。

[tip]
如果某个组件无法正常加载或在浏览器中不受支持，请使用 [`fallback`]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}#fallbacks) 属性通知用户。
[/tip]

## 显示 Twitter 微博
嵌入已预先设定格式的 Twitter 微博是新闻报道中的一项常见功能。[`amp-twitter`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}) 组件可轻松地提供此功能。

首先，将以下 JavaScript 请求添加到文档的 `<head>` 标记中：

```html
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
```

现在，在您的报道中**添加**下述代码以嵌入 Twitter 微博：

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```

`data-tweetid` 属性是特定平台所需的自定义属性的另一个示例。在本例中，Twitter 将 `data-tweetid` 属性的值与某条特定 Twitter 微博关联起来。

**刷新**您的浏览器，然后再查看此页面。您应该会看到页面上已显示了这条 Twitter 微博：

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='嵌入式 Twitter 微博') }}

要想详细了解如何嵌入 Twitter 微博，请参阅 [`amp-twitter`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}) 组件文档。

[tip]
AMP 还提供了更多用于嵌入社交网络内容的组件。请参阅最新的 [AMP 社交组件]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}})。
[/tip]

## 突出显示报道中的精彩语段

新闻报道的一项常见功能是：突出显示报道中极具吸引力的文字片段。例如，一段引自特定来源的内容或一桩重大事件可能会以较大字体重复出现，以吸引读者注意。

但是，并非所有文字片段都具有相同的字符长度，这可能会导致难以在较大字体与相应文字所占用的网页空间量之间取得平衡。

AMP 提供了另一个组件来专门应对这种情况，即 [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) 组件。借助 [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) 组件，您可以指定一个具有固定宽度和高度的元素以及一个最大的字号。该组件会智能地调整字体大小，使其**适合**所指定的宽度和高度。

我们来试一试。首先，将该组件的库**添加**到 `<head>` 标记中：

```html
<script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
```

将以下代码添加到您的网页中：

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**刷新**页面，看看结果！

现在，我们再进一步尝试一下。如果所引用的内容很短，会出现什么情况？

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

如果所引用的内容很长呢？

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
   And the Raven, never flitting, still is sitting, still is sitting. On the pallid bust of Pallas just above my chamber door; And his eyes have all the seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming throws his shadow on the floor; And my soul from out that shadow that lies floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

作为对 [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) 的最后一次试用，请尝试创建一小段文字，例如很高（假设高度值为 400）的“Hello”，并将 max-font-size 属性值保留为 42。最终网页会是什么样子？文字会垂直居中吗？或者，[`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) 标记的高度会缩小以适应最大字号吗？根据您已了解的 AMP 布局系统相关知识，请先试着回答上述问题，然后再试用代码！

要想详细了解 [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}})，请参阅 [AMP by Example 在线演示]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-fit-text.html', locale=doc.locale).url.path}})。
