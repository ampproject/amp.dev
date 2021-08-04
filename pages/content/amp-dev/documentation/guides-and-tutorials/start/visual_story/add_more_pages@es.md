---
'$title': Agregar más páginas
$order: 5
description: Ahora que está familiarizado con la incorporación de una página a una historia web, es muy similar agregar las siguientes páginas a nuestra historia “La alegría de las mascotas”.
author: bpaduch
---

Ahora que ya sabe cómo agregar una página a una historia web, verá que agregar las siguientes páginas a “La alegría de las mascotas” es muy parecido. Basándose en la información que se incluye a continuación, **cree el resto de las páginas** aplicando lo que aprendió. Si se atasca, consulte el código completo (<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>).

[tip type="tip"] **TIP -** Recuerde que cada página necesita un atributo “id” único (por ejemplo, `id="page1"`). [/tip]

## Página 1: Gatos

Explique como mostrar una imagen y texto en una sola capa.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>Contiene 1 capa:       <ul>         <li>Implementa la plantilla <a href="create_cover_page.md#vertical"><code>vertical</code></a>.</li>         <li>Contiene 3 elementos:           <ul>             <li>Un elemento <code><h1></code> con el título <em>Cats</em>.</li>             <li>Un componente <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> adaptable (<code class="filename">cat.jpg</code>, 720x1280px).</li>             <li>Un elemento <code><q></code> para incluir la siguiente cita: <em>Dogs come when they're called. Cats take a message and get back to you. —Mary Bly</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Página 1: Gatos' ) }}</td>
  </tr>
</table>

## Página 2: Perros

Explica cómo organizar el texto y mostrar una imagen que ocupe toda la pantalla con dos capas.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>Contiene 2 capas:       <ul>         <li> <b>Capa 1:</b> Implementa la plantilla <a href="create_cover_page.md#fill"><code>fill</code></a> y contiene un componente <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code> adaptable</a> (<code class="filename">dog.jpg</code>, 720x1280px).</li>         <li> <b>Capa 2:</b> Implementa la plantilla <a href="create_cover_page.md#thirds"><code>thirds</code></a> y contiene 2 elementos:           <ul>             <li>Un elemento <code><h1></h1></code> con el título <em>Dogs</em>.</li>             <li>Un elemento <code><p></p></code> que incluye el atributo <a href="create_cover_page.md#thirds"><code>grid-area</code></a> con el valor <a href="create_cover_page.md#thirds"><code>lower-third</code></a> y contiene el siguiente texto: <em>Dogs were probably the first tame animals. They have accompanied humans for some 10,000 years. Some scientists assert that all dogs, domestic and wild, share a common ancestor in the small South Asian wolf.</em> </li>           </ul>         </li>       </ul> </li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Página 2: Perros' ) }}</td>
  </tr>
</table>

## Página 3: Pájaros

Explica cómo organizar un texto, mostrar una imagen que ocupe toda la pantalla y añadir un audio de fondo a la página.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Contiene 3 capas:       <ul>         <li> <b>Capa 1:</b> Implementa la plantilla <a href="create_cover_page.md#fill"><code>fill</code></a> y contiene un componente <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> adaptable (<code class="filename">bird.jpg</code>, 720x1280px).</li>         <li> <b>Capa 2:</b> Implementa la plantilla <a href="create_cover_page.md#vertical"><code>vertical</code></a> y contiene un elemento:           <ul>             <li>Un elemento <code><h1></code> con el título <em>Birds</em>.</li>           </ul>         </li>         <li> <b>Capa 3:</b> Implementa la plantilla <a href="create_cover_page.md#vertical"><code>vertical</code></a> y contiene un elemento:           <ul>             <li>Un elemento <code><q></code> que incluya la siguiente cita: <em>A bird is three things: Feathers, flight and song, And feathers are the least of these. —Marjorie Allen Seiffert</em>.</li>             <li>Esta tercera capa incluye <code>class="bottom"</code> para alinear los elementos secundarios en la parte inferior de la pantalla.</li>           </ul>         </li>       </ul>
</li>
      <li>Reproduce un archivo de audio de fondo mientras se muestra la página. Puedes reproducirlo en toda la historia o solo en una página. Para reproducirlo solo en una, añade el atributo <code>background-audio="assets/bird-singing.mp3"</code> al elemento <code>&lt;amp-story-page></amp-story-page></code>.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Página 3: Pájaros' ) }}</td>
  </tr>
</table>

## Página 4: Conejos

Explica cómo organizar texto y mostrar un video que ocupe toda la pantalla en la página.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Contiene 3 capas: <ul> <li>
<b>Capa 1</b>: Implementa la plantilla <code>fill</code> y contiene un componente <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> adaptable (<code class="filename">rabbit.mp4</code>). <ul>
<li>Recuerde agregar el <strong>script necesario</strong> del componente <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>a la sección <code><head></code> de la página para que se muestre el video.</li> <li>Especifique una imagen de un <code>cartel</code> con (<code class="filename">rabbit.jpg</code>). Este atributo es <strong>necesario</strong> para que las historias de AMP sean válidas. .</li> <li>Configure el video para que se reproduzca automáticamente con el atributo <code>autoplay</code>. Este atributo es <strong>necesario</strong> para que las historias de AMP sean válidas. </li> <li>Configure el video para que se reproduzca en bucle con el atributo <code>loop</code>. </li> <li>Establezca las dimensiones <code>width="720"</code> <code>height="1280"</code> y el diseño <code>layout="responsive"</code>.</li> </ul>
</li> <li>
<b>Capa 2:</b> Implementa la plantilla <code>vertical</code> y contiene un elemento: <ul> <li>Un elemento <code><h1></code> con el título: <em>Rabbits</em>
</li> </ul> </li> <li>
<b>Capa 3:</b>: Implementa la plantilla <code>vertical</code> y contiene un elemento: <ul> <li>Un elemento <code><p></code> que contiene siguiente el texto: <em>Rabbits can learn to follow simple voice commands and come when called by name, and are curious and playful</em>.</li> <li>Aplica la clase CSS <code>bottom</code> a la capa para alinear los elementos secundarios en la parte inferior de la pantalla.</li> </ul> </li>
</ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Página 4: Conejos' ) }}</td>
  </tr>
</table>

Ya casi hemos acabado “La alegría de las mascotas”. Usaremos animaciones en la última página para reunir a todas las mascotas.
