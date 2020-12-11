---
$title: Pré-carregue fontes da web
$order: 140
tags:
- lcp
---

O pré-carregamento permite informar ao navegador sobre os recursos críticos que você deseja carregar o quanto antes, mesmo antes de serem descobertos pelo HTML! Isto é particularmente importante para recursos usados na primeira janela de visualização e por toda a página, como fontes. Faça isto adicionando o atributo `rel = "preload"` a esses recursos, como mostrado a seguir:

```
<link href="font.woff2" rel="preload">
```
