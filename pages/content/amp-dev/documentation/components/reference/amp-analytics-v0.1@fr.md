---
$title: amp-analytics
$category@: ads-analytics
teaser:
  text: Capturer les données d'analyse à partir d'un document AMP.
---


<!--
Copyright 2019 The AMP HTML Authors. All Rights Reserved.

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



Ce composant capture des données d'analyse à partir d'un document AMP.

<table>
  <tr>
    <td class="col-fourty"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-analytics" src="https://ampjs.org/v0/amp-analytics-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemples</strong></td>
    <td>Consultez l'<a href="https://ampbyexample.com/components/amp-analytics/">exemple de composant amp-analytics</a> sur AMP By Example.</td>
  </tr>
</table>



## Transmettre des données d'analyse à un fournisseur ou les envoyer en interne ? <a name="sending-analytics-to-a-vendor-or-in-house"></a>

Avant d'utiliser les analyses AMP sur votre site, vous devez déterminer si vous utiliserez des outils d'analyse tiers pour évaluer l'intérêt des utilisateurs ou votre propre solution interne.

[tip type="read-on"]
Pour tout savoir sur les analyses AMP, consultez le guide [Configuration des analyses](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md).
[/tip]

### Transmettre les données à un fournisseur de solutions d'analyse <a name="analytics-vendors"></a>

Les analyses AMP sont spécialement conçues pour mesurer une seule fois et transmettre ces mesures à autant de destinataires que nécessaire. Si vous travaillez déjà avec un ou plusieurs fournisseurs de solutions d'analyse, consultez la liste des [fournisseurs de solutions d'analyse](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) pour savoir s'ils ont intégré leur solution à AMP.

Fournisseurs ayant intégré leur solution à AMP :

1. Dans la balise `<amp-analytics>`, ajoutez l'attribut `type` et définissez sa valeur sur le [fournisseur](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) spécifié.
1. Déterminez les données dont vous souhaitez effectuer la capture et le suivi, puis indiquez ces informations dans les données de configuration. Consultez la documentation du fournisseur pour obtenir des instructions sur la façon de recueillir des données d'analyse.

