---
'$title': 与 AMP 集成以投放展示广告
$order: 5
description: 本指南适用于想要与 AMP 集成以向 AMP 网页投放展示广告的广告联盟。
formats:
  - ads
---

本指南适用于想要与 AMP 集成以向 AMP 网页投放展示广告的广告联盟。

## 概述

作为广告服务器，与 AMP 集成后，您不仅可以向 AMP 网页投放传统 HTML 广告，还可以投放 [AMPHTML](../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md) 广告。

##### 想要投放传统 HTML 广告？

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md)

##### 想要投放 AMPHTML 广告？

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md)（即，如果您尚未创建用于投放传统 HTML 广告的标记，则需要创建一个）。
2. [创建“快速获取”集成以投放 AMPHTML 广告](#creating-a-fast-fetch-integration)。

## 创建 `amp-ad` <a name="creating-an-amp-ad"></a>

作为广告服务器，您支持的发布商会导入您提供的 JavaScript 库，并在其网站上添加各种“广告代码段”，这些代码段要依赖该 JavaScript 库才能获取并呈现广告。AMP 不允许发布商执行任意 JavaScript，因此您需要向 AMP 开放源代码贡献代码，以允许 [`amp-ad`](../../../documentation/components/reference/amp-ad.md) 标记从您的广告服务器请求广告。

[tip type="note"] **主**：您可以使用此 [`amp-ad`](../../../documentation/components/reference/amp-ad.md) 实现来展示传统 HTML 广告**和** AMPHTML 广告。[/tip]

例如，可使用以下语法调用 Amazon A9 服务器：

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

在上面的代码中，`type` 属性会指定广告联盟，在本例中为 A9。`data-*` 属性取决于 Amazon A9 服务器投放广告要使用的参数。[`a9.js`](https://github.com/ampproject/amphtml/blob/main/ads/a9.js) 文件向您展示了如何映射参数以向 A9 服务器的网址发出 JavaScript 调用。[`amp-ad`](../../../documentation/components/reference/amp-ad.md) 标记传递的相应参数会附加到该网址上，以返回广告。

有关创建 [`amp-ad`](../../../documentation/components/reference/amp-ad.md) 集成的说明，请参阅[将广告联盟集成到 AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md)。

## 创建“快速获取”集成 <a name="creating-a-fast-fetch-integration"></a>

[快速获取](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)是一种 AMP 机制，可将广告请求与广告响应分隔开来，从而在网页生命周期早期发出广告请求，且仅在用户有可能查看广告时呈现广告。与传统 HTML 广告相比，快速获取会优先处理经过验证的 AMPHTML 广告。在快速获取过程中，如果某个广告验证失败，则该广告会被封装在一个跨网域 iframe 中，以与 AMP 文档的剩余部分隔开。相反，通过验证的 AMPHTML 广告会被直接写入网页中。快速获取会处理 AMP 广告和非 AMP 广告；无需针对验证失败的广告发出额外的广告请求。

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='“快速获取”集成流', caption='“快速获取”集成流' ) }}

要从您的广告服务器投放 AMPHTML 广告，您必须提供满足以下条件的“快速获取”集成：

1. 支持 SSL 网络通信。
2. 提供 JavaScript 以构建广告请求（示例实现：[AdSense](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-adsense-impl) 和 [DoubleClick](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-doubleclick-impl)）。
3. 通过验证服务验证广告素材并进行签名。[Cloudflare](https://blog.cloudflare.com/firebolt/) 提供 AMP 广告验证服务，使所有独立广告提供商都能提供更快速、更精简且更具吸引力的广告。

有关创建“快速获取”集成的说明，请参阅[快速获取网络实现指南](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/Network-Impl-Guide.md)。

## 相关资源

- [`amp-ad`](../../../documentation/components/reference/amp-ad.md)
- [支持的广告供应商列表](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)
- [关于推出“快速获取”功能的博文](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)
