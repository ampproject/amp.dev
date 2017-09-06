---
$title: Agregando componentes AMP ampliados
$order: 2
toc: true
---

[TOC]

El sistema de componentes de AMP le permite crear rápidamente características eficientes y de respuesta en sus artículos con un mínimo esfuerzo. La biblioteca HTML de AMP tiene tres clasificaciones para los componentes de AMP:

- **built-in**: Estos son los componentes que se incluyen en la biblioteca base de AMP JavaScript (especificada en la etiqueta `<head>`), como [amp-img](/docs/reference/components/amp-img.html) y [amp-pixel](/docs/reference/components/amp-pixel.html). Estos componentes se pueden utilizar inmediatamente en un documento de AMP.

- **extended**: Son extensiones de la biblioteca base que deben incluirse explícitamente en el documento como elementos personalizados. Los elementos personalizados requieren secuencias de comandos específicas que se agregan a la sección `<head>` (por ejemplo, `<script async custom-element="amp-video" ...`).

- **experimental**: Estos son los componentes que se liberan, pero aún no están listos para un uso amplio. Los desarrolladores pueden elegir optar por utilizar estas características antes de que se liberen completamente. Más información en [Experimental features](/docs/reference/experimental.html).

Nuestra muestra ya utiliza un componente incorporado, [amp-img](/docs/reference/components/amp-img.html), y exploramos cómo este componente se relaciona con el sistema de diseño AMP en el tutorial ["Convertir HTML a AMP"](/es/docs/tutorials/converting.html). Ahora, vamos a **agregar** algunos componentes de AMP extendidos comúnmente usados a nuestro artículo de noticias.

## Monetizar con anuncios

Los anuncios en AMP se construyen utilizando el componente [amp-ad](/docs/reference/components/amp-ad.html). El componente `amp-ad` le permite configurar anuncios de varias maneras, como el ancho, la altura y el modo de diseño. Sin embargo, muchas plataformas de anuncios requieren configuración adicional, como el ID de cuenta de la red publicitaria, el anuncio que debe publicarse o las opciones para segmentar la publicidad. Estas opciones se especifican fácilmente en el componente `amp-ad` mediante el uso de atributos HTML.

Eche un vistazo a este ejemplo de un anuncio de **DoubleClick**:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static">
</amp-ad>
```

Como puede ver, esta es una configuración muy simple. Tome nota del atributo `type`, que informa al componente `amp-ad` de la plataforma de anuncios que queremos utilizar. En este caso, queremos utilizar la plataforma de [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md), por lo que especificamos `doubleclick` como el valor.

El atributo `data-slot` es más único. En `amp-ad`, cualquier atributo que comience con `data-` son atributos específicos del proveedor. Esto significa que no todos los vendedores necesitarán necesariamente este atributo particular, ni reaccionarán necesariamente si se suministra. Por ejemplo, compare el ejemplo de **DoubleClick** de arriba con el siguiente anuncio de prueba de la plataforma [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md):

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

{% call callout('Importante', type='caution') %}
Es posible que tenga algunos errores en la consola de desarrollador, como `Mixed Content` o `XMLHttpRequest cannot load`. El error anterior probablemente esté relacionado con el anuncio de A9 porque no todo el contenido que carga es seguro. Este es un requisito notable para todos los anuncios publicados en AMP.
{% endcall %}

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

El ejemplo de orientación geográfica anterior muestra cómo `amp-ad` es lo suficientemente flexible para todo tipo de características de la plataforma de anuncios.

{% call callout('Nota', type='note') %}
Es posible que observe que dentro de estas etiquetas de amp-ad se encuentran etiquetas `div` adicionales con un atributo denominado `fallback` en ellas. ¿Puedes adivinar qué representa el atributo `fallback`? Se informa al sistema de carga de AMP para mostrar sólo el contenido de ese elemento cuando el elemento padre no se carga correctamente. Lo que significa que el elemento padre recae en el elemento hijo, de ahí el término ‘fallback’. Obtenga más información sobre [Placeholders & fallbacks](/es/docs/guides/responsive/placeholders.html).
{% endcall %}

{% call callout('Leer más', type='read') %}
Para ver las últimas redes publicitarias compatibles, lea la documentación de referencia del componente [amp-ad](/docs/reference/components/amp-ad.html#supported-ad-networks).
{% endcall %}

{% call callout('Nota', type='note') %}
No se permite que JavaScript en la red de anuncios se ejecute dentro del documento de AMP. En cambio, el tiempo de ejecución de AMP carga un iframe de origen diferente (a través de un sandbox iframe) como el documento AMP y ejecuta el JS de la red de anuncios dentro de ese sandbox iframe.
{% endcall %}

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

**Refresh** the page and look at the page. You should see this text instead of a video: *“The video could not be loaded.”*

Even if your browser can show YouTube videos without issue, you will still receive this error. Why? The video hasn’t actually failed to load, rather the component itself failed.

Remember, not all components are included in the core AMP library JavaScript file. We need to include an additional JavaScript request for the YouTube component.  

**Add** the following script to the `<head>` tag:

```html
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

