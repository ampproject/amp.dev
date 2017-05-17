---
$title: AMP Analytics dans le détail
toc: true
---
[TOC]


Ce guide propose une analyse détaillée du
[composant amp-analytics](/docs/reference/extended/amp-analytics.html),
en divisant un exemple de configuration de la balise `amp-analytics` en quatre catégories principales :

Le reste de ce guide utilise cet exemple de configuration
qui effectue le suivi des vues de page et des clics des utilisateurs sur des liens,
et envoie les données d'analyse à un fournisseur tiers,
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

[sourcecode:html]
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
[/sourcecode]

**Remarque :** Le code illustré ci-dessus est fourni à titre d'exemple pour vous aider à apprendre, mais il ne constitue en rien un exemple réaliste. Si vous travaillez avec des fournisseurs de solutions d'analyse, il est probable que cet exemple n'ait pas de sens ; les configurations du fournisseur simplifieront les choses. Pour obtenir des exemples de configuration de votre fournisseur, consultez sa documentation.

## Où envoyer les données d'analyse : l'attribut type

AMP est conçu pour prendre en charge deux modèles courants de collecte des données :

* L'ingestion par un point d'extrémité appartenant à un éditeur pour les systèmes d'analyse interne
* L'ingestion par un point d'extrémité appartenant à un fournisseur aux fins d'interopérabilité avec la solution du fournisseur
(par exemple, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/) ou encore [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/))

Pour envoyer des données d'analyse à un fournisseur de solutions d'analyse,
incluez l'attribut `type` dans la balise `amp-analytics`,
et définissez sa valeur sur le fournisseur approprié, tel que défini dans la
[spécification du composant amp-analytics](/docs/reference/extended/amp-analytics.html).

