---
'$title': 将 AMP 与 PWA 相结合
$order: 7
description: 渐进式 Web 应用和 AMP 网页可完美结合。事实上，在很多情况下，这两者都会以这样或那样的方式达到相得益彰的效果。了解如何…
formats:
  - websites
components:
  - youtube
author: pbakaus
---

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='欢迎观看这个简介性视频，了解如何将 AMP 与 PWA 相结合。']

渐进式 Web 应用和 AMP 网页可完美结合。事实上，在很多情况下，这两者都会以这样或那样的方式达到相得益彰的效果。了解如何执行以下操作：

1. 为 AMP 网页[启用 PWA 功能](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md)
2. 打造从 AMP 到 PWA 的[超快且极具吸引力的用户行为历程](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md)
3. 利用 AMP 的强大功能[简化 PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)

[tip type="note"]

在 Web Fundamentals. 网站上详细了解[渐进式 Web 应用](https://developers.google.com/web/progressive-web-apps/)。

[/tip]

## 支持 PWA 功能的 AMP 网页

AMP 网页可以自行使用很多 PWA 功能，只要这些网页是从您的来源（即您网站的域名）而非 AMP 缓存提供即可。这便意味着，当用户在 Google 或 Bing 等平台中使用 AMP 网页时，PWA 功能不会发挥作用；但当用户继续浏览之旅或直接转到您的 AMP 网页时，此类功能将会发挥作用。

[tip type="read-on"] <strong>延伸阅读</strong>：了解如何为 AMP 网页[启用 PWA 功能](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md)。[/tip]

## 将 AMP 网页作为 PWA 的进入点

AMP 的独特卖点是**几乎即时交付**，这一特点使得 AMP 成为让用户与您的网站进行首次互动的理想解决方案。*渐进式 Web 应用*提供了**更多可大幅提升互动度并吸引用户进行深入互动的功能**，但这类应用的首次加载速度不尽如人意，原因是网站的 Service Worker（以及它的素材资源和 App Shell）仅会加快后续加载的交付速度。

推荐采取的策略：将一个 AMP 网页作为您网站的进入点，然后让 PWA 在后台做好准备并切换到 PWA 以便用户继续浏览之旅。

[tip type="read-on"] **延伸阅读**：了解如何通过 [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) [将 AMP 关联到 PWA](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md)。[/tip]

## 将 AMP 网页作为 PWA 的数据源

AMP 网页的核心特征之一是易于嵌入且嵌入过程十分安全，这也是越来越多的平台乐于分发和提供 AMP 网页的原因。

如果您要构建渐进式 Web 应用，则可享受到同样的便利，并可通过**将 AMP 网页重复用作 PWA 的数据源**来大幅降低后端和客户端的复杂性。

[tip type="read-on"] **延伸阅读**：了解如何[在 PWA 中使用 AMP 网页](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)。[/tip]
