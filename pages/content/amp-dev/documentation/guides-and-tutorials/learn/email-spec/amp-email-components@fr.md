---
'$title': AMP pour les composants pris en charge par les e-mails
$order: 3
formats:
  - email
teaser:
  text: 'Voici la liste des composants AMP actuellement pris en charge dans les e-mails AMP. Les composants sont regroupés dans les catégories suivantes :'
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md.
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

Voici la liste des [composants AMP](https://amp.dev/documentation/components/?format=email) actuellement pris en charge dans les e-mails AMP. Les composants sont regroupés dans les catégories suivantes :

- [Contenu dynamique ](#dynamic-content)
- [Mise en page](#layout)
- [Média](#media)

## Contenu dynamique <a name="dynamic-content"></a>

| Élément                                                                                                                                                                               | Description                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<amp-form>`](https://amp.dev/documentation/components/amp-form)                                                                                                                     | Élément de formulaire. L'attribut action-xhr doit être utilisé à la place de l'attribut action standard. Peut être utilisé avec `<template type="amp-mustache">` pour renvoyer une réponse. <br><br> **Remarque :** [la redirection après l'envoi ](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission) n'est pas autorisée.                                                           |
| [`<amp-selector>`](https://amp.dev/documentation/components/amp-selector)                                                                                                             | Widget à sélection multiple à utiliser dans un formulaire.                                                                                                                                                                                                                                                                                                                                                            |
| [`amp-bind`](https://amp.dev/documentation/components/amp-bind) et [`<amp-bind-macro>/code3}`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | Langage de script simple dans AMP qui permet la manipulation d'une machine à états pour les interactions entre éléments. Peut également être utilisé pour ajouter un comportement sur certains événements.<br><br>**Remarque :** il est interdit de le lier à `[href]/code3} ou <code data-md-type="codespan">[src]`. Il est également interdit d'utiliser les actions `AMP.print`, `AMP.navigateTo` et `AMP.goBack`. |
| [`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification)                                                                                      | `<amp-state>` est utilisé pour définir l'état initial utilisé par `amp-bind`.<br><br>**Remarque :** l'attribut `src` n'est actuellement pas pris en charge.                                                                                                                                                                                                                                                           |
| [`<amp-list>`](https://amp.dev/documentation/components/amp-list)                                                                                                                     | Récupère à distance les données JSON qui seront rendues par un [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache).<br><br>**Remarque :** la liaison à l'attribut `[src]` n'est pas autorisée. L'inclusion des informations d'identification de l'utilisateur avec `credentials="include"` est également interdite.                                                                             |
| [`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache)                                                                                             | Modèle de balise Mustache pour rendre les résultats d'un appel `amp-list`.                                                                                                                                                                                                                                                                                                                                            |

## Mise en page <a name="layout"></a>

| Élément                                                                                                                  | Description                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| [Attributs de mise en page](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | Le comportement de la mise en page est déterminé par l'attribut de mise en page.              |
| [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)                                              | Élément d'interface utilisateur qui facilite l'affichage/le masquage de différentes sections. |
| [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel)                                                | Composant d'interface utilisateur carrousel.                                                  |
| [`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text)                                                | Composant d'aide pour ajuster le texte dans une certaine zone.                                |
| [`<amp-layout>`](https://amp.dev/documentation/components/amp-layout)                                                    | Conteneur qui peut avoir des mises en page réactives basées sur les proportions.              |
| [`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar)                                                  | Barre latérale à des fins de navigation.                                                      |
| [`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago)                                                  | Fournit un moyen pratique de renvoyer des horodatages.                                        |

## Média <a name="media"></a>

| Élément                                                           | Description                                                                                         |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [`<amp-img>`](https://amp.dev/documentation/components/amp-img)   | Composant AMP qui remplace `<img>`.<br><br>**Remarque :** la liaison à `[src]` n'est pas autorisée. |
| [`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | Intègre des fichiers GIF.<br><br>**Remarque :** la liaison à `[src]` n'est pas autorisée.           |
