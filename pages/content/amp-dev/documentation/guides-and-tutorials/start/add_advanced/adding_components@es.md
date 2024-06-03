---
'$title': Adición de componentes AMP ampliados
$order: 2
description: 'El sistema de componentes de AMP le permite crear rápidamente características eficientes y de respuesta en sus artículos con un mínimo esfuerzo. La biblioteca HTML de AMP tiene tres clasificaciones para los componentes de AMP: ...'
---

El sistema de componentes de AMP le permite crear rápidamente características eficientes y de respuesta en sus artículos con un mínimo esfuerzo. La biblioteca HTML de AMP tiene tres clasificaciones para los componentes de AMP:

- **built-in**: Estos son los componentes que se incluyen en la biblioteca base de AMP JavaScript (especificada en la etiqueta `<head>`), como [`amp-img`](../../../../documentation/components/reference/amp-img.md) y [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Estos componentes se pueden utilizar inmediatamente en un documento de AMP.

- **extended**: Son extensiones de la biblioteca base que deben incluirse explícitamente en el documento como elementos personalizados. Los elementos personalizados requieren secuencias de comandos específicas que se agregan a la sección `<head>` (por ejemplo, `<script async custom-element="`[`amp-video`](../../../../documentation/components/reference/amp-video.md)`...`).

- **experimental**: Estos son los componentes que se liberan, pero aún no están listos para un uso amplio. Los desarrolladores pueden optar por utilizar estas características antes de que se liberen completamente. Obtenga más información en [Características experimentales](../../../../documentation/guides-and-tutorials/learn/experimental.md).

Nuestra muestra ya utiliza un componente incorporado, [`amp-img`](../../../../documentation/components/reference/amp-img.md), y exploramos cómo ese componente se relaciona con el sistema de diseño de AMP en el tutorial <a>"Convierta su HTML a AMP"</a>. Ahora, vamos a agregar algunos componentes de AMP <strong>extended</strong> que se utilizan comúnmente a nuestro artículo de noticias.

## Monetización con anuncios

Los anuncios en AMP se construyen utilizando el componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). El componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) le permite configurar anuncios de varias maneras, como el ancho, la altura y el diseño. Sin embargo, muchas plataformas de anuncios requieren configuración adicional, como el ID de cuenta de la red publicitaria, el anuncio que debe publicarse o las opciones para segmentar la publicidad. Estas opciones se especifican fácilmente en el componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) mediante el uso de atributos HTML.

Dele un vistazo a este ejemplo de un anuncio de **DoubleClick**:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static"
>
</amp-ad>
```

Como puede ver, esta es una configuración muy simple. Tome nota del atributo `type`, que informa al componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) de la plataforma de anuncios que queremos utilizar. En este caso, queremos utilizar la plataforma de [DoubleClick](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md), así que especificamos `doubleclick` como el valor.

El atributo `data-slot` es más único. En [`amp-ad`](../../../../documentation/components/reference/amp-ad.md), cualquier atributo que comience con `data-` es un atributo específico del proveedor. Esto significa que no todos los vendedores necesitarán necesariamente este atributo particular, ni reaccionarán necesariamente si se proporciona. Por ejemplo, compare el ejemplo de **DoubleClick** de arriba con el siguiente anuncio de prueba de la plataforma [A9](https://github.com/ampproject/amphtml/blob/main/ads/a9.md):

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

Trate de **añadir** los dos ejemplos anteriores en su artículo justo después de la etiqueta `<header>`.

Recuerde que no todos los componentes están incluidos en el archivo JavaScript de la biblioteca principal de AMP. Necesitamos incluir una solicitud JavaScript adicional para el componente del anuncio.

<strong>Agregue</strong> la siguiente secuencia de comandos a la etiqueta `<head>`:

```html
<script
  async
  custom-element="amp-ad"
  src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
