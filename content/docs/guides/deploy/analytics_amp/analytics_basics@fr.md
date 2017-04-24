---
$title: "Analytics: les bases"
toc: true
---

Commencez ici pour tout savoir sur les bases des analyses AMP.

[TOC]

## Utiliser amp-pixel ou amp-analytics ?

AMP fournit deux composants pour répondre à vos besoins d'analyse et de mesure :
[amp-pixel](/docs/reference/amp-pixel.html) et
[amp-analytics](/docs/reference/extended/amp-analytics.html).
Ces deux options envoient les données d'analyse à un point d'extrémité prédéfini.

Si vous recherchez des comportements comme un simple
[pixel de suivi](https://en.wikipedia.org/wiki/Web_beacon#Implementation)
le composant `amp-pixel` fournit un suivi de base des vues de page ;
les données sur les vues de page sont envoyées à une URL donnée.
Certaines intégrations avec un fournisseur peuvent appeler ce composant,
auquel cas elles indiqueront le point d'extrémité exact de l'URL.

Pour la plupart des solutions d'analyse, utilisez `amp-analytics`.
Le suivi des vues de page fonctionne également avec `amp-analytics`.
Ce composant vous permet aussi de suivre l'engagement des utilisateurs avec n'importe quel type de contenu sur les pages,
y compris les clics sur des liens et des boutons.
Vous pouvez également mesurer jusqu'où l'utilisateur a fait défiler la page,
savoir s'il a interagi ou non avec des réseaux sociaux et bien plus encore
(voir
[AMP Analytics dans le détail](/fr/docs/guides/analytics/deep_dive_analytics.html)).

Dans le cadre de l'intégration avec la plateforme AMP,
des fournisseurs ont proposé des configurations `amp-analytics` prédéfinies,
de sorte à faciliter considérablement la capture des données et leur transmission à leurs outils de suivi.
Accédez à la documentation des fournisseurs depuis la
[spécification du composant amp-analytics](/docs/reference/extended/amp-analytics.html).

Dans vos pages, vous pouvez utiliser à la fois `amp-pixel` et `amp-analytics` :
`amp-pixel` pour un simple suivi des vues de page
et `amp-analytics` pour tout le reste.
Vous pouvez également ajouter chaque balise plusieurs fois.
Si vous travaillez avec plusieurs fournisseurs de solutions d'analyse,
vous aurez besoin d'une balise par solution.
Rappelez-vous que plus les pages AMP sont simples, mieux c'est pour les utilisateurs.
Donc si vous n'avez pas besoin de balises supplémentaires, ne les utilisez pas.

## Créer une configuration d'analyse simple

Découvrez comment créer une configuration
[amp-pixel](/docs/reference/amp-pixel.html) et
[amp-analytics](/docs/reference/extended/amp-analytics.html) simple.

### Configuration simple de la balise amp-pixel

Pour créer une configuration simple de la balise `amp-pixel`,
insérez un code du type suivant dans le corps de votre page AMP :

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
[/sourcecode]

Dans cet exemple,
les données sur les vues de page sont envoyées à l'URL définie, accompagnées d'un numéro aléatoire.
La variable `RANDOM` est l'une des nombreuses
[variables de substitution de la plateforme AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).
En savoir plus sur la
[substitution des variables](/fr/docs/guides/analytics/analytics_basics.html#substitution-de-variables).

Le composant [amp-pixel](/docs/reference/amp-pixel.html)
étant intégré,
vous n'avez pas besoin d'une déclaration d'inclusion comme avec
les composants étendus d'AMP, notamment `amp-analytics`.
Vous devez néanmoins placer la balise `amp-pixel` aussi près que possible
du début du corps de la page, c'est-à-dire de la balise `<body>`.
En effet, le pixel de suivi ne se déclenche que lorsque la balise est affichée.
Si la balise `amp-pixel` est positionnée près du bas de la page,
il pourrait ne pas se déclencher.

### Configuration simple de la balise amp-analytics

Pour créer une configuration simple de la balise
[amp-analytics](/docs/reference/extended/amp-analytics.html),
vous devez d'abord inclure la déclaration `custom-element`
après la balise `<head>` du document AMP (voir également
[Déclaration d'inclusion de composant](/docs/reference/extended.html#component-inclusion-declaration)) :

[sourcecode:html]
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
[/sourcecode]

L'exemple suivant est similaire à l'[exemple `amp-pixel`](/fr/docs/guides/analytics/analytics_basics.html#configuration-simple-de-la-balise-amp-pixel).
À chaque fois qu'une page est visible,
l'événement est déclenché et
envoie les données sur les vues de page à une URL définie, accompagnées d'un identifiant aléatoire :

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

Dans l'exemple ci-dessus, nous avons défini une requête appelée pageview sur https://foo.com/pixel?RANDOM. Comme nous l'avons indiqué plus tôt, RANDOM est remplacé par un numéro aléatoire. La requête ressemblera donc à https://foo.com/pixel?0.23479283687235653498734.

Lorsque la page devient visible
(tel que spécifié par l'utilisation du mot clé de déclenchement `visible`),
un événement est déclenché et la requête `pageview` est envoyée.
L'attribut triggers détermine à quel moment la requête pageview est déclenchée.
En savoir plus sur les [requêtes et déclencheurs](/fr/docs/guides/analytics/deep_dive_analytics.html#les-attributs-requests,-triggers-et-transport).

## Substitution de variables

Tant le composant [amp-pixel](/docs/reference/amp-pixel.html) que le composant
[amp-analytics](/docs/reference/extended/amp-analytics.html)
permettent toutes les substitutions de variable URL standard (voir
[Substitution de variable AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)).).
Dans l'exemple suivant,
la requête pageview est envoyée à l'URL,
accompagnée de l'URL canonique du document AMP, de son titre et d'un
[ID client](/fr/docs/guides/analytics/analytics_basics.html#identification-des-utilisateurs) :

[sourcecode:html]
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
[/sourcecode]

En raison de sa simplicité,
la balise `amp-pixel` ne peut inclure que des variables définies par la plateforme
ou que l'exécution AMP peut analyser depuis la page AMP.
Dans l'exemple ci-dessus,
la plateforme fournit les valeurs à la fois pour
`canonicalURL` et pour `clientId(site-user-id)`.
La balise `amp-analytics` peut inclure les mêmes variables que la balise `amp-pixel`,
ainsi que des variables uniques définies dans la configuration de la balise.

Utilisez le format `${varName}` dans une chaîne de requête pour une variable
définie par la page ou la plateforme.
La balise `amp-analytics` va remplacer le modèle par sa valeur réelle
au moment de la construction de la demande d'analyse (voir également
[Variables prises en charge par la balise amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

Dans l'exemple suivant pour la balise `amp-analytics`,
la requête pageview est envoyée à l'URL
avec les données supplémentaires extraites des substitutions de variable,
certaines données fournies par la plateforme
et certaines données définies en ligne
dans la configuration de la balise `amp-analytics` :

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
    "someEvent": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

Dans l'exemple ci-dessus,
les variables `account` et `title` sont définies
dans la configuration de la balise `amp-analytics`.
La variables `canonicalUrl` et `clientId` n'étant pas définies dans la configuration,
leurs valeurs sont substituées par la plateforme.

**Important :** La substitution des variables est flexible ;
vous pouvez avoir les mêmes variables définies à différentes endroits,
et l'exécution AMP analysera les valeurs dans leur ordre de priorité
(voir [Ordonnancement de la substitution des variables](/fr/docs/guides/analytics/deep_dive_analytics.html#ordonnancement-de-la-substitution-des-variables)).

## Identification des utilisateurs

Les sites Web utilisent des cookies pour stocker des informations spécifiques à un utilisateur dans le navigateur.
Les cookies peuvent servir à indiquer qu'un utilisateur a déjà visité un site Web.
Dans AMP,
les pages peuvent être fournies soit depuis le site Web d'un éditeur, soit depuis un cache
(comme Google AMP Cache).
Il est probable que le site Web de l'éditeur et le cache aient des domaines différents.
Pour des raisons de sécurité,
les navigateurs limitent souvent l'accès aux cookies d'un autre domaine
(voir également
[Suivi des utilisateurs de différentes origines](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/cross-origin-tracking.md)).

Par défaut,
AMP gère l'émission d'un ID client que l'on accède à la page depuis le site Web original de l'éditeur ou via un cache.
L'ID client généré par AMP est composé du préfixe `"amp-"`
suivi d'une chaîne aléatoire encodée`base64`, et reste le même
pour un utilisateur qui consulte plusieurs fois une même page.

AMP gère la lecture et l'écriture de l'ID client dans tous les cas.
Cela s'avère particulièrement utile lorsqu'une page est fournie
via un cache ou consultée en dehors du contexte d'affichage
du site Web original de l'éditeur.
Dans ce cas, l'accès aux cookies du site de l'éditeur n'est pas disponible.

Lorsqu'une page AMP est fournie à partir du site de l'éditeur,
le framework de l'ID client qu'utilise AMP peut être informé d'un cookie
de rappel à rechercher et à utiliser.
Dans ce cas,
l'argument `cid-scope-cookie-fallback-name` de la variable `clientId`
est interprété comme un nom de cookie.
Le format est soit
`CLIENT_ID(cid-scope-cookie-fallback-name)`, soit
`${clientId(cid-scope-cookie-fallback-name)}`.

Par exemple :

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
[/sourcecode]

Si AMP détecte que ce cookie est défini,
la substitution de l'ID client renvoie la valeur du cookie.
Si AMP détecte que ce cookie n'est pas défini,
il génère une valeur commençant par `amp-`,
suivi d'une chaîne aléatoire encodée base64.

Pour en savoir plus sur la substitution d'ID client,
notamment comment ajouter un ID facultatif de notification de l'utilisateur, voir
[Variables prises en charge dans les analyses AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).
