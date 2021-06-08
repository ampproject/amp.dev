---
'$title': Comment les pages AMP sont mises en cache
$order: 0
description: "Dans ce document, vous découvrirez le rôle du cache AMP dans l'écosystème AMP et comment votre page AMP est mise en cache."
formats:
  - websites
  - stories
  - ads
---

Dans ce document, vous découvrirez le rôle du cache AMP dans l'écosystème AMP et comment votre page AMP est mise en cache.

## Qu'est-ce qu'un cache AMP ?

Un <a>cache AMP</a> est un réseau de distribution de contenu (CDN) basé sur un proxy pour la diffusion de documents AMP valides. Les caches AMP sont conçus pour:

1. Diffuser uniquement des pages AMP valides.
2. Permettre aux pages AMP d'être préchargées efficacement et en toute sécurité.
3. Effectuer des optimisations supplémentaires des performances du contenu, avantageuses pour l'utilisateur.

[tip type="note"] Les e-mails AMP sont exempts du cache AMP. [/tip]

Apprenez-en davantage sur les caches AMP dans la vidéo YouTube ci-dessous ou dans l'article de blog [Pourquoi les caches AMP existent-ils](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456).

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='Regardez cette vidéo pour découvrir pourquoi les caches AMP existent.']

## Quels sont les caches AMP disponibles ?

Actuellement, il existe deux fournisseurs de cache AMP :

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP est un écosystème ouvert et le Projet AMP encourage activement le développement d'autres caches AMP. Pour en savoir plus sur la création de caches AMP, consultez les [instructions relatives au cache AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md).

## Comment choisir un cache AMP ?

En tant qu'éditeur, vous ne choisissez pas un cache AMP, c'est en fait _la plateforme_ liée à votre contenu qui choisit le cache AMP (le cas échéant) à utiliser.

Il s'agit d'une inversion du modèle typique où la diffusion du contenu est la responsabilité de l'éditeur. Cependant, ce modèle permet aux plateformes de fournir à leurs utilisateurs des performances de chargement prévisibles et, entre autres, leur permet de garantir les invariants de sécurité et de confidentialité requis pendant la phase de pré-affichage d'AMP. Pour en savoir plus sur les directives strictes de création de caches AMP, consultez les [directives relatives au cache AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md).

## Puis-je désactiver la mise en cache ?

La mise en cache est au cœur de l'écosystème AMP. La publication d'un document AMP valide active automatiquement sa mise en cache.

Si vous souhaitez ne pas mettre votre document en cache, une option consiste à supprimer l'attribut `amp` de la balise HTML. Cela rend le document AMP techniquement invalide, sans affecter la fonctionnalité du document.

## Qui demande les pages AMP mises en cache ?

Les pages AMP mises en cache sont accessibles par des plateformes (comme recherche Google, Google News et Bing) et des applications mobiles. Les applications mobiles peuvent être liées au contenu AMP mis en cache via l'URL (voir l'[API d'URL AMP](https://developers.google.com/amp/cache/use-amp-url) de Google) ou via des XHR d'origine croisée dans les applications Web progressives (en savoir plus dans [Intégrer et utiliser AMP comme source de données](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)).

<amp-img src="/static/img/docs/platforms_accessing_cache.png" width="1054" height="356" layout="responsive" alt="platforms and mobile apps access cached AMP pages"></amp-img>

## Comment ma page AMP est-elle mise en cache ?

En utilisant le format AMP, vous rendez votre contenu disponible pour la mise en cache par les caches AMP. Votre page AMP peut se retrouver dans un cache AMP de plusieurs manières :

- **Découverte de plateformes** : les plateformes découvrent votre contenu AMP via l abalise `<html ⚡>` ou `<html amp>` et mettent le contenu en cache. Par exemple, la recherche Google explore le contenu ; pour toutes les pages AMP identifiées et valides, le contenu est ajouté au cache Google AMP.

- **Requête d'URL de cache** : les plateformes peuvent demander spécifiquement une page AMP en utilisant le format d'URL du cache AMP. Le cache AMP agit comme un proxy inverse, par conséquent, lorsque la plateforme accède à la page, la page est automatiquement mise en cache.

  - Exemple d'URL de Google AMP Cache : `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

[tip type="note"] **REMARQUE -** L'URL du cache AMP n'est pas une URL destinée à l'utilisateur, c'est-à-dire que les utilisateurs ne demandent généralement pas de contenu via ces URL. [/tip]

- **Ajout de l'éditeur** : les éditeurs peuvent spécifiquement ajouter la page AMP au cache AMP. Cette option est applicable uniquement pour le cache AMP de Google (voir [Cache Google AMP : mise à jour du contenu AMP](https://developers.google.com/amp/cache/update-cache)).

## Ressources supplémentaires

- [Directives du cache AMP du Projet AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md)
- [Présentation du cache AMP de Google](https://developers.google.com/amp/cache/overview)
- [Documentation du cache AMP de Bing](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
