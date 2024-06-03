---
$title: Preload render-blocking components
$order: 40
tags:
- lcp
- fid
---
Allow users to see and interact
with content as soon as possible by preloading components that may block the
first render. Render-blocking components to watch out for include [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites)
and [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/).
Preload them by including the `rel="preload"` attribute on their import script:
```
<link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
```

Use an [AMP Optimizer](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/)
to do it automatically! 


