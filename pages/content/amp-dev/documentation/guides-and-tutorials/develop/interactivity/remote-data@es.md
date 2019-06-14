---
$title: Trabajar con datos remotos
---

¿Qué sucede si los datos enlazables son demasiado grandes o complejos para recuperarse al cargar la página? ¿O qué pasa si cada SKU tiene un precio que toma mucho tiempo para buscar? Buscar precios de SKU para artículos no vistos es un trabajo desperdiciado.

[tip type="success"]

[`<amp-state>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#state) admite la obtención de datos remotos a través de su atributo `src`, que obtiene JSON desde un extremo de CORS. Esta búsqueda se realiza una vez y en la carga de la página y es útil para garantizar la frescura de los datos (especialmente cuando se sirve desde una caché).

También puede vincular el atributo `src` para el elemento [`<amp-state>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#state). Esto significa que una acción del usuario puede activar una recuperación de datos JSON remotos en el estado vinculable de la página.

[/tip]

## Recogiendo los tamaños disponibles para una camiseta

Hagamos uso de la capacidad de obtener datos remotos para buscar precios de SKUs en nuestra muestra. Nuestro servidor de desarrollo Express.js en `app.js` ya tiene un endpoint `/shirts/sizesAndPrices?shirt=<sku>` que, dado un SKU de camisa, devuelve los tamaños y el precio disponibles para cada tamaño. Envía la respuesta con un retardo artificial de un segundo para simular la latencia de la red.

|  Solicitud                            | Respuesta |
|---------------------------------------|-----------|
| `GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}` |

De forma similar a los datos JSON dentro de los elementos [`<amp-state>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#state), los datos remotos devueltos por estas recuperaciones se combinan y se encuentran disponibles bajo el atributo id del elemento. Por ejemplo, los datos devueltos de la respuesta de ejemplo anterior se pueden acceder en una expresión:

|  Expresión                   | Resultado |
|------------------------------|-----------|
| `shirts['1001'].sizes['XS']` | `8.99`    |

### Enlazar los datos

Ahora, apliquemos esto a nuestro ejemplo de comercio electrónico. Primero vamos a buscar esta información de la camiseta cuando se selecciona una nueva SKU. Agregue un enlace `[src]` a nuestro elemento `amp-state#shirts`:

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### Indicar tamaños no disponibles

A continuación, marque claramente los tamaños no disponibles como tales para un SKU determinado. La clase CSS `"unavailable"` añade una línea diagonal a través de un elemento -- podemos añadirlo a los elementos dentro del selector `[`amp-selector`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-selector.md', locale=doc.locale).url.path}}) name="size"]`  correspondientes a tamaños no disponibles:

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

Ahora, vuelva a cargar la página y pruébela. Si selecciona un nuevo SKU (color de la camisa), los tamaños no disponibles se tacharán (después de un breve retraso).

### Especificar estados iniciales

Hay, sin embargo, un pequeño problema -- ¿qué pasa con la camisa negra, el color seleccionado por defecto? Necesitaremos agregar los datos de tamaño y precio de la camisa negra a `amp-state#shirts` porque [`amp-bind`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}) sólo se ejecuta en respuesta a una acción explícita del usuario:

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

Y, debemos actualizar el estado predeterminado de los elementos relevantes:

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

Nota: [`amp-bind`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}) no se ejecuta en carga de página, -- solo en respuesta a una acción explícita del usuario. Esto asegura que la carga inicial de la página sea consistentemente rápida entre las páginas independientemente del uso de [`amp-bind`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}).

## Precios variables

Ahora que mostramos correctamente los tamaños disponibles, nos aseguramos de que el precio correcto también se muestre.

Nuestra tienda de AMPPAREL es peculiar en que el precio de la camisa es específico para el color Y el tamaño. Esto significa que necesitamos una nueva variable para rastrear el tamaño seleccionado por el usuario. Agregue una nueva acción a nuestro elemento [`amp-selector`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-selector.md', locale=doc.locale).url.path}}):

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

Tenga en cuenta que no estamos inicializando el valor de `selectedSize` a través del elemento `amp-state#selected`. Eso es porque intencionalmente no proporcionamos un tamaño seleccionado por defecto y en lugar de eso queremos obligar al usuario a elegir un tamaño.

[tip type="tip"]
**TIP –** `AMP.setState()` se puede utilizar para definir nuevas variables además de modificar las existentes. Las expresiones evaluarán las variables indefinidas a `null`.
[/tip]

Añada un nuevo elemento `<span>` que enrolle la etiqueta de precio y cambie el texto predeterminado a "---" ya que no hay una selección de tamaño predeterminada.

```html
<h6>PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

Y tenemos precios correctos! Pruébalo.

## Botón habilitado condicionalmente

¡Ya casi hemos terminado! Desactivemos el botón "Añadir al carrito" cuando el tamaño seleccionado no esté disponible:

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**Pruébalo**:  si selecciona un tamaño que no está disponible, no puede agregarlo al carrito.
