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

Tip: `AMP.setState()` realiza una fusión profunda de literales de objetos anidados. Para obtener más detalles, consulte la documentación [`<amp-bind>`](/docs/reference/components/amp-bind.html).

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

[tip type="success"]

Compruebe si puede agregar funcionalidad para que cuando un usuario toque en el punto indicador de una diapositiva, actualice el carrusel de imagen con el elemento seleccionado. Como sugerencia, utilice el evento `tap` y el enlace `[slide]` en [`<amp-carousel>`](/docs/reference/components/amp-carousel.html).

[/tip]

## Cambiar las imágenes en el carrusel

Sería agradable si pudiéramos ver imágenes de diferentes colores de camisa cuando cambiamos el color seleccionado. Con amp-bind podemos hacer esto uniendo `[src]` en los elementos `<amp-img>` dentro del `<amp-carousel>`.


### Inicializar el estado SKU

Primero, necesitamos inicializar los datos del estado con las URL de la fuente de la imagen de cada camisa del color. Hagamos esto con un nuevo elemento `<amp-state>`:

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
Este elemento `<amp-state>` contiene un objeto JSON que asigna una cadena de identificador de camisa (es decir, una SKU) al URL de color e imagen de la camisa correspondiente. Una matriz JSON también funcionaría aquí, pero el uso de un objeto nos permite hacer algunas cosas más interesantes que veremos pronto.

Ahora podemos acceder a la URL de la imagen con el identificador de la camiseta. Por ejemplo, el `shirts['10014'].color` se evalúa como `"dark green"` y la `shirts['10030'].image` devuelve la URL de la imagen para el color de la camisa `"wine"`.

### Seguimiento del SKU seleccionado

Si añadimos otra variable de estado que rastrea la SKU seleccionada, podemos vincular una expresión a los elementos `<amp-img>` para actualizar sus atributos `src` cuando cambia el SKU seleccionado. Agregue una nueva clave `sku` al existente `amp-state#selected` del elemento JSON:

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

### Actualizar el estado SKU

Agregue una acción "on" al [`<amp-selector>`](/docs/reference/components/amp-selector.html) que actualiza la variable `selected.sku` siempre que se seleccione un nuevo color:

```html
<amp-selector name="color"
    on="select:AMP.setState({selected: {sku: event.targetOption}})">
```

Tip: Esto también se puede hacer agregando las acciones `on="tap:AMP.setState(...)` a cada `<amp-img>` secundario dentro del `<amp-selector>`. Una de las grandes cosas sobre `<amp-selector>` es que simplifica el marcado.

### Vincular los elementos de la imagen

A continuación, agregue enlaces a los elementos [`<amp-img>`](/docs/reference/components/amp-img.html) dentro del `<amp-carousel>` (busque `<!-- TODO: "Cambio de imágenes en amp-carousel"-->`):

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img width=200 height=250 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=300 height=375 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=400 height=500 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
```

Nota: En la práctica, cada imagen en el carrusel probablemente tendría un `src` diferente. Esto podría hacerse reemplazando la imagen única por una matriz de imágenes. Para simplificar, este tutorial utiliza una sola imagen con diferentes ampliaciones.

**Pruébalo**: actualice la página y seleccione un color diferente para una camisa. Cuando lo hace, las imágenes del carrusel se actualizan para mostrar las camisetas del color seleccionado.


<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/get-familiar.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/remote-data.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próximo</span></a>
</div>
