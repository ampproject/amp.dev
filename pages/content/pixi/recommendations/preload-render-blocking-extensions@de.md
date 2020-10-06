---
$title: Lade Renderblockingkomponenten vor
$order: 40
tags:
- lcp
- fid
---

Ermögliche den Benutzern, deine Inhalte möglichst schnell anzuzeigen und mit ihnen zu interagieren, indem du Komponenten vorlädst, die möglicherweise das erste Rendern blockieren. Du solltest u. a. die Renderblockingkomponenten [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) und [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/) beachten. Lade sie vor, indem du das Attribut `rel="preload"` in das Importskript aufnimmst:

```
&lt;link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"&gt;
```

Verwende einen [AMP Optimizer](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/), um dies automatisch auszuführen!
