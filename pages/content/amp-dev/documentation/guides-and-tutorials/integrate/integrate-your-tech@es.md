---
$title: Integre su tecnología con AMP
$order: 1
---

Los editores han creado más de 1.4 billones de documentos AMP que están alojados en más de 750 mil dominios únicos. Tal crecimiento habría sido imposible sin el fuerte apoyo de más de 100 empresas de terceros de tecnología que ya se han integrado con AMP.

Si usted es un proveedor de tecnología para editores o anunciantes en la web, le invitamos a agregar soporte a AMP para que sus clientes puedan seguir aprovechando su tecnología y lograr nuestra visión conjunta para crear una mejor web.

Existen 4 maneras principales de integrarse con AMP:

## 1. Agregue su soporte a la extensión amp-analytics

AMP Analytics le permite enviar eventos de vuelta a su servidor basado en disparadores configurados por usted. Hemos escrito una [guía de integración de análisis]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md', locale=doc.locale).url.path}}) para empezar.

Si solo necesita agregar un píxel de seguimiento con parámetros dinámicos a su URL de seguimiento, eche un vistazo a [amp-pixel](/es/docs/reference/components/amp-pixel.html). Asegúrese de documentar el uso en sus páginas de soporte para los desarrolladores que deseen utilizar su tecnología con AMP.

Hay más de 20 proveedores de análisis que han añadido soporte a amp-analytics. A continuación se muestra una [solicitud de extracción de ejemplo](https://github.com/ampproject/amphtml/pull/1595) del proveedor de análisis [Parse.ly](https://www.parsely.com/help/integration/google-amp/).

## 2. Usando la extensión amp-ad

La extensión amp-ad está reservada para publicar anuncios de visualización en las páginas de AMP. Más de 90 proveedores de tecnología de anuncios han añadido soporte a AMP. Para empezar, lea la [descripción general del desarrollo](https://github.com/ampproject/amphtml/tree/master/ads#overview) o salte a las [instrucciones del desarrollador](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request) para agregar su soporte a la extensión amp-ad. Dependiendo de la tecnología de anuncios que su empresa proporcione, es posible que encuentre útiles estas [instrucciones de integración]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/integration-guide.md', locale=doc.locale).url.path}}).

Hay más de 90 proveedores de anuncios que han añadido soporte para funciones publicitarias relacionadas, como amp-ad. A continuación se muestra una [solicitud de extracción](https://github.com/ampproject/amphtml/pull/2299) de muestra de la red publicitaria [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md).

## 3. Uso de la extensión amp-call-tracking

Si proporciona servicios de medición de seguimiento de llamadas, su caso de uso puede ser compatible con la nueva extensión [amp-call-tracking](/es/docs/reference/components/amp-call-tracking.html). Esta extensión reemplaza dinámicamente un número de teléfono en un hipervínculo para habilitar el seguimiento de llamadas, ejecutando una petición de CORS para sustituir el número.

Para obtener más información sobre cómo esta extensión podría funcionar para usted, consulte el sitio [AMP by Example](https://ampbyexample.com/components/amp-call-tracking.html) o lea acerca de la [documentación](/es/docs/reference/components/amp-call-tracking.html).

## 4. Agregar una nueva extensión o incrustar

Si su caso de uso no se puede acomodar mediante amp-analytics, amp-pixel o amp-ad, reporte un [problema en GitHub](https://github.com/ampproject/amphtml/issues/new) para discutir opciones alternativas. Damos la bienvenida a las nuevas extensiones que pueden ser ampliamente utilizados por un número de diferentes empresas. Consulte la [sección de componentes ampliados](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#contributing-extended-components) para obtener más detalles.

## 5. Usando el amp-iframe

Se espera su uso solamente como último recurso. Si ninguno de las extensiones anteriores se ajustan a sus necesidades, podría utilizar la etiqueta genérica amp-iframe para permitir a los editores integrar su contenido, pero este enfoque viene con una serie de desventajas, para optimizar el rendimiento y la experiencia del usuario que puede leer [aquí](/es/docs/reference/components/amp-iframe.html#guideline:-prefer-specific-amp-components-to-amp-iframe).

## Resumen

Para empezar, empiece leyendo las [directrices para desarrolladores de terceros](https://github.com/ampproject/amphtml/blob/master/3p/README.md). El proyecto AMP ya es compatible con una amplia variedad de casos de uso de terceros, pero sabemos que hay características de la web que aún no se han construido.

Por ejemplo, el seguimiento dinámico de llamadas es un caso de uso que aún no soportamos en AMP, pero estamos [trabajando activamente](https://github.com/ampproject/amphtml/issues/5276) con la comunidad para añadir ese soporte.

Si tiene alguna pregunta o sugerencia, no dude en [reportar un problema](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#filing-issues) o llegar a uno de nuestros [canales de discusión](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#discussion-channels).

## Recursos adicionales

- [AMP Project Site](https://www.ampproject.org/)
- [AMP GitHub Project](https://github.com/ampproject/amphtml)
- [AMP Blog](https://amphtml.wordpress.com/)
- [AMP Project Roadmap](/roadmap/)
