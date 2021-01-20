---
"$title": 使用 AMP Optimizer
"$order": '2'
"$hidden": 'true'
description: AMP Optimizer 是将 AMP 缓存优化引入您自己的网站的工具。使用 AMP Optimizer 是打造出色的网页体验并符合核心网页指标的关键。本指南说明如何以最佳方式使用 AMP Optimizer 来优化 AMP 网页。
formats:
- websites
- stories
author: sebastianbenz
---

AMP Optimizer 是将 AMP 缓存优化引入您自己的网站的工具。使用 AMP Optimizer 是打造出色的[网页体验](https://developers.google.com/search/docs/guides/page-experience)并符合[核心网页指标](https://web.dev/vitals/)的关键。如果您想详细了解 AMP Optimizer 的工作方式，请查看我们的[详细 AMP 优化指南](explainer.md)。

## AMP 还不够快吗？

您可能在想：等一下——AMP 是否应该做到开箱即用？您说的很对：AMP 运行时的速度进行了优化，并且所有有效的 AMP 网页都能快速加载。但是，您也可以在服务器端实现其他性能优化，以帮助浏览器更快地加载 AMP 网页。

起初，AMP 缓存提供大部分 AMP 网页。这些缓存对网页执行了额外优化，以确保强大的用户体验。但是，随着时间的流逝，更多展示内容开始链接到 AMP 网页，并且开发者开始使用 AMP 构建整个网站。这就是 AMP 团队开始开始开发 AMP Optimizer 的原因，他们希望每个人都能使用 AMP 缓存就像在自己的来源上一样提供 AMP 网页。

## 集成 AMP Optimizer

您可以通过三种方式使用 AMP Optimizer：

1. 将网站生成器或 CMS 与内置优化工具集成一起使用。
2. 将 AMP Optimizer 集成到您的构建系统或服务器中。
3. 将 AMP Optimizer 集成到您的托管环境中。

### CMS 和网站生成器

发布经过优化的 AMP 的最佳方法是使用支持内置 AMP Optimizer 的网站生成器或 CMS。在这种情况下，您的 AMP 网页将自动优化。目前，以下网站生成器和 CMS 集成了 AMP Optimizer：

- [WordPress](https://wordpress.org/)，通过 [AMP WordPress 插件](https://wordpress.org/plugins/amp/)实现
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [Eleventy](https://www.11ty.dev/)，通过 [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/) 实现
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### 自定义构建或服务器集成

您也可以自行集成 AMP Optimizer。可以使用多种开源 AMP Optimizer 实现：

- [AMP Optimizer (Node.js)](node-amp-optimizer.md)：一个基于 Node.js 的库，用于生成经过优化的 AMP。在 amp.dev 上查看我们的入门指南。此实现由 AMP 团队维护。
- [AMP Toolbox for PHP](https://github.com/ampproject/amp-toolbox-php): a PHP based library for producing optimized AMP. The implementation is maintained by the AMP team.
- [amp-renderer (Python)](https://github.com/chasefinch/amp-renderer)：Node AMP Optimizer 的 Python 端口。

服务器和静态网站动态呈现的网页存在不同的集成：

1. **构建时**：对于静态网站，最好将 AMP 网页作为构建的一部分来优化。这种方式十分理想，因为优化 AMP 网页不会影响提供性能。请查看 [AMP Optimizer + Gulp 集成的示例](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp)。
2. **呈现时**：如果网站具有更多动态特性或者无法以静态方式应用转换，则在服务器中呈现 AMP 文档后，可以执行优化。在这种情况下，为了确保快速的提供时，最好为后续请求缓存转换网页。如果网页集足够小而适合放入内存，则可以在 CDN 级别、网站的内部基础架构（例如：Memcached）上，甚至在服务器上进行缓存。要详细了解这种方式，请查看[将 AMP Optimizer 集成到 Express.JS 中的演示](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express)。

### 托管服务提供商集成

一些托管服务提供商允许在部署或提供网页时运行自定义逻辑。这是一个集成 AMP Optimizer 的绝佳选择。集成示例如下：

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/)（[即将推出](https://github.com/ampproject/amp-toolbox/issues/878)）
- AMP Optimizer Docker Image（[即将推出](https://github.com/ampproject/amp-toolbox/issues/879)）
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
