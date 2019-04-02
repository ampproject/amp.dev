---
$title: Monetizar tu página AMP con anuncios
---

En esta guía, se incluyen instrucciones y prácticas recomendadas para mostrar anuncios en tus páginas AMP.

## Añadir anuncios a la página

En las páginas que no son AMP (HTML tradicional), si quieres mostrar anuncios, debes incluir un fragmento de JavaScript para servir anuncios de tu red publicitaria.  Por motivos de rendimiento y seguridad, no puedes incluir código JavaScript de terceros en las páginas AMP.  Por lo tanto, para mostrar anuncios en AMP, debes añadir el componente personalizado [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) a tu página AMP.

[tip type="success"]

Consulta la página [AMP By Example para ver una demostración en directo]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) de cómo añadir una etiqueta "amp-ad" a una página AMP.

[/tip]

Veamos los pasos para añadir este componente, que te permitirá mostrar anuncios en tu página AMP.

### Paso 1: Añade la secuencia de comandos "amp-ad"

El componente `<amp-ad>` es una extensión de anuncio personalizada de la biblioteca AMP. Dentro de `<amp-ad>`, se incluye código JavaScript personalizado que se ha diseñado cuidadosamente para optimizar el rendimiento. Para ejecutar el componente `<amp-ad>`, debes añadir el código JavaScript necesario para este componente en la sección `head` de la página AMP:

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

### Paso 2: Añade la etiqueta "amp-ad" a la página AMP

Hay más de 100 [servidores de anuncios y redes publicitarias]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md', locale=doc.locale).url.path}}) que ofrecen integraciones con AMP integradas.  Para añadir un anuncio de una red publicitaria concreta, utiliza la etiqueta `<amp-ad>` y especifica la red con el atributo `type`.

En este ejemplo, vamos a añadir un espacio publicitario para servir anuncios de la red a9:

```html
<amp-ad type="a9">
</amp-ad>
```

### Paso 3: Especifica el tamaño del bloque de anuncios

Añade los atributos `width` y `height` a la etiqueta `<amp-ad>`  para especificar el tamaño del anuncio en la página AMP:

```html hl_lines="2"
<amp-ad type="a9">
   width="300" height="250"
</amp-ad>
```

### Paso 4: Establece los parámetros de la red publicitaria

Cada red utiliza atributos de datos específicos que requieren para servir anuncios.  Consulta la documentación de `<amp-ad>` sobre redes publicitarias y añade los atributos necesarios. En el siguiente ejemplo, la red a9 requiere parámetros adicionales para especificar el tamaño del anuncio, así como otros detalles:

```html hl_lines="3 4 5"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

### Paso 5 (opcional): Utiliza un marcador de posición

En función de la red publicitaria, puedes optar por mostrar un marcador de posición hasta que el anuncio esté disponible para publicarse. Este marcador evita que se muestren espacios en blanco, por lo que mejora la experiencia de usuario.  Para especificar un marcador de posición, añade un elemento secundario con el atributo `placeholder`. [Más información sobre marcadores de posición y respaldos]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}})

```html hl_lines="6"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### Paso 6 (opcional): Utiliza un respaldo

En función de la red publicitaria, puedes optar por mostrar un elemento de respaldo en caso de que no haya ningún anuncio disponible. Para especificar un respaldo, añade un elemento secundario con el atributo `fallback`. [Más información sobre marcadores de posición y respaldos]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}})

