---
layout: page
title: Qu'est-ce qu'AMP ?
order: 0
locale: fr
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

AMP est une méthode de création de pages Web pour du contenu statique permettant un rendu rapide.
Dans la pratique, AMP se compose de trois parties :

{% include toc.html %}

**AMP HTML** est du HTML comportant certaines restrictions pour assurer des performances fiable,
ainsi que certaines extensions permettant de créer du contenu enrichi plus élaboré qu'avec le HTML de base.
La bibliothèque **AMP JS** garantit un rendu rapide des pages AMP HTML.
Le cache **Google AMP Cache** (en option) fournit les pages AMP HTML.

## AMP HTML

Pour faire simple, AMP HTML est du HTML étendu à l'aide de propriétés AMP personnalisées.
Le fichier AMP HTML le plus simple ressemble à ce qui suit :

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

Même si la plupart des balises sur une page AMP HTML sont des balises HTML standard,
certaines sont remplacées par des balises AMP spécifiques (voir également
[Balises HTML dans la spécification AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).
Ces éléments personnalisés, appelés composants AMP HTML,
permettent d'implémenter facilement et efficacement des modèles communs.

Par exemple, la balise [`amp-img`](/docs/reference/amp-img.html)
offre une entière prise en charge de `srcset` même dans les navigateurs qui ne sont pas encore compatibles.
Découvrez comment [créer votre première page AMP HTML](/docs/get_started/create_page.html).

## AMP JS

La [bibliothèque AMP JS](https://github.com/ampproject/amphtml/tree/master/src) implémente
toutes les [meilleures pratiques d'AMP en termes d'efficacité](/docs/get_started/technical_overview.html),
gère le chargement des ressources et contient les balises personnalisées mentionnées ci-dessus,
et ce, pour un rendu rapide de la page.

L'une des plus grandes optimisations est la désynchronisation de tout ce qui provient de ressources externes, de sorte que rien sur la page ne peut bloquer le rendu des différents éléments.

D'autres techniques permettent de gagner en performance : le système de « sandbox » pour tous les iframes, la prédéfinition de la disposition de chaque élément sur la page avant le chargement des ressources et la désactivation des sélecteurs CSS lents.

Pour en savoir plus sur les [optimisations](/docs/get_started/technical_overview.html) et les limitations, [lire la spécification AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

## Google AMP Cache

Google AMP Cache est un réseau de distribution de contenus basé sur proxy
qui fournit tous les documents AMP valides.
Il extrait les pages AMP HTML, les stocke en mémoire cache et améliore automatiquement la performance des pages.
Avec Google AMP Cache, le document, tous les fichiers JS et toutes les images se chargent
à partir d'une source, laquelle utilise
[HTTP 2.0](https://http2.github.io/) pour une efficacité optimale.

Ce cache intègre également un
[système de validation](https://github.com/ampproject/amphtml/tree/master/validator)
qui vérifie le bon fonctionnement de la page
et sa non dépendance vis-à-vis de ressources externes.
Le système de validation applique une série d'assertions
pour vérifier que le balisage de la page est conforme à la spécification AMP HTML.

Une autre version du système de validation est intégrée à chaque page AMP. Cette version peut consigner les erreurs de validation directement dans la console du navigateur lors du rendu de la page
pour vous permettre de connaître l'impact des changements de code
complexes sur la performance et l'expérience utilisateur.

En savoir plus sur le [test des pages AMP HTML](/docs/guides/validate.html).
