---
$title: AMP 上的广告简介
---

AMP 项目的目标是帮助提高网页加载速度，让用户获得最佳体验。AMP 上投放广告也本着这样的目标，力求广告能够快速安全地呈现给用户、极具吸引力且效果卓著。如何实现这一目标呢？

在 AMP 网页上投放广告与在 HTML 网页上投放传统广告没有太大区别：

{{ image('/static/img/docs/ads/ads_in_amp.svg', 647, 263, alt='在 AMP 网页上投放广告', align='' ) }}

1.  首先要有一个 AMP 网页，然后发布商在该网页上创建一个广告位来展示广告。传统的做法是插入一段 JavaScript 代码，但在 AMP 中，发布商需要在其 AMP 网页中为特定的广告网络添加 [`<amp-ad>`](/zh_cn/docs/reference/components/amp-ad.html) 标记。要了解详细信息，请参阅[在您的 AMP 网页中利用广告获利]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/monetization.md', locale=doc.locale).url.path}})指南。

2.  当用户加载 AMP 网页时，`<amp-ad>` 标记会向广告网络发送广告请求。为了将广告返回到 AMP 网页，广告网络需要构建一个 `amp-ad` 实现。要了解详细信息，请参阅[将广告网络集成到 AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md) 指南。

3.  广告网络会投放广告主制作的广告。广告主可以使用传统的 HTML 制作广告，也可以采用新格式 [AMPHTML]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}}) 制作广告。

## 支持的广告网络

AMP 支持很多[广告服务器和网络]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md', locale=doc.locale).url.path}})。

[tip type="note"]
希望将您的广告技术与 AMP 集成？请参阅这些[指南]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/integration-guide.md', locale=doc.locale).url.path}})。
[/tip]

## 支持的广告

AMP 既支持传统广告，也支持更快、更安全的 AMPHTML 广告。无论采用何种制作方式，AMP 网页上的广告与所有外部资源都一样，在播放时必须遵循[对 AMP 中的所有资源施加的限制](/zh_cn/learn/about-how/)。要详细了解 AMP 中的广告要求，请参阅[此指南](https://github.com/ampproject/amphtml/blob/master/ads/README.md#constraints)。

### 通过 AMPHTML 广告提高广告加载速度

AMPHTML 广告是一种更快速、更精简且更安全地在网页上投放广告的方式。虽然 AMP 网页支持传统的 HTML 广告，但这些广告的加载速度可能很慢。要让广告本身与 AMP 网页的其余内容一样快速显示，您可以制作 AMPHTML 格式的广告。AMPHTML 广告仅在经过验证后才会投放，可确保广告不包含恶意软件。最重要的是，此类广告可以在网络上的任何位置（而不只是在 AMP 网页上）投放。

要详细了解 AMPHTML 广告，请参阅 [AMPHTML 广告]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}})指南。


## 使用入门

请访问以下资源，开始了解 AMP 中的广告：

* [在您的 AMP 网页中利用广告获利]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/monetization.md', locale=doc.locale).url.path}})
* [与 AMP 集成以投放展示广告]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/adnetwork_integration.md', locale=doc.locale).url.path}})
* [AMPHTML 广告]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}})
 
