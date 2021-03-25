---
'$title': Intro to AMPHTML ads
$order: 1
description: 告的方式。虽然 AMP 网页支持传统的 HTML 广告，但这些广告的加载速度可能很慢。要让广告本身与 AMP 网页的其余内容一样快速显示，您可以制作 AMPHTML 格式的广告。AMPHTML 广告仅在经过验证后才会投放，可确保广告的安全性和良好表现。
formats:
  - ads
---

## 什么是 AMPHTML 广告？

AMPHTML 广告是一种更快速、更精简且更安全地在网页上投放广告的方式。虽然 AMP 网页支持传统的 HTML 广告，但这些广告的加载速度可能很慢。要让广告本身与 AMP 网页的其余内容一样快速显示，您可以制作 AMPHTML 格式的广告。AMPHTML 广告仅在经过验证后才会投放，可确保广告的安全性和良好表现。最重要的是，此类广告可以在网络上的任何位置（而不只是在 AMP 网页上）投放。

AMPHTML 广告是按照 [AMPHTML 广告规范](a4a_spec.md)使用 AMP HTML 编写的（AMP HTML 的一种变体 + CSS）。这意味着广告无法再运行任意 JavaScript，而任意 JavaScript 正是导致传统广告表现很差的首要原因。因此，与核心 AMP 一样，核心广告 JavaScript 用例也内置于 AMP 开放源代码项目中，以保证广告实现良好行为。

### 优势

AMPHTML 广告比传统广告更好的原因何在？

1. **更快速**：AMPHTML 广告的加载速度更快，因为系统会在网页呈现过程的早期请求广告，并在用户即将查看广告之前立即展示广告。此外，AMPHTML 广告文件更小，可提升加载速度。
2. **更精简**：AMPHTML 广告捆绑了常用的广告功能，可让广告的文件更小。投放到网页中以后，AMPHTML 广告消耗的资源也更少。例如，常规广告中有 10 个跟踪器分别请求各自所需的信息；而 AMPHTML 广告会一次性收集所有数据，并将这些数据分发到任意数量的相关跟踪器。
3. **协调性**：在 AMP 网页上，[AMP runtime](spec/amphtml.md#amp-runtime) 可在正确的时间将手机有限的资源协调给正确的组件，以提供最佳的用户体验。例如，如果包含动画的 AMPHTML 广告不在当前视口中，则广告会暂停。
4. **更具吸引力**：用户无法与系统不显示的广告进行互动。更快的广告加载速度使可见度更高，继而产生更高的点击率，最终带来更好的广告效果。
5. **免受恶意软件侵害**：谁都无法通过 AMPHTML 广告传播恶意软件，因为广告需要先经过验证才能投放。因此，广告主可以确保安全的用户体验，并打造正面的品牌形象。
6. **更灵活**：AMPHTML 广告适用于 AMP 网页和非 AMP 网页以及任何设备。

### 格式

AMPHTML 广告具有灵活性和动态性，并支持许多广告格式，例如轮播、视差和灯箱等。要开始使用，您可以利用 [Examples](../../../documentation/examples/index.html) 中的开放源代码 AMPHTML 广告模板。

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>轮播</td>
    <td>视频视差</td>
    <td>灯箱</td>
  </tr>
</table>

## AMPHTML 广告的工作原理

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='向 AMP 网页投放 AMPHTML 广告', caption='向 AMP 网页投放 AMPHTML 广告', align='' ) }}

1. 发布商通过 [`amp-ad`](../../../documentation/components/reference/amp-ad.md) 标记在 AMP 网页上插入广告位，并指定想要使用的广告网络。
2. AMP Runtime 向指定的广告网络发送广告请求以获取广告。能够投放 AMPHTML 广告的广告网络会提供[快速获取实现](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md)，以验证广告并进行签名。
3. 广告网络以 AMPHTML 广告作出响应，并由 AMP Runtime 在 AMP 网页上呈现该广告。

[tip type="note"] No special integration is needed to serve AMPHTML ads to non-AMP pages. Check with your ad network to see if they support AMPHTML ads. [/tip]

## 投放 AMPHTML 广告

### 发布商

要投放 AMPHTML 格式的直销型广告，您必须按照 [AMPHTML 广告规范](a4a_spec.md)制作广告，并使用支持 AMPHTML 广告投放的广告服务器投放广告。目前，以下广告服务器支持 AMPHTML 广告：

