---
$title: Cómo cargar previamente los componentes que bloquean la renderización
$order: 40
tags:
- lcp
- fid
---

Permita que los usuarios vean e interactúen con el contenido tan pronto como sea posible, para ello cargue previamente los componentes que puedan bloquear la primera renderización. Los componentes que bloquean la renderización y deben tenerse en cuenta incluyen [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) y [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/). Cárguelos previamente incluyendo el atributo `rel="preload"` en su script de importación:

```
<link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
```

¡Utilice un [optimizador de AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) para hacerlo automáticamente!
