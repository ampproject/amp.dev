---
$title: 预加载阻塞呈现的组件
$order: 40
tags:
- lcp
- fid
---

如果对可能会阻塞首次呈现的组件进行预加载，用户便可尽快查看相应内容并与其进行互动。[`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) 和 [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/) 组件会阻塞呈现，需要多加小心。将 `rel="preload"` 属性添加到导入脚本中，可以对这些组件进行预加载：

```
<link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">
```

使用 [AMP 优化工具](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/)可以自动执行此操作！
