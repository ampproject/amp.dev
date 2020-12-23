---
"$title": "Fournir AMP à l'aide d'échanges signés"
"$order": '4'
formats:
- websites
author: CrystalOnScript
---

AMP offre des avantages de vitesse au-delà des formats grâce à des techniques telles que la mise en cache et le préchargement. Ces avantages peuvent avoir des [inconvénients](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/) tels que l'affichage d'URL supplémentaires si elles sont intégrées dans une [visionneuse AMP](https://developers.google.com/search/docs/guides/about-amp). En diffusant du contenu AMP à l'aide d'échanges signés, vous pouvez utiliser une nouvelle fonctionnalité de plateforme Web pour surmonter tous ces problèmes.

Un [échange signé](https://developers.google.com/web/updates/2018/11/signed-exchanges) est composé d'un document AMP valide et de l'URL d'origine du contenu. Ces informations sont protégées par des signatures numériques qui lient en toute sécurité le document à son URL déclarée. Cela permet aux navigateurs d'afficher en toute sécurité l'URL d'origine dans la barre d'URL au lieu du nom d'hôte de la machine qui a livré les octets au navigateur.

Le contenu AMP signé est fourni *en plus* (plutôt qu'à la place) du contenu AMP normal.

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='Image displaying URL from signed exchange', caption=' ', align='' ) }}

[tip type="note"] Cette fonctionnalité est actuellement prise en charge sur Chrome, mais son implémentation est prévue pour d'autres navigateurs. [/tip]

# Les échanges signés fonctionneront-ils pour moi?

Pour implémenter les échanges signés, vous devez répondre aux exigences suivantes:

