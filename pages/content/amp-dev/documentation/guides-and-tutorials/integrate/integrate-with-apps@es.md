---
$title: Integre AMP con su aplicación
---

Esta guía está destinada a desarrolladores de aplicaciones móviles y webs que deseen integrar y vincular páginas de AMP. Por ejemplo, considere una aplicación de chat móvil que carga la versión de AMP de una URL compartida para lograr una experiencia más rápida para los usuarios.

## Transforme enlaces a AMP

Con AMP, es posible renderizar casi instantáneamente sitios web externos dentro de su
aplicación web nativa o móvil. Puede lograr esto al hacer coincidir las URL de su contenido
con sus URL de AMP correspondientes (si existe) y al abrir la versión de AMP
en lugar de la versión original. Puede utilizar herramientas como la
[API AMP URL de Google](https://developers.google.com/amp/cache/use-amp-url) para ayudarlo con esto.

Por ejemplo, el siguiente mensaje se puede transformar para servir a las versiones
de AMP al reemplazar todas las URL con sus correspondientes versiones de AMP (si existen). Para
reducir el tiempo de carga y garantizar que se sirva AMP válido, debe vincular las
páginas de AMP en caché en el caché de AMP.

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

[tip type="tip"]
**TIP –** Considere proporcionar a los usuarios la opción de ver la versión que no es de AMP en lugar de la versión de AMP a través de la configuración de preferencias en su aplicación.
[/tip]

### Maneras de transformar enlaces

Hay tres formas de transformar enlaces programáticamente:

1.  **Tiempo de escritura en el lado del servidor (preferido)**: Recupere la URL de AMP
    a través de la API de AMP URL de Google en el momento de escribir de una URL y almacene
    las URL de AMP en el lado del servidor. Pase ambas URL al cliente porque la URL original
    puede ser necesaria para compartir.
    Este es el enfoque recomendado porque hay menos solicitudes de red del lado del cliente.
    Cuando se adopta este enfoque, es importante realizar regularmente (por ejemplo, diariamente)
    enlaces de exploración para las versiones de AMP porque los sitios web adoptan
    cada vez más el formato de AMP.
1.  **Tiempo de lectura del lado del servidor (algo de uso)**: Recupere la URL de AMP
    a través de la API de AMP URL de Google antes de pasar el contenido a su cliente.
    Como se mencionó anteriormente, pase ambas URL (AMP y no AMP) al cliente porque la URL
    original puede ser necesaria para compartir.
    Este método puede ser bueno para servicios con poco despliegue.
1.  **Del lado del cliente (si el lado del servidor no es posible)**: Recupere la URL AMP
    a través de la API AMP URL de Google del cliente. Utilice este enfoque si la transformación de URL
    del lado del servidor no es posible (por ejemplo, para aplicaciones de mensajería que utilizan
    el cifrado de extremo a extremo). Asegúrese de activar la transformación de URL tan pronto
    como el contenido esté disponible, antes de que haya tenido lugar la interacción del usuario.

Importante: Nunca solicite las URL de AMP a través de la API de AMP de Google como resultado de la interacción del usuario, ya que eso degrada el rendimiento de su aplicación cuando introduce una solicitud de red adicional. En su lugar, use uno de los tres enfoques descritos anteriormente.

#### API de URL de AMP de Google

Google proporciona la API AMP URL para recuperar las URL HTML AMP correspondientes
para una lista dada de URL ([documentación oficial](https://developers.google.com/amp/cache/use-amp-url) / [demostración]({{g.doc('/content/amp-dev/documentation/examples/documentation/Using_the_AMP_URL_API.html', locale=doc.locale).url.path}}). Las URL no necesitan ser las versiones canónicas. Si existe una versión de AMP, la respuesta incluye la URL AMP original y la URL de la página AMP en caché en Google AMP Cache.

Por ejemplo, para una lista dada de URLs:

```json
{"urls": [
  "https://www.example.org/article-with-amp-version",
  "http://www.example.com/no-amp-version.html"
]}
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

Nota: Las URL de las páginas de AMP almacenadas en caché en los cachés de AMP que no son de Google no se pueden recuperar a través de la API de URL de AMP. Sin embargo, puede derivar fácilmente la URL en caché de la URL de AMP devuelta (ampURL).

## Usando cachés AMP

Un [caché AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/index.md', locale=doc.locale).url.path}}) es una red de entrega de contenido (CDN) basada en proxy para la entrega de documentos AMP válidos. Los cachés de AMP están diseñados para:

*   Entregar solo páginas válidas de AMP.
*   Permitir que las páginas de AMP se carguen de manera eficiente y segura.
*   Realizar optimizaciones de rendimiento beneficiosas para el usuario adicionales para el contenido.

Actualmente, hay dos proveedores de AMP Cache:

*   [Google AMP Cache](https://developers.google.com/amp/cache/)
*   [Cloudflare AMP Cache](https://amp.cloudflare.com/)

Esto le da dos opciones para mostrar un archivo AMP en una aplicación mediante:

1.  la versión alojada por el editor
1.  la versión alojada en un caché AMP

Recomendamos usar AMP Cache por los siguientes motivos:

*   Mejor experiencia de usuario debido a un tiempo de carga más rápido y baja latencia (> 1s tiempo de carga más rápido).
*   Beneficios de rendimiento y ancho de banda debido al almacenamiento adicional en caché de objetos dependientes del cliente, por ejemplo, almacenamiento en caché de diferentes versiones de la misma imagen según el tamaño de la ventana gráfica del cliente.
*   Es posible que el archivo AMP original ya no sea un AMP válido, lo que podría ocasionar una mala experiencia del usuario. En este caso, AMP Cache sirve la última versión válida del archivo AMP.
*   Un editor no tan fiel podría servir dos documentos diferentes a un rastreador de AMP Cache y a sus usuarios. El uso de un caché AMP garantiza que los usuarios siempre vean el mismo archivo AMP que el caché.

Importante: Al servir páginas de AMP a través de AMP Cache, proporcione una experiencia de visor que muestre claramente el origen de AMP y ofrezca a los usuarios la posibilidad de compartir la URL canónica (para obtener más información, consulte también las dos secciones siguientes).

## Implementando un Visor AMP

AMP Runtime proporciona una API Viewer (o visor de AMP), que proporciona un protocolo para enviar y recibir mensajes entre AMP Runtime y Viewer. Esto permite controlar la preproducción de documentos AMP, al deslizar entre artículos y la instrumentación AMP Runtime. Puede obtener más información sobre la API de AMP Viewer en la guía de [Connecting AMP Viewers with AMP pages](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md). Las implementaciones de visor para [web](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md) e [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) están disponibles en [GitHub](https://github.com/ampproject/amp-viewer). Un visor de Android aún no está disponible, consulte [esta respuesta](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038) en Stack Overflow para saber cómo configurar mejor un WebView para mostrar páginas AMP.

Estas son algunas de las mejores prácticas generales para implementar un AMP Viewer:

*   Sirva la página AMP desde un caché AMP (>1s tiempo de carga más rápido).
*   Muestra el origen del editor del artículo (por ejemplo, en un encabezado plegable).
*   Proporcione una acción de intercambio (consulte también la sección "[Compartir contenido AMP](#compartir-contenido-amp)" a continuación).
*   En los visores basados en webView, habilite las cookies de terceros.
*   Establezca un referente para su plataforma / aplicación.

### Compartir contenido AMP

Al compartir un documento AMP desde el AMP Viewer de una plataforma, la plataforma debe compartir la URL canónica cuando sea técnicamente posible. Por ejemplo, si la plataforma proporciona un botón para compartir, este botón debe compartir la URL canónica.

La filosofía del Proyecto AMP es que las plataformas deben elegir qué versión de un documento presentar al usuario. Por esta razón, tiene más sentido compartir la versión canónica (a diferencia de la versión AMP) cuando se comparte a una plataforma diferente, y luego esperar que la plataforma objetivo tome la decisión correcta.
