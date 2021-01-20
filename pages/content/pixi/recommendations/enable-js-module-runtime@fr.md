---
$title: Utiliser la version du module JavaScript du runtime AMP
$order: 25
tags:
- lcp
- fid
---

Il est important de respecter vos utilisateurs et leur bande passante. L'utilisation de [modules JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) peut faire une énorme différence positive sur les performances de votre page dans les navigateurs Web modernes. Vous pouvez opter pour la version du module JavaScript du runtime AMP ainsi que pour les composants AMP en utilisant l'indicateur [`experimentEsm`](https://www.npmjs.com/package/@ampproject/toolbox-optimizer#experimentesm) avec la dernière version de [Optimiseur AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/). Garder votre implémentation à jour divise les programmes JavaScript en modules séparés et importe uniquement ce qui est nécessaire! Veuillez noter que cette fonctionnalité étant expérimentale (bientôt disponible!), l'utilisation de cette fonctionnalité rendrait votre page AMP invalide.
