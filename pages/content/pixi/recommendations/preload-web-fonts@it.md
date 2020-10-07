---
$title: Precarica i caratteri web
$order: 140
tags:
- lcp
---

Il precaricamento consente di indicare al browser le risorse critiche che desideri caricare il prima possibile. Anche prima che vengano scoperti in HTML! Ciò è particolarmente utile per le risorse utilizzate nella prima finestra di visualizzazione e in tutta la pagina, come i caratteri. A questo scopo, aggiungi l'attributo `rel="preload"` a queste risorse, come di seguito:

```
<link href="font.woff2" rel="preload">
```
