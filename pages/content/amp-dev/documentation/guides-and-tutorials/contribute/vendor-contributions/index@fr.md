---
'$title': Intégrez votre technologie dans AMP
$order: 0
'$hidden': 'true'
description: "Si vous êtes un fournisseur de technologie pour éditeurs ou annonceurs sur le Web, nous vous invitons à ajouter la prise en charge d'AMP afin que vos clients puissent continuer de tirer parti de votre technologie et ..."
formats:
  - websites
  - ads
  - stories
  - email
---

Merci de vouloir contribuer à AMP! Nous apprécions votre participation à faire du Web une plateforme qui met l'utilisateur à l'avant.

Les éditeurs ont créé plus de 1,4 milliard de documents AMP, hébergés sur plus de 750 000 domaines uniques. Une telle croissance n'est possible que grâce au soutien de plus de 100 entreprises technologiques tierces, qui ont déjà intégré AMP.

Si vous êtes un fournisseur de technologie pour éditeurs ou annonceurs sur le Web, nous vous invitons à ajouter la prise en charge d'AMP! Vos clients peuvent continuer à tirer parti de votre technologie tout en travaillant à réaliser notre vision qui est celle d'améliorer le Web.

Ce document décrit les attentes AMP pour les tiers et définit les niveaux de contribution.

# Directives de contribution

Toutes les contributions générales sont soumises aux [directives universelles AMPHTML répertoriées dans le fichier CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md). Les contributeurs tiers doivent procéder à des tests, maintenances et mises à jour de leurs contributions à divers degrés.

Pour être admissibles à l'inclusion, tous les niveaux de contribution doivent:

