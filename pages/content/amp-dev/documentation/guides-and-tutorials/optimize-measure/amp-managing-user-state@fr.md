---
'$title': "Gérer l'état des utilisateurs non authentifiés avec AMP"
$order: 2
formats:
  - websites
teaser:
  text: '**Table des matières**'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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

**Table des matières**

- [Contexte ](#background)
- [Guide d'implémentation ](#implementation-guide)
  - [Prérequis ](#before-getting-started)
  - [Tâche 1: pour les pages non AMP sur l'origine de l'éditeur, configurer un identifiant et envoyer des pings d'analyse ](#task1)
  - [Tâche 2: pour les pages AMP, configurer un identifiant et envoyer des pings d'analyse en incluant le remplacement de l'ID client dans les pings amp-analytics ](#task2)
  - [Tâche 3: traiter les pings d'analyse à partir de pages sur l'origine de l'éditeur ](#task3)
  - [Tâche 4: traiter les pings d'analyse à partir du cache AMP ou des contextes d'affichage de la visionneuse AMP et établir des mappages d'identificateurs (si nécessaire)](#task4)
  - [Tâche 5: utiliser l'ID client pour lier et envoyer des formulaires](#task5)
- [Pratiques fortement recommandées ](#strongly-recommended-practices)

L'état de l'utilisateur est un concept important sur le Web d'aujourd'hui. Les cas d'utilisation suivants sont activés par la gestion de l'état de l'utilisateur:

- Un marchand crée un **panier d'achat** utile qui montre à un utilisateur les mêmes articles lors de sa deuxième visite que ceux qu'il avait ajoutés au panier lors de sa première visite il y a plusieurs semaines. Une telle expérience augmente les chances que l'utilisateur achète cet article en s'assurant qu'il revoit l'article qu'il voulait acheter dans le passé.
- Un éditeur de journal qui peut adapter les **articles recommandés** à un lecteur en fonction des visites répétées du lecteur sur les articles de l'éditeur, ce qui permet de maintenir l'engagement du lecteur et lui proposer plus de contenus.
- Un développeur de site Web quelconque qui collecte des **données d'analyses** qui peuvent dire si deux visites de pages proviennent de la même personne qui a vu deux pages ou de deux personnes différentes qui ont vu chacune une page. Avoir ces informations permet de savoir les performances du site et, en fin de compte, comment l'améliorer.

Cet article est conçu pour vous aider à mieux **gérer l'état des utilisateurs non authentifiés dans AMP**, ce qui est un moyen de fournir une expérience utilisateur fluide même si l'utilisateur fourni son identité, à travers une connexion, par exemple. Après avoir examiné certains des défis et des points importants pour aborder ce sujet, ce guide décrit les façons dont l'état de l'utilisateur est pris en charge par AMP et propose des recommandations sur la manière d'aborder une implémentation technique.

## Contexte <a name="background"></a>

L'état de l'utilisateur est un sujet qui mérite une attention particulière dans AMP car les pages AMP peuvent s'afficher dans plusieurs contextes tels que sur votre site Internet, dans la recherche Google ou dans une application tierce. La gestion de l'état des utilisateurs devient alors un défi lorsque les utilisateurs se baladent entre ses contextes.

### Afficher les contextes des pages AMP <a name="display-contexts-for-amp-pages"></a>

Vous pouvez considérer AMP comme un format de contenu mobile qui permet le chargement rapide de contenu en tout lieu. Les documents AMP peuvent être affichés via trois contextes remarquables:

- L'origine de l'éditeur
- Un cache AMP
- Une visionneuse AMP

<table>
  <tr>
    <th width="20%">Contexte</th>
    <th width="20%">Les pages non AMP peuvent-elles être diffusées à partir d'ici?</th>
    <th width="20%">Les pages AMP peuvent-elles être diffusées à partir d'ici?</th>
    <th>Exemple d'URL</th>
  </tr>
  <tr>
    <td>Origine de l'éditeur</td>
    <td>Oui</td>
    <td>Oui</td>
    <td><code>https://example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>Cache AMP</td>
    <td>Non</td>
    <td>Oui</td>
    <td><code>https://example-com.cdn.ampproject.org/s/example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>Visionneuse AMP</td>
    <td>Non</td>
    <td>Oui</td>
    <td><code>https://google.com/amp/s/example.com/article.amp.html</code></td>
  </tr>
</table>

Examinons chacune de ces situations de plus près.

**Contexte 1: l'origine de l'éditeur.** Les pages AMP sont déployées de manière à être initialement hébergées et accessibles via le site de l'éditeur, par exemple sur `https://example.com` on peut trouver `https://example.com/article.amp.html` .

Les éditeurs peuvent choisir de publier exclusivement dans AMP ou de publier deux versions de contenu (c'est-à-dire du contenu AMP « associé » à un contenu non AMP). Le modèle « associé » nécessite des [étapes particulières](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/discovery) pour garantir que les versions AMP des pages sont détectables par les moteurs de recherche, les sites de médias sociaux et d'autres plates-formes. Les deux approches de publication sont entièrement prises en charge; c'est à l'éditeur de décider de l'approche à adopter.

> **REMARQUE:**
> En raison du modèle de publication « associé » qui vient d'être décrit, l'origine de l'éditeur (dans l'exemple ci-dessus, `https://example.com`) est un contexte dans lequel **il est possible d'accéder à la fois au contenu AMP et non AMP**. En effet, c'est le seul contexte dans lequel cela peut se produire car les caches AMP et les visionneuses AMP, décrits ci-dessous, ne fournissent que du contenu AMP valide.

**Contexte 2: un cache AMP.** Les fichiers AMP peuvent être mis en cache dans le cloud par un cache tiers pour réduire le temps nécessaire au contenu pour accéder à l'appareil mobile d'un utilisateur.

En utilisant le format AMP, les producteurs de contenu mettent le contenu des fichiers AMP à disposition pour être mis en cache par des tiers. Dans ce type de contexte, les éditeurs continuent de contrôler leur contenu (en publiant sur leur origine comme détaillé ci-dessus), mais les plateformes peuvent mettre le contenu en cache ou en miroir pour une vitesse de livraison optimale aux utilisateurs.

D'habitude, le contenu diffusé de cette manière provient d'un domaine différent. Par exemple, [Google AMP Cache](https://developers.google.com/amp/cache/overview) utilise `https://cdn.ampproject.org` pour fournir du contenu, par exemple `https://example-com.cdn.ampproject.org/s/example.com/article.amp.html`.

**Contexte 3: une visionneuse AMP.** Le format AMP est conçu pour prendre en charge l'intégration dans des visionneuses AMP tierces. Cela permet un degré élevé de coopération entre le fichier AMP et l'expérience de la visionneuse, dont les avantages incluent: un préchargement et un pré-affichage intelligents et sécurisés du contenu et des possibilités innovantes telles que le balayage entre des pages AMP complètes.

Tout comme le cas du cache AMP, attendez-vous à ce que le domaine d'une visionneuse AMP soit également différent de l'origine de l'éditeur. Par exemple, la visionneuse de la recherche Google est hébergée sur `https://google.com` et comprend une iframe intégrée qui demande le contenu de l'éditeur à partir du cache Google AMP.

### La multiplicité des contextes conduit à une gestion d'états multiples <a name="multiple-contexts-means-multiple-state-management"></a>

Les éditeurs doivent être prêts à gérer séparément l'état de l'utilisateur pour chaque contexte d'affichage. La fonction [ID client](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#client-id) d'AMP, qui tire parti des cookies ou du stockage local pour conserver l'état, fournit le support nécessaire pour que les pages AMP aient un identifiant stable et pseudonyme pour l'utilisateur. Du point de vue de l'implémentation, AMP utilise des cookies ou un stockage local et choisit la méthode à utiliser en fonction du contexte d'affichage. Ce choix est influencé par la faisabilité technique de la gestion de cet état à l'échelle de centaines ou de milliers d'éditeurs.

Cependant, les éditeurs de pages AMP peuvent facilement finir par concevoir (involontairement) des expériences utilisateurs impliquant plusieurs contextes. Revenons à notre cas précédent concernant le panier d'achat et ajoutons-y plus de détails pour créer **scénario utilisateur** complet:

> _Le jour 1, l'utilisateur découvre une page AMP d'Example Inc. via la recherche Google. La recherche Google charge les pages AMP dans une visionneuse AMP. Lors de l'affichage de la page, l'utilisateur ajoute quatre articles à son panier mais ne passe pas commande. Deux semaines plus tard, au jour 15, l'utilisateur se souvient des quatre articles qu'il envisageait d'acheter et décide de passer commande. Il accède directement à la page d'accueil d'Example Inc. sur `https://example.com` (il s'agit d'une page d'accueil non AMP) et constate que les quatre articles sont toujours enregistrés dans le panier._

Dans ce scénario, l'utilisatrice reçoit une expérience de panier d'achat cohérente même si elle est passée d'une visionneuse AMP à l'origine de l'éditeur, et avec un certain délai écoulé entre ces événements. Cette expérience est très raisonnable et, si vous concevez une expérience d'achat, vous devez prendre cela en charge. Alors, comment y parvenir?

**Pour activer cela ainsi que toute expérience impliquant l'état de l'utilisateur, tous les contextes traversés par l'utilisateur doivent partager leur état géré individuellement les uns avec les autres.** « Parfait! », Dites-vous, face à l'idée de partager les valeurs des cookies avec les identifiants des utilisateurs à travers ces frontières contextuelles. Un problème cependant: même si chacun de ces contextes affiche du contenu contrôlé par le même éditeur, chacun voit l'autre comme un tiers car chaque contexte vit sur des domaines différents.

<amp-img alt="AMP's ability to be displayed in many contexts means that each of those contexts has its own storage for identifiers" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/contexts-with-different-storage.png" width="1030" height="868">
  <noscript><img alt="La capacité d'AMP à être affichée dans de nombreux contextes signifie que chacun de ces contextes a son propre stockage pour les identifiants" src="https://github.com/ampproject/amphtml/raw/master/spec/img/contexts-with-different-storage.png"></noscript></amp-img>

Comme vous le verrez dans la section suivante, être dans une position tierce lors de l'interaction avec les cookies peut présenter des défis, selon la façon dont les paramètres du navigateur de l'utilisateur sont configurés. En particulier, si les cookies tiers sont bloqués dans une situation particulière, cela empêchera le partage des informations entre les contextes. D'autre part, si les opérations de cookies tiers sont autorisées, les informations peuvent être partagées.

## Guide d'implémentation <a name="implementation-guide"></a>

Cette section fournit des recommandations pour la gestion de l'état des utilisateurs. Les tâches ci-dessous sont présentées sous forme de progression, mais peuvent être largement visualisées en deux blocs:

**Bloc 1: Implémentation fondamentale:**les tâches 1 à 4 sont essentielles pour faire fonctionner les bases. Elles s'appuient sur un ensemble minimal de fonctionnalités nécessaires pour effectuer le travail partiellement: substitution de l'ID client d'AMP, lecture et écriture de cookies et maintenance d'une table de mappage en back-end. Pourquoi « <br>partiellement »? Étant donné que les étapes véhiculées dans ces tâches reposent sur la lecture et l'écriture de cookies et que les paramètres de cookies du navigateur peuvent empêcher cela dans certaines circonstances, cet ensemble de tâches est susceptible d'être insuffisant pour gérer complètement l'état de l'utilisateur dans tous les scénarios.

Après avoir posé les bases, nous visitons ensuite un sujet avec une série plus restreinte de cas d'utilisation, mais qui offre une solution complète pour ces cas d'utilisation.

**Bloc 2: Utilisation de l'ID client dans la liaison et l'envoi de formulaires:** dans la tâche 5, vous apprendrez à tirer parti de la traversée de liens et/ou de l'envoi de formulaires pour transmettre les informations d'ID client AMP à travers les limites contextuelles où l'utilisateur traverse directement d'une page vers un autre.

> **ATTENTION:**
> Pour le guide d'implémentation suivant, il est recommandé d'utiliser des cookies. N'oubliez pas de consulter la section [Pratiques fortement recommandées](#strongly-recommended-practices) pour des suggestions importantes à garder à l'esprit.

### Prérequis <a name="before-getting-started"></a>

En parcourant le guide technique ci-dessous, supposons que vous liez **l'état de l'utilisateur** à un **identificateur** stable qui représente l'utilisateur. Par exemple, l'identificateur pourrait ressembler à `n34ic982n2386n30`. Côté serveur, vous associez alors `n34ic982n2386n30` à tout ensemble d'informations sur l'état de l'utilisateur, comme le contenu du panier, une liste d'articles précédemment lus ou d'autres données selon le cas d'utilisation.

<amp-img alt="A single identifier could be used to manage user state for many use cases" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/identifiers-for-use-cases.png" width="1276" height="376">
  <noscript><img alt="Un identifiant unique pourrait être utilisé pour gérer l'état de l'utilisateur dans de nombreux cas d'utilisation" src="https://github.com/ampproject/amphtml/raw/master/spec/img/identifiers-for-use-cases.png"></noscript></amp-img>

Pour plus de clarté dans le reste de ce document, nous appellerons diverses chaînes de caractères qui sont des identifiants par des noms plus lisibles précédés d'un signe dollar (`$`):

[sourcecode:text]
n34ic982n2386n30 ⇒ $sample_id
[/sourcecode]

**Notre cas d'utilisation:** tout au long de ce guide, nous travaillerons sur un exemple conçu pour réaliser un suivi simple des pages vues (c'est-à-dire des analyses) dans lequel nous souhaitons produire le comptage d'utilisateurs le plus précis possible. Cela signifie que même si l'utilisateur accède au contenu d'un éditeur particulier à partir de contextes différents (y compris le passage des pages AMP à des pages non AMP), nous voulons que ces visites soient comptabilisées en vue d'une compréhension singulière de l'utilisateur qui est la même que si l'utilisateur ne naviguait que sur les pages non AMP traditionnelles de cet éditeur.

**Hypothèse concernant la disponibilité de valeurs de cookies stables:** nous supposons également que l'utilisateur utilise le même appareil, navigateur et navigation non privée, afin de garantir que les valeurs des cookies sont préservées et disponibles dans les sessions de l'utilisateur au fil du temps. Si ce n'est pas le cas, ces techniques ne devraient pas fonctionner. Si cela est nécessaire, cherchez à gérer l'état de l'utilisateur en fonction de l'identité authentifiée (c'est-à-dire connectée) de l'utilisateur.

**Les concepts présentés ci-dessous peuvent être étendus à d'autres cas d'utilisation: ** bien que nous nous concentrions uniquement sur le cas d'utilisation analytique, les concepts véhiculés ci-dessous peuvent être retravaillés pour d'autres cas d'utilisation nécessitant une gestion de l'état des utilisateurs entre les contextes.

<a id="task1"></a>

### Tâche 1: pour les pages non AMP sur l'origine de l'éditeur, configurer un identifiant et envoyer des pings d'analyse <a name="task-1-for-non-amp-pages-on-the-publisher-origin-set-up-an-identifier-and-send-analytics-pings"></a>

Commençons par configurer les analyses pour les pages non AMP diffusées hors de l'origine de l'éditeur. Cela peut être réalisé de plusieurs manières, notamment en utilisant un package d'analyse comme Google Analytics ou Adobe Analytics, ou en écrivant une implémentation personnalisée.

Si vous utilisez un package d'analyse d'un fournisseur, il est probable que ce package se charge à la fois de la configuration des cookies et de la transmission des pings via son code de configuration et ses API. Si tel est le cas, vous devez lire les étapes ci-dessous pour vous assurer qu'elles correspondent à votre approche analytique, mais attendez-vous à ne pas devoir apporter de modifications dans le cadre de cette tâche.

Le reste de cette tâche offre des conseils si vous souhaitez configurer vos propres analyses.

##### Configurer un identifiant à l'aide de cookies propriétaires <a name="set-up-an-identifier-using-first-party-cookies"></a>

Si vous avez des pages non AMP diffusées à partir de l'origine de votre éditeur, configurez un identifiant permanent et stable à utiliser sur ces pages. Ceci est généralement [implémenté avec des cookies propriétaires](https://en.wikipedia.org/wiki/HTTP_cookie#Tracking).

Pour les besoins de notre exemple, disons que vous avez défini un cookie appelé `uid` (« ID utilisateur ») qui sera créé lors de la première visite d'un utilisateur. S'il ne s'agit pas de la première visite de l'utilisateur, lisez la valeur précédemment définie lors de la première visite.

Cela signifie qu'il existe deux cas pour l'état des pages non AMP sur l'origine de l'éditeur:

**Cas 1: visite initiale.** Lors du premier atterrissage sur la page non AMP, il n'y aura pas de cookie. Si vous avez vérifié le cookie avant d'en définir un, vous ne verrez aucune valeur définie dans le cookie correspondant à `uid`:

[sourcecode:bash]

> document.cookie
> ""
> [/sourcecode]

À un moment donné lors du chargement initial, le cookie doit être défini, de sorte que si vous le faites une fois la page chargée, vous verrez qu'une valeur a été définie:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

**Cas 2: visite non initiale.** Il y aura un ensemble de défini. Ainsi, si vous ouvrez la console développeur sur la page, vous verrez:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

##### Envoyer des pings d'analyse <a name="send-analytics-pings"></a>

Une fois que vous avez configuré un identifiant, vous pouvez désormais l'incorporer dans les pings d'analyse pour commencer à suivre les pages vues.

L'implémentation spécifique dépendra de la configuration souhaitée, mais vous chercherez généralement à envoyer à votre serveur d'analyse des pings (requêtes) qui incluent des données utiles dans l'URL de la requête elle-même. Voici un exemple, qui indique également comment inclure la valeur de votre cookie dans la requête:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier
[/sourcecode]

Notez que dans l'exemple ci-dessus, l'identifiant de l'utilisateur est indiqué par un paramètre de requête spécifique, `user_id`:

[sourcecode:text]
user_id=$publisher_origin_identifier
[/sourcecode]

L'utilisation de « `user_id` » ici doit être déterminée par ce que votre serveur d'analyse s'attend à traiter et n'est pas spécifiquement liée à comment vous appelez le cookie qui stocke l'identifiant localement.

<a id="task2"></a>

### Tâche 2: pour les pages AMP, configurer un identifiant et envoyer des pings d'analyse en incluant le remplacement de l'ID client dans les pings amp-analytics <a name="task-2-for-amp-pages-set-up-an-identifier-and-send-analytics-pings-by-including-client-id-replacement-in-amp-analytics-pings"></a>

Passons maintenant aux pages AMP et voyons comment vous pouvez établir et transmettre un identifiant pour l'analyse. Cela sera applicable quel que soit le contexte dans lequel la page AMP est présentée. Cela couvre donc toute page AMP sur l'origine de l'éditeur, diffusée via un cache AMP ou affichée dans la visionneuse AMP.

Grâce à l'utilisation de fonctionnalités qui nécessitent un ID client, AMP effectuera le travail « en arrière-plan » pour générer et stocker les valeurs d'ID client et les présenter aux fonctionnalités qui les nécessitent. L'une des principales fonctionnalités qui peuvent utiliser l'ID client d'AMP est [amp-analytics](https://amp.dev/documentation/components/amp-analytics), qui se trouve être exactement ce dont nous aurons besoin pour implémenter notre exemple de cas d'utilisation d'analyse.

Sur les pages AMP, créez un ping amp-analytics contenant l'ID client:

<table>
  <tr>
    <td width="40%"><strong>La configuration d'amp-analytics ressemble à:</strong></td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=${clientId(uid)}</code></td>
  </tr>
  <tr>
    <td><strong>Ce qui se passe sur le réseau ressemble à:</strong></td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id</code><p><em>Dans ce cas, <code>${clientId(uid)}</code> est remplacé par une valeur réelle que AMP génère à ce moment ou qui sera renvoyée en fonction de ce que le navigateur de l'utilisateur a déjà stocké localement</em></p>
</td>
  </tr>
</table>

Notez que le paramètre transmis dans la substitution d'ID client, `${clientId(uid)` , est `uid`. Il s'agissait d'un choix délibéré qui correspond au même nom de cookie utilisé sur l'origine de l'éditeur, comme décrit dans la [tâche 1](#task1). Pour une intégration aussi transparente que possible, vous devez appliquer la même technique.

Concernant le reste de l'implémentation d'amp-analytics, consultez la documentation sur la [configuration d'amp-analytics](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/) pour plus de détails sur la configuration des requêtes amp-analytics ou pour modifier celles de votre fournisseur d'analyse. Le ping peut être modifié davantage pour transporter des données supplémentaires que vous définissez directement ou en tirant parti d'autres [substitutions AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).

> **Bon à savoir:**
> Pourquoi avons-nous utilisé le nom `uid` pour le paramètre transmis à la fonction ID client? Le paramètre pris par la substitution `clientId(...)` est utilisé pour définir la portée. Vous pouvez en fait utiliser la fonction ID client dans de nombreux cas d'utilisation et, par conséquent, générer de nombreux ID client. Le paramètre fait la différence entre ces cas d'utilisation et vous l'utilisez donc pour spécifier le cas d'utilisation pour lequel vous souhaitez un ID client. Par exemple, vous pouvez vouloir envoyer différents identifiants à des tiers comme un annonceur et vous pouvez utiliser le paramètre « scope » pour y parvenir.

En ce qui concerne l'origine de l'éditeur, il est plus facile de considérer « scope » comme le nom de votre cookie. En recommandant une valeur `uid` pour le paramètre ID client ici dans la [tâche 2](#task2), nous nous alignons sur le choix d'utiliser un cookie appelé `uid` dans la [tâche 1](#task1).

<a id="task3"></a>

### Tâche 3: traiter les pings d'analyse à partir de pages sur l'origine de l'éditeur <a name="task-3-process-analytics-pings-from-pages-on-the-publisher-origin"></a>

En raison de la configuration effectuée dans les tâches 1 et 2, lorsqu'une personne accède à la version AMP (à partir de n'importe quel contexte) ou à la version non AMP sur l'origine de l'éditeur, le ping d'analyse utilise le même identifiant. En suivant les instructions de la [tâche 2](#task2) pour choisir une « portée » d'ID client qui portait le même nom que le cookie que vous avez utilisé dans la [tâche 1](#task1), AMP réutilise le même cookie.

Cela est illustré dans le tableau ci-dessous:

<table>
  <tr>
    <td width="40%">Un ping d'analyse provenant d'une <strong>page non-AMP sur l'origine de l'éditeur</strong> ressemble à</td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code></td>
  </tr>
  <tr>
    <td>Un ping d'analyse provenant d'une <strong>page AMP sur l'origine de l'éditeur</strong> ressemble à</td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code><br><em>Dans ce cas, c'est pareil! En choisissant une valeur de portée <code>uid</code>, la valeur sous-jacente du cookie <code>uid</code>, qui est <code>$publisher_origin_identifier</code>, est utilisée.</em>
</td>
  </tr>
</table>

<a id="task4"></a>

### Tâche 4: traiter les pings d'analyse à partir du cache AMP ou des contextes d'affichage de la visionneuse AMP et établir des mappages d'identificateurs (si nécessaire) <a name="task-4-process-analytics-pings-from-amp-cache-or-amp-viewer-display-contexts-and-establish-identifier-mappings-if-needed"></a>

Lorsque nous avons configuré des pings d'analyse dans la [tâche 2](#task2) pour transmettre des données à partir de pages AMP affichées dans un cache AMP ou une visionneuse AMP, nous avons également créé un problème. Comme indiqué précédemment, les contextes du cache AMP et de la visionneuse AMP sont différents du contexte de l'origine de l'éditeur, ce qui exige une manière différente de conserver les identifiants. Pour traiter ces pings afin d'éviter des problèmes tels que le comptage excessif des utilisateurs, nous suivrons quelques [étapes](#implementation-steps) pour essayer de réconcilier les identifiants aussi souvent que possible.

Pour mieux expliquer les étapes que nous prenons, il est utile d'expliquer dans un premier temps comment le problème de comptage excessif se produit.

#### Examen du problème <a name="reviewing-the-problem"></a>

Soit la suite d'événements suivante:

1. Un utilisateur visite la **page AMP dans un contexte d'affichage de visionneuse AMP**, tel que `https://google.com/amp/s/example.com/article.amp.html`. Étant donné que la visionneuse AMP n'a pas accès au cookie `uid` sur l'origine de l'éditeur, une valeur aléatoire de `$amp_client_id` est générée pour identifier l'utilisateur.
2. Le même utilisateur visite ensuite **une page sur l'origine de l'éditeur `https://example.com`**. Comme décrit dans la [tâche 3](#task3), l'utilisateur est identifié avec `$publisher_origin_identifier`.

Ici (1) et (2) se produisent sur des origines (ou contextes) différentes. Pour cette raison, il n'y a pas d'état partagé et `$amp_client_id` est différent de `$publisher_origin_identifier`. Alors, quel est l'impact? (1) est une session de consultation de page unique qui ressemble à un utilisateur et (2) est une autre session de consultation de page unique qui semble provenir d'un autre utilisateur. **Fondamentalement, même si l'utilisateur a conulté le contenu `https://example.com` , nous surcomptons les utilisateurs et l'utilisateur dans (1) ressemble à un rebond (une seule visite de page).**

#### Stratégie de solution <a name="solution-strategy"></a>

Pour résoudre le problème du comptage excessif, vous devez utiliser la stratégie suivante, dont la puissance dépend de l'autorisation de lecture ou d'écriture de cookies tiers:

- **Réconciliation immédiate des identifiants: si vous pouvez accéder aux cookies de l'origine de l'éditeur ou les modifier**, utilisez ou créez l'identifiant de l'origine de l'éditeur et ignorez tout identifiant dans la demande d'analyse. Vous serez en mesure de lier l'activité entre les deux contextes avec succès.
- **Réconciliation différée des identifiants: si vous ne pouvez pas accéder ou modifier l'identifiant de l'origine de l'éditeur (c'est-à-dire les cookies)**, utilisez l'ID client AMP incluse dans la demande d'analyse. Utilisez cet identifiant comme « **alias** », plutôt que d'utiliser ou de créer un nouvel identifiant d'origine d'éditeur (cookie), ce que vous ne pouvez pas faire (en raison du blocage des cookies tiers), et ajoutez l'alias à une **table de mappage**. Vous ne parviendrez pas à lier immédiatement l'activité entre les deux contextes, mais en utilisant une table de mappage, vous pourrez peut-être lier la valeur de l'ID client AMP à l'identifiant de l'origine de l'éditeur lors d'une prochaine visite de l'utilisateur. Une fois que c'est fait, vous disposerez des informations nécessaires pour lier l'activité et concilier le fait que les pages visitées dans les différents contextes provenaient du même utilisateur. La tâche 5 décrit comment parvenir à une solution complète dans des scénarios spécifiques où l'utilisateur passe immédiatement d'une page à une autre.

#### Étapes d'implémentation <a name="implementation-steps"></a>

Sur le serveur, recherchez un identifiant d'origine d'éditeur existant

Lisez les cookies envoyés dans le cadre de la demande d'analyse. Dans notre exemple, cela signifie vérifier le cookie `uid` de example.com.

- Si la valeur `uid` est lue avec succès, utilisez-la pour enregistrer des données d'analyse (**identifiant d'enregistrement d'analyse**). Grâce à la [tâche 1](#task1), nous savons que la valeur de cet identificateur est `$publisher_origin_identifier`. Une fois l'identifiant d'enregistrement d'analyse établi, nous pouvons passer directement à la section [Stockage des données](#data-storage).
- Si la valeur `uid` n'est pas correctement lue, suivez les étapes ci-dessous concernant la table de mappage.

##### Table de mappage <a name="mapping-table"></a>

Notre table de mappage associera les valeurs d'ID client AMP visibles dans les pings d'analyse aux identifiants d'origine de l'éditeur comme suit:

<table>
  <tr>
    <th width="50%"><strong>ID utilisateur sur l'origine de l'éditeur</strong></th>
    <th width="50%"><strong>ID utilisateur sur la page AMP qui n'est PAS sur l'origine de l'éditeur (« alias »)</strong></th>
  </tr>
  <tr>
    <td>Provient de l'identifiant de l'origine de l'éditeur ou est généré en tant que valeur prospective si l'identifiant de l'origine de l'éditeur n'est pas accessible.</td>
    <td>Provient de l'ID client AMP</td>
  </tr>
</table>

Immédiatement après avoir déterminé que vous n'avez pas réussi à lire l'identifiant de l'origine de l'éditeur, vérifiez si l'ID client AMP contenu dans le ping d'analyse est déjà utilisé dans un mappage. Pour ce faire, consultez d'abord la demande amp-analytics entrante pour obtenir la valeur de l'ID client. Par exemple, à partir de cette demande:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id
[/sourcecode]

nous extrayons la partie en gras correspondant à l'ID client AMP: `$amp_client_id` .

Ensuite, examinez la table de mappage pour essayer de trouver la même valeur dans la colonne « alias »:

<table>
  <tr>
    <th width="50%"><strong>ID utilisateur sur l'origine de l'éditeur</strong></th>
    <th width="50%"><strong>ID utilisateur sur la page AMP qui n'est PAS sur l'origine de l'éditeur (« alias »)</strong></th>
  </tr>
  <tr>
    <td><code>$existing_publisher_origin_identifier</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Dans l'exemple ci-dessus, nous trouvons un enregistrement qui existe déjà. La valeur que nous trouvons associée à l'ID client AMP devient l'identifiant d'enregistrement d'analyse. Ici, c'est `$existing_publisher_origin_identifier`. Avec un identifiant d'enregistrement d'analyse établi, nous pouvons passer à la section [Stockage de données](#data-storage).

Sinon, si l'ID client AMP ne peut être trouvé dans un mappage, nous devons créer un mappage:

1. Générez un **identifiant d'origine d'éditeur potentiel**. Appelons-le `$prospective_identifier` dans les exemples à suivre. Cette valeur doit être créée en fonction de la configuration de la valeur sur l'origine de l'éditeur, comme décrit dans la [tâche 1](#task1) ci-dessus.
2. Ensuite, essayez de [définir](https://en.wikipedia.org/wiki/HTTP_cookie#Setting_a_cookie) l'identifiant d'origine de l'éditeur potentiel en tant que cookie sur l'origine de l'éditeur. Cela réussira si des cookies tiers peuvent être écrits. Au cas contraire, cela échouera.
3. Ensuite, stockez la paire {identifiant d'origine de l'éditeur potentiel, ID client AMP}.

Le mappage que nous avons créé finit par ressembler à ceci:

<table>
  <tr>
    <th><strong>ID utilisateur sur l'origine de l'éditeur</strong></th>
    <th><strong>ID utilisateur sur la page AMP qui n'est PAS sur l'origine de l'éditeur (« alias »)</strong></th>
  </tr>
  <tr>
    <td>
<code>$prospective_identifier</code> (généré juste à temps lorsque le ping d</td>
    <td>
<code>$amp_client_id</code> (provient du ping d</td>
  </tr>
</table>

Nous utiliserons l'identifiant d'origine de l'éditeur potentiel comme identifiant d'enregistrement d'analyse, car il s'agit de la valeur associée à l'état sur l'origine de l'éditeur. Dans ce cas, c'est `$prospective_identifier`, qui entrera en jeu dans la section [Stockage de données](#data-storage) qui suit.

##### Stockage de données <a name="data-storage"></a>

Maintenant que vous avez déterminé l'identifiant de l'enregistrement d'analyse, vous pouvez stocker les informations sur l'état de l'utilisateur (les données d'analyse dans ce cas) saisies par cet identifiant:

[sourcecode:text]
{analytics record identifier, analytics data ...}
[/sourcecode]

<a id="task5"></a>

### Tâche 5: utiliser l'ID client pour lier et envoyer des formulaires <a name="task-5-using-client-id-in-linking-and-form-submission"></a>

En général, lorsque la lecture et l'écriture de cookies tiers sont interdites, il y aura des situations où la gestion efficace et totale de l'état de l'utilisateur sera impossible. Dans les tâches 1 à 4, les étapes que nous avons suivies vous aident de deux manières: (1) elles fournissent une solution tout à fait efficace lorsque la lecture et l'écriture de cookies tiers sont autorisées, et (2) ils configurent notre système pour profiter de toute possibilité éventuelle de réconcilier les identifiants entre les différents contextes si la réconciliation immédiate est impossible en raison des paramètres de cookies du navigateur.

Dans cette tâche, nous aborderons une optimisation supplémentaire qui est utile lorsque l'utilisateur navigue dans différents contextes d'une page à une autre, soit **via des liens ou des soumissions de formulaires**. Dans ces situations, et avec le travail d'implémentation décrit ci-dessous, il est possible de mettre en place un système totalement efficace pour gérer l'état des utilisateurs dans tous les contextes.

<amp-img alt="Links can be used to pass the identifier information of one context into another (linked) context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-form-identifier-forwarding.png" width="866" height="784">
  <noscript><img alt="Les liens peuvent être utilisés pour transmettre les informations d'identification d'un contexte dans un autre contexte (lié)" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-form-identifier-forwarding.png"></noscript></amp-img>

##### Utilisation des fonctionnalités de substitution <a name="using-substitution-features"></a>

Notre approche tirera parti de deux types de [substitutions de variables AMP](https://github.com/ampproject/amphtml/blob/master/spec/./amp-var-substitutions.md).

**Pour mettre à jour les liens sortants afin d'utiliser une substitution d'ID client:** définissez un nouveau paramètre de requête, `ref_id` (« ID de référent »), qui apparaîtra dans l'URL et indiquera **l'identifiant du contexte d'origine** de l'utilisateur. Définissez ce paramètre de requête sur la valeur de la substitution d'ID client AMP:

[sourcecode:html]
<a
href="https://example.com/step2.html?ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Autre solution pour transmettre l'ID client aux liens sortants:** définissez le nouveau paramètre de requête `ref_id` dans l'attribut de données `data-amp-addparams` et pour les requêtes qui ont besoin d'une substitution de paramètres, fournissez ces détails dans `data-amp-replace`. Avec cette approche, l'URL sera parfaite et les paramètres spécifiés dans `data-amp-addparams` seront ajoutés de manière dynamique

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

Pour transmettre plusieurs paramètres de requête par le biais de `data-amp-addparams`, séparez `&` comme suit

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)&pageid=p123"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Pour mettre à jour les entrées de formulaire afin d'utiliser une substitution d'ID client:** définissez un nom pour le champ d'entrée, tel que `orig_user_id`. Spécifiez la `default-value` du champ de formulaire comme étant la valeur de la substitution d'ID client AMP:

[sourcecode:html]
<input
  name="ref_id"
  type="hidden"
  value="CLIENT_ID(uid)"
  data-amp-replace="CLIENT_ID"
/>
[/sourcecode]

En suivant ces étapes, l'ID client est disponible sur le serveur cible et/ou en tant que paramètre d'URL sur la page sur laquelle l'utilisateur atterrit après avoir cliqué sur le lien ou l'envoi du formulaire (le **contexte de destination**). Le nom (ou « clé ») sera `ref_id` car c'est ainsi que nous l'avons défini dans les implémentations ci-dessus et aura une valeur associée égale à l'ID client. Par exemple, en suivant le lien (balise `<a>` ) défini ci-dessus, l'utilisateur accédera à cette URL:

[sourcecode:http]
https://example.com/step2.html?ref_id=$amp_client_id
[/sourcecode]

<amp-img alt="Example of how an identifier in an AMP viewer context can be passed via link into a publisher origin context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-1.png" width="1038" height="890">
  <noscript><img alt="Exemple de transmission d'un identifiant dans un contexte de visionneuse AMP via un lien dans un contexte d'origine d'éditeur" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-1.png"></noscript></amp-img>

Lorsque l'utilisateur atterrit sur une page contenant une valeur `ref_id` soit comme paramètre d'URL soit dans l'en-tête, nous avons la possibilité de co-traiter l'identifiant `ref_id` avec l'identifiant exposé via la page elle-même (c-à-d une valeur de cookie). En incluant les deux dans un ping d'analyse, votre serveur d'analyse peut travailler simultanément avec les deux valeurs, et sachant qu'elles sont liées, ressortir cette relation dans votre back-end. Les étapes à suivre montrent comment y parvenir.

##### Extraction des paramètres de requête d'URL <a name="extracting-url-query-parameters"></a>

En utilisant des fonctionnalités de substitution, nous mettons en place un flux de navigation de lien ou un flux d'envoi de formulaire qui expose des informations, en particulier l'ID client, au serveur cible et/ou en tant que paramètre d'URL pouvant être lu sur le client une fois que l'utilisateur a terminé la navigation.

Si les informations ont été exposées uniquement au serveur, par exemple via un formulaire POST, vous pouvez procéder au traitement des informations et diffuser la page résultante. Lors du traitement de ces données, veuillez prendre note des étapes concernant la [validation des paramètres](#parameter-validation) détaillées ci-dessous.

Si les informations sont disponibles via URL et que vous souhaitez les traiter, vous pouvez utiliser plusieurs approches:

- Traitement lors de la redirection (gestion côté serveur)
- Traitement sur la page de destination (gestion côté client)

**Traitement lors de la redirection (gestion côté serveur)**

Pour traiter les informations lors de la redirection, gérez la demande sur le serveur et extrayez le ou les paramètres pertinents. Veuillez prendre note des étapes concernant la [validation des paramètres](#parameter-validation) détaillées ci-dessous. Traitez les données, combinées avec des valeurs de cookie contenant d'autres identifiants pertinents, puis redirigez vers une URL qui ne contient pas ces paramètres.

**Traitement sur la page de destination (gestion côté client)**

Pour traiter les informations sur la page de destination, l'approche variera selon que cette page est une page AMP ou une page non AMP.

<amp-img alt="Example of how to construct an analytics ping that contains an identifier from the previous context provided via URL and an identifier from the current context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-2.png" width="1326" height="828">
  <noscript><img alt="Exemple de construction d'un ping analytique contenant un identifiant du contexte précédent fourni via l'URL et un identifiant du contexte actuel" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-2.png"></noscript></amp-img>

_Mises à jour de la page AMP:_ utilisez la fonctionnalité de substitution de paramètre de requête dans votre configuration amp-analytics pour obtenir la valeur de l'identifiant `ref_id` dans l'URL. La fonction de paramètre de requête prend un paramètre qui indique la « clé » de la paire clé-valeur souhaitée dans l'URL et renvoie la valeur correspondante. Utilisez la fonction d'ID client comme nous l'avons fait pour obtenir l'identifiant du contexte de la page AMP.

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}
[/sourcecode]

Lorsque cela est transmis sur le réseau, les valeurs réelles seront remplacées:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$referrer_page_identifier&user_id=$current_page_identifier
[/sourcecode]

En suivant nos exemples ci-dessus, nous avons:

[sourcecode:text] $referrer_page_identifier is $amp_client_id $current_page_identifier is $publisher_origin_id [/sourcecode]

le ping est alors:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$amp_client_id&user_id=$publisher_origin_id
[/sourcecode]

Nous vous recommandons de valider l'authenticité des valeurs des paramètres de requête à l'aide des étapes décrites dans la section [Validation des paramètres](#parameter-validation) ci-dessous.

_Mises à jour d'une page non AMP:_ de même, sur une page non AMP diffusée à partir de l'origine de votre éditeur, extrayez et transmettez la valeur `ref_id` contenue dans l'URL. Validez l'authenticité de la valeur en suivant les étapes décrites dans la section [Validation des paramètres](#parameter-validation) ci-dessous. Ensuite, créez des pings d'analyse qui comprendront à la fois un `orig_user_id` dérivé de `ref_id` et un `user_id` fonction de la valeur de l'identifiant de cookie propriétaire.

<blockquote>
<p><strong>IMPORTANT:</strong></p>
<p>Si vous choisissez de traiter les paramètres côté client sur la page de destination, cette dernière doit supprimer les informations d'identifiant des URL dès que l'identifiant peut être capturé.</p>
<p>Avant de supprimer les paramètres, assurez-vous que tout autre code qui doit être exécuté pour les lire a:</p>
<ul>
  <li>été exécuté avant la suppression; ou</li>
  <li>peut accéder à un endroit où le code qui a lu et supprimé les paramètres a stocké les données</li>
</ul>
<p>Pour ce faire sur votre page non AMP, incluez le code JavaScript suivant, qui supprimera tous les paramètres de requête de l'URL:</p>
<pre>var href = location.href.replace(/\?[^{{'[% raw %]'}}#]{{'{% endraw %}'}}+/, '');<br>history.replaceState(null, null, href);</pre>
<p>Adaptez-le si nécessaire pour supprimer moins de paramètres de requête.</p>
</blockquote>

##### Traitement de plusieurs identifiants dans un ping d'analyse <a name="processing-multiple-identifiers-in-an-analytics-ping"></a>

Contrairement à la [tâche 4](#task4), où nou savons configuré le ping d'analyse de sorte à contenir une seule valeur d'identifiant, avec les étapes suivies jusqu'ici dans le tâche 5, nous avons maintenant deux valeurs, `orig_user_id` et `user_id`. Nous allons ensuite montrer comment traiter ces deux identifiants qui font partie de ping d'analyse entrant.

Avant de continuer, assurez-vous de prendre note des étapes décrites dans la section [Validation des paramètres](#parameter-validation) ci-dessous et assurez-vous que vous êtes prêt à faire confiance aux deux valeurs indiquées par `orig_user_id` et `user_id`.

Vérifiez si l'une de ces valeurs est présente dans votre table de mappage. Dans notre exemple ci-dessus, la première visite de page se produit sur une page AMP qui n'est PAS sur l'origine de l'éditeur, suivie de la deuxième visite qui se produit sur l'origine de l'éditeur. En conséquence, les valeurs des paramètres de requête du ping d'analyse ressembleront à ceci:

**Cas 1: disposition des identifiants lorsque le ping d'analyse est envoyé à partir d'une page sur l'origine de l'éditeur**

<table>
  <tr>
    <th width="20%"></th>
    <th width="40%"><strong>ID utilisateur sur l'origine de l'éditeur</strong></th>
    <th width="40%"><strong>ID utilisateur sur la page AMP qui n'est PAS sur l'origine de l'éditeur (« alias »)</strong></th>
  </tr>
  <tr>
    <td><strong>Comment cela est exprimé dans le ping d'analyse</strong></td>
    <td><code>user_id=$publisher_origin_id</code></td>
    <td><code>orig_user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Clé de paramètre</strong></td>
    <td><code>user_id</code></td>
    <td><code>orig_user_id</code></td>
  </tr>
  <tr>
    <td><strong>Valeur de paramètre</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Veuillez noter que l'identifiant provenant de la première visite correspond à la colonne la plus à droite et l'identifiant provenant de la deuxième visite est dans la colonne du milieu, conformément à la façon dont notre exemple de flux ci-dessus a été construit.

Si, à la place, l'utilisateur démarre sur une page diffusée à partir de l'origine de l'éditeur et accède ensuite à une page AMP qui n'est PAS sur l'origine de l'éditeur, les clés des paramètres seront inversées, mais la manière dont nous référençons les valeurs ne le sera pas (`$amp_client_id` fait toujours référence à un identifiant stocké sur une page AMP qui n'est PAS sur l'origine de l'éditeur):

**Cas 2: disposition des identifiants lorsque le ping d'analyse est envoyé à partir d'une page AMP qui n'est PAS sur l'origine de l'éditeur**

<table>
  <tr>
    <th width="20%"> </th>
    <th width="40%"><strong>ID utilisateur sur l'origine de l'éditeur</strong></th>
    <th width="40%"><strong>ID utilisateur sur la page AMP qui n'est PAS sur l'origine de l'éditeur (« alias »)</strong></th>
  </tr>
  <tr>
    <td><strong>Comment cela est exprimé dans le ping d'analyse</strong></td>
    <td><code>orig_user_id=$publisher_origin_id</code></td>
    <td><code>user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Clé de paramètre</strong></td>
    <td><code>orig_user_id</code></td>
    <td><code>user_id</code></td>
  </tr>
  <tr>
    <td><strong>Valeur de paramètre</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Lorsque vous effectuez une recherche dans le tableau de mappage, tenez compte de la situation qui s'applique et recherchez les valeurs dans les colonnes du tableau de mappage où vous pensez qu'elles apparaîtront. Par exemple, si le ping d'analyse est envoyé à partir d'une page sur l'origine de l'éditeur (cas 1), alors vérifiez les valeurs qui ont pour clé `user_id` dans la colonne « ID utilisateur sur l'origine de l'éditeur » du tableau de mappage et vérifiez les valeurs qui ont pour clé `orig_user_id` dans la colonne « ID utilisateur sur une page AMP qui n'est PAS sur l'origine de l'éditeur ('alias') ».

Si vous ne trouvez aucune des valeurs d'identificateur utilisées dans votre table de mappage, créez un nouveau mappage:

- Si la demande d'analyse provient d'une page sur l'origine de votre éditeur, vous devez choisir la valeur correspondant à `uid` comme identifiant de l'enregistrement d'analyse; choisissez la valeur de `orig_uid` comme « alias ».
- Si la demande d'analyse ne provient pas d'une page sur l'origine de votre éditeur, vous devez choisir la valeur correspondant à `uid` comme valeur « alias » dans la table de mappage. Ensuite, suivez les autres instructions de la [tâche 4](#task4) pour créer un identifiant d'origine d'éditeur potentiel et essayez de définir cette valeur comme cookie sur l'origine.

##### Validation des paramètres <a name="parameter-validation"></a>

Les valeurs contenues dans une URL peuvent être modifiées de manière malveillante, déformées ou d'une manière ou d'une autre ne pas être les valeurs auxquelles vous vous attendez. Ceci est parfois appelé falsification de demande intersite. Tout comme il est important de s'assurer que les pings d'analyse que votre serveur d'analyse reçoit proviennent de pages susceptibles d'envoyer des pings d'analyse, lorsque vous « transférez » des valeurs qui faisaient partie de l'URL, assurez-vous de valider le référent pour vous assurer que vous pouvez faire confiance à ces valeurs.

Par exemple, dans les étapes ci-dessus, nous avons créé l'URL suivante, sur laquelle l'utilisateur peut cliquer pour accéder à la page correspondante:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$amp_client_id
[/sourcecode]

Cependant, il est tout aussi possible que l'utilisateur ou un hacker modifie cette URL et qu'elle devienne:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$malicious_value
[/sourcecode]

Vous voulez vous assurer de ne traiter que les instances de `$amp_client_id` et éviter d'utiliser des instances de `$malicious_value`.

**Étapes suggérées pour valider les valeurs reçues via les paramètres de requête d'URL:** confirmez que le référent de la page de destination correspond à une URL à laquelle vous vous attendiez. Celle-ci devrait généralement être une que vous avez vue portant une valeur d'identifiant précédemment vue dans une requête CORS valide. Nous vous recommandons d'accepter uniquement ces identifiants connus.

Sur une page non AMP, vérifiez `document.referrer` directement côté client ou transmettez la valeur dans le cadre du ping d'analyse pour pouvoir valider côté serveur. Si la valeur du référent est une valeur fiable, vous pouvez accepter et traiter les valeurs provenant de l'URL de la page de destination, telles que `orig_user_id` dans l'exemple ci-dessus.

Sur une page AMP, utilisez la variable de substitution [Document Referrer](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#document-referrer) pour transmettre la valeur du référent dans le ping d'analyse. Le traitement côté serveur est la seule option disponible. Pour illustrer cela, voici un ping d'analyse que la page de destination peut envoyer qui contient (1) la valeur de l'ID client de la page actuelle, (2) une valeur transmise via l'URL que nous avons configurée pour être la valeur de l'ID client dans la page de référence, et (3) les informations de référent elles-mêmes pour valider la valeur de (2): `https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}&referrer=${documentReferrer}`

Si vous ne faites pas confiance au référent, rejetez toutes les valeurs fournies via les paramètres d'URL et ne les utilisez pas.

## Pratiques fortement recommandées <a name="strongly-recommended-practices"></a>

### Gardez une seule association <a name="keep-just-one-association"></a>

**Une seule association entre les identifiants de deux contextes quelconques doit être maintenue.** Si un ID client AMP que vous avez précédemment associé à un cookie ou à un autre identifiant utilisateur émis par vous est vu avec un nouveau cookie ou identifiant utilisateur que vous émettez, vous devez supprimer tout état que vous déteniez par rapport au cookie et identifiant utilisateur précédents.

Ces étapes aideront à assurer l'alignement avec les attentes des utilisateurs en matière de confidentialité. Comme détaillé dans les sections précédentes, la gestion de l'état de l'utilisateur dans AMP impliquera souvent de stocker et d'associer différents identifiants dans plusieurs contextes où le contenu AMP est affiché. **Cette situation ne doit jamais être utilisée abusivement pour reconstituer des données ou effectuer un suivi auquel l'utilisateur ne s'attendrait pas ou que vous n'avez pas clairement exprimé à l'utilisateur, comme, par exemple, après que l'utilisateur a supprimé ses cookies pour vos sites.**

### Respecter les suppressions de cookies et de stockage local <a name="respect-cookie-and-local-storage-deletions"></a>

**Vous devez respecter tous les contrôles de confidentialité applicables qui sont mis à la disposition de l'utilisateur, y compris tous les contrôles permettant de supprimer tous les cookies et le stockage local **. À aucun moment l'identifiant client ou l'infrastructure AMP ne doit être utilisé [pour reconstituer un identifiant supprimé](https://en.wikipedia.org/wiki/Zombie_cookie) une fois qu'un utilisateur a expressément supprimé un côté d'une relation d'identifiant.

### Respecter les lois et réglementations locales <a name="comply-with-local-laws-and-regulations"></a>

**L'association de cookies et/ou d'identifiants de deux ou plusieurs domaines peut nécessiter la mise à jour de votre politique de confidentialité, la fourniture d'informations supplémentaires sur les utilisateurs ou l'obtention du consentement de l'utilisateur final dans certaines juridictions.** L'utilisation de l'identifiant client AMP, qui utilise des cookies ou un stockage local comme moyen de stockage permanent pour offrir un identifiant stable, doit être analysée par chaque éditeur au regard de toutes les lois et réglementations applicables concernant la collecte, le stockage et le traitement des données, ainsi que le guide d'utilisation.
