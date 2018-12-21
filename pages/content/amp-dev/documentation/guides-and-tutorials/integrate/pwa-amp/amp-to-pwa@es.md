---
$title: Precargar una aplicación web progresiva (PWA) desde páginas AMP
---
[TOC]

Una buena estrategia es definir que **una página AMP sea el punto de entrada de los usuarios a tu sitio web** y después **preparar la PWA en segundo plano** y dirigirlos a ella durante el resto de la visita:

* Todas las páginas de producto con contenido (las que tienen contenido específico, no las principales) se publican en AMP para obtener esta experiencia de carga casi instantánea.
* Estas páginas AMP usan un elemento especial de AMP [`<amp-install-serviceworker>`](/es/docs/reference/components/amp-install-serviceworker.html) para preparar una caché y el esqueleto de la PWA mientras el usuario está disfrutando del contenido.
* Cuando el usuario hace clic en otro enlace de tu sitio web (por ejemplo, en la llamada a la acción de la parte inferior, para obtener una experiencia más similar a una aplicación), el componente service worker intercepta la solicitud, toma el control de la página y carga el esqueleto de la PWA en su lugar.

Sigue leyendo para saber por qué y cómo usar este patrón de desarrollo.


## Mejora la visita del usuario al conectarlo con una PWA

### Utilizar páginas AMP en la adquisición de usuarios inicial

AMP es una solución ideal en el caso de las denominadas **páginas de producto**: páginas de contenido que tus usuarios descubren de forma natural mediante un motor de búsqueda, a través de un enlace compartido por un amigo o por un enlace de otro sitio web. La tecnología AMP tiene un [renderizado especializado previo](/es/learn/about-how/) que posibilita una carga extremadamente rápida de las páginas AMP, lo que reduce mucho el porcentaje de abandono (el último [estudio de DoubleClick](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) muestra que **más del 53 % de los usuarios abandonan después de tres segundos**).

### Mejorar la interactividad y la interacción con PWA

Por otro lado, las aplicaciones web progresivas aumentan el grado de interactividad y de interacción, pero no tienen las *características de primera carga instantánea* de una página AMP. Su característica principal es la tecnología Service Worker, un proxy del cliente que te permite almacenar en caché todo tipo de recursos para usarlos después en las páginas. Sin embargo, estos proxies *solo se activan después de la primera carga*.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='Pros y contras de AMP frente a PWA.') }}

## Preparar una PWA con `amp-install-serviceworker`

AMP puede instalar el componente service worker de tu aplicación web progresiva desde una página AMP, incluso aunque la página AMP en cuestión se sirva desde una memoria caché de AMP. Si se hace correctamente, el enlace que dirige a tu PWA (desde una de las páginas AMP) dará la impresión de cargar el contenido casi inmediatamente, como en la primera carga de la página AMP.

Consejo: Si todavía no estás familiarizado con Service Worker, te recomendamos este [curso de Udacity](https://www.udacity.com/course/offline-web-applications--ud899) de Jake Archibald.

En primer lugar, instala el componente service worker en todas tus páginas AMP con [`<amp-install-serviceworker>`](/es/docs/reference/components/amp-install-serviceworker.html), incluyéndolo junto a su secuencia de comandos en la sección `<head>` de la página:

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

Luego, añade el siguiente código en cualquier lugar de la sección `<body>` (modifica lo que corresponda para que dirija a tu componente service worker):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Y, finalmente, al instalar el service worker, almacena en caché todos los recursos que necesitará la PWA:

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Sigue los pasos de la instalación.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
[/sourcecode]

Consejo: Hay formas más sencillas de trabajar con un service worker. Echa un vistazo a las [bibliotecas auxiliares de Service Worker](https://github.com/GoogleChrome/sw-helpers).

## Redirigir a la PWA todos los enlaces de una página AMP

<<<<<<< HEAD
Es posible que la mayoría de los enlaces de tus páginas AMP dirijan a otras páginas de contenido. Se pueden seguir dos estrategias distintas para asegurarse de que los clics a otros enlaces provoquen una "actualización" de la aplicación web progresiva, [según cómo utilices AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}}):
=======
Es posible que la mayoría de los enlaces de tus páginas AMP dirijan a otras páginas de contenido. Se pueden seguir dos estrategias distintas para asegurarse de que los clics a otros enlaces provoquen una "actualización" de la aplicación web progresiva, [según cómo utilices AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}}):
>>>>>>> 3aeec0a67c667957f9f54faf118da91faf46313f

### 1. Si emparejas tus páginas canónicas con páginas AMP

En este caso tienes un sitio web canónico (que no es AMP) y generas páginas AMP que están enlazadas con tus páginas canónicas. Esta es la forma más habitual de utilizar AMP y, por lo general, significa que los enlaces de las páginas AMP dirigen a la versión canónica de tu sitio web. **Buenas noticias: si tu sitio web canónico es tu PWA, ya lo tienes todo listo.**

### 2. Si tu sitio web canónico es AMP

*Si tus páginas canónicas son tus páginas AMP:* estás creando todo el sitio web con la tecnología AMP y usas solo AMP como biblioteca (dato curioso: el sitio web que estás leyendo ahora mismo se ha creado así). **Si es tu caso, la mayoría de los enlaces de tus páginas AMP dirigen a otras páginas AMP.**

Ahora puedes implementar la PWA en una ruta independiente como `your-domain.com/pwa` y utilizar el componente service worker que ya está activo para **interceptar la navegación cuando un usuario hace clic en un enlace de una página AMP**:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
      event.respondWith(fetch('/pwa'));

      // Empieza a descargar inmediatamente el recurso.
      fetch(event.request.url);
    }

});
[/sourcecode]

Lo que es especialmente interesante de esta técnica es que ahora estás utilizando una mejora progresiva para pasar de AMP a PWA. Sin embargo, esto también significa que los navegadores que todavía no son compatibles con service workers saltarán de una página AMP a otra y nunca llegarán a la PWA.

AMP resuelve esta cuestión [reescribiendo la URL del esqueleto](/es/docs/reference/components/amp-install-serviceworker.html#shell-url-rewrite). Al añadir un patrón de URL alternativa a la etiqueta [`<amp-install-serviceworker>`](/es/docs/reference/components/amp-install-serviceworker.html), das instrucciones a AMP para que, si no hay compatibilidad con service worker, vuelva a escribir todos los enlaces coincidentes en una página determinada, de forma que dirijan a la URL de un esqueleto antiguo en su lugar. De este modo:

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

Después de colocar todos estos atributos, los clics a enlaces posteriores de una página AMP llevarán al usuario a tu PWA, independientemente de si se cuenta con un componente service worker.

Más información: Una vez que ya has llegado hasta aquí, ¿por qué no reutilizas tus páginas AMP para construir la PWA? [Descubre cómo se hace](/es/docs/integration/pwa-amp/amp-in-pwa.html).
