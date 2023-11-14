---
$title: Précharger les composants bloquant le rendu
$order: 40
tags:
- lcp
- fid
---

Permettez aux utilisateurs de voir et d'interagir avec le contenu dès que possible en préchargeant des composants susceptibles de bloquer le premier rendu. Les composants bloquant le rendu à surveiller sont [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) et [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/). Préchargez-les en incluant l'attribut `rel="preload"` dans leur script d'importation:

```
<link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">
```

Utilisez un [optimiseur AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) pour le faire automatiquement!
