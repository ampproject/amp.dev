---
"$title": Convierta su sitio AMP en una Aplicación Web Progresiva (PWA)
"$order": '10'
description: Al almacenar en el caché los recursos dentro del navegador, una Aplicación Web Progresiva (PWA) será capaz de proporcionar datos, activos y páginas sin conexión al usuario para que siga colaborando y se mantenga informado.
tutorial: 'true'
formats:
- websites
author: crystalonscript
---

Las Aplicaciones Web Progresivas (PWA) aprovechan el poder que tienen los [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) para habilitar características sin conexión valiosas y experiencias de usuario consistentes a través de las diferentes fortalezas de la red. Al almacenar en el caché los recursos dentro del navegador, una Aplicación Web Progresiva será capaz de proporcionar datos, activos y páginas sin conexión al usuario para que siga colaborando y se mantenga informado.

En este tutorial se le enseñará cómo convertir un sitio AMP en una PWA capaz de instalarse con características sin conexión mediante la incorporación de un manifiesto web y un service worker, los cuales funcionan con la tecnología AMP Service Worker.

# Cómo descargar y ejecutar el código de inicio

Descargue el [código de inicio aquí](/static/files/tutorials/amptopwa.zip).

Utilice un servidor web local para obtener una vista previa del sitio web.

[tip type="default"] **SUGERENCIA –** Para que el servidor web sea más rápido, ejecute `python -m SimpleHTTPServer`. [/tip]

You should be able to view the landing page for Lyrical Lyghtning, the Mobile Music Magic festival. It has one link on the homepage to view the schedule and which stage the bands are on.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

Los usuarios de nuestro sitio podrían experimentar una conexión a Internet poco estable en el evento, cuando quieran acceder a los horarios. Esto lo convierte un excelente candidato para convertirlo en una PWA que pueda instalarse en la pantalla de inicio de nuestro usuario y le proporcione todas las funciones esenciales, incluso cuando no tenga conexión.

# Cómo crear un manifiesto web de la aplicación

