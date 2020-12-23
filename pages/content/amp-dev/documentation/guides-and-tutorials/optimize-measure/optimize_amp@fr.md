---
"$title": Comment optimiser vos pages AMP hébergées
"$order": '7'
description: Le runtime AMP est optimisé en vitesse et si vos pages AMP sont diffusées par un cache AMP, elles sont entièrement optimisées et offrent les meilleures performances de chargement ...
formats:
- websites
- stories
author: sebastianbenz
---

Ce guide fournit des astuces et des conseils aux webmasters sur la façon dont ils peuvent optimiser leurs sites Internet AMP hébergés.

### AMP n'est-il pas rapide par défaut?

Le runtime AMP est [optimisé en vitesse](../../../about/how-amp-works.html) et si vos pages AMP sont diffusées par un [cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md), elles sont entièrement optimisées et offrent les meilleures performances de chargement. Par exemple, si vos utilisateurs accèdent à vos pages AMP à partir de la recherche Google sur mobile, par défaut, les pages sont diffusées par un cache AMP.

Cependant, les pages AMP ne sont pas toujours diffusées à partir d'un cache AMP. Un site Internet peut décider d'afficher des pages AMP depuis ses propres serveurs pour d'autres sources de trafic. Les cas d'utilisation les plus fréquents sont les sites entièrement créés en AMP, tels que [tasty.co](https://tasty.co), où les utilisateurs accèdent directement au site. Une autre source de trafic est Twitter, qui a [commencé à créer des liens vers des pages AMP](https://searchengineland.com/twitter-ramps-amp-278300) au lieu de fournir la version mobile standard. Cela signifie que si un utilisateur clique sur un lien dans l'une des applications mobiles de Twitter, le lien va vers la version AMP de votre page sur votre propre origine (si elle est disponible).

Par conséquent, vous ne pouvez pas toujours être sûr que vos pages AMP sont uniquement diffusées à partir d'un cache AMP. Dans ces cas, où vous diffusez des pages AMP à partir de vos propres serveurs, il est important de vous assurer que vos pages AMP offrent des performances de chargement optimales.

Les pages AMP chargent rapidement par défaut, mais vous pouvez implémenter des optimisations de performances supplémentaires pour aider le navigateur à charger les pages AMP encore plus rapidement. Ce guide décrit quelques optimisations à prendre en compte lors de la publication de pages AMP. Cependant, avant de commencer à lire ce guide, assurez-vous d'avoir déjà couvert toutes les [bonnes pratiques de base en matière de performances Web](#basic-optimizations). L'optimisation de l'image en particulier a un impact important sur les performances de chargement.

Par exemple, en appliquant les techniques d'optimisation suivantes:

- [Optimiser le chargement du runtime AMP](#optimize-the-amp-runtime-loading)
- [Préchargement de l'image du héros](#preload-hero-images) (la taille de l'image/l'encodage lui-même n'a pas été modifié)
- [Optimisation de polices personnalisées](#optimize-custom-fonts) (dans ce cas, les polices Google)

le [modèle « The Scenic »](../../../documentation/templates/index.html) charge [deux secondes plus vite sur une connexion 3G](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0).

Si vous souhaitez ignorer les détails, consultez le [générateur de modèles AMP](/boilerplate), que vous pouvez utiliser pour générer des pages AMP optimisées personnalisées.

### Optimiser le chargement du runtime AMP <a name="optimize-the-amp-runtime-loading"></a>

Bien que AMP soit déjà assez restrictif sur le balisage autorisé dans la section `<head>`, l'optimisation reste possible. Le secret est de structurer la section `<head>` de manière à ce que tous les scripts de blocage de rendu et les polices personnalisées chargent le plus rapidement possible.

Voici l'ordre recommandé pour la section `<head>` dans une page AMP:

[sourcecode:html]

<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="This is the AMP Boilerplate.">
    <link rel="preload" as="script" href="https://cdn.ampproject.org/v0.js">
    <link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
    <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-experiment" src="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"></script>
    <!-- Import other AMP Extensions here -->
    <style amp-custom>
      /* Add your styles here */
    </style>
    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <link rel="canonical" href=".">
    <title>My AMP Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
[/sourcecode]

Examinons cela étape par étape:

1. La première balise doit être la balise `meta charset`, suivie de toutes les autres balises `meta`.

2. Ensuite, préchargez la balise du runtime AMP `v0.js` `<script>` avec `<lien as=script href=https://cdn.ampproject.org/v0.js rel=preload>`. Le téléchargement du runtime AMP devrait commencer dès que possible car le [modèle AMP](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) cache le document via `body { visibility:hidden }` jusqu'à ce que le runtime AMP soit chargé. Le préchargement du runtime AMP indique au navigateur de télécharger le script avec une priorité plus élevée. Consultez la section [affichage côté serveur](#server-side-rendering) pour savoir comment éviter cela. {amp-img6} {/amp-img6}

3. Si votre page comprend des extensions de retard d'affichage (par exemple, amp-experiment, amp-dynamic-css-classes, amp-story), préchargez ces extensions car elles sont requises par le runtime AMP pour afficher la page.

[sourcecode:html]
<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/amp-custom-css-0.1.js">
<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/story-1.0.js">[/sourcecode]

1. Utilisez la [préconnexion](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/) pour accélérer la connexion à une autre origine où l'URL complète de la ressource n'est pas connue à l'avance, par exemple, lors de l'utilisation de Google Fonts:

[sourcecode:html]<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>[/sourcecode]

1. Chargez le runtime AMP:

[sourcecode:html]<script async src="https://cdn.ampproject.org/v0.js"></script>[/sourcecode]

1. Spécifiez les balises `<script>` pour les [extensions de retard d'affichage](https://github.com/ampproject/amphtml/blob/master/src/render-delaying-services.js) (p. ex., [`amp-experiment`](../../../documentation/components/reference/amp-experiment.md) [`amp-dynamic-css-classes`](../../../documentation/components/reference/amp-dynamic-css-classes.md) et [`amp-story`](../../../documentation/components/reference/amp-story.md)
2. Spécifiez les balises `<script>` pour les extensions restantes (par exemple, [`amp-bind`](../../../documentation/components/reference/amp-bind.md) ...). Ces extensions ne retardent l'affichage et ne doivent donc pas être préchargées car elles consommer supprimer une bande passante importante pour l'affichage initial.
3. Spécifiez les styles personnalisés à l'aide de la balise `<style amp-custom>`.
4. Ajoutez toutes les autres balises autorisées dans la section `<head>`. En particulier, toutes les polices externes doivent être appliquées en dernier puisqu'elles bloquent l'affichage.
5. Enfin, spécifiez le [modèle standard AMP](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md). En mettant le modèle standard en dernier, il empêche les styles personnalisés de remplacer accidentellement les règles css standard.

[tip] Le cache AMP effectue toutes ces optimisations automatiquement (et d'autres encore). Vous pouvez utiliser l'outil AMP Optimizer pour effectuer automatiquement ces optimisations sur votre propre origine. [/tip]

### Précharger des images de héros <a name="preload-hero-images"></a>

[AMP HTML utilise son propre élément image: `amp-img`](../../../documentation/components/reference/amp-img.md). Si [`amp-img`](../../../documentation/components/reference/amp-img.md) présente de nombreux avantages comparé à la balise HTML traditionnelle `img`, l'un de ses inconvénients est que le runtime AMP doit être chargé pour que le téléchargement de l'image puisse démarrer. Pour certaines images, telles que les images de héros d'une page de produit, il est crucial que les images puissent charger le plus rapidement possible. Dans ces cas, il est préférable de précharger l'image afin d'assurer que le navigateur démarre le téléchargement aussitôt que possible sans devoir attendre le chargement complet du runtime AMP.

[sourcecode:html]

<head>
  <link rel="preload" href="/images/elephants.png" as="image">
</head>
<body>
  ...
  <amp-img width="404" height="720" layout="responsive"
           src="/images/elephants.png" alt="..." >
  </amp-img>
</body>
[/sourcecode]

Mais que faire si votre mise en page interactive nécessite différentes images de héros en fonction de la largeur de l'écran? Par exemple, une image large pour ordinateur de bureau et une image plus petite pour mobile comme celle-ci:

[sourcecode:html]
<amp-img width="404" height="720"
    alt="..." layout="responsive"
    src="/images/elephants_narrow.png"
    media="(max-width: 415px)">
</amp-img>
<amp-img height="720"
    alt="..." layout="fixed-height"
    src="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
</amp-img>
[/sourcecode]

La bonne nouvelle est que `link rel=preload` prend également en charge les requêtes multimédias. Nous pouvons donc utiliser les mêmes requêtes multimédias dans nos déclarations de préchargement, comme ceci:

[sourcecode:html]

<link rel="preload" as="image"
    href="/images/elephants_narrow.png"
    media="(max-width: 415px)">
<link rel="preload" as="image"
    href="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
[/sourcecode]

En passant, la même approche est valable pour les images d'affiche [`amp-video`](../../../documentation/components/reference/amp-video.md):

[sourcecode:html]

<link rel="preload" href="/images/poster.jpg" as="image">
...
 <amp-video width="480" height="270" src="elephant.mp4"
             poster="/images/poster.jpg"
             layout="responsive">
     ...
</amp-video>
[/sourcecode]

Assurez-vous juste de placer les déclarations de préchargement *après* la déclaration de fenêtre, car le navigateur a besoin des dimensions de la fenêtre pour déterminer la largeur de l'écran.

[sourcecode:html]

<meta name="viewport" content="width=device-width">
...
<link rel="preload" media="(max-width: 415px)" ...>
[/sourcecode]

[tip type="important"] Ne préchargez que les images cruciales, sinon le téléchargement de l'image peut utiliser la bande passante nécessaire pour d'autres téléchargements importants. [/tip]

### Pensez à utiliser un service worker

Maintenant que tous les [principaux navigateurs prennent en charge les services workers](https://caniuse.com/#feat=serviceworkers), il est judicieux d'évaluer s'il est avantageux d'ajouter un service worker à votre site.

Nous savons qu'il existe deux modèles architecturaux différents qui fonctionneront pour des navigations rapides et fiables:

- Pour les applications monopage: le modèle App Shell (appelé [AMP-in-PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md) dans le contexte AMP). Ce modèle nécessite un service worker pour mettre à niveau un document AMP vers l'expérience PWA basée sur le shell d'application.
- Pour les applications multi-pages: [diffusion de ressources composites](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses). Un service worker met en cache l'en-tête et le pied de page statiques et utilise la diffusion en continu pour renvoyer instantanément une réponse partielle en cache lors du chargement du contenu.

Si aucun de ces modèles n'est utilisé et qu'il n'est pas possible de mettre en cache l'ensemble du site (ce qui n'est raisonnable que pour les très petits sites), un service worker peut avoir un [impact négatif sur les performances](https://developers.google.com/web/updates/2017/02/navigation-preload). La meilleure solution dans ce cas est de **ne pas** utiliser un service worker.

Cependant, si vous souhaitez que votre site Web puisse être [installé à partir de l'écran d'accueil](https://developers.google.com/web/fundamentals/app-install-banners/) ou que vous souhaitez offrir une expérience hors ligne, vous devrez utiliser un service worker. Dans ce cas, il est important d'utiliser [la précharge de la navigation](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw) pour atténuer le ralentissement potentiel (Remarque: actuellement, la précharge de la navigation n'est prise en charge que dans Chrome).

Si votre site Web AMP utilise un service worker, voici quelques bonnes pratiques:

- Mettez en cache le [runtime AMP](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime) et les extensions (par exemple, [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md)).
- Mettez en cache les logos, polices et autres contenus statiques utilisés sur la plupart de vos pages.
- Diffusez des logos, des polices et des images en utilisant une [stratégie cache-first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network).
- Diffusez le runtime et les extensions AMP à l'aide d'une stratégie [stale-while-validate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate).
- Lorsque vous utilisez une stratégie axée sur le réseau pour les demandes de navigation, assurez-vous d'activer le [préchargement de navigation](https://developers.google.com/web/updates/2017/02/navigation-preload).

Si vous recherchez un moyen de démarrer avec un service worker dans votre site AMP, consultez cet [exemple](https://www.google.com/url?q=https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449&sa=D&ust=1529413323498000&usg=AFQjCNE4fepX-hqVeRBW8df43uV5Bi4Llg) qui fournit un service worker qui implémente toutes ces bonnes pratiques.

[tip type="note"] Le runtime AMP est diffusé avec une durée maximale de 50 minutes seulement pour garantir que les mises à jour sont disponibles rapidement. Pour éviter les échecs probables du cache du navigateur, il est judicieux de servir le runtime AMP à partir d'un service worker. [/tip]

La mise en cache n'est pas seulement pertinente pour la transition des pages AMP mises en cache vers des pages non AMP sur votre propre origine, mais également pour la transition des pages AMP mises en cache vers des pages AMP sur votre propre origine. La raison en est que le cache AMP réécrit les URL du runtime AMP de l'URL permanente vers la dernière version publiée, par exemple:

`https://cdn.ampproject.org/v0.js` -> `https://cdn.ampproject.org/rtv/001515617716922/v0.js`.

Par conséquent, une page AMP diffusée à partir de votre propre origine ne bénéficie pas de la mise en cache du navigateur et doit dans ce cas télécharger à nouveau le runtime AMP (sans version). Avec un service worker, vous pouvez mettre en cache en amont le runtime AMP non versionné et accélérer la transition. Pour en savoir plus sur les raisons pour lesquelles le cache AMP crée des version d'URL du runtime AMP, lisez [ce document](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer##versioned-amp-runtime).

[tip type="note"] Dans Safari, il existe une différence essentielle dans la façon dont les service workers sont implémentés: il n'est pas possible dans Safari d'installer un service worker pour votre origine, si la page est diffusée à partir d'un cache AMP. [/tip]

### Optimiser les polices personnalisées <a name="optimize-custom-fonts"></a>

Avec AMP, vous pouvez faire plusieurs choses pour optimiser le chargement de vos polices ([la plupart d'entre elles ne sont en fait pas spécifiques à AMP](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)):

- Si possible, utilisez [font-display: optional](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display): cela n'utilisera la police que si elle se trouve déjà dans le cache, et utilise la police système si votre police personnalisée n'a pas encore été chargée.
- Optimisez vos polices Web (par exemple, fournissez des polices personnalisées à l'aide de WOFF2).
- Préchargez les polices personnalisées:

[sourcecode:html]
<link rel="preload" as="font" href="/bundles/app/fonts/helveticaneue-roman-webfont.woff2" >[/sourcecode]

- Si vous utilisez Google Fonts ou tout autre fournisseur de polices avec des URL de polices inconnues, préconnectez le serveur de polices respectif:

[sourcecode:html]
 <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
[/sourcecode]

Dernier point mais non le moindre, essayez de minimiser le nombre de polices personnalisées que vous utilisez sur votre page. Si vous le pouvez, utilisez les polices système au lieu de polices personnalisées, car les polices système font correspondre votre site Web au système d'exploitation de l'utilisateur et évitent de charger davantage de ressources.

### Mises en page AMP d'affichage côté serveur <a name="server-side-rendering"></a>

Les mises en page AMP d'affichage côté serveur sont une technique que les caches AMP utilisent pour accélérer davantage le temps de chargement. Avec l'affichage côté serveur, il est possible de supprimer le modèle AMP afin que le document AMP puisse être peint sans exécuter le JavaScript du runtime AMP. Par exemple, la version affichée côté serveur du générateur de modèles AMP est [deux fois plus rapide](https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&thumbSize=200&ival=500&end=visual) que la version AMP normale!

Si vous publiez une page AMP, vous devez absolument envisager d'utiliser [AMP Optimizer](amp-optimizer-guide/index.md). Les optimiseurs AMP vous permettent de diffuser des pages AMP optimisées à partir de votre propre back-end, qui comprend des mises en page AMP d'affichae côté serveur. AMP Optimizer effectue également automatiquement de nombreuses autres optimisations décrites dans ce document.

### Optimisations de base <a name="basic-optimizations"></a>

Bien entendu, toutes les bases de l'optimisation des performances Web s'appliquent également aux pages AMP:

- [Optimisez les images](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) et les vidéos. L'optimisation des images peut avoir un impact considérable sur les performances de chargement.
- [Compressez et réduisez le CSS et le HTML](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer). Parce que tous les CSS des pages AMP sont intégrés, il vaut la peine d'utiliser un élément du type [purifycss](https://github.com/purifycss/purifycss) pour supprimer les CSS inutilisés.
- Utiliser la [mise en cache HTTP](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- ... et plus encore
