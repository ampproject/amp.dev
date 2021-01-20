---
$title: CSS compatibles
---

Comme toutes les pages Web, les pages AMP utilisent le langage CSS pour les styles, mais vous ne pouvez pas référencer des feuilles de style externes (à l'exception des [polices personnalisées](#the-custom-fonts-exception)).
Certains styles sont également interdits en raison de conséquences sur les performances ; les attributs de style intégrés ne sont pas autorisés.

Tous les styles doivent se trouver dans l'en-tête du document (voir [Ajouter des styles à une page](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)).
Cependant, vous pouvez utiliser des préprocesseurs CSS et des modèles pour créer des pages statiques afin de mieux gérer votre contenu.

**Remarque** : Les composants AMP ont des styles par défaut pour faciliter la création de pages responsives.
Ces styles sont définis dans l'[`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css).

## Utiliser les préprocesseurs CSS <a name="using-css-preprocessors"></a>

La sortie générée par des préprocesseurs fonctionne aussi bien avec les pages AMP qu'avec les autres pages Web.
Par exemple, le site [amp.dev](https://amp.dev/) utilise [Sass](http://sass-lang.com/).
Nous utilisons [Grow](http://grow.io/) pour créer les pages AMP statiques qui composent le site [amp.dev](https://amp.dev/).

Lorsque vous utilisez des préprocesseurs, accordez une attention particulière à ce que vous incluez ; chargez seulement ce que vos pages utilisent.
Par exemple, [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) inclut tout le balisage AMP requis et le CSS intégré à partir des fichiers sources `*.scss`.
Il comprend également, entre autres, le script d'élément personnalisé pour [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md), afin que de nombreuses pages sur le site puissent inclure des vidéos YouTube intégrées.

[sourcecode:html] {% raw %}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>AMP Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %} [/sourcecode]

Pour voir comment ce qui précède se traduit en langage AMP HTML formaté, affichez la source de toute page dans [amp.dev](https://amp.dev/).
(Dans Chrome, faites un clic droit, puis sélectionnez `Afficher la source de la page`.)

## Styles interdits

Les styles suivants ne sont pas autorisés dans les pages AMP :

<table>
  <thead>
    <tr>
      <th data-th="Banned style">Style interdit</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Attributs de style intégrés</td>
      <td data-th="Description">Tous les styles doivent être définis dans l'en-tête <code>&lt;head&gt;</code> de la page, au sein d'une balise <code>&lt;style amp-custom&gt;</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!</code>qualificateur important </td>
      <td data-th="Description">Utilisation interdite.
      Il s'agit d'une condition nécessaire pour permettre à l'AMP de faire appliquer les règles de dimensionnement de ses éléments.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel="stylesheet"&gt;</code></td>
      <td data-th="Description">Interdit à l'exception des <a href="#the-custom-fonts-exception">polices personnalisées</a>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code> (sélecteur universel)</td>
      <td data-th="Description">Implications négatives sur les performances ; pourrait être utilisé pour contourner d'autres restrictions de sélection.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">Peut être utilisé pour simuler le sélecteur universel.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Pseudo-sélecteurs, pseudo-classes et pseudo-éléments</td>
      <td data-th="Description">Les pseudo-sélecteurs, pseudo-classes et pseudo-éléments ne sont autorisés que dans les sélecteurs qui contiennent des noms de balises, ces derniers ne devant pas commencer par <code>amp-</code>.
      Exemple correct : <code>a:hover, div:last-of-type</code>
      Exemple incorrect : <code>amp-img:hover, amp-img:last-of-type</code></td>
    </tr>
    <tr>
      <td data-th="Banned style">Noms de classes <code>-amp-</code> et de balises <code>i-amp-</code></td>
      <td data-th="Description">Les noms de classes, dans les feuilles de styles d'auteur, ne peuvent pas commencer par la chaîne <code>-amp-</code>. Ils sont réservés à un usage interne par l'exécution AMP. Il en résulte que la feuille de style de l'utilisateur ne peut pas faire référence à des sélecteurs CSS pour les classes <code>-amp-</code> et les balises <code>i-amp</code>.</td>
    </tr>
  </tbody>
</table>

## Propriétés d'animations et de transitions sur liste blanche <a name="the-custom-fonts-exception"></a>

L'AMP accepte seulement les transitions et les animations de propriétés qui peuvent faire l'objet d'une accélération GPU dans les navigateurs courants.
Le projet AMP accepte actuellement `opacity`, `transform` et `-vendorPrefix-transform`.

Dans les exemples suivants, `<property>` doit être sur liste blanche :

- `transition <property> (Also -vendorPrefix-transition)`
- @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

La propriété `overflow` (et `overflow-y`, `overflow-x`) ne peut pas utiliser le style “auto” ni “scroll”.
Aucun élément défini par l'utilisateur dans un document AMP ne peut avoir une barre de défilement.

## Exception : les polices personnalisées

Les pages AMP ne peuvent pas inclure de feuilles de style externes, à l'exception des polices personnalisées.
Les deux méthodes acceptées pour le référencement des polices personnalisées sont les balises de liens pointant vers les fournisseurs de polices figurant sur liste blanche et l'inclusion de `@font-face`.

Les fournisseurs de polices ne peuvent être sur liste blanche que s'ils adoptent les intégrations CSS uniquement et utilisent le protocole HTTPS. Actuellement, seules ces origines figurent sur liste blanche et sont autorisées à offrir des polices via les balises de liens :

- [https://fast.fonts.net](https://fast.fonts.net)
- [https://fonts.googleapis.com](https://fonts.googleapis.com)

Exemple de balise de lien pointant vers le fournisseur de polices sur liste blanche, Google Fonts :

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Vous pouvez aussi utiliser [`@font-face`](https://developer.mozilla.org/fr-FR/docs/Web/CSS/@font-face).
Les polices incluses via `@font-face` doivent être récupérées via le schéma HTTP ou HTTPS.
