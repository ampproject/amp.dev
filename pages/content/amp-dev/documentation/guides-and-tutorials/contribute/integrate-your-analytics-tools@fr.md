---
"$title": "Comment intégrer votre outil d'analyse à AMP"
order: '1'
formats:
- websites
- stories
teaser:
  text: " Présentation"
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Présentation <a name="overview"></a>

Si vous utilisez un outil logiciel en tant que service permettant aux éditeurs de mieux comprendre leur trafic et leurs visiteurs, vous serez peut-être intéressé à l'idée d'intégrer votre service dans `amp-analytics`. Cela permettra à vos clients de visualiser les modèles de trafic pour leurs pages HTML AMP.

## Prérequis <a name="before-you-begin"></a>

Avant de pouvoir ajouter votre service d'analyse au runtime HTML AMP, vous devrez:

- Identifier les types de [variables](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md) et de [requêtes](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#requests) dont vous aurez besoin dans un document HTML AMP pour votre service d'analyse.
- Identifier les déclencheurs qui entraînent l'envoi de requêtes d'analyse à partir d'une page potentiellement pertinente pour votre service.
- Déterminer si et comment vous allez [suivre les utilisateurs](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md) dans des contextes AMP propriétaires et tiers.
- Déterminer comment votre tableau de bord d'analyse gère le trafic AMP.
- Identifier les fonctionnalités manquantes dans `amp-analytics` et [envoyer des requêtes](https://github.com/ampproject/amphtml/issues/new) pour les fonctionnalités nécessaires.
- AMP Analytics envoie ses variables à un point de terminaison préconfiguré. Si vous ne disposez pas encore d'un point de terminaison existant, consultez [cet exemple](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample) pour savoir comment en créer un.
    - Pour tous les types de transport, sauf `iframe`, les variables sont envoyées sous forme de paramètres de chaîne de requête dans une requête HTTPS.
    - Pour le type de transport `iframe`, une iframe est créée et des variables lui sont envoyées via `window.postMessage`. Dans ce cas, le message n'a pas besoin d'être une URL. Cette option n'est disponible que pour les fournisseurs accrédités MRC.
- Voyez dans quelle mesure l'intégration de `amp-analytics` peut avoir un impact sur vos éventuelles politiques (en particulier votre politique de confidentialité) et accords.

## Comment ajouter votre configuration au runtime HTML AMP <a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. Créez un [ticket d'intention d'implémentation](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../CONTRIBUTING.md#contributing-features) indiquant que vous allez ajouter la configuration de votre service d'analyse au runtime HTML AMP. Assurez-vous d'inclure **cc @ ampproject / wg-analytics** dans votre description.
2. Développez un correctif qui implémente les éléments suivants:
    1. Un nouveau fichier json de configuration `${nomdufournisseur}.json` dans [dossier](https://github.com/ampproject/amphtml/tree/master/extensions/amp-analytics/0.1/vendors) des fournisseurs comprenant toutes les options au-delà de la valeur par défaut, telles que:
        1. `"vars": {}` pour des variables par défaut supplémentaires.
        2. `"requests": {}` pour les requêtes que votre service utilisera.
        3. `"optout":` si nécessaire. Nous n'avons actuellement pas un bon système de désinscription, alors n'hésitez pas à nous contacter afin d'en concevoir un qui fonctionne bien pour vous.
        4. `"warningMessage":` si nécessaire. Affiche les informations d'avertissement du fournisseur (telles que l'abandon ou la migration) dans la console.
    2. Si vous utilisez le transport iframe, ajoutez également une nouvelle ligne à ANALYTICS_IFRAME_TRANSPORT_CONFIG dans iframe-transport-vendors.js contenant `"*vendor-name*": "*url*"`
    3. Un exemple dans la référence [exemples / analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html).
    4. Un test dans le fichier [extensions / amp-analytics / 0.1 / test / vendor-requests.json](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json).
    5. Ajoutez votre service d'analyse à la liste des fournisseurs pris en charge dans le fichier [extensions / amp-analytics / 0.1 / analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./analytics-vendors-list.md). Incluez le type, la description et le lien vers votre documentation d'utilisation.
3. Testez le nouvel exemple que vous avez mis dans [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) pour vous assurer que les résultats de l'exemple fonctionnent comme prévu. Par exemple, que les données nécessaires sont collectées et affichées dans votre tableau de bord analytique.
4. Envoyez une demande tirage avec ce correctif, en faisant référence ticket d'intention d'implémentation.
5. Mettez à jour la documentation d'utilisation de votre service et informez vos clients.
6. Il est fortement recommandé de maintenir [un test d'intégration en dehors du référentiel AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests).

## Gestionnaires de balises <a name="tag-managers"></a>

Les services de gestion des balises proposent deux options pour intégrer AMP Analytics:

- **Approche par point de terminaison:** en servant de point de terminaison supplémentaire à `amp-analytics`, et assurant la gestion du marketing en arrière-plan.
- **Approche par configuration:** gestion des balises via un fichier de configuration JSON généré dynamiquement et unique pour chaque éditeur.

L'approche par point de terminaison est la même que l'approche standard détaillée dans la section précédente. L'approche par configuration consiste à créer une configuration unique pour amp-analytics qui est spécifique à chaque éditeur et inclut tous leurs packages d'analyse compatibles. Un éditeur peut inclure la configuration en utilisant une syntaxe similaire à celle-ci:

[sourcecode:html]
<amp-analytics
  config="https://my-awesome-tag-manager.example.com/user-id.json"
></amp-analytics>
[/sourcecode]

Pour adopter cette approche, consultez la documentation sur l'intégration d'AMP Analytics par les éditeurs.

## Autres ressources <a name="further-resources"></a>

- Approfondissement: [Pourquoi ne pas simplement utiliser une iframe?](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/why-not-iframe.md)
- Approfondissement: [Gérer l'état des utilisateurs non authentifiés avec AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)
- [amp-analytics sample](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- documentation de référence [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- documentation de référence sur les [variables amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)
