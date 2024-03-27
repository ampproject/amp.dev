---
$title: amp-access
$category@: dynamic-content
teaser:
  text: Fournir une gestion des abonnements et des paywalls AMP.
---



AMP Access ou "gestion des abonnements et des paywalls AMP" permet aux éditeurs de choisir le type de contenu accessible à un utilisateur (ou lecteur), ainsi que les restrictions applicables, sur la base de l'état d'abonnement de l'utilisateur, du nombre de vues et d'autres facteurs.

# amp-access <a name="amp-access"></a>



<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

<table>
  <tr>
    <td><strong>Disponibilité</strong></td>
    <td>Stable</td>
  </tr><tr>
  <td class="col-fourty"><strong>Script requis</strong></td>
  <td>
    <div>
      <code>&lt;script async custom-element="amp-access" src="https://ampjs.org/v0/amp-access-0.1.js">&lt;/script></code>
    </div>
  </td>
</tr>
<tr>
  <td class="col-fourty"><strong>Exemples</strong></td>
  <td><a href="https://ampbyexample.com/components/amp-access/">Exemple de code annoté pour amp-access</a></td>
</tr>
</table>

## Relation avec `amp-subscriptions` <a name="relationship-to-amp-subscriptions"></a>

L'extension [`amp-subscriptions`](amp-subscriptions.md) offre des fonctionnalités semblables à celles d'`amp-access`. Cependant, elle est compatible avec un protocole de paywall d'accès plus spécialisé. Voici un aperçu des différences les plus importantes :

1. La réponse concernant les droits `amp-subscriptions` est semblable à l'autorisation amp-access, mais elle est strictement définie et standardisée.
1. L'extension `amp-subscriptions` permet de configurer plusieurs services pour que la page prenne part aux décisions relatives à l'accès et au paywall. Elles sont exécutées simultanément et classées par ordre de priorité en fonction du service qui renvoie la réponse positive.
1. Les lecteurs AMP peuvent fournir à `amp-subscriptions` une réponse d'autorisation signée sur la base d'un accord indépendant conclu avec les éditeurs en guise de preuve d'accès.
1. Dans `amp-subscriptions`, le balisage de contenu est standardisé, ce qui permet aux applications et aux robots d'exploration de détecter facilement les sections de contenu premium.

Compte tenu de la standardisation du balisage, de la gestion de plusieurs fournisseurs et d'une gestion améliorée des lecteurs, il est conseillé d'utiliser `amp-subscriptions` pour les nouvelles implémentations de fournisseurs de paywalls et d'éditeurs.

## Solution <a name="solution"></a>

La solution proposée permet à l'éditeur de contrôler les décisions et les flux suivants :
- Création et gestion des utilisateurs
- Contrôle de la mesure (autoriser un certain nombre de vues gratuites)
- Responsabilité du flux de connexion
- Responsabilité de l'authentification de l'utilisateur
- Responsabilité des règles d'accès et de l'autorisation
- Flexibilité des paramètres d'accès sur la base de chaque document

La solution comprend les composants suivants :

