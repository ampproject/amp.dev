---
$title: Use a versão do módulo JavaScript do Runtime AMP
$order: 25
tags:
- lcp
- fid
---

É importante respeitar seus usuários e sua largura de banda. Usar [módulos JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) pode trazer uma grande diferença positiva no desempenho de sua página em navegadores modernos. Você pode optar por ativar a versão do módulo JavaScript do Runtime AMP, bem como os componentes AMP usando a sinalização [`experimentEsm`](https://www.npmjs.com/package/@ampproject/toolbox-optimizer#experimentesm) com a versão mais recente do [Otimizador AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/). Manter sua implementação atualizada divide os programas JavaScript em módulos separados e importa apenas o que é necessário! Observe que, como este recurso é experimental (lançamento em breve!), seu uso torna sua página AMP inválida.
