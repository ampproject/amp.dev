---
$title: Atributos comunes
---

[TOC]

AMP proporciona un conjunto de atributos comunes que se aplican a muchos componentes AMP (y elementos HTML).  A continuación, se describen cada uno de estos atributos comunes.

## fallback

Un respaldo es una convención que permite que el elemento comunique al lector que el navegador no es compatible con el elemento o que no se ha podido cargar el recurso subyacente. El atributo `fallback` se puede incluir en cualquier elemento HTML que sea un elemento secundario directo de un elemento AMP compatible con respaldos. El comportamiento exacto con respecto al respaldo depende de la implementación del elemento, pero por lo general se muestra el elemento de respaldo en lugar del elemento habitual.

Se suele utilizar con imágenes, animaciones, audio y vídeos.

Ejemplo:

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive" >
  <div fallback>No se pueden reproducir imágenes animadas en este dispositivo.</div>
</amp-anim>
[/sourcecode]

Para obtener más información, consulta [Marcadores de posición y respaldos](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## heights

Todos los elementos AMP compatibles con el diseño `responsive` también admiten el atributo `heights`. El valor de este atributo es una expresión de tamaño basada en expresiones de contenido multimedia, similar al [atributo sizes de las etiquetas `img`](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/img), pero con dos diferencias fundamentales:


1. El valor se aplica a la altura, pero no al ancho del elemento.
2. Se permiten valores porcentuales. Un valor porcentual indica el porcentaje del ancho del elemento. Por ejemplo, un valor de `80%` indica que la altura del elemento representa el 80 % del ancho del mismo.

Nota: Si el atributo `heights` se especifica junto a `width` y `height`, el `layout` será `responsive` de forma predeterminada.

Ejemplo:

[sourcecode:html]
<amp-img src="amp.png"
    width="320" height="256"
    heights="(min-width:500px) 200px, 80%">
</amp-img>
[/sourcecode]

Para obtener más información, consulta [Controlar los diseños con los atributos srcset, sizes y heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## layout

AMP proporciona un conjunto de [diseños](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) que especifican cómo se comporta un componente AMP dentro del diseño del documento. Se puede especificar el diseño del componente añadiendo el atributo `layout` con un valor de diseño válido para el elemento (para saber qué valores se admiten, consulta la documentación del elemento).

Ejemplo:

[sourcecode:html]
<amp-img src="/img/amp.jpg"
    width="1080"
    height="610"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Para obtener más información, consulta [Diseño y media queries](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) y las [especificaciones de diseño](amp-html-layout/index.md).

## media <a name="media"></a>

Todos los elementos AMP admiten el atributo `media`. El valor de `media` es una media query. Si la consulta no coincide, el elemento no se renderiza y no se obtienen sus recursos ni los potenciales recursos secundarios. Si la ventana del navegador cambia de tamaño o de orientación, las media queries se vuelven a evaluar y los elementos se ocultan y se muestran en función de los nuevos resultados.

Ejemplo:

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="466"
    height="355" layout="responsive"></amp-img>
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="527"
    height="193" layout="responsive"></amp-img>
[/sourcecode]

Para obtener más información, consulta [Diseño y media queries](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries).

## noloading

El atributo `noloading` indica si hay que **desactivar** el "indicador de carga" de este elemento. Muchos elementos AMP tienen un "indicador de carga": una animación sencilla para indicar que el elemento todavía no se ha cargado completamente.

Se suele utilizar con imágenes, animaciones, vídeos y anuncios.

Ejemplo:

[sourcecode:html]
<amp-img src="card.jpg"
    noloading
    height="190"
    width="297"
    layout="responsive">
</amp-img>
[/sourcecode]

## on

El atributo `on` se utiliza para instalar gestores de eventos en los elementos. El elemento determina qué eventos son compatibles.

Se suele utilizar con lightbox, barras laterales, listas que se actualizan y formularios.

Sintaxis:

[sourcecode:text]
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
[/sourcecode]

Ejemplo:

[sourcecode:html]
<button on="tap:my-lightbox">Abrir lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay">
  ...
</amp-lightbox>
[/sourcecode]

Para obtener más información, consulta [Acciones y eventos en AMP](amp-actions-and-events.md).

## placeholder

El elemento marcado con el atributo `placeholder` actúa como marcador de posición del elemento AMP superior. Se puede incluir este atributo en cualquier elemento HTML que sea un elemento secundario directo de un elemento AMP compatible con marcadores de posición. De forma predeterminada, el marcador de posición del elemento AMP se muestra inmediatamente, incluso si no se han descargado ni inicializado los recursos de dicho elemento. Una vez listo, el elemento AMP normalmente oculta su marcador de posición y muestra el contenido. El comportamiento exacto con respecto al marcador de posición depende de la implementación del elemento.

Se suele utilizar con imágenes, animaciones, vídeos y anuncios.

Ejemplo:

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

Para obtener más información, consulta [Marcadores de posición y respaldos](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## sizes

Todos los elementos AMP compatibles con el diseño `responsive` también admiten el atributo `sizes`. El valor de este atributo es una expresión de tamaño, tal como se describe en el [atributo sizes de las etiquetas `img`](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/img), pero se aplica a todo tipo de elementos y no solo a imágenes.

Ejemplo:

[sourcecode:html]
<amp-img src="amp.png"
    width="400" height="300"
    layout="responsive"
    sizes="(min-width: 320px) 320px, 100vw">
</amp-img>
[/sourcecode]

Para obtener más información, consulta [Controlar los diseños con los atributos srcset, sizes y heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## width y height

En el caso de algunos [diseños](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute), los componentes AMP deben tener un atributo `width` y otro atributo `height` con valores de píxeles en números enteros.

Ejemplo:

[sourcecode:html]
<amp-anim width="245"
    height="300"
    src="/img/cat.gif"
    alt="cat animation">
</amp-anim>
[/sourcecode]

Para obtener más información, consulta [Diseño y media queries](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) y las [especificaciones de diseño](amp-html-layout/index.md).
