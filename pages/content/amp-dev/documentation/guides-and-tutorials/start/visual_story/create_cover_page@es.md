---
$title: Crear la portada
---

El componente `<amp-story-page>` representa una página de una historia AMP. Dentro de [`amp-story`](../../../../documentation/components/reference/amp-story.md), puede haber uno o varios componentes `<amp-story-page>` que contienen cada una de las pantallas individuales de una historia. La primera página que especificas en el orden del documento es la primera página que se muestra en la historia.

Para crear una página, **añade** el elemento `<amp-story-page>` como componente secundario de [`amp-story`](../../../../documentation/components/reference/amp-story.md). **Asigna** un ID único a la página. En nuestro caso, vamos a asignar el ID único `cover` a la primera página, que se conoce como portada:

```html hl_lines="6 7"
<amp-story standalone
    title="The joy of pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
   <amp-story-page id="cover">
   </amp-story-page>
</amp-story>
```

Ya tenemos la base para nuestra portada. Sin embargo, la historia sigue sin ser válida.  Debemos especificar una **capa** como mínimo dentro de la página.
{{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='la portada tiene dos capas', align='right third' ) }}

## Capas de una página

Al igual que las capas de los gráficos, puedes utilizar capas en las páginas de una historia AMP para crear efectos visuales. Las capas se apilan una encima de otra, por lo que la primera capa es la capa final y, sobre esta, se coloca la siguiente y así sucesivamente.

La portada se compone de dos capas:

* **Capa 1:** incluye una imagen que se utiliza como fondo de pantalla.
* **Capa 2:** incluye el título y la firma de la historia.

### Crear la capa 1

Vamos a añadir la primera capa a la portada. La capa incluye una imagen que llena la pantalla.

Para crear la capa, añade el elemento `<amp-story-grid-layer>` como componente secundario de `<amp-story-page>`. Como queremos que la imagen ocupe la pantalla, utiliza el atributo `template="fill"` para `amp-story-grid-layer`. Dentro de la capa, añade un elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md) para el archivo `cover.jpg` y asegúrate de que el diseño se adapte (es decir, `layout="responsive"`) a las dimensiones de imagen 720x1280 píxeles.  A continuación, te indicamos el aspecto que debe tener la capa:

```html hl_lines="2 3 4 5 6 7"
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img src="assets/cover.jpg"
        width="720" height="1280"
        layout="responsive">
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

Veamos cómo se muestra la página.  Abre la página en tu navegador: <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

Si todo ha salido bien, debería tener un aspecto similar al de esta imagen:

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### Crear la capa 2

Ya tenemos un fondo de pantalla, pero necesitamos una segunda capa, que se coloca sobre el fondo y contiene el título y la firma.  Para añadir la segunda capa, vamos a seguir los mismos pasos que con la capa 1, pero, en lugar de utilizar la plantilla `fill`, utilizaremos la plantilla **`vertical`**. No obstante, antes de continuar, vamos a explicar las plantillas y cómo se pueden organizar los elementos AMP y HTML en un elemento `<amp-story-grid-layer>`.

#### Colocar elementos con una plantilla

El elemento `<amp-story-grid-layer>` organiza los elementos secundarios en una cuadrícula (que se basa en la [cuadrícula de CSS](https://www.w3.org/TR/css-grid-1/)).  Para indicar cómo quieres que se coloquen los elementos secundarios, debes utilizar una de las siguientes plantillas de diseño:

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">Plantilla: fill</h5></td>
</tr>
<tr>
    <td width="65%">La plantilla <strong>fill</strong> rellena la pantalla con el primer elemento secundario de la capa. El resto de elementos secundarios de esta capa no se muestran.

    <p>La plantilla "fill" se utiliza para fondos de pantalla que incluyen imágenes y vídeos.</p>
   <code class="nopad"><pre>&lt;amp-story-grid-layer template="fill">
  &lt;amp-img src="dog.png"
      width="720" height="1280"
      layout="responsive">
  &lt;/amp-img>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>
    {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">Plantilla: vertical</h5></td>
</tr>
<tr>
    <td width="65%">La plantilla <strong>vertical</strong> organiza los elementos secundarios a lo largo del eje "y". Los elementos se alinean con respecto a la parte superior de la pantalla y se distribuyen por todo el espacio a lo largo del eje "x".

    <p>Utiliza la plantilla "vertical" cuando quieras apilar elementos verticalmente uno debajo de otro.</p>

   <code class="nopad"><pre>&lt;amp-story-grid-layer template="vertical">
  &lt;p>element 1&lt;/p>
  &lt;p>element 2&lt;/p>
  &lt;p>element 3&lt;/p>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">Plantilla: horizontal</h5></td>
</tr>
<tr>
    <td width="65%">La plantilla <strong>horizontal</strong> organiza los elementos secundarios a lo largo del eje "x".  Los elementos se alinean con respecto al inicio de la pantalla y se distribuyen por todo el espacio a lo largo del eje "x".

    <p>Utiliza la plantilla "horizontal" cuando quieras apilar elementos horizontalmente uno después del otro.</p>

    <code class="nopad"><pre>&lt;amp-story-grid-layer template="horizontal">
  &lt;p>element 1&lt;/p>
  &lt;p>element 2&lt;/p>
  &lt;p>element 3&lt;/p>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>
    {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">Plantilla: thirds</h5></td>
</tr>
<tr>
<td width="65%">
La plantilla <strong>thirds</strong> divide la pantalla en tres filas de igual tamaño que puedes rellenar con contenido.

<p>También puedes utilizar un elemento <code>grid-area</code> para indicar en qué tercio quieres incluir el contenido: <code>upper-third</code>, <code>middle-third</code> o <code>lower-third</code>. Las áreas de la cuadrícula son útiles para modificar el lugar predeterminado en el que deben aparecer los elementos.  Por ejemplo, si hay dos elementos en la capa, puedes indicar que el primer elemento se incluya en <code>grid-area="upper-third"</code> y el segundo en <code>grid-area="lower-third"</code>.</p>

<code class="nopad"><pre>&lt;amp-story-grid-layer template="thirds">
  &lt;h1 grid-area="upper-third">element 1&lt;/h1>
  &lt;p grid-area="lower-third">element 2&lt;/p>
&lt;/amp-story-grid-layer>
</pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### Completar la portada

Ahora que conoces las plantillas de capas, vamos a completar la segunda capa de la portada.

Para la capa 2, vamos a colocar el título y la firma en la parte superior de la página y de forma consecutiva. Por lo tanto, utilizaremos la plantilla `vertical`. La segunda capa `amp-story-grid-layer` va después de la primera, por lo que el código que utilizaremos será así:

```html hl_lines="4 5 6 7"
<amp-story-grid-layer>
 <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

Actualiza la página del navegador y revisa el trabajo realizado.  La portada está terminada.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Portada terminada' ) }}
