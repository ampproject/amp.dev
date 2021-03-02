---
'$title': Lien entre AMP et PWA
$order: 7
description: "Les applications Web progressives et les pages AMP fonctionnent très bien ensemble. En fait, dans de nombreux cas, ils se complètent d'une manière ou d'une autre. Découvrez comment ..."
formats:
  - websites
components:
  - youtube
author: pbakaus
---

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='Watch the intro to combining AMP and PWA.']

Les applications Web progressives et les pages AMP fonctionnent très bien ensemble. En fait, dans de nombreux cas, ils se complètent d'une manière ou d'une autre. Découvrez comment:

1. [Activer les fonctionnalités PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) pour vos pages AMP
2. Créer un [parcours utilisateur convaincant et ultra-rapide](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) d'AMP à PWA
3. [Simplifier votre PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md) grâce à la puissance d'AMP

[tip type="note"]

Pour en savoir plus sur les [applications Web progressives](https://developers.google.com/web/progressive-web-apps/), consultez les Fondamentaux Web.

[/tip]

## Pages AMP avec fonctionnalités PWA

Les pages AMP peuvent utiliser de nombreuses fonctionnalités PWA seules, à condition qu'elles soient servies à partir de votre origine (domaine de votre site), par opposition à un cache AMP. Cela signifie que les fonctionnalités PWA ne s'activeront si votre page AMP est ouverte sur une plate-forme telle que Google ou Bing, mais elles seront disponibles plus tard ou si les utilisateurs accèdent directement à vos pages AMP.

[tip type="read-on"] **LIRE -** Découvrez comment [activer les fonctionnalités PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) pour vos pages AMP. [/tip]

## AMP comme point d'entrée dans votre PWA

L'argument de vente unique d'AMP est la **diffusion presque instantanée**, caractéristique qui fait d'AMP la solution idéale pour la première interaction de l'utilisateur avec votre site. _Les applications Web progressives_ offrent beaucoup **plus d'interactivité et de fonctionnalités propices à l'engagement**, mais leur chargement initial est entravé par le fait que le worker de service du site, et donc ses ressources et son shell d'application, accélèrent lz diffusion uniquement lors des chargements suivants.

Une bonne stratégie serait de définir une page AMP comme point d'entrée à votre site, de préparer la PWA en arrière-plan et de basculer vers la PWA pour la suite.

[tip type="read-on"] **LIRE -** Découvrez comment [connecter AMP à une PWA](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) via [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) . [/tip]

## AMP comme source de données pour votre PWA

L'une des principales caractéristiques des pages AMP est qu'elles sont faciles et sûres à intégrer, c'est pourquoi un nombre sans cesse croissant de plateformes sont heureuses de les distribuer et de les proposer.

Si vous créez une application Web progressive, vous pouvez bénéficier des mêmes avantages et réduire considérablement la complexité de votre backend et faciliter la tâche à vos clients en **réutilisant vos pages AMP comme source de données pour votre PWA**.

[tip type="read-on"] **LIRE -** Découvrez comment [utiliser les pages AMP dans une PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md). [/tip]
