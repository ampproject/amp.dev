---
'$title': Accès hors ligne facile et performances améliorées
$order: 11
description: Un service worker est un proxy côté client qui se trouve entre votre page et votre serveur, et est utilisé pour créer des expériences hors ligne fantastiques, ...
formats:
  - websites
author: CrystalOnScript
contributors:
  - pbakaus
---

Les [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) offrent des expériences hors ligne riches et des expériences utilisateur cohérentes sur différentes forces du réseau. En mettant en cache des ressources dans le navigateur, une application Web est en mesure de fournir des données, des ressources et des pages hors ligne à l'utilisateur pour le maintenir engagé et informé.

N'oubliez pas: le service worker ne peut pas interagir avec la version mise en cache AMP de votre page. Utilisez-le pour vos futures expériences sur votre site d'origine.

## Comment installer un Service Worker

Un service worker est un proxy côté client qui se trouve entre votre page et votre serveur, et est utilisé pour créer des expériences hors ligne fantastiques, des scénarios de shell d'application à chargement rapide et envoyer des notifications push.

[tip type="note"] **REMARQUE –** Si le concept de service worker vous est nouveau, lisez la section [Introduction aux fondamentaux Web](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers). [/tip]

Votre service worker doit être enregistré sur une page donnée, sinon le navigateur ne le trouvera pas ou ne l'exécutera pas. Par défaut, cela se fait avec [un peu de JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration). Sur les pages AMP, vous pouvez utiliser le composant [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) pour ce même but.

Pour cela, incluez d'abord le composant [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) via son script dans la section `<head>` de votre page:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

Ajoutez ensuite ce qui suit quelque part dans votre `<body>` (modifiez-le pour pointer vers votre service worker réel):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Si l'utilisateur navigue vers vos pages AMP sur votre origine (par opposition au premier clic, qui est généralement fourni à partir d'un cache AMP), le service worker prendra le relais et pourra faire une [myriade de choses intéressantes](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux).

## Le service worker AMP

Si vous êtes ici, c'est que vous créez des pages avec AMP. L'équipe AMP se soucie énormément de donner la priorité à l'utilisateur et de lui offrir une expérience Web de classe mondiale. Pour que ces expériences restent cohérentes, l'équipe AMP a créé un service worker spécialement pour AMP!

[tip type="default"] **CONSEIL –** Suivez notre tutoriel pour apprendre à utiliser le [service worker AMP dans votre PWA](/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/amp_to_pwa.md). [/tip]

### Installing the AMP Service Worker

Installez le Service Worker AMP en quelques étapes simples:

- [sourcecode:js] importScripts('https://cdn.ampproject.org/sw/amp-sw.js'); [/sourcecode]

- [sourcecode:js]
  AMP_SW.init();
  [/sourcecode]

- Terminé.

### Mise en cache automatisée

Le service worker AMP met automatiquement en cache les fichiers de script AMP et les documents AMP. En mettant en cache les fichiers de script AMP, ils sont instantanément disponibles sur le navigateur des utilisateurs, ce qui permet une fonctionnalité hors ligne et des pages plus rapides sur des réseaux lents.

Si votre application nécessite des types spécifiques de mise en cache de documents, le service worker AMP permet la personnalisation, comme l'ajout d'une liste de refus pour les documents qui doivent toujours être demandés au réseau. Dans l'exemple suivant, remplacez `Array<RegExp>` par un groupe d'expressions régulières représentant les documents que vous souhaitez éviter de mettre en cache.

[sourcecode:js]
AMP_SW.init(
documentCachingOptions: {
denyList?: Array<RegExp>;
}
);
[/sourcecode]

En savoir plus sur la [personnalisation de la mise en cache des documents ici](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching).

### Optimisation du service worker AMP

Pour utiliser le service worker AMP avec toutes ses capacités, les champs facultatifs doivent être configurés pour mettre en cache les ressources nécessaires et prérécupérer les liens.

Les ressources qui guident la visite d'un utilisateur sur une page, comme une vidéo, des images importantes ou un PDF téléchargeable, doivent être mises en cache afin de pouvoir être à nouveau accessibles si l'utilisateur est hors ligne.

[sourcecode:js]
AMP_SW.init(
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
);
[/sourcecode]

Vous pouvez personnaliser la stratégie de mise en cache et définir une liste de refus.

Les liens vers les pages que vos utilisateurs souhaiteraient visiter peuvent être préchargés, ce qui leur permet d'être consultés hors ligne. Cela se fait en ajoutant un attribut `data-prefetch` à la balise du lien.

[sourcecode:html]
<a href='....' data-rel='prefetch' />
[/sourcecode]

### Expérience hors ligne

Indiquez à l'utilisateur qu'il est hors ligne et qu'il doit essayer de recharger le site lorsqu'il est de nouveau en ligne, en incluant une page hors ligne. Le service worker AMP peut mettre en cache à la fois la page et ses ressources.

[sourcecode:js]
AMP_SW.init({
offlinePageOptions: {
url: '/offline.html';
assets: ['/images/offline-header.jpg'];
}
})
[/sourcecode]

Une page hors ligne réussie semble faire partie de votre site grâce à son interface utilisateur cohérente avec le reste de l'application.

### Forcer la mise à jour

L'équipe travaille pour implémenter une fonctionnalité de mise à jour/suppression forcée si votre service sorker AMP doit être désactivé ou modifié si un déploiement auprès des utilisateurs a mal tourné.

Pour gérer efficacement un service worker, vous devez comprendre comment [la mise en cache HTTP standard affecte la façon dont le JavaScript de votre service worker est mis à jour](https://developers.google.com/web/updates/2018/06/fresher-sw). Les service workers diffusés avec les directives de mise en cache HTTP appropriées peuvent résoudre de petites corrections de bogues en apportant les modifications appropriées et en redéployant votre service worker dans votre environnement d'hébergement. Si vous devez supprimer un service worker, il est judicieux de conserver à portée de main un fichier de service worker simple et [non opérationnel](https://en.wikipedia.org/wiki/NOP), comme celui-ci:

```js
self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});
```

[tip type="read-on"] [Lire plus](https://stackoverflow.com/questions/33986976/how-can-i-remove-a-buggy-service-worker-or-implement-a-kill-switch/38980776#38980776) sur la gestion des service workers déployés. [/tip]

## Comment écrire un service worker personnalisé

Vous pouvez utiliser la technique ci-dessus pour activer l'accès hors ligne à votre site Internet AMP, ainsi que pour étendre vos pages **dès qu'elles sont diffusées depuis l'origine**. En effet, vous pouvez modifier la réponse via l'événement `fetch` du service worker et renvoyer la réponse de votre choix:

[sourcecode:js]
self.addEventListener('fetch', function(event) {
event.respondWith(
caches.open('mysite').then(function(cache) {
return cache.match(event.request).then(function(response) {
var fetchPromise = fetch(event.request).then(function(networkResponse) {
cache.put(event.request, networkResponse.clone());
return networkResponse;
})

        // Modify the response here before it goes out..
        ...

        return response || fetchPromise;
      })
    })

);
});
[/sourcecode]

En utilisant cette technique, vous pouvez modifier votre page AMP avec toutes sortes de fonctionnalités supplémentaires qui échoueraient autrement la [validation AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), telles que:

- Les fonctionnalités dynamiques nécessitant un JS personnalisé.
- Les composants personnalisés/pertinents uniquement pour votre site.
