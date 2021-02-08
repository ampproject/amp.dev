---
'$title': Ajouter des carrousels
$order: 3
description: "Les carrousels constituent une autre caractéristique commune des pages mobiles. Vous pouvez facilement ajouter des carrousels aux pages AMP à l'aide du composant amp-carousel."
---

Les carrousels constituent une autre caractéristique commune des pages mobiles. Vous pouvez facilement ajouter des carrousels aux pages AMP à l'aide du composant [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md). Commençons par un exemple simple, comme un carrousel d'images.

## Carrousel d'images simple

N'oubliez pas d'inclure la bibliothèque de composants [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) en **ajoutant** la requête JavaScript suivante dans la section `<head>` de votre document :

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
```

Ensuite, intégrons un simple carrousel d'images avec une mise en page réactive et une largeur et une hauteur prédéfinies. **Ajoutez** ce qui suit à votre page :

```html
<amp-carousel layout="fixed-height" height="168" type="carousel">
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**Actualisez** votre page et vous devriez voir un carrousel :

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Simple images carousel') }}

Le composant [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) peut être configuré de différentes manières. Modifions l'interface utilisateur pour n'afficher qu'une seule image à la fois et rendre la mise en page du carrousel réactive.

Pour ce faire, commencez par **modifier** le `type` du composant [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) du `carrousel` sur `slides`, **modifiez** la `mise en page` en `responsive` et **configurez** la valeur `width` à 300 (en vous assurant qu'il y ait à la fois une valeur `height` et une valeur `width` définies). **Ajoutez** l'attribut `"layout=responsive"` aux enfants [`amp-img`](../../../../documentation/components/reference/amp-img.md) du composant [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

**Rechargez** votre page. Maintenant, au lieu d'une liste déroulante d'éléments, vous verrez un élément à la fois. Essayez de faire **glisser votre doigt** horizontalement pour vous déplacer à travers les éléments. Si vous glissez vers le troisième élément, vous ne pourrez plus balayer.

Ensuite, **ajoutez** l'attribut `loop`. **Actualisez** la page et essayez immédiatement de faire glisser votre doigt vers la gauche. Le carrousel tourne à l'infini.

Enfin, faisons en sorte que ce carrousel soit lu automatiquement à intervalle de 2 secondes. **Ajoutez** l'attribut `autoplay` et l'attribut `delay` avec une valeur de `2000` (par exemple, `delay="2000"`) au composant [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

Votre résultat final devrait ressembler à ceci :

```html
<amp-carousel
  layout="responsive"
  width="300"
  height="168"
  type="slides"
  autoplay
  delay="2000"
  loop
>
  <amp-img
    src="mountains-1.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-2.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-3.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
</amp-carousel>
```

**Actualisez** la page et essayez-la !

[tip type="note"] **REMARQUE -** Vous avez peut-être remarqué que lorsque le composant [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) avait le type `carousel` nous avons utilisé le type de mise en page `fixed-height`. Les types de mise en page pris en charge pour le type `carousel` sont limités. Par exemple, le type `carousel` ne prend pas en charge la mise en page `responsive`. Comme son nom l'indique, les éléments à hauteur fixe prennent l'espace dont ils disposent, mais gardent la hauteur inchangée. Pour les éléments à hauteur fixe, vous devez définir l'attribut `height`, tandis que l'attribut `width` doit être `auto` ou non défini. [/tip]

## Contenu de carrousel mixte

Les carrousels d'images sont excellents, mais que se passe-t-il si nous voulons que des contenus plus complexes apparaissent dans notre carrousel ? Essayons de mélanger un peu les choses en plaçant une annonce, un texte et une image dans un même carrousel. Le composant [`amp-carrousel`](../../../../documentation/components/reference/amp-carousel.md) peut-il vraiment gérer un tel mélange à la fois ? Absolument !

Tout d'abord, **ajoutons** ce style à votre `<style amp-custom>` pour vous assurer que les composants [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) et [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) fonctionnent ensemble en toute sécurité :

```css
amp-fit-text {
  white-space: normal;
}
```

Maintenant, **remplacez** votre carrousel simple par ceci :

```html
<amp-carousel layout="fixed-height" height="250" type="carousel">
  <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

  <amp-ad
    width="300"
    height="250"
    type="doubleclick"
    data-slot="/35096353/amptesting/image/static"
  >
    <div placeholder>This ad is still loading.</div>
  </amp-ad>

  <amp-fit-text width="300" height="250" layout="fixed">
    Big, bold article quote goes here.
  </amp-fit-text>
</amp-carousel>
```

**Actualisez** la page et vous devriez obtenir un résultat similaire à ceci :

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='A carousel of mixed content') }}

Pour en savoir plus, consultez la documentation de référence du composant [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[tip type="note"] **REMARQUE -** Dans notre dernier exemple, vous avez peut-être remarqué que le composant [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) comprenait un enfant `div` avec l'attribut `placeholder`. Plus tôt dans le tutoriel, nous avons rencontré un scénario similaire avec [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) utilisant un `fallback`. Quelle est la différence entre le carcatère de remplacement et la solution de secours (fallback) ? Les éléments `Fallback` apparaissent lorsque le chargement de l'élément parent échoue, c'est-à-dire si aucune annonce n'est disponible. Les éléments `placeholder` apparaissent à la place de l'élément parent pendant son chargement. En un sens, ces éléments terminent le processus de chargement de l'élément parent. Pour en savoir plus, consultez le guide [Caractères de remplacement et solutions de secours](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]
