---
'$title': 优化托管的 AMP 网页
$order: 7
description: AMP 运行时的速度进行了优化，如果 AMP 网页由 AMP 缓存提供，它们将得到完全优化，并且具有最高的加载性能…
formats:
  - websites
  - stories
author: sebastianbenz
---

本指南为网站站长提供有关如何优化其托管的 AMP 网站的提示和指导。

### 默认情况下 AMP 速度不快吗？

AMP 运行时的[速度进行了优化](../../../about/how-amp-works.html)，如果您的 AMP 网页由 [AMP 缓存](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md)提供，它们将得到完全优化，并且具有最高的加载性能。例如，如果您的用户在移动设备上从 Google 搜索跳转到您的 AMP 网页，默认情况下，这些网页由 AMP 缓存提供。

但是，AMP 网页并不总是由 AMP 缓存提供。对于其他流量来源，网站可能决定在自己的服务器上显示 AMP 网页。最常见的用例是完全在 AMP 中构建的网站，例如，[tasty.co](https://tasty.co)，在这种情况下，用户直接转到该网站。另一种流量来源是 Twitter，他们[已开始链接到 AMP 网页](https://searchengineland.com/twitter-ramps-amp-278300)，而不提供标准移动版本。这意味着，如果用户在 Twitter 的其中一个移动应用中点击链接，该链接将跳转到您自己来源（如果有）上的 AMP 版本网页。

因此，您无法确保 AMP 网页总是仅由 AMP 缓存提供。如果从您自己的服务器提供 AMP 网页，重要的是确保 AMP 网页具有优异的加载性能。

默认情况下，AMP 网页加载速度很快，但您可以另外实现一些性能优化，从而帮助浏览器更快地加载 AMP 网页。本指南介绍了几项您在发布 AMP 网页时应当加以考虑的优化。但是，在开始阅读本指南之前，请确保您已了解所有[基本网络性能最佳做法](#basic-optimizations)。特别要指出的是，图片优化对加载性能影响很大。

例如，应用以下优化技术：

- 优化 AMP 运行时加载 [](#optimize-the-amp-runtime-loading)
- [预加载主图](#preload-hero-images)（图片大小/编码本身未更改）
- [优化自定义字体](#optimize-custom-fonts)（本例中为 Google Fonts）

[“景区”模板](../../../documentation/templates/index.html)的加载速度[在 3G 连接下会快两秒](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0)。

如果您想跳过详细信息，请查阅 [AMP 样板生成器](/boilerplate)，该生成器可用于生成经过优化的自定义 AMP 网页。

### 优化 AMP 运行时加载 <a name="optimize-the-amp-runtime-loading"></a>

虽然 AMP 已经严格规定了可以在 `<head>` 部分中使用的标记，但仍有优化空间。关键是在构建 `<head>` 部分时让所有阻塞呈现的脚本和自定义字体尽快加载。

以下是在 AMP 网页的 `<head>` 部分中使用标记时建议采用的顺序：

[sourcecode:html]

<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="This is the AMP Boilerplate.">
    <link rel="preload" as="script" href="https://cdn.ampproject.org/v0.js">
    <link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
    <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-experiment" src="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"></script>
    <!-- Import other AMP Extensions here -->
    <style amp-custom>
      /* Add your styles here */
    </style>
    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <link rel="canonical" href=".">
    <title>My AMP Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
[/sourcecode]

我们逐步对其进行说明：

1. 第一个标记应该是 `meta charset`，后跟其余的所有 `meta` 标记。

2. 接着，使用 `<link as=script href=https://cdn.ampproject.org/v0.js rel=preload>` 预加载 AMP 运行时 `v0.js` `<script>` 标记。AMP 运行时应当尽快开始下载，因为 [AMP 样板](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md)使用 `body { visibility:hidden }` 隐藏文档，直到 AMP 运行时已加载。预加载 AMP 运行时是告知浏览器按较高的优先级下载该脚本。请参阅[服务器端呈现](#server-side-rendering)，了解如何避免此问题。{amp-img6} {/amp-img6}

3. 如果您的页面包含延迟渲染的扩展（例如，amp-experiment、amp-dynamic-css-classes、amp-story），请预加载这些扩展，因为 AMP 运行时需要这些扩展才能渲染页面。

[sourcecode:html]

<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/amp-custom-css-0.1.js">
<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/story-1.0.js">[/sourcecode]

1. 在很多情况下，使用 [preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/) 可以加快与事先不知道完整资源网址的其他源站的连接速度，例如，在使用 Google Fonts 时：

[sourcecode:html]<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>[/sourcecode]

1. 加载 AMP 运行时：

[sourcecode:html]<script async src="https://cdn.ampproject.org/v0.js"></script>[/sourcecode]

1. 为[延迟呈现的扩展项](https://github.com/ampproject/amphtml/blob/master/src/render-delaying-services.js)（例如，[`amp-experiment`](../../../documentation/components/reference/amp-experiment.md)、[`amp-dynamic-css-classes`](../../../documentation/components/reference/amp-dynamic-css-classes.md) 和 [`amp-story`](../../../documentation/components/reference/amp-story.md)）指定 `<script>` 标记。
2. 为其余扩展项（例如，[`amp-bind`](../../../documentation/components/reference/amp-bind.md) 等）指定 `<script>` 标记。这些扩展项不会延迟呈现，因此，不应当预加载。因为它们可能会占用初始呈现的重要带宽。
3. 使用 `<style amp-custom>` 标记指定任何自定义样式。
4. 添加其他所有允许在 `<head>` 部分使用的标记。特别需要说明的是，任何外部字体均应放到最后，因为它们会阻碍呈现。
5. 最后，指定 [AMP 样板代码](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md)。将样板代码放到最后，它会阻止自定义样式意外替换样板 CSS 规则。

[tip] AMP 缓存会自动执行上述所有优化（以及另外几项优化）。可以使用 AMP Optimizer 工具在您自己的来源上自动执行这些优化。[/tip]

### 预加载主图 <a name="preload-hero-images"></a>

[AMP HTML 使用自己的图片元素 `amp-img`](../../../documentation/components/reference/amp-img.md)。与传统 HTML `img` 标记相比，虽然 [`amp-img`](../../../documentation/components/reference/amp-img.md) 具有许多优势，但有一个不足，那就是必须先加载 AMP 运行时，然后才能开始下载图片。对于某些图片（例如，用于产品页面的主图）来说，尽快加载图片至关重要。在这种情况下，最好预加载图片，以确保浏览器尽快开始下载图片，而不需要等到 AMP 运行时加载完成。

[sourcecode:html]

<head>
  <link rel="preload" href="/images/elephants.png" as="image">
</head>
<body>
  ...
  <amp-img width="404" height="720" layout="responsive"
           src="/images/elephants.png" alt="..." >
  </amp-img>
</body>
[/sourcecode]

不过，如果根据屏幕宽度您的自适应布局需要不同的主图，应该怎么办？例如，宽幅图片用于桌面设备，窄幅图片用于移动设备，如下所示：

[sourcecode:html]
<amp-img width="404" height="720"
    alt="..." layout="responsive"
    src="/images/elephants_narrow.png"
    media="(max-width: 415px)">
</amp-img>
<amp-img height="720"
    alt="..." layout="fixed-height"
    src="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
</amp-img>
[/sourcecode]

好消息是 `link rel=preload` 也支持媒体查询。因此，我们可以在预加载语句中使用相同的媒体查询，具体如下所示：

[sourcecode:html]

<link rel="preload" as="image"
    href="/images/elephants_narrow.png"
    media="(max-width: 415px)">
<link rel="preload" as="image"
    href="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
[/sourcecode]

顺便说一下，相同的方式也适用于 [`amp-video`](../../../documentation/components/reference/amp-video.md) 海报图片：

[sourcecode:html]

<link rel="preload" href="/images/poster.jpg" as="image">
...
 <amp-video width="480" height="270" src="elephant.mp4"
             poster="/images/poster.jpg"
             layout="responsive">
     ...
</amp-video>
[/sourcecode]

只需确保将预加载语句放在视口声明*之后*，因为浏览器需要视口尺寸才能确定屏幕宽度：

[sourcecode:html]

<meta name="viewport" content="width=device-width">
...
<link rel="preload" media="(max-width: 415px)" ...>
[/sourcecode]

[tip type="important"] 请仅预加载重要图片，否则，下载图片可能会占用下载其他重要内容所需的带宽。[/tip]

### 考虑使用 Service Worker

由于所有[主流浏览器均支持 Service Worker](https://caniuse.com/#feat=serviceworkers)，建议您评估在网站上添加 Service Worker 是否有意义。

我们知道可以使用两种不同的架构模式来实现快速可靠的浏览：

- 对于单页应用：App Shell 模型（在称为 [AMP-in-PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md) 的 AMP 情境中使用）。此模式要求 Service Worker 将 AMP 文档升级到 App Shell 的 PWA 体验。
- 对于多页应用：[流式传输组合资源](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses)。Service Worker 缓存静态页眉和页脚，并在加载内容时使用流立即返回缓存的部分响应。

如果未使用上述任何一种模式，并且无法缓存整个网站（仅适用于非常小的网站），Service Worker 可能会[对性能造成负面影响](https://developers.google.com/web/updates/2017/02/navigation-preload)。在这种情况下，最好**不**使用 Service Worker。

但是，如果您希望网站[可在主屏幕上进行安装](https://developers.google.com/web/fundamentals/app-install-banners/)，或者想要提供离线体验，则需要使用 Service Worker。在这种情况下，重要的是使用[浏览预加载](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw)来减少可能的停机（注：目前只有 Chrome 支持浏览预加载）。

如果您的 AMP 网站使用 Service Worker，请遵守以下最佳做法：

- 预缓存 [AMP 运行时](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime)和扩展项（例如 [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md)）。
- 预缓存在大部分网页上使用的徽标、字体和其他静态内容。
- 使用 [cache-first strategy](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) 提供徽标、字体和图片。
- 使用 [stale-while-revalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) 策略提供 AMP 运行时和扩展项。
- 对浏览请求使用网络优先策略时，确保启用[浏览预加载](https://developers.google.com/web/updates/2017/02/navigation-preload)。

如果您正在寻找一种在 AMP 网站中开始使用 Service Worker 的方式，请参阅此[示例](https://www.google.com/url?q=https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449&sa=D&ust=1529413323498000&usg=AFQjCNE4fepX-hqVeRBW8df43uV5Bi4Llg)，其中介绍的 Service Worker 实现了所有这些最佳做法。

[tip type="note"] 为了确保快速提供更新，AMP 运行时的最长运行时间仅为 50 分钟。为了避免浏览器缓存可能缺失的情况，建议通过 Service Worker 提供 AMP 运行时。[/tip]

预缓存不仅与从缓存的 AMP 网页过渡到您自己来源的非 AMP 网页相关，而且还与从缓存的 AMP 网页过渡到您自己来源的 AMP 网页相关。原因是，AMP 缓存会将长期有效的网址中的 AMP 运行时网址重新写入最新发布版本，例如：

`https://cdn.ampproject.org/v0.js` -> `https://cdn.ampproject.org/rtv/001515617716922/v0.js`.

结果是，从您自己的来源提供的 AMP 网页不会从浏览器缓存中获益，此时必须重新下载（未进行版本控制的）AMP 运行时。借助 Service Worker，可以预缓存未进行版本控制的 AMP 运行时，并加快过渡速度。要详细了解 AMP 缓存对 AMP 运行时网址进行版本控制的原因，请参阅[本文档](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer##versioned-amp-runtime)。

[tip type="note"] 在 Safari 中，Service Worker 的实现方式存在关键区别 -- 如果网页由 AMP 缓存提供，则无法在 Safari 中为您的来源安装 Service Worker。[/tip]

### 优化自定义字体 <a name="optimize-custom-fonts"></a>

在 AMP 中，您可以从以下几个方面来优化字体加载（[大部分方面实际上并不是 AMP 特有的](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)）：

- 尽可能使用 [font-display: optional](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)：仅当缓存中已经有相应字体时，此标记才会使用该字体；如果尚未加载自定义字体，此标记会改用系统字体。
- 优化网络字体（例如，使用 WOFF2 支持自定义字体）。
- 预加载自定义字体：

[sourcecode:html]

<link rel="preload" as="font" href="/bundles/app/fonts/helveticaneue-roman-webfont.woff2" >[/sourcecode]

- 如果使用的是 Google 字体，或者任何其他含有未知字体网址的字体提供者，请预连接相应的字体服务器：

[sourcecode:html]

 <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
[/sourcecode]

最后但同样重要的是，尽量减少在网页上使用自定义字体的数量。如果可以，请使用系统字体代替自定义字体，因为系统字体会让网站适合用户的操作系统，并且有助于避免加载更多的资源。

### 服务器端呈现 AMP 布局 <a name="server-side-rendering"></a>

服务器端呈现 AMP 布局是一项可供 AMP 缓存用来进一步缩短加载时间的技术。借助服务器端呈现，可以移除 AMP 样板，从而在不运行 AMP 运行时 JavaScript 的情况下显示 AMP 文档。例如，服务器端呈现的 AMP 样板生成器版本的[呈现速度是正常 AMP 版本的两倍](https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&thumbSize=200&ival=500&end=visual)！

如果要发布 AMP 网页，应当明确考虑使用 [AMP Optimizer](amp-optimizer-guide/index.md)。借助 AMP Optimizer，可以从包含服务器端呈现的 AMP 布局的后端提供优化的 AMP 网页。此外，AMP Optimizer 还会自动执行本文所述的许多其他优化。

### 基本优化 <a name="basic-optimizations"></a>

网络性能优化的所有基本知识当然也适用于 AMP 网页：

- [优化图片](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)和视频。图片优化对加载性能的影响很大。
- [压缩和缩小 CSS 与 HTML](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer)。由于 AMP 网页中的所有 CSS 均采用内嵌方式，建议使用 [purifycss](https://github.com/purifycss/purifycss) 等功能将未使用的 CSS 剔除掉。
- 使用 [HTTP 缓存](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- 等等