Si le fournisseur de solutions d'analyse n'a pas intégré AMP, contactez son service d'assistance. Nous vous invitons également à créer un ticket d'incident dans le projet AMP pour demander à ce que le fournisseur soit ajouté. Consultez également l'article relatif à l'[intégration de vos outils d'analyse dans AMP HTML](../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md). Vous pouvez aussi contacter votre fournisseur pour lui envoyer les données à l'URL qu'il vous a indiquée. Pour en savoir plus, consultez la section [Envoyer des données en interne](#sending-data-in-house) ci-dessous.

*Exemple : Envoi de données à un fournisseur de solutions d'analyse tiers*

Dans l'exemple suivant, les données d'analyse sont envoyées à Nielsen, un fournisseur de solutions d'analyse tiers qui est intégré à AMP. Vous trouverez des informations sur la configuration des données d'analyse pour Nielsen dans la documentation [Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

```html
<amp-analytics type="nielsen">
  <script type="application/json">
    {
      "apid": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
      "apv": "1.0",
      "apn": "My AMP Website",
      "section": "Entertainment",
      "segA": "Music",
      "segB": "News",
      "segC": "Google AMP"
        }
      }
  </script>
</amp-analytics>
```

### Envoyer des données en interne <a name="sending-data-in-house"></a>

Si vous possédez votre propre solution interne pour mesurer l'engagement des utilisateurs, la seule chose dont vous aurez besoin pour intégrer les analyses AMP à cette solution est une URL. C'est là que vous enverrez les données. Vous pouvez également envoyer des données à différentes URL. Par exemple, vous pouvez envoyer les données sur les vues de page à une URL et les données d'engagement sur les médias sociaux à une autre.

[tip type="note"]
Si, dans le cadre de votre solution interne, vous devez travailler avec un fournisseur de solutions d'analyse qui n'est pas intégré à AMP, coopérez avec ce dernier pour déterminer les informations de configuration qui sont requises.
[/tip]

Pour envoyer des données à une URL spécifique, procédez comme suit :

1. Déterminez les données dont vous souhaitez effectuer la capture et le suivi, puis [indiquez ces informations dans les données de configuration](#specifying-configuration-data).
1. Dans l'objet de configuration [`requests`](#requests), indiquez le type de requête dont vous souhaitez effectuer le suivi (page vue, événements déclenchés particuliers, etc.) et les URL auxquelles les données de suivi doivent être envoyées.

[tip type="note"]
Lors du traitement des URL AMP dans l'en-tête de page de provenance des requêtes d'analyse, supprimez ou ignorez le paramètre `usqp`. Ce paramètre est utilisé par Google pour déclencher des tests pour Google AMP Cache.
[/tip]

*Exemple : Envoi de données à une URL*

Voici un exemple simple de suivi des pages vues.  Chaque fois qu'une page est visible, l'événement de déclenchement est généré et envoie les données sur les pages vues à une URL définie avec un ID aléatoire.

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM"
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
```

  [tip type="success"]
Pour certains scénarios de suivi courants (pages vues, clics sur une page, défilement, etc.), consultez la page [Analytics : Cas d'utilisation](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/use_cases.md).
[/tip]

## Spécifier les données de configuration <a name="specifying-configuration-data"></a>

Dans l'élément `<amp-analytics>`, vous devez spécifier un objet de configuration JSON qui contient les informations relatives aux éléments à mesurer et à la destination des données d'analyse.

L'objet de configuration pour `<amp-analytics>` utilise le format suivant :

```javascript
{
  "requests": {
    request-name: request-value,
    ...
  },
  "vars": {
    var-name: var-value,
    ...
  },
  "extraUrlParams": {
    extraurlparam-name: extraurlparam-value,
    ...
  },
  "triggers": {
    trigger-name: trigger-object,
    ...
  },
  "transport": {
    "beacon": *boolean*,
    "xhrpost": *boolean*,
    "image": *boolean*,
  }
}
```

### Configuration intégrée ou à distance <a name="inline-or-remote-configuration"></a>

Les données de configuration peuvent être spécifiées de manière intégrée ou récupérées à distance en spécifiant une URL dans l'attribut `config`. Vous pouvez, en outre, sélectionner la configuration intégrée pour les principaux fournisseurs de solutions d'analyse en utilisant l'attribut `type`.

En cas d'utilisation de données de configuration provenant de plusieurs de ces sources, les objets de configuration (variables, requêtes et déclencheurs) sont fusionnés afin que :

1. la configuration à distance soit prioritaire sur la configuration intégrée ;
1. la configuration intégrée soit prioritaire sur la configuration du fournisseur.

#### Charger la configuration à distance <a name="loading-remote-configuration"></a>

Pour charger une configuration à distance, spécifiez l'attribut `config` et l'URL des données de configuration dans l'élément `<amp-analytics>`. L'URL spécifiée doit utiliser le format HTTPS. L'URL peut inclure des [variables d'URL AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md). Pour accéder aux cookies, reportez-vous à l'attribut [`data-credentials`](#data-credentials). La réponse doit respecter les [consignes de sécurité AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).

Dans cet exemple, l'attribut `config` est spécifié pour charger les données de configuration à partir de l'URL spécifiée.

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

#### Fonctionnalité de réécriture de configuration <a name="configuration-rewriter"></a>

La fonctionnalité de réécriture de configuration est conçue pour permettre aux fournisseurs de solutions d'analyse de réécrire une configuration fournie de manière dynamique. Cette fonctionnalité est semblable à la configuration à distance, si ce n'est qu'elle inclut, en outre, toute configuration fournie par l'utilisateur dans la requête envoyée au serveur. Pour l'heure, cette option ne peut être activée que par un fournisseur de solutions d'analyse.

Un fournisseur de solutions d'analyse indique une propriété configRewriter avec une URL de serveur.
```js
export const VENDOR_ANALYTICS_CONFIG = {
  ...
  'configRewriter': {
    'url': 'https://www.vendor.com/amp-config-rewriter',
    },
  ...
  }
```

L'environnement d'exécution envoie une requête contenant la configuration intégrée, fusionnée avec la configuration à distance fournie, au point de terminaison configRewriter indiqué par le fournisseur. Le fournisseur utilise ces données du côté serveur pour la construction et renvoie une nouvelle configuration réécrite.

L'environnement d'exécution fusionne ensuite l'ensemble de la configuration fournie afin de déterminer la configuration finale par ordre décroissant de priorité :

1. Configuration réécrite
1. Configuration intégrée
1. Configuration définie par le fournisseur

##### Groupes de variables <a name="variable-groups"></a>

La fonctionnalité Groupes de variables permet aux fournisseurs de solutions d'analyse de regrouper un ensemble prédéfini de variables pouvant être facilement activées par un utilisateur. Ces variables sont ensuite résolues et envoyées au point de terminaison `configRewriter` spécifié.

Pour activer cette fonctionnalité, les fournisseurs de solutions d'analyse doivent créer un objet `varGroups` à l'intérieur de la configuration `configRewriter`. Les éditeurs peuvent alors inclure tout objet `varGroups` créé par un fournisseur nommé qu'ils souhaitent activer dans leur configuration d'analyse. Toutes les variables acceptées dans le [guide de substitution des variables AMP HTML](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) peuvent être utilisées. *Remarque importante* : Les variantes ${varName} ne fonctionnent pas.

Prenons l'exemple d'un fournisseur dont la configuration se présente comme suit :
```js
// This is predefined by vendor.
export const VENDOR_ANALYTICS_CONFIG = {
  ...
  'configRewriter': {
    'url': 'https://www.vendor.com/amp-config-rewriter',
    'varGroups' : {
      'group1': {
        'referrer': 'DOCUMENT_REFERRER',
        'source': 'SOURCE_URL',
        'group2': {
          'title': 'TITLE',
          },
        },
      },
    },
    ...
}
```

  Vous pouvez préciser les groupes de variables qui sont activés en incluant `{enabled: true}` pour les objets `varGroups` spécifiés dans la configuration `<amp-analytics>` du fournisseur. `enabled` est un mot clé réservé qui ne peut pas être utilisé comme nom de variable.

  Dans l'exemple ci-dessous, `group1` et `group2` ont tous deux été activés. Tous les groupes qui n'ont pas été spécifiquement activés sont ignorés. L'environnement d'exécution va ensuite résoudre toutes ces variables activées et les fusionner en un seul objet `configRewriter.vars` qui sera envoyé à l'URL de réécriture de la configuration.

```html
  /* Included on publisher page */
  <amp-analytics type="myVendor" id="myVendor" data-credentials="include">
    <script type="application/json">
    {
      "configRewriter": {
        "varGroups": {
          "group1": {
            "enabled": true
          },
          "group2": {
            "enabled": true
          }
        }
      }
    }
    </script>
  </amp-analytics>
```

  Dans cet exemple, le corps de la requête se présente comme suit :
```json
/* Sent to configuration rewriter server. */
"configRewriter": {
  "vars": {
    "referrer": "https://www.example.com",
    "source": "https://www.amp.dev",
    "title": "Cool Amp Tips"
  }
}
```

### Objets de données de configuration <a name="configuration-data-objects"></a>

#### Requêtes <a name="requests"></a>

L'objet de configuration `requests` indique les URL utilisées pour transmettre les données à une plate-forme d'analyse, ainsi que le mode de traitement par lots ou de signalement de la requête. L'objet `request-name` indique la requête qui doit être envoyée en réponse à un événement particulier (`pageview`, `event`, etc.). L'objet `request-value` contient une URL https. La valeur peut inclure des jetons d'espace réservé pouvant faire référence à d'autres requêtes ou variables. `request-value` peut également être un objet contenant des configurations de requête facultatives.

##### Configurations de requête <a name="request-configs"></a>

Les propriétés utilisées pour définir une requête avec un objet sont les suivantes :

- `baseUrl` : définit l'URL de la requête (obligatoire).
- `reportWindow` : propriété facultative permettant de spécifier la période (en secondes) avant d'arrêter le signalement des requêtes. Le déclencheur avec l'attribut `important: true` remplace la contrainte de fenêtre de signalement maximale.

Dans cet exemple, toutes les requêtes sont valides.

```javascript
"requests": {
  "base": "https://example.com/analytics?a=${account}&u=${canonicalUrl}&t=${title}",
  "pageview": {
    "baseUrl": "${base}&type=pageview"
  },
  "event": {
    "baseUrl": "${base}&type=event&eventId=${eventId}",
    "batchInterval": 5,
    "reportWindow" : 30
  }
}
```

Certains fournisseurs de solutions d'analyse proposent une configuration prête à l'emploi, que vous utilisez au moyen de l'attribut `type`. Si vous utilisez un fournisseur de solutions d'analyse, il n'est pas forcément nécessaire d'inclure des informations sur les requêtes. Consultez la documentation de votre fournisseur pour savoir si les requêtes doivent être configurées et, le cas échéant, connaître la marche à suivre.

##### Configurations du traitement par lots <a name="batching-configs"></a>

Pour réduire le nombre de pings de requête, vous pouvez spécifier des comportements de traitement par lots dans la configuration des requêtes. Tous les objets [`extraUrlParams`](#extra-url-params) de `triggers` qui utilisent la même requête sont ajoutés à la propriété `baseUrl` de la requête.

Les propriétés de traitement par lots sont les suivantes :

- `batchInterval` : cette propriété spécifie l'intervalle de temps (en secondes) pour vider les pings de requête dans la file d'attente de traitement par lots. `batchInterval` peut être un nombre ou une série de nombres (l'intervalle minimal est de 200 ms). La requête respecte chaque valeur de la série, puis répète la dernière valeur d'intervalle (ou la valeur unique) lorsqu'elle atteint la fin de la série.

Par exemple, la configuration suivante envoie un seul ping de requête toutes les deux secondes, avec un exemple de ping semblable à ceci :`https://example.com/analytics?rc=1&rc=2`.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": 2,
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

Avec la configuration suivante, le premier ping de requête est envoyé au bout d'une seconde, puis une requête est envoyée toutes les trois secondes. Le premier ping de requête se présente comme suit : `https://example.com/analytics?rc=1`. Quant au deuxième ping de requête, il se présente comme suit : `https://example.com/analytics?rc=2&rc=3&rc=4`.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": [1, 3],
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

#### Variables <a name="vars"></a>

Le composant `amp-analytics` définit de nombreuses variables de base qui peuvent être utilisées dans des requêtes. La liste des variables de ce type est disponible dans le [guide des variables `amp-analytics`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md). Notez également que toutes les variables acceptées dans le [guide de substitution des variables AMP HTML](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) peuvent être utilisées.

L'objet de configuration `vars` peut être utilisé pour définir de nouvelles paires valeur/clé ou pour remplacer des variables existantes qui peuvent être référencées dans des valeurs `request`. Les nouvelles variables sont généralement utilisées pour spécifier des informations spécifiques aux éditeurs.  Des tableaux peuvent être utilisés pour spécifier une liste de valeurs qui doivent être encodées en URL séparément, tout en conservant la virgule comme délimiteur.

```javascript
"vars": {
  "account": "ABC123",
  "countryCode": "tr",
  "tags": ["Swift,Jonathan", "Gulliver's Travels"]
}
```

#### Paramètres d'URL supplémentaires <a name="extra-url-params"></a>

L'objet de configuration `extraUrlParams` indique les paramètres supplémentaires à inclure dans la requête. Par défaut, les paramètres d'URL supplémentaires sont ajoutés à la chaîne de requête d'une URL de requête en utilisant la convention "&foo=baz" habituelle.

Dans l'exemple suivant, `&a=1&b=2&c=3` est ajouté à une requête :

```javascript
"extraUrlParams": {
  "a": "1",
  "b": "2",
  "c": "3"
}
```

L'objet `extraUrlParams` peut être envoyé via le corps de la requête au lieu de l'URL si `useBody` est activé et que la requête est envoyée au moyen des méthodes de transport `beacon` ou `xhrpost`. Dans ce cas, les paramètres ne sont ni encodés en URL ni aplatis. Pour plus d'informations, reportez-vous à la section [Utiliser Body pour les paramètres d'URL supplémentaires](#use-body-for-extra-url-params).

L'attribut `extraUrlParamsReplaceMap` spécifie une carte de clés et de valeurs qui servent de paramètres à `String.replace()` pour effectuer le prétraitement de clés dans la configuration `extraUrlParams`. Par exemple, si une configuration `extraUrlParams` définit `"page.title": "The title of my page"` et que l'attribut `extraUrlParamsReplaceMap` définit `"page.": "_p_"`, alors `&_p_title=The%20title%20of%20my%20page%20` est ajouté à la requête.

`extraUrlParamsReplaceMap` n'est pas obligatoire pour utiliser `extraUrlParams`. Si l'attribut `extraUrlParamsReplaceMap` n'est pas défini, aucune substitution de chaîne ne se produit et les chaînes définies dans `extraUrlParams` sont utilisées telles quelles.

Si `useBody` est activé et que la requête est envoyée au moyen des méthodes de transport `beacon` ou `xhrpost`, la substitution de chaîne `extraUrlParamsReplaceMap` n'est effectuée que sur les clés de niveau supérieur dans `extraUrlParams`.

#### Déclencheurs <a name="triggers"></a>

L'objet de configuration `triggers` décrit à quel moment une requête d'analyse doit être envoyée. L'attribut `triggers` contient une paire clé/valeur de nom de déclencheur et de configuration de déclencheur. Un nom de déclencheur est une chaîne composée de caractères alphanumériques (a-zA-Z0-9). Les déclencheurs issus d'une configuration de priorité inférieure sont remplacés par des déclencheurs portant le même nom dans une configuration de priorité supérieure.

* `on` (obligatoire) Événement à écouter. Les valeurs valides sont les suivantes : `render-start`, `ini-load`, `click`, `scroll`, `timer`, `visible`, `hidden`, `user-error`, [`access-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md ) et [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md)
* `request` (obligatoire) Nom de la requête à envoyer (comme indiqué dans la section `requests`).
* `vars` Objet contenant des paires clé/valeur utilisées pour remplacer les `vars` définies dans la configuration de niveau supérieur ou pour spécifier des variables propres à ce déclencheur.
* `important` peut être spécifié pour utiliser des requêtes qui sont compatibles avec le comportement de traitement par lots ou la fenêtre de signalement. Définir l'attribut `important` sur `true` peut faciliter le vidage de la file d'attente des requêtes par lots avec certains déclencheurs. Dans ce cas, il est possible de réduire le nombre de pings de requête sans risquer de perdre des événements de déclenchement importants. Définir l'attribut `important` sur `true` permet également d'ignorer la valeur `reportWindow` de la requête pour envoyer des pings de requête importants.
* `selector` et `selectionMethod` peuvent être spécifiés pour certains déclencheurs, tels que `click` et `visible`. Pour plus d'informations, reportez-vous à la section [Sélecteur d'éléments](#element-selector).
* `scrollSpec` (obligatoire lorsque l'attribut `on` est défini sur `scroll`) Cette configuration est utilisée avec le déclencheur `scroll`. Consultez les informations ci-dessous pour plus de détails.
* `timerSpec` (obligatoire lorsque l'attribut `on` est défini sur `timer`) Cette configuration est utilisée avec le déclencheur `timer`. Consultez les informations ci-dessous pour plus de détails.
* `sampleSpec` Cet objet permet de définir le mode d'échantillonnage des requêtes avant leur envoi. Ce paramètre permet d'effectuer un échantillonnage en fonction d'entrées aléatoires ou d'autres variables compatibles avec la plate-forme. L'objet contient une configuration permettant de spécifier une entrée qui est utilisée pour générer un hachage, ainsi qu'un seuil que ce dernier doit respecter.
    * `sampleOn` Ce modèle de chaîne est développé en renseignant les variables de la plate-forme, puis haché afin de générer un nombre pour la logique d'échantillonnage décrite sous le seuil ci-après.
    * `threshold` Cette configuration permet d'exclure les requêtes qui ne répondent pas à des critères particuliers. Pour qu'une demande accède au fournisseur de solutions d'analyse, la logique suivante doit être définie sur "true" : `HASH(sampleOn) < threshold`.</li>
* `videoSpec` (utilisée lorsque l'attribut `on` est défini sur `video-*`) Cette configuration est utilisée avec les déclencheurs [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md).

À titre d'exemple, la configuration suivante peut être utilisée pour échantillonner 50 % des requêtes en fonction d'une entrée aléatoire ou à 1 % en fonction de l'ID client.

```javascript
'triggers': {
  'sampledOnRandom': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${random}',
      'threshold': 50,
    },
  },
  'sampledOnClientId': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${clientId(cookieName)}',
      'threshold': 1,
    },
  },
},
```

##### Sélecteur d'éléments <a name="element-selector"></a>

Certains déclencheurs, tels que `click` et `visible`, permettent de spécifier un seul élément ou un ensemble d'éléments à l'aide des propriétés du sélecteur. Les limites et interprétations appliquées aux éléments sélectionnés peuvent varier en fonction des déclencheurs. Par exemple : Un sélecteur s'applique-t-il à l'ensemble des éléments correspondants ou seulement au premier ? Quels éléments peuvent être mis en correspondance : tous ou seulement les éléments AMP ? Pour plus d'informations, consultez la documentation relative à chaque déclencheur concerné.

Les propriétés du sélecteur sont les suivantes 

- `selector` Cette propriété permet de rechercher un élément ou un ensemble d'éléments à l'aide d'une requête CSS/DOM. La sémantique utilisée pour la mise en correspondance de l'élément peut être modifiée à l'aide de `selectionMethod`. La valeur de cette propriété peut être :
    - Un sélecteur CSS valide, par exemple `#ad1` ou `amp-ad`.
    - `:root` Un sélecteur spécial qui correspond à la racine du document.