- La possibilité de configurer et de contrôler les en-têtes HTTP générés par votre serveur. (La plupart des solutions d'hébergement purement web telles que Blogger ne sont *pas* compatibles avec les échanges signés).
- La possibilité de générer des échanges signés AMP, par exemple en exécutant [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md), en tant que [Go binary](https://golang.org/doc/install) ou dans une [VM Docker](https://docs.docker.com/machine/get-started/).
    - Le packager doit être mis à jour toutes les six semaines.
- La possibilité d'appliquer [Vary](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) sur les en-têtes `Accept` et `AMP-Cache-Transform` des serveurs HTTP de périphérie, en renvoyant des contenus différents pour la même URL.
- Le système qui exécute `amppackager` doit être en mesure de faire des requêtes réseau sortantes pour:
    - L'autorité de certification qui émet votre certificat
    - Le serveur de l'éditeur qui héberge les documents AMP à signer
    - `cdn.ampproject.org` pour obtenir la version actuelle d'AMP
- Un système de fichiers de stockage partagé persistant entre toutes les instances de `amppackager` s'exécutant dans le même centre de données.

# Implémentation des échanges signés

Vous trouverez ci-dessous l'ordre d'implémentation suggéré pour prendre en charge les échanges signés sur vos documents AMP.

## Acquérir un certificat TLS pris en charge

Pour produire des échanges signés, vous avez besoin d'un certificat TLS avec l'extension `CanSignHttpExchanges`. Depuis avril 2019, [DigiCert](https://www.digicert.com/) est le seul fournisseur de cette extension ([plus d'infos](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/)).

Afin de générer le certificat, l'autorité de certification (CA) exigera une demande de signature de certificat (CSR), qui peut être générée par `openssl`. Exemple de CSR pour `ampbyexample.com`:

```sh
# generate private key (if necessary)

$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey
# generate CSR (the file ampbyexample-packager.csr)

$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```

## Déterminer les URL à signer

Vous devrez créer un modèle d'URL qui définit les documents à signer. Il est essentiel que le contenu privé, tel que les informations personnalisées, ne soit pas signé, pour éviter d'envoyer un contenu trompeur ou incorrect.

Pour des raisons de performances, le packager ne doit recevoir que des documents AMP valides en entrée. Certains documents AMP non valides conviennent si nécessaire, mais vous devez éviter d'envoyer tout le trafic via le packager.

## Déployer le packager sur un serveur intermédiaire

Vous devez d'abord configurer les échanges signés sur un serveur intermédiaire pour vérifier que votre configuration est correcte avant de migrer vers la production.

Nous vous recommandons d'utiliser [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md) pour générer des échanges signés. Cependant, si cela ne convient pas à votre environnement de production, vous pouvez plutôt utiliser les clients de ligne de commande [`transform`](https://github.com/ampproject/amppackager/blob/master/transformer/README.md) et [`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange), et gérer vous-même les tâches de négociation de contenu et de gestion des certificats.

Les instructions suivantes s'appliquent aux déploiements utilisant `amppackager`.

### Configuration

Le fichier de configuration de [`amppackager`](https://github.com/ampproject/amppackager), (`amppkg.toml`), appelle un **CertFile** et un **KeyFile**.

Le **KeyFile** est la clé privée (`ampbyexample-packager.key` dans l'exemple ci-dessus) et doit avoir le format suivant. (Remarque: ne partagez pas votre propre clé privée et protégez-la contre tout partage accidentel!)

```txt
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINDgf1gprbdD6hM1ttmRC9+tOqJ+lNRtHwZahJIXfLADoAoGCCqGSM49
…
4j1NY29jVmAMQYrBYb+6heiv6ok+8c/zJQ==
-----END EC PRIVATE KEY-----
```

Le **CertFile** est le certificat public. Si DigiCert a fourni le certificat, celui-ci peut être créé en concaténant ensemble le certificat spécifique à l'origine fourni par DigiCert et le fichier `DigiCertCA.crt`.

```txt
-----BEGIN CERTIFICATE-----
MIIE0zCCBFmgAwIBAgIQCkEgeFknZluZtdcJnvdFCjAKBggqhkjOPQQDAjBMMQsw
CQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMSYwJAYDVQQDEx1EaWdp
Q2VydCBFQ0MgU2VjdXJlIFNlcnZlciBDQTAeFw0xODEwMzAwMDAwMDBaFw0xOTEx
MDYxMjAwMDBaMGIxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJjYTEWMBQGA1UEBxMN
TW91bnRhaW4gVmlldzETMBEGA1UEChMKR29vZ2xlIExMQzEZMBcGA1UEAxMQYW1w
YnlleGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAGu0CjzWa6i
…
PXLGRK8i0lr7Jv6ZKPY8tfaB/c5yK404QU4HNggmAiEAlnNjIerjJOLHb8CvVaUQ
nhhn0a35nHp1yvE651W14fMwCgYIKoZIzj0EAwIDaAAwZQIwI4/7dpqJQxkQwpP3
DAjVOFdjC6PDcUIRPll3bF0srrTUXSyZ8xkM4q/RhB51A0hVAjEAsUGNYBje9RIO
wf9qyV2iHB+9cBwgKfC0KvEcBugbgHShypM8hPhV9UMC3qTpdKPx
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIDrDCCApSgAwIBAgIQCssoukZe5TkIdnRw883GEjANBgkqhkiG9w0BAQwFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaMEwxCzAJBgNVBAYTAlVT
…
loB5hWp2Jp2VDCADjT7ueihlZGak2YPqmXTNbk19HOuNssWvFhtOyPNV6og4ETQd
Ea8/B6hPatJ0ES8q/HO3X8IVQwVs1n3aAr0im0/T+Xc=
-----END CERTIFICATE-----
```

### Installation

Suivez [ces instructions pour configurer `amppackager` pour votre site](https://github.com/ampproject/amppackager/blob/master/README.md).

[tip type="read-on"] Voir [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js) (utilisé par `amp.dev`) pour un exemple des changements côté serveur que vous devrez faire pour acheminer les requêtes requises vers `amppkg`. [/tip]

### Test

Vérifiez que votre site intermédiaire répond avec le contenu du type MIME `application/signed-exchange` lorsque spécifié par la requête HTTP. Par exemple (remplacez `staging.example.com` par votre serveur intermédiaire):

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

Le résultat doit inclure cette ligne:

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"] La valeurs `v="1..100"` dans la requête est un caractère de remplacement. N'utilisez pas cette valeur exacte; mais, comme il est [décrit dans les instructions d'installation de amppackager](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing), vérifiez uniquement l'existence de l'en-tête `amp-cache-transform` et ignorez cette valeur. [/tip]

[tip type="important"] La chaîne de version `v=b3` dans la réponse correspond à la version d'août 2019. Celle-ci sera modifiée. [/tip]

La majeure partie de la réponse doit être votre page AMP (en texte brut). Il y a un petit en-tête binaire et, si la page est > 16 ko, quelques octets binaires sont éparpillés.

[ L'outil `dump-signedexchange`](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation) peut être utilisé pour analyser la réponse:

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

(Notez que le commutateur `-verify` ne fonctionnera pas à ce stade car les certificats requis ne sont pas sur le serveur `https://example.com/`.)

Vérifiez que la réponse inclut *toujours* l'en-tête `Vary` avec la valeur `Accept,AMP-Cache-Transform` (indépendamment du fait que le type MIME soit `text/html`, `application/signed-exchange` ou autre chose):

```sh
$ curl -si https://staging.example.com/ | less
```

Ce résultat doit inclure cette ligne:

```txt
vary: Accept,AMP-Cache-Transform
```

## Déployer le packager en production

### Installation

Ajustez les étapes de déploiement intermédiaire ci-dessus en fonction de votre environnement de production.

### Test

#### Avec des outils de ligne de commande

Exécutez les mêmes tests que ci-dessus. `dump-signedexchange -verify` devrait maintenant réussir également.

#### Avec Chrome

Vous pouvez également tester dans Chrome à l'aide de [l'extension ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en). Installez-la à partir du Chrome Webstore et configurez les `en-têtes de requête` sur `amp-cache-transform` avec `google` comme `value`.

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='Testing Chrome with the help of the ModHeader extension', caption=' ', align='' ) }}

Après avoir demandé `https://example.com/` votre serveur fournira un échange signé, mais il la même apparence et le même comportement qu'avant. Vous devrez vérifier qu'un échange signé est correctement renvoyé via la [console DevTools](https://developers.google.com/web/tools/chrome-devtools/).

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='Signed exchange header displayed in the DevTools console', caption=' ', align='' ) }}

Sous l'onglet `Network`, cliquez sur votre nom de domaine et vérifiez que `Signed HTTP exchange` apparaît sous `Preview`.

#### Avec Google AMP Cache

Confirmez que les échanges signés sont compatibles avec Google AMP Cache. Cela est lié à leur visibilité sur les moteurs de recherche tels que la recherche Google.

Pour tester les échanges signés dans Google AMP Cache, ouvrez l'onglet réseau dans DevTools, activez `Preserve log` et visitez une URL telle que `https://example-com.cdn.ampproject.org/wp/s/example.com/`.

DevTools affichera `200` avec une ligne `signed-exchange`, et une ligne `from signed-exchange`, si la demande a réussi.

En cas d'échec, les lignes signed-exchange seront absentes ou seront surlignées en rouge. Un en-tête d' `warning` peut également être affiché et fournir des informations supplémentaires.

## Echanges signés dans la recherche Google

Si vos pages AMP ont été distribuées avec succès en tant qu'échanges signés, leurs résultats de recherche afficheront l'éclair AMP, comme précédemment, mais en appuyant sur les résultats, `https://example.com` apparaîtra dans la barre d'URL, au lieu d'une URL commençant par `https://www.google.com/amp/….`. En outre, la barre de `viewer` n'apparaîtra pas.

Dans la console DevTools, sous l'onglet `network`, vous pourrez voir `signed-exchange` sous la colonne `type`.

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='Within the DevTools console, under the network tab, you will be able to see signed-exchange under the type column.', caption=' ', align='' ) }}

# Fournisseurs de services d'échange signés

Voici une liste de CDN et de fournisseurs d'hébergement offrant une prise en charge prête à l'emploi pour les échanges signés. Utilisez l'une de ces solutions pour un démarrage facile en matière d'échanges signés:

- [Programme d'installation AMP Packager de Google Cloud Click-to-Deploy](https://console.cloud.google.com/marketplace/details/google/amp-packager?filter=solution-type:k8s) [AMP Packager](https://github.com/ampproject/amppackager#amp-packager) est un outil permettant d'améliorer les URL AMP en diffusant AMP à l'aide d'échanges signés. Pour plus de détails, consultez le [blog AMP](https://blog.amp.dev/2020/11/23/amp-packager-is-now-available-on-google-cloud-marketplace/).
- [URL réelle Cloudflare AMP](https://www.cloudflare.com/website-optimization/amp-real-url/). [Cloudflare](https://www.cloudflare.com/) est l'un des plus grands réseaux au monde. Aujourd'hui, les entreprises, les organisations à but non lucratif, les blogueurs et toute personne ayant une présence sur Internet se vantent d'avoir des sites Web et des applications plus rapides et plus sécurisés grâce à Cloudflare.
