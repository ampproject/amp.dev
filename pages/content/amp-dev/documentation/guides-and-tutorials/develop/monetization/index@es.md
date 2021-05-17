---
'$title': Cómo monetizar su página AMP con anuncios
$order: 0
description: En esta guía se proporcionan instrucciones y prácticas recomendadas para mostrar anuncios en sus páginas AMP. Por ejemplo, para mostrar los anuncios en AMP, debe agregar el componente personalizado amp-ad...
formats:
  - sitios web
---

This guide provides instructions and best practices for displaying ads on your AMP pages.

## Cómo agregar anuncios a su página

En las páginas que no son AMP (HTML tradicional), si desea mostrar anuncios en su página, debe incluir un fragmento de código JavaScript para publicar anuncios de su red publicitaria. Por razones de rendimiento y seguridad, no puede incluir JavaScript de terceros en las páginas AMP. Por lo tanto, para mostrar anuncios en AMP, debe agregar el componente personalizado [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) a su página AMP.

[tip type="tip"] **SUGERENCIA: ** Consulte [AMP por ejemplo para ver una demostración en vivo](../../../../documentation/components/reference/amp-ad.md) que demuestra cómo agregar una etiqueta amp-ad a una página de AMP. [/tip]

Revisemos los pasos para agregar el componente que le permitirá mostrar anuncios en su página AMP.

### Step 1: Add the amp-ad script

El componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) es una extensión publicitaria personalizada de la biblioteca de AMP. Escondido en [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) se encuentra JavaScript personalizado que está cuidadosamente diseñado para optimizar el rendimiento. Para ejecutar el componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md), debe agregar el JavaScript necesario para este componente en la sección `head` de su página AMP:

```html
<script
  async
  custom-element="amp-ad"
  src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
></script>
```

### Paso 2: agregue la etiqueta amp-ad a su página AMP

Más de 100 [servidores y redes de publicidad](ads_vendors.md) ofrecen integraciones incorporadas con AMP. Para agregar un anuncio para una red publicitaria determinada, agregue la etiqueta [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) y especifique la red en el atributo `type`.

En este ejemplo, estamos agregando un espacio publicitario para publicar anuncios de la red a9:

```html
<amp-ad type="a9"> </amp-ad>
```

### Paso 3: especifique el tamaño del bloque de anuncios

Agregue los atributos `width` y `height` a la etiqueta [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). En este se especifica el tamaño del anuncio en su página AMP:

```html
<amp-ad type="a9"> width="300" height="250" </amp-ad>
```

### Step 4: Set ad network parameters

Cada red tiene atributos de datos específicos que necesita para emitir anuncios. Consulte la documentación de la red publicitaria de [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) y agregue los atributos necesarios. En el siguiente ejemplo, la red a9 requiere parámetros adicionales para especificar el tamaño de los anuncios y otros detalles:

