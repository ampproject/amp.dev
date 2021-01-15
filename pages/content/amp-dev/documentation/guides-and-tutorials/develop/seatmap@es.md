---
"$title": Cómo crear un mapa de asientos
"$order": '104'
description: Los mapas de asientos son una parte importante de las aplicaciones web para emitir boletos, pero puede ser complicado implementarlos en AMP. Continúe leyendo para saber cómo implementar un mapa de asientos en AMP.
tutorial: 'true'
formats:
- websites
author: kul3r4
contributors:
- pbakaus
---

Los mapas de asientos son una parte importante de las aplicaciones web para emitir boletos, pero puede ser complicado implementarlos en AMP. Continúe leyendo para saber cómo implementar un mapa de asientos en AMP mediante una combinación de los componentes que están disponibles en AMP.

[tip] Un ejemplo en vivo para implementar las prácticas que se describen a continuación está disponible [aquí](../../../documentation/examples/documentation/SeatMap.html). [/tip]

## Componentes que son necesarios en AMP

Comencemos por revisar los componentes que se necesitan:

### amp-pan-zoom

[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) permite tener un enfoque panorámico y un acercamiento del contenido al tocar y presionar dos veces. Este componente sirve de base para implementar el mapa de asientos.

### amp-list

[`amp-list`](../../../documentation/components/reference/amp-list.md) recupera el contenido de forma dinámica desde un endpoint de CORS JSON y lo renderiza mediante la plantilla que se le proporciona. Se utiliza para obtener la disponibilidad actual en los mapas de asientos y de esta forma los usuarios siempre recibirán la información más reciente.

### amp-bind

[`amp-bind`](../../../documentation/components/reference/amp-bind.md) agrega interacciones a la página. Es necesario para mantener un registro de cuántos asientos se han seleccionado.

### amp-selector

[`amp-selector`](../../../documentation/components/reference/amp-selector.md) es un control que muestra un menú de opciones y permite que el usuario elija entre ellas. Todo el mapa de asientos puede considerarse un menú de opciones en el que cada asiento representa una opción. También hace que sea mucho más sencillo diseñar el estado para los asientos que fueron seleccionados, debido a que le permite utilizar expresiones CSS. Por ejemplo, en la siguiente expresión se utiliza el color naranja para indicar que un asiento está ocupado después de que se seleccionó.

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## Requisitos

1. Para dibujar un mapa de asientos similar a un SVG, donde cada asiento esté representado por un elemento `rect`, necesitará la siguiente información sobre cada asiento: posición de `x` y `y`, `ancho` y `alto` y posiblemente `rx` y `ry` para completar las esquinas de los rectángulos.
2. Un identificador único para cada asiento, que pueda utilizarse para hacer la reservación.
3. Las medidas completas de ancho y alto que tendrá el mapa de asientos para utilizarlas en el atributo `viewbox`.

## Cómo dibujar el mapa de asientos

El mapa de asientos se renderiza mediante [`amp-list`](../../../documentation/components/reference/amp-list.md) y [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md). Después de recibir los datos provenientes de la llamada [`amp-list`](../../../documentation/components/reference/amp-list.md), puede utilizar dichos datos para iterar a través de los asientos:

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## Cómo diseñar los asientos que no están disponibles

En el ejemplo anterior, `{% raw %}{{unavailable}}{% endraw %}` son valores de un campo que regresó mediante el endpoint de JSON y se utilizaron para diseñar un asiento que no está disponible. Este enfoque no le permite eliminar ciertos atributos como `option="{{id}}"` en caso de que un asiento no esté disponible, ya que la plantilla no puede envolver a todos los elementos de las páginas `<html>`.

Como alternativa, un enfoque más detallado consiste en repetir las etiquetas de la siguiente forma:

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## Cómo determinar el tamaño de su mapa de asientos

Salvo que el tamaño de su mapa de asientos ya esté establecido, es difícil determinar el tamaño del [`amp-list`](../../../documentation/components/reference/amp-list.md) que contiene el mapa de asientos. [`amp-list`](../../../documentation/components/reference/amp-list.md) necesita que las dimensiones ya estén establecidas, o bien utilizar `layout="fill"` (para usar el espacio que esté disponible en el depósito principal). Sin embargo, existen dos formas de solucionar este problema:

1. Calcular el espacio disponible en la página considerando que se conoce el espacio utilizado por otros componentes como los encabezados y los pies de página. Este cálculo puede hacerse en CSS utilizando la expresión `calc` y asignando `min-height` desde alguna de las secciones principales de [`amp-list`](../../../documentation/components/reference/amp-list.md).
2. Utilizar un diseño flexible cuando se conozca la altura del diseño de la página.

## Estilo amp-pan-zoom

Si utiliza el enfoque que se describió en la sección anterior, [`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) también necesita utilizar `layout="fill"`.

[tip type="tip"] **CONSEJO –** Si desea mantener algunos espacios en blanco alrededor del mapa de asientos y que aun así formen parte del área para tocar y hacer zoom, haga lo siguiente:

- Agregue una división en la envoltura para el SVG
- Agregue la propiedad padding

Si no cuenta con una división en la envoltura y en su lugar le agrega un margen al SVG, esto no hará que los márgenes formen parte del área para tocar y hacer zoom. [/tip]

## Cómo controlar el estado

Cuando los usuarios hacen clic en diferentes asientos, es posible hacer un seguimiento del `id` de los asientos seleccionados mediante una variable utilizando `amp-state`, ya sea:

- Agregando una expresión [`amp-bind`](../../../documentation/components/reference/amp-bind.md) para cada asiento con el fin de incluir el asiento que se seleccionó en una lista.
- O usando [`amp-selector`](../../../documentation/components/reference/amp-selector.md) con la acción  `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` para que todos los asientos seleccionados se agreguen a una lista.

Aunque el primer enfoque no necesita del componente adicional [`amp-selector`](../../../documentation/components/reference/amp-selector.md), este puede hacer que el mapa de asientos sea muy lento porque todas las expresiones [`amp-bind`](../../../documentation/components/reference/amp-bind.md) serán evaluadas cuando se seleccione/anule cada asiento.

Además, en el segundo enfoque también se le permitirá reducir la duplicación de la expresión [`amp-bind`](../../../documentation/components/reference/amp-bind.md) por cada asiento que será renderizado por la plantilla.

## Estructura final del HTML

Como referencia, aquí puede consultar el HTML final para el mapa de asientos:

[sourcecode:html]
{% raw %}<div class="seatmap-container">
  <amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
    <template type="amp-mustache">
      <amp-pan-zoom layout="fill" class="seatmap">
        <amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
          <div class="svg-container">
            <svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
            {{#seats}}
              <rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
            {{/seats}}
            </svg>
          </div>
        </amp-selector>
      </amp-pan-zoom>
    </template>
  </amp-list>
</div>{% endraw %}
[/sourcecode]
