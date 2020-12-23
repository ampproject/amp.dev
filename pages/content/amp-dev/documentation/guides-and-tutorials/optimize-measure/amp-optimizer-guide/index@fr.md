---
"$title": "Utilisation d'un optimiseur AMP"
"$order": '2'
"$hidden": 'true'
description: "Les optimiseurs AMP sont des outils qui apportent des optimisations AMP Cache à votre propre site. L'utilisation d'un optimiseur AMP est essentielle pour créer une expérience de page exceptionnelle et atteindre la conformité Core Web Vitals. Ce guide explique comment utiliser au mieux un optimiseur AMP pour optimiser vos pages AMP."
formats:
- websites
- stories
author: sebastianbenz
---

Les optimiseurs AMP sont des outils qui apportent des optimisations AMP Cache à votre propre site. L'utilisation d'un optimiseur AMP est essentielle pour créer une [expérience de page](https://developers.google.com/search/docs/guides/page-experience) exceptionnelle et atteindre la conformité [Core Web Vitals](https://web.dev/vitals/). Si vous souhaitez en savoir plus sur le fonctionnement d'un optimiseur AMP, consultez notre [guide détaillé des optimisations AMP](explainer.md).

## AMP n'est-il pas déjà rapide ?

You may be thinking: wait – isn’t AMP supposed to be fast out-of-the-box? And you would be right: the AMP runtime is optimized for speed and all valid AMP pages load fast. However, there are additional performance optimizations you can implement on your server to help the browser load AMP pages even faster.

In the beginning, AMP caches served the majority of AMP pages. These caches performed additional optimizations on pages to guarantee a strong user experience. But, over time, more surfaces started linking to AMP pages and developers began building entire websites with AMP. That's why the AMP team has started working on AMP Optimizers to allow everyone to serve AMP pages with AMP Cache like performance on their own origin.

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

1. **Build-time**: for static sites, it’s best to optimize AMP pages as part of the build. This approach is ideal as optimizing AMP pages does not impact serving performance. Checkout [this sample for an AMP Optimizer + Gulp integration](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp).
2. **Render-time**: if websites have a more dynamic nature or are not able to apply the transformations statically, optimization can be performed after AMP documents are rendered in the server. In that case, to ensure fast serving times, it's best to cache transformed pages for subsequent requests. Caching can take place on the CDN level, on the site's internal infrastructure (eg: Memcached), or even on the server itself, if the set of pages is small enough to fit into memory. To learn more about this approach, checkout [this demo integrating AMP Optimizer into Express.JS](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express).

### Intégrations des fournisseurs d'hébergement

Certains fournisseurs d'hébergement permettent d'exécuter une logique personnalisée lors du déploiement ou de la diffusion d'une page Web. Cela peut être une excellente option pour intégrer AMP Optimizer. Les exemples d'intégration sont :

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/) ([bientôt disponible](https://github.com/ampproject/amp-toolbox/issues/878))
- AMP Optimizer Docker Image ([bientôt disponible](https://github.com/ampproject/amp-toolbox/issues/879))
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
