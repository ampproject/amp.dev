---
layout: page
title: Accélération de la performance avec AMP
order: 2
locale: fr
---

La combinaison de toutes les optimisations suivantes est la raison pour laquelle les pages AMP sont tellement rapides qu'elles semblent se charger instantanément :

{% include toc.html %}

Si vous préférez l'écoute à la lecture, la vidéo suivante présentée par l'ingénieur AMP en chef, Malte Ubl, aborde les mêmes informations que les paragraphes suivants.

<amp-youtube
    data-videoid="hVRkG1CQScA"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

## Autoriser uniquement les scripts asynchrones

JavaScript est puissant.
Il peut modifier pratiquement tous les aspects de la page,
mais aussi bloquer la construction DOM et retarder le rendu de la page
(voir aussi [Ajouter l'interactivité avec JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)).
Pour empêcher JavaScript de retarder le rendu de la page,
AMP autorise uniquement les scripts JavaScript asynchrones. 

Les pages AMP ne peuvent inclure aucun autre JavaScript rédigé.
Plutôt que d'utiliser JavaScript,
les fonctions de page interactives sont traitées dans des éléments AMP personnalisés.
Les éléments AMP personnalisés peuvent intégrer du JavaScript,
mais ils sont conçus de sorte à ne pas impacter la performance.

Même si des scripts JS tiers sont autorisés dans les iframes,
ils ne peuvent pas bloquer le rendu.
Par exemple, si un script JS tiers utilise l'
[API `document.write` à fort impact négatif sur la performance](http://www.stevesouders.com/blog/2012/04/10/dont-docwrite-scripts/),
il ne bloque pas le rendu de la page principale.

## Dimensionner toutes les ressources de manière statique

Les ressources externes, comme les images, les publicités ou les iframes, doivent déclarer leur taille dans le code HTML
pour permettre à AMP de déterminer la taille et la position de chaque élément avant leur téléchargement.
AMP charge la disposition de la page sans attendre le téléchargement des ressources.

AMP dissocie la disposition des documents de celle des ressources.
Une seule requête HTTP est nécessaire pour mettre en page le document entier 
([+ les polices](#font-triggering-must-be-efficient)).
Dans la mesure où AMP est optimisé pour éviter les coûteux recalculs de style et dispositions dans le navigateur,
aucune re-disposition n'est nécessaire lors du chargement des ressources.

## Empêcher les mécanismes d'extension de bloquer le rendu

AMP empêche les mécanismes d'extension de bloquer le rendu des pages.
AMP prend en charge les extensions d'objets tels que les
[mosaïques](/docs/reference/extended/amp-lightbox.html), les
[intégrations Instagram](/docs/reference/extended/amp-instagram.html), les
[tweets](/docs/reference/extended/amp-twitter.html), etc.
Même si ces extensions exigent des requêtes HTTP supplémentaires,
ces dernières ne bloquent ni la mise en page ni le rendu des pages. 

Toute page qui utilise un script personnalisé doit indiquer au système AMP
qu'elle contiendra ultérieurement une balise personnalisée.
Par exemple, le script [`amp-iframe`](/docs/reference/extended/amp-iframe.html)
indique au système qu'il y aura une balise `amp-iframe`.
AMP crée le cadre iframe avant même de savoir ce qu'il contiendra : 

{% highlight html %}
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{% endhighlight %}

## Écarter le JavaScript tiers du processus principal

Le script JS tiers aime utiliser le chargement JS synchrone.
Il aime également appliquer `document.write` à d'autres scripts synchrones.
Par exemple, si vous avez cinq publicités, chacune exécutant
trois chargements synchrones avec une connexion
d'une latence d'une seconde, le chargement JS prend à lui seul 18 secondes. 

Les pages AMP autorisent le JavaScript tiers, mais seulement dans des iframes placés en sandbox.
Limité aux iframes, ces scripts ne peuvent pas bloquer l'exécution de la page principale.
Même s'ils déclenchent plusieurs recalculs de style,
le DOM de leurs iframes minuscules est très réduit. 

Les recalculs de style et les dispositions dépendent de la taille du DOM ; 
aussi, les recalculs d'iframe sont très rapides
comparés aux recalculs de styles et à la disposition de la page.

## Tout le style CSS doit être en ligne et limité en taille

Le CSS bloque tout le rendu. Il bloque le chargement des pages et a tendance à « gonfler ».
Dans les pages AMP HTML, seuls les styles en ligne sont autorisés.
Une ou souvent plusieurs requêtes HTTP sont ainsi supprimées du processus de rendu principal,
par rapport à la plupart des pages Web.

De plus, la taille des feuilles de style en ligne est limitée à 50 Ko maximum.
Même si cette taille est suffisante pour les pages très complexes,
le créateur de la page doit malgré tout appliquer un style CSS propre.

## Le déclenchement de police doit être efficace

Les polices Web étant très volumineuses, 
l'[optimisation des polices Web](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)
est essentielle pour la performance.
Sur une page standard ne contenant que peu de scripts synchrones et de feuilles de style externes,
le navigateur doit attendre sans fin le téléchargement de ces énormes polices.

Le système AMP ne déclare aucune requête HTTP avant le début du téléchargement des polices.
En effet, tous les scripts JS dans AMP contiennent l'attribut « asynch »
et seules les feuilles de style en ligne sont autorisées.
Aucune requête HTTP n'empêche donc le navigateur de télécharger les polices.

## Réduire au minimum les recalculs de style

Dès lors que vous effectuez des mesures, de coûteux recalculs de style sont exécutés
car le navigateur doit définir la disposition de la page entière.
Dans les pages AMP, toutes les lectures DOM se produisent avant toutes les écritures.
Ainsi, un seul recalcul de style maximum est effectué par cadre.

Pour en savoir plus sur l'impact des recalculs de style et de disposition, voir 
[performances de rendu](https://developers.google.com/web/fundamentals/performance/rendering/).

## Exécuter uniquement les animations accélérées par GPU

La seule façon d'obtenir des optimisations rapides, c'est de les exécuter sur le GPU.
Le GPU connaît les couches, il sait comment exécuter certaines choses sur ces couches,
il peut les déplacer, il peut les diminuer, mais il ne peut pas actualiser
la disposition de la page. Il laisse cette tâche au navigateur, ce qui n'est pas une bonne chose.

Les règles concernant le CSS lié aux animations garantissent que ces dernières peuvent être accélérées par GPU.
Tout particulièrement, AMP autorise les animations et transitions uniquement sur les propriétés transform et opacity
 ; aucune disposition de la page n'est ainsi requise.
En savoir plus sur
l'[utilisation des propriétés transform et opacity pour les changements sur les animations](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count).

## Hiérarchiser le chargement des ressources

AMP contrôle tous les téléchargements de ressources : il hiérarchise
le chargement, ne chargeant que ce qui est nécessaire, et pré-extrait les ressources les plus lentes à charger. 

Lorsqu'AMP télécharge des ressources, il optimise ces téléchargements
de sorte que les ressources actuellement les plus importantes soient téléchargées en premier lieu.
Les images et publicités ne sont téléchargées que si elles seront vues par l'utilisateur,
dans la partie au-dessus de la ligne de flottaison, ou si l'utilisateur fera défiler rapidement la page pour y accéder.  

De plus, AMP pré-extrait les ressources les plus lentes à charger.
Les ressources sont chargées le plus tard possible, mais pré-extraites le plus tôt possible.
De cette façon, le chargement est très rapide ; le processeur
n'est utilisé que lorsque les ressources sont effectivement affichées aux utilisateurs.

## Charger les pages instantanément

La nouvelle [API de pré-connexion](http://www.w3.org/TR/resource-hints/#dfn-preconnect)
est largement utilisée pour garantir des requêtes HTTP aussi rapides que possible dès leur lancement.
Ainsi,
une page peut être rendue avant même que l'utilisateur n'indique explicitement qu'il aimerait y accéder.
La page peut être déjà disponible avant l'instant où l'utilisateur la sélectionne effectivement,
ce qui permet un chargement instantané.

Alors que tout contenu Web peut être pré-rendu,
il peut également consommer une grande quantité de bande passante et de ressources du processeur. AMP est optimisé pour limiter ces deux facteurs. Le pré-rendu permet de télécharger uniquement les ressources situées
dans la partie au-dessus de la ligne de flottaison et n'inclut pas les éléments gourmands en processeur.

Lorsque les documents AMP sont pré-rendus pour un chargement instantané,
seules les ressources situées dans la partie au-dessus de la ligne de flottaison sont effectivement téléchargées.
Lorsque les documents AMP sont pré-rendus pour un chargement instantané,
les ressources susceptibles d'utiliser une grande quantité de ressources du processeur (telles que les iframes tiers) ne sont pas téléchargées. 

En savoir plus sur
les [raisons pour lesquelles AMP HTML n'exploite pas pleinement le scanner de pré-chargement](https://medium.com/@cramforce/why-amp-html-does-not-take-full-advantage-of-the-preload-scanner-7e7f788aa94e).

## Contribuer à l'accélération d'AMP
AMP est une initiative open-source.
Nous avons besoin de votre aide pour rendre AMP encore plus rapide.
Découvrez [comment contribuer](/docs/support/contribute.html).
