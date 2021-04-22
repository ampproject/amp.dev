---
'$title': Integre AMP con su aplicación
$order: 2
description: Esta guía está destinada a desarrolladores de aplicaciones móviles y webs que deseen integrar y vincular páginas de AMP. Por ejemplo, considere una aplicación de chat móvil...
formats:
  - websites
---

Esta guía está destinada a desarrolladores de aplicaciones móviles y webs que deseen integrar y vincular páginas de AMP. Por ejemplo, considere una aplicación de chat móvil que cargue la versión de AMP de una URL compartida para lograr una experiencia más rápida para los usuarios.

## Transforme enlaces a AMP

Con AMP, es posible renderizar casi instantáneamente sitios web externos dentro de su aplicación web nativa o móvil. Puede lograr esto al hacer coincidir las URL de su contenido con sus URL de AMP correspondientes (si existe), y al abrir la versión de AMP en vez de la versión original. Puede utilizar herramientas de ayuda como la [API AMP URL de Google](https://developers.google.com/amp/cache/use-amp-url).

Por ejemplo, el siguiente mensaje puede transformarse para servir a las versiones de AMP al reemplazar todas las URL con sus correspondientes versiones de AMP (si existen). Para reducir el tiempo de carga y garantizar que se sirva AMP válido, debe vincular las páginas de AMP que están en caché, en el caché de AMP.

Mensaje Original:

```text
This is a message with links to an <a href="http://www.example.org/a">
article with AMP version</a> and an <a href="http://www.example.org/b"> article without AMP version</a>.
```

Mensaje Transformado:

```text
This is a message with links to an <a href="https://www-example-org.cdn.ampproject.org/c/www.example.org/a">
article with AMP version</a> and an <a href="www.example.org/b"> article without AMP version</a>.
```

[tip type="tip"] **CONSEJO:** Puede proporcionar a los usuarios la opción de ver la versión que no es de AMP, en vez de la versión de AMP, mediante la configuración de preferencias en su aplicación. [/tip]

### Formas de transformar enlaces

Hay tres formas de transformar enlaces utilizando la programación:

1. **Tiempo de escritura en el lado del servidor (preferido)**: Recupere la URL de AMP mediante la API de la AMP URL de Google en el momento de escribir de una URL y almacene las URL de AMP en el lado del servidor. Pase ambas URL al cliente, porque la URL original puede ser necesaria para compartir. Este es el enfoque recomendado porque hay menos solicitudes de red del lado del cliente. Cuando se adopta este enfoque, es importante escanear regularmente (por ejemplo, diariamente) enlaces de exploración para las versiones de AMP, porque los sitios web adoptan cada vez más el formato de AMP.
2. **Tiempo de lectura del lado del servidor (algo útil)**: Recupere la URL de AMP mediante la API de AMP URL de Google antes de pasar el contenido a su cliente. Como se mencionó anteriormente, pase ambas URL (AMP y no AMP) al cliente, porque la URL original puede ser necesaria para compartir. Este método puede ser bueno para servicios con poco despliegue.
3. **Del lado del cliente (si el lado del servidor no es posible)**: Recupere la URL AMP mediante la API de AMP URL de Google del cliente. Utilice este enfoque si la transformación de URL del lado del servidor no es posible (por ejemplo, para aplicaciones de mensajería que utilizan el cifrado de extremo a extremo). Asegúrese de activar la transformación de la URL tan pronto como el contenido esté disponible, antes de que haya tenido lugar la interacción del usuario.

[tip type="important"] <strong>IMPORTANTE:</strong> Nunca solicite las URL de AMP mediante la API de AMP de Google como resultado de la interacción del usuario, ya que eso degradará el rendimiento de su aplicación cuando introduzca una solicitud de red adicional. En vez de ello, utilice uno de los tres enfoques que se describieron anteriormente. [/tip]

#### API de AMP URL de Google

Google proporciona la API de AMP URL para recuperar las URL HTML AMP correspondientes para una lista dada de URL ([documentación oficial](https://developers.google.com/amp/cache/use-amp-url) / [demostración](../../../documentation/examples/documentation/Using_the_AMP_URL_API.html). Las URL no necesitan ser las versiones canónicas. Si existe una versión de AMP, la respuesta incluye la URL AMP original y la URL de la página AMP que está en caché, en el caché de Google AMP.

Por ejemplo, para una lista dada de URLs:

```json
{
  "urls": [
    "https://www.example.org/article-with-amp-version",
    "http://www.example.com/no-amp-version.html"
  ]
}
```

El cuerpo de respuesta contiene la asignación de URL de AMP en formato JSON:

```json
{
  "ampUrls": [
    {
      "originalUrl": "https://www.example.org/article-with-amp-version",
      "ampUrl": "https://www.example.org/article-with-amp-version/amp",
      "cdnAmpUrl": "https://www-example-org.cdn.ampproject.org/c/s/www.example.org/article-with-amp-version"
    }
  ],
  "urlErrors": [
    {
      "errorCode": "NO_AMP_URL",
      "errorMessage": "AMP URL not found.",
      "originalUrl": "http://www.example.com/no-amp-version.html"
    }
  ]
}
```

[tip type="tip"] <strong>Nota:</strong> Las URL de las páginas de AMP que están almacenadas en caché, en los cachés de AMP, y que no son de Google no se pueden recuperar mediante la API de AMP URL. Sin embargo, puede derivar fácilmente la URL que está en el caché de la AMP URL que se devuelve (ampURL).[/tip]

## Uso de los cachés de AMP

Un [caché de AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) es una red de entrega de contenido (CDN) basada en proxy para la entrega de documentos AMP válidos. Los cachés de AMP están diseñados para:

- Entregar solo páginas de AMP válidas.
- Permitir que las páginas de AMP se carguen de manera eficiente y segura.
- Aplicar al contenido optimizaciones de rendimiento adicionales que beneficien al usuario.

Actualmente hay dos proveedores de AMP Cache:

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

Esto proporciona dos opciones para mostrar un archivo AMP en una aplicación mediante:

1. la versión alojada por el editor
2. la versión alojada en un caché AMP

Recomendamos usar AMP Cache por los siguientes motivos:

- Mejor experiencia de usuario debido a un tiempo de carga más rápido y baja latencia (> 1s tiempo de carga más rápido).
- Beneficios de rendimiento y ancho de banda debido al almacenamiento adicional en caché de objetos dependientes del cliente, por ejemplo, almacenamiento en caché de diferentes versiones de la misma imagen según el tamaño de la ventana gráfica del cliente.
- Es posible que el archivo AMP original ya no sea un AMP válido, lo cual podría ocasionar una mala experiencia al usuario. En este caso, AMP Cache sirve la última versión válida del archivo AMP.
- Un editor no tan fiel podría servir dos documentos diferentes a un rastreador de AMP Cache y a sus usuarios. El uso de un AMP Cache garantiza que los usuarios siempre verán el mismo archivo AMP que el caché.

[tip type="important"] <strong>IMPORTANTE:</strong> Al servir páginas de AMP mediante AMP Cache, proporcione una experiencia de visor que muestre claramente el origen de AMP y ofrezca a los usuarios la posibilidad de compartir la URL canónica (para obtener más información, consulte también las dos secciones siguientes). [/tip]

## Implementación de un Visor AMP

AMP Runtime proporciona una API Viewer (o visor de AMP), que proporciona un protocolo para enviar y recibir mensajes entre AMP Runtime y Viewer. Esto permite controlar la preproducción de documentos AMP, al deslizar entre artículos y la instrumentación de AMP Runtime. Puede obtener más información sobre la API de AMP Viewer en la guía de [Connecting AMP Viewers with AMP pages](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md). Las implementaciones de visor para [web](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md) e [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) están disponibles en [GitHub](https://github.com/ampproject/amp-viewer). Aún no está disponible un visor de Android, consulte [esta respuesta](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038) en Stack Overflow para saber cómo configurar mejor un WebView para mostrar páginas AMP.

Estas son algunas de las mejores prácticas generales para implementar un AMP Viewer:

- Sirva la página AMP desde un caché AMP (>1s tiempo de carga más rápido).
- Muestre el origen del editor del artículo (por ejemplo, en un encabezado plegable).
- Proporcione una acción de intercambio (consulte también la sección "[Compartir contenido AMP](#sharing-amp-content)" que se muestra a continuación).
- En los visores basados en webView, habilite las cookies de terceros.
- Establezca un referente para su plataforma/aplicación.

### Compartir contenido AMP <a name="sharing-amp-content"></a>

Al compartir un documento AMP desde el AMP Viewer de una plataforma, la plataforma debe compartir la URL canónica cuando sea técnicamente posible. Por ejemplo, si la plataforma proporciona un botón para compartir, este botón debe compartir la URL canónica.

La filosofía del Proyecto AMP es que las plataformas deben elegir cuál versión de un documento presentarán al usuario. Por esta razón, tiene más sentido compartir la versión canónica (a diferencia de la versión AMP) cuando se comparte a una plataforma diferente, y después esperar que la plataforma objetivo tome la decisión correcta.