- Répondre aux [exigences de notabilité du Wikipedia anglais](https://en.wikipedia.org/wiki/Wikipedia:Notability).
- Avoir un niveau de service égal voire supérieur à celui promis par AMP aux éditeurs et aux utilisateurs.
- Être de bonne qualité.
- Créer un canal d'assistance pour leurs clients.
- Fournir une bonne couverture de test d'intégration pour les versions de production et canary d'AMP.
- Accomplir un objectif qui n'existe pas.

Il existe 3 niveaux de contribution tiers. Ces niveaux dépendent de la quantité de logique ajoutée:

- Logique de composant: code qui dicte les caractéristiques et fonctionnalités principales du composant AMP.
- Logique de tiers: code spécifique au tiers. Cette logique permet au composant d'exploiter le service tiers.

Plus il y a de logique ajoutée au référentiel AMP, en particulier la logique spécifique au tiers, plus cela augmente le niveau de contribution. Un niveau de contribution élevé nécessite plus d'engagement de la part du tiers.

Les contributions de niveau 1 et de niveau 2 partagent des composants entre des tiers. Si un composant remplit un objectif similaire à celui de votre entreprise, envisagez de réutiliser ce composant. Cela nécessite beaucoup moins d'efforts et peut être maintenu plus longtemps.

Après avoir décidé quel niveau de contribution correspond à votre cas d'utilisation, ouvrez un [ticket GitHub](https://github.com/ampproject/amphtml/issues/new) pour commencer.

## Contribution de niveau 1

Les contributions de niveau 1 exploitent la logique des fonctionnalités des composants existants. Elles chargent une logique spécifique au tiers en tant que JavaScript personnalisé dans une iframe d'origine croisée. Par exemple, de nombreux réseaux publicitaires fournissent des annonces via le composant [`amp-ad`](../../../components/reference/amp-ad.md), mais contrôlent le rendu des annonces selon leur propre logique.

Les tiers ajoutent des configurations ou des fonctionnalités aux extensions existantes, à l'aide des API fournies, pour implémenter leurs fonctionnalités. Si un tel composant n'existe pas, ils peuvent en proposer un nouveau.

La seule logique spécifique au tiers archivée dans le référentiel AMP est une configuration tierce. L'ajout d'un nouveau tiers à une contribution de niveau 1 existante ne nécessite généralement pas de vérifier la conception. Les tiers peuvent consulter la documentation sur l'intégration des composants, telle que la section [Intégration de réseaux publicitaires dans AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

### Attentes envers les tiers

- Maintenir et exécuter le JavaScript personnalisé du fournisseur indépendamment.
- Fournir des tests pour leur configuration et répondre aux problèmes.
- Fournir un canal d'assistance pour les développeurs.
- Répondez à tous les tickets de bogues liés à leur service.

### Exemple de niveau 1

[**amp-ad**](../../../components/reference/amp-ad.md)

Les fournisseurs d'annonces doivent lire les sections [Vue d'ensemble du développement](https://github.com/ampproject/amphtml/tree/master/ads#overview) et [Instructions pour développeurs](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request) pour ajouter votre prise en charge à [`amp-ad`](../../../components/reference/amp-ad.md). En fonction de la technologie publicitaire fournie par votre entreprise, vous pourriez trouver [ces instructions d'intégration ](/content/amp-dev/documentation/guides-and-tutorials/contribute/vendor-contributions/ad-integration-guide.md?format=ads)utiles.

De nombreux fournisseurs de publicité ont ajouté la prise en charge des fonctionnalités liées à la publicité telles que amp-ad. Voici un [exemple de demande de tirage](https://github.com/ampproject/amphtml/pull/2299) du réseau publicitaire [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md) .

## Contribution de niveau 2

Les contributions de niveau 2 tirent parti de la logique des fonctionnalités des composants existants. Toute la logique est archivée dans le référentiel AMP et aucun Javascript personnalisé ne peut être chargé dans une iframe. Par exemple, les fournisseurs d'analyse ajoutent leurs configurations au composant [`amp-analytics`](../../../components/reference/amp-analytics.md), mais incluent le point de terminaison pour suivre les données, telles que les clics des utilisateurs.

Les tiers ajoutent des configurations ou des fonctionnalités, telles que de nouvelles API, aux composants existants pour implémenter leurs fonctionnalités. Si un tel composant n'existe pas, ils peuvent en proposer un nouveau.

Toute la logique métier est archivée dans le référentiel AMP, mais la seule logique spécifique au tiers enregistrée est une configuration tierce. Si le composant fonctionne avec un fichier de configuration fourni par un tiers, aucune vérification de conception n'est nécessaire. Si la configuration tierce implémente une nouvelle fonctionnalité ou un nouveau composant, elle devra passer la vérification de conception d'AMP.

### Attentes des tiers

- L'ajout d'un nouveau service tiers à une contribution de niveau 2 existante ne nécessite généralement pas de vérification de la conception. Le tiers peut suivre la documentation liée à ce composant.
- La proposition d'un nouveau composant pour la contribution de niveau 2 devra avoir une logique de fonctionnalité qui puisse être partagée par d'autres services tiers.

### Exemples de niveau 2

[**amp-analytics**](../../../components/reference/amp-analytics.md)

L'analyse AMP vous permet de renvoyer des événements à votre serveur en fonction des déclencheurs que vous avez configurés. Nous avons rédigé un [guide d'intégration d'analyse ](../../optimize-measure/configure-analytics/index.md)pour vous aider à vous lancer.

Si vous avez uniquement besoin d'ajouter un pixel de suivi avec des paramètres dynamiques à votre URL de suivi, consultez [`amp-pixel`](../../../components/reference/amp-pixel.md). Assurez-vous de documenter l'utilisation sur vos pages de support pour les développeurs souhaitant utiliser votre technologie avec AMP.

Certains fournisseurs d'analyse ont ajouté la prise en charge d'amp-analytics. Voici un [exemple de demande de tirage](https://github.com/ampproject/amphtml/pull/1595) du fournisseur d'analyse [Parse.ly](https://www.parsely.com/help/integration/google-amp/).

[**amp-call-tracking**](../../../components/reference/amp-call-tracking.md)

Si vous fournissez des services de mesure de suivi des appels, votre cas d'utilisation peut être pris en charge par [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md). Ce composant dynamique remplace un numéro de téléphone dans un lien hypertexte pour permettre le suivi des appels, en exécutant une requête CORS pour remplacer le numéro.

Pour en savoir plus sur la façon dont ce composant peut fonctionner pour vous, veuillez consulter la [documentation de référence](../../../components/reference/amp-call-tracking.md).

## Contribution de niveau 3

Une contribution de niveau 3 introduit un nouveau composant spécifique au tiers. Ceci n'est valable que si les tiers ne sont pas en mesure de:

- Trouver un composant qui existe pour leur cas d'utilisation.
- Demander des améliorations de fonctionnalités pour répondre à leur cas d'utilisation.
- Proposer un composant qui s'applique à d'autres services tiers.

### Attentes des tiers

- Rédiger et proposer une revue de conception.
- Les tests doivent pouvoir réparer le défaut.
- Corriger ou demander de l'aide en cas de défaut de composant.
- Fournir de la documentation avec des exemples de code.
- Maintenir et mettre à jour la documentation.
- Fournir un canal d'assistance aux développeurs AMP pour demander de l'aide.
