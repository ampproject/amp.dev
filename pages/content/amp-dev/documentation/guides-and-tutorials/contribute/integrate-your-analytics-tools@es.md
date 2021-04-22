---
'$title': Integre sus herramientas analíticas con AMP
$order: 1
formats:
  - websites
  - stories
teaser:
  text: Overview
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/integrating-analytics.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Información general <a name="overview"></a>

Si utiliza una herramienta del tipo "software como un servicio" para que los publicistas comprendan más fácilmente cómo funcionan su tráfico y los visitantes, posiblemente desee integrar su servicio con `amp-analytics`. Esto permitirá que sus clientes visualicen los patrones en el tráfico de sus páginas AMP HTML.

## Antes de comenzar <a name="before-you-begin"></a>

Antes de que agregue el servicio de análisis al tiempo de ejecución de AMP HTML, posiblemente necesite hacer lo siguiente:

- Identificar los tipos de [variables](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md) y [solicitudes](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-analytics.md#requests) que necesitará en un documento AMP HTML cuando implemente el servicio de análisis.
- Verificar si la función del complemento para el procesamiento por lotes es necesaria para elaborar la URL final, en caso de que se utilicen solicitudes con el comportamiento del procesamiento por lotes.
- Identificar cuáles son los factores que provocarían que las solicitudes de análisis se envíen desde una página que sea importante para su servicio.
- Analizar si es necesario hacerlo y cómo [realizará un seguimiento de los usuarios a través](https://github.com/ampproject/amphtml/blob/main/spec/amp-managing-user-state.md) del contexto de primeros o terceros para AMP.
- Conocer cómo el panel de control de su servicio de análisis controla el tráfico de AMP.
- Identificar cualquier funcionalidad que no esté disponible en `amp-analytics`, y [presentar solicitudes](https://github.com/ampproject/amphtml/issues/new) para las funciones que sean necesarias.
- AMP Analytics envía sus variables a un endpoint que se configuró previamente. Si actualmente todavía no cuenta con un endpoint, consulte [este ejemplo](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample) donde encontrará información general sobre cómo crear uno.
  - Para todos los tipos de transporte con excepción de `iframe`, en una solicitud HTTPS, las variables se envían como parámetros de la cadena de consulta.
  - Para el transporte de tipo `iframe`, debe crearse un iframe y las variables se le envían mediante `window.postMessage`. En este caso, no es necesario que el mensaje sea una URL. Esta opción solamente está disponible para los proveedores acreditados por el MRC.
- Tenga en cuenta que la integración con `amp-analytics` podría tener repercusiones en las políticas (particularmente en sus políticas de privacidad) o en los acuerdos que tenga.

## Cómo agregar su configuración al tiempo de ejecución en AMP HTML <a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. Cree un [ problema del tipo "Intención de implementar"](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../CONTRIBUTING.md#contributing-features) donde indique que agregará la configuración para su servicio de análisis al tiempo de ejecución de AMP HTML. Asegúrese de enviar su solicitud con copia para **@ampproject/wg-analytics** en su descripción.
2. Desarrolle un parche que implemente lo siguiente:
   1. Un nuevo archivo para la configuración de tipo json `${vendorName}.json` en la [carpeta](https://github.com/ampproject/amphtml/tree/master/extensions/amp-analytics/0.1/vendors) para los proveedores, que incluya todas las opciones anteriores y las predeterminadas, por ejemplo:
      1. `"vars": {}` para variables adicionales predeterminadas.
      2. `"requests": {}` para las solicitudes que utilizará su servicio.
      3. `"optout":` si es necesario. Actualmente no contamos con un buen sistema de exclusión voluntaria, entonces, póngase en contacto con nosotros y ayúdenos a diseñar uno que funcione adecuadamente para usted.
      4. `"warningMessage":` si es necesario. Muestra información de advertencia del proveedor (como en el caso de que haya desaprobación o migración) en la consola.
   2. Si está usando el iframe de transporte, también agregue una nueva línea para ANALYTICS_IFRAME_TRANSPORT_CONFIG en iframe-transport-vendors.js, que incluya `"*vendor-name*": "*url*"`
   3. Un ejemplo en la referencia [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../examples/analytics-vendors.amp.html).
   4. Una prueba en el archivo [extensions/amp-analytics/0.1/test/vendor-requests.json ](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json).
   5. Agregue su servicio de análisis a la lista de proveedores que son compatibles en el archivo [extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/./analytics-vendors-list.md). Incluya el tipo, la descripción, y un enlace hacia la documentación que utiliza.
3. En caso de que sea necesario tener un nuevo complemento para el procesamiento por lotes, consulte el artículo Cómo agregar un complemento para el procesamiento por lotes si desea obtener más información.
4. Pruebe el nuevo ejemplo que colocó en [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) para garantizar que los puntos importantes del ejemplo funcionen según lo esperado. En particular, que los datos necesarios se recopilen y visualicen en el panel de control de su servicio de análisis.
5. Envíe una solicitud de tipo "Pull request" con este parche, y haga referencia al problema del tipo "Intención de implementar".
6. Actualice la documentación que utiliza en su servicio e informe de la actualización a sus clientes.
7. Se recomienda ampliamente conservar [una prueba de la integración fuera del repositorio de AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests).

## Administradores de etiquetas <a name="tag-managers"></a>

Los servicios de administración de etiquetas cuentan con dos opciones para integrarse con AMP Analytics:

- **Concepto del endpoint:** Actúa como un endpoint adicional para `amp-analytics`, y se encarga de la administración del marketing en el backend.
- **Concepto de la configuración:** Se encarga de la administración de las etiquetas mediante un solo archivo de configuración JSON que se generó de manera dinámica para todos los editores.

El concepto del endpoint es idéntico al concepto estándar que se describió a detalle en la sección anterior. El concepto de la configuración consiste en crear una configuración única para amp-analytics y que sea específica para cada editor, e incluya todos los paquetes analíticos que sean compatibles con dicha configuración. Un editor incluiría la configuración utilizando una sintaxis similar a ésta:

[sourcecode:html]
<amp-analytics
config="https://my-awesome-tag-manager.example.com/user-id.json"

> </amp-analytics>
> [/sourcecode]

Para adoptar este concepto, consulte la documentación que le explicará cómo integrar a los editores con AMP Analytics.

## Recursos adicionales <a name="further-resources"></a>

- Para profundizar en el tema: [¿Por qué no simplemente usar un iframe?](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/why-not-iframe.md)
- Para profundizar en el tema: [Cómo administrar el estado del usuario cuando no se autenticó con AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-managing-user-state.md)
- Ejemplo de [amp-analytics](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- Documentación de referencia para [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- Documentación de referencia para las variables de [amp-analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md)
