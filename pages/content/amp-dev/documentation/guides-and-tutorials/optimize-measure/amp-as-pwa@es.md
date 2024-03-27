---
$title: Habilitar las funciones de las aplicaciones web progresivas en páginas AMP
---

{{ image('/static/img/docs/pwamp_add_to_homescreen.png', 848, 1500, align='right third', caption='AMPbyExample activa el mensaje "Añadir a la pantalla de inicio".') }}

Muchos sitios web no necesitan más de lo que ya les ofrece AMP. [Examples](../../../documentation/examples/index.html), por ejemplo, es al mismo tiempo una página AMP y una aplicación web progresiva (PWA):

1. Dispone de un [archivo de manifiesto de aplicación web](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/), que genera el mensaje "Añadir a la pantalla de inicio".
2. Cuenta con un [componente service worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) y, por tanto, permite que se acceda a ella sin conexión, entre otras cosas.

Cuando un usuario visita [Examples](../../../documentation/examples/index.html) desde una plataforma compatible con AMP y después sigue desplazándose por el sitio web, sale de la caché de AMP y pasa al origen. El sitio web sigue usando la biblioteca de AMP, pero al encontrarse en el origen, puede usar un componente service worker, pedir instalaciones, etc.

Nota: Service worker no puede interactuar con la versión de tu página almacenada en la caché de AMP. Úsalo en el resto del recorrido hasta el origen.

## Añadir un archivo de manifiesto de aplicación web

Si añades un [archivo de manifiesto de aplicación web](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) a tus páginas AMP, te aseguras de que los usuarios puedan instalar tu sitio web en la pantalla de inicio de sus dispositivos. Los archivos de manifiesto de aplicación web en AMP no tienen misterio.

En primer lugar, crea el archivo de manifiesto:

[sourcecode:json]
{
  "short_name": "ABE",
  "name": "AMPByExample",
  "icons": [
    {
      "src": "launcher-icon-1x.png",
      "type": "image/png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-2x.png",
      "type": "image/png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-4x.png",
      "type": "image/png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html?launcher=true"
}
[/sourcecode]

A continuación, enlázalo desde la sección `<head>` de tu página AMP:

[sourcecode:html]
<link rel="manifest" href="/manifest.json">
[/sourcecode]

Nota: Consulta más información sobre el [archivo de manifiesto de aplicación web en Web Fundamentals](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/).

## Instalar un componente service worker para habilitar el acceso sin conexión

Un service worker es un proxy de cliente que se sitúa entre tu página y el servidor, y que puede usarse para crear fantásticas experiencias sin conexión, generar esqueletos de aplicación de carga rápida y enviar notificaciones push.

Nota: Si es la primera vez que oyes hablar de los componentes service worker, consulta este [artículo de introducción en Web Fundamentals](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers).

Los componentes service worker tienen que estar registrados en una página concreta; de lo contrario, el navegador no los encontrará ni ejecutará. Para registrarlos, debes usar un [pequeño fragmento de JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration) o, en páginas AMP, un componente [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md).

En este caso, introduce primero la secuencia de comandos del componente [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) en la sección `<head>` de tu página:

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

A continuación, añade el fragmento siguiente en algún lugar de la sección `<body>` (modifícalo para que apunte a tu service worker actual):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Si el usuario navega hasta las páginas AMP alojadas en tu sitio web (y no hasta las almacenadas en la caché de AMP, que son las que generalmente se publican con el primer clic), el componente service worker toma el control y puede [empezar a hacer un montón de cosas interesantes](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux).

## Ampliar páginas AMP con un service worker

Con la técnica anterior, puedes habilitar el acceso sin conexión a tu sitio web AMP, así como ampliar tus páginas **en cuanto se publiquen desde el propio sitio web**. Puedes modificar la respuesta con el evento `fetch` del service worker y devolver la que quieras:

[sourcecode:js]
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })

        // Modifica aquí la respuesta antes de enviarla.
        ...

        return response || fetchPromise;
      })
    })
  );
});
[/sourcecode]

Esta técnica te permite modificar tu página AMP con todo tipo de funcionalidades adicionales
que, de otra manera, no superarían la [validación de AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) como, por ejemplo:

* Las funciones dinámicas que necesitan código JavaScript personalizado.
* Los componentes que están personalizados o que solo son relevantes para tu sitio web.
