---
$title: Précharger les polices Web
$order: 140
tags:
- lcp
---

Le préchargement vous permet d'indiquer au navigateur les ressources critiques que vous souhaitez charger dès que possible, avant même qu'ils ne soient découverts en HTML! Cela est particulièrement intéressant pour les ressources utilisées dans la première fenêtre d'affichage et dans toute la page, telles que les polices. Pour ce faire, ajoutez l'attribut `rel="preload"` à ces ressources, comme ci-après:

```
<link href="font.woff2" rel="preload">
```
