---
"$title": Adding carousels
"$order": '3'
description: "Les carrousels constituent une autre caractéristique commune des pages mobiles. Vous pouvez facilement ajouter des carrousels aux pages AMP à l'aide du composant amp-carousel."
---

Les carrousels constituent une autre caractéristique commune des pages mobiles. Vous pouvez facilement ajouter des carrousels aux pages AMP à l'aide du composant [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md). Commençons par un exemple simple, comme un carrousel d'images.

## Simple image carousel

Remember to include the [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) component library by **adding** the following JavaScript request to the `<head>` tag of your document:

```html
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
```

Next, let's embed a simple carousel of images with a responsive layout and a predefined width and height. **Add** the following to your page:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel" >
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**Refresh** your page and you should see a carousel:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Simple images carousel') }}

Le composant [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) peut être configuré de différentes manières. Modifions l'interface utilisateur pour n'afficher qu'une seule image à la fois et rendre la mise en page du carrousel réactive.

Pour ce faire, commencez par **modifier** le `type` du composant [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) du `carrousel` sur `slides`, **modifiez** la `mise en page` en `responsive` et **configurez** la valeur `width` à 300 (en vous assurant qu'il y ait à la fois une valeur `height` et une valeur `width` définies). **Ajoutez** l'attribut `"layout=responsive"` aux enfants [`amp-img`](../../../../documentation/components/reference/amp-img.md) du composant [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

**Reload** your page. Now, instead of a scrolling list of elements you’ll see one element at a time. Try **swiping** horizontally to move through the elements. If you swipe to the third element you won’t be able to swipe any further.

Next, **add** the `loop` attribute. **Refresh** the page and try swiping to the left immediately. The carousel loops endlessly.

Lastly, let’s make this carousel autoplay at a rate of every 2 seconds. **Add** the `autoplay` attribute and the `delay` attribute with a value of `2000` (e.g., `delay="2000"`) to the [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

Your final result should look something like this:

```html
<amp-carousel layout="responsive" width="300" height="168" type="slides" autoplay delay="2000" loop>
  <amp-img src="mountains-1.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168" layout="responsive"></amp-img>
</amp-carousel>
```

**Refresh** the page and give it a spin!

[tip type="note"] **REMARQUE -** Vous avez peut-être remarqué que lorsque le composant [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) avait le type `carousel` nous avons utilisé le type de mise en page `fixed-height`. Les types de mise en page pris en charge pour le type `carousel` sont limités. Par exemple, le type `carousel` ne prend pas en charge la mise en page `responsive`. Comme son nom l'indique, les éléments à hauteur fixe prennent l'espace dont ils disposent, mais gardent la hauteur inchangée. Pour les éléments à hauteur fixe, vous devez définir l'attribut `height`, tandis que l'attribut `width` doit être `auto` ou non défini. [/tip]

## Mixed carousel content

Image carousels are great but what if we want more complex content to appear in our carousel? Let’s try mixing things up a little by placing an ad, some text, and an image all in a single carousel. Can [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) really handle such a mixture all at once? Absolutely!

First, let’s **add** this style to your `<style amp-custom>` to ensure the [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) and [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) components work together safely:

```css
amp-fit-text {
    white-space: normal;
}
```

Now, **replace** your simple carousel with this:

```html
<amp-carousel layout="fixed-height" height="250" type="carousel" >
    <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

    <amp-ad width="300" height="250"
      type="doubleclick"
      data-slot="/35096353/amptesting/image/static">
        <div placeholder>This ad is still loading.</div>
    </amp-ad>

    <amp-fit-text width="300" height="250" layout="fixed">
        Big, bold article quote goes here.
    </amp-fit-text>
</amp-carousel>
```

**Actualisez** la page et vous devriez obtenir un résultat similaire à ceci :

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='A carousel of mixed content') }}

To learn more, see the [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) component reference documentation.

[tip type="note"] **REMARQUE -** Dans notre dernier exemple, vous avez peut-être remarqué que le composant [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) comprenait un enfant `div` avec l'attribut `placeholder`. Plus tôt dans le tutoriel, nous avons rencontré un scénario similaire avec [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) utilisant un `fallback`. Quelle est la différence entre le carcatère de remplacement et la solution de secours (fallback) ? Les éléments `Fallback` apparaissent lorsque le chargement de l'élément parent échoue, c'est-à-dire si aucune annonce n'est disponible. Les éléments `placeholder` apparaissent à la place de l'élément parent pendant son chargement. En un sens, ces éléments terminent le processus de chargement de l'élément parent. Pour en savoir plus, consultez le guide [Caractères de remplacement et solutions de secours](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]
