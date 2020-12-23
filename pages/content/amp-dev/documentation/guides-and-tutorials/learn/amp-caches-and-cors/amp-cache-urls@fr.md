---
"$title": "Format d'URL du cache AMP et traitement des demandes"
"$order": '9'
toc: 'false'
formats:
- websites
- stories
- ads
author: Gregable
contributors:
- sebastianbenz
---

Dans ce document, vous découvrirez le format d'URL du cache AMP et la manière dont il gère les requêtes.

## Format d'URL

Si possible, Google AMP Cache créera un sous-domaine pour le domaine de chaque document AMP en le convertissant d'abord du format [IDN (punycode)](https://en.wikipedia.org/wiki/Punycode) au format UTF-8. Les caches remplacent chaque `-` (tiret) par `--` (2 tirets) et remplacent tous les `.` (point) par un `-` (tiret). Par exemple, `pub.com` correspondra à `pub-com.cdn.ampproject.org` .

Vous pouvez utiliser ce calculateur d'URL pour convertir une URL en une version de cache AMP :

<div><amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div></amp-iframe></div>

[tip type="tip"] Utilisez le module [AMP-Toolbox Cache URL](https://github.com/ampproject/amp-toolbox/tree/master/packages/cache-url) [Node.js](https://nodejs.org) pour traduire une URL initiale au format d'URL de cache AMP. [/tip]

Ce document décrit :

- La structure de l'URL d'un cache AMP.
- Comment prédire la façon dont vos URL apparaîtront dans un cache AMP.
- Comment inverser un en-tête de cache AMP initial pour déterminer quel était le domaine de son éditeur.

## Protocole de nom de domaine

Tous les documents utilisent le protocole https sur les caches AMP.

## Suffixe de nom de domaine

Tous les caches AMP sont enregistrés dans un fichier JSON, disponible en ligne dans le [référentiel AMPHTML](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). Un exemple d'enregistrement de cache dans ce fichier ressemblerait à ceci:

```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

Un cache AMP fournit des enregistrements sur le domaine spécifié par `cacheDomain`. Dans ce cas, le domaine est `cdn.ampproject.org`.

Ce document utilise des URL avec `cdn.ampproject.org` comme exemples, mais d'autres caches utilisent généralement une structure d'URL similaire.

## Préfixe de nom de domaine

Un cache AMP fournit des documents sur une URL modifiée, telle que `example-com.cdn.ampproject.org`. Le premier composant avec point du nom de domaine d'origine dans l'exemple, `example.com`, devient `example-com`. Ce document fait référence à cette chaîne sans point, `example-com`, comme le « préfixe de domaine ». Reportez-vous ci-dessous pour en savoir plus sur l'algorithme qui effectue cette transformation.

Les composants comprenant plusieurs points ne sont pas utilisés dans ce préfixe, tels que `example.com.cdn.ampproject.org`, en raison de la contrainte des certificats https (TLS), [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1):

```
Les noms peuvent contenir le caractère générique * qui remplace n'importe quel composant de nom de domaine ou fragment de composant. Par exemple, *.a.com correspond à foo.a.com mais pas à bar.foo.a.com.
```

Les domaines de l'éditeur peuvent comporter jusqu'à 255 caractères, tandis que chaque préfixe de domaine est limité à 63 caractères, conformément à la contrainte [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11) qui précise:

```
La longueur de n'importe quelle étiquette doit être comprise entre 1 et 63 octets. Un nom de domaine complet est limité à 255 octets (y compris les séparateurs).
```

Tous les domaines de l'éditeur correspondent à un préfixe de domaine unique. L'algorithme qui rend cela possible tente ainsi de rendre le mappage lisible par l'homme. Cependant, le mappage revient à utiliser un hachage sécurisé pour les domaines des éditeurs s'ils sont trop longs, et dans les cas décrits ci-dessous:

### Algorithme de base

L'algorithme de base pour convertir un domaine d'éditeur en préfixe de domaine est le suivant:

1. Décodage Punycode du domaine de l'éditeur. Voir [RFC 3492](https://tools.ietf.org/html/rfc3492)
2. Remplacer tout caractère « `-` » (tiret) du résultat de l'étape 1 par « `--` » (deux tirets).
3. Remplacer tout caractère « `.` » (point) du résultat de l'étape 2 par « `-` » (tiret).
4. Si le résultat de l'étape 3 a un « `-` » (tiret) aux positions 3 et 4, alors ajouter un préfixe « `0-` » et un suffixe « `-0` » au résultat de l'étape 3. Voir [# 26205](https://github.com/ampproject/amphtml/issues/26205) pour le contexte.
5. Encodage Punycode du résultat de l'étape 3. Voir [RFC 3492](https://tools.ietf.org/html/rfc3492)

Quelques exemples de l'algorithme de base :

<table>
  <tr>
   <td>
<strong>Domaine de l'éditeur</strong>
   </td>
   <td>
<strong>Préfixe de domaine</strong>
   </td>
  </tr>
  <tr>
   <td>
<code>example.com</code>
   </td>
   <td>
<code>example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo.example.com</code>
   </td>
   <td>
<code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo-example.com</code>
   </td>
   <td>
<code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)</td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)</td>
  </tr>
  <tr>
   <td>
<code>en-us.example.com</code>
   </td>
   <td>
<code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>

Après avoir exécuté l'algorithme de base, si et seulement si le préfixe de domaine n'est pas une étiquette DNS valide, nous exécutons l'algorithme de secours décrit ci-dessous.

Un préfixe de domaine n'est pas une étiquette DNS valide s'il contient plus de 63 caractères

### Algorithme de secours

L'algorithme de secours pour convertir un domaine d'éditeur en préfixe de domaine est le suivant :

1. Hachage du domaine de l'éditeur à l'aide de SHA256.
2. Échappement Base32 du résultat de l'étape 1.
3. Suppression des 4 derniers caractères du résultat de l'étape 2, qui sont toujours des caractères `=` (égal).

L'algorithme de secours produira une chaîne de 52 caractères telle que celle ci-après, sans `-` (tiret): `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq` .

### Algorithme combiné

L'algorithme combiné consiste à:

1. Exécuter l'algorithme de base. Si le résultat est une étiquette DNS valide, ajouter le suffixe de domaine de cache et renvoyer, par exemple, `example-com.cdn.ampproject.org`. Sinon, passer à l'étape 2.
2. Exécuter l'algorithme de secours. Ajout du suffixe de domaine du cache et renvoyer, par exemple: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

## Chemin d'URL

Le « chemin » d'une URL sur le cache AMP est toujours composé d'un ou de plusieurs répertoires de préfixes, tels que `/c`, suivis d'un infixe `/s` uniquement si l'URL de l'éditeur est http `s`, suivi de l'URL du document de l'éditeur sans le protocole.

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='Image affichant les formats d\'URL mis en cache') }}

Les répertoires de préfixes, tels que `/c` correspondent à différents types de services qu'un cache AMP peut effectuer. Différents caches AMP peuvent prendre en charge différents types de diffusion, la liste suivante n'est pas exhaustive:

- `/c` - <strong>C</strong>ontent : il s'agit d'un document AMP fourni comme page autonome qui peut être liée directement dans certaines interfaces.
- `/v` - <strong>V</strong>iewer : il s'agit également d'un document AMP, mais fourni dans une [visionneuse AMP](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer) qui est un environnement cadre qui affiche un document AMP dans le cadre d'une page de résultats de recherche ou d'une autre interface.
- `/wp` - <strong>W</strong>eb <strong>P</strong>ackage : il s'agit d'un document AMP fourni comme un [échange signé](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/), une technologie Web Package. Ces URL agissent comme des redirections vers l'origine de l'éditeur.
- `/cert` - <strong>Cert</strong>ificate : il s'agit d'un certificat public à utiliser avec un [échange signé](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/).
- `/i` - <strong>I</strong>mage : il s'agit d'une image fournie par le cache AMP, généralement en tant que sous-ressource de document.
- `/ii` - <strong>I</strong>mage : il s'agit également d'une image fournie par le cache AMP, mais elle peut généralement être combinée avec d'autres paramètres de configuration du cache tels que `/ii/w800` qui indique une largeur maximale imposée par le document. Le cache peut produire des images avec une échelle différente ici afin d'économiser de la bande passante pour le navigateur.

En outre, les caches AMP peuvent décider d'ajouter des paramètres de requête spéciaux à l'URL du document qui ne font pas partie de la requête du document de l'éditeur. Par exemple, [`<amp-live-list>`](../../../components/reference/amp-live-list.md) effectue des demandes d'actualisation en récupérant un document avec le paramètre `amp_latest_update_time<`. Ces paramètres ne sont pas transmis à l'origine lors de l'exploration du document, mais sont strictement présents pour configurer la requête vers le cache AMP.

## Origines CORS

De nombreux éditeurs utilisent les requêtes CORS à partir de leur document AMP pour récupérer des données supplémentaires. Les requêtes CORS fonctionnent en envoyant un en-tête HTTP `Origin:` dans la requête pour spécifier l’origine du document à l'origine de la requête. Comme on peut le voir ci-dessus, l’origine du document est différente sur un cache AMP que sur le document original. Dans les sections de noms de domaine ci-dessus, vous pouvez trouver l’algorithme pour déterminer l’origine d’une URL de cache AMP selon l'URL de l’éditeur. Ci-dessous, nous spécifions l’algorithme inverse permettant de déchiffrer un en-tête de requête CORS `Origin:` vers le domaine d'éditeur d’origine.

### Origine du cache AMP vers le domaine de l'éditeur

Une valeur d'en-tête de l'origine du cache AMP ressemblera à l'un des exemples suivants :

- `https://www-example-com.cdn.ampproject.org`
- `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

Commencez par supprimer le préfixe de protocole (`https://`) et le suffixe de domaine du cache AMP, tel que `.cdn.ampproject.org`. Le suffixe peut provenir de l'un des caches répertoriés dans [caches.json](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). La chaîne restante sera le « préfixe de domaine ». Dans le cas des deux exemples ci-dessus, le « préfixe de domaine » est :

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

Ensuite, vérifiez si le « préfixe de domaine » contient au moins un « `-` » (tiret). La présence d'un ou de plusieurs traits d'union est de loin le cas le plus courant. Si le « préfixe de domaine » ne contient pas au moins un « `-` » (tiret), l'origine du cache AMP ne peut pas être inversée directement. Au lieu de cela, si vous connaissez l'ensemble des domaines d'éditeur possibles, vous pouvez créer l'ensemble des origines du cache AMP à l'aide de l'algorithme de nom de domaine présenté plus haut dans ce document. Vous pouvez ensuite valider par rapport à l'ensemble fixe.

Le reste de l'algorithme suppose que le « préfixe de domaine » contient au moins un « `-` » (tiret).

1. Si le préfixe de domaine commence par `xn--`, procédez à un décodage punycode du « préfixe de domaine ». Par exemple, `xn---com-p33b41770a` devient `⚡😊-com`. Voir [RFC 3492](https://tools.ietf.org/html/rfc3492) pour le punycode.
2. Si le préfixe de domaine commence par « `0-` » et se termine par « `-0` », supprimez à la fois le préfixe « `0-` » et le suffixe « -0 ».
3. Parcourez les caractères générés à l'étape 2 dans l'ordre, en les émettant comme rencontré. Lorsque vous rencontrez un « `-` » (tiret), jetez un œil au caractère suivant. Si le caractère suivant est également un « `-` » (tiret), ignorez les deux caractères de l'entrée et émettez un seul « `-` » (tiret). Si le caractère suivant est un autre caractère, ignorez uniquement le « `-` » (tiret) actuel et émettez un « `.` » (point). Par exemple, `a--b-example-com` devient `ab.example.com` .
4. Faites un encodage Punycode du résultat de l'étape 3. Voir [RFC 3492](https://tools.ietf.org/html/rfc3492) pour punycode.

Le résultat de l'étape 4 sera le domaine de l'éditeur. Le protocole n'est pas disponible à partir du domaine lui-même, mais est `http` ou `https`. Le port est toujours le port par défaut du protocole.

## Gestion des redirections et des erreurs

Voici quelques exemples de la manière dont le cache AMP gère les redirections et les erreurs:

**Redirections**

Le cache AMP suit les redirections lors de la résolution des URL AMP. Par exemple, si une URL redirige vers une autre URL AMP :

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

Ensuite, le cache AMP renverra le contenu de la redirection résolue pour l'URL d'origine.

Exemple : [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html).

Important : si vous déplacez l'emplacement des fichiers AMP sur votre serveur, assurez-vous de configurer une redirection de l'ancien emplacement vers le nouveau.

**Introuvable**

Lorsqu'une page n'est pas trouvée dans le cache AMP, elle affiche une page d'erreur et renvoie un état 404.

Exemple : [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**AMP non valide**

Lorsqu'une page AMP n'est pas valide, le cache AMP sera redirigé vers la page canonique.

Exemple : [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**Erreurs de serveur**

Si une URL renvoie une erreur de serveur 5XX, le cache AMP renverra un état 404.

Exemple : [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)
