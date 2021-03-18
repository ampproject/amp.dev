---
$title: Preload critical fonts
$order: 30
tags:
  - lcp
  - cls
---
Leverage the font-display CSS feature to ensure text is user-visible while
webfonts are loading. [Learn more](https://web.dev/optimize-webfont-loading/).
Critical font '${font}' is not preloaded. Add \`<link rel="preload" href="${fontface.mainSrc}" as="font" crossorigin>\` to your \`<head>\`.
