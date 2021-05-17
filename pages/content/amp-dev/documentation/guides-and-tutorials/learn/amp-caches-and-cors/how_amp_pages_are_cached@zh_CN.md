---
'$title': '如何缓存 AMP 网页 '
$order: 0
description: 在本文档中，您将了解AMP缓存在AMP生态系统中的作用，以及如何缓存AMP页面。
formats:
  - websites
  - stories
  - ads
---

在本文档中，您将了解“AMP 缓存”在 AMP 生态系统中的角色以及 AMP 网页是如何缓存的。

## 什么是 AMP 缓存？

AMP 缓存是一种基于代理的内容传送网络 (CDN)，用于传送有效的 AMP 文档。AMP 缓存旨在：

1. 仅提供有效的 AMP 网页。
2. 让 AMP 网页能够安全且高效地预加载。
3. 对内容执行额外的性能优化措施，以提升用户体验。

[tip type =“ note”] AMP 电子邮件文档免于 AMP 缓存。 [/小费]

要想详细了解 AMP 缓存，请观看下方的 YouTube 视频，或参阅博文 [Why AMP Caches Exist](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456)。

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='观看这个视频，了解“AMP 缓存”存在的意义。']

## 可用的 AMP 缓存有哪些？

目前，有 2 个 AMP 缓存提供商：

- [Google AMP 缓存](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP 是一个开放式生态系统，AMP 项目会积极地推动开发更多 AMP 缓存。要想了解如何创建 AMP 缓存，请参阅 [AMP 缓存指南](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md)。

## 我该如何选择 AMP 缓存？

AMP 缓存不是由身为发布商的您来选择的 - 所要使用的 AMP 缓存（如果有）*实际上是由与您的内容关联的平台*选择的。

这与典型模型相反；在典型模型中，内容传送由发布商负责。但是，该模型不仅能让平台为其用户提供可预测的加载性能，还能给平台带来诸多便利，例如在 AMP 内容预呈现阶段确保满足安全性和隐私性恒定不变的要求。要了解关于创建 AMP 缓存的严格指南，请参阅 [AMP 缓存指南](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md)。

## 我能否选择停用缓存？

缓存是 AMP 生态系统的一个核心部分。发布有效的 AMP 文档时，系统会自动为该文档启用缓存传送。

如果您不想缓存自己的文档，则可从 HTML 标记中移除 `amp` 属性。这会使得该文档在技术上成为无效的 AMP 文档，同时又不影响该文档的功能。

## 谁会请求访问缓存的 AMP 网页？

缓存的 AMP 网页会被各类平台（如 Google 搜索、Google 新闻和 Bing）和移动应用访问。移动应用可通过网址（请参阅 Google 的 [AMP URL API](https://developers.google.com/amp/cache/use-amp-url)）或通过渐进式网页应用中的跨源 XHR（详情请见[嵌入 AMP 网页并将其用作数据源](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)）关联到缓存的 AMP 内容。

<amp-img src="/static/img/docs/platforms_accessing_cache.png" width="1054" height="356" layout="responsive" alt="platforms and mobile apps access cached AMP pages"></amp-img>

## 我的 AMP 网页是如何缓存的？

使用 AMP 格式即意味着 AMP 缓存可以缓存您的内容。您的 AMP 网页可通过多种方式缓存在 AMP 缓存中：

- **平台发现**：平台可通过 `<html ⚡>` 或 `<html amp>` 标记发现您的 AMP 内容，进而缓存该内容。例如，Google 搜索会抓取内容；对于任何已被识别出的有效 AMP 网页，系统都会自动将相应内容添加到 Google AMP 缓存中。

- **缓存网址请求**：平台可通过使用 AMP 缓存网址格式有针对性地请求访问某个 AMP 网页。在这种情况下，AMP 缓存便是充当了反向代理；因此，当相应平台访问该网页时，系统就会自动缓存该网页。

  - Google AMP 缓存网址示例：`https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

[tip type="note"]<strong>注意:</strong> AMP 缓存网址不是面向用户的网址，也就是说，用户通常不会通过这些网址来请求获取内容。[/tip]

- **发布商添加**：发布商可以非常明确地将 AMP 网页添加到 AMP 缓存中。此选项仅适用于 Google AMP 缓存（请参阅 [Google AMP 缓存：更新 AMP 内容](https://developers.google.com/amp/cache/update-cache)）。

## 其他资源

- [AMP 项目的 AMP 缓存指南](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md)
- [Google AMP 缓存概览](https://developers.google.com/amp/cache/overview)
- [Bing AMP Cache Documentation](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
