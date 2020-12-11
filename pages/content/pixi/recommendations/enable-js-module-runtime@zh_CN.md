---
$title: 使用 AMP 运行时的 JavaScript 模块版本
$order: 25
tags:
- lcp
- fid
---

尊重用户及其带宽至关重要。使用 [JavaScript 模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)可以对新型网络浏览器中的网页性能产生巨大的积极影响。您可以将 [`experimentEsm`](https://www.npmjs.com/package/@ampproject/toolbox-optimizer#experimentesm) 标记与最新的 [AMP 优化工具](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/)版本配合使用，从而获得 AMP 运行时的 JavaScript 模块版本和 AMP 组件。通过让实现保持最新状态，可以将 JavaScript 程序拆分为独立的模块，并且仅导入所需的模块！请注意，由于此功能仍为实验性功能（即将推出！），使用此功能将会让 AMP 网页无效。