Par exemple, `<amp-analytics type="googleanalytics">` envoie les données d'analyse
au fournisseur de solutions d'analyse tiers Google Analytics.
Pour envoyer les données à un point d'extrémité appartenant à l'éditeur,
il vous suffit de ne pas inclure l'attribut `type` ;
les données d'analyse sont envoyées aux points d'extrémité définis pour chaque
[requête](/fr/docs/guides/analytics/deep_dive_analytics.html#quelles-données-sont-envoyées-:-l'attribut-requests).

Les configurations des fournisseurs de solutions d'analyse constituent
un bon point de départ pour commencer avec le composant `amp-analytics`.
Pour en savoir plus, consultez la documentation et
les ressources d'aide de votre fournisseur.
Comme nous l'avons déjà indiqué,
la liste des fournisseurs qui proposent déjà une intégration AMP ainsi que des liens
vers leurs ressources respectives sont disponibles dans la
[spécification du composant amp-analytics](/docs/reference/extended/amp-analytics.html).

Si vous êtes un fournisseur de solutions d'analyse,
découvrez comment
[intégrer votre propre configuration d'analyse dans AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Charger une configuration distante : l'attribut config

Il n'est pas nécessaire d'inclure toutes les configurations
de `amp-analytics` dans votre page AMP.
En lieu et place, vous pouvez appeler une URL distante
pour tout ou partie des configurations.

Cela vous permet entre autres de faire varier la configuration
en fonction d'une requête spécifique.
Si, en tant qu'éditeur, vous avez le contrôle du fichier distant,
vous pouvez effectuer tout traitement nécessaire côté serveur
pour créer les données de configuration.

Pour charger les configurations distantes, la première étape consiste à
inclure l'attribut config dans la balise `amp-analytics` :

[sourcecode:html]
<amp-analytics config="https://example.com/analytics.account.config.json">
[/sourcecode]

L'étape suivante consiste à créer le contenu JSON qui réside dans l'URL distante.
Dans cet exemple simple,
la configuration contenue dans l'objet JSON est juste la valeur de variable due compte d'analyse.

Exemple de contenu dans `https://example.com/analytics.account.config.json` :

[sourcecode:html]
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
[/sourcecode]

La dernière étape consiste à vous assurer que ce qui se trouve dans le fichier distant
est inséré à l'endroit approprié dans la configuration de `amp-analytics`.
Dans les requêtes `pageview` et `event` de cet exemple,
la valeur de la variable `account` est automatiquement
définie sur la valeur du compte indiqué dans l'URL distante (`"account": "UA-XXXXX-Y"`) :

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

**Important :** AMP ne valide pas les usages multiples d'une même variable.
Les valeurs sont renseignées en fonction d'un ordre de préférence de substitution des variables,
et les valeurs indiquées dans les URL distantes sont en première position
(voir [Ordonnancement de la substitution des variables](/fr/docs/guides/analytics/deep_dive_analytics.html#ordonnancement-de-la-substitution-des-variables)).

## Les attributs requests, triggers et transport

L'attribut `requests` détermine quelles données sont envoyées
(par exemple `pageviews` ou `events`)
et où ces données sont envoyées (les URL utilisées pour transmettre les données).

L'attribut `triggers` indique à quel moment les données d'analyse doivent être envoyées,
par exemple lorsqu'un utilisateur affiche une page ou clique sur un lien.

L'attribut `transport` indique comment envoyer une requête,
et plus spécifiquement le protocole.

Lisez la suite pour en savoir plus sur ces configurations.
(Vous pourrez également en apprendre davantage sur ces configurations dans la
[référence sur amp-analytics](/docs/reference/extended/amp-analytics.html).)

### Quelles données sont envoyées : l'attribut requests

La valeur `request-name` est utilisée dans la configuration du déclencheur pour déterminer
quelle requête envoyer en réponse à un événement en particulier.
La valeur `request-value` est une URL `https`.
Ces valeurs peuvent inclure des jetons d'espace réservé
pouvant renvoyer à d'autres requêtes ou variables.

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

Certains fournisseurs de solutions d'analyse (notamment Google Analytics)
ont déjà fourni une configuration,
que vous utilisez via l'attribut `type`.
Si vous utilisez un fournisseur de solutions d'analyse,
il se peut que vous n'ayez pas besoin d'inclure l'information `requests`.
Reportez-vous à la documentation de votre fournisseur pour savoir
si l'attribut `requests` doit être configuré et, le cas échéant, comment le configurer.

#### Ajout d'une URL de requête : Attribut extraUrlParams

L'attribut [extraUrlParams](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#extra-url-params)
spécifie des paramètres additionnels à ajouter à la chaîne de requête de l'URL de requête via la convention usuelle « &foo=baz ».

L'exemple `amp-analytics` ajoute un paramètre additionnel <code>cd1</code>
à la requête et définit la valeur de ce paramètre sur « AMP » :

[sourcecode:html]
  "extraUrlParams": {
    "cd1": "AMP"
  }
[/sourcecode]

### Lorsque les données sont envoyées : l'attribut triggers

L'attribut `triggers` indique le moment auquel une requête d'analyse doit être envoyée.
Il contient une paire clé/valeur précisant le nom et la configuration du déclencheur.
Le nom du déclencheur peut être n'importe quelle chaîne composée
de caractères alphanumériques (a-zA-Z0-9).

Par exemple,
le composant `amp-analytics` suivant est configuré pour envoyer une requête à
`https://example.com/analytics` lorsque le document est chargé pour la première fois
et à chaque fois que l'on clique sur la balise `a` :

[sourcecode:html]
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
  "trackAnchorClicks": {
    "on": "click",
    "selector": "a",
    "request": "event",
    "vars": {
      "eventId": "42",
      "eventLabel": "clicked on a link"
    }
  }
}
[/sourcecode]

AMP prend en charge les configurations suivantes pour le déclencheur :

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Configuration du déclencheur</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (obligatoire)</td>
      <td data-th="Description">Événement à écouter. Les valeurs valides sont <code>click</code>, <code>scroll</code>, <code>timer</code> et <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (obligatoire)</td>
      <td data-th="Description">Nom de la requête à envoyer (tel que spécifié dans les requêtes <a href="/fr/docs/guides/analytics/deep_dive_analytics.html#quelles-données-sont-envoyées-:-l'attribut-requests"></a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Objet contenant des paires clé/valeur utilisé pour remplacer la valeur <code>vars</code> dans la configuration de premier niveau ou pour spécifier une valeur <code>vars</code> unique à ce déclencheur (voir également <a href="/fr/docs/guides/analytics/deep_dive_analytics.html#ordonnancement-de-la-substitution-des-variables">Ordonnancement de la substitution des variables</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (obligatoire lorsque <code>on</code> est défini sur <code>click</code>)</td>
      <td data-th="Description">Sélecteur CSS utilisé pour définir plus précisément les éléments à suivre. Utilisez la valeur <code>*</code> pour suivre tous les éléments. Cette configuration est utilisée conjointement avec le déclencheur <code>click</code>. Découvrez comment utiliser le sélecteur pour <a href="/fr/docs/guides/analytics/use_cases.html#suivi-des-clics-sur-une-page">suivre les clics sur une page</a> et les <a href="/fr/docs/guides/analytics/use_cases.html#suivi-des-interactions-sociales">interactions sociales</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (obligatoire lorsque <code>on</code> est défini sur <code>scroll</code>)</td>
      <td data-th="Description">Définit les conditions en fonction desquelles l'événement <code>scroll</code> est déclenché lorsque l'on fait défiler la page. Cet objet peut contenir les propriétés <code>verticalBoundaries</code> et <code>horizontalBoundaries</code>. Au moins l'une des deux propriétés est obligatoire pour qu'un événement <code>scroll</code> soit déclenché. Les valeurs de chacune des propriétés doivent être des ensembles de nombres contenant les limites pour lesquelles un événement scroll est généré. Voir cet exemple sur le <a href="/fr/docs/guides/analytics/use_cases.html#suivi-du-défilement">suivi du défilement</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (obligatoire lorsque <code>on</code> est défini sur <code>timer</code>)</td>
      <td data-th="Description">Définit les conditions en fonction desquelles l'événement <code>timer</code> est déclenché. L'événement timer est déclenché immédiatement, puis à un intervalle spécifié. Cette configuration est utilisée conjointement avec le déclencheur <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

**Important :** Les déclencheurs d'une configuration dont la priorité est inférieure sont annulés
par les déclencheurs du même nom dont la priorité est supérieure
(voir [Ordonnancement de la substitution des variables](/fr/docs/guides/analytics/deep_dive_analytics.html#ordonnancement-de-la-substitution-des-variables)).

### Comment les données sont envoyées : l'attribut transport

L'attribut `transport` indique comment envoyer une requête.
Les trois modes suivants sont activés par défaut :

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Mode de transport</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Indique qu'il est possible d'utiliser <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> pour transmettre la requête. Cela envoie une requête <code>POST</code> avec des identifiants et une section body vide.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Indique qu'il est possible d'utiliser <code>XMLHttpRequest</code> pour transmettre la requête. Cela envoie une requête <code>POST</code> avec des identifiants et une section body vide.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Indique que la requête peut être envoyée en générant une balise <code>Image</code>. Cela envoie une requête <code>GET</code>.</td>
    </tr>
  </tbody>
</table>

Un seul mode de transport est utilisé :
celui qui est activé, autorisé, disponible
et dont la priorité est la plus haute.
La priorité est `beacon` > `xhrpost` > `image`.
Si l'user-agent du client ne prend pas en charge un mode,
c'est le mode suivant dans l'ordre de priorité qui est utilisé.

N'incluez l'attribut `transport` dans votre configuration
que si vous souhaitez limiter les options de transport.
Vous risquez sinon d'arrêter les requêtes.

Dans l'exemple ci-dessous,
`beacon` et `xhrpost` sont définis sur false.
Ils ne seront donc pas utilisés même si leur priorité est supérieure à celle du mode `image`.
Si l'user-agent du client prend en charge le mode `image`,
il sera utilisé. Sinon, aucune requête n'est envoyée.

[sourcecode:html]
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
[/sourcecode]

## Ordonnancement de la substitution des variables

AMP renseigne les valeurs des variables dans l'ordre de priorité suivant :

1. Configurations distantes (via `config`).
2. `vars` imbriqué dans un déclencheur dans `triggers`.
3. `vars` au niveau supérieur imbriqué dans `amp-analytics`.
4. Valeurs fournies par la plateforme.

Dans cet exemple, nous avons une configuration distante,
des variables définies au niveau supérieur dans triggers et des valeurs au niveau de la plateforme :

[sourcecode:html]
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
[/sourcecode]

Lorsque le même `var` est défini à plusieurs endroits,
l'ordre de priorité de la variable définit sa valeur une fois.
Ainsi, si la configuration distante définit `account` sur UA-XXXXX-Y, comme dans l'exemple ci-dessus,
les valeurs des différentes occurrences de vars sont les suivantes :

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">Valeur</th>
      <th data-th="Defined By" class="col-thirty">Défini par</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">Plateforme</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">Déclencheur</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Configuration distante</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Déclencheur</td>
    </tr>
  </tbody>
</table>
