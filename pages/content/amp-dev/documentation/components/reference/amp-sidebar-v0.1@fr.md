---
$category@: layout
formats:
  - websites
  - email
teaser:
  text: >-
    Permet d'afficher du méta contenu destiné à un accès temporaire, tel que des éléments de navigation, des liens des boutons et des menus.
toc: true
$title: amp-sidebar
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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
    <td width="40%"><strong>Description</strong></td>
    <td>
      Une barre latérale permet d'afficher du méta contenu destiné à un accès temporaire (liens de navigation, boutons, menus, etc.). Elle peut être affichée en appuyant sur un bouton, le contenu principal restant alors visible en dessous.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemples</strong></td>
    <td>Consultez l'<a href="https://ampbyexample.com/components/amp-sidebar/">exemple de composant amp-sidebar</a> sur AMP By Example.</td>
  </tr>
</table>

## Aperçu <a name="overview"></a>

`<amp-sidebar>` masque le méta contenu destiné à un accès temporaire (liens de navigation, boutons, menus, etc.). Il peut être ouvert et fermé en appuyant sur un bouton et en appuyant en dehors du composant `<amp-sidebar>`.
Cependant, des attributs facultatifs acceptant les requêtes média peuvent être utilisés pour afficher du méta contenu dans d'autres parties du site. Les éléments `<nav toolbar="(media query)" toolbar-target="elementID">` enfants permettent d'afficher le contenu de la barre latérale dans d'autres parties du contenu principal.

## Comportement <a name="behavior"></a>

* L'élément `<amp-sidebar>` doit être un enfant direct de `<body>`.
* La barre latérale ne peut être affichée que sur le côté gauche ou droit d'une page.
* Le composant `<amp-sidebar>` peut contenir tout élément HTML valide (compatible avec AMP).
* Le composant `<amp-sidebar>` peut contenir l'un des éléments AMP suivants :
    * `<amp-accordion>`
    * `<amp-img>`
    * `<amp-fit-text>`
    * `<amp-list>`
    * `<amp-live-list>`
    * `<amp-social-share>`</li>
* La hauteur maximale de la barre latérale est de 100 vh. Si la hauteur est supérieure à 100 vh, une barre de défilement verticale apparaît. La hauteur par défaut est définie sur 100 vh dans la feuille de style (CSS) et peut être remplacée dans cette feuille.
* La largeur de la barre latérale peut être définie et ajustée à l'aide d'une feuille de style (la largeur minimale est de 45 px).
* Le zoom tactile est désactivé dans le composant `amp-sidebar` et masqué lorsque la barre latérale est ouverte.

*Exemple :*