></script>
```

**Actualice** la página y debería ver 2 anuncios de prueba:

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Test ads') }}

[tip type="important"]
Es posible que tenga algunos errores en la consola de desarrollador, como <code>Mixed Content</code> o <code>XMLHttpRequest cannot load</code>. El error anterior probablemente esté relacionado con el anuncio de A9 porque no todo el contenido que carga es seguro. Este es un requisito importante para todos los anuncios que se presentan en AMP. [/tip]

Los dos <a><code>amp-ad</code></a>s que se muestran a continuación son un ejemplo de la flexibilidad que <a><code>amp-ad</code></a> ofrece para soportar las características de la plataforma publicitaria. En este caso hemos configurado (utilizando el panel de control de DoubleClick) dos anuncios de prueba de DoubleClick para que solo se muestren en ciertos países. El primero se mostrará solo en el Reino Unido y el segundo se mostrará solo en los Estados Unidos. Intente <strong>agregar</strong> estas dos configuraciones de anuncios geográficos en el documento AMP, debajo de los anuncios que agregó anteriormente:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk"
>
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us"
>
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

<strong>Actualice</strong> la página y dele un vistazo. La siguiente captura de pantalla se tomó desde Canadá, así que tampoco se cargaron los anuncios:

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Test ads') }}

[tip type="note"] <strong>NOTA:</strong> Tal vez observe que dentro de estas etiquetas de [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) se encuentran etiquetas <code>div</code> adicionales con un atributo denominado <code>fallback</code> en ellas. ¿Puede adivinar qué representa el atributo <code>fallback</code>? Informa al sistema de carga de AMP para mostrar solo el contenido de ese elemento cuando el elemento padre no se carga correctamente. Esto significa que el elemento padre recae en el elemento hijo. Obtenga más información sobre <a>Placeholders & fallbacks</a>. [/tip]

[tip type="read-on"] <strong>LEER MÁS:</strong> Para ver las últimas redes publicitarias compatibles, lea la documentación de referencia del componente <a><code>amp-ad</code></a>. [/tip]

[tip type="note"] <strong>NOTE:</strong> No se permite que el JavaScript proporcionado por la red publicitaria se ejecute dentro del documento AMP. En cambio, el tiempo de ejecución de AMP carga un iframe de origen diferente (a través de un sandbox iframe) como el documento AMP y ejecuta el JS de la red de anuncios dentro de ese sandbox iframe. [/tip]

Nuestro documento de AMP ahora incluye texto, una imagen y un anuncio incrustado en la página, los cuales son todos los ingredientes clave para contar una historia y monetizar su contenido. Sin embargo, los sitios web modernos a menudo incluyen más funciones que simples imágenes y texto.

Llevaremos nuestro documento de AMP al siguiente nivel y agregaremos funciones web más avanzadas que comúnmente se encuentran en los artículos de noticias, como:

- Videos de YouTube
- Tweets
- Citas en artículos

## Cómo insertar un video de YouTube

Trataremos de insertar un video de YouTube en el documento. **Agregue** el siguiente código inmediatamente después del <code><header></code> en su documento AMP (sobre el <a><code>amp-ad</code></a> que acaba de añadir):

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270"
>
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

<strong>Actualice</strong> la página. Debería ver este texto en vez de un video: <em>“The video could not be loaded.”</em>

Incluso si su navegador puede mostrar videos de YouTube sin problemas, seguirá recibiendo este error. ¿Por qué? El video no falló durante la carga, sino que el error se produjo en el componente en sí.

Recuerde que no todos los componentes están incluidos en el archivo JavaScript de la biblioteca principal de AMP. Necesitamos incluir una solicitud JavaScript adicional para el componente de YouTube.

[tip type="note"] **NOTA:** Si aún tiene su consola de desarrollo abierta y <code>#development=1</code> en su URL, verá un error del validador AMP en este punto para recordarle que agregue el JavaScript <a><code>amp-youtube</code></a> y un enlace a la documentación que le dirá la etiqueta <code>script</code> que debe añadir. [/tip]

<strong>Agregue</strong> la siguiente secuencia de comandos a la etiqueta <code><head></code>:

```html
<script
  async
  custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
