---
$title: Integre AMP con su aplicación
$order: 6
$category: Develop
toc: true

---

Esta guía está destinada a desarrolladores de aplicaciones móviles y webs que deseen integrar y vincular páginas de AMP. Por ejemplo, considere una aplicación de chat móvil que carga la versión de AMP de una URL compartida para lograr una experiencia más rápida para los usuarios.

[TOC]

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

{% call callout('Tip', type='success') %}
Considere proporcionar a los usuarios la opción de ver la versión que no es de AMP en lugar de 
la versión de AMP a través de la configuración de preferencias en su aplicación.
{% endcall %}

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

{% call callout('Importante', type='caution') %}
Never request AMP URLs through the Google's AMP API as a result of a user
interaction because that degrades the performance of your app as it introduces
an additional network request. Instead, use one of the three approaches 
described above.
{% endcall %}


#### Google's AMP URL API  

Google provides the AMP URL API to retrieve the matching AMP HTML URLs for a
given list of URLs ([official documentation](https://developers.google.com/amp/cache/use-amp-url) /
[demo](https://ampbyexample.com/advanced/using_the_amp_url_api/)). The URLs do
not need to be the canonical versions. If an AMP version exists, the response
includes the original AMP URL and the URL for the cached AMP page on the Google
AMP Cache. 

For example, for a given list of URLs:


```json
{"urls": [
  "https://www.example.org/article-with-amp-version",
  "http://www.example.com/no-amp-version.html"
]}
```


The response body contains the AMP URL mapping in JSON format:


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

{% call callout('Note', type='note') %}
URLs for cached AMP pages on non-Google AMP Caches cannot be retrieved via the
AMP URL API. However, you can easily derive the cached URL from the returned AMP
URL (ampURL).
{% endcall %}


## Using AMP Caches

An [AMP Cache](https://www.ampproject.org/docs/guides/how_cached) is a
proxy-based content delivery network (CDN) for delivering valid AMP documents.
AMP Caches are designed to:

*   Serve only valid AMP pages.
*   Allow AMP pages to be preloaded efficiently and safely.
*   Perform additional user-beneficial performance optimizations to content.

Currently, there are two AMP Cache providers:

*   [Google AMP Cache](https://developers.google.com/amp/cache/)
*   [Cloudflare AMP Cache](https://amp.cloudflare.com/)

This gives two choices to display an AMP file in an app by using either:

1.  the version hosted by the publisher 
1.  the version hosted in an AMP Cache

We recommend using the AMP Cache for the following reasons:

*   Better user experience due to faster load time and low latency (>1s faster
    loading time).
*   Performance and bandwidth benefits due to additional caching of client
    dependent artifacts, e.g. caching different versions of the same image
    depending on the client's viewport size.
*   The original AMP file might no longer be valid AMP, which could lead to a
    bad user experience. In this case, the AMP Cache serves the last valid
    version of the AMP file.
*   A not-so-upstanding publisher could serve two different documents to an AMP
    Cache crawler and to your users. Using an AMP Cache guarantees that users
    always see the same AMP file as the Cache.

{% call callout('Important', type='caution') %}
When serving AMP pages through the AMP Cache, provide a viewer experience that
clearly shows the AMP's origin and offers the possibility for users to share the
canonical URL (see also the following two sections for more about this).
{% endcall %}

## Implementing an AMP Viewer

The AMP Runtime provides a Viewer API, which provides a protocol to send and
receive  messages between the AMP Runtime and the Viewer. This makes it possible
to control the pre-rendering of AMP documents, swiping between articles, and AMP
Runtime instrumentation. You can learn more about the AMP Viewer API in the
[Connecting AMP Viewers with AMP pages](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md)
guide. Viewer implementations for [web](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md)
and [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) are
available on [GitHub](https://github.com/ampproject/amp-viewer). An Android
viewer is not yet available, see [this answer](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038)
on Stack Overflow for how to best configure a WebView for displaying AMP pages. 

Here are some general best practices for implementing an AMP Viewer:

*   Serve the AMP page from an AMP Cache (>1s faster loading time).
*   Display the article's publisher origin (e.g., in a collapsible header).
*   Provide a sharing action (see also the "[Sharing AMP Content](#sharing-amp-content)"
    section below).
*   In webView-based viewers, enable third-party cookies.
*   Set a referrer for your platform/app.


### Sharing AMP Content

When sharing an AMP document from within a platform's AMP Viewer, the platform
should share the canonical URL when technically possible. For example, if the
platform provides a share button, this button should share the canonical URL.

The philosophy of the AMP Project is that platforms should get to choose which
version of a document to present to the user. For this reason, it makes most
sense to share the canonical version (as opposed to the AMP version) when
sharing to a different platform, and then expect the target platform to make the
right choice. 