Dans l'exemple suivant, le composant `amp-sidebar` est utilisé comme conteneur d'éléments de navigation. Cependant, les deuxième et quatrième éléments, Nav Item 2 et Nav Item 4, sont affectés à l'identifiant d'élément qui figure sur la page. L'attribut [`on`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) permet d'effectuer un défilement fluide jusqu'à l'élément, en utilisant l'identifiant d'élément et `scrollTo`.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>
</amp-sidebar>
```

### Ouvrir et fermer la barre latérale <a name="opening-and-closing-the-sidebar"></a>

Pour activer/désactiver, ouvrir ou fermer la barre latérale lorsqu'un utilisateur appuie ou clique sur un élément, définissez l'attribut d'action [`on`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) sur l'élément en question et indiquez l'une des méthodes d'action suivantes :

<table>
  <tr>
    <th>Action</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>ouvrir (par défaut)</td>
    <td>Ouvre la barre latérale</td>
  </tr>
  <tr>
    <td>fermer</td>
    <td>Ferme la barre latérale.</td>
  </tr>
  <tr>
    <td>activer/désactiver</td>
    <td>Change l'état de la barre latérale.</td>
  </tr>
</table>

Si l'utilisateur appuie de nouveau sur la zone de contenu principal partiellement visible, la barre latérale se ferme.

Appuyer sur la touche Échap du clavier a également pour effet de fermer la barre latérale.

*Exemple :*

```html
<button class="hamburger" on='tap:sidebar1.toggle'></button>
<button on='tap:sidebar1'>Open</button>
<button on='tap:sidebar1.open'>Open</button>
<button on='tap:sidebar1.close'>x</button>
```

### Barre d'outils <a name="toolbar"></a>

Vous pouvez créer un élément `toolbar` qui s'affiche dans l'élément `<body>` en spécifiant l'attribut `toolbar` avec une requête média et un attribut `toolbar-target` avec un identifiant d'élément sur un élément `<nav>` qui est l'enfant de `<amp-sidebar>`. `toolbar` duplique l'élément `<nav>` et ses enfants, et ajoute l'élément à `toolbar-target`.

#### Comportement <a name="behavior-1"></a>

* La barre latérale peut mettre en œuvre des barres d'outils en ajoutant des éléments de navigation avec les attributs `toolbar` et `toolbar-target`.
* L'élément de navigation doit être un enfant de `<amp-sidebar>` et respecter le format suivant : `<nav toolbar="(media-query)" toolbar-target="elementID">`.
    * Voici un exemple d'utilisation valide de la barre d'outils : `<nav toolbar="(max-width: 1024px)" toolbar-target="target-element">`.</li>
* L'élément de navigation qui contient l'attribut de barre d'outils ne peut comporter qu'un seul élément `<ul>` contenant, à son tour, des éléments `<li>`.
    * Les éléments `<li>` peuvent contenir tout élément HTML valide (compatible avec AMP) ou des éléments AMP acceptés par `<amp-sidebar>`.</li>
* Le comportement de la barre d'outils s'applique uniquement lorsque la requête média de l'attribut `toolbar` est valide. Pour que la barre d'outils soit appliquée, il faut, en outre, que la page contienne un élément avec l'identifiant d'attribut `toolbar-target`.

*Exemple : Barre d'outils de base*

Dans l'exemple suivant, un élément `toolbar` est affiché si la largeur de la fenêtre est inférieure ou égale à 767 pixels. `toolbar` contient un élément de saisie de termes de recherche. `toolbar` sera ajouté à l'élément `<div id="target-element">`.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Rechercher..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

## Application d'un style à la barre d'outils <a name="styling-toolbar"></a>

Des classes sont appliquées à l'élément `toolbar` à l'intérieur de l'élément `<amp-sidebar>` selon que l'élément `toolbar-target` est affiché ou masqué. Cela s'avère utile pour appliquer différents styles à l'élément `toolbar`, puis à l'élément `toolbar-target`. Ces classes sont `amp-sidebar-toolbar-target-shown` et `amp-sidebar-toolbar-target-hidden`. La classe `amp-sidebar-toolbar-target-shown` est appliquée à l'élément `toolbar` lorsque `toolbar-target` est affiché. La classe `amp-sidebar-toolbar-target-hidden`, en revanche, est appliquée à l'élément `toolbar` lorsque `toolbar-target` est masqué.

*Exemple : Classes d'état de la barre d'outils*

Dans l'exemple suivant, un élément `toolbar` est affiché si la largeur de la fenêtre est inférieure ou égale à 767 pixels. `toolbar` contient un élément de saisie de termes de recherche. `toolbar` sera ajouté à l'élément `<div id="target-element">`. Toutefois, nous avons ajouté des styles personnalisés pour masquer l'élément `toolbar` lorsque `<div id="toolbar-target">` est affiché.

```html
<style amp-custom="">

  .amp-sidebar-toolbar-target-shown {
      display: none;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Rechercher..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

[tip type="success"]
Regardez les démos sur [AMP By Example](https://ampbyexample.com/components/amp-sidebar/).
[/tip]

## Barre latérale pour les stories <a name="sidebar-for-stories"></a>

`amp-sidebar` peut être utilisé dans le [composant](../../../about/stories.html) `amp-story`.

### Comportement <a name="behavior-2"></a>

* L'élément `<amp-sidebar>` doit être un enfant direct de `<amp-story>`.
* Dans le cas des documents AMP standards, la barre latérale est affichée du côté "début", c'est-à-dire à droite pour les langues qui se lisent de gauche à droite et à gauche pour les langues qui se lisent de droite à gauche.
* L'élément `<amp-sidebar>` utilise le blanc comme couleur de fond par défaut et il peut être remplacé dans la feuille de style.
* La largeur maximale de l'élément `<amp-sidebar>` est définie sur `280px` et sur `320px` sur les interfaces pour ordinateur.
* Une icône de menu à trois barres est affichée dans l'interface utilisateur de la story. Elle permet d'ouvrir et de fermer la barre latérale.

Les fonctionnalités et attributs autorisés sont soumis à certaines restrictions afin de fournir une interface utilisateur cohérente à l'échelle de la plate-forme de la story. La section suivante répertorie les fonctionnalités et attributs autorisés pour un élément `amp-sidebar` à l'intérieur d'un composant `amp-story`.

### Attributs autorisés <a name="allowed-attributes"></a>

* [layout](#layout)
* [data-close-button-aria-label](#data)
* [common attributes](#common)

*Exemple : Barre latérale de base dans une story*

L'exemple suivant illustre un élément `amp-sidebar` simple dans un composant `amp-story`.

```html
...
<body>
  <amp-story standalone>
  <amp-sidebar id="sidebar1" layout="nodisplay">
    <ul>
      <li><a href="https://amp.dev"> External Link </a></li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
    </ul>
  </amp-sidebar>
  <amp-story-page id="cover">
    <amp-story-grid-layer template="fill">
      <h1>Hello World</h1>
      <p>This is the cover page of this story.</p>
    </amp-story-grid-layer>
  </amp-story-page>
  ...
</body>
```

## Attributs <a name="attributes"></a>

##### side <a name="side"></a>

Indique le côté de la page à partir duquel la barre latérale doit s'ouvrir : `left` ou `right`.  Si aucun côté n'est spécifié, la valeur `side` est héritée de l'attribut `dir` de la balise `body` (`ltr` => `left` , `rtl` => `right`) ; en l'absence d'attribut `dir`, l'attribut `side` est défini, par défaut, sur `left`.

##### layout <a name="layout"></a>

Indique la disposition d'affichage de la barre latérale, qui doit être `nodisplay`.

##### open <a name="open"></a>

Cet attribut est présent lorsque la barre latérale est ouverte.

##### data-close-button-aria-label <a name="data"></a>

Attribut facultatif utilisé pour définir le libellé ARIA du bouton de fermeture ajouté à des fins d'accessibilité.

##### toolbar <a name="toolbar-1"></a>

Cet attribut est présent sur les éléments `<nav toolbar="(media-query)" toolbar-target="elementID">` enfants et accepte une requête média relative au moment d'affichage de la barre d'outils. Pour plus d'informations sur l'utilisation des barres d'outils, consultez la section [Barre d'outils](#toolbar-1).

##### toolbar-target <a name="toolbar-target"></a>

Cet attribut est présent sur l'élément `<nav toolbar="(media-query)" toolbar-target="elementID">` enfant et accepte un identifiant d'un élément sur la page.  L'attribut `toolbar-target` place la barre d'outils dans l'identifiant spécifié de l'élément sur la page, sans le style de barre d'outils par défaut. Pour plus d'informations sur l'utilisation des barres d'outils, consultez la section [Barre d'outils](#toolbar-1).

##### common attributes <a name="common"></a>

Cet élément inclut des [attributs communs](../../../documentation/guides-and-tutorials/learn/common_attributes.md) étendus aux composants AMP.

## Application d'un style <a name="styling"></a>

Un style peut être appliqué au composant `amp-sidebar` à l'aide d'une feuille de style (CSS) standard.

* L'attribut `width` du composant `amp-sidebar` peut être défini de manière à ajuster la largeur entre les valeurs minimale (45 px) et maximale (80 vw) prédéfinies.
* Si nécessaire, la hauteur du composant `amp-sidebar` peut être définie afin d'ajuster la hauteur de la barre latérale. Si la valeur de hauteur est supérieure à 100 vw, la barre latérale est accompagnée d'une barre de défilement verticale. La hauteur prédéfinie de la barre latérale est de 100 vw ; cette valeur peut être réduite dans la feuille de style.
* L'état actuel de la barre latérale est affiché au moyen de l'attribut `open` défini dans la balise `amp-sidebar` lorsque la barre latérale est ouverte sur la page.

[tip type="success"]
Rendez-vous sur [AMP Start](https://ampstart.com/components#navigation) pour consulter des menus de navigation responsifs prédéfinis que vous pouvez utiliser dans vos pages AMP.
[/tip]

## Défilement automatique dans les zones de dépassement de capacité <a name="auto-scrolling-within-overflowing-areas"></a>

`amp-sidebar` peut faire défiler automatiquement le conteneur de dépassement de capacité jusqu'au premier élément décoré avec `autoscroll` en tant qu'attribut dans la barre latérale et dans la barre d'outils.

Cette fonctionnalité est utile lorsque vous utilisez une longue liste de navigation et que vous souhaitez que la barre latérale défile jusqu'aux éléments de navigation en cours lors du chargement de la page.

Lorsque la fonctionnalité `toolbar` est utilisée, `autoscroll` ne fonctionne que si l'élément `<nav toolbar>` est défini sur `overflow: auto` ou `overflow: scroll`.

```html
<style amp-custom="">

  nav [toolbar] {
    overflow: auto;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>Nav item 1</li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
      <li autoscroll class="currentPage">Nav item 4</li>
      <li>Nav item 5</li>
      <li>Nav item 6</li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

Consultez [cet exemple de fichier](https://github.com/ampproject/amphtml/blob/main/examples/amp-sidebar-autoscroll.amp.html) pour obtenir un exemple de code opérationnel.

## Considérations relatives à l'expérience utilisateur <a name="ux-considerations"></a>

Lorsque vous utilisez `<amp-sidebar>`, gardez à l'esprit que vos utilisateurs consulteront fréquemment votre page sur mobile dans un lecteur AMP, lequel peut afficher un en-tête fixe. De plus, les navigateurs affichent souvent leur propre en-tête fixe en haut de la page. L'ajout d'un autre élément fixe en haut de l'écran occuperait une grande quantité d'espace sur l'écran du mobile, sans que cela n'apporte de nouvelles informations pour l'utilisateur.

Pour cette raison, nous vous recommandons de ne pas placer les éléments invitant à ouvrir la barre latérale dans un en-tête pleine largeur fixe.

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-sidebar](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/validator-amp-sidebar.protoascii) dans les spécifications du validateur AMP.
