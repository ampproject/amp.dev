---
'$title': Mejoras en la interactividad
$order: 2
description: 'El código de inicio proporciona una experiencia bastante básica para el usuario. Hay un par de maneras en que podemos mejorarlo - Agregue un indicador que muestre...'
---

El código de inicio proporciona una experiencia bastante básica para el usuario. Hay un par de maneras en que podemos mejorarlo:

- Agregue un indicador que muestre la diapositiva actual y el número total de diapositivas.
- Cuando un usuario selecciona un color de camisa diferente, cambia el carrusel de imagen para mostrar imágenes de camisas en el color seleccionado.

Antes de la introducción del componente [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), no era posible añadir funciones como estas. Veremos una experiencia práctica con [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) y agregaremos estas nuevas características a nuestro código de ejemplo.

## Instalación del componente `amp-bind`

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) es un componente de AMP que permite la interactividad personalizada mediante la vinculación de datos y expresiones similares a JS. Para usar [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), debe instalarlo en la página.

Abra el archivo [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html), y agregue el siguiente script a la lista de componentes de AMP en la sección `<head>` de la página:

```html
<script
  async
  custom-element="amp-bind"
  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
></script>
```

## Adición de un indicador de diapositiva

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) funciona vinculando atributos de elementos a expresiones personalizadas. Estas expresiones pueden hacer referencia al "estado" (mutable JSON data). Podemos inicializar este estado mediante el componente [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) incluido con [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

### Inicialización del estado de la diapositiva

Vamos a inicializar una variable de estado para hacer un seguimiento del índice de la diapositiva que actualmente se visualiza en el carrusel de imágenes. Abra [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) y agregue lo siguiente a la parte superior del `<body>` de la página (antes del `<header>`):

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

Los datos que están dentro de los elementos [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) son accesibles por su ID asociado. Por ejemplo, podemos referirnos a esta variable con la siguiente expresión:

```javascript
selected.slide; // Evaluates to 0.
```

### Actualización del estado de la diapositiva

A continuación, actualizamos esta variable cuando el usuario cambie las diapositivas en el carrusel añadiendo la siguiente acción `"on"` al elemento existente de [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md):

```html
<amp-carousel
  type="slides"
  layout="fixed-height"
  height="250"
  id="carousel"
  on="slideChange:AMP.setState({selected: {slide: event.index}})"
></amp-carousel>
```

Ahora, siempre que la diapositiva mostrada para el [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) cambie, la acción `AMP.setState` será llamada con el siguiente argumento:

```javascript
{
  selected: {
    slide: event.index;
  }
}
```

La expresión `event.index` se evalúa al nuevo índice de diapositivas y la acción `AMP.setState()` fusiona este literal de objeto en el estado actual. Esto reemplaza el valor actual de `selected.slide` con el valor de `event.index`.

[tip type="tip"] **CONSEJO:** `AMP.setState()` realiza una fusión profunda de literales de objetos anidados. Para obtener más detalles, consulte la documentación [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

### Vinculación de los elementos indicadores

A continuación, utilizamos esta variable de estado que rastrea la diapositiva mostrada actualmente y creamos un indicador de diapositiva. Busque el elemento indicador de diapositivas (busque `<!-- TODO: "Add a slide indicator" -->`) y agregue los siguientes enlaces a sus elementos secundarios:

```html
<!-- TODO: "Add a slide indicator" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span : class="current"></span>
  <span :></span>
  <span :></span>
</p>
```

`[class]` es un enlace que cambia el atributo de clase y se puede usar para añadir o eliminar clases CSS de cualquier elemento.

**Pruébelo**: ¡Actualice la página y cambie la diapositiva!

Al cambiar la diapositiva del carrusel:

1. Se activa el evento `slideChange event` ...
2. Que llama a la acción `AMP.setState` ...
3. Que actualiza la variable de estado `selected.slide` ...
4. ¡Que actualiza el enlace de `[class]` en los elementos del indicador `<span>`!

¡Excelente! Ahora tenemos un indicador de deslizamiento trabajando.

[tip type="success"]

Compruebe si puede agregar funcionalidades para que cuando un usuario toque en el punto indicador de una diapositiva, se actualice el carrusel de la imagen con el elemento seleccionado. Como sugerencia, utilice el evento `tap` y el enlace `[slide]` en [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[/tip]

## Cambios en las imágenes en el carrusel

Sería agradable si pudiéramos ver imágenes de camisas de diferentes colores cuando cambiamos el color seleccionado. Con [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) podemos hacer esto uniendo `[src]` en los elementos [`amp-img`](../../../../documentation/components/reference/amp-img.md) dentro del [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

### Inicialización del estado SKU

Primero, necesitamos inicializar los datos del estado con las URL de la fuente de la imagen de cada color de camisa. Hagamos esto con un nuevo elemento `<amp-state>`:

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

Este elemento [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) contiene un objeto JSON que asigna una cadena de identificador de camisa (es decir, una SKU) al URL del color e imagen de la camisa correspondiente. Una matriz JSON también funcionaría aquí, pero el uso de un objeto nos permite hacer algunas cosas más interesantes que veremos pronto.

Ahora podemos acceder a la URL de la imagen con el identificador de la camisa. Por ejemplo, `shirts['10014'].color` se evalúa como `"dark green"` y `shirts['10030'].image` devuelve la URL de la imagen para el color de la camisa `"wine"`.

### Seguimiento del SKU seleccionado

Si agregamos otra variable de estado que rastree la SKU seleccionada, podemos vincular una expresión a los elementos [`amp-img`](../../../../documentation/components/reference/amp-img.md) para actualizar sus atributos `src` cuando cambia el SKU seleccionado. Agregue una nueva clave `sku` al existente `amp-state#selected` del elemento JSON:

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

### Actualización del estado SKU

Agregue una acción "on" al [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) que actualiza la variable `selected.sku` siempre que se seleccione un nuevo color:

```html
<amp-selector
  name="color"
  on="select:AMP.setState({selected: {sku: event.targetOption}})"
></amp-selector>
```

[tip type="tip"] **CONSEJO:** Esto también se puede hacer agregando las acciones `on="tap:AMP.setState(...)` a cada [`amp-img`](../../../../documentation/components/reference/amp-img.md) secundario dentro del [`amp-selector`](../../../../documentation/components/reference/amp-selector.md). Una de las grandes cosas sobre [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) es que simplifica el marcado [/tip]

### Vinculación de los elementos de la imagen

A continuación, agregue vínculos a los elementos [`amp-img`](../../../../documentation/components/reference/amp-img.md):

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

[tip type="tip"] <strong>NOTA:</strong> En la práctica, cada imagen en el carrusel probablemente tendría un `src` diferente. Esto podría hacerse reemplazando la imagen única por una matriz de imágenes. Para simplificar, este tutorial utilice una sola imagen con diferentes ampliaciones. [/tip]

**Pruébelo**: Actualice la página y seleccione un color diferente para una camisa. Cuando lo haga, las imágenes del carrusel se actualizarán para mostrar las camisetas del color seleccionado.
