---
'$title': CORS avec AMP
$order: 12
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: De nombreux composants et extensions AMP tirent parti des points de terminaison distants en utilisant
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cors-requests.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

De nombreux composants et extensions AMP tirent parti des points de terminaison distants en utilisant des requêtes CORS (Cross-Origin Resource Sharing). Ce document explique les aspects clés de l'utilisation de CORS avec AMP. Pour en savoir plus sur CORS lui-même, consultez la [spécification W3 CORS](https://www.w3.org/TR/cors/) .

<div class="noshowtoc"></div>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#why-do-i-need-cors-for-my-own-origin-" data-md-type="link">Pourquoi ai-je besoin de CORS pour ma propre origine ?</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#utilizing-cookies-for-cors-requests" data-md-type="link">Utilisation de cookies pour les requêtes CORS</a></li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#cors-security-in-amp" data-md-type="link">Sécurité CORS avec AMP</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#verify-cors-requests" data-md-type="link">Vérifier les requêtes CORS</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#1-allow-requests-for-specific-cors-origins" data-md-type="link">1) Autoriser les requêtes pour des origines CORS spécifiques</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#2-allow-same-origin-requests" data-md-type="link">2) Autoriser les requêtes de même origine</a></li>
</ul>
</li></ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#send-cors-response-headers" data-md-type="link">Envoyer des en-têtes de réponse CORS</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered"><a href="#access-control-allow-origin-origin" data-md-type="link">Access-Control-Allow-Origin: </a></li></ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#processing-state-changing-requests" data-md-type="link">Traitement des requêtes de changement d'état</a></li>
</ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#example-walkthrough-handing-cors-requests-and-responses" data-md-type="link">Exemple de procédure pas à pas : traitement des requêtes et des réponses CORS</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#testing-cors-in-amp" data-md-type="link">Tester CORS dans AMP</a></li>
</ul>
</li>
</ul>
<div data-md-type="block_html"></div>

## Pourquoi ai-je besoin de CORS pour ma propre origine ? <a name="why-do-i-need-cors-for-my-own-origin"></a>

Vous pourriez être confus(e) quant à la raison pour laquelle vous auriez besoin de CORS pour les requêtes vers votre propre origine, explorons cela.

Les composants AMP qui récupèrent des données dynamiques (par exemple, amp-form, amp-list, etc.) adressent des requêtes CORS aux points de terminaison distants pour récupérer les données. Si votre page AMP inclut de tels composants, vous devrez gérer CORS pour que ces requêtes n'échouent pas.

Illustrons cela avec un exemple :

Supposons que vous ayez une page AMP qui répertorie les produits avec des prix. Pour mettre à jour les prix sur la page, l'utilisateur clique sur un bouton, qui récupère les derniers prix à partir d'un point de terminaison JSON (via le composant amp-list). Le JSON est sur votre domaine.

D'accord, donc la page est _sur mon domaine_ et le JSON est _sur mon domaine_. Je ne vois aucun problème !

Ah, mais comment votre utilisateur est-il arrivé sur votre page AMP ? S'agit-il d'une page mise en cache à laquelle il accède ? Il est fort probable que votre utilisateur n'ait pas accédé directement à votre page AMP, mais qu'il ait découvert votre page via une autre plateforme. Par exemple, la recherche Google utilise le cache AMP Google pour afficher rapidement les pages AMP ; ce sont des pages mises en cache qui sont diffusées à partir du cache AMP Google, qui est un domaine _différent_. Lorsque votre utilisateur clique sur le bouton pour mettre à jour les prix sur votre page, la page AMP mise en cache envoie une requête à votre domaine d'origine pour obtenir les prix, ce qui crée une discordance entre les origines (cache -> domaine d'origine). Pour permettre de telles requêtes d'origine croisée, vous devez gérer CORS, sinon la requête échouera.

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript><img alt="CORS et cache" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png"></noscript></amp-img>

**D'accord, que dois-je faire ?**

