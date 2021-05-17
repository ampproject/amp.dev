---
$title: 将您的技术与 AMP 集成
---

发布商已创建超过 14 亿个 AMP 文档，这些文档托管在超过 75 万个唯一网域上。如果没有已与 AMP 集成的 100 多家第三方技术公司提供大力支持，这样的增长幅度是不可能实现的。

如果您是以网上发布商或广告主为服务对象的技术提供商，我们诚邀您添加对 AMP 的支持，以便您的客户既能继续利用您的技术，又能助力我们实现打造更好的网络环境这一共同愿景。

您可通过下述 4 种主要方法与 AMP 集成：

## 1. 添加对 amp-analytics 扩展组件的支持
AMP 分析可让您根据自己配置的触发条件将事件发送回服务器。我们编写了一份[分析集成指南](../../../guides-and-tutorials/optimize-measure/configure-analytics/index.md)来帮助您着手使用这款组件。

如果您只是需要向跟踪网址中添加包含动态参数的跟踪像素，请查看 [`amp-pixel`](../../../components/reference/amp-pixel.md)。请务必在您的支持页面上阐明相关用法，以供可能需要将您的技术和 AMP 结合使用的开发者参考。

目前已有超过 20 家分析服务提供商添加了对 [`amp-analytics`](../../../components/reference/amp-analytics.md) 的支持。敬请查看分析提供商 [Parse.ly](https://www.parsely.com/help/integration/google-amp/) 的一个[提取请求示例](https://github.com/ampproject/amphtml/pull/1595)。

## 2. 使用 amp-ad 扩展组件

[`amp-ad`](../../../components/reference/amp-ad.md) 扩展组件专用于在 AMP 网页上投放展示广告。目前已有超过 90 家广告技术提供商添加了对 AMP 的支持。要开始使用这款组件，请先通过阅读[`amp-ad`](../../../components/reference/amp-ad.md)比较有用，具体取决于贵公司提供的广告技术。

目前已有超过 90 家广告技术提供商添加了对广告相关功能（如 [`amp-ad`](../../../components/reference/amp-ad.md) 的支持。敬请查看广告网络 [Criteo](https://github.com/ampproject/amphtml/blob/main/ads/criteo.md) 的一个[提取请求示例](https://github.com/ampproject/amphtml/pull/2299)。

## 3. 使用 amp-call-tracking 扩展组件

如果您提供来电跟踪衡量服务，则可通过 [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md) 这款新扩展组件来支持您的用例。此组件会执行 CORS 请求来动态替换超链接中的电话号码，从而启用来电跟踪。

要详细了解此组件是否适合您，请查看 [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md)。

## 4. 添加新的扩展组件/内嵌组件

如果您的用例无法通过使用 [`amp-analytics`](../../../components/reference/amp-analytics.md) [`amp-pixel`](../../../components/reference/amp-pixel.md) 或 [`amp-ad`](../../../components/reference/amp-ad.md) 来实现，请开设一个 [GitHub 问题](https://github.com/ampproject/amphtml/issues/new)以探讨替代方案。欢迎大家踊跃贡献可被众多不同公司广泛采用的新扩展组件。有关详情，请参阅[贡献扩展组件](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md#contributing-extended-components)部分。

## 5. 使用 amp-iframe

等一下 - 还有第 5 种方法？嗯，确实有，但我们建议您仅在万不得已时才使用该方法。如果以上方法都不符合您的需求，您可以使用通用的 [`amp-iframe`](../../../components/reference/amp-iframe.md)  标记来允许发布商嵌入您的内容，但由于该方法有几项与性能和用户体验相关的缺陷（详情请见[此处](../../../components/reference/amp-iframe.md).url.path}}) .html#guideline:-prefer-specific-amp-components-to-[`amp-iframe`](../../../components/reference/amp-iframe.md))），这样做会带来不少弊端。

## 总结

要开始将您的技术与 AMP 集成，请先阅读我们的[第三方开发者指南](https://github.com/ampproject/amphtml/blob/main/3p/README.md)。虽然 AMP 项目现已支持各种各样的第三方用例，但我们知道还有一些网络功能尚待开发。

例如，动态来电跟踪即是 AMP 中尚未支持的一个用例，但我们正在[积极地与社区合作](https://github.com/ampproject/amphtml/issues/5276)来添加这项支持。

如果您有任何问题或建议，欢迎随时[提出问题](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md#filing-issues)或通过我们的任一[讨论渠道](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md#discussion-channels)与我们联系。

## 其他资源

- [AMP 项目网站](https://amp.dev/)
- [AMP GitHub 项目](https://github.com/ampproject/amphtml)
- [AMP 博客](https://blog.amp.dev/)
- [AMP 项目蓝图](/content/amp-dev/community/roadmap.html)
