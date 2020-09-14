---
$title: Preload AMP Runtime
$order: 30
tags:
- lcp
- fid
---
Preloading necessary assets improves performance by ensuring they are available
first. An AMP page requires the framework's JavaScript, so ensure it's preloaded!
Use an [AMP Optimizer](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/)
to automatically add the following to your page, or do so manually:
```
<link as=script href=https://cdn.ampproject.org/v0.js rel=preload>
```
