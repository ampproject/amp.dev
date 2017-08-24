---
$title: Mejorar la interactividad
$order: 2
toc: true
---

[TOC]

El código de inicio proporciona una experiencia de usuario bastante básico. Hay un par de maneras en que podemos mejorarlo:

- Añada un indicador que muestre la diapositiva actual y el número total de diapositivas.
- Cuando un usuario selecciona un color de camisa diferente, cambia el carrusel de imagen para mostrar imágenes de camisetas en el color seleccionado.

Antes de la introducción del componente `<amp-bind>`, no era posible añadir funciones como estas. Vamos a tener una experiencia práctica con `<amp-bind>` y añadir estas nuevas características a nuestro código de ejemplo!

## Instalar la extensión `<amp-bind>`

[`<amp-bind>`](/docs/reference/components/amp-bind.html) es un nuevo componente de AMP que ofrece interactividad personalizada a través de enlace de datos y expresiones similares a JS. Para usar `<amp-bind>`, debe instalarlo en la página.

Abra el archivo [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html), y agregue el siguiente script a la lista de componentes de AMP en la sección `<head>` de la página:

```html
<script async custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
```

## Añadir un indicador de diapositiva

`<amp-bind>` funciona vinculando atributos de elementos a expresiones personalizadas. Estas expresiones pueden hacer referencia al "estado" (mutable JSON data). Podemos inicializar este estado a través del componente [`<amp-state>`](/docs/reference/components/amp-bind.html#state) incluido con `<amp-bind>`.

### Inicializar el estado de diapositiva

Vamos a inicializar una variable de estado para realizar un seguimiento del índice de la diapositiva actualmente visualizada en el carrusel de imágenes. Abra [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) y añada lo siguiente a la parte superior del `<body>` de la página (antes del `<header>`):

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

Los datos dentro de los elementos `<amp-state>` son accesibles por su ID asociado. Por ejemplo, podemos referirnos a esta variable con la siguiente expresión:

```javascript
selected.slide // Evaluates to 0.
```

### Actualizar el estado de diapositiva

A continuación, actualizamos esta variable cuando el usuario cambia las diapositivas en el carrusel añadiendo la siguiente acción `"on"` al elemento existente de [`<amp-carousel>`](/docs/reference/components/amp-carousel.html):

```html
<amp-carousel type="slides" layout="fixed-height" height=250 id="carousel"
    on="slideChange:AMP.setState({selected: {slide: event.index}})">
```

Ahora, siempre que la diapositiva mostrada para el `<amp-carousel>` cambie, la acción `AMP.setState` será llamada con el siguiente argumento:

```javascript
{
  selected: {
    slide: event.index
  }
}
```

La expresión `event.index` se evalúa al nuevo índice de diapositivas y la acción `AMP.setState()` fusiona este literal de objeto en el estado actual. Esto reemplaza el valor actual de `selected.slide` con el valor de `event.index`.

{% call callout('Tip', type='success') %}
`AMP.setState()` realiza una fusión profunda de literales de objetos anidados. Para obtener más detalles, consulte la documentación [`<amp-bind>`](https://www.ampproject.org/docs/reference/components/amp-bind.html).
{% endcall %}

### Vincular los elementos indicadores

A continuación, utilicemos esta variable de estado que rastrea la diapositiva mostrada actualmente y creamos un indicador de diapositiva. Busque el elemento indicador de diapositivas (busque `<!-- TODO: "Añadir un indicador de diapositiva" -->`) y agregue los siguientes enlaces a sus elementos secundarios:

```html
<!-- TODO: "Añadir un indicador de diapositiva" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```
`[class]` es un enlace que cambia el atributo de clase y se puede usar para añadir o eliminar clases CSS de cualquier elemento.

**Pruébalo**: ¡Actualice la página y cambie la diapositiva!

Cambiando la diapositiva del carrusel:

1.  Activa el evento `slideChange event` ...
2.  Que llama a la acción `AMP.setState` ...
3.  Que actualiza la variable de estado `selected.slide` ...
4.  ¡Que actualiza el enlace de `[class]` en los elementos del indicador `<span>`!

¡Excelente! Ahora tenemos un indicador de deslizamiento trabajando.

{% call callout('Extra credit', type='success') %}
See if you can add functionality so that when a user taps on a slide's indicator dot, it updates the image carousel with the selected item. As a hint, use the `tap` event and `[slide]` binding on [`<amp-carousel>`](/docs/reference/components/amp-carousel.html).
{% endcall %}

## Change the images in the carousel

It would be nice if we could see images of different shirt colors when we change the selected color. With amp-bind we can do this by binding `[src]` on the `<amp-img>` elements within the `<amp-carousel>`.


### Initialize the SKU state

First, we need to initialize the state data with the image source URLs of each color shirt. Let's do this with a new `<amp-state>` element:

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

This `<amp-state> `element contains a JSON object that maps a shirt identifier string (i.e., a SKU) to the color and image URL of the corresponding shirt. A JSON array would also work here, but using an object allows us to do some more cool stuff that you'll see soon.

Now we can access the image URL via a shirt's identifier. For example, `shirts['10014'].color` evaluates to `"dark green"` and `shirts['10030'].image `returns the image URL for the `"wine"` shirt color.

### Track the selected SKU

If we add another state variable that tracks the selected SKU, we can bind an expression to the `<amp-img>` elements to update their `src` attributes when the selected SKU changes. Add a new `sku` key to the existing `amp-state#selected` element's JSON:

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

### Update the SKU state

Add an "on" action to the [`<amp-selector>`](/docs/reference/components/amp-selector.html) that updates the `selected.sku` variable whenever a new color is selected:

```html
<amp-selector name="color" 
    on="select:AMP.setState({selected: {sku: event.targetOption}})">
```

{% call callout('Tip', type='success') %}
This could also be done by adding `on="tap:AMP.setState(...)` actions to each `<amp-img>` child inside the `<amp-selector>`. One of the great things about `<amp-selector>` is that it simplifies markup in ways like this.
{% endcall %}

### Bind the image elements

Then, add bindings to the [`<amp-img>`](/docs/reference/components/amp-img.html) elements inside the `<amp-carousel>` (look for `<!-- TODO: "Changing images in amp-carousel-->"`):

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img width=200 height=250 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=300 height=375 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=400 height=500 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
```

{% call callout('Nota', type='note') %}
In practice, each image in the carousel would likely have a different `src`. This could be done by replacing the single image with an array of images. For simplicity, this tutorial uses a single image at different magnifications.
{% endcall %}

**Pruébalo**: Refresh the page and select a different color for a shirt. When you do, the carousel's images are updated to show shirts of the selected color.


<div class="prev-next-buttons">
  <a class="button prev-button" href="/es/docs/tutorials/interactivity/get-familiar.html"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="/es/docs/tutorials/interactivity/remote-data.html"><span class="arrow-next">Próximo</span></a>
</div>
