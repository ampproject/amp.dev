---
'$title': Activer les fonctionnalités expérimentales
$order: 3
description: Les composants expérimentaux AMP sont des fonctionnalités publiées qui ne sont pas encore prêtes pour une large utilisation, et sont donc protégées par un statut expérimental.
formats:
  - websites
  - stories
  - ads
---

[Les composants expérimentaux AMP](https://github.com/ampproject/amphtml/tree/master/tools/experiments) sont des fonctionnalités publiées qui ne sont pas encore prêtes pour une large utilisation, et sont donc protégées par un statut expérimental.

Les développeurs et les utilisateurs peuvent choisir d'utiliser ces fonctionnalités avant leur sortie complète. Mais elles doivent être utilisées avec prudence, car elles peuvent contenir des bogues ou avoir des effets secondaires inattendus.

[tip type="important"] Il existe un risque que certaines expériences ne soient jamais livrées en tant que fonctionnalités sur le Projet AMP. [/tip]

{% set experimental_components = g.docs ('/content/amp-dev/documentation/components/reference') | selectattr ('experimental') | list%} {% if experimental_components | length%} Voici une liste de composants qui sont actuellement en état expérimental et sont prêts à être testés par les développeurs pour les premiers commentaires des utilisateurs:

<ul><br>{% for component in experimental_components %}<br>  <li><a href="{{ component.url.path }}">{{ component.title }}</a></li><br>{% endfor %}<br></ul><br>{% endif %}

## Activation d'AMP Dev Channel

AMP Dev CHannel est un moyen d'activer l'utilisation sur un navigateur d'une version plus récente des bibliothèques AMP JS.

La version AMP Dev Channel **peut être moins stable** et contenir des fonctionnalités non disponibles pour tous les utilisateurs. Activez cette option si vous souhaitez aider à tester de nouvelles versions d'AMP, signaler des bogues ou créer des documents qui nécessitent une nouvelle fonctionnalité qui n'est pas encore disponible pour tout le monde.

L'activation de Dev Channel est idéale pour:

- tester et jouer avec de nouvelles fonctionnalités qui ne sont pas encore disponibles pour tous les utilisateurs.
- une utilisation dans l'assurance qualité (QA) pour vous assurer que votre site est compatible avec la prochaine version d'AMP.

Si vous trouvez un problème qui ne semble se produire que dans la version Dev Channel d'AMP, [signalez un problème](https://github.com/ampproject/amphtml/issues/new) avec une description. Incluez toujours une URL vers une page qui reproduit le problème.

Pour activer AMP Dev Channel pour votre navigateur, accédez à [la page des tests AMP](https://cdn.ampproject.org/experiments.html) et activez le test "AMP Dev Channel". Pour être informé des changements importants/récents concernant AMP, abonnez-vous à la liste de diffusion [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce).

## Activer un composant expérimental

#### Fourni depuis cdn.ampproject.org

Pour les contenus fournis depuis `https://*.cdn.ampproject.org`, allez sur `/experiments.html` sur un sous-domaine de Google AMP Cache est activez (ou désactivez) le composant expérimental de votre choix.

Par exemple, pour activer les composants expérimentaux sur les pages AMP mises en cache dont l'origine source est `www.example.com`, allez sur `www-example-com.cdn.ampproject.org/experiments.html`.

L'activation de composants expérimentaux est enregistrée sur `localStorage` et active uniquement le composant expérimental sur les pages AMP fournies depuis le domaine actuel.

#### Fournies à partir d'autres domaines

Pour le contenu diffusé à partir de domaines non CDN, les composants expérimentaux peuvent être activés dans la console devtools à l'aide de:

```js
AMP.toggleExperiment('experiment');
```

Tout fichier AMP qui comprend des fonctionnalités expérimentales échouera à la [validation AMP](validation-workflow/validate_amp.md). Supprimez ces composants expérimentaux pour les documents AMP prêts pour la production.

## Activer un composant expérimental pour un document particulier

Un document peut choisir d'activer des contenus expérimentaux. Pour ce faire, placez une balise meta du nom `amp-experiments-opt-in` dans l'en-tête du document HTML avant votre script AMP (`https://cdn.ampproject.org/v0.js`). Sa valeur de contenu est une chaîne d'ID d'expérimentation séparés par des virgules.

```html
<head>
  ...
  <meta name="amp-experiments-opt-in" content="experiment-a,experiment-b" />
  <!-- The meta tag needs to be placed before the AMP runtime script.-->
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  ...
</head>
```

Ce faisant, les contenus expérimentaux spécifiés seront activés pour tous les visiteurs du document. Cependant, tous les contenus expérimentaux ne sont pas activables par le document. Pour obtenir la liste complète des composants expérimentaux autorisés, consultez l'attribut `allow-doc-opt-in` dans le fichier [`prod-config.json`](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/prod-config.json) du projet. Notez que l'activation par le document peut être annulé par la désactivation par l'utilisateur.

## Essais d'origine

[Les essais d'origine](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md) permettent aux développeurs d'utiliser une fonctionnalité expérimentale en production et de fournir des commentaires essentiels.

Traditionnellement, une fonctionnalité en mode expérimental peut être utilisée dans le développement, mais ne peut pas être poussée en production. Avec les essais d'origine, les développeurs intéressés peuvent choisir de tester une fonctionnalité expérimentale en production, avec les attentes suivantes:

- Le test a une durée limitée.
- La fonctionnalité subira probablement quelques modifications après les essais d'origine.

Les essais d'origine offrent la possibilité de mettre en œuvre et de bénéficier d'une nouvelle fonctionnalité avant qu'elle ne soit totalement opérationnelle. La fonctionnalité vivra sur le site du développeur, et ne sera pas surveillé par un composant expérimental, et les commentaires peuvent directement influencer la direction de la fonctionnalité.

{% set trial_components = g.docs('/content/amp-dev/documentation/components/reference')|selectattr('origin_trial')|list %} {% if trial_components|length %} Les composants de la liste suivante peuvent être actuellement testés via un essai d'origine:

<ul><br>{% for component in trial_components %}<br>  <li><a href="{{ component.url.path }}">{{ component.title }}</a></li><br>{% endfor %}<br></ul><br>{% endif %}

### Activer un essai d'origine

Ajutez la balise `<meta>` suivante dans la section `<head>` de chaque page qui utilise l'expérience d'essai d'origine:

```html
<meta name="amp-experiment-token" content="{copy your token here}" />
```

Remarque: `"amp-experiment-token"` est la chaîne littérale, `"amp-experiment-token"`, et non le jeton lui-même (qui entre dans l'attribut du contenu), ni le nom du composant expérimental.
