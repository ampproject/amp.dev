---
$title: Cómo funciona el optimizador de AMP
$order: 1
description: El optimizador de AMP utiliza un documento AMPHTML válido como entrada y lo transforma en una versión perfeccionada mediante la implementación de optimizaciones adicionales, lo que se convertiría en un procedimiento muy complicado si estas se hicieran “manualmente”. En esta guía se explica detalladamente cómo funciona el optimizador de AMP.
author: sebastianbenz
---

El optimizador de AMP utiliza un documento AMPHTML válido como entrada y lo transforma en una versión perfeccionada mediante la implementación de optimizaciones adicionales, lo que se convertiría en un procedimiento muy complicado si estas se hicieran “manualmente”. Puede identificar el “**AMP transformado**” que se origina del elemento `html` a través del atributo `transformed`:

```
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self">
```

Nota: Los cachés de AMP utilizan una señal transformada diferente, por ejemplo, los cachés AMP de Google agregan `transformed=google;v=1`.

Los optimizadores de AMP realizan varias optimizaciones en un documento de AMP, las cuales van desde la renderización en los diseños del lado del servidor hasta la optimización de imágenes. A continuación, se muestra un ejemplo donde se ven claramente las diferencias entre una página de AMP y su versión optimizada ([haga clic aquí para ver una versión más amplia](/static/img/docs/guides/optimized-amp-diff.png)).

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

En el resto de esta guía, le mostraremos estas optimizaciones de forma más detallada.

### Los diseños de AMP renderizados del lado del servidor

Los diseños de AMP que se renderizaron del lado del servidor tienen mayores posibilidades de mejorar el rendimiento con el que se carga su página de AMP. Para evitar saltos en el contenido, AMP requiere que los sitios web agreguen el [código repetitivo de AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) en el encabezado. El código repetitivo de AMP oculta el contenido de la página ya que establece la opacidad del cuerpo de la página en 0. Una vez que AMP terminó de cargarse, es capaz de calcular el diseño de la página. Entonces, AMP establece la opacidad del cuerpo en 1 permitiendo que el contenido de la página sea visible. Desafortunadamente, en este enfoque el Framework AMP debe descargarse antes de poder renderizar la página.

Para mejorar esto, los diseños de AMP, como el diseño `responsive` o `fixed-height` , pueden ser renderizados en el lado del servidor antes de que el agente del usuario publique la página. De este modo, es posible eliminar el código repetitivo de AMP y al mismo tiempo se evitan los [cambios en el contenido](https://web.dev/cls/) cuando se carga la página.

Durante la renderización del lado del servidor se llevan a cabo tres cosas:

** 1. La eliminación del código repetitivo de AMP: ** en cada elemento que utiliza un diseño de AMP se introducen las etiquetas específicas del diseño.

** 2. Se establecen los estilos de CSS integrados para el código interno de AMP: ** el código repetitivo de AMP se reemplaza por los <a href="https://cdn.ampproject.org/v0.css" data-md-type="link">estilos de CSS para el tiempo de ejecución en AMP </a>: `<style amp-runtime>...</style>`. En el caso de los documentos renderizados que no provienen del lado del servidor, AMP agrega estos estilos en el tiempo de ejecución. Sin embargo, las páginas de AMP que se renderizaron en el lado del servidor requieren que los diseños de AMP funcionen antes de que AMP se cargue. Para evitar posibles conflictos entre versiones, según el tiempo de ejecución, AMP verificará si la versión que se especificó en i-amphtml-version = "011905222334000" difiere de la versión actual de AMP y, en caso de que no sea así, actualizará las CSS con la versión más reciente.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

⁣**3. Los diseños de AMP se renderizan del lado del servidor: * en cada elemento que utiliza un diseño de AMP se introducen elementos que seleccionan el tamaño específico del diseño

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

Advertencia: el código repetitivo de AMP no siempre puede eliminarse. Para averiguar si el código repetitivo fue eliminado compruebe que el atributo `i-amphtml-no-boilerplate` esté presente en el elemento `html`. Por ejemplo, el componente `amp-experiment` cambia el tiempo de ejecución para el contenido de una página. Cuando se utiliza `amp-experiment` en una página, es necesario que el código repetitivo de AMP esté presente para evitar modificaciones en el contenido.

### Optimización de las imágenes hero

Un optimizador de AMP puede mejorar considerablemente el tiempo de renderización de las imágenes en la primera ventana de visualización. Esto es fundamental cuando se optimizan los [tiempos del LCP](https://web.dev/lcp/) para cumplir con los [elementos que son indispensables en la web](https://web.dev/vitals).

En AMP, las imágenes hero se pueden declarar explícitamente al escribir `amp-img` con el atributo `data-hero` :

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

Los optimizadores de AMP admiten como máximo dos imágenes hero en una página, esto con la finalidad de no bloquear el ancho de banda que se utiliza en otros recursos esenciales. Si este límite no le funciona [háganoslo saber](https://github.com/ampproject/amp-toolbox/issues).

Los optimizadores de AMP también detectarán automáticamente las imágenes hero para los elementos `amp-img` , `amp-iframe` , `amp-video` o `amp-video-iframe` e introducirán `link rel=preload` en la imagen `src` . El reconocimiento automático funciona junto con el análisis de las etiquetas HTML y los diseños de las imágenes para detectar las imágenes que son grandes en la primera ventana de visualización.

En el caso de `amp-img`, los optimizadores de AMP también renderizarán la etiqueta `img` dentro de `amp-img`. Esto permitirá que el navegador renderice inmediatamente la imagen sin necesidad del tiempo de ejecución de AMP.

### Optimización de las imágenes

Los optimizadores AMP pueden ayudarle a publicar imágenes de respuesta optimizada al generar atributos de tipo `srcset` específicos para el diseño de AMP. Por ejemplo, en `amp-img` se declara lo siguiente:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive"></amp-img>
```

y luego se perfecciona con la siguiente definición de `srcset`:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive" srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"></amp-img>
```

Para que esto funcione, su entorno de compilación o alojamiento debe ser compatible con los cambios en el tamaño u optimización de las imágenes. Consulte las guías para realizar optimizaciones individuales, donde encontrará información sobre cómo integrar mejor la optimización con las imágenes.

### Compilación del módulo de AMP (próximamente)

Existe una versión reducida para el tiempo de ejecución de AMP, y los componentes que están disponibles se basan en los [módulos de JavaScript](https://v8.dev/features/modules#browser), los cuales requieren que las descargas de Javascript sean menores cuando se visualiza una página de AMP. Los optimizadores de AMP habilitan la compilación en el módulo de AMP de forma predeterminada al transformar:

```
<script async src="https://www.ampproject.org/v0.js"></script>
```

en:

```
<script type="module" async src="https://www.ampproject.org/v0.mjs"></script>
<script nomodule async src="https://www.ampproject.org/v0.js"></script>
```

Adicionalmente, los navegadores que son capaces de descifrar `type="module"` ignoran los scripts con un atributo `nomodule`. Esto significa que los usuarios que tengan navegadores modernos se beneficiarán de los paquetes que requieran de un menor tiempo de ejecución, mientras que los usuarios con navegadores más antiguos recurrirán a la versión sin módulos del tiempo de ejecución de AMP.

Nota: la compilación del módulo de AMP solo está disponible para el AMP transformado, ya que requiere que el tiempo de ejecución de AMP para CSS tenga estilos integrados en el código.