1. Pour les pages AMP qui récupèrent des données dynamiques, vérifiez que vous testez la version mise en cache de ces pages ; _ne vous contentez pas de tester sur votre propre domaine _. (Voir la section [Tester CORS avec AMP](#testing-cors-in-amp) ci-dessous)
2. Suivez les instructions de ce document pour gérer les requêtes et réponses CORS.

## Utilisation de cookies pour les requêtes CORS <a name="utilizing-cookies-for-cors-requests"></a>

La plupart des composants AMP qui utilisent des requêtes CORS définissent automatiquement le [mode des informations d'identification](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) ou permettent à l'auteur de l'activer. Par exemple, le composant [`amp-list`](https://amp.dev/documentation/components/amp-list) récupère le contenu dynamique à partir d'un point de terminaison CORS JSON et permet à l'auteur de définir le mode d'authentification via l'attribut `données d'authentification` .

_Exemple : inclure du contenu personnalisé dans une amp-list via des cookies_

[sourcecode:html]
<amp-list
credentials="include"
src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)"

>   <template type="amp-mustache">

    Your personal offer: ${% raw %}{{price}}{% endraw %}

  </template>
</amp-list>
[/sourcecode]

En spécifiant le mode d'identification, l'origine peut inclure des cookies dans la requête CORS et également définir des cookies dans la réponse (sous réserve de [restrictions de cookies tiers](#third-party-cookie-restrictions)).

### Restrictions relatives aux cookies tiers <a name="third-party-cookie-restrictions"></a>

Les mêmes restrictions de cookies tiers spécifiées dans le navigateur s'appliquent également aux requêtes CORS authentifiées dans AMP. Ces restrictions dépendent du navigateur et de la plateforme, mais pour certains navigateurs, l'origine ne peut définir des cookies que si l'utilisateur a déjà visité l'origine dans une fenêtre tierce (supérieure). Ou, en d'autres termes, seulement après que l'utilisateur ait directement visité le site Web d'origine lui-même. Compte tenu de cela, un service accessible via CORS ne peut pas supposer qu'il sera en mesure de définir des cookies par défaut.

## Sécurité CORS avec AMP <a name="cors-security-in-amp"></a>

Pour garantir des requêtes et des réponses valides et sécurisées pour vos pages AMP, vous devez :

1. [Vérifier la requête](#verify-cors-requests) .
2. [Envoyer les en-têtes de réponse appropriés](#send-cors-response-headers).

Si vous utilisez Node dans votre backend, vous pouvez utiliser le [middleware AMP CORS](https://www.npmjs.com/package/amp-toolbox-cors), qui fait partie de la [boîte à outils AMP](https://github.com/ampproject/amp-toolbox).

### Vérifier les requêtes CORS <a name="verify-cors-requests"></a>

Lorsque votre point de terminaison reçoit une requête CORS :

1. [Vérifiez que l'en-tête CORS <code>Origin</code> est une origine autorisée (origine de l'éditeur + caches AMP)](#verify-cors-header).
2. [S'il n'y a pas d'en-tête Origin, vérifiez que la requête provient de la même origine (via `AMP-Same-Origin`)](#allow-same-origin-requests).

#### 1) Autoriser les requêtes pour des origines CORS spécifiques <a name="1-allow-requests-for-specific-cors-origins"></a>

<span id="verify-cors-header"></span>

Les points de terminaison CORS reçoivent l'origine de la requête via l'en-tête HTTP `Origin`. Les terminaux ne devraient autoriser que les requêtes provenant : (1) de la propre origine de l'éditeur ; et (2) de chaque origine `cacheDomain` répertoriée dans [https://ampjs.org/caches.json](https://ampjs.org/caches.json).

Par exemple, les points de terminaison doivent autoriser les requêtes provenant de :

- Sous-domaine de cache AMP Google : `https://<publisher's domain>.cdn.ampproject.org` <br>(par exemple, `https://nytimes-com.cdn.ampproject.org`)

[tip type="read-on"] Pour plus d'informations sur les formats d'URL de cache AMP, consultez ces ressources :

- [Présentation du cache AMP Google](https://developers.google.com/amp/cache/overview) [/tip]

#### 2) Autoriser les requêtes de même origine <a name="2-allow-same-origin-requests"></a>

<span id="allow-same-origin-requests"></span>

Pour les requêtes de même origine où l'en-tête `Origin` est manquant, AMP définit l'en-tête personnalisé suivant :

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

Cet en-tête personnalisé est envoyé par le runtime AMP lorsqu'une requête XHR est effectuée sur la même origine (c'est-à-dire un document diffusé à partir d'une URL ne provenant pas du cache). Autorisez les requêtes qui contiennent l'en-tête `AMP-same-origin:true`.

### Envoyer des en-têtes de réponse CORS <a name="send-cors-response-headers"></a>

Après avoir vérifié la requête CORS, la réponse HTTP résultante doit contenir les en-têtes suivants :

##### Access-Control-Allow-Origin: &lt;origin&gt; <a name="access-control-allow-origin-origin"></a>

Cet en-tête est une exigence <a href="https://www.w3.org/TR/cors/">W3 CORS Spec</a>, où <code>origin</code> fait référence à l’origine de la requête autorisée via l’en-tête de requête CORS <code>Origin</code> (par exemple, <code>"https://&lt;publisher’s subdomain>.cdn.ampproject.org"</code>).

Bien que la spécification W3 CORS permette de renvoyer la valeur de <code>\*</code> dans la réponse, pour une sécurité améliorée, vous devez :

- Si l'en-tête `Origin` est présent, valider et transmettre la valeur de l'en-tête <code>Origin</code>.

### Traitement des requêtes de changement d'état <a name="processing-state-changing-requests"></a>

[tip type="important"] Effectuez ces vérifications de validation _avant de_ traiter la requête. Cette validation permet de fournir une protection contre les attaques CSRF et évite de traiter les requêtes de sources non fiables. [/tip]

Avant de traiter des requêtes susceptibles de modifier l'état de votre système (par exemple, un utilisateur s'abonne ou se désabonne d'une liste de diffusion), vérifiez les points suivants :

**Si l'en-tête `Origin` est défini** :

1. Si l'origine ne correspond pas à l'une des valeurs suivantes, arrêtez et renvoyez une réponse d'erreur :

   - `<publisher's domain>.cdn.ampproject.org`
   - l'origine de l'éditeur (c'est-à-dire la vôtre)

   où `*` représente une correspondance générique et non un astérisque réel (\*).

2. Sinon, traitez la requête.

**Si l'en-tête `Origin` n'est PAS défini** :

1. Vérifiez que la requête contient l'en-tête `AMP-Same-Origin: true`. Si la requête ne contient pas cet en-tête, arrêtez et renvoyez une réponse d'erreur.
2. Otherwise, process the request.

## Exemple de procédure pas à pas : traitement des requêtes et des réponses CORS <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

Il existe deux scénarios à prendre en compte dans les requêtes CORS adressées à votre point de terminaison :

1. Une requête de la même origine.
2. Une requête d'une origine mise en cache (à partir d'un cache AMP).

Passons en revue ces scénarios avec un exemple. Dans notre exemple, nous gérons le site `example.com` qui héberge une page AMP nommée `article-amp.html.`. La page AMP contient une `amp-list` pour récupérer des données dynamiques à partir d'un fichier `data.json` également hébergé sur `example.com`. Nous souhaitons traiter les requêtes de notre fichier `data.json` provenant de notre page AMP. Ces requêtes peuvent provenir de la page AMP sur la même origine (non mise en cache) ou de la page AMP sur une origine différente (mise en cache).

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript><img alt="Exemple CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png"></noscript></amp-img>

### Origines autorisées <a name="allowed-origins"></a>

Sur la base de ce que nous savons sur CORS et AMP (à partir des [requêtes Verify CORS](#verify-cors-requests) ci-dessus), dans notre exemple, nous autoriserons les requêtes provenant des domaines suivants :

- `example.com` --- Domaine de l'éditeur
- `example-com.cdn.ampproject.org` --- Sous-domaine du cache AMP Google

### En-têtes de réponse pour les requêtes autorisées <a name="response-headers-for-allowed-requests"></a>

Pour les requêtes provenant des origines autorisées, notre réponse contiendra les en-têtes suivants :

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

Voici des en-têtes de réponse supplémentaires que nous pourrions inclure dans notre réponse CORS :

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### Logique pseudo CORS <a name="pseudo-cors-logic"></a>

Notre logique de gestion des requêtes et réponses CORS peut être simplifiée dans le pseudo code suivant :

[sourcecode:text]
IF CORS header present
IF origin IN allowed-origins
allow request & send response
ELSE
deny request
ELSE
IF "AMP-Same-Origin: true"
allow request & send response
ELSE
deny request
[/sourcecode]

#### Exemple de code CORS <a name="cors-sample-code"></a>

Voici un exemple de fonction JavaScript que nous pourrions utiliser pour gérer les requêtes et réponses CORS :

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var origin;
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
'https://cdn.ampproject.org',
];
var allowedSourceOrigin = 'https://example.com'; //publisher's origin
// If same origin
if (req.headers['amp-same-origin'] == 'true') {
origin = sourceOrigin;
// If allowed CORS origin & allowed source origin
} else if (
allowedOrigins.indexOf(req.headers.origin) != -1 &&
sourceOrigin == allowedSourceOrigin
) {
origin = req.headers.origin;
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}

res.setHeader('Access-Control-Allow-Credentials', 'true');
res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

**Remarque** : pour un exemple de code fonctionnel, consultez [amp-cors.js](https://github.com/ampproject/amphtml/blob/main/build-system/server/amp-cors.js).

### Scénario 1 : obtenir une requête de la page AMP sur la même origine <a name="scenario-1-get-request-from-amp-page-on-same-origin"></a>

Dans le scénario suivant, la page `article-amp.html` demande le fichier `data.json` ; les origines sont les mêmes.

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript><img alt="Exemple CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png"></noscript></amp-img>

Si nous examinons la requête, nous trouverons :

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

Comme cette requête provient de la même origine, il n'y a pas d'en-tête `Origin` mais l'en-tête de la requête AMP personnalisé de `AMP-Same-Origin: true` est présent. Nous pouvons autoriser cette requête car elle provient de la même origine (`https://example.com`).

Nos en-têtes de réponse seraient :

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### Scénario 2 : obtenir une requête de la page AMP en cache <a name="scenario-2-get-request-from-cached-amp-page"></a>

Dans le scénario suivant, la page `article-amp.html` mise en cache dans le cache AMP google demande le fichier `data.json` ; les origines diffèrent.

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript><img alt="Exemple CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png"></noscript></amp-img>

Si nous examinons cette requête, nous trouverons :

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

Comme cette requête contient un en-tête `Origin`, nous vérifierons qu'elle provient d'une origine autorisée. Nous pouvons autoriser cette requête car elle provient d'une origine autorisée.

Nos en-têtes de réponse seraient :

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## Utilisation des polices mises en cache <a name="working-with-cached-fonts"></a>

Google AMP Cache met en cache les documents, images et polices AMP HTML pour optimiser la vitesse de la page AMP. Tout en rendant la page AMP rapide, nous voulons également veiller à sécuriser les ressources mises en cache. Nous allons modifier la façon dont le cache AMP répond à ses ressources mises en cache, généralement pour les polices, en respectant la valeur `Access-Control-Allow-Origin`.

### Comportement passé (avant octobre 2019) <a name="past-behavior-before-october-2019"></a>

Lorsqu'une page AMP chargeait `https://example.com/some/font.ttf` à partir de l'attribut `@font-face src`, AMP Cache mettait en cache le fichier de police et diffusait la ressource comme ci-dessous avec l'inconnue `Access-Control-Allow-Origin`.

- URL `https://example-com.cdn.ampproject.org/r/s/example.com/some/font.tff`
- Access-Control-Allow-Origin : \*

### Nouveau comportement (octobre 2019 et après) <a name="new-behavior-october-2019-and-after"></a>

Bien que l'implémentation actuelle soit permissive, cela pourrait conduire à une utilisation inattendue des polices de sites d'origine croisée. Dans ce changement, AMP Cache commencera à répondre avec exactement la même valeur `Access-Control-Allow-Origin` que le serveur d'origine. Pour charger correctement les polices du document AMP mis en cache, vous devrez accepter l'origine AMP Cache via l'en-tête.

Un exemple d'implémentation serait :

[sourcecode:javascript]
function assertFontCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
];
// If allowed CORS origin
if (allowedOrigins.indexOf(req.headers.origin) != -1) {
res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}
}
[/sourcecode]

Par exemple, si vous souhaitez charger /some/font.ttf dans `https://example.com/amp.html`, le serveur d'origine doit répondre avec l'en-tête Access-Control-Allow-Origin comme ci-dessous.

<amp-img alt="CORS font example" layout="responsive" src="https://amp.dev/static/img/docs/cors-font.jpg" width="2268" height="1594">
  <noscript><img alt="Exemple de police CORS" src="https://amp.dev/static/img/docs/cors-font.jpg"></noscript></amp-img>

[tip type="note"] Si votre fichier de police peut être accessible depuis n'importe quelle origine, vous pouvez répondre avec un joker `Access-Control-Allow-Origin`, le cache AMP fera également écho à cette valeur, ce qui signifie qu'il répondra avec `Access-Control-Allow-Origin: *` . Si vous disposez déjà de ce paramètre, il n'est pas nécessaire de modifier quoi que ce soit. [/tip]

Nous prévoyons d'apporter ce changement vers la mi-octobre 2019 et nous attendons de tous les éditeurs AMP utilisant des polices auto-hébergées qu'ils vérifient si cela est affecté.

#### Plan de déploiement <a name="roll-out-plan"></a>

- 30/09/2019 : la version contient un contrôle plus précis sur les domaines auxquels cette modification s'applique. Cette version devrait être déployée au cours de cette semaine.
- 07/10/2019 : les domaines de test seront activés pour les tests manuels.
- 14/10/2019 : (mais en fonction de la façon dont les tests se déroulent) : la fonctionnalité sera déployée de manière générale.

Suivez le [problème associé ici.](https://github.com/ampproject/amphtml/issues/24834)

## Tester CORS dans AMP <a name="testing-cors-in-amp"></a>

Lorsque vous testez vos pages AMP, assurez-vous d'inclure les tests des versions mises en cache de vos pages AMP.

### Vérifiez la page via l'URL du cache <a name="verify-the-page-via-the-cache-url"></a>

Pour vous assurer que votre page AMP mise en cache s'affiche et fonctionne correctement :

1. Depuis votre navigateur, ouvrez l'URL que le cache AMP utiliserait pour accéder à votre page AMP. Vous pouvez déterminer le format d'URL de cache à partir de cet [outil sur AMP par exemple](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/) .

   Par exemple :

   - URL : `https://amp.dev/documentation/guides-and-tutorials/start/create/`
   - Format de l'URL AMP Cache : `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2. Ouvrez les outils de développement de votre navigateur et vérifiez qu'il n'y a pas d'erreurs et que toutes les ressources ont été chargées correctement.

### Vérifiez les en-têtes de réponse de votre serveur <a name="verify-your-server-response-headers"></a>

Vous pouvez utiliser la commande `curl` pour vérifier que votre serveur envoie les en-têtes de réponse HTTP corrects. Dans la commande `curl`, indiquez l'URL de la requête et tous les en-têtes personnalisés que vous souhaitez ajouter.

**Syntaxe** : `curl <request-url> -H <custom-header> - I`

#### Requête de test de la même origine <a name="test-request-from-same-origin"></a>

Dans une requête de la même origine, le système AMP ajoute l'en-tête personnalisé `AMP-Same-Origin:true`.

Voici notre commande curl pour tester une requête de `https://ampbyexample.com` vers le fichier `examples.json` (sur le même domaine) :

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

Les résultats de la commande affichent les en-têtes de réponse corrects (remarque : les informations supplémentaires ont été coupées) :

[sourcecode:http]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### Requête de test de la page AMP mise en cache <a name="test-request-from-cached-amp-page"></a>

Dans une requête CORS ne provenant pas du même domaine (c'est-à-dire du cache), l'en-tête `origin` fait partie de la requête.

Voici notre commande curl pour tester une requête de la page AMP mise en cache sur le cache Google AMP vers le fichier `examples.json` :

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

Les résultats de la commande affichent les en-têtes de réponse corrects :

```http
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```