- DFP 广告管理系统
- TripleLift
- Dianomi
- Adzerk
- Google AdSense

要通过间接渠道（例如广告交易平台、SSP 等）投放 AMPHTML 广告，请使用[相关列表](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)中列出的支持 AMPHTML 广告的广告网络/广告服务器。

### 广告代理机构

如果您是广告代理机构，则必须按照 [AMPHTML 广告规范](a4a_spec.md)制作广告。要寻求灵感并查看示例，请参阅 [Examples](../../../documentation/examples/index.html) 中的开放源代码 AMPHTML 广告模板。此外，您也可以使用以下任一工具制作 AMPHTML 广告：

- [Celtra 的 Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate（即将推出）

### 广告网络/广告服务器

要向 AMP 网页投放 AMPHTML 广告，您必须为您的广告网络创建使用[快速获取广告请求实现](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md)的 [`amp-ad`](../../../documentation/components/reference/amp-ad.md) 扩展组件（除非您已拥有此扩展组件）。有关详情，请参阅[与 AMP 集成以投放展示广告](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md)。请注意，您无需进行任何特殊的集成即可向非 AMP 网页投放 AMPHTML 广告。

## 制作 AMPHTML 广告

**从头开始**：AMPHTML 广告必须遵循 [AMPHTML 广告规范](a4a_spec.md)的要求。要查看演示和示例，请参阅 [AMP by Example](../../../documentation/examples/documentation/amp-ad.html) 中的开放源代码 AMPHTML 广告模板。

**使用工具**：您可以使用以下任一工具制作 AMPHTML 广告：

- [Celtra 的 Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate（即将推出）

### 验证 AMPHTML 广告语法

制作好 AMPHTML 广告以后，您应该确保广告使用了正确的 AMPHTML 语法。根据您的开发环境，您可以选择通过以下几种方式验证 AMPHTML 广告：

- 使用 [AMP 验证工具 NPM](https://www.npmjs.com/package/amphtml-validator) 模块将验证集成到您的 build CI 中。
- 使用 [AMP 验证工具](https://validator.ampproject.org/)进行一次性测试。
- 与 [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) 合作并使用其公共验证工具端点。

[tip type="note"]要在 AMP 网页上快速呈现 AMPHTML 广告（即，使用快速获取中的优先呈现功能），则语法必须正确无误。如果语法无效，则广告仍会呈现，只是加载速度不会那么快。[/tip]

## 在 RTB 中支持 AMPHTML 广告

对于想要在实时出价 (RTB) 环境中支持 AMPHTML 广告的 SSP 和广告交易平台，请参阅[针对 RTB 广告交易平台的实现指南](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md)以了解详情。

## 常见问题解答

#### 有 AMPHTML 广告示例吗？

有。您可以在 [Examples](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md) 中找到许多精美的 AMPHTML 广告模板。这些示例使用了 AMP 中的高级组件。

#### AMPHTML 广告支持第三方验证和可见度检测吗？

支持，使用 [<code>amp-analytics</code>](../../../documentation/examples/documentation/amp-ad.html) 即可实现对验证和可见度检测的原生支持（例如，Google 的 ActiveView 集成了这种方式）。MOAT 等其他供应商也在积极实现相关支持。

#### AMPHTML 广告支持基于时间轴的动画吗？

支持，使用 [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) 即可实现对验证和可见度检测的原生支持（例如，Google 的 ActiveView 集成了这种方式）。MOAT 等其他供应商也在积极实现相关支持。

#### 大多数广告都拥有可点按的目标和可配置的广告退出事件。AMPHTML 广告拥有类似的机制吗？

有。请参阅 [`amp-ad-exit`](../../../documentation/components/reference/amp-animation.md)。

#### 我找不到我需要的东西，可以在哪里提问？

- 建议您在 [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) 上查找 AMP 相关问题的解答；由于 AMP 项目社区成员会定期查看 Stack Overflow，因此通过 Stack Overflow 提问时可以最快得到解答。
- 要获取解决方案和解答，请加入 [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) 渠道。
- 如果您遇到 AMP 方面的错误或有与 AMP 相关的功能请求，请参阅[报告 AMP 问题](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp)，了解如何提交问题。
