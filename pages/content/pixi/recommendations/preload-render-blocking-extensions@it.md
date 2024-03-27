---
$title: Precarica i componenti che bloccano il rendering
$order: 40
tags:
- lcp
- fid
---

Permetti agli utenti di vedere appena possibile i contenuti e di interagire con essi appena possibile, precaricando i componenti che possono bloiccare il primo rendering. I componenti che bloccano il rendering comprendono  [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) e [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/). Precaricarli, includendo l'attributo `rel="preload"` nel loro script di importazione:

```
<link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">
```

Usa un [ottimizzatore AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) per farlo automaticamente!