- `selectionMethod` Lorsque cette propriété est spécifiée, sa valeur peut être `scope` ou `closest`. `scope` permet de sélectionner un élément dans l'élément parent de la balise `amp-analytics`. `closest` recherche l'ancêtre le plus proche de la balise `amp-analytics` qui respecte le sélecteur donné. La valeur par défaut est `scope`.

##### Intégrer le déclencheur de démarrage du rendu <a name="embed-render-start-trigger"></a>

Les éléments AMP qui intègrent d'autres documents dans des cadres iFrame (des annonces, par exemple) peuvent signaler un événement de démarrage de rendu (`"on": "render-start"`). En règle générale, cet événement est généré dès qu'il est possible de confirmer que le rendu du document intégré a commencé. Consultez la documentation d'un élément AMP spécifique pour savoir s'il émet ou non cet événement.

Le déclencheur de l'élément intégré doit inclure un élément [`selector`](#element-selector) qui pointe vers l'élément d'intégration :
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request",
    "selector": "#embed1"
  }
}
```

L'événement de démarrage du rendu est également émis par le document proprement dit et peut être configuré comme suit :
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request"
  }
}
```

##### Déclencheur de chargement initial <a name="initial-load-trigger"></a>

L'événement de chargement initial (`"on": "ini-load"`) est déclenché lorsque le contenu initial d'un élément AMP ou d'un document AMP a été chargé.

