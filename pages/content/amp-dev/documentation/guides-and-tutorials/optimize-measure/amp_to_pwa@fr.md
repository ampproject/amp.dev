---
'$title': Transformer votre site AMP en PWA
$order: 10
description: "En mettant en cache des ressources dans le navigateur, une PWA est en mesure de fournir des données, des ressources et des pages hors ligne à l'utilisateur pour le maintenir engagé et informé."
tutorial: 'true'
formats:
  - websites
author: crystalonscript
---

Les applications Web progressives exploitent la puissance des [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) pour offrir de riches fonctionnalités hors ligne et des expériences utilisateur cohérentes sur différentes forces de réseau. En mettant en cache des ressources dans le navigateur, une PWA est en mesure de fournir des données, des ressources et des pages hors ligne à l'utilisateur pour le maintenir engagé et informé.

Ce tutoriel vous apprendra comment transformer un site AMP en PWA installable avec des fonctionnalités hors ligne en ajoutant un manifeste Web et un service worker alimentés par le service worker AMP.

# Télécharger et exécuter le code de démarrage

Téléchargez le [code de démarrage ici](/static/files/tutorials/amptopwa.zip).

Utilisez un serveur Web local pour prévisualiser le site Web.

[tip type="default"] **CONSEIL -** Pour un serveur Web rapide, exécutez `python -m SimpleHTTPServer`. [/tip]

Vous devriez pouvoir voir la page de destination de Lyrical Lightning, le festival Mobile Music Magic. Il contient un lien sur la page d'accueil pour voir le programme et sur quelle scène les groupes sont.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

Les utilisateurs de notre site peuvent avoir une connectivité réseau variable lors de l'événement, alors qu'ils voudront probablement accéder au programme. Ce site est alors un candidat idéal à transformer en PWA qui peut être installée sur l'écran d'accueil de notre utilisateur et fournit toutes les fonctionnalités essentielles même hors ligne.

# Créer un manifeste d'application Web

