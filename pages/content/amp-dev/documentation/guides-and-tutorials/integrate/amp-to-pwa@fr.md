---
'$title': Préchargez votre PWA depuis vos pages AMP
$order: 1
description: "Une bonne stratégie serait de définir une page AMP comme point d'entrée à votre site, de préparer la PWA en arrière-plan et de basculer ..."
formats:
  - websites
author: pbakaus
---

Une bonne stratégie serait de définir **une page AMP comme point d'entrée à votre site**, de **préparer la PWA en arrière-plan** et de basculer vers la PWA pour la suite:

- Toutes les pages « feuilles » de contenu (celles qui ont un contenu spécifique, pas les pages de présentation) sont publiées en tant que pages AMP pour une expérience de chargement quasi instantanée.
- Ces pages AMP utilisent l'élément spécial d'AMP [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) pour préparer le cache et le shell de la PWA tandis que l'utilisateur profite de votre contenu.
- Lorsque l'utilisateur clique sur un autre lien sur votre site Internet (par exemple, l'appel à l'action en bas pour une expérience plus semblable à une application), le Service Worker intercepte la demande, prend le contrôle de la page et charge le shell PWA à la place.

Lisez la suite pour savoir pourquoi et comment utiliser ce modèle de développement.

## Améliorer le parcours utilisateur en vous connectant à une PWA

### AMP pour l'acquisition initiale de l'utilisateur

AMP est une solution idéale pour les **pages feuilles**, c'est-à-dire les pages de contenu que vos utilisateurs découvrent naturellement depuis un moteur de recherche, un lien partagé par un ami ou à partir d'un lien sur un autre site. Grâce à la fonction de [pré-affichage spécialisé](../../../about/how-amp-works.html) d'AMP, les pages AMP se chargent très vite, ce qui réduit considérablement les abandons (la dernière [étude DoubleClick](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) montre que **plus de 53% des utilisateurs abandonnent au bout de 3 secondes**).

### PWA pour une interactivité et un engagement riches

Les applications Web progressives permettent une interactivité et un engagement beaucoup plus importants, mais ne présentent pas les _caractéristiques de chargement initial immédiat_ d'une page AMP. Au cœur de ces applications se trouve une technologie appelée Service Worker, un proxy côté client qui vous permet de mettre en cache toutes sortes de ressources pour vos pages, mais Service Worker ne s'active _qu'après_ le premier chargement.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='The pros and cons of AMP vs. PWA.') }}

## Préparez votre PWA avec `amp-install-serviceworker`

AMP a la possibilité d'installer le Service Worker de votre application Web progressive à partir d'une page AMP, et ce, même si cette page AMP est servie à partir d'un AMP Cache! Si cela est fait correctement, un lien menant à votre PWA (à partir de l'une de vos pages AMP) se chargera de manière quasi instantanée, comme au premier chargement de la page AMP.

[tip type="tip"] **CONSEIL -** Si vous n'êtes pas encore familier avec Service Worker, je recommande vivement le [cours Udacity de](https://www.udacity.com/course/offline-web-applications--ud899) Jake Archibald. [/tip]

Tout d'abord, installez le Service Worker sur toutes vos pages AMP à l'aide de [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), en incluant d'abord le composant via son script dans l'attribut `<head>` de votre page:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

Then add the following somewhere within your `<body>` (modify to point to your actual Service Worker):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

En fin de compte, lors de l'étape d'installation du service worker, mettez en cache toutes les ressources dont la PWA aura besoin:

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
'/',
'/styles/main.css',
'/script/main.js'
];

self.addEventListener('install', function(event) {
// Perform install steps
event.waitUntil(
caches.open(CACHE_NAME)
.then(function(cache) {
console.log('Opened cache');
return cache.addAll(urlsToCache);
})
);
});
[/sourcecode]

[tip type="tip"] **CONSEIL -** Il existe des moyens plus simples d'utiliser un Service Worker. Jetez un œil aux [bibliothèques d'assistance Service Worker](https://github.com/GoogleChrome/sw-helpers). [/tip]

## Diriger tous les liens d'une page AMP vers la PWA

Il est fort probable que la plupart des liens sur vos pages AMP conduisent plus à des pages de contenu. Il existe deux stratégies pour s'assurer que les futurs liens entraînent une « mise à niveau » de l'application Web progressive, [en fonction de la façon dont vous utilisez AMP](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md):

### 1. Si vous associez vos pages canoniques à des pages AMP

Dans ce cas, vous disposez d'un site Web canonique (non AMP) et générez des pages AMP liées à ces pages canoniques. C'est l'utilisation actuelle la plus courante d'AMP, et cela signifie que les liens sur vos pages AMP seront probablement associés à la version canonique de votre site. **Bonne nouvelle: si votre site canonique est votre PWA, vous êtes prêt**.

### 2. Si votre site canonique est AMP

In this case your canonical pages _are_ your AMP pages: You're building your entire website with AMP, and simply use AMP as a library (fun fact: the very site you're reading this on is built this way). **In this scenario, most links on your AMP pages will lead to other AMP pages.**

Vous pouvez maintenant déployer votre PWA sur un chemin distinct comme `your-domain.com/pwa` et utiliser le Service Worker qui est déjà en cours d'exécution pour **intercepter le navigateur lorsque quelqu'un clique sur un lien sur la page AMP**:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
if (event.request.mode === 'navigate') {
event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

Ce qui est particulièrement intéressant à propos de cette technique, c'est que vous utilisez désormais l'amélioration progressive pour passer d'AMP à PWA. Cependant, cela signifie aussi logiquement que les navigateurs qui ne prennent pas encore en charge les Service Workers passeront d'AMP à AMP et ne navigueront jamais réellement vers la PWA.

AMP résout ce problème grâce à la technique appelée [réécriture d'URL de shell](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite). En ajoutant un modèle d'URL de secours à la balise [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), vous demandez à AMP de réécrire tous les liens correspondants sur une page donnée de sorte à ce qu'ils dirigent vers une autre URL de shell existante à la place, si aucune prise en charge de Service Worker n'est détectée.

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

Une fois ces attributs en place, tous les clics suivants sur une page AMP dirigeront vers votre PWA, quel que soit le Service Worker.

[tip type="read-on"] **LIRE LA SUITE -** Vous êtes déjà arrivé si loin; pourquoi ne pas réutiliser vos pages AMP existantes pour créer votre PWA? [Voici comment](amp-in-pwa.md). [/tip]