1. [**ID d'utilisateur AMP**](#amp-reader-id) : fourni par l'écosystème AMP. Il s'agit d'un identifiant unique de l'utilisateur, tel qu'il est vu par AMP.
1. [**Balisage du contenu accessible**](#access-content-markup) : créé par l'éditeur. Ce composant définit les parties d'un document qui sont visibles, ainsi que les circonstances d'affichage.
1. [**Point de terminaison Autorisation**](#authorization-endpoint) : fourni par l'éditeur. Ce composant renvoie la réponse qui explique quelle partie d'un document l'utilisateur peut exploiter.
1. [**Point de terminaison Pingback**](#pingback-endpoint) : fourni par l'éditeur. Ce composant permet d'envoyer l'impression "vue" pour un document.
1. [**Lien de connexion et page de connexion**](#login-page-and-login-link) : permet à l'éditeur d'authentifier l'utilisateur et de connecter son identité à l'ID d'utilisateur AMP.

Google AMP Cache renvoie à l'utilisateur le document dans lequel certaines sections sont masquées à l'aide du composant de balisage du contenu accessible. L'exécution AMP appelle le point de terminaison Autorisation et utilise la réponse pour masquer ou afficher différentes sections, selon ce qui est défini par le composant de balisage du contenu accessible. Une fois que le document a été présenté à l'utilisateur, l'exécution AMP appelle le point de terminaison Pingback qui peut être utilisé par l'éditeur pour mettre à jour le compte à rebours (nombre de vues gratuites utilisées).

La solution permet également à l'éditeur de placer, dans le document AMP, un lien de connexion qui ouvre la page de connexion/d'abonnement dans laquelle l'éditeur peut authentifier l'utilisateur et associer l'identité de ce dernier à l'ID d'utilisateur AMP dans son propre système.

Dans sa version de base, cette solution envoie le document complet (bien que masqué) à l'utilisateur et affiche/masque simplement les sections à accès limité en fonction de la réponse d'autorisation. Une option "serveur" est également proposée dans cette solution. Dans ce cas, les sections limitées peuvent être exclues de la diffusion initiale du document et téléchargées uniquement après confirmation de l'autorisation.

Pour qu'AMP Access puisse être utilisé, l'éditeur doit mettre en œuvre les composants décrits ci-dessus. Le balisage du contenu accessible et le point de terminaison Autorisation sont deux composants obligatoires, tandis que le point de terminaison Pingback et la page de connexion sont facultatifs.

### ID d'utilisateur AMP <a name="amp-reader-id"></a>

Le concept d'*ID d'utilisateur* est une nouveauté d'AMP Access destinée à simplifier les services d'accès et les cas d'utilisation.

L'ID d'utilisateur est un identifiant anonyme et unique créé par l'écosystème AMP. Il est unique pour chaque paire utilisateur/éditeur ; un utilisateur est identifié différemment auprès de deux éditeurs. Il s'agit d'un identifiant non réversible. L'ID d'utilisateur est inclus dans toutes les communications AMP/éditeur et présente une entropie très élevée. Les éditeurs peuvent l'utiliser pour identifier l'utilisateur et le mapper sur leurs propres systèmes d'identité.

L'ID d'utilisateur est créé sur l'appareil de l'utilisateur et conçu pour avoir une longue durée de vie. Cependant, il respecte les règles de stockage standards du navigateur, y compris celles applicables aux fenêtres de navigation privée. Le cycle de vie prévu d'un ID d'utilisateur est d'un an entre deux utilisations ou jusqu'à ce que l'utilisateur efface ses cookies. Pour le moment, les ID d'utilisateur ne sont pas partagés entre les appareils.

L'ID d'utilisateur est construit de la même manière que le mécanisme utilisé pour créer ExternalCID, dont vous trouverez une description [ici](https://docs.google.com/document/d/1f7z3X2GM_ASb3ZCI_7tngglxwS6WoWi1EB3aKzdf6vo/edit#heading=h.hb9q0wpwwhuf). Voici un exemple d'ID d'utilisateur : `amp-OFsqR4pPKynymPyMmplPNMvxSTsNQob3TnK-oE3nwVT0clORaZ1rkeEz8xej-vV6`.

### AMP Access et cookies <a name="amp-access-and-cookies"></a>

Les éditeurs peuvent utiliser leurs propres cookies d'authentification, se servir de l'ID d'utilisateur ou utiliser une combinaison de ces deux éléments.

### Balisage du contenu accessible <a name="access-content-markup"></a>

Le balisage du contenu accessible détermine les sections qui sont visibles ou masquées en fonction de la réponse d'autorisation renvoyée par le point de terminaison Autorisation. Ce composant est décrit au moyen d'attributs de balisage spéciaux.

### Point de terminaison Autorisation <a name="authorization-endpoint"></a>

Autorisation est un point de terminaison fourni par l'éditeur et appelé par l'exécution AMP ou par Google AMP Cache. Il s'agit d'un point de terminaison GET CORS authentifié. Il renvoie les paramètres d'accès qui peuvent être utilisés par le balisage de contenu pour masquer ou afficher différentes parties du document.

### Point de terminaison Pingback <a name="pingback-endpoint"></a>

Pingback est un point de terminaison fourni par l'éditeur et appelé par l'exécution AMP ou par Google AMP Cache. Il s'agit d'un point de terminaison POST CORS authentifié. L'exécution AMP appelle automatiquement ce point de terminaison lorsque l'utilisateur a commencé à consulter le document. Il est également appelé une fois que l'utilisateur a terminé le flux de connexion. L'un des principaux objectifs du pingback est de permettre à l'éditeur de mettre à jour les informations de mesure.

Le pingback est facultatif. Vous pouvez le désactiver en définissant la propriété de configuration `noPingback` sur `true`.

### Page de connexion et lien de connexion <a name="login-page-and-login-link"></a>

La page de connexion est mise en œuvre et diffusée par l'éditeur. Elle est appelée par l'exécution AMP. Elle s'affiche normalement sous la forme d'une boîte de dialogue de navigateur.

La page de connexion est déclenchée lorsque l'utilisateur appuie sur le lien de connexion que l'éditeur peut insérer à l'emplacement de son choix dans le document.

## Spécification v0.1 <a name="specification-v01"></a>

### Configuration <a name="configuration"></a>

Tous les points de terminaison sont configurés dans le document AMP sous la forme d'un objet JSON dans l'élément HEAD du document :

```html

<script id="amp-access" type="application/json">
  {
    "property": value,
    ...
    }
</script>

```

Les propriétés suivantes sont définies dans cette configuration :

<table>
  <tr>
    <th>Propriété</th>
    <th>Valeurs</th>
    <th>Description</th>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorization</code></td>
    <td>&lt;URL&gt;</td>
    <td>URL HTTPS du point de terminaison Autorisation.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>pingback</code></td>
    <td>&lt;URL&gt;</td>
    <td>URL HTTPS du point de terminaison Pingback.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>noPingback</code></td>
    <td>true/false</td>
    <td>Si la propriété est définie sur "true", le pingback est désactivé.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>login</code></td>
    <td class="col-twenty">&lt;URL&gt; ou<br>&lt;Map[chaîne, URL]&gt;</td>
    <td>URL HTTPS de la page de connexion ou ensemble d'URL pour différents types de pages de connexion.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationFallbackResponse</code></td>
    <td>&lt;objet&gt;</td>
    <td>Objet JSON à utiliser à la place de la réponse d'autorisation en cas d'échec.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationTimeout</code></td>
    <td>&lt;nombre&gt;</td>
    <td>Délai (en millisecondes) après lequel on considère que la demande d'autorisation a échoué. La valeur par défaut est 3000. Les valeurs supérieures à 3000 sont autorisées uniquement dans un environnement de développement. </td>
  </tr>
  <tr>
    <td class="col-fourty"><code>type</code></td>
    <td>"client" ou "server"</td>
    <td>La valeur par défaut est "client". La conception de l'option "server" est en cours de discussion et ces documents seront mis à jour dès qu'elle sera prête.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>namespace</code></td>
    <td>chaîne</td>
    <td>Par défaut, cette valeur n'est pas renseignée. L'espace de noms est obligatoire si plusieurs fournisseurs d'accès sont spécifiés.</td>
  </tr>
</table>

Les valeurs *&lt;URL&gt;*  spécifient des URL HTTPS avec des variables de substitution. Vous trouverez une description détaillée de ces variables dans la section [Variables d'URL d'accès](#access-url-variables) ci-dessous.

Voici un exemple de configuration d'AMP Access :

```html
<script id="amp-access" type="application/json">
{
  "authorization":
      "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
  "pingback":
      "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
  "login":
      "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
  "authorizationFallbackResponse": {"error": true}
}
</script>

```

#### Fournisseurs d'accès multiples <a name="multiple-access-providers"></a>

Il est possible de spécifier plusieurs fournisseurs d'accès en utilisant un tableau au lieu d'un seul objet et de fournir une propriété `namespace` pour chaque entrée.

```html

<script id="amp-access" type="application/json">
  [
    {
      "property": value,
      ...
      "namespac"e: value
      },
    ...
    [
    </script>
```

### Variables d'URL d'accès <a name="access-url-variables"></a>

Lors de la configuration des URL de différents points de terminaison, l'éditeur peut utiliser des variables de substitution. La liste complète de ces variables est définie dans la [spécification des variables AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md). Cette spécification ajoute également quelques variables spécifiques à l'accès, telles que `READER_ID` et `AUTHDATA`. Certaines des variables les plus pertinentes sont décrites dans le tableau ci-dessous :

<table>
  <tr>
    <th>Variable</th>
    <th>Description</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>READER_ID</code></td>
    <td>ID d'utilisateur AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AUTHDATA(field)</code></td>
    <td>Valeur du champ dans la réponse d'autorisation.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RETURN_URL</code></td>
    <td>Espace réservé pour l'URL de renvoi spécifiée par le serveur AMP et vers laquelle doit pointer une boîte de dialogue de connexion lorsqu'elle renvoie des informations de connexion.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>SOURCE_URL</code></td>
    <td>URL source de ce document AMP. Si le document est diffusé depuis un CDN, l'URL AMPDOC correspond à l'URL du CDN, tandis que SOURCE_URL est l'URL source d'origine.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AMPDOC_URL</code></td>
    <td>URL de ce document AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>CANONICAL_URL</code></td>
    <td>URL canonique de ce document AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>DOCUMENT_REFERRER</code></td>
    <td>URL de provenance.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>VIEWER</code></td>
    <td>URL du lecteur AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RANDOM</code></td>
    <td>Nombre aléatoire. Cette variable est utile pour éviter la mise en cache dans le navigateur.</td>
  </tr>
</table>

Voici un exemple d'URL étendue avec un ID d'utilisateur, une URL canonique, des informations de provenance et un cache buster aléatoire :
```text
https://pub.com/access?
rid=READER_ID
&url=CANONICAL_URL
&ref=DOCUMENT_REFERRER
&_=RANDOM
```

La variable AUTHDATA est disponible pour les URL de pingback et de connexion. Elle permet de transmettre un champ de la réponse d'autorisation en tant que paramètre d'URL. Par exemple : `AUTHDATA(isSubscriber)`. Les expressions imbriquées sont également autorisées, telles que `AUTHDATA(other.isSubscriber)`. Si vous utilisez des espaces de noms, vous pouvez les ajouter avant le champ ; par exemple `AUTHDATA(anamespace.afield)`.

### Balisage du contenu accessible <a name="access-content-markup-1"></a>

Le balisage du contenu accessible décrit les sections qui sont visibles ou masquées. Il se compose de deux attributs AMP, `amp-access` et `amp-access-hide`, qui peuvent être placés sur n'importe quel élément HTML.

L'attribut `amp-access` fournit l'expression qui génère la valeur true ou false en fonction de la réponse d'autorisation renvoyée par le point de terminaison Autorisation. La valeur obtenue indique si l'élément et son contenu sont visibles ou non.

La valeur `amp-access` est une expression booléenne définie dans un langage de type SQL. Pour une définition de la grammaire, consultez l'[Annexe A](#appendix-a-amp-access-expression-grammar). Elle est définie comme suit :
```html

<div amp-access="expression">...</div>
```
Les propriétés et les valeurs font référence à celles de la réponse d'autorisation renvoyée par le point de terminaison Autorisation. Vous disposez ainsi d'un système flexible pour accepter différents scénarios d'accès. Si vous utilisez des espaces de noms, il vous suffit de les ajouter avant les noms de propriété ; par exemple `anamespace.aproperty`.

L'attribut `amp-access-hide` peut être utilisé pour masquer l'élément de manière optimiste avant que la réponse d'autorisation n'ait été reçue, ce qui peut entraîner son affichage. Il fournit la sémantique "invisible par défaut". La réponse d'autorisation renvoyée par la suite par le point de terminaison Autorisation peut annuler ce paramètre par défaut et rendre la section visible. Lorsque l'attribut `amp-access-hide` est omis, la section est affichée/incluse par défaut. L'attribut `amp-access-hide` ne peut être utilisé qu'avec l'attribut `amp-access`.
```html
<div amp-access="expression" amp-access-hide="">...</div>
```

Si la demande d'autorisation échoue, les expressions `amp-access` ne sont pas évaluées. La visibilité d'une section est alors déterminée par la présence de l'attribut `amp-access-hide` fourni initialement par le document.

L'ensemble d'attributs `amp-access-*` peut être étendu suivant les besoins afin de répondre aux besoins en termes d'affichage et de masquage.

Si la demande d'autorisation échoue et que la réponse "authorizationFallbackResponse" n'est pas spécifiée dans la documentation, les expressions `amp-access` ne sont pas évaluées et la visibilité d'une section est déterminée par la présence de l'attribut `amp-access-hide` fourni initialement par le document.

L'exemple ci-dessous affiche le lien de connexion ou l'intégralité du contenu en fonction de l'état de l'abonnement :
```html
<header>
  Title of the document
</header>

<div>
  First snippet in the document.
</div>

<div amp-access="NOT subscriber" amp-access-hide>
  <a on="tap:amp-access.login">Become a subscriber now!</a>
</div>

<div amp-access="subscriber">
  Full content.
</div>
```
Ici :
- *subscriber* est un champ booléen situé dans la réponse d'autorisation renvoyée par le point de terminaison Autorisation. Cette section est masquée par défaut, ce qui est facultatif.
- Dans cet exemple, la totalité du contenu est affichée de manière optimiste.

Dans cet autre exemple, la clause de non-responsabilité relative à l'état de la mesure est présentée à l'utilisateur :
```html
{% raw %}<section amp-access="views <= maxViews">
  <template amp-access-template type="amp-mustache">
    You are reading article {{views}} out of {{maxViews}}.
  </template>
</section>
{% endraw %}
```

Voici un exemple d'affichage de contenu supplémentaire pour les abonnés Premium :
```html
<section amp-access="subscriptonType = 'premium'">
  Shhh… No one but you can read this content.
</section>
```

### Point de terminaison Autorisation <a name="authorization-endpoint-1"></a>

Ce point de terminaison est configuré au moyen de la propriété `authorization` dans la section [Configuration d'AMP Access](#configuration). Il s'agit d'un point de terminaison GET CORS authentifié. Pour savoir comment sécuriser cette requête, consultez la section [Sécurité de l'origine CORS](#cors-origin-security).

Ce point de terminaison peut utiliser n'importe quel paramètre défini dans la section [Variables d'URL d'accès](#access-url-variables). Il peut, par exemple, transmettre l'ID d'utilisateur AMP et l'URL du document. Outre les paramètres d'URL, l'éditeur peut utiliser toute information diffusée naturellement via le protocole HTTP, comme l'adresse IP de l'utilisateur. `READER_ID` doit obligatoirement être inclus.

Ce point de terminaison génère la réponse d'autorisation qui peut être utilisée dans les expressions de balisage du contenu pour en afficher ou en masquer différentes parties.

La requête se présente comme suit :
```text
https://publisher.com/amp-access.json?
rid=READER_ID
&url=SOURCE_URL
```
La réponse est un objet JSON de forme libre : elle peut contenir toutes les propriétés et valeurs avec peu de restrictions. Ces restrictions sont les suivantes :
- Les noms des propriétés doivent être conformes aux restrictions définies par la grammaire des expressions `amp-access` (voir l'[Annexe A](#appendix-a-amp-access-expression-grammar)). Cela signifie principalement que les noms des propriétés ne peuvent pas contenir de caractères tels que des espaces, des tirets et d'autres caractères non conformes à la spécification "amp-access".
- Seuls les types de valeurs de propriété suivants sont acceptés : chaîne, nombre ou valeur booléenne.
- Les valeurs peuvent également être imbriquées en tant qu'objets avec des valeurs du même type, à savoir : chaîne, nombre ou valeur booléenne.
- La taille totale de la réponse d'autorisation sérialisée ne peut pas dépasser 500 octets.
- Assurez-vous que la réponse ne contient aucune information personnelle ni donnée à caractère personnel.

La liste ci-dessous répertorie quelques propositions relatives aux propriétés qui peuvent être renvoyées depuis le point de terminaison Autorisation :
- Informations de mesure : nombre maximal de vues autorisé et nombre actuel de vues.
- L'utilisateur est-il connecté ou est-il abonné ?
- Informations plus détaillées sur le type d'abonnement : de base, premium
- Géographique : pays, région, région de publication personnalisée

L'exemple ci-dessous présente une réponse renvoyée lorsqu'un utilisateur qui n'est pas abonné a déjà consulté six articles, alors que sa limite de consultation est fixée à 10 articles par mois :
```json
{
  "maxViews": 10,
  "currentViews": 6,
  "subscriber": false
}
```
Voici un exemple de réponse renvoyée lorsque l'utilisateur est connecté et dispose d'un abonnement de type Premium :
```json
{
  "loggedIn": true,
  "subscriptionType": "premium"
}
```
Ce RPC peut être appelé au cours de la phase de préchargement. Par conséquent, il ne doit pas être utilisé pour le décompte, car il se peut que l'utilisateur ne consulte jamais réellement le document.

Il convient également de prendre en compte un autre élément : dans certains cas, il se peut que l'exécution AMP doive appeler le point de terminaison Autorisation plusieurs fois par impression de document. Cela peut se produire lorsque l'exécution AMP considère que les paramètres d'accès de l'utilisateur ont changé de manière significative ; à la suite d'un flux de connexion réussi, par exemple.

La réponse d'autorisation peut être utilisée par les extensions et par l'exécution AMP pour trois raisons différentes :
1. Lors de l'évaluation de l'expression `amp-access`.
2. Lors de l'évaluation de modèles `<template>`, comme `amp-mustache`.
3. Lorsque vous fournissez des variables supplémentaires aux URL de pingback et de connexion à l'aide de la variable `AUTHDATA(field)`.

Le point de terminaison Autorisation est appelé par l'exécution AMP en tant que point de terminaison CORS authentifié. En tant que tel, il doit mettre en œuvre le protocole CORS. Il doit utiliser CORS Origin et l'origine source pour limiter l'accès à ce service, comme il est indiqué dans la section [Sécurité de l'origine CORS](#cors-origin-security). Ce point de terminaison peut utiliser les cookies de l'éditeur pour ses propres besoins. Il peut, par exemple, associer la liaison entre l'ID d'utilisateur et l'identité d'utilisateur propre à l'éditeur. AMP, pour sa part, n'a pas besoin d'en être informé (ce qui, à vrai dire, lui convient parfaitement). Pour plus d'informations à ce sujet, consultez la documentation relative à l'[ID d'utilisateur AMP](#amp-reader-id), et à [AMP Access et aux cookies](#amp-access-and-cookies).

L'exécution AMP (ou plutôt le navigateur) observe les en-têtes de réponse du cache lors de l'appel du point de terminaison Autorisation. Les réponses mises en cache peuvent ainsi être réutilisées. Si cette réutilisation n'est pas souhaitable, l'éditeur peut utiliser les en-têtes de contrôle du cache appropriés et/ou la substitution de variable `RANDOM` pour l'URL du point de terminaison.

En cas d'échec de la demande d'autorisation, l'exécution AMP bascule vers la propriété "authorizationFallbackResponse", si celle-ci est spécifiée dans la configuration. Dans ce cas, le flux d'autorisation se poursuit normalement avec la valeur de la propriété "authorizationFallbackResponse" en lieu et place de la réponse d'autorisation. Si la propriété "authorizationFallbackResponse" n'est pas spécifiée, le flux d'autorisation échoue. Dans ce cas, les expressions `amp-access` ne sont pas évaluées et la visibilité d'une section est déterminée par la présence de l'attribut `amp-access-hide` fourni initialement par le document.

La demande d'autorisation vient automatiquement à expiration et on considère qu'elle a échoué au bout de trois secondes.

L'exécution AMP utilise les classes CSS suivantes pendant le flux d'autorisation :
1. La classe CSS `amp-access-loading` est définie sur la racine du document lorsque le flux d'autorisation démarre et elle est supprimée lorsque le flux est terminé ou s'il échoue.
2. La classe CSS `amp-access-error` est définie sur la racine du document en cas d'échec du flux d'autorisation.

Avec l'option *server*, l'appel vers le point de terminaison Autorisation est effectué par Google AMP Cache en tant que simple point de terminaison HTTPS. Cela signifie que, dans ce cas, les cookies de l'éditeur ne peuvent pas être diffusés.

### Point de terminaison Pingback <a name="pingback-endpoint-1"></a>

Ce point de terminaison est configuré au moyen de la propriété `pingback` dans la section [Configuration d'AMP Access](#configuration). Il s'agit d'un point de terminaison POST CORS authentifié. Pour savoir comment sécuriser cette requête, consultez la section [Sécurité de l'origine CORS](#cors-origin-security).

L'URL de pingback est facultative. Elle peut être désactivée en utilisant `"noPingback": true`.

Ce point de terminaison peut utiliser n'importe quel paramètre défini dans la section [Variables d'URL d'accès](#access-url-variables). Il peut, par exemple, transmettre l'ID d'utilisateur AMP et l'URL du document. `READER_ID` doit obligatoirement être inclus.

Le pingback ne génère aucune réponse ; toute réponse est ignorée par l'exécution AMP.

Le point de terminaison Pingback est appelé lorsque l'utilisateur a commencé à consulter le document et une fois que celui-ci a terminé le flux de connexion.

L'éditeur peut choisir d'utiliser le pingback dans les cas suivants :
- pour décompter le nombre de vues gratuites de la page ;
- pour associer l'ID d'utilisateur AMP à l'identité de l'éditeur car, en tant que point de terminaison CORS authentifié, Pingback peut contenir des cookies d'éditeur.

La requête se présente comme suit :
```text
https://publisher.com/amp-pingback?
rid=READER_ID
&url=SOURCE_URL
```

### Page de connexion <a name="login-page"></a>

L'URL des pages de connexion est configurée au moyen de la propriété `login` dans la section [Configuration d'AMP Access](#configuration).

La configuration peut spécifier une seule URL de connexion ou un mappage d'URL de connexion associées par le type de connexion. Exemple d'une URL de connexion unique :
```json
{
  "login": "https://publisher.com/amp-login.html?rid={READER_ID}"
}
```

Exemple d'URL de connexion multiples :
```json
{
  "login": {
    "signin": "https://publisher.com/signin.html?rid={READER_ID}",
    "signup": "https://publisher.com/signup.html?rid={READER_ID}"
  }
}
```

L'URL peut utiliser n'importe quel paramètre défini dans la section [Variables d'URL d'accès](#access-url-variables). Elle peut, par exemple, transmettre l'ID d'utilisateur AMP et l'URL du document. Vous pouvez utiliser la substitution de requête `RETURN_URL` pour spécifier le paramètre de requête relatif à l'URL de renvoi ; par exemple, `?ret=RETURN_URL`. L'URL de renvoi est obligatoire. Si la variable de substitution `RETURN_URL` n'est pas spécifiée, elle est automatiquement injectée avec le nom du paramètre de requête par défaut" "return".

La page de connexion est une page Web ordinaire, sans contrainte particulière, si ce n'est qu'elle doit fonctionner correctement comme une [boîte de dialogue de navigateur](https://developer.mozilla.org/fr/docs/Web/API/Window/open). Pour en savoir plus, consultez la section [Flux de connexion](#login-flow).

La requête se présente comme suit :
```text
https://publisher.com/amp-login.html?
rid=READER_ID
&url=SOURCE_URL
&return=RETURN_URL
```
Notez que l'exécution AMP ajoute automatiquement le paramètre d'URL "return" si la variable de substitution `RETURN_URL` n'est pas spécifiée. Une fois l'exécution de la page de connexion terminée, l'utilisateur doit être redirigé vers l'URL de renvoi spécifiée avec le format suivant :
```text
RETURN_URL#success=true|false
```
Notez l'utilisation du paramètre de hachage d'URL "success". La valeur est définie sur "true" ou "false" selon que la connexion aboutit ou est abandonnée. Lorsque cela s'avère possible, la page de connexion envoie le signal, que la connexion ait réussi ou ait échoué.

Si le signal `success=true` est renvoyé, l'exécution AMP répète les appels vers les points de terminaison Autorisation et Pingback afin de mettre à jour l'état du document et de signaler la "vue" avec le nouveau profil d'accès.

#### Lien de connexion <a name="login-link"></a>

L'éditeur peut insérer le lien de connexion à l'emplacement de son choix dans le contenu du document.

Une ou plusieurs URL de connexion sont configurées au moyen de la propriété "login" dans la section [Configuration d'AMP Access](#configuration).

Le lien de connexion peut être déclaré sur tout élément HTML qui autorise l'attribut "on". Il s'agit généralement d'un élément de type ancrage ou d'un bouton. Lorsqu'une seule URL de connexion est configurée, le format est le suivant :
```html
<a on="tap:amp-access.login">Login or subscribe</a>
```

Lorsque plusieurs URL de connexion sont configurées, le format est `tap:amp-access.login-{type}`. Exemple :
```html
<a on="tap:amp-access.login-signup">Subscribe</a>
```

Lorsque des espaces de noms sont utilisés, le format est `tap:amp-access.login-{namespace}` ou `tap:amp-access.login-{namespace}-{type}`.

AMP ne fait aucune distinction entre la connexion et l'abonnement. Cette distinction peut être configurée par l'éditeur à l'aide de plusieurs URL/liens de connexion ou bien en utilisant ses propres méthodes.

## Intégration à *amp-analytics* <a name="integration-with-amp-analytics"></a>

L'intégration à *amp-analytics* est décrite à la page [amp-access-analytics.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md).

## Sécurité de l'origine CORS <a name="cors-origin-security"></a>

Autorisation et Pingback sont des points de terminaison CORS. Ils doivent mettre en œuvre le protocole de sécurité décrit dans la [spécification de sécurité CORS dans AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

## Mesure <a name="metering"></a>

La mesure est un mécanisme par lequel du contenu Premium est présenté gratuitement à l'utilisateur pour un nombre donné de vues au cours d'une période déterminée. Une fois le quota atteint, le paywall est activé et du contenu partiel est présenté à l'utilisateur, accompagné d'un message l'invitant à effectuer un achat et d'un lien de connexion ou d'abonnement. Par exemple, ce système peut être défini comme suit : "L'utilisateur peut lire gratuitement 10 articles par mois".

AMP Access offre les fonctionnalités suivantes pour la mise en œuvre de l'accès facturé à l'usage :
1. READER_ID doit être utilisé pour stocker les informations de mesure. L'éditeur n'est pas toujours certain de pouvoir définir des cookies dans un contexte tiers. Aussi, ces données doivent-elles être stockées côté serveur.
2. Le "nombre de consultations" ne peut être mis à jour qu'au niveau du point de terminaison Pingback.
3. Seuls les documents uniques peuvent être pris en compte dans le quota. En d'autres termes, actualiser un même document dix fois constitue une vue unique. À cette fin, les points de terminaison Autorisation et Pingback peuvent injecter la variable `SOURCE_URL` ou des variables d'URL semblables. Pour en savoir plus, reportez-vous à la section [Variables d'URL d'accès](#access-url-variables).

## Premier clic gratuit <a name="first-click-free"></a>

Les règles de Google relatives au premier clic (FCF) sont décrites [ici](https://support.google.com/news/publisher/answer/40543). Pour consulter une description détaillée de la mise à jour la plus récente, [cliquez ici](https://googlewebmastercentral.blogspot.com/2015/09/first-click-free-update.html).

Pour mettre en œuvre le premier clic, l'éditeur doit être en mesure (1) de déterminer le service de référence pour chaque vue et (2) de comptabiliser le nombre de vues par jour et par utilisateur.

Les deux étapes sont décrites dans la spécification d'AMP Access. L'URL de provenance peut être injectée dans les URL d'autorisation et de pingback à l'aide de la variable de substitution d'URL `DOCUMENT_REFERRER`, comme indiqué dans la section [Variables d'URL d'accès](#access-url-variables). Le décompte des vues peut être effectué à l'aide du point de terminaison Pingback côté serveur. Cette procédure est très semblable à la mise en œuvre du mécanisme de mesure décrite dans la section [Mesure](#metering).

## Flux de connexion <a name="login-flow"></a>

AMP ouvre une boîte de dialogue de connexion en tant qu'onglet, que pop-up ou que fenêtre propriétaire. Dans la mesure du possible, les lecteurs AMP doivent tenter d'ouvrir la boîte de dialogue de connexion dans le navigateur afin de tirer parti des API de navigateur de niveau supérieur.

Le flux de connexion est lancé par l'exécution AMP lorsque l'utilisateur active le lien de connexion. Les étapes exécutées sont les suivantes :
1. L'exécution ou le lecteur AMP ouvre la boîte de dialogue de connexion (fenêtre propriétaire) pour l'URL de connexion spécifiée. L'URL contient un paramètre de requête d'URL "Return URL" supplémentaire (`&return=RETURN_URL`). D'autres paramètres peuvent également être ajoutés à l'URL, comme l'ID d'utilisateur. Pour plus d'informations à ce sujet, consultez la section [Page de connexion](#login-page).
2. L'éditeur affiche une page de connexion de forme libre.
3. L'utilisateur suit les étapes de connexion, telles que la saisie d'un nom d'utilisateur et d'un mot de passe, ou la connexion à un réseau social.
4. L'utilisateur envoie des informations de connexion. L'éditeur procède à l'authentification, définit les cookies, puis redirige l'utilisateur vers l'URL de renvoi demandée précédemment. La redirection contient un paramètre de hachage d'URL `success` dont la valeur peut être `true` ou `false`.
5. La boîte de dialogue de connexion suit la redirection vers l'URL de renvoi.
6. L'exécution AMP autorise à nouveau le document.

Seules les étapes 2 à 5 nécessitent une prise en charge de la part de l'éditeur : ce dernier fournit uniquement sa propre page de connexion et s'assure que la redirection s'effectue correctement. Aucune contrainte particulière n'est imposée à la page de connexion, si ce n'est qu'elle doit fonctionner comme boîte de dialogue.

Comme d'habitude, l'ID d'utilisateur doit être inclus dans l'appel vers la page de connexion et l'éditeur peut l'utiliser pour le mappage d'identité. En tant que fenêtre propriétaire, l'éditeur reçoit également ses cookies et a la possibilité de les définir. S'il s'avère que l'utilisateur est déjà connecté du côté de l'éditeur, il est conseillé que ce dernier effectue immédiatement une redirection vers l'URL de renvoi avec la réponse `success=true`.

## Glossaire AMP <a name="amp-glossary"></a>

* **Document AMP** : document HTML conforme au format AMP et validé par le validateur AMP. Les documents AMP peuvent être mis en cache par Google AMP Cache.
* **Validateur AMP** : programme informatique qui effectue une analyse statique d'un document HTML et qui renvoie un résultat positif ou négatif selon que le document est conforme ou non au format AMP.
* **Exécution AMP** : moteur d'exécution JavaScript qui exécute le document AMP.
* **Google AMP Cache** : cache proxy pour les documents AMP.
* **Lecteur AMP** : application Web ou native qui affiche ou intègre des documents AMP.
* **Publisher.com** : site d'un éditeur AMP.
* **Point de terminaison CORS** : point de terminaison HTTPS multi-origine. Pour plus d'informations, consultez la page [https://developer.mozilla.org/fr/docs/Web/HTTP/CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS). Pour savoir comment sécuriser des requêtes de ce type, consultez la page [Sécurité de l'origine CORS](#cors-origin-security).
* **Utilisateur** : personne qui consulte des documents AMP.
* **Préchargement AMP** : les lecteurs AMP peuvent tirer parti du préchargement, une fonction qui charge un document masqué avant qu'il puisse être affiché. Cela permet d'améliorer sensiblement les performances. Cependant, il faut tenir compte du fait que le préchargement des documents ne constitue pas une vue, car il se peut que l'utilisateur ne consulte jamais le document.

## Révisions <a name="revisions"></a>

* 02/09/2016 : propriété de configuration "noPingback" et pingback facultatif.
* 03/03/2016 : renvoyer le pingback après la connexion (v0.5).
* 19/02/2016 : correction des exemples afin de supprimer `{}` des substitutions de variables d'URL.
* 15/02/2016 : les points de terminaison [Configuration](#configuration) et [Autorisation](#authorization-endpoint) autorisent désormais la propriété "authorizationFallbackResponse" qui peut être utilisée en cas d'échec de l'autorisation.
* 11/02/2016 : expiration de la demande d'autorisation dans le [point de terminaison Autorisation](#authorization-endpoint).
* 11/02/2016 : les références de champ imbriquées, comme `object.field`, sont désormais autorisées.
* 09/02/2016 : ajout des sections [Premier clic gratuit](#first-click-free) et [Mesure](#metering).
* 03/02/2016 : ajout de la spécification relative à la sécurité "origine de la source" dans la section [Sécurité de l'origine CORS](#cors-origin-security).
* 01/02/2016 : le paramètre de requête" "return" de la page de connexion peut être personnalisé à l'aide de la variable de substitution d'URL RETURN_URL.

## Annexe A : Grammaire de l'expression "amp-access" <a name="appendix-a-amp-access-expression-grammar"></a>

La grammaire BNF la plus récente est disponible dans le fichier [access-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/0.1/access-expr-impl.jison).

Voici un extrait de cette grammaire :
```javascript
search_condition:
    search_condition OR search_condition
  | search_condition AND search_condition
  | NOT search_condition
  | '(' search_condition ')'
  | predicate

predicate:
    comparison_predicate | truthy_predicate

comparison_predicate:
    scalar_exp '=' scalar_exp
  | scalar_exp '!=' scalar_exp
  | scalar_exp '<' scalar_exp
  | scalar_exp '<=' scalar_exp
  | scalar_exp '>' scalar_exp
  | scalar_exp '>=' scalar_exp

truthy_predicate: scalar_exp

scalar_exp: literal | field_ref

field_ref: field_ref '.' field_name | field_name

literal: STRING | NUMERIC | TRUE | FALSE | NULL
```

Notez que les expressions `amp-access` sont évaluées par l'exécution AMP et par Google AMP Cache. Cela ne fait PAS partie de la spécification que l'éditeur doit mettre en œuvre. Elles sont fournies à titre purement indicatif.

## Discussion approfondie <a name="detailed-discussion"></a>

Cette section décrit en détail la conception sous-jacente de la spécification amp-access et clarifie les choix de conception. Bientôt disponible.

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-access](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/validator-amp-access.protoascii) dans les spécifications du validateur AMP.
