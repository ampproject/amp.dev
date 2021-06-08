---
$title: Almacenar páginas AMP en caché
---

En este documento, aprenderá sobre el papel de AMP Cache en el ecosistema de AMP y cómo se almacena en caché su página de AMP.

## ¿Qué es el AMP Cache?
Una memoria caché AMP es una red de entrega de contenido (CDN) basada en proxy para la entrega de documentos AMP válidos. Los cachés de AMP están diseñados para:

1.  Sirve solo páginas válidas de AMP.
2.  Permita que las páginas de AMP se carguen de manera eficiente y segura.
3.  Realice optimizaciones de rendimiento beneficiosas para el usuario adicionales para el contenido.

Obtenga más información acerca de los cachés de AMP en el video de YouTube a continuación, o en la publicación del blog [Why AMP Caches Exist](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456).

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='Watch this video to learn why AMP Caches exist.']

## ¿Qué cachés de AMP están disponibles?
Actualmente, hay dos proveedores de AMP Cache:

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP es un ecosistema abierto y el Proyecto AMP fomenta activamente el desarrollo de más cachés de AMP. Para obtener más información sobre la creación de cachés de AMP, consulte las [Pautas de caché de AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md).

## ¿Cómo elijo un caché AMP?

Como editor, no elige un caché AMP, en realidad *es la plataforma* que vincula su contenido que elige el caché de AMP (si corresponde) para usar.

Esta es una inversión del modelo típico en el que la entrega de contenido es responsabilidad del editor. Sin embargo, este modelo permite a las plataformas proporcionar a sus usuarios un rendimiento de carga predecible y, entre otras cosas, les permite garantizar invariantes de seguridad y privacidad durante la fase de preelaboración de AMP. Para conocer las pautas estrictas para crear cachés de AMP, consulte [AMP Cache Guidelines](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md).

## ¿Puedo optar por dejar de usar el caché?

El almacenamiento en caché es una parte central del ecosistema de AMP. La publicación de un documento AMP válido lo convierte automáticamente en entrega de caché.

Si no desea almacenar su documento en caché, una opción es eliminar el atributo `amp` de la etiqueta HTML. Esto hace que el documento sea técnicamente no válido AMP, sin afectar la funcionalidad del documento.

## ¿Quién solicita páginas de AMP en caché?

Las plataformas (como Google Search, Google News y Bing) y las aplicaciones móviles acceden a las páginas de AMP almacenadas en caché. Las aplicaciones móviles pueden vincular el contenido de AMP almacenado en caché a través de la URL (consulte [AMP URL API de Google](https://developers.google.com/amp/cache/use-amp-url)) o mediante XHR de origen cruzado en Progressive Web Apps (obtenga más información en "[Incruste y use AMP como fuente de datos](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)").

<amp-img src="/static/img/docs/platforms_accessing_cache.png"
         width="1054" height="356" layout="responsive"
         alt="platforms and mobile apps access cached AMP pages">
</amp-img>

## ¿Cómo se almacena en caché mi página de AMP?
Al usar el formato AMP, usted está haciendo que su contenido esté disponible para ser guardado en caché por AMP Caches. Hay algunas maneras en que su página de AMP puede terminar en un caché de AMP:

* **Descubrimiento de plataforma**:  las plataformas descubren su contenido de AMP a través de la etiqueta `<html ⚡>` o `<html amp>` y almacenan en caché el contenido. Por ejemplo, Google Search rastrea contenido; para cualquier página AMP identificada y válida, el contenido se agrega a Google AMP Cache.

* **Solicitud de URL de caché**: las plataformas pueden solicitar específicamente una página de AMP utilizando el formato de URL de caché de AMP. La memoria caché de AMP actúa como un proxy inverso, por lo tanto, cuando la plataforma accede a la página, la página se almacena en caché automáticamente.
    - Ejemplo Google AMP Cache URL: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

Nota: La URL de caché de AMP no es una URL de usuario, es decir, los usuarios normalmente no solicitan contenido a través de esas URL.

* **Agregados del Editor**: los editores pueden agregar específicamente la página de AMP al caché de AMP. Esta opción solo se aplica a Google AMP Cache (consulte [Google AMP Cache: Update AMP Content](https://developers.google.com/amp/cache/update-cache)).

## Recursos Adicionales

* [AMP Project's AMP Cache guidelines](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md)
* [Google AMP Cache overview](https://developers.google.com/amp/cache/overview)
* [Bing AMP Cache Documentation](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
