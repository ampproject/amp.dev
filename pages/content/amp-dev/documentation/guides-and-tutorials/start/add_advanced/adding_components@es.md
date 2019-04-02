---
$title: Agregando componentes AMP ampliados
---

El sistema de componentes de AMP le permite crear rápidamente características eficientes y de respuesta en sus artículos con un mínimo esfuerzo. La biblioteca HTML de AMP tiene tres clasificaciones para los componentes de AMP:

- **built-in**: Estos son los componentes que se incluyen en la biblioteca base de AMP JavaScript (especificada en la etiqueta `<head>`), como [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) y [`amp-pixel`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-pixel.md', locale=doc.locale).url.path}}). Estos componentes se pueden utilizar inmediatamente en un documento de AMP.

- **extended**: Son extensiones de la biblioteca base que deben incluirse explícitamente en el documento como elementos personalizados. Los elementos personalizados requieren secuencias de comandos específicas que se agregan a la sección `<head>` (por ejemplo, `<script async custom-element="amp-video" ...`).

- **experimental**: Estos son los componentes que se liberan, pero aún no están listos para un uso amplio. Los desarrolladores pueden elegir optar por utilizar estas características antes de que se liberen completamente. Más información en [Experimental features]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/experimental.md', locale=doc.locale).url.path}}).

Nuestra muestra ya utiliza un componente incorporado, [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}). Ahora, vamos a **agregar** algunos componentes de AMP extendidos comúnmente usados a nuestro artículo de noticias.

## Monetizar con anuncios

Los anuncios en AMP se construyen utilizando el componente [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}). El componente [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) le permite configurar anuncios de varias maneras, como el ancho, la altura y el modo de diseño. Sin embargo, muchas plataformas de anuncios requieren configuración adicional, como el ID de cuenta de la red publicitaria, el anuncio que debe publicarse o las opciones para segmentar la publicidad. Estas opciones se especifican fácilmente en el componente [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) mediante el uso de atributos HTML.

Eche un vistazo a este ejemplo de un anuncio de **DoubleClick**:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static">
</amp-ad>
```

Como puede ver, esta es una configuración muy simple. Tome nota del atributo `type`, que informa al componente [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) de la plataforma de anuncios que queremos utilizar. En este caso, queremos utilizar la plataforma de [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md), por lo que especificamos `doubleclick` como el valor.

El atributo `data-slot` es más único. En [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}), cualquier atributo que comience con `data-` son atributos específicos del proveedor. Esto significa que no todos los vendedores necesitarán necesariamente este atributo particular, ni reaccionarán necesariamente si se suministra. Por ejemplo, compare el ejemplo de **DoubleClick** de arriba con el siguiente anuncio de prueba de la plataforma [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md):

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302">
</amp-ad>
```

Trate de **añadir** los dos ejemplos anteriores en su artículo justo después de la etiqueta `<header>`. **Actualice** la página y verá dos anuncios de prueba:

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Prueba de Anuncios') }}

Importante: Es posible que tenga algunos errores en la consola de desarrollador, como `Mixed Content` o `XMLHttpRequest cannot load`. El error anterior probablemente esté relacionado con el anuncio de A9 porque no todo el contenido que carga es seguro. Este es un requisito notable para todos los anuncios publicados en AMP.

Exploremos algunas opciones más disponibles para usar con los anuncios de DoubleClick. Intente **agregar** estas dos configuraciones de anuncios de orientación geográfica a los anuncios:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk">
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us">
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

Desafortunadamente, la segmentación geográfica no puede controlarse desde el código de la propia página. Sin embargo, estos anuncios de prueba ya se han configurado en el panel de DoubleClick para que sólo se muestren en países concretos, específicamente en el Reino Unido y los Estados Unidos de América.

**Actualiza** la página y echa un vistazo. La siguiente captura de pantalla se ha capturado desde Canadá, por lo que ni las cargas de anuncios:

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Prueba de Anuncios') }}

El ejemplo de orientación geográfica anterior muestra cómo [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) es lo suficientemente flexible para todo tipo de características de la plataforma de anuncios.

Nota: Es posible que observe que dentro de estas etiquetas de [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) se encuentran etiquetas `div` adicionales con un atributo denominado `fallback` en ellas. ¿Puedes adivinar qué representa el atributo `fallback`? Se informa al sistema de carga de AMP para mostrar sólo el contenido de ese elemento cuando el elemento padre no se carga correctamente. Lo que significa que el elemento padre recae en el elemento hijo, de ahí el término ‘fallback’. Obtenga más información sobre [Placeholders & fallbacks]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}).

Leer más: Para ver las últimas redes publicitarias compatibles, lea la documentación de referencia del componente [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}).

Nota: No se permite que JavaScript en la red de anuncios se ejecute dentro del documento de AMP. En cambio, el tiempo de ejecución de AMP carga un iframe de origen diferente (a través de un sandbox iframe) como el documento AMP y ejecuta el JS de la red de anuncios dentro de ese sandbox iframe.