```html
<amp-ad
  type="a9"
  width="300"
  height="250"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

### Step 5: (Optional) Specify a placeholder

Dependiendo de la red publicitaria, puede elegir mostrar un marcador de posición hasta que el anuncio esté disponible para su visualización. Esto proporciona una mejor experiencia al usuario al evitar lagunas. Para especificar un marcador de posición, agregue un elemento secundario con el atributo `placeholder`. Obtenga más información en [Marcadores de posición y respaldos](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad
  type="a9"
  width="300"
  height="250"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
  <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### Step 6: (Optional) Specify a fallback

Dependiendo de la red publicitaria, puede elegir mostrar un elemento de respaldo si no hay ningún anuncio disponible para su publicación. Para especificar un respaldo, agregue un elemento secundario con el atributo `fallback`. Obtenga más información en [Marcadores de posición y respaldos](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad
  type="a9"
  width="300"
  height="250"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
  <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

¡Felicidades! ¡Ahora está publicando anuncios en su página AMP!

## Cómo publicar anuncios AMPHTML de venta directa

Con el componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) se publican anuncios de la red que usted especifique. Estos pueden ser anuncios HTML estándar o anuncios AMPHTML, siempre y cuando la red publicitaria sea compatible con anuncios AMPHTML. Para publicar sus anuncios de venta directa como anuncios AMPHTML, cree el anuncio en formato AMPHTML de acuerdo con los requisitos de las [especificaciones de los anuncios AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) y utilice un [servidor de anuncios que publique anuncios AMPHTML](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/a4a-readme.md#publishers).

## Cómo aumentar los datos de los objetivos de las solicitudes de anuncios

Como parte del mecanismo de publicación Fast Fetch, la función de configuración en tiempo real (RTC) permite que los editores aumenten las solicitudes de anuncios con información de los objetivos propios y de terceros que se recupera en tiempo de ejecución. RTC permite hasta 5 llamadas a los servidores de objetivos para cada espacio publicitario individual, cuyos resultados se adjuntan en la solicitudes de anuncios. Para utilizar RTC en sus anuncios, la red publicitaria que utilice debe ser compatible con RTC y Fast Fetch.

Puede obtener más información sobre RTC en este video de YouTube:

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='Watch Effective AMP Monetization with Header Bidding.']

O consulte los siguientes recursos de RTC:

- [Guía de implementación para editores de AMP RTC](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
- [Configuración de AMP en tiempo real](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-documentation.md)

## Prácticas recomendadas

Estos son algunos consejos para maximizar la eficacia de los anuncios en sus páginas AMP:

### Ubicación y controles: optimizar la ubicación de sus anuncios

- **Coloque la misma cantidad de anuncios** en las páginas AMP con respecto en las páginas que no son de AMP para generar la máxima cantidad de ingresos por página.
- **Coloque el primer anuncio justo debajo de la primera ventana de visualización** (“parte inferior de la página”) para proporcionar una experiencia de usuario óptima.
- A menos que esté utilizando CSS avanzado o consultas de medios, **asegúrese de que sus bloques de anuncios estén centrados en la página** para proporcionar a sus usuarios una experiencia web móvil óptima.
- Habilite las [solicitudes de anuncios de varios tamaños](https://github.com/ampproject/amphtml/blob/main/ads/README.md#support-for-multi-size-ad-requests) en su inventario de AMP para aumentar la presión de las subastas publicitarias y generar ingresos.

### Demanda y fijación de precios: obtenga el precio adecuado para sus anuncios

- **Venda bloques de anuncios en sus páginas AMP en todos los canales de venta**, incluyendo los canales directos e indirectos, para maximizar la competencia de su inventario en las páginas AMP.
- **Establezca los precios de su inventario de anuncios en las páginas AMP** cómo lo hace en las páginas que no son de AMP. Vigile el rendimiento y ajuste los precios como corresponda.
- **Asegúrese de que todos los canales de demanda publicitaria compitan** por el inventario de anuncios en sus páginas AMP para impulsar la competencia.

### Tipos de anuncios: publique los mejores tipos de anuncios

- **Evite las creatividades pesadas** de acuerdo con las [reglas generales de la IAB](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf).
- **Avoid interstitials** or other ad formats that cause the content to reflow on ad load.
- **Optimice la visibilidad** al configurar la estrategia de carga de datos para preferir la visibilidad sobre las vistas.
- **Place ads in your video content** via [supported players](../../../../documentation/components/index.html#media) or [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) to enable revenue on all types of content.
- **Implemente anuncios nativos** para competir con los gráficos mediante solicitudes de anuncios de varios tamaños, lo que aumenta la presión de la demanda y proporciona a sus lectores una experiencia de usuario premium.

### Innovación: ofrecer los productos publicitarios más atractivos

- **Implemente anuncios en páginas AMP auxiliares ** para generar ingresos adicionales:
  - [Anuncios en carrusel](../../../../documentation/examples/documentation/Carousel_Ad.html)
  - [Anuncios lightbox](../../../../documentation/examples/documentation/Lightbox_Ad.html)
  - ... y [muchas otras cosas más](../../../../documentation/examples/index.html)
- **Implemente nuevos formatos de anuncios de venta directa** para equipar a su equipo de ventas con productos publicitarios innovadores y de alto impacto:
  - [Anuncios pegadizos](../../../../documentation/examples/documentation/amp-sticky-ad.html)
  - [Alfombra voladora](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## Recursos adicionales

- [Plantillas de anuncios AMPHTML](../../../../documentation/examples/index.html)
- [Demostración: muestra cómo agregar `amp-ad` a su página AMP](../../../../documentation/components/reference/amp-ad.md)
