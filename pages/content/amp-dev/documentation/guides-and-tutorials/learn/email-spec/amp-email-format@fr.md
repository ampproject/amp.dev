---
'$title': Format AMP for Email
$order: 1
formats:
  - email
teaser:
  text: 'Balisage requis '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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

AMP est une technologie connue pour développer des pages Web ultra rapides sur les clients mobiles. AMP est un ensemble de balises HTML soutenues par JavaScript qui active facilement les fonctionnalités en donnant plus de priorité aux performances et à la sécurité. Il existe des [composants AMP](https://amp.dev/documentation/components/) pour tout, des carrousels aux éléments de formulaire réactifs, en passant par la récupération de contenu récent à partir de points de terminaison distants.

Le format des e-mails AMP fournit [un sous-ensemble de composants AMP](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md) que vous pouvez utiliser dans les e-mails. Les destinataires des e-mails AMP peuvent afficher et interagir avec les composants AMP directement dans l'e-mail.

## Balisage requis

Le code suivant représente le balisage minimal pour constituer un e-mail AMP valide :

[sourcecode:html]

<!DOCTYPE html>
<html ⚡4email>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

Un e-mail AMP DOIT

- <a name="dctp"></a>commencer avec le doctype `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a>contenir une balise supérieure `<html ⚡4email>` (`<html amp4email>` est également accepté). [🔗](#ampd)
- <a name="crps"></a>contenir les balises `<head>` et `<body>` (elles sont facultatives en HTML). [🔗](#crps)
- <a name="chrs"></a>contenir une balise `<meta charset="utf-8">` comme premier enfant de la balise head. [🔗](#chrs)
- <a name="scrpt"></a>contenir une balise `<script async src="https://cdn.ampproject.org/v0.js"></script>` dans la balise head. [🔗](#scrpt)
- <a name="boilerplate"></a>contenir le texte standard amp4email (`<style amp4email-boilerplate>body{visibility:hidden}</style>`) à l'intérieur de la balise head afin de masquer initialement le contenu jusqu'à ce que le JS AMP soit chargé. [🔗](#boilerplate)

Le balisage AMPHTML entier ne doit pas dépasser 200 000 octets.

## Structure et rendu <a name="structure-and-rendering"></a>

Les e-mails AMP reposent sur le sous-type <a>MIME</a> standard <code>multipart/alternative</code>, tel que défini dans le [RFC 1521, section 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

_Pour plus d'informations, consultez [Structure et rendu des e-mails AMP](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-structure.md)._

## Composants AMP pris en charge <a name="supported-amp-components"></a>

_Voir [Composants pris en charge dans les e-mails AMP](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md)._

## Exigences HTML <a name="html-requirements"></a>

_Consultez [HTML pris en charge dans les e-mails AMP](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-html.md)._

## Exigences CSS <a name="css-requirements"></a>

### Sélecteurs et propriétés pris en charge <a name="supported-selectors-and-properties"></a>

_Consultez [CSS pris en charge dans les e-mails AMP](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-css.md)._

### Spécification CSS dans un document AMP <a name="specifying-css-in-an-amp-document"></a>

Tous les CSS de tout document AMP doivent être inclus dans une balise `<style amp-custom>` dans l'en-tête ou en tant qu'attributs `style` intégrés.

[sourcecode:html]
...

<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
  amp-img.grey-placeholder {
    background-color: grey;
  }
</style>

...

</head>
[/sourcecode]

Remarque : la balise `<style>` entière ne peut pas dépasser 50 000 octets. Le validateur vérifiera cette condition.

## Dimensions du document <a name="document-dimensions"></a>

- **Largeur optimale** : 800 px ou moins (si la largeur est supérieure, le contenu peut être tronqué de manière inattendue sur certains clients).

- **Hauteur** : variable, le client permet à l'utilisateur de faire défiler le contenu.

## Validation <a name="validation"></a>

Pour vous assurer que vos e-mails répondent aux critères stricts du format AMP for Email, vous pouvez utiliser les outils de validation existants d'AMP.

Voir [Valider les e-mails AMP](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/) pour plus d'informations.

## Confidentialité et sécurité <a name="privacy-and-security"></a>

### Suivi des ouvertures d'e-mails et des interactions <a name="tracking-email-opens-and-interaction"></a>

AMPHTML permet de suivre les ouvertures d'e-mails avec des techniques de suivi des pixels, identiques aux e-mails HTML classiques. Toute demande de données initiée par l'utilisateur auprès de services externes indiquera également que l'utilisateur interagit avec le message. Les clients de messagerie peuvent offrir à leurs utilisateurs la possibilité de désactiver le chargement d'images distantes et d'autres demandes externes.

### Analyses spécifiques à AMP <a name="amp-specific-analytics"></a>

Les techniques d'analyse spécifiques à AMP suivantes ne sont pas prises en charge :

- [AMP `CLIENT_ID`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [Substitution des variables ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### Considérations spécifiques aux composants <a name="component-specific-considerations"></a>

Les requêtes d'images à l'intérieur de [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) ou [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) peuvent indiquer à l'expéditeur que l'utilisateur interagit avec le message.

Les redirections dans [`<amp-form>`](https://amp.dev/documentation/components/amp-form) ne sont pas autorisées à l'exécution.

## Commentaires et assistance <a name="feedback--support"></a>

Pour obtenir de l'aide et des commentaires au sujet des e-mails AMP, veuillez utiliser le canal suivant : [participation continue](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#ongoing-participation)