El [manifiesto web de la aplicación](https://developers.google.com/web/fundamentals/web-app-manifest/) es un archivo JSON simple que le informa al navegador sobre su aplicación web y cómo debe comportarse cuando se “instale” en el dispositivo móvil o equipo de escritorio del usuario. Muchos navegadores deben tener un manifiesto que muestre el [aviso Agregar a la pantalla de inicio](https://developers.google.com/web/fundamentals/app-install-banners/).

Agregue un archivo titulado `manifest.json` en su repositorio con el siguiente código:

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# Agregar el Service Worker en AMP

Un service worker es un script que su navegador ejecuta en segundo plano, independiente de una página web, el cual amplía las funciones de los navegadores almacenando en el caché las solicitudes para mejorar su rendimiento y proporcionarles funciones sin conexión. Es posible construir un service worker desde cero pero toma demasiado tiempo hacerlo. Las bibliotecas como Workbox son útiles, pero AMP va más allá porque ofrece el [AMP Service Worker](https://github.com/ampproject/amp-sw), en el que AMP automatiza muchos pasos de forma directa, incluyendo el almacenamiento de scripts, activos y documentos de AMP en el caché, así como la implementación de las mejores y más frecuentes prácticas, como la [carga previa del contenido de navegación](https://developers.google.com/web/updates/2017/02/navigation-preload).

El AMP Service Worker [almacena en el caché los scripts de AMP](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching) y los [documentos](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) de forma automática conforme el usuario lo solicite, después de su instalación. Para ello, comenzaremos agregando el AMP Service Worker básico.

## Cómo crear el archivo del service worker

Cree un archivo llamado `sw.js` y agregue el siguiente código:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

Con solo dos líneas de código, comienza la importación de AMP Service Worker a su Service Worker y se inicializa.

## Cómo instalar de forma automática el service worker en sus páginas AMP

Los sitios web de AMP utilizan el componente [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) para instalar el service worker en el segundo plano del navegador, mientras el usuario disfruta de su contenido.

Coloque la etiqueta del script que se necesita en el encabezado de `index.html` y el elemento `<amp-install-serviceworker>` dentro de `<body>`:

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **Important –** The service worker should be served from the root directory (`/sw.js`) to be able to cache all the content of your site. [/tip]

The `<amp-install-serviceworker>` installs the service worker by creating an iframe and running the `data-iframe-src` file. Create the `install-sw.html` file and add the following code:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

El iframe registra el archivo AMP Service Worker en el navegador.

# Cómo personalizar las cosas que se almacenan en el caché

El AMP Service Worker incluye ciertos beneficios al mismo tiempo que permite campos opcionales, los cuales puede configurar para optimizarlo según las necesidades de su aplicación.

En nuestra aplicación del festival de música se almacenarán en el caché los activos de nuestras imágenes, también se cargará previamente el enlace de la programación y se especificará una página sin conexión.

## Cómo almacenar activos en el caché

Puede configurar el AMP Service Worker para [almacenar activos en el caché](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching), tales como imágenes, videos y fuentes. En este caso, lo usaremos para almacenar en el caché nuestra imagen de fondo y el logotipo de AMP. Para ello, abra el archivo `sw.js` y actualícelo mediante el siguiente código:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

En él especificaremos que la estrategia de almacenamiento en el caché será [Cache first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network). Lo cual quiere decir que la aplicación intentará extraer imágenes desde Cache first antes de solicitar cualquier otra cosa desde la red. Esto es especialmente útil para esta aplicación ya que no actualizaremos nuestra imagen de fondo ni el logotipo de AMP.

## Cómo cargar previamente los enlaces

Mediante el AMP Service Worker se cargarán previamente los enlaces que cuenten con el atributo `data-rel=prefetch`. Esto permite que los usuarios visualicen páginas sin conexión incluso si todavía no han visitado las páginas. Entonces, agregaremos el atributo a nuestra etiqueta del enlace para `lineup.html`.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# Cómo mostrar una página sin conexión

Para lidiar con los casos inesperados o hacer clic en los enlaces de las páginas que no cargamos previamente, agregaremos una página sin conexión para ofrecer una experiencia de usuario que sea consistente y “sobre la marca”, en vez de mostrar una página sin conexión genérica en el navegador. Descargue [ `offline.html` aquí](/static/files/tutorials/offline.zip) y actualice `sw.js` mediante el siguiente código:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# Cómo probar su PWA

Compruebe que su AMP Service Worker almacene en el caché los activos que sean necesarios y proporcione una excelente solución sin conexión utilizando [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps).

Podemos probar la página de Lyrical Lyghtning abriendo el panel de DevTools al presionar `Ctrl + Shift + I` en Windows o `Cmd + Opt + I` en Mac. También puede hacer clic con el botón derecho en la página y seleccionar `inspect` en el menú. Posteriormente, seleccione `Application` para consultar el registro de su service worker.

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

Haga clic en la casilla `offline` para cambiar al modo sin conexión. Luego, haga clic en el enlace `see full lineup` y navegue hasta `offline.html` para verificar si se almacenaron y precargaron correctamente en el caché.

[tip type="default"] **Sugerencia –** Si desea realizar un análisis exhaustivo de las funciones en una Aplicación Web Progresiva, ejecute la [herramienta Google Lighthouse](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool) para generar un informe. [/tip]

# ¡Felicidades!

¡Creó exitosamente una PWA utilizando AMP! En este tutorial aprendió lo siguiente:

- Cómo crear un <a>manifiesto web de la aplicación</a>
- Instalar un Service Worker en AMP utilizando el componente [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)
- Personalizar el [AMP Service Worker ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)
- [Cómo cargar previamente los enlaces ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- Crear una página sin conexión

Obtenga más información sobre los [Service Workers](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) y las [Cosas que se deben tener en cuenta sobre la experiencia de usuario cuando no hay conexión](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux). Aprenda cómo hacer un [seguimiento de la participación mediante las estadísticas ](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html)y siga el tutorial sobre [cómo configurar los análisis básicos en sus páginas AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html).
