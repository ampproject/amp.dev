---
$title: Précharger le runtime AMP
$order: 30
tags:
- lcp
- fid
---

Le préchargement des ressources nécessaires améliore les performances en garantissant leurs disponibilité immédiate. Une page AMP nécessite le JavaScript du framework, alors assurez-vous qu'il est préchargé! Utilisez un [optimiseur AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) pour ajouter automatiquement ce qui suit à votre page, ou faites-le manuellement:

```
<link as=script href=https://ampjs.org/v0.js rel=preload>
```
