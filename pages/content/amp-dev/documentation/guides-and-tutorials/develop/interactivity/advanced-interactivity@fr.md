---
'$title': "Comment améliorer l'interactivité"
$order: 2
description: "Le code de démarrage offre une expérience utilisateur assez simple. Il existe plusieurs façons de l'améliorer - Ajouter un indicateur qui affiche le ..."
---

Le code de démarrage offre une expérience utilisateur assez simple. Il existe plusieurs façons de l'améliorer:

- Ajoutez un indicateur qui affiche la diapositive actuelle et le nombre total de diapositives.
- Lorsqu'un utilisateur sélectionne une couleur de chemise différente, modifiez le carrousel d'images pour afficher des images de la chemise dans la couleur sélectionnée.

Avant l'introduction du composant [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), l'ajout de fonctionnalités comme celles-ci n'était pas possible. Menons une expérience pratique avec [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) et ajoutons ces nouvelles fonctionnalités à notre exemple de code!

## Comment installer le composant `amp-bind`

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) est un composant AMP qui offre une interactivité personnalisée via la liaison de données et des expressions de type JS. Pour utiliser [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), vous devez l'installer dans la page.

Ouvrez le fichier [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) et ajoutez le script suivant à la liste des composants AMP dans la section `<head>` de la page:

```html
<script
  async
  custom-element="amp-bind"
  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
></script>
```

## Comment ajouter un indicateur de diapositive

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) fonctionne en liant les attributs d'élément à des expressions personnalisées. Ces expressions peuvent indiquer l'état (données JSON mutables). Nous pouvons initialiser cet état via le composant [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) inclus dans [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

### Comment initialiser l'état de la diapositive

Initialisons une variable d'état pour garder une trace de l'index de la diapositive actuellement affichée dans le carrousel d'images. Ouvrez [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) et ajoutez ce qui suit en haut de la section `<body>` de la page (avant la section `<header>`):

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

Les données des éléments [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) sont accessibles par leur ID associé. Par exemple, nous pouvons faire référence à cette variable par le fragment d'expression suivant:

```javascript
selected.slide; // Evaluates to 0.
```

### Comment mettre à jour l'état d'une diapositive

Ensuite, mettons à jour cette variable lorsque l'utilisateur modifie les diapositives du carrousel en ajoutant l'action `« on »` à l'élément [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) existant:

```html
<amp-carousel
  type="slides"
  layout="fixed-height"
  height="250"
  id="carousel"
  on="slideChange:AMP.setState({selected: {slide: event.index}})"
></amp-carousel>
```

Désormais, chaque fois que la diapositive affichée de [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) change, l'action `AMP.setState` sera appelée avec l'argument suivant:

```javascript
{
  selected: {
    slide: event.index;
  }
}
```

L'expression `event.index` évalue le nouvel index de diapositive et l'action `AMP.setState()` fusionne ce littéral d'objet dans l'état actuel. Cela remplace la valeur actuelle de `selected.slide` par la valeur de `event.index`.

[tip type="tip"] **CONSEIL -** `AMP.setState()` effectue une fusion profonde des littéraux d'objets imbriqués. Pour plus de détails, consultez la documentation [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

### Comment lier les éléments indicateurs

Utilisons ensuite cette variable d'état qui trace la diapositive actuellement affichée et créons un indicateur de diapositive. Recherchez l'élément indicateur de diapositive (recherchez `<!-- TODO: "Add a slide indicator" -->`) et ajoutez les liaisons suivantes à ses enfants:

```html
<!-- TODO: "Add a slide indicator" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

`[class]` est une liaison qui modifie l'attribut `class` et vous pouvez l'utiliser pour ajouter ou supprimer des classes CSS de n'importe quel élément.

**Essayez**: actualisez la page et modifiez la diapositive!

En changeant la diapositive du carrousel, cela:

1. Déclenche `slideChange event` ...
2. Qui appelle l'action `AMP.setState` ...
3. Qui met à jour la variable d'état `selected.slide` ...
4. Qui met à jour la liaison `[class]` sur les éléments d'indicateur `<span>`!

Formidable! Maintenant, nous avons un indicateur de diapositive qui fonctionne.

[tip type="success"]

Voyez si vous pouvez ajouter des fonctionnalités de sorte que lorsqu'un utilisateur appuie sur le point de l'indicateur d'une diapositive, cela met à jour le carrousel d'images avec l'élément sélectionné. À titre indicatif, utilisez l'événement `tap` et la liaison `[slide]` sur [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[/tip]

## Comment modifier les images du carrousel

Ce serait super de pouvoir voir des images de différentes couleurs de chemise lorsque nous changeons la couleur sélectionnée. Avec [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), nous pouvons le faire en liant `[src]` sur les éléments [`amp-img`](../../../../documentation/components/reference/amp-img.md) dans [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

### Comment initialiser l'état du SKU

Tout d'abord, nous devons initialiser les données d'état avec les URL de source d'image de chaque couleur de chemise. Faisons cela avec un nouvel élément [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state):

```html
<!-- Available shirts. Maps unique string identifier to color and image URL string. -->
<amp-state id="shirts">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg"
      },
      "1002": {
        "color": "blue",
        "image": "./shirts/blue.jpg"
      },
      "1010": {
        "color": "brown",
        "image": "./shirts/brown.jpg"
      },
      "1014": {
        "color": "dark green",
        "image": "./shirts/dark-green.jpg"
      },
      "1015": {
        "color": "gray",
        "image": "./shirts/gray.jpg"
      },
      "1016": {
        "color": "light gray",
        "image": "./shirts/light-gray.jpg"
      },
      "1021": {
        "color": "navy",
        "image": "./shirts/navy.jpg"
      },
      "1030": {
        "color": "wine",
        "image": "./shirts/wine.jpg"
      }
    }
  </script>