></script>
```

<strong>Actualice</strong> la página y debería ver el anuncio de YouTube:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Embedded Youtube video') }}

Al igual que con los otros elementos de la página, especificamos el <code>width</code> y la <code>height</code> del video para que el sistema de distribución AMP pueda calcular la relación de aspecto. Además, establecemos el `layout` en <code>responsive</code>, de modo que el video llene el ancho de su elemento padre.

Para obtener más información sobre cómo insertar videos de YouTube, lea la documentación del componente [`amp-youtube`](../../../../documentation/components/reference/amp-twitter.md). Para obtener más componentes de video y de medios, consulte la <a>lista de de componentes de medios AMP</a>.

[tip type="tip"] <strong>CONSEJO:</strong> Use el atributo <a><code>fallback</code></a> para informar a los usuarios si el componente falla al cargar o si no es compatible con su navegador web. [/tip]

## Mostrar un Tweet

La incrustación de tweets preformateados de Twitter es una característica común en los artículos de noticias. El componente <a><code>amp-twitter</code></a> puede proporcionar esta función con facilidad.

Comience agregando la siguiente solicitud de JavaScript a la etiqueta <code><head></code> de su documento:

```html
<script
  async
  custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
></script>
```

Ahora, en su artículo, **agregue** este código para incrustar el Tweet:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985"
>
</amp-twitter>
```

El atributo <code>data-tweetid</code> es otro ejemplo de un atributo personalizado requerido por una plataforma particular. En este caso, Twitter correlaciona el valor del atributo <code>data-tweetid</code> con un Tweet determinado.

<strong>Actualice</strong> su navegador y dele un vistazo a la página. Debería ver que el Tweet aparece:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Embedded Tweet') }}

Para obtener más información sobre la incrustación de Tweets de Twitter, lea la documentación del componente <a><code>amp-twitter</code></a>.

[tip type="tip"] <strong>CONSEJO:</strong> AMP proporciona aún más componentes para incrustar el contenido de las redes sociales. Vea los últimos <a>componentes sociales de AMP</a>. [/tip]

## Resaltar una cita de artículo

Una característica común en los artículos de noticias es resaltar fragmentos de texto particularmente atractivos del artículo. Por ejemplo, una cita de una fuente particular o un hecho importante puede repetirse en una fuente más grande para atraer la atención del lector.

Sin embargo, no todos los fragmentos de texto tienen necesariamente la misma longitud de caracteres, lo cual puede dificultar el equilibrio entre un tamaño de fuente mayor y la cantidad de espacio que el texto consume en la página.

AMP proporciona otro componente específicamente diseñado para este tipo de situación, se llama el componente <a><code>amp-fit-text</code></a>. El componente <a><code>amp-fit-text</code></a> le permite definir un elemento de ancho y altura fijos y un tamaño de fuente máximo. El componente escala inteligentemente el tamaño de la fuente para <strong>ajustar</strong> el texto dentro del ancho y la altura disponibles.

Hagamos un intento. Primero, **agregue** a la etiqueta la biblioteca del componente <code><head></code>:

```html
<script
  async
  custom-element="amp-fit-text"
  src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"
></script>
```

Agregue lo siguiente a su página:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

¡<strong>Actualice</strong> la página y vea el resultado!

Ahora, experimente más. ¿Qué pasa si la cita es mucho más corta?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

O, ¿qué pasa si la cita es más larga?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  And the Raven, never flitting, still is sitting, still is sitting. On the
  pallid bust of Pallas just above my chamber door; And his eyes have all the
  seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming
  throws his shadow on the floor; And my soul from out that shadow that lies
  floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

Como último experimento con [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md), intente crear un fragmento de texto corto, como "Hello", con una altura mucho mayor (por ejemplo, un valor de 400), y mantenga el valor de atributo max-font-size en 42. ¿Cómo sería la página resultante? ¿El texto está centrado verticalmente? ¿O la altura de la etiqueta de ajuste <a><code>amp-fit-text</code></a> se encoge para ajustarse al tamaño de fuente máximo? Con lo que ya conoce sobre el sistema de distribución de AMP, ¡trate de responder a la pregunta antes de jugar con el código!

Puede obtener más información sobre [<code>amp-fit-text</code>](../../../../documentation/components/reference/amp-fit-text.md) en la [Demostración de ejemplos en vivo de AMP](../../../../documentation/components/reference/amp-fit-text.md).