**Refresh** the page and you should see the YouTube video:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Embedded Youtube video') }}

Once again, we specified the `width` and `height` of the video so that the AMP layout system can calculate the aspect ratio. Also, we set the `layout` to `responsive`, so the video fills the width of its parent element.

To learn more about embedding YouTube videos, read the [amp-youtube](/docs/reference/components/amp-youtube.html) component documentation. For even more video and media components, check out the [list of AMP components](/docs/reference/components.html#media).

{% call callout('Tip', type='success') %}
Use the [`fallback`](/docs/guides/responsive/placeholders.html#fallbacks) attribute to inform users if a component fails to load or if the component is unsupported in their browser.
{% endcall %}

## Display a Tweet
Embedding preformatted tweets from Twitter is a common feature in news articles. The [amp-twitter](/docs/reference/components/amp-twitter.html) component can provide this functionality with ease.

Start by adding the following JavaScript request to the `<head>` tag of your document:

```html
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
```

Now, in your article **add** this code to embed the Tweet:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```

The `data-tweetid` attribute is another example of a custom attribute required by a particular platform. In this case, Twitter correlates the value of the `data-tweetid` attribute to a particular Tweet.

**Refresh** your browser and take a look at the page. You should see the Tweet appear:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Embedded Tweet') }}

To learn more about embedding Twitter Tweets, read the [amp-twitter](/docs/reference/components/amp-twitter.html) component documentation.

{% call callout('Tip', type='success') %}
AMP provides even more components for embedding content from social networks. See the latest [social AMP components](/docs/reference/components.html#social).
{% endcall %}

## Highlight an article quote

A common feature in news articles is to highlight particularly engaging snippets of text from the article. For example, a quotation from a particular source or an important fact might be repeated in a larger font to attract the reader's attention.

However, not all snippets of text are necessarily the same length of characters, which can make it difficult to balance a larger font size with the amount of space the text consumes on the page.

AMP provides another component specifically designed for this type of situation, it's called the [amp-fit-text](/docs/reference/components/amp-fit-text.html) component. The `amp-fit-text` component allows you to define a fixed width and height element, and a maximum font size. The component intelligently scales the font size to **fit** the text within the available width and height.

Let’s give it a try. First, **add** the component’s library to the `<head>` tag:

```html
<script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
```

Add the following to your page:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**Refresh** the page and look at the result!

Now, experiment further. What happens if the quotation is much shorter?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

Or, what if the quotation is longer?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
   And the Raven, never flitting, still is sitting, still is sitting. On the pallid bust of Pallas just above my chamber door; And his eyes have all the seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming throws his shadow on the floor; And my soul from out that shadow that lies floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

As a last experiment with `amp-fit-text`, try creating a short piece of text,  such as "Hello" with a much larger height (for example, a value of 400), and maintaining the max-font-size attribute value of 42. What would the resulting page look like? Is the text centered vertically? Or, does the height of the amp-fit-text tag shrink to fit the max font size? With what you already know about AMP’s layout system, try to answer the question before playing with the code!

You can learn more about `amp-fit-text` from [AMP BY Example's live demo](https://ampbyexample.com/components/amp-fit-text/).


<div class="prev-next-buttons">
  <a class="button prev-button" href="/es/docs/tutorials/add_advanced/review_code.html"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="/es/docs/tutorials/add_advanced/adding_carousels.html"><span class="arrow-next">Próximo</span></a>
</div>
