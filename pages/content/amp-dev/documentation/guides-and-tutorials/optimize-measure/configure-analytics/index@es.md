---
"$title": Configuración de Analytics
"$order": '5'
"$hidden": 'true'
description: Si utiliza Google Analytics como proveedor de análisis, aprenda a configurar Google Analytics básico para AMP y a vincular el contenido que es AMP y el que no es AMP mediante el ID de cliente.
formats:
- websites
- stories
---

[tip] <strong>TIP –</strong> Si utiliza Google Analytics como proveedor de análisis, aprenda a <a>configurar Google Analytics básico para AMP</a> y a <a>vincular el contenido que es AMP y el que no es AMP mediante el ID de cliente</a>. [/tip]

## Decida antes de empezar:

Todas las soluciones de análisis se construyen cuando sabe cuáles datos necesita y cómo pretende analizarlos. Decida antes de empezar:

- ¿Analizará las interacciones de los usuarios con herramientas de terceros o con una propia?
- ¿Cuáles comportamientos de los usuarios medirá para comprender cómo interactúan con su página?

### ¿Enviar datos a un proveedor o usarlos directamente?

Si cuenta con su propia solución interna para medir la participación de los usuarios, lo único que necesita para integrar AMP Analytics con esa solución es una URL. Aquí es donde enviará los datos. También puede enviar los datos a varias URL. Por ejemplo, puede enviar datos de visualización de páginas a una URL, y datos de compromiso social a otra URL.

AMP Analytics está especialmente diseñado para medir los datos una sola vez, pero puede enviarlos a muchas partes interesadas. Si ya trabaja con uno o varios proveedores de servicios de análisis, dele un vistazo a la lista de [proveedores](https://github.com/ampproject/amphtml/issues/new) para ver si integraron sus herramientas con AMP. Si es así, consulte la información de configuración y siga las instrucciones pertinentes.

En el caso de que no lo hayan hecho, póngase en contacto con los proveedores y pídales ayuda. También le animamos a <a>crear un incidente en el proyecto AMP</a> para solicitar que se agregue a los proveedores en cuestión. Consulte cómo <a>Integrar tus herramientas de análisis con AMP HTML</a>.

### ¿Cuáles datos necesita?

¿Cuáles datos de sus usuarios capturará para medir la participación? Debe identificar estos datos antes de poder configurarlos.

Puntos clave que debe tener en cuenta:

- ¿Registrará solo las páginas vistas o tiene pensado supervisar más patrones de interacción? (Consulte el artículo [Qué le conviene más utilizar: amp-pixel o amp-analytics](analytics_basics.md#use-amp-pixel-or-amp-analytics)).
- ¿Qué tipos de datos desea capturar de tus usuarios? ¿El contenido, el dispositivo o el navegador? Consulte el artículo sobre la [Sustitución de variables](analytics_basics.md).
- ¿Cómo identificará a sus usuarios? (Consulte el artículo sobre <a>Identificación de usuarios</a>).

Más información: Siga aprendiendo sobre el análisis con [Analytics: aspectos básicos](analytics_basics.md).