Le "chargement initial" est défini par rapport au conteneur et à sa taille initiale.
Pour être plus précis :

- Pour un document : tous les éléments de la première fenêtre d'affichage.
- Pour un élément intégré : tous les éléments de contenu du document intégré qui sont positionnés dans la taille initiale de l'élément intégré.
- Pour un élément AMP simple (`amp-img`, par exemple) : les ressources proprement dites, telles qu'une image ou une vidéo.

Le déclencheur d'un élément intégré ou d'un élément AMP doit inclure un élément [`selector`](#element-selector) qui pointe vers l'élément :
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request",
    "selector": "#embed1"
  }
}
```

L'événement de chargement initial est également émis par le document proprement dit et peut être configuré comme suit :
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request"
  }
}
```

##### Déclencheur de visibilité des pages et des éléments <a name="page-and-element-visibility-trigger"></a>

Utilisez le déclencheur de visibilité des pages (`"on": "visible"`) pour déclencher une requête lorsque la page devient visible. `visibilitySpec` permet de configurer l'activation de ce déclencheur.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
  }
}
```

Le déclencheur de visibilité des éléments peut être configuré pour tout élément AMP ou pour la racine d'un document à l'aide de l'élément [`selector`](#element-selector). Le déclencheur est activé lorsque l'élément spécifié correspond aux paramètres de visibilité qui peuvent être personnalisés à l'aide de `visibilitySpec`.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "elementview",
    "selector": "#ad1",
    "visibilitySpec": {/* optional visibility spec */}
  }
}
```

