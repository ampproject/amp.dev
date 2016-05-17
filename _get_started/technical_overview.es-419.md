---
layout: page
title: Cómo AMP acelera el rendimiento
order: 2
locale: es-419
---

La combinación de las siguientes optimizaciones hace que las páginas AMP se carguen de manera casi instantánea:

{% include toc.html %}

Si prefieres escuchar antes que leer, en el siguiente video realizado por Malte Ubl, responsable de ingeniería de AMP, se ofrece información general similar a la que encontrarás en los párrafos que aparecen a continuación.

<amp-youtube
    data-videoid="hVRkG1CQScA"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

## Se permiten únicamente scripts asíncronos

JavaScript es poderoso:
puede modificar casi todos los aspectos de la página,
pero también puede bloquear la construcción del DOM y demorar la representación de la página
(consulta también [Añadir interactividad con JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)).
Para evitar que JavaScript demore la representación de páginas,
AMP solo permite JavaScript asíncrono. 

Las páginas AMP no pueden incluir JavaScript de autor.
En lugar de JavaScript,
para el control de las funciones de las páginas interactivas se emplean elementos de AMP personalizados.
Es posible que los elementos de AMP personalizados tengan ocultos rasgos de JavaScript,
pero están diseñados cuidadosamente para no tener efectos negativos en el rendimiento.