Nuestro documento de AMP ahora incluye texto, una imagen y un anuncio incrustado en la página, que son todos los ingredientes clave para contar una historia y monetizar su contenido. Sin embargo, los sitios web modernos a menudo incluyen más funcionalidad que simplemente imágenes y texto.

Vamos a llevar nuestro documento de AMP al siguiente nivel y agregar funcionalidad web más avanzada que se encuentra comúnmente en los artículos de noticias, como:

- YouTube videos
- Tweets
- Article quotes

##  Incluir un video de YouTube
Intente incrustar un video de YouTube en el documento. **Agregue** el siguiente código justo después del `<header>` en su documento AMP:

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270">
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

**Actualiza** la página y mira la página. Debería ver este texto en lugar de un video: *“The video could not be loaded.”*

Incluso si su navegador puede mostrar vídeos de YouTube sin problemas, seguirá recibiendo este error. ¿Por qué? El video no ha fallado en la carga, sino que el propio componente falló.

Recuerde que no todos los componentes están incluidos en el archivo JavaScript de la biblioteca principal de AMP. Tenemos que incluir una solicitud JavaScript adicional para el componente de YouTube.

**Agregue** la siguiente secuencia de comandos a la etiqueta `<head>`:

```html
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

**Actualice** la página y debería ver el video de YouTube:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Vídeo incrustado de Youtube') }}

Una vez más, especificamos el `width` y la `height` del video para que el sistema de distribución AMP pueda calcular la relación de aspecto. Además, establecemos el `layout` en `responsive`, por lo que el video llena el ancho de su elemento padre.

Para obtener más información sobre la incorporación de vídeos de YouTube, lea la documentación del componente [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}).

[tip type="tip"]
**TIP –** Use el atributo [`fallback`]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}#fallbacks) para informar a los usuarios si el componente falla en cargar o si el componente no es soportado por su navegador web.
[/tip]

## Mostrar un Tweet
La incorporación de tweets preformateados de Twitter es una característica común en los artículos de noticias. El componente [`amp-twitter`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}) puede proporcionar esta funcionalidad con facilidad.

Comience agregando la siguiente solicitud de JavaScript a la etiqueta `<head>` de su documento:

```html
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
```

Ahora, en su artículo, **agregue** este código para incrustar el Tweet:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```

El atributo `data-tweetid` es otro ejemplo de un atributo personalizado requerido por una plataforma particular. En este caso, Twitter correlaciona el valor del atributo `data-tweetid` con un determinado Tweet.

**Actualiza** tu navegador y echa un vistazo a la página. Usted debe ver el Tweet aparecer:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Tweet Insertado') }}

Para obtener más información sobre la incorporación de Tweets de Twitter, lea la documentación del componente [`amp-twitter`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}).

[tip type="tip"]
**TIP –** AMP proporciona aún más componentes para incrustar contenido de redes sociales. Vea los últimos [social AMP components]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}).
[/tip]

## Resaltar una cita de artículo

Una característica común en los artículos de noticias es resaltar fragmentos particularmente atractivos de texto del artículo. Por ejemplo, una cita de una fuente particular o un hecho importante puede repetirse en una fuente más grande para atraer la atención del lector.

Sin embargo, no todos los fragmentos de texto tienen necesariamente la misma longitud de caracteres, lo que puede dificultar el equilibrio entre un tamaño de fuente mayor y la cantidad de espacio que el texto consume en la página.

AMP proporciona otro componente específicamente diseñado para este tipo de situación, se llama el componente [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}). El componente [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) le permite definir un elemento de ancho y altura fijos y un tamaño de fuente máximo. El componente escala inteligentemente el tamaño de la fuente para **ajustar** el texto dentro del ancho y la altura disponibles.

Hagamos un intento. Primero, **agregue** la biblioteca del componente a la etiqueta `<head>`:

```html
<script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
```

Agregue lo siguiente a su página:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**Actualice** la página, y vea el resultado!

Ahora, experimente más. ¿Qué pasa si la cita es mucho más corta?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

O, ¿qué pasa si la cita es más larga?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
   And the Raven, never flitting, still is sitting, still is sitting. On the pallid bust of Pallas just above my chamber door; And his eyes have all the seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming throws his shadow on the floor; And my soul from out that shadow that lies floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

Como último experimento con [`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}), intente crear un fragmento corto de texto, como "Hello" con una altura mucho mayor (por ejemplo, un valor de 400), y manteniendo el valor de atributo max-font-size de 42. ¿Cómo sería la página resultante? ¿Está el texto centrado verticalmente? ¿O la altura de la etiqueta de ajuste de amplificación de texto se encoge para ajustarse al tamaño de fuente máximo? Con lo que ya sabes sobre el sistema de distribución de AMP, intenta responder a la pregunta antes de jugar con el código!

Puede obtener más información sobre el amplificador de ajuste de texto de la demostración en vivo de [AMP BY Example]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-fit-text.html', locale=doc.locale).url.path}}).
