---
$title: 将 AMP 与渐进式网页应用相结合
---
[TOC]

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='欢迎观看这个简介性视频，了解如何将 AMP 与 PWA 相结合。']

渐进式网页应用和 AMP 网页可完美结合。事实上，在很多情况下，这两者都会以这样或那样的方式达到相得益彰的效果。了解如何执行以下操作：

1. 为 AMP 网页[启用 PWA 功能]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-as-pwa.md', locale=doc.locale).url.path}})
2. 打造从 AMP 到 PWA 的[超快且极具吸引力的用户之旅]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-to-pwa.md', locale=doc.locale).url.path}})
3. 利用 AMP 的强大功能[简化 PWA]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-in-pwa.md', locale=doc.locale).url.path}})

[tip type="note"]

在“网页基础知识”网站上详细了解[渐进式网页应用](https://developers.google.com/web/progressive-web-apps/)。

[/tip]

## 支持 PWA 功能的 AMP 网页

AMP 网页可以自行使用很多 PWA 功能，只要这些网页是由您的源网域（即您网站的网域，而非 AMP 缓存）提供。这便意味着：当用户在 Google 或 Bing 等平台中使用 AMP 网页时，PWA 功能不会发挥作用；但当用户继续进行浏览之旅或直接转到您的 AMP 网页时，此类功能将会发挥作用。

继续阅读: 了解如何为 AMP 网页[启用 PWA 功能]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-as-pwa.md', locale=doc.locale).url.path}})。

## 将 AMP 网页作为 PWA 的进入点

AMP 的独家卖点是**几乎即时交付**，这一特点使得 AMP 成为实现您网站上的首次用户互动的理想解决方案。*渐进式网页应用*提供了**更多可大幅提升互动度并吸引用户进行深入互动的功能**，但这类应用的首次加载速度会不太尽如人意，原因是网站的 Service Worker（因而以及它的资源和应用 Shell）仅会加快后续加载的交付速度。

推荐采取的策略：将一个 AMP 网页作为您网站的进入点，然后让 PWA 在后台做好准备并切换到 PWA 以便用户继续进行浏览之旅。

继续阅读: 了解如何通过 `amp-install-serviceworker` [将 AMP 关联到 PWA]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-to-pwa.md', locale=doc.locale).url.path}})。

## 将 AMP 网页作为 PWA 的数据源

AMP 网页的核心特征之一是易于嵌入且嵌入过程很安全，这也是越来越多的平台乐于分发和提供 AMP 网页的原因。

如果您要构建渐进式网页应用，则可享受到同样的便利，并可通过**将 AMP 网页重复用作 PWA 的数据源**来大幅降低后端和客户端的复杂性。

继续阅读: 了解如何[在 PWA 中使用 AMP 网页]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-in-pwa.md', locale=doc.locale).url.path}})。