Si bien se permite contenido JS de terceros en iframes,
este no puede bloquear la representación.
Por ejemplo, si en el contenido JS de terceros se usa la
[API `document.write`, totalmente contraproducente para el rendimiento](http://www.stevesouders.com/blog/2012/04/10/dont-docwrite-scripts/),
no se bloqueará la representación de la página principal.

## Se ordenan estáticamente los recursos

Los recursos externos, como las imágenes, los anuncios o los iframes, deben establecer su tamaño en HTML
para que las páginas AMP puedan determinar el tamaño y la posición de cada elemento antes de que se descarguen los recursos.
El sistema AMP carga el diseño de una página sin esperar que se descarguen recursos.

Las páginas AMP desacoplan el diseño del documento del diseño del recurso.
Solo se necesita una solicitud HTTP para diseñar por completo el documento completo
([y las fuentes](#font-triggering-must-be-efficient)).
Dado que las páginas AMP están optimizadas para evitar recálculos de estilo y diseños pesados en el navegador,
no se llevará a cabo ninguna instancia de rediseño cuando se carguen los recursos.

## No se permite que los mecanismos de extensión bloqueen la representación

El sistema AMP no permite que los mecanismos de extensión bloqueen la representación de páginas.
Admite extensiones para recursos como
[lightbox](/docs/reference/extended/amp-lightbox.html),
[inserciones de Instagram](/docs/reference/extended/amp-instagram.html),
[tuits](/docs/reference/extended/amp-twitter.html), etc.
Si bien estos recursos necesitan de solicitudes HTTP adicionales,
estas no bloquean el diseño ni la representación de páginas. 

Todas las páginas en las que se use un script personalizado deben indicarle al sistema AMP
que eventualmente tendrá una etiqueta personalizada.
Por ejemplo, el script [`amp-iframe`](/docs/reference/extended/amp-iframe.html)
le indica que habrá una etiqueta `amp-iframe`.
Las páginas AMP crean el cuadro de iframe antes de determinar lo que incluirá: 

{% highlight html %}
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{% endhighlight %}

## Se mantiene el contenido JavaScript de terceros lejos de la ruta de acceso crítica

En el contenido JS de terceros generalmente se aplica carga de JS sincrónica y
también se implementa `document.write` en más scripts de sincronización.
Por ejemplo, si tienes cinco anuncios y cada uno de ellos tiene tres cargas sincrónicas
con una conexión de latencia de 1 segundo,
tendrás 18 segundos de carga solo para el contenido JS. 

Las páginas AMP permiten JavaScript de terceros, pero solo en iframes de espacio aislado.
Si se restringen a los iframes, no pueden bloquear la ejecución de la página principal.
Incluso si activan varios recálculos de estilo,
sus minúsculos iframes tienen muy poco del DOM. 

Los recálculos de estilo y los diseños son típicos del tamaño del DOM.
Por lo tanto, los recálculos de iframe son muy rápidos en comparación
con el recálculo de estilos y el diseño para la página.

## Los elementos de CSS deben estar alineados y su tamaño debe estar limitado

Los elementos de CSS bloquean toda representación y la carga de páginas, y su tamaño tiende a aumentar.
En páginas HTML de AMP, solo se permiten los estilos en línea.
Esto elimina una o, a menudo, más solicitudes HTTP de la ruta de acceso de representación crítica
en comparación con la mayoría de páginas web.

Además, la hoja de estilo en línea tiene un tamaño máximo de 50 kilobytes.
Si bien este tamaño es suficiente para páginas muy sofisticadas,
es necesario que el autor de la página realice un mantenimiento de CSS adecuado.

## La activación de fuentes debe ser eficaz

Las fuentes web son muy grandes. Por lo tanto, la 
[optimización de fuentes web](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)
es crucial para el rendimiento.
En una página típica que tiene algunos scripts sincrónicos y algunas hojas de estilo externas,
el navegador aguarda para comenzar a descargar estas fuentes enormes hasta que todo esto suceda.

El sistema de AMP declara cero solicitudes HTTP hasta que las fuentes comienzan a descargarse.
Esto solo es posible porque todo el contenido JS en AMP tiene el atributo asíncrono
y porque solo se permiten hojas de estilo en línea;
no hay solicitudes HTTP que impidan que el navegador descargue las fuentes.

## Se minimizan los recálculos de estilo

Siempre que se mide algo se activan recálculos de estilo que resultan pesados,
ya que el navegador debe diseñar la página completa.
En páginas AMP, todas las lecturas del DOM tienen lugar antes que las escrituras.
Esto garantiza el valor máximo de un recálculo de estilos por cuadro.

Puedes obtener más información sobre el impacto de los recálculos de estilo y diseño en
[Rendimiento de la representación](https://developers.google.com/web/fundamentals/performance/rendering/).

## Solo se ejecutan animaciones con aceleración por GPU

La única forma de lograr optimizaciones rápidas es ejecutarlas en la GPU.
La GPU reconoce capas, identifica los procedimientos para llevar a cabo tareas en estos diseños
y puede moverlos y atenuarlos, pero no puede actualizar el diseño de la página.
Deriva la tarea al navegador, y eso no es conveniente.

Las reglas para CSS relacionado con la animación garantizan que la GPU pueda acelerar las animaciones.
Específicamente, el sistema de AMP solo permite realizar animaciones y transiciones en transformación y opacidad
para que no se necesite el diseño de la página.
Obtén más información sobre el
[Uso de los cambios en las propiedades transform y opacity para las animaciones](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count).

## Se prioriza la carga de recursos

El sistema de AMP controla todas las descargas de recursos. Prioriza la carga de recursos,
ya que carga solo lo que es necesario y realiza capturas previas de recursos de carga diferida. 

Cuando descarga recursos, optimiza las descargas
para que se descarguen primero los recursos actuales más importantes.
Las imágenes y los anuncios solo se descargan si es probable que el usuario los vea,
en la parte superior de la página, o se desplace rápidamente hacia ellos.  

El sistema de AMP también realiza capturas previas de recursos de carga diferida.
Los recursos se cargan lo más tarde posible, pero su captura previa se produce lo más pronto posible.
De esa manera, los objetos se cargan muy rápido, pero el CPU solo se usa
cuando se muestran los recursos ante el usuario.

## Las páginas se cargan al instante

La nueva [API de preconexión](http://www.w3.org/TR/resource-hints/#dfn-preconnect)
se usa mucho para garantizar que las solicitudes HTTP sean lo más rápidas posible cuando se crean.
De esta forma,
una página se puede representar antes de que el usuario especifique explícitamente que quiere dirigirse hacia ella.
La página puede estar disponible cuando el usuario la seleccione,
lo cual hará que se cargue al instante.

Si bien la representación previa puede aplicarse a todo el contenido web,
también es posible que ocupe muchos recursos de ancho de banda y CPU. El sistema de AMP está optimizado para propiciar una reducción en ambos factores. Para la representación previa solo se descargan los recursos que están en la parte superior de la página
y no se representan los objetos que puedan ser pesados en términos de uso de CPU.

Cuando los documentos de AMP se representan previamente para la carga instantánea,
solo se descargan los recursos que están en la parte superior de la página.
A su vez, aquellos recursos que bajo las mismas circunstancias pudieran
implicar una alta exigencia para el CPU (como iframes de terceros) no se descargarán. 

Obtén más información sobre la
[razón por la cual AMP HTML no aprovecha en su totalidad el escáner de precarga](https://medium.com/@cramforce/why-amp-html-does-not-take-full-advantage-of-the-preload-scanner-7e7f788aa94e).

## Se agiliza el sistema de AMP
El sistema de AMP es de código abierto.
Necesitamos tu ayuda para que sea aún más rápido.
Entérate de [cómo contribuir](/docs/support/contribute.html).