Le [manifeste de l'application Web](https://developers.google.com/web/fundamentals/web-app-manifest/) est un simple fichier JSON qui informe le navigateur de votre application Web et de la manière dont elle doit se comporter lorsqu'elle est « installée » sur l'appareil mobile ou de bureau de l'utilisateur. La possession d'un manifeste est requise par de nombreux navigateurs pour afficher l'invite [Ajouter à l'écran d'accueil](https://developers.google.com/web/fundamentals/app-install-banners/).

Ajoutez un fichier intitulé `manifest.json` à votre référentiel avec le code suivant:

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# Ajouter le service worker AMP

Un service worker est un script que votre navigateur exécute en arrière-plan, distinct d'une page Web, qui étend les fonctionnalités du navigateur en mettant en cache les demandes pour améliorer les performances et en fournissant des fonctionnalités hors ligne. Il est possible de créer un service worker à partir de zéro, mais cela prend du temps. Les bibliothèques comme Workbox peuvent être utiles, mais AMP va encore plus loin en offrant le [service worker AMP](https://github.com/ampproject/amp-sw), dans lequel AMP automatise directement de nombreuses étapes, y compris la mise en cache des scripts, ressources et documents AMP, ainsi que l'implémentation des bonnes pratiques courantes telles que le [préchargement de la navigation](https://developers.google.com/web/updates/2017/02/navigation-preload).

Le service worker AMP [met automatiquement en cache les scripts](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching) et [documents AMP](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) comme le demande l'utilisateur après l'installation. Nous allons commencer par ajouter le service worker AMP de base.

## Créez le fichier de service worker

Créez un fichier appelé `sw.js` et ajoutez le code suivant:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

Avec seulement deux lignes de code, cela importe le service worker AMP dans votre service worker et initialise ce dernier.

## Installez automatiquement votre service worker sur vos pages AMP

Les sites Web AMP utilisent le composant [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) pour installer le service worker en arrière-plan du navigateur, pendant que l'utilisateur apprécie votre contenu.

Placez la balise de script requise dans l'en-tête de `index.html` et l'élément `<amp-install-serviceworker>` dans la section `<body>`:

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **Important -** Le service worker doit être diffusé depuis le répertoire racine ( `/sw.js` ) pour pouvoir mettre en cache tout le contenu de votre site. [/tip]

`<amp-install-serviceworker>` installe le service worker en créant une iframe et en exécutant le fichier `data-iframe-src`. Créez le fichier `install-sw.html` et ajoutez le code suivant:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

L'iframe enregistre le fichier du service worker AMP dans le navigateur.

# Personnalisez ce qui est mis en cache

Le service worker AMP offre des avantages intégrés tout en autorisant des champs facultatifs que vous pouvez configurer pour les optimiser en fonction des besoins de votre application.

Notre application de festival de musique mettra en cache nos ressources d'image, récupérera le lien de programmation en amont et spécifiera une page hors ligne.

## Mettez les ressources en cahce

Vous pouvez configurer le service worker AMP de sorte qu'il [mette en cache des ressources](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching), telles que des images, des vidéos et des polices. Nous allons utiliser cette option pour mettre en cache notre image d'arrière-plan et le logo AMP. Ouvrez le fichier `sw.js` et mettez-le à jour avec le code ci-dessous:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

Nous avons spécifié comme stratégie de mise en cache la [priorité au cache](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network). Cela signifie que l'application essaiera de diffuser les images du cache avant de demander quoi que ce soit au réseau. Ceci est particulièrement utile pour cette application car nous ne mettrons pas à jour notre image d'arrière-plan ou le logo AMP.

## Préchargez les liens

Le service worker AMP récupère en amont les liens qui ont l'attribut `data-rel=prefetch`. Cela permet aux utilisateurs d'afficher des pages hors ligne même s'ils ne les ont pas encore consultées. Nous ajouterons cet attribut à notre balise de lien pour `lineup.html`.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# Affichez une page hors ligne

Pour faire face aux cas surprise ou aux clics involontaires sur des liens vers des pages que nous n'avons pas préchargées, nous ajouterons une page hors ligne pour offrir une expérience utilisateur cohérente ciblée, par opposition à l'affichage de la page hors connexion générique du navigateur. Téléchargez [`offline.html` ici](/static/files/tutorials/offline.zip) et mettez à jour `sw.js` avec le code suivant:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# Testez votre PWA

Vous pouvez vérifier si votre service worker AMP met en cache les ressources nécessaires et fournit une solution hors ligne idéale via [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps).

Nous allons tester Lyrical Lyghtning en ouvrant le panneau DevTools en appuyant sur `Ctrl + Shift + I` sous Windows ou `Cmd + Opt + I` sur Mac. Vous pouvez également faire un clic droit sur la page et sélectionner `inspect` dans le menu. Sélectionnez ensuite `Application` pour afficher l'inscription de votre service worker.

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

Cliquez sur la case `offline` pour passer en mode hors ligne. Cliquez sur le lien `see full lineup` et accédez à `offline.html` pour vérifier si elles ont été correctement mises en cache et préchargées.

[tip type="default"] **CONSEIL -** Pour une analyse approfondie des fonctionnalités d'une application Web progressive, exécutez [l'outil Lighhouse de Google](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool) pour générer un rapport. [/tip]

# Félicitations!

Vous avez créé avec succès une PWA avec AMP! Dans ce tutoriel, vous avez appris à:

- Créer un [manifeste d'application Web](https://developers.google.com/web/fundamentals/web-app-manifest/)
- Installer un service worker AMP à l'aide de [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)
- Personnaliser le [service worker AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)
- Préchargez les liens
- Créer une page hors ligne

plus de détails sur les [service workers](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) et [les points essentiels sur les UX hors ligne](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux). Apprenez à créer [suivre l'engagement avec les analyses](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html) et suivez le tutoriel sur [la configuration des analyses de base pour vos pages AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html).