Notez que le sélecteur ne peut être utilisé que pour spécifier un seul élément, et non pour un ensemble. Il peut s'agir d'un [élément étendu AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-tag-addendum.md#amp-specific-tags) ou d'une racine de document.

Le déclencheur de visibilité des éléments attend le signal spécifié par la propriété `waitFor` dans `visibilitySpec` avant de lancer le suivi. Si la propriété `waitFor` n'est pas spécifiée, le déclencheur attend le signal [`ini-load`](#initial-load-trigger) de l'élément. Pour plus d'informations, consultez la documentation de la propriété `waitFor`.
Si `reportWhen` est spécifié, le déclencheur attend ce signal avant d'envoyer l'événement. Cela s'avère utile, par exemple, pour envoyer des événements d'analyse lorsque la page est fermée.

##### Déclenchement d'erreur <a name="error-trigger"></a>

L'événement d'erreur utilisateur (`"on": "user-error"`) se déclenche lorsqu'une erreur imputable à l'auteur de la page ou au logiciel utilisé pour la publier se produit. Il peut s'agir, par exemple, d'une mauvaise configuration d'un composant AMP, d'annonces mal configurées ou encore d'assertions ayant échoué. Les erreurs utilisateur sont également affichées dans la console de développement.

```javascript
"triggers": {
  "userError": {
    "on": "user-error",
     "request": "error"
  }
}
```

[tip type="note"]
Un [problème connu](https://github.com/ampproject/amphtml/issues/10891) concerne le signalement d'erreurs liées à des intégrations iFrame A4A qui ne sont pas pertinentes pour la page.
[/tip]


**<a id="visibility-spec"></a>Spécification de visibilité**

`visibilitySpec` est un ensemble de conditions et de propriétés qui peuvent être appliquées aux déclencheurs `visible` (visibles) ou `hidden` (masqués) afin de modifier le moment du déclenchement. Si plusieurs propriétés sont spécifiées, elles doivent toutes être définies sur "true" pour qu'une requête soit déclenchée. Les propriétés de configuration acceptées dans `visibilitySpec` sont les suivantes :


- `waitFor` : cette propriété indique que le déclencheur de visibilité doit attendre un certain signal avant d'effectuer le suivi de la visibilité. Les valeurs acceptées sont `none`, `ini-load` et `render-start`. Si la propriété `waitFor` n'est pas définie, le paramètre [`ini-load`](#initial-load-trigger) est défini par défaut lorsque le sélecteur est spécifié. Sinon, ce paramètre est défini sur `none`.
- `reportWhen` : cette propriété indique que le déclencheur de visibilité doit attendre un certain signal avant l'envoi. La seule valeur acceptée est `documentExit`. Les propriétés `reportWhen` et `repeat` ne peuvent pas être utilisées toutes les deux dans la même spécification de visibilité. Notez que lorsque la propriété `reportWhen` est spécifiée, le rapport est envoyé à l'émission du signal, même si les conditions de visibilité requises ne sont pas remplies à ce moment-là ou si elles n'ont pas été respectées précédemment. Toutes les variables pertinentes (`totalVisibleTime`, etc.) sont renseignées en fonction des exigences de visibilité dans cette spécification de visibilité (`visibilitySpec`).
- `continuousTimeMin` et `continuousTimeMax` : ces propriétés indiquent qu'une requête doit être déclenchée lorsqu'un élément se trouve (intégralement ou en partie) dans la fenêtre d'affichage pendant une période continue comprise entre les durées minimale et maximale spécifiées. Les durées sont exprimées en millisecondes. La propriété `continuousTimeMin` est définie, par défaut, sur 0.
- `totalTimeMin` et `totalTimeMax` : ces propriétés indiquent qu'une requête doit être déclenchée lorsqu'un élément se trouve (intégralement ou en partie) dans la fenêtre d'affichage pendant une durée totale comprise entre les périodes minimale et maximale spécifiées. Les durées sont exprimées en millisecondes. La propriété `totalTimeMin` est définie, par défaut, sur 0.
- `visiblePercentageMin` et `visiblePercentageMax` : ces propriétés indiquent qu'une requête doit être déclenchée lorsque la partie d'un élément visible dans la fenêtre d'affichage est comprise entre les valeurs de pourcentage minimale et maximale spécifiées. Les valeurs de pourcentage comprises entre 0 et 100 sont correctes. Notez que la limite supérieure (`visiblePercentageMax`) est inclusive. La limite inférieure (`visiblePercentageMin`) est exclusive, sauf si les deux limites sont définies sur 0 ou sur 100. Si les deux limites sont définies sur 0, le déclencheur est activé lorsque l'élément n'est pas visible. Si les deux limites sont définies sur 100, le déclencheur est activé lorsque l'élément est entièrement visible. Lorsque ces propriétés sont définies avec d'autres propriétés temporelles, on tient compte uniquement de la période pendant laquelle elles sont satisfaites. Les valeurs définies par défaut pour `visiblePercentageMin` et `visiblePercentageMax` sont, respectivement, 0 et 100.
- `repeat` : si cette propriété est définie sur `true`, le déclencheur est activé chaque fois que les conditions `visibilitySpec` sont remplies. Dans l'exemple ci-dessous, si l'utilisateur fait défiler 51 % de l'élément, puis 49 %, puis de nouveau 51 %, le déclencheur est activé à deux reprises. Cependant, si la propriété `repeat` est définie sur `false`, le déclencheur n'est activé qu'une seule fois. La valeur par défaut de `repeat` est `false`. Les propriétés `reportWhen` et `repeat` ne peuvent pas utilisées toutes les deux dans la même spécification de visibilité.

```javascript
visibilitySpec: {
  visiblePercentageMin: 50,
  repeat: true,
  }
```

`visiblePercentageThresholds` peut être utilisé comme un raccourci pour créer plusieurs instances `visibilitySpec` dont seules les propriétés `visiblePercentageMin` et `visiblePercentageMax` sont différentes. Par exemple, les éléments suivants sont équivalents :

```javascript
// Two triggers with visibilitySpecs that only differ in visiblePercentageMin and visiblePercentageMax:
"triggers": {
  "pageView_30_to_40": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 30,
      "visiblePercentageMax": 40,
      "continuousTimeMin": 1000,
    }
  }

  "pageView_40_to_50": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 40,
      "visiblePercentageMax": 50,
      "continuousTimeMin": 1000,
    }
  }
}

// A single trigger equivalent to both of the above:
"triggers": {
  "pageView": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageThresholds": [[30, 40], [40, 50]],
      "continuousTimeMin": 1000,
    }
  }
}
```
Outre les conditions énoncées ci-dessus, `visibilitySpec` active certaines variables qui sont documentées [ici](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#visibility-variables).

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "waitFor": "ini-load",
      "reportWhen": "documentExit",
      "visiblePercentageMin": 20,
      "totalTimeMin": 500,
      "continuousTimeMin": 200
    }
  }
}
```

Outre les variables fournies dans le cadre des déclencheurs, vous pouvez définir des valeurs de remplacement / supplémentaires pour les [variables en tant qu'attributs de données](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute). Si ces attributs de données sont utilisés, ils doivent faire partie de l'élément spécifié en tant que [`selector`](#element-selector).

##### Déclencheur de clic <a name="click-trigger"></a>

Utilisez le déclencheur de clic (`"on": "click"`) pour déclencher une requête lorsqu'un utilisateur clique sur un élément spécifié. Utilisez l'élément [`selector`](#element-selector) pour déterminer les éléments qui déclencheront cette requête. Le déclencheur est activé pour tous les éléments correspondant au sélecteur spécifié.

```javascript
"vars": {
  "id1": "#socialButtonId",
  "id2": ".shareButtonClass"
},
"triggers": {
  "anchorClicks": {
    "on": "click",
    "selector": "a, ${id1}, ${id2}",
    "request": "event",
    "vars": {
      "eventId": 128
    }
  }
}
```

Outre les variables fournies dans le cadre des déclencheurs, vous pouvez définir des valeurs de remplacement / supplémentaires pour les [variables en tant qu'attributs de données](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute). Si ces attributs de données sont utilisés, ils doivent faire partie de l'élément spécifié en tant que `selector`.

#####Déclencheur de défilement <a name="scroll-trigger"></a>

Utilisez le déclencheur de défilement (`"on": "scroll"`) pour déclencher une requête dans certaines conditions lors du défilement de la page. Ce déclencheur fournit des [variables spéciales](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#interaction) qui indiquent les limites ayant déclenché l'envoi d'une requête. Utilisez `scrollSpec` pour déterminer le moment du déclenchement :

- `scrollSpec` Cet objet peut contenir les propriétés `verticalBoundaries` et `horizontalBoundaries`. Au moins l'une de ces deux propriétés est requise pour déclencher un événement de défilement. Les valeurs des deux propriétés doivent être des séries de nombres contenant les limites par rapport auxquelles un événement de défilement est généré. Par exemple, dans l'extrait de code suivant, l'événement de défilement est déclenché lorsque l'utilisateur fait défiler la page verticalement de 25 %, 50 % et 90 %. L'événement est également déclenché lorsque la page fait l'objet d'un défilement horizontal équivalant à 90 % de la largeur de défilement. Pour que la page continue de fonctionner de manière optimale, les limites de défilement sont arrondies au multiple de `5` le plus proche.

```javascript
"triggers": {
  "scrollPings": {
    "on": "scroll",
    "scrollSpec": {
      "verticalBoundaries": [25, 50, 90],
      "horizontalBoundaries": [90]
    },
    "request": "event"
  }
}
```

##### Déclencheur de minuteur <a name="timer-trigger"></a>

Utilisez le déclencheur du minuteur (`"on": "timer"`) pour déclencher une requête selon un intervalle de temps régulier. Utilisez `timerSpec` pour déterminer le moment du déclenchement :

- `timerSpec` Spécification pour les déclencheurs de type `timer`. À moins qu'un élément `startSpec` n'ait été spécifié, le minuteur se déclenche immédiatement (par défaut, il peut être désactivé), puis selon un intervalle spécifié ultérieurement.
    - `interval` Durée de l'intervalle du minuteur, en secondes.
      - `maxTimerLength` Durée maximale de déclenchement du minuteur, en secondes. Une requête supplémentaire est déclenchée lorsque la valeur `maxTimerLength` a été atteinte. La valeur par défaut est de 2 heures. Lorsqu'un élément `stopSpec` est présent, mais qu'aucune valeur maxTimerLength n'est spécifiée, la valeur par défaut est l'infini.
      - `immediate` Déclenchement immédiat du minuteur ou non. Il s'agit d'une valeur booléenne, définie par défaut sur "true".

```javascript
"triggers": {
  "pageTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 10,
      "maxTimerLength": 600
    },
    "request": "pagetime"
  }
}
```

Pour configurer un minuteur qui mesure les événements utilisateur :

- `startSpec` Spécification relative au déclenchement du démarrage du minuteur. Utilisez la valeur `on` et `selector` pour effectuer le suivi d'événements spécifiques. Dans le cas d'une configuration contenant un élément `startSpec`, mais pas d'élément `stopSpec`, le minuteur ne s'arrête que lorsque la valeur `maxTimerLength` a été atteinte.
- `stopSpec` Spécification relative au déclenchement de l'arrêt du minuteur. Dans le cas d'une configuration contenant un élément `stopSpec`, mais pas d'élément `startSpec`, le minuteur démarre immédiatement, mais ne s'arrête que lorsque l'événement spécifié se produit.

```javascript
"triggers": {
  "videoPlayTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 5,
      "startSpec": {
        "on": "video-play",
        "selector": "amp-video"
      },
      "stopSpec": {
        "on": "video-pause",
        "selector": "amp-video"
      }
    },
    "request": "videoRequest"
  }
}
```

Pour en savoir plus sur la création de déclencheurs de minuteur imbriqués, consultez la spécification relative aux [déclencheurs](#triggers). Notez que vous ne pouvez pas utiliser un déclencheur de minuteur pour démarrer ou arrêter un minuteur.

##### Déclencheur occulté <a name="hidden-trigger"></a>

Utilisez le déclencheur occulté (`"on": "hidden"`) pour déclencher une requête lorsque la page est occultée.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
  }
}
```

