---
$title: Configurar analíticas
---

## Decisiones que hay que tomar antes de empezar

Para integrar una solución de analíticas, primero tienes que saber qué datos necesitas
y cómo quieres analizarlos. Antes de empezar, responde a estas preguntas:

* ¿Analizarás las interacciones de los usuarios con herramientas de terceros
o con una propia?
* ¿Qué comportamientos de los usuarios medirás para comprender cómo interaccionan con tu página?

### Enviar datos a un proveedor o usarlos directamente

Si decides medir las interacciones de los usuarios con una herramienta propia,
lo único que necesitas para integrar las analíticas de AMP con la herramienta es una URL,
que será la ubicación a la que enviar los datos.
También puedes enviar datos a varias URL;
por ejemplo, puedes enviar datos de páginas vistas a una URL
y datos de interacciones de usuarios a otra.

La analítica de AMP está especialmente diseñada para medir los datos una sola vez, pero puede enviarlos a muchas partes interesadas.
Si ya trabajas con uno o varios proveedores de servicios de analítica,
echa un vistazo a la lista de [proveedores](analytics-vendors.md) para ver si han integrado sus herramientas con AMP.
Si es así, consulta la información de configuración y sigue las instrucciones pertinentes.

En el caso de que no lo hayan hecho,
ponte en contacto con los proveedores y pídeles ayuda.
También te animamos a [crear una incidencia en el proyecto AMP](https://github.com/ampproject/amphtml/issues/new)
para solicitar que se añada a los proveedores en cuestión.
Consulta cómo
[integrar tus herramientas de analítica con AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### Datos que necesitas

¿Qué datos de tus usuarios quieres registrar para medir la interacción con tu página?
Para hacer la configuración necesaria, primero tienes que identificar estos datos.

Puntos clave que hay que tener en cuenta:

* ¿Registrarás solo las páginas vistas o tienes pensado supervisar más patrones de interacción?
Consulta [qué te conviene más utilizar: amp-pixel o amp-analytics](analytics_basics.md#use-amp-pixel-or-amp-analytics).
* ¿Qué tipos de datos quieres capturar de tus usuarios? ¿El contenido,
el dispositivo o el navegador? Consulta información sobre la [sustitución de variables](analytics_basics.md).
* ¿Cómo identificarás a tus usuarios? Consulta información sobre cómo [identificar usuarios](analytics_basics.md).

[tip type="read-on"]
Obtén más información sobre analíticas en el artículo [Analytics: aspectos básicos](analytics_basics.md).
[/tip]
