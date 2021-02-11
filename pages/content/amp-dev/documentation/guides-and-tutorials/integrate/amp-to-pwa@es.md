---
'$title': Precargue su aplicación web progresiva (PWA) desde páginas AMP
$order: 1
description: Una buena estrategia es definir que una página AMP sea el punto de entrada de los usuarios a su sitio web, y después preparar la PWA en segundo plano y dirigirlos a...
formats:
  - websites
author: pbakaus
---

Una buena estrategia es definir que **una página AMP sea el punto de entrada de los usuarios a su sitio web**, y después **preparar la PWA en segundo plano** y dirigirlos a ella durante el resto de la visita:

- Todas las páginas de producto con contenido (las que tienen contenido específico, no las principales) se publican en AMP para obtener esta experiencia de carga casi instantánea.
- Estas páginas AMP utilizan un elemento especial de AMP [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) para preparar una caché y el esqueleto de la PWA mientras el usuario disfruta el contenido.
- Cuando el usuario hace clic en otro enlace de su sitio web (por ejemplo, en la llamada a la acción de la parte inferior, para obtener una experiencia más similar a una aplicación), el componente Service Worker intercepta la solicitud, toma el control de la página y carga el esqueleto de la PWA en su lugar.

Siga leyendo para saber por qué y cómo usar este patrón de desarrollo.

## Mejore la visita del usuario al conectarlo con una PWA

### Uso de páginas AMP en la adquisición inicial de usuarios

AMP es una solución ideal para las denominadas **páginas de producto**, las cuales son páginas de contenido que sus usuarios descubren de forma natural mediante un motor de búsqueda, mediante un enlace compartido por un amigo o por un enlace proveniente de otro sitio web. La tecnología AMP cuenta con un [renderizado especializado previo](../../../about/how-amp-works.html) que posibilita una carga sumamente rápida de las páginas AMP, lo cual reduce mucho el porcentaje de abandono (el último [estudio de DoubleClick](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) muestra que **más del 53% de los usuarios abandonan las páginas después de 3 segundos**).

### PWA para mejorar la interactividad y la participación

Por otro lado, las aplicaciones web progresivas aumentan el grado de interactividad y de participación, pero no cuentan con las _características de primera carga instantánea_ de una página AMP. Su característica principal es la tecnología Service Worker, un proxy del cliente que le permite almacenar en caché todo tipo de recursos para usarlos después en las páginas. Sin embargo, estos proxies solo se activan _después_ de la primera carga.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='Pros y contras de AMP frente a PWA.') }}

## Preparación de una PWA con `amp-install-serviceworker`

AMP puede instalar el componente Service Worker de su aplicación web progresiva desde una página AMP, incluso aunque la página AMP en cuestión actúe desde una memoria caché de AMP. Si lo hace correctamente, el enlace que guía a su PWA (desde una de las páginas AMP) dará la impresión de cargar el contenido casi inmediatamente, de forma similar a la primera carga de la página AMP.

[tip type="tip"] <strong>CONSEJO:</strong> Si aún no está familiarizado con Service Worker, le recomendamos el [curso Udacity](https://www.udacity.com/course/offline-web-applications--ud899) de Jake Archibald. [/tip]

Primero, instale el componente Service Worker en todas sus páginas AMP con [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), incluyendo primero el componente mediante su script en el `<head>` de la página:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

Después, agregue el siguiente código en la sección `<body>` (modifique lo necesario para dirigirlo a su componente Service Worker actual):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Y, finalmente, al instalar el service worker, almacene en caché todos los recursos que necesitará la PWA:

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
'/',
'/styles/main.css',
'/script/main.js'
];

self.addEventListener('install', function(event) {
// Perform install steps
event.waitUntil(
caches.open(CACHE_NAME)
.then(function(cache) {
console.log('Opened cache');
return cache.addAll(urlsToCache);
})
);
});
[/sourcecode]

[tip type="tip"] <strong>CONSEJO:</strong> Hay formas más sencillas de trabajar con Service Worker. Dele un vistazo a las [bibliotecas auxiliares de Service Worker](https://github.com/GoogleChrome/sw-helpers).[/tip]

## Redirección de la PWA a todos los enlaces de una página AMP

Es posible que la mayoría de los enlaces de sus páginas AMP dirijan a otras páginas de contenido. Puede seguir dos estrategias distintas para garantizar que los clics a otros enlaces den como resultado una "actualización" de la aplicación web progresiva, [según cómo utilice AMP](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md):

### 1. Si empareja sus páginas canónicas con páginas AMP

En este caso tiene un sitio web canónico (que no es AMP) y genera páginas AMP que están enlazadas con sus páginas canónicas. Esta es la forma más habitual de utilizar AMP y, por lo general, significa que los enlaces de las páginas AMP dirigen a la versión canónica de su sitio web. **Buenas noticias: si su sitio web canónico es su PWA, ya tiene todo listo.**

### 2. Si su sitio web canónico es AMP

*Si sus páginas canónicas *son\* sus páginas AMP: Está creando todo el sitio web con la tecnología AMP y simplemente utiliza AMP como biblioteca (dato curioso: el sitio web que lee en este momento se creó de este modo). **Si es su caso, la mayoría de los enlaces de sus páginas AMP dirigen a otras páginas AMP.\***

Ahora puede implementar la PWA en una ruta independiente como `your-domain.com/pwa` y utilizar el componente Service Worker que ya está activo para **interceptar la navegación cuando un usuario haga clic en un enlace de una página AMP**:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
if (event.request.mode === 'navigate') {
event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

Algo especialmente interesante de esta técnica es que ahora está utilizando una mejora progresiva para cambiar de AMP a PWA. Sin embargo, esto también significa que los navegadores que aún no son compatibles con Service Worker saltarán de una página AMP a otra y nunca llegarán a la PWA.

AMP resuelve esta cuestión [reescribiendo la URL del esqueleto](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite). Al agregar un patrón de URL alternativa a la etiqueta [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), instruye a AMP para que reescriba todos los enlaces coincidentes en una página determinada, de forma que dirijan a la URL de un esqueleto antiguo en su lugar, si no se ha detectado ningún soporte de Service Worker:

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

Después de colocar todos estos atributos, los clics a enlaces posteriores de una página AMP llevarán al usuario a su PWA, independientemente de si cuenta con un componente Service Worker.

[tip type="read-on"] <strong>MÁS INFORMACIÓN: </strong> Una vez que llegue hasta aquí, ¿por qué no reutiliza sus páginas AMP para construir la PWA? [Descubra cómo se hace](amp-in-pwa.md). [/tip]
