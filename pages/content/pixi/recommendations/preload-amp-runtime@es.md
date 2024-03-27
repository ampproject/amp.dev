---
$title: Cómo cargar previamente el tiempo de ejecución en AMP
$order: 30
tags:
- lcp
- fid
---

Cargar previamente los recursos necesarios mejora su desempeño ya que permite garantizar que estén disponibles inmediatamente. Las páginas de AMP requieren un marco de trabajo para JavaScript, por lo tanto, ¡asegúrese de que esté cargado previamente! Para ello, utilice un [optimizador de AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) el cual le permitirá agregar automáticamente lo siguiente en su página, o hágalo de forma manual:

```
<link as="script" href="https://ampjs.org/v0.js" rel="preload">
```
