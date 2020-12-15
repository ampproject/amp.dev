---
"$title": Trabajo con datos remotos
"$order": '3'
description: "¿Qué sucede si los datos vinculables son demasiado grandes o complejos para recuperarse al cargar la página? ¿O qué pasa si cada SKU tiene un precio que tarda..."
toc: 'true'
---

¿Qué sucede si los datos vinculables son demasiado grandes o complejos para recuperarse al cargar la página? ¿O qué pasa si cada SKU tiene un precio que tarda mucho tiempo en buscarse? Buscar precios de SKU para artículos no vistos es un trabajo desperdiciado.

[tip type="success"]

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) admite la obtención de datos remotos mediante su atributo `src`, el cual obtiene JSON desde un extremo de CORS. Esta búsqueda se realiza una vez y en la carga de la página y es útil para garantizar el buen estado de los datos (especialmente cuando se sirve desde una caché).

También puede vincular el atributo `src` para el elemento [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state). Esto significa que una acción del usuario puede activar una recuperación de datos JSON remotos en el estado vinculable de la página.

[/tip]

## Recuperación de los tamaños disponibles para una camisa

Hagamos uso de la capacidad de obtener datos remotos para buscar precios de SKUs en nuestra muestra. Nuestro servidor de desarrollo Express.js en `app.js` ya cuenta con un endpoint `/shirts/sizesAndPrices?shirt=<sku>` que, dado el SKU de una camisa, devuelve los tamaños y el precio disponibles para cada tamaño. Envía la respuesta con un retraso artificial de un segundo para simular la latencia de la red.

Solicitud | Respuesta
--- | ---
`GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}`

De forma similar a los datos JSON que están dentro de los elementos [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state), los datos remotos devueltos por estas recuperaciones se combinan y se encuentran disponibles bajo el atributo <code>id</code> del elemento. Por ejemplo, los datos devueltos de la respuesta de ejemplo anterior se pueden acceder en una expresión:

Expresión | Resultado
--- | ---
`shirts['1001'].sizes['XS']` | `8.99`

### Vinculación de los datos

Ahora, apliquemos esto a nuestro ejemplo de comercio electrónico. Primero vamos a buscar esta información de la camiseta cuando se selecciona un nuevo SKU. Agregue un enlace `[src]` a nuestro elemento `amp-state#shirts`:

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### Indicación de los tamaños no disponibles

A continuación, marque claramente los tamaños no disponibles para un SKU determinado. La clase CSS `"unavailable"` agrega una línea diagonal mediante un elemento -- que podemos agregar a los elementos que están dentro del selector [`amp-selector`](../../../../documentation/components/reference/amp-selector.md)  correspondientes a los tamaños no disponibles:

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

Ahora, vuelva a cargar la página y pruébela. Si selecciona un nuevo SKU (color de camisa), los tamaños no disponibles se tacharán (después de un breve retraso).

### Especificación de los estados iniciales

Sin embargo, hay un pequeño problema con --. ¿Qué ocurre con la camisa negra, el color que se selecciona de manera predeterminada? Necesitaremos agregar los datos del tamaño y precio de la camisa negra a `amp-state#shirts` porque [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) solo se ejecuta como respuesta a una acción explícita del usuario:

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

Y debemos actualizar el estado predeterminado de los elementos relevantes:

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

[tip type="tip"] <strong>NOTA:</strong> [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) no se ejecuta en la carga de la página -- solo como respuesta a una acción explícita del usuario. Esto garantiza que la carga inicial de la página sea consistentemente rápida entre las páginas, independientemente del uso de [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

## Precios variables

Ahora que mostramos correctamente los tamaños disponibles, nos aseguramos de que el precio correcto también se muestre.

Nuestra tienda AMPPAREL es peculiar, ya que el precio de la camisa es específico para el color Y el tamaño. Esto significa que necesitamos una nueva variable para rastrear el tamaño seleccionado por el usuario. Agregue una nueva acción a nuestro elemento [`amp-selector`](../../../../documentation/components/reference/amp-selector.md):

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

Tenga en cuenta que no estamos inicializando el valor de `selectedSize` mediante el elemento `amp-state#selected`. Eso es porque intencionalmente no proporcionamos un tamaño seleccionado de manera predeterminada y, en vez de eso, queremos obligar al usuario a elegir un tamaño.

 [tip type="tip"] **CONSEJO:** `AMP.setState()` puede utilizarse para definir nuevas variables, además de modificar las existentes. Las expresiones evaluarán las variables indefinidas a `null`. [/tip]

Agregue un nuevo elemento `<span>` que enrolle la etiqueta del precio y cambie el texto predeterminado a "--" ya que no hay una selección de tamaño predeterminada.

```html
<h6>PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

¡Y obtenemos precios correctos! Pruébelo.

## Botón habilitado condicionalmente

¡Ya casi terminamos! Vamos a desactivar el botón "Añadir al carrito" cuando el tamaño seleccionado no esté disponible:

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**Pruébelo**:  Si selecciona un tamaño que no está disponible, no podrá agregarlo al carrito.
