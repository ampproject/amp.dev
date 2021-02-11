---
'$title': "Utilisation d'un optimiseur AMP"
$order: 2
'$hidden': 'true'
description: "Les optimiseurs AMP sont des outils qui apportent des optimisations AMP Cache à votre propre site. L'utilisation d'un optimiseur AMP est essentielle pour créer une expérience de page exceptionnelle et atteindre la conformité Core Web Vitals. Ce guide explique comment utiliser au mieux un optimiseur AMP pour optimiser vos pages AMP."
formats:
  - websites
  - stories
author: sebastianbenz
---

Les optimiseurs AMP sont des outils qui apportent des optimisations AMP Cache à votre propre site. L'utilisation d'un optimiseur AMP est essentielle pour créer une [expérience de page](https://developers.google.com/search/docs/guides/page-experience) exceptionnelle et atteindre la conformité [Core Web Vitals](https://web.dev/vitals/). Si vous souhaitez en savoir plus sur le fonctionnement d'un optimiseur AMP, consultez notre [guide détaillé des optimisations AMP](explainer.md).

## AMP n'est-il pas déjà rapide ?

Vous vous dites peut-être : mais, AMP n'est-il pas censé être prêt à l'emploi ? Et vous pouvez avoir raison : le runtime AMP est optimisé pour la vitesse et toutes les pages AMP valides chargent rapidement. Cependant, il existe des optimisations de performances supplémentaires que vous pouvez implémenter sur votre serveur pour aider le navigateur à charger les pages AMP encore plus rapidement.

Au début, les caches AMP servaient la majorité des pages AMP. Ces caches effectuaient des optimisations supplémentaires sur les pages pour garantir une expérience utilisateur solide. Mais au fil du temps, de plus en plus de surfaces ont commencé à créer des liens vers des pages AMP et les développeurs ont commencé à créer des sites Web entiers avec AMP. C'est pourquoi l'équipe AMP a commencé à travailler sur les optimiseurs AMP afin de permettre à chacun de servir des pages AMP avec des performances similaires à celles d'AMP Cache sur sa propre origine.

## Intégrer un optimiseur AMP

Il existe trois façons d'utiliser un optimiseur AMP :

1. Utiliser un générateur de site ou un CMS avec une intégration d'optimiseur intégrée.
2. Intégrer un optimiseur AMP dans votre système de construction ou votre serveur.
3. Intégrer un optimiseur AMP dans votre environnement d'hébergement.

### CMS et générateurs de sites

La meilleure façon de publier un AMP optimisé consiste à utiliser un générateur de site ou un CMS avec prise en charge d'un optimiseur AMP intégrée. Dans ce cas, vos pages AMP seront optimisées automatiquement. Actuellement, les générateurs de sites et CMS suivants intègrent l'optimiseur AMP :

- [WordPress](https://wordpress.org/) via le [plugin AMP WordPress](https://wordpress.org/plugins/amp/)
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [Eleventy](https://www.11ty.dev/) via le plugin [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/)
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### Intégrations de build ou de serveur personnalisées

Vous pouvez également intégrer vous-même un optimiseur AMP. Il existe plusieurs implémentations open source d'optimiseur AMP disponibles :

- [AMP Optimizer (Node.js)](node-amp-optimizer.md) : une bibliothèque basée sur Node.js pour produire un AMP optimisé. Consultez notre guide de démarrage ici sur amp.dev. L'implémentation est maintenue par l'équipe AMP.
- [AMP Toolbox for PHP](https://github.com/ampproject/amp-toolbox-php): a PHP based library for producing optimized AMP. The implementation is maintained by the AMP team.
- [amp-renderer (Python)](https://github.com/chasefinch/amp-renderer) : un port Python de Node AMP Optimizer.

Il existe différentes intégrations pour les pages rendues dynamiquement par votre serveur et les sites statiques :

1. **Temps de création** : pour les sites statiques, il est préférable d'optimiser les pages AMP dans le cadre de la création. Cette approche est idéale car l'optimisation des pages AMP n'a pas d'impact sur les performances de diffusion. Consultez [cet exemple pour une intégration de l'optimiseur AMP + Gulp](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp).
2. **Temps de diffusion** : si les sites Internet ont une nature plus dynamique ou ne sont pas capables d'appliquer les transformations de manière statique, l'optimisation peut être effectuée après la diffusion des documents AMP sur le serveur. Dans ce cas, pour garantir des délais de traitement rapides, il est préférable de mettre en cache les pages transformées pour les demandes suivantes. La mise en cache peut avoir lieu au niveau du CDN, sur l'infrastructure interne du site (ex. : Memcached), ou même sur le serveur lui-même, si l'ensemble des pages est suffisamment petit pour tenir en mémoire. Pour en savoir plus sur cette approche, consultez [cette démo d'intégration de l'optimiseur AMP dans Express.JS](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express).

### Intégrations des fournisseurs d'hébergement

Certains fournisseurs d'hébergement permettent d'exécuter une logique personnalisée lors du déploiement ou de la diffusion d'une page Web. Cela peut être une excellente option pour intégrer AMP Optimizer. Les exemples d'intégration sont :

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/) ([bientôt disponible](https://github.com/ampproject/amp-toolbox/issues/878))
- AMP Optimizer Docker Image ([bientôt disponible](https://github.com/ampproject/amp-toolbox/issues/879))
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
