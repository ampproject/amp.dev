---
'$title': 将广告技术集成到 AMP 中
$order: 3
formats:
  - ads
teaser:
  text: 如果您是一家想要与 AMP HTML 集成的广告技术提供商，请参阅以下准则。
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

如果您是一家想要与 AMP HTML 集成的广告技术提供商，请参阅以下准则。为了确保最大程度降低延迟并提高质量，请先按照[此处](https://github.com/ampproject/amphtml/blob/master/ads/../3p/README.md#ads)列出的说明操作，然后再将拉取请求提交到 AMP 开放源代码项目。有关如何开始为 AMP 做贡献的常规指导，请参阅 [CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/ads/../CONTRIBUTING.md)。

## 广告服务器 <a name="ad-server"></a>

_示例：DFP、A9_

作为广告服务器，您支持的发布商会添加您提供的 JavaScript 库，并且会设置各种“广告摘要”，这些摘要依赖 JavaScript 库来提取广告并在发布商的网站上呈现广告。

由于 AMP 不支持发布商执行任意 JavaScript，您需要为 AMP 开放源代码贡献内容，这样，`amp-ad` 标记才能从广告服务器请求广告。

例如，可以使用以下语法调用 Amazon A9 服务器：

[sourcecode:html]
<amp-ad
width="300"
height="250"
type="a9"
data-aax_size="300x250"
data-aax_pubname="test123"
data-aax_src="302"

> </amp-ad>
> [/sourcecode]

请注意，`type` 后面的任何属性都与 Amazon A9 服务器在投放广告时所需的参数相关。[a9.js](https://github.com/ampproject/amphtml/blob/master/ads/./a9.js) 文件显示了这些参数与发出 JavaScript 调用之间的映射关系，JavaScript 调用通过网址 `https://c.amazon-adsystem.com/aax2/assoc.js` 调用 A9 服务器。AMP 广告代码传递的相应参数将附加到该网址，以返回广告。

有关如何将您的广告联盟与 AMP 集成的详细信息，请参阅[将广告联盟集成到 AMP 中](https://github.com/ampproject/amphtml/blob/master/ads/README.md)。

## 供应方平台 (SSP) 或 Ad Exchange <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

_示例：Rubicon、Criteo OR Appnexus、Ad-Exchange_

作为销售方平台，如果您希望直接从发布商的网页上被调用，则需要按照上述与广告服务器集成的相关说明进行操作。将您自己的 `type` 值添加到 amp-ad 标记后，可以直接向发布商分发您的标记，这样，发布商便可将您的标记直接插入其 AMP 网页。

更为普遍的情况是，SSP 与发布商一起在广告服务器中传送 SSP 的广告代码。在这种情况下，请确保您的脚本在广告服务器的广告素材中所加载的全部素材资源均通过 HTTPS 进行投放。某些广告格式（例如，展开式广告）存在一定的限制，因此，我们建议您测试发布商最常投放的广告素材格式。

## 广告代理机构 <a name="ad-agency"></a>

_示例：Essence、Omnicom_

与发布商一起确保您开发的广告素材符合 AMP 的要求。由于所有广告素材均会投放到 iframe 中，而 iframe 的大小在调用广告时已经确定下来，因此，请确保广告素材不会尝试修改 iframe 的大小。

请确保使用 HTTPS 请求广告素材中的所有素材资源。目前，某些广告格式不完全受支持，因此，我们建议在 AMP 环境中对广告素材进行测试。不完全受支持的广告格式示例包括：富媒体展开式广告、插页式广告、网页级广告。

## 视频播放器 <a name="video-player"></a>

_示例：Brightcove、Ooyala_

常规 HTML 网页中的视频播放器无法在 AMP 中运行，因此，必须创建允许 AMP 运行时加载您的播放器的特定标记。Brightcove 创建了自定义标记 [amp-brightcove](https://github.com/ampproject/amphtml/blob/master/extensions/amp-brightcove/amp-brightcove.md)，用于在 AMP 网页中播放媒体和广告。

Brightcove 播放器的调用方式如下：

[sourcecode:html]
<amp-brightcove
data-account="1290862519001"
data-video-id="ref:amp-docs-sample"
data-player="S1Tt8cgaM"
layout="responsive"
width="480"
height="270"

> </amp-brightcove>
> [/sourcecode]

有关如何开发 Brightcove 等 amp 标记的说明，请参阅[此拉取请求](https://github.com/ampproject/amphtml/pull/1052)。

## 视频广告联盟 <a name="video-ad-network"></a>

_示例：Tremor、Brightroll_

如果您是一家视频广告联盟，请与发布商一起确保做到以下两点：

- 所有视频素材资源均通过 HTTPS 投放
- AMP 支持发布商的视频播放器

## 数据管理平台 (DMP) <a name="data-management-platform-dmp"></a>

_示例：KRUX、Bluekai_

了解[如何增强自定义广告配置](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration)。

通过将您从用户 Cookie 中获取的细分受众群传递到广告调用，可以使用类似的方式来增强广告调用。

## 可见度提供商 <a name="viewability-provider"></a>

_示例：MOAT、Integral Ad Science_

可见度提供商通常利用广告服务器的广告素材封装容器来与发布商集成。在这种情况下，请确保广告素材封装容器通过 HTTPS 加载所有素材资源。

例如，对于 MOAT 来说，请确保将 `http://js.moatads.com` 转换为 `https://z.moatads.com`

另外，请参阅[交集观察者模式](https://github.com/ampproject/amphtml/blob/master/ads/README.md#ad-viewability)使用方式。

## 内容建议平台 <a name="content-recommendation-platform"></a>

_示例：Taboola、Outbrain_

适用于以下情况：您目前在发布商网站上嵌入了一些 JavaScript，但该方式在 AMP 网页上不起作用。如果您希望在 AMP 网页上向用户推荐内容，我们建议您使用 [`amp-embed` 扩展组件](https://amp.dev/documentation/components/amp-ad)请求内容详细信息。请参阅 [Taboola](https://github.com/ampproject/amphtml/blob/master/ads/taboola.md) 示例。
