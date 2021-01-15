---
"$title": Comment travailler avec des données distantes
"$order": '3'
description: Que faire si vos données pouvant être liées sont trop volumineuses ou complexes pour être récupérées au chargement de la page? Ou que faire si chaque SKU a un prix qui prend un ...
toc: 'true'
---

Que faire si vos données pouvant être liées sont trop volumineuses ou complexes pour être récupérées au chargement de la page? Ou que faire si chaque SKU a un prix qui prend beaucoup de temps à rechercher? La recherche de prix pour les SKU d'articles non consultés est une tâche inutile.

[tip type="success"]

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) prend en charge la récupération de données distantes via son attribut [`src`](../../../../documentation/components/reference/amp-bind.md#attributes) qui récupère JSON à partir d'un point de terminaison CORS. Cette récupération est effectuée une fois, au chargement de la page, et est utile pour assurer que les données restent fraîches (en particulier lorsqu'elles sont servies à partir d'un cache).

Vous pouvez également lier l'attribut `src` pour l'élément [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state). Cela signifie qu'une action utilisateur peut déclencher une extraction de données JSON distantes dans l'état pouvant être lié à la page.

[/tip]

## Récupération des tailles disponibles pour une chemise

Utilisons la possibilité de récupérer des données distantes pour rechercher les prix des SKU dans notre échantillon. Notre serveur de développement Express.js dans `app.js` contient déjà un point de terminaison `/shirts/sizesAndPrices?shirt=<sku>` qui, en fonctions des SKU de chemise, renvoie les tailles disponibles et le prix pour chaque taille. Il envoie la réponse avec un retard artificiel d'une seconde pour simuler la latence du réseau.

Requête | Réponse
--- | ---
`GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}`

Tout comme les données JSON dans les éléments [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state), les données distantes renvoyées par ces extractions sont fusionnées et disponibles sous l'attribut `id` de l'élément. Par exemple, les données renvoyées par l'exemple de réponse ci-dessus sont accessibles dans une expression:

Expression | Résultat
--- | ---
`shirts['1001'].sizes['XS']` | `8.99`

### Comment lier les données

Appliquons à présent cela à notre exemple de commerce en ligne. Commençons par récupérer les données de cette chemise lorsqu'un nouveau SKU est sélectionné. Ajoutez une liaison `[src]` à l'élément `amp-state#shirts`:

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### Comment indiquer les tailles indisponibles

Ensuite, marquons clairement les tailles indisponibles en tant que telles pour un SKU donné. La classe CSS `"unavailable"` ajoute une ligne diagonale à travers un élément; nous pouvons l'ajouter aux éléments dans [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) pour indiquer les tailles non disponibles:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

Maintenant, rechargez la page et essayez. La sélection d'un nouveau SKU (couleur de chemise) entraînera la suppression des tailles indisponibles (après un court délai).

### Comment spécifier les états initiaux

Un léger problème se pose cependant: qu'en est-il de la chemise noire, la couleur sélectionnée par défaut? Nous devrons ajouter les données de taille et de prix de la chemise noire à `amp-state#shirts` car [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) ne s'exécute qu'en réponse à une action explicite de l'utilisateur:

```html
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg",
        "sizes": {
          "XS": 8.99,
          "S": 9.99
        }
      },
<!-- ... -->
```

Et nous devrons mettre à jour l'état par défaut des éléments pertinents:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <!-- Add the 'unavailable' class to the next three <td> elements
           to be consistent with the available sizes of the default SKU. -->
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

[tip type="note"] **REMARQUE -** [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) ne s'exécute pas lors du chargement de la page, mais uniquement en réponse à une action explicite de l'utilisateur. Cela garantit que le chargement initial de la page est toujours rapide sur toutes les pages, quelle que soit l'utilisation de [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) . [/tip]

## Prix de chemises variables

Maintenant que nous affichons correctement les tailles disponibles, assurons-nous que le prix correct s'affiche également.

Notre boutique AMPPAREL est particulière en ce que le prix de la chemise est spécifique à la fois à la couleur ET à la taille. Cela signifie que nous avons besoin d'une nouvelle variable pour tracer la taille sélectionnée par l'utilisateur. Ajoutez une nouvelle action à l'élément de taille [`amp-selector`](../../../../documentation/components/reference/amp-selector.md):

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

Notez que nous n'initialisons pas la valeur de `selectedSize` via l'élément `amp-state#selected`. C'est parce que nous ne fournissons pas intentionnellement une taille sélectionnée par défaut et voulons plutôt obliger l'utilisateur à choisir une taille.

[tip type="tip"] **CONSEIL -** `AMP.setState()` peut être utilisé pour définir de nouvelles variables en plus de modifier celles existantes. Les expressions évalueront les variables non définies comme `null`. [/tip]

Ajoutez un nouvel élément `<span>` enveloppant l'étiquette de prix et remplacez le texte par défaut par « --- » car il n'y a pas de taille sélectionnée par défaut.

```html
<h6>PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

En plus, nos prix sont corrects. Allez essayer.

## Bouton activé conditionnellement

C'est bientôt fini! Désactivons le bouton « Ajouter au panier » lorsque la taille sélectionnée n'est pas disponible:

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**Essayez**:  si vous sélectionnez une taille indisponible, vous ne pourrez pas l'ajouter au panier.
