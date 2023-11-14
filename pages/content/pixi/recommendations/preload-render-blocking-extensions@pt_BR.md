---
$title: Pré-carregue componentes que bloqueiam a renderização
$order: 40
tags:
- lcp
- fid
---

Permita que os usuários vejam e interajam com o conteúdo o mais rápido possível, carregando previamente componentes que podem bloquear a primeira renderização. Componentes que bloqueiam a renderização que devem ser observados incluem [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) e [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/). Carregue-os previamente usando o atributo `rel="preload"` no seu script de importação:

```
<link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">
```

Use um [Otimizador AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) para fazer isto automaticamente!
