---
"$title": Comment les pages AMP sont mises en cache
"$order": '0'
description: "Dans ce document, vous découvrirez le rôle du cache AMP dans l'écosystème AMP et comment votre page AMP est mise en cache."
formats:
- websites
- stories
- ads
---

Dans ce document, vous découvrirez le rôle du cache AMP dans l'écosystème AMP et comment votre page AMP est mise en cache.

## Qu'est-ce qu'un cache AMP ?

Un <a>cache AMP</a> est un réseau de distribution de contenu (CDN) basé sur un proxy pour la diffusion de documents AMP valides. Les caches AMP sont conçus pour:

1. Serve only valid AMP pages.
2. Permettre aux pages AMP d'être préchargées efficacement et en toute sécurité.
3. Effectuer des optimisations supplémentaires des performances du contenu, avantageuses pour l'utilisateur.

[tip type="note"] Les e-mails AMP sont exempts du cache AMP. [/tip]

Apprenez-en davantage sur les caches AMP dans la vidéo YouTube ci-dessous ou dans l'article de blog [Pourquoi les caches AMP existent-ils](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456).

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='Regardez cette vidéo pour découvrir pourquoi les caches AMP existent.']

## Quels sont les caches AMP disponibles ?

Actuellement, il existe deux fournisseurs de cache AMP :

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP is an open ecosystem and the AMP Project actively encourages the development of more AMP Caches.  To learn about creating AMP Caches, see the [AMP Cache Guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## Comment choisir un cache AMP ?

As a publisher, you don't choose an AMP Cache, it's *actually the platform* that links to your content that chooses the AMP Cache (if any) to use.

This is an inversion of the typical model where content delivery is the responsibility of the publisher.  However, this model allows platforms to provide their users with predictable load performance and among other things allows them to ensure required security and privacy invariants during AMP’s pre-rendering phase. To learn about the strict guidelines for creating AMP Caches, see the [AMP Cache Guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## Puis-je désactiver la mise en cache ?

Caching is a core part of the AMP ecosystem. Publishing a valid AMP document automatically opts it into cache delivery.

Si vous souhaitez ne pas mettre votre document en cache, une option consiste à supprimer l'attribut `amp` de la balise HTML. Cela rend le document AMP techniquement invalide, sans affecter la fonctionnalité du document.

## Qui demande les pages AMP mises en cache ?

Cached AMP pages are accessed by platforms (like Google Search, Google News, and Bing) and mobile apps. Mobile apps can link to cached AMP content via the URL (see Google's [AMP URL API](https://developers.google.com/amp/cache/use-amp-url)) or by cross-origin XHRs in  Progressive Web Apps (learn more in [Embed & use AMP as a data source](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)).

<amp-img src="/static/img/docs/platforms_accessing_cache.png" width="1054" height="356" layout="responsive" alt="platforms and mobile apps access cached AMP pages"></amp-img>

## Comment ma page AMP est-elle mise en cache ?

By using the AMP format, you are making your content available to be cached by AMP Caches. There are a few ways that your AMP page can end up in an AMP Cache:

- **Découverte de plateformes** : les plateformes découvrent votre contenu AMP via l abalise `<html ⚡>` ou `<html amp>` et mettent le contenu en cache. Par exemple, la recherche Google explore le contenu ; pour toutes les pages AMP identifiées et valides, le contenu est ajouté au cache Google AMP.

- **Cache URL request**: Platforms can specifically request an AMP page by using the AMP Cache URL format.  The AMP Cache acts as a reverse proxy, therefore, when the platform accesses the page, it results in the page being cached automatically.

    - Google AMP Cache URL example: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

[tip type="note"] **REMARQUE -** L'URL du cache AMP n'est pas une URL destinée à l'utilisateur, c'est-à-dire que les utilisateurs ne demandent généralement pas de contenu via ces URL. [/tip]

- **Ajout de l'éditeur** : les éditeurs peuvent spécifiquement ajouter la page AMP au cache AMP.  Cette option est applicable uniquement pour le cache AMP de Google (voir [Cache Google AMP : mise à jour du contenu AMP](https://developers.google.com/amp/cache/update-cache)).

## Ressources supplémentaires

- [AMP Project's AMP Cache guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md)
- [Google AMP Cache overview](https://developers.google.com/amp/cache/overview)
- [Documentation du cache AMP de Bing](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