Un élément [`visibilitySpec`](#visibility-spec) peut être inclus, de telle sorte qu'une requête ne soit déclenchée que si les conditions de durée de visibilité sont remplies.
```json
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
    "visibilitySpec": {
      "selector": "#anim-id",
      "visiblePercentageMin": 20,
      "totalTimeMin": 3000,
    }
  }
}
```
La configuration ci-dessus peut être interprétée comme suit :

<blockquote>
Lorsque la page est occultée, déclencher une requête si l'élément #anim-id est visible (sur plus de 20 % de la surface de la fenêtre d'affichage) pendant plus de 3 secondes au total.
</blockquote>

##### Déclencheurs d'accès <a name="access-triggers"></a>

Le système AMP Access génère de nombreux événements pour différents états du flux d'accès. Pour en savoir plus sur les déclencheurs d'accès (`"on": "access-*"`), consultez la page [AMP Access and Analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md ).

#### Déclencheurs d'analyse vidéo <a name="video-analytics-triggers"></a>

Les analyses vidéo proposent plusieurs déclencheurs (`"on": "video-*"`) que les éditeurs peuvent utiliser pour effectuer le suivi de différents événements qui se produisent pendant le cycle de vie d'une vidéo. Pour obtenir des informations supplémentaires, consultez la page [AMP Video Analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md).

