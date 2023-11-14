---
$title: Pre-carregue o Runtime AMP
$order: 30
tags:
- lcp
- fid
---

O pré-carregamento dos ativos necessários melhora o desempenho, garantindo que estejam disponíveis primeiro. Uma página AMP requer o JavaScript do framework, então garanta que ele está pré-carregado! Use um [Otimizador AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) para adicionar automaticamente o seguinte à sua página ou faça isto manualmente:

```
<link as="script" href="https://ampjs.org/v0.js" rel="preload">
```
