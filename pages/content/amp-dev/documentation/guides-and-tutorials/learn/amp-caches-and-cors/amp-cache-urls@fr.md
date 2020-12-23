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

When possible, the Google AMP Cache will create a subdomain for each AMP document's domain by first converting it from [IDN (punycode)](https://en.wikipedia.org/wiki/Punycode) to UTF-8. The caches replaces every `-` (dash) with `--` (2 dashes) and replace every `.` (dot) with `-` (dash). For example, `pub.com` will map to `pub-com.cdn.ampproject.org`.

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

All AMP Caches are registered in a JSON file, found online on the [AMPHTML Repository](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). An example cache record in this file will look like:

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

An AMP Cache serves documents on an altered URL, such as `example-com.cdn.ampproject.org`. The first dotted component of the original domain name in the example, `example.com`, becomes `example-com`. This document refers to this non-dotted string, `example-com`, as the “domain prefix”. See below for the algorithm that performs this transformation.

Multiple dotted components are not used in this prefix, such as `example.com.cdn.ampproject.org`, due to the constraint of https (TLS) certificates, [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1):

```
Les noms peuvent contenir le caractère générique * qui remplace n'importe quel composant de nom de domaine ou fragment de composant. Par exemple, *.a.com correspond à foo.a.com mais pas à bar.foo.a.com.
```

Publisher domains can be up to 255 characters in length, while each domain prefix is limited to 63 characters, as per [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11) which reads:

```
The length of any one label is limited to between 1 and 63 octets.  A full domain name is limited to 255 octets (including the separators).
```

All publisher domains map to a unique domain prefix. The algorithm for doing so attempts to make the mapping human-readable. However, mapping reverts to using a secure hashing for publisher domains if they are too long, and in the cases described below:

### Algorithme de base

The basic algorithm for converting a publisher domain to a domain prefix is as follows:

1. Décodage Punycode du domaine de l'éditeur. Voir [RFC 3492](https://tools.ietf.org/html/rfc3492)
2. Replace any "`-`" (hyphen) character in the output of step 1 with "`--`" (two hyphens).
3. Replace any "`.`" (dot) character in the output of step 2 with "`-`" (hyphen).
4. If the output of step 3 has a "`-`" (hyphen) at both positions 3 and 4, then to the output of step 3, add a prefix of "`0-`" and add a suffix of "`-0`". See [#26205](https://github.com/ampproject/amphtml/issues/26205) for background.
5. Punycode Encode the output of step 3. See [RFC 3492](https://tools.ietf.org/html/rfc3492)

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
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)    </td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)    </td>
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
2. Base32 Escape the output of step 1.
3. Remove the last 4 characters from the output of step 2, which are always `=` (equals) characters.

The fallback algorithm will produce a 52 character string such as the following with no `-` (hyphen): `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`.

### Algorithme combiné

The combined algorithm is:

1. Run the Basic Algorithm. If the output is a valid DNS label, append the Cache domain suffix and return, for example `example-com.cdn.ampproject.org`. Otherwise continue to step 2.
2. Run the Fallback Algorithm. Append the Cache domain suffix and return, for example: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

## URL Path

Le « chemin » d'une URL sur le cache AMP est toujours composé d'un ou de plusieurs répertoires de préfixes, tels que `/c`, suivis d'un infixe `/s` uniquement si l'URL de l'éditeur est http `s`, suivi de l'URL du document de l'éditeur sans le protocole.

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='Image displaying cached URL formats') }}

The prefix directories, such as `/c` correspond to different types of serving that an AMP Cache may perform. Different AMP Caches may support different serving types, and this is not an exhaustive list:

- `/c` - <strong>C</strong>ontent : il s'agit d'un document AMP fourni comme page autonome qui peut être liée directement dans certaines interfaces.
- `/v` - <strong>V</strong>iewer: This is also an AMP document, but is served in an [AMP Viewer](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer) which is a frame environment that displays an AMP document in the context of a Search Result Page or other interface.
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

Next, check to see if the “domain prefix” contains at least one ‘`-`’ (hyphen). Containing one or more hyphens is the most common case by far. If the “domain prefix” does not contain at least one ‘`-`’ (hyphen), the AMP Cache Origin cannot be reversed directly. Instead, if you know the set of possible publisher domains, you can create the set of AMP Cache Origins using the Domain Name algorithm further above in this document. You can then validate against the fixed set.

Le reste de l'algorithme suppose que le « préfixe de domaine » contient au moins un « `-` » (tiret).

1. If the domain prefix starts with `xn--`, punycode decode the “domain prefix”. For example `xn---com-p33b41770a` becomes `⚡😊-com`. See [RFC 3492](https://tools.ietf.org/html/rfc3492) for punycode.
2. Si le préfixe de domaine commence par « `0-` » et se termine par « `-0` », supprimez à la fois le préfixe « `0-` » et le suffixe « -0 ».
3. Parcourez les caractères générés à l'étape 2 dans l'ordre, en les émettant comme rencontré. Lorsque vous rencontrez un « `-` » (tiret), jetez un œil au caractère suivant. Si le caractère suivant est également un « `-` » (tiret), ignorez les deux caractères de l'entrée et émettez un seul « `-` » (tiret). Si le caractère suivant est un autre caractère, ignorez uniquement le « `-` » (tiret) actuel et émettez un « `.` » (point). Par exemple, `a--b-example-com` devient `ab.example.com` .
4. Punycode encode the result of Step 3. See [RFC 3492](https://tools.ietf.org/html/rfc3492) for punycode.

The result of Step 4 will be the Publisher Domain. The protocol is unavailable from the domain itself, but is either `http` or `https`. The port is always the default for the protocol.

## Gestion des redirections et des erreurs

Here are some examples for how the AMP Cache handles redirects and errors:

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