#### Transport <a name="transport"></a>

L'objet de configuration `transport` définit comment envoyer une requête. La valeur est un objet dont les champs indiquent les méthodes de transport acceptées.

* `beacon` Indique que [`navigator.sendBeacon`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) peut être utilisé pour transmettre la requête. Une requête POST va alors être envoyée avec des identifiants. Cette requête sera envoyée avec un corps de document vide, sauf si la valeur de `useBody` est définie sur "true". Pour en savoir plus sur `useBody`, reportez-vous à la section [Utiliser Body pour les paramètres d'URL supplémentaires](#use-body-for-extra-url-params).
* `xhrpost` Indique que `XMLHttpRequest` peut être utilisé pour transmettre la requête. Une requête POST va alors être envoyée avec des identifiants. Cette requête sera envoyée avec un corps de document vide, sauf si la valeur de `useBody` est définie sur "true". Pour en savoir plus sur `useBody`, reportez-vous à la section [Utiliser Body pour les paramètres d'URL supplémentaires](#use-body-for-extra-url-params).
* `image` Indique que la requête peut être envoyée en générant une balise `Image`. Une requête GET va alors être envoyée. Pour supprimer les avertissements de console consécutifs à des réponses vides ou des échecs de requête, définissez `"image": {"suppressWarnings": true}`.

Les fournisseurs accrédités par le MRC peuvent utiliser un quatrième mécanisme de transport, "iframe transport", en ajoutant une chaîne d'URL à iframe-transport-vendors.js. Ce mécanisme indique qu'un iFrame doit être créé, avec son attribut `src` défini sur cette URL, et que les requêtes lui seront envoyées via `window.postMessage()`. Dans ce cas, les requêtes ne doivent pas nécessairement être des URL complètes. `iframe` ne peut être spécifié que dans `iframe-transport-vendors.js`. Il ne peut pas être spécifié de manière intégrée dans la balise `amp-analytics`, ni via la configuration à distance. En outre, le frame du fournisseur peut envoyer une réponse qui sera utilisée par amp-ad-exit. Reportez-vous aux fichiers [analytics-iframe-transport-remote-frame.html](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) et [fake_amp_ad_with_iframe_transport.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html) : le premier fichier envoie un objet JSON de réponse {'collected-data': 'abc'}, tandis que le deuxième utilise cet objet pour remplacer 'bar_' par 'abc' dans finalUrl.

Si plusieurs des méthodes de transport ci-dessus sont activées, l'ordre est le suivant : `iframe` &gt; `beacon` &gt; `xhrpost` &gt; `image`. Une seule méthode de transport sera utilisée, et il s'agira de la méthode autorisée et disponible ayant la priorité la plus élevée. Si l'user-agent du client n'accepte pas une méthode, la méthode activée qui vient ensuite dans l'ordre de priorité sera utilisée. Par défaut, les quatre méthodes ci-dessus sont toutes activées.

Dans l'exemple ci-dessous, aucune URL `iframe` n'est spécifiée, et `beacon` et `xhrpost` sont définis sur `false`. Ils ne sont donc pas utilisés, même si leur priorité est supérieure à celle de la méthode `image`. Par défaut, la méthode `image` est définie sur `true`, mais cet élément est explicitement déclaré ici. Si l'user-agent du client accepte la méthode `image`, elle est utilisée. Dans le cas contraire, aucune requête n'est envoyée.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true
}
```

Pour en savoir plus, consultez [cet exemple qui met en œuvre l'API du client de transport iFrame](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) et [cet exemple de page qui intègre cet iFrame](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport.amp.html). L'exemple charge une [annonce fictive](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html) qui contient la balise `amp-analytics`. Notez que le contenu de l'annonce fictive inclut des instructions de configuration supplémentaires qu'il faut respecter.

##### Utiliser Body pour les paramètres d'URL supplémentaires <a name="use-body-for-extra-url-params"></a>

L'option de configuration `useBody` indique si les paramètres d'URL supplémentaires (`extraUrlParams`) doivent être inclus ou non dans le corps de la requête POST plutôt que dans l'URL en tant que paramètres de requête encodés en URL.

`useBody` n'est disponible que pour les méthodes de transport `beacon` et `xhrpost`. Si l'option `useBody` est définie sur "true" et utilisée avec l'une de ces méthodes de transport, les `extraUrlParams` sont envoyés dans le corps de la requête POST. Dans le cas contraire, la requête est envoyée avec un corps vide et les `extraUrlParams` sont inclus en tant que paramètres d'URL.

`useBody` vous permet d'inclure des objets imbriqués dans `extraUrlParams`. Cependant, si la requête bascule vers d'autres options de transport qui ne sont pas compatibles avec `useBody` (`image`, par exemple), les objets imbriqués sont convertis en une chaîne dans l'URL en tant que `[object Object]`.

```javascript
"transport": {
  "beacon": true,
  "xhrpost": true,
  "useBody": true,
  "image": false
}
```

##### Stratégie en matière d'URL de provenance <a name="referrer-policy"></a>

La stratégie en matière d'URL de provenance peut être spécifiée en tant que champ `referrerPolicy` dans la configuration `transport`. Pour le moment, seul `no-referrer` est accepté.
Ce type de stratégie n'est disponible que pour la méthode de transport `image`. Si `referrerPolicy: no-referrer` est spécifié, les méthodes de transport `beacon` et `xhrpost` sont remplacées par `false`.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true,
  "referrerPolicy": "no-referrer"
}
```

#### Linkers <a name="linkers"></a>

La fonctionnalité `linkers` permet d'activer la synchronisation d'identifiants sur plusieurs domaines. `amp-analytics` utilise un [objet de configuration](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md#format) pour créer une "chaîne linker" qui sera ajoutée en tant que paramètre d'URL aux liens sortants spécifiés sur la page. Lorsqu'un utilisateur clique sur l'un de ces liens, la page de destination lit cette chaîne à partir du paramètre d'URL pour procéder à la synchronisation des identifiants. En règle générale, cette fonctionnalité est utilisée pour participer à des sessions utilisateur sur un domaine proxy AMP et un domaine d'éditeur.

Vous trouverez des informations détaillées sur la configuration de Linker sur la page [Linker ID Forwarding](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md).

Si vous souhaitez ingérer ce paramètre, vous trouverez des informations relatives à sa création sur la page [Linker ID Receiving](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md).

#### Cookies <a name="cookies"></a>

La fonctionnalité `cookies` permet d'écrire des cookies dans le domaine d'origine en extrayant les informations [`QUERY_PARAM`](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md#query-parameter) et [`LINKER_PARAM`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#linker-param) de l'URL du document. Elle peut être utilisée avec des fonctionnalités `linkers` pour effectuer la synchronisation des identifiants depuis le domaine proxy AMP vers les pages AMP sur le domaine d'un éditeur.

Pour en savoir plus sur la configuration de `cookies`, consultez la section [Receiving Linker Params on AMP Pages](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#receiving-linker-params-on-amp-pages).

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/validator-amp-analytics.protoascii) dans les spécifications du validateur AMP.

### Attributs valides pour `<amp-analytics>` <a name="valid-attributes-for-"></a>

Voici les attributs valides pour le composant `amp-analytics` :

**type**

Indique le type de fournisseur.  Pour plus d'informations, consultez la liste des [fournisseurs de solutions d'analyse](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md).

Exemple

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json"></amp-analytics>
```

**config**

Il s'agit d'un attribut facultatif qui peut être utilisé pour charger une configuration à partir d'une URL distante spécifiée. L'URL spécifiée doit utiliser le format HTTPS. Reportez-vous également à l'attribut `data-include-credentials` ci-dessous. L'URL peut inclure des [variables d'URL AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md). La réponse doit respecter les [consignes de sécurité AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).

Exemple

```html
<amp-analytics config="https://example.com/analytics.config.json"></amp-analytics>
```

**data-credentials**<a name="data-credentials"></a>

Si cet attribut est défini sur `include`, il est possible de lire et d'écrire des cookies sur la requête spécifiée via l'attribut `config`. Cet attribut est facultatif.

**data-consent-notification-id**

Si cet attribut est fourni, la page ne traite pas les requêtes d'analyse tant que l'utilisateur n'a pas confirmé (accepté) un élément [notification amp-user](amp-user-notification.md) avec l'ID d'élément HTML donné. Cet attribut est facultatif.

## Solutions d'analyse pour les composants AMP <a name="analytics-for-amp-components"></a>

Les développeurs de composants AMP peuvent mettre en œuvre un ensemble de données à l'aide des analyses AMP. Pour en savoir plus, reportez-vous à la section [Implementing analytics for AMP components](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-components-analytics.md)
