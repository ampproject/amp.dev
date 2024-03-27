---
'$title': Cómo optimizar las páginas que están alojadas en AMP
$order: 7
description: El tiempo de ejecución de AMP está optimizado para ser más rápido y en caso de que sus páginas de AMP estén alojadas en un caché de AMP, se optimizarán totalmente y le proporcionarán el mayor rendimiento durante la carga...
formats:
  - sitios web
  - historias
author: sebastianbenz
---

En esta guía se brindan sugerencias y orientación a los administradores de sitios web sobre cómo pueden optimizar sus páginas cuando están alojadas en AMP.

### ¿AMP no es lo suficientemente rápido cuando se utiliza de forma predeterminada?

El tiempo de ejecución de AMP está [optimizado para ser más rápido](../../../about/how-amp-works.html) y en caso de que sus páginas de AMP estén alojadas en un [caché de AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md), se optimizarán totalmente y le proporcionarán el mayor rendimiento durante la carga. Por ejemplo, si los usuarios llegan a las páginas de AMP desde Google Search mediante un dispositivo móvil, las páginas estarán alojadas en un caché de AMP de forma predeterminada.

Sin embargo, las páginas de AMP no siempre se alojan en un caché de AMP. Un sitio web puede decidir mostrar las páginas AMP desde sus propios servidores en otras fuentes de tráfico. El caso de uso más frecuente son los sitios completamente desarrollados en AMP, como [tasty.co](https://tasty.co), donde los usuarios se dirigen directamente al sitio. Otra fuente de tráfico es Twitter, que [se comenzó a vincular con las páginas AMP](https://searchengineland.com/twitter-ramps-amp-278300) en vez de ofrecer la versión móvil estándar. Esto significa que si un usuario hace clic en un enlace de una de las aplicaciones móviles de Twitter, el enlace se dirige a la versión de AMP de su página para su propio origen (si hay una disponible).

Por lo tanto, no siempre se puede estar seguro de que las páginas AMP solo se alojan en un caché de AMP. En estos casos, cuando las páginas AMP se alojan desde sus propios servidores, es importante asegurarse de que sus páginas AMP ofrecen un rendimiento de carga óptimo.

Las páginas AMP se cargan rápido y de forma predeterminada, pero hay algunas optimizaciones de rendimiento adicionales que puede implementar con las que ayuda a que el navegador cargue las páginas AMP aún más rápido. En esta guía se describen algunas optimizaciones que debe considerar cuando publique páginas AMP. Sin embargo, antes de comenzar a leer esta guía, asegúrese de que ya leyó todas las [prácticas recomendadas básicas para el rendimiento web](#basic-optimizations). En particular, la optimización de imágenes tiene un gran impacto en el rendimiento de carga.

Por ejemplo, puede aplicar las siguientes técnicas de optimización:

- [Carga optimizada en el tiempo de ejecución de AMP](#optimize-the-amp-runtime-loading)
- [Precargar la imagen hero](#preload-hero-images) (el tamaño de la imagen/el cifrado no se cambió por sí mismo)
- [Optimiza las fuentes personalizadas](#optimize-custom-fonts) (en este caso, Google Fonts)

La [plantilla “The Scenic”](../../../documentation/templates/index.html) se carga [dos segundos más rápido en una conexión 3G](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0).

Si desea omitir los detalles, consulte el [Generador de código reutilizable de AMP](/boilerplate), el cual puede utilizar para crear páginas de AMP personalizadas y optimizadas.

### Cómo optimizar la carga respecto al tiempo de ejecución en AMP <a name="optimize-the-amp-runtime-loading"></a>

Aunque AMP ya es bastante restrictivo sobre cuáles son las etiquetas que se permiten en la sección `<head>`, todavía pueden realizarse optimizaciones. La clave está en estructurar la sección `<head>` de tal manera que todos los scripts que bloquean la renderización y las fuentes personalizadas se carguen lo más rápido posible.

Aquí puede encontrar el orden recomendado para la sección `<head>` en una página AMP:

[sourcecode:html]

<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="This is the AMP Boilerplate.">
    <link rel="preload" as="script" href="https://ampjs.org/v0.js">
    <link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">
    <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
    <script async src="https://ampjs.org/v0.js"></script>
    <script async custom-element="amp-experiment" src="https://ampjs.org/v0/amp-experiment-0.1.js"></script>
    <!-- Import other AMP Extensions here -->
    <style amp-custom>
      /* Add your styles here */
    </style>
    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <link rel="canonical" href=".">
    <title>My AMP Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
[/sourcecode]

Pero, vayamos paso a paso:

1. La primera etiqueta debería ser `meta charset`, seguida de cualquier otra etiqueta `meta`.

2. A continuación, cargue previamente la etiqueta para el tiempo de ejecución de AMP `v0.js` `<script>` con `<link as=script href=https://ampjs.org/v0.js rel=preload>`. El tiempo de ejecución de AMP debería comenzar a descargarse lo antes posible porque en el [Código reutilizable de AMP](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) se oculta el documento mediante `body { visibility:hidden }` hasta que el tiempo de ejecución de AMP se haya cargado. Durante la carga previa del tiempo de ejecución de AMP se le indica al navegador que descargue el script cuya prioridad sea más alta. Consulte la sección [Renderización del lado del servidor](#server-side-rendering) para evitar que esto suceda.

3. [sourcecode:html]<link as="script" rel="preload" href="https://ampjs.org/v0/amp-custom-css-0.1.js"><link as="script" rel="preload" href="https://ampjs.org/v0/amp-experiment-0.1.js"><link as="script" rel="preload" href="https://ampjs.org/v0/story-1.0.js">[/sourcecode]

4. Utilice [preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/) para acelerar la conexión a otro origen en el que no se conoce de antemano la URL completa del recurso, por ejemplo, al utilizar Google Fonts:

   [sourcecode:html]<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>[/sourcecode]

5. [sourcecode:html]<script async src="https://ampjs.org/v0.js"></script>[/sourcecode]

6. Especifique las etiquetas `<script>` para [extensiones que retrasan el procesamiento](https://github.com/ampproject/amphtml/blob/main/src/render-delaying-services.js) (por ejemplo, [`amp-experiment`](../../../documentation/components/reference/amp-experiment.md) [`amp-dynamic-css-classes`](../../../documentation/components/reference/amp-dynamic-css-classes.md) y [`amp-story`](../../../documentation/components/reference/amp-story.md)

7. Especifique las etiquetas `<script>` para las extensiones restantes (por ejemplo, [`amp-bind{/code}`](../../../documentation/components/reference/amp-bind.md) ...). Estas extensiones no tienen retraso en el renderizado y por lo tanto no deben precargarse ya que podrían quitar un ancho de banda importante para el renderizado inicial.

8. Especifique cualquier estilo personalizado mediante la etiqueta `<style amp-custom>`.

9. Agregue cualquier otra etiqueta permitida en la sección `<head>`. En particular, todas las fuentes externas deben aplicarse al final ya que bloquean el renderizado.

10. Por último, especifique el [código repetitivo de AMP](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md). Al poner el código repetitivo en último lugar, evita que los estilos personalizados anulen accidentalmente las reglas CSS estándar.

[tip] El caché de AMP lleva a cabo todas estas optimizaciones de forma automática (e incluso algunas otras). Utilice la herramienta Optimizador de AMP para efectuar automáticamente estas optimizaciones en su propio origen. [/tip]

### Cómo cargar previamente imágenes hero <a name="preload-hero-images"></a>

[AMP HTML utiliza su propio elemento de imagen: `amp-img`](../../../documentation/components/reference/amp-img.md). Mientras que [`amp-img`](../../../documentation/components/reference/amp-img.md) tiene muchas ventajas en comparación con la etiqueta habitual HTML `img`, una desventaja es que el tiempo de ejecución de AMP debe cargarse antes de que la imagen pueda comenzar a descargarse. En el caso de algunas imágenes, como las imágenes hero que se utilizan en las páginas orientadas a productos, es fundamental que las imágenes se carguen lo más rápido posible. En estos casos, lo mejor es cargar previamente la imagen para garantizar que el navegador comience a descargarla cuanto antes y no sea necesario esperar hasta que el tiempo de ejecución de AMP se cargue.

[sourcecode:html]

<head>
  <link rel="preload" href="/images/elephants.png" as="image">
</head>
<body>
  ...
  <amp-img width="404" height="720" layout="responsive"
           src="/images/elephants.png" alt="..." >
  </amp-img>
</body>
[/sourcecode]

Pero, ¿qué ocurre si la capacidad de respuesta del diseño necesita diferentes imágenes hero dependiendo del ancho que tenga la pantalla? Por ejemplo, una imagen amplia para el equipo de escritorio y una imagen estrecha para un dispositivo móvil, como se muestra a continuación:

[sourcecode:html]
<amp-img width="404" height="720"
    alt="..." layout="responsive"
    src="/images/elephants_narrow.png"
    media="(max-width: 415px)">
</amp-img>
<amp-img height="720"
    alt="..." layout="fixed-height"
    src="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
</amp-img>
[/sourcecode]

La parte positiva es que `link rel=preload` también es compatible con las consultas de medios. Por lo tanto, podemos usar las mismas consultas de medios para cargar previamente nuestros estados, como en este caso:

[sourcecode:html]

<link rel="preload" as="image"
    href="/images/elephants_narrow.png"
    media="(max-width: 415px)">
<link rel="preload" as="image"
    href="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
[/sourcecode]

Por cierto, el mismo enfoque funciona para [`amp-video`](../../../documentation/components/reference/amp-video.md) cuando se trata de las imágenes de los carteles:

[sourcecode:html]

<link rel="preload" href="/images/poster.jpg" as="image">
...
 <amp-video width="480" height="270" src="elephant.mp4"
             poster="/images/poster.jpg"
             layout="responsive">
     ...
</amp-video>
[/sourcecode]

Solo asegúrese de clasificar los estados de precarga _después_ de la afirmación de la ventana de visualización, porque el navegador necesita las dimensiones de la ventana de visualización para determinar el ancho de la pantalla:

[sourcecode:html]

<meta name="viewport" content="width=device-width">
...
<link rel="preload" media="(max-width: 415px)" ...>
[/sourcecode]

[tip type="important"] Solo cargue previamente las imágenes que sean muy importantes, de lo contrario la descarga de las imágenes podría ocupar el ancho de banda que se necesite para otras descargas esenciales. [/tip]

### Considere la posibilidad de utilizar un service worker

Ahora que los [navegadores más importantes son compatibles con los service workers](https://caniuse.com/#feat=serviceworkers), es una buena idea evaluar si tiene sentido agregar un service worker a su sitio.

Hay dos diferentes patrones arquitectónicos que sabemos funcionarán para navegar de una manera rápida y confiable:

- Para aplicaciones de una sola página: el modelo “Shell” de la aplicación (en el contexto de AMP se refiere a las [PWA dentro de AMP](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)). En este patrón se requiere que un service worker actualice un documento de AMP a la experiencia de la PWA basada en el modelo “Shell” de la aplicación.
- Para aplicaciones con varias páginas: [el streaming de recursos compuestos](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses). Un service worker almacena el encabezado y el pie de página estáticos en el caché, y utiliza el streaming para devolver instantáneamente una respuesta parcial almacenada en el caché mientras se carga el contenido.

Si no se utiliza ninguno de estos patrones y no es posible almacenar en el caché todo el sitio (algo que solamente es razonable para sitios muy pequeños), un service worker podría tener un [impacto negativo en el rendimiento](https://developers.google.com/web/updates/2017/02/navigation-preload). Lo mejor en este caso es **no** utilizar un service worker.

Sin embargo, si desea que su sitio web pueda [instalarse desde la pantalla de inicio](https://developers.google.com/web/fundamentals/app-install-banners/), o quiere ofrecer una experiencia sin conexión, tendrá que utilizar un service worker. En este caso, es importante utilizar la función para [cargar previamente la navegación](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw) con la finalidad de mitigar la posible disminución de la velocidad (Nota: actualmente, la carga previa de la navegación solo es compatible con Chrome).

Si su sitio web de AMP utiliza un service worker, estás son algunas de las prácticas recomendadas:

- Almacenar previamente en el caché el [tiempo de ejecución de AMP](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime) y las extensiones (por ejemplo, [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md)).
- Almacenar previamente en el caché los logotipos, fuentes y otros contenidos estáticos que se utilizan en la mayoría de sus páginas.
- Alojar logotipos, fuentes e imágenes mediante una [estrategia cache-first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network).
- Alojar el tiempo de ejecución de AMP y las extensiones mediante una estrategia [stale-while-revalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate).
- Al utilizar una estrategia de red para las solicitudes de navegación, asegúrese de habilitar la [precarga de navegación](https://developers.google.com/web/updates/2017/02/navigation-preload).

Si está buscando una manera de comenzar a utilizar un service worker en su sitio de AMP, consulte esta [muestra](https://www.google.com/url?q=https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449&sa=D&ust=1529413323498000&usg=AFQjCNE4fepX-hqVeRBW8df43uV5Bi4Llg) que proporciona un service worker que implementa todas estas prácticas recomendadas.

[tip type="note"] El tiempo de ejecución de AMP se aloja por un tiempo máximo de solamente 50 minutos para garantizar que las actualizaciones estén disponibles rápidamente. Con la finalidad de evitar posibles fallos en el caché del navegador, es una buena idea alojar el tiempo de ejecución de AMP en un service worker. [/tip]

Almacenar previamente en el caché no solo es importante para que se realice correctamente la transición desde las páginas de AMP que están almacenadas en el caché a las páginas que no son de AMP desde su propio origen, sino también para las transiciones desde las páginas de AMP almacenadas en el caché a las páginas de AMP desde su propio origen. El motivo de esto es que la memoria caché de AMP reescribe las URL para el tiempo de ejecución de AMP desde la URL permanente a la última versión que se haya publicado, por ejemplo:

`https://ampjs.org/v0.js` -> `https://ampjs.org/rtv/001515617716922/v0.js`.

La consecuencia es que una página AMP que esté alojada desde su propio origen no se beneficia del almacenamiento en el caché del navegador y, en este caso, debe descargar nuevamente el tiempo de ejecución de AMP (sin versión). Con un service worker, el tiempo de ejecución de AMP sin versión puede almacenarse previamente en el caché y con esto acelerar las transiciones. Para obtener más información sobre las versiones del caché de AMP y las URL para el tiempo de ejecución de AMP, lea [este documento](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer##versioned-amp-runtime).

[tip type="note"] En Safari, existe una diferencia clave en la forma en que se implementan los service workers: en Safari no es posible instalar un service worker desde su origen cuando la página se aloja desde un caché de AMP. [/tip]

### Cómo optimizar las fuentes personalizadas <a name="optimize-custom-fonts"></a>

Con AMP, hay algunas cosas que puede hacer para optimizar la carga de fuentes ([la mayoría de ellas, en realidad, no son específicas de AMP](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)):

- Si es posible, utilice [font-display: optional](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display): esto solo utilizará la fuente si ya se encuentra en el caché, y devuelve la fuente del sistema si aún no se carga su fuente personalizada.
- Optimice sus fuentes web (por ejemplo, aloje fuentes personalizadas mediante WOFF2).

[sourcecode:html]

<link rel="preload" as="font" href="/bundles/app/fonts/helveticaneue-roman-webfont.woff2" >[/sourcecode]

- Si utiliza Google fonts o cualquier otro proveedor de fuentes con URL de fuentes desconocidas, conecte previamente el servidor de fuentes correspondiente: PLACEHOLDER_START10PLACEHOLDER_END

Por último, aunque no menos importante, intente minimizar la cantidad de fuentes personalizadas que utilice en su página. Si puede, utilice las fuentes del sistema, en vez de las fuentes personalizadas, ya que estas hacen que su página web se ajuste con el sistema operativo del usuario, y evite cargar más recursos.

### Diseños para renderizar AMP del lado del servidor <a name="server-side-rendering"></a>

El uso de los diseños para renderizar AMP del lado del servidor es una técnica que los cachés de AMP utilizan para acelerar aún más el tiempo de carga. Con la renderización del lado del servidor es posible eliminar el código repetitivo de AMP para que el documento AMP se pueda describir sin tener que ejecutar JavaScript en el tiempo de ejecución de AMP. Por ejemplo, ¡la versión renderizada del lado del servidor para el generador de códigos repetitivos de AMP [se renderiza dos veces más rápido](https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&thumbSize=200&ival=500&end=visual) que la versión normal de AMP!

Si está publicando una página AMP, definitivamente debería considerar el uso del [Optimizador de AMP](amp-optimizer-guide/index.md). Los Optimizadores de AMP le permiten alojar páginas AMP optimizadas desde su propio backend, lo que incluyen los diseños renderizar AMP del lado del servidor. El Optimizador de AMP también lleva a cabo de forma automática muchas otras optimizaciones descritas en este documento.

### Optimizaciones básicas <a name="basic-optimizations"></a>

Desde luego, todos los conceptos básicos sobre las optimizaciones en el rendimiento web también pueden aplicarse para las páginas de AMP:

- [Optimizar las imágenes](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) y videos. La optimización de imágenes puede tener un impacto masivo en el rendimiento de la carga.
- [Comprimir y minificar CSS y HTML](https://github.com/purifycss/purifycss). Debido a que todas las CSS de las páginas de AMP tienen estilos integrados en el código, vale la pena utilizar algo como [purifycss](https://github.com/purifycss/purifycss) para remover las CSS que no se utilizan.
- Utilizar [los HTTP almacenados en el caché](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- ... y muchas otras cosas más.