</amp-state>
```

Cet élément [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) contient un objet JSON qui associe une chaîne d'identifiant de chemise (c'est-à-dire, un SKU) à la couleur et à l'URL de l'image de la chemise correspondante. Un groupe JSON fonctionnerait également ici, mais l'utilisation d'un objet nous permet de faire des choses plus intéressantes que vous verrez bientôt.

Maintenant, nous pouvons accéder à l'URL de l'image via l'identifiant d'une chemise. Par exemple, `shirts['10014'].color` renvoie `« vert foncé »` et `shirts['10030'].image` renvoie l'URL de l'image pour la couleur de chemise `« vin »`.

### Comment tracer le SKU sélectionné

Si nous ajoutons une autre variable d'état qui trace le SKU sélectionné, nous pouvons lier une expression aux éléments [`amp-img`](../../../../documentation/components/reference/amp-img.md) pour mettre à jour leurs attributs `src` lorsque le SKU sélectionné change. Ajoutez une nouvelle clé `sku` au JSON de l'élément `amp-state#selected` existant:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0,
      "sku": "1001"
    }
  </script>
</amp-state>
```

### Comment mettre à jour l'état du SKU

Ajoutez une action « on » à [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) qui met à jour la variable `selected.sku` chaque fois qu'une nouvelle couleur est sélectionnée:

```html
<amp-selector
  name="color"
  on="select:AMP.setState({selected: {sku: event.targetOption}})"
></amp-selector>
```

[tip type="tip"] **ASTUCE -** Cela est également possible en ajoutant des actions `on="tap:AMP.setState(...)` à chaque enfant [`amp-img`](../../../../documentation/components/reference/amp-img.md) dans [`amp-selector`](../../../../documentation/components/reference/amp-selector.md). L'un des principaux avantages de [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) est qu'il simplifie le balisage comme dans ce cas. [/tip]

### Comment lier les éléments de l'image

Ajoutez ensuite des liaisons à [`amp-img`](../../../../documentation/components/reference/amp-img.md):

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img
  width="200"
  height="250"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="300"
  height="375"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="400"
  height="500"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
```

[tip type="note"] **REMARQUE -** En pratique, chaque image du carrousel aura probablement un `src` différent. Cela est aussi faisable en remplaçant l'image unique par un groupe d'images. Pour plus de simplicité, ce didacticiel utilise une seule image à différents agrandissements. [/tip]

**Essayez** : actualisez la page et sélectionnez une couleur différente pour une chemise. Vous verrez que les images du carrousel sont mises à jour pour afficher les chemises dans la couleur sélectionnée.