```html hl_lines="6"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

¡Enhorabuena! Ya estás publicando anuncios en tu página AMP.

## Servir anuncios AMP HTML de venta directa

El componente [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}).

## Aumentar los datos de segmentación en las solicitudes de anuncio

El mecanismo de servicio de anuncios Fast Fetch incluye la función Real‑Time Config (RTC), que permite a los editores añadir más información de segmentación propia y de terceros que se recupera en el tiempo de ejecución a las solicitudes de anuncio. RTC admite hasta cinco llamadas a servidores de segmentación para cada espacio publicitario concreto. Los resultados se añaden a la solicitud de anuncio.  Para utilizar RTC en tus anuncios, la red publicitaria que utilices debe ser compatible con RTC y Fast Fetch.

Mira este vídeo de YouTube para obtener más información sobre RTC:

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='Mira el vídeo sobre monetización eficaz con AMP mediante las pujas por encabezado.']

También puedes utilizar estos recursos para consultar más información sobre RTC:

*   [Guía de implementación de RTC de AMP para editores](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
*   [Configuración en tiempo real de AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md)

## Prácticas recomendadas

A continuación, se incluyen algunos consejos para maximizar la eficacia de los anuncios en tus páginas AMP.

### Emplazamiento y controles: optimiza la colocación de los anuncios

*   **Coloca el mismo número de anuncios** en las páginas AMP que en el resto para generar el máximo número de ingresos por página.
*   **Coloca el primer anuncio inmediatamente debajo de la primera ventana gráfica** ("mitad inferior de la página") para proporcionar una experiencia de usuario óptima.
*   A menos que utilices archivos CSS avanzados o media queries, **asegúrate de que los bloques de anuncios estén centrados en la página** para ofrecer a los usuarios una experiencia Web móvil óptima.
*   Habilita las [solicitudes de anuncio de varios tamaños](https://github.com/ampproject/amphtml/blob/master/ads/README.md#support-for-multi-size-ad-requests) en el inventario AMP para aumentar la presión en la subasta de anuncios y mejorar los ingresos.

### Demanda y precios: obtén el precio adecuado para tus anuncios

*   **Vende bloques de anuncios de tus páginas AMP en todos los canales de ventas**, incluidos los directos e indirectos, para maximizar la competencia por tu inventario de las páginas AMP.
*   **Establece un precio para el inventario publicitario de las páginas AMP** que sea similar al del inventario de las páginas que no son AMP. Supervisa el rendimiento y ajusta los precios en consecuencia.
*   **Asegúrate de que todos los canales de demanda de anuncios compitan** por el inventario publicitario de tus páginas AMP para maximizar la competencia.

### Tipos de anuncio: publica los mejores tipos de anuncios

*   **Evita las creatividades pesadas,** de acuerdo con las [directrices de IAB](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf).
*   **Evita los intersticiales** u otros formatos de anuncio que provoquen que se reinicie el flujo del contenido al cargar los anuncios.
*   **Optimiza la visibilidad** configurando la estrategia de carga de datos para que se priorice la visibilidad sobre las visualizaciones.
*   **Incluye anuncios en el contenido de vídeo** a través de [reproductores compatibles]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}) o [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) para poder obtener ingresos con todos los tipos de contenido.
*   **Implementa anuncios nativos** para competir con los anuncios de display que utilizan solicitudes de anuncio de varios tamaños. De esta forma, aumentarás la demanda y, al mismo tiempo, proporcionarás a los lectores una experiencia de usuario óptima.

### Innovación: ofrece los productos publicitarios que generan más interacción

*   **Implementa anuncios en páginas AMP complementarias** para generar ingresos incrementales:
    *   [Anuncios en un carrusel]({{g.doc('/content/amp-dev/documentation/examples/documentation/Carousel_Ad.html', locale=doc.locale).url.path}})
    *   [Anuncios en un lightbox]({{g.doc('/content/amp-dev/documentation/examples/documentation/Lightbox_Ad.html', locale=doc.locale).url.path}})
    *   [Anuncios avanzados]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}})
*   **Utiliza formatos nuevos con los anuncios de venta directa** para proporcionar al equipo de ventas productos publicitarios innovadores y de elevado impacto:
    *   [Anuncios fijos]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-sticky-ad.html', locale=doc.locale).url.path}})
    *   [Alfombra voladora]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-fx-flying-carpet.html', locale=doc.locale).url.path}})

## Recursos adicionales

*   [Plantillas de anuncios AMP HTML]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}})
*   [Demostración: cómo añadir el componente `amp-ad` a tu página AMP]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
